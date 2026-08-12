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

Refs below were read at `default_ref` as registered in `sources.md` (`origin/master`, except KMP/Unity
where it is `origin/main`) on 2026-08-11. Local clones go stale — re-read the ref, don't trust a
checked-out working tree, and see `platforms.md` for which platforms are GA vs. beta before quoting a
version boundary.

- **Method names, signatures and argument shapes** — the platform's own SDK repo (`ios-sdk`,
  `android-sdk`, `flutter-sdk`, `unity-sdk`, `kmp-sdk`), and `jscore` rather than `rn-sdk` /
  `capacitor-sdk` for the React Native and Capacitor public API. One documented exception to that last
  rule is Kids Mode — see below.
- **Where profile state comes from — the split that makes this zone hard.** The profile is a
  server-owned object; the SDK exposes a cached read of it. Two different questions, two different
  sources:
  - *"What is actually true for this user"* — the server. The maintained description of the object's
    shape is `server-side-api-spec`: its `Profile` schema carries `customer_user_id`,
    `custom_attributes` and `access_levels` → `AccessLevel`, and `getProfile` / `grantAccessLevel` /
    `revokeAccessLevel` are the operations that read and mutate it. `dashboard-backend` owns the
    behaviour behind that spec.
  - *"What the app sees, and when"* — the SDK cache, and its refresh schedule lives in each platform's
    **lifecycle manager, not in its profile code**. Confirmed: `ios-sdk`
    `Sources/LifecycleManager.swift` defines `profileUpdateInterval = 60.0`,
    `profileUpdateShortInterval = 10.0` (used after a failed sync) and
    `profileUpdateAcceleratedInterval = 3.0` (for 5 minutes after a web paywall opens); `android-sdk`
    `adapty/src/main/java/com/adapty/internal/utils/LifecycleAwareRequestRunner.kt` defines
    `PERIODIC_REQUEST_INTERVAL = (60 * 1000)` and only schedules it while the process lifecycle is at
    least `RESUMED`, i.e. foreground. So the "queries the server every minute" sentence that all seven
    status articles carry is a *default constant on two platforms*, not a guarantee — read the constant
    for the platform in the ticket. Nothing equivalent exists in `Sources/Profile/`; grepping there for
    an interval finds nothing.
  - *Access-level **change events*** — `access_level_updated` and `subscription_started`, which the
    `CrossDeviceDetection.mdx` reusable makes claims about, are backend event types, not SDK behaviour:
    `dashboard-backend` `src/sdk/purchase_context/constants/share.py` and
    `src/portal/analytics_context/domain/enums/event_type.py`. No SDK repo can settle "which event
    fires for an inheritor".
- **Attribute limits and allowed keys — the authoritative numbers are backend constants**, in
  `dashboard-backend` `src/sdk/profile_context/constants.py`: `PROFILE_MAX_AMOUNT_ATTRIBUTES = 30`,
  `PROFILE_ATTRIBUTE_NAME_MAX_LENGTH = 30`, `PROFILE_ATTRIBUTE_VALUE_MAX_LENGTH = 50`, and the key
  pattern `[\dA-Za-z_.-]+`. Every SDK re-implements the same three numbers client-side and can
  therefore drift from them — `ios-sdk`
  `Sources/Profile/Entities/AdaptyProfile.CustomAttributes.swift` (`validateKey`, `validateCount`,
  `validateLenght`) and `android-sdk`
  `adapty/src/main/java/com/adapty/internal/utils/CustomAttributeValidator.kt` (`MAX_ATTRS_COUNT`,
  `MAX_KEY_LENGTH`, `MAX_VALUE_LENGTH`) hold identical values today. Do not verify a limit from the
  article: all seven currently repeat the same three bullets verbatim (grep for
  `30 custom attributes` hits 7 of 7), so agreement between them proves nothing. Note both
  implementations apply the 50-character cap **only to string values** — numeric values are unbounded —
  which the articles' "string or float with no more than 50 characters" does not convey.
  The built-in key list is the wire contract of each SDK's profile-parameters type: `ios-sdk`
  `Sources/Profile/Entities/AdaptyProfileParameters.swift` `CodingKeys` gives `first_name`,
  `last_name`, `gender`, `birthday`, `email`, `phone_number` — plus `att_status`, `custom_attributes`,
  `analytics_disabled`, `store_country`, `ip_v4_address`, which the articles deliberately don't list.
- **Kids Mode mechanisms are per-platform and are a different *kind of thing* on each platform**, so
  each must be read from that platform's repo, never generalised: `ios-sdk` = a Swift package trait
  declared in `Package.swift` (`traits:` block, `KidsMode`); `android-sdk` = runtime builder flags
  `withAdIdCollectionDisabled` / `withIpAddressCollectionDisabled` in
  `adapty/src/main/java/com/adapty/models/AdaptyConfig.kt`, plus an `AD_ID` manifest removal;
  `rn-sdk` = a Podfile helper, `ios/adapty_kids_mode.rb`; `capacitor-sdk` = a published bin,
  `adapty-kids-mode` → `scripts/kids-mode.cjs` (declared in `package.json`). **This is the one topic
  where `jscore` is not the source for React Native and Capacitor** — `git grep -il kids origin/master`
  in `jscore` returns nothing, while both wrapper repos carry the tooling. Related correction to
  `platforms.md`: its "Capacitor has no Kids Mode mechanism" is a false absence produced by grepping
  only `src/` for `kidsMode`/`KidsMode`/`kids_mode`; the real spelling is hyphenated and the code is
  under `scripts/`. Re-derive before repeating either claim.
- **Never infer these across platforms**, even when the surrounding prose is identical: the profile
  setter's name *and type* (`kmp-deal-with-att` documents `withAttStatus(3)` — confirmed as
  `withAttStatus(attStatus: Int?)`, a raw Int, in `kmp-sdk`
  `adapty/src/commonMain/kotlin/com/adapty/kmp/models/AdaptyProfileParameters.kt`, where every other
  platform takes a typed enum); the Google Play obfuscated-account-ID argument's existence and name
  (`obfuscatedAccountId` nested under `android` on React Native and Capacitor,
  `androidObfuscatedAccountId` on Flutter and KMP, a positional third argument on Unity, absent from the
  two native articles); which Kids Mode mechanism class applies; and the poll interval plus whether it
  is foreground-gated.

## What we document, what we don't

Delta from `scope.md` only.

- **Identity stops at the customer user ID.** All seven `identifying-users` articles open with the same
  one sentence — "if you have your own authentication system, you should set your own Customer User ID"
  — and then document only `activate(customerUserId:)`, `identify()` and `logout()`. Nothing in the zone
  touches how a reader's auth works: grepping all 40 articles for
  `authentication system|auth system|OAuth|JWT|Firebase Auth|sign in with apple|password` returns that
  shared sentence, 7 times, and nothing else. Keep the line there. What *is* ours is the choice of value
  to use as the customer user ID and what that choice costs — that guidance lives in the
  `CrossDeviceDetection.mdx` reusable's table. Issuing, storing or verifying the identity is not ours,
  and the Firebase-Auth-sync recipe that comes closest lives in the integrations zone and is written
  against a pre-v4 API — not a pattern to extend into this zone.
- **Privacy surfaces: document the switch, link the policy.** The six `kids-mode` articles link Apple's
  Kids policy and the FTC's COPPA application PDF and never restate either (6 of 6 link `ftc.gov`, 4
  link `developer.apple.com/kids`; the literal word "COPPA" appears in exactly one article,
  `kids-mode-react-native`). `ios-deal-with-att` and its five siblings likewise document only "forward
  the status you already have, as early as possible" — none says when to show the prompt, how to word
  it, or which `AppTrackingTransparency` request API to call. Hold that line: the claim we can own is
  "this flag stops Adapty from collecting X," never "this makes your app compliant" or "this will pass
  review." A dashboard toggle plus an SDK switch is a mechanism; whether the reader's app satisfies
  COPPA, GDPR or the Kids Category is not a docs answer.
- **Two profile-write surfaces are deliberately not here.** `analyticsDisabled` — a public field on the
  profile-parameters object in `ios-sdk`, `android-sdk` and `jscore` — is documented in the integrations
  zone as the tracking opt-out, and `updateAttribution` / `setIntegrationIdentifier` belong to the
  attribution and integrations zones. Confirmed absent from this zone: grepping all 40 articles for
  `analyticsDisabled` and for `updateAttribution|setIntegrationIdentifier` returns zero hits each. A
  "user asked not to be tracked" ticket is therefore *not* automatically this zone's, and adding either
  API here would create a second home for an answer that already has one.
- **The empty Android `deal-with-att` cell is correct, not a gap.** ATT is an Apple framework;
  `ls src/content/docs/**/*deal-with-att*` returns six files and no Android one. Per `scope.md`'s matrix
  rule, don't fill it.
- **A per-platform article may omit whatever a shared surface already carries**, and two shared surfaces
  exist here: `SampleApp.md` (imported by 21 of the 40) and `CrossDeviceDetection.mdx` (imported by all
  seven `identifying-users` articles). Cross-device identity, the Family-Sharing/inheritor event matrix,
  and the answer to "do I need to call restore on launch" live *only* in that reusable —
  `restorePurchases` appears in zero of the 40 article bodies. Don't inline any of it into one
  platform's article; that forks the answer for six others.
- **Two more things a platform article is right to compress to a link.** The access-level concept is a
  bare link and never an explanation (`(access-level)` appears exactly once each in 7 articles), because
  the `access-levels` zone owns it. The store-side server-notification prerequisite is one
  "before you start" sentence pointing into the Apple and Google platform zones
  (`App Store Server Notifications` in 5 files, `RTDN` in 6) rather than a procedure — that is
  `scope.md`'s auto-provisioned-setup rule applied, not a shortfall, even though a missing notification
  setup is the actual root cause of many tickets that land on `subscription-status` or
  `android-listen-subscription-changes`.
- **A platform whose SDK hasn't shipped the mechanism still gets the article.** `kids-mode-unity` keeps
  the full "What's required" and dashboard sections and replaces only the code section with
  "Support for Kids Mode in Unity is coming soon!" plus links to `kids-mode` and `kids-mode-android`.
  That is the house shape for a not-yet-supported platform in an otherwise complete family — a stub
  section, not a missing page.

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| deal-with-att | ios-deal-with-att |  | react-native-deal-with-att | flutter-deal-with-att | unity-deal-with-att | kmp-deal-with-att | capacitor-deal-with-att |
| identifying-users | identifying-users | android-identifying-users | react-native-identifying-users | flutter-identifying-users | unity-identifying-users | kmp-identifying-users | capacitor-identifying-users |
| kids-mode | kids-mode | kids-mode-android | kids-mode-react-native | kids-mode-flutter | kids-mode-unity | kids-mode-kmp | kids-mode-capacitor |
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
| kids-mode-capacitor | — | dev | 6 | capacitor |
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

