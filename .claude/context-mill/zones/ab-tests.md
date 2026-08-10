---
zone: ab-tests
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Running controlled experiments across flow/paywall variants attached to a placement: test types, the
underlying statistics ("Maths behind it"), starting/stopping a test, running a test where one variant
skips the flow or paywall entirely (controlled by a remote-config flag), and reading results and
metrics. This zone owns the experiment mechanism and its statistical interpretation, not the content
being varied or the placement wiring that attaches the test.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| ab-test-no-paywall-variants | — | marketer | 5 | tutorial |
| ab-test-types | — | marketer | 6 | tutorial |
| ab-tests | — | marketer | 3 | tutorial |
| maths-behind-it | — | marketer | 2 | tutorial |
| results-and-metrics | — | marketer | 30 | tutorial |
| run_stop_ab_tests | — | marketer | 5 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`placements-and-audiences`** — is the ticket about attaching an A/B test to a placement/audience
  (`add-audience-paywall-ab-test`, `placements-and-audiences`), or about the test's own lifecycle, math,
  or results (here)?
- **`flow-logic` / `flow-design` / `paywalls-legacy`** — the variants themselves (a flow or a legacy
  paywall) are built and styled in their own zones; this zone only covers testing them against each
  other.
- **`ai-advisory`** — `predictions-in-ab-tests` (in `ai-advisory`) forecasts a test's outcome using AI
  Growth Advisor's predictive models. Is the ticket about the prediction model itself (`ai-advisory`) or
  the test mechanics/actual results (here)?
- **`ads-manager`** — `ads-manager-cpp-ab-tests` is a different, Apple-Ads-specific A/B test (comparing
  Custom Product Pages). Distinguish by whether the experiment concerns Adapty flows/paywalls (here) or
  App Store Custom Product Pages inside Ads Manager (`ads-manager`).

## Ticket language

Rows name article ids from the roster above. Corpus-wide synonyms (Flow ↔ Paywall Builder, paywall ↔
flow in v4, remote config ↔ custom JSON) live in `aliases.md` and are deliberately not repeated here.
Note that statistics questions arrive phrased as bugs — read them as questions before believing them.

| How a ticket says it | Where it actually lives |
|---|---|
| "test result isn't significant yet", "no p-value shown", "how many users do I need", "why isn't the result final" | `maths-behind-it`. There is no significance test to fail — the analysis is Bayesian, so the output is probability to be best, and **you** pick the decision threshold (95% is only a convention). The metric is also a proxy: 14-day ARPU standing in for 12-month revenue per user, so a young test genuinely cannot be read yet. |
| "P2BB says A wins but the dashboard picked B", "which variant is actually winning" | `results-and-metrics`. The green highlight and pre-selected default come from **Revenue per 1K users**, not from P2BB — the two can disagree, and this is the single most common confusion in the zone. |
| "numbers changed after we stopped the test", "the leader moved overnight" | `run_stop_ab_tests` for the mechanism (metrics keep updating after a stop as later purchase and revenue events are attributed to users who participated), `results-and-metrics` for what each number means. |
| "holdout group", "control that sees nothing", "incremental lift of showing a paywall at all" | `ab-test-no-paywall-variants`. There is no built-in empty variant: you add a `show_paywall` remote-config flag to both variants and your app branches on it. Do not log a view for the empty variant — it was never shown. |
| "conversion rate is wrong", "views are zero", "test stats don't match our own analytics" | `ab-tests` and `run_stop_ab_tests` both carry the constraint: outside Flow/Paywall Builder you must call `logShowFlow` (iOS v4+) / `logShowPaywall` yourself. Two second-order causes in `results-and-metrics`: views update periodically rather than in real time, and every metric except views is attributed to the product, not the flow. |
| "can't change a running test", "need to fix the weights mid-flight" | `run_stop_ab_tests`. Only drafts are editable. **Modify** duplicates the test under the same name and stops the original — so the data splits into two entries in analytics, which is usually the real cost the ticket is about. |
| "restart the test", "undo the stop", "we stopped it by accident" | `run_stop_ab_tests`. Stopping is irreversible; there is no restart. |
| "what do users see now that the test ended" | `run_stop_ab_tests` — three explicit choices at stop time; the "don't show any specific" option hands the placement back to audience priority. |
| "user is stuck on the old variant", "can we reassign this user", "still seeing the test after we stopped it" | `ab-test-types`, crossplacement stickiness. The first placement the user hits fixes the assignment, it cannot be changed, and it persists 90 days *even after the test stops* — tunable in General settings as Cross-placement variation stickiness. |
| "test isn't reaching our users", "only new installs are in it", "some users skip the test entirely" | `ab-test-types`. Crossplacement admits **new users only** (`getPaywall` never called for them) and outranks regular tests; regular tests are the option for existing users. Users on older SDKs skip tests silently — crossplacement needs v3.5.0+, flows v4.0.0+, onboardings v3.8.0+. |
| "same prices across onboarding and settings", "keep the variant consistent app-wide" | `ab-test-types`, crossplacement — but paywall placements only; it cannot include flow or onboarding placements. |
| "two tests fight over one placement", "which test wins", "can we set test priority" | `ab-test-types`. Priority is assigned automatically by the order tests were added and cannot be set by hand; narrower audiences outrank All Users. |
| "our crossplacement test shows up as several tests in analytics" | `ab-test-types` — expected: one `<test-name> child-N` per placement, numbered in placement order. Filter by Placement. |
| "more than two variants", "test suddenly became crossplacement" | `run_stop_ab_tests`. In the Variants table rows are variants (up to 20) and columns are placements — adding a second *column* silently converts the test to crossplacement, paywalls only. |
| "ARPU / completion rate missing from our test" | `results-and-metrics`. ARPU, completions, and unique completion rate are onboarding-test-only metrics. |

## Gaps and misses

