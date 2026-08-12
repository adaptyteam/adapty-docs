---
zone: apple-platform
sources: [dashboard-backend, dashboard-interface]
reviewed_shape:
reviewed_at:
---

## What this is

Store- and account-side setup on Apple's own consoles needed to sell through the App Store: initial App
Store Connect configuration and connection, generating the in-app purchase key, enabling App Store
server notifications, App Store product/offer references, and Apple-specific policy pages (Small
Business Program, App Privacy, Family Sharing) plus a troubleshooting article for common connection
failures. This is one-time-or-occasional account/console configuration on Apple's side, not iOS SDK code
and not the Adapty Dashboard's own settings.

## Surfaces

## Sources of truth

**The defining fact of this zone: most of what it claims belongs to Apple, and Apple changes it without
telling us.** `sources.md` registers eleven Adapty clones and five in-repo specs, and **not one of them
can verify a claim about App Store Connect.** For the Apple-owned half there is no ground truth an agent
can grep; the only check is a re-read of Apple's own page, and the only honest record is "confirmed
against \<Apple URL\> on \<date\>". Never promote an Apple-side claim to verified because a sibling
article states it, because a screenshot in `src/assets/shared/img/` shows it, or because it has sat in
the docs for two years. Console screenshots are the fastest-rotting asset in this zone and nothing in CI
notices when they go stale.

- **Apple-owned claim classes — unverifiable from any registered source.** Console layout and navigation
  paths (**Users and Access → Integrations**, tab names, whether a section is visible to an Admin);
  which key types exist and where each is generated; enrollment and agreement mechanics (Developer
  Program, D-U-N-S, Paid Applications Agreement, banking/tax); App Store Server Notification payload
  shape and the V1/V2 split; review policy and privacy-questionnaire wording; Small Business Program
  eligibility and its fiscal-period timing; `in_app_ownership_type` semantics for Family Sharing;
  whether one downloaded `.p8` may legitimately serve two roles. A task that changes any of these cites
  Apple, not a repo — and dates the citation.
- **Adapty-owned claim classes live in `dashboard-backend`, and there they are precise.** What we do
  with a key: **three independent ES256 signers, not one** — corrected 2026-08-12; the previous "single
  ES256 signer" wording was wrong, disproved by `git grep -n ES256 origin/develop -- 'src/*'` plus a
  caller grep for each class. (a) `share/ddd_components/applications/services/generate_app_store_connect_token.py`
  (`GenerateAppStoreConnectToken`) is the shared one, and its only production caller is product push,
  `portal/in_app_context/applications/app_store_token_app.py`, which passes the App Store Connect API
  (Team) key trio and no `bid` — so 19 min. Its `SERVER_API_TOKEN_LIFETIME` 59-min-plus-`bid` branch is
  real but reached only by that module's own unit test; no production code passes `bid`. (b) The App
  Store **Server** API is signed by a *separate* class that does not import (a):
  `sdk/purchase_context/applications/services/transaction/app_store/generate_token_for_app_store_server_api.py`
  (`GenerateTokenForAppStoreServerAPIService`) — **30 min**, with `nonce` *and* `bid` — and this is what
  refund, transaction V2, manual validation, and the App serializer actually call. (c) A third,
  `GenerateAppStoreServerAPITokenService` in
  `portal/analytics_context/applications/services/app_store_connect_auth.py`, is named for the Server API
  but signs 19 min with no `bid`, and serves the analytics-side App Store Connect adapter. So "the Server
  API token lives 59 min" is wrong on the live path, and a task touching lifetimes must name which
  signer. Where
  notifications land: `sdk/purchase_context/infrastructure/ports/http/app_store_notification_webhook.py`,
  which resolves the app from the token in the URL (`App.apple_subscription_status_token`, unique),
  auto-detects V1 vs V2 from the payload format, and returns `200` unconditionally — including for an
  unrecognised token. What the dashboard shows: the App model in `api/models/analytics.py` and its
  serializer gates in `api/serializers/analytics.py`. Refund Saver decisioning:
  `sdk/purchase_context/applications/app_store/app_store_refund.py`. Product/price push against Apple:
  `portal/in_app_context/infrastructure/adapters/external/appstore_products/`. Dashboard labels and
  section headings: `dashboard-interface`, `apps/web/src/pages/settings-section/ios-sdk-setting/`.
- **The credentials are this zone's sharpest trap: four distinct Apple artifacts, and the naming
  collides in three directions.** Settle which is which from the code and `dashboard-interface`, never
  from an article. (1) **In-App Purchase key** — Issuer ID + Key ID + `.p8`, article Steps 2–3,
  dashboard section **In-app purchase API (StoreKit 2)**, stored `apple_store_key_id` /
  `apple_store_issuer_id` / `apple_store_private_key` on the App — note the Django `verbose_name` on
  those three fields reads *"App Store Connect Key ID / Issuer ID / Private Key"*, which is the wrong
  key's name; they sign the App Store **Server** API. (2) **App Store Connect API (Team) key** — article
  Step 6, dashboard section **App Store Connect API key**, stored in a different table entirely
  (`portal/purchase_context/.../app_store_connect_credentials.py`). (3) **Subscription /
  promotional-offer key** — article Step 4, dashboard fields **Subscription key ID** and **Subscription
  key (.p8 file)**, stored `app_store_subscription_key*` and converted to DER at save. (4)
  **App-Specific Shared Secret** — not a `.p8` at all, `apple_shared_secret`. The trap proper: (1) and
  (2) render **byte-identical field labels** — "Issuer ID", "Key ID", "Private key (.p8 file)" — in two
  different places on the same settings page. A cropped screenshot cannot tell them apart; only the
  section heading can. So never crop a credential screenshot tight, and never reuse one across those two
  steps.
- **Three Adapty-side facts that read as configuration but are not, and must be checked in code before
  being described:** `apple_shared_secret_valid` is set optimistically to `True` the moment a secret is
  saved and is only corrected later, when a live receipt verification returns Apple status `21004` — so
  a green "valid" in the dashboard is not evidence the secret works. Private keys are write-only: the
  serializer replaces them with a random float on read, so a key is unreadable once saved on our side as
  well as downloadable once on Apple's, which makes "check what you pasted" never valid advice and
  "regenerate" always the fix. And `apple_store_notification_version` is **observed, not configured** —
  it is overwritten by whichever handler processed the most recent notification.
- **Claim classes that must not be inferred from a sibling article, ever.** Which of the four credentials
  a given feature needs (Refund Saver's dashboard gate demands the bundle ID plus the In-App Purchase
  trio, and nothing else — the V2 requirement comes from a different place, see below). Whether a
  credential is per-app or per-company: `Company.app_store_key_id` / `app_store_key` /
  `app_store_issuer_id` exist but sit under a `# deprecated fields` comment, so a per-company reading of
  any Apple credential is wrong today. Whether a dashboard "valid"/"connected" flag means anything was
  validated. And which Apple key an article's screenshot is actually showing.
- TODO(owner): `sources.md` has no entry that covers Apple's own surface, by construction — every entry
  is an Adapty repo or spec. Should this zone carry a dated, per-claim "confirmed against Apple's page on
  \<date\>" convention (in the article, or in this brief), so an agent can tell a stale Apple claim from a
  fresh one? Right now nothing distinguishes them.
- TODO(owner): `troubleshoot-app-store-integration` claims that unsigned Apple agreements make the App
  Store Connect API return **403** on product endpoints and that Adapty then *silently filters the
  products out*. I could not confirm the filtering. The mechanism I looked for was explicit 403/`FORBIDDEN`
  handling in the product and price adapters (`portal/in_app_context/.../appstore_products/`,
  `portal/analytics_context/`); that adapter's retry/status list covers 429/500/502/503/504 and not 403,
  and no `403`, `FORBIDDEN`, or `agreement` handling exists in either path. **That does not disprove the
  claim** — a 403 could fall through the adapter's generic error path, or the filtering could live in a
  module I did not find (a sync task, or an older import path). Treat the claim as unverified, not wrong,
  and do not delete it. Which module decides a product is unavailable and drops it is the specific
  question. Related but *not* the same thing, and easy to mistake for it:
  `TransactionCancellationReason.PRODUCT_WAS_NOT_AVAILABLE`, mapped from Apple's expiration intent `4` in
  `sdk/purchase_context/applications/services/transaction/app_store/v1|v2/create_store_transaction_collection_from_v*.py`
  — that is a subscription that expired because the product was withdrawn, not a product missing from
  the dashboard.

## What we document, what we don't

The delta from `scope.md` here is almost entirely one exception and two boundaries.

- **This zone restates a lot of Apple's own console UI on purpose, against `scope.md`'s obvious-UI
  rule.** What earns it is not that the UI is unfamiliar — it is that **the failure mode is
  Adapty-visible.** We walk Apple's console step by step exactly where a mis-step surfaces as an Adapty
  symptom the reader will file against us: a product missing from the dashboard, 30% commission where 15%
  was expected, renewals arriving late, offers that fail only when used. Where a mis-step surfaces inside
  Apple's console instead — Apple validates it, Apple names it — one sentence and a link to Apple is the
  whole treatment.
- Corollary on *what* gets restated: the sequence, the credential, and the destination field. Which tab,
  which key, which Adapty field it is pasted into, and what breaks if the step is skipped. Not Apple's
  chrome, and not a re-description of a button the reader is looking at. The five "connect the App Store"
  articles exist because the *ordering and the credential identity* are what the UI cannot convey — see
  `Ticket language`.
- **We never give a store-review verdict.** Not whether an app will be approved or rejected, not what
  Apple will accept, not how to word a declaration so it passes. `apple-app-privacy` documents what
  Adapty collects and under which Apple category, so the reader can answer Apple's questionnaire
  themselves; the answer is theirs to give and theirs to own.
- **We never promise Apple's behaviour.** Timing, retries, backlogs, rate limits, fiscal-period dates,
  whether a notification arrives at all. Write what Adapty does once something arrives, and what the
  reader can observe — Apple's own **Delayed** status, install counts computed at first launch rather
  than from notifications. A number that comes from Apple gets attributed and dated; a number that comes
  from us gets a module.
- **Irreversible and once-only actions get written up front, never in a closing note.** Keys downloadable
  exactly once, enabling Family Sharing on a product, a Small Business Program period whose exit date has
  to be set at the same time as its start. This is a scope rule and not a style preference: an
  irreversible action the reader takes on our instruction is the one place these docs can cost them
  something they cannot undo.
- **The line against `products-and-offers`:** we write the Apple-console walkthrough and stop at the
  moment the product or offer exists in App Store Connect — subscription groups, regional pricing, the
  fact that confirming prices does not save the subscription. Everything written about the Adapty-side
  record — creating it, linking it to the store product, and offer mechanics including `app-store-offers`
  — is written over there. Corrected 2026-08-10; see `Boundaries`.
- **The line against `testing-and-release`:** we write connect-and-configure, up to and including the
  last credential and the notification URL. Anything the reader does *with* a working connection —
  sandbox purchases, submission, review — is written there. The practical test on a draft: if the step
  recurs every release, it is not ours. This zone is one-time-or-occasional setup.
- **We do not write up Adapty's own dashboard toggles even when they sit on the same settings page as the
  Apple credentials** — those are `app-and-account-settings`. The settings page is shared between zones;
  the split is by whose fact it is, not by which screen it appears on.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| app-store-connection-configuration | — | dev | 6 | tutorial |
| app-store-products | — | dev | 1 | tutorial |
| app-store-small-business-program | — | dev | 8 | tutorial |
| apple-app-privacy | — | dev | 5 | tutorial |
| apple-family-sharing | — | dev | 0 | tutorial |
| apple-platform-resources | entry | dev | 3 | tutorial |
| enable-app-store-server-notifications | — | dev | 1 | tutorial |
| generate-in-app-purchase-key | — | dev | 0 | tutorial |
| initial_ios | entry | dev | 1 | tutorial |
| refund-saver | — | dev | 10 | tutorial |
| set-up-app-store-connect | — | dev | 8 | tutorial |
| troubleshoot-app-store-integration | — | dev | 5 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`google-platform`** — same category of work, Play Store side instead of App Store; distinguished
  purely by platform, no real ambiguity.
- **`app-and-account-settings`** — is the setting configured on Apple's own App Store Connect console
  (here) or inside the Adapty Dashboard's own app/account settings (`ios-settings`, `general`,
  `members-settings`)? Dashboard-side toggles are `app-and-account-settings`; Apple-console setup is here.
- **`testing-and-release`** — is the task about connecting/configuring the App Store integration itself
  (here), or about testing sandbox purchases and submitting the app for store review once it's connected
  (`test-purchases-in-sandbox`, `submit-app-to-app-store`)? Testing/submission is `testing-and-release`.
- **`products-and-offers`** — does the ticket concern how a product/offer surfaces on Apple's own console
  (`app-store-products`, here) or creating/managing the product or offer record in the Adapty Dashboard?
  The Adapty-side record is `products-and-offers`. Corrected 2026-08-10: this bullet used to list
  `app-store-offers` as a member of this zone, but `zones.json` assigns it to `products-and-offers` —
  so App Store offer *mechanics* are documented over there, not here, and this zone's roster does not
  contain it.
- **`sdk-quickstart` / `sdk-flows-display`** — any iOS SDK code (installation, StoreKit calls, rendering)
  is out of this zone entirely; it belongs to the relevant `sdk-*` zone.

## Ticket language

Five articles all read like "connect the App Store"; the split is by *whose console* and *which credential*.
`set-up-app-store-connect` is pre-Adapty Apple-account groundwork (Developer Program enrollment, D-U-N-S,
Paid Applications Agreement with banking/tax/contact, Bundle ID, registering the app) and only applies to a
first iOS app. `initial_ios` is the ~30-minute checklist that sequences the whole integration.
`generate-in-app-purchase-key` is the single Apple-console action. `app-store-connection-configuration` is the
Adapty-side form where every Apple credential gets pasted — six steps, and most "integration is set up but X
doesn't work" tickets resolve to one of them. `enable-app-store-server-notifications` is the last Apple-console
step. `troubleshoot-app-store-integration` is symptom-first and routes back into that six-step article.

| How a ticket says it | Where it actually lives |
|---|---|
| "which .p8 do I need", "uploaded the key but nothing works", "wrong key" | Two distinct Apple keys, both `.p8`, both under **Users and Access → Integrations**, both downloadable exactly once. The **In-App Purchase key** (In-App Purchase tab) validates purchases — `generate-in-app-purchase-key`. The **App Store Connect API key** (**Team keys** tab) does nothing for validation; it only enables pushing products and price export — `app-store-connection-configuration` Step 6. Generating either requires Admin or Account Holder in App Store Connect. |
| "app has trials or intro offers — anything extra to configure?" | `app-store-connection-configuration` Step 4. The **App Store promotional offers** section needs the *same* key ID and the *same* In-App Purchase `.p8` entered a second time; nothing prompts you, and skipping it is invisible until offers are used. |
| "no App-Specific Shared Secret section in App Store Connect" | `app-store-connection-configuration` Step 5 — the section is hidden from Admins until the Account Holder (whoever created the app) generates the secret once; after that it becomes visible to Admins too. |
| "Product Id not found", "products missing in Adapty", "403 fetching products from Apple" | `troubleshoot-app-store-integration`. All three are usually one cause: unsigned Apple agreements (paid apps, tax, or banking). The App Store Connect API returns 403 on product endpoints and Adapty silently filters the products out, so no error names the real problem. |
| "push to store option is greyed out", "CSV price export returns only headers" | `troubleshoot-app-store-integration` → `app-store-connection-configuration` Steps 1 and 6. Pushing products needs **both** the Apple app ID and the Team-keys API key; the dashboard disables the option without saying which is missing. |
| "renewals/cancellations arrive late", "refund data never shows up", "events aren't real time" | `enable-app-store-server-notifications` when the URL was never pasted into *both* the Production and Sandbox Server URL fields (full V2 support also needs iOS SDK 2.10.0+). If Apple's own ASSN status reads **Delayed**, it's `troubleshoot-app-store-integration` — Apple's backlog, clears itself. Install counts are unaffected either way; Adapty counts installs at first launch, not from notifications. |
| "we already have our own S2S consumer for Apple events" | `enable-app-store-server-notifications` — raw-event forwarding, so Adapty and your endpoint both receive Apple's payloads instead of you choosing one. |
| "price in Adapty doesn't match the App Store" | `troubleshoot-app-store-integration`. For a product imported from the store the dashboard price is only a placeholder — analytics, integrations, and the SDK all use the real fetched price, and store price changes never sync back. |
| "revenue shows 30% commission, we're at 15%", "proceeds are wrong since we joined the small business program" | `app-store-small-business-program`. Adapty never learns the status from Apple: you add an explicit membership **period** per app, and you must set the exit date too or the reduced rate keeps applying. Do it the day approval lands — webhook events already delivered can't be rewritten. Apple's own reduced rate starts the 15th of its next fiscal period, so earlier transactions stay at 30%. |
| "family member's subscription isn't in revenue", "family sharing users missing from analytics" | `apple-family-sharing` — by design. Only `in_app_ownership_type: PURCHASED` counts toward revenue; a `FAMILY_SHARED` transaction fires **Access level updated** and nothing else, so downstream analytics keyed on Subscription started will never see family members. Two more constraints worth stating up front: enabling Family Sharing on a product is irreversible, and it does not work in sandbox. |
| "automatically fight refunds", "reduce refund rate", "respond to Apple's consumption requests" | `refund-saver`. Three prerequisites carry the whole feature: App Store Server Notifications **V2** (V1 is incompatible — this is the usual blocker), a privacy-policy disclosure of consumption-data use, and user consent for sharing it. App Store only; Google Play has no consumption-request equivalent. |
| "App Store privacy questionnaire", "what do we declare for Adapty", "IDFA disclosure", "`PrivacyInfo.xcprivacy`" | `apple-app-privacy`. Adapty requires Purchases plus Identifiers — Device ID because Adapty collects IDFA, User ID only if you identify users with `customerUserId`. Adapty is not on Apple's required-signature list but ships its own privacy manifest from SDK 2.10.2+, so the fix is often just an SDK update. |
| "create a subscription in App Store Connect", "subscription group", "regional pricing for a product" | `app-store-products` — the Apple-console walkthrough. The Adapty-side product record is `products-and-offers`, not here. Two traps: a subscription cannot exist outside a subscription group, and confirming prices does not save the subscription — you must Save it separately or lose the whole entry. |
| "how long does iOS setup take", "onboarding checklist for a new account" | `initial_ios`. `apple-platform-resources` is only an index of the Apple-side pages — never the answer to a task, just a landing spot. |

## Gaps and misses

