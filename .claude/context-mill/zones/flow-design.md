---
zone: flow-design
sources: []
reviewed_shape: f5a30d497568
reviewed_at: 2026-08-10
---

## What this is

The visual half of Adapty's Flow Builder documentation: how a flow's screens, layer hierarchy,
layout, styling, dark mode, every element type, custom fonts, and per-locale flow content get
designed in the dashboard. Split from `flow-logic` on 2026-08-06 by design-versus-behaviour, not by
sidebar shape — some of these 20 articles sit loose under **Flows (Beta)** rather than inside a
visual-looking subcategory.

The audience is a marketer or designer working the builder UI, not a developer. Every article assumes
the reader is looking at the Flow Builder canvas and right panel, never at source code — code only
shows up as the occasional "and here's how the SDK reads that" pointer out of the zone.

## Surfaces

The Adapty Dashboard's Flow Builder editing surface — the canvas, left panel (Screens/Layers,
Styles), and right panel (Design/Interactions/Screen settings) reached via **Flows (Beta)** in the
dashboard nav. Not the SDK, not any API, not the Paywall Builder (the pre-flow legacy product, whose
surviving articles live in `paywalls-legacy`).

## Sources of truth

- **Exact in-product labels, control names, and preset names** — verify against `dashboard-interface`
  (`packages/unified-builder`) per `.claude/context-mill/sources.md`. Do not invent a label that isn't
  in either an article or that repo; several labels in this zone (e.g. the exact wording of layer
  context-menu actions, States-settings option names) are transcribed from the product and could drift.
- **Everything else** — the 20 articles are the source of truth for documented behaviour; there is no
  separate design spec for this zone.

## What we document, what we don't

**Document:** every visual property in the Design panel (fill, border, corners, effects, animation,
typography, states, layout, position, sizing, spacing, stacking order); the screen/layer model and its
clipboard/context-menu actions; every element type's presets and settings (containers, carousels,
bottom sheets, footers, dividers, text, media, buttons, tabs, toggles, reviews/testimonials, countdown
timer, quizzes, inputs/forms, selectable groups); dark-mode color-style mechanics; custom-font upload
and the app-bundling step; per-locale JSON payloads for flow content (remote config).

**Don't document:** purchase/product logic itself (`paywall-product-block` — "Products and purchases"
is explicitly `flow-logic`, even though a product card is dragged onto the canvas like any other
element); navigation, conditional actions, and variables mechanics (`flow-logic`), even though this
zone's elements are what those mechanics act on; the flow lifecycle (create, preview, save & publish,
metrics, fallbacks, migration — `flow-logic`); anything past "the SDK reads this field" — deep
per-platform integration is `sdk-flows-display`'s job. Per house rule, this brief does not flag "no
article for platform X" as a gap — coverage review isn't in scope for this tool.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| add-flow-remote-config-locale | — | marketer | 4 | tutorial |
| add-paywall-locale-in-adapty-paywall-builder | — | marketer | 9 | tutorial |
| builder-containers | — | marketer | 13 | tutorial |
| builder-element-states | — | marketer | 7 | tutorial |
| builder-elements | entry | marketer | 20 | tutorial |
| builder-inputs-and-forms | — | marketer | 7 | tutorial |
| builder-reviews-and-testimonials | — | marketer | 4 | tutorial |
| builder-styling | — | marketer | 23 | tutorial |
| builder-tabs | — | marketer | 5 | tutorial |
| builder-toggles | — | marketer | 0 | tutorial |
| custom-media | — | marketer | 7 | tutorial |
| flow-selectable-elements | entry | marketer | 6 | tutorial |
| flow-timer | — | marketer | 5 | tutorial |
| manage-paywall-ui-elements | — | marketer | 14 | tutorial |
| onboarding-quizzes | — | marketer | 3 | tutorial |
| onboarding-text | entry | marketer | 10 | tutorial |
| paywall-buttons | — | marketer | 6 | tutorial |
| paywall-dark-mode | — | marketer | 4 | tutorial |
| paywall-head-picture | — | marketer | 4 | tutorial |
| paywall-layout-and-products | — | marketer | 13 | tutorial |
| paywall-localization | entry | marketer | 0 | tutorial |
| using-custom-fonts-in-flow-builder | — | marketer | 5 | tutorial |
<!-- /mill:auto -->
## Reader jobs

- **"I'm about to design my first flow screen and don't know where anything lives."** Readers land
  here (right after `flow-logic`'s `paywall-builder-templates` and `builder-ui`) on
  `paywall-layout-and-products` (titled "Screens and layers" despite its filename) → `manage-paywall-ui-elements`
  ("Layout and positioning", despite its filename) → `builder-styling` ("Styles and appearance"). These
  three, plus `builder-elements`, form the entry cluster — see Ripple rules.
- **"I need to add a specific kind of element to a screen."** `builder-elements` is the catalog/dispatch
  hub: it routes to `builder-containers`, `onboarding-text`, `custom-media`, `paywall-buttons`,
  `builder-tabs`, `builder-toggles`, `builder-reviews-and-testimonials`, `flow-timer`,
  `onboarding-quizzes`, or `builder-inputs-and-forms` depending on element family. Confirmed house fact:
  new elements always append to the layer tree root, so every one of these articles should say "click
  +, then drag into the target container," never "select the parent first."
- **"I want an element to look different when selected, focused, or disabled."**
  `flow-selectable-elements` (make it selectable, group types) → `builder-element-states` (style each
  state) → back into `builder-styling#state-specific-settings-interactive-elements` for the panel
  mechanics.
- **"I want my flow's colors to adapt to the device's light/dark setting."** `builder-styling` (color
  styles, the two light/dark swatches) → `paywall-dark-mode` (dedicated toggle, status-bar theme,
  preview, removal).
- **"I need typography that matches my brand, not the system font."** `onboarding-text` (set up text
  styles) → `using-custom-fonts-in-flow-builder` (upload + the app-bundling step — the one place this
  zone hands off to Apple/Android's own docs directly, not to an Adapty SDK article).
- **"I've added per-locale content to my flow's remote config — now I need my app to load the right
  payload for the user's locale."** This is where the job leaves the dashboard: `add-flow-remote-config-locale`
  documents the JSON-per-locale mechanism and even names the runtime API (`AdaptyFlow.remoteConfigs`,
  `AdaptyRemoteConfig`) but links nowhere for it — the reader's actual next stop is the per-platform
  `get-pb-paywalls` family in `sdk-flows-display` (e.g. `android-get-pb-paywalls`,
  `flutter-get-pb-paywalls`), where fetching the flow object and reading its remote config is the
  documented SDK-side job. This zone's own `custom-media` article already links across this exact seam
  (`get-pb-paywalls#customize-assets`), confirming `get-pb-paywalls` is the right real target.

## Ripple rules

- **Screen/Layer/Layout/Elements core cluster.** `paywall-layout-and-products`,
  `manage-paywall-ui-elements`, `builder-elements`, and `builder-containers` co-change with each other
  2–3× each (`npm run mill:cochange flow-design`) and cross-link into each other's anchors
  (`paywall-layout-and-products#layer-actions`, `#screen-actions`, `#selectable-groups`;
  `manage-paywall-ui-elements#layout` referenced from `builder-elements`' List section). A change to
  layer-action names/shortcuts, the Wrap/Unwrap mechanic, or the Screens-and-Layers panel must be
  checked against all four, not just the one article it's nominally "about."
- **Text-styling trio.** `builder-styling`, `onboarding-text`, and `using-custom-fonts-in-flow-builder`
  co-change 2× each pair, and the same "Weight/Bold/Italic don't apply to custom fonts — upload each
  variant as a separate file" warning is duplicated near-verbatim in all three (`builder-styling.mdx`
  "Size and weight" warning, `onboarding-text.mdx` twice — once near "Set up text styles," once in
  "Typography properties," `using-custom-fonts-in-flow-builder.mdx` step 0 of "Add a custom font"). If
  that limitation ever changes, all three copies need editing together; editing one won't surface the
  others.
- **Reused screenshot assets.** Confirmed pairs sharing the same image file: `builder-gradient-demo.webp`
  (`builder-styling` Fill section + `paywall-head-picture` Gradient section), `flow-builder/alignment-distribution-demo.webp`
  (`manage-paywall-ui-elements` + `builder-containers`), `builder-dark-mode-demo.webp` (`builder-styling`
  Dark mode subsection + `paywall-dark-mode` hero image), `countdown-templates.webp` (`builder-elements`
  Countdown section + `flow-timer` Templates section), `user-engagement-templates.webp`
  (`builder-elements` + `builder-reviews-and-testimonials`), `tab-templates.webp` (`builder-elements` +
  `builder-tabs`). A redesign of any of these controls invalidates every listed copy, not just the "main
  article."
- **Locale sweeps cross into every SDK platform and into `paywalls-legacy`.** Commit `40b608f0b`
  ("Big localization PR: default locale, media localization, fallback config edits...") touched this
  zone's `custom-media.mdx` in the same commit as `paywalls-legacy`'s
  `add-paywall-locale-in-adapty-paywall-builder.mdx`, all seven platforms'
  `*-localizations-and-locale-codes.mdx` (`sdk-flows-display`), and `flow-logic`'s
  `fallback-flows.mdx`/`fallback-paywalls.mdx`. A locale-mechanism change starting in this zone's media
  or locale articles should be checked against every platform's localizations article and the fallback
  articles, not just its sibling here.
- **Measured limitation:** co-change only surfaces sibling clusters and entry/detail pairs from small
  commits; large sweep commits (translation runs, link-checker passes) are excluded as noise, so an
  absent co-change signal is not evidence a ripple rule doesn't exist — the screenshot-reuse and
  duplicated-warning rules above were both found by reading, not by co-change.

## Boundaries

**flow-design vs. flow-logic — the test:** does the change alter what an element *looks like*, or how
it's positioned, styled, or typed, without touching what it *does* when tapped or what data drives it?
→ `flow-design`. Does it alter navigation, conditions, purchases, remote-config *values*, fallback
behaviour, or the flow lifecycle (create / preview / save & publish / metrics / migrate)? →
`flow-logic`. The split is design-versus-behaviour, not sidebar shape — several of this zone's articles
(the Elements sub-pages) sit loose under **Flows (Beta)** rather than under a visual-sounding category.

Confirmed edge cases:
- **Trial toggle** (`builder-toggles`) is `flow-design` — it's the visual switch element itself. The
  purchase/product-swap behaviour it can trigger is documented in `flow-logic`'s `onboarding-actions`
  and `paywall-product-block`.
- **Products** (`paywall-product-block`, "Products and purchases" in the sidebar) is `flow-logic` even
  though a product card is dragged onto the canvas exactly like a `flow-design` element — because its
  content is live pricing data and purchase wiring, not static design. `builder-elements` and
  `flow-selectable-elements` both link out to it as flow-logic territory.
- **Per-locale flow content** (`add-flow-remote-config-locale`) is `flow-design` — it's translating
  copy. The general remote-config *values* mechanism (`customize-flow-with-remote-config`) is
  `flow-logic` — it's wiring dynamic values and conditions. The test: is the reader translating text per
  locale, or driving logic with a value?
- **Selectable/state mechanics** (`flow-selectable-elements`, `builder-element-states`) document what a
  state *looks like* once styled; the condition syntax that actually triggers a Disabled state or routes
  on a selection lives in `flow-logic` (`onboarding-actions`, `onboarding-element-visibility`).

**Boundary with `sdk-flows-display`:** this zone stops at what a marketer configures in the dashboard.
Anything requiring app code — fetching the flow object, reading `AdaptyFlow.remoteConfigs`, bundling a
custom font file into the app, supplying a runtime value for a custom media ID — is `sdk-flows-display`'s
job (or, for font/asset bundling specifically, an external Apple/Android doc this zone links to
directly, bypassing our own SDK docs).

TODO(owner): `add-paywall-locale-in-adapty-paywall-builder` sits in the sidebar's Flows > Localization
category, labeled "Add locale in Adapty Flow Builder," directly beside this zone's
`add-flow-remote-config-locale` — but `zones.json` assigns it to `paywalls-legacy`, and three of this
zone's own articles (`custom-media`, twice in `onboarding-text`) link to it as the canonical "add a
locale" reference. Is that zoning intentional (the article is genuinely legacy Paywall-Builder-only
content and the sidebar label/links are stale), or should it move into `flow-design`? See Questions in
the interview report for the evidence trail.

## Ticket language

Corpus-wide synonyms (Flow ↔ Paywall Builder, paywall ↔ flow in v4) live in `aliases.md` and are
deliberately not repeated here. Two ids in this zone actively mislead: `paywall-layout-and-products` is
"Screens and layers" and `manage-paywall-ui-elements` is "Layout and positioning" — never route by
filename. Rows below are the cases where the visual symptom has a structural cause, or where several
articles in this zone are plausible and one is right.

| How a ticket says it | Where it actually lives |
|---|---|
| "the element landed at the bottom instead of inside the card", "can't nest it", "z-index does nothing", "layer order isn't stacking order" | Two different layer-tree misconceptions. **Adding**: a new element always appends to the *root* of the tree, so the instruction is click **+** (catalog: `builder-elements`), then drag it into the target container in **Layers** — or select it and use **Wrap** (`paywall-layout-and-products#layer-actions`, `builder-containers#wrap-and-unwrap`). **Overlapping**: relative elements never overlap, so nothing stacks until an element is switched to **Absolute** or **Fixed**, and only those get a **Z-index** field (`manage-paywall-ui-elements#stacking-order`). |
| "safe area", "hide the status bar", "content won't scroll", "mirror the layout for Arabic/Hebrew", "no progress bar on the welcome screen" | Screen-level, not element-level — readers hunt for these in the selected element's panel. **Safe area**, **Status bar**, **Vertical scroll**, **Mirror for RTL** and **Include screen in progress indicator** are all in `paywall-layout-and-products#screen-settings`. The progress-indicator element itself is `flow-logic`'s `builder-loaders-and-progress-bars`; this is only the per-screen opt-out. |
| "button must stay visible while the page scrolls", "sticky bottom bar", "the slide-up plan picker opens by itself" | `builder-containers`. Footer vs a **Fixed** element is the actual decision: a Footer reserves its own height and covers the bottom safe area (one per screen, can't be duplicated), a Fixed element floats over scrolling content without reserving space and you manage its safe-area offsets yourself (`manage-paywall-ui-elements`). A Bottom Sheet renders as soon as the screen loads unless you set **Visibility → Hide** and trigger it with a **Show** action — and you have to build its content *before* hiding it, because hidden layers can't be edited. |
| "image is cut off by the notch", "edge-to-edge background", "content hidden behind the home indicator" | Depends which media it is. A screen **Fill** background always covers the whole viewport, including behind the notch and system bars, even with Safe area enabled (`paywall-head-picture`). An image or video *element* stays inside the safe area until you position it **Fixed**, zero all four offsets and select **Ignore safe area** (`manage-paywall-ui-elements#ignore-safe-area`, restated in `custom-media`). |
| "video doesn't play", "the animation doesn't move", "the image I upload isn't what users see" | The canvas is not the device. Video renders as a still frame in the editor (`custom-media`, `paywall-head-picture`); animations stay static until **Toggle animations** or **Play Animation** (`builder-styling#preview-the-animation`); and a media element tagged with a **custom media ID** treats the uploaded file as a *fallback* that app code can replace at runtime (`custom-media#custom-media-id` — the SDK half is `sdk-flows-display`'s `get-pb-paywalls`). Wrong prices in preview and on-device test builds are `flow-logic`'s `paywall-device-compatibility-preview`. |
| "font is right in the builder, wrong on device", "Bold does nothing", "can I delete this font" | `using-custom-fonts-in-flow-builder`. The uploaded file is **editor-preview only** — Adapty doesn't push it to devices, so without the file in the app bundle the SDK falls back to SF Pro / Roboto. **Weight, Bold and Italic don't apply to custom fonts** at all: upload one file per variant (the same warning is duplicated in `builder-styling` and `onboarding-text` — see Ripple rules). Deleting a font silently rewrites every reference to the system font across draft *and* published flows, with no undo. Whether a published flow may use a font at all is an app-version question: `flow-logic`'s `builder-save-publish`. |
| "dark mode doesn't switch this element", "changed one heading and every screen changed", "roll out new brand colors" | `builder-styling#reusable-styles`: dark mode works **only** through named color styles — an element filled with a raw hex has no dark variant to switch to. The same mechanism is the other complaint: editing a color or text style updates every element referencing it, on every screen. The dedicated dark-mode surface (light/dark pair per style, status-bar theme, preview toggle, **Delete dark theme**) is `paywall-dark-mode`. |
| "crossed-out price", "different headline per plan", "translated text overflows its box" | `onboarding-text`. The **Old Price** element must sit *inside* a product card — outside one it renders an "Old price" placeholder — and it shows that card's own price × a **Multiplier**; crossing out a *different* product's real price is `flow-logic`'s `strikethrough-price` recipe instead. Content set to **Conditional** swaps the text itself (the content-swap sibling of `flow-logic`'s `onboarding-element-visibility`), and **Truncate** is the answer to variable-length dynamic or localized copy. |
| "Terms of Service link", "opens in the wrong browser", "'Learn more' inside a paragraph" | Split by the role the text plays: an **inline link** inside flowing copy always opens the in-app browser (`onboarding-text#add-links`); a standalone tap target is a button with an **Open URL** action, which can open in-app or externally (`paywall-buttons`; the action itself is `flow-logic`'s `onboarding-actions`). A purchase button that doesn't purchase is `flow-logic`'s `paywall-product-block`, not a button-design issue. |
| "quiz lets users pick several answers", "need single choice", "options on two screens won't group" | Most quiz presets are **multi-choice by default** — change **Group type** in **Screen settings > Selectable groups** (`onboarding-quizzes#change-quiz-type`, `flow-selectable-elements#group-types`). A group cannot span screens: all its elements must sit on one screen, though conditions on any screen can read it. Where the answer then routes the user is `flow-logic`. |
| "selected style only applied to one option", "grey out the submit button", "error style appears too late", "empty field counts as valid" | `builder-element-states` for the look, `builder-inputs-and-forms` for the rules. Four constraints do the work: state styling does **not** propagate to siblings (style one element, then duplicate it); **Disabled** never activates on its own — it needs a condition, typically `<elementId>.isValid = false`; **Invalid** activates only when the user submits, so nothing turns red while typing; and an empty input is always valid (Text inputs have no rules at all, so their `isValid` is always true). |
| "swipeable slides", "let users switch monthly/yearly", "branch on which slide they picked" | A Carousel's active slide is **not** a selectable group — slides can't be referenced in conditions or dynamic text, so it's for visual rotation only (`builder-containers#carousel`). `builder-tabs` is the single-choice-group version, exposing `selectedOptionId` / `selectedOptionTitle`. Switching whole product groups is `flow-logic`'s `paywall-with-tabs` recipe. |
| "countdown restarts every time the screen opens", "timer should survive an app restart" | `flow-timer` — the **Behavior** dropdown: **Every appear** (default), **First appear** (first view in the current app session), **First appear (persisted)** (keeps counting across launches). Hiding a badge or navigating when it reaches zero is an **On timer end** action (`flow-logic`'s `onboarding-actions`). |
| "translate the flow", "send strings to a translator", "TSV import failed", "some screens fell back to English" | Two unrelated surfaces; `paywall-localization` exists only to route between them. On-screen text and media: `add-paywall-locale-in-adapty-paywall-builder` — despite the filename it is the flow-era Localizations panel (see the Boundaries TODO on its zoning). Export/import is `.tsv`, **the export strips variables** so they must be re-added by hand, import locale codes must already exist in the flow, and the pinned default locale is the fallback for anything missing. Per-locale remote-config JSON is `add-flow-remote-config-locale`. Icons, screen backgrounds and custom media IDs **can't** be localized at all (`custom-media#limitations`). |
| "pre-checked trial switch", "App Store rejected our paywall" | `builder-toggles` — a trial toggle that defaults to "on" can be flagged as a manipulative dark pattern under the App Store Review Guidelines; the documented advice is to default it to off and let users opt in. What flipping it then swaps is `flow-logic` (`onboarding-actions`, `paywall-product-block`). |

## Gaps and misses

**Duplication policy, from the docs owner (2026-08-10).** The goal is no duplication — prefer a link to
the canonical article, or a reusable snippet where the text is genuinely identical and load-bearing. But
apply it rationally rather than mechanically: reusables in this repo are often `Callout` components, and a
page stacked with them reads worse than the duplication it replaced. So before de-duplicating, ask whether
the reader loses a step they need in place; when in doubt prefer a link over a new reusable, and never add
a reusable purely to satisfy the rule.

Applied here: the Bold/Italic limitation warning is duplicated verbatim in `builder-styling`,
`onboarding-text` and `using-custom-fonts-in-flow-builder`. Three copies of one warning is the case a
reusable is actually for — but it is already a callout, so folding it into a shared snippet must not add a
second callout layer around it.


- **Broken cross-link:** `builder-elements.mdx`'s Countdown section links "Countdown timer" to
  `paywall-timer` — the old Paywall-Builder-era article (`version-3.0/paywall-timer.mdx`) — instead of
  this zone's `flow-timer`, which is the actual flow-era Countdown timer article and matches the
  content described right there (Blocks/Inline/Inline with units/Badge presets). Looks like a simple
  fix, not a design choice — flagged as a question below rather than fixed here.
- **Dead-end found in Stage A:** `add-flow-remote-config-locale.mdx`'s "Read the matching locale in your
  app" section names `AdaptyFlow.remoteConfigs`/`AdaptyRemoteConfig` but links to no SDK article. The
  Reader jobs section above bridges this by hand into `sdk-flows-display`'s `get-pb-paywalls`; the
  article itself doesn't make the hop.
- **Style debt (not a reader-facing gap):** `paywall-buttons.mdx` still uses the legacy
  `<Zoom><img src={require(...)}/></Zoom>` pattern and opens with a stray `:::info This section
  describes the new Flow Builder...` banner that no other article in this zone carries — everything
  else already migrated to `<ZoomImage>`. Noted for a cleanup pass, not actioned here.

### Questions for the owner

1. **`add-paywall-locale-in-adapty-paywall-builder` zoning.** It's labeled "Add locale in Adapty Flow
   Builder" in the sidebar, sits beside `add-flow-remote-config-locale`, and is linked from three of
   this zone's articles (`custom-media`, `onboarding-text` ×2) as the way to add a locale to a flow —
   but it's zoned to `paywalls-legacy`. Is the zoning correct (content is genuinely legacy-only, links
   are stale) or should the article move into `flow-design`?
2. **`paywall-timer` vs. `flow-timer` link in `builder-elements.mdx`.** Given `flow-timer` is this
   zone's flow-era Countdown timer article and `paywall-timer` is the unrelated legacy Paywall Builder
   one, is this just a broken link to fix, or is there a reason the flow-era catalog still needs to
   point at the legacy article (e.g. a "Developer-defined timers" feature not yet ported to flows)?
3. **Duplicated custom-font Bold/Italic warning** (three articles, see Ripple rules). Worth
   consolidating into a reusable MDX snippet per the house pattern (`src/components/reusable`, model:
   `SupportForum.mdx`), or is triplication acceptable because each occurrence is framed slightly
   differently for its article's context?

