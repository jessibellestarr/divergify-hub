#!/usr/bin/env bash
set -e
if ! command -v netlify >/dev/null 2>&1; then
  echo "Install Netlify CLI: npm i -g netlify-cli"
  exit 1
fi
echo "Logging in (browser will open)..."
netlify login
echo "Deploying /web to Netlify (prod)..."
netlify deploy --prod --dir="$(dirname "$0")/../web" --message "Divergify ship"
echo "Done."
