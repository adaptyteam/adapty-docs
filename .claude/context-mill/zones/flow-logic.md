---
zone: flow-logic
sources: [dashboard-interface, ios-sdk, jscore]
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
- **What the in-dashboard preview can resolve is decided in the host app, not in `unified-builder`.**
  `apps/web/src/pages/flows/flow-builder/api/products.ts` maps the catalog product into the builder's
  `IProduct`, and it sends exactly six fields: `id`, `title`, `access_level`, `price` (from `priceUsd`),
  `price_per_day`, `billing_period`. `IProduct` (`builder/src/shared/types/products.ts`) declares no
  offer fields at all. Read that mapper before writing any claim about what a preview shows: the
  builder's variable table (`PRODUCT_SUB_VAR_DEFS` in
  `builder/src/blocks/shared/variables/variables.common.ts`) can only resolve what the mapper sent, and
  a field's *absence* there is why a variable renders as a token. Verified 2026-08-24 against
  `origin/master` `db365e184`.
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
| archive-flows | — | marketer, dev | 2 | tutorial |
| basic-paywall-screen | — | marketer, dev | 11 | tutorial |
| builder-loaders-and-progress-bars | — | marketer, dev | 6 | tutorial |
| builder-navigation-actions | entry | marketer, dev | 0 | tutorial |
| builder-save-publish | — | marketer, dev | 4 | tutorial |
| builder-ui | — | marketer, dev | 15 | tutorial |
| copy-flows | — | marketer, dev | 2 | tutorial |
| customize-flow-with-remote-config | — | marketer, dev | 3 | tutorial |
| fallback-flows | — | marketer, dev | 4 | tutorial |
| filter-flows | — | marketer, dev | 5 | tutorial |
| flow-ai-editor | — | marketer, dev | 12 | tutorial |
| flow-builder-recipes | entry | marketer, dev | 0 | tutorial |
| flow-common-issues | reference | marketer, dev | 14 | tutorial |
| flow-funnel | — | marketer, dev | 13 | tutorial |
| flow-metrics | — | marketer, dev | 25 | tutorial |
| flow-screen-transitions | — | marketer, dev | 3 | tutorial |
| flow-show-hide-animations | — | marketer, dev | 6 | tutorial |
| flows-and-paywalls | entry | marketer, dev | 2 | tutorial |
| import-from-figma | how-to | marketer, dev | 12 | tutorial |
| migrate-to-flows | migration | marketer, dev | 8 | tutorial |
| onboarding-actions | — | marketer, dev | 23 | tutorial |
| onboarding-element-visibility | — | marketer, dev | 1 | tutorial |
| onboarding-flow-tutorial | — | marketer, dev | 10 | tutorial |
| onboarding-navigation-branching | — | marketer, dev | 4 | tutorial |
| onboarding-variables | — | marketer, dev | 8 | tutorial |
| paywall-builder-templates | — | marketer, dev | 6 | tutorial |
| paywall-device-compatibility-preview | — | marketer, dev | 4 | tutorial |
| paywall-features-per-product | — | marketer, dev | 10 | tutorial |
| paywall-onboarding-builder-deprecation | migration | marketer, dev | 3 | tutorial |
| paywall-product-block | — | marketer, dev | 7 | tutorial |
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
  articles carry the identical "Flows require Adapty SDK v4.0 or later." `:::important` callout,
  word-for-word (rewritten 2026-08-13 from the five-platform list after the owner confirmed all seven
  SDK platforms support flows), and embed the same YouTube video (`8Cby6lVGI0o`). Cochange confirms
  this pair moves together (3× in `mill:cochange flow-logic`); a version-support change to Flow Builder
  must update both copies of this sentence, not one.
- **`adapty-flow-builder` ↔ `builder-ui` ↔ `paywall-builder-templates` ↔ `flow-builder-recipes` ↔
  `onboarding-flow-tutorial`: the hub cluster.** Cochange shows every pair in this set at 1–3× (e.g.
  `adapty-flow-builder`+`builder-ui` 3×, `builder-ui`+`paywall-builder-templates` 2×). Directly confirmed
  in git history: commit `660fd74dd` ("New videos + YouTube playlist callout") touched all five in one
  pass (plus `flow-design`'s `manage-paywall-ui-elements`). Any change to the top-level Flow Builder
  narrative, its embedded videos, or its "what you can build" list ripples across this whole cluster.
- **`flow-common-issues#a-flow-wont-preview-or-publish` is the single canonical list of "blocks
  previewing and publishing" conditions.** Adding a new publish-blocking condition anywhere in the
  builder needs a new callout at its source article *and* an entry in that section — co-change mining
  alone would likely miss this, which is exactly the kind of rule the read-through was for.

  **Moved 2026-08-13** (this branch): the list used to live at `builder-save-publish#troubleshooting`,
  rendered from the reusable `<FlowBuildErrors/>` in both `builder-save-publish.mdx` and
  `paywall-device-compatibility-preview.mdx`. It now lives inline on the new `flow-common-issues`
  article, both former hosts carry a cross-link instead, and all 13 inbound links were repointed.
  `FlowBuildErrors.mdx` is deliberately **left on disk but unreferenced from English** — seven
  `src/locales/*` copies of the two former hosts still import it, and deleting it would break their
  build until the translation workflow regenerates them. It joins 12 other already-orphaned reusables
  (`for f in src/components/reusable/*; do grep -rl "reusable/$(basename $f)" src/content/docs src/components; done`),
  so the orphan is normal here rather than a defect. Delete it once the locale copies regenerate.

  **The previous version of this rule undercounted the inbound links** — it named 9 across 3 articles
  (six callouts in `onboarding-actions`, two in `paywall-product-block`, one in
  `customize-flow-with-remote-config`). `grep -rn "builder-save-publish#troubleshooting\|builder-save-publish#publish-a-flow" src/content/docs/`
  returned **13 across 5**. The three it missed: `onboarding-actions.mdx` actually had **eight**, not
  six (the brief's list omits the **Select product** callout at line 188 and the "see the full list"
  summary at line 300); `onboarding-text.mdx:163` (empty **Open URL** action) was not mentioned at all;
  and `paywall-layout-and-products.mdx:53` (a deleted screen orphaning its **Navigate to Screen**
  action) pointed at `#publish-a-flow` — the publish *instructions*, not the error list — so a grep for
  `#troubleshooting` alone would never have found it. When re-auditing this rule, grep for the article
  id without an anchor.
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
- **The product card's offer dropdown is labelled in three articles across two zones.** `create-offer`
  (`products-and-offers`) is the canon for binding an offer to a product card
  (`create-offer#add-offer-to-flow`); `paywall-product-block` and the `paywall-with-trial-toggle` recipe
  each repeat the control's label in their own steps. When the control is relabelled, all three move
  together — `grep -rn "offer dropdown\|Select offer" src/content/docs/` finds them. This already went
  stale once: the dropdown's placeholder **Select offer (optional)** was replaced by **No offer** in
  `origin/master` `db365e184`, and all three articles still carried the old label until 2026-08-24.
- **Metrics-field additions are a cross-zone ripple that still touches this zone.** Commit `c65300c71`
  ("New webhook fields") touched `flow-metrics.mdx` together with `paywall-metrics.mdx`,
  `placement-metrics.mdx`, `results-and-metrics.mdx`, and `webhook-event-types-and-fields.mdx` in one
  pass — mostly outside flow-logic, but a new revenue/proceeds/webhook field belongs in `flow-metrics`
  too whenever it lands in that cluster.

- **`flow-show-hide-animations` owns how to use Show element and Hide element (2026-11-10).** It covers
  the default (every element appears when the screen opens), which trigger fits which moment and where it
  goes, the starting **Visibility** of each target, the **Delay** and **Animation** settings, and three
  cases where both settings do nothing: conditional visibility, reusable components, bottom sheets.
  `onboarding-actions#showhide-elements` stays a short reference entry with a link, as **Navigate to
  screen** does for `flow-screen-transitions`. A change to the action's settings or exceptions ripples
  into `onboarding-element-visibility` (a condition overrides Show/Hide when its variable changes;
  conditional elements neither animate nor wait), `show-plans-bottom-sheet` and `flow-design`'s
  `builder-containers` (a sheet ignores **Animation** and **Delay**), `flow-design`'s `builder-styling`
  (**Show** / **Hide** are starting states), `convert-paywall-to-flow` (a converted close-button delay is
  a hidden button with its own **On Screen Appear** **Show element**), `builder-loaders-and-progress-bars`
  (a loader offers only **On Screen Appear**), and `flow-design`'s `flow-timer` (the close-button recipe).
- **Auto-advance has one canon: `flow-screen-transitions#move-users-to-another-screen-automatically`
  (2026-11-10).** Five pointers link to that anchor: `onboarding-actions` (Navigate to screen),
  `onboarding-navigation-branching`, `builder-navigation-actions`, `builder-loaders-and-progress-bars`,
  and the note in `flow-show-hide-animations`. Renaming the heading means retargeting all five
  (`rg -n move-users-to-another-screen-automatically src/content/docs`).
- **The 5-second **Delay** limit is stated in four articles, and one sentence is shared word for word.**
  `flow-screen-transitions`, `flow-show-hide-animations`, `flow-timer` (the Countdown route takes over
  beyond 5 seconds), and `builder-loaders-and-progress-bars`. The first two carry the identical "Use whole
  seconds: on iOS, a delay rounds up to a whole second." Keep that sentence identical in both.
- **Element state conditions have one owner: `element-states-in-conditions` (2026-11-16).** Pointers
  to it: `onboarding-element-visibility` (picker tab list and one intro sentence), `onboarding-text`
  (tab list and one sentence after the conditional-text steps), `onboarding-actions` (the "select a
  variable or the state of another element" sentence), `builder-navigation-actions` (router list),
  and `flow-design`'s `builder-element-states` (two pointers). Which state wins when several apply
  lives in `builder-element-states#when-several-states-apply-to-one-element`, and the article links
  there. A new picker tab, operand, or system state ripples into all of these. The **Circular state
  conditions** publish blocker has its row in `flow-common-issues`; the owner article covers only
  the picker side, as an item in its "you can't pick" list.
  Shipped-skill delta, flagged 2026-11-16 and not edited (the skills have their own owner):
  `flow-generator/references/verify-config.py` has no `elementState` case in its condition walker,
  so its local check rejects a flow the publish gate accepts; `flow-generator/references/flowkit.py`
  writes a bare comparison from `when()` (the builder expects the AND group above) and says there
  is no disabled mechanism; `flow-generator/references/flow-schema.md` says a button cannot be
  disabled. The builder supports a **Disabled** state with a condition.
- **The **On tap** "Supported on" cell in `onboarding-actions` was completed on 2026-11-11** from the
  element types that offer the trigger in the builder (dashboard code, 2026-11-10): buttons and other
  containers, quiz options, toggles, countdowns, images, videos, icons, text, carousels, bottom sheets,
  tabs, products. A new tappable element type needs an entry there and a check of the trigger table in
  `flow-show-hide-animations`.
- **`flow-builder-recipes` links platform recipes with a sentence, not a card (2026-11-18).** Its
  `<CustomDocCardList />` lists `tutorial.json` children only, so a recipe in a platform sidebar, such as
  `ios-virtual-currency-top-up`, gets a sentence link in the intro, next to the custom element examples.
  The same recipe has five more inbound links in prose: `onboarding-actions` (the custom action uses),
  `handle-paywall-actions`, `flow-custom-elements` and `ios-flow-custom-elements` (Examples), and
  `ios-flow-custom-tags`, plus three virtual currency articles that the `products-and-offers` brief
  lists (`rg -l ios-virtual-currency-top-up src/content/docs`, 2026-11-18: nine articles and `ios.json`).
  An Android version of the recipe adds its link in each of these places, in the `InlineTooltip` form
  that the custom element examples use. **The recipe was rebuilt on 2026-11-19** as "Spend and sell
  virtual currency in flows": two flows, no rewarded ad, no custom action, no upgrade offer. The links
  from `onboarding-actions` and `handle-paywall-actions` sent rewarded-ad readers to it, so their link
  text must not promise an ad. The rebuilt recipe puts one custom element Type on two elements
  (`spend_button` with the IDs `energy_refill` and `unlimited_energy`, one Swift view for both), and the
  balance element (Type `currency_balance`) in both flows. A change to how the resolver receives
  the Type and the ID, or to which resolver a flow uses, ripples into it.

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
| "custom action doesn't do anything", "the flow needs the result back", "validate an SMS code inside the flow", "gate the flow behind login", "watch an ad for coins", "rewarded ad button" | `onboarding-actions`. The load-bearing constraint: a custom action is one-way — app code receives the Action ID but cannot return a value into the flow, so anything that depends on a result is split across two placements. **Checked 2026-11-18:** still true in effect, although iOS and Android SDK 4.4.0 both have a public `AdaptyUI.FlowConfiguration.sendAppMessage`: the flow script that the builder compiles ignores app messages (builder and transformer code, 2026-11-17), so don't document it. On iOS 4.4, `.custom(id:arguments:)` never receives arguments from a builder-made flow. A custom action also never closes the flow: the iOS default handler ignores `.custom`, and only `.close` dismisses (AdaptySDK-iOS 4.4.0 `Sources.AdaptyUI/AdaptyUI+DefaultConfiguration.swift`). So whatever app code presents for the action, such as a rewarded ad, opens over the flow. `ios-virtual-currency-top-up` showed this with a rewarded ad until its 2026-11-19 rebuild dropped the ad (reviewer feedback: real games cap rewarded ads per day), so no article shows the case now. |
| "explain why Continue is greyed out", "show a message when the button is disabled", "disable two buttons together", "condition on another element", "States tab", "is the field focused" | `element-states-in-conditions` (2026-11-16). Traps: **Selected** yields to **Disabled** (one state at a time; rule in `flow-design`'s `builder-element-states`), so "which option did users pick" is the group variable on the **Elements** tab, not the state; the canvas shows a state only after the user activates it in the element's **States** section; a condition written outside the builder as a bare comparison saves and validates, but its editor's **Add Condition** does nothing until visibility is switched away and back. **Disabled** and **Active** have no variable: the **States** tab is the only route to them. |
| "hide an element for some users", "show only if the user is on trial", "progress bar", "step indicator", "spinner while the answer is processed" | Element-shaped tickets that are really behaviour: a state-based rule is `onboarding-element-visibility` (which also settles precedence against a Show/Hide *action* in `onboarding-actions`); progress/loading elements are `builder-loaders-and-progress-bars` because they are driven by flow state. Neither is `flow-design`. **Corrected 2026-11-18:** "show only if the user is on trial" is not a visibility rule. A condition can't read what the user owns (a subscription, a tier, an access level, a trial), because conditions read only custom variables, product variables, and element states (`onboarding-actions`, "You can't select a profile attribute or a custom tag in a condition"). `is_free_trial` is the product's offer eligibility, not the user's state. Build a separate flow per group and show it to an audience on the placement. `onboarding-actions` carried the counter-example "If not Premium, is the user on a Trial?" until 2026-11-18. |
| "the product name on the card is wrong", "the flow shows the App Store name, not ours", "show how many coins a pack gives" | `onboarding-variables`. On a device, `prod_title` is the store's localized product name (on iOS, StoreKit's `displayName`), never the Adapty product name. The flow gets `localizedTitle`, and the product data the SDK passes to the flow carries no Adapty product name (AdaptySDK-iOS `origin/master`, 2026-11-18: `Sources.UIBuilder/cue/jsBridge.SDKProducts.cue`, `Sources/StoreKit/Entities/AdaptyProduct.swift:35-37`). The `prod_title`-to-`localizedTitle` mapping itself is builder code, not read. The canvas differs: it resolves the catalog title (see the preview row below). No product variable carries a virtual currency amount (builder code, 2026-11-17). So "500 diamonds" is typed text, the store's display name through `prod_title`, or a custom tag, and nothing keeps any of them in sync with the amount in **Link Products**. |
| "price renders empty", "trial price missing for some users", "localized price in body text", "variable name with dots" | `onboarding-variables`. The usual cause is not a typo: offer variables resolve to empty for users who aren't eligible for that offer, so the text needs a fallback. **Ask which surface the reporter is looking at first** — that is the runtime answer, and in the builder preview the three offer values never resolve at all (see the preview row below), so a ticket filed from the canvas has a different answer from one filed against a device. |
| "monthly/yearly toggle", "segmented control", "highlight one plan and hide the rest", "slide-up plan picker", "features per tier", "crossed-out price", "percent-off badge" | The recipes, chosen by mechanic rather than by look: `paywall-with-tabs` (multiple product groups on one screen), `show-plans-bottom-sheet` (Show/Hide action), `paywall-features-per-product` (condition on the selected product), `strikethrough-price` (product-variable binding). `flow-builder-recipes` is the index if the ticket is vague, and every one of them assumes the base screen from `basic-paywall-screen` already exists. |
| "push the change to users", "does saving make it live", "draft vs published", "flow status", "publish blocked/publish error", "swap a font without breaking older app builds" | `builder-save-publish` — saving is not publishing, and the "Flow status" table decodes the Flows-page column. **The canonical block list moved to `flow-common-issues` on 2026-08-13** (see Ripple rules); `builder-save-publish#troubleshooting` survives as a cross-link, so route a "publish blocked" ticket to `flow-common-issues` directly. Font/asset availability is an app-version compatibility constraint documented here and in `paywall-builder-templates`, not a typography question for `flow-design`: custom fonts do **not** ship with the flow, so changing one on a published flow means duplicating it and targeting the copy at app versions that bundle the file. |
| "test on device", "QR code", "prices are wrong in the preview", "iPad view", "check it before publishing" | `paywall-device-compatibility-preview`. **The two preview surfaces resolve different things, and conflating them is how this row was wrong until 2026-08-24.** Test-on-device can't reach the stores, so its prices aren't real — expected, not a bug, and `migrate-to-flows` carries a near-duplicate of that caveat. The in-dashboard canvas is not the same: `prod_title`, `prod_price` and `prod_price_per_*` do resolve, from the Adapty catalog in USD, so "the preview shows the wrong price" there usually means "the canvas shows the catalog USD price, not the localized store price". What the canvas genuinely cannot resolve is the three offer values — `offer_price`, `offer_billing_period`, `offer_full_duration` render as `{{token}}`s by design — while `is_free_trial` / `is_pay_up_front` / `is_pay_as_you_go` do resolve from the card's bound offer and can be simulated per element with **Preview as**. All of this lives in `paywall-device-compatibility-preview#preview-products-and-offers`. |
| "what counts as a flow view", "conversion looks wrong", "revenue vs proceeds", "ARPPU/ARPAS", "where users drop off", "cohort by install date" | `flow-metrics` — definition questions, answered by the article's own prose (there is no registered metrics spec; see Sources of truth). Shares vocabulary with `paywall-metrics` (`paywalls-legacy`) and `placement-metrics` (`placements-and-audiences`), which is why a new revenue field lands in all of them at once. |
| "change copy without an app release", "hard-paywall flag", "server-driven values", "per-locale JSON" | `customize-flow-with-remote-config` for authoring the JSON. Reading it at runtime (`remoteConfig` dictionary vs `jsonString`, `remoteConfigs` on the flow) is `sdk-flows-manual` — a different zone from the one that renders the flow. |
| "flow won't load without internet", "offline flow", "fallback file was generated for another SDK version" | `fallback-flows` for downloading and scoping the file; wiring it into app code is `sdk-flows-display`'s fallback family. The SDK-version stamp on the file is the usual cause of "the fallback loads but looks wrong". |
| "should we switch to flows", "combine onboarding and paywall", "keep the old paywall live during rollout", "`getFlow` vs `getPaywall`", "A/B test a flow" | `migrate-to-flows` for the decision, the comparison table, and the rollout sequence. Running the A/B test is not this zone — that's `ab-tests` (and `placements-and-audiences` for how a published flow goes live at all); the SDK call itself is `sdk-flows-display`. |
| "Set variable doesn't switch the plan", "the toggle doesn't change the selected product", "how do I assign `products.selectedProduct`" | `flow-common-issues#a-set-variable-action-doesnt-change-the-selected-product`; the mechanics are `onboarding-actions#select-product`. **The trap, which caught an agent on 2026-08-13:** the tempting explanation is "product variables are read-only", and it conflates two unrelated things. Product *variables* (`prod_price`, `offer_price`) are store-sourced display values (`onboarding-variables.mdx:52-54`), but which product is *selected* is not a variable at all — so there is nothing to assign, and variable mutability is the wrong frame entirely. Answer with **Select product**. |
| "can't upload the image/video", "upload fails", "my logo is an SVG", "the GIF doesn't animate" | The reader-facing entry is `flow-common-issues#an-image-or-video-wont-upload`, but the limits themselves are owned by `flow-design`'s `custom-media` (Image and Video sections). Cross-zone by construction: when a format, size or duration limit changes, edit `custom-media` first and mirror it here — the troubleshooting page restates those numbers rather than sourcing them. |

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
- **`flow-common-issues` (added 2026-08-13) is the zone's troubleshooting page, and nothing links into it
  except the two former hosts of the publish-blocker list.** Its other sections have no inbound links at
  all, so a reader configuring the thing that breaks won't find the entry: the natural sources are
  `onboarding-actions#set-variable` for the Select-product case and `flow-design`'s `custom-media` for the
  upload case. Deliberately deferred by the owner while cases are still being added — do a single
  discovery pass once the page settles, rather than a callout per case.
- **Tooling note:** `mill:assign` rejects `--role=troubleshooting`; the valid set is `entry`, `how-to`,
  `reference`, `conceptual`, `migration`, `legacy-orphan` (`scripts/context-mill/zones.mjs:8`), so this
  article is filed as `reference`.

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

**Verified 2026-11-17 while documenting the Number picker (builder code; transformer code).**

- **Number conditions.** For a number variable, the condition picker offers `=`, `!=`, `>`, `<`, **Is empty**, and
  **Is not empty** — no `>=` or `<=`. The right side takes a typed number or another number variable. A picker's
  variable is never empty, so **Is empty** never matches it. No article lists the operators; the conditional-action
  owners (`onboarding-actions`, `onboarding-element-visibility`) are where they'd go.
- **No arithmetic.** Conditions, texts, and **Set variable** can't calculate (no arithmetic in the expression set, read
  2026-11-17); a BMI is calculated in app code and passed back through a custom tag (`flow-custom-tags`). Unmerged
  formula work exists in the builder; don't document it until it ships.
- **Navigate Next follows screen order, not answers.** It opens the next screen in the flow's order whatever users
  picked, so a branch to one of two parallel screens needs **Navigate to Screen** on both to rejoin.
- **What sends input values.** Navigation actions (**Navigate to Screen**, **Navigate Next**, **Navigate back**),
  including inside a conditional action, send the screen's pending input values; a tap on a quiz option or a toggle
  (not a product) sends them too. **Close flow**, a purchase, and a custom action don't. A hidden picker, or one in
  an unopened tab, still reports; an input inside a reusable component never reports (every input type).
- **Same-screen updates.** Texts and visibility that read a picker's `.value` re-evaluate when the wheel settles
  (code); not run on a device.
- **On Changed** is dropped at publish for every input (see `flow-design` Gaps); `onboarding-actions` still lists it.

**Verified 2026-11-18 for the virtual currency top-up recipe** (AdaptySDK-iOS 4.4.0, AdaptySDK-Android
4.4.0, builder code read 2026-11-17).

- **Custom elements ship on Android, and one hub sentence still says iOS-only.** AdaptySDK-Android tag
  `4.4.0` (2026-11-18) has `AdaptyCustomElementsResolver` (`adapty-ui/src/main/java/com/adapty/ui/AdaptyCustomElements.kt:54`)
  and flow format 5.2.0 (`adapty-ui/src/main/java/com/adapty/ui/internal/utils/consts.kt:18`), and docs
  PR #848 added the Android articles. `flow-builder-recipes.mdx:9` still ends with "(iOS-only)" after its
  custom elements link: `rg -n -i "ios-only" src/content/docs/guides/flow-builder/` finds that one line
  (2026-11-18). Not fixed in this pass.
- **Open, unconfirmed (2026-11-19): the builder's custom element callout and Android.** The custom
  element settings say "On Android, Flutter, React Native and other Adapty SDKs … users see the elements
  inside this block instead" (builder code, 2026-11-17), while AdaptySDK-Android 4.4.0 renders custom
  elements (the bullet above). Not traced: whether the callout predates Android 4.4, or the builder
  serves Android something else. The callout shows in `vc-top-up-custom-element.webp`. A question for
  the product team.
- **The custom element and custom tag articles belong to no zone.** `mill:status` on 2026-11-18 lists
  as unassigned `flow-custom-elements`, `flow-custom-tags`, the seven platform `*-flow-custom-tags`
  pages, the iOS and Android `*-flow-custom-elements` pages, the three custom element recipes on each of
  the two platforms, and `ios-virtual-currency-top-up`. The task decided that flow-logic owns the recipe
  (2026-11-17), but no `mill:assign` ran, and no brief describes custom elements or custom tags yet.
  Open: which zone owns them (this one, `flow-design`, or the SDK zones for the platform pages).
- **The action dropdown says Custom Action.** The UI label is **Custom Action**, and the ID input has no
  label, only the placeholder **Add action ID** (builder code, 2026-11-17). `onboarding-actions` and the
  v4 lines of the seven `*-handle-paywall-actions` articles say "the **Custom** action" and bold
  **Action ID** as a field; `respond-to-purchase-outcomes` matches the UI. Found by
  `rg "\*\*Custom\*\* action"` (2026-11-17). Not fixed; the docs owner decides.
- **Open: the purchase-outcome actions.** Builder and transformer work that runs actions per purchase
  result (succeeded, failed, cancelled, pending) was unmerged on 2026-11-17, and docs PR #822 (open on
  2026-11-18) describes it. Once it ships, a flow can close itself after a purchase, and the recipe's
  app-side close in `didFinishPurchase` becomes one of two options. Re-check before that PR merges.
