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
  fbclid → facebook, ttclid → tiktok, gclid/gbraid/wbraid → google, `utm_source`+`utm_medium=paid`
  fallback, else organic. (Corrected 2026-10-01, UA `origin/develop` 4e8a64aa: the brief said "no google
  on this path"; `channel_of` now returns `'google'` for any Google click id, gbraid/wbraid being the iOS
  no-consent variants, and FunnelFox transactions carry all three ids — `funnelfox_transaction_dto.py:100-102`.) Stripe/Paddle cohort = the subscription's first charge date
  (`clickhouse_web_assembly_repository.py`), matching FunnelFox's first-paid-date rule. Test-mode/sandbox
  events are dropped on arrival on every path, so a test key connects, shows Valid, and yields nothing.
- **Google Ads has two campaign types with different wiring** (2026-09-29, UA service `origin/develop`
  3dc6f35c + dashboard-interface `origin/master` 69e745ae3). `settings.campaign_type` is `app` or `web`
  (`campaign_context/applications/constants/partners.py`; unset = web). The UI calls them the **App
  Campaigns** and **Other Campaigns** tabs (`IntegrationHeaderTabsBar.tsx`). App campaigns report through
  Google's App Conversion API keyed on per-platform App Link IDs, with a hard-coded **Provider ID**
  `8222663145` shown on the campaign settings page; Google does the install attribution and returns
  campaign/ad group/ad/keyword (`google_app_conversion_service.py`). Other (web) campaigns go through
  the Data Manager API keyed on gclid/gbraid/wbraid to one selected client account; saving creates one
  `UPLOAD_CLICKS` conversion action per target name, named as typed (`campaign_service.py`,
  `google_conversion_actions.py`). The user pastes a **Tracking template** (the `/track` link with
  `{lpurl}`) and, for web funnels, the **Final URL suffix**; auto-tagging must be on. Google configs have
  no General/Settings tabs, no Additional parameter, no Send all events and no Predicted LTV; Revenue
  override and Qualified trial exist on both types. Metrics sync is `'15 */4 * * *'` with a 3-day
  lookback (`sync_google_metrics.py`, changed from 2-hourly on 2026-05-01); country breakdown is exact
  for campaign/ad group, proportional for ad, absent for keyword. The Data Manager OAuth scope was added
  for every company on 2026-09-10 (commit ea892017); tokens granted earlier must reconnect.
- **Which Google campaign types fit which tab** (2026-09-29, UA service `origin/develop` 3dc6f35c). No code
  branches on `advertising_channel_type` (stored, never read); support follows from the wiring. App tab =
  App campaigns **for installs** (marketers still say UAC): `check_install_attribution` asks Google at first
  open, and `send_transaction_events` only sends events carrying the `adapty_campaign_id` saved then, so
  **App engagement** campaigns get nothing. Pre-registration is Google-side — unverified, left out of the
  doc. **App campaigns are documented as Android-only** (2026-10-01, Timur via support thread): the
  backend still wires iOS end to end (`ios_app_link_id`, IDFA→IDFV, iOS test events in
  `google_app_conversion_service.py` at UA `origin/develop` 4e8a64aa), but Google sends no attribution
  for iOS, and only one link ID field is required. Don't document the iOS link ID or the reason; the
  dashboard may drop the field. iOS apps go through the Other tab. **No SKAN anywhere in the UA service**
  (2026-10-01, `git grep -i 'skan|skadnetwork'` on `origin/develop`, no hits; "postback" hits are Google's
  `ad_event` postback), so the article says SKAN setup isn't needed. Other tab = anything taking a tracking template with auto-tagging: Search, PMax (tested end to end
  per product), Demand Gen, Display, Video, Shopping. Analytics depth: campaign metrics `FROM campaign`
  (all types), ad metrics `FROM ad_group_ad` (PMax has none → campaign only), keyword metrics
  `FROM keyword_view` (Search only). Reviewer feedback (Timur, 2026-09-29): readers search "UAC" and
  "PMax", so those words belong in the article text and keywords.
- **Click-to-install matching: no IDFA, no Advertising ID, and the docs must not say "fingerprint"**
  (2026-10-02, UA `origin/develop` 78f7a8d6 `attribution_context/applications/services/install_service.py`
  `_find_matched_click` + `utils/probabilistic_scorer.py`; dashboard-interface `origin/master` 23529911c
  `features/ua/integration-campaigns-page/lib/attributionWindowsLib.ts`). Deterministic = the click id in
  Android's Play Install Referrer (`adpt_click_id`, then Google's `gclid`), default 168 h, range 1–720 h.
  iOS has **no** deterministic matching. Probabilistic = clicks from the same IP prefix and OS, scored on
  time since click, language, and country; past 6 h a click also needs the install's device model and OS
  version in its User-Agent; default 6 h, range 1–24 h; applies to iOS (every user, whatever their ATT
  answer) and Android. Each kind has an on/off switch per configuration (UA commits e8ce9f54, a841842f,
  2026-10-01); Probabilistic off = iOS installs from that configuration are not attributed. The code calls
  the User-Agent check a "UA-fingerprint"; Timur (support thread, 2026-10-02) ruled the word out of the
  docs — "We don't use a fingerprint to follow apple rules". Describe the signals, never the code's label.
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
- **A bounded context in the backend is not a documented integration — until the UI ships it.** The UA
  service also carries Adjust and AppsFlyer ingest contexts; do not add an integration article for those
  on the strength of the code existing — confirm shipped status with product first. **Google Ads shipped
  (corrected 2026-09-29):** dashboard-interface commit 4c360ccbe (2026-09-28, "open the Google Ads
  integration to every company") removed `IS_UA_GOOGLE_ADS_INTEGRATION_ENABLED`, and `ua-google-ads`
  went back into `tutorial.json` the same week. So native spend integrations are now Meta, TikTok and
  Google Ads. The feature-flag removal is the kind of evidence that settles "shipped"; the backend
  context existing was not.
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
| adapty-user-acquisition | entry | marketer, analyst | 3 | tutorial |
| meta-create-campaign | — | marketer, analyst | 7 | tutorial |
| tiktok-create-campaign | — | marketer, analyst | 8 | tutorial |
| ua-amazon-s3 | — | marketer, analyst | 5 | tutorial |
| ua-analytics | entry | marketer, analyst | 6 | tutorial |
| ua-attribution-data | — | marketer, analyst | 0 | tutorial |
| ua-custom-s3 | — | marketer, analyst | 3 | tutorial |
| ua-deferred-data | — | marketer, analyst | 0 | tutorial |
| ua-facebook | — | marketer, analyst | 10 | tutorial |
| ua-funnelfox | — | marketer, analyst | 6 | tutorial |
| ua-google-ads | — | marketer, analyst | 16 | tutorial |
| ua-google-cloud-storage | — | marketer, analyst | 5 | tutorial |
| ua-integrations | entry | marketer, analyst | 4 | tutorial |
| ua-metrics | — | marketer, analyst | 2 | tutorial |
| ua-paddle | — | marketer, analyst | 6 | tutorial |
| ua-predicted-metrics | — | marketer, analyst | 5 | tutorial |
| ua-stripe | — | marketer, analyst | 6 | tutorial |
| ua-tag-ad-urls | — | marketer, analyst | 2 | tutorial |
| ua-tiktok | — | marketer, analyst | 9 | tutorial |
| ua-tracking-links | — | marketer, analyst | 2 | tutorial |
| ua-web-pixel | — | marketer, analyst | 5 | tutorial |
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
| "no ad spend for this channel", "ROAS/CPI is empty", "why is my Google Ads campaign missing cost" | `user-acquisition`. Only Meta (`ua-facebook`), TikTok (`ua-tiktok`) and — since 2026-09-28 — Google Ads (`ua-google-ads`) have native integrations that pull spend; for Google, missing cost is usually an ad-account token that went INVALID or a manager account (skipped for metrics). Every other network is tracking-links-only, so every metric with Spend in its formula is structurally unavailable there. This is also what decides link type: native links fill campaign/adset/ad dynamically and can be reused across ads, manual links (`ua-tracking-links`) need every parameter typed at creation. |
| "what do I have to implement", "which SDK version", "we don't use Adapty for purchases", "Attribution doesn't appear in the dashboard", "stop sending events to Attribution" | All `user-acquisition`. No API keys, tokens, or identifiers are passed — just an SDK floor (3.9.1 iOS/Android/Flutter, 3.10.0 RN/Capacitor, 3.12.0 Unity, 3.15.0 KMP) and, if purchases are handled outside Adapty, observer mode. If **Attribution** is missing from the product switcher under the Adapty logo, the documented fix is clearing cookies and site data for adapty.io — check that before debugging anything else. Pausing event delivery is the **Integrations > Adapty** toggle. |
| "Meta rejected/disapproved the ad because of the URL" | `meta-create-campaign`, repeated in `user-acquisition`. The click link must be split: bare `https://api-ua.adapty.io/api/v1/attribution/click` in **Website URL**, the query string into **URL parameters** under Tracking. Pasting the whole link into Website URL is what gets ads rejected. |
| "how do I run a Meta/TikTok campaign", "campaign objective", "budget and creative setup" | `meta-create-campaign` / `tiktok-create-campaign` — these are ad-platform-side walkthroughs (objective, ad set, targeting, creative) with almost no Adapty configuration in them. The Adapty-side connection is `ua-facebook` / `ua-tiktok`. Don't answer one from the other. |
| "attribution suddenly stopped", "Meta token expired", "data stopped after I added a custom parameter" | `ua-facebook` (or `ua-tiktok`), two separate causes. A Meta token with an expiration date must be regenerated and reconnected before it lapses or attribution stops — `ads_read` is the only permission needed, and there are two connection paths (OAuth vs. system user token; TikTok documents only OAuth). Separately, adding an **Additional parameter** rewrites the **Click link**, so the link already live in the ad platform is stale and must be re-copied. |
| "installs attributed to the wrong campaign", "attribution window", "fingerprinting / probabilistic match" | The **Settings** tab of the campaign configuration, documented in `ua-facebook` and `ua-tiktok` (deterministic 168 h, probabilistic 6 h by default). It is per campaign configuration, not a project-wide setting — which is why two campaigns can disagree. "Does matching use the IDFA / apply to users who denied ATT" → no IDFA; probabilistic applies to all iOS users (see Sources of truth). As of 2026-10-02 both articles still say IDFA and "device fingerprinting" — wrong, see Gaps. |
| "Meta/TikTok isn't optimizing", "send conversions back to the pixel", "trials report $0 revenue", "the pixel should see organic users too" | One page each — `ua-facebook` / `ua-tiktok` — three different controls: **Events names** mapping, **Revenue override** (a percentage of the subscription price for trial events; the section only appears once **Trial started** is enabled), and **Send all events** (forwards organic and non-attributed events to the pixel). |
| "web funnel", "charge users outside the App Store", "purchases with no install event", "web2app A/B test" | `ua-funnelfox`. Linked by Project ID; channel is derived automatically from the click ID, not configured. The load-bearing constraint: FunnelFox transactions cohort on **first paid date**, not install date, so those cohorts don't line up with install cohorts elsewhere in the dashboard. |
| "prediction shows a dash", "forecast ROAS before the cohort matures", "why is pRevenue missing" | `ua-predicted-metrics`. Availability is gated on the cohort reaching its **baseline day** (the first day ~90% of initial revenue has typically landed; renewals don't count toward it), so a long trial pushes predictions later — that alone explains most em-dashes. Only `pRevenue` is modeled; the other four derive from it arithmetically. Predictions on the Cohort analysis page are a different feature (`predicted-ltv-and-revenue`). |
| "ROAS / CPI / LTV formula", "which metrics support cohorts", "ARPU and LTV disagree", "I can't chart this metric" | `ua-metrics` for definitions and formulas — cost-side metrics are non-cohort, revenue and event-count ones are, and LTV is `Revenue / Installs` while ARPU is `Revenue / Users`, which is the usual reason two numbers "don't match". A metric existing in the table does not make it chartable: the **Charts** tab plots a fixed 15-metric subset, listed in `ua-analytics`. |
| "show a different paywall to users who came from Apple Search Ads" | Not this zone, despite reading like it. That's **sdk-best-practices** (`ios-show-aa-targeted-paywall` and its platform siblings), where the source value is the string `'apple_search_ads'` and `appliedAttributionSources` is optional. What makes the misfile tempting is that Attribution's own exports do carry `asa_*` columns. |

## Gaps and misses

- **`ua-facebook` and `ua-tiktok` Settings sections misdescribe matching** (2026-10-02, found from a
  support thread on config 1045; grep `idfa|fingerprint|probabilis|determinis` across every article in
  this zone — only these two hit). Both say deterministic uses "IDFA on iOS or Advertising ID on Android"
  and probabilistic uses "device fingerprinting"; neither mentions that iOS is probabilistic-only or the
  on/off switches. Ground truth is in Sources of truth above. `ua-google-ads` has no Settings tab, so it
  is out of scope. Rewritten on branch `docs/slack-thread-fixes` (2026-10-02), with the shared
  screenshot `ua-meta-attribution-settings.webp` replaced. UI naming: the section heading is **New user
  attribution** (`IntegrationAttributionForm.tsx:59`); **Clicks** is only the row label
  (`AttributionWindows.tsx` `sectionTitle`) — don't call it a section.

- **Revenue override's button is "Add event", not "Add override", on every network** (2026-09-29,
  dashboard-interface `IntegrationSettingsFormContent.tsx:364,398` — one shared component). `ua-facebook`
  and `ua-tiktok` still say **Add override**; `ua-google-ads` uses the current label. `ua-tiktok` also
  still names the section **Events names** where the UI says **Events mapping** — not re-verified for
  TikTok specifically; checked only the Google form.

