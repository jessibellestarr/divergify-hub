# Divergify Hybrid Starter (Netlify + Koyeb + Supabase)

This repo is prewired for:
- Frontend on **Netlify**
- Always-on API on **Koyeb**
- Postgres/Auth on **Supabase**
- CI/CD via **GitHub Actions**

## Quickstart

1) Install CLIs (one-time):
   - GitHub CLI: https://cli.github.com/
   - Netlify CLI: `npm i -g netlify-cli`
   - Koyeb CLI: https://github.com/koyeb/cli#installation
   - Node 20+, Git

2) Create accounts (free):
   - Netlify, Koyeb, Supabase, GitHub

3) One-time manual setup (fast):
   - **Supabase**: create a project → copy **Project URL** and **Service Role**. In Supabase SQL Editor run `infra/db.sql`.
   - **Koyeb**: create API token. Create a new Service from **this repo**, branch `main`, buildpack, context `apps/api`. Set env vars `CRON_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`. Copy Service ID.
   - **Netlify**: new site from Git → publish folder `apps/frontend`. In Site settings → Env vars: set `API_BASE` (your Koyeb URL) and `CRON_SECRET`. Copy Site ID. Create a personal access token.

4) Put secrets in GitHub:
   - Repo → Settings → Secrets and variables → Actions → New secrets:
     - `NETLIFY_AUTH_TOKEN`
     - `NETLIFY_SITE_ID`
     - `KOYEB_API_TOKEN`
     - `KOYEB_SERVICE_ID`

5) Push a commit to `main`. The workflows will deploy frontend and API automatically.

## Local dev
- Frontend is static HTML placeholder in `apps/frontend/index.html`.
- API runs on Node/Express. To run locally:
  ```bash
  cd apps/api
  npm ci
  node server.js
  ```

## Rollback
- Netlify → Deploys → select previous → Publish deploy.
- Koyeb → Deployments → select previous → Rollback.

---
Security hygiene: never expose `SUPABASE_SERVICE_ROLE` to the browser; only store it on the server-side (Koyeb). Keep `CRON_SECRET` private. 
