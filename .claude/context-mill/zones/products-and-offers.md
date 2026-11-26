---
zone: products-and-offers
sources: [server-side-api-spec]
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
reconciles them. Everything below was read out of Adapty's backend and dashboard code (closed-source,
not citable here — confirm with the product team or by testing in the dashboard) unless another
source id is named.

- **A product's existence is the store's; the Adapty record is a pointer, and it can appear without
  anyone creating it.** The record is split in two: one Adapty product (title, duration, access level,
  USD price) plus one store-specific record per store carrying the store product ID and base plan ID,
  unique per Adapty product and store — which is the actual reason each subscription + base-plan pair
  needs its own Adapty product, as `create-product` says. The "our product ID isn't in the dropdown"
  list is the live store listing, fetched from App Store Connect / Play, so a missing entry is a
  store-console fact and never an Adapty one. Separately, the purchase path auto-creates a store-side
  product record for any store product id it has not seen, so store-side rows can exist with no
  dashboard action and no Adapty product attached.
- **Price is two different fields with two different owners — don't answer a price question without
  asking which one.** The headline USD figure on the product is write-once and purely local: an update
  keeps whatever is already stored, the edit form disables the field once a value exists, and no store
  path updates it — the one store-to-Adapty sync of the product record writes only the store status
  and App Store's subscription group ID. That, and not a missing sync job, is what `edit-product`'s
  callout is really about; note also that the field is not inert, because the pricing-strategy
  recommendation matcher joins suggested prices to products on that USD price within 10%. **Regional
  prices behave the opposite way** and the store is authoritative for them: they are stored separately,
  each row marked as user-entered or store-sourced, and the App Store and Play price syncs write
  store-sourced rows from each store's own current prices — that mirrored data is what the **Download**
  button in `edit-product` hands the reader, while an upload writes user-entered rows and pushes them
  out. So "Adapty never learns the store's price" is true of the dashboard figure only.
- **Duration: Adapty owns the record, and only the push-to-store path makes it true in the store.**
  The product's duration is an Adapty-side value — `create-product`'s dropdown plus an uncategorised
  default — and it is what the SDK receives as the product's period. On push, Adapty writes it into
  the store (as App Store Connect's subscription period, or as an ISO 8601 period for Play). On the
  connect-existing path nothing reads the store's real billing period back, so a mismatch persists
  silently. Immutability is a UI rule, not a backend one: the edit form locks the field once the
  product exists, while the backend update assigns whatever it is handed — keep `edit-product`'s
  "create a new product" advice, but don't describe it as enforced by the platform.
- **Offer eligibility is decided in three places and only the last one is binding.** Adapty computes
  two per-profile display hints and ships them in the flow/paywall payload:
  `introductory_offer_eligibility` is "this profile has no recorded introductory-offer use", defaulting
  to `true` when Adapty holds no purchase state for the profile, and `promotional_offer_eligibility` is
  "this profile has any non-lifetime subscription row". The backend does not withhold the offer when
  those are false — `promotional_offer_id` / `win_back_offer_id` / Play's `offer_id` are mapped by
  store and always sent. Adapty's only runtime role in an App Store promotional purchase is signing,
  which fails with an error when the In-App Purchase Key is absent — that is the real mechanism behind
  the prerequisite `offers` names — and the signer never checks eligibility. Apple and Google make the
  binding decision at purchase. A "the discount didn't apply" ticket is therefore three different bugs
  wearing one sentence: the hint, the missing key, or the store's own rules.
- **Virtual currencies have their own backend rules, and these are the checkable ones.** At most 20
  currencies per app (what `virtual-currencies` states) alongside a cap of 200 currency mappings no
  article mentions; grant triggers are exactly one-time purchase, subscription cycle, and trial start,
  matching `create-virtual-currency`'s three credit settings; `insufficient_balance` is a ledger error
  code, returned as HTTP 400, and the failed spend changes nothing. Branch on `error_code`, not on the
  message: the backend message ends with a period and the spec example doesn't (backend code,
  2026-11-17). The idempotency contract is a two-phase claim per app, profile, and key with a one-hour TTL,
  so a retry is safe for one hour per profile and no longer — which is also why `server-side-api-spec`
  answers a same-key concurrent call with `idempotency_in_flight` and a `Retry-After`. Only a success
  keeps the claim: a failed attempt, `insufficient_balance` included, releases it, so the retry after a
  top-up can reuse the key and debits normally. A replay returns the stored result without comparing
  request bodies (backend code, 2026-11-17). Wire shape comes from `server-side-api-spec`; anything
  about when credits are granted or reset comes from the backend (confirm with the product team).
  **Holds don't exist (corrected 2026-11-18; this bullet used to list "held" among the backend's
  answers):** `held` is always 0, as `adapty-api.yaml` says ("Currently always 0"), and no call
  reserves credits — a spend is one immediate debit (backend code, 2026-11-17).
- **When credits land, and what a spend is checked against** (2026-11-18, from backend code read on
  2026-11-17 and AdaptySDK-iOS 4.4.0; the code paths, not a sandbox run end to end):
  - The *subscription cycle* trigger fires at the first paid purchase (a paid intro offer included), at
    each renewal, at the trial conversion, and at an App Store upgrade. A free trial start credits only
    **Credit on trial start**, and nothing when that setting is empty. `create-virtual-currency` said
    "at each renewal" until 2026-11-18. The first credit is recorded with transaction type
    `subscription_renewal`, the same as a real renewal, so the transaction history can label it that way.
  - **An App Store upgrade continues the transaction chain as a renewal.** Adapty first resets the
    chain's unspent expiring credits, the lower tier's included, then adds the higher tier's full
    **Credit per cycle** at once, with no proration. The refund that the upgrade causes takes back no
    credits. Pack credits and server-side API credits never expire, so the reset doesn't touch them. The
    owner sentence is in `create-virtual-currency`, after the expiry setting. The Google Play upgrade
    path was not traced.
  - **On iOS, the credit lands before the purchase result reaches app code.** The SDK waits for its
    purchase validation request, and the backend credits inside that request. Exceptions: when
    validation fails, the SDK still reports `.success` and leaves the StoreKit transaction unfinished
    (AdaptySDK-iOS 4.4.0 `Sources/StoreKit/StoreKitPurchaser.swift:364-375`). A subscription's credit
    then arrives with the App Store server notification (the two paths can't credit twice). A one-time
    pack has no such notification: the backend handles no App Store one-time-charge notification type
    (backend code, 2026-11-19). The pack's credit arrives when the SDK sends the unfinished transaction
    again, with reason `unfinished` (`Sources/StoreKit/TransactionManager.swift:155`), from
    `syncTransactionHistory` (`Sources/Profile/ProfileManager.swift:193`), which runs when the profile
    loads (`ProfileManager.swift:55`, `:131`), such as at the next app launch, and on a restore
    (`Sources/StoreKit/Adapty+MakePurchase.swift:85`). **Corrected 2026-11-19:** this bullet said every
    late credit arrives with the App Store notification, which holds for subscriptions only, and
    `ios-virtual-currency-top-up` shipped that claim for packs. With a StoreKit configuration file in
    Xcode, the SDK skips validation, so Adapty adds no credits (`StoreKitPurchaser.swift`, the
    Xcode-environment guard before `validate`). A crediting error is logged and never fails the
    purchase. Android calls the same backend path; not traced line by line, and Android's handling of
    an unfinished purchase after a failed validation was not read.
  - **`available` is what a spend can take (corrected 2026-11-19).** List virtual currency balances
    (GET) returns `available` = balance − `held` − expired credits, floored at 0; the response to Create
    virtual currency transaction (POST) returns, in `balances[].available`, what a debit can spend at
    that moment, read from the live credit batches (backend code, merged 2026-11-18, read 2026-11-19). A
    debit takes the unexpired credit batches, expiring ones first (backend code, 2026-11-17). Until
    2026-11-18, `available` was balance − `held` and could overstate the spendable amount while expired
    subscription credits waited for their reset. This bullet said so on 2026-11-18 from a read made a
    few hours before the change merged, and `ios-virtual-currency-top-up` shipped that claim. So when a
    spend fails with `insufficient_balance` and the missing amount (cost − `available`) comes out at 0 or
    less, credits arrived between the spend and the read. Not re-read on 2026-11-19: whether the debit
    still checks the balance before it reads the batches.
- **Three claim classes belong to the stores, and no registered source can check them.** App Store
  offer types, Play's base plans and offer phases (including its console eligibility labels and phase
  rules), and store review requirements — `app-store-offers`'s "win-back needs App Review first" is one
  — are Apple/Google facts that change on their release schedule, not ours. The nearest
  checkable proxy is Adapty's mirror of Play's subscription-offer API, which follows Google's own
  reference: it proves field names and shape, not console wording — it carries
  `targeting.acquisition_rule` / `upgrade_rules` with no "Developer determined" value and no
  two-phase cap. Note also that the catalog models three offer categories (introductory, promotional,
  win-back): offer codes, which `app-store-offers` lists as a fourth App Store type, exist only as a
  transaction-side category the purchase path recognises after the fact, never as an offer you
  configure — which is why that bullet correctly links out instead of describing setup. Cite the
  store's own docs for this class of claim and re-verify on each store release; nothing in our
  sources will flag the drift.

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
  it into a Flow & Paywall Builder walkthrough. `add-product-to-paywall` is the legacy-paywall equivalent and
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
  spec. Checked 2026-11-18: no released SDK reads or spends a balance (AdaptySDK-iOS 4.4.0 has no
  virtual currency API; `git grep -i 'virtual|currenc|balance'` over `Sources*` finds only price
  currency fields). An unreleased AdaptySDK-iOS branch adds a read-only balance on the profile, and no
  branch of any SDK has a spend method. The app-side half of the feature, a spend from the app's backend
  and a flow on `insufficient_balance`, is the iOS recipe `ios-virtual-currency-top-up` (2026-11-18),
  which lives in the iOS sidebar, not here. **Rebuilt 2026-11-19** as "Spend and sell virtual currency
  in flows": two flows, one where native spend buttons (custom elements) call the backend, and a top-up
  flow with packs and a subscription that opens on `insufficient_balance`. The recipe spends only on a
  player's tap: after a purchase, the player taps again (reviewer feedback, 2026-11-19: an automatic
  debit is bad practice). So no article shows an automatic spend, a rewarded ad for currency, or an
  upgrade offer; an upgrade guide is planned as a separate article.
- **We don't write the backend mechanics established above.** The eligibility derivations, the
  write-once price field, the UI-only duration lock, and the auto-created store-side product row
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
| create-virtual-currency | — | marketer | 4 | tutorial |
| delete-product | — | marketer | 0 | tutorial |
| edit-product | — | marketer | 5 | tutorial |
| google-play-offers | — | marketer | 1 | tutorial |
| grant-initial-balance | — | marketer | 4 | tutorial |
| offers | entry | marketer | 1 | tutorial |
| offers-in-stores | entry | marketer | 0 | tutorial |
| product | entry | marketer | 0 | tutorial |
| store-sync | entry | marketer | 7 | tutorial |
| virtual-currencies | entry | marketer | 7 | tutorial |
| virtual-currency-balance | — | marketer | 6 | tutorial |
| virtual-currency-quickstart | — | marketer | 0 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

- **`ios-virtual-currency-top-up` restates the crediting rules, and its after-purchase code depends on
  them (2026-11-18; rebuilt as two flows 2026-11-19).** Its `## Before you start` sets each pack's
  **Credit amount**, the subscription's **Credit per cycle**, and **Credit on trial start** to at least
  30, the cost of the dearer of its two spend buttons, so one purchase covers either spend. After a
  purchase, the app code reads the balance, closes the top-up flow, and opens the spend flow again; the
  player taps again. When the balance hasn't grown (a late validation, see Sources of truth), the code
  closes the top-up flow and tells the player in the game's own UI that the diamonds are on the way. A
  change to when or how much Adapty credits (first purchase, trial start, expiry, late validation)
  ripples into that list, that paragraph, and the testing step. A change to what the balance's
  available amount means, or to `insufficient_balance`, ripples into its backend step, which computes
  the missing amount as the cost minus the available amount from List virtual currency balances. The
  rebuild removed the automatic retry, the rewarded ad, and the upgrade paragraph. Three articles here link the recipe: `virtual-currencies` (Use cases, **Mobile games** row),
  `create-virtual-currency`, and `virtual-currency-quickstart` (step 3, after `insufficient_balance`);
  their link text must not promise an ad. The shared builder and backend steps sit in the `VcTopUp*`
  reusable snippets, ready for an Android version of the recipe.
- **The virtual currency ledger export lives in the `integrations` zone (2026-11-19).** The daily S3 and
  Google Cloud Storage export has a third feed, one row per balance change; its columns and limits are
  in the "Virtual currency transactions" section of `s3-exports` and `google-cloud-storage`.
  `virtual-currencies` only links there ("How it works", item 8). A change to the transaction fields
  (`operation` values, `feature`, `reference_id`, `customer_placement_id`, `is_sandbox`, `metadata`)
  also moves that 19-column table, in both pages.

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
| "can't delete this product", "swap a product on a published paywall", "which product appears first", "product display order in the app" | Product-to-paywall coupling: `delete-product` refuses deletion while any paywall uses the product, and `add-product-to-paywall` both sets the display order (preserved SDK-side, not sorted in app code) and warns that post-publish product edits skew that paywall's metrics. For placement on the Flow & Paywall Builder canvas, see `flow-logic`. |
| "tokens", "credits", "coins", "gems", "hearts", "charge per generation", "usage allowance", "pay per use" | All virtual currency, whatever the app calls it: `virtual-currencies` for the model and its hard limits — max 20 currencies per app, and **no SDK method** to read or spend a balance, so this feature requires a backend calling the server-side API. |
| "credits vanished", "balance reset", "lost credits after reinstall", "existing subscribers got nothing" | Three distinct causes. Expiry toggle on `create-virtual-currency` zeroes, at each renewal, only the unused credits that renewing subscription granted — credits from other subscriptions, one-time products and Server-side API grants stay (backend code, 2026-11-03); product links apply going forward only, so a current subscriber waits for their next renewal; and per `virtual-currency-balance` a balance belongs to exactly one profile, so an anonymous user loses it on reinstall or a second device. An App Store upgrade counts as a renewal of the same chain, so the lower tier's unspent expiring credits reset at the upgrade (backend code, 2026-11-17; stated in `create-virtual-currency` since 2026-11-18). |
| "`insufficient_balance`", "double-charged tokens on a retry", "convert gems to gold" | `virtual-currency-quickstart`. Balances can't go negative, a transaction is atomic and can debit one currency while crediting another, and `Idempotency-Key` is what makes a retry safe. A failed spend releases its key, so the same key can send the spend again and debits normally (backend code, 2026-11-17). The app-side pattern, a spend flow and a top-up flow on `insufficient_balance`, with the player tapping again after a purchase, is `ios-virtual-currency-top-up` (rebuilt 2026-11-19). |
| "bought coins but the balance didn't change", "no credits when testing in Xcode", "the subscription's first purchase gave nothing", "the free trial gave no coins", "upgrade gave the full amount" | Five answers (2026-11-18; see Sources of truth). A StoreKit configuration file in Xcode adds no credits, because the SDK skips validation: test in the sandbox. That consequence is stated only in `ios-virtual-currency-top-up`; `local-sk-files` (zone `testing-and-release`) says only that local tests don't reach the dashboard. When validation fails, a subscription's credit arrives with the App Store notification, and a pack's credit arrives when the SDK sends the unfinished transaction again, such as at the next app launch (corrected 2026-11-19). A free trial credits only **Credit on trial start**, which can be empty. An upgrade credits the higher tier's full **Credit per cycle** by design. Before 2026-09-01, a first purchase lost its credit when the App Store notification arrived before the SDK's validation request tied the purchase to a profile; backend code read on 2026-11-17 replays the credit once the profile is attached, so a report from before that date is likely that defect (medium-high; not reproduced). |

## Gaps and misses


- **2026-11-17 — manual balance adjustment from the dashboard (autolog).** Read from the dashboard
  frontend and backend code (closed-source; confirm with the product team).
  - *Wrong in the corpus:* the server-side API spec said a `dashboard_transaction` always gets
    `operation: reward`. The dashboard now writes whichever operation the team member picks — credit:
    `reward`, `spend_reversal`, `adjustment`; debit: `spend`, `reward_reversal`, `adjustment`. Fixed in
    `adapty-api.yaml` (English only; locales follow on the next translation run).
  - *New, not in this brief:* a balance has a **spendable** amount — unexpired credits. **Corrected
    2026-11-18:** this entry said "unexpired credits minus amounts held for a pending spend", and
    `virtual-currency-balance` said the same until 2026-11-18. Holds don't exist: `held` is always 0
    (`adapty-api.yaml`; backend code, 2026-11-17). The profile card shows the spendable amount only
    when it is lower than the balance. A debit (API or dashboard) takes only the unexpired credit
    batches, which comes to the spendable amount; since 2026-11-18 the API's `available` matches it
    (corrected 2026-11-19, see Sources of truth). How the profile card computes its figure was not
    re-checked on 2026-11-18. The dashboard
    adjustment is gated to Owner, Admin, and Support; requires `feature`; takes an optional reference
    ID (≤128) and one-line comment (≤200); is idempotent per request key; is marked sandbox when the
    profile is a test user; and is not sent to webhooks or realtime integrations, but appears in the S3 and GCS virtual
    currency export as `dashboard_transaction` (2026-11-23, backend code: the export reads the whole
    ledger with no type filter). The comment reaches the event-history **Details** block as the
    metadata key `comment`. A **Change history** window lists manual adjustments of the last 3 months
    with the actor and role, with up to ~2 minutes of lag. Owner article: `virtual-currency-balance`.
  - *Unverified:* what makes a profile a "test user" for the sandbox flag has no UI label and no docs
    article; the article says "a test user's balance" without a link.

- **2026-11-18 — virtual currency top-up recipe (autolog).** Checked against backend code (read
  2026-11-17), AdaptySDK-iOS 4.4.0, and adapty-cli v0.25.1.
  - *The Adapty CLI can't create a pack.* A virtual currency pack is a consumable product, and
    `adapty products create --period` takes only `weekly`, `monthly`, `two_months`, `trimonthly`,
    `semiannual`, `annual`, and `lifetime` (adapty-cli `origin/main` at v0.25.1,
    `src/sdk/adapty/products/model.ts:6`). `src/lib/api-schemas.ts` knows a `consumable` product type,
    but no command exposes it. Create packs in the dashboard (`create-product` supports consumables) or
    in App Store Connect, then connect them. `developer-cli-products` lists the same periods, so it is
    right as written; neither it nor `create-virtual-currency` tells a reader that the CLI can't make a
    pack. That sentence would belong to `agent-tooling`, which this pass didn't edit.
  - *Open: is the reset at an upgrade intended?* The code resets the lower tier's unspent expiring
    credits at an App Store upgrade, and `create-virtual-currency` now says so. Whether the product team
    wants the unspent lower-tier credits to survive an upgrade is unconfirmed; no sandbox upgrade was run.
  - *Open: Google Play.* Neither the upgrade path nor the synchronous credit on the purchase validation
    request was traced for Google Play; the Play handlers call the same transaction handler as the App
    Store ones (backend code, 2026-11-17), which makes the same behavior likely, not certain.
  - *Open: the balance on the profile.* When the read-only iOS balance ships, three sentences change:
    "no SDK method to read … a balance" in `virtual-currencies`, the same claim in this brief's
    `What we document`, and the "tokens" row of `Ticket language`. Checked by branch listing and
    `git grep` on AdaptySDK-iOS (2026-11-17); the release version is not fixed in code.

- **2026-11-19 — reviewer feedback on the virtual currency recipe (autolog).** Checked against backend
  code (read 2026-11-19) and AdaptySDK-iOS 4.4.0.
  - *Wrong in this brief, corrected in place:* (1) `available` overstating the spendable amount. True
    until the backend change merged on 2026-11-18; the 2026-11-18 entry relied on a read from
    2026-11-17. (2) A late credit always arriving with the App Store notification: true for
    subscriptions, wrong for packs, which arrive when the SDK resends the unfinished transaction. Both
    reached `ios-virtual-currency-top-up`, which its 2026-11-19 rebuild corrects. Before you repeat a
    balance or credit claim from this brief, compare its read date with the last change to the
    virtual currency backend.
  - *Wrong in the corpus, not fixed here:* `adapty-api.yaml` describes `available` as "Balance available
    to spend, computed as `balance - held`." in both balance schemas (lines 3294 and 3340, checked
    2026-11-19). GET now subtracts expired credits too, and the POST response returns what a debit can
    spend. The spec is the maintained reference (see `server-side-api`), so the fix is a spec edit.
  - *Open:* Android's path for a pack whose validation failed (does the SDK resend it, and when) was
    not read.
