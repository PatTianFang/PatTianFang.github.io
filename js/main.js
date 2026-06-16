document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const filterSection = document.getElementById('filter-section');
    const searchInput = document.getElementById('post-search');
    const clearSearchButton = document.getElementById('clear-search');
    const sortSelect = document.getElementById('post-sort');
    const pagination = document.getElementById('pagination');
    const resultCount = document.getElementById('result-count');
    const latestPostList = document.getElementById('latest-post-list');
    const latestRecordList = document.getElementById('latest-record-list');
    const categoryOverview = document.getElementById('category-overview');
    const categoryOverviewCount = document.getElementById('category-overview-count');
    const randomPostButton = document.getElementById('random-post');

    if (!postList) return;

    const POSTS_PER_PAGE = 10;
    const ALL_CATEGORY = '全部';

    let allPosts = [];
    let allRecords = [];
    let currentCategory = ALL_CATEGORY;
    let currentSearch = '';
    let currentSort = 'newest';
    let currentPage = 1;

    Promise.all([
        fetchJson('data/posts.json'),
        fetchJson('data/records.json').catch(() => []),
    ])
        .then(([posts, records]) => {
            allPosts = Array.isArray(posts) ? posts : [];
            allRecords = Array.isArray(records) ? records : [];
            renderOverview();
            renderLatestPosts();
            renderLatestRecords();
            renderFilters(allPosts);
            renderCategoryOverview();
            applyStateFromUrl();
            render();
        })
        .catch(error => {
            postList.innerHTML = `<p class="empty-message error-message">加载失败：${escapeHtml(error.message)}</p>`;
            if (pagination) pagination.innerHTML = '';
            if (resultCount) resultCount.textContent = '';
            updateText('stat-posts', '--');
            updateText('stat-categories', '--');
            updateText('stat-records', '--');
            updateText('stat-latest', '--');
        });

    if (searchInput) {
        searchInput.addEventListener('input', event => {
            currentSearch = event.target.value.trim().toLowerCase();
            currentPage = 1;
            render();
        });
    }

    if (clearSearchButton && searchInput) {
        clearSearchButton.addEventListener('click', () => {
            searchInput.value = '';
            currentSearch = '';
            currentPage = 1;
            searchInput.focus();
            render();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', event => {
            currentSort = event.target.value;
            currentPage = 1;
            render();
        });
    }

    if (randomPostButton) {
        randomPostButton.addEventListener('click', () => {
            const source = getFilteredPosts();
            const candidates = source.length ? source : allPosts;
            if (!candidates.length) return;
            const item = candidates[Math.floor(Math.random() * candidates.length)];
            if (item && item.url) {
                window.location.href = item.url;
            }
        });
    }

    async function fetchJson(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`无法加载 ${url}`);
        }
        return response.json();
    }

    function renderOverview() {
        const categories = new Set(allPosts.map(post => post.category).filter(Boolean));
        const latestDate = allPosts
            .map(post => post.date)
            .filter(Boolean)
            .sort()
            .pop();

        updateText('stat-posts', allPosts.length);
        updateText('stat-categories', categories.size);
        updateText('stat-records', allRecords.length);
        updateText('stat-latest', latestDate ? formatMonthDay(latestDate) : '--');
    }

    function renderLatestPosts() {
        if (!latestPostList) return;

        const latestPosts = sortPosts(allPosts, 'newest').slice(0, 4);
        if (!latestPosts.length) {
            latestPostList.innerHTML = '<p class="empty-message">暂无文章。</p>';
            return;
        }

        latestPostList.innerHTML = latestPosts.map(post => `
            <a class="latest-item" href="${escapeAttribute(post.url)}">
                <span>${escapeHtml(post.category || '笔记')}</span>
                <strong>${escapeHtml(post.title)}</strong>
                <small>${escapeHtml(post.date || '')}</small>
            </a>
        `).join('');
    }

    function renderLatestRecords() {
        if (!latestRecordList) return;

        const records = [...allRecords]
            .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
            .slice(0, 2);

        if (!records.length) {
            latestRecordList.innerHTML = '<p class="empty-message">暂无记录。</p>';
            return;
        }

        latestRecordList.innerHTML = records.map(record => `
            <a class="latest-record-card" href="${escapeAttribute(record.url)}">
                ${record.cover ? `<img src="${escapeAttribute(record.cover)}" alt="">` : ''}
                <span>${escapeHtml(record.display_date || record.date || '')}</span>
                <strong>${escapeHtml(record.place || record.title || '记录')}</strong>
                <small>${escapeHtml(record.excerpt || '')}</small>
            </a>
        `).join('');
    }

    function renderCategoryOverview() {
        if (!categoryOverview) return;

        const groups = getCategoryGroups()
            .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category, 'zh-CN'));

        if (categoryOverviewCount) {
            categoryOverviewCount.textContent = `${groups.length} 个分类`;
        }

        if (!groups.length) {
            categoryOverview.innerHTML = '<p class="empty-message">暂无分类。</p>';
            return;
        }

        const maxCount = Math.max(...groups.map(item => item.count), 1);
        categoryOverview.innerHTML = groups.map(item => `
            <button class="category-card" type="button" data-category="${escapeAttribute(item.category)}">
                <span>${escapeHtml(item.category)}</span>
                <strong>${item.count}</strong>
                <small>${escapeHtml(item.latestDate || '')}</small>
                <i style="--category-ratio: ${item.count / maxCount}" aria-hidden="true"></i>
            </button>
        `).join('');

        categoryOverview.querySelectorAll('.category-card').forEach(button => {
            button.addEventListener('click', event => {
                currentCategory = event.currentTarget.getAttribute('data-category') || ALL_CATEGORY;
                currentPage = 1;
                syncFilterButtons();
                render();
                document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function render() {
        const filteredPosts = getFilteredPosts();
        const pageCount = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

        if (currentPage > pageCount) {
            currentPage = pageCount;
        }

        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const pagePosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

        renderPosts(pagePosts);
        renderPagination(filteredPosts.length, pageCount);
        renderResultCount(filteredPosts.length);
        syncUrlState();

        if (clearSearchButton) {
            clearSearchButton.disabled = !currentSearch;
        }
    }

    function getFilteredPosts() {
        const filtered = allPosts.filter(post => {
            const matchesCategory = currentCategory === ALL_CATEGORY || post.category === currentCategory;
            const searchableText = [
                post.title,
                post.category,
                post.excerpt,
                post.date,
            ].filter(Boolean).join(' ').toLowerCase();
            const matchesSearch = !currentSearch || searchableText.includes(currentSearch);

            return matchesCategory && matchesSearch;
        });

        return sortPosts(filtered, currentSort);
    }

    function sortPosts(posts, sortMode) {
        return [...posts].sort((a, b) => {
            if (sortMode === 'oldest') {
                return String(a.date || '').localeCompare(String(b.date || ''));
            }

            if (sortMode === 'title') {
                return String(a.title || '').localeCompare(String(b.title || ''), 'zh-CN');
            }

            return String(b.date || '').localeCompare(String(a.date || ''));
        });
    }

    function renderPosts(posts) {
        if (posts.length === 0) {
            postList.innerHTML = '<p class="empty-message">没有匹配的文章。</p>';
            return;
        }

        postList.innerHTML = posts.map(post => `
            <article class="post-item">
                <h2 class="post-title"><a href="${escapeAttribute(post.url)}">${escapeHtml(post.title)}</a></h2>
                <div class="post-meta">
                    <span>${escapeHtml(post.date || '')}</span>
                    ${post.category ? `<span class="post-category">${escapeHtml(post.category)}</span>` : ''}
                </div>
                <p class="post-excerpt">${escapeHtml(post.excerpt || '')}</p>
            </article>
        `).join('');
    }

    function renderFilters(posts) {
        if (!filterSection) return;

        const categories = [ALL_CATEGORY, ...new Set(posts.map(post => post.category).filter(Boolean))];
        filterSection.innerHTML = categories.map(category =>
            `<button class="filter-btn ${category === currentCategory ? 'active' : ''}" data-category="${escapeAttribute(category)}">${escapeHtml(category)}</button>`
        ).join('');

        filterSection.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', event => {
                currentCategory = event.currentTarget.getAttribute('data-category') || ALL_CATEGORY;
                currentPage = 1;

                syncFilterButtons();
                render();
            });
        });
    }

    function syncFilterButtons() {
        if (!filterSection) return;
        filterSection.querySelectorAll('.filter-btn').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-category') === currentCategory);
        });
    }

    function renderPagination(totalPosts, pageCount) {
        if (!pagination) return;

        if (totalPosts <= POSTS_PER_PAGE) {
            pagination.innerHTML = '';
            return;
        }

        const pages = getVisiblePages(pageCount, currentPage);
        const pageButtons = pages.map(page => {
            if (page === '...') {
                return '<span class="pagination-ellipsis">...</span>';
            }

            return `<button class="page-btn ${page === currentPage ? 'active' : ''}" data-page="${page}" aria-label="第 ${page} 页">${page}</button>`;
        }).join('');

        pagination.innerHTML = `
            <button class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
            ${pageButtons}
            <button class="page-btn" data-page="${currentPage + 1}" ${currentPage === pageCount ? 'disabled' : ''}>下一页</button>
        `;

        pagination.querySelectorAll('.page-btn').forEach(button => {
            button.addEventListener('click', event => {
                const nextPage = Number(event.currentTarget.getAttribute('data-page'));
                if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage > pageCount) return;

                currentPage = nextPage;
                render();
                document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function renderResultCount(totalPosts) {
        if (!resultCount) return;

        const pageCount = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
        resultCount.textContent = totalPosts === 0
            ? '没有找到文章'
            : `${totalPosts} 篇文章，第 ${currentPage} / ${pageCount} 页`;
    }

    function getVisiblePages(pageCount, activePage) {
        if (pageCount <= 7) {
            return Array.from({ length: pageCount }, (_, index) => index + 1);
        }

        const pages = [1];
        const start = Math.max(2, activePage - 1);
        const end = Math.min(pageCount - 1, activePage + 1);

        if (start > 2) pages.push('...');
        for (let page = start; page <= end; page += 1) {
            pages.push(page);
        }
        if (end < pageCount - 1) pages.push('...');

        pages.push(pageCount);
        return pages;
    }

    function updateText(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    function getCategoryGroups() {
        const byCategory = new Map();
        allPosts.forEach(post => {
            const category = post.category || '未分类';
            const item = byCategory.get(category) || { category, count: 0, latestDate: '' };
            item.count += 1;
            if (post.date && post.date > item.latestDate) {
                item.latestDate = post.date;
            }
            byCategory.set(category, item);
        });
        return [...byCategory.values()];
    }

    function applyStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        const query = params.get('q');
        const sort = params.get('sort');
        const page = Number(params.get('page'));

        if (category) currentCategory = category;
        if (query) currentSearch = query.toLowerCase();
        if (sort && ['newest', 'oldest', 'title'].includes(sort)) currentSort = sort;
        if (Number.isFinite(page) && page > 0) currentPage = page;

        if (searchInput) searchInput.value = currentSearch;
        if (sortSelect) sortSelect.value = currentSort;
        syncFilterButtons();
    }

    function syncUrlState() {
        const params = new URLSearchParams();
        if (currentCategory !== ALL_CATEGORY) params.set('category', currentCategory);
        if (currentSearch) params.set('q', currentSearch);
        if (currentSort !== 'newest') params.set('sort', currentSort);
        if (currentPage > 1) params.set('page', String(currentPage));

        const query = params.toString();
        const nextUrl = query ? `${window.location.pathname}?${query}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
        window.history.replaceState(null, '', nextUrl);
    }

    function formatMonthDay(dateText) {
        const parts = String(dateText).split('-');
        if (parts.length < 3) return dateText;
        return `${Number(parts[1])}.${Number(parts[2])}`;
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
});
