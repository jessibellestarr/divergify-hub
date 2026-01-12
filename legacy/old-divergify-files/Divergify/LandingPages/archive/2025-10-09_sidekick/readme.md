# Divergify Sidekick — Expo Go Build

Mobile-native version of the zero-backend Divergify Sidekick, ready to launch in Expo Go. All data lives on-device via AsyncStorage and the experience mirrors the original dopamine-first web MVP.

## Features
- Animated teal-to-lime swirl background rendered with `expo-linear-gradient`.
- Task Blitz list with tactile checkbox toggles, confetti, and unique dopamine nudges (72-hour no-repeat).
- Daily streak meter (goal of 10) that resets automatically every new day.
- Focus Bubble modal for full-app immersion and Tin Foil Hat Mode to reassure that everything stays local.
- Tip Jar shortcut and editable merch link with link validation.

## Getting Started (Expo Go)
1. Install dependencies once you\'re in this folder: `npm install`.
2. Start the development server: `npm run start` (alias for `expo start`).
3. Scan the QR code with Expo Go (iOS) or the Expo Go Android app to sideload instantly.
4. The app also runs in a simulator or in the browser via `npm run web`.

## Customising The Experience
- **Branding**: Replace `assets/transparentlogo.png` with a square logo to update the header, splash, and icons.
- **Merch Link**: Tap `Set Merch Link` in-app to store your custom shop URL (we\'ll add `https://` automatically if you omit it).
- **Tip Jar**: Update the hardcoded URL inside `App.js` if you prefer a different provider.
- **Dopamine Lines**: Edit the `dopamineLines` array near the top of `App.js` to tweak the personality.

## Privacy Notes
- No network calls fire unless you tap external links.
- Tin Foil Hat Mode is a UX toggle that simply surfaces the “local-only” reassurance; nothing leaves the device either way.
- AsyncStorage keys are namespaced (`divergify.*`) so uninstalling the Expo Go preview will wipe everything clean.

## Next Steps
- When you\'re ready for a standalone build, run `expo prebuild` and follow Expo\'s build service docs.
- Keep confetti counts modest if you target low-powered phones; current defaults run great on Expo Go.
