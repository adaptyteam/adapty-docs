# Context mill — term aliases

Global equivalences between task language and doc language. Used by the
context-mill skill's lookup mode to expand search terms. Hand-curated —
add a row whenever a lookup misses articles because of naming drift.

**Which file does a new row belong in?** This one holds equivalences that hold
**across the whole corpus** — a rename that touched every zone (Flow ↔ Paywall
Builder), or a word the whole product uses two ways (access level ↔ entitlement).
A zone brief's *Ticket language* section holds how tickets phrase requests
**inside one area**, mapped to the article that answers them. Rule of thumb: if
the row would be true in a dozen briefs, it goes here; if it names a destination,
it goes in that zone. Never write it in both — a duplicated row is a row that
will disagree with itself later.

| Task/product language | Doc language / symbols |
|---|---|
| Flow, Flow Builder | Paywall Builder, onboarding builder, `AdaptyUI`, builder |
| paywall (v4 SDKs) | flow, `AdaptyFlow`, placement |
| onboarding | `AdaptyOnboarding`, onboarding builder |
| access level | premium access, entitlement, `accessLevels` |
| purchase | transaction, `makePurchase` |
| restore | `restorePurchases`, `onRestoreCompleted` |
| server-side API | S2S API, getting-started-with-server-side-api |
| Adapty Search Ads, ASA | Apple Search Ads, `apple_search_ads` |
| fallback | fallback paywalls, `setFallback` |
| profile | customer profile, `getProfile`, `AdaptyProfile` |
| remote config | custom JSON, `remoteConfig` |
| Adapty Attribution | user acquisition, `ua-` article prefix, web campaigns, tracking links |
| webhook payload field | event property, event field, `event_properties`, payload schema |
| money/price field | `price_local`, `price_usd`, `original_price`, `discount_amount`, `proceeds`, `net_revenue`, `tax_amount` |
| currency conversion | USD conversion, exchange rate, `UsdConversion` snippet |
| Adapty Mail | email campaigns, `mail-` article prefix |
| Ads Manager | Apple Search Ads campaigns, `ads-manager-` article prefix |

## Cross-cutting article sets

Some changes hit every article in a category rather than a named feature.
Grep the map for these when a ticket is category-shaped, not feature-shaped.

- **Articles that display money amounts** — metrics pages (`*-metrics`,
  `results-and-metrics`, `analytics-*`), ETL exports (`s3-exports`,
  `google-cloud-storage`), integration payload references (`messaging`,
  `analytics-integration`), `mail-analytics`. A change to how revenue,
  currency, or proceeds are presented touches all of them at once.
- **Per-platform article families** — a doc change to one platform usually
  has 6 siblings (iOS, Android, React Native, Flutter, Unity, KMP,
  Capacitor). Check `sidebars` in the map for which platforms have the
  article and which are missing it.
- **Shared event-property tables** — `messaging` and `analytics-integration`
  carry a duplicated ~50-row property table, currently byte-identical.
  Edit both copies or they drift. Only `braze` and `posthog` deep-link into
  it; `onesignal`, `pushwoosh` and `slack` do NOT reference it at all — they
  carry their own small, unrelated tag tables. (Corrected 2026-08-10 by
  reading all 36 integration articles; the earlier five-destination claim in
  this file was wrong.)
