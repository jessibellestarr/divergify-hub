# Divergify Master Kit
Everything needed to ship Divergify assets today. Generated 2025-10-04.

## Folder Map
- `web/` — Static site (hero, Tin Foil Hat Mode, Divergipedia, store placeholder).
- `web/data/divergipedia.json` — Copy deck for Divergipedia entries.
- `branding/` — Brand guide + voice and copy bank.
- `legal/` — LLC checklist, privacy notice, terms draft.
- `app-specs/` — Product specs including Sidekick MVP.
- `automation/` — Runbook + deployment script.
- `.github/workflows/deploy.yml` — GitHub Pages automation.
- `prompts/` — Orchestrator prompts (reference only).

## Quick Launch (Netlify)
```bash
npm install -g netlify-cli
bash automation/ship.sh
```
The script opens Netlify login, then deploys `/web` to production.

## GitHub Pages Fallback
1. Push the repo to GitHub.
2. Enable GitHub Pages → “GitHub Actions.”
3. Workflow `.github/workflows/deploy.yml` uploads the `/web` folder and publishes the site.

## Divergipedia Updates
```bash
code web/data/divergipedia.json
# edit entries (title/description/optional tip)
```
Refresh `web/divergipedia.html` to see changes instantly.

## Tin Foil Hat Mode
On `web/index.html`, toggle the switch to hide the Netlify form and reveal offline signup instructions. Keep the copy aligned with `Tin Foil Hat Mode` promises in legal docs.

## Store Embeds
Edit `web/store.html` to paste either a Ko‑fi Shop link or a Printful/Printify iframe. Leave a fallback CTA if embeds fail.

## Support
Questions or tweaks? Start with `automation/runbook.md` for the exact sequence, or ping `hey@divergify.app` once the inbox is wired up.
