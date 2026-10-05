# Pat's Gaming Hub

Next-gen gaming console-style personal website hub with immersive Metro/Xbox aesthetic. A futuristic dashboard interface with animated particles, neon glows, and sci-fi effects.

## 🎮 Design Philosophy

Inspired by:
- **Xbox Dashboard** - Hard-edged tiles, 0px corners, glanceable navigation
- **Windows 8 Metro UI** - Typography-focused, content before chrome, flat design
- **PlayStation 5 UI** - Large interactive cards, content front and center
- **Gaming UI Elements** - Neon glows, particle systems, scan lines, HUD-style accents

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
--xbox-green: #107c10        /* Primary brand color */
--gamepass-lime: #9bf00b     /* Neon accent highlights */
--neon-cyan: #00f0ff         /* Cyberpunk cyan glow */
--neon-pink: #ff00ff         /* Glitch effect accent */
--neon-orange: #ff6600       /* Energy effects */
--accent-blue: #0078d4       /* Notes section */
--accent-orange: #ff8c00     /* Gallery section */
--accent-purple: #b146c2     /* Photos section */
--background-dark: #000000   /* Pure black background */
--background-card: #0d0d0d   /* Tile background */
```

## ✨ Features

- **Immersive Animations** - Floating particles, animated grid overlay, glowing orbs
- **Neon Aesthetics** - Cyberpunk-inspired glows, scan lines, corner frames
- **Interactive Tiles** - Hover effects with glow pulses, 3D transforms
- **Particle System** - Canvas-based dynamic particles that change color per section
- **HUD Elements** - Live time display, status indicators, progress bars
- **Glitch Effects** - Subtle text glitches for gaming atmosphere
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Keyboard Navigation** - Arrow keys to navigate, Enter/Space to open
- **Hover Previews** - Preview section info before clicking
- **Accessibility** - Focus indicators, reduced motion support, high contrast mode
- **Performance Optimized** - Hardware-accelerated animations, efficient rendering
- **Zero Dependencies** - Pure vanilla HTML/CSS/JS

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
        color: '#hexcolor'  // Choose from palette or custom
    }
};
```

### 2. Add Navigation Tile

In `index.html`, add a new button in the `<nav class="bottom-nav">` section:

```html
<button class="nav-tile" data-id="newsite" data-title="New Site" data-description="网站描述 · Site description">
    <div class="tile-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
            <!-- Add your SVG icon path here -->
            <path d="M..."/>
        </svg>
    </div>
    <span class="tile-label">New Site</span>
</button>
```

### 3. Add Background Gradient (Optional)

In `css/style.css`, add a gradient style for your section:

```css
.hero-image[data-section="newsite"] {
    background: linear-gradient(135deg, #yourcolor 0%, #darkercolor 50%, #1a1a1a 100%);
}
```

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

- [Metro Design Principles](https://medium.com/mossyblog/the-principles-of-microsoft-metro-ui-decoded-e52fa8bf9f4c)
- [Xbox Design System](https://www.shadcn.io/design/xbox)
- [PS5 UI Breakdown](https://www.digitalfoundry.net/articles/digitalfoundry-2020-a-first-look-at-the-ps5-user-interface)

## 📄 License

Personal use only.

---

**Built with**: Vanilla HTML/CSS/JS  
**Design inspiration**: Xbox, Metro UI, PlayStation 5  
**Last updated**: 2025
