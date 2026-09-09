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
| android | — | shipped | shipped | migration-to-android-sdk-41, android-get-pb-paywalls, sdk-installation-android, android-sdk-migration-guides | on main | — |
| react-native | — | not started | — | — | — | — |
| flutter | feat/sdk-4.1-update | in progress | — | — | — | — |
| unity | feature/sdk-4.1-update ([PR #30](https://github.com/adaptyteam/AdaptySDK-Unity/pull/30), `4.1.0-dev.1`) | shipped (`4.1.0`, `4.1.1` tagged) | shipped | migration-to-unity-sdk-v4, sdk-installation-unity, unity-check-subscription-status, unity-listen-subscription-changes, implement-observer-mode-unity, unity-sdk-call-order, adjust, appsflyer, branch, tenjin, unity-sdk-migration-guides, unity-present-flows-in-observer-mode, unity-handling-onboarding-events, unity-onboarding-input, unity-making-purchases | 3cf5ff5f2 | #509, #601 |
| kmp | release/4.1 | in review | in review | migration-to-kmp-sdk-v4, sdk-installation-kotlin-multiplatform, kmp-making-purchases, kmp-get-pb-paywalls, kmp-sdk-call-order, kmp-sdk-migration-guides, user-acquisition, attribution-integration, kmp-check-subscription-status, kmp-handle-errors, kmp-handling-onboarding-events, kmp-troubleshoot-paywall-builder, kmp-get-onboardings, adapty-cursor-kmp | d0869e200 | #560 |
| capacitor | release/4.1.0 + [PR #106](https://github.com/adaptyteam/AdaptySDK-Capacitor/pull/106) (open) | in review | in review | migration-to-capacitor-sdk-v4, sdk-installation-capacitor, capacitor-making-purchases, capacitor-sdk-call-order, capacitor-sdk-migration-guides, adapty-cursor-capacitor, capacitor-localizations-and-locale-codes, user-acquisition | 03cc7d8e9 | #559 |

### Unity specifics (from PR #30 diff, `feature/newtonsoft-migration...feature/sdk-4.1-update`)

Unity 4.1 is the **first stable v4 release** — 4.0 stays beta-only and is skipped, so the docs
plan is to repurpose `migration-to-unity-sdk-v4.mdx` to cover 3.x → 4.0 + 4.1 in one guide
(file name and URL unchanged for SEO). The SDK repo carries its own `MIGRATION-v4.0-to-v4.1.md`
and a rich CHANGELOG entry — both good ground truth.

Discrepancies vs the iOS canon (all verified against the public-surface fixture diff):

1. ⚠️ **Provider is NOT a plain `string` in released Unity 4.1.0 — corrected 2026-09-09.** The
   original entry read PR #30 (merged 2026-08-20) and was right about that diff. Commit `b0142e13`
   ("fix: land the pre-tag review while the 4.1.0 API can still move", 2026-08-21) then added
   `Packages/com.adapty.unity-sdk/Runtime/Models/AdaptyExternalAttributionProvider.cs` **before the
   4.1.0 tag was cut**, so the shipped SDK has the entity. Verified present at tags `4.1.0` and
   `4.1.1`. It is a sealed class with `RawValue` (trimmed), a public `(string)` constructor, `==`/`!=`
   operators, and six shared instances: `AppleAds` (`apple_search_ads`), `Adjust`, `Appsflyer`,
   `Branch`, `Tenjin`, `Custom`. **There is no implicit `string` → provider conversion** (grepped for
   `implicit`/`operator` at 4.1.0 — only equality operators).
   Also verified at 4.1.1: `AdaptyProfile.AppliedExternalAttributionProviders` is
   `IReadOnlyList<AdaptyExternalAttributionProvider>`, not of `string`. The wire key stays
   `applied_attribution_sources`, and null/blank entries are skipped when the list is built.
   **Consequence — FIXED in PR #601 (2026-09-09).** The Unity tabs in `adjust`, `appsflyer`, `branch`
   and `tenjin` all passed a bare string as the `provider` argument
   (`UpdateExternalAttribution(attributionString, "branch", …)`) and did not compile against 4.1.0.
   They now pass the typed instance. Fixed on its own branch rather than here, because this branch is
   KMP-scoped. Two defects found while fixing them, neither known when the task was written:
   - **`tenjin.mdx` had a second, independent compile error**: it built a `Dictionary<string, dynamic>`
     via `.ToDictionary()` and passed it as the first argument, where the only overload takes a
     `string`. That sample would not have compiled even with the provider corrected. It now serializes
     with Newtonsoft, matching what `adjust.mdx` already did, and drops the `using System.Linq` that
     existed only for the `.ToDictionary()` call. **This is our own doc repeating the upstream
     doc-comment's phantom dictionary overload** (below) — the clearest evidence of what that
     comment costs.
   - **`migration-to-unity-sdk-v4.mdx` was wrong on three counts in one sentence**: it said the
     provider is "the same string as before", that attribution data is "still accepted as a dictionary
     or a JSON string", and that the profile property is "still an `IReadOnlyList<string>`". None hold
     at 4.1.1, and its `diff` block instructed a rename to `"adjust"` that does not compile. This was
     the more serious half — it is the page people follow while upgrading. Both quick-reference tables
     now carry the types, and the section covers the type change, the six instances, the string
     constructor, the serialization requirement, and the profile-property change.
   `migration-to-unity330.mdx` also carries bare-string providers and was deliberately left alone —
   historical guide, never edited for new versions (same rule as `migration-to-unity-sdk-314.mdx`).
   **Still open, for the SDK team, not the docs:** at `main` the `UpdateExternalAttribution`
   doc-comment calls the jsonString form an overload and says "the dictionary overload is the default
   path", but no dictionary overload exists — `UpdateExternalAttribution(string jsonString,
   AdaptyExternalAttributionProvider provider, Action<AdaptyError>)` is the only signature at 4.1.0,
   4.1.1 and `main` (143 `.cs` files scanned, no extensions file). Unity callers must serialize first.
   **Third instance of the same failure mode on this rollout** (Capacitor's point 1, KMP's points 1-2,
   now Unity's): a platform's API kept moving after the docs pass read it. In all three the later
   commit landed within days and the entry recorded an absence. Re-verifying at the latest tag before
   editing is what caught the two extra defects above, so it is worth the two minutes.
2. ⚠️ **The JSON string is the ONLY form in Unity — corrected 2026-09-09.** The original entry called
   it an overload that "stays public", which reads as though a dictionary form also exists; it does
   not (see point 1). So the inverse of iOS's "deserialize first" applies: a Unity caller holding a
   dictionary must **serialize first**, and the migration guide and the `tenjin` sample now say so.
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

### KMP specifics (from PR #41 diff, `release/4.0.0...release/4.1`)

KMP 4.1 is, like Unity and Capacitor, the **first stable release of the 4.x line** — 4.0 shipped as
betas only (`4.0.1-beta.1` is the last tag), so `migration-to-kmp-sdk-v4.mdx` is repurposed to cover
3.x → 4.0 + 4.1 in one guide, file name and URL unchanged for SEO.

⚠️ **Version caveat — resolved 2026-09-09.** At the `release/4.1` tip `adaptyKmpVersion` is still
`4.1.0-beta.1` and Maven's latest stable is 3.17.0, so the docs describing 4.1 as stable were written
ahead of the tag. **User confirmed 2026-09-09: 4.1 ships stable when released**, so the "first stable
release" framing and the removal of the pre-release pinning callout both stand. No further action.

The closest canon here is **Android 4.1** (`migration-to-android-sdk-41.mdx`, already on main), not
iOS — same Kotlin builder idiom, same `withAdaptyAttributionEnabled(true)`.

Discrepancies vs the Android canon (verified against `adapty/api/adapty.klib.api` at `release/4.1`):

1. ⚠️ **`AdaptyExternalAttributionProvider` DOES exist — corrected 2026-09-09.** The first pass
   recorded the opposite and was right about the branch as it stood; commit `70953ab`
   ("Add external attribution provider entity and fix promoted purchase handling", 2026-08-26 11:41)
   landed **after** the docs were drafted at 07:49 and added it. `updateExternalAttribution` now takes
   the entity, not a `String`. It is **not an enum**: an open value type with a public
   `AdaptyExternalAttributionProvider(String)` constructor (the raw value is `.trim()`ed) and six
   `Companion` constants — `APPLE_ADS` (`apple_search_ads`), `ADJUST`, `APPSFLYER`, `BRANCH`, `TENJIN`,
   `CUSTOM` — so an id the backend adds later round-trips without an SDK update. Closest to iOS's
   entity of the same name; unlike Unity (plain `string`) and like Capacitor's open union.
2. ⚠️ **`appliedAttributionSources` IS renamed — corrected 2026-09-09.** Same commit renamed it to
   `appliedExternalAttributionProviders` and retyped it
   `List<AdaptyExternalAttributionProvider>`. The wire field stays `applied_attribution_sources`, so
   this is a source-level break only.
   **This is the second time this exact absence claim went stale on this rollout** — Capacitor's
   point 1 for the same property, now KMP's. Both times a follow-up commit on the release branch
   landed after the docs pass. The earlier entry's own hedge ("Re-check before merge anyway: a
   follow-up like Capacitor's PR #106 could land at any time") was correct and was not acted on.
   **Rule for the remaining platforms (react-native, flutter): before recording "X is not renamed",
   re-read the API surface at the branch tip on the day you open the docs PR, and re-check it again
   before merge.** Verified this time with
   `git diff 62dee65 HEAD -- adapty/api/adapty.klib.api` at tip `bdc8ff6`.
3. **No JSON-string overload.** Android keeps both `Map` and `String` overloads; KMP has only the
   `Map` one.
4. **`hasViewConfiguration` is BACK on `AdaptyFlow` in 4.1.** It was absent in the 4.0 beta, and the
   pre-code v4 docs said "removed — `createFlowView` returns an error instead". 4.1 adds
   `public val hasViewConfiguration: Boolean get() = layoutsConfiguration != null`. The v4 guide's
   data-model row and the Displaying-flows prose were both corrected. **This is the first confirmed
   miss from the pre-code KMP drafting** (see the assumptions file note below).
5. **`AdaptyPaywallProductSubscription` → `AdaptyProductSubscription`** — KMP-only rename, because
   promoted products now carry the same subscription type. Properties unchanged.
6. **`customLayoutId` DOES come to KMP**, on `createFlowView`, `createNativeFlowView`, and
   `AdaptyUIFlowPlatformView` — unlike Unity and Capacitor, which skipped it. Documented in
   `kmp-get-pb-paywalls` with the same wording as the iOS/Android canon, plus a section in the
   migration guide.
7. ⚠️ **Promoted purchases: a listener is REQUIRED on KMP — corrected 2026-09-09.** No compile break
   (`setOnPromotedPurchaseListener(listener?)` is nullable and settable, unlike Unity's required
   interface member), but the "without a listener the native SDK completes the purchase itself"
   half was wrong, and commit `5ebe3ee` says why: **the plugin layer always installs a native
   delegate** (`EventHandler.register`), so the native SDK's no-delegate auto-complete fallback
   never applies on KMP. With no listener, `AdaptyImpl.listenForPromotedPurchaseEvent` stores the
   product in `pendingPromotedPurchase` and logs through `ConsoleLogger` — the purchase is **held,
   not completed**. So Capacitor's SDK-owned fallback (its point 6) has **no KMP counterpart**;
   copying that article's three-state wording is the trap here.
   `5ebe3ee` also added **replay**: the held purchase is delivered on registration, most-recent-only,
   once, on `appMainScope` — because a promoted purchase cold-launches the app, so the intent
   normally lands between `activate` and registration. Docs therefore say: register at startup right
   after `activate`, and never pass `null` to "restore" anything.
   `makePromotedPurchase` is additionally **guarded by `isAndroidPlatform`** and returns
   `DEVELOPER_ERROR` ("This method is only available for iOS") without reaching native.
   Native iOS pin is **4.1.2** (not 4.1.1 as recorded — raised by `70953ab`), past the 4.1.0 tag
   where forwarding is commented out, so the listener does fire.
8. **Colour format trap, fixed in the SDK's KDoc by this PR.** `AdaptyCustomAsset.ColorAsset` accepts
   `#RRGGBB` or `#RRGGBBAA` — **alpha last**. An alpha-first `#AARRGGBB` string is *not rejected*: it
   is read as `RRGGBBAA` and renders the wrong colour silently. Our docs never printed `#AARRGGBB`
   (grepped: zero hits corpus-wide), so this was an SDK-doc bug, not ours — but the trap is worth a
   `:::warning`, which `kmp-get-pb-paywalls` now carries.
9. **Native pins**: iOS 4.1.1, Android BOM 4.1.0, crossplatform 4.1.2 — both platforms on 4.1, so no
   "iOS only" scoping caveat for any 4.1 behaviour.
10. **`kmp-sdk-models.mdx` still says `AdaptyPaywallProductSubscription`** and describes
    `hasViewConfiguration`. It was deliberately NOT edited — per the standing rule, `*-sdk-models.mdx`
    articles are unmaintained and the generated per-platform reference site is the real reference.
11. **The MMP-article tab gap is structural, not an oversight — established 2026-09-09.** Capacitor's
    point 11 recorded zero Capacitor tabs in adjust/appsflyer/branch/tenjin/attribution-integration and
    called it a pre-existing coverage gap. The same holds for KMP (zero `value="kmp"` in all five), and
    the *cause* is now known: **none of the four MMPs publishes a Kotlin Multiplatform SDK.** Checked
    their own GitHub orgs on 2026-09-09 via `gh api orgs/<org>/repos` — zero repos matching
    `kotlin|multiplatform|kmp|compose` in `adjust` (250 repos), `AppsFlyerSDK` (90), `BranchMetrics`
    (72), `tenjin` (42); each ships android/ios/flutter/react-native/unity/cordova wrappers and no KMP
    one. Every existing tab in those articles is backed by an official vendor wrapper
    (`react-native-adjust`, `adjust_sdk`, Adjust's Unity SDK), which is why there is no KMP tab to
    write: a KMP tab would require inventing an expect/actual bridge per vendor over their native
    SDKs, which fails the corpus rule on per-platform evidence.
    **Decision (user, 2026-09-09): scope limited to `attribution-integration.mdx`.** Its "Manual
    attribution" section needs no vendor SDK, so it gained Kotlin Multiplatform blocks for the
    attribution map and the `AdaptyExternalAttributionProvider.CUSTOM` call, plus the constant in the
    `provider` parameter bullet. That section uses titled code blocks (`title="Swift"`), not `<Tabs>` —
    the file imports `Tabs` but has no tab group — so the KMP examples follow that convention.
    The four MMP articles were deliberately left untouched. **Do not "fix" this by writing vendor
    bridging code for KMP or Capacitor** — re-check whether a vendor has shipped a KMP SDK first.
13. **`attribution-integration.mdx` § Manual attribution now covers all seven platforms** (user
    request, 2026-09-09, explicitly overriding the platform-branch scope rule for this one article).
    It was Swift-only before. Both steps — the attribution map and the `updateExternalAttribution`
    call — are now `<Tabs groupId="current-os" queryString>` groups with iOS (Swift), Android (Kotlin),
    React Native (TS), Flutter (Dart), Unity (C#), Kotlin Multiplatform and Capacitor.
    Per-platform truth as of this date, each verified rather than pattern-matched:
    - **Android / KMP**: `AdaptyExternalAttributionProvider.CUSTOM`.
    - **Unity**: `AdaptyExternalAttributionProvider.Custom`, and the attribution goes in as a
      **serialized JSON string** (only overload — see point 1), so the tab shows
      `JsonConvert.SerializeObject` with Newtonsoft, which Unity already requires.
    - **Capacitor**: `adapty.updateExternalAttribution({ attribution, provider: 'custom' })` — taken
      from the merged Capacitor canon in `migration-to-capacitor-sdk-v4.mdx`, not inferred.
    - **Flutter / React Native**: still the **old** `updateAttribution` with a plain string, because
      4.1 has not shipped for either (this table's own rows say flutter `in progress`, react-native
      `not started`). A `:::note` under the second tab group says so, following the version-scoped
      wording `appsflyer.mdx` already uses. **Delete that note and move both tabs to
      `updateExternalAttribution` when those platforms ship 4.1.**
    Indented `<Tabs>` inside an ordered-list item was verified to render, not merely parse: the page
    was served from a dev server and checked for leaked `&lt;Tabs`, `role="tablist"` groups, and
    intact step numbering. The pattern was already in production in `quickstart-products.mdx` (at
    8-space indent), `sdk-installation-react-native-expo.mdx` and `branch.mdx`.
12. `kmp-check-subscription-status.mdx` uses the v3 API (`getPaywall`, `createPaywallView`,
    `paywall.hasViewConfiguration`) with no `<SDKv3>`/`<SDKv4>` wrapper, unlike `kmp-get-pb-paywalls`
    which is properly dual-versioned. Pre-existing inconsistency, not 4.1 fallout — left alone.

### On the pre-code KMP assumptions file

`~/Documents/kmp-v4-api-assumptions.md` (2026-07-10) drove the pre-code v4 drafting. Now that real
code exists, its Conf-M call on `hasViewConfiguration` ("removed") is **confirmed wrong for 4.1** —
see point 4. Everything else touched by this pass held up: `updateExternalAttribution` shape, the
`AdaptyConfig.Builder` idiom, and the flow/paywall renames all match. The file has not been rewritten;
it stays a record of what was assumed, and this rollout entry is the correction.

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
