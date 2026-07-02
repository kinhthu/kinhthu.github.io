const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCmd(cmd, options = {}) {
  console.log(`Running: ${cmd}`);
  try {
    return execSync(cmd, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error executing command: ${cmd}`);
    process.exit(1);
  }
}

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const outDir = path.join(rootDir, 'out');

  // 1. Get git remote URL from parent project
  let remoteUrl;
  try {
    remoteUrl = execSync('git remote get-url origin', { cwd: rootDir }).toString().trim();
  } catch (error) {
    console.error('Failed to get git remote URL. Make sure this is a git repository.');
    process.exit(1);
  }
  console.log(`Target git remote: ${remoteUrl}`);

  // 2. Build the project
  console.log('Building Next.js project...');
  runCmd('npm run build', { cwd: rootDir });

  // 3. Make sure out/ exists
  if (!fs.existsSync(outDir)) {
    console.error(`Build directory "${outDir}" does not exist.`);
    process.exit(1);
  }

  // 4. Initialize git in out/ folder
  const gitDir = path.join(outDir, '.git');
  if (fs.existsSync(gitDir)) {
    console.log('Cleaning up existing git repo in build directory...');
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  runCmd('git init', { cwd: outDir });
  runCmd('git checkout -b gh-pages', { cwd: outDir });
  
  // Set git configurations for deployment (useful for CI environment)
  runCmd('git config user.name "GitHub Actions"', { cwd: outDir });
  runCmd('git config user.email "actions@github.com"', { cwd: outDir });

  // Create .nojekyll to prevent GitHub Pages Jekyll processing (critical for Next.js underscore folders like _next)
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

  runCmd('git add -A', { cwd: outDir });
  runCmd('git commit -m "Deploy to GitHub Pages [skip ci]"', { cwd: outDir });

  // Push to remote
  console.log(`Pushing built files to gh-pages branch on remote...`);
  runCmd(`git push -f "${remoteUrl}" gh-pages`, { cwd: outDir });

  console.log('Deployment completed successfully!');
}

main().catch(err => {
  console.error('Deployment failed:', err);
  process.exit(1);
});
