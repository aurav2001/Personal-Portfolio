# Gaurav's Portfolio

A modern, high-performance portfolio website built with React, featuring an interactive wavy particle background and premium design aesthetics.

## Features

- **Floating Pill Navigation** - Compact, modern navbar that maximizes screen real estate
- **High-End Minimalist UI** - "From scratch" redesign with magazine-style layouts and bento grids
- **Premium Animations** - Staggered scroll reveals, focus gallery effects, and parallax
- **Performance Optimized** - Implemented Route-based Lazy Loading and Suspense
- **Fully Responsive** - Asymmetric layouts that adapt perfectly to mobile
- **Custom Design System** - Built with vanilla CSS variables for a consistent brand language

## Tech Stack

- **Frontend Framework:** React 19.2.0
- **Routing:** React Router DOM 7.9.4
- **Performance:** React.lazy, Suspense, IntersectionObserver
- **Styling:** Vanilla CSS (BEM-ish architecture)
- **Animations:** Custom hooks (`useScrollReveal`, `useParallax`), Canvas API
- **Fonts:** Google Fonts (Outfit)
- **Build Tool:** Create React App

## Design Highlights

- **Light Theme:** Clean white aesthetics with high readability
- **Wavy Particle Background:** Subtle, interactive particles on light background
- **Soft Shadows:** Modern shadow system for depth
- **Color Palette:** HSL-based color system with vibrant gradients (primary purple #b415ff, accent orange #ff8534) contrasting against white
- **Typography:** Custom font sizing with clamp() for fluid responsiveness
- **Animations:** Micro-interactions, scroll reveals, and smooth transitions throughout

## Project Structure

```
Personal-Portfolio/
├── public/
│   └── index.html
├── src/
│   ├── Components/
│   │   ├── WavyBackground/    # Particle background component
│   │   ├── Hero/              # Landing section
│   │   ├── Navbar/            # Navigation with glassmorphism
│   │   ├── About/             # About section with skills
│   │   ├── Services/          # Services showcase
│   │   ├── MyWork/            # Portfolio projects
│   │   ├── contact/           # Contact form
│   │   └── Footer/            # Footer section
│   ├── assets/                # Images and static files
│   ├── App.jsx                # Main app component
│   └── index.css              # Design system & global styles
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Personal-Portfolio.git
cd Personal-Portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

## Key Components

### WavyBackground
Interactive particle system using Canvas API with:
- Mouse-following particles
- Connection lines between nearby particles  
- Optimized rendering with requestAnimationFrame
- Responsive particle count based on screen size

### Design System (index.css)
Comprehensive CSS custom properties for:
- Color palette (HSL-based)
- Spacing scale (4px base unit)
- Border radius scale
- Shadow system
- Animation utilities
- Typography scale

### Responsive Design
Mobile-first approach with breakpoints:
- 480px (mobile)
- 768px (tablet)
- 992px (small desktop)  
- 1200px+ (large desktop)

## Performance Optimizations

- Canvas API for efficient particle rendering
- CSS transform animations for GPU acceleration
- Lazy loading for images
- Optimized IntersectionObserver for scroll animations
- Minimal re-renders with proper React patterns

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

- Design inspired by modern portfolio trends and Antigravity website
- Icons and images: Custom assets
- Fonts: Google Fonts (Outfit)

## Contact

For any inquiries, reach out via the contact form on the website or email: pandeygaurav9801@gmail.com

---

**Built with ❤️ by Gaurav Pandey**
