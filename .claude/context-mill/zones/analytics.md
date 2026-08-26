---
zone: analytics
sources: [analytics-export-api-spec, dashboard-backend, dashboard-interface]
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

Almost every claim in this zone is a *definition*, and a definition that drifts from the backend is
invisible until someone's number looks wrong. So the question for a task here is rarely "which article"
— it's "which module computes this".

- **`dashboard-backend` — where a metric's formula actually lives.** Every chart metric is a Jinja +
  ClickHouse macro under `src/portal/analytics_context/infrastructure/repositories/metrics_repositories/`,
  and the filenames map nearly one-to-one onto this zone's articles: chart-specific formulas in
  `chart_metrics_repository/metrics_calculation_macros/` (`select_mrr_metrics.sql`,
  `select_refund_metrics.sql`, `select_non_subscriptions_metrics.sql`, …), shared ones in
  `macros/metrics_calculation_macros/` (`select_revenue_metrics.sql`, `select_arppu_metrics.sql`,
  `select_installs_count.sql`). *Which events* feed a metric is not in the SQL — it is
  `domain/enums/event_type.py`. Three worked examples read there while writing this brief: New
  subscriptions is `{subscription_started, trial_converted}` (`subscription_purchase_started_event_types`),
  which is exactly why the metric outruns the `subscription_started` event; `mrr` divides each
  transaction by *its own* purchase→expiry span in days ÷ (365/12) rather than by the product's declared
  duration, which is where the article's "weekly ≈ 0.23 months" comes from and why an offer or a partial
  period moves the divisor; `arppu` divides gross revenue (refund rows included, negative) by distinct
  payers counted from purchase events only, which is the asymmetry `refund-events` describes.
- **Read `origin/develop`, not the clone's working tree.** These constants change under the docs, so the
  registered `default_ref` matters more here than in most zones. Checked 2026-08-11: the local clone's
  checked-out `develop` is `0cadcfffa2fa` (2026-05-20) while `origin/develop` is `ddf57f85e0`
  (2026-08-06), and the diff between them adds an App Store Brazil proceeds rate of 0.74 effective
  2026-07-06 to `select_revenue_metrics.sql` — a rate that does not exist in the working tree at all.
- **Adapty-computed versus passed through from a store, and therefore who can settle a discrepancy.**
  Per transaction the store supplies price, currency, country, refund events, its own commission rate
  (`store_proceeds_rate`) and its own tax rate (`tax_rate`); `-1` is the sentinel for "the store did not
  report one". Adapty computes everything else — the USD conversion
  (`src/sdk/purchase_context/applications/usd_exchange_rate.py`, backed by the currencylayer `historical`
  adapter in `applications/adapters/external/currency_rate.py`, one stored rate per currency per date),
  every bucket and aggregation, and the fallbacks in the next bullet. That split is the triage rule for
  a "your number differs from the store's" ticket: if the disputed figure traces to a store-supplied
  field, the store's own transaction record is the arbiter and reading Adapty code will not settle it —
  which is why `discrepancies-and-troubleshooting` opens by telling the reader to compare raw
  per-transaction exports rather than totals.
- **Proceeds / net revenue: `macros/metrics_calculation_macros/select_revenue_metrics.sql` is the whole
  story.** `render_gross_revenue`, `render_proceeds_value`, `render_tax_rate` and `render_net_value` there
  produce the three columns behind the gross / after-commission / after-commission-and-taxes dropdown,
  and net is proceeds **÷ (1 + tax rate)** — tax is divided out of a tax-inclusive price, not subtracted
  from it. The load-bearing correction to the docs' "Adapty does not calculate taxes": that is true only
  on the reported path. When `tax_rate == -1`, the same macro falls back to a hardcoded App Store Brazil
  0.225 and then to a ClickHouse dictionary keyed on (country, store, currency), which is fed by Adapty's
  own tax-rate table (`domain/entities/tax_rate/`, `infrastructure/repositories/tax_rate_repository/`);
  `render_proceeds_value` has the same shape, with a hardcoded ladder (Stripe 0.955, Paddle 1.0, 0.85 for
  Small Business / 364-day-plus / Play auto-renew, country overrides, 0.7 default). No article in the zone
  mentions any of this — `grep -niE "fallback|estimat|assume"` across all 37 returns only prediction and
  worked-example hits. Two consequences: never source a **published** commission percentage from that
  ladder (it is a fallback estimate; the stores' own terms are the truth, and the percentages currently in
  prose sit in `analytics-cohorts` and `how-adapty-analytics-works#commissions-and-taxes`), and never
  promise a reader that a proceeds figure is store-reported without checking whether their store reports
  the rate at all.
- **Timezone and install definition re-scope every chart, and their behaviour is defined in one place.**
  `domain/entities/app_analytics_settings.py` holds both (`timezone`, default UTC; and
  `profiles_counting_method`, default `profile_id` — the enum's three values live in
  `src/common/enums/profiles_countung_method.py`, filename misspelling included). They are applied by
  `MetricsFilters.update_from_app_analytics_settings` in
  `domain/value_objects/metrics/metrics_filters.py`, and the branch that decides *whether* they apply is
  in `applications/metrics/chart_metrics/chart_metrics_application.py`: a single-app request inherits the
  app's settings, anything else is forced back to UTC + `profile_id`, while the Overview endpoint
  (`infrastructure/ports/http/chart_dashboard_metrics.py`) passes its own `timezone` in. That is the
  mechanism behind `overview`'s "its own timezone and install-counting settings" note. Every date bucket
  is `toStartOfDay(<date field>, timezone)`, and `analytics-cohorts` / `ltv` bucket on
  `profile_install_date` (`cohort_metrics_repository/select_cohort.sql`), so both settings silently move
  cohort membership too. The settings' own dashboard UI is documented in `general`
  (`app-and-account-settings` zone), so a behaviour change lands in two zones.
- **The row a metric sums is assembled before any metric macro runs.**
  `infrastructure/management/commands/select_transactions.sql` + `insert_transactions.sql` build
  `adapty_analytics_transactions` from the raw event tables, and that is where the amount a chart later
  sums is decided: a refund row is written as `0 - abs(amount)` into the same amount column (refunds are
  negative revenue rather than a separate subtraction — the mechanism behind negative buckets), and an
  upgrade-driven cancellation (`is_cancelled and is_upgraded`) is written as `0`, not as a negative.
  Read this file before answering anything about refund, upgrade, or proration amounts; the per-metric
  macro will not tell you.
- **Do not infer a claim class from a neighbouring metric's article — this is the zone's standing
  hazard.** With 37 near-siblings the tempting move is to copy the adjacent article's wording, but the
  ~30 macros were written independently and genuinely disagree. Refund handling is the worst case (`mrr`
  anti-joins refunded transaction ids and so rewrites history; `revenue` sums a negative row on the
  refund date; `arppu` keeps the refunded payer in the denominator) and its doc-side matrix is
  `refund-events#how-metrics-handle-refunds`. Filter and grouping support is the second case: the
  per-article "Available filters and grouping" lists differ per metric on purpose, and
  `controls-filters-grouping-compare-proceeds` says so explicitly. Paywall and flow **view** counts are a
  third source entirely — `chart_metrics_repository/query_macros/select_paywall_views.sql` only reads
  what the SDK logged, so ground truth for whether a view exists is an SDK repo (see Boundaries).

  **"The SDK logged it" is necessary but not sufficient — correction of 2026-08-26.** Which *table* a
  logged show lands in is decided dashboard-side, and until ADP-7600 a flow screen show never reached
  `adapty_analytics_paywall_visit` at all: `FlowShowedRouterApp` routes the event to the paywall topic
  **or** the flow topic, never both, and picks the flow topic as soon as the variation carries a
  `flow_id` — which a screen's child variation always does. So flow screen views lived only in
  `adapty_analytics_flow_events`, and every paywall-view metric (charts page + conversion v2's
  View → Trial / View → Paid) silently understated its denominator for any app on Flow Builder. Funnels
  had compensated with their own union; nothing else had. ADP-7600 unions the two sources back together
  in `render_paywall_view_rows_query` in the same file. Verified by reading `origin/ADP-7600` against
  `origin/develop` in `dashboard-backend` — on `develop` the macro still reads
  `adapty_analytics_paywall_visit` alone (line 63), so **this is branch state, not merged behaviour**;
  re-check before treating the union as live. The general lesson outlives the branch: for a view-count
  ticket, "the SDK logged it" and "the metric counts it" are two questions, and the routing between
  them is a dashboard-backend fact.

- **Where a filter/group attribute's label and per-chart availability actually live — backend, with the
  frontend able to subtract.** Added 2026-08-26 while adding the Flow / Flow screen dimensions. The
  display label of every filter and grouping attribute is backend-owned, the same way integration form
  fields are (see `sources.md`'s `share.py` rule): `SEGMENTATION_TITLES` in
  `domain/enums/metrics/chart_metrics_segmentation.py` for groupings and `METRICS_FILTER_TITLES_MAP` in
  `domain/enums/metrics/metrics_filter_field.py` for filters. **Never take an attribute name from the
  interface repo** — grepping `adapty-dashboard-interface` for `flow_screen_id` returns the id and no
  label at all. Which attributes a given chart offers is `domain/chart_metrics_segmentations_config.py`:
  a `COMMON_SEGMENTATIONS` tuple plus per-chart-type extras, and that file is what to read when
  verifying a metric article's "Available filters and grouping" list. The catch is that the backend
  returns **one** attribute list for the whole analytics page, so the chart drops what it cannot resolve:
  `installException` in `apps/web/src/pages/dashboard/advanced/lib.tsx` (interface repo) is why Installs
  and ARPU offer no Paywall, Placement, Product, Flow or Flow screen even though the backend config
  grants ARPU all of them. Both files verified on `origin/develop` / `origin/master` respectively, so
  this ownership split is current, not branch state.
- TODO(owner): `sources.md` has no entry naming the analytics computation layer, so tasks in this zone
  should cite `dashboard-backend` and name the module they read, as `integrations` does for `share.py`.
  A related open item: the raw ClickHouse tables the command above reads from
  (`adapty_analytics_transaction`, `adapty_analytics_profile_event`) are populated outside this repo — is
  there a registered source for that ingest layer, or is a verified live transaction the only check?

## What we document, what we don't

Delta from `scope.md` only; the rules there about obvious UI affordances and evidence for absence apply
here unchanged and are not restated.

- **We document how a number is computed; we stop before telling anyone what to do about it.** The
  house shape is visible across the roster: 18 of the 37 articles carry a `## Calculation` heading, 19 a
  `## Available filters and grouping`, 19 a `## Similar metrics`. Business interpretation is capped at
  one or two sentences in the intro that name the control or grouping worth reaching for (`revenue`:
  monthly resolution, group by product, watch the new-vs-renewal mix; `analytics-retention`: the four
  questions the chart answers). What we never write is a target value or an industry benchmark —
  confirmed by `grep -niE "benchmark|industry average|a good (rate|number)"` across all 37, which returns
  two hits, neither of them a number. A ticket asking "is our churn bad" is not a docs task.
- **Definitions and store-side rules split by who owns the rule.** We document what Adapty does with a
  commission or tax rate; the authoritative rates and the stores' own metric definitions stay with the
  stores and are linked, not restated. The one exception is deliberate and canonical: the Adapty ↔ App
  Store Connect ↔ Play Console name mapping in
  `discrepancies-and-troubleshooting#differences-in-terminology`, which exists precisely because the same
  word means different things on each side.
- **Chart affordances: the hub carries the enumerable and the invisible; the metric articles carry only
  what differs.** `controls-filters-grouping-compare-proceeds` is where a control gets written up, and it
  earns that space by documenting what the reader cannot see — which control exists on which tab, which
  attributes filter versus group, how country is resolved per transaction and why switching App Store
  country doesn't rewrite the past. Individual metric articles never re-explain a control; they list
  their own supported attributes (because support really is per-metric) and link the hub with a
  `:::link` callout — 25 of the 37 do exactly that. A new control is one hub edit plus a line in the
  metric articles whose support changed, not 37 edits.
- **`other-apis` gets the mechanics, we get the meaning.** A metric's definition is written here; the
  Analytics Export API's auth, endpoints, rate limits and response shapes are written in
  `analytics-export-api-spec` and `export-analytics-api` / `export-analytics-api-requests`, and per house
  rule the spec is the maintained reference. The overlap to watch is naming, not prose: the spec carries
  the same metric list as enums (`revenue, mrr, arr, arppu, subscriptions_active, …` and
  `revenue, proceeds, net_revenue`) with a one-line gloss each, so **adding or renaming a metric is a
  spec edit too**, while expanding a definition never is. In the other direction we don't restate export
  mechanics here — `controls-filters-grouping-compare-proceeds` and `discrepancies-and-troubleshooting`
  point at the API and stop.
- **`ai-advisory` gets the model; we get enough to read the column.** Realized numbers are written here,
  predicted ones there — but the boundary already leaks by design: `analytics-cohorts` and
  `metric-comparison-table` define Predicted revenue and Predicted LTV to the depth needed to read a
  cohort column, and that is the intended ceiling. How the model works, what it needs, and when
  predictions are unavailable belong to `predicted-ltv-and-revenue` (and `predictions-in-ab-tests`).
  Don't grow prediction method in a metric article.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| active-subscriptions | — | analyst | 4 | tutorial |
| active-trials | — | analyst | 3 | tutorial |
| analytics | entry | analyst | 11 | tutorial |
| analytics-cohorts | — | analyst | 10 | tutorial |
| analytics-conversion | — | analyst | 22 | tutorial |
| analytics-funnels | — | analyst | 7 | tutorial |
| analytics-retention | — | analyst | 5 | tutorial |
| arppu | — | analyst | 5 | tutorial |
| arpu | — | analyst | 5 | tutorial |
| arr | — | analyst | 6 | tutorial |
| billing-issue | — | analyst | 3 | tutorial |
| billing-issue-converted | — | analyst | 4 | tutorial |
| billing-issue-converted-revenue | — | analyst | 4 | tutorial |
| cancelled-subscriptions | — | analyst | 3 | tutorial |
| charts | entry | analyst | 3 | tutorial |
| churned-expired-subscriptions | — | analyst | 3 | tutorial |
| controls-filters-grouping-compare-proceeds | — | analyst | 9 | tutorial |
| discrepancies-and-troubleshooting | — | analyst | 20 | tutorial |
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

