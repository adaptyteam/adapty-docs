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

This zone is split by owner, and the split is unusually clean: most sentences here are **Google's**
facts, a minority are **Adapty's**, and neither half has a registered source.

- **Google's half has no source, and cannot have one.** Cloud IAM role names (Pub/Sub Admin,
  Monitoring Viewer), Play Console **Account permissions** labels, which three APIs must be enabled,
  the 3,000 queries/min default quota and the shape of the quota-request form, the Data Safety
  question wording and answer options, Reduced Service Fee thresholds and enrollment steps, and every
  console navigation path and screenshot in the zone — none of it is verifiable from any repo in
  `sources.md`. The only check is a re-read of Google's own page. Say that plainly in a task instead
  of implying verification: this zone rots by Google relabelling a button, not by an API changing, so
  "I confirmed the label" must mean "I opened the console page", and if nobody did, it is an open
  question. This is also why the corpus-wide rule about establishing *absence* by grep does not help
  here — there is nothing to grep.
- **Adapty's half is backend code** — Adapty's closed-source backend, not citable here; confirm with
  the product team or by testing in the dashboard. Everything this zone claims about our side was
  verified against it:
  - **What we do with the key file, at upload time.** This is a *shape* check only: the JSON must be
    a service-account key with Google's two fixed URLs, otherwise the upload fails with an error on
    the key-file field. It never calls Google, and the dashboard marks the key valid on the mere
    presence of the file. So "Adapty rejects the key file" can only ever mean malformed JSON — a
    correctly-shaped key belonging to an under-permissioned account is accepted here and fails
    later, which is the mechanism behind the "nothing works right after setup" phrasing in
    *Ticket language*.
  - **What we do with it afterwards, and what a missing grant breaks.** Play purchases are validated
    through an `androidpublisher` v3 client built from the stored key. It fails in **two different**
    ways, and the difference is the zone's most useful diagnostic: credential-level failures (key
    absent, malformed, or unable to refresh a token) surface as a key-not-set / key-not-valid error,
    while anything Google answers with an HTTP status — which is where a missing Play Console
    permission lands — surfaces carrying Google's own status. Dashboard-side reads of products, base
    plans, offers and listings go through a second `androidpublisher` client (scope
    `https://www.googleapis.com/auth/androidpublisher`).
  - **RTDN** (`enable-real-time-developer-notifications-rtdn`). Load-bearing facts: the topic name is
    *computed by us* (`projects/<project_id from the key file>/topics/adapty-…`), which is why the
    field is blank or malformed exactly when the key file is missing or has no `project_id`. Adapty
    then creates the topic in the customer's Cloud project, sets an IAM binding granting
    `roles/pubsub.publisher` to `google-play-developer-notifications@system.gserviceaccount.com`, and
    creates a **push** subscription pointing at Adapty's own per-app notification endpoint.
  - **The dashboard-side settings the zone names** — the uploaded key file, **URL for forwarding raw
    Google events**, whether the RTDN topic has been created, and the Reduced Service Fee membership.
    Use these when a ticket's wording has to be matched to an actual stored setting.
- **The sharpest trap: two consoles, two grants, and a ticket that names neither.** Establish which
  before doing anything else.
  - Google **Cloud** Console, on the *Cloud project*: enabling the three APIs
    (`enabling-of-devepoler-api`), the service account's **IAM roles** — Pub/Sub Admin, Monitoring
    Viewer (`create-service-account`), and issuing its **JSON key** for download
    (`create-service-account-key-file`). These are what Adapty's RTDN setup consumes: creating a topic
    and subscription inside the customer's own Cloud project needs the Pub/Sub role, not any Play
    Console permission.
  - Google **Play** Console, on the *developer account*: inviting the service account's email and
    ticking its **Account permissions** (`grant-permissions-to-service-account`), plus the RTDN
    **Topic name** field under Monetization setup and the Monetize → Products screens. These are what
    the `androidpublisher` clients consume.
  - So: a "permissions" ticket that presents as failed purchase validation or missing products is the
    Play Console grant; one that presents as RTDN never arriving or a blank topic field is the Cloud
    IAM grant. The backend error split above is the tiebreaker when the reporter can't say.
  - **Do not use an article's title or intro as evidence of which console a step happens on — several
    are wrong.** `enabling-of-devepoler-api` is titled "…in Google Play Console" while all eight
    steps are `console.cloud.google.com`; `create-service-account-key-file` is titled "…in the Google
    Play Console" and its step 1 links `console.cloud.google.com/iam-admin/serviceaccounts`;
    `create-service-account` opens "a service account is necessary in the Google Play Console" above a
    Cloud Console procedure. The links are right and the prose is wrong. Read the URL.
- **Where the correct order is established.** `initial-android`'s checklist is the ordering authority
  for a reader; the mechanics behind it are only partly a matter of preference:
  - **Settled, by Google's mechanics:** the service account must exist before a key can be issued for
    it, so `create-service-account` → `create-service-account-key-file` is the only possible order.
  - **Settled, by our backend:** the key must be uploaded *after* the Cloud IAM roles exist, because
    saving it — on first upload and on every replacement — immediately creates the RTDN topic and
    subscription in the customer's Cloud project. This
    is also the reason the upload step (`google-play-store-connection-configuration`) sits where it
    does in the chain rather than first.
  - **Open:** whether the Play Console **Account permissions** must precede the key file. The backend
    does not settle it — nothing checks those permissions at upload time, and they are first exercised
    later at `androidpublisher` call time. That is a statement about the mechanism I looked for
    (an upload-time gate in the backend), **not** a finding that the order is free: Google's
    own ~24 h service-account activation delay, or Play Console's invitation flow, could make
    permissions-first the right instruction for reasons no code in our repos would show. A fix task is
    already open on the `google-platform-resources` / `initial-android` contradiction; it should not be
    resolved by reasoning from the backend alone.
- **`enabling-of-devepoler-api` is the real id, typo included** ("devepoler"). Per the SEO-stability
  rule, the filename stays; write it exactly as the roster has it in every link, sidebar entry and
  task description, and expect it not to match a search for "developer".
- TODO(owner): nothing in `sources.md` or the backend covers the **quota** story from our side.
  Does Adapty detect or surface Google Play Developer API quota exhaustion at all (a dashboard warning,
  a support alert), or is the customer's email from Google the only signal? `google-play-quota-increase`
  currently reads as if it is the only signal, and that should be confirmed rather than assumed.
- TODO(owner): the key file's "valid" flag is only ever set to valid, at upload, in the backend
  code checked; the SDK purchase path reads it, so something presumably invalidates it.
  Confirm with the product team before any article documents a "key became invalid" state.

## What we document, what we don't

Delta from `scope.md`. The corpus-wide rule against restating obvious UI is the one this zone breaks
most, deliberately — so the exception needs stating rather than assuming.

- **We restate Google's consoles click-by-click, screenshot by screenshot, further than we do for any
  third party.** What earns it is one of two things, and a proposed new step should be checked against
  them: (a) **the failure mode is Adapty-visible** — the reader will not see a Google error, they will
  see purchases not validating, products missing, or events not arriving in Adapty, and will open a
  ticket with us; or (b) **the step is buried** — Play Console's Account permissions tab, the
  Monetization setup RTDN checkbox, and the Cloud project selector are all places where the reader
  cannot find the control from Google's own docs. Where neither holds, link Google and stop: this is
  why `google-reduced-service-fee` sends enrollment to Google's guide but keeps the Adapty date-range
  procedure in full, and why `google-play-quota-increase` describes *where to find* the three values
  the form wants rather than reproducing the form.
- **Never promise a quota increase.** Google grants or refuses it and we have no visibility. State the
  prerequisite (RTDN enabled, or Google may reject outright), what to gather, and what to write in the
  justification; route the "how much should I ask for?" question to support with usage figures, as
  `google-play-quota-increase` already does. No expected approval rate, no "Google will approve", and
  no timeline firmer than Google's own.
- **Never give a Play policy verdict.** `google-play-data-safety` documents *what Adapty collects* —
  Financial Info (purchase history), Device or other IDs, User IDs — so the reader can fill in their
  own declaration. It does not tell them their declaration is complete or compliant; their app collects
  things we know nothing about, and the disclosure is theirs to sign. Same shape for
  `google-reduced-service-fee`: we document how to make Adapty's revenue maths match the fee the
  reader is actually charged, never whether they qualify for the program or how Google will assess
  their Account Group.
- **Line against `products-and-offers`, in terms of what gets written.** `android-products` is in this
  zone because it explains Play Console's own subscription/base-plan/offer structure — but only as far
  as Adapty's mapping needs it: that an Adapty product corresponds to a Google **base plan**, and that
  a non-backwards-compatible base plan needs a fallback product for SDKs 2.5 and below. It stops at
  the handoff to `create-product`. Creating or editing the Adapty-side product or offer record is
  written in `products-and-offers`, and so is `google-play-offers` despite
  `google-platform-resources` linking it from here — a link from this zone's hub is not a claim of
  ownership.
- **Line against `testing-and-release`.** We write the connection and the verification that lives
  *inside the setup screen itself* — Play Console's **Send test notification** and the status readout
  in Adapty's Android SDK settings — because that is how a reader confirms the step they just
  performed. We do not write test purchases, license testers, sandbox accounts, or store-review
  preparation; those are `testing-on-android` and `android-test`, and a "how do I check it works"
  ticket splits on whether the reader is confirming a console field or a purchase.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-products | — | dev | 4 | tutorial |
| create-service-account | — | dev | 4 | tutorial |
| create-service-account-key-file | — | dev | 4 | tutorial |
| enable-real-time-developer-notifications-rtdn | — | dev | 8 | tutorial |
| enabling-of-devepoler-api | — | dev | 3 | tutorial |
| google-platform-resources | entry | dev | 3 | tutorial |
| google-play-data-safety | — | dev | 7 | tutorial |
| google-play-quota-increase | — | dev | 3 | tutorial |
| google-play-store-connection-configuration | — | dev | 3 | tutorial |
| google-reduced-service-fee | — | dev | 7 | tutorial |
| grant-permissions-to-service-account | — | dev | 3 | tutorial |
| initial-android | entry | dev | 6 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

- **A Billing Library version claim made in an installation article ripples into this zone, and the
  scope statement has to be duplicated across the zone line.** The version sentence lives in seven
  installation articles — `sdk-installation-android`, `sdk-installation-capacitor`,
  `sdk-installation-react-native-pure`, `sdk-installation-react-native-expo`,
  `sdk-installation-kotlin-multiplatform`, `sdk-installation-flutter`, `sdk-installation-unity` —
  correctly, by the `sdk-quickstart` boundary below. But the action a reader takes after misreading it
  happens in Play Console, inside `android-products`: a client read "works with Google Play Billing
  Library 8" as "Adapty supports everything Google shipped in 8" and was about to make a one-way
  product change in Play Console (2026-08-20). So when a Billing Library version moves, or Google ships
  a new billing capability, expect **two** edits and don't let either stand alone — the version in the
  installation articles, what Adapty does and doesn't do with it in `android-products`. Verified
  2026-08-21 against the Android SDK repo's `origin/master` (tag 4.1.0): `adapty/build.gradle:34` pins
  `billing:8.0.0` while `ProductMapper.kt:135` reads only the deprecated singular
  `oneTimePurchaseOfferDetails`, and a grep for
  `oneTimePurchaseOfferDetailsList|purchaseOption|rentalDetails|preorderDetails` returns nothing — so
  "built against 8" and "adopted what 8 added" are separate claims, and only the first is ours to state
  from a repo.

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
  console (`android-products` — but **not** `google-play-offers`, which `zones.json` assigns to
  `products-and-offers` and which is absent from this roster; corrected 2026-08-12) or creating/managing the product or offer
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
| "do you support Google's new one-time product model", "normalized one-time products", "can we convert our in-app products in Play Console" | `android-products` — the warning above the first heading, deliberately not a per-feature answer. A named list of unsupported features would read as exhaustive and recreate the same false assurance inverted, so support owns the per-feature answer. What the reader needs first is that the Play Console change is one-way. |

## Gaps and misses

