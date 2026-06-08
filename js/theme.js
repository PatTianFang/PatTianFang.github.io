(function () {
    const STORAGE_KEY = 'webnote-theme';
    const THEMES = ['light', 'dark'];
    const root = document.documentElement;
    const systemThemeQuery = window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : { matches: false };

    function getStoredTheme() {
        try {
            const storedTheme = window.localStorage.getItem(STORAGE_KEY);
            return THEMES.includes(storedTheme) ? storedTheme : '';
        } catch (_error) {
            return '';
        }
    }

    function getSystemTheme() {
        return systemThemeQuery.matches ? 'dark' : 'light';
    }

    function getActiveTheme() {
        return root.getAttribute('data-theme') || getStoredTheme() || getSystemTheme();
    }

    function applyTheme(theme) {
        const nextTheme = THEMES.includes(theme) ? theme : getSystemTheme();
        root.setAttribute('data-theme', nextTheme);
        root.style.colorScheme = nextTheme;
        updateToggle(nextTheme);
    }

    function saveTheme(theme) {
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch (_error) {
            return;
        }
    }

    function getThemeLabel(theme) {
        return theme === 'dark' ? '暗色' : '亮色';
    }

    function createToggle() {
        const headerContainer = document.querySelector('.header-container');
        if (!headerContainer || document.querySelector('[data-theme-toggle]')) {
            return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';
        button.setAttribute('data-theme-toggle', '');

        const icon = document.createElement('span');
        icon.className = 'theme-toggle-icon';
        icon.setAttribute('aria-hidden', 'true');

        const label = document.createElement('span');
        label.className = 'theme-toggle-label';

        button.append(icon, label);
        button.addEventListener('click', () => {
            const nextTheme = getActiveTheme() === 'dark' ? 'light' : 'dark';
            saveTheme(nextTheme);
            applyTheme(nextTheme);
        });

        headerContainer.appendChild(button);
        updateToggle(getActiveTheme());
    }

    function updateToggle(theme) {
        const toggles = document.querySelectorAll('[data-theme-toggle]');
        const targetTheme = theme === 'dark' ? 'light' : 'dark';
        const label = getThemeLabel(targetTheme);

        toggles.forEach(toggle => {
            toggle.setAttribute('data-active-theme', theme);
            toggle.setAttribute('aria-label', `切换为${label}模式`);
            toggle.setAttribute('title', `切换为${label}模式`);

            const labelElement = toggle.querySelector('.theme-toggle-label');
            if (labelElement) {
                labelElement.textContent = label;
            }
        });
    }

    function ensureRecordsNav() {
        const nav = document.querySelector('body > header nav');
        if (!nav) {
            return;
        }

        const links = Array.from(nav.querySelectorAll('a'));
        const currentPath = window.location.pathname.replace(/\\/g, '/');
        let recordsLink = links.find(link => /(^|\/)records\.html$/.test(link.getAttribute('href') || ''));

        if (!recordsLink) {
            const aboutLink = links.find(link => /(^|\/)about\.html$/.test(link.getAttribute('href') || ''));
            const recordsHref = aboutLink
                ? aboutLink.getAttribute('href').replace(/about\.html$/, 'records.html')
                : 'records.html';

            recordsLink = document.createElement('a');
            recordsLink.href = recordsHref;
            recordsLink.textContent = '记录';

            if (aboutLink) {
                nav.insertBefore(recordsLink, aboutLink);
            } else {
                nav.appendChild(recordsLink);
            }
        }

        if (/\/records\.html$/.test(currentPath)) {
            links.forEach(link => link.classList.remove('active'));
            recordsLink.classList.add('active');
        }
    }

    function createReadingProgress() {
        if (document.querySelector('.reading-progress')) {
            return;
        }

        const progress = document.createElement('div');
        progress.className = 'reading-progress';
        progress.setAttribute('aria-hidden', 'true');
        document.body.appendChild(progress);

        const updateProgress = () => {
            const scrollTop = window.scrollY || root.scrollTop || 0;
            const scrollableHeight = root.scrollHeight - window.innerHeight;
            const ratio = scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;
            progress.style.transform = `scaleX(${ratio})`;
        };

        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
    }

    function createBackToTop() {
        if (document.querySelector('.back-to-top')) {
            return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'back-to-top';
        button.textContent = '↑';
        button.setAttribute('aria-label', '返回顶部');
        button.setAttribute('title', '返回顶部');
        button.setAttribute('data-visible', 'false');

        const updateVisibility = () => {
            const shouldShow = (window.scrollY || root.scrollTop || 0) > 420;
            button.setAttribute('data-visible', String(shouldShow));
        };

        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.body.appendChild(button);
        updateVisibility();
        window.addEventListener('scroll', updateVisibility, { passive: true });
    }

    async function copyText(value) {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(value);
            return true;
        }

        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.className = 'clipboard-fallback';
        document.body.appendChild(textarea);
        textarea.select();

        let copied = false;
        try {
            copied = document.execCommand('copy');
        } finally {
            textarea.remove();
        }

        return copied;
    }

    function createCopyLinkButton() {
        const postHeader = document.querySelector('.post-header');
        if (!postHeader || document.querySelector('.copy-link-btn')) {
            return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'copy-link-btn';
        button.innerHTML = '<span class="copy-link-icon" aria-hidden="true"></span><span class="copy-link-label">复制链接</span>';

        button.addEventListener('click', async () => {
            const label = button.querySelector('.copy-link-label');
            const originalText = label ? label.textContent : '';
            const copied = await copyText(window.location.href);

            if (label) {
                label.textContent = copied ? '已复制' : '复制失败';
                window.setTimeout(() => {
                    label.textContent = originalText || '复制链接';
                }, 1600);
            }
        });

        postHeader.appendChild(button);
    }

    function bindSearchShortcut() {
        const searchInput = document.getElementById('post-search');
        if (!searchInput || searchInput.getAttribute('data-shortcut-bound') === 'true') {
            return;
        }

        searchInput.setAttribute('data-shortcut-bound', 'true');
        searchInput.setAttribute('aria-keyshortcuts', '/');

        document.addEventListener('keydown', event => {
            const target = event.target;
            const isEditable = target && (
                target.tagName === 'INPUT'
                || target.tagName === 'TEXTAREA'
                || target.isContentEditable
            );

            if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || isEditable) {
                return;
            }

            event.preventDefault();
            searchInput.focus();
            searchInput.select();
        });
    }

    function initPageFeatures() {
        ensureRecordsNav();
        createToggle();
        createReadingProgress();
        createBackToTop();
        createCopyLinkButton();
        bindSearchShortcut();
    }

    applyTheme(getStoredTheme() || getSystemTheme());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPageFeatures);
    } else {
        initPageFeatures();
    }

    function handleSystemThemeChange(event) {
        if (!getStoredTheme()) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    }

    if (systemThemeQuery.addEventListener) {
        systemThemeQuery.addEventListener('change', handleSystemThemeChange);
    } else if (systemThemeQuery.addListener) {
        systemThemeQuery.addListener(handleSystemThemeChange);
    }
}());
