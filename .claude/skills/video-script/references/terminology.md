# Terminology

## Brand names

> **This overrides the repo's `CLAUDE.md`.** That file says the product concept is "flows", not
> "Flow Builder", and that rule governs docs. **Video scripts differ deliberately**: they use the brand
> name **Flow & Paywall Builder**. Decided 2026-07-21. Following the repo convention here produces the
> wrong term.

Frame capabilities around **flows** doing the work, with the editor as merely where you set it up.

## Banned words

| Never | Use | Why |
|---|---|---|
| entitlement | access level | RevenueCat's term |
| GA4, Firebase Analytics | Google Analytics, Firebase | Separate products |

## UI labels

**Verify before bolding.** Labels drift; memory doesn't track the drift.

Sources, best first — use the best one you can actually reach, and say which you used:

1. **The builder source** — `adapty-dashboard-interface/packages/unified-builder`, especially
   `builder/docs/`. Authoritative for anything inside the builder canvas. Worked example: an image's
   **Content mode** takes Fit/Fill, and is `objectFit` in code. This repo is a separate clone; if it
   isn't on your machine, fall back rather than guessing.
2. **The docs** in `src/content/docs` — the practical source for dashboard surfaces outside the
   builder (Placements, Products, Profiles). Weaker than the source, far better than memory. Example:
   the **Flows** / **Paywalls** / **Onboardings** tab labels come from `create-placement.mdx`.
3. **A screenshot in `src/assets/shared/img/`** — shows the label as it actually rendered, though it
   may predate a rename.

Never bold a label you could not find in one of these.

Quote a typo as it appears on screen. The viewer is looking at the same typo.

## Example lists

**Every item must be an instance of the concept, and all of them the same kind.** Viewers generalize
from the examples, not from the definition — a list that mixes categories teaches the wrong shape.

A draft defined a placement as "the spot where Adapty content appears — first launch, a locked
feature, an empty coin balance". The first is a moment, the second an interaction, the third a *state*
— and a coin balance is not a spot in an app at all. The docs' own examples are locations: "points in
your app user's journey, such as onboarding flow, app settings". Fixed by making all three locations:
"first launch, a locked feature, a subscribe button in settings".

Two checks, and they are separate:

1. **Each item against the definition** — is this actually one of those?
2. **The items against each other** — are they the same kind of thing?

This fails the same way UI labels do: something plausible-sounding that nobody verified.

## Demo content

The series uses **Recipedia**, a cooking app. Screens: Welcome, Quiz, Beginner path, Experienced path,
Paywall. Reuse it; don't invent a new scenario per video.

Later videos extend it — 22-virtual-currencies adds an AI recipe generator with a token allowance.

## Whisper mis-hearings

Transcription reliably mangles the product name. Fix these; see `transcribe.md` for what else may and
may not be corrected.

| Heard | Correct |
|---|---|
| Adaptee, Adapti, Adaptive | Adapty |
| pay wall | paywall |
| on-boarding | onboarding |
