---
zone: paywalls-legacy
sources: [dashboard-backend, dashboard-interface, server-side-api-spec]
reviewed_shape:
reviewed_at:
---

## What this is

The pre-Flow-Builder paywall system: creating a paywall as a remotely-configured set of products, customizing its content with remote config (not a visual builder), the legacy web paywall feature, paywall metrics, and paywall lifecycle actions (duplicate, archive, restore, migrate between apps). This is the older, still-supported paywall model that predates Flow Builder's visual, natively-rendering flows — Adapty confirms these articles are legacy by checking they only appear under the "Paywalls" sidebar category, not "Flows (Beta)". Readers are marketers managing paywalls created before Flow Builder existed, or developers rendering a remote-config paywall's content manually in their own UI.

## Surfaces

## Sources of truth

Almost nothing here is a "which repo" question — the repos are the ones in `sources.md`. It is a **which
version line** question, and the answer is a constant in the SDK, never a version number lifted from an
article's prose.

**The generation boundary is three numbers, all readable from code.** Every one of them was read at a
named ref, not inferred:

- **UI schema / builder version** — `AdaptyUISchema.formatVersion` + `builderVersion` in
  `Sources.UIBuilder/Versions.swift`: `"4.4.0"` / `"4_4"` at iOS tag `3.17.3`, `"5.0.0"` / `"5_0"` on
  iOS `origin/master` (4.0.2). This, not a product name, is the legacy-builder ↔ Flow-Builder line, and
  the SDK puts it **on the wire**: `FetchPlacementRequest.swift` sends `builder_version` /
  `builder_config_format_version`, and the path segment itself flips — `/sdk/in-apps/…/paywall/variations/…`
  at 3.17.3 becomes `/sdk/in-apps/…/flow/variations/…` on master. Consequence for this zone: a v3 app
  cannot be served flow content, which is *why* the v3-scoped articles stay correct for their readers.
  Android's mirror is `FORMAT_VERSION_5_0_0 = "5.0.0"` in `adapty-ui/…/internal/utils/consts.kt`.
- **Fallback file format version** — `Adapty.fallbackFormatVersion` in `Sources/Versions.swift`: `9` at
  iOS `3.17.3`, `10` on iOS `origin/master`; Android `CURRENT_FALLBACK_PAYWALL_VERSION = 10` in
  `FallbackVariationRetriever.kt` on `origin/master`. iOS gates on **exact equality**
  (`guard formatVersion == Adapty.fallbackFormatVersion`) and emits one of two messages depending on
  which side is newer — "Download a new one from the Adapty Dashboard" vs "Please update the AdaptySDK."
  So `fallback-paywalls` is the version-9 file and its flow twin is version-10, and "not interchangeable"
  is enforced in *both* directions, which is the sentence to write rather than a bare version note.
  `local-fallback-paywalls` describes the dialog that produces both, so it is not version-scoped.
- **The paywall's own generation flag, dashboard-side** — `PaywallResponse` in
  `src/api-reference/specs/adapty-api.yaml` declares `use_paywall_builder` **and**
  `use_paywall_builder_legacy` as required booleans. That pair, not a filename, is the authoritative
  three-way split (no builder / pre-v3 legacy builder / newer builder) behind `migrate-paywalls`'
  "move it to the newer builder first."

**What v4 did and did not remove.** `AdaptyPaywall` is gone as a public entity on both GA v4 platforms —
iOS `origin/master` has `Sources/Placements/Entities/AdaptyFlow.swift` and `AdaptyFlowPaywall.swift` and
no `AdaptyPaywall` (only `AdaptyPaywallProduct` survives); Android `origin/master` has only
`adapty/src/main/java/com/adapty/models/AdaptyFlow.kt`. But `AdaptyFlow` declares
`public let paywalls: [AdaptyFlowPaywall]`, so products still reach the app through a paywall object —
that is the mechanical basis for `create-paywall` not being superseded. Two renames mark the line and
must not be generalised past it: `logShowPaywall` → `logShowFlow` (present at 3.17.3, absent on master),
while `openWebPaywall` is present unchanged at *both* refs in `Sources/WebPaywall/Adapty+WebPaywall.swift`
— which is why `web-paywall` is current for both generations and `paywall-metrics`' logging sentence is
version-split.

**Claims that must NOT be copied across the two generations.** This zone's standing hazard is a
near-identical title on the flow side; three confirmed traps:

- **Remote config changed shape, not just name.** v3: `AdaptyPaywall.remoteConfig: AdaptyRemoteConfig?`
  — singular, optional. v4: `AdaptyFlow.remoteConfigs: [AdaptyRemoteConfig]` — an array, and it is on the
  *flow*, absent from `AdaptyFlowPaywall` entirely. Any runtime-reading sentence in
  `customize-paywall-with-remote-config` or `add-remote-config-locale` is therefore not portable to the
  flow twin, and the flow twin's is not portable back.
- **Who logs the view depends on the config's format, not on the SDK version.** Both GA platforms keep a
  legacy-format branch inside the v4 renderer and auto-log the view for it: Android
  `ViewConfigurationMapper.kt` sets `isLegacyFormat`, consumed in `FlowReducer.kt` to add a
  `LogShowFlow` effect on `FlowEntered`; iOS `AdaptyUIFlowViewModel.logShowFlow()` guards on
  `viewConfiguration.formatVersion.isLegacyVersion` and logs `"logShowFlow skipped (non-legacy view
  configuration)"` otherwise. So `paywall-metrics`' "you forgot to call it" diagnosis belongs to
  *manually rendered* remote-config paywalls; for a builder-made legacy paywall the SDK does it. Checked
  on iOS and Android only — do not extend to the other five without evidence.
- **No flow endpoint exists on the maintained Server-side API.** `adapty-api.yaml` has `listPaywalls`,
  `getPaywall`, `updatePaywall` and no flow path at all. Never infer an `updateFlow` by analogy, and note
  the reverse: the server-side push route in `customize-paywall-with-remote-config` has no flow
  counterpart to defer to.

**Where the dashboard side of a legacy paywall is defined.** All in `dashboard-interface` at
`origin/master`, and it is *not* one package:

- **The legacy visual builder is `packages/builder` (`@adapty/builder`)** — widgets `BuilderMenuTree`,
  `BuilderPreview`, `TemplateLibrary`, `TestOnDevice`, `BuilderLocalizationsWidget`. The flow-era builder
  is the separate `packages/unified-builder` (`@flows/monorepo`); `sources.md`'s "builder labels live in
  `unified-builder`" rule is a flow-era rule and does not answer a legacy-builder question.
- **The legacy paywall's non-builder surface lives under `apps/web/src/pages/ab-section/`** —
  `paywall-list`, `paywall-form`, `paywall-metric`. That placement inside the A/B subtree is historical,
  not a hint that these topics belong to `ab-tests`. In-code the legacy builder is called `BuilderV3`
  (`paywall-form/ui/BuilderV3/`), and the same form carries `WebPaywallSection` and the
  legacy→flow conversion entry points (`RecreateAsFlowButton`, `MigrateBuilderBanner`), whose logic is
  `packages/paywall-builder-migration` (`convertPaywallToFlow`, `normalizeLegacyPaywall`).
- **The remote-config editor is shared by both generations** — `apps/web/src/features/remoteConfig/`
  (`JSONTable`, `LocalizationTable`, `SelectLocales`, `usePaywallTranslation`, plus a distinct
  `DeprecatedRemoteConfig` rendered by `paywall-form/PaywallPage.tsx`). This is why the two remote-config
  articles legitimately look alike on the dashboard side and diverge only in the SDK — the shared module
  is a fact about the UI, never a licence to share SDK text.
- **Semantics are backend-owned, in `dashboard-backend` at `origin/develop`, `src/portal/in_app_context/`.**
  Paywall **state is derived, never stored**: `get_state_annotation` in
  `infrastructure/repositories/paywall/paywall_repository/paywall_repository.py` computes `ARCHIVED` from
  `is_deleted=True` and `LIVE` from existence in a non-deleted placement audience; the enum in
  `domains/enums/state.py` is `live` / `inactive` / `draft` / `archived`. The rules the articles state are
  exception classes in `domains/exceptions/paywall.py` — `NotDraftPaywallCanNotBeChanged` (the frozen
  -products rule), `PaywallInUseCannotBeRemoved` with `PaywallUsingInValue{placements, ab_tests}` (the two
  archive blockers, confirmed exactly as `archive-paywalls` names them),
  `PaywallMustHaveDefaultRemoteConfigError` and `PaywallShouldNotContainTheSameRemoteConfigsError` (the
  locale rules behind `add-remote-config-locale`), and `PaywallBelongsToFlowError` — a paywall owned by a
  flow cannot be edited through the legacy surface at all, which is the hard edge of this zone's
  applicability.

**Two source gaps to state rather than paper over.** The web paywall editor is **not ours**:
`paywall-form/ui/WebPaywallSection/lib/webPaywallBuilder.ts` SSOs to `app.funnelfox.com/login/adapty`, so
nothing inside that editor — Stripe key fields, hand-typed plans and prices, Publish vs Preview — has a
registered source. Verify it in-product or with the team; never by analogy to the Adapty builder. And on
**Unity and KMP**, flows exist in code on the beta branches only (zero flow symbols on `origin/main` for
either; `AdaptyFlow` / `AdaptyUIFlowPlatformView` present on `origin/release/4.0.0` for both) — so "this
zone is still the live answer there" is a statement about their GA line with an expiry date, not about the
SDK, and it should be re-checked against `platforms.md` before being written into any article.

## What we document, what we don't

Delta from `scope.md` only. The one rule that decides everything else: **this zone is kept alive for the
readers and links it already has, so we correct it and we do not grow it.**

- **For the genuinely superseded articles we write corrections, not content.** Factual fixes, changed
  limits and blockers, and anything that stops being true when a version boundary moves — yes. New
  procedures, new screenshots, expanded conceptual framing, a new `##` section — no. Without this line
  every reader question turns into a rewrite of a generation we are not selling. The superseded set is
  small and named in `Ticket language`; the rest of the roster has no flow-era equivalent and is written
  normally, at full depth, including new content.
- **Never write a version number you got from an article.** `scope.md` already requires evidence for
  per-platform applicability; the zone-specific form is that *version* applicability must trace to a
  constant or to a symbol's presence at a named ref (see `Sources of truth`), because "SDK v3 and earlier"
  in prose is a summary of a number, and the number moves. An article's own version note is not evidence
  for another article's.
- **A repurposed id is frozen.** Some ids here were kept and pointed at new content so old URLs keep
  resolving, and one legacy-looking id now belongs to `flow-design` outright. Editing consequences:
  never rename or delete an id to make it match its content — the id *is* the URL, and the inbound links
  and search results are the entire reason the page still exists; never infer the generation from the id,
  and never "fix" an id that reads wrong; and never give a *new* article an id that reads like a legacy
  one. When a repurposed article's subject has moved on, the fix is to correct the body and cross-link,
  not to move the file.
- **Against `flow-design` / `flow-logic`, the split is by mechanism, and each side writes only its own.**
  Where both generations have a live article on one topic — remote config, per-locale remote config,
  fallbacks, metrics — each documents its own mechanism and links across; neither absorbs the other into
  a single article with version blocks, because those wrap a whole article and not a section. Do not
  reuse a snippet across the two generations even where the wording currently matches: the shared
  dashboard module behind the remote-config editors makes identical text a coincidence, not a contract,
  and the SDK shapes underneath it differ.
- **The only-home articles are written for a reader who may be on either generation.** The lifecycle set
  and the metrics, locale and web-paywall articles have no flow counterpart, so a flow-era reader lands
  here by necessity. They must not be phrased as if the reader is on the old generation, and their
  absence on the flow side is never reported as a gap.
- **We do not document the conversion path from here.** The dashboard has one
  (`RecreateAsFlowButton` / `convertPaywallToFlow`), and the decision to convert belongs to `flow-logic`'s
  `migrate-to-flows`. No article in this zone grows a "and here's how to move to flows" procedure; a
  cross-link is the whole of our obligation.
- **Two things that still do not earn a doc here**, beyond `scope.md`'s list: a legacy-builder design
  procedure — the canvas docs were deliberately removed from navigation, so restoring them is not a fix
  — and a per-generation duplicate of a screenshot set for a dashboard screen both generations share.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-paywall-builder | — | marketer | 0 | tutorial |
| add-remote-config-locale | — | marketer | 5 | tutorial |
| archive-paywalls | — | marketer | 0 | tutorial |
| create-paywall | — | marketer | 2 | tutorial |
| customize-paywall-with-remote-config | — | marketer | 2 | tutorial |
| duplicate-paywalls | — | marketer | 0 | tutorial |
| fallback-paywalls | entry | marketer | 2 | tutorial |
| local-fallback-paywalls | — | marketer | 1 | tutorial |
| migrate-paywalls | migration | marketer | 1 | tutorial |
| paywall-metrics | — | marketer | 3 | tutorial |
| paywalls | entry | marketer | 0 | tutorial |
| restore-paywall | — | marketer | 0 | tutorial |
| web-paywall | entry | marketer | 6 | tutorial |
| web-paywall-configuration | — | marketer | 3 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **flow-design / flow-logic** — is the article about a remote-config paywall (fields, JSON, custom UI) or about a Flow Builder paywall (visual builder canvas, elements, layers, logic)? Judge by content and title, never by id — legacy paywall ids were sometimes reused for Flow Builder content to keep old links alive. Check whether the file is also listed under the "Flows (Beta)" category in `src/data/sidebars/tutorial.json`; if it is, it's probably not legacy (two such files have already been moved out to flow-design for this reason).
- **sdk-flows-manual** — is the ticket about configuring/managing the paywall on the dashboard (paywalls-legacy), or about fetching/rendering its products and taking the purchase in app code (sdk-flows-manual)?
- **web-payments** — is the ticket about the "web paywall" dashboard feature itself (paywalls-legacy), or about integrating an actual payment processor like Stripe/Paddle for web checkout (web-payments)?
- **ab-tests** — is the ticket about the paywall object itself (paywalls-legacy), or about running an A/B test across paywall variants (ab-tests)?
- **products-and-offers** — is it about the paywall container (paywalls-legacy), or about the product/offer being sold inside it (products-and-offers)?

## Ticket language

Corpus-wide synonyms (Flow ↔ Paywall Builder, remote config ↔ custom JSON) live in `aliases.md` and are
deliberately not repeated here. The first two rows exist to catch the most expensive mistake around this
zone — reading a legacy page when the live answer is in `flow-design` / `flow-logic`. The rest are the
opposite case: articles that are the *only* home for their topic, where sending the reader to the flow
zones would be wrong.

| How a ticket says it | Where it actually lives |
|---|---|
| "the visual editor", "drag an element", "edit my paywall screens", "publish the design", "template gallery" | **Not this zone.** Everything about a visual editor is `flow-design` (layout, elements, styles, copy) or `flow-logic` (actions, conditions, save & publish, creating a flow via `paywall-builder-templates`). The legacy builder's step-by-step design docs are no longer in the navigation at all — `adapty-paywall-builder` is a deprecation notice plus per-platform display links, and nothing else here documents a canvas. Also note `add-paywall-locale-in-adapty-paywall-builder`: legacy id, flow-era content, and it lives in `flow-design`. |
| "which generation am I in", "is this article still current", "should I use paywalls or flows" | Decide by sidebar category (**Paywalls** = here, **Flows (Beta)** = flow zones), never by filename — legacy ids were reused for flow content. The decision itself is `flow-logic`'s `migrate-to-flows`. One precision that gets lost: flows require SDK v4 and exist **only** on iOS, Android, React Native, Flutter and Capacitor, so for **Unity and Kotlin Multiplatform this zone plus the legacy builder is still the live answer**, not a fallback. |
| "what is a paywall in Adapty", "remote-managed product list" | `paywalls` — a routing page only (remote config + the SDK purchase methods). The equivalent orientation page for the flow generation is `flow-logic`'s `adapty-flow-builder`. |
| "which products do we sell here", "can't change products on a live paywall", "product order in the SDK", "the trial isn't offered" | `create-paywall`, and **not superseded**: the paywall object is still how products reach the app, and in SDK v4 `getFlow` reads from paywall placements too, so a flow rollout doesn't retire it. Three constraints do the work: products are frozen once the paywall is Live (so metrics stay comparable), list order is preserved in the SDK, and an offer that isn't attached to the product *here* is simply unavailable in the app. |
| "small edit to a paywall that's already live", "don't break my analytics", "swap the live paywall" | `duplicate-paywalls` — the documented way to change a Live paywall at all, given the frozen-products rule above. **Create and replace original** puts the copies Live immediately across every placement; the alternative leaves them as Drafts. It's also step 1 of the web-paywall setup. |
| "hide unused paywalls", "can't archive this one", "the paywall vanished from the list", "bring it back" | `archive-paywalls` for hiding, `restore-paywall` for the reverse (**State** filter → **Archived** → **Back to active**). Two blockers explain nearly every "won't archive": the paywall is Live in at least one placement, or it's used in an A/B test that isn't archived yet (its metrics would lose their subject). There is no flow-side counterpart article — for flows, *Archived* is just a status meaning deleted (`flow-logic`'s `builder-save-publish`). |
| "reuse a paywall design in our other app", "copy the paywall to another project", "fonts look wrong after copying" | `migrate-paywalls`, also with no flow equivalent. What travels is only the *builder* configuration — layout, media, localization; products and remote config do not come along, and a paywall still on the pre-v3 legacy builder has to be moved to the newer builder before it can be copied. Custom fonts need a device check afterwards. |
| "change copy without an app release", "hard-paywall flag", "server-driven titles and images", "table view vs JSON view" | `customize-paywall-with-remote-config` for classic paywalls; the twin for builder-made flows is `flow-logic`'s `customize-flow-with-remote-config` — pick by which generation made the thing, since both are current. The two views are the same data (Table just adds a context menu). Values can also be pushed programmatically via the server-side API's `updatePaywall`; *reading* them at runtime (`remoteConfig` / `remoteConfigString` on `AdaptyPaywall`) is `sdk-flows-manual`. |
| "translate our custom paywall", "send strings to translators", "AI translate", "import failed", "one locale overwrote the others" | `add-remote-config-locale` — the only home for localizing a remote-config paywall, and the mechanism is different from the flow side: export/import is **one `.json` per locale and the filename must equal the locale code** or the import is rejected (flow text localization is a `.tsv` export instead — `flow-design`). The "copy this value to all locales" menu overwrites non-English edits, which is how locales silently lose work. Per-locale remote config for flows is `flow-design`'s `add-flow-remote-config-locale`. |
| "paywall won't load offline", "offline users only see English", "fallback file rejected after the SDK upgrade" | `fallback-paywalls`, scoped to **SDK v3 and earlier** — the file formats are not interchangeable, and the English-only limit is v3-specific (v4's bundle carries every locale). The v4 article is `flow-logic`'s `fallback-flows`. The other limits hold in both generations: one variation per placement (highest weight / widest audience), no A/B tests, no remote updates. |
| "where do I download the fallback file", "which SDK version do I pick", "which variation ends up in it" | `local-fallback-paywalls`. Same **Placements → Fallbacks** dialog for both generations — the SDK-version dropdown alone decides whether the bundle contains flows, and paywalls and onboardings share one file per platform. Wiring the file into app code is `sdk-flows-display`'s fallback family. |
| "avoid the 30% store commission", "external payment", "pay in the browser and come back" | `web-paywall` — **current, not legacy**, despite sitting in this zone: it documents both the Flow Builder path (a button with a **Purchase** action switched to the **Web payment** tab) and the SDK `openWebPaywall` path. The geography is the load-bearing detail: the App Store permits external payment only in the USA and Japan, so the docs route the reader to a duplicated paywall behind a segment, while Android has no country restriction. |
| "connect Stripe to the web page", "Apple Pay domain verification", "prices wrong on the web checkout", "preview link vs real link" | `web-paywall-configuration`. Four things account for most tickets: the editor is FunnelFox, not the Adapty builder; Stripe needs **Test Mode** keys even though the UI says Sandbox; plans and prices on the web page are typed in by hand and never pulled from Adapty products (though the product must still exist in Adapty for the purchase to resolve); and only **Publish** yields the production `paywalls-….fnlfx.com` link — **Preview** is sandbox-only. Connecting Stripe or Paddle as an Adapty *store* is `web-payments`. |
| "paywall conversion looks wrong", "views aren't counted", "ARPPU / refund rate definition", "grouped by placement or by audience" | `paywall-metrics` — the only home for classic paywall metrics, and not a duplicate of the flow one. Missing views are almost always a missing `.logShowPaywall()` (`.logShowFlow()` on iOS SDK v4+) call, not a reporting bug. Same vocabulary, three different pages: flows are `flow-logic`'s `flow-metrics`, placement-level is `placements-and-audiences`' `placement-metrics` — a new revenue field lands in all three. |

## Gaps and misses

