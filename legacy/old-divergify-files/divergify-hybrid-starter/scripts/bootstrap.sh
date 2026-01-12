#!/usr/bin/env bash
set -euo pipefail

echo ">>> Divergify bootstrap starting"

# Checks
command -v git >/dev/null || { echo "git required"; exit 1; }
command -v gh >/dev/null || { echo "GitHub CLI 'gh' required"; exit 1; }

# Inputs
read -rp "GitHub repo name (e.g., youruser/divergify): " GH_REPO
read -rp "Netlify Site ID: " NETLIFY_SITE_ID
read -rp "Netlify Personal Access Token: " NETLIFY_AUTH_TOKEN
read -rp "Koyeb API Token: " KOYEB_API_TOKEN
read -rp "Koyeb Service ID: " KOYEB_SERVICE_ID

# Optional env values for Netlify runtime
read -rp "API_BASE (your Koyeb URL, e.g., https://your-api.koyeb.app): " API_BASE
read -rp "CRON_SECRET (random long string): " CRON_SECRET

echo ">>> Creating GitHub repo if it doesn't exist and pushing code"
if [ ! -d .git ]; then
  git init
  git add -A
  git commit -m "chore: scaffold Divergify hybrid starter"
  gh repo create "$GH_REPO" --source=. --private --push || true
else
  git add -A && git commit -m "chore: bootstrap" || true
  git push -u origin main || true
fi

echo ">>> Setting GitHub Actions secrets"
gh secret set NETLIFY_SITE_ID -b"$NETLIFY_SITE_ID"
gh secret set NETLIFY_AUTH_TOKEN -b"$NETLIFY_AUTH_TOKEN"
gh secret set KOYEB_API_TOKEN -b"$KOYEB_API_TOKEN"
gh secret set KOYEB_SERVICE_ID -b"$KOYEB_SERVICE_ID"

echo ">>> Reminder: set Netlify environment variables API_BASE and CRON_SECRET in the Netlify UI"
echo "API_BASE=$API_BASE"
echo "CRON_SECRET=$CRON_SECRET"
echo "Add those in Netlify → Site settings → Environment variables, then trigger a redeploy."

echo ">>> Done. Push a commit to trigger both workflows."
