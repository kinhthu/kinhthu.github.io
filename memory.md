# Project Memory - Portfolio Rebuild (Next.js + Tailwind v4)

## Last Updated
2026-07-09

## Tech Stack
- Next.js (App Router, React 19)
- Tailwind CSS v4 (Light theme, Indigo/Cyan accents, light glassmorphism)
- Node.js (Unit test suite execution)

## Key Architecture Decisions
- **Next.js Transition**: Transitioned the portfolio site from Gatsby v2 to Next.js App Router.
- **Light Theme Migration**: Adjusted colors and theme variables to a modern light theme with high contrast, slate background, and clear section dividers.
- **Alternating Timeline**: Experience timeline alternates left and right on desktop screens while falling back to left-aligned on mobile.
- **Design Tokens**: Standardized CSS variables and Tailwind classes.

## Key Files Map
- `src/app/globals.css`: Contains CSS rules, design tokens, variables, and animations.
- `src/components/Timeline.js`: Interactive experience timeline component.
- `src/components/About.js`: Biography and quick stats component.
- `src/components/Hero.js`: Hero section and typing animation.
- `src/components/Projects.js`: Portfolio and GitHub repos section.
- `src/components/Header.js`: Navigation header.
- `src/components/Footer.js`: Footer section.

## Recent Schema Changes
No database schema exists. Static data is loaded from `src/data/portfolioData.js`.

## API Contracts
Static data model imports and GitHub API public repository list fetch endpoint.

## Pitfalls & Lessons
- **Tailwind v4 Configuration**: PostCSS config is critical for correct compilation of CSS in Tailwind v4.
- **GitHub API Rate Limits**: Always keep static fallbacks for GitHub API calls because rate limits are easily hit on shared runners.

## 4. UI/UX Specifications

- **Theme**: Premium Bright/Light Theme (#f8fafc canvas, #ffffff cards with fine border highlights and light glassmorphism styling).
- **Interactive States**:
  - Desktop-sticky header with active scroll highlighting.
  - Hover effects on cards (scale transitions, outline highlights).
  - CSS Keyframe custom Typing Animation in the Hero component.
- **Responsive Layout**: Designed mobile-first using Tailwind flex/grid layout helpers to adapt cleanly to Mobile, Tablet, and Desktop screen widths.


## 5. Build and Custom Deployment

- **Static HTML Export**:
  - Configured via output: 'export' in 
ext.config.mjs.
  - Configured images: { unoptimized: true } to bypass the Next.js production image optimizer requirement since the output needs to run as static HTML on GitHub Pages.
- **Production Build**: Compiles successfully using 
pm run build resulting in HTML/JS/CSS assets written to the out/ directory.

## 6. Lessons Learned & Guidelines

1. **Tailwind CSS v4 Configuration**: Tailwind v4 uses @import 'tailwindcss'; in CSS and PostCSS config instead of the legacy 	ailwind.config.js template list files. Ensure correct PostCSS config to build CSS correctly.
2. **Dynamic GitHub API**: Always keep local static fallbacks for GitHub API calls because anonymous requests on shared server runners easily hit the 60 requests/hour rate limit.
3. **Static Output**: With static HTML exports, client-side routing and relative assets must be clean, and Next.js Image component optimization must be deactivated (unoptimized: true).