# LoveScroll - 3D Scroll Animation Website for Partners

## Project Overview

**Project Name:** LoveScroll  
**Type:** Interactive scroll-based 3D animation website  
**Core Functionality:** A customizable, scroll-driven website with advanced procedural 3D animations for expressing love and affection to a partner  
**Target Users:** Boyfriends (and anyone) who want a creative, artistic way to express their feelings through technology

---

## Tech Stack Recommendation

### Core Framework
- **React 18+** with **Vite** - Modern, fast development experience
- **TypeScript** - Type safety and better developer experience
- **React Three Fiber (R3F)** - React renderer for Three.js, declarative 3D scenes
- **Three.js** - 3D rendering engine

### Animation Libraries
- **GSAP (GreenSock)** with ScrollTrigger - Industry-standard for scroll-based animations
- **Framer Motion** - Smooth UI transitions and micro-interactions
- **@react-three/drei** - Useful helpers for R3F (loaders, controls, effects)
- **@react-three/postprocessing** - Advanced visual effects (bloom, blur, etc.)

### Styling & Typography
- **CSS Modules** or **Styled-components** - Scoped styling
- **Google Fonts** - Curated romantic/elegant fonts

### Build & Deployment
- **Vite** - Fast builds and optimized production output
- **GitHub Pages** - Free hosting (static site output)

---

## Architecture

### Project Structure
```
/src
  /components
    /3d           # Three.js/R3F components
      Scene.tsx   # Main 3D scene manager
      Particles.tsx
      MorphingShape.tsx
      FloatingGeometries.tsx
    /ui           # HTML overlay components
      Section.tsx
      Message.tsx
      Photo.tsx
      MusicPlayer.tsx
  /hooks          # Custom hooks
    useScrollAnimation.ts
    useAudio.ts
  /config         # Configuration
    config.json   # User customization (EDIT THIS)
    ConfigContext.tsx
  /styles         # Global styles
    global.css
  /utils          # Utility functions
    animationUtils.ts
  App.tsx
  main.tsx
config.json       # The main config file users edit
```

### Scroll Section Concept
The website flows through multiple "scenes" as the user scrolls:

1. **Hero Section** - Title fades in with particle background
2. **Heart/Connection** - Morphing geometry forming heart shape
3. **Memories** - Photo carousel with floating 3D elements
4. **Timeline** - Key moments with animated milestones
5. **Declaration** - Large emotional message with particle explosion
6. **Finale** - Couple's photo with beautiful 3D flourish

---

## Feature Specifications

### 1. Configuration System (config.json)
All customization stored in a single JSON file:
```json
{
  "names": {
    "yourName": "Alex",
    "partnerName": "Sarah"
  },
  "colors": {
    "primary": "#ff6b9d",
    "secondary": "#c44569",
    "accent": "#ffd93d",
    "background": "#0a0a0f",
    "text": "#ffffff"
  },
  "fonts": {
    "heading": "Playfair Display",
    "body": "Inter"
  },
  "messages": [
    { "section": "hero", "text": "For Sarah, with love" },
    { "section": "declaration", "text": "Every moment with you..." }
  ],
  "photos": [
    { "url": "/photos/photo1.jpg", "caption": "Our first date" }
  ],
  "music": {
    "url": "/music/song.mp3",
    "autoPlay": false
  },
  "timing": {
    "scrollSpeed": 1.0,
    "animationDelays": {}
  }
}
```

### 2. 3D Animation Effects

**Particle Systems:**
- Floating particles responding to scroll position
- Heart-shaped particle formations
- Particle trails that follow cursor

**Morphing Geometries:**
- Shapes that transform based on scroll progress
- Heart formation from abstract shapes
- Smooth transitions between forms

**Floating Elements:**
- 3D geometric shapes floating in space
- Responsive to mouse movement
- Layered depth for 3D feel

**Post-Processing:**
- Bloom effects on bright elements
- Subtle chromatic aberration
- Depth of field for focus

### 3. Scroll System
- Smooth scroll behavior
- GSAP ScrollTrigger for precise animation timing
- Each section has entry/exit animations
- Progress-based animations (0-100% through section)

### 4. Audio/Music
- Background music support
- User-initiated play (respects browser autoplay policies)
- Volume controls
- Works with local files or URLs

### 5. Photo Integration
- Support for multiple photos
- Animated photo reveals
- Caption support
- Works with local files in /public folder

### 6. Responsive Design
- Mobile-optimized 3D scenes (reduced particles on mobile)
- Touch-friendly interactions
- Works on iOS Safari

---

## Build & Deployment

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
# Output in /dist folder
```

### GitHub Pages Deployment
1. Build the project (`npm run build`)
2. Upload contents of `/dist` to GitHub repository
3. Enable GitHub Pages in repository settings
4. Point to `main` branch (or `gh-pages` branch)
5. Website available at `username.github.io/repo-name`

### Vite Configuration for GitHub Pages
```javascript
// vite.config.ts
export default defineConfig({
  base: '/your-repo-name/', // Must match your GitHub repo name
  // ... other config
})
```

---

## Implementation Phases

### Phase 1: Foundation
- Set up React + Vite + TypeScript
- Configure Three.js and R3F
- Create basic scroll container
- Set up GSAP ScrollTrigger

### Phase 2: Core 3D Effects
- Build particle system
- Create morphing geometry components
- Add post-processing effects
- Connect scroll to 3D animation parameters

### Phase 3: Content & UI
- Build config system
- Add message sections
- Implement photo integration
- Create typography animations

### Phase 4: Audio & Polish
- Add music player
- Fine-tune animations
- Performance optimization
- Mobile testing

### Phase 5: Deployment
- Configure for GitHub Pages
- Test deployment
- Create documentation

---

## Performance Considerations

### Optimization Strategies
- Use instanced meshes for particles (thousands of particles with single draw call)
- Reduce particle count on mobile devices
- Use `dpr` (device pixel ratio) limiting for mobile
- Lazy load non-critical assets
- Use compressed textures where possible

### Target Performance
- 60 FPS on desktop
- 30+ FPS on mobile
- First contentful paint < 2 seconds
- Total bundle size < 2MB

---

## Customization Guide

Users will edit only `config.json` to personalize:

1. **Names** - Your name and partner's name
2. **Colors** - Full color scheme customization
3. **Fonts** - Choose from Google Fonts
4. **Messages** - Personalized text for each section
5. **Photos** - Add your photos to /public/photos/
6. **Music** - Add your song to /public/music/
7. **Timing** - Adjust scroll and animation speeds

---

## Why This Stack?

| Technology | Reason |
|------------|--------|
| React + Vite | Fast dev experience, great ecosystem |
| Three.js/R3F | Best-in-class WebGL, declarative API |
| GSAP ScrollTrigger | Most powerful scroll animation tool |
| TypeScript | Type safety for complex animations |
| GitHub Pages | Free hosting, simple deployment |

This stack provides:
- **Powerful 3D capabilities** - Create stunning visual effects
- **Scroll-driven storytelling** - Perfect for narrative love messages
- **Easy customization** - Non-developers can edit config file
- **Free hosting** - No ongoing costs
- **High performance** - Smooth 60fps animations
