---
rollout: sdk-41-attribution-optin
status: in-progress
zones: [attribution, sdk-migrations, sdk-quickstart, integrations, sdk-flows-manual, sdk-best-practices, sdk-flows-display, agent-tooling]
unattended: false
---

## What changes

SDK 4.1 line, shipped first on iOS: Adapty Attribution install registration becomes **opt-in**
(`adaptyAttributionEnabled`, off by default — silent break for Adapty Attribution users);
the external attribution API is renamed (`updateAttribution(_:source:)` →
`updateExternalAttribution(_:provider:)`, `appliedAttributionSources` →
`appliedExternalAttributionProviders`) with **no deprecated aliases**; the fallback file format
moves to 11 (re-download required, runtime `DecodingFailed` 2006 otherwise); App Store promoted
in-app purchases return (`didReceivePromotedPurchase` + `AdaptyPromotedProduct`, StoreKit 2,
iOS 16.4+). iOS additionally shipped `preloadFlows`/`preloadOnboardings` (cache warming) and turned
`AdaptySubscriptionOfferType` into a struct — both iOS-only so far.

## Canon — decisions made on the first platform

Canon = docs commits `bc447f975` (iOS 4.1, PR #430) + `660cb5325` (opt-in highlight follow-up, PR #490), merged to main.

- Version notes are **platform-agnostic**: "Starting from Adapty SDK version 4.1" / "SDK 4.1+",
  never "iOS SDK 4.1". Platform context comes from the code tab (user rule, 2026-07-20).
- Rename mentions in shared articles use the parenthetical "(named `updateAttribution()` before
  SDK version 4.1)" instead of keeping both code variants; the pre-4.1 SDK-3.x code comment pairs
  were removed from integration snippets (see adjust.mdx in the canon diff).
- Opt-in is documented in four places: migration guide (⚠️ silent-break warning), the
  installation article's optional-parameters section ("Enable Adapty Attribution"), a new
  "Step 1. Enable Adapty Attribution in the SDK" in user-acquisition.mdx (steps renumbered),
  and `:::important` callouts atop ua-attribution-data.mdx + ua-deferred-data.mdx.
- attribution-integration.mdx gained the "accepted for asynchronous processing, not yet applied"
  `:::info` about the success result.
- Migration guide has a "Quick reference" v4.0→v4.1 table up top; fallback re-download gets its
  own section with a "no compile error if you skip it" warning; promoted purchases framed as
  "a new feature, not a migration step".
- Promoted purchases documented as working feature in making-purchases.mdx § "In-app purchases
  from the App Store" (iOS-only article section).

## Platform state
| platform | code branch | code | docs | articles written | docs commit | docs PR |
|---|---|---|---|---|---|---|
| ios | release/4.1.0 | shipped | shipped | migration-to-ios-sdk-41, ios-optimize-paywall-fetching, sdk-installation-ios, user-acquisition, ua-attribution-data, ua-deferred-data, attribution-integration, adjust, appsflyer, branch, tenjin, ios-show-aa-targeted-paywall, ios-sdk-call-order, making-purchases, migration-to-ios-sdk-v4, fetch-paywalls-and-products, get-pb-paywalls, whats-new | bc447f975 + 660cb5325 | #430, #490 |
| android | — | not started | — | — | — | — |
| react-native | — | not started | — | — | — | — |
| flutter | feat/sdk-4.1-update | in progress | — | — | — | — |
| unity | feature/sdk-4.1-update ([PR #30](https://github.com/adaptyteam/AdaptySDK-Unity/pull/30), `4.1.0-dev.1`) | in review | drafted on docs/unity-4.1 (uncommitted 2026-08-17) | migration-to-unity-sdk-v4 (repurposed 3.x→4.1), sdk-installation-unity, unity-check-subscription-status, unity-listen-subscription-changes, implement-observer-mode-unity, unity-sdk-call-order, adjust, appsflyer, branch, tenjin, unity-sdk-migration-guides, unity-present-flows-in-observer-mode, unity-handling-onboarding-events, unity-onboarding-input, unity-making-purchases, unity.json | — | — |
| kmp | — | not started | — | — | — | — |
| capacitor | release/4.1.0 (merged to `dev`) | shipped | drafted on docs/capacitor-4.1 (uncommitted 2026-08-26) | migration-to-capacitor-sdk-v4, sdk-installation-capacitor, capacitor-making-purchases, capacitor-sdk-call-order, capacitor-sdk-migration-guides, adapty-cursor-capacitor, capacitor-localizations-and-locale-codes, user-acquisition, capacitor-show-aa-targeted-paywall | — | #559 |

### Unity specifics (from PR #30 diff, `feature/newtonsoft-migration...feature/sdk-4.1-update`)

Unity 4.1 is the **first stable v4 release** — 4.0 stays beta-only and is skipped, so the docs
plan is to repurpose `migration-to-unity-sdk-v4.mdx` to cover 3.x → 4.0 + 4.1 in one guide
(file name and URL unchanged for SEO). The SDK repo carries its own `MIGRATION-v4.0-to-v4.1.md`
and a rich CHANGELOG entry — both good ground truth.

Discrepancies vs the iOS canon (all verified against the public-surface fixture diff):

1. **Provider stays an open `string`** — no `AdaptyExternalAttributionProvider` enum in C#; no
   type-rename section applies. Values: `"appsflyer"`, `"adjust"`, `"branch"`, `"tenjin"`,
   `"apple_search_ads"`, `"custom"`.
2. **The JSON-string overload stays public** in Unity (`UpdateExternalAttribution(jsonString, …)`),
   unlike iOS 4.1 which removed it. No "deserialize first" migration step.
3. **No preload APIs** — `preloadFlows`/`preloadOnboardings` did not come to Unity 4.1;
   unity-optimize-paywall-fetching must NOT get the iOS "Preload placements" section.
4. **No `AdaptySubscriptionOfferType` change** — that canon section has no Unity counterpart.
5. **Promoted purchases work end-to-end but the callback is dormant**: `IAdaptyEventListener.OnReceivePromotedPurchase`
   is a required interface member (compile break — plain-interface convention, no defaults), and
   `Adapty.MakePromotedPurchase` exists, but the pinned native iOS 4.1.0 does not emit the event
   to wrappers — it completes promoted purchases automatically by itself, so the purchase and the
   Adapty transaction DO happen; only deferral/customization from C# doesn't. Decision (user,
   2026-08-17): document in unity-making-purchases § "In-app purchases from the App Store" as a
   working feature with the auto-completion behavior, the required method, and the "SDK doesn't
   deliver promoted purchases to this method yet" note. Drop that note when the native pin moves
   past 4.1.0.
6. **iOS-integration snapshot**: Android natives stay on 4.0.x (crossplatform 4.0.2 /
   android-sdk 4.0.1); strictly, the fallback format bump applies to the **iOS** file only while
   Android stays on 4.0.x. Decision (user, 2026-08-17): the migration guide instructs re-downloading
   **both** the iOS and Android fallback files — Unity apps bundle both in `Assets/StreamingAssets`,
   re-downloading the Android file is harmless, and the wording survives a coordinated release where
   Android moves to 4.1 too.
7. **Fallback format 11** surfaces as `Adapty.SetFallback` → `DecodingFailed` (`adapty_code: 2006`)
   at runtime; SDK's own migration doc leads with this as the only non-compiler-caught step.
8. `AdaptyPromotedProduct` is a flattened C# model (VendorProductId, LocalizedTitle/Description,
   Price, RegionCode, Subscription, IsFamilyShareable) — not iOS's `skProduct` + offer.
9. Toolchain unchanged from 4.0: Unity 2022.3+, Newtonsoft, EDM 1.2.188+, Xcode 26+, iOS 15.0+.
10. **No `customLayoutId`** — iOS's new `getPaywallConfiguration` parameter (canon's
    get-pb-paywalls.mdx row) has no counterpart on `AdaptyUICreateFlowViewParameters` (verified
    against the 4.1 public-surface fixture); unity-get-pb-paywalls keeps its parameter table.
11. **Full-listener code samples go stale**: `OnReceivePromotedPurchase` becomes a required
    `IAdaptyEventListener` member, so every doc sample that implements the full member set — and
    every "In SDK 4.0 … The methods are unchanged" I-prefix note — is affected:
    unity-check-subscription-status.mdx, unity-listen-subscription-changes.mdx,
    sdk-installation-unity.mdx (two samples), implement-observer-mode-unity.mdx, plus the
    migration guide itself. The onboardings-listener notes (unity-handling-onboarding-events,
    unity-onboarding-input) are NOT affected — `IAdaptyOnboardingsEventsListener` is unchanged.
    migration-to-unity-sdk-314.mdx also mentions `AdaptyEventListener` but is a historical guide —
    never edited for new versions.
12. `fetch-paywalls-and-products-unity` deliberately does NOT get the canon's offerType
    enum→struct note (see 4).

### Capacitor specifics (from PR #104 + PR #106, `@adapty/core@4.1.0-dev.1396a8d7`)

Capacitor 4.1 is, like Unity, the **first stable v4 release** — 4.0 shipped as betas only
(`4.0.2-beta.1` is the last one on npm), so `migration-to-capacitor-sdk-v4.mdx` is repurposed to cover
3.x → 4.0 + 4.1 in one guide, file name and URL unchanged for SEO.

Discrepancies vs the iOS canon (all verified against the published core types and the `dev` tip, not
inferred from the iOS or Unity guides):

1. ⚠️ **`appliedAttributionSources` IS renamed after all — corrected 2026-08-26.** The first pass read
   only PR #104 and recorded the opposite, because at `@adapty/core@4.1.0-dev.51f7b5e6` the property
   genuinely still had the old name. **PR #106 ("feat!: expose AdaptyExternalAttributionProvider from
   core", core `4.1.0-dev.1396a8d7`) landed afterwards** and renamed it to
   `appliedExternalAttributionProviders`, replaced the `AttributionSource` export with
   `AdaptyExternalAttributionProvider`, and typed `updateExternalAttribution`'s `provider` option with
   it. The new type is an open union: `'apple_search_ads' | 'adjust' | 'appsflyer' | 'branch' |
   'tenjin' | (string & {})` — no `'custom'` member, unlike Android's `CUSTOM`, but any string is
   accepted. The wire key stays `applied_attribution_sources`.
   **Lesson: one merged PR is not the whole release.** Check for follow-up PRs on the release branch
   before recording "X is not renamed on this platform" — an absence claim is exactly the kind a later
   commit invalidates. `capacitor-show-aa-targeted-paywall.mdx` DID need editing (6 sites).
2. **Provider is no longer a bare `string`** — see point 1; it is `AdaptyExternalAttributionProvider`.
   (Unity's provider does stay a plain C# `string`.) `updateAttribution({ attribution, source })`
   → `updateExternalAttribution({ attribution, provider })`, no deprecated alias. There is no
   JSON-string overload on Capacitor at all, so the iOS "deserialize first" step has no counterpart.
3. **No preload APIs, no `customLayoutId`, no offer-type change** — same as Unity.
   `capacitor-optimize-paywall-fetching` and `capacitor-get-pb-paywalls` stay as they are.
4. **No compile break for promoted purchases.** Capacitor listeners are additive (`adapty.addListener`),
   not a required interface, so unlike Unity's `IAdaptyEventListener` there is nothing an app must
   implement. Nothing goes stale in the existing listener samples.
5. **Promoted purchases actually reach JS on Capacitor** — the opposite of Unity's dormant callback, and
   the reason is the **native iOS pin**, not the wrapper. In `Sources.AdaptyPlugin/Events/AdaptyPluginDelegate.swift`,
   `didReceivePromotedPurchase` is **commented out at iOS 4.1.0** (Unity's pin) and **live at 4.1.2**
   (Capacitor's pin, raised from 4.1.1 by PR #105 on `dev`). So Capacitor's `'onPromotedPurchaseReceived'`
   fires for real and is documented as a working feature with no "not delivered yet" caveat.
   → This answers the Unity brief's third open question below.
6. **Capacitor has a unique SDK-owned fallback design worth documenting as behavior, not API.** The JS SDK
   registers its own `'onPromotedPurchaseReceived'` handler at activation
   (`emitter.setFallback` in the `Adapty` constructor) that calls `makePromotedPurchase`. So promoted
   purchases complete automatically **with no app code**. Registering an app listener *replaces* that
   default, and the app then owns completion — if the handler never calls `makePromotedPurchase`, the
   purchase never happens (the store hands the product over and waits). `listener.remove()` restores the
   default; `removeAllListeners()` drops the app's listener and the default resumes. All three states are
   documented in `capacitor-making-purchases` § "In-app purchases from the App Store".
7. **`makePromotedPurchase({ product })` takes no purchase params** — a promoted product carries no
   paywall context. Returns the same `AdaptyPurchaseResult` as `makePurchase`.
8. **Fallback format 10 → 11 confirmed**, not assumed: `Sources/Versions.swift` `fallbackFormatVersion`
   is `10` at iOS 4.0.2/4.0.3 and `11` at 4.1.0/4.1.2. Capacitor 4.0 betas pinned iOS 4.0.3, so the
   re-download really is required when moving off a 4.0 beta. Surfaces as `setFallback` rejecting the
   file, with no build error.
9. **Android natives are on 4.1 too** (BOM 4.1.0, crossplatform 4.1.2), unlike Unity's iOS-only 4.1
   snapshot — so no "iOS file only" scoping caveat is needed for the fallback step.
10. **`adaptyAttributionEnabled` is a top-level `activate` param** (`params: { adaptyAttributionEnabled: true }`),
    not nested under `ios`/`android`. Default `false`, pinned by two integration tests in the PR.
11. **No Capacitor tabs exist in the MMP integration articles** (adjust, appsflyer, branch, tenjin,
    attribution-integration) — checked, zero `value="capacitor"` in all five. So the rename sweep that
    touched Unity's C# tabs has no Capacitor counterpart. This is a **pre-existing coverage gap**, not
    something 4.1 introduced, and was deliberately left out of scope.
12. Non-article edits not listed in the table (the validator only accepts article ids): the
    *SDK migration guide* label in `src/data/sidebars/capacitor.json` becomes "Migrate to v4.1".
13. `user-acquisition.mdx` § "Step 1. Enable Adapty Attribution in the SDK" gained a Capacitor tab —
    it previously had Swift/Kotlin/Java only. The Unity rollout did not add a Unity tab there; worth
    doing on the next platform pass.

## Open questions for the SDK team

- ~~What tag/version will the public Unity release use?~~ **Answered 2026-08-17: `4.1.0`**
  (user confirmation). Docs replace the pinned `#4.0.0-beta.1` instructions accordingly.
- Will the public 4.1 release still be the iOS-integration snapshot (Android natives on 4.0.x), or
  does it wait for Android 4.1? Decides whether the "4.1 features arrive on iOS first" caveat and
  the "iOS fallback file only" scoping go into the docs.
- ~~When does the native iOS pin move past 4.1.0 so `OnReceivePromotedPurchase` actually fires?~~
  **Answered 2026-08-26 while documenting Capacitor: iOS 4.1.1.** The forwarding lives in
  `AdaptyPluginDelegate.didReceivePromotedPurchase` and is commented out at the 4.1.0 tag, live at 4.1.2.
  Unity stays dormant only while it pins 4.1.0 — when Unity's native pin moves to 4.1.1+, drop the
  "SDK doesn't deliver promoted purchases to this method yet" note from `unity-making-purchases` and
  the Unity migration guide.
