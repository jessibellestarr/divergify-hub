# Divergify AI Coding Guidelines

## Project Architecture

- **Expo Router App Structure**: Uses file-based routing under `app/` directory (e.g., `app/(tabs)/index.tsx`, `app/+not-found.tsx`)
- **Component Organization**:
  - UI components live in `components/` with platform-specific variants (e.g., `.ios.tsx`)
  - Shared hooks are in `hooks/` directory
  - Theme configuration in `constants/Colors.ts`
  - Assets (images, fonts) in `assets/` directory

## Key Development Workflows

1. **Project Setup**:
   ```bash
   npm install
   npm run start     # Start Metro bundler
   ```

2. **Platform-specific Development**:
   ```bash
   npm run android   # Run on Android
   npm run ios      # Run on iOS
   npm run web      # Run on Web
   ```

3. **Project Reset**:
   ```bash
   npm run reset-project  # Moves current app/ to app-example/
   ```

## Code Conventions

1. **File Organization**:
   - Use PascalCase for component files (`ThemedView.tsx`)
   - Use camelCase for hook files (`useColorScheme.ts`)
   - Use kebab-case for asset files (`loading-spinner.png`)

2. **Styling Patterns**:
   - Place `StyleSheet.create` blocks at bottom of files
   - Use `constants/Colors.ts` for theme colors
   - Reference themes via `useThemeColor` hook

3. **Platform Specifics**:
   - Use `.ios.tsx` suffix for iOS-specific components
   - Platform-specific code exists for:
    - `IconSymbol.{ios,}.tsx`
    - `TabBarBackground.{ios,}.tsx`

## Integration Points

1. **Voice Integration**:
   - Use `scripts/setup-voice-pack.sh` for voice API setup
   - Script adds dependencies and `.env` scaffold

2. **Local Dictation**:
   - `scripts/install-local-dictation.sh` installs whisper.cpp
   - Uses `dictate` helper for transcript clipboard integration

## Quality Control

1. **Static Analysis**:
   - Run `npm run lint` for ESLint checks
   - Honor strict TypeScript settings in `tsconfig.json`
   - Explicit props required; avoid implicit `any`

## Key Files for Reference

- `app/(tabs)/index.tsx`: Main tab navigation structure
- `components/ThemedView.tsx`: Base themed component pattern
- `hooks/useThemeColor.ts`: Theme integration example
- `constants/Colors.ts`: Central theme definitions

## Common Pitfalls

- Don't embed secrets in `app.json` - use Expo secrets
- Keep voice/extension changes in separate commits
- Test navigation/theming/haptics across all platforms