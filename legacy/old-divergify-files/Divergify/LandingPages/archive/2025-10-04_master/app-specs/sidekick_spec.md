# Divergify Sidekick — Mobile-First MVP
_Last updated: 2025-10-04_

## Problem
Neurodivergent professionals juggle a firehose of ideas while fighting time-blindness and energy crashes. They need a pocket-sized coach that nudges action without surveillance capitalism.

## Core Principles
- **Offline-first:** Works fully without signal; sync is optional and end-to-end encrypted.
- **Beat your baseline:** Progress is measured against yesterday’s self, not arbitrary streaks.
- **Tin Foil Hat Mode:** Local-only mode with zero telemetry and quick data purge.
- **Two-tap actions:** Every interaction should complete in under 2 taps or 5 seconds.

## Primary Personas
1. **Solo creative** — wants structure between freelance gigs.
2. **Product lead with ADHD** — needs to keep shipping without burning out.
3. **Student / career switcher** — balancing coursework, job search, and executive dysfunction.

## Feature Set (MVP)
### 1. Task Bubble
- Quick-add text field with optional tags (Focus Bubble, Admin, Restock).
- Baseline estimate selector: 5, 15, 30, 60 minutes.
- One active bubble at a time; the rest queue up.

### 2. Beat your baseline Dashboard
- Daily summary of completed bubbles vs. personal average.
- “Momentum Ledger” view: Wins, Wobbles, Keepers with swipe gestures.
- Confetti micro-reward (haptic pulse + visual burst) when beating average.

### 3. Chaos Clocking
- Elastic timer that starts with a tap and auto-snoozes if no action within 5 minutes.
- Nudges: “Worth staying in the bubble?” with Skip / Extend / Wrap buttons.

### 4. Alarm Layer
- Local notifications with custom phrases (“Protect the bubble”).
- Quiet Hours schedule to avoid burnout pings.
- Optional location-based reminder (arrive at coworking = nudge to start).

### 5. Tin Foil Hat Controls
- Master toggle for offline-only mode (no sync, no logs beyond 24 hours).
- Manual purge option (delete history & cache).
- Transparency panel showing what, if anything, is stored.

## Non-Functional Requirements
- Works on iOS + Android (React Native + Expo or Capacitor + Vue).
- Data stored via SQLite or secure storage; sync (if enabled) via end-to-end encryption (e.g., Supabase or self-hosted PocketBase later).
- Accessibility: high contrast theme, dyslexia-friendly font option, voice control support.
- Battery friendly: timers use background tasks sparingly, respect system low-power mode.

## Offline Data Model (local SQLite)
- `tasks`: id, text, baseline_minutes, status (queued/active/done), created_at, completed_at.
- `nudges`: id, task_id, action (skip/extend/wrap), timestamp.
- `settings`: tin_foil_hat (bool), quiet_hours_start, quiet_hours_end, theme.
- Optional `sync_log` table for encrypted payloads waiting to push when online.

## Roadmap Next Steps
1. **Week 1:** Wireframes + prototype of Task Bubble flow (Figma or Penpot).
2. **Week 2:** Build React Native prototype with local storage + alarms.
3. **Week 3:** Add Momentum Ledger and baseline analytics.
4. **Week 4:** User testing with 8 neurodivergent testers; capture feedback on overwhelm triggers.
5. **Post-MVP:** Explore wearable companion (watchOS/Android Wear) for haptic-only nudges.

## Risks & Mitigations
- **Notification fatigue:** Provide per-task nudge frequency + easy snooze.
- **Data trust:** Default to local storage, publish a short privacy README in-app.
- **Over-complex UI:** Keep only one primary action per screen; add advanced settings behind Tin Foil Hat panel.
