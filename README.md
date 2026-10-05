# Pat's Gaming Hub

Modern personal website hub with Microsoft Fluent Design System aesthetics. Features acrylic materials, reveal effects, and smooth animations for an elegant, professional experience.

## 🎨 Design Philosophy

Inspired by:
- **Microsoft Fluent Design System** - Light, depth, motion, material, and scale
- **Acrylic Material** - Translucent textures with backdrop blur
- **Reveal Highlight** - Interactive light effects that follow your cursor
- **Xbox Dashboard** - Tile-based navigation structure
- **Windows 11** - Modern rounded corners and soft shadows

## 🌐 Current Sites

- **Gallery** - [gallery.patfang.xyz](https://gallery.patfang.xyz/) - Visual collections
- **Notes** - [note.patfang.xyz](https://note.patfang.xyz/) - Thoughts and records
- **Photos** - [photo.patfang.xyz](https://photo.patfang.xyz/) - Amazing moments

## 📁 Project Structure

```
pattianfang.github.io/
├── index.html          # Main entry point
├── css/
│   └── style.css      # All styles with Metro/Xbox theming
├── js/
│   └── app.js         # Interactive navigation logic
├── assets/            # Images and media (optional)
│   ├── images/
│   └── icons/
└── README.md          # This file
```

## 🎨 Color Palette

```css
/* Light & Refined */
--primary-green: #2d7a2e        /* Primary brand color */
--primary-green-light: #4a9d4b  /* Hover states */
--accent-soft: #7cb342          /* Accents and highlights */
--background-light: #fafafa     /* Page background */
--background-card: #ffffff      /* Card surfaces */
--text-primary: #1a1a1a         /* Main text */
--text-secondary: #666666       /* Secondary text */

/* Section Accents */
--accent-blue: #5b8dc9          /* Notes section */
--accent-orange: #e89a3c        /* Gallery section */
--accent-purple: #9575cd        /* Photos section */
```

## ✨ Features

**Fluent Design Elements:**
- **Acrylic Material** - Translucent surfaces with backdrop blur (60px) and saturation boost
- **Reveal Highlight** - Interactive glow that follows mouse movement on tiles
- **Depth & Layering** - Multi-layer shadow system following Fluent shadow tokens
- **Connected Animations** - Smooth, purposeful transitions between states
- **Image Carousel** - Auto-rotating hero images from Unsplash (6-second intervals)

**Interactive Features:**
- **Hover Previews** - Preview section content before clicking
- **Keyboard Navigation** - Arrow keys navigate, Enter/Space opens
- **Live Time Display** - Pill-style clock in top-right corner
- **Progress Indicator** - Animated bar with shimmer effect
- **Status Badge** - Live indicator with subtle pulse animation

**Visual Polish:**
- **Subtle Particles** - Canvas-based ambient particle system
- **Smooth Gradients** - Soft color transitions per section
- **Corner Frames** - Minimal HUD-style decorative elements
- **Responsive Design** - Adapts to desktop, tablet, and mobile
- **Accessibility** - Focus indicators, reduced motion support, high contrast mode

**Technical:**
- **Zero Dependencies** - Pure vanilla HTML/CSS/JS
- **Performance Optimized** - Hardware-accelerated animations
- **Modern CSS** - Backdrop filters, CSS custom properties, containment

## 🔧 Adding New Sites

### 1. Update JavaScript Configuration

Edit `js/app.js` and add your new site to the `sites` object:

```javascript
const sites = {
    // ... existing sites ...
    
    newsite: {
        url: 'https://newsite.patfang.xyz/',
        title: 'New Site',
        description: '网站描述 · Site description',
        color: '#hexcolor',  // Choose from palette
        slideIndex: 4  // Next available slide index
    }
};
```

### 2. Add Navigation Tile

In `index.html`, add a new button in the `<nav class="bottom-nav">` section:

```html
<button class="nav-tile" data-id="newsite" data-title="New Site" data-description="网站描述 · Site description">
    <div class="tile-glow"></div>
    <div class="tile-content">
        <div class="tile-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <!-- Add your SVG icon path here -->
                <path d="M..."/>
            </svg>
        </div>
        <span class="tile-label">New Site</span>
        <div class="tile-accent"></div>
    </div>
</button>
```

### 3. Add Carousel Image

In `index.html`, add a new slide in the carousel:

```html
<div class="carousel-slide" data-section="newsite">
    <img src="https://images.unsplash.com/photo-xxxxx?w=1920&q=80" alt="Description">
</div>
```

**Finding Images:**
- [Unsplash Abstract](https://unsplash.com/s/photos/abstract) - Free high-quality images
- Use `?w=1920&q=80` parameters for optimized loading
- Choose images that match your section's theme and color

## 🎯 Icon Resources

Find Material Design icons at:
- [Material Design Icons](https://fonts.google.com/icons)
- [Heroicons](https://heroicons.com/)
- [Feather Icons](https://feathericons.com/)

Copy SVG paths into the `<svg>` elements in your nav tiles.

## 🚀 Deployment

This is a GitHub Pages site. To deploy:

```bash
git add .
git commit -m "Update site"
git push origin master
```

Changes will be live at [https://patfang.xyz](https://patfang.xyz) within minutes.

## 🎨 Customization Tips

### Change Primary Color
Update `--xbox-green` in `css/style.css` to any color you prefer.

### Adjust Tile Size
Modify `.nav-tile` `aspect-ratio` and `max-width` properties.

### Change Animation Speed
Update transition variables:
```css
--transition-fast: 150ms
--transition-normal: 250ms
--transition-slow: 350ms
```

### Add Background Images
Replace gradient backgrounds with images:
```css
.hero-image[data-section="gallery"] {
    background: url('../assets/images/gallery-bg.jpg') center/cover;
}
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔗 Related Resources

**Fluent Design:**
- [Fluent Design System](https://docs.microsoft.com/windows/apps/design/style/acrylic) - Official Microsoft documentation
- [Acrylic Material](https://docs.microsoft.com/windows/apps/design/style/acrylic) - Translucent texture guide
- [Reveal Highlight](https://docs.microsoft.com/windows/apps/design/style/reveal) - Interactive lighting

**Images:**
- [Unsplash](https://unsplash.com/s/photos/abstract) - Free high-quality photos
- [Unsplash API](https://unsplash.com/developers) - Programmatic image access

**Design Inspiration:**
- [Microsoft Design](https://microsoft.design/) - Microsoft's design blog
- [Windows 11 Design](https://www.microsoft.com/design/fluent/) - Latest Fluent updates

## 📄 License

Personal use only.

---

**Built with**: Vanilla HTML/CSS/JS  
**Design inspiration**: Xbox, Metro UI, PlayStation 5  
**Last updated**: 2025
