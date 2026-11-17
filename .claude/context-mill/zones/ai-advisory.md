---
zone: ai-advisory
sources: []
reviewed_shape:
reviewed_at:
---

<!-- Stub: every section below is unwritten. Blank means nobody has recorded the
     rule yet — never that the zone has no rule, and never that the topic is
     undocumented. Fall back to docs-map.jsonl and the articles, and say which
     section was blank so it gets filled once. -->

## What this is

AI Growth Advisor plus Predictions. **Corrected 2026-11-17** (dashboard code, 2026-11-17): AI Growth
Advisor is no longer a dashboard wizard. The paywall and market analysis, the growth plan, and the
hypothesis wizard were removed for every account; their old URLs redirect to the **AI Growth Advisor**
page, which is now a list of the app's hypotheses with four tabs (Hypotheses, Testing, Completed,
Archived) and type filters (Visual, Pricing, Geo-pricing, Audience, Other). The list is filled by the
`growth-advisor` agent skill (adapty-skills, "The backlog" in `plugin/skills/growth-advisor/SKILL.md`):
the skill saves the hypotheses the user adds, links each A/B test it sets up, and resolves results on
the user's word. The dashboard only reads the list, copies a per-hypothesis prompt to the agent,
archives and restores. Hypotheses from the old growth plans stay, badged **Autopilot v1**.
Predictions is Adapty's forecasting layer, projecting LTV/revenue for cohorts and forecasting A/B test
outcomes.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| autopilot | entry | marketer | 7 | tutorial |
| growth-advisor-recurring-checks | how-to | marketer | 6 | tutorial |
| predicted-ltv-and-revenue | — | marketer | 9 | tutorial |
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

The Advisor article id is `autopilot`, while its title and the UI say **AI Growth Advisor**; old
hypotheses carry an **Autopilot v1** badge, so tickets use both names for the same page. "Predictions" likewise covers two unrelated features — cohort forecasts and A/B test
forecasts — and a ticket saying only "predictions are wrong" has to be disambiguated before routing.

| How a ticket says it | Where it actually lives |
|---|---|
| "where is my growth plan", "Get Growth plan button is gone", "paywall analysis disappeared", "competitor analysis" | `autopilot`, "Hypotheses from Autopilot v1". The dashboard analysis was removed (2026-11); old URLs redirect to the hypothesis list, and old hypotheses stay with an **Autopilot v1** badge. New hypotheses come from the growth-advisor skill (`export-analytics-with-ai`). |
| "AI Growth Advisor page is empty", "how do I add a hypothesis", "no Add button" | `autopilot`, "Get your first hypotheses". The dashboard can't create hypotheses; the agent saves the ones the user adds after its suggestion list. |
| "does archiving stop my test", "restored hypothesis lost its test" | `autopilot`, "Archive a hypothesis". Archive hides the card only; restore brings it back as a new hypothesis without its test. |
| "Needs review on my hypothesis", "who decides the winner" | `autopilot` status table; the result is set through the agent on the user's word (`export-analytics-with-ai`, "When an A/B test ends"). |
| "forecast how much a cohort will be worth", "how much can I spend on acquisition" | `predicted-ltv-and-revenue`. Predicted LTV is *derived*, not measured: predicted revenue ÷ predicted paying subscribers, over cohorts of paying subscribers only. |
| "prediction column is empty", "shows a dash", "no forecast for my new app" | `predicted-ltv-and-revenue`. Four distinct causes, and the fix differs: cohort hasn't finished its first renewal period, too few paying subscribers (under 30 are excluded from training), behavior too unusual, or the cohort is older than the selected horizon. New apps get a cross-app fallback applied **per horizon**, so one cohort can mix its own weights and fallback weights. |
| "predicted winner contradicts the current winner", "yellow highlighted variant", "insufficient data for prediction" | `predictions-in-ab-tests`. Predicted P2BB is a year-ahead forecast, a different number from the test's own observed P2BB (`ab-tests` owns the Bayesian math). Contradiction is flagged, not resolved — it's a signal to keep accumulating. Certainty needs 2 of 3 criteria, one of which is 2 weeks elapsed. |
| "trial vs non-trial test looks wrong", "yearly vs weekly test takes forever" | `predictions-in-ab-tests` — this comparison bias is the reason the forecast exists: observed revenue ignores active trials and long periods that haven't renewed yet. |

## Gaps and misses

- **2026-11-17:** sidebar: AI Growth Advisor is a category again (landing `autopilot`), with
  `export-analytics-with-ai` (label "Audit your app with AI") and `growth-advisor-recurring-checks`
  as children; the "Use Adapty with AI agents" section keeps a link item to the skill article.
  `growth-advisor-recurring-checks` documents the skill's scheduled checks (adapty-skills
  `references/recurring-checks.md`, 2026-11-17): app health, one A/B test, every running A/B test;
  reads only until the user answers. `ADAPTY_TOKEN` for checks off the user's machine is not
  documented on `developer-cli-authentication` (grep of `src/content/docs` for ADAPTY_TOKEN,
  2026-11-17: only the new article) — open: how a user gets the token value.
- **2026-11-17:** screenshots `ai-growth-advisor-hypotheses.webp`, `-completed.webp`, `-empty.webp`
  are mock-data stills with an overridden hypotheses list; retake with the mock-screenshots skill.

- **2026-11-17:** `autopilot` rewritten for the hypothesis list; `autopilot-analysis`,
  `autopilot-growth-plan`, `autopilot-execute-plan` and `autopilot-how-it-works` deleted with their
  locale copies, and the sidebar category flattened to one doc. Every row of the `Ticket language`
  table above that routes to those four ids describes the removed wizard and is stale; only the
  Predictions rows still hold. The skill's side (backlog, add/skip question) is documented in
  `export-analytics-with-ai`, "Your backlog".
- **Open, 2026-11-17:** the dashboard page shows "Pricing isn't supported yet" in its How it works
  panel, while the skill suggests and runs price hypotheses (adapty-skills `references/pricing.md`).
  The docs follow the skill and don't repeat the dashboard note. The dashboard's "Read the setup
  guide" link also points at the docs root, not at `autopilot`.
- **Open, 2026-11-17:** `developer-cli-ads-manager-reference` says the `competitor` keyword pool comes
  from competitors "selected for the app"; the old Autopilot competitor picker that did this is gone.
  Where competitors are selected now was not checked.

