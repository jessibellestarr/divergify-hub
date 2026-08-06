# Divergify Sidekick Personality Handoff

Last updated: 2026-08-06

## Why this file exists

The sidekicks are product behavior, not decorative copy. Future AI agents and developers should preserve their identities, safety boundaries, and single source of truth instead of scattering personality strings across screens.

## Canonical source

The canonical personality definitions are:

`apps/divergify-hub-app/src/sidekicks/defs.ts`

The lightweight beta mirror is:

`apps/divergify-beta/constants/sidekicks.js`

The beta file intentionally contains only names, roles, taglines, styles, and abbreviated boundaries. Do not fork or duplicate the full prompt logic there. Keep IDs and names synchronized with the canonical definitions.

Current identities:

- `takota` -> Takota, Default Guide
- `scholar` -> Avery, Scholar
- `chaos_buddy` -> Rex, Chaos Buddy
- `drill_coach` -> Aria, Drill Coach
- `zen` -> Aster, Low-Stimulation Guide
- `systems` -> Soren, Operator

Do not rename these casually. IDs may be persisted in user data and are implementation contracts.

## What changed in this pass

The six sidekicks were expanded from short tone descriptors into distinct, well-rounded operating personalities.

Takota is the recognizable Divergify default: dry, observant, direct, anti-shame, practical, and honest about being AI.

Avery is evidence-minded and explicitly distinguishes fact, inference, uncertainty, and unsupported claims.

Rex uses novelty for activation while preventing novelty from escalating into risk, overspending, conflict, sleep loss, or other impulsive high-stakes behavior.

Aria provides firm direction without humiliation, punishment, obedience framing, threats, or coercion.

Aster is low-stimulation and literal without forcing mindfulness, spirituality, breathing exercises, or the idea that calmness is morally superior.

Soren builds proportional systems with explicit failure recovery and bad-day paths instead of rigid productivity doctrine.

## Behavioral science and intellectual-property guardrail

Divergify may use lawful, evidence-informed behavioral design as invisible scaffolding. The product does not need to teach or name the underlying behavioral technique in order to use ordinary interaction patterns such as reducing friction, sequencing choices, making next actions concrete, or designing clearer defaults.

Do NOT name, quote, reproduce, closely paraphrase, teach, or imply Divergify ownership of proprietary training systems, branded behavioral frameworks, paid course methods, or third-party terminology unless Divergify has documented permission to do so.

Do not place third-party framework names into prompts, UI copy, marketing copy, Divergipedia, onboarding, telemetry names, comments intended for publication, or App Store metadata merely because a technique influenced product thinking.

When uncertain whether terminology is proprietary, do not publish the terminology. Preserve the product behavior in original Divergify language and flag the term for legal/research review.

## Evidence and claims guardrail

The sidekicks provide executive-function scaffolding, organization, reflection, and task support. They are not clinicians and must not claim to diagnose, treat, cure, prevent, or medically manage ADHD, autism, PTSD, anxiety, depression, addiction, or any other condition.

Do not claim that Divergify or a feature is "proven," "clinically proven," "rewires the brain," "treats executive dysfunction," "reduces symptoms," or guarantees productivity, regulation, recovery, or health outcomes unless the exact claim has appropriate substantiation and has been approved for that context.

Prefer accurate language such as "designed to support," "evidence-informed," "reduces steps/friction" when the product behavior actually does so, and concrete descriptions of what a feature does.

Never invent research, consensus, citations, statistics, diagnoses, or causal explanations. Distinguish established evidence from inference and product hypothesis.

## Shared safety behavior

All sidekicks must:

- identify as AI when identity matters and never pretend to be human;
- avoid fake emotional claims and dependency-building language;
- avoid shame, coercion, humiliation, manipulation, and punitive engagement mechanics;
- preserve user autonomy;
- avoid diagnosis and treatment claims;
- avoid presenting behavioral inference as certainty;
- reduce cognitive load and expose a concrete next step;
- escalate beyond productivity support when health, safety, legal, financial, or crisis stakes require a qualified human or appropriate emergency resource.

## ND-first behavior

Default product design should reduce friction, cognitive load, and unnecessary choice. Use progressive disclosure and clear defaults. Design re-entry before designing streaks. A system that only works on a user's best day is incomplete.

Shades mode should remain lower-stimulation with fewer animations and reduced sensory demand.

Tin Foil Hat mode should remain privacy-first, avoid unnecessary tracking, and prefer local-first behavior where practical.

## Editing rules for future agents

1. Edit personality at the canonical definition first.
2. Keep sidekick IDs stable unless there is an explicit migration plan.
3. Sync names/roles/taglines to the beta mirror when those fields change.
4. Do not scatter replacement personality prompts through UI components.
5. Do not weaken safety boundaries to make a sidekick more entertaining.
6. Do not add proprietary behavioral-framework terminology without documented permission.
7. Do not turn evidence-informed design into medical marketing claims.
8. Leave a dated note here when personality architecture or safety policy materially changes, including what changed and why.

## App Store readiness note

This pass addresses the personality-definition layer and related claims/IP guardrails only. It is not a complete App Store compliance audit. Privacy disclosures, data collection, account deletion, subscriptions/purchases, safety escalation, permissions, accessibility, store metadata, and platform-specific review requirements still require dedicated release review before submission.
