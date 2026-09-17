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

## Word choices

These apply to drafts. A recorded script keeps what was said.

**Flows come first in every list** — "flows, paywalls, onboardings", "flow or paywall placements",
"`getFlow` or `getPaywall`". Never "paywall or flow". The legacy Paywall Builder is being deprecated,
and word order signals which one Adapty recommends.

**Reserve "flow" for the product.** The generic English sense — a process, a sequence of steps —
collides with it. Say "both steps", "this process", "the setup", or name the UI container.

**"Selected", never "chosen."** It is the plain UI verb and matches the builder's own vocabulary:
selectable groups, selected options. Element and group names keep their identifiers — `single_choice`.

**Products are never "on the screen."** Name the surface: "the products you added in the **Products**
panel", "the screen's product list". Reserve "on the screen" for what is visible on the canvas.

**Purchase verbs.** The flow displays products and triggers purchases. A button or an action *starts*
a purchase. The store completes it. A screen never sells, and a button never buys.

**American spelling**, even where the UI uses British.

## UI labels

**Verify before bolding.** Labels drift.

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

Three checks, and they are separate:

1. **Each item against the definition** — is this actually one of those?
2. **The items against each other** — are they the same kind of thing?
3. **The set against the concept** — do the examples cover it, or a corner of it? A draft of video 24
   illustrated *placement* with three paywalls, which quietly narrowed a placement to somewhere you
   charge. Lead with the instance that sits furthest from the obvious one — onboarding, a quiz, a
   survey — and the definition widens back out.

This fails the same way UI labels do: something plausible-sounding that nobody verified.

## Demo content

The series uses **Recipedia**, a cooking app, across every video. Screens: Welcome, Quiz, Beginner
path, Experienced path, Paywall. Reuse it; don't invent a new scenario per video.

Extend it instead when a video needs something new — 22-virtual-currencies added an AI recipe generator
with a token allowance, and cost the viewer nothing to follow.

## Whisper mis-hearings

Transcription reliably mangles the product name. Fix these; see `transcribe.md` for what else may and
may not be corrected.

| Heard | Correct |
|---|---|
| Adaptee, Adapti, Adaptive | Adapty |
| pay wall | paywall |
| on-boarding | onboarding |
