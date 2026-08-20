---
zone: sdk-flows-manual
sources: [android-sdk, flutter-sdk, ios-sdk, jscore, kmp-sdk, unity-sdk]
reviewed_shape:
reviewed_at:
---

## What this is

The "Implement paywalls manually" category of each platform SDK: fetching paywalls and products without the builder's presentation UI, implementing observer mode, and — notably — making purchases and restoring purchases. The actual store-transaction calls live here rather than in a zone of their own, regardless of whether the paywall shown alongside them came from Flow Builder or legacy remote config. It also covers reporting transactions in observer mode and troubleshooting purchase failures. Readers are developers who need custom UI control over the paywall, or who need the purchase/restore mechanics no matter how the paywall itself is displayed.

## Surfaces

## Sources of truth

`platforms.md` and `sources.md` hold the repo paths, `default_ref`s and per-platform version
state. This section says which *file inside* them answers which question, and deliberately
repeats no version numbers — those drift, and several already have since 2026-08-06.

- **"What is this method called, what does it take, what does it return, what must be called
  first" — the platform SDK repo, at a named ref.** Verified entry points: `ios-sdk`'s
  `Sources/`, where the async and callback forms of the same call live in *different* files
  (`getFlow` is declared in both `Sources/Placements/Adapty+Placements.swift:23` and
  `Sources/Adapty+Completion.swift:171`, so grepping one file misses an overload);
  `android-sdk`'s `adapty/src/main/java/com/adapty/Adapty.kt` for the public surface plus
  `com/adapty/utils/` for the wrapper types it takes; `flutter-sdk`'s `lib/src/adapty.dart`;
  `unity-sdk`'s `Packages/com.adapty.unity-sdk/Runtime/Adapty.cs` together with
  `Adapty.Overloads.cs`, which is where the shorter overloads are; `kmp-sdk`'s checked-in API
  dumps `adapty/api/adapty.klib.api` and `adapty/api/adapty.api` — the fastest exact-signature
  reference in the whole set. For React Native and Capacitor the `jscore` rule needs one
  refinement: the **argument shape** is in the wrapper (`src/adapty-handler.ts` for RN,
  `src/adapty.ts` + `src/types/adapty-plugin.ts` for Capacitor — RN's `reportTransaction` is
  positional, Capacitor's takes an options object), while the **bridge contract**, i.e. which
  parameters exist and which are required, is `cross_platform.yaml` in `jscore`. Do not grep
  `jscore`'s `src/` for a method name: `src/adapty-handler.ts` there is a five-line placeholder
  interface on `origin/master`, so the search comes back empty and reads as "this method
  doesn't exist."
- **Name the ref, not just the repo — a local clone is often on a stale or task-specific
  branch, and the answer changes between refs.** Worked example: `making-purchases`'s
  "In-app purchases from the App Store" section is written against `shouldAddStorePayment` and
  `AdaptyDeferredProduct`, and `git grep -l 'shouldAddStorePayment\|AdaptyDeferredProduct'
  origin/master` in `ios-sdk` returns **nothing at all** — while the same grep against
  `origin/release/4.1.0` returns eight files, carrying the feature under different names
  (`AdaptyDelegate.didReceivePromotedPurchase(_ product: AdaptyPromotedProduct)`,
  `Adapty.makePromotedPurchase`). One repo, two refs, two incompatible answers.
- **Observer mode and manual reporting: the SDK owns one half of the truth, the store owns the
  other.** The **SDK half** is whether the flag exists, what it switches off, and whether a
  call is refused — read in code, because the refusal is an internal error mapped to a
  different public name. Verified in `ios-sdk` `origin/master`:
  `Sources/StoreKit/TransactionManager.swift:117` (`guard !observerMode else { return
  .success(()) }` — the SDK stops syncing unfinished transactions) and
  `Sources/StoreKit/Entities/AdaptyUnfinishedTransaction.swift:18`, whose `finish()` throws
  `notAllowedInObserveMode`, which `Sources/Errors/InternalAdaptyError.swift:97` maps to the
  public `.cantMakePayments`. Grepping for the public name alone never finds the mechanism, and
  the mechanism is per-platform: the same grep for `cantMakePayments` over `android-sdk`
  `origin/master`'s `adapty/src/main/java` returns zero hits, as does `CANT_MAKE_PAYMENTS` and
  `1003`. The **store half** is what a valid transaction identifier *is* and who is responsible
  for finishing or acknowledging it — Google Play's `purchase.getOrderId()` on the Billing
  Library `Purchase`, Apple's StoreKit transaction (or its id). Adapty never mints these; the
  store does, and the store's own documentation is the reference for their shape, lifetime and
  acknowledgment deadlines. On a "we reported it and nothing arrived" ticket the SDK tells you
  whether the call was accepted, and only the store tells you whether the identifier was the
  right one to send.
- **Never infer a per-platform claim from the neighbouring platform's article** — seven
  near-identical files make "the iOS article says X" the cheapest and most dangerous inference
  available in this zone. Three verified traps: (1) `reportTransaction`'s first argument differs
  in *kind*, not just in name — iOS takes the StoreKit transaction object (and at 4.0.2 the
  public overloads are `StoreKit.Transaction` / `VerificationResult<Transaction>`, documented
  SK2-only, with the `String` overload `package`-scoped rather than public), Android takes
  `TransactionInfo.fromPurchase(purchase)` with `TransactionInfo.fromId(String)` also public
  (`adapty/src/main/java/com/adapty/utils/TransactionInfo.kt:24,33`), and Flutter, React
  Native, Unity, KMP and Capacitor all take a plain string id. (2) Unity's public surface is
  PascalCase (`Adapty.GetPaywall`, `Adapty.MakePurchase`, `Adapty.LogShowPaywall`), so a
  case-sensitive grep for `logShowPaywall` over this roster finds 6 of the 7
  `present-remote-config-paywalls` articles and makes
  `present-remote-config-paywalls-unity` look like it is missing the call — it isn't, it spells
  it `LogShowPaywall`. (3) Version state is not uniform across platforms (see `platforms.md`),
  and the corpus reflects that: `grep -c '<SDKv4>\|<SDKv3>'` across all 64 files hits only the
  six non-Unity `fetch-paywalls-and-products*` articles, the six non-Unity
  `present-remote-config-paywalls*` articles, and
  `android-present-paywall-builder-paywalls-in-observer-mode` —
  `fetch-paywalls-and-products-unity` carries `getPaywall` only. Whether a v4 API even exists
  for a platform is a fact to look up per platform, not a shape to copy.
- **Store- and dashboard-side prerequisites are not this zone's ground truth.** Product,
  paywall and placement configuration, store connection, and what observer mode *is* all belong
  to other zones and are linked out, not verified here — see the next section for the list.

## What we document, what we don't

The zone's delta from `scope.md`, not a restatement of it.

- **At depth: the Adapty call, its arguments, and its result — in each platform's own
  language.** `getFlow`/`getPaywall` plus `getPaywallProducts`, `makePurchase`,
  `restorePurchases`, `logShowPaywall`, `reportTransaction`, and the `observerMode` activation
  flag. That per-platform signature and its result handling is the entire reason seven copies of
  each family exist, and it is the one thing a per-platform article may never delegate.
- **We never write the reader's own purchase code.** Observer mode means they keep their
  StoreKit or Billing Library implementation, and every article stops at its edge. Verified
  absence, with the grep: `launchBillingFlow`, `acknowledgePurchase`, `consumeAsync`,
  `Product.purchase(`, `SKPaymentQueue` and `StoreKit.Product.purchase` match **zero** of the 64
  articles. The only representation of the reader's code anywhere in the zone is the placeholder
  identifier `yourBillingClient` — 15 files, one line each in the seven
  `implement-paywalls-manually` and seven `implement-observer-mode` pages, and ten occurrences in
  `android-present-paywall-builder-paywalls-in-observer-mode`. Keep it a stub: naming a real
  store API in one of these snippets invites the reader to treat our snippet as the supported
  call path, which is exactly the thing observer mode does not promise.
- **Store mechanics: document the knob Adapty exposes, link out for the semantics behind it.**
  `android-making-purchases` gives `AdaptySubscriptionUpdateParameters` and
  `withEnablePendingPrepaidPlans`, then hands replacement/proration-mode *meaning* to four
  developer.android.com links rather than restating Google's rules; `making-purchases` gives
  `presentCodeRedemptionSheet()` and links Apple for offer codes; `ios-transaction-management` —
  the one article that reaches furthest into the store — gives `appAccountToken`,
  `jwsTransaction` and `transactionFinishBehavior: .manual`, and links Apple for what a JWS
  actually is. Do state what breaks *in Adapty* when the reader gets the store part wrong; do
  not re-document the store.
- **Boundary against `sdk-flows-display`, expressed as what gets written.** Display owns
  everything that exists only because Adapty is doing the rendering: view creation and
  presentation, action and event callbacks, rendering errors, locale resolution, fallback files.
  This zone owns everything the reader must call because nothing is rendering for them. The
  clearest tell is that the same fact is written with opposite instructions on each side:
  `restore-purchase` opens by telling the reader that a builder-rendered flow restores
  automatically and they can skip the page, and `present-remote-config-paywalls` exists
  precisely because a hand-rendered paywall logs no impression, making `logShowPaywall`
  mandatory here and wrong there. So a fact that touches both paths gets written twice, once as
  "call this" and once as "the view does this for you" — never copied across as one paragraph.
  Fetching splits on the same line: `fetch-paywalls-and-products` is fetch-for-products,
  `get-pb-paywalls` is fetch-for-rendering. And because `ios-present-paywall-builder-paywalls-in-observer-mode`
  and the four `*-present-flows-in-observer-mode` articles sit in display while
  `android-present-paywall-builder-paywalls-in-observer-mode` sits here, any observer-mode change
  lands in both zones — check both before calling the work done.
- **What a per-platform article may omit because a shared article covers it.** Established by
  counting outbound links across all 64 files, most-linked first: `placements` (53),
  `adapty-paywall-builder` (41), `observer-vs-full-mode` (22), `quickstart` (21), `product` (20),
  `create-product` / `create-placement` / `create-paywall` (16 each), `initial-android` (13),
  `add-remote-config-locale` (13), then `test-purchases-in-sandbox` and the
  `sdk-installation-*` family. So dashboard product/paywall/placement setup, store connection,
  SDK installation, what observer mode *is* and when to choose it, remote-config localization,
  and sandbox testing are all linked and never restated. An article here that re-explains
  placements or re-lists the store setup steps is over-scoped, not thorough.
- **Only two pieces of text in this zone are shared rather than rewritten:** the `SampleApp.md`
  reusable (21 of 64 — every `fetch-paywalls-and-products`, `making-purchases` and
  `restore-purchase` article) and `OfferCodesInfo.mdx` (6, i.e. every `making-purchases` article
  except Android's, since offer codes are Apple-only). Everything else is deliberately
  re-written per platform, which is the correct reading of `scope.md`'s duplication rule here:
  the code differs on every platform, so a reusable would have nothing identical to hold. The
  Android omission is also the model for a platform-inapplicable topic — leave the section out
  rather than writing "not supported on Android."

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| fetch-paywalls-and-products | fetch-paywalls-and-products | fetch-paywalls-and-products-android | fetch-paywalls-and-products-react-native | fetch-paywalls-and-products-flutter | fetch-paywalls-and-products-unity | fetch-paywalls-and-products-kmp | fetch-paywalls-and-products-capacitor |
| implement-observer-mode | implement-observer-mode | implement-observer-mode-android | implement-observer-mode-react-native | implement-observer-mode-flutter | implement-observer-mode-unity | implement-observer-mode-kmp | implement-observer-mode-capacitor |
| implement-paywalls-manually | ios-implement-paywalls-manually | android-implement-paywalls-manually | react-native-implement-paywalls-manually | flutter-implement-paywalls-manually | unity-implement-paywalls-manually | kmp-implement-paywalls-manually | capacitor-implement-paywalls-manually |
| making-purchases | making-purchases | android-making-purchases | react-native-making-purchases | flutter-making-purchases | unity-making-purchases | kmp-making-purchases | capacitor-making-purchases |
| present-paywall-builder-paywalls-in-observer-mode |  | android-present-paywall-builder-paywalls-in-observer-mode |  |  |  |  |  |
| present-remote-config-paywalls | present-remote-config-paywalls | present-remote-config-paywalls-android | present-remote-config-paywalls-react-native | present-remote-config-paywalls-flutter | present-remote-config-paywalls-unity | present-remote-config-paywalls-kmp | present-remote-config-paywalls-capacitor |
| quickstart-manual | ios-quickstart-manual | android-quickstart-manual | react-native-quickstart-manual | flutter-quickstart-manual | unity-quickstart-manual | kmp-quickstart-manual | capacitor-quickstart-manual |
| report-transactions-observer-mode | report-transactions-observer-mode | report-transactions-observer-mode-android | report-transactions-observer-mode-react-native | report-transactions-observer-mode-flutter | report-transactions-observer-mode-unity | report-transactions-observer-mode-kmp | report-transactions-observer-mode-capacitor |
| restore-purchase | restore-purchase | android-restore-purchase | react-native-restore-purchase | flutter-restore-purchase | unity-restore-purchase | kmp-restore-purchase | capacitor-restore-purchase |
| transaction-management | ios-transaction-management |  |  |  |  |  |  |
| troubleshoot-purchases | ios-troubleshoot-purchases | android-troubleshoot-purchases | react-native-troubleshoot-purchases | flutter-troubleshoot-purchases | unity-troubleshoot-purchases | kmp-troubleshoot-purchases |  |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-implement-paywalls-manually | entry | dev | 2 | android |
| android-making-purchases | — | dev | 3 | android |
| android-present-paywall-builder-paywalls-in-observer-mode | — | dev | 0 | android |
| android-quickstart-manual | — | dev | 7 | android |
| android-restore-purchase | — | dev | 1 | android |
| android-troubleshoot-purchases | — | dev | 6 | android |
| capacitor-implement-paywalls-manually | entry | dev | 2 | capacitor |
| capacitor-making-purchases | — | dev | 4 | capacitor |
| capacitor-quickstart-manual | — | dev | 8 | capacitor |
| capacitor-restore-purchase | — | dev | 0 | capacitor |
| fetch-paywalls-and-products | — | dev | 7 | ios |
| fetch-paywalls-and-products-android | — | dev | 6 | android |
| fetch-paywalls-and-products-capacitor | — | dev | 6 | capacitor |
| fetch-paywalls-and-products-flutter | — | dev | 6 | flutter |
| fetch-paywalls-and-products-kmp | — | dev | 6 | kmp |
| fetch-paywalls-and-products-react-native | — | dev | 6 | react-native |
| fetch-paywalls-and-products-unity | — | dev | 6 | unity |
| flutter-implement-paywalls-manually | entry | dev | 2 | flutter |
| flutter-making-purchases | — | dev | 4 | flutter |
| flutter-quickstart-manual | — | dev | 8 | flutter |
| flutter-restore-purchase | — | dev | 0 | flutter |
| flutter-troubleshoot-purchases | — | dev | 6 | flutter |
| implement-observer-mode | — | dev | 2 | ios |
| implement-observer-mode-android | — | dev | 2 | android |
| implement-observer-mode-capacitor | — | dev | 2 | capacitor |
| implement-observer-mode-flutter | — | dev | 2 | flutter |
| implement-observer-mode-kmp | — | dev | 2 | kmp |
| implement-observer-mode-react-native | — | dev | 2 | react-native |
| implement-observer-mode-unity | — | dev | 2 | unity |
| ios-implement-paywalls-manually | entry | dev | 2 | ios |
| ios-quickstart-manual | — | dev | 7 | ios |
| ios-transaction-management | — | dev | 3 | ios |
| ios-troubleshoot-purchases | — | dev | 3 | ios |
| kmp-implement-paywalls-manually | entry | dev | 2 | kmp |
| kmp-making-purchases | — | dev | 4 | kmp |
| kmp-quickstart-manual | — | dev | 8 | kmp |
| kmp-restore-purchase | — | dev | 0 | kmp |
| kmp-troubleshoot-purchases | — | dev | 5 | kmp |
| making-purchases | — | dev | 3 | ios |
| present-remote-config-paywalls | — | dev | 4 | ios |
| present-remote-config-paywalls-android | — | dev | 4 | android |
| present-remote-config-paywalls-capacitor | — | dev | 4 | capacitor |
| present-remote-config-paywalls-flutter | — | dev | 4 | flutter |
| present-remote-config-paywalls-kmp | — | dev | 4 | kmp |
| present-remote-config-paywalls-react-native | — | dev | 4 | react-native |
| present-remote-config-paywalls-unity | — | dev | 4 | unity |
| react-native-implement-paywalls-manually | entry | dev | 2 | react-native |
| react-native-making-purchases | — | dev | 4 | react-native |
| react-native-quickstart-manual | — | dev | 7 | react-native |
| react-native-restore-purchase | — | dev | 0 | react-native |
| react-native-troubleshoot-purchases | — | dev | 6 | react-native |
| report-transactions-observer-mode | — | dev | 0 | ios |
| report-transactions-observer-mode-android | — | dev | 0 | android |
| report-transactions-observer-mode-capacitor | — | dev | 0 | capacitor |
| report-transactions-observer-mode-flutter | — | dev | 0 | flutter |
| report-transactions-observer-mode-kmp | — | dev | 0 | kmp |
| report-transactions-observer-mode-react-native | — | dev | 0 | react-native |
| report-transactions-observer-mode-unity | — | dev | 0 | unity |
| restore-purchase | — | dev | 0 | ios |
| unity-implement-paywalls-manually | entry | dev | 2 | unity |
| unity-making-purchases | — | dev | 4 | unity |
| unity-quickstart-manual | — | dev | 8 | unity |
| unity-restore-purchase | — | dev | 0 | unity |
| unity-troubleshoot-purchases | — | dev | 6 | unity |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **sdk-flows-display** — is the ticket about presenting a Flow-Builder flow with the SDK's own UI (sdk-flows-display), or about fetching data for custom UI, or making/restoring a purchase (sdk-flows-manual)? Purchase and restore questions always route here even when the surrounding paywall is a Flow Builder flow.
- **flow-design / flow-logic** — is this about the dashboard builder that designed the paywall, or about the app-side manual-implementation/purchase code? The builder is flow-design/flow-logic; manual fetch/purchase code is sdk-flows-manual.
- **paywalls-legacy** — is the ticket about configuring a legacy remote-config paywall on the dashboard (paywalls-legacy), or about the app code that fetches and renders it (sdk-flows-manual)?
- **server-side-api** — is access being granted or checked from the developer's own backend via the Server-Side API (server-side-api), or from inside the app via the SDK's purchase/restore/observer-mode calls (sdk-flows-manual)?

## Ticket language

Rows name a **family**, not a platform article — the roster above expands each one across the seven
platforms. Corpus-wide synonyms (purchase ↔ `makePurchase`, restore ↔ `restorePurchases`, remote
config ↔ custom JSON, access level ↔ entitlement) live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "build our own paywall screen", "DIY paywall", "we're not using the no-code builder", "full control over layout" | Split by what's being asked: `implement-paywalls-manually` is only the per-platform index page; the end-to-end walkthrough a developer actually needs is `quickstart-manual`. Route "how do I do it" to `quickstart-manual`. |
| "which call fetches the paywall", "don't hardcode product IDs", "localized price and title fields", "intro-offer phases", "cache vs reload", "load timeout" | `fetch-paywalls-and-products`. The entry point is version-bounded — `getFlow` in v4 SDKs, `getPaywall` in v3 — and fetch policy (`returnCacheDataElseLoad` vs reload-revalidating) is the answer to most "slow"/"stale" phrasings. |
| "everyone sees the same paywall", "audience targeting stopped working", "fetch is slow with many audiences" | `fetch-paywalls-and-products`, the `getFlowForDefaultAudience` section — and this row exists because the phrasing looks like a targeting bug. That method trades targeting for fetch speed *by design*: it always returns the **All Users** flow, so custom attributes, country and attribution targeting all stop applying, and it carries a backward-compatibility caveat for older app versions. Rule out this call before treating it as a placements or audiences question. |
| "paywall views are zero", "impressions not counted on our custom screen" | `present-remote-config-paywalls`. A hand-rendered paywall logs nothing on its own — the explicit `logShowPaywall` call is required. This is the mirror image of the double-counting bug in sdk-flows-display, where the same call is the *cause*. |
| "different copy per language on a custom paywall", "remote config per locale" | `present-remote-config-paywalls` — with manual rendering the app picks the matching locale's remote config itself; there is no automatic locale resolution as there is for builder-rendered flows. |
| "upgrade/downgrade/cross-grade a subscription", "switch plan mid-purchase", "proration mode", "prepaid plan stuck pending" | `making-purchases`. All of these are Android-only Google Play mechanics (replacement/proration mode, subscription-group change) even though they're documented in the shared family. |
| "redeem a promo code", "offer code redemption sheet does nothing" | `making-purchases`, iOS. The redemption sheet being unreliable is a documented caveat, not a bug to file. |
| "Ask to Buy", "family-sharing approval", "purchase pending parental approval" | `making-purchases`, iOS — a deferred purchase completes later, so the callback timing differs from a normal purchase. |
| "app rejected for not checking offer eligibility", "intro offer wasn't applied" | Split by cause: the eligibility fields come from `fetch-paywalls-and-products`; applying the offer at purchase time is `making-purchases`. |
| "restore button", "lost the subscription after reinstalling", "no access on a new device", "App Store requires a restore button" | `restore-purchase`. Worth stating up front: there is nothing to implement if the flow is builder-rendered — restore is built into it, so this only matters for custom UI. |
| "purchase succeeded but access level didn't update", "user charged twice", "makePurchase fired multiple times", "Billing unavailable / response code 3", "sandbox purchase stuck" | `troubleshoot-purchases` (no Capacitor article exists — say so rather than guessing a target). |
| "cantMakePayments", "makePurchase does nothing", "purchase silently refused" | `troubleshoot-purchases` for the symptom; `cantMakePayments` in `sdk-errors-events` for the error. **Observer mode is a genuine cause on iOS, alongside device restrictions** — `Sources/Adapty.swift` builds `purchaser` only `if !observerMode`, and `makePurchase` opens with `guard let purchaser = sdk.purchaser else { throw .cantMakePayments() }`, so observer mode plus `makePurchase` raises 1003 through a nil collaborator rather than a named observer-mode error. A "correction" on 2026-08-11 removed this claim after grepping only for `notAllowedInObserveMode`; that grep tests one mechanism, not the claim, and the claim was right. Android's enum has no `CANT_MAKE_PAYMENTS`, so don't carry the code across platforms. |
| "keep our existing IAP code and just get Adapty analytics", "partial integration", "SDK won't finish/close transactions" | `implement-observer-mode` for the setup and the constraint; the mandatory follow-up call is `report-transactions-observer-mode`. A ticket that stops at the first article is usually the reason transactions later go missing. |
| "observer-mode purchases missing from analytics", "purchase not attributed to the A/B variation" | `report-transactions-observer-mode`. Reporting is not optional, the paywall variation must be passed explicitly to get attribution, and older Android SDKs need an extra `restorePurchases` call. |
| "observer mode but we still want Adapty's UI" | Android only in this zone: `android-present-paywall-builder-paywalls-in-observer-mode`. Every other platform's version of this article sits in sdk-flows-display — check there before concluding it doesn't exist. |
| "link a StoreKit transaction to our own user ID", "`appAccountToken`", "validate the receipt on our backend", "delay finishing the transaction" | `transaction-management` — iOS-only (`ios-transaction-management`); no sibling exists on the other platforms. |

## Gaps and misses

