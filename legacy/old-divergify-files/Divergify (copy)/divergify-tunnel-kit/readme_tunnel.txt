Divergify Tunnel Kit
====================

This kit gives you one-command tunnels for your local backend (port 8787).

Options:
1) Cloudflared (no account needed)
2) ngrok (requires an account + authtoken)

---
Cloudflared (macOS/Linux)
-------------------------
Install:
  macOS:  brew install cloudflared
  Linux:  curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared && chmod +x cloudflared && sudo mv cloudflared /usr/local/bin/

Run tunnel:
  ./tunnel-cloudflared.sh

It will print an https URL like:
  https://xxx.trycloudflare.com

Copy that URL and set it for the app:
  export EXPO_PUBLIC_BACKEND_URL=https://xxx.trycloudflare.com
  npx expo start --tunnel

---
Cloudflared (Windows)
---------------------
Install (PowerShell, once):
  winget install Cloudflare.cloudflared

Run tunnel:
  .\tunnel-cloudflared.ps1

Copy the https URL it prints, then in a new terminal:
  setx EXPO_PUBLIC_BACKEND_URL https://xxx.trycloudflare.com
Close and reopen your terminal, then:
  npx expo start --tunnel

---
ngrok (any OS)
--------------
Install:
  https://ngrok.com/download
  ngrok config add-authtoken <YOUR_TOKEN>

Run tunnel:
  ./tunnel-ngrok.sh     (macOS/Linux)
  .\tunnel-ngrok.ps1   (Windows PowerShell)

Then set EXPO_PUBLIC_BACKEND_URL to the https URL it prints and run:
  npx expo start --tunnel

Backend reminder:
-----------------
First start your local backend in another terminal:
  cd server
  cp .env.example .env
  npm install
  npm start
  # Listening on http://localhost:8787
