---
zone: getting-started
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The tutorial-side entry and orientation material: what Adapty is, whether it fits a given use case,
the five-step quickstart tour (connect a store/payment platform, add products, add a paywall, integrate
the SDK, test the integration), sample apps, SDK installation as a concept rather than per-platform
code, and the "what's new" changelog. A reader lands here before they know which product area they
actually need — every article's job is to explain the ecosystem and route onward, not to teach one
feature in depth. Audience is developers and marketers evaluating Adapty or taking their very first
steps with it, not yet doing platform-specific SDK or dashboard work.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-ecosystem | — | dev, marketer | 18 | tutorial |
| installation-of-adapty-sdks | — | dev, marketer | 0 | tutorial |
| integrate-payments | — | dev, marketer | 2 | tutorial |
| is-adapty-right-for-me | — | dev, marketer | 9 | tutorial |
| quickstart | entry | dev, marketer | 0 | tutorial |
| quickstart-paywalls | — | dev, marketer | 7 | tutorial |
| quickstart-products | — | dev, marketer | 2 | tutorial |
| quickstart-sdk | — | dev, marketer | 3 | tutorial |
| quickstart-test | — | dev, marketer | 7 | tutorial |
| sample-apps | — | dev, marketer | 2 | tutorial |
| what-is-adapty | entry | dev, marketer | 0 | tutorial |
| whats-new | — | dev, marketer | 8 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`sdk-quickstart`** — is the ticket about product-level orientation/routing (what to do first, which
  article to read next) or about actual per-platform SDK code (install, initialize, fetch a flow)?
  Orientation and the "next step" tour stay here; the code itself is `sdk-quickstart`.
- **`migration-from-competitors`** — is the reader deciding in general whether/how Adapty fits their case
  (`is-adapty-right-for-me`), or specifically moving off a named competing platform (RevenueCat,
  Superwall)? General fit-check is here; named-competitor cutover is `migration-from-competitors`.
- **`testing-and-release`** — is the task about the quickstart's own light "test your integration" step
  (`quickstart-test`, one of the five tour steps) or the deeper sandbox-purchase/store-review testing
  workflow? The deep workflow is `testing-and-release`; the quick-check step stays here.
- **`apple-platform` / `google-platform` / `web-payments`** — `integrate-payments` is a router/index into
  store setup here; the actual store-connection instructions live in those three zones.

## Ticket language

This is a flat zone, so rows name specific articles. Most articles here are entry or routing pages
whose obvious phrasings just restate their titles; those are left out deliberately. What is kept is
the routing a newcomer gets wrong. Corpus-wide synonyms (flow ↔ Paywall Builder, paywall ↔ flow in
v4, access level ↔ entitlement) live in `aliases.md` and are not repeated here. Per-platform SDK
setup is `sdk-quickstart`'s table, not this one.

| How a ticket says it | Where it actually lives |
|---|---|
| "should we use Adapty for X", "we already sell on the web and are adding an app", "we want to keep our own billing code" | `is-adapty-right-for-me` — organized by scenario rather than by feature, and every section ends in a link out instead of instructions. Incremental adoption via observer mode and historical-data import are both named here. A cutover from a *named* competitor is `migration-from-competitors`. |
| "list everything Adapty does", "do we still need an MMP or a separate email platform", "what is Adapty Finance" | `adapty-ecosystem` — the only product-by-product map (Core, Ads Manager, Attribution, Mail) and the only article that mentions Adapty Finance at all. It answers *what exists*; `is-adapty-right-for-me` answers *what fits*. |
| "how much does it cost", "what are the plan limits", "which features are paid" | Nothing in the corpus documents this. The nearest mention is the Subscription & Billing section in `app-and-account-settings`, which only links out to adapty.io/pricing. Treat a pricing or quota ask as a content gap, not a routing question. |
| "where do I start", "onboarding checklist", "add a step to getting started" | `quickstart` — a five-link index with no headings of its own. Content edits nearly always belong in the step article (`integrate-payments`, `quickstart-products`, `quickstart-paywalls`, `quickstart-sdk`, `quickstart-test`); only the ordering and the framing live here. |
| "the SDK quickstart is wrong", "fix the SDK integration guide" | Ambiguous by design. `quickstart-sdk` is only a router to the seven per-platform SDK overview pages and holds nothing platform-specific. Any actual code, key, or activation detail is `sdk-quickstart`. |
| "the paywall quickstart", "quickstart-paywalls" | **Two different articles carry that name.** `quickstart-paywalls` in this zone is the dashboard step: build a flow or paywall, then attach it to a placement. `sdk-quickstart` has a per-platform family of the same name (`ios-quickstart-paywalls` and siblings) that is app code. Confirm which before editing. |
| "which paywall option should we use", "is the Paywall Builder still supported", "can we use flows on Unity" | `quickstart-paywalls` — three tabs: Flow Builder (recommended), manual paywall, legacy Paywall Builder (still functional, but frozen: no new features). The platform caveat does the routing work — Flow Builder covers iOS, Android, React Native, Flutter, and Capacitor on SDK v4+ only, so a Unity or KMP ticket cannot take the recommended path. The *code-path* version of the same question (builder vs manual vs observer mode) is `sdk-quickstart`'s row, not this one. |
| "change the paywall without an app release", "what actually has to be hardcoded in the app" | `quickstart-paywalls` — the placement ID, and nothing else. This is the sentence people quote when arguing about release cadence, and it appears once per tab, so rewording it is three edits in one file. |
| "product doesn't reach the device", "trial missing on Google Play", "first product stuck in review", "consumable didn't grant access" | `quickstart-products` carries the creation-time traps: pushing products to the stores needs the App Store Connect API key; the *first* App Store product must be submitted for review by hand; Google Play intro offers never sync automatically, because Google models them as base-plan offers; consumables do not affect access levels. Anything past the first product — offers, price edits, the Google Play offers article — is `products-and-offers`. |
| "connect a store", "add Stripe or Paddle", "we sell through our own store" | `integrate-payments` is a link-only index; the actual steps are in `apple-platform`, `google-platform`, and `web-payments`. Custom stores are the trap, and the warning is buried in `quickstart-products` instead: Adapty tracks transactions automatically only for App Store, Google Play, and Stripe, so a custom store has to post them through `server-side-api`. |
| "test purchase never showed up in the dashboard", "how do we know the integration works" | `quickstart-test` — the check is the Event Feed; if the purchase is not there, Adapty never saw it. Two store-specific facts live only here: Stripe test-mode transactions arrive as **Sandbox**, Paddle test-environment transactions as **Test**. Sandbox account setup and the release checklist are `testing-and-release`. |
| "sample app", "reference implementation", "the GitHub example link is dead" | `sample-apps` is the canonical list — it alone carries the Capacitor React/Vue/Angular variants. But `installation-of-adapty-sdks` and `quickstart-sdk` each repeat a subset of the same GitHub links, so a link change is three edits, and the three lists already disagree. |
| "integrate with Cursor or Claude", "Copy for LLM", "llms.txt", "install the skill" | `agent-tooling`. Three articles here — `is-adapty-right-for-me`, `adapty-ecosystem`, `installation-of-adapty-sdks` — pitch the AI-assisted path and link it; none of them own it. A change to the tooling means updating the pitch in this zone *and* the instructions in that one. |
| "what shipped in \<month\>", "release notes", "write up this month's updates" | `whats-new` — the only article in this zone outside `src/content/docs/version-3.0/` (it lives in `src/content/docs/release-notes/`). Monthly sections mix dashboard, SDK, and docs changes. There is no per-SDK changelog article: an SDK version gets one bullet that links its migration guide in `sdk-migrations`. Adding a month has a dedicated skill (update-whats-new), so match the established format rather than inventing one. |
| "docs homepage", "change the landing page copy" | `what-is-adapty` is the docs root — its slug is the site root, and the body is the Homepage React component plus SkillPromo, with only three short paragraphs of MDX below them. Landing-page copy is a component edit under `src/components/`, not an article edit. |

## Gaps and misses

