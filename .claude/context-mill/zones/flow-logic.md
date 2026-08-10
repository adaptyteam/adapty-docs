---
zone: flow-logic
sources: []
reviewed_shape: fd915eb8bdcf
reviewed_at: 2026-08-10
---

## What this is

The behavioural and lifecycle half of Flow Builder documentation: what a flow *does* (navigation,
conditional branching, actions, purchases, variables, remote config, fallbacks) and how a flow moves
through its *lifecycle* (create, tour the UI, preview, save/publish, measure, migrate, recipe). Its
sibling zone, `flow-design`, covers what a flow *looks like* (screens/layers, layout, elements, styles,
dark mode, fonts, localized copy). Both zones sit inside the Adapty Dashboard's Flow Builder — this
zone owns the no-code authoring workflow for behavior and its lifecycle wrapper, not the SDK code that
renders the finished flow in an app (that's `sdk-flows-display` for `getFlow`/rendering,
`sdk-flows-manual` for remote-config consumption, `sdk-migrations` for the v4 upgrade path).

## Surfaces

- **Adapty Dashboard → Flows page**: flow list, status column, **Create flow**, **Fallbacks** download,
  the Flow metrics view.
- **Flow Builder editor**: top toolbar (save/publish, view-mode toggle), **Interactions** tab (triggers
  and actions, conditional-action if/then/else editor), **Variables** panel, the Remote Config JSON
  view, the bottom-toolbar preview controls, **Test on device** (QR to the Adapty mobile app).
- **Adapty mobile app** (iOS/Android): receiving end of **Test on device** — not documented here beyond
  "download it and scan the QR code"; the app itself has no dedicated flow-logic article.
- **Placements page**: where a published flow is attached to go live — placements themselves are a
  different zone (`placements-and-audiences`); flow-logic only covers the flow side of that handoff.

## Sources of truth

- **`dashboard-interface`** (`packages/unified-builder`) is the authority for exact in-product labels:
  the Interactions tab's trigger/action names, the conditional-action if/then/else editor and its
  comparison operators, and preset names like **Close flow**. Verified in this pass against the docs
  themselves: `onboarding-actions.mdx` and `onboarding-flow-tutorial.mdx` describe the conditional chain
  as IF / ELSE IF / ELSE, and `show-offer-on-close.mdx`'s screenshot alt text names the actual UI chips
  as lowercase **if** / **then** / **else** blocks with an **Equals** operator — consistent with each
  other. No flow-logic article uses or shows a **Does not equal** operator; take that operator's exact
  wording from `dashboard-interface` directly rather than from any article in this zone, since it isn't
  independently confirmed here.
- **The SDK repos are explicitly not this zone's ground truth.** Articles here reference SDK-side shapes
  loosely (`AdaptyRemoteConfig`, the `remoteConfigs` array on `AdaptyFlow`, `getFlow`) only to hand the
  reader off to the platform SDK docs. Treat those shapes as owned by `sdk-flows-display` /
  `sdk-flows-manual` and their own sources (`jscore`, `ios-sdk`, etc. in `sources.md`) — don't correct or
  extend them from inside a flow-logic article.
- No dedicated source exists for the Flow metrics definitions (revenue, proceeds, ARPPU, conversion
  rates) beyond the article's own prose — these are dashboard-backend calculations with no spec file
  registered in `sources.md`. Treat `flow-metrics.mdx` itself, cross-checked against `paywall-metrics.mdx`
  for terms it shares, as the working definition until a metrics source is added.

## What we document, what we don't

**Document:** building a flow's behavior in the no-code editor — screens' navigation wiring, triggers
and actions (including custom actions and the Action-ID hand-off contract), conditional
actions/branching, variables (custom, product, element) and where they can be used, assigning products
and purchase/restore buttons to a screen, the remote-config JSON authoring workflow, downloading and
scoping fallback flow files, the save/draft/publish lifecycle and flow status meanings, previewing on a
real device or in-dashboard, flow metric definitions, the six common-recipe walkthroughs, and the
conceptual case for migrating from separate onboardings/paywalls to a flow.

**Don't document:** the SDK code that fetches or renders a flow (`getFlow`, `AdaptyFlowView`,
observer mode — `sdk-flows-display`/`sdk-flows-manual`), the SDK migration steps themselves
(`sdk-migrations`), anything about a screen's visual design (`flow-design`), and the pre-Flow Paywall
Builder / Onboarding builder as if it were current (`paywalls-legacy`/`onboardings-legacy` — flows
replace them, this zone doesn't maintain them). Internal builder implementation not exposed in the UI
(e.g. how the backend resolves an A/B test weight) is also out of scope; the docs stop at what a marketer
or developer can see and click.

**Marketer's job vs. developer's job**, mixed in this zone rather than split by article:
- **Marketer/no-code, the majority of the zone**: `adapty-flow-builder`, `paywall-builder-templates`,
  `builder-ui`, `builder-navigation-actions`, `onboarding-navigation-branching`, `onboarding-actions`
  (aside from the custom-action app-handling parts), `onboarding-variables`,
  `onboarding-element-visibility`, `builder-loaders-and-progress-bars`, `paywall-product-block`,
  `builder-save-publish`, `paywall-device-compatibility-preview`, `flow-metrics`,
  `flow-builder-recipes` and its six recipes (`basic-paywall-screen`, `paywall-with-tabs`,
  `paywall-features-per-product`, `show-plans-bottom-sheet`, `show-offer-on-close`,
  `strikethrough-price`). None of these require writing app code.
- **Developer-facing, explicitly**: `fallback-flows` (download a file, add it to app code, keep an eye
  on the SDK version the file was generated for), `migrate-to-flows`'s last two of its four steps
  ("Create a new placement" is dev-adjacent, "Update the SDK" is stated in the article itself as "the
  main developer task"), and the "render the flow in your app" hand-off inside
  `customize-flow-with-remote-config` (the JSON authoring itself is no-code; reading `remoteConfigs` at
  runtime is not). `onboarding-actions`'s custom-action section also assumes a developer implements the
  handler, even though a marketer assigns the Action ID.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-flow-builder | entry | marketer, dev | 3 | tutorial |
| basic-paywall-screen | — | marketer, dev | 11 | tutorial |
| builder-loaders-and-progress-bars | — | marketer, dev | 6 | tutorial |
| builder-navigation-actions | entry | marketer, dev | 0 | tutorial |
| builder-save-publish | — | marketer, dev | 4 | tutorial |
| builder-ui | — | marketer, dev | 14 | tutorial |
| customize-flow-with-remote-config | — | marketer, dev | 3 | tutorial |
| fallback-flows | — | marketer, dev | 4 | tutorial |
| flow-builder-recipes | entry | marketer, dev | 0 | tutorial |
| flow-metrics | — | marketer, dev | 24 | tutorial |
| migrate-to-flows | migration | marketer, dev | 7 | tutorial |
| onboarding-actions | — | marketer, dev | 20 | tutorial |
| onboarding-element-visibility | — | marketer, dev | 0 | tutorial |
| onboarding-flow-tutorial | — | marketer, dev | 10 | tutorial |
| onboarding-navigation-branching | — | marketer, dev | 4 | tutorial |
| onboarding-variables | — | marketer, dev | 8 | tutorial |
| paywall-builder-templates | — | marketer, dev | 5 | tutorial |
| paywall-device-compatibility-preview | — | marketer, dev | 3 | tutorial |
| paywall-features-per-product | — | marketer, dev | 10 | tutorial |
| paywall-product-block | — | marketer, dev | 6 | tutorial |
| paywall-with-tabs | — | marketer, dev | 12 | tutorial |
| show-offer-on-close | — | marketer, dev | 7 | tutorial |
| show-plans-bottom-sheet | — | marketer, dev | 11 | tutorial |
| strikethrough-price | — | marketer, dev | 6 | tutorial |
<!-- /mill:auto -->
## Reader jobs

- **First-time flow builder (marketer/PM).** Lands on `adapty-flow-builder` from the Flows page or the
  sidebar. The article orients them correctly: it explains what a flow is, shows what's buildable, and
  routes onward through `paywall-builder-templates` ("Create a flow" — start from a template or
  scratch), the behavior building blocks (`onboarding-actions`, `onboarding-variables`,
  `onboarding-navigation-branching`) alongside the visual ones in `flow-design`, then
  `builder-save-publish` and attaching the result to a placement. **This is only half the job — the
  flow still has to reach a device.** The reader's next stop is `sdk-flows-display`: the platform's
  "Display flows & paywalls" article (for example `ios-present-paywalls`, which covers
  `AdaptyFlowView`/`AdaptyFlowController`) is where they learn how the SDK actually renders the flow
  they just built.
- **Marketer building a specific screen type.** Arrives at one of the six recipes in
  `flow-builder-recipes` (e.g. `paywall-with-tabs`, `show-offer-on-close`) via search or the "What you
  can build" list on `adapty-flow-builder`. Each recipe is self-contained, states its prerequisites
  (usually "build a paywall screen first, see `basic-paywall-screen`"), and ends with the same two-step
  "Next steps" (save & publish, add to a placement) — a consistent, non-dead-end pattern across all six.
- **Developer wiring runtime resilience.** Arrives at `fallback-flows` (often from a checklist or from
  `adapty-flow-builder`'s own links) to keep the flow visible when the SDK can't reach Adapty. The
  article is explicit that this is developer work: download the platform's fallback JSON, then continue
  into `sdk-flows-display`'s `use-fallback-paywalls` family (e.g. `ios-use-fallback-paywalls`) to wire
  the file into app code — the same family a paywall fallback uses, confirmed shared in the article
  itself.
- **Developer/PM updating copy without a release.** Arrives at `customize-flow-with-remote-config` to
  edit the flow's JSON payload — no code required for this half. To actually consume the payload, the
  article hands off to `present-remote-config-paywalls` (iOS) or `present-remote-config-paywalls-android`
  — both in `sdk-flows-manual`, a different neighbour than the one above, because reading remote config
  at runtime is a distinct SDK surface from rendering the flow itself.
- **Team deciding whether to migrate off separate onboardings/paywalls.** Arrives at `migrate-to-flows`,
  which compares flows against Paywall Builder paywalls and onboardings, then walks four steps ending in
  "Update the SDK" — which sends the reader to the platform's v4 migration guide (`sdk-migrations`) and a
  sandbox-purchase check (`testing-and-release`). See the open question below: a reader who reads this
  far and decides *not* to migrate yet has no forward link back to the legacy builders they're staying
  on.

## Ripple rules

- **`adapty-flow-builder` ↔ `migrate-to-flows`: verified duplicated content, not just co-change.** Both
  articles carry the identical "Flows are currently supported on iOS, Android, React Native, Flutter,
  and Capacitor SDK v4 and up" `:::important` callout, word-for-word, and embed the same YouTube video
  (`8Cby6lVGI0o`). Cochange confirms this pair moves together (3× in `mill:cochange flow-logic`); a
  platform-support change to Flow Builder must update both copies of this sentence, not one.
- **`adapty-flow-builder` ↔ `builder-ui` ↔ `paywall-builder-templates` ↔ `flow-builder-recipes` ↔
  `onboarding-flow-tutorial`: the hub cluster.** Cochange shows every pair in this set at 1–3× (e.g.
  `adapty-flow-builder`+`builder-ui` 3×, `builder-ui`+`paywall-builder-templates` 2×). Directly confirmed
  in git history: commit `660fd74dd` ("New videos + YouTube playlist callout") touched all five in one
  pass (plus `flow-design`'s `manage-paywall-ui-elements`). Any change to the top-level Flow Builder
  narrative, its embedded videos, or its "what you can build" list ripples across this whole cluster.
- **`builder-save-publish#troubleshooting` is the single canonical list of "blocks previewing and
  publishing" conditions, and it is under-linked from where those conditions actually originate.**
  Six separate `:::important` callouts across `onboarding-actions.mdx` (Show/Hide, Show alert, Set
  variable, Purchase, Custom action, incomplete conditional rule) and two more in `paywall-product-block`
  (unassigned product element/group) and one in `customize-flow-with-remote-config` (invalid JSON) all
  point back to this one section — and the reusable `<FlowBuildErrors/>` snippet is imported by both
  `builder-save-publish.mdx` and `paywall-device-compatibility-preview.mdx`. Adding a new
  publish-blocking condition anywhere in the builder needs a new callout at its source article *and* an
  entry in `FlowBuildErrors` — co-change mining alone would likely miss this (it's a shared-reusable
  pattern, not a same-commit pattern), which is exactly the kind of rule the read-through was for.
- **`paywall-product-block` ("Set up purchases") is the canon for two duplicated micro-recipes, not just
  a cross-link target.** The "add a purchase button: On tap → Purchase → `products.selectedProduct`"
  steps are re-explained near-verbatim (not just linked) in `basic-paywall-screen`, `paywall-with-tabs`,
  `paywall-features-per-product`, `show-plans-bottom-sheet`, and `onboarding-flow-tutorial` — five
  duplicate copies. The "insert `products.selectedProduct.prod_price` into a button label" micro-recipe
  is duplicated the same way in `paywall-with-tabs`, `paywall-features-per-product`, and
  `show-plans-bottom-sheet`. A change to either mechanic (e.g. a renamed action type, a new required
  field) must be checked against all of these, not just against `paywall-product-block` itself.
- **The "Test on device" QR flow is described in three places, and two of them share a sentence.**
  `paywall-device-compatibility-preview.mdx`'s "Preview on devices" section and `migrate-to-flows.mdx`'s
  "Preview on device" section both walk the same four steps (download the Adapty app, click **Test on
  device**, pick a locale, scan the QR) and both carry a near-identical "prices shown aren't real, Adapty
  can't reach the stores" caveat. Git confirms this pair already ripples together in practice: commit
  `9159e2e69` ("Add Android app links alongside iOS app links") touched both files in the same pass.
- **Metrics-field additions are a cross-zone ripple that still touches this zone.** Commit `c65300c71`
  ("New webhook fields") touched `flow-metrics.mdx` together with `paywall-metrics.mdx`,
  `placement-metrics.mdx`, `results-and-metrics.mdx`, and `webhook-event-types-and-fields.mdx` in one
  pass — mostly outside flow-logic, but a new revenue/proceeds/webhook field belongs in `flow-metrics`
  too whenever it lands in that cluster.

## Boundaries

flow-logic is behaviour and lifecycle; `flow-design` is appearance. The distinguishing question: **is
the reader's task answered by describing a trigger, action, condition, variable, product/purchase
assignment, or a stage of the create→preview→publish→measure lifecycle (flow-logic) — or by describing
a screen's layout, an element's look, a style, dark mode, a font, or translated copy (flow-design)?**
The six "Common flow recipes" stay in flow-logic under this test even though each one also walks through
layout steps: what makes each recipe worth writing down is always a behaviour mechanic — a variable
binding (`strikethrough-price`), a conditional-visibility rule keyed to the selected product
(`paywall-features-per-product`), a Show/Hide action (`show-plans-bottom-sheet`), a conditional action on
a Boolean flag (`show-offer-on-close`), or a purchase/restore wiring pattern that repeats across all six.
The layout instructions in a recipe are scaffolding for that mechanic, not the reason the recipe exists.

`adapty-flow-builder` and `builder-ui` sit in flow-logic as the entry point and the full interface
reference, and both link out into `flow-design` topics (element library, styles, dark mode, localization)
constantly — that's expected of a hub and entry point, not a boundary violation. The reverse is also true:
`flow-design`'s hub articles are expected to link back into flow-logic's Interactions/Actions/Variables
topics whenever an element's *behaviour* (not its look) comes up.

`fallback-flows`, `customize-flow-with-remote-config`, and `migrate-to-flows` are inherently cross-zone
with the SDK side — see "Reader jobs" for exactly which `sdk-flows-display`/`sdk-flows-manual`/
`sdk-migrations` article each one hands off to. That hand-off is the boundary, not a gap: this zone owns
"what you configure in the dashboard," the SDK zones own "what code reads it."

## Ticket language

Corpus-wide synonyms (Flow ↔ Paywall Builder, paywall ↔ flow in v4, remote config ↔ custom JSON) live in
`aliases.md` and are deliberately not repeated here. Several filenames in this zone are frozen from the
pre-flow era (`paywall-*`, `onboarding-*`) — the ticket's word for a thing rarely matches the id.

| How a ticket says it | Where it actually lives |
|---|---|
| "flow logic", "flow behavior", "the branch didn't fire", "what does this panel do", "where is the publish button" | This zone, not `flow-design` — apply the Boundaries test (trigger/action/condition/variable/lifecycle = here; layout, look, style, copy = `flow-design`). A pure "tour the interface" question is `builder-ui`, which is also the fastest way to answer "where is X in the editor". |
| "create a flow", "start from a template", "template gallery", "duplicate flow name warning" | `paywall-builder-templates` — the create-a-flow entry point despite the pre-flow filename. `adapty-flow-builder` only orients; it doesn't walk the creation steps. |
| "buy button does nothing", "restore link", "price inside the button label", "pre-selected plan", "assign a product to a card" | `paywall-product-block` is canon for all of it — and an unassigned product element is also one of the conditions that blocks publishing, so a "flow won't publish" ticket often ends here. Five recipes re-explain these steps verbatim; fix the mechanic here first. |
| "route users by quiz answer", "personalize a screen from an answer", "navigate on tap without a button" | Split by what the ticket actually wants: *which screen comes next* → `onboarding-navigation-branching`; *store the answer and reuse it in text* → `onboarding-variables`; *a worked end-to-end example* → `onboarding-flow-tutorial`. |
| "if/then/else", "conditional action", "close the flow from a button", "exit-intent offer", "last-chance discount before they leave" | `onboarding-actions` is canon for actions and conditional actions; the close-time discount itself is the `show-offer-on-close` recipe, which implements it as a conditional action on a Boolean flag — not as a separate feature. |
| "custom action doesn't do anything", "the flow needs the result back", "validate an SMS code inside the flow", "gate the flow behind login" | `onboarding-actions`. The load-bearing constraint: a custom action is one-way — app code receives the Action ID but cannot return a value into the flow, so anything that depends on a result is split across two placements. |
| "hide an element for some users", "show only if the user is on trial", "progress bar", "step indicator", "spinner while the answer is processed" | Element-shaped tickets that are really behaviour: a state-based rule is `onboarding-element-visibility` (which also settles precedence against a Show/Hide *action* in `onboarding-actions`); progress/loading elements are `builder-loaders-and-progress-bars` because they are driven by flow state. Neither is `flow-design`. |
| "price renders empty", "trial price missing for some users", "localized price in body text", "variable name with dots" | `onboarding-variables`. The usual cause is not a typo: offer variables resolve to empty for users who aren't eligible for that offer, so the text needs a fallback. |
| "monthly/yearly toggle", "segmented control", "highlight one plan and hide the rest", "slide-up plan picker", "features per tier", "crossed-out price", "percent-off badge" | The recipes, chosen by mechanic rather than by look: `paywall-with-tabs` (multiple product groups on one screen), `show-plans-bottom-sheet` (Show/Hide action), `paywall-features-per-product` (condition on the selected product), `strikethrough-price` (product-variable binding). `flow-builder-recipes` is the index if the ticket is vague, and every one of them assumes the base screen from `basic-paywall-screen` already exists. |
| "push the change to users", "does saving make it live", "draft vs published", "flow status", "publish blocked/publish error", "swap a font without breaking older app builds" | `builder-save-publish` — saving is not publishing, the "Flow status" table decodes the Flows-page column, and `#troubleshooting` (shared `FlowBuildErrors` reusable) is the canonical block list. Font/asset availability is an app-version compatibility constraint documented here and in `paywall-builder-templates`, not a typography question for `flow-design`: custom fonts do **not** ship with the flow, so changing one on a published flow means duplicating it and targeting the copy at app versions that bundle the file. |
| "test on device", "QR code", "prices are wrong in the preview", "iPad view", "check it before publishing" | `paywall-device-compatibility-preview`. Preview and Test-on-device can't reach the stores, so displayed prices aren't real — expected, not a bug. `migrate-to-flows` carries a near-duplicate of the same caveat. |
| "what counts as a flow view", "conversion looks wrong", "revenue vs proceeds", "ARPPU/ARPAS", "where users drop off", "cohort by install date" | `flow-metrics` — definition questions, answered by the article's own prose (there is no registered metrics spec; see Sources of truth). Shares vocabulary with `paywall-metrics` (`paywalls-legacy`) and `placement-metrics` (`placements-and-audiences`), which is why a new revenue field lands in all of them at once. |
| "change copy without an app release", "hard-paywall flag", "server-driven values", "per-locale JSON" | `customize-flow-with-remote-config` for authoring the JSON. Reading it at runtime (`remoteConfig` dictionary vs `jsonString`, `remoteConfigs` on the flow) is `sdk-flows-manual` — a different zone from the one that renders the flow. |
| "flow won't load without internet", "offline flow", "fallback file was generated for another SDK version" | `fallback-flows` for downloading and scoping the file; wiring it into app code is `sdk-flows-display`'s fallback family. The SDK-version stamp on the file is the usual cause of "the fallback loads but looks wrong". |
| "should we switch to flows", "combine onboarding and paywall", "keep the old paywall live during rollout", "`getFlow` vs `getPaywall`", "A/B test a flow" | `migrate-to-flows` for the decision, the comparison table, and the rollout sequence. Running the A/B test is not this zone — that's `ab-tests` (and `placements-and-audiences` for how a published flow goes live at all); the SDK call itself is `sdk-flows-display`. |

## Gaps and misses

- `migrate-to-flows` is framed as "the bridge" from the legacy builders to flows, and it correctly
  contrasts flows against "Paywall Builder paywall" and "Onboarding" in a table — but it contains **zero
  links into `paywalls-legacy` or `onboardings-legacy`**. A reader who reaches "Should you migrate?" and
  decides to stay on their existing paywall/onboarding for now has no forward link to keep managing it.
  Flagged as a question below rather than fixed, since it may be a deliberate choice not to point at a
  frozen zone.
- `builder-navigation-actions` (a roster "entry" role) is a pure router: one paragraph and a bulleted
  list of links, 0 H2s, and by `git log` it hasn't been touched since its creation on 2026-06-01 — the
  oldest last-touch date of any article in this zone. It's consistent with its job (routing, not
  content), so this is a note for future reference, not a defect.
- `flow-metrics` has no "Next steps" section, unlike every recipe and most workflow articles in this
  zone, which consistently end with a save/publish/placement pointer. It reads fine as a standalone
  reference page, but it's the one article in the zone that breaks the pattern.
- Five articles re-explain the purchase-button wiring steps instead of linking to `paywall-product-block`
  for them (see "Ripple rules"). Worth a deliberate editorial pass to replace duplication with links, but
  that's a content decision for the owner, not something this brief should decide unilaterally.

**TODO(owner):** Confirm whether `migrate-to-flows` deliberately omits links to `paywalls-legacy`/
`onboardings-legacy` (e.g. because that zone is frozen and shouldn't be pointed at as "current"), or
whether a "if you're not migrating yet, here's where your existing paywall/onboarding docs live" pointer
should be added.

**Duplication policy, from the docs owner (2026-08-10).** The goal is no duplication — prefer a link to
the canonical article, or a reusable snippet where the text is genuinely identical and load-bearing. But
apply it rationally rather than mechanically: reusables in this repo are often `Callout` components, and a
page stacked with them reads worse than the duplication it replaced. So before de-duplicating, ask whether
the reader loses a step they need in place; when in doubt prefer a link over a new reusable, and never add
a reusable purely to satisfy the rule.

Applied here: the five duplicated purchase-button/price-variable micro-recipes
(`basic-paywall-screen`, `paywall-with-tabs`, `paywall-features-per-product`, `show-plans-bottom-sheet`,
`onboarding-flow-tutorial`) are candidates to trim to a link into `paywall-product-block` — but a recipe
that stops being followable end to end is worse than the copy, so judge each one by whether the step is
needed in place.
