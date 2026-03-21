document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const filterSection = document.getElementById('filter-section');

    if (!postList) return; // 仅在包含 post-list 元素的页面（即首页）运行

    let allPosts = [];

    // 请求文章数据
    fetch('data/posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('无法加载文章数据');
            }
            return response.json();
        })
        .then(posts => {
            // 按日期倒序排列
            allPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderFilters(allPosts);
            renderPosts(allPosts);
        })
        .catch(error => {
            postList.innerHTML = `<p style="color: red; text-align: center;">加载失败：${error.message}</p>`;
        });

    // 渲染文章列表
    function renderPosts(posts) {
        if (posts.length === 0) {
            postList.innerHTML = '<p style="text-align: center; color: #666;">暂无文章。</p>';
            return;
        }

        postList.innerHTML = posts.map(post => `
            <article class="post-item">
                <h2 class="post-title"><a href="${post.url}">${post.title}</a></h2>
                <div class="post-meta">
                    <span>📅 ${post.date}</span>
                    ${post.category ? `<span class="post-category">${post.category}</span>` : ''}
                </div>
                <p class="post-excerpt">${post.excerpt}</p>
            </article>
        `).join('');
    }

    // 渲染分类过滤器
    function renderFilters(posts) {
        if (!filterSection) return;

        // 提取所有不重复的分类
        const categories = ['全部', ...new Set(posts.map(p => p.category).filter(Boolean))];

        filterSection.innerHTML = categories.map(cat =>
            `<button class="filter-btn ${cat === '全部' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
        ).join('');

        // 绑定过滤点击事件
        const filterBtns = filterSection.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 更新高亮状态
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // 筛选数据
                const selectedCategory = e.target.getAttribute('data-category');
                if (selectedCategory === '全部') {
                    renderPosts(allPosts);
                } else {
                    const filteredPosts = allPosts.filter(p => p.category === selectedCategory);
                    renderPosts(filteredPosts);
                }
            });
        });
    }
});