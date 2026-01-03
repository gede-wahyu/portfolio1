# developer-portfolio

> Personal portfolio website built with Next.js 15, Tailwind CSS, and Framer Motion.

## Overview

This is my personal developer portfolio showcasing professional experience and academic projects. The site features light/dark mode, smooth scroll animations, bento-box layout, and responsive design.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15 | React framework with App Router |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations and transitions |
| React Icons | 5 | Icon library |
| Inter | - | Typography (Google Fonts) |

## Quick Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout + theme initialization
│   ├── page.js            # Main page entry
│   └── globals.css        # Global styles + CSS variables
│
├── components/
│   ├── layout/            # Navbar, ThemeToggle
│   ├── sections/          # Hero, About, Projects, Skills, Contact
│   └── ui/                # Button, Badge, ProjectCard, ProjectModal
│
├── data/
│   ├── projects.js        # Professional & academic project data
│   └── skills.js          # Technology/skill categories
│
├── utils/
│   └── animations.js      # Framer Motion animation variants
│
└── public/images/         # Project screenshots and assets
```

## Key Files

### Content Management

- **`data/projects.js`** — Add/edit projects here. Contains `professionalProjects` and `academicProjects` arrays.
- **`data/skills.js`** — Technology categories displayed in Skills section.

### Styling

- **`app/globals.css`** — CSS variables for colors, spacing. Theme definitions here.
- **`tailwind.config.js`** — Custom colors (`light.*`, `dark.*`) and extended theme.

### Components

- **`components/sections/Hero.jsx`** — Name, tagline, intro text.
- **`components/sections/Contact.jsx`** — Email, GitHub, LinkedIn links.
- **`components/ui/ProjectModal.jsx`** — Project detail modal with image gallery.

## Notes

- Theme preference is stored in `localStorage` and respects system preference on first visit.
- Project images go in `public/images/projects/` — reference as `/images/projects/filename.png`.
- Animation variants are centralized in `utils/animations.js` for consistency.

## License

MIT
