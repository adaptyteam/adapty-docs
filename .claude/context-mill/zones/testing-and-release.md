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

The unusual thing about this zone is that **most of what it asserts is owned by Apple and Google, not by
Adapty** — so a store-side change silently invalidates our doc with no commit anywhere in Adapty's repos
to trigger a review. Split every claim by owner before verifying it.

- **Store-owned, no registered source.** Sandbox renewal compression and the 12-renewal cap, billing-retry
  and grace-period lengths, what a sandbox or licence-tester account can do, Clear Purchase History,
  TestFlight's account pinning, the Google Play first-publish gate (12 testers / 14 consecutive days),
  alternative-billing eligibility, and every review-guideline restatement in
  `prepare-your-app-for-store-review` are store behaviour. The only ground truth is the vendor page the
  article already links; there is no Adapty artefact to diff and nothing in `sources.md` covers them.
  Treat the numbers in `test-purchases-in-sandbox`'s renewal table and the policy claims in
  `prepare-your-app-for-store-review` as re-read-the-vendor-page tasks, never as code-verification tasks.
- **Adapty-owned, all three in `dashboard-backend`.** These are the claims a task *can* verify:
  - **What the Event Feed reflects.** It is the integration-event stream, not a raw transaction log:
    `src/portal/integration_context/infrastructure/ports/http/event_feed.py` serves `IntegrationEvent`
    at `<app_id>/event_feed/`, and its serializer exposes `environment` with exactly `Production` and
    `Sandbox` plus per-integration send statuses. So `validate-test-purchases`'s yes/no gate is really
    "did an integration event get created for this transaction", which is what the 10-minute wait is for.
  - **Sandbox exclusion from charts is structural, not a chart filter.**
    `src/portal/analytics_context/domain/enums/environment.py` declares an `Environment` enum with a
    single member, `PRODUCTION = 'Production'`; the scheduled ClickHouse loaders
    (`migrate_transactions_to_clickhouse.py`, `migrate_profiles_to_clickhouse.py`) pass it, and the ETL
    SQL filters `pe.environment = {environment}`. Sandbox rows never enter the analytics store, so there
    is nothing to un-filter — which is why the `SandboxExclusion` reusable can state it absolutely.
  - **Test-device identifier types** are the enum in `src/common/enums/profile_test_user_type.py`
    (`profile_id`, `customer_user_id`, `idfa`, `idfv`, `advertising_id`, `android_id`) — the authority for
    `test-devices`'s identifier tables, and the reason there are six and not more.
- **The revoke claim is backend behaviour and it is defined in exactly one place.**
  `src/sdk/purchase_context/applications/transaction.py`, in `_revoke_access_level`, does not mark
  anything revoked: it builds a synthetic in-memory transaction through `TemporaryTransactionService`
  (`transaction_id=None`) that reuses the profile's `vendor_original_transaction_id`, sets
  `expires_at_date` to the revoke time and `cancellation_reason` to `ADAPTY_REVOKED`, then re-derives the
  access level from that chain. Any later real store transaction on the same chain re-derives it upward —
  that is the whole mechanism, and it is not sandbox-specific. The dashboard's **Add access level** with
  an earlier expiry is not a second mechanism: `src/api/views/profiles.py` routes it into the same
  `revoke_access_level` call. Cite this module, not `test-purchases-in-sandbox`, whenever a task turns on
  revoke durability — and note that `server-side-api-spec` documents only *when* access expires
  (`revokeAccessLevel`, `RevokeAccessRequest.revoke_at`), never that the expiry can be overridden.
- **Version floors for test devices live in the SDK repos, not here and not in the dashboard.** The gate
  is client-side: the SDK bypasses the CDN cache only by appending `disable_cache` when the profile comes
  back `is_test_user` — iOS `Sources/Backend/Backend.QueryItems.swift` fed by
  `disableServerCache: isTestUser` in `Sources/Placements/Adapty+Placements.swift`, Android
  `adapty/src/main/java/com/adapty/internal/data/cloud/Request.kt`. The authoritative minimum per platform
  is therefore the SDK release that shipped that call, read from the platform's own source in
  `sources.md` (`ios-sdk`, `android-sdk`, `jscore`, …) — never from the numbers currently in
  `test-devices`.
- TODO(owner): `test-devices` says "Flutter and Unity support will be added later". `is_test_user` is now
  present on all seven platforms' profile models and the cache bypass is implemented in the native iOS
  and Android layers that the wrappers reuse, so that line looks stale — but wrapper coverage was not
  established end-to-end in this pass. Confirm per platform before editing or repeating it.
- TODO(owner): `sources.md` has no entry for Apple's or Google's developer documentation, which is the
  ground truth for the majority of this zone. Should the two store doc sets be registered as `remote`
  sources so a task here has something citable, or is "re-read the linked vendor page" the standing rule?

## What we document, what we don't

- **We restate a lot of Apple's and Google's testing setup, and the asymmetry in how much is the actual
  rule.** `test-purchases-in-sandbox` restates Apple's whole eight-step flow (create the sandbox account,
  enable Developer Mode, sign out of Media & Purchases, Clear Purchase History, build, buy) and copies
  Apple's renewal-compression table verbatim. `testing-on-android` restates Play Console's opt-in-track
  setup but only *links* Google's renewal-period table. What earns the restatement is a step whose
  failure mode is Adapty-visible: opening the TestFlight build before switching accounts, or never
  opening the opt-in link, produces a symptom the reader brings to us ("nothing in the Event Feed"), so
  the step has to sit in place and in order next to that symptom. What doesn't earn it is a number or
  policy the reader never debugs against Adapty. The test is whether a wrong answer opens an Adapty
  support ticket or a store support ticket.
- **`prepare-your-app-for-store-review` restates policy rather than procedure, and says so in its own
  intro.** Its scope is the IAP-shaped subset of the two guideline sets — paywall transparency, price
  consistency across listing and app, restore and immediate-access guarantees, payment-method rules —
  plus the Play first-publish gate. It is not a mirror of the guidelines and must not grow into one: a
  requirement earns a place only if a paywall or subscription implementation can violate it.
- **The seven per-platform articles are routers and must stay routers.** `ios-test`, `android-test`,
  `flutter-test`, `react-native-test`, `unity-test`, `kmp-test` and `capacitor-test` are 18–21 lines
  each, two headings ("Test your app", "Prepare for release"), and nothing but pointers to
  `test-purchases-in-sandbox` and/or `testing-on-android` plus `release-checklist`. Their only job is
  making this zone reachable from a platform sidebar — a Flutter reader never sees `tutorial.json`, so
  without them the shared guides are unreachable from where that reader is. Never add per-platform
  testing steps: sandbox mechanics belong to the store and are identical across wrappers. They change
  only when a shared guide is renamed or split. `app-store-test` is the same shape for a single fork
  (sandbox vs. `local-sk-files`).
- **We document the sandbox-exclusion guarantee, not the pipeline behind it.** The reader gets the
  contract — excluded from every analytics chart, still visible on the profile page and in the Event Feed
  — and nothing about the ClickHouse loader that produces it (see *Sources of truth*). Same rule as
  elsewhere in the corpus: publish the observable contract, not the mechanism.
- **Boundary with access-levels and server-side-api, stated as what gets written.**
  `test-purchases-in-sandbox`'s *Resetting a tester's subscription* table is the sandbox-scoped write-up
  of a backend behaviour that is not sandbox-scoped at all. Keep it sandbox-scoped here anyway: the
  framing that makes it useful ("renews every few minutes", "use a fresh sandbox account") is exactly
  what makes it wrong to cite for a live customer. The production-facing answer — a real subscriber whose
  revoked or backdated access returns at the next renewal — belongs with the features that offer the
  buttons: give-access-level-to-specific-customer in the access-levels zone for the dashboard path, and
  the `revokeAccessLevel` operation description in `adapty-api.yaml` in the server-side-api zone for the
  API path. Do not write it here, and do not let this table be quoted as the general answer.
  **Tested, not assumed:** the behaviour is currently stated nowhere else —
  `grep -rn -iE "next renewal|re-activat|reactivat|overrid" src/content/docs` returns access-level hits
  only at lines 281, 282 and 292 of `test-purchases-in-sandbox.mdx`, and
  `give-access-level-to-specific-customer.mdx` contains no occurrence of "revoke" at all.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-test | — | dev | 2 | android |
| app-store-test | entry | dev | 0 | tutorial |
| capacitor-test | entry | dev | 2 | capacitor |
| flutter-test | — | dev | 2 | flutter |
| ios-test | — | dev | 2 | ios |
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
| "COPPA", "Kids Category rejection", "strip AdSupport / the AD_ID permission" | **Not this zone — corrected 2026-08-11.** `kids-mode-capacitor` used to be misfiled here while its six siblings sat in `sdk-users-access`; it was moved there, so the whole Kids Mode family is now in one place and this roster no longer contains it. Route these tickets to `sdk-users-access`. Store review only enters it as the *reason* someone reaches for Kids Mode, which is why the article once looked like it belonged here. |
| "how do I actually ship it", "attach subscriptions to the app version", "stuck waiting on Apple" | `submit-app-to-app-store` (upload, attach products — each needs **Ready to Submit** — submit, then verify production events). `release-checklist` is the pre-submission sign-off that runs before it, and is the one article that splits its guidance by implementation style (builder / `makePurchase` / observer mode). |

## Gaps and misses

