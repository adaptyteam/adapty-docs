---
zone: sdk-users-access
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The "Users & access" category of each platform SDK: identifying a user to Adapty, setting custom user attributes, listening for subscription/access-level changes, checking current access or subscription status, handling Apple's App Tracking Transparency prompt, and Kids Mode (disabling ad-identifier collection). Readers are developers managing the identity and entitlement state of a user within their app, independent of any specific paywall or purchase flow.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| deal-with-att | ios-deal-with-att |  | react-native-deal-with-att | flutter-deal-with-att | unity-deal-with-att | kmp-deal-with-att | capacitor-deal-with-att |
| identifying-users | identifying-users | android-identifying-users | react-native-identifying-users | flutter-identifying-users | unity-identifying-users | kmp-identifying-users | capacitor-identifying-users |
| kids-mode | kids-mode | kids-mode-android | kids-mode-react-native | kids-mode-flutter | kids-mode-unity | kids-mode-kmp |  |
| listen-subscription-changes |  | android-listen-subscription-changes | react-native-listen-subscription-changes | flutter-listen-subscription-changes | unity-listen-subscription-changes | kmp-listen-subscription-changes | capacitor-listen-subscription-changes |
| setting-user-attributes | setting-user-attributes | android-setting-user-attributes | react-native-setting-user-attributes | flutter-setting-user-attributes | unity-setting-user-attributes | kmp-setting-user-attributes | capacitor-setting-user-attributes |
| subscription-status | subscription-status |  |  |  |  |  |  |
| user | ios-user | android-user | react-native-user | flutter-user | unity-user | kmp-user | capacitor-user |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-identifying-users | — | dev | 4 | android |
| android-listen-subscription-changes | — | dev | 4 | android |
| android-setting-user-attributes | — | dev | 4 | android |
| android-user | entry | dev | 0 | android |
| capacitor-deal-with-att | — | dev | 0 | capacitor |
| capacitor-identifying-users | — | dev | 6 | capacitor |
| capacitor-listen-subscription-changes | — | dev | 4 | capacitor |
| capacitor-setting-user-attributes | — | dev | 4 | capacitor |
| capacitor-user | entry | dev | 0 | capacitor |
| flutter-deal-with-att | — | dev | 0 | flutter |
| flutter-identifying-users | — | dev | 6 | flutter |
| flutter-listen-subscription-changes | — | dev | 4 | flutter |
| flutter-setting-user-attributes | — | dev | 4 | flutter |
| flutter-user | entry | dev | 0 | flutter |
| identifying-users | — | dev | 5 | ios |
| ios-deal-with-att | — | dev | 0 | ios |
| ios-user | entry | dev | 0 | ios |
| kids-mode | — | dev | 8 | ios |
| kids-mode-android | — | dev | 5 | android |
| kids-mode-flutter | — | dev | 4 | flutter |
| kids-mode-kmp | — | dev | 4 | kmp |
| kids-mode-react-native | — | dev | 6 | react-native |
| kids-mode-unity | — | dev | 4 | unity |
| kmp-deal-with-att | — | dev | 0 | kmp |
| kmp-identifying-users | — | dev | 6 | kmp |
| kmp-listen-subscription-changes | — | dev | 4 | kmp |
| kmp-setting-user-attributes | — | dev | 4 | kmp |
| kmp-user | entry | dev | 0 | kmp |
| react-native-deal-with-att | — | dev | 0 | react-native |
| react-native-identifying-users | — | dev | 6 | react-native |
| react-native-listen-subscription-changes | — | dev | 4 | react-native |
| react-native-setting-user-attributes | — | dev | 4 | react-native |
| react-native-user | entry | dev | 0 | react-native |
| setting-user-attributes | — | dev | 4 | ios |
| subscription-status | — | dev | 4 | ios |
| unity-deal-with-att | — | dev | 0 | unity |
| unity-identifying-users | — | dev | 6 | unity |
| unity-listen-subscription-changes | — | dev | 4 | unity |
| unity-setting-user-attributes | — | dev | 4 | unity |
| unity-user | entry | dev | 0 | unity |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **sdk-flows-manual** — is the ticket about the ongoing state of a user's access (sdk-users-access), or about the purchase/restore call that changes that state (sdk-flows-manual)? Making the purchase is sdk-flows-manual; checking or reacting to its resulting access level afterward is sdk-users-access.
- **access-levels** — is the question about the SDK API for checking/observing a user's access level in app code (sdk-users-access), or about the access-level concept and its dashboard configuration — creating an access level, assigning it to a product (access-levels)?
- **sdk-quickstart** — is this the first-time identify call during initial setup (sdk-quickstart's quickstart-identify family), or ongoing identity/attribute/access management afterward (sdk-users-access)?
- **attribution** — is the "user tracking" question about ATT/Kids Mode privacy compliance (sdk-users-access), or about marketing attribution data itself (attribution)?

## Ticket language

Rows name a **family**, not a platform article — the roster above expands each one across the seven
platforms. Corpus-wide synonyms (access level ↔ entitlement ↔ premium access, profile ↔ customer
profile) live in `aliases.md` and are deliberately not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "is the user premium", "unlock paid features", "check access on app launch", "does the user still have a subscription" | iOS: `subscription-status`. Every other platform: `listen-subscription-changes`. The family name differs only on iOS — an iOS ticket searched as "listen subscription changes" finds nothing. |
| "status is stale", "cached profile out of date", "how often does it sync", "poll or push" | Same pair of articles, cache section. The SDK polls the server about once a minute and the cache can't be read directly, so the answer is always "subscribe to profile updates", not "call `getProfile` in a loop". |
| "renewal/cancellation never arrives", "access didn't change after the store event" | Same pair — but the actual prerequisite is store-side server notifications (App Store Server Notifications on iOS, RTDN on Android), set up outside the SDK. Both articles state it as a "before you start" step; a ticket that stops at SDK code will keep failing. |
| "link purchases to my own user ID", "tie a StoreKit/Play transaction to an internal account", "custom auth integration" | `identifying-users`. Covers both shapes: passing the customer user ID at `activate` and calling `identify` later. |
| "user logged in and lost premium", "wrong user's subscription after sign-in", "log a user out" | `identifying-users`. Logout drops to a fresh anonymous profile, and after `identify` the anonymous profile's custom attributes and attribution do **not** migrate — you must resubmit them and re-request paywalls and products. That resubmission requirement is the usual root cause. |
| "same user on a new device", "subscription didn't carry over", "`subscription_started` missing", "returning users undercounted" | `identifying-users`, cross-device section. Access syncs automatically on `activate`, but a device-derived customer user ID creates a *second* profile that inherits the purchase — it fires **Access level updated**, never `subscription_started`. |
| "do I need to call restore on launch", "restore on a fresh install" | Also `identifying-users` (cross-device section): no, `activate` already syncs entitlements; the user-facing Restore button is required by App Review. The `restorePurchases` API itself is sdk-flows-manual. |
| "appAccountToken", "Apple can't match the user across installs" | `identifying-users`. Version boundary: iOS SDK 3.10.2+. |
| "obfuscated account ID", "Google Play fraud-prevention identifier" | `identifying-users` — but only on the cross-platform SDKs (React Native, Flutter, Unity, KMP, Capacitor). Hard constraint: it must be passed *together with* the customer user ID or it is silently dropped from the transaction. The native iOS/Android articles don't cover it; Android's copy sits in the SDK-installation article (sdk-quickstart). |
| "store the user's email/phone/name/gender/birthday", "push CRM fields from the app" | `setting-user-attributes`. These are a fixed allowed-key list, not custom attributes — a ticket asking for "a custom field for email" wants the built-in key. |
| "attribute rejected", "how many attributes can I set", "key naming rules", "clear/remove an attribute" | `setting-user-attributes`, limits section: 30 attributes per user, 30-char keys (alphanumerics plus `_ - .`), 50-char values, removal by passing null. Also: reading `customAttributes` back can be stale, since other devices write to the same profile. |
| "segment users by app usage", "target a paywall by user property" | `setting-user-attributes` for the SDK-side write; defining the segment that consumes it is dashboard-side and lives outside this zone. |
| "IDFA permission", "iOS 14 tracking prompt", "attribution data missing or wrong after the prompt" | `deal-with-att`. The SDK does not read the ATT status itself — you forward it via a profile update, and late forwarding is what corrupts integration data. iOS-only concern, so there is no Android article even though the cross-platform SDKs all have one. |
| "COPPA", "app rejected from the Kids Category", "disable IDFA/GAID collection", "remove AD_ID permission" | `kids-mode`. Two-part answer that tickets usually only half-know: a dashboard toggle to stop IP-address collection *plus* a build-time SDK variant (separate package/Podfile flag/manifest change per platform). Unity's article documents that support is still pending and points at the native guides. |
| "where are the user/profile docs" | The `user` family — per-platform index pages with no content of their own. |

## Gaps and misses

