---
zone: sdk-flows-display
sources: [android-sdk, dashboard-backend, dashboard-interface, flutter-sdk, ios-sdk, jscore, kmp-sdk, rn-sdk]
reviewed_shape:
reviewed_at:
---

## What this is

The "Flows & paywalls" category of each platform SDK — the app code that presents a Flow-Builder-made flow (a paywall, or an onboarding-with-paywall) to the user: fetching a Flow Builder paywall, presenting it, handling the actions and events it fires, localizing it, using fallback paywalls when the network is unavailable, presenting a web paywall from the SDK, and troubleshooting why a builder paywall won't render. It's the mobile-app side of Flow Builder — the dashboard-built flow is data the SDK downloads and renders natively on device.

## Surfaces

## Sources of truth

Four classes of claim, four different places to read.

**1. "What is the method called, what does it take, what does it return."** The platform SDK repo at
the ref named in `platforms.md` / `sources.md` — never the local clone's checked-out branch, which on
several of these repos is task-specific and behind its own remote. Two layout facts this zone needs
that the registry doesn't carry, because on every native platform the presentation API sits in a
different module from the core fetch API:

- **ios-sdk** — fetch in `Sources/` (`getFlow`, `getFlowForDefaultAudience`:
  `Sources/Placements/Adapty+Placements.swift`, `Sources/Adapty+Completion.swift`); the entire
  presentation surface in a separate top-level directory, `Sources.AdaptyUI/` (`getFlowConfiguration`
  at `Sources.AdaptyUI/AdaptyUI+Public.swift:297`). Confirmed on `origin/master`.
- **android-sdk** — presentation is the `adapty-ui` module:
  `adapty-ui/src/main/java/com/adapty/ui/AdaptyUI.kt` (`getFlowConfiguration` at line 166, on
  `origin/master`).
- **kmp-sdk** — the committed ABI dumps `adapty/api/adapty.klib.api` and
  `adapty/api/android/adapty.api` are the fastest complete read of the public surface: every
  `AdaptyUI` entry point with its full parameter list in one file. Read them at
  `origin/release/4.0.0`; `origin/main` is still v3.
- **rn-sdk / capacitor-sdk plus jscore** — split, and *both* halves are needed for this zone. The
  function the doc names lives in the platform repo (`src/ui/create-flow-view.ts` in
  `AdaptySDK-React-Native`); its parameter *shape* is a `jscore` type (`src/ui-builder/types.ts`).
  `jscore`'s `cross_platform.yaml` is the bridge contract — it enumerates every request and event the
  wrappers can carry (`AdaptyUICreateFlowView.Request`, `FlowViewEvent.*`) and is the tie-breaker when
  a wrapper's own types look narrower than the native surface.

  Two things about *which* `jscore` ref to read, learned 2026-08-14 while documenting RN 4.0.3:

  - **The wrapper pins core to an exact commit SHA, and that SHA is usually on no branch.** RN's
    `package.json` on `origin/release/4.0.3` reads
    `"@adapty/core": "4.0.2-dev.7f2916d50c20823a81b13bead46906975bdf70d4"`, which `git cat-file -t`
    cannot resolve in the local `jscore` clone. `git fetch origin <sha>` and then reading
    `FETCH_HEAD:<path>` is what makes the shipped surface readable. Reading a branch tip instead is how
    this project previously documented a stale API — the pinned SHA *is* the release, so prefer it over
    `origin/master` whenever the two disagree.
  - **The two JS wrappers have genuinely diverged; neither is simply older.** On 2026-08-14,
    `origin/release/capacitor` still declared `onAppeared: () => EventHandlerResult` and a narrower
    `FlowEventView` (`id` plus optional `placementId`/`variationId`, no `locale`), against the RN pin's
    required `placementId`/`variationId` plus `locale?`. So a Capacitor event payload is a different
    shape from RN's, not a previous version of the same one — never carry one wrapper's field list to
    the other without reading `release/capacitor`.
- **flutter-sdk** — `lib/src/`, where the deprecation strings themselves carry facts worth quoting:
  `lib/src/adapty.dart` deprecates the `locale` argument of `getFlow`/`getFlowForDefaultAudience` with
  the reason attached ("the locale is applied when the flow view is built — pass it to
  AdaptyUI.createFlowView or AdaptyUIFlowPlatformView instead").

The per-platform generated reference sites (`swift.adapty.io`, `android.adapty.io`, `kmp.adapty.io`,
`capacitor.adapty.io`, `unity.adapty.io`) are downstream of those repos, not an independent check.
They are a citation target only, and used sparingly — about ten such links across all 69 articles.

**2. Which events and callbacks exist.** The observer/delegate/resolver declaration itself, not the
doc's section list and not the migration guide that announced it. iOS: `AdaptyFlowControllerDelegate`
and `AdaptyObserverModeResolver`, both in `Sources.AdaptyUI/AdaptyUI+Public.swift` (lines 50 and 220).
KMP: the ABI dump above, which also names the registration calls (`setFlowsEventsObserver`,
`setObserverModeResolver`, `setSystemRequestsHandler`). Cross-platform: the `FlowViewEvent.*`
definitions in `jscore`'s `cross_platform.yaml`.

**3. Everything the SDK does not own** — which in this zone is most of the interesting behaviour,
because the flow is dashboard-authored data that the SDK only renders. `dashboard-backend`
(`origin/develop`) owns:

- the view configuration and the flow's localization set —
  `src/portal/in_app_context/domains/value_objects/flow_front_config/` (`flow_front_config.py`, and
  `localization_catalog.py`, whose `default_locale` field defaults to `'en'`);
- whether a flow can render on device at all — `FlowVersionPublicationStatus`, eight states from
  `publishing` to `published`
  (`src/portal/in_app_context/domains/enums/flow_version_publication_status.py`), with
  `publication_status is None` meaning never published (`domains/entities/flow_version.py:87`).

`dashboard-interface` owns builder control labels, with a trap this zone walks into: **"Show on
device" is a legacy-Paywall-Builder control.** The label exists at
`packages/builder/src/widgets/BuilderMenuTree/BuilderMenuTree.tsx:33` and in
`apps/web/src/pages/ab-section/ui/PaywallBuilder/ui/PaywallBuilderMenu/ui/CreateLegacyBuilderBlock/CreateLegacyBuilderBlock.tsx:59`;
grepping `packages/unified-builder` (the Flow Builder) for `Show on device` and `showOnDevice` returns
nothing. All seven `troubleshoot-paywall-builder` articles answer a failed configuration fetch with
that toggle — right for a Paywall Builder paywall, unverified for a flow, where the publication
pipeline above is what to check.

Locale resolution is genuinely **split**, so neither side settles it alone: normalization is
client-side (`AdaptyLocale.normalizedIdentifier` replaces `_` with `-`, and `languageCode` takes the
substring before the first `-`/`_` — `Sources/Placements/Entities/AdaptyLocale.swift`), while *which*
localization a user ends up with is decided against the flow's catalogue and default locale in the
backend. Never state a fallback outcome from an SDK repo alone.

Asset, timer, and custom-tag **IDs** (`hero_image`, `hero_video`, dashboard-assigned custom media IDs,
Timer IDs) are authored in the builder — the SDK only keys off the strings. A claim about which IDs
exist belongs to `flow-design`'s sources, not to any repo listed here.

**4. Claims that must never be inferred from a neighbouring platform's article.** Seven near-identical
articles per topic make "the iOS article says X" the cheapest and most dangerous move available in
this zone. Three claim classes have already broken exactly that way, and all three defects are in the
corpus right now:

- **Which call a parameter belongs to — and it now differs per platform, so there is no corpus-wide
  answer to quote.** Verified 2026-08-11: Flutter's `getFlowForDefaultAudience` takes `String? locale`
  (`AdaptySDK-Flutter` `lib/src/adapty.dart`), while KMP's `createFlowView` takes no string at all — its
  ABI dump reads
  `createFlowView(AdaptyFlow, Duration?, Boolean, Map<String,String>?, Map<String,LocalDateTime>?, Map<String,AdaptyCustomAsset>?, Map<ProductIdentifier,PurchaseParameters>?)`
  (`AdaptySDK-KMP` `adapty/api/adapty.klib.api:1672`). On those two, locale is a parameter of the
  *fetch*, and their `*-localizations-and-locale-codes` articles are **correct** to say `createFlowView`
  takes no locale parameter; a first pass at this brief wrongly called them wrong by citing a locale
  param that lives on the fetch call.
  **Corrected 2026-08-14 — the generalization no longer holds for React Native.** `git log --oneline
  origin/master` in `AdaptySDK-JS-Core` shows `e96aefd feat(flow): add locale to
  CreateFlowViewParamsInput` and `da747f1 feat(flow): expose locale on AdaptyUiView` landing below
  `a98f216 chore: bump version to 4.0.1`, so core v4.0.1 → RN 4.0.2 puts `locale` on view creation and
  `locale?` on the returned `FlowViewController`. `react-native-localizations-and-locale-codes`
  documents that, correctly, and it is this brief that was stale. Capacitor is not there yet (see the
  divergence note in bullet 1 above). KMP and Flutter were not re-checked on 2026-08-14, so treat the
  2026-08-11 finding as still standing for them. The lesson survives the correction, only narrower:
  check which method a parameter hangs off **on the platform you are writing**, before writing that a
  doc is stale.
- **The outcome of omitting an optional argument.** One question, three answers inside one family:
  `localizations-and-locale-codes` (iOS) says the flow "renders in `en`, or in its default locale if
  the flow has no `en` localization"; `android-localizations-and-locale-codes` says "renders in its
  default locale"; the other four say "default locale — on iOS, in `en` when the flow has an English
  localization." `jscore`'s own docstring on that field says only "the flow's default localization is
  used." Settle it against the backend catalogue, not against a sibling.
- **Property names on the "same" object.** The remote-config entry is `dictionary` on iOS, `dataMap`
  on Android and KMP, `lang`/`data` on React Native and Capacitor, `data`/`dictionary` on Flutter. A
  property name is a per-wrapper fact; read that wrapper.

Read `platforms.md` before writing any v4 sentence here. Unity is this zone's v3-only surface: none of
its nine articles carries an `<SDKv4>` block, and `unity-paywalls` still heads its card list "Adapty
Paywall Builder" where the other six entry pages say "Adapty Flow Builder & Paywall Builder."

## What we document, what we don't

Only the delta from `scope.md`; its corpus-wide rules are not restated.

- **At depth: the call sequence a builder-rendered flow needs, per platform, and nothing past it.**
  Fetch (`get-pb-paywalls`), create and present the view (`present-paywalls`), the event surface
  (`handling-events`), the button/action callback (`handle-paywall-actions`), plus three side
  capabilities (`localizations-and-locale-codes`, `use-fallback-paywalls`, `web-paywall`). Full
  parameter tables for the methods this zone owns are written inline — `get-pb-paywalls` carries three
  in its v4 block alone — and the generated reference site is linked only for a type's exhaustive
  property list.
- **`troubleshoot-paywall-builder` is not a general troubleshooting reference.** Six of the seven carry
  the same two causes and nothing else (configuration fetch fails → the **Show on device** toggle;
  doubled view count → a manual `logShowFlow`/`logShowPaywall` call that a builder-rendered flow
  already makes), then close with an "Other issues" section pointing at the platform's migration
  guides; KMP has only the two causes. A new symptom either fits that shape — one issue, one reason,
  one solution — or it belongs in the article that owns the mechanism.
- **The boundary against `sdk-flows-manual` is who renders, and it decides what gets written, not just
  where it lives.** Same reader, same three steps: fetch, show, buy. When Adapty renders, everything
  the developer writes is a **handler** — this zone documents the callback the rendered view invokes,
  what the view does before and after it, and how to register it. When the developer renders, they
  write the **call** (`getPaywallProducts`, `makePurchase`, `restorePurchases`), and that is
  `sdk-flows-manual`, even when the paywall came out of Flow Builder. The corpus holds this line
  precisely today: grep all 69 articles for `makePurchase|restorePurchases` and every one of the 20
  hits is a row in a callback table ("Invoked when `Adapty.makePurchase()` completes successfully").
  Not one article shows a purchase call as a step, and a new one must not.
- **Observer mode is the same rule under pressure.** `present-flows-in-observer-mode` (iOS:
  `ios-present-paywall-builder-paywalls-in-observer-mode`) documents the resolver and its
  start/finish callbacks, then stops: activating with `observerMode` links out to the platform's
  installation article, and reporting the transaction is a closing `:::warning` linking
  `report-transactions-observer-mode` in `sdk-flows-manual`. Don't absorb either half.
- **Mentioned and linked, never explained here:** the builder-side authoring of whatever is being
  displayed (`adapty-paywall-builder` 30 links from this zone, `paywall-buttons` 17, `custom-media`
  13 — all `flow-design`/`flow-logic`); the fallback file's contents and how to obtain it
  (`fallback-paywalls`, `local-fallback-paywalls`, `fallback-flows`); and the web paywall's dashboard
  configuration, which is this zone's single most-linked outbound target (`web-paywall`, 39 links,
  owned by `paywalls-legacy`).
- **How thin a per-platform article may get, and the two mechanisms that decide whether that's safe.**
  A reusable, when drift would be a defect: `FallbackPaywallIntroduction` carries the concept and the
  "download the files first" prerequisite into all eight fallback articles, which is why five of them
  are a single `## Configuration` section — where the file goes, one `setFallback` call, done.
  `PaywallAction` carries the "you must also implement button handling" pointer into five of the seven
  `handling-events` articles. `SampleApp` appears in 18 of the 69. **Hand-copied prose, where nobody
  made a reusable, is the failure mode:** the whole front half of the
  `localizations-and-locale-codes` family ("Why this is important", "Locale code standard at Adapty",
  "Locale code matching") is platform-independent and duplicated verbatim across all seven files with
  no snippet behind it. Treat platform-independent prose with no reusable behind it as seven copies to
  edit, not one.
- **The seven `paywalls` entry pages carry no prose.** All seven are `CustomDocCardList` routing
  between builder-rendered and manual, plus one `:::tip`. That is the intended shape — don't grow them
  into overviews.
- **31 of the 69 articles document two API generations in one file.** `<SDKv4>`/`<SDKv3>` wrap the
  whole article (each of the 31 contains exactly one `<SDKv4>`), the reader picks a generation with the
  tab switcher wired up in `src/pages/[...slug].astro`, and `scripts/generate-md.mjs` unwraps v4 while
  prefixing v3 with an LLM warning for the markdown export. Two scope consequences: the v3 block is
  maintained legacy text that a v4 edit usually leaves untouched, so decide explicitly rather than
  deleting it; and a version block cannot wrap a single section, so "document this for v4 only" means
  restructuring the article, not adding a third wrapper.

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| get-pb-paywalls | get-pb-paywalls | android-get-pb-paywalls | react-native-get-pb-paywalls | flutter-get-pb-paywalls | unity-get-pb-paywalls | kmp-get-pb-paywalls | capacitor-get-pb-paywalls |
| handle-paywall-actions | handle-paywall-actions | android-handle-paywall-actions | react-native-handle-paywall-actions | flutter-handle-paywall-actions | unity-handle-paywall-actions | kmp-handle-paywall-actions | capacitor-handle-paywall-actions |
| handling-events | ios-handling-events | android-handling-events |  | flutter-handling-events | unity-handling-events | kmp-handling-events | capacitor-handling-events |
| handling-events-1 |  |  | react-native-handling-events-1 |  |  |  |  |
| localizations-and-locale-codes | localizations-and-locale-codes | android-localizations-and-locale-codes | react-native-localizations-and-locale-codes | flutter-localizations-and-locale-codes | unity-localizations-and-locale-codes | kmp-localizations-and-locale-codes | capacitor-localizations-and-locale-codes |
| paywalls | ios-paywalls | android-paywalls | react-native-paywalls | flutter-paywalls | unity-paywalls | kmp-paywalls | capacitor-paywalls |
| present-flows-in-observer-mode |  |  | react-native-present-flows-in-observer-mode | flutter-present-flows-in-observer-mode | unity-present-flows-in-observer-mode | kmp-present-flows-in-observer-mode | capacitor-present-flows-in-observer-mode |
| present-paywall-builder-paywalls-in-observer-mode | ios-present-paywall-builder-paywalls-in-observer-mode |  |  |  |  |  |  |
| present-paywalls | ios-present-paywalls | android-present-paywalls | react-native-present-paywalls | flutter-present-paywalls | unity-present-paywalls | kmp-present-paywalls | capacitor-present-paywalls |
| troubleshoot-paywall-builder | ios-troubleshoot-paywall-builder | android-troubleshoot-paywall-builder | react-native-troubleshoot-paywall-builder | flutter-troubleshoot-paywall-builder | unity-troubleshoot-paywall-builder | kmp-troubleshoot-paywall-builder |  |
| use-fallback-paywalls | ios-use-fallback-paywalls | android-use-fallback-paywalls | react-native-use-fallback-paywalls | flutter-use-fallback-paywalls | unity-use-fallback-paywalls | kmp-use-fallback-paywalls | capacitor-use-fallback-paywalls |
| use-fallback-paywalls-expo |  |  | react-native-use-fallback-paywalls-expo |  |  |  |  |
| use-fallback-paywalls-pure |  |  | react-native-use-fallback-paywalls-pure |  |  |  |  |
| web-paywall | ios-web-paywall | android-web-paywall | react-native-web-paywall | flutter-web-paywall |  |  | capacitor-web-paywall |
| web-paywalls |  |  |  |  | unity-web-paywalls | kmp-web-paywalls |  |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-get-pb-paywalls | — | dev | 8 | android |
| android-handle-paywall-actions | — | dev | 7 | android |
| android-handling-events | — | dev | 6 | android |
| android-localizations-and-locale-codes | — | dev | 11 | android |
| android-paywalls | entry | dev | 4 | android |
| android-present-paywalls | — | dev | 8 | android |
| android-troubleshoot-paywall-builder | — | dev | 3 | android |
| android-use-fallback-paywalls | — | dev | 1 | android |
| android-web-paywall | — | dev | 2 | android |
| capacitor-get-pb-paywalls | — | dev | 8 | capacitor |
| capacitor-handle-paywall-actions | — | dev | 7 | capacitor |
| capacitor-handling-events | — | dev | 3 | capacitor |
| capacitor-localizations-and-locale-codes | — | dev | 11 | capacitor |
| capacitor-paywalls | entry | dev | 4 | capacitor |
| capacitor-present-flows-in-observer-mode | — | dev | 0 | capacitor |
| capacitor-present-paywalls | — | dev | 7 | capacitor |
| capacitor-use-fallback-paywalls | — | dev | 4 | capacitor |
| capacitor-web-paywall | — | dev | 3 | capacitor |
| flutter-get-pb-paywalls | — | dev | 10 | flutter |
| flutter-handle-paywall-actions | — | dev | 8 | flutter |
| flutter-handling-events | — | dev | 7 | flutter |
| flutter-localizations-and-locale-codes | — | dev | 11 | flutter |
| flutter-paywalls | entry | dev | 4 | flutter |
| flutter-present-flows-in-observer-mode | — | dev | 0 | flutter |
| flutter-present-paywalls | — | dev | 10 | flutter |
| flutter-troubleshoot-paywall-builder | — | dev | 3 | flutter |
| flutter-use-fallback-paywalls | — | dev | 1 | flutter |
| flutter-web-paywall | — | dev | 1 | flutter |
| get-pb-paywalls | — | dev | 10 | ios |
| handle-paywall-actions | — | dev | 7 | ios |
| ios-handling-events | — | dev | 13 | ios |
| ios-paywalls | entry | dev | 4 | ios |
| ios-present-paywall-builder-paywalls-in-observer-mode | — | dev | 0 | ios |
| ios-present-paywalls | — | dev | 8 | ios |
| ios-troubleshoot-paywall-builder | — | dev | 3 | ios |
| ios-use-fallback-paywalls | — | dev | 1 | ios |
| ios-web-paywall | — | dev | 4 | ios |
| kmp-get-pb-paywalls | — | dev | 8 | kmp |
| kmp-handle-paywall-actions | — | dev | 11 | kmp |
| kmp-handling-events | — | dev | 16 | kmp |
| kmp-localizations-and-locale-codes | — | dev | 11 | kmp |
| kmp-paywalls | entry | dev | 4 | kmp |
| kmp-present-flows-in-observer-mode | — | dev | 0 | kmp |
| kmp-present-paywalls | — | dev | 14 | kmp |
| kmp-troubleshoot-paywall-builder | — | dev | 2 | kmp |
| kmp-use-fallback-paywalls | — | dev | 1 | kmp |
| kmp-web-paywalls | — | dev | 2 | kmp |
| localizations-and-locale-codes | — | dev | 11 | ios |
| react-native-get-pb-paywalls | — | dev | 8 | react-native |
| react-native-handle-paywall-actions | — | dev | 7 | react-native |
| react-native-handling-events-1 | — | dev | 3 | react-native |
| react-native-localizations-and-locale-codes | — | dev | 11 | react-native |
| react-native-paywalls | entry | dev | 4 | react-native |
| react-native-present-flows-in-observer-mode | — | dev | 2 | react-native |
| react-native-present-paywalls | — | dev | 14 | react-native |
| react-native-troubleshoot-paywall-builder | — | dev | 3 | react-native |
| react-native-use-fallback-paywalls | entry | dev | 0 | react-native |
| react-native-use-fallback-paywalls-expo | — | dev | 2 | react-native |
| react-native-use-fallback-paywalls-pure | — | dev | 4 | react-native |
| react-native-web-paywall | — | dev | 2 | react-native |
| unity-get-pb-paywalls | — | dev | 10 | unity |
| unity-handle-paywall-actions | — | dev | 10 | unity |
| unity-handling-events | — | dev | 8 | unity |
| unity-localizations-and-locale-codes | — | dev | 12 | unity |
| unity-paywalls | entry | dev | 4 | unity |
| unity-present-flows-in-observer-mode | — | dev | 0 | unity |
| unity-present-paywalls | — | dev | 4 | unity |
| unity-troubleshoot-paywall-builder | — | dev | 3 | unity |
| unity-use-fallback-paywalls | — | dev | 1 | unity |
| unity-web-paywalls | — | dev | 2 | unity |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **flow-design / flow-logic** — this is the most common routing mistake in this corpus. flow-design/flow-logic is the dashboard builder: designing the flow's screens, elements, and logic in the visual editor. sdk-flows-display is the app code that displays the result of that design. "The button doesn't look right" or "the logic branch didn't fire" is flow-design/flow-logic; "the SDK crashed while presenting the flow" or "the paywall doesn't localize on device" is sdk-flows-display. State this boundary explicitly in both directions when routing — it's easy to file an SDK-presentation ticket that's really a builder-configuration issue, or vice versa.
- **sdk-flows-manual** — is the flow a Flow-Builder-made flow being displayed with the SDK's built-in presentation methods (sdk-flows-display), or is the developer fetching raw paywall/product data to render their own UI, or handling the purchase/restore call directly (sdk-flows-manual)? Purchases and restore always live in sdk-flows-manual, never here, even when the paywall being purchased came from Flow Builder.
- **sdk-onboardings** — is the flow being presented a paywall (sdk-flows-display) or an onboarding (sdk-onboardings)? Both can be built in Flow Builder, but the SDK-side onboarding-presentation code has its own zone.
- **paywalls-legacy** — is the paywall a Flow-Builder flow (sdk-flows-display) or a legacy remote-config paywall being fetched/rendered manually (paywalls-legacy for the dashboard side, sdk-flows-manual for the app-code side)?

## Ticket language

Rows name a **family**, not a platform article — the roster above expands each one across the seven
platforms. Corpus-wide synonyms (Flow ↔ Paywall Builder, paywall ↔ flow in v4) live in `aliases.md`
and are deliberately not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "paywall doesn't show on device", "blank paywall", "view configuration fetch fails" | `troubleshoot-paywall-builder`. Almost always the **Show on device** toggle or a missing view configuration — check `hasViewConfiguration` before anything else. |
| "impressions doubled", "analytics counted twice", "view count inflated" | `troubleshoot-paywall-builder`. The cause is a manual `logShowPaywall` call that a builder-rendered flow already makes. |
| "button does nothing", "close button won't dismiss", "login button", "terms of use link" | `handle-paywall-actions`. All builder buttons arrive as one action callback keyed by a custom action ID. |
| "Android back button doesn't close the paywall" | `handle-paywall-actions` — a distinct case from the close button, and Android-only. |
| Either of the two rows above **but the ticket says "after we upgraded"** | Check `sdk-migrations` first, then come back. v4 changed two defaults without breaking the build: the system back press is now consumed, and the default purchase handler no longer dismisses the view. A handler that "stopped being called" after an upgrade is a migration symptom, not a wiring mistake — and on iOS and Android that content is prose inside the guide's `## Handling events`, not a named section. |
| "purchase callback never fires", "restore failed", "paywall stays open after purchase" | `handling-events`. In v4 the view no longer auto-dismisses after a purchase; a missing required observer method is the other usual cause (it surfaces as a compile error). |
| "own purchase logic with Adapty's UI", "bring my own IAP handling" | `present-flows-in-observer-mode` (iOS: `present-paywall-builder-paywalls-in-observer-mode`). Reporting the transaction afterwards is mandatory, not optional. |
| "wrong language shown", "not translated for the user's locale", "pt-BR vs pt_BR" | `localizations-and-locale-codes`. Locale-code normalization and fallback resolution are the answer to nearly every phrasing here. |
| "offline paywall", "Adapty servers unreachable", "bundled backup config" | `use-fallback-paywalls`. Two constraints do the work: the fallback must be set *before* the fetch, and Android's `res/raw` restricts the file name. React Native splits Expo and bare. |
| "avoid Apple/Google commission", "external checkout", "Stripe or Paddle from the app" | `web-paywall` (Unity and KMP: `web-paywalls`). Commission avoidance is the business phrasing of what the docs call a web paywall. |
| "custom hero image per user", "swap the video remotely", "asset override" | `get-pb-paywalls` — custom asset override, not a builder-side edit. |
| "countdown timer wrong/not updating" | Split by cause: a timer whose value comes from app code is `get-pb-paywalls`; a timer that renders but doesn't tick is `present-paywalls`. |
| "paywall loads slowly", "cache the paywall", "preload products" | `get-pb-paywalls` — fetch policy choice (`returnCacheDataElseLoad` vs `reloadRevalidatingCacheData`). The default-audience fetch is the other speed lever, and it costs targeting: see the same row in `sdk-flows-manual`. |
| "full screen vs sheet", "embed the paywall in an existing screen", "inline paywall" | `present-paywalls`. Flutter additionally requires `FlutterFragmentActivity` on Android. |
| "view already presented", "error when reusing the paywall view" | `present-paywalls` — a view instance is single-use. |
| "native alert hidden behind the paywall", "paywall overlaps the status bar", "edge-to-edge insets" | `present-paywalls`, Android-specific presentation issues. |
| "where do I start with paywalls" | The `paywalls` family — the per-platform entry pages, whose job is routing to builder vs manual. |

## Gaps and misses

