# Divergify MVP (Blueprint-aligned)

Generated: 2025-11-01T03:52:27.149006Z

## What you have
- Expo React Native app (TypeScript) with tabs: Home, Tasks, Sprint, Chat, Settings
- State via Zustand; Rewards meter; Drift watcher; Tin Foil Hat gating
- Voice capture (recording stub) and chat/transcription API stubs
- Server stub (Express) and Supabase schema (DDL)

## Run the app
```bash
npm install
npm run start
```
Open with Expo Go or a simulator.

## Run the server stub
```bash
npm run server
```
Server listens on http://localhost:8787

## Next sprints
- Wire /chat and /transcribe to your real backend
- Add SQLite persistence and Supabase sync
- Implement Check-in navigation and persistence


## Backend (Express) quickstart
```bash
cd server
cp .env.example .env
npm install
# optional: npm i openai   # if you want real AI + Whisper
npm start
```
Server runs on http://localhost:8787

### Connect the app to your backend
Set an Expo env var:
```bash
export EXPO_PUBLIC_BACKEND_URL=http://localhost:8787
npm run start
```
Or edit BACKEND_URL in `app/src/lib/api.ts` during development.
