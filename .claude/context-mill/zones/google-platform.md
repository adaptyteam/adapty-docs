---
zone: google-platform
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Store- and account-side setup on Google's own consoles needed to sell through Google Play: creating a
Google Cloud service account and its key file, granting that account permissions, enabling the
Developer API and Real-time Developer Notifications, Play Store connection configuration, Android
product references, a Developer API quota-increase request, and Google-specific policy pages (Data
Safety, Reduced Service Fee). This is one-time-or-occasional account/console configuration on Google's
side, not Android SDK code and not the Adapty Dashboard's own settings.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-products | — | dev | 4 | tutorial |
| create-service-account | — | dev | 0 | tutorial |
| create-service-account-key-file | — | dev | 0 | tutorial |
| enable-real-time-developer-notifications-rtdn | — | dev | 6 | tutorial |
| enabling-of-devepoler-api | — | dev | 0 | tutorial |
| google-platform-resources | entry | dev | 3 | tutorial |
| google-play-data-safety | — | dev | 7 | tutorial |
| google-play-quota-increase | — | dev | 3 | tutorial |
| google-play-store-connection-configuration | — | dev | 2 | tutorial |
| google-reduced-service-fee | — | dev | 7 | tutorial |
| grant-permissions-to-service-account | — | dev | 0 | tutorial |
| initial-android | entry | dev | 1 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`apple-platform`** — same category of work, App Store side instead of Play Store; distinguished
  purely by platform, no real ambiguity.
- **`app-and-account-settings`** — is the setting configured on Google's own Play Console/Cloud Console
  (here) or inside the Adapty Dashboard's own app/account settings (`android-settings`, `general`,
  `members-settings`)? Dashboard-side toggles are `app-and-account-settings`; Google-console setup is
  here.
- **`testing-and-release`** — is the task about connecting/configuring the Play integration itself
  (here), or about testing purchases on Android and preparing the app for store review
  (`testing-on-android`, `android-test`)? Testing/submission is `testing-and-release`.
- **`products-and-offers`** — does the ticket concern how a product/offer surfaces on Google's own
  console (`android-products`, `google-play-offers`, here) or creating/managing the product or offer
  record in the Adapty Dashboard? The Adapty-side record is `products-and-offers`.
- **`sdk-quickstart` / `sdk-flows-display`** — any Android SDK code (installation, Play Billing calls,
  rendering) is out of this zone entirely; it belongs to the relevant `sdk-*` zone.

## Ticket language

Most of this zone is one ordered chain, and a ticket almost never names the right link in it. The
order that `initial-android` and the `What's next` chains agree on: enable the three APIs
(`enabling-of-devepoler-api`) → create the Cloud service account and its IAM roles
(`create-service-account`) → grant it Play Console permissions (`grant-permissions-to-service-account`)
→ download the JSON key (`create-service-account-key-file`) → upload it to Adapty
(`google-play-store-connection-configuration`) → RTDN
(`enable-real-time-developer-notifications-rtdn`).

| How a ticket says it | Where it actually lives |
|---|---|
| "Adapty can't validate Android purchases", "service account permissions missing", "I invited the account and it still fails" | `grant-permissions-to-service-account`. There are **two** separate grants: Cloud IAM roles at creation time (`create-service-account`) and Play Console **Account permissions** here — View app information, View financial data/orders/cancellation surveys, Manage orders and subscriptions, Manage store presence. A ticket that says "permissions" almost always means this one. |
| "API not enabled" error, "androidpublisher isn't on" | `enabling-of-devepoler-api`. Three APIs, not one — Google Play Android Developer, Google Play Developer Reporting, Cloud Pub/Sub — and the Cloud project picked here must stay the same one all the way through the key-file upload. |
| "no real-time notifications", "Pub/Sub Admin role", "notification queue" | `create-service-account`, not the RTDN article. The two Cloud roles granted at creation are Pub/Sub Admin (required for RTDN to work at all) and Monitoring Viewer (queue monitoring); an RTDN-shaped complaint often traces back to a role missed here. |
| "Adapty rejects the key file", "nothing works right after setup", "24 hours" | `create-service-account-key-file`. A new service account takes ~24 h to activate; the documented workaround is editing and saving any product description in Play Console. The same note is repeated in `initial-android`. |
| "where do I upload the JSON key", "package name", "connect the Android app to Adapty" | `google-play-store-connection-configuration` — the one Adapty-Dashboard-side step inside an otherwise Google-console chain. |
| "paywalls stopped showing on Android after release", "products vanished after we changed the app config" | `google-play-store-connection-configuration`. Changing the package name or key file after shipping Adapty paywalls breaks the integration — the constraint, not the mechanics, is what the ticket needs. |
| "refunds not reflected", "cancellations/renewals missing in Adapty", "Android events delayed" | `enable-real-time-developer-notifications-rtdn`. The topic name is generated *by Adapty* (App settings → Android SDK) and pasted into Play Console → Monetization setup, not the reverse; Play Console's **Send test notification** is the confirmation step. |
| "topic name is wrong", "the Pub/Sub field doesn't start with `projects/`" | Same article, **Fixing incorrect format** section. Cause is either a skipped sub-step earlier in the chain or the org policies **Domain restricted contacts** / **Domain restricted sharing** — override both to Allow All, regenerate the field, then set them back to inherit. |
| "we still need raw Google S2S events", "forward Google notifications to our endpoint" | Also the RTDN article — one easily missed field, **URL for forwarding raw Google events**. |
| "quota exceeded email from Google", "API rate limited", "large historical import failing" | `google-play-quota-increase`. Default is 3,000 queries/min. RTDN is a hard prerequisite, not advice: Google may reject the request outright if it isn't enabled. The form also needs a Developer Account ID and Cloud project number the ticket won't have. |
| "revenue doesn't match Play Console", "we're on 15%", "commission looks wrong" | `google-reduced-service-fee`. Membership is a **date range** set in App Settings → General, and since Jan 2022 Google already charges 15% on auto-renewable subscriptions — a subscriptions-only app usually has nothing to fix. Crossing 1M USD mid-year means editing the exit date by hand, and already-delivered webhook events can't be rewritten. |
| "old app versions buy the wrong base plan", "only one base plan is visible to the SDK" | `android-products`. Adapty products map to Google **base plans**; SDKs 2.5 and below see only the single backwards-compatible base plan, so any other plan needs a fallback product declared. |
| "Data Safety form", "what does Adapty collect", "Play Store privacy declaration" | `google-play-data-safety` — the answer set is Financial Info (purchase history), Device or other IDs, and User IDs. |
| "first-time Android setup", "how long will this take", "which step comes first" | `initial-android` for the ordered checklist; `google-platform-resources` is the link hub. Prefer the checklist for ordering — the hub lists the key file before the Play Console permissions, which contradicts every other page in the chain. |

## Gaps and misses

