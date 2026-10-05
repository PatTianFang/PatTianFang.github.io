// Site Configuration
const sites = {
    gallery: {
        url: 'https://gallery.patfang.xyz/',
        title: 'Gallery',
        description: '探索视觉作品集 · Explore visual collections',
        color: '#e89a3c',
        slideIndex: 1
    },
    note: {
        url: 'https://note.patfang.xyz/',
        title: 'Notes',
        description: '阅读思考与记录 · Read thoughts and records',
        color: '#5b8dc9',
        slideIndex: 2
    },
    photo: {
        url: 'https://photo.patfang.xyz/',
        title: 'Photos',
        description: '发现精彩瞬间 · Discover amazing moments',
        color: '#9575cd',
        slideIndex: 3
    },
    home: {
        title: 'Welcome',
        description: 'Select a destination below',
        color: '#7cb342',
        slideIndex: 0
    }
};

// DOM Elements
const heroSection = document.getElementById('heroSection');
const heroImage = heroSection.querySelector('.hero-image');
const heroTitle = heroSection.querySelector('.hero-title .glitch');
const heroDescription = heroSection.querySelector('.hero-description');
const progressFill = heroSection.querySelector('.progress-fill');
const navTiles = document.querySelectorAll('.nav-tile');
const timeDisplay = document.getElementById('timeDisplay');
const particleCanvas = document.getElementById('particleCanvas');
const carouselSlides = document.querySelectorAll('.carousel-slide');

// State
let currentSection = 'home';
let isAnimating = false;
let particleContext = null;
let particles = [];
let autoSlideInterval = null;

// Carousel Management
function showSlide(index) {
    carouselSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function startAutoSlide() {
    // Auto-rotate slides every 6 seconds
    if (autoSlideInterval) clearInterval(autoSlideInterval);

    autoSlideInterval = setInterval(() => {
        const site = sites[currentSection];
        if (site) {
            showSlide(site.slideIndex);
        }
    }, 6000);
}

// Fluent Reveal Effect
function initRevealEffect() {
    navTiles.forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            tile.style.setProperty('--mouse-x', `${x}px`);
            tile.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Particle System
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.life = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.0005;

        if (this.life <= 0 || this.x < 0 || this.x > this.canvas.width ||
            this.y < 0 || this.y > this.canvas.height) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity * this.life;

        // Softer colors for light theme
        ctx.fillStyle = currentSection === 'gallery' ? '#e89a3c' :
                        currentSection === 'note' ? '#5b8dc9' :
                        currentSection === 'photo' ? '#9575cd' : '#7cb342';

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    if (!particleCanvas) return;

    particleCanvas.width = particleCanvas.offsetWidth;
    particleCanvas.height = particleCanvas.offsetHeight;
    particleContext = particleCanvas.getContext('2d');

    // Fewer particles for subtle effect
    const particleCount = Math.min(50, Math.floor((particleCanvas.width * particleCanvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(particleCanvas));
    }

    animateParticles();
}

function animateParticles() {
    if (!particleContext) return;

    particleContext.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw(particleContext);
    });

    requestAnimationFrame(animateParticles);
}

// Time Display
function updateTime() {
    if (!timeDisplay) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Initialize
function init() {
    // Initialize particles
    initParticles();

    // Initialize Fluent reveal effect
    initRevealEffect();

    // Update time
    updateTime();
    setInterval(updateTime, 1000);

    // Start carousel auto-rotation
    startAutoSlide();

    // Add click handlers to nav tiles
    navTiles.forEach(tile => {
        tile.addEventListener('click', handleTileClick);
        tile.addEventListener('mouseenter', handleTileHover);
        tile.addEventListener('mouseleave', handleTileLeave);
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Window resize handler
    window.addEventListener('resize', () => {
        if (particleCanvas) {
            particleCanvas.width = particleCanvas.offsetWidth;
            particleCanvas.height = particleCanvas.offsetHeight;
        }
    });

    // Initial animation
    setTimeout(() => {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
        if (progressFill) {
            progressFill.style.width = '100%';
        }
    }, 100);
}

// Handle tile click
function handleTileClick(e) {
    if (isAnimating) return;

    const tile = e.currentTarget;
    const sectionId = tile.dataset.id;

    // If clicking the same section, navigate to URL
    if (sectionId === currentSection && sites[sectionId].url) {
        // Animate out
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'scale(0.95)';

        setTimeout(() => {
            window.location.href = sites[sectionId].url;
        }, 300);
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
        updateHeroContent(currentSection, false);
    }
}

// Preview section on hover
function previewSection(sectionId) {
    const site = sites[sectionId];
    if (!site) return;

    heroTitle.textContent = site.title;
    heroTitle.setAttribute('data-text', site.title);
    heroDescription.textContent = site.description;

    // Change carousel slide
    if (site.slideIndex !== undefined) {
        showSlide(site.slideIndex);
    }
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

    // Update carousel
    const site = sites[sectionId];
    if (site && site.slideIndex !== undefined) {
        showSlide(site.slideIndex);
    }

    // Reset progress bar
    if (progressFill) {
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.width = '100%';
        }, 100);
    }

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
        heroTitle.style.transform = 'translateY(10px)';
        heroDescription.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Update content
            heroTitle.textContent = site.title;
            heroTitle.setAttribute('data-text', site.title);
            heroDescription.textContent = site.description;

            // Fade in
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroDescription.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
                heroDescription.style.transform = 'translateY(0)';
            }, 50);
        }, 200);
    } else {
        // Update without animation
        heroTitle.textContent = site.title;
        heroTitle.setAttribute('data-text', site.title);
        heroDescription.textContent = site.description;
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
        case ' ':
            e.preventDefault();
            if (sites[currentSection].url) {
                heroSection.style.opacity = '0';
                heroSection.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = sites[currentSection].url;
                }, 300);
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
