---
zone: access-levels
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Entitlements: defining named access levels (e.g. the auto-created `premium`), assigning them to products
so a purchase grants the right tier and duration of access, manually giving or revoking access for a
specific customer, and a local/offline fallback mechanism for temporary outages. This is the "what a
user is allowed to do because they paid" layer — independent of which SKU they bought or how much it
cost.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| access-level | entry | dev, marketer | 0 | tutorial |
| assigning-access-level-to-a-product | — | dev, marketer | 0 | tutorial |
| create-access-level | — | dev, marketer | 0 | tutorial |
| give-access-level-to-specific-customer | — | dev, marketer | 2 | tutorial |
| local-access-levels | — | dev, marketer | 0 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`products-and-offers`** — is the ticket about the SKU/price/offer being sold (`products-and-offers`),
  or about what access level that SKU grants and for how long (here)? Entitlements go here, catalog
  definitions go there.
- **`subscribers-and-profiles`** — is the ticket about the access-level record/definition and assignment
  rules (here), or about a specific customer's overall profile/CRM state? `give-access-level-to-specific-customer`
  stays here because it's about the entitlement-grant mechanism itself; broader profile lookups are
  `subscribers-and-profiles`.
- **`server-side-api`** — does the ticket concern calling the grant-access-level API endpoint
  programmatically/its spec details (`server-side-api`), or the dashboard concept/UI of access levels
  (here)?

## Ticket language

Five dashboard-side articles, so rows name the article directly. Corpus-wide synonyms
(access level ↔ entitlement ↔ premium access ↔ `accessLevels`) live in `aliases.md` and are
deliberately not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "tiers for different topics", "separate subscription for live coaching", "one access level per language", "can we have more than one" | `access-level` for the concept and the worked examples, `create-access-level` for the mechanics. Multiple access levels per app are supported; `premium` is auto-created with the app and cannot be deleted. |
| "we check for `premium` and it fails", "hardcoded premium doesn't unlock anything" | `assigning-access-level-to-a-product`. `premium` is only the **default auto-created ID**, not a keyword — the app must check whatever ID sits in the product's **Access Level ID** field, so a product wired to a custom level never satisfies a `premium` check. The check itself is `sdk-users-access`. |
| "user paid but nothing unlocked" | Split by cause: the product has no access level assigned, or the wrong one (`assigning-access-level-to-a-product` — every product requires one); the app checks the wrong ID (row above); or Adapty's servers were unreachable (`local-access-levels`). |
| "expiration date is wrong", "lifetime purchase expired", "where do I set the duration" | `assigning-access-level-to-a-product`. The duration is never set on the access level — Adapty derives the expiry from the product's subscription duration, and a lifetime product yields no expiration at all. |
| "comp a customer", "extend premium as a thank-you for a review", "support needs to grant free access", "dashboard override" | `give-access-level-to-specific-customer`, dashboard half — grant per profile with an explicit expiry date. |
| "grant premium from our backend", "referral bonus unlocks access", "do it programmatically" | `give-access-level-to-specific-customer` names this and points at the `grantAccessLevel` endpoint, but the call, auth, and payload live in `server-side-api`. Route dashboard-vs-server explicitly; the ticket rarely says which it wants. |
| "revoke access", "take premium away", "we backdated the expiry and it came back" | **No article in this zone documents revoke or backdating** — the dashboard flow only grants and sets an expiry. Programmatic revoke is `server-side-api`. Whether a revoke or backdate survives the next store transaction on the same subscription chain is undocumented anywhere here; verify against the backend before answering, and treat it as a content gap. |
| "Adapty was down and users lost access", "offline purchase verification", "no response from your server" | `local-access-levels`. Nothing to build: the SDK falls back to verifying with the store itself. Two constraints do the routing work — SDK 3.12+, and on **Android it is off by default** and must be turned on at activation (that flag is documented in `sdk-quickstart`, not here). |
| "consumable didn't grant access during the outage" | `local-access-levels` — the local fallback skips consumables unless the consumable was given a subscription duration in the dashboard. |
| "purchases missing from analytics after an outage", "revenue gap" | `local-access-levels`, not `analytics`. Locally granted access is invisible to reporting until the device comes back online and pushes the transaction. |
| "create access levels from a script", "set this up without the dashboard" | `create-access-level` carries the pointer; the CLI command reference itself is `agent-tooling`. |

## Gaps and misses

- **Revoking access is not durable, and this zone never says so — but the docs do, in the wrong place.**
  A dashboard revoke or a backdated expiry is overridden by the next store transaction on the same
  subscription chain, so access re-activates on its own. **Corrected 2026-08-10** after an acceptance test:
  an earlier version of this entry claimed the behaviour was undocumented. It is documented — in
  `test-purchases-in-sandbox` ("Resetting a tester's subscription"), which states outright that backdating
  and the Revoke access level API both **return** at the next renewal, and that only cancelling in the
  store account is durable.
  The real gap is narrower and worth stating precisely: it is written up **only as a sandbox-testing
  reset**, so a support engineer handling a *production* ticket about a paying customer has no article
  that tells them a dashboard revoke won't hold. `grep -niE "revoke|backdat"` still returns **zero hits**
  across this zone's five articles, and this zone's `Boundaries` never points at `testing-and-release`.
  Fixing it means deciding where the production-facing version of the caveat belongs — a content decision,
  not a brief edit.

