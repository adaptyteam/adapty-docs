---
zone: testing-and-release
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Everything about verifying purchases before they're real and getting a subscription app through store review: sandbox/test-purchase mechanics (test devices, StoreKit local testing, sandbox testing on both stores), the per-platform SDK `<platform>-test` articles for exercising the SDK in a test build, troubleshooting and validating failed test purchases, and the store-submission process itself (App Store / Google Play review prep, submission steps, the release checklist). Readers are developers in the final stretch before shipping — confirming purchases and restores actually work in a sandbox, or navigating store review requirements. It sits downstream of SDK integration: nothing here changes how the SDK behaves, only how it's exercised, verified, and shipped.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-test | — | dev | 2 | android |
| app-store-test | entry | dev | 0 | tutorial |
| capacitor-test | entry | dev | 2 | capacitor |
| flutter-test | — | dev | 2 | flutter |
| ios-test | — | dev | 2 | ios |
| kids-mode-capacitor | — | dev | 6 | capacitor |
| kmp-test | — | dev | 2 | kmp |
| local-sk-files | — | dev | 4 | tutorial |
| prepare-your-app-for-store-review | — | dev | 17 | tutorial |
| react-native-test | — | dev | 2 | react-native |
| release-checklist | — | dev | 3 | tutorial |
| submit-app-to-app-store | — | dev | 8 | tutorial |
| test-devices | — | dev | 5 | tutorial |
| test-purchases-in-sandbox | — | dev | 19 | tutorial |
| testing-on-android | — | dev | 7 | tutorial |
| troubleshooting-test-purchases | — | dev | 6 | tutorial |
| unity-test | — | dev | 2 | unity |
| validate-test-purchases | — | dev | 2 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **apple-platform / google-platform** — is the ticket about configuring Adapty's connection to App Store Connect / Google Play Console (server notifications, service accounts, in-app purchase keys — store-side plumbing), or about testing/submitting the app itself? Store-account plumbing is apple-platform/google-platform; sandbox testing and submission steps are testing-and-release.
- **sdk-flows-manual** — is the issue a purchase/restore bug in the SDK's own implementation (sdk-flows-manual), or a problem specific to the sandbox/test environment (a sandbox account quirk, a StoreKit config file issue)? Test-environment mechanics are testing-and-release.
- **app-and-account-settings** — is the ticket about entering store credentials into the Adapty dashboard (app-and-account-settings), or about using those credentials to test purchases or submit to a store (testing-and-release)?

## Ticket language

Almost every ticket here arrives as a **symptom**, and the routing value is in decoding it. Settle the
three lookalike ids first: `validate-test-purchases` is the short yes/no gate (did the transaction reach
the Event Feed, allow 10 minutes); `troubleshooting-test-purchases` is the symptom list for when it
didn't; `test-purchases-in-sandbox` is the iOS how-to **plus** everything about how the sandbox
environment itself behaves (resetting a tester, renewal speed, offer eligibility). The per-platform
`ios-test` / `android-test` / `flutter-test` / `react-native-test` / `unity-test` / `kmp-test` /
`capacitor-test` articles are thin routers — two sections that point at the shared guides and
`release-checklist`. A ticket almost never *belongs* to them; they change only when the shared guides do.
Corpus-wide synonyms live in `aliases.md` and aren't repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "test purchase not showing up", "sandbox transaction missing from the dashboard", "is Adapty receiving transactions" | Two steps, not one article: `validate-test-purchases` for the Event Feed check (wait 10 minutes before calling it broken), then `troubleshooting-test-purchases`. Don't route these to `test-purchases-in-sandbox`. |
| "purchase succeeded in the app but nothing arrives" | `troubleshooting-test-purchases`. Four causes, in this order: iOS simulator instead of a real device; bundle ID / package name not matching **App settings**; `PUBLIC_SDK_KEY` not matching the dashboard; or a local StoreKit configuration file still in the build — StoreKit-local purchases never reach Adapty at all. |
| "sandbox purchases don't appear in the charts", "revenue is zero while testing" | Not a bug: the shared SandboxExclusion note carried by `test-purchases-in-sandbox` and `testing-on-android`. Sandbox transactions are excluded from every analytics chart; they show only on the profile page and in the Event Feed. |
| "revoke doesn't stick", "tester keeps getting access back after I deleted the profile", "how do I reset a tester" | `test-purchases-in-sandbox` → *Resetting a tester's subscription*. The purchase belongs to the **Apple sandbox account**, not the Adapty profile, so deleting the profile, backdating the expiration date, and the Revoke access level API are all re-overridden by the next sandbox renewal. Only cancelling the subscription in the sandbox account, or a fresh sandbox account, is durable. |
| "renewals are far too fast", "subscription expired in five minutes", "renewals just stopped" | `test-purchases-in-sandbox` → *Test subscriptions*. Sandbox compresses renewals (1 week → 3 min, 1 month → 5 min) and caps them at 12. It's for exercising renewal / billing-retry / grace-period handling, never for predicting production timing. |
| "trial eligibility is wrong on the second run", "tester is treated as already having used the intro offer" | `test-purchases-in-sandbox` → *Test offers*. Eligibility is receipt-driven, so a reused sandbox account carries the old receipts. Fresh account, or clear purchase history first. |
| "TestFlight purchase history is dirty", "can't clear purchase history" | `test-purchases-in-sandbox` → *TestFlight issues*. Opening the TestFlight build even once before signing into the sandbox account pins the history to the production Apple Account, and it can't be cleared from there. Reinstall and redo the account switch. |
| "profile has an access level but no events" | `troubleshooting-test-purchases`. Expected: a reinstall or logout creates a non-original profile; the event history stays on the profile that made the first transaction. |
| "prices are wrong in sandbox", "timestamps off by hours", "paywall takes forever to load while testing" | All three are `troubleshooting-test-purchases`, and all three are environment artefacts: Apple's sandbox API returns unreliable prices across regions (test the flow, not the numbers); the Event Feed renders in the **Reporting timezone** from App settings; slow loads mean a sandbox account with a long transaction history. |
| "dashboard changes aren't reaching my device", "force fresh config", "mark my QA phone" | `test-devices` — marking a device disables caching. Watch the version floor: iOS 2.11.1 / Android 2.11.3 / React Native 2.11.1, and the article still lists Flutter and Unity as unsupported. |
| "test purchases without a sandbox account", "simulate a refund or a cancelled payment", "test on the simulator" | `local-sk-files`. Purely local: nothing reaches the Adapty dashboard, so it cannot validate profile or identification logic, and the product ID must match the **App Store product ID** set in Adapty. `app-store-test` exists only to route between this and sandbox. |
| "Android testers can't buy", "products don't load for testers", "cryptic *Something went wrong* on subscribe" | `testing-on-android`. Three concrete causes: the tester never opened the opt-in link (products silently don't load), the test build uses a different application ID than the Play listing, or the device has no PIN — which blocks subscriptions but not consumables. Also note the primary Google account on a device can only be changed by a factory reset. |
| "app rejected", "price mismatch rejection", "dark pattern / manipulative paywall", "alternative billing eligibility", "how do I appeal" | `prepare-your-app-for-store-review`. It also holds the Google Play first-publish gate — 12 testers for 14 consecutive days — which is a schedule constraint to plan around, not something to fix in code. |
| "COPPA", "Kids Category rejection", "strip AdSupport / the AD_ID permission" | `kids-mode-capacitor` — the outlier in this roster: an SDK-configuration article that sits here because it's framed as passing store review. The iOS and Android siblings live outside this zone; check them before treating this as Capacitor-only work. |
| "how do I actually ship it", "attach subscriptions to the app version", "stuck waiting on Apple" | `submit-app-to-app-store` (upload, attach products — each needs **Ready to Submit** — submit, then verify production events). `release-checklist` is the pre-submission sign-off that runs before it, and is the one article that splits its guidance by implementation style (builder / `makePurchase` / observer mode). |

## Gaps and misses

