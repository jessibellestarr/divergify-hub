# Divergify Hub

Single home for every Divergify asset so nothing’s scattered across Downloads/Desktop anymore. Main structure:

- `active-site/website` – the current Tailwind site (Divergify hero + Dopamine Depot store, beta app, Printful integration). Deploy from here.
- `apps/` – app repos and experiments (`divergify`, `divergify-beta`). Each still has its internal structure untouched.
- `archives/` – every Divergify-branded ZIP/RAR pulled from Downloads/Desktop/Archives. Use this as the cold storage for previous site drops.
- `docs/` – legal + onboarding files, installer HTML, ICS calendar. Add new reference docs here.
- `legacy/` – old bulk folders (`Divergify live`, `old divergify files`, `.divergify-devops`). Nothing deleted, just corralled.
- `scripts/` – automation helpers (right now `divergify-devops-setup.sh`).
- `branding/` – empty placeholder for future brand packs if needed.

## Next steps
1. Update API keys inside `active-site/website/index.html` (Printful already in place; still need Google Maps).
2. Run `bash setup.sh` inside `active-site/website` once you’re ready to push to GitHub.
3. Keep new Divergify assets inside this hub so everything stays organized.
