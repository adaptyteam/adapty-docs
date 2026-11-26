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
(`paramsJsonString`). No SDK has a working way to write into a running flow. **Corrected 2026-11-18**
(this sentence said that no SDK exposes one): iOS 4.4.0 and Android 4.4.0 both have a public
`AdaptyUI.FlowConfiguration.sendAppMessage` (AdaptySDK-iOS 4.4.0
`Sources.AdaptyUI/Paywalls/Rendering/AdaptyFlowConfiguration.swift:220`; AdaptySDK-Android 4.4.0
`adapty-ui/src/main/java/com/adapty/ui/AdaptyUI.kt`, the `sendAppMessage` doc comment), and a custom
element's context can send a message too. But the flow script that the builder compiles ignores both
events (builder and transformer code, 2026-11-17). The docs don't mention `sendAppMessage`, on purpose.
The callback has no return channel except React Native/Capacitor's `EventHandlerResult` boolean, which
only closes the view (`jscore` `src/ui-builder/types.ts:27`).

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
  Not one article shows a purchase call as a step, and a new one must not. **On iOS, that quoted row was
  wrong** (corrected in `ios-handling-events` and `ios-present-paywalls` on 2026-11-18):
  `didFinishPurchase` also fires for `.userCancelled`, a StoreKit `paymentCancelled` included, and for
  `.pending`; only other errors reach `didFailPurchase` (AdaptySDK-iOS 4.4.0
  `Sources.AdaptyUI/Paywalls/Logic/AdaptyUIBuilder+Logic.swift:122-155`). The other platforms' rows,
  such as `capacitor-handling-events` and `react-native-handling-events-1`, still say "completes
  successfully" and were not checked.
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
- **Per-kind permission facts live only in `flow-permissions`** (added 2026-11-26). What each of the 21
  permission kinds shows users, its `Info.plist` keys, capabilities, manifest permissions and API
  levels, and the native result → answer → section → `outcome` table are written once, in the shared
  tutorial article `flow-permissions` (title **System permissions**, sidebar Flow & Paywall Builder →
  Navigation and interaction, after `onboarding-actions`). The seven `*-handle-permissions` guides carry
  the handler code, SDK minimums, the declaration table, the wrapper's plugin table and status mapping,
  testing, and one pointer sentence in `## Declare the permissions`. The reference holds no Adapty SDK
  identifiers (no `AdaptyPermission`, `onShowRequestPermission`, `handlePermission`) and no minimum
  Adapty SDK versions: those differ per SDK. Third-party plugin mappings (permission_handler,
  react-native-permissions, Capacitor plugins, Unity APIs, moko-permissions) live only in the matching
  guide's `## Request each permission` section (KMP: `### Use moko-permissions`).
  Since 2026-11-27, each of the seven guides also has `## Code for each permission`: a dispatcher in
  `## Implement the handler` and one H3 per kind, with the reference's heading text and wire-value id,
  a pointer `See [System permissions](flow-permissions#<id>)`, and one self-contained code block. A
  place where the code can't follow the reference's mapping (a plugin that can't report a status) is
  one bullet that starts with **Differs from System permissions**.

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| flow-input | ios-flow-input | android-flow-input | react-native-flow-input | flutter-flow-input | unity-flow-input | kmp-flow-input | capacitor-flow-input |
| flow-permissions |  |  |  |  |  |  |  |
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
| android-handle-permissions | — | dev | 28 | android |
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
| capacitor-handle-permissions | — | dev | 29 | capacitor |
| capacitor-handling-events | — | dev | 4 | capacitor |
| capacitor-localizations-and-locale-codes | — | dev | 11 | capacitor |
| capacitor-paywalls | entry | dev | 4 | capacitor |
| capacitor-present-flows-in-observer-mode | — | dev | 2 | capacitor |
| capacitor-present-paywalls | — | dev | 8 | capacitor |
| capacitor-use-fallback-paywalls | — | dev | 4 | capacitor |
| capacitor-web-paywall | — | dev | 3 | capacitor |
| flow-permissions | reference | dev, marketer | 30 | tutorial |
| flutter-flow-input | — | dev | 10 | flutter |
| flutter-flow-screen-views | — | dev | 4 | flutter |
| flutter-get-pb-paywalls | — | dev | 11 | flutter |
| flutter-handle-paywall-actions | — | dev | 9 | flutter |
| flutter-handle-permissions | — | dev | 30 | flutter |
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
| ios-handle-permissions | — | dev | 28 | ios |
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
| kmp-handle-permissions | — | dev | 29 | kmp |
| kmp-handling-events | — | dev | 16 | kmp |
| kmp-localizations-and-locale-codes | — | dev | 11 | kmp |
| kmp-paywalls | entry | dev | 4 | kmp |
| kmp-present-flows-in-observer-mode | — | dev | 2 | kmp |
| kmp-present-paywalls | — | dev | 14 | kmp |
| kmp-troubleshoot-paywall-builder | — | dev | 2 | kmp |
| kmp-use-fallback-paywalls | — | dev | 1 | kmp |
| kmp-web-paywalls | — | dev | 2 | kmp |
| localizations-and-locale-codes | — | dev | 11 | ios |
| react-native-flow-input | — | dev | 10 | react-native |
| react-native-flow-screen-views | — | dev | 4 | react-native |
| react-native-get-pb-paywalls | — | dev | 9 | react-native |
| react-native-handle-paywall-actions | — | dev | 8 | react-native |
| react-native-handle-permissions | — | dev | 29 | react-native |
| react-native-handling-events-1 | — | dev | 4 | react-native |
| react-native-localizations-and-locale-codes | — | dev | 11 | react-native |
| react-native-paywalls | entry | dev | 4 | react-native |
| react-native-present-flows-in-observer-mode | — | dev | 3 | react-native |
| react-native-present-paywalls | — | dev | 16 | react-native |
| react-native-troubleshoot-paywall-builder | — | dev | 3 | react-native |
| react-native-use-fallback-paywalls | entry | dev | 0 | react-native |
| react-native-use-fallback-paywalls-expo | — | dev | 2 | react-native |
| react-native-use-fallback-paywalls-pure | — | dev | 4 | react-native |
| react-native-web-paywall | — | dev | 2 | react-native |
| unity-flow-input | — | dev | 10 | unity |
| unity-flow-screen-views | — | dev | 4 | unity |
| unity-get-pb-paywalls | — | dev | 11 | unity |
| unity-handle-paywall-actions | — | dev | 11 | unity |
| unity-handle-permissions | — | dev | 29 | unity |
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
- **"`flowControllerDidDisappear` is not a close" has one owner: the note in `ios-handling-events`
  (2026-11-18).** Three iOS articles treat the callback as the close: `ios-flow-input` (send the collected
  values), `ios-flow-screen-views` ("the flow itself went away"), and the BMI example in
  `ios-flow-custom-tags` (open the paywall after the onboarding flow). Each is right for its own
  scenario, because nothing covers the flow there. If one of them gains a step that presents something
  full screen over the flow, such as an ad, a login screen from a custom action, or a second flow, it
  needs the `.close` route instead. `ios-virtual-currency-top-up` stated the rule for ads until its
  2026-11-19 rebuild dropped the ad. It now closes one flow before it opens the other: in UIKit, it
  opens the next flow in the dismissal's completion, and in SwiftUI from the first flow's `didDisappear`.
  So it relies on the same semantics. A change to the lifecycle semantics moves the note and these four
  articles together.

- **The `handle-permissions` family has three landing points outside its seven articles** (added
  2026-11-20). The builder's "Your app must handle this request" callout links the
  `handle-paywall-actions` pages at their root, with no anchor (dashboard code, 2026-11-20), so each of
  the seven carries a `## Handle permission requests` section as the last v4 H2 plus a one-line pointer
  under its intro. `onboarding-actions#request-permission` (flow-logic) links all seven articles, and its
  warning lists the per-SDK no-handler outcome. The Flutter and Unity `handling-events` pages and the
  Flutter, KMP and Unity v4 migration bullets each carry one sentence on it. A change to what happens
  without a handler, to a minimum version, or to the handler names moves all of these.
- **Three reusables carry the platform-independent half of the `handle-permissions` family** (added
  2026-11-24; rewritten 2026-11-26, when the per-kind reference `flow-permissions` was added).
  `FlowPermissionAnswers` (which answer runs which section, and the statuses), `FlowPermissionEvents`
  (the three analytics events, the `outcome` values and the exact status strings) and
  `FlowPermissionDeclarations` (the summary table: builder label, value, `Info.plist` keys and
  capabilities, Android permissions with their Android versions folded into the cells) in
  `src/components/reusable/`. The five cross-platform guides render `FlowPermissionDeclarations`; the iOS
  and Android guides carry a one-platform copy inline, with the native value and first-column links to
  `flow-permissions#<value>`. `flow-permissions` renders all three reusables, so **no reusable may link
  to `flow-permissions`**: the link would point at the page it renders on. Its 21 H3s carry explicit ids
  equal to the wire value (`### Camera \{#camera\}`, `\{#location_when_use\}`); a later builder deep
  link may depend on them, so never rename an id. What moves together:
  - **New permission kind or renamed builder label:** a new H3 in its group in `flow-permissions` (id =
    wire value), a `FlowPermissionDeclarations` row, the iOS inline row (and its `AdaptyPermission`
    case), the Android inline row if Android has a permission, a row in each wrapper's plugin table, the
    builder labels and callout (dashboard code), and `onboarding-actions` only if it names the kind.
  - **Changed declaration (key, manifest permission, API level, capability):** the kind's section in
    `flow-permissions`, `FlowPermissionDeclarations`, the iOS or Android inline table, the builder
    callout.
  - **Changed routing or a new status string:** `FlowPermissionAnswers`, the Section column of the 21
    per-kind tables, `onboarding-actions#request-permission`, the status-mapping tables of the five
    wrapper guides, and the handler samples if a status they send changes.
  - **Changed `outcome` mapping or events:** `FlowPermissionEvents`, the `outcome` column of the 21
    per-kind tables, the `FlowInputParams` event-name row.
  - **Changed no-handler behavior, SDK minimums or handler names:** the seven guides and the
    `onboarding-actions` warning only. Not the reference.
  - **Changed native result → answer mapping in a kind's table, or a changed rule in `## Rules for every
    permission`** (for example the Android rationale order): the code block of that kind in all seven
    guides' `## Code for each permission`, and the shared helpers in their dispatchers (Android and KMP
    `RuntimePermissionRequester` / runtime helpers, Unity's Android helper, React Native's
    `answerAndroid`). Re-run each platform's compile check after the change.
  The Section and `outcome` columns are derived from `FlowPermissionAnswers` and the `FlowPermissionEvents`
  table, never chosen per kind. `FlowInputParams` names the permission events in its row for the event
  name, because the flow-input articles filter the same analytics callback. Each `*-handle-permissions`
  article introduces `FlowPermissionEvents` with "To see how users answer permission requests", so a
  change to what the events report moves that sentence in all seven.

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
| "button does nothing", "close button won't dismiss", "login button", "terms of use link" | `handle-paywall-actions`. All builder buttons arrive as one action callback keyed by a custom action ID. On iOS, an implementation of `flowController(_:didPerform:)` replaces the default handling of every action, so one without `.close` and `.openURL` cases leaves the close button and links dead. A `.custom` action never closes the flow (AdaptySDK-iOS 4.4.0 `Sources.AdaptyUI/AdaptyUI+DefaultConfiguration.swift`; 2026-11-18). |
| "Android back button doesn't close the paywall" | `handle-paywall-actions` — a distinct case from the close button, and Android-only. |
| Either of the two rows above **but the ticket says "after we upgraded"** | Check `sdk-migrations` first, then come back. v4 changed two defaults without breaking the build: the system back press is now consumed, and the default purchase handler no longer dismisses the view. A handler that "stopped being called" after an upgrade is a migration symptom, not a wiring mistake — and on iOS and Android that content is prose inside the guide's `## Handling events`, not a named section. |
| "purchase callback never fires", "restore failed", "paywall stays open after purchase" | `handling-events`. In v4 the view no longer auto-dismisses after a purchase; a missing required observer method is the other usual cause (it surfaces as a compile error). |
| "the flow closed after the user cancelled", "a cancelled purchase ran our success code", "Ask to Buy closed the paywall" | `handling-events`. On iOS, `didFinishPurchase` fires for `.success`, `.userCancelled`, and `.pending`, so the handler checks `purchaseResult` (for example, `isPurchaseSuccess`) before it closes the flow or acts on a purchase (2026-11-18; see What we document). |
| "`flowControllerDidDisappear` fired but the flow is still open", "the flow 'closed' when the ad appeared", "`flowControllerDidAppear` fires twice", "how do I know the user closed the flow" | `handling-events`, iOS: the note under the UIKit lifecycle callbacks (2026-11-18). `AdaptyFlowController` presents with `.fullScreen`, so any `.fullScreen` view controller over it, such as a rewarded ad or another flow, fires `flowControllerDidDisappear`, then `flowControllerDidAppear` when it closes (AdaptySDK-iOS 4.4.0 `Sources.AdaptyUI/Paywalls/Rendering/AdaptyFlowController.swift:75`, `:104-129`). The flow keeps its screen and variables, and its timers pause and resume. To detect a close, handle `.close`: it arrives when a **Close flow** action runs, while the flow is still on screen. In SwiftUI, covering the flow doesn't fire `didDisappear` (medium-high: `AdaptyFlowView` has `.onAppear` and no `.onDisappear`). Not run on a device with an ad SDK. |
| "own purchase logic with Adapty's UI", "bring my own IAP handling" | `present-flows-in-observer-mode` (iOS: `present-paywall-builder-paywalls-in-observer-mode`). Reporting the transaction afterwards is mandatory, not optional. |
| "wrong language shown", "not translated for the user's locale", "pt-BR vs pt_BR" | `localizations-and-locale-codes`. Locale-code normalization and fallback resolution are the answer to nearly every phrasing here. |
| "offline paywall", "Adapty servers unreachable", "bundled backup config" | `use-fallback-paywalls`. Two constraints do the work: the fallback must be set *before* the fetch, and Android's `res/raw` restricts the file name. React Native splits Expo and bare. |
| "avoid Apple/Google commission", "external checkout", "Stripe or Paddle from the app" | `web-paywall` (Unity and KMP: `web-paywalls`) when the user leaves the app for a web checkout. Commission avoidance is the business phrasing of what the docs call a web paywall. Corrected 2026-11-19: an **in-app** Stripe payment is a different job, see the next row. |
| "Stripe PaymentSheet in a flow", "alternative payment method", "pay another way", "Stripe sheet over the paywall" | `stripe-payment-sheet` (iOS only as of 2026-11-19: `ios-stripe-payment-sheet`). Prices reach the flow as custom tags, a **Custom Action** button opens PaymentSheet from app code, and Stripe's webhook grants access. The flow never receives the payment result: the app closes it. For physical goods and real-world services only (App Store guideline 3.1.3(e)); digital content goes to `web-paywall`. |
| "custom hero image per user", "swap the video remotely", "asset override" | `get-pb-paywalls` — custom asset override, not a builder-side edit. |
| "countdown timer wrong/not updating" | Split by cause: a timer whose value comes from app code is `get-pb-paywalls`; a timer that renders but doesn't tick is `present-paywalls`. |
| "paywall loads slowly", "cache the paywall", "preload products" | `get-pb-paywalls` — fetch policy choice (`returnCacheDataElseLoad` vs `reloadRevalidatingCacheData`). The default-audience fetch is the other speed lever, and it costs targeting: see the same row in `sdk-flows-manual`. |
| "full screen vs sheet", "embed the paywall in an existing screen", "inline paywall" | `present-paywalls`. Flutter additionally requires `FlutterFragmentActivity` on Android. |
| "view already presented", "error when reusing the paywall view" | `present-paywalls`. **Corrected 2026-11-18** (this row said only that a view instance is single-use, which contradicted this brief's own 2026-11-04 gap entry): on the cross-platform bridges, `viewAlreadyPresented` means that a modal flow is already on screen, so React Native, Flutter, Capacitor, Unity, and KMP can't present a flow over a flow (AdaptySDK-iOS `Sources.AdaptyUI/Crossplatform/Plugin.swift:20-27`, `:152-154`; AdaptySDK-Android `crossplatform/src/main/java/com/adapty/internal/crossplatform/ui/CrossplatformUiHelper.kt:59`, `:97-98`). A released React Native view fails `present()` with `viewNotFound` (see Gaps). Native iOS has no such guard. |
| "native alert hidden behind the paywall", "paywall overlaps the status bar", "edge-to-edge insets" | `present-paywalls`, Android-specific presentation issues. |
| "where do I start with paywalls" | The `paywalls` family — the per-platform entry pages, whose job is routing to builder vs manual. |
| "get the email the user typed in the flow", "read quiz answers in the app", "save onboarding answers as custom attributes" | `flow-input`. Values ride the analytics callback as `flow_user_input`; text fields report on focus loss, selectables per tap, pickers on close. A default or pre-selected value never fires an event — the shared `FlowInputTiming` snippet is where that lives. |
| "the input event never arrives", "no flow_user_input on my device" | `flow-input`, the `## Before you start` snippet: the flow must have been published after 2026-09-07; the SDK floor is only "first v4". The Adapty preview app never shows these events — its `AdaptyUIFlowView` call registers no analytics callback (preview app code, closed-source) — so the test has to run in the developer's own build. |
| "app crashes when the flow asks for X", "Info.plist key for X", "which capability does Health need" | `flow-permissions#<kind>`. iOS terminates the app for most kinds when the purpose string is missing; Siri crashes on any `INPreferences` call without the Siri capability. The guide's handler must answer the status "unsupported" for kinds the app doesn't declare. |
| "location always never asked", "background location", "Allow all the time missing" | `flow-permissions#location_always`. Two steps on both OSes: iOS gives provisional Always and asks later; Android 11+ sends the user to a settings page, after foreground location. |
| "flow stuck on the location screen", "permission screen never moves on" | `flow-permissions#location_when_use` first: `requestWhenInUseAuthorization()` never calls back when the status is decided or the key is missing. Then the guide's no-handler warning for the SDK. |
| "ATT from the onboarding", "tracking dialog doesn't show at launch" | `flow-permissions#tracking`. The alert needs an active app; **On Screen Appear** on the first screen can fire too early. Sending the status to Adapty is `ios-deal-with-att`. |
| "no notification dialog on Android 12" | `flow-permissions#push`. No runtime permission below Android 13; the app answers from `areNotificationsEnabled()`. |
| "photos limited access", "selected photos reported as granted on Android 14" | `flow-permissions#photos`. Declare `READ_MEDIA_VISUAL_USER_SELECTED`, or Android reports a selection as a full grant. |
| "which permissions work on Android", "unsupported on Android" | `flow-permissions#permissions-by-platform`: a dash in the Android column means answer the status "unsupported". |
| "permission_handler returns granted on Android for reminders" | `flutter-handle-permissions#request-each-permission`. permission_handler answers iOS-only kinds without a dialog on Android. |
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

**Verified 2026-11-18 for the virtual currency top-up recipe** (AdaptySDK-iOS 4.4.0 unless noted; the
open items name how each was checked). The recipe dropped its rewarded ad on 2026-11-19; the facts
below stay as SDK facts for any app that presents a view controller over a flow.

- **Presenting a view controller over an open flow (UIKit) is unblocked, and the SDK does it itself.**
  The default Open URL action with the in-app browser finds the top presented view controller and
  presents `SFSafariViewController` from it (`Sources.UIBuilder/UIBuilder/AdaptyUIBuilder+OpenURL.swift`,
  `:31` and `:58`). No SDK check blocks a presentation over the flow. AdMob and AppLovin MAX present a
  rewarded ad themselves, from a view controller, with no view to place in a layout (their iOS API
  references, read 2026-11-18), so a custom element can't host one. Other ad networks were not checked.
- **Open: a device run.** Nobody has run an ad, or a second flow, over an open flow on a device. The
  behavior above, and the didDisappear/didAppear pair in `Ticket language`, rest on code and standard
  UIKit semantics.
- **Open: SwiftUI stacking.** `.flow` wraps the flow in `.fullScreenCover`, or `.sheet` with
  `fullScreen: false` (`Sources.AdaptyUI/Paywalls/Rendering/AdaptyFlowViewModifier.swift:131-155`), and
  gives app code no place to attach a second `.flow` inside the first. Presenting `AdaptyFlowView` in
  the app's own `.fullScreenCover` with a nested `.flow` should work but is untested, and without the
  modifier the covered flow's `didDisappear` never fires. The docs show no SwiftUI pattern for it.
  **2026-11-19:** the rebuilt recipe avoids stacking in SwiftUI: two sibling `.flow` modifiers, the
  second opened from the first one's `didDisappear`, which runs in the `onDismiss` of its
  `.fullScreenCover` or `.sheet` (`AdaptyFlowViewModifier.swift:134-147`). Standard SwiftUI, not run on
  a device.
- **Open: Android native flow over flow.** One process-wide script state handler serves every flow, so a
  second flow takes over the first flow's state until the first is shown again (AdaptySDK-Android
  `origin/master` at 4.3.4, read 2026-11-17; medium-low, code reading only; 4.4.0 not re-read).
- **Open: `didFinishPurchase` wording off iOS.** `capacitor-handling-events`,
  `react-native-handling-events-1`, and the `*-troubleshoot-purchases` articles say a purchase callback
  fires when the purchase "completes successfully". Found with `rg -l "completes successfully"`
  (2026-11-17); only iOS was checked against code.

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
  signature). Corrected 2026-11-26: the Unity guide no longer requires "4.3.0 on Android", because no
  stable 4.3.0 exists (tags 4.0.0-beta.1, 4.1.0–4.1.2, 4.3.0-beta.1; `git ls-remote --tags`). It states
  the two Android fixes that Unity's CHANGELOG `[4.3.0-beta.1]` lists (GameActivity gets no events; a
  `respond` made off Unity's thread waits until the flow closes) and that 4.3.0-beta.1 requires Unity 6.
- **The flow sends the permission selected in the builder with no custom arguments** (corrected
  2026-11-24: until the builder's Permission select shipped, the only value was `push`; dashboard code,
  2026-11-24), and never sends an app review request (no such action in the builder). Flutter's base
  `handleAppReviewRequest` does nothing once a handler is registered, so the Flutter example overrides it.
- **Open question, not verified on a device:** on Android, Flutter, Unity, KMP and React Native before
  4.3.0 present a modal flow in a separate activity (AdaptySDK-Android `crossplatform/…/CrossplatformUiHelper.kt`,
  no `isPresentationEmbedded`), while permission libraries ask from the app's activity underneath.
  Android delivers permission results to an activity only when it resumes, so the answer may arrive
  only after the flow closes. The KMP article asks from the resumed activity; the Flutter, Unity and
  React Native articles say nothing until an Android 13+ device check settles it.

**Verified 2026-11-24 while documenting permission kinds and the three outcome sections** (public SDK
repos: AdaptySDK-iOS and AdaptySDK-Android 4.4.0, Flutter 4.3.1, KMP 4.3.0-beta.1, Unity 4.3.0-beta.1,
`@adapty/core` 4.3.4 for React Native and Capacitor; builder and flow-script behavior from dashboard code
and transformer code, 2026-11-24):

- **Permission values per SDK.** iOS: `AdaptyPermission` (`AdaptyUIPermission`) has 21 cases plus
  `.custom(String)` for an unknown value (`Sources.UIBuilder/UIBuilder/Public/AdaptyUIBuilder+Permissions.swift`,
  `init(jsString:)` maps the wire strings). Android: `onShowRequestPermission(permission: String?, …)`
  gets the wire string. Flutter: `AdaptyUIPermission` class with camelCase constants and `value`
  (`lib/src/models/adaptyui/adaptyui_permission.dart`). KMP: class with UPPER_CASE companion constants
  and `value` (`adapty/api/adapty.klib.api`). React Native and Capacitor: `AdaptyPermission` is a string
  literal union with `(string & {})` (`src/types/flow-events.ts` in `@adapty/core`), so samples compare
  strings. Unity: a plain `string` with no constants (`Runtime/IAdaptyUISystemRequestsHandler.cs`).
- **Statuses are free strings on every SDK.** iOS `.granted(String?)` / `.denied(String?)`, Android
  `PermissionCallback(granted, detailResult)`, Flutter `AdaptyUIPermissionResult.granted([detail])`, KMP
  `granted(detail)` / `denied(detail)`, Unity `respond(bool, string)`, React Native and Capacitor
  `{ status, detail? }` (`FlowPermissionResponse`, exported from both packages in the versions above).
  No SDK defines constants for `granted`, `denied`, `restricted`, `permanently_denied`, `limited`,
  `provisional`, or `unsupported`: the flow script reads `detailResult`, so the docs give the strings.
- **Every default handler answers without a status**, so it runs **After response**: Android
  `callback.invoke(false, null)`; React Native and Capacitor `{ status: 'denied' }`, also for a throwing
  handler. Corrected 2026-11-26 (AdaptySDK-iOS 4.4.1 and 4.0.0, 4.1.3, 4.2.2, 4.3.2
  `Sources.AdaptyPlugin/Events/EventHandler.swift`, `HostRequest/HostRequestRegistry.swift`): the iOS
  bridge resolves pending requests as `.denied("cancelled")` only in `HostRequestRegistry.flushCancelled()`,
  which runs only inside `AdaptyPlugin.register(eventHandler:)`, not when a view is torn down. Each
  wrapper registers once, so an unanswered request stays pending for the life of the process. The
  KMP KDoc and migration guide and the Unity code comment that say "resolved as denied when the flow
  tears down" are wrong per the native source; the docs don't repeat them.
- **Snippets checked 2026-11-24:** the iOS handler type-checks under Swift 6 against stubs copied from the
  SDK; the React Native and Capacitor handlers type-check against `@adapty/core` 4.3.4 with
  react-native-permissions 5 and `@capacitor/camera` / `@capacitor/push-notifications` 7; the Flutter
  handler passes `dart analyze` against the SDK's permission classes and a permission_handler stub. The
  Android, KMP and Unity samples were not compiled.
- **Not verified:** whether `FlowPermissionResponse` is exported from React Native 4.0.0 and Capacitor
  4.1.0 (the minimum versions the articles state): only the current tags were read.
- **Review findings, 2026-11-24 (multi-role review of this change):**
  - The builder's warning callout prints one key per platform, so it is less complete than the docs
    tables: for Location always it omits `NSLocationWhenInUseUsageDescription` and the foreground Android
    permission, for Health data `NSHealthUpdateUsageDescription` (dashboard code, 2026-11-24). The docs
    say the callout names the *main* key.
  - Platform caveats the builder table doesn't carry and the docs now state: the pre-iOS 17 calendar and
    reminders keys (`NSCalendarsUsageDescription`, `NSRemindersUsageDescription`; the SDK supports iOS 15),
    the HealthKit / HomeKit / Siri capabilities, the Android API levels of `ACTIVITY_RECOGNITION` (10),
    `BLUETOOTH_CONNECT` (12) and `READ_MEDIA_*` (13), and that Android 12+ ignores a fine-location request
    without coarse. Corrected 2026-11-26 against developer.android.com (training/permissions/requesting,
    develop/sensors-and-location/location/permissions/runtime, reference/android/Manifest.permission):
    the API levels hold; "ignores fine alone" holds only for *some* Android 12 releases; Bluetooth needs
    `BLUETOOTH_SCAN` as well as `BLUETOOTH_CONNECT` on 12+, and `ACCESS_FINE_LOCATION` up to 11; photos
    needs `READ_MEDIA_VIDEO` and `READ_MEDIA_VISUAL_USER_SELECTED` (14) too. The iOS keys hold against
    developer.apple.com, plus `NSLocationWhenInUseUsageDescription` for Precise location and the
    Communication Notifications capability for Focus status.
  - The flow runs nothing when the selected section and **After response** are both empty (transformer
    code, 2026-11-24), so the guides and `onboarding-actions` tell authors to keep a navigation action in
    **After response**.
  - Still open: the Android modal-activity question above (Flutter, Unity) — no Android device check yet.
  - The Unity guide requires 4.3.0 on Android, but the newest Unity tag read on 2026-11-24 was
    `4.3.0-beta.1`. Since 4.3.0 requires Unity 6, the Unity sample no longer has a pre-Unity-6 branch.
    Corrected 2026-11-26: the requirement is gone (see the minimum-versions bullet), and the sample
    guards `PermissionRequestDismissed` with `#if UNITY_6000_0_OR_NEWER`: the Unity 2022.3 scripting
    reference has no such event, and Unity 4.1.x supports 2022.3.

### Per-kind permission reference — 2026-11-26

Written while adding `flow-permissions`. Vendor facts from developer.apple.com and
developer.android.com (fetched 2026-11-26), SDK facts from the public repos at the tags named,
builder labels and groups from dashboard code, 2026-11-26.

- **Builder labels and groups** (dashboard code, 2026-11-26): five groups in the select, in order
  Notifications and tracking / Location / Camera and media / Personal data / Device and home; the 21
  labels are the H3s of `flow-permissions`, in the same order. The builder callout prints one key per
  platform and says Android has none for `music` and `health`; the reference gives Health Connect for
  `health` on Android and `READ_MEDIA_AUDIO` as an option for `music`.
- **No analytics floor above the handler minimum.** AdaptySDK-iOS sends `isBackendEvent` flow events,
  `flow_permission_*` included, from 4.0.0 (`Sources.UIBuilder/UIState/AdaptyUIActionHandler.swift`,
  `Sources/Events/AdaptyUI+Events.swift`); `session_id` and `flow_layout_id` join the payload in 4.1.0.
  AdaptySDK-Android forwards every flow-script backend event in Live mode from 4.0.0
  (`adapty-ui/.../store/FlowReducer.kt`, `AnalyticsEffectHandler.kt`). The docs state no floor.
- **Wrappers pass the detail string through unchanged** (Flutter 4.4.0 `lib/src/adapty.dart`, React
  Native v4.4.1 `src/ui/flow-view-emitter.ts`, Capacitor v4.3.0 `src/ui-builder/flow-view-emitter.ts`,
  Unity 4.1.2 `Runtime/Adapty.cs`, KMP 4.1.0 `internal/AdaptyUIImpl.kt`). Unity and KMP answer nothing
  without a handler on either OS: under a wrapper, the `crossplatform` module replaces the native
  Android default listener, so `false, null` applies to native Android only.
- **Plugin traps the guides now document:** permission_handler_android 14.1.1 returns granted for
  `mediaLibrary` and `reminders` and denied for `appTrackingTransparency` and `assistant` without a
  dialog; permission_handler on iOS returns `permanentlyDenied` for every refusal;
  react-native-permissions 5.7.0 reports iOS restricted as `unavailable`; Capacitor's
  `prompt-with-rationale` is Android's first refusal and `denied` is Android's permanent refusal
  (`capacitor/android/.../Bridge.java`), so the earlier sample that sent `prompt-with-rationale` to
  **After response** was wrong and is corrected; moko-permissions 0.20.1 throws `IllegalStateException`
  on iOS `restricted` / `limited` for camera, microphone and gallery, and `MOTION` doesn't wait for the
  answer on iOS.
- **Flutter iOS setup:** Adapty Flutter 4.x is SPM-only (`CHANGELOG.md` 4.0.0). permission_handler_apple
  9.4.8+ turns on permissions from `Info.plist` keys under SPM; the `Podfile` macros apply to earlier
  versions only. The guide's CocoaPods prerequisite was replaced.
- **KMP repo examples misroute** (KMP 4.1.0 `MIGRATION_GUIDE_4.0.0.md`, `AdaptyUIPermissionResult.kt`
  KDoc): `denied("user declined")` and `denied("unsupported: …")` give `outcome` `other` and run
  **After response**. The guide uses the canonical strings.
- **Could not confirm (2026-11-26), kept out of the docs:**
  - iOS: whether an explicit push request after provisional authorization shows the alert; whether
    `CNContactStore.requestAccess` throws on a refusal; which status ATT reports when **Allow Apps to
    Request to Track** is off; whether a full-access calendar request after write-only access prompts;
    whether `CMMotionActivityManager` query handlers run after a refusal and which call shows the alert;
    whether `homeManager(_:didUpdate:)` fires for a status decided before the manager existed; what
    happens without the local network, Siri or contacts purpose string; HomeKit behavior on a device
    without the entitlement; whether `music` and `media_library` share one privacy record (one Simulator
    probe said yes, the wrapper research could not confirm); whether the MusicKit App Service is needed
    for the authorization; Bluetooth cases on iOS 18 where creating a manager shows no alert (forum
    reports).
  - Android: whether a dismissed dialog or OEM builds break the `shouldShowRequestPermissionRationale`
    heuristic; whether a one-time grant can be told apart; the `<uses-feature android:required="false">`
    advice for `CAMERA`; how the auto-added `READ_MEDIA_VISUAL_USER_SELECTED` interacts with
    compatibility mode; whether calendar read and write can be granted separately; whether the
    background-location result reaches the app on return from Settings (looked for in the docs, not
    found).
  - Wrappers: Unity's player loop on iOS under a presented flow; Unity `PermissionCallbacks` and moko
    results while the wrapper's `AdaptyUiActivity` covers the app activity; the `Info.plist` key that
    Unity's Location Usage Description field writes; Kotlin/Native bindings for AppTrackingTransparency,
    EventKit, Speech, MediaPlayer, Intents, HomeKit and HealthKit; Capacitor's Android state after a
    dismissed dialog and for approximate location; community Capacitor plugins; cleanup of pending
    permission callbacks in the closed-source Android `crossplatform` module.

### Independent review of the permission reference — 2026-11-26

Four reviewers checked the reference and the seven guides against developer.apple.com,
developer.android.com, the SDK repos at tags and the plugin sources. What the review changed, with the
evidence:

- **Android refusal rule (corrected).** `shouldShowRequestPermissionRationale()` is also `false` after a
  dialog closed without a choice (developer.android.com, notification-permission: "User swipes away from
  dialog" leaves the state unchanged). The reference and the Android sample now read the rationale before
  the request and keep a per-permission "requested before" flag: no rationale before a repeated request →
  `permanently_denied`; a rationale before or after → `denied`; no rationale before or after a first
  request → no status. The Android background-location row no longer claims `permanently_denied`: the
  settings-page flow has no documented rationale semantics.
- **Location always after Allow Once (added).** Apple, `requestAlwaysAuthorization()`: "If the user
  responded to `requestWhenInUseAuthorization()` with Allow Once, then Core Location ignores further
  calls". The handler must not wait for the app to become active; it waits briefly for an alert and never
  past 60 s.
- **CoreLocation delegate (added).** Apple, `locationManagerDidChangeAuthorization(_:)`: called when the
  app creates the manager and when the status changes. The docs say to ignore `.notDetermined` and answer
  after a change that follows the request. "Never calls back" now cites
  `requestWhenInUseAuthorization()` ("does nothing and doesn't call") and `requestAlwaysAuthorization()`
  ("further calls have no effect").
- **ATT (added).** Apple, `requestTrackingAuthorization(completionHandler:)`: full-page sheet in France,
  Germany, Italy, Poland and Romania; in the EU the app can ask again a year after the answer. The
  active-state wait is conditional on `applicationState != .active`.
- **Other corrections:** photos add-only apps request `.addOnly`; Google Play limits
  `READ_MEDIA_IMAGES`/`VIDEO`; compatibility mode applies to target SDK 34+ and is revoked "eventually";
  `NSRemindersUsageDescription` is a fallback on iOS 17+, not an auto-deny (Apple, accessing the event
  store); `CAMERA` implies only `android.hardware.camera` and `.autofocus`; Health write types map
  all / some / none to `granted` / `limited` / `denied` (`permanently_denied` when
  `getRequestStatusForAuthorization` said `.unnecessary`), plus `errorHealthDataRestricted` →
  `restricted`; Health Connect needs Android 9+; HomeKit's `.restricted` flag means "doesn't have access to
  home data", so it no longer maps to `restricted`; Focus status also needs notification authorization;
  local network rows are keyed on target SDK and device version; `music` on Android is `unsupported`
  everywhere; precise location on Android can be one-time.
- **Wrapper guides:** Flutter now requires permission_handler `^13.0.2` with permission_handler_apple
  9.6.4+ (CHANGELOGs 9.5.1, 9.6.3, 9.6.4; android 14.1.0); React Native adds
  `PERMISSIONS.IOS.STOREKIT` for `music`, `requestMultiple` reduction rules and the iOS "BLOCKED = every
  refusal" note; Capacitor reads `coarseLocation`, answers `photos` as `unsupported` on Android
  (`@capacitor/camera` reports it granted with no permission); KMP reads the state below Android 13 for
  push, and moko `GALLERY` reports limited as granted; Unity requests fine with coarse location.
- **Softened or removed as unsourced (2026-11-26), kept only here:**
  - iOS reports provisional Always and full Always as the same `.authorizedAlways` (forum posts only).
    The docs no longer say so; they answer `provisional` for any allow in the first alert.
  - An `INPreferences` status read crashes without the Siri capability (observed once on the Simulator;
    Apple only says the capability is needed "for authorization to succeed").
  - A crash without `NSFocusStatusUsageDescription` (observed on the Simulator; Apple only says to add the
    key before using `INFocusStatusCenter`).
  - The iOS Simulator reports Bluetooth as allowed and has no motion data (Simulator observations).
  - Calendar auto-deny "without a crash", and location with a missing key failing "without a callback and
    without a crash": Apple says only "automatically denies" and "fail immediately".
  - The iOS Photos and iOS 18 Contacts button labels.
- **Still unverified (2026-11-26):** whether HomeKit sets `.restricted` when the user declines; whether
  Android stops showing the precise-location upgrade or the background-location settings request after
  repeated refusals; whether moko-permissions bound to the app's main activity gets results while the
  flow's `AdaptyUiActivity` covers it (the KMP guide only says to bind the controller to the activity that
  shows the flow); whether Media library and Apple Music share one privacy setting on iOS; whether
  `RecognizerIntent` needs no `RECORD_AUDIO`.

### Per-kind code in the seven guides — 2026-11-27

- **Decisions applied to the reference (product decisions, 2026-11-27):** the Android rationale checks
  run in order (a rationale before or after → `denied`; none and an earlier request →
  `permanently_denied`; none on the first request → no status); iOS location kinds and contacts have a
  "still `.notDetermined` or no answer before the app's timeout → no status" row; **Allow Once** and
  **Allow While Using App** both answer `provisional` for `location_always` (both report
  `.authorizedWhenInUse`); Android `location_always` applies the general rule to the foreground step and
  answers `denied` when no settings page appears; Health Connect counts any request without a grant as a
  cancel and answers `permanently_denied` on the request after two cancels (the second cancel answers
  `denied`); Bluetooth on Android 11 and earlier needs `ACCESS_FINE_LOCATION` (Android 9 and earlier
  accept coarse); `SKCloudServiceController` is an acceptable fallback for `music` where MusicKit can't be
  called; push on Android 13+ can be granted while `areNotificationsEnabled()` is false.
- **Code corrected to the rationale order (2026-11-27):** the KMP runtime helper and Unity's Android
  helper checked "requested before" first; both now check the rationale first. KMP's Health Connect
  counter answered `permanently_denied` on the second cancel; it now counts cancels before the request.
  Capacitor `local_network` answers `granted` below target or device API 37 (`@capacitor/device`
  `androidSDKVersion` plus an app constant for the target SDK), and `unsupported` above, because no
  official plugin requests `ACCESS_LOCAL_NETWORK`.
- **Could not confirm (2026-11-27), recorded by the code authors:**
  - Unity coroutines keep running on iOS while a flow is presented (the Unity samples that poll in a
    coroutine depend on it).
  - Android permission results (Unity `PermissionCallbacks`, moko-permissions, `ActivityResult` from a
    non-flow activity) reach the app while the wrapper's `AdaptyUiActivity` covers the app's activity.
  - The iOS `location_always` heuristic: the app resigns active when the upgrade alert appears, and a
    short wait (2 s in the iOS sample) tells "no alert" apart from "alert shown". Not checked on a device.
  - Whether a full-access calendar request after write-only access shows an upgrade prompt on iOS 17+.
  - Media library `.restricted`: Apple's definition is "may access some of the content"; the reference
    keeps `restricted` (product decision, 2026-11-27). Open question in the rollout.

