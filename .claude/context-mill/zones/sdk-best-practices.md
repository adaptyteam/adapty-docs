---
zone: sdk-best-practices
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The "Best practices" category of each platform SDK: recommended SDK call order during app startup, optimizing paywall fetching (caching/pre-fetching to avoid latency), and showing an Apple-Search-Ads-targeted paywall. It's advisory and optimization content layered on top of the core integration, not a required step — readers land here after the basic integration already works and they're tuning performance, call sequencing, or UX polish.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| best-practices | ios-best-practices | android-best-practices | react-native-best-practices | flutter-best-practices | unity-best-practices | kmp-best-practices | capacitor-best-practices |
| optimize-paywall-fetching | ios-optimize-paywall-fetching | android-optimize-paywall-fetching | react-native-optimize-paywall-fetching | flutter-optimize-paywall-fetching | unity-optimize-paywall-fetching | kmp-optimize-paywall-fetching | capacitor-optimize-paywall-fetching |
| sdk-call-order | ios-sdk-call-order | android-sdk-call-order | react-native-sdk-call-order | flutter-sdk-call-order | unity-sdk-call-order | kmp-sdk-call-order | capacitor-sdk-call-order |
| show-aa-targeted-paywall | ios-show-aa-targeted-paywall |  | react-native-show-aa-targeted-paywall | flutter-show-aa-targeted-paywall |  |  | capacitor-show-aa-targeted-paywall |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-best-practices | entry | dev | 0 | android |
| android-optimize-paywall-fetching | — | dev | 2 | android |
| android-sdk-call-order | — | dev | 2 | android |
| capacitor-best-practices | entry | dev | 0 | capacitor |
| capacitor-optimize-paywall-fetching | — | dev | 2 | capacitor |
| capacitor-sdk-call-order | — | dev | 2 | capacitor |
| capacitor-show-aa-targeted-paywall | — | dev | 4 | capacitor |
| flutter-best-practices | entry | dev | 0 | flutter |
| flutter-optimize-paywall-fetching | — | dev | 2 | flutter |
| flutter-sdk-call-order | — | dev | 2 | flutter |
| flutter-show-aa-targeted-paywall | — | dev | 4 | flutter |
| ios-best-practices | entry | dev | 0 | ios |
| ios-optimize-paywall-fetching | — | dev | 2 | ios |
| ios-sdk-call-order | — | dev | 2 | ios |
| ios-show-aa-targeted-paywall | — | dev | 4 | ios |
| kmp-best-practices | entry | dev | 0 | kmp |
| kmp-optimize-paywall-fetching | — | dev | 2 | kmp |
| kmp-sdk-call-order | — | dev | 2 | kmp |
| react-native-best-practices | entry | dev | 0 | react-native |
| react-native-optimize-paywall-fetching | — | dev | 2 | react-native |
| react-native-sdk-call-order | — | dev | 2 | react-native |
| react-native-show-aa-targeted-paywall | — | dev | 4 | react-native |
| unity-best-practices | entry | dev | 0 | unity |
| unity-optimize-paywall-fetching | — | dev | 2 | unity |
| unity-sdk-call-order | — | dev | 2 | unity |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **sdk-quickstart** — is the ticket about how to set up the SDK correctly the first time (sdk-quickstart), or about optimizing/sequencing calls after basic integration already works (sdk-best-practices)?
- **sdk-flows-display / sdk-flows-manual** — is this a general best-practice recommendation (sdk-best-practices), or a specific bug/how-to in actually fetching or presenting a paywall (sdk-flows-display/sdk-flows-manual)? "How do I avoid a flash of the wrong paywall" is best-practices; "the paywall didn't fetch" is a display/manual bug.
- **attribution** — is the "targeted paywall" ticket about the SDK-side best practice for showing it (sdk-best-practices), or about setting up the Apple Search Ads attribution data itself (attribution)?

## Ticket language

Rows name a **family**, not a platform article — the roster above expands each one across the
platforms that have it. Corpus-wide synonyms (Adapty Search Ads ↔ Apple Search Ads ↔
`apple_search_ads`, paywall ↔ flow in v4, profile ↔ `getProfile`) live in `aliases.md` and are
deliberately not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "`#2002 notActivated`", "`ADAPTY_NOT_INITIALIZED`", "SDK works only sometimes on launch", "race condition calling Adapty too early" | `sdk-call-order`. Nothing may run before `activate()` resolves — until then the SDK has no state. The error name is the only per-platform difference: Android says `ADAPTY_NOT_INITIALIZED`, KMP just "an activation error", the rest `#2002 notActivated`. |
| "`#3006 profileWasChanged`", "lost premium access after login", "returning user shows as free", "an anonymous profile got created" | `sdk-call-order`, step 4. Calls racing `identify` either fail or land on the anonymous profile created at activation (Android and KMP document only the second outcome, not the `#3006` code). The documented fix isn't ordering the two calls better — it's passing `customerUserId` into `activate()` (path 2a) so no anonymous profile ever exists. |
| "`appsflyer_id` missing from the profile", "attribution/MMP ID not attached", "AppsFlyer + Adjust + Branch + PostHog init order" | `sdk-call-order`, steps 1 and 3. Two constraints, both easy to miss: initialize the MMP and await its UID callback *before* `activate`, then call `setIntegrationIdentifier` before any user-action call. |
| "web purchase not visible in the app", "web2app install not linked", "Stripe/Paddle checkout missing on device" | `sdk-call-order`, the Web2app section — not an integration or webhook bug. The device's first `activate()` makes a fresh anonymous profile with no link to the web one, so the purchase stays invisible until `identify` then `restorePurchases`. |
| "wrong audience paywall returned", "audience segments silently bypassed", "ASA personalization not applied" | `optimize-paywall-fetching` when the cause is timing: `getPaywall` called at launch (`App.init()`, `Application.onCreate()`, `main()`, `Awake()`) resolves before attribution lands, against the default audience, with no error. Rule out two other causes first — an explicit default-audience fetch (`sdk-flows-manual`) and fetching before `identify` resolves (`sdk-call-order`). |
| "black screen on app launch", "app freezes for a second at startup" | `optimize-paywall-fetching`. The documented cause is bulk-prefetching every placement concurrently, which blocks the main thread (JS thread on React Native) during the burst. Fetch only the placement you're about to show. |
| "paywall fetch is slow", "reduce time to first paywall", "blank screen while the paywall loads", "users on rural / transit connections" | `optimize-paywall-fetching`. Cache-first fetch policy after the first fetch, a 3–5 s `loadTimeout` (`loadTimeoutMs` on React Native and Capacitor), a dashboard fallback paywall per placement, and never gating display on `getProfile`. The default-audience fetch is the other speed lever, and it costs targeting: see the corresponding row in `sdk-flows-manual`. |
| "Apple Search Ads paywall shows the wrong offer on first open", "`appliedAttributionSources`", "wait for attribution before showing the paywall" | `show-aa-targeted-paywall`. Scope first: this only ever affects the **first** launch — Apple Ads attribution is stored on the profile permanently, so later launches return the segmented paywall with no wait. Requires SDK 3.17.1+ (Flutter 3.17.0+), and only iOS, React Native, Flutter and Capacitor have this article. |
| "should we delay the paywall, or swap it once attribution lands?" | `show-aa-targeted-paywall` — the recommended pattern deliberately diverges by platform, so don't mirror one platform's article into another's. iOS and Flutter wait for attribution against a timeout and fall back to `getPaywallForDefaultAudience`; React Native and Capacitor show a paywall immediately and refetch when `apple_search_ads` appears. |
| "give us a production-readiness checklist", "recommended integration patterns", "common integration mistakes" | The `best-practices` family, but expect the ticket to need more: those pages are card lists with no prose of their own. The actual content is the three families above, and a checklist-shaped request usually also reaches into `sdk-quickstart` and the platform's error-handling article. |

## Gaps and misses

