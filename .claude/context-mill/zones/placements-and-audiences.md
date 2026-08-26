---
zone: placements-and-audiences
sources: [dashboard-backend, ios-sdk]
reviewed_shape:
reviewed_at:
---

## What this is

The placement system: the hardcoded IDs a mobile app calls that let Adapty remotely decide which flow,
paywall, onboarding, or A/B test is shown — without a new app release — plus audiences, the user
segments a placement can target, and placement-level visibility/performance metrics. This is the wiring
that decides *what shows where, to whom*, sitting between the content itself (a flow, legacy paywall, or
A/B test) and the one ID the app hardcodes.

## Surfaces

## Sources of truth

- **dashboard-backend** — audience matching *and* placement resolution both happen there, in the
  SDK-facing half of the repo (`src/sdk/`), not in any SDK. Read in this order:
  `profile_context/domains/aggregates/profile_segment_filter_collection.py` (a profile's segment
  membership is computed per request — every segment's filters, ANDed, against the profile aggregate
  just read; no membership table exists),
  `profile_context/domains/aggregates/profile_segment_id_collection.py` (that membership is hashed,
  xxh64 over the sorted segment ids), then
  `in_app_context/repositories/flow_variation_repository/select_flow_variations.sql` — the single
  query that turns those segment ids into the one winning audience per placement. Verified on
  `origin/develop` at `0cadcfffa2`. The placement itself is resolved by `developer_id`, the immutable
  ID the app hardcodes (`in_app_context/repositories/placement_repository.py`).
- **A profile is evaluated against audiences at fetch time, on every fetch, and the result is never
  stored per profile.** The segment hash the SDK sends is a staleness check, not the input: all three
  variation apps recompute membership and reject a mismatch —
  `in_app_context/applications/flow_variation_app.py:82` (also `variation_app.py:178`,
  `onboarding_variation_app.py:100`) raises `IncorrectSegmentHashError`, HTTP 400,
  `INCORRECT_SEGMENT_HASH_ERROR`. The hash itself is recomputed on every profile read, too
  (`profile_context/applications/profile.py:361`, comment `Getting of dynamic segment hash`), so a
  changed custom attribute produces a new hash on the next profile response. What makes a dashboard
  change *look* delayed is therefore caching, never stickiness: the variations response carries
  `Cache-Control: public, max-age=1200` (`common/domains/constants/headers.py:103`) and the CDN key is
  an md5 the SDK builds from builder version + segment hash + store + cross-placement eligibility
  (**ios-sdk**, `Sources/Backend/Main+Backend/Requests/FetchPlacementVariationsRequest.swift`), on top
  of the SDK's own cache.
- **Priority is enforced in two places, and it is a check order rather than a stored assignment.** At
  read time `select_flow_variations.sql:46-58` takes `distinct on (placement_id)` ordered by
  `pa.priority asc` — #1, the lowest number, wins, and a qualifying user is legitimately bypassed into
  a higher one. At write time
  `portal/in_app_context/infrastructure/repositories/placement/placement_audience_repository/placement_audience_repository.py:122`
  (`_reorder_placement_audiences_by_type`) renumbers a placement's audiences to a dense `0..n` ordered
  by `audience__is_default, priority` — that, not a convention, is what pins "All users" last, and it
  runs per `audience_version_type` separately. The cross-placement rule is the `case` sorted above
  `pa.priority` (`cross_flow_child` 0 < `regular_flow` 1 < everything else 2) and applies only when the
  request declares cross-placement eligibility; without it those rows are filtered out of the candidate
  set entirely.
- **Nothing is sticky at the audience level; stickiness lives one level down and is computed on the
  device.** The variant a profile draws inside an audience is
  `md5("<placement_audience_version_id>-<profile_id>") % 100` walked against the weight-sorted
  variations (**ios-sdk**, `Sources/Placements/Entities/AdaptyPlacement.Variation.swift:48`). So it is
  stable while that audience keeps the same assigned content and re-draws for everyone when the content
  is replaced, because that mints a new `placement_audience_version_id`. The server-side stickiness row
  is written once per (profile, `placement_audience_version_id`) and never updated
  (`in_app_context/repositories/profile_variation_stickiness_repository/insert_stickiness.sql` —
  `NOT EXISTS` plus `ON CONFLICT DO NOTHING`); it feeds cross-placement A/B tests and analytics, not the
  regular draw. Cross-placement stickiness has its own expiry
  (`cross_placement_stickiness_duration_days`, default 90, in `select_stickiness_variations.sql`) and
  belongs to `ab-tests`.
- **The downloadable fallback file spans dashboard and SDK, so cite both ends.** Generation is a portal
  endpoint taking `platform` plus `sdk_version` from a fixed enum
  (`portal/in_app_context/infrastructure/ports/http/fallback_variations.py`), branching in
  `portal/in_app_context/applications/fallback_variation_app.py` on
  `sdk_version.meta_version >= SDK_META_VERSION_WITH_FLOWS`, and assembled in
  `portal/in_app_context/domains/value_objects/fallback_variation_collection.py`, which stamps
  `version=10` (line 185) plus `developer_ids` and a `ui_builder` map. The SDK end is the contract to
  match: **ios-sdk** `Sources/Versions.swift:13` sets `fallbackFormatVersion = 10` and
  `Sources/Placements/Entities/FallbackPlacements.swift:119` hard-fails a mismatch with either "download
  a new one" or "update the AdaptySDK". Do **not** read
  `Sources/Placements/adapty.fallback.schema.yaml` as the contract — it is not machine-checked (it
  carries a YAML syntax error and names `developer_id` where both the backend and the SDK's own decoder
  use `developer_ids`).
- **Two different things are called "fallback", and only one is this zone's download.** Besides the
  bundle above, the SDK fetches a hosted `.../flow/variations/<placement_id>/app_store/fallback.json`
  from a separate fallback host when the main backend is unreachable (**ios-sdk**,
  `Sources/Backend/Fallback+Backend/Requests/FetchFallbackPlacementVariationsRequest.swift:131`). That
  path sends no segment hash, so it cannot be audience-targeted. The bundle is the one
  `delete-placement`'s danger note is about; the file format is `flow-logic`'s. Establish which one a
  ticket means before answering.
- **A placement ID is unique per app, not per type, and the type itself is frozen at creation.** Verified
  2026-08-26 on **dashboard-backend** `origin/develop` @ `79b61067e8`:
  `portal/in_app_context/infrastructure/models/placement.py` declares
  `UniqueConstraint(fields=('app','developer_id'), name='in_apps_app_developer_id_unique',
  condition=Q(is_deleted=False))` — no `type` in the constraint — and
  `portal/in_app_context/applications/placement/placement_app.py:98` gates creation on
  `repo.exists(app_id, developer_id)`, which filters on `app_id` + `developer_id` + `is_deleted=False`
  only (`placement_repository.py:196`), raising `PlacementWithDeveloperIdAlreadyExist`. So a new flow
  placement cannot take the ID of a live paywall or onboarding placement, and
  `PlacementTypeCanNotBeChanged` / `PlacementDeveloperIdCanNotBeChanged` in
  `domains/exceptions/placement.py` close the two workarounds a reader reaches for next. Two nuances the
  articles deliberately don't state: the constraint is partial on `is_deleted=False`, so deleting a
  placement does release its ID (never advise this — `delete-placement`'s danger note applies), and the
  uniqueness is on `developer_id`, **not** on `title`, which carries no unique constraint at all. Tickets
  that say "can't reuse the placement *name*" mean the ID.
- **Claim classes that must never be inferred from a neighbouring article in this zone:** which audience
  a user gets and why (read the SQL); what a segment filter can express (`subscribers-and-profiles`);
  how long a dashboard change takes to reach a device (two cache layers, both cited above); what the
  fallback bundle contains for a given SDK version (the `sdk_version` branch, and the enum limits which
  versions are offered at all); and every metric definition in `placement-metrics`, which is
  ClickHouse-backed —
  `portal/analytics_context/domain/value_objects/metrics/in_app_metrics/placement_metrics/placement_detail_metrics/placement_detail_audience_based_metrics.py`
  — and must never be copied from an `ab-tests` results article.
- TODO(owner): the flow branch of the generator builds paywall-derived plus native flow variations only
  (`sdk/in_app_context/applications/flow_variation_app.py`, `get_fallback_list`), and nothing in that
  path adds onboarding placements, while the pre-4.0 branch explicitly does (`is_onboarding=True`).
  `placements` tells readers the download covers flows, paywalls "or onboardings". Unsettled here:
  whether an SDK 4.0 bundle carries onboarding placements by some other route. Read that branch before
  restating the sentence in either direction — do not delete it on the strength of this note alone.

## What we document, what we don't

Delta from `scope.md` only.

- **Mechanics yes, targeting strategy almost never.** `choose-meaningful-placements` is the single
  article licensed to be opinionated (cap at ~5, weight the onboarding journey), and that licence does
  not extend to the other nine: everywhere else we document what the system does when a marketer has
  already decided, not what they should target. Advice about which filters make a useful segment is
  `subscribers-and-profiles`' to give.
- **Where the line falls, in terms of what actually gets written:**
  - `flow-design` / `flow-logic` — we name the content a placement resolves to and never describe it. A
    change to what a flow *can contain* does not touch this zone; a change to how one is *chosen* does.
  - `ab-tests` — we write that an audience can hold an A/B test, and where priority puts a
    cross-placement one. Weights, results, and cross-placement stickiness duration are written there.
  - `subscribers-and-profiles` — an audience is a segment plus a priority plus assigned content, inside
    a placement. The segment's own definition, and its silent-mismatch traps, are written there and
    linked from here, never restated.
  - SDK zones — we may state the dashboard-side truth established above (evaluated at fetch, priority is
    a check order, "All users" is enforced last). We do not write cache policy, fetch timing, the
    explicit default-audience fetch, or the retry an `INCORRECT_SEGMENT_HASH_ERROR` triggers; those are
    `sdk-flows-manual` / `sdk-best-practices`.
  - What we *do* write, because no screen conveys it: the placement ID is immutable, deleting a
    placement pins released app versions to the local fallback permanently, nothing ships until **Save
    and publish**, and **Edit priority** appears only once a placement holds three audiences.
- **The pure UI walkthroughs, measured against the obvious-affordances rule.** `export-placements` and
  `delete-placement` earn their length: the CSV column list, the per-tab export caveat, the always-empty
  crossplacement column, and the deletion danger note are all things the screen does not say.
  `edit-placement` (197 words) is already at the limit — a five-step click path where only "Save and
  publish" is load-bearing; do not grow it, and route new placement facts to `create-placement`, which
  it already defers to. `add-audience-paywall-ab-test` (157 words) is thinner still: two intro
  paragraphs and then the `AddAudience` reusable, so treat the reusable as the article and edit there.
  Neither should gain screenshots for steps the reader is looking at.
- **`placement-metrics` (1905 words) is the zone's outlier and that is correct** — it is a definitions
  reference, not a walkthrough, and each metric section earns its lines. Its "Metrics controls" / "View
  options" subsections are the part closest to documenting affordances; keep new additions to the
  definitions, not the controls.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| add-audience-paywall-ab-test | — | marketer | 0 | tutorial |
| audience | entry | marketer | 0 | tutorial |
| change-audience-priority | — | marketer | 0 | tutorial |
| choose-meaningful-placements | — | marketer | 0 | tutorial |
| create-placement | — | marketer | 2 | tutorial |
| delete-placement | — | marketer | 0 | tutorial |
| edit-placement | — | marketer | 0 | tutorial |
| export-placements | — | marketer | 0 | tutorial |
| placement-metrics | — | marketer | 3 | tutorial |
| placements | entry | marketer | 1 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`ab-tests`** — is the ticket about attaching/prioritizing which experience a placement shows
  (`add-audience-paywall-ab-test`, `change-audience-priority`, here), or about the mechanics of running
  or reading the results of the A/B test itself (`ab-tests`)?
- **`flow-logic` / `paywalls-legacy` / `onboardings-legacy`** — this zone owns the placement/audience
  wrapper; the content being placed (a flow, a legacy paywall, a legacy onboarding) is documented in its
  own zone.
- **`subscribers-and-profiles`** — "segment" is used in both zones. Is the ticket about an audience
  targeting a placement's variant selection (here), or a CRM/profile segment used for support/lookup
  (`subscribers-and-profiles`' `segments`)?
- **`analytics` / `ab-tests`** — `placement-metrics` covers a placement's own visibility/performance
  numbers. Is the ticket about that, the full analytics chart suite (`analytics`), or an A/B test's
  statistical results (`results-and-metrics` in `ab-tests`)?

## Ticket language

Flat zone — rows name specific articles. Corpus-wide synonyms (flow ↔ Paywall Builder, paywall ↔ flow
in v4, segment vocabulary) live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "wrong audience got the paywall", "user matches the segment but sees the All users flow", "targeting is being ignored" | `change-audience-priority` — but rule out two SDK-side causes first, without re-explaining them: the explicit default-audience fetch (`sdk-flows-manual`) and fetching before `identify`/attribution resolves (`sdk-best-practices`). Dashboard-side, priority is a *check order*, #1 first, so a user who qualifies for a low-priority audience is legitimately bypassed into a higher one. Two rules override anything the marketer arranged: crossplacement audiences (from crossplacement A/B tests) always outrank regular audiences, and "All users" is always last because it is the fallback. |
| "show a discount only to churned users", "target by country / app version / custom attribute" | `audience` for the wiring and the order of operations — the segment must exist before it can be added to a placement. The filters themselves, and the silent-mismatch traps in them, are not in this zone: that's `segments` in `subscribers-and-profiles`. When an audience matches nobody, the definition is the suspect, not the placement. |
| "where do I reorder audiences", "there's no Edit priority button" | `change-audience-priority` — the button only appears once a placement holds three audiences ("All users" plus two). With fewer, the order is fixed and the UI hides the control rather than showing a no-op. |
| "attach a second paywall to an existing placement", "what is the Run flow button" | `add-audience-paywall-ab-test` (same steps are inlined in `create-placement`). Non-obvious part: "All users" is added to every placement automatically and still needs content assigned, and the button label tracks the placement type. |
| "changed the flow in the dashboard, the app still shows the old one" | `edit-placement` — nothing ships until **Save and publish**; the second suspect is the SDK's cache-first fetch policy (`sdk-flows-manual`), not the placement. |
| "rename the placement ID", "we shipped a typo in the placement ID" | `create-placement`. The ID is immutable by design; only the display name is editable. A wrong ID means a new placement plus an app release, so say that instead of hunting for an edit control. |
| "one placement for the onboarding and its paywall", "can't add an onboarding here" | `create-placement`. Placements are typed (Flows / Paywalls / Onboardings tabs) and one placement cannot serve more than one type, because each type is measured with a different metric set. |
| "retire an old paywall slot", "clean up unused placements" | `delete-placement`, and the danger note is the whole answer: deleting a placement a released app still calls pins those users to the local fallback permanently — those versions can never be pointed at a dynamic flow again. Almost always the right action is editing the placement, not deleting it. |
| "audit which audience sees which paywall", "spreadsheet of our whole setup" | `export-placements`. Two things surprise people: each tab exports separately (no single all-types file), and the cross-placement A/B test column is always empty for flow placements because crossplacement tests don't support them. |
| "script our placement setup", "no dashboard clicks / do it from CI" | Split by direction: creating is the Developer CLI, referenced from `create-placement` with the command reference in `agent-tooling`; reading the config back is the server-side API export linked from `export-placements`. |
| "how many placements should we have", "where should the paywall go" | `choose-meaningful-placements` — deliberately opinionated: cap at ~5 or you lose statistical room to run experiments, and weight the onboarding journey because that's where most subscriptions start. |
| "paywall for users with no connection", "where do I download the fallback bundle" | The download button lives on the placements list (`placements`), and the SDK version chosen in the dialog decides whether the bundle contains flows (SDK 4.0+) or paywalls only — one **Fallbacks** download covers both. The file's own format docs are in `flow-logic`; wiring it into the app is `use-fallback-paywalls` in `sdk-flows-display`. |
| "views and unique views don't match", "why is CR lower than unique CR" | `placement-metrics` — same numerator, different denominator (total views vs one view per user). Nothing is double-counted. |
| "compare two paywalls in the same placement", "revenue per segment" | `placement-metrics` — the page has two groupings, paywall-based and audience-based, and only the audience-based view answers "which segment converts". |
| "onboarding completion rate", "ARPU for the onboarding" | `placement-metrics`, but scope it: ARPU, completions, unique completions and unique completion rate are defined for onboarding placements only. |

## Gaps and misses

### Settled 2026-08-12 — this zone's two long-standing open questions are answered

Both were recorded as unresolved by earlier passes, and ten articles still say nothing about either.
Established in `dashboard-backend` and **re-verified on `origin/develop`** (the first pass read the
clone's working tree, which was ~1,989 commits stale; the logic is identical on both, so the answer
holds — see the freshness warning on that source in `sources.md`).

- **When is a profile evaluated against audiences? At every fetch, server-side, and it is never stored.**
  `ProfileSegmentFilterCollection.get_segment_id_collection` ANDs every segment's filters against a
  freshly read profile aggregate. There is no membership table. The segment hash the SDK carries is only
  a staleness check — a mismatch raises `IncorrectSegmentHashError` (400), it does not select anything.
  So an attribute change takes effect on the next fetch, and the lag readers report is **two cache
  layers** — a CDN entry at `max-age=1200` (20 minutes) plus the SDK's own cache — not stickiness.
- **What happens to users already in an audience? At the audience level, nothing is retained.** A
  priority or segment change simply changes which row wins the next `distinct on (placement_id)`.
  Stickiness lives one level down and is client-side: the variant is a deterministic draw over
  `md5("<placement_audience_version_id>-<profile_id>") % 100`, so it holds while that audience keeps the
  same assigned content and re-draws for everyone the moment the content is replaced.

Priority turned out to be enforced **twice** — a read-time `order by pa.priority`, and a write-time
renumbering that sorts by `audience__is_default` first, which is what actually pins "All users" last
rather than a convention anyone has to remember.

**This is documentation-shaped, not brief-shaped.** Every "wrong audience" ticket in the corpus depends
on it and no article contains it. Writing it up is a real content job and needs a decision about where
it belongs — the caching half arguably belongs with the SDK fetch docs.

