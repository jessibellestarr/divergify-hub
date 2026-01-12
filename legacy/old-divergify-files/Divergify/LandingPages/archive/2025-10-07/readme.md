
# Divergify Landing (Netlify)

This is a zero-backend, privacy-first landing page with Netlify Forms.
Drag-and-drop this folder (or the ZIP) into Netlify to deploy.

## Deploy (GUI)
1. Login to Netlify → **Add new site** → **Deploy manually**.
2. Drop the ZIP. Wait for green deploy.
3. In **Site Settings → Domain Management**:
   - Add `divergify.app`
   - Set as **Primary domain**
   - Optionally add `www.divergify.app`

## DNS (Registrar)
A records for apex:
- 75.2.60.5
- 99.83.190.102

CNAME for `www`:
- your-site-name.netlify.app (replace with your Netlify subdomain)

## Form
- Name: `divergify-signup`
- Netlify will capture submissions in the dashboard.
- To forward to email, enable a Notification in **Forms → Notifications** to `chaoscontrol@divergify.app`.

## Tin Foil Hat Mode
No tracking is embedded. No analytics by default. Security headers included in `netlify.toml`.


## Ko‑fi Tip Jar
- Button lives on the homepage and links to: https://ko-fi.com/divergify
- Change the link in `index.html` if your Ko‑fi handle is different.

## Merch Teaser
- Static placeholders (“Tin Foil Hat Mode”, “Chaos Clocking”, “Taskache”).
- Replace with images later; this ships today and builds the waitlist.
