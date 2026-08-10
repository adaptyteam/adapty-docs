---
zone: ads-manager
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Adapty Ads Manager: a dedicated product for managing Apple Search Ads campaigns from inside Adapty —
real-time analytics tied to installs/trials/revenue, campaign/ad-group/keyword creation and management,
automation rules (bid/budget/keyword/search-term rules), market intelligence (competitor keyword
visibility), Custom Product Page A/B tests, and a conversational AI agent scoped to the connected Apple
Ads account. This is campaign management and optimization for one ad platform (Apple Search Ads), run
inside Adapty instead of Apple's own console.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-ads-manager | entry | marketer | 2 | tutorial |
| adapty-ads-manager-analytics | entry | marketer | 12 | tutorial |
| adapty-ads-manager-get-started | — | marketer | 3 | tutorial |
| adapty-ads-manager-metrics | — | marketer | 4 | tutorial |
| ads-manager | entry | marketer | 0 | tutorial |
| ads-manager-ai-agent | — | marketer | 5 | tutorial |
| ads-manager-automations | entry | marketer | 5 | tutorial |
| ads-manager-automations-ad-group-rules | — | marketer | 3 | tutorial |
| ads-manager-automations-campaign-rules | — | marketer | 3 | tutorial |
| ads-manager-automations-keyword-rules | — | marketer | 5 | tutorial |
| ads-manager-automations-search-terms | — | marketer | 5 | tutorial |
| ads-manager-cpp-ab-tests | — | marketer | 13 | tutorial |
| ads-manager-create-ad-group | — | marketer | 5 | tutorial |
| ads-manager-create-campaign | — | marketer | 6 | tutorial |
| ads-manager-create-segments | — | marketer | 2 | tutorial |
| ads-manager-manage-ads | — | marketer | 5 | tutorial |
| ads-manager-manage-keywords | — | marketer | 12 | tutorial |
| ads-manager-market-intelligence | — | marketer | 6 | tutorial |
| ads-manager-overview | — | marketer | 3 | tutorial |
| ads-manager-settings | — | marketer | 3 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`integrations`** — `apple-search-ads` (in `integrations`) is the basic ASA attribution/analytics-only
  SDK integration; Ads Manager is the full campaign-management product with its own separate connection
  flow. A ticket about "just getting ASA install attribution" is `integrations`; one about running or
  optimizing campaigns is here.
- **`attribution`** — is the ticket about Apple Search Ads campaigns specifically (here), or about
  Adapty's own cross-channel attribution product spanning Meta/TikTok/tracking links (`attribution`)?
  Ads Manager is Apple-only; `attribution` is multi-channel.
- **`ai-advisory`** — `ads-manager-ai-agent` answers questions about an Apple Ads account; AI Growth
  Advisor/Predictions (`ai-advisory`) recommend paywall/pricing experiments from subscription data —
  different data domains despite both being "AI."
- **`ab-tests`** — `ads-manager-cpp-ab-tests` tests Apple Ads Custom Product Pages, not Adapty
  flows/paywalls. The general A/B test mechanism for flows/paywalls is `ab-tests`.

## Ticket language

Corpus-wide synonyms (Adapty Search Ads / ASA ↔ Apple Search Ads, the `ads-manager-` prefix) live in
`aliases.md` and are not repeated here. The first row exists because four articles in this zone have
near-identical names and a ticket almost never says which one it means.

| How a ticket says it | Where it actually lives |
|---|---|
| "the Ads Manager overview page", "the Ads Manager landing page" | Settle the naming first. `adapty-ads-manager` is the product's top-level intro and feature index. `ads-manager` is only the mid-level category page for the campaign-management subsection (campaigns, ad groups, keywords, ads, segments, analytics) — thin, mostly a card list. `ads-manager-overview` documents the actual **Overview** screen: metric cards with trend charts, **Edit metrics**, date range, chart type, and the gross / proceeds-after-commission / proceeds-after-commission-and-taxes revenue selector. |
| "the table with all campaigns and keywords", "add a column", "save a view", "search term to keyword drill-down" | `adapty-ads-manager-analytics` — the tabbed tables (Campaigns, Apps, Ad groups, Keywords, Search terms, Negative keywords, Ads), column editing and saved column presets. Not `ads-manager-overview`, which is summary cards only and has no table. |
| "what does ROAS / CPA / CPI mean here", "how is this calculated", "cohort ROAS", "these numbers don't match Adapty analytics" | `adapty-ads-manager-metrics` — the only place with formulas, and the same metric list that every automation-rule condition picks from. Mismatch questions usually resolve to scope or the revenue selector: these metrics are Apple Ads spend/taps/downloads joined to Adapty's install → trial → subscription funnel, and Revenue is pre-commission unless a proceeds option is selected. |
| "automate bids", "rule to pause things automatically", "budget automation" | Route by the object the rule **changes**, not the metric it measures. Keyword bid, enable/pause keyword, copy keyword to another ad group, add as negative → `ads-manager-automations-keyword-rules`. Ad group default bid or CPA goal → `ads-manager-automations-ad-group-rules`. Campaign daily budget or status → `ads-manager-automations-campaign-rules`. Promoting real user queries into keywords → `ads-manager-automations-search-terms`. |
| "rule didn't run", "did the rule change anything", "undo a rule", "run it now", "start from a template" | `ads-manager-automations` — Logs with per-run CSV, **Date last run** / **Date next run**, run-now, duplicate, pause vs delete, and where **Templates** lives (keyword, search term and campaign rules have templates; ad group rules don't yet). Two constraints do most of the work: an enabled rule can overwrite manual bid changes on its next run, so pause it rather than managing bids by hand; deleting is permanent. |
| "harvest keywords from search queries", "negate wasted search terms", "Discovery → Probing pipeline" | `ads-manager-automations-search-terms`. The rule needs a Discovery or Search Match campaign as its source — exact-match-only campaigns generate no search term reports, so there is nothing to evaluate. Promoting without negating at source makes both campaigns bid on the same query. |
| "AI recommendations for ads", "chatbot for ad performance", "have the AI pause my keywords" | `ads-manager-ai-agent`. Advisory only: it analyzes the account and recommends, but changes no campaign, bid or budget. Entered from **Ask AI Agent** in the account header, and an app must be picked first to scope it. |
| "connect Apple Ads", "we already enabled the Apple Search Ads integration", "import historical spend" | `adapty-ads-manager-get-started`. Ads Manager deliberately does **not** use the Apple Ads integration in App settings — it needs its own Apple sign-in, and the Account Admin role in Apple Ads. It is a standalone product: observer-mode SDK plus App Store server notifications is the minimum for revenue data, no full migration to Adapty required. |
| "connect a second Apple Ads account", "billing / plan", "hide paused campaigns" | `ads-manager-settings`. **Campaign groups** is the tab where Apple Ads accounts are connected and aggregated into one dashboard; subscription/payment method and the **Hide Paused by Default** switch are there too. |
| "can't delete a campaign", "campaign created but not serving", "CPA cap vs max CPT bid" | `ads-manager-create-campaign` for the wizard — deletion is not supported (pause instead), and placement, bid strategy and scheduling can't be edited after creation. `ads-manager-create-ad-group` for why nothing serves: bid, audience and keywords all live on the ad group, so a campaign without one has no targeting or bidding. The ad group's CPA cap sets an effective ceiling of `CPA cap × tap-through CR`, which can undercut a higher max CPT bid. |
| "change a keyword's match type", "bulk bid edit", "SKAG", "who changed this bid" | `ads-manager-manage-keywords`. Match type is immutable once saved — delete and re-add. Bulk **Edit CPT bids** can peg bids to average CPT or CPA with a multiplier. **Bid History** attributes each change either to a manual edit or to an automation rule ID, which is the fastest way to answer "who moved this bid". |
| "assign a custom product page to an ad", "second ad in the same ad group" | `ads-manager-manage-ads`. One active ad per ad group — creating a new one pauses the existing ad. The CPP must be created and App Store-approved in App Store Connect first; Adapty only reads the approved list. |
| "test two product pages", "which App Store page converts better", "statistical significance" | `ads-manager-cpp-ab-tests`. The mechanism is what tickets trip over: Adapty clones the source ad group once per variant and rotates them, pausing the original until the test ends and then restoring it. The source ad group must be at least 28 days old with traffic, precision and confidence set the required sample, and stopping a test is final. |
| "competitor keywords", "what are rivals bidding on", "brand protection", "new country research" | `ads-manager-market-intelligence` — 30-day aggregate across 50+ countries, refreshed daily. Selected keywords can be pushed straight into a campaign as keywords, negatives or SKAG from the results table, so a ticket about "acting on competitor keywords" doesn't need `ads-manager-manage-keywords`. |
| "personalize the paywall by campaign or keyword", "audience from ad source" | `ads-manager-create-segments` — **Actions > Create segment from…** on the Campaigns, Ad groups or Keywords tab. Selecting several rows produces one combined segment, not one per row. |

## Gaps and misses

