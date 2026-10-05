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
const heroTitle = heroSection.querySelector('.hero-title .glitch');
const heroDescription = heroSection.querySelector('.hero-description');
const progressFill = heroSection.querySelector('.progress-fill');
const navTiles = document.querySelectorAll('.nav-tile');
const timeDisplay = document.getElementById('timeDisplay');
const particleCanvas = document.getElementById('particleCanvas');

// State
let currentSection = 'home';
let isAnimating = false;
let particleContext = null;
let particles = [];

// Particle System
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.life = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.001;

        if (this.life <= 0 || this.x < 0 || this.x > this.canvas.width ||
            this.y < 0 || this.y > this.canvas.height) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity * this.life;
        ctx.fillStyle = currentSection === 'gallery' ? '#ff8c00' :
                        currentSection === 'note' ? '#0078d4' :
                        currentSection === 'photo' ? '#b146c2' : '#9bf00b';
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

    // Create particles
    const particleCount = Math.min(100, Math.floor((particleCanvas.width * particleCanvas.height) / 10000));
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

    // Update time
    updateTime();
    setInterval(updateTime, 1000);

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

    // Glitch effect on title occasionally
    setInterval(() => {
        if (Math.random() > 0.95) {
            heroTitle.style.animation = 'none';
            setTimeout(() => {
                heroTitle.style.animation = '';
            }, 50);
        }
    }, 3000);
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
        heroTitle.style.transform = 'translateY(20px)';
        heroDescription.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Update content
            heroTitle.textContent = site.title;
            heroTitle.setAttribute('data-text', site.title);
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
        heroTitle.setAttribute('data-text', site.title);
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
