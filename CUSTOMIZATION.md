# LoveScroll - Customization Guide

## Quick Start

1. **Edit `config.json`** - This is the only file you need to modify to personalize your website
2. **Add your photos** - Put images in `public/photos/`
3. **Add your music** - Put your song in `public/music/`
4. **Build and deploy** - Run `npm run build` and deploy to GitHub Pages

---

## Configuration Options

### Names
```json
"names": {
  "yourName": "Your Name",
  "partnerName": "Partner's Name"
}
```

### Colors
Choose your color scheme:
```json
"colors": {
  "primary": "#ff6b9d",      // Main accent color (pink)
  "secondary": "#c44569",    // Darker pink
  "accent": "#ffd93d",       // Gold/yellow accent
  "background": "#0a0a0f",   // Dark background
  "text": "#ffffff"          // Text color
}
```

### Messages
Personalize each section's message:
```json
"messages": [
  { "section": "hero", "text": "For Sarah, with love" },
  { "section": "heart", "text": "You hold my heart" },
  { "section": "memories", "text": "Every moment with you is a treasure" },
  { "section": "declaration", "text": "I love you more than words can say" },
  { "section": "finale", "text": "Forever yours" }
]
```

### Photos
Add your photos (place in `public/photos/`):
```json
"photos": [
  { "url": "/photos/your-photo.jpg", "caption": "A sweet caption" }
]
```

### Music
Add background music (place in `public/music/`):
```json
"music": {
  "url": "/music/your-song.mp3",
  "autoPlay": false,
  "title": "Our Song"
}
```

### Timing
Adjust animation settings:
```json
"timing": {
  "scrollSpeed": 1.0,
  "particleCount": 2000,
  "animationDuration": 1.5
}
```

---

## Deployment to GitHub Pages

1. Create a GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

3. Go to Repository Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://username.github.io/repo-name/`

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Features

- ✅ Scroll-based 3D animations
- ✅ Procedural particle systems
- ✅ Morphing geometries
- ✅ Customizable colors & messages
- ✅ Photo integration
- ✅ Background music player
- ✅ Mobile responsive
- ✅ Free hosting on GitHub Pages
