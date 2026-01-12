#!/usr/bin/env bash
set -e
which ngrok >/dev/null 2>&1 || { echo 'ngrok not found. Install it and add authtoken.'; exit 1; }
echo 'Starting ngrok tunnel to http://localhost:8787 ...'
ngrok http 8787
