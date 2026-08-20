---
zone: attribution
sources: [ua-service]
reviewed_shape:
reviewed_at:
---

## What this is

The `ua-*` article family plus the Meta and TikTok campaign guides: Adapty's own built-in
attribution/acquisition product ("Adapty Attribution" / "Adapty User Acquisition") that matches app
installs and subscription revenue to ad campaigns using tracking links and platform data, without
needing a third-party MMP. Covers getting started, analytics that blend ad spend with subscription
revenue, integrations with ad platforms and cloud-storage data sources, tracking links, deferred
deeplinks, predicted metrics, and setting up specific ad-platform campaigns (Meta, TikTok). It also owns
attribution *integrations* — the ad-platform and cloud-storage connections that feed this product.

## Surfaces

## Sources of truth

- **TODO(owner): register the UA service in `sources.md`.** Nothing in the registry covers it, yet it
  owns almost every fact in this zone: it is the service behind api-ua.adapty.io. Clone is
  `~/Documents/adapty-user-acquisition`, remote `https://gitlab.adapty.io/adapty/adapty-user-acquisition.git`,
  and its real default ref is `origin/develop` (from `git symbolic-ref refs/remotes/origin/HEAD`), not
  `master`. Until it has an entry, a task must name the module it read.
- **The attribution data model is defined entirely in that service, not in any SDK.** The wire object is
  `InstallOutAttributionDTO` in `src/app/attribution_context/applications/dto/install_dto.py` (exactly
  seven fields: channel, campaign_id, campaign_name, adset_id, adset_name, ad_id, ad_name), and it is
  built by `_project_attribution()` against the whitelist `ATTRIBUTION_PROJECTION_FIELDS` in
  `src/app/attribution_context/applications/services/install_service.py`. Inside the object all seven
  keys are always emitted and any of them may be `null`; the *object itself* is omitted from the payload
  when `attribution_data['matching_tier']` is empty — i.e. when no click matched.
- **Settle the organic contradiction in favour of the prose, not the field table.** `ua-attribution-data`
  offers `organic` as an example `channel` value while also saying the object is absent when attribution
  could not be determined. Only the second statement is what the code does: an unattributed install has
  an empty matching_tier and therefore carries no attribution object to put `organic` in. `channel` on
  the projection is always the *matched click's* channel, and a click whose channel cannot be determined
  is discarded at ingestion rather than stored as organic.
- **Channel is not a closed enum on the SDK wire, and the dashboard's channel list is a different list.**
  Two producers only: a four-entry `PARTNER_ID_TO_CHANNEL` map in
  `src/app/campaign_context/applications/constants/partners.py`, and an explicit `channel` query
  parameter on manual tracking links — free text, whatever the marketer typed in the **Channel** field.
  The thirteen-value `ALL_CHANNELS` list in
  `src/app/analytics_context/applications/constants/advertising_channels.py` is the analytics/reporting
  taxonomy (it is where `organic` legitimately lives). Never document one as the other.
- **Where the SDK's side ends.** The SDKs carry no attribution field names at all — `payload` is an
  opaque JSON string (`AdaptyInstallationDetails.Payload.jsonString`, iOS and Android alike), so the SDK
  repos can confirm *how* to read the data and never *what* is in it. Setting attribution from app code
  is the other product: `updateAttribution(_:source:)` writes third-party MMP data to the Adapty core
  profile and its own doc comment points at attribution-integration in the `integrations` zone. Apple
  Search Ads data does not arrive on the tracking-link path either — `attribution_data_asa` sits in
  `CORE_OWNED_KEYS` and reaches this service from Adapty core, which is why the export's `asa_*` columns
  exist without any ASA tracking link.
- **"Deferred" is backend-owned and has two producers, not one.** `_build_deferred_response()` merges the
  campaign's own stored `ios_deferred_data`/`android_deferred_data` (persisted fields on
  `src/app/campaign_context/infrastructure/models/campaign_model.py`) with the click's query parameters,
  click values winning. Both land at the top level of `payload`, outside the attribution object.
- **The export destinations share one writer and a schedule the articles state loosely.** All three
  storage articles describe the same 39-column install CSV produced by `_format_installs_to_csv()` in
  `src/app/export_context/applications/services/export_service.py`; `storage_type` selects only the
  upload adapter, so a column difference between the three articles is drift, never a product
  difference. The schedule is `@cron('0 2,4,6 * * *')` on `daily_export_scheduler` in
  `src/app/export_context/infrastructure/ports/tasks/daily_export.py`: three runs a day, each
  idempotently creating or retrying *yesterday's* job, and skipped outright for companies that are
  neither paid nor in trial. "Every 24h at 4:00 UTC" is the articles' phrasing, not the code's.
- **Web-payment attribution (Stripe, Paddle, the web pixel) lives in this zone and this service** — added
  2026-08-17 while writing `ua-stripe`/`ua-paddle`/`ua-web-pixel`. The UA service carries `stripe_context`
  and `paddle_context` (merchant API keys, auto-provisioned webhooks, 2-hourly polling sync at
  `@cron('0 */2 * * *')`), and a single web-transactions assembly
  (`analytics_context/.../web_assembly_service.py`, `@cron('*/30 * * * *')`) that unions Stripe ∪ Paddle ∪
  FunnelFox by invoice into `events_transaction`. The checkout-side contract is one metadata key,
  `adpt_click_id`, defined in `src/app/shared/utils/web_click_metadata.py` and read from Stripe `metadata`
  and Paddle `custom_data`; the repo's own client-facing guide is `docs/web-attribution-pixel-integration.md`.
  The pixel snippet is per campaign configuration (`build_web_snippet` in
  `campaign_context/.../campaign_service.py` returns `None` for partners other than Meta/TikTok). Channel
  for these transactions comes from `channel_of` in `src/app/shared/utils/channel_sources.py`:
  fbclid → facebook, ttclid → tiktok, `utm_source`+`utm_medium=paid` fallback, else organic — no google on
  this path. Stripe/Paddle cohort = the subscription's first charge date
  (`clickhouse_web_assembly_repository.py`), matching FunnelFox's first-paid-date rule. Test-mode/sandbox
  events are dropped on arrival on every path, so a test key connects, shows Valid, and yields nothing.
- **Some claims are the ad network's and cannot be verified here.** Meta token expiration and the
  `ads_read` permission, system-user token generation, whether Meta approves an ad URL, TikTok's
  Tracking URL field, and the meaning of Apple's ASA fields all live in the provider's product. Give
  them one sentence and a link out; do not restate them as Adapty behaviour, and do not treat a support
  report about them as a docs defect until the provider's own docs are checked.

## What we document, what we don't

- **Adapty's own acquisition product gets documented end to end; an MMP gets only its Adapty-side
  wiring.** Everything in this roster is Adapty Attribution: tracking links, campaign configuration and
  its matching settings, the analytics and metrics pages, the install payload the app receives, and the
  daily export out. When the reader's attribution comes from a third-party MMP instead, we document the
  Adapty-side call and stop — the MMP's console, SDK, identifiers and attribution model are its own
  docs. The reliable tell for which product a task is about is the API surface it touches:
  `onInstallationDetailsSuccess` is this zone, `updateAttribution` is the `integrations` zone.
- **Campaign-platform setup is a deliberate exception, and a narrow one.** `meta-create-campaign` and
  `tiktok-create-campaign` walk another vendor's UI — objective, ad set, targeting, creative — because a
  campaign built wrongly breaks attribution silently and the reader blames Adapty. We stop at anything
  that cannot change what Adapty receives: bidding strategy, creative advice, audience building,
  billing, account structure. Two things must survive every edit to those guides, because they are the
  only load-bearing steps: where the click link goes, and the rule that splits it across **Website URL**
  and **URL parameters** so the ad gets approved.
- **A bounded context in the backend is not a documented integration.** The UA service also carries a
  Google Ads context (metrics queries plus conversion upload) and Adjust and AppsFlyer ingest contexts,
  while the articles say native spend integrations are Meta and TikTok only. Do not add an integration
  article, and do not widen "currently — Meta Ads and TikTok for Business", on the strength of that code
  existing; confirm shipped status with product first. This is the zone's most tempting wrong edit.
- **Boundary with `ads-manager`, stated as what gets written.** All Apple Search Ads *campaign
  management* writing — connection flow, bids, automations, keyword work — belongs to `ads-manager`. Here
  ASA appears only as a channel value and as the `asa_*` columns in the export, and this zone never
  re-explains how ASA campaigns are run even when a reader arrives with an ASA question.
- **Boundary with `integrations`, stated the same way.** Writing about a destination's own wire format,
  its credentials screen, and its identifier call belongs there; writing about install, click and
  campaign data entering or leaving Adapty Attribution belongs here. The sharp case: a new column in
  this zone's install CSV is written here, a new webhook or subscription-export field is written there,
  and neither implies the other — same providers, different products, separately maintained schemas.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-user-acquisition | entry | marketer, analyst | 2 | tutorial |
| meta-create-campaign | — | marketer, analyst | 7 | tutorial |
| tiktok-create-campaign | — | marketer, analyst | 8 | tutorial |
| ua-amazon-s3 | — | marketer, analyst | 5 | tutorial |
| ua-analytics | entry | marketer, analyst | 6 | tutorial |
| ua-attribution-data | — | marketer, analyst | 0 | tutorial |
| ua-custom-s3 | — | marketer, analyst | 3 | tutorial |
| ua-deferred-data | — | marketer, analyst | 0 | tutorial |
| ua-facebook | — | marketer, analyst | 9 | tutorial |
| ua-funnelfox | — | marketer, analyst | 4 | tutorial |
| ua-google-cloud-storage | — | marketer, analyst | 5 | tutorial |
| ua-integrations | entry | marketer, analyst | 4 | tutorial |
| ua-metrics | — | marketer, analyst | 2 | tutorial |
| ua-paddle | — | marketer, analyst | 6 | tutorial |
| ua-predicted-metrics | — | marketer, analyst | 5 | tutorial |
| ua-stripe | — | marketer, analyst | 6 | tutorial |
| ua-tiktok | — | marketer, analyst | 9 | tutorial |
| ua-tracking-links | — | marketer, analyst | 1 | tutorial |
| ua-web-pixel | — | marketer, analyst | 6 | tutorial |
| user-acquisition | — | marketer, analyst | 7 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`integrations`** — `attribution-integration` (in `integrations`) is about forwarding attribution
  data to third-party MMPs (Adjust, AppsFlyer, etc.) — a different product from Adapty's own built-in
  attribution here. Same word "attribution," two products: is the reader routing data *to* an external
  MMP (`integrations`), or using Adapty's own built-in acquisition dashboard (here)? Likewise,
  `ua-amazon-s3`/`ua-custom-s3`/`ua-google-cloud-storage` are **exports, not data sources** — corrected
  2026-08-10 after reading all three: each documents a toggle literally named "Export install events
  to …", Adapty uploading raw `.csv` reports into the customer's bucket, and a key that needs *write*
  access. So the direction is the same as `integrations`' S3/GCS exports; the distinction is *which
  product's events* travel, acquisition data here versus subscription events there — not which way.
- **`ads-manager`** — is the ticket about Apple Search Ads campaign management specifically
  (`ads-manager`, its own dedicated product), or about Adapty's cross-channel attribution spanning
  multiple ad platforms (here)? Meta/TikTok campaign setup lives here, not `ads-manager`, because those
  are attribution-side campaign-creation guides, not a dedicated campaign-management product the way
  Ads Manager is for Apple.
- **`analytics`** — does the metric blend ad spend/ROAS/campaign performance with revenue (here), or is
  it a pure subscription/revenue metric with no acquisition-channel dimension (`analytics`)?
- **`integrations` (general destinations)** — third-party integration *setup* in general (analytics
  platforms, messaging platforms, generic webhooks) belongs to `integrations`; only attribution-specific
  sources/destinations that feed this product's own dashboard belong here.

## Ticket language

This zone is flat, so rows name articles directly. Corpus-wide synonyms (Adapty Attribution ↔ user
acquisition ↔ the `ua-` prefix ↔ web campaigns ↔ tracking links) live in `aliases.md` and are not
repeated here.

Note the two id names that mislead constantly: `adapty-user-acquisition` is the *overview* ("what it is,
how attribution works end to end"), and `user-acquisition` is the *get-started* ("do these three steps").
A ticket asking "how do I turn it on" wants `user-acquisition`, not the one whose id sounds official.

| How a ticket says it | Where it actually lives |
|---|---|
| "export attribution data to a bucket", "which S3 article do I follow", "MinIO / DigitalOcean Spaces / Wasabi", "self-hosted object storage" | `ua-custom-s3` is the answer for anything S3-*compatible* — it is the only one of the three with a **Custom Endpoint URL** field, and that field is the whole distinction. Real AWS → `ua-amazon-s3` (the only one carrying the IAM policy + access-key walkthrough). GCP → `ua-google-cloud-storage` (Service Account HMAC key only, and it needs three roles: Storage Object Viewer, Storage Legacy Bucket Writer, Storage Object Creator). |
| "yesterday's data isn't in the bucket", "why isn't this streaming", "re-export a specific day" | Same three articles. There is no streaming: one CSV per *previous full UTC calendar day*, plus a manual per-date export. **Corrected 2026-08-11 against `origin/develop`:** the schedule is `@cron('0 2,4,6 * * *')` — three runs a day at 02:00, 04:00 and 06:00 UTC, each idempotently creating or retrying *yesterday's* job — not the single 4:00 run all three articles state. And the likelier cause of an empty bucket is not the schedule at all: the scheduler skips companies that are neither paid nor in trial, which no article mentions. Rule out the account state before the connection. |
| "does the export include IDFA / fbclid / the ASA fields", "what columns are in the dump" | The column table in each of `ua-amazon-s3`, `ua-custom-s3`, `ua-google-cloud-storage`. Read the one the customer actually uses — the tables are **not** identical: `ua-custom-s3` documents `bundle_id`, device brand/model, and OS/app/SDK version, the other two do not. Treat that as suspected doc drift, not a product difference, before telling anyone a field is unavailable. |
| "S3 export" with no other context | Decide direction and product first. The three `ua-*` storage articles export *Adapty Attribution's install events*; `s3-exports` / `google-cloud-storage` in **integrations** export the main dashboard's *subscription events*. Same provider, different product, different table — and the wrong one is a plausible-looking wrong answer. |
| "read which ad drove this install from app code", "personalize onboarding by campaign", "organic vs paid inside the app" | `ua-attribution-data`. Fields arrive in a nested `attribution` object inside the `payload` of `onInstallationDetailsSuccess`, and `payload` is escaped JSON the app parses itself. Every field is optional. Note the article says two things about organic installs — that `channel` can be `organic`, *and* that the `attribution` object is absent when attribution could not be determined — so app code has to handle both shapes. |
| "deep link the user to a screen after install", "show a welcome screen based on which ad was clicked" | `ua-deferred-data`, not `ua-attribution-data`, even though it is the same callback. The difference is who authored the values: deferred data is parameters *you* appended to the click link yourself (`ios_deferred_data`, `android_deferred_data`, `deferred_data_sub[1-10]`), so the setup step is in the ad's destination URL, not anywhere in the Adapty UI — and they sit at the top level of `payload`, not inside `attribution`. |
| "no ad spend for this channel", "ROAS/CPI is empty", "why is my Google Ads campaign missing cost" | `user-acquisition`. Only Meta (`ua-facebook`) and TikTok (`ua-tiktok`) have native integrations that pull spend; every other network is tracking-links-only, so every metric with Spend in its formula is structurally unavailable there. This is also what decides link type: native links fill campaign/adset/ad dynamically and can be reused across ads, manual links (`ua-tracking-links`) need every parameter typed at creation. |
| "what do I have to implement", "which SDK version", "we don't use Adapty for purchases", "Attribution doesn't appear in the dashboard", "stop sending events to Attribution" | All `user-acquisition`. No API keys, tokens, or identifiers are passed — just an SDK floor (3.9.1 iOS/Android/Flutter, 3.10.0 RN/Capacitor, 3.12.0 Unity, 3.15.0 KMP) and, if purchases are handled outside Adapty, observer mode. If **Attribution** is missing from the product switcher under the Adapty logo, the documented fix is clearing cookies and site data for adapty.io — check that before debugging anything else. Pausing event delivery is the **Integrations > Adapty** toggle. |
| "Meta rejected/disapproved the ad because of the URL" | `meta-create-campaign`, repeated in `user-acquisition`. The click link must be split: bare `https://api-ua.adapty.io/api/v1/attribution/click` in **Website URL**, the query string into **URL parameters** under Tracking. Pasting the whole link into Website URL is what gets ads rejected. |
| "how do I run a Meta/TikTok campaign", "campaign objective", "budget and creative setup" | `meta-create-campaign` / `tiktok-create-campaign` — these are ad-platform-side walkthroughs (objective, ad set, targeting, creative) with almost no Adapty configuration in them. The Adapty-side connection is `ua-facebook` / `ua-tiktok`. Don't answer one from the other. |
| "attribution suddenly stopped", "Meta token expired", "data stopped after I added a custom parameter" | `ua-facebook` (or `ua-tiktok`), two separate causes. A Meta token with an expiration date must be regenerated and reconnected before it lapses or attribution stops — `ads_read` is the only permission needed, and there are two connection paths (OAuth vs. system user token; TikTok documents only OAuth). Separately, adding an **Additional parameter** rewrites the **Click link**, so the link already live in the ad platform is stale and must be re-copied. |
| "installs attributed to the wrong campaign", "attribution window", "fingerprinting / probabilistic match" | The **Settings** tab of the campaign configuration, documented in `ua-facebook` and `ua-tiktok` (deterministic 168 h, probabilistic 6 h by default). It is per campaign configuration, not a project-wide setting — which is why two campaigns can disagree. |
| "Meta/TikTok isn't optimizing", "send conversions back to the pixel", "trials report $0 revenue", "the pixel should see organic users too" | One page each — `ua-facebook` / `ua-tiktok` — three different controls: **Events names** mapping, **Revenue override** (a percentage of the subscription price for trial events; the section only appears once **Trial started** is enabled), and **Send all events** (forwards organic and non-attributed events to the pixel). |
| "web funnel", "charge users outside the App Store", "purchases with no install event", "web2app A/B test" | `ua-funnelfox`. Linked by Project ID; channel is derived automatically from the click ID, not configured. The load-bearing constraint: FunnelFox transactions cohort on **first paid date**, not install date, so those cohorts don't line up with install cohorts elsewhere in the dashboard. |
| "prediction shows a dash", "forecast ROAS before the cohort matures", "why is pRevenue missing" | `ua-predicted-metrics`. Availability is gated on the cohort reaching its **baseline day** (the first day ~90% of initial revenue has typically landed; renewals don't count toward it), so a long trial pushes predictions later — that alone explains most em-dashes. Only `pRevenue` is modeled; the other four derive from it arithmetically. Predictions on the Cohort analysis page are a different feature (`predicted-ltv-and-revenue`). |
| "ROAS / CPI / LTV formula", "which metrics support cohorts", "ARPU and LTV disagree", "I can't chart this metric" | `ua-metrics` for definitions and formulas — cost-side metrics are non-cohort, revenue and event-count ones are, and LTV is `Revenue / Installs` while ARPU is `Revenue / Users`, which is the usual reason two numbers "don't match". A metric existing in the table does not make it chartable: the **Charts** tab plots a fixed 15-metric subset, listed in `ua-analytics`. |
| "show a different paywall to users who came from Apple Search Ads" | Not this zone, despite reading like it. That's **sdk-best-practices** (`ios-show-aa-targeted-paywall` and its platform siblings), where the source value is the string `'apple_search_ads'` and `appliedAttributionSources` is optional. What makes the misfile tempting is that Attribution's own exports do carry `asa_*` columns. |

## Gaps and misses

