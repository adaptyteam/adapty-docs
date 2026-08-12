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

**This is a thin section on purpose.** Five of the twelve articles make a claim something outside the
docs can check: `quickstart-products`, `quickstart-paywalls` and `quickstart-test` (dashboard labels and
step order), `integrate-payments` (the processor list), `whats-new` (version and release-state bullets).
Three more are checkable only as URL lists (`sample-apps`, `installation-of-adapty-sdks`,
`quickstart-sdk`). The remaining four — `what-is-adapty`, `quickstart`, `is-adapty-right-for-me`,
`adapty-ecosystem` — are positioning and routing prose, and no repo, spec or backend module can say
whether they are right. Don't hunt for provenance there, and don't file its absence as a gap.

- **dashboard-interface** — the dashboard labels and control names in the three quickstart step
  articles. Confirmed against `origin/master` (2026-08-12): `quickstart-products`' two options are
  verbatim strings in `apps/web/src/features/productForm/ProductSidebar.tsx`, and `quickstart-paywalls`'
  **Save & publish** is in `apps/web/src/pages/placements/placement-form/PlacementPage.tsx`.
  **Composed labels will not grep literally** — "Run flow" / "Run paywall" returns zero hits because the
  UI builds it as `Run {contentLabelCap}` in that same directory. An empty grep here is not evidence a
  label is wrong; find the template before concluding anything.
- **dashboard-backend** — the set of stores and payment platforms `integrate-payments` routes to. The
  `Store` enum on `origin/develop` (`src/sdk/in_app_context/constants.py`) is exactly
  `app_store`/`play_store`/`stripe`/`paddle`, matching the article's four named entries; "other stores"
  has no enum member because a custom store is created by the user, not shipped as a choice. Read the
  ref, never the working tree — see that source's entry in `sources.md`.
- **The seven SDK repos, each at its `sources.md` `default_ref`** — the only check on the sample-app
  URLs. All 13 paths in `sample-apps` resolve today (iOS/Android/Flutter/RN/Capacitor on `origin/master`,
  Unity/KMP on `origin/main`). The same links exist in three articles here in three different shapes, so
  the "source" is per-article: `quickstart-sdk` points at RN's `examples/` directory rather than the four
  named examples, and `installation-of-adapty-sdks` points at Capacitor's `examples/` rather than the
  four named ones. Nothing keeps the three in step.
- **`platforms.md` plus the SDK tags behind it** — `whats-new`'s release-state wording. This is the one
  place in the zone where a bullet ages into being wrong: the July 2026 entry says React Native,
  Flutter and Capacitor "reached general availability", and RN (`v4.0.2`) and Flutter (`4.0.3`) confirm,
  but Capacitor's newest tag on the local clone's `origin/master` is the prerelease `v4.0.1-beta.1`,
  with `package.json` reading the same. **Could not confirm either way whether that is stale text or a
  stale clone** — the clone's newest `origin/master` commit is 2026-08-04 and nothing was fetched for
  this pass. Re-establish from the repo before repeating or "correcting" a GA claim.
- **Some of this zone's truth is our own other docs, because these pages summarise what deeper zones
  own.** `quickstart-test`'s two store-specific facts are one-line restatements of the Stripe and Paddle
  articles in `web-payments` (Stripe test mode → Sandbox; Paddle Test environment → Test).
  `quickstart-paywalls`' Flow Builder platform caveat is the same sentence as the deep Flow Builder and
  migrate-to-flows articles — four copies corpus-wide, agreeing today. `adapty-ecosystem` and
  `is-adapty-right-for-me` are almost entirely this kind of summary. **The implication is the load-bearing
  part: a change in the deep zone silently invalidates the summary here, and nothing detects it.** Link
  checking verifies that the target exists, never that the sentence around the link is still true. So a
  deep-zone task is not finished until this zone has been grepped for the fact it just changed.
- **`what-is-adapty` is the docs root and its body is a React component, not prose.** Its frontmatter
  sets `customSlug: /`, and the file is an import of `src/components/Homepage.tsx` (536 lines) plus
  `<SkillPromo />`, with five lines of MDX prose after them. Landing-page copy is therefore a component
  edit: `Homepage` is deliberately *not* in the shared map in `src/components/mdxComponents.ts` — the
  English article imports it directly while the locale route registers its own wrapped copy — and the
  component carries an internal `T` translation table, so a copy change touches both routes and the
  table, not one article file. Treat any "change the homepage wording" ticket as frontend work.
- **Pricing and plan limits have no source here because they are not documented.** Re-tested 2026-08-12
  across `src/content/docs`: `adapty.io/pricing` appears exactly once (the Subscription & Billing section
  owned by `app-and-account-settings`), and every other plan/quota/limit hit is about a third party —
  Google Play API quota, OneSignal's Free plan, Stripe pricing plans, Android prepaid plans. Two
  incidental exceptions the earlier pass missed: the legacy server-side-API-specs article twice says
  imported transactions count toward MTR, which is a billing statement. So the accurate phrasing is
  "plan tiers and limits are undocumented; MTR is mentioned only in passing in a legacy article", not
  "nothing in the corpus mentions billing".

## What we document, what we don't

Delta from `scope.md`. These are entry pages, and their failure mode is not omission — it is quietly
becoming a second copy of the deep article.

- **A fact earns a place here only if the reader needs it to pick the next page.** Everything else is a
  link. The zone is visibly inconsistent about this already: `integrate-payments` is twelve lines of
  links, while `quickstart-products` next to it walks the whole product form field by field, down to
  Google Play base-plan IDs and where to find a Stripe price ID — content the products zone owns. When
  extending an article here, match `integrate-payments`, not `quickstart-products`.
- **The one thing worth keeping in place is a first-integration gate:** a precondition that only bites
  on the very first pass and that a reader following the tour would hit before ever opening the deep
  article. The App Store Connect API key, the first App Store product needing manual review, Google Play
  intro offers not syncing, consumables not affecting access levels, custom stores needing the
  Server-side API, "publish the flow or it can't be placed" — these stay. They are gate conditions, not
  feature documentation, and that is the test to apply to a new one.
- **Summaries of other zones are one sentence plus a link, and never explain a mechanism.** State that
  a product or feature exists and what it is for; do not restate how renewals retry, how attribution is
  matched, how predictions are computed, or what a field contains. Mechanism sentences here cannot be
  kept true (see *Sources of truth*), and a reader who needs the mechanism is one click away.
- **Evaluation content is scenario routing, not a sales case.** "Which of these situations are you in,
  and where does that lead" is in scope — that is the whole shape of `is-adapty-right-for-me`, and every
  section ending in a link out is the pattern, not an accident. Out of scope: feature-by-feature
  comparison with named competitors (a cutover is `migration-from-competitors`; the comparison itself is
  marketing's, not ours), benchmark or lift numbers presented as what the reader will get, roadmap, and
  plan tiers or quotas. **Never promise a date or a commitment.** The zone's only forward-looking
  sentence is "Support for other platforms is coming soon", and it is deliberately dateless; keep new
  ones that way or leave them out. Pricing questions get the outbound link, not a table.
- **Against `sdk-quickstart`, the line is about what gets written, not about which reader arrives.**
  Nothing in this zone contains an SDK symbol, a code block, a version requirement, or a toolchain
  detail. `quickstart-sdk` holds zero platform-specific content on purpose — it is a router to the seven
  overview pages — and a ticket that would add a snippet, a minimum OS version, or an installation flag
  to it is a `sdk-quickstart` ticket that landed on the wrong article. What this zone does own is the
  **dashboard-side artifact choice** — flow, manual paywall, or the frozen legacy builder, and the
  platform caveat that decides which of the three a reader can even use. The matching *code-path* choice
  (builder rendering vs. manual UI vs. observer mode) is `sdk-quickstart`'s, per its `Ticket language`.
- **`whats-new` is one bullet per user-visible change plus a link out.** No migration steps inline, no
  per-SDK changelog, nothing a reader cannot observe. Prefer wording that stays true without maintenance:
  name what shipped rather than its release state, since "reached general availability" is exactly the
  kind of claim that goes stale in a file nobody revisits.

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
| "how much does it cost", "what are the plan limits", "which features are paid" | Effectively undocumented — softened 2026-08-12 after a re-test, because the first version said "nothing in the corpus documents this" and that was slightly too strong. What exists: one outbound link, `account.mdx:61` → adapty.io/pricing, plus two passing statements in `server-side-api-specs-legacy` that imported transactions count toward MTR — a billing fact sitting in a legacy article in another zone. No plan, tier, limit or quota is stated anywhere. Still a content gap rather than a routing question, but say "documented only as an outbound link", not "absent". |
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
| "docs homepage", "change the landing page copy" | `what-is-adapty` is the docs root — its slug is the site root, and the body is the Homepage React component plus SkillPromo, with one `####` heading and two short paragraphs of MDX below them. Landing-page copy is a component edit under `src/components/` — and note `Homepage` is registered per-route rather than in the shared `mdxComponents` map, so a change there touches the locale route too. |

## Gaps and misses

