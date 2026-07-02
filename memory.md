# Project Memory - Portfolio Rebuild (Next.js + Tailwind v4)

This file documents the architecture, database/data contracts, APIs, build configuration, and lessons learned from rebuilding the portfolio website.

## 1. Project Structure

The project was rebuilt from Gatsby v2 to Next.js App Router using React 19 and Tailwind CSS v4.

`
D:\workspace\wt-d4cb3a31912044bdb7fd7ae3cab0c7a9
├── .agents/
│   └── mcp_config.json      # Control plane configuration
├── public/
│   └── images/              # Static image assets (avatar.png, cover.jpeg)
├── src/
│   ├── app/
│   │   ├── layout.js        # Root layout, Inter font, metadata configuration
│   │   ├── globals.css      # Tailwind directives & CSS variable definitions
│   │   └── page.js          # Main single-page portfolio layout assembling all components
│   ├── components/          # Reusable presentation components
│   │   ├── Header.js        # Sticky header with active section highlighting
│   │   ├── Footer.js        # Standard copyright and social links
│   │   ├── Hero.js          # Hero introduction with a custom typing animation
│   │   ├── About.js         # Text biography segment
│   │   ├── Timeline.js      # Interactive experience timeline
│   │   ├── Skills.js        # Tech stack grid with interactive badges
│   │   └── Projects.js      # Projects grid with dynamic GitHub API integration & static fallback
│   └── data/
│       └── portfolioData.js # Main static portfolio dataset (ES6 module)
├── next.config.mjs           # Next.js config (configured for static export)
├── postcss.config.mjs        # PostCSS configuration for Tailwind CSS v4
├── tailwind.config.js       # Tailwind configuration file
├── jsconfig.json            # Path alias configs (@/* maps to src/*)
└── eslint.config.mjs        # ESLint configuration
`

## 2. Data Contract (portfolioData.js)

All static data (bio, jobs, skills, social links) is exported from src/data/portfolioData.js as an ES6 module:
- githubUsername: String used to query the GitHub API.
- skills: Array of { name, level } to map to badge rendering.
- jobs: Array of { company, begin, duration, occupation, description } representing experience history.
- social: Object mapping profiles (Twitter, LinkedIn, GitHub, email) to URLs.

## 3. API Integrations

### GitHub API integration (Projects.js)
- **Endpoint**: https://api.github.com/users/{username}/repos?sort=updated&per_page=30
- **Logic**: Filters out forked repositories, sorts by stargazers count descending, and displays the top 6 repos.
- **Robust Fallback**: If the API request fails (due to network issues or GitHub API Rate Limiting), it automatically falls back to rendering a hardcoded array of curated projects (allbackRepos) with a graceful debug console log.

## 4. UI/UX Specifications

- **Theme**: Premium Dark Theme (#0b0f19 canvas, #1e293b cards with fine border highlights and glassmorphism styling).
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