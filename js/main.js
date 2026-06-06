document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const filterSection = document.getElementById('filter-section');
    const searchInput = document.getElementById('post-search');
    const pagination = document.getElementById('pagination');
    const resultCount = document.getElementById('result-count');

    if (!postList) return;

    const POSTS_PER_PAGE = 10;
    const ALL_CATEGORY = '全部';

    let allPosts = [];
    let currentCategory = ALL_CATEGORY;
    let currentSearch = '';
    let currentPage = 1;

    fetch('data/posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('无法加载文章数据');
            }
            return response.json();
        })
        .then(posts => {
            allPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderFilters(allPosts);
            render();
        })
        .catch(error => {
            postList.innerHTML = `<p class="empty-message error-message">加载失败：${escapeHtml(error.message)}</p>`;
            if (pagination) pagination.innerHTML = '';
            if (resultCount) resultCount.textContent = '';
        });

    if (searchInput) {
        searchInput.addEventListener('input', event => {
            currentSearch = event.target.value.trim().toLowerCase();
            currentPage = 1;
            render();
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
    }

    function getFilteredPosts() {
        return allPosts.filter(post => {
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
                    <span>${escapeHtml(post.date)}</span>
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

                filterSection.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
                event.currentTarget.classList.add('active');
                render();
            });
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
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
