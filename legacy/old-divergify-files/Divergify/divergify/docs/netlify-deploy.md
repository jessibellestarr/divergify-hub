# Netlify Deployment Notes

## Build Command
Use `npm run build:web`. This wraps `expo export --platform web` and emits static assets into `dist/`.

## Publish Directory
Set the Netlify publish directory to `dist/`. The folder is generated on build and ignored by git.

## Environment Variables
If you introduce runtime environment variables for the web bundle, add them to Netlify via the UI or CLI and load them through Expo's `app.config.ts` or an `.env` file processed at build time. Avoid checking secrets into the repo.

## Redirects & SPA Support
Expo exports a static `index.html` and `200.html` suited for single-page apps. Netlify should detect the SPA automatically; if you need custom redirects, add a `_redirects` file inside `public/` or configure `netlify.toml`.

## Caching
Netlify caches `node_modules` across builds. If the cache ever causes issues after SDK upgrades, clear the build cache from the Netlify UI before re-running.
