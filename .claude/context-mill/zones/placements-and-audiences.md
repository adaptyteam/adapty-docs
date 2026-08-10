---
zone: placements-and-audiences
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The placement system: the hardcoded IDs a mobile app calls that let Adapty remotely decide which flow,
paywall, onboarding, or A/B test is shown — without a new app release — plus audiences, the user
segments a placement can target, and placement-level visibility/performance metrics. This is the wiring
that decides *what shows where, to whom*, sitting between the content itself (a flow, legacy paywall, or
A/B test) and the one ID the app hardcodes.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| add-audience-paywall-ab-test | — | marketer | 0 | tutorial |
| audience | entry | marketer | 0 | tutorial |
| change-audience-priority | — | marketer | 0 | tutorial |
| choose-meaningful-placements | — | marketer | 0 | tutorial |
| create-placement | — | marketer | 2 | tutorial |
| delete-placement | — | marketer | 0 | tutorial |
| edit-placement | — | marketer | 0 | tutorial |
| export-placements | — | marketer | 0 | tutorial |
| placement-metrics | — | marketer | 3 | tutorial |
| placements | entry | marketer | 1 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`ab-tests`** — is the ticket about attaching/prioritizing which experience a placement shows
  (`add-audience-paywall-ab-test`, `change-audience-priority`, here), or about the mechanics of running
  or reading the results of the A/B test itself (`ab-tests`)?
- **`flow-logic` / `paywalls-legacy` / `onboardings-legacy`** — this zone owns the placement/audience
  wrapper; the content being placed (a flow, a legacy paywall, a legacy onboarding) is documented in its
  own zone.
- **`subscribers-and-profiles`** — "segment" is used in both zones. Is the ticket about an audience
  targeting a placement's variant selection (here), or a CRM/profile segment used for support/lookup
  (`subscribers-and-profiles`' `segments`)?
- **`analytics` / `ab-tests`** — `placement-metrics` covers a placement's own visibility/performance
  numbers. Is the ticket about that, the full analytics chart suite (`analytics`), or an A/B test's
  statistical results (`results-and-metrics` in `ab-tests`)?

## Ticket language

Flat zone — rows name specific articles. Corpus-wide synonyms (flow ↔ Paywall Builder, paywall ↔ flow
in v4, segment vocabulary) live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "wrong audience got the paywall", "user matches the segment but sees the All users flow", "targeting is being ignored" | `change-audience-priority` — but rule out two SDK-side causes first, without re-explaining them: the explicit default-audience fetch (`sdk-flows-manual`) and fetching before `identify`/attribution resolves (`sdk-best-practices`). Dashboard-side, priority is a *check order*, #1 first, so a user who qualifies for a low-priority audience is legitimately bypassed into a higher one. Two rules override anything the marketer arranged: crossplacement audiences (from crossplacement A/B tests) always outrank regular audiences, and "All users" is always last because it is the fallback. |
| "show a discount only to churned users", "target by country / app version / custom attribute" | `audience` for the wiring and the order of operations — the segment must exist before it can be added to a placement. The filters themselves, and the silent-mismatch traps in them, are not in this zone: that's `segments` in `subscribers-and-profiles`. When an audience matches nobody, the definition is the suspect, not the placement. |
| "where do I reorder audiences", "there's no Edit priority button" | `change-audience-priority` — the button only appears once a placement holds three audiences ("All users" plus two). With fewer, the order is fixed and the UI hides the control rather than showing a no-op. |
| "attach a second paywall to an existing placement", "what is the Run flow button" | `add-audience-paywall-ab-test` (same steps are inlined in `create-placement`). Non-obvious part: "All users" is added to every placement automatically and still needs content assigned, and the button label tracks the placement type. |
| "changed the flow in the dashboard, the app still shows the old one" | `edit-placement` — nothing ships until **Save and publish**; the second suspect is the SDK's cache-first fetch policy (`sdk-flows-manual`), not the placement. |
| "rename the placement ID", "we shipped a typo in the placement ID" | `create-placement`. The ID is immutable by design; only the display name is editable. A wrong ID means a new placement plus an app release, so say that instead of hunting for an edit control. |
| "one placement for the onboarding and its paywall", "can't add an onboarding here" | `create-placement`. Placements are typed (Flows / Paywalls / Onboardings tabs) and one placement cannot serve more than one type, because each type is measured with a different metric set. |
| "retire an old paywall slot", "clean up unused placements" | `delete-placement`, and the danger note is the whole answer: deleting a placement a released app still calls pins those users to the local fallback permanently — those versions can never be pointed at a dynamic flow again. Almost always the right action is editing the placement, not deleting it. |
| "audit which audience sees which paywall", "spreadsheet of our whole setup" | `export-placements`. Two things surprise people: each tab exports separately (no single all-types file), and the cross-placement A/B test column is always empty for flow placements because crossplacement tests don't support them. |
| "script our placement setup", "no dashboard clicks / do it from CI" | Split by direction: creating is the Developer CLI, referenced from `create-placement` with the command reference in `agent-tooling`; reading the config back is the server-side API export linked from `export-placements`. |
| "how many placements should we have", "where should the paywall go" | `choose-meaningful-placements` — deliberately opinionated: cap at ~5 or you lose statistical room to run experiments, and weight the onboarding journey because that's where most subscriptions start. |
| "paywall for users with no connection", "where do I download the fallback bundle" | The download button lives on the placements list (`placements`), and the SDK version chosen in the dialog decides whether the bundle contains flows (SDK 4.0+) or paywalls only — one **Fallbacks** download covers both. The file's own format docs are in `flow-logic`; wiring it into the app is `use-fallback-paywalls` in `sdk-flows-display`. |
| "views and unique views don't match", "why is CR lower than unique CR" | `placement-metrics` — same numerator, different denominator (total views vs one view per user). Nothing is double-counted. |
| "compare two paywalls in the same placement", "revenue per segment" | `placement-metrics` — the page has two groupings, paywall-based and audience-based, and only the audience-based view answers "which segment converts". |
| "onboarding completion rate", "ARPU for the onboarding" | `placement-metrics`, but scope it: ARPU, completions, unique completions and unique completion rate are defined for onboarding placements only. |

## Gaps and misses

