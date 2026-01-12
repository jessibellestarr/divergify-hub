#!/usr/bin/env bash
set -e
which cloudflared >/dev/null 2>&1 || { echo 'cloudflared not found. Install it first.'; exit 1; }
echo 'Starting Cloudflared tunnel to http://localhost:8787 ...'
cloudflared tunnel --url http://localhost:8787 2>&1 | tee cloudflared.log
