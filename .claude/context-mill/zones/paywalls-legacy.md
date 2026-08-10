---
zone: paywalls-legacy
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The pre-Flow-Builder paywall system: creating a paywall as a remotely-configured set of products, customizing its content with remote config (not a visual builder), the legacy web paywall feature, paywall metrics, and paywall lifecycle actions (duplicate, archive, restore, migrate between apps). This is the older, still-supported paywall model that predates Flow Builder's visual, natively-rendering flows — Adapty confirms these articles are legacy by checking they only appear under the "Paywalls" sidebar category, not "Flows (Beta)". Readers are marketers managing paywalls created before Flow Builder existed, or developers rendering a remote-config paywall's content manually in their own UI.

## Surfaces

## Sources of truth

## What we document, what we don't

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

