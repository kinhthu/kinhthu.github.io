# Tasks List

- [x] Task 1: Verify and configure Next.js static build for GitHub Pages
  - Description: Validate static HTML export settings in next.config.mjs. Run npm run build and verify compiled assets.
  - Acceptance Criteria: npm run build successfully creates output under out/ directory with static assets.
  - DependsOn: []

- [x] Task 2: Setup and unify GitHub Actions workflow for Pages deployment
  - Description: Check nextjs.yml and deploy.yml. Retain or optimize the workflows, ensuring proper configuration for username.github.io.
  - Acceptance Criteria: A valid GitHub Actions workflow file exists in `.github/workflows/nextjs.yml` or similar.
  - DependsOn: [1]

- [x] Task 3: Validate Git workspace cleanliness and commit changes
  - Description: Run final checks. Verify git status and commit all changes using Conventional Commits.
  - Acceptance Criteria: git status is clean and changes are committed.
  - DependsOn: [2]
