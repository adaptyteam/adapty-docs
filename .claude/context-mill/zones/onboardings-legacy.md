---
zone: onboardings-legacy
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The no-code onboarding builder that predates Flow Builder: creating an onboarding as a series of screens with interactive questions and variables, designing those screens, and placing the onboarding via a placement. Adapty has stopped adding features to this builder — new onboarding work is expected to go through Flow Builder instead, and the entry article (`onboardings`) says so explicitly. Only 3 articles remain in this zone, and readers are marketers maintaining an onboarding built before Flow Builder existed.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| create-onboarding | — | marketer | 3 | tutorial |
| design-onboarding | — | marketer | 6 | tutorial |
| onboardings | entry | marketer | 1 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **flow-design / flow-logic** — is the article about the legacy no-code onboarding builder, or about a Flow Builder onboarding (visual canvas, elements, navigation/logic)? As with paywalls-legacy, legacy onboarding files were sometimes reused for Flow Builder to preserve old links — judge by content and title, and check whether the file also appears under the "Flows (Beta)" category in `src/data/sidebars/tutorial.json`; if so, it's probably not legacy.
- **sdk-onboardings** — is the ticket about designing/configuring the onboarding on the dashboard (onboardings-legacy), or about fetching/presenting it in app code via the SDK (sdk-onboardings)?
- **ab-tests** — is it about the onboarding object itself (onboardings-legacy), or about A/B testing onboarding variants (ab-tests)?

## Ticket language

Corpus-wide synonyms (onboarding ↔ `AdaptyOnboarding`, Flow ↔ Paywall Builder) live in `aliases.md` and
are deliberately not repeated here. Three articles is the whole zone, so the table's real job is the
first row: deciding whether an onboarding ticket belongs to this generation at all. Where it doesn't,
the live answer is in `flow-design` / `flow-logic` — but two of these articles are still the *only*
home for what they document, so don't route away reflexively.

| How a ticket says it | Where it actually lives |
|---|---|
| "onboarding quiz", "onboarding variables", "branch on the quiz answer", "different goal screen per gender", "element visibility", "onboarding actions" | Almost never this zone. `flow-design` and `flow-logic` kept the pre-flow `onboarding-*` filenames — `onboarding-quizzes`, `onboarding-text`, `onboarding-variables`, `onboarding-navigation-branching`, `onboarding-element-visibility`, `onboarding-actions`, `onboarding-flow-tutorial` are all flow-era. "Onboarding" in an id is not evidence of the legacy builder. This zone is exactly `onboardings`, `create-onboarding`, `design-onboarding` and nothing else; `design-onboarding` has no branching machinery at all, only a tip about hiding screens. |
| "is the old onboarding builder still supported", "should we move to flows", "minimum SDK version for onboardings" | `onboardings` carries the deprecation notice and the only statement of the SDK floor (v3.8.0+ iOS/Android/React Native/Flutter, v3.14.0+ Unity, v3.15.0+ KMP/Capacitor — restated in `create-onboarding#step-3-integrate-the-onboarding-into-your-app`). The should-we-switch decision, the feature comparison and the rollout sequence are `flow-logic`'s `migrate-to-flows`; don't answer a migration ticket from the deprecation banner alone. |
| "import screens from a FunnelFox funnel", "raw/custom HTML block", "copy screens between onboardings", "supported video format", "media file size limit" | `design-onboarding`, and **not superseded** — no flow-era article documents any of these. The FunnelFox copy-paste path, the Raw HTML element (neither preloaded nor cached, so lightweight elements only) and the MP4/WebM + 15 MB media limits appear nowhere else in the corpus. Route here even though the builder is frozen. |
| "action ID for a button", "element ID to read a quiz answer", "collect the user's email/age in the onboarding" | `design-onboarding#element-id-and-action-id` for the legacy builder — an action ID is deliberately shared by buttons that should behave alike, an element ID must be unique within the onboarding. Consuming either in app code is `sdk-onboardings`; the flow-era counterparts are `flow-logic`'s `onboarding-actions` and `flow-design`'s `builder-inputs-and-forms`. |
| "the SDK can't fetch the onboarding", "lost my edits", "how do I attach it to a placement" | `create-onboarding`. The legacy-specific hazard is that **Publish** is a blocking step: leaving the builder before it finishes loses the work, and an unpublished onboarding is invisible to the SDK — there is no draft/published pair as in `flow-logic`'s `builder-save-publish`. Placement mechanics themselves are generic (`placements-and-audiences`); Step 2 here is only the onboarding-flavored walkthrough of it. |

## Gaps and misses

