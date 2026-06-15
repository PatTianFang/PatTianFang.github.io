(function () {
    const postList = document.getElementById('record-post-list');
    const searchInput = document.getElementById('post-search');
    const resultCount = document.getElementById('result-count');
    if (!postList) return;

    const MAX_PROBE = 100;
    const PROBE_BATCH = 6;
    const MAX_EXCERPT = 120;
    const records = [];

    postList.innerHTML = '<p class="empty-message">正在加载记录…</p>';

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
        // 标题优先取 <h1>（页面里真正显示给读者看的那一行）
        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        let title = h1Match ? cleanInline(h1Match[1]) : '';

        if (!title) {
            const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
            if (titleMatch) {
                title = cleanInline(
                    titleMatch[1].replace(/\s*[-—|]\s*FangTian's Note\s*$/i, '')
                );
            }
        }

        // 摘要：取 <article> 内第一段非空 <p>
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
            excerpt = excerpt.slice(0, MAX_EXCERPT).trimEnd() + '…';
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
            };
        } catch (_error) {
            return null;
        }
    }

    async function discoverRecords() {
        try {
            const response = await fetch('data/records.json');
            if (response.ok) {
                const items = await response.json();
                items.forEach((item, index) => {
                    if (!item || !item.url) return;
                    records.push({
                        id: item.id || index + 1,
                        url: item.url,
                        title: item.title || `记录 #${index + 1}`,
                        excerpt: item.excerpt || '',
                        cover: item.cover || null,
                        date: item.display_date || item.date || '',
                        place: item.place || '',
                    });
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
        records.sort((a, b) => String(a.id).localeCompare(String(b.id), 'zh-CN'));
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

    function render(items) {
        if (items.length === 0) {
            postList.innerHTML = '<p class="empty-message">没有匹配的记录。</p>';
            if (resultCount) resultCount.textContent = '';
            return;
        }

        postList.innerHTML = items.map(item => `
            <a class="record-post-card${item.cover ? ' record-post-card-cover' : ''}" href="${escapeAttribute(item.url)}"${item.cover ? ` style="--record-cover: url('${escapeAttribute(item.cover)}')"` : ''}>
                <span>记录 ${escapeHtml(item.id)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${item.excerpt ? escapeHtml(item.excerpt) : '暂无摘要，进入查看完整内容。'}</p>
            </a>
        `).join('');

        if (resultCount) {
            resultCount.textContent = items.length === records.length
                ? `共 ${items.length} 条记录`
                : `匹配到 ${items.length} / ${records.length} 条记录`;
        }
    }

    discoverRecords().then(() => {
        render(records);

        if (searchInput) {
            searchInput.addEventListener('input', event => {
                const query = event.target.value.trim().toLowerCase();
                const filtered = query
                    ? records.filter(item =>
                        item.title.toLowerCase().includes(query)
                        || (item.excerpt && item.excerpt.toLowerCase().includes(query))
                        || (item.date && item.date.toLowerCase().includes(query))
                        || (item.place && item.place.toLowerCase().includes(query))
                    )
                    : records;
                render(filtered);
            });
        }
    });
}());
