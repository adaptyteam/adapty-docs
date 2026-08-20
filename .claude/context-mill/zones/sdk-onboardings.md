---
zone: sdk-onboardings
sources: [android-sdk, capacitor-sdk, dashboard-interface, flutter-sdk, ios-sdk, jscore, kmp-sdk, rn-sdk, unity-sdk]
reviewed_shape:
reviewed_at:
---

## What this is

The "Onboardings" category of each platform SDK: fetching an onboarding built in Flow Builder, presenting it, and handling the input it collects and the events it fires. It's the app-code counterpart to designing an onboarding on the dashboard, parallel to how sdk-flows-display relates to paywall flows. Readers are developers integrating a Flow-Builder-made onboarding into their app.

## Surfaces

## Sources of truth

Refs below were read on 2026-08-11; `platforms.md` carries the version state they sit on. Read the ref,
not the local clone's checked-out branch — several of these clones are parked on a task branch.

- **Method names, signatures, and callback semantics, per platform** — the platform SDK repo named in
  `sources.md`, at these paths: `ios-sdk` `origin/master` (`706d185b`) →
  `Sources.AdaptyUI/AdaptyUI+Onboardings.swift` for `getOnboardingConfiguration`/`onboardingController`
  and `Sources.AdaptyUI/Onboardings/Rendering/AdaptyOnboardingControllerDelegate.swift` for the delegate
  methods every snippet in this zone implements; `android-sdk` `origin/master` (`30ef638`) →
  `adapty-ui/src/main/java/com/adapty/ui/AdaptyUI.kt` plus the `adapty-ui/.../ui/onboardings/` tree
  (view, listeners, actions, analytics events); `flutter-sdk` `origin/master` → `lib/src/`. For `kmp` and
  `unity`, v4 is beta-only, so the current onboarding surface is on `origin/release/4.0.0` (`62dee65` and
  `22411b7` respectively) — `origin/main` will not show it.
- **React Native and Capacitor split, and not the way the standing `jscore` rule reads on its own.** The
  *method* surface is in the platform wrapper: `rn-sdk` `origin/master` (`af93d30`)
  `src/adapty-handler.ts:473` takes positional arguments, while `capacitor-sdk` `origin/master`
  (`3b1c4ac`) `src/adapty.ts` takes an options object — the same call, two shapes. The *action and event
  payload* model is in `jscore` `origin/master` (`2a8cae4`, GA `v4.0.1`): `src/types/onboarding-events.ts`,
  `src/ui-builder/onboarding-event-mapping.ts`, and the `src/coders/adapty-onboarding*` /
  `adapty-ui-onboarding-*` coders. "What do I call, with what arguments" → the wrapper; "what does my
  handler receive" → `jscore`.
- **What an onboarding contains and how it behaves is not in any SDK repo.** The SDK is a WebView
  container and nothing more: `adapty-ui/.../onboardings/AdaptyOnboardingView.kt`'s `show()` calls
  `webView.loadUrl(viewConfig.url)` (adding an `Accept-Language` header when a locale was requested) and
  bridges the page through `addJavascriptInterface(..., "Android")` → `postMessageString`; iOS does the
  same with `WKWebView` + `WKScriptMessageHandler` in
  `Sources.AdaptyUI/Onboardings/Rendering/AdaptyOnboardingUIView.swift` and `AdaptyOnboardingViewModel.swift`.
  Screens, copy, element IDs, quiz options, and the branching between screens all live in the hosted
  document behind that URL, which the dashboard authored — the SDK only holds an opaque `viewConfig`. So
  the SDK side owns fetching, presentation, and the message bridge; the dashboard side owns everything
  visible. Docs-side owners for the authored half are `create-onboarding` / `design-onboarding`
  (`onboardings-legacy`) and `onboarding-quizzes` (`flow-design`).
- TODO(owner): the **code**-side owner of that document is unregistered, and `sources.md`'s
  `dashboard-interface` rule does not cover it — that rule points at `packages/unified-builder`, which is
  the *Flow* Builder: grepping it on `origin/master` (`8ca465ba`) returns exactly one onboarding-named
  file, an icon (`packages/unified-builder/uikit/src/icons/Onboarding.svg`), and `packages/builder`
  (`@adapty/builder`, the legacy paywall builder) returns zero. `apps/web/src/entities/onboardings/` in
  that repo is list/create/edit CRUD, not the editor. Which repo serves the onboarding WebView document?
- **The answers a user submits do not leave the device through the SDK.** Verified on both native
  platforms: the only onboarding message the SDK forwards to Adapty is the screen-presented one. Android
  `adapty-ui/.../onboardings/internal/ui/OnboardingViewModel.kt`'s `handleAnalyticsEvent` calls
  `Adapty.logShowOnboardingInternal(onboarding, screenName, screenOrder, isLastScreen)` for
  `ScreenPresented` and emits every other event only to the app's flow; iOS's `handleAnalyticsEvent` in
  `AdaptyOnboardingViewModel.swift` calls `Adapty.logShowOnboardingViaAdaptyUI(...)` for `.screenPresented`
  with `default: break`. State-updated actions — the answers — reach the app's delegate/listener and stop
  there. Ground truth for an answer's destination is therefore whatever the app writes: the
  profile-attribute surface, `setting-user-attributes` (`sdk-users-access`), which all seven
  `onboarding-input` articles link. Anything past that is unsettled — see *Gaps and misses*.
- **The deprecation boundary is stated in each platform's 4.x code, not in an article and not as one
  shared version number.** The wording and the mechanism differ per platform, so quote the platform:
  iOS `AdaptyUI+Onboardings.swift` and Android `AdaptyUI.kt` (lines 127 and 181) both read "Starting
  Adapty SDK 4.0.0, Onboarding Feature is deprecated. Please consider migrating to Flows"; `kmp-sdk`
  `origin/release/4.0.0` uses "Onboarding is deprecated as of 4.0.0 and will be removed in a future
  release. Migrate to the Adapty Flow Builder." across ~20 files; `unity-sdk` `origin/release/4.0.0` uses
  `[Obsolete("The legacy onboarding API is deprecated in favor of Flows. Use GetFlow instead.")]`.
  **`jscore` has no onboarding deprecation at all** — `git grep -ni 'deprecat' origin/master -- src`
  returns a single unrelated hit (`Use elementId instead`, `src/ui-builder/types.ts:294`) — so for React
  Native and Capacitor the boundary is a product statement, not a compiler-visible one. The product-side
  statement lives in `migrate-to-flows` (`flow-logic`): existing onboardings keep working and stay
  supported, new features ship to flows only. Read the code for "is it deprecated," `migrate-to-flows`
  for "should we move." Per-platform migration wording is `sdk-migrations`, not here.
- **Do not carry these claim classes across from a neighbouring platform's article — all four differ in
  fact, not just in phrasing:**
  - *Minimum SDK version.* 3.8.0 for iOS, Android, Flutter and React Native; 3.14.0 for Unity; 3.15.0 in
    `kmp-get-onboardings` and `kmp-handling-onboarding-events` but 3.16.1 in `kmp-present-onboardings`;
    and no floor stated in any Capacitor article.
  - *The presentation surface.* The `present-onboardings` articles share no shape:
    `android-present-onboardings` has loading-indicator colour and a safe-area opt-out;
    `kmp-present-onboardings` splits Compose from non-Compose and adds view disposal;
    `react-native-present-onboardings` has a component, a modal form, and Troubleshooting;
    `flutter-present-onboardings` has widget embedding; `unity-present-onboardings` has **no presentation
    section at all**, because Unity creates the view in `unity-get-onboardings` (H2: "Fetch onboarding and
    create view").
  - *How the handler is registered.* iOS, Android and Unity attach a delegate/listener directly;
    `capacitor-handling-onboarding-events`, `kmp-handling-onboarding-events` and
    `flutter-handling-onboarding-events` open with a set-up-the-handler/observer section, and Flutter
    further splits full-screen from embedded-widget events.
  - *Whether the deprecation notice is present at all, and how hard it is.* Grepping all 35 for the two
    notice strings: iOS's four articles plus `get-onboardings` and all five Android articles carry a soft
    `:::tip` ("a more powerful alternative to onboardings"); React Native, Flutter, KMP and Capacitor
    carry a harder `:::warning` ("Onboardings are deprecated in SDK v4 and will be removed in a future
    release"); all five Unity articles carry none, and `flutter-onboardings` carries none either.

## What we document, what we don't

Delta from `scope.md` only. The governing fact is that this is a deprecated-but-still-supported surface.

- **We keep what exists accurate; we extend nothing.** Still in scope: the current methods, parameters,
  callbacks and presentation knobs as they behave today, and corrections when a reader hits a real defect.
  Out of scope: adding a family, adding a section for a newly shipped capability, or lifting a
  per-platform article to the depth of its flows counterpart. New capability documentation belongs to
  `sdk-flows-display` / `flow-design`, on the authority of `migrate-to-flows`: "New features, however, now
  ship to flows rather than to the standalone onboarding and paywall builders." The corollary matters as
  much: a thinner article here, or an empty cell in the roster's family matrix, is not a gap. The one
  thing a deprecated article still owes the reader is the notice that routes them to flows — which is why
  Unity's five articles and `flutter-onboardings` lacking it is a real miss while their missing feature
  parity is not.
- **Onboarding answers: capture, plus one write, and then out.** We document that the answer arrives on
  the state-update callback carrying its `elementId` and typed `params`, and one worked write of that value
  onto the profile — a built-in field (first name, email) or a custom attribute. We stop there.
  `setting-user-attributes` (`sdk-users-access`) owns profile attributes; turning an attribute into
  different content is segments (`subscribers-and-profiles`) → audiences and placements
  (`placements-and-audiences`), and the `onboarding-input` articles correctly list those as bare numbered
  links rather than explaining them. We document no server-side destination for an answer, and none is
  claimed anywhere in the zone: `grep -niE 'webhook|server-side|backend'` across all 35 articles returns
  zero hits. Whether one exists is the open question in *Gaps and misses* — don't answer it here.
- **What a per-platform article legitimately omits:**
  - *The dashboard half.* Every "Before you start" is three links — installation, `create-onboarding`,
    `placements` — never a walkthrough of the builder. Both strings land in exactly the same 21 of the 35
    articles, i.e. every one except the seven `onboardings` entry pages and the seven `onboarding-input`
    pages.
  - *Locale rules.* `locale` is documented as a parameter with an example; the code format and the
    fallback behaviour go to `localizations-and-locale-codes` (`sdk-flows-display`). Five articles carry
    that link and none restates the rules.
  - *Prerequisites, in the `onboarding-input` family.* None of the seven has a "Before you start" block
    (grep: 0 of 7); they inherit it from the fetch and present articles in the same sidebar category.
    Don't add one.
  - *Prose, in the `onboardings` entry articles.* All seven are a single `<CustomDocCardList />` — plus
    the notice on the five that have one — and nothing else: 0 H2s each. The index is generated; an entry
    article here never grows prose.
- **We do not own the paywall/flow API these articles reach into, even though they inline it.** The
  "Opening a paywall" section of each `handling-onboarding-events` article ships a full presentation
  snippet rather than a link, and the copies have already drifted: `ios-handling-onboarding-events` uses
  the v4 flow API (`Adapty.getFlow`, `AdaptyUI.getFlowConfiguration`, `AdaptyUI.flowController`) while
  `android-handle-onboarding-events` still uses the pre-v4 paywall API (`Adapty.getPaywall`,
  `AdaptyUI.getViewConfiguration`, `AdaptyUI.getPaywallView`). Treat each snippet as a convenience copy
  whose canonical form lives in `sdk-flows-display`; never cite one platform's copy as the current API for
  another. What this zone genuinely owns in that section is the ordering rule — dismiss the onboarding
  before presenting, because only one view can be on screen.

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| get-onboardings | get-onboardings | android-get-onboardings | react-native-get-onboardings | flutter-get-onboardings | unity-get-onboardings | kmp-get-onboardings | capacitor-get-onboardings |
| handle-onboarding-events |  | android-handle-onboarding-events |  |  |  |  |  |
| handling-onboarding-events | ios-handling-onboarding-events |  | react-native-handling-onboarding-events | flutter-handling-onboarding-events | unity-handling-onboarding-events | kmp-handling-onboarding-events | capacitor-handling-onboarding-events |
| onboarding-input | ios-onboarding-input | android-onboarding-input | react-native-onboarding-input | flutter-onboarding-input | unity-onboarding-input | kmp-onboarding-input | capacitor-onboarding-input |
| onboardings | ios-onboardings | android-onboardings | react-native-onboardings | flutter-onboardings | unity-onboardings | kmp-onboardings | capacitor-onboardings |
| present-onboardings | ios-present-onboardings | android-present-onboardings | react-native-present-onboardings | flutter-present-onboardings | unity-present-onboardings | kmp-present-onboardings | capacitor-present-onboardings |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-get-onboardings | — | dev | 2 | android |
| android-handle-onboarding-events | — | dev | 5 | android |
| android-onboarding-input | — | dev | 3 | android |
| android-onboardings | entry | dev | 0 | android |
| android-present-onboardings | — | dev | 4 | android |
| capacitor-get-onboardings | — | dev | 2 | capacitor |
| capacitor-handling-onboarding-events | — | dev | 7 | capacitor |
| capacitor-onboarding-input | — | dev | 3 | capacitor |
| capacitor-onboardings | entry | dev | 0 | capacitor |
| capacitor-present-onboardings | — | dev | 4 | capacitor |
| flutter-get-onboardings | — | dev | 2 | flutter |
| flutter-handling-onboarding-events | — | dev | 10 | flutter |
| flutter-onboarding-input | — | dev | 3 | flutter |
| flutter-onboardings | entry | dev | 0 | flutter |
| flutter-present-onboardings | — | dev | 8 | flutter |
| get-onboardings | — | dev | 2 | ios |
| ios-handling-onboarding-events | — | dev | 5 | ios |
| ios-onboarding-input | — | dev | 3 | ios |
| ios-onboardings | entry | dev | 0 | ios |
| ios-present-onboardings | — | dev | 4 | ios |
| kmp-get-onboardings | — | dev | 2 | kmp |
| kmp-handling-onboarding-events | — | dev | 6 | kmp |
| kmp-onboarding-input | — | dev | 3 | kmp |
| kmp-onboardings | entry | dev | 0 | kmp |
| kmp-present-onboardings | — | dev | 5 | kmp |
| react-native-get-onboardings | — | dev | 2 | react-native |
| react-native-handling-onboarding-events | — | dev | 6 | react-native |
| react-native-onboarding-input | — | dev | 3 | react-native |
| react-native-onboardings | entry | dev | 0 | react-native |
| react-native-present-onboardings | — | dev | 8 | react-native |
| unity-get-onboardings | — | dev | 2 | unity |
| unity-handling-onboarding-events | — | dev | 5 | unity |
| unity-onboarding-input | — | dev | 3 | unity |
| unity-onboardings | entry | dev | 0 | unity |
| unity-present-onboardings | — | dev | 2 | unity |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **flow-design / flow-logic** — is the ticket about designing the onboarding's screens/logic in the visual builder (flow-design/flow-logic), or about the SDK code that fetches and presents it in the app (sdk-onboardings)?
- **onboardings-legacy** — is the onboarding built with the legacy no-code onboarding builder (onboardings-legacy) or with Flow Builder (sdk-onboardings covers the SDK side of the latter)?
- **sdk-flows-display** — is the flow being presented an onboarding (sdk-onboardings) or a paywall (sdk-flows-display)? Both are Flow Builder output but have separate SDK-side zones.

## Ticket language

Rows name a **family**, not a platform article — the roster above expands each one across the seven
platforms. A platform is named only where the concern really is platform-specific. Corpus-wide
synonyms (onboarding ↔ `AdaptyOnboarding` ↔ onboarding builder) live in `aliases.md` and are
deliberately not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "is onboarding deprecated", "onboarding no longer receiving fixes", "should we move to flows", "onboarding runs in a WebView" | Any article in this zone — every one opens with the same SDK v4 notice. Onboardings render in a WebView; the native successor is the flows/paywall-display path in **sdk-flows-display**, not anything here. Treat this zone as legacy-but-supported. |
| "onboarding not loading", "slow onboarding load", "load timeout", "cache vs reload" | `get-onboardings`. The knobs are `fetchPolicy` and `loadTimeout` — `returnCacheDataElseLoad` trades freshness for speed on weak connections; on timeout the SDK falls back to cache, then to the fallback server behind the CDN. |
| "speed up load when we have many audiences", "default audience fallback" | `get-onboardings` — the default-audience fetch. The reason to read it is the trade-off, not the method: it serves **All Users** content only, so country/attribution/custom-attribute targeting is silently lost. |
| "wrong language in the onboarding", "not localized" | `get-onboardings` — the `locale` parameter. There is no onboarding-specific locale article; the code-format and fallback rules live in the localization article in **sdk-flows-display**. |
| "onboarding stuck on the loading screen", "white flash before the onboarding appears", "hide splash until ready", "custom loader" | `present-onboardings`. Phrased as a bug, but it's the documented splash-to-onboarding transition plus the loader customization. |
| "viewAlreadyPresented", "reuse onboarding view error", "error the second time we show it" | Split by which call is being reused: the create-view result is single-use, documented in `get-onboardings`; the presentation-side rule is in `present-onboardings`. A ticket usually needs the first — recreate the view, don't cache it. |
| "full screen vs page sheet", "embed the onboarding in an existing screen", "no Compose in our app" | `present-onboardings`. iOS presentation style plus the per-platform embedding path — React Native has a component *and* a modal form, Flutter a widget, KMP a non-Compose route, Android an XML view. |
| "onboarding content under the status bar", "notch overlap", "edge-to-edge", "safe area padding" | `present-onboardings` — Android-only, and it's an opt-out (disable safe-area padding) rather than a fix. |
| "onboarding links open in the wrong browser", "open links externally" | `present-onboardings` — `externalUrlsPresentation`. In-app browser is the default; the parameter exists only from SDK 3.15.1. |
| "change the onboarding loading spinner colour" (Android) / "dispose the onboarding view", "memory leak" (KMP) | Single-platform presentation knobs: `android-present-onboardings` and `kmp-present-onboardings` respectively. Don't look for siblings — the other platforms don't have these sections. |
| "onboarding button does nothing", "allow-notifications button", "close button handler", "onboarding won't dismiss" | `handling-onboarding-events` (Android: `android-handle-onboarding-events`). Every custom button arrives as one action keyed by its action ID, and closing is the app's job — the SDK does not dismiss the onboarding for you. |
| "open a paywall from the onboarding", "show the offer after the quiz" | `handling-onboarding-events`, and there are two different answers: inside the onboarding, use the open-paywall action (making the action ID equal to the paywall placement ID is the recommended trick); after it, use the close action instead. Dismiss the onboarding **before** presenting the paywall — only one view can be on screen, so dismissing later closes the paywall instead. Presenting the paywall itself is **sdk-flows-display**. |
| "track onboarding funnel", "screen progress", "quiz completion event", "which analytics events exist" | `handling-onboarding-events` — the analytics-event callback, distinct from the state-update callback: this one reports navigation (started / screen presented / screen completed), it is not where answer values live. |
| "save quiz answers", "capture name or email", "segment users by their answer", "show a different paywall based on the quiz result" | `onboarding-input` — answers arrive on the state-update action. Note the boundary: this family only covers *capturing* the value and writing it as a custom attribute. Turning that into a different paywall is segments → audiences → placement, which lives outside this zone. |

## Gaps and misses

- **Open question: can onboarding answers leave the device other than as profile attributes?** A retired
  enrichment term on `ios-handling-onboarding-events` read "quiz answer webhook", implying a server-side
  destination for onboarding replies. Checked 2026-08-10: `events.mdx` does not mention onboardings at
  all, and this zone documents answers only as custom attributes written to the profile on device. So
  either the term was aspirational, or a real reader job has no home here. Needs a product answer before
  anything is written — do not document a webhook path on the strength of the term alone.

