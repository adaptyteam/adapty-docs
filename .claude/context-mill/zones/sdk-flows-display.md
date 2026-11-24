---
zone: sdk-flows-display
sources: [android-sdk, capacitor-sdk, flutter-sdk, ios-sdk, jscore, kmp-sdk, rn-sdk, unity-sdk]
reviewed_shape:
reviewed_at:
---

## What this is

The "Flows & paywalls" category of each platform SDK — the app code that presents a Flow-Builder-made flow (a paywall, or an onboarding-with-paywall) to the user: fetching a Flow & Paywall Builder paywall, presenting it, handling the actions and events it fires, localizing it, using fallback paywalls when the network is unavailable, presenting a web paywall from the SDK, and troubleshooting why a builder paywall won't render. It's the mobile-app side of Flow & Paywall Builder — the dashboard-built flow is data the SDK downloads and renders natively on device.

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
  - **`jscore`'s `origin/release/capacitor` branch is a decoy — never read it to learn what Capacitor
    ships.** It looks authoritative and is stale: on 2026-08-14 it still declared
    `onAppeared: () => EventHandlerResult` and a narrower `FlowEventView` (`id` plus optional
    `placementId`/`variationId`, no `locale`), and `git merge-base --is-ancestor` puts both locale
    commits (`e96aefd`, `da747f1`) *outside* it, so it predates core v4.0.1. What Capacitor actually
    ships is whatever its own `package.json` pins: `AdaptySDK-Capacitor` `origin/master`
    (`4.0.1-beta.1`) pins the published `@adapty/core: 4.0.1` and does carry the locale work —
    `FlowViewController.locale` sits at `src/ui-builder/flow-view-controller.ts:52`. The rule for both
    JS wrappers is the same and has no exception: read the wrapper's core pin, then read that ref.
    A first pass at this note read the branch instead and concluded the two wrappers' event payloads
    had diverged into different shapes, when Capacitor was simply one core version behind.
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

**2a. What an analytics event carries.** Added 2026-09-07 while writing the `flow-input` family. The
SDK owns only the *delivery* of the analytics callback; the event names and their parameters are
compiled into the flow by the builder when it is published — `git grep flow_user_input` over every tag of
`AdaptySDK-iOS` finds nothing; the event definitions and firing rules live in Adapty's closed-source
builder code (verified against builder code as rolled out to production, 2026-09-07). Two customer-facing events exist, `flow_user_input`
and `flow_screen_showed`, and the params map is **flat**: `name`, `instanceId`, `isBackendEvent`,
`isCustomerEvent`, `element_id`, `element_type`, then `value` *or* `item_ids` + `item_titles`. There
is no `payload` string and no `version` field — an earlier draft documented both; they never shipped.
Each SDK gates on `isCustomerEvent` and forwards the map untouched: iOS
`Sources.UIBuilder/UIState/AdaptyUIActionHandler.swift:62-77`, Android
`adapty-ui/src/main/java/com/adapty/ui/internal/store/FlowReducer.kt:356`; both identical between the
platform's first v4 tag and HEAD, so the SDK floor for this feature is "first v4" on all seven
(4.0.0 for iOS, Android, Flutter, React Native; 4.0.0-beta.1 for Capacitor, Unity, KMP; all tagged
2026-07-10 … 07-31). Three per-wrapper shape facts that a sibling article cannot tell you: Android
delivers JSON numbers to the listener as `Double` before 4.3.0, and from 4.3.0 delivers whole numbers
inside the `Long` range as `Long`, keeping fractional and out-of-range values as `Double` — so a picker's
Unix-milliseconds value arrives as `Long` (2026-10-26, Android SDK 4.3.0 release branch:
`FlowReducer` now runs `normalizeJsonNumbers` on the listener path too; corrects this brief's earlier
"fix planned for 4.2"); Unity decodes into `Dictionary<string, object>` with Newtonsoft and no loose
converter (`Runtime/Adapty.Events.cs:424`, `Runtime/Serialization/AdaptyJson.cs:96-115`), so arrays
arrive as `JArray`, integers as `long`, and the listener signature is
`IReadOnlyDictionary<string, object>`; KMP hands the whole map over as one JSON string
(`paramsJsonString`). No SDK exposes a way to write into a running flow, and the callback has no
return channel except React Native/Capacitor's `EventHandlerResult` boolean, which only closes the view
(`jscore` `src/ui-builder/types.ts:27`).

**3. Everything the SDK does not own** — which in this zone is most of the interesting behaviour,
because the flow is dashboard-authored data that the SDK only renders. Adapty's backend owns
(closed-source, not citable here — confirm with the product team; checked against backend code):

- the view configuration and the flow's localization set, whose default locale defaults to `en`;
- whether a flow can render on device at all — a flow version moves through several publication
  states before it reaches `published`, and a version that was never published has no publication
  status at all.

The dashboard owns builder control labels, with a trap this zone walks into: **"Show on
device" is a legacy-Paywall-Builder control.** In the dashboard code the label exists only in the
legacy Paywall Builder; the Flow & Paywall Builder has no such control (dashboard code, checked
when this brief was written). All seven `troubleshoot-paywall-builder` articles answer a failed configuration fetch with
that toggle — right for a Paywall Builder paywall, unverified for a flow, where the publication
pipeline above is what to check.

**Corrected 2026-11-23: for SDK v4 flows, the device picks the localization, not the backend.** This
brief said *which* localization a user ends up with is decided in the backend. That holds only for SDK
3.x paywalls and for onboardings: the v4 flow endpoints take no locale, and the server-side matcher now
serves only the legacy paywall endpoints (backend code, 2026-11-23). `getFlow` itself carries no UI
localizations: its response points at a per-layout UI schema, which the SDK downloads (or reads from
cache) with every localization in it only when it builds the view, inside `getFlowConfiguration` or a
wrapper's `createFlowView` (`AdaptySDK-iOS` `Sources/Backend/Fallback+Backend/Requests/FetchUISchemaRequest.swift`,
checked 2026-11-23). The localization articles said "`getFlow` returns the flow with all of its
localizations" until 2026-11-23; don't reintroduce it. `getFlow` does return the remote configs of
every locale.
On iOS, 4.0–4.4 looked up the passed code exactly (case-sensitive, no `_`/`-` folding; a miss gave the
default localization; no code asked for `en`). iOS 4.5.0 picks with a resolver (`preferredLocales` +
`localizationStrategy`, `AdaptySDK-iOS` `release/4.5.0`,
`Sources.UIBuilder/UISchema/LocalizationResolver/`): `.auto` applies Apple's
`Bundle.preferredLocalizations` to schema format 4.8+ (every Flow & Paywall Builder flow) and the old
server rule (first language only, lowercased, prefix truncation) to old Paywall Builder paywalls served
from a paywall placement (format below 4.8). `AdaptyLocale.normalizedIdentifier` still exists
(`Sources/Placements/Entities/AdaptyLocale.swift`) but no longer decides a flow's localization on 4.5.
Other platforms weren't re-checked: read their SDK before stating their outcome.

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
  documents that, correctly, and it is this brief that was stale. Capacitor has the same locale work
  via core 4.0.1 (see the `release/capacitor` decoy note in bullet 1 above). KMP and Flutter were not
  re-checked on 2026-08-14, so treat the
  2026-08-11 finding as still standing for them. The lesson survives the correction, only narrower:
  check which method a parameter hangs off **on the platform you are writing**, before writing that a
  doc is stale.
- **The outcome of omitting an optional argument.** One question, three answers inside one family:
  `localizations-and-locale-codes` (iOS) says the flow "renders in `en`, or in its default locale if
  the flow has no `en` localization"; `android-localizations-and-locale-codes` says "renders in its
  default locale"; the other four say "default locale — on iOS, in `en` when the flow has an English
  localization." `jscore`'s own docstring on that field says only "the flow's default localization is
  used." Settle it against the backend catalogue, not against a sibling.
  **Settled for iOS 2026-11-23** (`AdaptySDK-iOS` `master` and `release/4.5.0`): 4.0–4.4 with no code
  asked for `en` (`AdaptyLocale.defaultPlacementLocale`) and fell back to the default, so the iOS
  article was right for those versions; 4.5.0 with an empty `preferredLocales` shows the flow's default
  localization. The other six weren't re-checked.
- **Property names on the "same" object.** The remote-config entry is `dictionary` on iOS, `dataMap`
  on Android and KMP, `lang`/`data` on React Native and Capacitor, `data`/`dictionary` on Flutter. A
  property name is a per-wrapper fact; read that wrapper.

Read `platforms.md` before writing any v4 sentence here. Unity is this zone's v3-only surface: none of
its nine articles carries an `<SDKv4>` block, and `unity-paywalls` still heads its card list "Adapty
Paywall Builder" where the other six entry pages say "Adapty Flow & Paywall Builder."
**Corrected 2026-09-07 — stale.** `rg -c '<SDKv4>'` over the nine Unity articles on `main` finds a
block in five (`unity-present-paywalls`, `unity-get-pb-paywalls`, `unity-handling-events`,
`unity-handle-paywall-actions`, `unity-localizations-and-locale-codes`); `unity-paywalls` line 12
already reads "Adapty Flow & Paywall Builder"; and `AdaptySDK-Unity` carries the flow API from
tag `4.0.0-beta.1` (2026-07-31) through `4.1.1`. Unity is v4-beta here, not v3-only.

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
  `sdk-flows-manual`, even when the paywall came out of Flow & Paywall Builder. The corpus holds this line
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
| flow-input | ios-flow-input | android-flow-input | react-native-flow-input | flutter-flow-input | unity-flow-input | kmp-flow-input | capacitor-flow-input |
| flow-screen-views | ios-flow-screen-views | android-flow-screen-views | react-native-flow-screen-views | flutter-flow-screen-views | unity-flow-screen-views | kmp-flow-screen-views | capacitor-flow-screen-views |
| get-pb-paywalls | get-pb-paywalls | android-get-pb-paywalls | react-native-get-pb-paywalls | flutter-get-pb-paywalls | unity-get-pb-paywalls | kmp-get-pb-paywalls | capacitor-get-pb-paywalls |
| handle-paywall-actions | handle-paywall-actions | android-handle-paywall-actions | react-native-handle-paywall-actions | flutter-handle-paywall-actions | unity-handle-paywall-actions | kmp-handle-paywall-actions | capacitor-handle-paywall-actions |
| handle-permissions | ios-handle-permissions | android-handle-permissions | react-native-handle-permissions | flutter-handle-permissions | unity-handle-permissions | kmp-handle-permissions | capacitor-handle-permissions |
| handling-events | ios-handling-events | android-handling-events |  | flutter-handling-events | unity-handling-events | kmp-handling-events | capacitor-handling-events |
| handling-events-1 |  |  | react-native-handling-events-1 |  |  |  |  |
| localizations-and-locale-codes | localizations-and-locale-codes | android-localizations-and-locale-codes | react-native-localizations-and-locale-codes | flutter-localizations-and-locale-codes | unity-localizations-and-locale-codes | kmp-localizations-and-locale-codes | capacitor-localizations-and-locale-codes |
| paywalls | ios-paywalls | android-paywalls | react-native-paywalls | flutter-paywalls | unity-paywalls | kmp-paywalls | capacitor-paywalls |
| present-flows-in-observer-mode |  |  | react-native-present-flows-in-observer-mode | flutter-present-flows-in-observer-mode | unity-present-flows-in-observer-mode | kmp-present-flows-in-observer-mode | capacitor-present-flows-in-observer-mode |
| present-paywall-builder-paywalls-in-observer-mode | ios-present-paywall-builder-paywalls-in-observer-mode |  |  |  |  |  |  |
| present-paywalls | ios-present-paywalls | android-present-paywalls | react-native-present-paywalls | flutter-present-paywalls | unity-present-paywalls | kmp-present-paywalls | capacitor-present-paywalls |
| stripe-payment-sheet | ios-stripe-payment-sheet |  |  |  |  |  |  |
| troubleshoot-paywall-builder | ios-troubleshoot-paywall-builder | android-troubleshoot-paywall-builder | react-native-troubleshoot-paywall-builder | flutter-troubleshoot-paywall-builder | unity-troubleshoot-paywall-builder | kmp-troubleshoot-paywall-builder |  |
| use-fallback-paywalls | ios-use-fallback-paywalls | android-use-fallback-paywalls | react-native-use-fallback-paywalls | flutter-use-fallback-paywalls | unity-use-fallback-paywalls | kmp-use-fallback-paywalls | capacitor-use-fallback-paywalls |
| use-fallback-paywalls-expo |  |  | react-native-use-fallback-paywalls-expo |  |  |  |  |
| use-fallback-paywalls-pure |  |  | react-native-use-fallback-paywalls-pure |  |  |  |  |
| web-paywall | ios-web-paywall | android-web-paywall | react-native-web-paywall | flutter-web-paywall |  |  | capacitor-web-paywall |
| web-paywalls |  |  |  |  | unity-web-paywalls | kmp-web-paywalls |  |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-flow-input | — | dev | 10 | android |
| android-flow-screen-views | — | dev | 4 | android |
| android-get-pb-paywalls | — | dev | 9 | android |
| android-handle-paywall-actions | — | dev | 8 | android |
| android-handle-permissions | — | dev | 5 | android |
| android-handling-events | — | dev | 7 | android |
| android-localizations-and-locale-codes | — | dev | 11 | android |
| android-paywalls | entry | dev | 4 | android |
| android-present-paywalls | — | dev | 8 | android |
| android-troubleshoot-paywall-builder | — | dev | 3 | android |
| android-use-fallback-paywalls | — | dev | 1 | android |
| android-web-paywall | — | dev | 2 | android |
| capacitor-flow-input | — | dev | 10 | capacitor |
| capacitor-flow-screen-views | — | dev | 4 | capacitor |
| capacitor-get-pb-paywalls | — | dev | 9 | capacitor |
| capacitor-handle-paywall-actions | — | dev | 8 | capacitor |
| capacitor-handle-permissions | — | dev | 5 | capacitor |
| capacitor-handling-events | — | dev | 4 | capacitor |
| capacitor-localizations-and-locale-codes | — | dev | 11 | capacitor |
| capacitor-paywalls | entry | dev | 4 | capacitor |
| capacitor-present-flows-in-observer-mode | — | dev | 2 | capacitor |
| capacitor-present-paywalls | — | dev | 8 | capacitor |
| capacitor-use-fallback-paywalls | — | dev | 4 | capacitor |
| capacitor-web-paywall | — | dev | 3 | capacitor |
| flutter-flow-input | — | dev | 10 | flutter |
| flutter-flow-screen-views | — | dev | 4 | flutter |
| flutter-get-pb-paywalls | — | dev | 11 | flutter |
| flutter-handle-paywall-actions | — | dev | 9 | flutter |
| flutter-handle-permissions | — | dev | 5 | flutter |
| flutter-handling-events | — | dev | 7 | flutter |
| flutter-localizations-and-locale-codes | — | dev | 11 | flutter |
| flutter-paywalls | entry | dev | 4 | flutter |
| flutter-present-flows-in-observer-mode | — | dev | 2 | flutter |
| flutter-present-paywalls | — | dev | 10 | flutter |
| flutter-troubleshoot-paywall-builder | — | dev | 3 | flutter |
| flutter-use-fallback-paywalls | — | dev | 1 | flutter |
| flutter-web-paywall | — | dev | 1 | flutter |
| get-pb-paywalls | — | dev | 11 | ios |
| handle-paywall-actions | — | dev | 8 | ios |
| ios-flow-input | — | dev | 11 | ios |
| ios-flow-screen-views | — | dev | 4 | ios |
| ios-handle-permissions | — | dev | 5 | ios |
| ios-handling-events | — | dev | 14 | ios |
| ios-paywalls | entry | dev | 4 | ios |
| ios-present-paywall-builder-paywalls-in-observer-mode | — | dev | 2 | ios |
| ios-present-paywalls | — | dev | 8 | ios |
| ios-stripe-payment-sheet | — | dev | 11 | ios |
| ios-troubleshoot-paywall-builder | — | dev | 3 | ios |
| ios-use-fallback-paywalls | — | dev | 1 | ios |
| ios-web-paywall | — | dev | 4 | ios |
| kmp-flow-input | — | dev | 10 | kmp |
| kmp-flow-screen-views | — | dev | 4 | kmp |
| kmp-get-pb-paywalls | — | dev | 9 | kmp |
| kmp-handle-paywall-actions | — | dev | 12 | kmp |
| kmp-handle-permissions | — | dev | 6 | kmp |
| kmp-handling-events | — | dev | 16 | kmp |
| kmp-localizations-and-locale-codes | — | dev | 11 | kmp |
| kmp-paywalls | entry | dev | 4 | kmp |
| kmp-present-flows-in-observer-mode | — | dev | 2 | kmp |
| kmp-present-paywalls | — | dev | 14 | kmp |
| kmp-troubleshoot-paywall-builder | — | dev | 2 | kmp |
| kmp-use-fallback-paywalls | — | dev | 1 | kmp |
| kmp-web-paywalls | — | dev | 2 | kmp |
| localizations-and-locale-codes | — | dev | 16 | ios |
| react-native-flow-input | — | dev | 10 | react-native |
| react-native-flow-screen-views | — | dev | 4 | react-native |
| react-native-get-pb-paywalls | — | dev | 9 | react-native |
| react-native-handle-paywall-actions | — | dev | 8 | react-native |
| react-native-handle-permissions | — | dev | 5 | react-native |
| react-native-handling-events-1 | — | dev | 4 | react-native |
| react-native-localizations-and-locale-codes | — | dev | 11 | react-native |
| react-native-paywalls | entry | dev | 4 | react-native |
| react-native-present-flows-in-observer-mode | — | dev | 3 | react-native |
| react-native-present-paywalls | — | dev | 15 | react-native |
| react-native-troubleshoot-paywall-builder | — | dev | 3 | react-native |
| react-native-use-fallback-paywalls | entry | dev | 0 | react-native |
| react-native-use-fallback-paywalls-expo | — | dev | 2 | react-native |
| react-native-use-fallback-paywalls-pure | — | dev | 4 | react-native |
| react-native-web-paywall | — | dev | 2 | react-native |
| unity-flow-input | — | dev | 10 | unity |
| unity-flow-screen-views | — | dev | 4 | unity |
| unity-get-pb-paywalls | — | dev | 11 | unity |
| unity-handle-paywall-actions | — | dev | 11 | unity |
| unity-handle-permissions | — | dev | 5 | unity |
| unity-handling-events | — | dev | 8 | unity |
| unity-localizations-and-locale-codes | — | dev | 12 | unity |
| unity-paywalls | entry | dev | 4 | unity |
| unity-present-flows-in-observer-mode | — | dev | 2 | unity |
| unity-present-paywalls | — | dev | 5 | unity |
| unity-troubleshoot-paywall-builder | — | dev | 3 | unity |
| unity-use-fallback-paywalls | — | dev | 1 | unity |
| unity-web-paywalls | — | dev | 2 | unity |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

- **The `flow-input` family is five reusables plus per-platform code** (added 2026-09-07).
  `FlowInputPrerequisites`, `FlowInputVerify`, `FlowInputTiming`, `FlowInputParams`,
  `FlowInputLimitations` in `src/components/reusable/` carry every platform-independent sentence,
  including the parameter table and the element-type table — edit them once and all seven articles
  follow. What stays per file: the callback registration, the decode code, the close-hook paragraph
  under `## Delivery and limitations` (the hook names differ: `flowControllerDidDisappear` /
  `didDisappear`, `onFlowClosed`, `flowViewDidDisappear`, `onDisappeared`, `FlowViewDidDisappear`),
  and the React Native / Capacitor variant of the backend-errors sentence, because their handler
  returns a boolean. A shared table cannot carry a platform-only caveat; the Android `Double` note
  lives in code comments for that reason.
- **Five dashboard-side articles link `ios-flow-input` inline** (added 2026-09-07):
  `builder-inputs-and-forms`, `flow-selectable-elements`, `onboarding-quizzes`, `builder-toggles`,
  `adapty-flow-builder` — all in the flow-design / flow-logic zones. They point at the iOS article
  only, by decision; the reader reaches the other six through the platform switcher. Renaming
  `ios-flow-input` breaks five links outside this zone.

- **The `handle-permissions` family has three landing points outside its seven articles** (added
  2026-11-20). The builder's "Your app must handle this request" callout links the
  `handle-paywall-actions` pages at their root, with no anchor (dashboard code, 2026-11-20), so each of
  the seven carries a `## Handle permission requests` section as the last v4 H2 plus a one-line pointer
  under its intro. `onboarding-actions#request-permission` (flow-logic) links all seven articles, and its
  warning lists the per-SDK no-handler outcome. The Flutter and Unity `handling-events` pages and the
  Flutter, KMP and Unity v4 migration bullets each carry one sentence on it. A change to what happens
  without a handler, to a minimum version, or to the handler names moves all of these.

## Boundaries

- **flow-design / flow-logic** — this is the most common routing mistake in this corpus. flow-design/flow-logic is the dashboard builder: designing the flow's screens, elements, and logic in the visual editor. sdk-flows-display is the app code that displays the result of that design. "The button doesn't look right" or "the logic branch didn't fire" is flow-design/flow-logic; "the SDK crashed while presenting the flow" or "the paywall doesn't localize on device" is sdk-flows-display. State this boundary explicitly in both directions when routing — it's easy to file an SDK-presentation ticket that's really a builder-configuration issue, or vice versa.
- **sdk-flows-manual** — is the flow a Flow-Builder-made flow being displayed with the SDK's built-in presentation methods (sdk-flows-display), or is the developer fetching raw paywall/product data to render their own UI, or handling the purchase/restore call directly (sdk-flows-manual)? Purchases and restore always live in sdk-flows-manual, never here, even when the paywall being purchased came from Flow & Paywall Builder.
- **sdk-onboardings** — is the flow being presented a paywall (sdk-flows-display) or an onboarding (sdk-onboardings)? Both can be built in Flow & Paywall Builder, but the SDK-side onboarding-presentation code has its own zone.
- **paywalls-legacy** — is the paywall a Flow-Builder flow (sdk-flows-display) or a legacy remote-config paywall being fetched/rendered manually (paywalls-legacy for the dashboard side, sdk-flows-manual for the app-code side)?

## Ticket language

Rows name a **family**, not a platform article — the roster above expands each one across the seven
platforms. Corpus-wide synonyms (Flow Builder ↔ Flow & Paywall Builder, paywall ↔ flow in v4) live in `aliases.md`
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
| "wrong language shown", "not translated for the user's locale", "pt-BR vs pt_BR" | `localizations-and-locale-codes`. Locale-code normalization and fallback resolution are the answer to nearly every phrasing here. On iOS 4.5+ the app passes a list (`preferredLocales`), and case and separators don't matter; before 4.5, and on every other platform, the code has to match exactly, and the dashboard's lowercase spelling misses canonical-cased flows (see Gaps and misses, 2026-11-23). |
| "offline paywall", "Adapty servers unreachable", "bundled backup config" | `use-fallback-paywalls`. Two constraints do the work: the fallback must be set *before* the fetch, and Android's `res/raw` restricts the file name. React Native splits Expo and bare. |
| "avoid Apple/Google commission", "external checkout", "Stripe or Paddle from the app" | `web-paywall` (Unity and KMP: `web-paywalls`) when the user leaves the app for a web checkout. Commission avoidance is the business phrasing of what the docs call a web paywall. Corrected 2026-11-19: an **in-app** Stripe payment is a different job, see the next row. |
| "Stripe PaymentSheet in a flow", "alternative payment method", "pay another way", "Stripe sheet over the paywall" | `stripe-payment-sheet` (iOS only as of 2026-11-19: `ios-stripe-payment-sheet`). Prices reach the flow as custom tags, a **Custom Action** button opens PaymentSheet from app code, and Stripe's webhook grants access. The flow never receives the payment result: the app closes it. For physical goods and real-world services only (App Store guideline 3.1.3(e)); digital content goes to `web-paywall`. |
| "custom hero image per user", "swap the video remotely", "asset override" | `get-pb-paywalls` — custom asset override, not a builder-side edit. |
| "countdown timer wrong/not updating" | Split by cause: a timer whose value comes from app code is `get-pb-paywalls`; a timer that renders but doesn't tick is `present-paywalls`. |
| "paywall loads slowly", "cache the paywall", "preload products" | `get-pb-paywalls` — fetch policy choice (`returnCacheDataElseLoad` vs `reloadRevalidatingCacheData`). The default-audience fetch is the other speed lever, and it costs targeting: see the same row in `sdk-flows-manual`. |
| "full screen vs sheet", "embed the paywall in an existing screen", "inline paywall" | `present-paywalls`. Flutter additionally requires `FlutterFragmentActivity` on Android. |
| "view already presented", "error when reusing the paywall view" | `present-paywalls` — a view instance is single-use. |
| "native alert hidden behind the paywall", "paywall overlaps the status bar", "edge-to-edge insets" | `present-paywalls`, Android-specific presentation issues. |
| "where do I start with paywalls" | The `paywalls` family — the per-platform entry pages, whose job is routing to builder vs manual. |
| "get the email the user typed in the flow", "read quiz answers in the app", "save onboarding answers as custom attributes" | `flow-input`. Values ride the analytics callback as `flow_user_input`; text fields report on focus loss, selectables per tap, pickers on close. A default or pre-selected value never fires an event — the shared `FlowInputTiming` snippet is where that lives. |
| "the input event never arrives", "no flow_user_input on my device" | `flow-input`, the `## Before you start` snippet: the flow must have been published after 2026-09-07; the SDK floor is only "first v4". The Adapty preview app never shows these events — its `AdaptyUIFlowView` call registers no analytics callback (preview app code, closed-source) — so the test has to run in the developer's own build. |
| "date picker value is 6.45E11", "picker gives a Double on Android" | `flow-input`, the Android / Flutter / KMP code comments. Not a doc bug: the Android listener receives JSON numbers as `Double` before SDK 4.3.0, and whole numbers as `Long` from 4.3.0. The Android article states both. |

## Gaps and misses

### Observer-mode presentation across platforms — 2026-08-20

Verified during the `flows-with-your-own-payments` guide work; refs named per item.

- **Unity's observer-mode API breaks the family naming pattern.** Verified in `AdaptySDK-Unity`
  `origin/release/4.0.0`, `Packages/com.adapty.unity-sdk/Runtime/IAdaptyEventListener.cs`: the
  interface is `IAdaptyUIObserverModeResolver` (`:224`) and its methods are
  `FlowViewDidInitiatePurchase` (`:236`) and `FlowViewDidInitiateRestore` (`:252`) — **not**
  `observerModeDidInitiatePurchase`/`…Restore` as on Flutter and KMP. Registration is
  `Adapty.SetObserverModeResolver` (`:390`), on `Adapty`, not `AdaptyUI`. A case-insensitive grep
  for the family name finds nothing on Unity, which reads as "Unity lacks the feature". It doesn't.
- **Unity is the only platform that recovers from a missing resolver.** `IAdaptyEventListener.cs:1076`
  logs a named warning and then fires the start/finish events itself, so the loader doesn't hang.
  React Native, Capacitor and Flutter return silently, leaving the flow view untouched.
- **Registration object differs per platform and is easy to get wrong.** Flutter's
  `setObserverModeResolver` is on the `AdaptyUI()` singleton; KMP's is on `AdaptyUI`; Unity's is on
  `Adapty`. iOS passes the resolver as a parameter to `getFlowConfiguration` rather than registering
  it at all; Android passes a handler to the view/screen constructor.
- **React Native and Capacitor take neither a view nor a product on the restore hook**, unlike the
  three resolver-based platforms — `onObserverPurchaseInitiated` / `onObserverRestoreInitiated`.
- **Roster note:** `ios-present-paywall-builder-paywalls-in-observer-mode` and
  `android-present-paywall-builder-paywalls-in-observer-mode` keep their filenames for SEO, but as
  of 2026-08-20 both carry `Present flows in Observer mode…` titles and flows-and-paywalls prose.
  The filename no longer indicates the content — do not infer scope from it.
- **`IDictionary<string, object>` is a compile error in four Unity articles** (verified 2026-09-07 with
  `rg -n "IDictionary<" src/content/docs/unity/*.mdx` on `main`): `unity-quickstart-paywalls.mdx:261`,
  `unity-handling-events.mdx:445`, `unity-flow-screen-views.mdx:34` and `:53`. The listener signature is
  `IReadOnlyDictionary<string, object>` (`Packages/com.adapty.unity-sdk/Runtime/IAdaptyFlowsEventsListener.cs:135`,
  tag `4.1.1`). `unity-flow-input` was fixed in PR #522; the other four are open.
- **A kept React Native flow view doesn't survive a handler that returns `true` (2026-11-04, react-native-adapty `v4.3.0`, iOS `4.3.2`, Android `4.3.1`).** The emitter calls `onRequestClose` (`src/ui/flow-view-emitter.ts`), which is a plain `dismiss()` (`src/ui/flow-view-controller.ts`), and `destroy` defaults to `true`. That covers the default `onCloseButtonPress` and `onError`. A released view fails `present()` with `viewNotFound` on both bridges (`Sources.AdaptyUI/Crossplatform/Plugin.swift`, `crossplatform/.../ui/CrossplatformUiHelper.kt`, `handlePresentView`). `viewAlreadyPresented` means a modal flow is already on screen, not that the view was used before. Both bridges report these as code `3001` (`wrongParam`), and the name appears only in the message: `react-native-adapty` exports no `AdaptyUIError`. The React Native flow articles state both as of 2026-11-04. Flutter `4.1.1` differs in mechanism: the default close is plain Dart (`view.dismiss()`, `lib/src/adaptyui_observer.dart`), and `dismiss` defaults to `destroy: true`. Overriding `flowViewDidPerformAction` covers the close path only: `flowViewDidReceiveError` also dismisses, in the default observer (`lib/src/adaptyui_events_defaults.dart`) and in the `flutter-handling-events` sample. The observer is global (`lib/src/adaptyui_events_proxy.dart`) and Flutter has no `destroy()`, so an unconditional `destroy: false` would leave views that the app can't release. `flutter-present-paywalls` compares `view.id` for that reason, as of 2026-11-04.
- **React Native onboardings don't follow the flow lifecycle (2026-11-04, react-native-adapty `v4.3.0`).** `src/ui/onboarding-view-controller.ts` always sends `destroy: false` and then removes the listeners, so the native view stays cached and the once-only warnings aren't literally what the bridge enforces. Creating a new view is still the right instruction, because the old one has no handlers. Runtime behavior of a second `present()` on an onboarding was not tested.
- **`destroy` is a cross-platform bridge concept (checked 2026-11-04).** `grep -n -iE "reuse|again|once"` on `ios-present-paywalls` and `android-present-paywalls` finds no once-only claim, and neither article documents `destroy`. iOS `4.3.2` has no `dismiss` or `destroy` function under `Sources.AdaptyUI` outside `Crossplatform`. The public Android API was not checked separately.

**Verified 2026-11-17 while documenting the Number picker.**

- **`flow_user_input` for `wheel_range_picker`** (transformer code, plus the public SDKs): `value` is a JSON number
  that can have decimals; the untouched default is sent; the event fires on a navigation action or a non-product
  option/toggle tap on the same screen, and not again while the value is unchanged. Both native SDKs render the
  picker from 4.0.0 (`AdaptySDK-iOS` `AdaptyUIWheelRangePickerView.swift`; `AdaptySDK-Android`
  `WheelRangePickerElementMapping.kt`), so no version gate.
- **Value types per platform.** iOS: an `NSNumber`, read as `Double` (`as? Int` fails on 70.5; bridging is
  Foundation behavior, medium confidence). Android: `Long` for a whole value on 4.3.0 and later
  (`utils/jsonNumbers.kt`), `Double` otherwise. Flutter `num`; React Native and Capacitor `number`; KMP raw JSON.
  Unity: every JSON number in `params` is a boxed `double` (`AdaptyConverterLooseJson.cs`), so a cast to `long`
  throws.
- **Pre-existing errors found, not fixed (2026-11-17):** `FlowInputParams.mdx` says Element IDs are unique within a
  screen — the builder rejects a duplicate anywhere in the flow (builder code). `unity-flow-input` says date values
  are `long` (they're `double`) and its `item_ids as JArray` example is always null (the converter returns
  `List<object>`), so "Customize flows shown later" does nothing on Unity.

- **2026-11-19, from writing and running `ios-stripe-payment-sheet` end to end (simulator, Stripe test mode, AdaptySDK-iOS `master` b3ed2694 and tags 4.0.0–4.4.0):**
  - **`.custom` changed shape in 4.4.0.** `case custom(id: String)` through 4.3.0, `case custom(id: String, arguments: [String: any Sendable]?)` from 4.4.0 (`Sources.AdaptyUI/AdaptyUI+Public.swift`, compared across tags). Builder-made custom actions send no arguments at all (builder code, 2026-11-18), so a guide that only reads the ID works from 4.0.0 with a `// 4.0–4.3: case let .custom(id)` comment, which is what `handle-paywall-actions` already does.
  - **Implementing `didPerform` replaces the default close and open-URL handling** in both UIKit (`AdaptyUI+DefaultConfiguration.swift:20-32`, protocol-extension default) and SwiftUI (`AdaptyFlowView.swift`, `didPerformAction ?? default`). A guide that overrides it must handle `.close` and `.openURL(url, in:)` itself. The SDK's own presentation-aware URL opener is `package`-scoped (`Sources/WebPaywall/Adapty+WebPaywall.swift`), so apps rebuild the in-app browser with `SFSafariViewController`.
  - **Required handlers:** UIKit requires exactly the four purchase/restore delegate methods; the SwiftUI `.flow` modifier also requires `didReceiveError` (`AdaptyFlowViewModifier.swift`). `didReceiveError` fires for non-fatal runtime errors (JS exceptions, a bad link), so closing the flow there can close an app-presented sheet on top of it.
  - **`AdaptyFlowController` holds its delegate `weak`** (`AdaptyFlowController.swift:56`): a guide that creates the delegate inline must tell the reader to keep a reference.
  - **`didSelectProduct` doesn't fire for the product a builder flow selects by default**; it fires on tap only. Flows converted from legacy paywalls still report the initial selection (`AdaptyFlowConfiguration.swift:183-197`). The SDK docstring still says "by user or by system": a code issue, not a docs one.
  - **The SDK refreshes the profile every 60 s** (`LifecycleManager.swift:21`), not on a server push. Access granted by a store-independent webhook (Stripe) reaches the app only through `getProfile()` or the next sync.
  - **`FlowConfiguration.sendAppMessage(_:)` exists in 4.4.0** and reaches the flow script as `applicationMsg`, but builder-generated scripts ignore that event (builder code, 2026-11-18). So no doc can tell readers to branch a builder flow on an app-reported result yet.
  - **Not verified at runtime:** the PaymentSheet return URL (cards don't redirect), the in-app browser path, and a `didReceiveError` while PaymentSheet is open. The snippets for them compile under Swift 6 only.

**Verified 2026-11-20 while documenting the `handle-permissions` family** (public SDK repos at the tags
named; builder and transformer behavior from dashboard code and transformer code, 2026-11-20):

- **What happens without a handler depends on the Adapty SDK, not on the OS.** The cross-platform
  bridges always forward the request to the wrapper (AdaptySDK-iOS `Sources.AdaptyPlugin/HostRequest/PluginSystemRequestsHandler.swift`),
  so the wrapper decides. The flow stays on the screen with native iOS
  (`Sources.UIBuilder/UIBuilder/Logic/AdaptyUIStateActionHandler.swift`, `guard let handler … else { return }`),
  Flutter, Unity (logs `System requests handler is not set`) and KMP. It moves on with `denied` and no
  dialog with native Android (`AdaptyFlowDefaultEventListener` answers `false`), React Native and
  Capacitor (default handler logs a warning and answers `denied`, on both OSes).
- **A throwing handler:** React Native and Capacitor answer `denied`; Flutter and Unity send no answer
  (the flow stays); KMP crashes the app (`AdaptyUIImpl.kt`, `MainScope().launch` with no exception
  handler, 4.1.0 and 4.3.0-beta.1); native Android doesn't catch exceptions from
  `onShowRequestPermission`. iOS `handlePermission` can't throw.
- **Minimum versions stated in the articles:** iOS, Android, React Native, Flutter 4.0.0; KMP and
  Capacitor 4.1.0 (their 4.0 line shipped only as betas); Unity 4.1.0 (4.0.0-beta.1 had a different
  signature), and 4.3.0 on Android: Unity's CHANGELOG `[4.3.0-beta.1]` says a `respond` made off Unity's
  thread waited until the flow closed, and 4.3.0 requires Unity 6.
- **The flow sends `push` with no custom arguments**, and never sends an app review request (no such
  action in the builder). Flutter's base `handleAppReviewRequest` does nothing once a handler is
  registered, so the Flutter example overrides it.
- **Open question, not verified on a device:** on Android, Flutter, Unity, KMP and React Native before
  4.3.0 present a modal flow in a separate activity (AdaptySDK-Android `crossplatform/…/CrossplatformUiHelper.kt`,
  no `isPresentationEmbedded`), while permission libraries ask from the app's activity underneath.
  Android delivers permission results to an activity only when it resumes, so the answer may arrive
  only after the flow closes. The KMP article asks from the resumed activity; the Flutter, Unity and
  React Native articles say nothing until an Android 13+ device check settles it.

**Verified 2026-11-23 while documenting iOS SDK 4.5.0 flow localization** (public iOS SDK at `release/4.5.0`;
builder and transformer behavior from dashboard code and transformer code, 2026-11-23):

- **Casing mismatch for exact-match lookups.** The Flow & Paywall Builder shows locale codes in lowercase
  (`pt-br`, `zh-hant`), but flows published since 2026-07-23 carry canonical BCP 47 casing in their config
  (`pt-BR`, `zh-Hant`); flows published earlier and never republished may still carry lowercase IDs
  (unconfirmed). An SDK that looks the passed code up exactly misses when the app passes the dashboard
  spelling, which is what the `localizations-and-locale-codes` family and the v4 migration guides told
  readers to do. Exact lookups: iOS 4.0–4.4 (dictionary key), Android every 4.x (Kotlin `==` on the
  localization `id`, `AdaptySDK-Android` 4.4.1
  `adapty-ui/.../mapping/viewconfig/ViewConfigurationMapper.kt`), and every wrapper, because Flutter,
  React Native, Capacitor, Unity, and KMP forward `locale` verbatim to the native SDK (checked
  2026-11-23). Fixed for iOS 4.5+ by case-insensitive matching. The other platforms' docs now say: pass
  the published flow's spelling (`pt-BR`), lowercase (`pt-br`) for old Paywall Builder paywalls
  (2026-11-23). Native Android can't read which localization rendered (`FlowConfiguration.localizationId`
  is internal); wrapper views expose it as `view.locale`. **Open questions:** whether production still
  holds flows with lowercase IDs (published before 2026-07-23, never republished), and the casing of
  remote-config `locale` codes; neither checked against production data.
- **Only old Paywall Builder paywalls are "legacy" to the iOS 4.5 resolver.** They reach SDK v4 `getFlow`
  from a paywall placement with schema format 4.0.0–4.4.1, lowercase locale IDs, and `en` as the
  default; every Flow & Paywall Builder flow is format 5.x. Republishing an old paywall keeps it below
  4.8; **Move to new builder** creates a separate flow (dashboard code, 2026-11-23).
- **The dashboard's language list** (**Select languages**) offers lowercase codes, with region or script
  variants only for `es-419`, `es-mx`, `fr-ca`, `pt-br`, `zh-hans`, `zh-hant`, `zh-hk`; no `pt-PT`, `nb`,
  `sr-Latn`, or `en-*` (backend code, computed from pinned libraries, not read from the live API).
  Locale-set advice must stay inside this list.
- **Not in iOS 4.5.0:** loading a single localization per layout. No SDK branch or backend response
  carries the per-flow locale list it would need (checked 2026-11-23).

