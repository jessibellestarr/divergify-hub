#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/jessibelle/Projects/divergify-hub"
APP_SRC="$ROOT/apps/divergify-hub-app"
SITE="$ROOT/active-site/divergify_site"
APP_OUT="$SITE/app"

cd "$APP_SRC"

# Requires network the first time (npm install). This script does not request it.
# npm install
# npm run build

rm -rf "$APP_OUT"
mkdir -p "$APP_OUT"
cp -R dist/* "$APP_OUT/"

echo "Copied app dist -> $APP_OUT"
