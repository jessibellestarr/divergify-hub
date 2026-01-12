# Divergify Workspace

Divergify is an Expo-managed React Native application that targets mobile and the web. The layout is now trimmed for active development while archiving older deliverables so you can focus on the upcoming Netlify-bound web build.

## Repository Layout
- `app/` – file-based Expo Router screens (tabs, modals, error boundaries).
- `components/`, `hooks/`, `constants/` – shared UI, utilities, and theming primitives for the app.
- `assets/` – app fonts and images consumed at runtime.
- `resources/voice/` – packaged voice service bundle (`divergify-voice-pack.zip`) consumed by `scripts/setup-voice-pack.sh`.
- `legacy/archives/` – historical deliverables such as `divergify_focus_mvp.zip` kept for reference.
- `legacy/landing-pages/` – prior marketing/landing-site exports preserved but separated from the active app.
- `docs/` – contributor guidelines and project notes (see `docs/AGENTS.md`).
- `scripts/` – helper scripts for voice setup and dictation tooling.

## Getting Started
1. Install dependencies: `npm install`.
2. Launch Metro bundler: `npm run start`, then select a platform target (Android, iOS, web, or Expo Go).
3. Run the dedicated web preview while iterating on Netlify-focused changes: `npm run web`.
4. Lint before committing: `npm run lint`.

## Building for Netlify Preview
- Produce a static web export with `npm run build:web`. Expo writes the build to `dist/`, which is already git-ignored.
- Point Netlify (or any static host) at `dist/` as the publish directory. The default build command is `npm run build:web`.

## Voice Toolkit & Legacy Assets
- To unpack the voice prototype, run `scripts/setup-voice-pack.sh` (it defaults to `resources/voice/divergify-voice-pack.zip`).
- Explore older MVP artifacts or marketing snapshots inside `legacy/` without polluting the active app code.

Refer to `docs/AGENTS.md` for expanded workflow guidance, coding conventions, and testing expectations.
