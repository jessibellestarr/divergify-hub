# Ship Runbook (One-Thing-At-A-Time)

0) **Grab the kit:** Download the ZIP from ChatGPT and unzip to a simple path (e.g., `~/Desktop/Divergify_Master_Kit`).

1) **Deploy on Netlify (no build):**
   ```bash
   # browser steps
   # 1. Visit https://app.netlify.com/sites
   # 2. Add new site → Deploy manually
   # 3. Drag the /web folder into the upload drop zone
   ```
   After deploy, open Netlify → Forms → enable notifications to `chaoscontrol@divergify.app`.

2) **If Netlify blocks you → GitHub Pages fallback:**
   ```bash
   # terminal
   gh repo create divergify-site --public --source . --remote origin --push
   ```
   Or do it manually:
   - Create a repo named `divergify-site`.
   - Upload the contents of `/web` (not the folder itself).
   - Enable Pages: Settings → Pages → Build and deployment → Source: `GitHub Actions`.
   - GitHub will run `.github/workflows/deploy.yml` and publish automatically.

3) **Tin Foil Hat Mode check:**
   - Open `/web/index.html` in a browser.
   - Toggle “Tin Foil Hat Mode.”
   - Confirm the Netlify form hides and the offline instructions card appears.

4) **Edit Divergipedia:**
   ```bash
   code web/data/divergipedia.json
   ```
   - Add entries with `title`, `description`, optional `tip`.
   - Save and refresh `divergipedia.html`. No build step.
   - See `web/data/README.md` for format reminders.

5) **Customize store embed:**
   - Open `/web/store.html`.
   - Replace the `<div id="store-embed">` block with either a Ko‑fi link or provider iframe.
   - Keep a plain CTA button as fallback if embeds misbehave.

6) **Deploy via script (optional Netlify CLI):**
   ```bash
   npm install -g netlify-cli
   bash automation/ship.sh
   ```
   Follow the CLI prompts; it will log in and deploy `/web` to production.

7) **CI/CD via GitHub Pages:**
   - Push the repo to GitHub.
   - Ensure the Pages workflow (`.github/workflows/deploy.yml`) is enabled.
   - First run may require approving the workflow in the Actions tab.

8) **Backups:**
   ```bash
   zip -r Divergify_Master_Kit_backup.zip Divergify_Master_Kit
   ```
   Sync that ZIP to cloud + USB.
