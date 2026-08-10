---
zone: sdk-onboardings
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The "Onboardings" category of each platform SDK: fetching an onboarding built in Flow Builder, presenting it, and handling the input it collects and the events it fires. It's the app-code counterpart to designing an onboarding on the dashboard, parallel to how sdk-flows-display relates to paywall flows. Readers are developers integrating a Flow-Builder-made onboarding into their app.

## Surfaces

## Sources of truth

## What we document, what we don't

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

