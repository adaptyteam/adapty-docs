---
zone: web-payments
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Connecting web-based payment providers — Stripe, Paddle, and generic "other stores" — as a purchase
channel alongside or instead of App Store/Google Play billing, so a purchase made on a website can grant
access in the mobile app and be tracked in the same dashboard as store purchases. Covers the umbrella
"Web" article and the initial account/connection setup for each provider. Audience is developers setting
up a non-store purchase channel.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| custom-store | — | dev | 1 | tutorial |
| paddle | — | dev | 12 | tutorial |
| payment-integrations | entry | dev | 0 | tutorial |
| stripe | — | dev | 16 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`apple-platform` / `google-platform`** — distinguished by which channel actually sells the product:
  store billing (App Store/Play) is those zones; a payment provider on a website is here.
- **`products-and-offers`** — is the ticket about connecting/configuring the payment provider account
  itself (here), or about creating the actual product/price record that gets sold through it
  (`create-product`)? The provider connection is here; the product record is `products-and-offers`.
- **`adapty-mail`** — `mail-checkout` also builds a web checkout page. Is the ticket about the payment
  provider's account/connection itself (here) or about the Adapty-Mail-specific checkout flow built on
  top of it for email-driven purchases (`adapty-mail`)?
- **`server-side-api`** — `sync-subscribers-from-web` / `sync-purchases-from-custom-stores` are the API
  mechanics for getting server-recorded web purchases into Adapty. If the ticket is about that
  endpoint/spec, it's `server-side-api`; if it's about setting up the provider account/dashboard
  connection, it's here.

## Ticket language

Four articles only, so most of the work here is *disambiguation*: "web purchases" is a phrase four
different zones can claim. Corpus-wide synonyms (profile ↔ `customer_user_id`, access level ↔
entitlement) live in `aliases.md` and are not repeated.

| How a ticket says it | Where it actually lives |
|---|---|
| "web purchase doesn't unlock the app", "web2app access not granted", "bought on the site, no premium in the app" | `stripe` / `paddle`, but establish which half broke first. Adapty can only link a web purchase to a profile by an ID passed *at checkout time* — Stripe `metadata`, Paddle `custom_data`, both keyed `customer_user_id` — and the app must then call `.activate()`/`.identify()` with that same value. A missing ID on either side produces this symptom. |
| "purchase went through but there's no revenue/event in Adapty" | `stripe` / `paddle` — the product must exist in Adapty carrying the provider's `product_id` **and** `price_id` (Stripe `prod_…`/`price_…`, Paddle `pro_…`/`pri_…`). Adapty emits transaction events only for transactions tied to a registered product; skipping this is the single most common setup miss in both articles. |
| "we can't touch the checkout code", "match users by email instead", "purchase is anonymous" | Profile-creation behavior, configured per provider in App Settings. Stripe falls back to the Customer `email` or the Session `client_reference_id`; Paddle to the Customer `email` or the `ctm-…` Customer ID. Both can also be told not to create profiles. A transaction matching none of them stays anonymous: it shows in Analytics but is absent from LTV, cohorts, conversions, and the Event Feed. |
| "duplicate transaction", "a test purchase granted production access", "wrong environment in the API response" | `stripe` — `store_transaction_id` / `store_original_transaction_id` collide because Stripe invoice IDs can repeat across Test and Live. The fix is Stripe-side: an environment-specific invoice prefix, or customer-level invoice numbering. |
| "one-time purchase not tracked", "Payment Link purchase missing" | `stripe` — non-subscription Checkout purchases are recorded only when Stripe issues an invoice, and by default it doesn't. `payment_intent.succeeded` alone is not enough; invoice creation has to be enabled on the session. |
| "tiered pricing", "usage-based / metered billing", "customer chooses the price" | `stripe` — explicitly unsupported. Only flat-rate and package pricing behave enough like a store product. |
| "refund didn't cancel the subscription" | `paddle` — a Paddle refund affects only the refunded transaction; the subscription stays active until explicitly cancelled. Refund coverage also differs by processor: Paddle full **and** partial, Stripe full only. |
| "our numbers don't match the processor's dashboard" | `paddle` — Adapty's amounts include tax and Paddle fees, Paddle reports them net, so Adapty always reads higher. Not a sync bug. |
| "paid trial", "charge $0.99 for the trial then $9.99/month" | `paddle` — requires *two* Adapty products: a non-subscription one for the trial charge and a subscription one carrying the free-trial price. Paddle sends both prices in one transaction; Adapty splits it into a non-subscription purchase plus a trial-started event. |
| "billing issue", "dunning", "grace period", "stuck in `past_due`" | Split by processor. `paddle` documents the 30-day default grace period and that sandbox has no Retain, so `past_due` never resolves there. `stripe` states Stripe grace periods are *not* supported — access is revoked as soon as the billing issue event fires. |
| "Amazon Appstore", "Huawei AppGallery", "our own store", "direct sales" | `custom-store`. Defined by absence: Adapty neither validates nor processes the purchase, so the article names no specific store. Note `payment-integrations` (the "Web" entry page) lists only Stripe and Paddle — custom stores are not reachable from it. |
| "web events aren't reaching Amplitude/AppsFlyer/our webhook" | `paddle` and `custom-store` both carry the same prerequisite: the user must have logged into the app with their App Store/Google Play account at least once before their events work with integrations. `stripe` does not state this. |
| "which paywall converted the web purchase", "attribute web revenue to an A/B test" | `stripe` / `paddle` — pass `variation_id` next to the user ID (Stripe reads it only from Subscription and Checkout Session metadata). Building or serving that web paywall is elsewhere: `sdk-flows-display` for a web paywall launched from the SDK, `other-apis` (Web API) for fetching a paywall and recording its view from your own web app, `paywalls-legacy` for the remote-config paywall such a page renders. |
| "sync web purchases", "report the transaction from our backend", "import purchase history" | Not this zone — `server-side-api`. web-payments stops at the account/dashboard connection. `custom-store` is the one roster article that *depends* on that API call, and it links out rather than documenting it. |
| "can we sell outside the App Store", "avoid the 30% commission" | Genuinely ambiguous. Connecting the processor is `stripe` / `paddle` (both flag that Apple's external-payment allowance is US-only, so don't promote web subscriptions in-app elsewhere). Sending an in-app user *out* to a web checkout is the web paywall: `sdk-flows-display`. Building an email-driven checkout on top of the same processor is `adapty-mail`. |

## Gaps and misses

