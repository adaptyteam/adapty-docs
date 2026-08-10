---
zone: sdk-flows-display
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The "Flows & paywalls" category of each platform SDK — the app code that presents a Flow-Builder-made flow (a paywall, or an onboarding-with-paywall) to the user: fetching a Flow Builder paywall, presenting it, handling the actions and events it fires, localizing it, using fallback paywalls when the network is unavailable, presenting a web paywall from the SDK, and troubleshooting why a builder paywall won't render. It's the mobile-app side of Flow Builder — the dashboard-built flow is data the SDK downloads and renders natively on device.

## Surfaces

## Sources of truth

## What we document, what we don't

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
| present-flows-in-observer-mode |  |  | react-native-present-flows-in-observer-mode | flutter-present-flows-in-observer-mode |  | kmp-present-flows-in-observer-mode | capacitor-present-flows-in-observer-mode |
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
| android-localizations-and-locale-codes | — | dev | 9 | android |
| android-paywalls | entry | dev | 4 | android |
| android-present-paywalls | — | dev | 8 | android |
| android-troubleshoot-paywall-builder | — | dev | 3 | android |
| android-use-fallback-paywalls | — | dev | 1 | android |
| android-web-paywall | — | dev | 2 | android |
| capacitor-get-pb-paywalls | — | dev | 8 | capacitor |
| capacitor-handle-paywall-actions | — | dev | 7 | capacitor |
| capacitor-handling-events | — | dev | 3 | capacitor |
| capacitor-localizations-and-locale-codes | — | dev | 9 | capacitor |
| capacitor-paywalls | entry | dev | 4 | capacitor |
| capacitor-present-flows-in-observer-mode | — | dev | 0 | capacitor |
| capacitor-present-paywalls | — | dev | 7 | capacitor |
| capacitor-use-fallback-paywalls | — | dev | 4 | capacitor |
| capacitor-web-paywall | — | dev | 3 | capacitor |
| flutter-get-pb-paywalls | — | dev | 10 | flutter |
| flutter-handle-paywall-actions | — | dev | 8 | flutter |
| flutter-handling-events | — | dev | 7 | flutter |
| flutter-localizations-and-locale-codes | — | dev | 9 | flutter |
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
| kmp-localizations-and-locale-codes | — | dev | 9 | kmp |
| kmp-paywalls | entry | dev | 4 | kmp |
| kmp-present-flows-in-observer-mode | — | dev | 0 | kmp |
| kmp-present-paywalls | — | dev | 14 | kmp |
| kmp-troubleshoot-paywall-builder | — | dev | 2 | kmp |
| kmp-use-fallback-paywalls | — | dev | 1 | kmp |
| kmp-web-paywalls | — | dev | 2 | kmp |
| localizations-and-locale-codes | — | dev | 9 | ios |
| react-native-get-pb-paywalls | — | dev | 8 | react-native |
| react-native-handle-paywall-actions | — | dev | 7 | react-native |
| react-native-handling-events-1 | — | dev | 3 | react-native |
| react-native-localizations-and-locale-codes | — | dev | 9 | react-native |
| react-native-paywalls | entry | dev | 4 | react-native |
| react-native-present-flows-in-observer-mode | — | dev | 2 | react-native |
| react-native-present-paywalls | — | dev | 14 | react-native |
| react-native-troubleshoot-paywall-builder | — | dev | 3 | react-native |
| react-native-use-fallback-paywalls | entry | dev | 0 | react-native |
| react-native-use-fallback-paywalls-expo | — | dev | 2 | react-native |
| react-native-use-fallback-paywalls-pure | — | dev | 4 | react-native |
| react-native-web-paywall | — | dev | 2 | react-native |
| unity-get-pb-paywalls | — | dev | 5 | unity |
| unity-handle-paywall-actions | — | dev | 4 | unity |
| unity-handling-events | — | dev | 3 | unity |
| unity-localizations-and-locale-codes | — | dev | 5 | unity |
| unity-paywalls | entry | dev | 4 | unity |
| unity-present-paywalls | — | dev | 2 | unity |
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

