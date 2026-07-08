# memory.md

## [META] Last Updated
- Run ID: 629b4bc8-e412-468b-8f3e-5eb999703201 | Date: 2026-07-09 | Leader: Antigravity

## [TECH] Tech Stack
- Language: JavaScript / ES6 | Framework: Next.js (App Router, React 19) | DB: None | Test: None
- Build: `npm run build` | Test: None | Lint: `npm run lint`
- Key libs: tailwindcss (v4), postcss, react-icons

## [ARCH] Key Architecture Decisions
- **Next.js Transition**: Transitioned the portfolio site from Gatsby v2 to Next.js App Router.
- **Light Theme Migration**: Adjusted colors and theme variables to a modern light theme with high contrast, slate background, and clear section dividers.
- **Fixed Background Image**: Implemented a fixed background image using CSS pseudo-elements `body::before` and `body::after` in `globals.css` with a high-readability semi-transparent light gradient overlay. This achieves sleek visual depth without blocking user pointer events or compromising light-theme readability.
- **Alternating Timeline**: Experience timeline alternates left and right on desktop screens while falling back to left-aligned on mobile.
- **Static HTML Export**: Configured via `output: 'export'` and `unoptimized: true` in `next.config.mjs` to run on GitHub Pages.
- **GitHub Pages Deployment Workflows**:
  - **Mode A (deploy.yml)**: Deploy from the `gh-pages` branch using `peaceiris/actions-gh-pages@v4`. Push trigger disabled to avoid race conditions.
  - **Mode B (nextjs.yml)**: Deploy directly via GitHub Actions (`actions/deploy-pages@v5`). Active on push to `main` branch.

## [FILES] Key Files Map
| File | Purpose |
|---|---|
| `next.config.mjs` | Next.js configuration containing static HTML export settings. |
| `.github/workflows/nextjs.yml` | Recommended workflow for direct deployment via GitHub Actions. |
| `.github/workflows/deploy.yml` | Alternative workflow for deployment from the `gh-pages` branch. |
| `scripts/deploy.js` | Custom script to compile and push built assets to `gh-pages` branch. |
| `src/app/globals.css` | Global styles, typography, Tailwind v4 imports, and animations. |
| `src/data/portfolioData.js` | Static data loaded into components (Timeline, Projects, etc.). |
| `public/images/cover.jpeg` | Background image asset used for the fixed body background. |

## [DB] Recent Schema Changes
No database schema exists. Data is loaded statically.

## [API] API/Service Contracts
Static data model imports and GitHub API public repository list fetch endpoint.

## [GOTCHAS] Known Pitfalls & Lessons
- **[CRITICAL] Cache key glob segment**: In `@actions/glob`, standard `**/*.ext` must be used recursively. Root wildcards like `**.[jt]s` will not recurse subdirectories, leading to stale build cache.
- **[HIGH] Concurrent deployments**: Avoid having push triggers active in both `deploy.yml` and `nextjs.yml` to prevent race conditions on GitHub Pages environment.
- **[MEDIUM] Tailwind v4 Configuration**: PostCSS config is critical for correct compilation of CSS in Tailwind v4.
- **[MEDIUM] GitHub API Rate Limits**: Always keep static fallbacks for GitHub API calls because rate limits are easily hit on shared runners.

## [PERF] Performance Notes
- Next.js compilation cache (.next/cache) is saved and restored to speed up GitHub Actions builds.