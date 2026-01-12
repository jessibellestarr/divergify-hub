# Repository Guidelines

## Project Structure & Module Organization
Screens live in `app/` (e.g., `app/(tabs)/index.tsx`, `app/+not-found.tsx`) to honour Expo Router typed routes. Shared UI lives in `components/`, helpers in `hooks/`, and theme constants in `constants/Colors.ts`; reference them via the `@/*` path alias declared in `tsconfig.json`. Assets belong under `assets/` (`images`, `fonts/SpaceMono-Regular.ttf`), while legacy deliverables are parked under `legacy/archives` (e.g., `legacy/archives/divergify_focus_mvp.zip`) and old marketing sites now live in `legacy/landing-pages/`. The voice toolkit ships as `resources/voice/divergify-voice-pack.zip`—extract archives into a temporary ignored directory before editing.

## Build, Test, and Development Commands
Run `npm install`, then start Metro with `npm run start`. Run `npm run android`, `npm run ios`, or `npm run web` for platform targets. Reset the starter experience via `npm run reset-project`, which moves the current `app/` tree to `app-example/`. Use `scripts/setup-voice-pack.sh` to unpack and install the voice API (adds deps and an `.env` scaffold), and lint everything with `npm run lint` before you push. When you're ready to produce a Netlify preview, run `npm run build:web` (see `docs/netlify-deploy.md`).

## Coding Style & Naming Conventions
Honor the Expo flat ESLint config (`eslint.config.js`) and strict TypeScript settings; add explicit props and avoid implicit `any`. Use two-space indentation, PascalCase component names (`ThemedView.tsx`), camelCase hooks (`useColorScheme.ts`), and kebab-case asset names (`loading-spinner.png`). Place `StyleSheet.create` blocks at the bottom of each file and centralize palette adjustments in `constants/Colors.ts` instead of hardcoding values.

## Testing Guidelines
There is no automated suite yet, so treat static analysis as your fast feedback loop. Run `npm run lint` and `npx tsc --noEmit` for every pull request, then exercise both primary tabs via `expo start` on Android, iOS, and Web to confirm navigation, theming, and haptics. If you modify the voice or extension packs after extracting them, note the manual checks you performed (curl probes, mobile smoke tests) inside the PR description.

## Commit & Pull Request Guidelines
With no established history, align on Conventional Commits (`feat: add color themes`) and keep voice, extension, and app changes in separate commits. Never commit regenerated archives; document how to rebuild them instead, and include screenshots or screen recordings for UI tweaks. Pull requests must call out configuration changes (such as `app.json` edits), list manual test steps, and link any tracked work items.

## Security & Configuration Tips
Avoid embedding secrets in `app.json` or zip archives—rely on Expo secrets or your team’s vault. Maintain ignored extraction directories (`tmp/voice/`, `tmp/extension/`) and review Expo release notes before bumping the SDK, especially with `experiments.typedRoutes` enabled. For offline dictation, run `scripts/install-local-dictation.sh`; it installs whisper.cpp plus a `dictate` helper and copies transcripts to your clipboard when `xclip` is available.
