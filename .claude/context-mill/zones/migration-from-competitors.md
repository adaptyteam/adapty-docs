---
zone: migration-from-competitors
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Guides for a team already running a live paid app on another platform and switching to Adapty: named
step-by-step migrations from a specific competitor (RevenueCat, Superwall), a generic guide for
migrating from any other subscription-management solution, and the mechanics any such cutover needs —
importing historical subscription data, remapping existing analytics/attribution integrations so events
don't duplicate or get lost, and choosing Observer vs. Full mode during the transition period. Every
article here assumes the reader has existing subscribers and revenue at stake, not a first-time
integration.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| importing-historical-data-to-adapty | — | dev | 5 | tutorial |
| migrate-integrations-to-adapty | migration | dev | 8 | tutorial |
| migrate-to-adapty-from-another-solutions | entry | dev | 3 | tutorial |
| migration-from-revenuecat | migration | dev | 21 | tutorial |
| migration-from-superwall | migration | dev | 17 | tutorial |
| observer-vs-full-mode | — | dev | 3 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`getting-started`** — is the reader new to subscription infrastructure and evaluating Adapty broadly
  (`is-adapty-right-for-me`), or already running a named competing solution and need a cutover plan?
  General evaluation is `getting-started`; named-competitor cutover is here.
- **`integrations`** — is the ticket about switching an existing analytics/attribution destination over
  without breaking its event history during a migration (`migrate-integrations-to-adapty`, here), or
  about the ongoing, steady-state setup of that same destination once live (credentials, event mapping)?
  Steady-state setup is `integrations`.
- **`sdk-migrations`** — is this a version upgrade of the Adapty SDK itself (e.g. v3 to v4) or a switch
  away from a different vendor's SDK entirely? Vendor-to-vendor switching is here; Adapty's own version
  upgrades are `sdk-migrations`.
- **`server-side-api`** — does the ticket concern the migration workflow itself
  (`importing-historical-data-to-adapty`) or a specific API endpoint/spec detail the workflow calls?
  Endpoint/spec specifics are `server-side-api`.

## Ticket language

Rows name article ids from the roster above. Corpus-wide synonyms (entitlement ↔ access level,
Flow ↔ Paywall Builder) live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "will subscribers lose premium access", "do users have to buy again", "switch without losing subscribers" | `migrate-to-adapty-from-another-solutions` (repeated as an `:::info` in both named guides). The answer is that nothing is migrated by hand: the store — not the previous vendor — owns subscription state, and Adapty validates receipts on first launch. This is the fear behind most tickets in this zone; answer it first. |
| "users who never update the app", "stragglers on the old version", "do we force an update" | The FAQ of `migration-from-revenuecat` / `migration-from-superwall`. They keep access through the App Store or Google Play directly, so no forced update — but per `migrate-integrations-to-adapty` they generate **no** Adapty integration events until they do update, which is the usual explanation for "events missing for old users". |
| "backfill old subscriptions", "charts empty before the migration date", "cohorts missing legacy users" | `importing-historical-data-to-adapty`. Import is explicitly optional and does not affect anyone's access — it exists only so analytics and CRM profiles are complete. Adapty matches by original transaction ID and can't count a store webhook for a profile the SDK has never seen. |
| "import ASAP or we lose the data", "when do we run the import" | `importing-historical-data-to-adapty` plus both named guides: ship the SDK release **first**, then wait at least a week so the SDK has collected real purchase prices. Importing early gives worse data, not safer data. |
| "what can't be imported", "old Android subscriptions are missing", "imported price is wrong" | `importing-historical-data-to-adapty`, "Known limitations for Android": only *active* subscriptions come over, only the *latest* renewal rather than the whole chain, and a price that has since changed is imported at today's value. These limits are Android-only — don't generalize them to iOS. |
| "import API", "self-serve upload", "will re-importing duplicate rows" | `importing-historical-data-to-adapty`. There is no endpoint or dashboard uploader: you share CSVs (one file per store) with Adapty support and they run it. Overlapping data does not create duplicates, so a repeat import is safe. |
| "import ran but no transactions appeared", "hitting Play API limits mid-import" | `importing-historical-data-to-adapty` for the prerequisites — iOS needs the In-app purchase API credentials (Issuer ID, Key ID, .p8) filled in even on StoreKit 1, and a large Android volume needs a Google Play Developer API quota increase first (the quota article itself is `google-platform`). |
| "Google purchase tokens aren't in the RevenueCat export" | `migration-from-revenuecat`. Correct — the standard scheduled export omits them; they arrive as a separate CSV you request from RevenueCat support. Without them Android transactions can't be validated, so this blocks the Android half of the import. |
| "which RevenueCat user ID becomes ours", "rc_original_app_user_id vs the alias" | `migration-from-revenuecat`. You choose which one becomes the Customer User ID and tell support at import time — decide before the import, not after. |
| "what is an Offering here", "where did Packages go" | `migration-from-revenuecat`'s naming table. The trap worth stating out loud: a RevenueCat **Offering** maps to an Adapty paywall, while a RevenueCat **Paywall** maps to Paywall Builder — the same word means different things on either side. |
| "do our Superwall campaigns carry over", "rebuild audience filters" | `migration-from-superwall`. A campaign splits into placement + audience, and the targeting does **not** transfer — different dashboards, different identifiers, manual rebuild. Usually short, because most apps run one or two placements. |
| "no equivalent for register", "PurchaseController", "getPresentationResult" | `migration-from-superwall`. Three separate shifts: fetch and present are two calls instead of `register`; there is no purchase-controller protocol to implement; and `getPresentationResult` has no single-call equivalent — call `getPaywall` and branch on the outcome. |
| "duplicate events after switching analytics", "double counting in Amplitude", "campaign optimization broke on migration day" | `migrate-integrations-to-adapty`. Ordering is the whole answer: turn on **Exclude Historical Events** before the import, flip the legacy integration off and Adapty's on in the same moment (running both overlaps = duplicates), and pause large acquisition campaigns that day. Adjust is the exception that uses event IDs, not names. |
| "keep our own purchase code", "analytics only", "not ready to hand purchases to Adapty" | `observer-vs-full-mode` — the decision article, and the incremental path onto Adapty. Note the SDK does not finalize transactions in this mode. The per-platform implementation (the `observerMode` flag, reporting transactions, associating them with a paywall) is `sdk-flows-manual`, not here. |
| "run both systems in parallel", "keep RevenueCat/Superwall receiving store events" | Raw events forwarding, linked from `migrate-to-adapty-from-another-solutions` and both named guides — Adapty proxies store notifications on to the legacy system during the overlap. The mechanics live in `apple-platform`. |

## Gaps and misses

