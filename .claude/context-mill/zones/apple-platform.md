---
zone: apple-platform
sources: []
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

## What we document, what we don't

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

