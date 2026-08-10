---
zone: server-side-api
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Adapty's Server-Side API v2 — the REST API a developer's own backend calls to manage subscribers and entitlements without going through a mobile SDK: creating or updating a profile, granting or checking an access level programmatically, and syncing purchases made outside Apple/Google (web checkouts, custom stores) into Adapty so entitlements and analytics stay accurate. It's the backend counterpart to the SDKs — reached for when a server needs authoritative, server-to-server control over subscription state, e.g. granting a promo access level or reconciling a payment taken through a custom billing system. Authorization mechanics (API keys, request/response format) and the OpenAPI reference spec live here as guides. Readers are backend developers integrating Adapty server-to-server, not app developers embedding a mobile SDK.

## Surfaces

## Sources of truth

**The maintained reference is the spec, not an article.** `src/api-reference/specs/adapty-api.yaml` is the only place endpoint truth lives — a new endpoint, a changed request/response shape, a new field, a renamed parameter, an auth change all mean editing that YAML. It is in this zone's roster as `adapty-api.yaml` for exactly this reason, and its `api_hash` moves when an `operationId` changes.

`server-side-api-objects.mdx` and `Offer.md` are **not maintained** — they are older hand-written object references that the team has stopped updating. Never edit them to describe a field change; put the field in the spec. (`ss-authorization` still links to `server-side-api-objects`; where that link should point instead is an open owner decision, not something to fix in passing.)

Backend ground truth, when the spec itself is what's in question: the `adapty-dashboard-api` repo in `~/Documents`. Field composition — which integrations or payloads carry a given field — must be read out of that code, never inferred from how a neighbouring doc describes it.

Naming and linking, both settled conventions:

- It is the **Server-side API**. Never "Server API".
- Concept-level link → `getting-started-with-server-side-api`.
- A specific endpoint → `api-adapty/operations/<operationId>`, the route the spec generates.
- Don't add "if you get a 403, contact support" boilerplate steps.

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-api.yaml | reference | dev | 12 | — |
| api-guides | entry | dev | 0 | api |
| getting-started-with-server-side-api | — | dev | 5 | api, tutorial |
| grant-access-level | — | dev | 3 | api |
| server-side-api-specs | — | dev | 2 | api |
| ss-authorization | — | dev | 4 | api |
| sync-purchases-from-custom-stores | — | dev | 4 | api |
| sync-subscribers-from-web | — | dev | 7 | api |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **other-apis** — is the endpoint part of the general Server-Side API v2 (profiles, access levels, custom-store/web sync), or a distinct versioned surface (Web API, Analytics Export API, Mail API)? The latter is other-apis.
- **agent-tooling** — is the ticket about the API itself (endpoints, auth, spec), or about using an AI coding agent/the Developer CLI to call that API on the developer's behalf (server-side-api-with-ai, handle-webhooks-with-ai, developer-cli-*)? The wrapping guide is agent-tooling.
- **sdk-flows-manual** — is access being granted or checked from the developer's own backend (server-side-api), or from inside the mobile app using the SDK's purchase/restore/observer-mode methods (sdk-flows-manual)?
- **access-levels** — is the ticket about the API mechanics of granting/revoking access programmatically (server-side-api), or about the access-level concept and its dashboard configuration — creating an access level, assigning it to a product (access-levels)?
- **web-payments** — is this about the general Server-Side API v2, or about integrating a specific payment processor (Stripe, Paddle, a custom store) for web checkout, which is web-payments' territory? `sync-purchases-from-custom-stores` bridges the two: the sync call is server-side-api, the payment-processor setup itself is web-payments.

## Ticket language

Many rows land on `adapty-api.yaml` rather than a guide: the guides cover five scenarios, the spec
covers every endpoint and every field, and several of the constraints tickets trip over exist only
there. Corpus-wide synonyms (server-side API ↔ S2S, access level ↔ entitlement, profile ↔ customer
profile) live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "comp a subscription", "free premium for an investor / beta tester / support case", "promo code unlocks premium" | `grant-access-level`. `access_level_id` is the only required field; `starts_at`/`expires_at` are optional and omitting `expires_at` means lifetime. |
| "web/Stripe purchase gave access but there's no revenue in analytics", "MRR missing for web subscribers" | The grant-vs-transaction split, and the most consequential distinction in this zone: `grantAccessLevel` deliberately does **not** reach analytics or the Event Feed (webhook integration only), while `setTransaction` records revenue and fires all integrations. `sync-subscribers-from-web` grants; `sync-purchases-from-custom-stores` sets a transaction. Pick by whether the ticket wants revenue tracked. |
| "Amazon Appstore purchases not showing up", "Microsoft Store / our own web store revenue missing", "third-party store transactions not attributed" | `sync-purchases-from-custom-stores`. Two dashboard prerequisites gate the call: a custom store must exist (the store itself is **web-payments**) and the product needs a **Store product ID** mapped to it — `store` and `store_product_id` in the body must match both exactly. Copy the request body from `adapty-api.yaml`, not from the guide's curl sample: its `purchase_type` value is stale, the spec's enum is `one_time_purchase` / `subscription`. |
| "set transaction returns 400", "PayPal transaction ID rejected" | `adapty-api.yaml` (`setTransaction`) — `store_transaction_id` is capped at 50 characters; longer store IDs must be trimmed or hashed. Spec-only, no guide mentions it. |
| "duplicate renewal events", "flagging a billing issue fired subscription_renewed" | `adapty-api.yaml` (`setTransaction`). To update `billing_issue_detected_at` or `renew_status_changed_at` without a spurious event, reuse the existing `store_transaction_id` under the same `store_original_transaction_id`; any new one is treated as a new transaction. |
| "attribute the web purchase to a paywall", "web revenue not counted in the A/B test", "trial/intro price on a synced transaction" | `adapty-api.yaml` (`setTransaction`) — `variation_id` is what ties a synced transaction to the paywall/A-B test, and the `offer` object carries trial/introductory category and type. Neither is in the guides. |
| "which key do I use", "public vs secret key", "Api-Key header format", "key works in one app but not the other", "rotate the secret key without downtime" | `ss-authorization` — keys are app-specific, the header value is `Api-Key secret_live_…`, and rotation is generate-then-delete plus a client update. Note the spec's auth scheme documents the **secret** key only; the public key is the Web API's key (**other-apis**), which is what the "either key" line here tends to be read as. |
| "which header identifies the user", "profile ID vs customer user ID", "404 profile not found for a user we know exists" | `ss-authorization`. Either header works and one is required, but `adapty-customer-user-id` only resolves if the app actually called `identify` (SDK side = **sdk-users-access**); use `adapty-profile-id` for anonymous profiles. |
| "getting throttled", "429", "too many requests" | `ss-authorization` — the documented ceiling is 40,000 requests per minute per app. |
| "test API calls without writing code", "import the requests into Postman", "where's the secret key variable" | `server-side-api-specs`. The shipped environment is shared across the Server-side API, Web API, and Analytics Export API, so variables a reader can't place may belong to **other-apis**. |
| "change paywall copy without an app release", "update remote config from our backend/CMS" | `adapty-api.yaml` (`listPaywalls`, `getPaywall`, `updatePaywall`). No guide covers these; `remote_configs` are per locale and `data` is a JSON **string**, not an object. |
| "grant coins from our backend", "spend/convert virtual currency server-side", "retry credited the balance twice" | `adapty-api.yaml` (`createVirtualCurrencyTransaction`) — positive amount credits, negative debits, all items apply atomically, each currency code once per request, and `Idempotency-Key` (UUID v4) is what makes a retry safe. Defining the currencies is **products-and-offers**. |
| "set a user's refund preference from our backend", "record refund data-sharing consent" | `adapty-api.yaml` (`getRefundSaverSettings` / `setRefundSaverSettings`). The feature and its dashboard-wide default are **apple-platform**; only the per-profile override is an API call. |
| "import a user's Stripe history", "validate a Stripe/Paddle token", "profile created automatically after web checkout" | `adapty-api.yaml` (`validateStripePurchase`, `validatePaddlePurchase`) — both need processor credentials in App Settings (**web-payments**), take `customer_user_id` in the body rather than the header, and create the profile if it doesn't exist. The Stripe route is the odd one: `/api/v1/sdk/…` with `application/vnd.api+json`. |
| "grant access from the app", "why can't the SDK unlock premium", "where do I start with the backend integration" | `getting-started-with-server-side-api` — five worked scenarios, and the rule that a subscription cannot be granted from the mobile SDK for security reasons, which is what sends a would-be **sdk-flows-manual** ticket here. `api-guides` is only the card list over the guides. |

## Gaps and misses

- **`revokeAccessLevel` does not durably remove access. The caveat exists, but not here.**
  The next store transaction on the same subscription chain re-activates the access level. **Corrected
  2026-08-10** after an acceptance test: an earlier version of this entry said "neither the spec nor any
  article says so", which was flatly wrong — `test-purchases-in-sandbox` documents it explicitly, naming
  the Revoke access level API and stating it "**Returns** at the next renewal or reinstall — not a
  reliable sandbox reset". Neither `adapty-api.yaml`'s description of the operation nor this zone's
  articles carry it, which is what makes the endpoint look final to anyone reading the reference. Writing
  it into the spec's operation description is the obvious first move; see also [[access-levels]], whose
  gap is the production-support half of the same problem.
- **Two spec-vs-article conflicts are out for repair** (spawned 2026-08-10, not fixed here): the
  `sync-purchases-from-custom-stores` curl sample sends a `purchase_type` value the spec's enum rejects,
  and `ss-authorization` claims a public API key authenticates this API while the spec's only scheme is
  the secret key. Both are cases where the article drifted from the spec — the spec wins.

