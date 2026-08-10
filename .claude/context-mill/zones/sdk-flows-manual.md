---
zone: sdk-flows-manual
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The "Implement paywalls manually" category of each platform SDK: fetching paywalls and products without the builder's presentation UI, implementing observer mode, and — notably — making purchases and restoring purchases. The actual store-transaction calls live here rather than in a zone of their own, regardless of whether the paywall shown alongside them came from Flow Builder or legacy remote config. It also covers reporting transactions in observer mode and troubleshooting purchase failures. Readers are developers who need custom UI control over the paywall, or who need the purchase/restore mechanics no matter how the paywall itself is displayed.

## Surfaces

## Sources of truth

## What we document, what we don't

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
| android-restore-purchase | — | dev | 0 | android |
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
| fetch-paywalls-and-products-unity | — | dev | 3 | unity |
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
| present-remote-config-paywalls-unity | — | dev | 2 | unity |
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
| unity-quickstart-manual | — | dev | 7 | unity |
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
| "cantMakePayments", "makePurchase does nothing", "purchase silently refused" | `troubleshoot-purchases` — the usual cause is observer mode being on, where the SDK deliberately refuses to run the purchase. Not a store or configuration failure. |
| "keep our existing IAP code and just get Adapty analytics", "partial integration", "SDK won't finish/close transactions" | `implement-observer-mode` for the setup and the constraint; the mandatory follow-up call is `report-transactions-observer-mode`. A ticket that stops at the first article is usually the reason transactions later go missing. |
| "observer-mode purchases missing from analytics", "purchase not attributed to the A/B variation" | `report-transactions-observer-mode`. Reporting is not optional, the paywall variation must be passed explicitly to get attribution, and older Android SDKs need an extra `restorePurchases` call. |
| "observer mode but we still want Adapty's UI" | Android only in this zone: `android-present-paywall-builder-paywalls-in-observer-mode`. Every other platform's version of this article sits in sdk-flows-display — check there before concluding it doesn't exist. |
| "link a StoreKit transaction to our own user ID", "`appAccountToken`", "validate the receipt on our backend", "delay finishing the transaction" | `transaction-management` — iOS-only (`ios-transaction-management`); no sibling exists on the other platforms. |

## Gaps and misses

