---
zone: attribution
sources: []
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

## What we document, what we don't

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
| ua-facebook | — | marketer, analyst | 8 | tutorial |
| ua-funnelfox | — | marketer, analyst | 4 | tutorial |
| ua-google-cloud-storage | — | marketer, analyst | 5 | tutorial |
| ua-integrations | entry | marketer, analyst | 4 | tutorial |
| ua-metrics | — | marketer, analyst | 2 | tutorial |
| ua-predicted-metrics | — | marketer, analyst | 5 | tutorial |
| ua-tiktok | — | marketer, analyst | 8 | tutorial |
| ua-tracking-links | — | marketer, analyst | 1 | tutorial |
| user-acquisition | — | marketer, analyst | 6 | tutorial |
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
| "yesterday's data isn't in the bucket", "why isn't this streaming", "re-export a specific day" | Same three articles. There is no streaming: one CSV per *previous full UTC calendar day*, written daily at 4:00 UTC, plus a manual per-date export. A gap in the bucket is almost always the schedule, not a broken connection. |
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

