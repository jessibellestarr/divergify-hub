# Ship Runbook (One-Thing-At-A-Time)
0) **Download the ZIP** from ChatGPT. Unzip it somewhere simple (like Desktop).

1) **Deploy on Netlify (no build):**
   - Go to app.netlify.com → "Add new site" → "Deploy manually".
   - Drag the `/web` folder into the drop area.
   - Once live, go to Forms → enable notifications to chaoscontrol@divergify.app.

2) **If Netlify fights you → GitHub Pages fallback:**
   - Create a new repo `divergify-site`.
   - Upload the contents of `/web` (not the folder itself).
   - Settings → Pages → Source: `main` → `/root`. Wait ~2 minutes.

3) **Edit Divergipedia:**
   - Open `/web/data/divergipedia.json`. Add entries as objects with `title` and `description`.
   - Refresh the page—no build needed.

4) **Store options:**
   - Ko‑fi: Create products → copy Shop link → paste into `/web/store.html`.
   - Printful/Printify: paste their embed iframe into `/web/store.html` (providers show embed code).

5) **Customize brand:**
   - Replace `/web/logo.svg` with your preferred logo version if desired.
   - Edit colors in `/web/styles.css` (#2FB3FF and #39E75F are primary).

6) **Automate later:**
   - Use `automation/ship.sh` after installing Netlify CLI: `npm i -g netlify-cli`
   - Then: `netlify login` → `netlify deploy --dir=web --prod`

7) **Keep This Kit Safe:**
   - Zip the whole folder as “Divergify_Master_Kit.zip” and stash it in your cloud + USB.
