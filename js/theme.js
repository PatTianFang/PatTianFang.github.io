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

    applyTheme(getStoredTheme() || getSystemTheme());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createToggle);
    } else {
        createToggle();
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
