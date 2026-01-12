# Requires cloudflared (winget install Cloudflare.cloudflared)
Write-Host 'Starting Cloudflared tunnel to http://localhost:8787 ...'
cloudflared tunnel --url http://localhost:8787 2>&1 | Tee-Object -FilePath cloudflared.log
