# Divergify MVP Starter (Expo)

## Quick Start (Linux)
```bash
# 0) prerequisites
sudo apt update && sudo apt -y install curl git
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt -y install nodejs
sudo npm i -g pnpm expo-cli

# 1) unzip and install deps
cd ~/Downloads   # or wherever you saved it
unzip divergify-mvp-starter.zip -d divergify-mvp
cd divergify-mvp
pnpm install

# 2) run
pnpm start
# then press 'a' for Android emulator or scan the QR code with Expo Go on your phone
```

## Features in this starter
- Expo SDK 51 (managed workflow)
- Today list with add/complete/remove
- Zustand state + AsyncStorage persistence
- Simple daily reset hook
- Expo Notifications with encouraging, family-friendly messages
- Lime-forward color palette to match brand vibe

## Next steps to build MVP
- [ ] Onboarding: choose voice/personality
- [ ] "Did you just switch tasks?" nudge logic
- [ ] Dopamine rewards scale & 72h no-repeat lines
- [ ] Tin Foil Hat Mode (privacy toggle)
- [ ] Settings: notification schedule
- [ ] Calendar sync (later)
