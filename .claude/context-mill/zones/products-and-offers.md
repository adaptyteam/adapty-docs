---
zone: products-and-offers
sources: [dashboard-backend, dashboard-interface, server-side-api-spec]
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

Truth is split three ways — the store console, the Adapty Dashboard record, and the backend that
reconciles them. Everything below is read out of `dashboard-backend` (`origin/develop`) and
`dashboard-interface` (`origin/master`) unless another source id is named.

- **A product's existence is the store's; the Adapty record is a pointer, and it can appear without
  anyone creating it.** The record is split in two: `AdaptyProduct` (UUID primary key, `title`,
  `product_set`, `paid_access_level`, `price_usd`) plus one `VendorProduct` per store carrying
  `store_product_id`, `store`, `base_plan_id`, unique on `(adapty_product_id, store)` — which is the
  actual reason each subscription + base-plan pair needs its own Adapty product, as `create-product`
  says. The "our product ID isn't in the dropdown" list is the live store listing
  (`ProductStatusSyncApp` calls `list_products_detailed` against App Store Connect / Play), so a
  missing entry is a store-console fact and never an Adapty one. Separately, the purchase path
  auto-creates a `VendorProduct` with `product_origin = SDK` for any store product id it has not seen
  (`VendorProductApp.get_map(..., is_create=True)` in `src/sdk/purchase_context`), so store-side rows
  can exist with no dashboard action and no `AdaptyProduct` attached.
- **Price is two different fields with two different owners — don't answer a price question without
  asking which one.** The headline USD figure on the product, `AdaptyProduct.price_usd`, is write-once
  and purely local: `AdaptyProductApp.update` keeps whatever is already stored
  (`adapty_product.price_usd = adapty_product.price_usd or request_data.price_usd`), the edit form
  disables the field once a value exists (`disabledBaseSection = { priceUsd: Boolean(initialValues.priceUsd) }`),
  and no store path updates it — the one store-to-Adapty sync of the product record,
  `ProductStatusSyncApp`, writes only `store_status` and App Store's `store_subscription_group_id`.
  That, and not a missing sync job, is what `edit-product`'s callout is really about; note also that the
  field is not inert, because the pricing-strategy recommendation matcher joins suggested prices to
  products on `price_usd` within 10% (a SQL block in `src/api/services/deploy_utils.py`). **Regional
  prices behave the opposite way** and the store is authoritative for them: they live in a separate
  `ProductCountryPrice` table whose `source` is `USER` or `STORE`, and the App Store and Play
  price-sync apps write `source = STORE` rows from each store's own current prices — that mirrored data
  is what the **Download** button in `edit-product` hands the reader (`export_prices_csv.py` keys rows
  `app_store_store` / `app_store_user`), while an upload writes `source = USER` rows and pushes them
  out. So "Adapty never learns the store's price" is true of the dashboard figure only.
- **Duration: Adapty owns the record, and only the push-to-store path makes it true in the store.**
  `product_set` is an Adapty-side enum (`ProductSets` / `ProductPeriod`) — `create-product`'s dropdown
  plus an `UNCATEGORISED` default — and it is what the SDK receives as the product's period. On
  push, Adapty writes it into the store (`SUBSCRIPTION_PERIOD_MAP[adapty_product.product_set.period]`
  for App Store Connect, `product_set.period.to_iso8601` for Play). On the connect-existing path
  nothing reads the store's real billing period back, so a mismatch persists silently. Immutability is
  a UI rule, not a backend one: `EditProductForm` sets `productSet: Boolean(productId)`, while
  `AdaptyProductApp.update` assigns whatever it is handed — keep `edit-product`'s "create a new
  product" advice, but don't describe it as enforced by the platform.
- **Offer eligibility is decided in three places and only the last one is binding.** Adapty computes
  two per-profile display hints and ships them in the flow/paywall payload:
  `introductory_offer_eligibility` is "this profile has no recorded introductory-offer use", defaulting
  to `true` when Adapty holds no purchase state for the profile, and `promotional_offer_eligibility` is
  "this profile has any non-lifetime subscription row". The backend does not withhold the offer when
  those are false — `promotional_offer_id` / `win_back_offer_id` / Play's `offer_id` are mapped by
  store and always sent. Adapty's only runtime role in an App Store promotional purchase is signing
  (`AppleSubscriptionOfferSignView`, which raises `APP_STORE_SUBSCRIPTION_KEY_IS_NOT_SET_ERROR` when
  the In-App Purchase Key is absent — that is the real mechanism behind the prerequisite `offers`
  names), and the signer never checks eligibility. Apple and Google make the binding decision at
  purchase. A "the discount didn't apply" ticket is therefore three different bugs wearing one
  sentence: the hint, the missing key, or the store's own rules.
- **Virtual currencies have their own backend context, and its constants are the checkable rules.**
  `src/portal/virtual_currency_context/` plus the shared `src/share/virtual_currency_domain/` own the
  semantics: `PER_APP_VIRTUAL_CURRENCY_LIMIT = 20` (what `virtual-currencies` states) alongside a
  `VIRTUAL_CURRENCY_MAPPINGS_MAX = 200` no article mentions; grant triggers are exactly
  `ONE_TIME_PURCHASE`, `SUBSCRIPTION_CYCLE`, `TRIAL_START`, matching
  `create-virtual-currency`'s three credit settings; `insufficient_balance` is a ledger error code.
  The idempotency contract is a two-phase KeyDB claim keyed
  `virtual_currency_idempotency:{app_id}:{profile_id}:{key}` with `TTL_SECONDS = 3600`, so a retry is
  safe for one hour per profile and no longer — which is also why `server-side-api-spec` answers a
  same-key concurrent call with `idempotency_in_flight` and a `Retry-After`. Wire shape comes from
  `server-side-api-spec`; anything about when credits are granted, held, or reset comes from the
  backend.
- **Three claim classes belong to the stores, and no registered source can check them.** App Store
  offer types, Play's base plans and offer phases (including its console eligibility labels and phase
  rules), and store review requirements — `app-store-offers`'s "win-back needs App Review first" is one
  — are Apple/Google facts that change on their release schedule, not ours. The nearest
  checkable proxy is the DTO Adapty mirrors of Play's API
  (`in_app_context/.../google_android_publisher/google_subscription_offer.py`, which links Google's own
  reference): it proves field names and shape, not console wording — it carries
  `targeting.acquisition_rule` / `upgrade_rules` with no "Developer determined" value and no
  two-phase cap. Note also that the catalog models three offer categories (`INTRODUCTORY`,
  `PROMOTIONAL`, `WIN_BACK`): offer codes, which `app-store-offers` lists as a fourth App Store type,
  exist only as a transaction-side category the purchase path recognises after the fact, never as an
  offer you configure — which is why that bullet correctly links out instead of describing setup. Cite
  the store's own docs for this class of claim and re-verify on each store release; nothing in our
  repos will flag the drift.

## What we document, what we don't

- **We restate store-console procedures here, which the rest of the corpus does not do — and only as
  far as the id Adapty needs.** `app-store-offers` and `google-play-offers` walk App Store Connect and
  Play Console click by click. What earns it: the reader's very next action is pasting that offer
  identifier into `create-offer`, and the values are immutable once the store confirms them, so a
  wrong click costs a new offer. The stopping line is the id existing — pricing tables, region
  pickers, and review submission link out to Apple's and Google's docs.
- **Against `apple-platform` / `google-platform`, the split is by what gets written, not by topic:**
  credentials, keys, and app-level store connection are written there and never re-explained here.
  Here they get one prerequisite sentence plus a deep link, as `create-product` does for the App Store
  Connect API key. The deliberate exception is store-side *product* creation, which is written twice —
  in `app-store-products` / `android-products` for the reader who is in the console, and again inside
  `create-product`'s push-to-store path for the reader who never opens it.
- **Against `flow-design` and `flow-logic`, we write which offer is bound to which product; they write
  how the product card looks and what the button does.** `create-offer`'s "Add offer to flow" is
  deliberately only the two clicks that bind an offer to the selected product card — element layout
  belongs to `paywall-layout-and-products` and purchase wiring to `paywall-product-block`. Don't grow
  it into a Flow Builder walkthrough. `add-product-to-paywall` is the legacy-paywall equivalent and
  stays frozen at that scope.
- **Three articles are pure routers. Don't fill them.** `offers-in-stores` is two links by design;
  `product` is a definition plus a display checklist; `offers` exists only because it names the
  In-App Purchase Key prerequisite before sending the reader on. Any procedure they seem to be missing
  belongs in `create-product`, `create-offer`, or the two store-side offer articles. (`delete-product`
  and `add-product-to-paywall` are short procedures, not routers — the roster's `0` counts headings,
  not content.)
- **For virtual currencies we document the dashboard configuration and the calls a reader cannot avoid
  making, not the API reference.** Because there is no SDK method to read or spend a balance, a backend
  call is part of the feature, so `virtual-currency-quickstart` carries working `curl` for exactly two
  operations and links the rest to `server-side-api-spec`. Balance and transaction *fields* stay in the
  spec.
- **We don't write the backend mechanics established above.** The eligibility derivations, the
  write-once price field, the UI-only duration lock, and the auto-created `product_origin = SDK` row
  are here so a task can reason correctly; a reader can't act on any of them. They surface in an
  article only where they change what the reader should do — the In-App Purchase Key gate does, and
  gets a sentence; the ledger's internals do not.

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
| grant-initial-balance | — | marketer | 4 | tutorial |
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

