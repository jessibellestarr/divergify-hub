# Divergify Automated Test Suite Add-on

This adds a minimal, no-drama e2e smoke test so platforms stop complaining: “tests not run (no automated test suite provided)”.

## Use
1) **Put these files at the repo root**, alongside the `/web` folder from the Master Kit.
   You should have: `package.json`, `playwright.config.ts`, `tests/e2e.spec.ts`, `.github/workflows/tests.yml`.
2) Install deps:
   ```bash
   npm i
   npx playwright install --with-deps
   ```
3) **Local run:**
   ```bash
   npx http-server ./web -p 4173 -s &
   npx playwright test
   ```
4) **CI:** The GitHub Actions workflow here (`.github/workflows/tests.yml`) starts a local server and runs the tests on every push/PR.

## What it checks
- Home loads and shows hero + notify form
- Divergipedia page renders entry cards from JSON
- Store page loads
- Thanks page shows the required “Done! / I’ve completed the NTL DEPLOY challenge!” text

If your site lives at another path in CI, set `BASE_URL` env accordingly.
