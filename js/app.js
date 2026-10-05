// Site Configuration
const sites = {
    gallery: {
        url: 'https://gallery.patfang.xyz/',
        title: 'Gallery',
        description: '探索视觉作品集 · Explore visual collections',
        color: '#ff8c00'
    },
    note: {
        url: 'https://note.patfang.xyz/',
        title: 'Notes',
        description: '阅读思考与记录 · Read thoughts and records',
        color: '#0078d4'
    },
    photo: {
        url: 'https://photo.patfang.xyz/',
        title: 'Photos',
        description: '发现精彩瞬间 · Discover amazing moments',
        color: '#b146c2'
    },
    home: {
        title: 'Welcome',
        description: 'Select a destination below',
        color: '#107c10'
    }
};

// DOM Elements
const heroSection = document.getElementById('heroSection');
const heroImage = heroSection.querySelector('.hero-image');
const heroTitle = heroSection.querySelector('.hero-title');
const heroDescription = heroSection.querySelector('.hero-description');
const navTiles = document.querySelectorAll('.nav-tile');

// State
let currentSection = 'home';
let isAnimating = false;

// Initialize
function init() {
    // Add click handlers to nav tiles
    navTiles.forEach(tile => {
        tile.addEventListener('click', handleTileClick);

        // Hover preview
        tile.addEventListener('mouseenter', handleTileHover);
        tile.addEventListener('mouseleave', handleTileLeave);
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Initial animation
    setTimeout(() => {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 100);
}

// Handle tile click
function handleTileClick(e) {
    if (isAnimating) return;

    const tile = e.currentTarget;
    const sectionId = tile.dataset.id;

    // If clicking the same section, navigate to URL
    if (sectionId === currentSection && sites[sectionId].url) {
        window.location.href = sites[sectionId].url;
        return;
    }

    // Update section
    updateSection(sectionId);
}

// Handle tile hover (preview)
function handleTileHover(e) {
    if (isAnimating) return;

    const tile = e.currentTarget;
    const sectionId = tile.dataset.id;

    if (sectionId !== currentSection) {
        previewSection(sectionId);
    }
}

// Handle tile leave
function handleTileLeave(e) {
    if (isAnimating) return;

    const tile = e.currentTarget;
    const sectionId = tile.dataset.id;

    if (sectionId !== currentSection) {
        // Return to current section
        updateHeroContent(currentSection, false);
    }
}

// Preview section on hover
function previewSection(sectionId) {
    const site = sites[sectionId];
    if (!site) return;

    // Update hero content without changing active state
    heroTitle.textContent = site.title;
    heroDescription.textContent = site.description;
    heroImage.setAttribute('data-section', sectionId);
}

// Update section
function updateSection(sectionId) {
    if (sectionId === currentSection) return;

    isAnimating = true;

    // Update active tile
    navTiles.forEach(tile => {
        tile.classList.remove('active');
        if (tile.dataset.id === sectionId) {
            tile.classList.add('active');
        }
    });

    // Update hero with animation
    updateHeroContent(sectionId, true);

    currentSection = sectionId;

    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

// Update hero content
function updateHeroContent(sectionId, animate = true) {
    const site = sites[sectionId];
    if (!site) return;

    if (animate) {
        // Fade out
        heroTitle.style.opacity = '0';
        heroDescription.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroDescription.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Update content
            heroTitle.textContent = site.title;
            heroDescription.textContent = site.description;
            heroImage.setAttribute('data-section', sectionId);

            // Fade in
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroDescription.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
                heroDescription.style.transform = 'translateY(0)';
            }, 50);
        }, 250);
    } else {
        // Update without animation
        heroTitle.textContent = site.title;
        heroDescription.textContent = site.description;
        heroImage.setAttribute('data-section', sectionId);
    }
}

// Keyboard navigation
function handleKeyPress(e) {
    if (isAnimating) return;

    const tiles = Array.from(navTiles);
    const currentIndex = tiles.findIndex(tile => tile.dataset.id === currentSection);

    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            if (currentIndex > 0) {
                updateSection(tiles[currentIndex - 1].dataset.id);
            }
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (currentIndex < tiles.length - 1) {
                updateSection(tiles[currentIndex + 1].dataset.id);
            }
            break;
        case 'Enter':
            e.preventDefault();
            if (sites[currentSection].url) {
                window.location.href = sites[currentSection].url;
            }
            break;
    }
}

// Add transition styles
heroTitle.style.transition = 'opacity 250ms ease, transform 250ms ease';
heroDescription.style.transition = 'opacity 250ms ease, transform 250ms ease';
heroSection.style.transition = 'opacity 500ms ease, transform 500ms ease';
heroSection.style.opacity = '0';
heroSection.style.transform = 'translateY(20px)';

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
