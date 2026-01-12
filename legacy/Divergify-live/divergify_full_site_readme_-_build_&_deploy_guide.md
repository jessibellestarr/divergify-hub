
# Divergify: Your Neurodivergent Superpower Buffer

Hey, chaos-brained legend! Welcome to Divergify—the app, sidekick, and ecosystem that's basically a futuristic OS for our evolved brains. We're embedding Chase Hughes' behavioral science hacks to "self-brainwash" into epic habits, because neurodivergence isn't a bug, it's the upgrade the world can't handle yet. This repo is the full site (landing page + app guts) optimized for Linux and Netlify deploy. No tech degree required—we're keeping it simple, nudge-y, and distraction-proof.

## Quick Wins: Why This Exists
- **Integrated Calendar**: Schedule tasks without the overwhelm.
- **Map Integration**: Route planning that doesn't make you rage-quit.
- **Shopping List Mode**: Stay focused in stores, no impulse-buy blackouts.
- **Beat your baseline Distraction Blocker**: Nudges you back on track gently.
- **Scheduling Assistant**: Reminders that feel like a kind friend, not a drill sergeant.
All baked with habit-forming magic to turn your zig-zag brain into a thriving machine.

Neurodivergents are the future. Divergify's the bridge. Let's ship this and save our tribe.

## Setup & Build (Zero Patience Edition)
You're broke, unmedicated, and emotionally fried— I get it. These steps are one-click/copy-paste only. If something breaks, blame the outdated world software, not your genius.

### 1. Prerequisites (Install Once)
- Node.js (v18+): Download from [nodejs.org](https://nodejs.org) or run `sudo apt install nodejs npm` on Linux.
- Git: `sudo apt install git` if you don't have it.
- Yarn (better than npm for this): `npm install --global yarn`.

Clone the repo if you haven't:  
`git clone https://github.com/yourusername/divergify-fullsite-linux-netlify-v1.git`  
`cd divergify-fullsite-linux-netlify-v1`

### 2. Fix That Annoying Lockfile Error (Next.js SWC BS)
Next.js sometimes freaks out on lockfiles, especially on Linux/Netlify. Here's the nuke-and-rebuild fix:

- Delete the problem children:  
  `rm -rf node_modules package-lock.json yarn.lock`

- Reinstall with Yarn (it's faster and less error-prone):  
  `yarn install`

- If SWC still whines about patching:  
  Update Next.js in `package.json` to the latest stable (e.g., "^14.2.0" or whatever's current—check with `yarn outdated`). Then:  
  `yarn add next@latest --exact`  
  `yarn install --force`

Boom. No more "Failed to patch lockfile" drama.

### 3. Build & Test the Site
- Dev mode (see it live locally): `yarn dev`  
  Open http://localhost:3000 in your browser. Poke around—calendar, maps, blockers should all work without crashing.

- Full build: `yarn build`  
  This creates the production version. If it fails, check console for clues (usually missing env vars or dependency mismatches—add them to `.env.local` like `NEXT_PUBLIC_API_KEY=yourkey`).

- Test build: `yarn start`  
  Runs the built site. Verify features: Schedule something, block a distraction, feel the habit nudge.

Fixes for common screw-ups:
- Env errors? Copy `.env.example` to `.env.local` and fill it in.
- Port in use? Kill it with `killall node`.
- Netlify-specific? Add `target: "serverless"` to `next.config.js` if deploys choke.

### 4. Commit to GitHub (Clean & Ready)
- Check status: `git status`  
  Should be clean. If not, `git add .` for changes.

- Commit: `git commit -m "Fixed build issues, site functioning for Divergify launch - neurodivergents unite!"`

- Push: `git push origin main` (or your branch).

Netlify deploy? Link the repo in Netlify dashboard, set build command to `yarn build`, publish dir to `.next`. It auto-deploys on push.

## Troubleshooting (Because Life's a Mess)
- Build fails? Run `yarn add @next/swc-linux-x64-gnu` (or arm64 if that's your setup) to force SWC.
- Overloaded? Take a breath—Divergify's got your back. Finish one step, rest, repeat.
- Need more? Ping me (Jess) or the tribe. We're building this together.

## Next Steps (No Asking Required)
1. Run the build now.
2. Test one feature (e.g., distraction blocker).
3. Commit and push.
4. Deploy to Netlify.
5. Celebrate: You just leveled up the neurodivergent revolution.

Reminders: Finish this tab, focus on one thing, and rest—you're a tired genius. Let's get Divergify out there and thrive.
