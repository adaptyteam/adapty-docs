---
zone: integrations
sources: []
reviewed_shape: 99bfe705d975
reviewed_at: 2026-08-10
---

## What this is

Third-party integrations: the destinations Adapty forwards subscription, attribution, and paywall-visit
data to (attribution MMPs, analytics platforms, messaging/push platforms), plus the two bulk delivery
mechanisms — real-time webhook and daily-batch S3/Google Cloud Storage export — and the shared plumbing
around them (event catalog, event-sequence flows, dashboard-wide integration settings, delivery-status
and error troubleshooting). In the sidebar this is the "Third-party integrations" category in
`tutorial.json`, almost verbatim — plus two roster members the sidebar files elsewhere:
`apple-search-ads` is cross-listed under **App settings**, and `firebase-apps` sits under
**Platform resources**, not this category at all (see Boundaries and Gaps and misses).

## Surfaces

- Adapty Dashboard **Integrations -> \<Provider\>** setup pages — credentials, per-event toggles, and
  event-name mapping. One per destination article.
- The webhook JSON payload (`POST` to the developer's own endpoint) — canonical schema lives in
  `webhook-event-types-and-fields`.
- The daily S3 / Google Cloud Storage gzip `.csv` export — a separate, narrower schema
  (`revenue_usd`/`proceeds_usd`/`net_revenue_usd` columns), not a re-serialization of the webhook's
  `event_properties` field names.
- In-app SDK calls the reader adds to their own app code: `setIntegrationIdentifier()` (hand a
  destination's device/user ID to Adapty) and `updateAttribution()` (push attribution data Adapty
  received from a source back into the user's profile). Documented per destination under
  "SDK configuration" / "Connect your app to X".
- Dashboard-wide integration settings (Reporting Proceeds, Exclude Historical Events, Send User
  Attributes, Data residency, etc.) in `configuration`, shared across most destinations.

## Sources of truth

- **dashboard-backend** — integration setup page field labels, `required` flags, and hint text come
  from `portal/integration_context/constants/share.py` in that repo, not from `dashboard-interface`
  (which only carries the field key, per its own entry in `sources.md`). Cite this id for any task about
  why a dashboard integration field says what it says.
- **server-side-api-spec** — `webhook-event-types-and-fields` links two of its operations directly
  (`setTransaction`, `grantAccessLevel`) for the store-override and manually-granted-access cases it
  documents.
- TODO(owner): no entry in `sources.md` covers the webhook/event **payload schema** itself (field names,
  types, which fields are event-type-specific). The one clean precedent of a schema change (commit
  `c65300c71`, "New webhook fields", 2026-07-22) shows the docs PR itself introducing the new field
  definitions, with no backend source cited. Is there a backend repo/service that owns this schema, or
  is a verified live test payload the only ground truth an agent can check against?

## What we document, what we don't

- We document: how to connect a destination (dashboard credentials + the one-time SDK call it needs),
  which Adapty events reach it, the exact wire format Adapty sends to that destination's own API (Adjust's
  S2S params, AppsFlyer's `inappevent` body, Amplitude's HTTP API v2 shape, etc.), and how to read
  delivery status or troubleshoot a failure.
- We do not document how the destination itself processes or displays the data once received — every
  article stops at the wire and links out to the provider's own docs for anything past that.
- We do not document backend delivery mechanics beyond the contract already published to the reader
  (webhook retry timing: 5-60s typical delivery, exponential backoff up to 9 retries over 24h; daily
  export at a fixed UTC hour). How the CSV or webhook payload is assembled server-side is out of scope.
- Per the tool's standing rule, this brief does not evaluate whether a destination Adapty doesn't support
  is a coverage gap — both `attribution-integration` and `analytics-integration` already route that
  feedback to a feature-request link, and that's a product decision, not a docs one.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adjust | — | dev, analyst | 7 | tutorial |
| airbridge | — | dev, analyst | 5 | tutorial |
| amplitude | — | dev, analyst | 4 | tutorial |
| analytics-integration | entry | dev, analyst | 4 | tutorial |
| apple-search-ads | — | dev, analyst | 7 | tutorial |
| appmetrica | — | dev, analyst | 8 | tutorial |
| appsflyer | entry | dev, analyst | 9 | tutorial |
| asapty | — | dev, analyst | 6 | tutorial |
| attribution-integration | entry | dev, analyst | 5 | tutorial |
| branch | — | dev, analyst | 5 | tutorial |
| braze | — | dev, analyst | 3 | tutorial |
| configuration | — | dev, analyst | 2 | tutorial |
| event-flows | — | dev, analyst | 17 | tutorial |
| event-statuses | — | dev, analyst | 0 | tutorial |
| events | — | dev, analyst | 3 | tutorial |
| facebook-ads | — | dev, analyst | 5 | tutorial |
| firebase-and-google-analytics | — | dev, analyst | 17 | tutorial |
| firebase-apps | — | dev, analyst | 1 | tutorial |
| google-cloud-storage | — | dev, analyst | 9 | tutorial |
| handle-integration-errors | — | dev, analyst | 7 | tutorial |
| messaging | entry | dev, analyst | 1 | tutorial |
| mixpanel | — | dev, analyst | 7 | tutorial |
| onesignal | — | dev, analyst | 6 | tutorial |
| posthog | — | dev, analyst | 5 | tutorial |
| pushwoosh | — | dev, analyst | 3 | tutorial |
| s3-exports | — | dev, analyst | 7 | tutorial |
| set-up-webhook-integration | — | dev, analyst | 6 | tutorial |
| singular | — | dev, analyst | 4 | tutorial |
| slack | — | dev, analyst | 4 | tutorial |
| splitmetrics | — | dev, analyst | 5 | tutorial |
| switch-from-appsflyer-s2s-api-2-to-3 | — | dev, analyst | 0 | tutorial |
| tenjin | — | dev, analyst | 5 | tutorial |
| test-webhook | — | dev, analyst | 4 | tutorial |
| webhook | entry | dev, analyst | 1 | tutorial |
| webhook-and-etl | entry | dev, analyst | 0 | tutorial |
| webhook-event-types-and-fields | — | dev, analyst | 7 | tutorial |
<!-- /mill:auto -->
## Reader jobs

Two readers, not one:

1. "I'm a developer wiring a specific destination into my app and dashboard." They land on one
   destination article (or a webhook setup/test page), match dashboard credentials to the third
   party's console, add the one SDK call that destination needs (`setIntegrationIdentifier` and/or
   `updateAttribution`), and confirm events are flowing. They rarely read two destination articles in one
   session.
2. "I'm an analyst or support person who already has data flowing and needs to know what a field means,
   why an expected event didn't fire, or what one JSON/CSV column contains." They land on
   `webhook-event-types-and-fields`, `event-flows`, `event-statuses`, `handle-integration-errors`, or a
   "Data structure" section of `s3-exports`/`google-cloud-storage` — never a destination page.

The roster marks six articles `entry` rather than one (`analytics-integration`, `appsflyer`,
`attribution-integration`, `messaging`, `webhook`, `webhook-and-etl`): a reader's actual landing page
depends on which of the four hub categories — attribution / analytics / messaging / webhook-and-ETL —
their task falls into, since search queries and tickets name the specific destination or delivery
mechanism, not "integrations" as a whole.

`configuration` is first in the sidebar under "Third-party integrations" but is *not* marked entry, and
correctly so: it lists dashboard-wide settings shared by most destinations but never links out to the
four category hub pages. A reader who lands there first (e.g. via search) gets no path forward into the
rest of the zone — they have to already know which category to browse next. This is a genuine
orientation gap in the current content, not a deliberate design choice.

## Ripple rules

**Duplication policy, from the docs owner (2026-08-10).** The goal is no duplication — prefer a link to
the canonical article, or a reusable snippet where the text is genuinely identical and load-bearing. But
apply it rationally rather than mechanically: reusables in this repo are often `Callout` components, and a
page stacked with them reads worse than the duplication it replaced. So before de-duplicating, ask whether
the reader loses a step they need in place; when in doubt prefer a link over a new reusable, and never add
a reusable purely to satisfy the rule.

Applied here: `messaging` and `analytics-integration` hold byte-identical copies of the ~50-row event
property table. Until one is made canonical, edit both — and if it is ever de-duplicated, a link is the
right shape, not a reusable: a 50-row table inside a callout would be unreadable.


1. **A new webhook/event property always touches `webhook-event-types-and-fields` (the canonical
   schema); whether it also lands in `messaging`/`analytics-integration`'s duplicated summary table or
   the S3/GCS CSV column tables is a product decision, not automatic.** Evidence: commit `c65300c71`
   ("New webhook fields", 2026-07-22) added `original_price_usd`/`original_price_local`,
   `discount_amount_usd`/`discount_amount_local`, and `store_offer_number_of_periods` only to
   `webhook-event-types-and-fields`'s tables. In the same commit, `messaging`, `analytics-integration`,
   `google-cloud-storage`, and `s3-exports` received only the shared `<UsdConversion />` disclaimer
   snippet — not the new field rows. Older base fields (`price_usd`, `proceeds_usd`, `net_revenue_usd`,
   `subscription_expires_at`, etc.) do appear in all of these tables, so the rule reads as "new fields
   default to webhook-only until told otherwise," not "these tables are always kept in lockstep."
2. **`messaging`'s and `analytics-integration`'s "## Event properties" tables are a maintained
   duplicate, not a canonical-plus-copy relationship.** Confirmed byte-identical today (`diff` of the
   current table sections returns nothing). Nothing enforces that an edit to one is mirrored in the
   other — a docs task must apply the change by hand to both.
3. **Only `braze` and `posthog` deep-link into that duplicated table** (`[Here](messaging#event-properties)`
   / `[event-specific properties](messaging#event-properties)`) — confirmed by grepping all 36 articles
   for the anchor. `onesignal`, `pushwoosh`, and `slack` do **not** link to it; each carries its own much
   smaller "custom tag" table (~10 destination-specific tags), unrelated to the shared event-properties
   list. Editing the shared table has no ripple into those three.
4. **Webhook schema/behavior changes ripple outside this zone** into `event-feed` (`subscribers-and-profiles`
   zone) and `server-side-api-objects` (`server-side-api` zone). Evidence: commit `39cdae512` ("Webhook
   docs — Improvements", 2026-05-26) touched `event-flows`, `set-up-webhook-integration`, and
   `webhook-event-types-and-fields` together with `event-feed`, `server-side-api-objects`, and both
   copies of `adapty-api.yaml` in one commit.
5. **The AI-agent guides for this zone's two delivery surfaces live in a different zone
   (`agent-tooling`), not here.** `webhook` tips into `handle-webhooks-with-ai`; the S3/GCS surface tips
   into `export-analytics-with-ai`. Both ids are assigned to `agent-tooling` in `zones.json`. A task that
   changes webhook or export behavior should check whether either agent guide needs a matching update,
   even though neither article is in this roster.

## Boundaries

- `apple-search-ads` is this zone's article for basic ASA attribution (the AdServices/SDK-level
  integration also relied on by `splitmetrics` and `asapty`). The **Adapty Ads Manager** product
  (campaign management, bidding, automations) is a separate `ads-manager` zone with its own connection
  flow — the article itself says so explicitly ("The Apple Ads integration in App settings is used only
  for basic analytics... Adapty Ads Manager uses a separate connection"). Don't fold Ads Manager work
  into this zone.
- `attribution-integration` (third-party MMP attribution: Adjust, AppsFlyer, etc.) is a different thing
  from **Adapty Attribution**, Adapty's own built-in acquisition dashboard (docs ids `user-acquisition` /
  `adapty-user-acquisition`, zone `attribution`), which `attribution-integration` tips readers toward.
  Same word, two zones — the article even names Adapty's own feature "Adapty Attribution" and links out
  rather than describing it here.
- `firebase-and-google-analytics` (this zone — the analytics-forwarding integration) is unrelated to
  `firebase-apps` (also in this zone's roster, but filed under the "Platform resources" sidebar
  category, not "Third-party integrations"). `firebase-apps` is a short Firebase-Auth-identify-sync
  recipe written against a pre-v4 Adapty API — it predates, and has nothing to do with, the
  analytics-forwarding integration despite the shared "Firebase" name.
- `google-cloud-storage` / `s3-exports` (raw daily per-event `.csv` export, this zone) are unrelated to
  the **Export Analytics API** (an aggregated metrics query API — revenue, MRR, cohorts, funnels; docs id
  `export-analytics-with-ai`, spec `analytics-export-api-spec`, zone `agent-tooling`). Both get called
  "export" in casual language; they are different products with different schemas and different owners.
- `firebase-and-google-analytics`'s Stripe-purchase caveat links to `stripe`, which belongs to the
  `web-payments` zone, not this one.
- Push (webhook, real-time) vs. batch (S3/GCS, daily) is a real delivery-guarantee difference, but the
  docs already treat it as one area, and this brief keeps it that way: `webhook-and-etl` is the shared
  entry point for both, and each destination article states its own "Schedule" (e.g. "Real-time" vs.
  "every 24 hours") in an Integration Characteristics table rather than the docs splitting into two
  zones. Splitting would separate the entry article from half its own children for no reader benefit.

## Ticket language

A ticket that names its destination ("set up Mixpanel", "send events to Braze") routes itself — the map
already carries all 36 titles, and one article per vendor means there is nothing to disambiguate. So the
rows below are almost all *mechanism* rows: the cases where the ticket's vocabulary is about identity,
revenue figures, event delivery, or naming, and the right destination is a shared plumbing article rather
than the vendor page the reporter had open. Corpus-wide synonyms (payload field ↔ event property, the
money-field family, USD conversion, ASA naming, Adapty Attribution) live in `aliases.md` and are not
repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "what does field X contain", "dedupe webhook events", "events arriving out of order", "what's in a `subscription_started` payload" | `webhook-event-types-and-fields` — the canonical schema, and also where the ordering and idempotency guarantees are stated. Not `set-up-webhook-integration`, which is delivery setup only. |
| "why didn't event X fire", "Restore Purchases sent nothing", "what order do upgrade/refund/trial-conversion events arrive in", "Family Sharing", "access moved between accounts" | `event-flows`. A sequence question, not a schema question — the reader wants which events a lifecycle produces, in what order. |
| "event exists in Adapty but never reached my destination" | `events` first: not every event type goes to every destination — `access_level_updated` is webhook-only. Confirm the event is even eligible before treating it as a delivery failure. |
| "event is red / grey in the dashboard", "event failed", "integration receives nothing", "missing integration ID", "it stopped after N days" | `event-statuses` for what a status colour and the feed retention window mean, then `handle-integration-errors` for causes — never the destination article. Two of the most common causes are non-bugs: credentials that never finished saving, and events that predate the integration, which is the **Exclude Historical Events** setting in `configuration` (also where "our old subscribers never showed up" and "backfill what we missed" belong). |
| "OneSignal integration doesn't work", "we set it up and nothing arrives" (OneSignal specifically) | `onesignal` — check the plan before debugging anything. Since 17 April 2023 OneSignal's **Free** plan no longer supports this integration; it needs Growth, Professional or higher. It presents as a broken integration, not as a plan limit. |
| "AppsFlyer deprecated our endpoint", "move to S2S API 3", "which AppsFlyer API version are we on" | `switch-from-appsflyer-s2s-api-2-to-3`. Worth a row despite the descriptive title, because the load-bearing fact is not in it: **the switch is one-way** — you cannot return to API 2 once made. That belongs in the answer before anyone starts. |
| "user can't be found in the destination", "distinct_id / device id doesn't match", "events landed on the wrong profile", "appsflyer_id not set before login" | The destination article's own SDK section (`mixpanel`, `amplitude`, `appmetrica`, `posthog`, `onesignal`, `braze`, `pushwoosh`, …), i.e. `setIntegrationIdentifier`. The constraint that resolves nearly every phrasing: the identifier has to reach Adapty *before* the events you expect to see, or those events are already gone to a different (or anonymous) identity. |
| "our numbers don't match yours", "revenue undercounted in the destination", "gross vs net", "should this be after Apple's cut" | `configuration` — **Reporting Proceeds** is a dashboard-wide toggle, so check it before reading any destination article's own revenue caveats. A per-destination discrepancy section is the second stop, not the first. |
| "revenue counted twice", "double counting" | Usually the destination's own SDK is also logging purchases: `facebook-ads` (disable Meta SDK automatic event logging) and `appmetrica`. Adapty sending a duplicate is the rarer cause. |
| "events dropped for Mixpanel / Amplitude", "we're on the EU cluster" | `configuration` plus `mixpanel` — a wrong data-residency setting drops events silently rather than erroring, so the ticket reads as "integration broken". |
| "rename the events we send", "match our own event taxonomy", "map event names to our ids" | `configuration` for per-destination custom event names; `set-up-webhook-integration` for the webhook's own name mapping. Not the destination article. |
| "one webhook per environment?", "fan out to several services", "verification request keeps failing", "retry/backoff schedule", "auth header for our endpoint" | `set-up-webhook-integration` — all endpoint-side setup constraints. Split off the one adjacent phrasing that isn't: "it didn't fire after a test purchase" / "prove it works" is `test-webhook`, where the URL is already configured and the reader wants the verification loop. |
| "custom / in-house attribution source", "we push attribution ourselves", "which source wins" | `attribution-integration` — `updateAttribution`, plus the single-attribution-source rule (and on iOS, Apple's data taking priority) that explains most "our source was ignored" reports. |
| "GDPR opt-out", "user asked not to be tracked", "disable IDFA / GAID collection" | `analytics-integration` (the `analyticsDisabled` profile parameter) — a zone-wide capability that readers look for on the destination page. |
| "connect SplitMetrics / Asapty" | `splitmetrics` / `asapty`, but both require the `apple-search-ads` integration to be connected first — an undocumented-looking prerequisite that surfaces as "not receiving events". |
| "field X isn't in our CSV", "which columns does the export have", "paywall impression columns" | `s3-exports` / `google-cloud-storage` "Data structure" — a narrower, separately-maintained schema, so a field's presence in the webhook reference says nothing about the export. |
| a "Firebase" ticket | Split by what it's about: event forwarding / GA4 / Google Ads → `firebase-and-google-analytics`; keeping Firebase Auth user ids in sync with Adapty profiles → `firebase-apps` (and see Gaps and misses before citing its code). |

## Gaps and misses

- `firebase-and-google-analytics` is a recently and thoroughly rewritten article (Troubleshooting,
  Limitations, `ZoomImage` component, cross-links to Stripe/S3/GCS/Adapty Attribution) — visibly newer
  and deeper than the rest of the zone's destination articles, most of which still follow a shorter,
  older template (credentials screenshot → event toggles → one SDK snippet). A reader bouncing between,
  say, `posthog` and `firebase-and-google-analytics` will notice the depth mismatch.
- Least-recently-touched articles in the zone (last git-log date 2026-01-26, the oldest group): `asapty`,
  `event-statuses`, `firebase-apps`, `handle-integration-errors`, `pushwoosh`, `slack`, `webhook-and-etl`.
- `firebase-apps` uses a pre-v4 Adapty API throughout (`Adapty.activate("KEY")`, `PurchaserInfoModel`,
  `Adapty.delegate`) — see Boundaries. Flag before citing it as a pattern for any current-SDK task.
- **Answered by the docs owner (2026-08-10): there is no docs-side default. Which integrations carry a
  field is a fact about the backend, and it is verified by reading the code, not inferred from the last
  ticket.** So a task that adds or changes an event field is not done when the webhook article is
  updated: read the backend to establish which destinations actually emit it, then update exactly those.
  Commit `c65300c71` scoping `original_price_*` and `discount_amount_*` to the webhook article is what
  the code said at that time, not a rule to reuse. See *Sources of truth* for where to read.
- The payload schema needs a registered ground-truth source, because the rule above makes reading the
  backend mandatory rather than optional for this zone. Until `sources.md` has an entry for it, use
  `dashboard-backend` and say in the task which module you read.
