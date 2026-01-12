#!/usr/bin/env bash
set -euo pipefail

# ---------- CONFIG ----------
PROJ="${HOME}/Desktop/Divergify/divergify-mvp-repo"
PORT=8787
OPS="${HOME}/.divergify-devops"
LOG="${OPS}/logs"
mkdir -p "$OPS" "$LOG"

# Ensure locally installed CLI tools are discoverable for everything we launch
export PATH="${HOME}/.local/bin:${PATH}"

# ---------- PREREQS ----------
command -v node >/dev/null || { echo "Install Node LTS first"; exit 1; }
command -v npm  >/dev/null || { echo "npm missing"; exit 1; }
# Modern Expo CLI (quietly)
npm uninstall -g expo-cli >/dev/null 2>&1 || true
npm install  -g @expo/cli >/dev/null 2>&1 || true

# Cloudflared quick tunnel binary (no root)
if ! command -v cloudflared >/dev/null 2>&1; then
  mkdir -p "${HOME}/.local/bin"
  curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    -o "${HOME}/.local/bin/cloudflared"
  chmod +x "${HOME}/.local/bin/cloudflared"
fi

# ---------- CREATE SERVICES & SCRIPTS ----------
cat > "${OPS}/backend.sh" <<'SH'
#!/usr/bin/env bash
set -euo pipefail
PROJ="${HOME}/Desktop/Divergify/divergify-mvp-repo"
cd "$PROJ/server"
npm install --silent
exec npm start
SH
chmod +x "${OPS}/backend.sh"

cat > "${OPS}/tunnel.sh" <<'SH'
#!/usr/bin/env bash
set -euo pipefail
PORT=8787
export PATH="${HOME}/.local/bin:${PATH}"
cd "${HOME}/Desktop/Divergify/divergify-mvp-repo"
: > .tunnel.log
exec cloudflared tunnel --url "http://localhost:${PORT}" --logfile .tunnel.log --loglevel info
SH
chmod +x "${OPS}/tunnel.sh"

# systemd user units so backend/tunnel start and restart if they crash
mkdir -p "${HOME}/.config/systemd/user"

cat > "${HOME}/.config/systemd/user/divergify-backend.service" <<'UNIT'
[Unit]
Description=Divergify Backend (Express)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=%h/.divergify-devops/backend.sh
Restart=always
RestartSec=2
Environment=NODE_ENV=development
WorkingDirectory=%h/Desktop/Divergify/divergify-mvp-repo/server
StandardOutput=append:%h/.divergify-devops/logs/backend.log
StandardError=append:%h/.divergify-devops/logs/backend.err

[Install]
WantedBy=default.target
UNIT

cat > "${HOME}/.config/systemd/user/divergify-tunnel.service" <<'UNIT'
[Unit]
Description=Divergify Cloudflare Quick Tunnel
After=divergify-backend.service

[Service]
Type=simple
ExecStart=%h/.divergify-devops/tunnel.sh
Restart=always
RestartSec=2
WorkingDirectory=%h/Desktop/Divergify/divergify-mvp-repo
StandardOutput=append:%h/.divergify-devops/logs/tunnel.log
StandardError=append:%h/.divergify-devops/logs/tunnel.err
Environment=PATH=%h/.local/bin:/usr/local/bin:/usr/bin

[Install]
WantedBy=default.target
UNIT

# helper to read the current tunnel URL
cat > "${OPS}/tunnel-url.sh" <<'SH'
#!/usr/bin/env bash
set -euo pipefail
FILE="${HOME}/Desktop/Divergify/divergify-mvp-repo/.tunnel.log"
if [ -f "$FILE" ]; then
  URL=$(grep -hoE 'https://[a-zA-Z0-9.-]+trycloudflare\.com' "$FILE" 2>/dev/null || true)
  printf '%s\n' "$URL" | tail -n1
else
  exit 0
fi
SH
chmod +x "${OPS}/tunnel-url.sh"

# launcher that pulls the URL and runs Expo with it
cat > "${OPS}/run-expo.sh" <<'SH'
#!/usr/bin/env bash
set -euo pipefail
PROJ="${HOME}/Desktop/Divergify/divergify-mvp-repo"
cd "$PROJ"
URL="$(${HOME}/.divergify-devops/tunnel-url.sh || true)"
if [ -z "${URL}" ]; then
  echo "Tunnel URL not ready yet. Try again in a few seconds."; exit 12
fi
export EXPO_PUBLIC_BACKEND_URL="${URL}"
export EXPO_NO_TELEMETRY=1
exec npx expo start --tunnel -c
SH
chmod +x "${OPS}/run-expo.sh"

# ---------- ENABLE & START SERVICES ----------
systemctl --user daemon-reload
systemctl --user enable --now divergify-backend.service
systemctl --user enable --now divergify-tunnel.service

# wait for health + tunnel
echo "▶ Waiting for backend..."
for i in {1..30}; do
  if curl -fsS http://localhost:${PORT}/health >/dev/null 2>&1; then echo "✔ backend OK"; break; fi
  sleep 1
done
echo "▶ Waiting for tunnel URL..."
for i in {1..40}; do
  URL="$(${OPS}/tunnel-url.sh || true)"
  [ -n "${URL:-}" ] && { echo "✔ tunnel ${URL}"; break; }
  sleep 1
done

# ---------- LAUNCH EXPO ----------
exec "${OPS}/run-expo.sh"
