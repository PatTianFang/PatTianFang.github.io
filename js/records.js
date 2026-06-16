(function () {
    const postList = document.getElementById('record-post-list');
    const searchInput = document.getElementById('post-search');
    const clearSearchButton = document.getElementById('clear-search');
    const sortSelect = document.getElementById('record-sort');
    const placeFilters = document.getElementById('record-place-filters');
    const resultCount = document.getElementById('result-count');
    const timeline = document.getElementById('record-timeline');
    const timelineCount = document.getElementById('record-timeline-count');
    const mapEl = document.getElementById('record-map');
    const mapFallback = document.getElementById('record-map-fallback');
    const mapCount = document.getElementById('record-map-count');
    if (!postList) return;

    const MAX_PROBE = 100;
    const PROBE_BATCH = 6;
    const MAX_EXCERPT = 120;
    const ALL_PLACE = '全部';
    const records = [];

    let currentSearch = '';
    let currentPlace = ALL_PLACE;
    let currentSort = 'newest';
    let recordMap = null;
    let markerLayer = null;
    let mapReady = false;

    postList.innerHTML = '<p class="empty-message">正在加载记录...</p>';

    function stripTags(value) {
        return String(value ?? '').replace(/<[^>]+>/g, '');
    }

    function decodeEntities(value) {
        return String(value ?? '')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&nbsp;/g, ' ')
            .replace(/&#096;/g, '`');
    }

    function cleanInline(value) {
        return decodeEntities(stripTags(value)).replace(/\s+/g, ' ').trim();
    }

    function extractMeta(html) {
        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        let title = h1Match ? cleanInline(h1Match[1]) : '';

        if (!title) {
            const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
            if (titleMatch) {
                title = cleanInline(titleMatch[1].replace(/\s*-\s*FangTian's Note\s*$/i, ''));
            }
        }

        const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
        const searchHtml = articleMatch ? articleMatch[1] : html;
        let excerpt = '';
        const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
        let match;
        while ((match = pRegex.exec(searchHtml)) !== null) {
            const text = cleanInline(match[1]);
            if (text) {
                excerpt = text;
                break;
            }
        }

        if (excerpt.length > MAX_EXCERPT) {
            excerpt = excerpt.slice(0, MAX_EXCERPT).trimEnd() + '...';
        }

        const coverMatch = html.match(/<img[^>]+src="([^"]+)"/i);
        const cover = coverMatch ? coverMatch[1] : null;

        return { title, excerpt, cover };
    }

    async function probeOne(index) {
        const url = `images/${index}.html`;
        try {
            const response = await fetch(url);
            if (!response.ok) return null;
            const html = await response.text();
            const meta = extractMeta(html);
            return {
                id: index,
                url,
                title: meta.title || `记录 #${index}`,
                excerpt: meta.excerpt,
                cover: meta.cover,
                date: '',
                displayDate: '',
                place: '',
                imageCount: 0,
            };
        } catch (_error) {
            return null;
        }
    }

    async function discoverRecords() {
        if (Array.isArray(window.WEBNOTE_RECORDS) && window.WEBNOTE_RECORDS.length) {
            window.WEBNOTE_RECORDS.forEach((item, index) => {
                if (!item || !item.url) return;
                records.push(normalizeRecord(item, index));
            });
            return;
        }

        try {
            const response = await fetch('data/records.json');
            if (response.ok) {
                const items = await response.json();
                items.forEach((item, index) => {
                    if (!item || !item.url) return;
                    records.push(normalizeRecord(item, index));
                });
                if (records.length > 0) return;
            }
        } catch (_error) {
            // Fall back to probing older numbered record pages.
        }

        for (let start = 1; start <= MAX_PROBE; start += PROBE_BATCH) {
            const batch = [];
            for (let i = start; i < start + PROBE_BATCH && i <= MAX_PROBE; i += 1) {
                batch.push(probeOne(i));
            }
            const results = await Promise.all(batch);
            let allEmpty = true;
            results.forEach(item => {
                if (item) {
                    records.push(item);
                    allEmpty = false;
                }
            });
            if (allEmpty && start > 1) break;
        }
    }

    function normalizeRecord(item, index) {
        const excerpt = item.excerpt || '';
        return {
            id: item.id || index + 1,
            url: item.url,
            title: item.title || `记录 #${index + 1}`,
            excerpt,
            cover: item.cover || null,
            date: item.date || '',
            displayDate: item.display_date || item.date || '',
            place: item.place || '',
            coords: normalizeCoords(item.coords),
            imageCount: extractImageCount(excerpt),
        };
    }

    function normalizeCoords(coords) {
        if (!Array.isArray(coords) || coords.length !== 2) return null;
        const lat = Number(coords[0]);
        const lng = Number(coords[1]);
        return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
    }

    function extractImageCount(excerpt) {
        const match = String(excerpt || '').match(/共\s*(\d+)\s*张/);
        return match ? Number(match[1]) : 0;
    }

    function renderStats() {
        const places = new Set(records.map(item => item.place).filter(Boolean));
        const photoTotal = records.reduce((sum, item) => sum + (Number(item.imageCount) || 0), 0);

        updateText('record-total', records.length);
        updateText('record-photo-total', photoTotal || '--');
        updateText('record-place-total', places.size || '--');
    }

    function renderPlaceFilters() {
        if (!placeFilters) return;

        const places = [ALL_PLACE, ...new Set(records.map(item => item.place).filter(Boolean))];
        placeFilters.innerHTML = places.map(place =>
            `<button class="filter-btn ${place === currentPlace ? 'active' : ''}" data-place="${escapeAttribute(place)}">${escapeHtml(place)}</button>`
        ).join('');

        placeFilters.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', event => {
                currentPlace = event.currentTarget.getAttribute('data-place') || ALL_PLACE;
                syncPlaceButtons();
                render();
            });
        });
    }

    function syncPlaceButtons() {
        if (!placeFilters) return;
        placeFilters.querySelectorAll('.filter-btn').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-place') === currentPlace);
        });
    }

    function getFilteredRecords() {
        const filtered = records.filter(item => {
            const matchesPlace = currentPlace === ALL_PLACE || item.place === currentPlace;
            const searchableText = [
                item.title,
                item.excerpt,
                item.date,
                item.displayDate,
                item.place,
            ].filter(Boolean).join(' ').toLowerCase();
            const matchesSearch = !currentSearch || searchableText.includes(currentSearch);
            return matchesPlace && matchesSearch;
        });

        return sortRecords(filtered);
    }

    function sortRecords(items) {
        return [...items].sort((a, b) => {
            if (currentSort === 'oldest') {
                return String(a.date || '').localeCompare(String(b.date || ''));
            }

            if (currentSort === 'place') {
                return String(a.place || '').localeCompare(String(b.place || ''), 'zh-CN')
                    || String(b.date || '').localeCompare(String(a.date || ''));
            }

            return String(b.date || '').localeCompare(String(a.date || ''));
        });
    }

    function render() {
        const items = getFilteredRecords();
        renderTimeline(items);
        renderRecordMap(items);
        if (items.length === 0) {
            postList.innerHTML = '<p class="empty-message">没有匹配的记录。</p>';
            if (resultCount) resultCount.textContent = '没有找到记录';
            if (clearSearchButton) clearSearchButton.disabled = !currentSearch;
            syncUrlState();
            return;
        }

        postList.innerHTML = items.map(item => `
            <a class="record-post-card${item.cover ? ' record-post-card-cover' : ''}" href="${escapeAttribute(item.url)}">
                ${item.cover ? `<img class="record-post-card-image" src="${escapeAttribute(item.cover)}" alt="">` : ''}
                <span>${escapeHtml(item.displayDate || item.date || `记录 ${item.id}`)}</span>
                <h3>${escapeHtml(item.place || item.title)}</h3>
                <p>${item.excerpt ? escapeHtml(item.excerpt) : '暂无摘要，进入查看完整内容。'}</p>
            </a>
        `).join('');

        if (resultCount) {
            resultCount.textContent = items.length === records.length
                ? `共 ${items.length} 条记录`
                : `匹配到 ${items.length} / ${records.length} 条记录`;
        }

        if (clearSearchButton) {
            clearSearchButton.disabled = !currentSearch;
        }
        syncUrlState();
    }

    function renderTimeline(items) {
        if (!timeline) return;

        if (timelineCount) {
            timelineCount.textContent = items.length ? `${items.length} 个节点` : '暂无节点';
        }

        if (!items.length) {
            timeline.innerHTML = '<p class="empty-message">没有匹配的时间线。</p>';
            return;
        }

        const timelineItems = [...items].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
        timeline.innerHTML = timelineItems.map(item => `
            <a class="timeline-item" href="${escapeAttribute(item.url)}">
                <span>${escapeHtml(item.displayDate || item.date || '')}</span>
                <strong>${escapeHtml(item.place || item.title)}</strong>
                <small>${escapeHtml(item.imageCount ? `${item.imageCount} 张照片` : item.excerpt || '')}</small>
            </a>
        `).join('');
    }

    function renderRecordMap(items) {
        if (!mapEl) return;

        const groups = getPlaceGroups(items);
        const locatedGroups = groups.filter(group => group.coords);
        const missingGroups = groups.filter(group => !group.coords);

        if (mapCount) {
            mapCount.textContent = locatedGroups.length
                ? `${locatedGroups.length} 个地点`
                : '暂无可定位地点';
        }

        renderMapFallback(groups);

        if (!locatedGroups.length) {
            if (!mapReady) mapEl.innerHTML = '';
            mapEl.setAttribute('data-map-state', 'empty');
            return;
        }

        renderStaticRecordMap(locatedGroups);

        if (!window.L) {
            appendMissingMapNote(missingGroups);
            return;
        }

        try {
            if (!mapReady) {
                mapEl.innerHTML = '';
                recordMap = window.L.map(mapEl, {
                    scrollWheelZoom: false,
                    zoomControl: true,
                });
                window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: '&copy; OpenStreetMap',
                }).addTo(recordMap);
                markerLayer = window.L.layerGroup().addTo(recordMap);
                mapReady = true;
            }
        } catch (_error) {
            recordMap = null;
            markerLayer = null;
            mapReady = false;
            renderStaticRecordMap(locatedGroups);
            appendMissingMapNote(missingGroups);
            return;
        }

        mapEl.removeAttribute('data-map-state');

        markerLayer.clearLayers();

        const bounds = [];
        locatedGroups.forEach(group => {
            const latest = group.records[0];
            const marker = window.L.marker(group.coords)
                .addTo(markerLayer)
                .bindPopup(`
                    <strong>${escapeHtml(group.place)}</strong>
                    <span>${group.records.length} 条记录</span>
                    ${latest ? `<a href="${escapeAttribute(latest.url)}">${escapeHtml(latest.displayDate || latest.date || latest.title)}</a>` : ''}
                `);

            marker.on('click', () => {
                currentPlace = group.place;
                syncPlaceButtons();
                render();
            });

            bounds.push(group.coords);
        });

        window.requestAnimationFrame(() => {
            recordMap.invalidateSize();

            if (currentPlace !== ALL_PLACE) {
                const activeGroup = locatedGroups.find(group => group.place === currentPlace);
                if (activeGroup) {
                    recordMap.setView(activeGroup.coords, 9);
                    return;
                }
            }

            if (bounds.length === 1) {
                recordMap.setView(bounds[0], 7);
            } else {
                recordMap.fitBounds(bounds, { padding: [28, 28] });
            }
        });

        appendMissingMapNote(missingGroups);
    }

    function renderStaticRecordMap(groups) {
        if (!mapEl) return;

        mapEl.setAttribute('data-map-state', 'static');
        const lats = groups.map(group => group.coords[0]);
        const lngs = groups.map(group => group.coords[1]);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        const latSpan = maxLat - minLat || 1;
        const lngSpan = maxLng - minLng || 1;
        const clamp = value => Math.min(86, Math.max(14, value));

        mapEl.innerHTML = `
            <div class="record-static-map" aria-label="记录地点示意图">
                <p class="record-static-map-label">记录地点 · 点击标注筛选</p>
                ${groups.map(group => {
                    const x = clamp(14 + ((group.coords[1] - minLng) / lngSpan) * 72);
                    const y = clamp(86 - ((group.coords[0] - minLat) / latSpan) * 72);
                    const latest = group.records[0];
                    return `
                        <button
                            class="record-static-marker${group.place === currentPlace ? ' active' : ''}"
                            type="button"
                            style="left:${x}%;top:${y}%"
                            data-place="${escapeAttribute(group.place)}"
                            aria-label="${escapeAttribute(group.place)}，${group.records.length} 条记录"
                        >
                            <span></span>
                            <strong>${escapeHtml(group.place)}</strong>
                            <small>${escapeHtml(latest ? latest.displayDate || latest.date || '' : '')}</small>
                        </button>
                    `;
                }).join('')}
            </div>
        `;

        mapEl.querySelectorAll('.record-static-marker').forEach(button => {
            button.addEventListener('click', event => {
                currentPlace = event.currentTarget.getAttribute('data-place') || ALL_PLACE;
                syncPlaceButtons();
                render();
            });
        });
    }

    function appendMissingMapNote(missingGroups) {
        if (!missingGroups.length || !mapFallback) return;
        mapFallback.insertAdjacentHTML(
            'beforeend',
            `<p class="record-map-note">未定位：${missingGroups.map(group => escapeHtml(group.place)).join('、')}</p>`,
        );
    }

    function getPlaceGroups(items) {
        const byPlace = new Map();
        items.forEach(item => {
            if (!item.place) return;
            const group = byPlace.get(item.place) || {
                place: item.place,
                coords: item.coords,
                records: [],
            };
            if (!group.coords && item.coords) {
                group.coords = item.coords;
            }
            group.records.push(item);
            byPlace.set(item.place, group);
        });

        return [...byPlace.values()]
            .map(group => ({
                ...group,
                records: group.records.sort((a, b) => String(b.date || '').localeCompare(String(a.date || ''))),
            }))
            .sort((a, b) => String(a.place).localeCompare(String(b.place), 'zh-CN'));
    }

    function renderMapFallback(groups) {
        if (!mapFallback) return;

        if (!groups.length) {
            mapFallback.innerHTML = '<p class="empty-message">没有可标注的地点。</p>';
            return;
        }

        mapFallback.innerHTML = groups.map(group => `
            <button class="record-map-place${group.place === currentPlace ? ' active' : ''}" type="button" data-place="${escapeAttribute(group.place)}">
                <strong>${escapeHtml(group.place)}</strong>
                <span>${group.records.length} 条</span>
            </button>
        `).join('');

        mapFallback.querySelectorAll('.record-map-place').forEach(button => {
            button.addEventListener('click', event => {
                currentPlace = event.currentTarget.getAttribute('data-place') || ALL_PLACE;
                syncPlaceButtons();
                render();
            });
        });
    }

    function updateText(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/`/g, '&#096;');
    }

    function applyStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const place = params.get('place');
        const query = params.get('q');
        const sort = params.get('sort');

        if (place) currentPlace = place;
        if (query) currentSearch = query.toLowerCase();
        if (sort && ['newest', 'oldest', 'place'].includes(sort)) currentSort = sort;

        if (searchInput) searchInput.value = currentSearch;
        if (sortSelect) sortSelect.value = currentSort;
        syncPlaceButtons();
    }

    function syncUrlState() {
        const params = new URLSearchParams();
        if (currentPlace !== ALL_PLACE) params.set('place', currentPlace);
        if (currentSearch) params.set('q', currentSearch);
        if (currentSort !== 'newest') params.set('sort', currentSort);

        const query = params.toString();
        const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
        window.history.replaceState(null, '', nextUrl);
    }

    discoverRecords().then(() => {
        renderStats();
        renderPlaceFilters();
        applyStateFromUrl();
        render();

        if (searchInput) {
            searchInput.addEventListener('input', event => {
                currentSearch = event.target.value.trim().toLowerCase();
                render();
            });
        }

        if (clearSearchButton && searchInput) {
            clearSearchButton.addEventListener('click', () => {
                searchInput.value = '';
                currentSearch = '';
                searchInput.focus();
                render();
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', event => {
                currentSort = event.target.value;
                render();
            });
        }
    });
}());
