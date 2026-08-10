---
zone: ai-advisory
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

AI Growth Advisor (Autopilot) plus Predictions. AI Growth Advisor analyzes a paywall/market and generates
a data-driven growth plan of test hypotheses, lets the user manage and execute that plan as A/B tests,
and explains its own methodology. Predictions is Adapty's forecasting layer, projecting LTV/revenue for
cohorts and forecasting A/B test outcomes. Both apply AI/ML to a customer's own subscription data to
recommend or forecast — they don't answer open-ended questions about it.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| autopilot | entry | marketer | 5 | tutorial |
| autopilot-analysis | — | marketer | 12 | tutorial |
| autopilot-execute-plan | — | marketer | 4 | tutorial |
| autopilot-growth-plan | — | marketer | 7 | tutorial |
| autopilot-how-it-works | — | marketer | 4 | tutorial |
| predicted-ltv-and-revenue | — | marketer | 8 | tutorial |
| predictions-in-ab-tests | — | marketer | 5 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`ads-manager`** — does the ticket concern AI-driven recommendations for subscription/paywall growth
  (here), or `ads-manager-ai-agent`, a conversational AI that answers questions about an Apple Ads
  account specifically? Same "AI" branding, different product and different data domain.
- **`agent-tooling`** — is this about Adapty's own AI features inside the dashboard (here), or about
  using an external coding agent/LLM/CLI to work with Adapty's own docs or API (`agent-tooling`)?
  Unrelated despite both mentioning "AI" — `agent-tooling` is about coding agents and the CLI, not a
  dashboard feature.
- **`ab-tests`** — `autopilot-execute-plan` launches A/B tests from growth-plan hypotheses. Is the ticket
  about generating/managing the hypothesis (here), or the mechanics of running the resulting test
  (`ab-tests`)?
- **`analytics`** — `predicted-ltv-and-revenue` forecasts numbers that sit alongside real analytics
  cohorts. Is the ticket about the actual historical metric (`analytics`), or the forecast built on it
  (here)?

## Ticket language

The five Advisor article ids all begin with "autopilot", while every title and the UI say **AI Growth
Advisor** — so the ids will not match the label a ticket uses, and both names mean the same product. The
id prefix and a stray `growth autopilot` keyword suggest an earlier name, but no article states a rename,
so don't repeat one as fact. "Predictions" likewise covers two unrelated features — cohort forecasts and A/B test
forecasts — and a ticket saying only "predictions are wrong" has to be disambiguated before routing.

| How a ticket says it | Where it actually lives |
|---|---|
| "does Autopilot change my prices", "does it launch tests by itself", "auto-pilot my paywalls" | `autopilot-execute-plan`. Despite the name, it only recommends — you launch each test through the wizard and **stop it manually**. The one thing it does on its own is refresh the hypothesis list after a test concludes (`autopilot-growth-plan`), and promoting the winner into the next round is also your action. Correct this scope claim explicitly; the name invites overstating it. |
| "Get Growth plan is greyed out", "can't select my paywall", "analysis won't start" | `autopilot` prerequisites. Three hard gates: App Store Connect credentials uploaded (see `apple-platform`), at least one **priced App Store** product on the paywall (Google-Play-only paywalls are ineligible), and Flow Builder placements, which are beta and **not analyzable yet** — the last one catches teams who already migrated to flows. |
| "analyze my paywall automatically", "why do I have to upload an image" | `autopilot-analysis`. The paywall diagnostic is screenshot-driven — Adapty does not render your paywall itself, so no screenshot means no design analysis. |
| "consumables missing from the analysis", "lifetime/one-time product not tested" | Subscriptions only. `autopilot` excludes consumables from the analysis; `autopilot-growth-plan` excludes one-time purchases from regional price optimization. |
| "Activation ARPU doesn't match my ARPU chart", "ARPU numbers disagree" | `autopilot-analysis` — not a bug. Activation ARPU is cohort-based over 90 days; the analytics ARPU chart includes renewals from older cohorts and reads several times higher. Cohort revenue at 90 days (`analytics`) is the closest equivalent. |
| "where do the benchmarks come from", "is my data shared with competitors", "how are competitors picked" | `autopilot-how-it-works`. Three separate provenances that tickets conflate: competitor pricing = public/third-party App Store data; conversion and Activation ARPU benchmarks = anonymized 20,000-app Adapty network; geo-pricing = Adapty Pricing Index. Your own performance data is not used to train other apps' recommendations. |
| "run several hypotheses at once", "tests are blocking each other" | `autopilot-execute-plan`. One at a time by design — geo-pricing is the sole exception, because its audiences don't overlap. |
| "can't launch the test", "product stuck pending", "action required badge" | `autopilot-growth-plan` status badges. The split matters for routing: **Draft** = Adapty-side setup incomplete, **Action required** = store-side, **Pending** = waiting on store review or first sync. |
| "re-running the analysis will wipe my plan", "lost a suggestion I dismissed", "want an old idea back" | `autopilot-growth-plan`. Re-runs are additive — existing AI and custom hypotheses and in-progress tests survive. Dismissed ones sit in **Archived** and restore; past runs are recoverable from version history. |
| "forecast how much a cohort will be worth", "how much can I spend on acquisition" | `predicted-ltv-and-revenue`. Predicted LTV is *derived*, not measured: predicted revenue ÷ predicted paying subscribers, over cohorts of paying subscribers only. |
| "prediction column is empty", "shows a dash", "no forecast for my new app" | `predicted-ltv-and-revenue`. Four distinct causes, and the fix differs: cohort hasn't finished its first renewal period, too few paying subscribers (under 30 are excluded from training), behavior too unusual, or the cohort is older than the selected horizon. New apps get a cross-app fallback applied **per horizon**, so one cohort can mix its own weights and fallback weights. |
| "predicted winner contradicts the current winner", "yellow highlighted variant", "insufficient data for prediction" | `predictions-in-ab-tests`. Predicted P2BB is a year-ahead forecast, a different number from the test's own observed P2BB (`ab-tests` owns the Bayesian math). Contradiction is flagged, not resolved — it's a signal to keep accumulating. Certainty needs 2 of 3 criteria, one of which is 2 weeks elapsed. |
| "trial vs non-trial test looks wrong", "yearly vs weekly test takes forever" | `predictions-in-ab-tests` — this comparison bias is the reason the forecast exists: observed revenue ignores active trials and long periods that haven't renewed yet. |

## Gaps and misses

