---
zone: analytics
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Kept as one zone on purpose (37 articles): the full Adapty Analytics product — the concepts behind it
(how Adapty analytics works, discrepancies and troubleshooting, controls/filters/grouping/comparing
proceeds), every named chart and metric (MRR, ARR, LTV, ARPU/ARPPU, active subscriptions/trials, churn,
billing issues, grace periods, refunds, installs, revenue, and comparison reference tables), reports,
and push notifications about new analytics events. This is the general revenue/subscription metrics
reference used by anyone reading dashboard charts, independent of which acquisition channel or ad
product drove the numbers.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| active-subscriptions | — | analyst | 4 | tutorial |
| active-trials | — | analyst | 3 | tutorial |
| analytics | entry | analyst | 11 | tutorial |
| analytics-cohorts | — | analyst | 10 | tutorial |
| analytics-conversion | — | analyst | 17 | tutorial |
| analytics-funnels | — | analyst | 7 | tutorial |
| analytics-retention | — | analyst | 4 | tutorial |
| arppu | — | analyst | 5 | tutorial |
| arpu | — | analyst | 5 | tutorial |
| arr | — | analyst | 6 | tutorial |
| billing-issue | — | analyst | 3 | tutorial |
| billing-issue-converted | — | analyst | 4 | tutorial |
| billing-issue-converted-revenue | — | analyst | 4 | tutorial |
| cancelled-subscriptions | — | analyst | 3 | tutorial |
| charts | entry | analyst | 3 | tutorial |
| churned-expired-subscriptions | — | analyst | 3 | tutorial |
| controls-filters-grouping-compare-proceeds | — | analyst | 8 | tutorial |
| discrepancies-and-troubleshooting | — | analyst | 18 | tutorial |
| expired-churned-trials | — | analyst | 3 | tutorial |
| grace-period | — | analyst | 3 | tutorial |
| grace-period-converted | — | analyst | 4 | tutorial |
| grace-period-converted-revenue | — | analyst | 4 | tutorial |
| how-adapty-analytics-works | — | analyst | 8 | tutorial |
| installs | — | analyst | 8 | tutorial |
| ltv | — | analyst | 5 | tutorial |
| metric-comparison-table | — | analyst | 7 | tutorial |
| mrr | — | analyst | 6 | tutorial |
| new-trials | — | analyst | 3 | tutorial |
| non-subscriptions | — | analyst | 3 | tutorial |
| overview | — | analyst | 3 | tutorial |
| push-notifications | — | analyst | 2 | tutorial |
| reactivated-subscriptions | — | analyst | 4 | tutorial |
| refund-events | — | analyst | 5 | tutorial |
| refund-money | — | analyst | 4 | tutorial |
| reports | — | analyst | 2 | tutorial |
| revenue | — | analyst | 6 | tutorial |
| trials-renewal-cancelled | — | analyst | 3 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`attribution`** — does the question concern subscription/revenue performance generally (here), or
  specifically tie revenue back to an ad campaign or acquisition source (`ua-analytics`, `ua-metrics` in
  `attribution`)? If ad spend or ROAS is part of the question, it's `attribution`.
- **`ads-manager`** — same test — does the metric concern Apple Ads campaign performance
  (`adapty-ads-manager-analytics`/`-metrics`), or general app subscription analytics unrelated to a
  specific ad platform (here)?
- **`ai-advisory`** — is the ticket about a raw metric/chart definition (here), or a prediction/forecast
  built on top of it (`predicted-ltv-and-revenue`, `predictions-in-ab-tests` in `ai-advisory`)?
- **`ab-tests`** — `results-and-metrics` (in `ab-tests`) covers one specific experiment's statistical
  results; the general chart-by-chart analytics reference is here.
- **`sdk-flows-display` / `sdk-flows-manual` — a wrong *number* is not always an analytics question.**
  Added 2026-08-10 after an acceptance test started dashboard-side on "our paywall views doubled" and
  never reached the answer: paywall and flow view counts are produced by SDK-side logging, so an inflated
  or missing count is usually a `logShowFlow`/`logShowPaywall` problem, not a metric definition. Doubled
  views on a builder-rendered flow = a manual log call the SDK already makes (`sdk-flows-display`, the
  `troubleshoot-paywall-builder` family). Zero views on a hand-rendered screen = the required manual call
  is missing (`sdk-flows-manual`, `present-remote-config-paywalls`). Rule of thumb: if the metric is a
  *view* or *impression* count, rule out the SDK before reading a definition here.
- **`subscribers-and-profiles`** — aggregate/chart-level questions are here; a single customer's own
  record and history is `subscribers-and-profiles`.

## Ticket language

This zone has one article per named metric, so "what is MRR" / "ARPU formula" / "trial churn chart"
phrasings are pure title restatement — the map already resolves them and they are deliberately absent
below. What's here is the other kind of ticket: a number that looks wrong, two metrics that disagree,
or a business question whose wording matches no metric's name. Money-field and revenue-vs-proceeds
synonyms live in `aliases.md` and aren't repeated.

| How a ticket says it | Where it actually lives |
|---|---|
| "Adapty doesn't match App Store Connect", "revenue differs from Google Play", "numbers don't match AppsFlyer/Adjust" | `discrepancies-and-troubleshooting` first — it's a definition or calendar difference, not a bug. The three usual causes: UTC day boundaries vs the store's, Apple's fiscal calendar (a "month" is 4–5 weeks and can start before the calendar month, so never compare a payout report to a calendar month), and same-name-different-meaning metrics (`#differences-in-terminology` maps Adapty ↔ ASC ↔ Play Console). `how-adapty-analytics-works` is the companion for the pipeline side (commission, tax, near-real-time delay). |
| "how much do we actually get paid", "after Apple's cut", "is this before or after tax", "why is this lower than Sales" | Split: the dropdown that switches gross / proceeds after commission / proceeds after commission and taxes is `controls-filters-grouping-compare-proceeds#display-gross-or-net-revenue`; how the rate is arrived at is `how-adapty-analytics-works#commissions-and-taxes`. Load-bearing constraint: **Adapty does not calculate taxes** — the stores report a per-transaction rate and Adapty displays it, which is why the effective rate varies between transactions in the same app. |
| "revenue went negative", "chart shows minus", "last month's MRR changed on its own", "historical numbers moved" | Both are `refund-events`, but two different mechanisms — say which one you mean. Forward: refunds are dated to the **refund** day, so a bucket with refunds and no new sales goes negative (`#negative-values`; also `revenue`). Backward: `mrr`, `arr` and `active-subscriptions` apply refunds **retroactively**, removing the subscription from every period it was active, so already-reported figures drop. |
| "does this metric deduct refunds", "retention looks better than revenue for the same cohort", "subscriber count includes refunded users" | `refund-events#how-metrics-handle-refunds` — the master matrix, and the single place to edit when refund behavior changes. The answers that surprise people: `analytics-retention`, `reactivated-subscriptions` (New subscriptions) and `non-subscriptions` deduct nothing; `arppu` subtracts the refund from the numerator but keeps the user in the denominator. |
| "cohort numbers changed when I changed the date range", "can't reproduce ARPPU from Revenue ÷ Payers" | `analytics-cohorts#refund-handling`. Refund effects differ between the **by renewals** and **by days** view modes, so establish the mode before debugging anything. ARPPU cells are cumulative from the cohort's first period, so they never equal a single period's Revenue ÷ Payers. |
| "when do we recoup ad spend", "payback period", "CAC payoff" | `analytics-cohorts` for the grid, `ltv` for the curve. Neither is a single number — both have a by-renewals and a by-days mode that answer different questions. |
| "install count is too high", "install chart is zero", "installs don't match the MMP" | `installs`. Cause is almost always the **Installs definition for analytics** mode: `New device_ids` counts reinstalls (so it exceeds store downloads), `New customer_user_ids` returns zero if the app never identifies users. Second cause: an install is the **first app launch**, not the download, so it lands on a later day than the store reports. |
| "the all-apps dashboard disagrees with the per-app chart", "which timezone is the homepage using" | `overview`. It combines all apps using **its own** timezone and install-counting setting — the per-app App Settings values do not apply there. |
| "which metric should we use", "MRR vs revenue", "ARPU vs ARPPU", "views vs unique views", "two conversion-rate numbers disagree" | `metric-comparison-table` — the side-by-side. It also maps paywall/placement metric names (a different zone) onto their analytics-chart equivalents, which is what most "two numbers disagree" tickets actually need. |
| "first-time subscribers", "new subscriptions count doesn't match `subscription_started` events" | The New subscriptions chart is `reactivated-subscriptions` — the filename is legacy and does **not** describe the content; every "new subscriptions" link resolves there. The event mismatch is `discrepancies-and-troubleshooting#new-subscriptions-metric-vs-the-subscription_started-event`: the metric includes trial-to-paid conversions, the event doesn't (`trial_converted` fires instead), so the metric is always higher. |
| "churn rate", "how many users left", "cancellations", "voluntary vs involuntary churn" | Ambiguous by design — split before answering. Auto-renew switched off while access continues to period end is `cancelled-subscriptions` (trials: `trials-renewal-cancelled`); access actually ending is `churned-expired-subscriptions` (trials: `expired-churned-trials`). The voluntary/involuntary breakdown itself comes from the Expiration reason grouping in `controls-filters-grouping-compare-proceeds` or the churn-reason step in `analytics-funnels`. |
| "failed payment", "card declined", "dunning", "did we win those subscribers back", "how much revenue did retries recover" | A four-way family. Entering the retry window = `grace-period` (6 days weekly, 16 days otherwise); the state reached only **after** grace expires unpaid = `billing-issue`; recovery counts = `grace-period-converted` / `billing-issue-converted`; recovered money = `grace-period-converted-revenue` / `billing-issue-converted-revenue`. Recovery *rates* are in `analytics-conversion`. |
| "paywall views missing from the funnel", "funnel step 2 is empty or too low" | `analytics-funnels#paywall-displayed`. Two causes, both easy to miss: the step is built only from `logShowFlow()` / `logShowPaywall()` calls, and it counts only users whose **install** date falls in the selected range — a view by an older user is excluded. |
| "filter by country", "compare to last month", "group by product", "export the chart data" | `controls-filters-grouping-compare-proceeds`. Not every chart supports every attribute (ARPU and Installs are notably limited), so check the metric's own "Available filters and grouping" section too. Country is stamped **per transaction** from device IP → store country → last known IP, so switching App Store country doesn't rewrite past transactions. |
| "email me the metrics", "notify me when we make a sale", "daily revenue digest" | Two unrelated products, neither named after email or phone. Email digests are `reports` — they mirror whatever your `overview` page is configured to show (metrics, order, timezone, revenue type), delivered 9 AM local. Phone alerts are `push-notifications` — the Adapty companion app, capped at 1000/day across all apps. |
| "consumable count is higher than the money we made", "one-time purchase chart" | `non-subscriptions`. It counts purchase events and subtracts nothing for refunds, and it's broader than "one-time purchase" — consumables and non-renewing subscriptions can each be bought repeatedly. |

## Gaps and misses

