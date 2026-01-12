#!/usr/bin/env bash
set -euo pipefail
AUTH_URL_DEFAULT='https://www.divergify.app'
NODE_MAJOR='18'
if ! command -v node >/dev/null 2>&1; then curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | sudo -E bash - && sudo apt install -y nodejs; fi
sudo npm i -g netlify-cli
cd "$(dirname "$0")/../divergify-site"
npm install --no-audit --no-fund
netlify login || true
netlify link
netlify env:set AUTH_URL "$AUTH_URL_DEFAULT"
if [[ -f .env ]] && grep -qE '^STRIPE_SECRET_KEY=' .env; then VAL="$(grep -E '^STRIPE_SECRET_KEY=' .env | sed 's/^STRIPE_SECRET_KEY=//; s/^["\x27]//; s/["\x27]$//')"; if [[ -n "$VAL" ]]; then netlify env:set STRIPE_SECRET_KEY "$VAL"; fi; fi
netlify deploy --build --prod
