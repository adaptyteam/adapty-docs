---
zone: products-and-offers
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Catalog-level configuration in the Adapty Dashboard: creating, editing, and deleting products
(subscriptions, one-time purchases, consumables) and linking them to store or web listings; configuring
promotional/introductory offers (trials, discounts) for App Store and Google Play; adding a product to a
paywall; and virtual currencies — token-like in-app currencies linked to products so purchases grant
credits, plus their balances and a quickstart. This zone absorbed virtual currencies on purpose. It
covers "what you're selling and what in-app currency it grants," configured once per product — not the
per-user entitlement or balance state that results from a purchase.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| add-product-to-paywall | — | marketer | 0 | tutorial |
| app-store-offers | — | marketer | 4 | tutorial |
| create-offer | — | marketer | 6 | tutorial |
| create-product | — | marketer | 3 | tutorial |
| create-virtual-currency | — | marketer | 3 | tutorial |
| delete-product | — | marketer | 0 | tutorial |
| edit-product | — | marketer | 4 | tutorial |
| google-play-offers | — | marketer | 1 | tutorial |
| offers | entry | marketer | 1 | tutorial |
| offers-in-stores | entry | marketer | 0 | tutorial |
| product | entry | marketer | 0 | tutorial |
| virtual-currencies | entry | marketer | 3 | tutorial |
| virtual-currency-balance | — | marketer | 3 | tutorial |
| virtual-currency-quickstart | — | marketer | 0 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`access-levels`** — is the ticket about the SKU/price/offer definition being sold (here), or about
  what access level and duration that SKU grants once purchased (`access-levels`)? A product points at
  an access level; the access-level record itself is a separate zone. Same split applies to virtual
  currencies: the currency and its product link is here, entitlements are `access-levels`.
- **`apple-platform` / `google-platform`** — does the ticket concern how a product/offer is configured
  or displayed on the store's own console, or how it's created/edited in the Adapty Dashboard? Store-side
  specifics are `apple-platform`/`google-platform`; the Adapty-side record is here.
- **`web-payments`** — a Stripe/Paddle price is still a "product" conceptually, but the provider account
  connection lives in `web-payments`; creating/editing that product's Adapty record is here.
- **`flow-logic`** — `paywall-product-block` covers placing a product on a flow screen and wiring the
  purchase button. The product/offer definition itself is here; the on-canvas placement and purchase
  action is `flow-logic`.
- **`subscribers-and-profiles`** — a virtual currency's definition and product link is here; a specific
  user's resulting balance and change history sits at the profile level (`virtual-currency-balance`
  stays in this zone by roster, but a ticket about one customer's actual balance points to
  `subscribers-and-profiles`).

## Ticket language

Five articles here sound interchangeable. The offer chain runs: configure in the store console
(`app-store-offers` / `google-play-offers`) → link the offer ID to an Adapty product and put it on a
flow or paywall (`create-offer`). `offers` and `offers-in-stores` are routers with no procedure of
their own — `offers` is worth reaching for only because it names the In-App Purchase Key prerequisite.
Corpus-wide synonyms live in `aliases.md` and aren't repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "our IAP is already live in the store", "connect an existing subscription", "product ID isn't in the dropdown" | `create-product`, the *connect existing store products* path. Store product IDs are picked from a store-synced list, so a missing entry is a store-console or integration problem, not an Adapty one. |
| "create the IAP from Adapty", "push the product to the stores" | `create-product`, the *push to store* path. Needs the App Store Connect API key on top of the ordinary App Store integration, and the app's first product still has to be submitted for review manually. |
| "base plan vs product", "legacy fallback product", "Stripe/Paddle price ID vs product ID" | `create-product`. Each subscription + base-plan combination is a **separate** Adapty product; the `<subscription_id>:<base_plan_id>` fallback field exists only for SDK 2.5 and below. |
| "set up a free trial" | Splits by store. iOS: `app-store-offers` — an introductory offer applies automatically to eligible users and must **not** be added to Adapty. Android: `google-play-offers` + `create-offer` — Google Play has no introductory type, so trials are offer phases on a base plan and **do** need linking in Adapty. This asymmetry is the single most common confusion in the zone. |
| "offer configured but never applied", "which offer wins", "sell the product without the discount to some users" | `create-offer`, *How Adapty works with offers* — intro applies first, promotional only on a later purchase attempt. Opting a cohort out means a second offer-free product plus placement segments, not a per-user flag. Check `offers` first for the missing In-App Purchase Key. |
| "Offer ID field is greyed out", "can't attach an offer to our paywall" | `create-offer`. The store offer ID field only activates once a product ID is selected on the **Products** tab, and a paywall in *live* status has to be duplicated before offers can be added. |
| "only the trial shows, not the second discount phase", "let our code decide who gets the offer" | `google-play-offers`. A builder-rendered paywall displays just the first phase of a multi-phase offer (all phases still charge correctly), and *Developer determined* eligibility is the win-back lever — with a repeat-redemption fraud caveat. |
| "can't create the win-back offer" | `app-store-offers` — the subscription must clear App Review before win-back offers become available. |
| "dashboard price is wrong", "changed the price in the store console and Adapty didn't update" | `edit-product`. Store-side changes never sync back; the dashboard price is reference-only and revenue analytics come straight from the stores, so usually nothing is actually broken. |
| "regional pricing", "bulk price change", "who changed this price" | `edit-product`. The CSV upload pushes prices *to* both consoles (only differing rows change; applying to existing subscribers is an opt-in checkbox). The audit log answers who/when. |
| "change the subscription period", "wrong access level on a product" | `edit-product`. Duration is immutable after creation — create a new product. An access-level change applies to new subscriptions and reaches existing subscribers only at their next renewal. |
| "can't delete this product", "swap a product on a published paywall", "which product appears first", "product display order in the app" | Product-to-paywall coupling: `delete-product` refuses deletion while any paywall uses the product, and `add-product-to-paywall` both sets the display order (preserved SDK-side, not sorted in app code) and warns that post-publish product edits skew that paywall's metrics. For placement on the Flow Builder canvas, see `flow-logic`. |
| "tokens", "credits", "coins", "gems", "hearts", "charge per generation", "usage allowance", "pay per use" | All virtual currency, whatever the app calls it: `virtual-currencies` for the model and its hard limits — max 20 currencies per app, and **no SDK method** to read or spend a balance, so this feature requires a backend calling the server-side API. |
| "credits vanished", "balance reset", "lost credits after reinstall", "existing subscribers got nothing" | Three distinct causes. Expiry toggle on `create-virtual-currency` zeroes unused credits at each renewal; product links apply going forward only, so a current subscriber waits for their next renewal; and per `virtual-currency-balance` a balance belongs to exactly one profile, so an anonymous user loses it on reinstall or a second device. |
| "`insufficient_balance`", "double-charged tokens on a retry", "convert gems to gold" | `virtual-currency-quickstart`. Balances can't go negative, a transaction is atomic and can debit one currency while crediting another, and `Idempotency-Key` is what makes a retry safe. |

## Gaps and misses

