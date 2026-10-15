// ==========================================
// Site Configuration - Easy to Maintain
// ==========================================

const SITES_CONFIG = {
    gallery: {
        url: 'https://gallery.patfang.xyz/',
        title: 'Gallery',
        description: '探索视觉作品集 · Explore visual collections',
        category: '视觉作品',
        badge: '推荐',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=400&q=80',
        featured: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        rating: 5.0
    },
    note: {
        url: 'https://note.patfang.xyz/',
        title: 'Notes',
        description: '阅读思考与记录 · Read thoughts and records',
        category: '笔记文档',
        badge: '热门',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80',
        featured: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
        rating: 5.0
    },
    photo: {
        url: 'https://photo.patfang.xyz/',
        title: 'Photos',
        description: '发现精彩瞬间 · Discover amazing moments',
        category: '摄影相册',
        badge: '新品',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1495510096568-254f3153c4c5?w=400&q=80',
        featured: 'https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=400&q=80',
        rating: 5.0
    }
    // Add more sites here following the same structure:
    // newsite: {
    //     url: 'https://newsite.patfang.xyz/',
    //     title: 'New Site',
    //     description: 'Site description',
    //     category: 'Category Name',
    //     badge: 'Badge Text',
    //     image: 'hero image URL',
    //     thumbnail: 'card thumbnail URL',
    //     featured: 'featured section image URL',
    //     rating: 5.0
    // }
};

// ==========================================
// DOM Elements
// ==========================================

const elements = {
    carouselTrack: document.getElementById('carouselTrack'),
    indicators: document.getElementById('indicators'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    appsGrid: document.getElementById('appsGrid'),
    navItems: document.querySelectorAll('.nav-item'),
    searchInput: document.querySelector('.search-input')
};

// ==========================================
// State Management
// ==========================================

let state = {
    currentSlide: 0,
    totalSlides: 0,
    autoPlayInterval: null,
    isTransitioning: false
};

// ==========================================
// Carousel Functionality
// ==========================================

function initCarousel() {
    const slides = elements.carouselTrack.querySelectorAll('.carousel-slide');
    state.totalSlides = slides.length;

    // Create indicators
    createIndicators();

    // Set up event listeners
    elements.prevBtn?.addEventListener('click', () => navigateCarousel(-1));
    elements.nextBtn?.addEventListener('click', () => navigateCarousel(1));

    // Click on slide button to navigate
    slides.forEach(slide => {
        const btn = slide.querySelector('.slide-btn');
        btn?.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = btn.dataset.url;
            if (url) {
                animateNavigation(url);
            }
        });
    });

    // Start autoplay
    startAutoPlay();

    // Pause on hover
    elements.carouselTrack?.addEventListener('mouseenter', stopAutoPlay);
    elements.carouselTrack?.addEventListener('mouseleave', startAutoPlay);
}

function createIndicators() {
    if (!elements.indicators) return;

    elements.indicators.innerHTML = '';

    for (let i = 0; i < state.totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(i));
        elements.indicators.appendChild(indicator);
    }
}

function navigateCarousel(direction) {
    if (state.isTransitioning) return;

    const newSlide = state.currentSlide + direction;

    if (newSlide < 0) {
        goToSlide(state.totalSlides - 1);
    } else if (newSlide >= state.totalSlides) {
        goToSlide(0);
    } else {
        goToSlide(newSlide);
    }
}

function goToSlide(index) {
    if (state.isTransitioning || index === state.currentSlide) return;

    state.isTransitioning = true;
    const slides = elements.carouselTrack.querySelectorAll('.carousel-slide');
    const indicators = elements.indicators?.querySelectorAll('.indicator');

    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    // Update indicators
    indicators?.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });

    state.currentSlide = index;

    setTimeout(() => {
        state.isTransitioning = false;
    }, 350);
}

function startAutoPlay() {
    stopAutoPlay();
    state.autoPlayInterval = setInterval(() => {
        navigateCarousel(1);
    }, 5000);
}

function stopAutoPlay() {
    if (state.autoPlayInterval) {
        clearInterval(state.autoPlayInterval);
        state.autoPlayInterval = null;
    }
}

// ==========================================
// Apps Grid Functionality
// ==========================================

function initAppsGrid() {
    // Recommended cards click handlers (now used as main app cards)
    const recommendedCards = document.querySelectorAll('.recommended-card:not(.placeholder)');
    recommendedCards.forEach(card => {
        card.addEventListener('click', function() {
            const url = this.dataset.url;
            if (url) {
                animateNavigation(url);
            }
        });
    });
}

// ==========================================
// Navigation Functionality
// ==========================================

function initNavigation() {
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;

            // Update active state
            elements.navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Handle section navigation
            handleSectionChange(section);
        });
    });
}

function handleSectionChange(section) {
    // You can add custom logic here for different sections
    // For now, just scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// Search Functionality
// ==========================================

function initSearch() {
    if (!elements.searchInput) return;

    elements.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        filterApps(query);
    });

    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(e.target.value);
        }
    });
}

function filterApps(query) {
    if (!query) {
        // Show all apps
        document.querySelectorAll('.recommended-card').forEach(card => {
            card.style.display = '';
        });
        return;
    }

    document.querySelectorAll('.recommended-card:not(.placeholder)').forEach(card => {
        const title = card.querySelector('h4')?.textContent.toLowerCase();
        const description = card.querySelector('p')?.textContent.toLowerCase();

        if (title?.includes(query) || description?.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function performSearch(query) {
    console.log('Searching for:', query);
    // You can implement more advanced search logic here
}

// ==========================================
// Animation & Navigation Helpers
// ==========================================

function animateNavigation(url) {
    // Add fade out animation
    document.body.style.opacity = '0.7';
    document.body.style.transform = 'scale(0.98)';
    document.body.style.transition = 'all 0.3s ease';

    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// ==========================================
// Keyboard Shortcuts
// ==========================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ignore if typing in search
        if (document.activeElement === elements.searchInput) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                navigateCarousel(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateCarousel(1);
                break;
            case '/':
                e.preventDefault();
                elements.searchInput?.focus();
                break;
            case 'Escape':
                elements.searchInput?.blur();
                break;
        }
    });
}

// ==========================================
// Responsive Behavior
// ==========================================

function handleResize() {
    // Add any responsive behavior here if needed
}

window.addEventListener('resize', debounce(handleResize, 250));

// ==========================================
// Utility Functions
// ==========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==========================================
// Initialization
// ==========================================

function init() {
    initCarousel();
    initAppsGrid();
    initNavigation();
    initSearch();
    initKeyboardShortcuts();

    // Add fade-in animation on load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);

    console.log('Portal initialized successfully!');
    console.log('Available sites:', Object.keys(SITES_CONFIG));
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==========================================
// Export for external use (if needed)
// ==========================================

window.PortalApp = {
    config: SITES_CONFIG,
    goToSlide,
    navigateCarousel,
    filterApps
};
