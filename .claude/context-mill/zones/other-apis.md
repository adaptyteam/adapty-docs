---
zone: other-apis
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

A grouping of Adapty's non-Server-Side-API-v2 HTTP APIs: the Web API (lets a web app fetch a paywall by placement ID and record paywall views/purchases from a website), and the Analytics Export API (pulls raw subscription and revenue event data out of Adapty for a data warehouse or BI tool). Each is its own versioned surface with its own auth scheme and request/response docs, distinct from the general Server-Side API v2. Readers are developers building an integration against one specific API, most often to pull analytics data out of Adapty or drive a paywall on a website.

## Surfaces

## Sources of truth

**The maintained reference is the spec, not an article.** Each surface here owns one YAML under `src/api-reference/specs/`, and all three are in this zone's roster for that reason:

| Surface | Spec | Published route |
|---|---|---|
| Web API | `web-api.yaml` | `api-web` |
| Analytics Export API | `export-analytics-api.yaml` | `api-export-analytics` |
| Adapty Mail API | `adapty-mail-api.yaml` | `api-mail` |

A new endpoint, a changed request/response shape, a new field or an auth change means editing the YAML. `web-api-objects.mdx` is **not maintained** — never edit it to describe a field change.

Two facts that are easy to get wrong here:

- **The Mail API spec is bigger than the public surface.** Only two Profile endpoints are public — `saveProfile` and `saveTransactionEvent`, on `api-mail.adapty.io`, authenticated with the Adapty Mail secret key from Settings as a Bearer token and scoped to one project. The rest of the spec is internal; do not document it as if a customer can call it.
- **Registering a new API surface touches four places**, not one: the spec YAML, `src/api-reference/config.json`, the `api.json` sidebar, and `RUNTIME_ROUTE_PREFIXES` in the link checker (its pages are runtime routes, so links into them look broken otherwise). Model bearer auth as `apiKey`/header — the code-sample generator only injects `apiKey`. Links out of a spec description must be absolute `/docs/…`.

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-mail-api.yaml | reference | dev | 2 | — |
| export-analytics-api | — | dev | 1 | api |
| export-analytics-api-authorization | — | dev | 5 | api |
| export-analytics-api-requests | — | dev | 2 | api |
| export-analytics-api.yaml | reference | dev | 7 | — |
| web-api | — | dev | 3 | api |
| web-api-authorization | — | dev | 2 | api |
| web-api-requests | — | dev | 2 | api |
| web-api.yaml | reference | dev | 3 | — |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **server-side-api** — is the endpoint part of the general Server-Side API v2 (profiles, access levels, custom-store/web sync), or one of these specialized surfaces (Web API, Export Analytics API)? If v2, it's server-side-api.
- **analytics** — is the ticket about the mechanics of exporting analytics data via the API (auth, request shape, pagination), or about what a metric or chart means on the dashboard? Metric definitions and dashboard charts are analytics; the export endpoint itself is other-apis.
- **agent-tooling** — is this about the Export Analytics API itself, or about using an AI agent to query it in plain language (export-analytics-with-ai)? The latter is agent-tooling.
- **adapty-mail** — is the question about the Mail API's own endpoints/auth, or about setting up and using the Adapty Mail integration on the dashboard? Dashboard setup and email flows are adapty-mail.
- **paywalls-legacy / flow-design** — is the ticket about the Web API mechanics for fetching or recording a web paywall (other-apis), or about designing/configuring that web paywall itself on the dashboard (paywalls-legacy, or flow-design for a flow-era web paywall)?

## Ticket language

Three unrelated HTTP surfaces share this zone and a ticket almost never names the right one, so read
the first row before the rest. For an endpoint, a field, a status code or an auth scheme the **spec
YAML is the answer** and the `.mdx` pages are only guides; the unmaintained web-api-objects page is
never the answer. Corpus-wide synonyms live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "401 Unauthorized", "which API key do I use", "`Api-Key` or `Bearer`?" | Every surface authenticates differently — the top misroute here. Web API: **public** key, `Authorization: Api-Key public_live_…`, host `api.adapty.io` (`web-api-authorization`). Analytics Export: **secret** key, `Api-Key secret_live_…`, host `api-admin.adapty.io` (`export-analytics-api-authorization`). Adapty Mail: the **Adapty Mail** secret key as `Bearer secret_live_…`, host `api-mail.adapty.io`, project-scoped so no project ID in the body (`adapty-mail-api.yaml`). Rotating a leaked key (generate new, then delete old) is in `export-analytics-api-authorization`. |
| "pull our revenue / MRR / LTV / churn / retention out of Adapty", "feed our warehouse or BI tool" | `export-analytics-api` maps the business question to the right endpoint; the request/response contract is `export-analytics-api.yaml`. One chart per request — `chart_id` is a closed enum, so if the metric isn't in it the API can't return it at all. |
| "the export came back as JSON, we asked for CSV" | `export-analytics-api.yaml` — `format` defaults to `json` even though the guides frame this feature as CSV export. Pass `format: "csv"`. |
| "429 Too Many Requests", "how do I paginate the export" | `export-analytics-api-authorization` — 2 requests/second per API key, restated on every operation in `export-analytics-api.yaml`. There is **no pagination**: a response is bounded by the `date` filter, so narrow the period instead of paging. |
| "numbers don't match Ads Manager", "revenue landed on the wrong day", "install-date vs purchase-date revenue" | `export-analytics-api.yaml` — the analytics endpoint is event-based (transaction date), the cohort endpoint is install-date cohort based, and Ads Manager is cohort-based, so reconcile against cohort. If the ticket is about what a metric *means* rather than which endpoint returns it, it's `analytics`. |
| "timezone is off", "days are grouped one day early" | `export-analytics-api-authorization` — the optional `Adapty-Tz` header (IANA name) decides grouping. Export-only; the Web API has no equivalent. |
| "list our placements / audiences / A-B tests programmatically", "audit the setup without clicking through" | `export-analytics-api.yaml`, `retrievePlacementInfo`. Spec-only — no `.mdx` guide mentions it, so a search of the articles alone comes back empty. |
| "show a paywall on our website", "fetch a paywall by placement from a web app", "A/B test the web paywall" | `web-api` for the end-to-end flow, `web-api.yaml` for `getPaywall`. It returns products plus remote config, never a builder-rendered view — your page does the rendering. Designing that paywall is `paywalls-legacy` (or `flow-design` for a flow-era web paywall). |
| "web paywall shows zero views", "conversion rate is wrong on web" | `web-api.yaml`, `recordPaywallView`. Without it Adapty only ever sees purchasers, so conversion is computed against nothing; the call needs the `variation_id` returned by `getPaywall`. |
| "record the purchase / transaction from our website in Adapty" | **Not the Web API** — it has only three endpoints and none of them takes a transaction. Profile creation and transactions are `server-side-api`; a hosted Stripe/Paddle/custom-store sync is `web-payments`. `web-api` points at the observer-mode article in `sdk-flows-manual` for the variation-ID linking pattern, which is the same on web. |
| "404 profile not found", "which ID identifies the user" | The profile must exist before you call the Web API — `web-api` makes creating it step 1, via `server-side-api`. `recordPaywallView` and `addAttribution` 404 with a profile-not-found error; `getPaywall`'s 404 instead means the variation wasn't found. Either `customer_user_id` (your ID) or `profile_id` (Adapty's) identifies the user — `web-api-requests` shows where each appears in the dashboard. |
| "attach campaign / UTM data to web users" | `web-api.yaml`, `addAttribution` — custom attribution only (status, channel, campaign, ad group, ad set, creative). Attribution that comes from a network integration is `attribution`. |
| "push subscribers or purchase history to Adapty Mail from our backend" | `adapty-mail-api.yaml`, but only `saveProfile` and `saveTransactionEvent` are public — treat the rest of the spec as internal. A profile with just an email reaches the *never purchased* flow only; every purchase-driven flow (renewal cancelled, billing issue, expired, refunded) needs transaction events too. Dashboard setup, segments and the step-by-step walkthrough are `adapty-mail`. |
| "Postman collection", "test environment variables" | `web-api-requests` and `export-analytics-api-requests` — these two pages are essentially just the collection download plus variable names, and one shared environment covers the server-side, web and export APIs. |

## Gaps and misses

