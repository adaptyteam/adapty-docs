---
zone: flutterflow
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The Adapty plugin for FlutterFlow, a separate low-code app-building platform — not one of the seven SDK platforms Adapty ships native SDKs for. It covers adding the Adapty library as a FlutterFlow project dependency, wiring up its actions (fetch products, add them to a paywall page the developer designs in FlutterFlow itself, enable purchase, check subscription/access status), and the plugin's action and data-type reference. The plugin explicitly does not support Adapty's own paywall builder (developers must design their paywall in FlutterFlow) or web app compilation. Readers are FlutterFlow users adding subscriptions to their app, not Flutter SDK developers — despite the name overlap, this has nothing to do with the native Flutter SDK.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| ff-action-flow | — | dev | 5 | tutorial |
| ff-add-variables-to-paywalls | — | dev | 3 | tutorial |
| ff-check-subscription-status | — | dev | 0 | tutorial |
| ff-getting-started | — | dev | 4 | tutorial |
| ff-make-purchase | — | dev | 4 | tutorial |
| ff-resources | — | dev | 36 | tutorial |
| flutterflow | — | dev | 0 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **sdk-quickstart / sdk-flows-manual / sdk-onboardings (the seven SDK platform zones)** — is the app built with FlutterFlow's plugin, or with a native SDK (including the native Flutter SDK)? FlutterFlow tickets never belong in an SDK platform zone, even though "Flutter" is in the name — FlutterFlow is a distinct low-code product with its own plugin, documented separately from the Flutter SDK.
- **flow-design / flow-logic** — is the paywall built in FlutterFlow's own page editor (flutterflow), or in Adapty's Flow Builder (flow-design/flow-logic)? The FlutterFlow plugin cannot render Adapty-builder paywalls, so any Flow-Builder-specific question is out of scope here.

## Ticket language

`ff-` in every id below means **FlutterFlow**. The four numbered walkthrough articles run in order —
`ff-action-flow` (Step 1, fetch) → `ff-add-variables-to-paywalls` (Step 2, bind) → `ff-make-purchase`
(Step 3, buy) → `ff-check-subscription-status` (Step 4, gate) — so most routing here is "which
numbered step owns this symptom". `ff-resources` is the action/data-type reference. None of these
route to a native-SDK zone; see Boundaries. Corpus-wide synonyms live in `aliases.md`.

| How a ticket says it | Where it actually lives |
|---|---|
| "Adapty isn't initialized", "SDK key not picked up", "app never appears in the dashboard", "adapty-xtuel0" | `ff-getting-started`. The Public SDK key goes in **two** unrelated places and tickets usually did only one: `AdaptyApiKey` in the library's **View details** pane, and a **Permission** whose iOS *and* Android key is the literal string `AdaptyPublicSdkKey` with the key pasted into **Permission Message**. Third cause: the `activate (Adapty)` action was never added to `main.dart` under **Custom Code**. |
| "web build is blank", "doesn't work on web" | `ff-getting-started` limitations warning — the plugin does not support compiling web apps. Not a bug, and there is no workaround documented. |
| "can I use the paywall I designed in Adapty", "hasViewConfiguration", "builder paywall in FlutterFlow" | Stated as a limitation in both `ff-getting-started` and `ff-action-flow`: the paywall page must be designed in FlutterFlow. `AdaptyPaywall.hasViewConfiguration` does exist in `ff-resources`, which misleads readers — the plugin still can't render it. Builder-side questions belong to `flow-design`/`flow-logic`. |
| "paywall views are 0", "analytics isn't counting the paywall" | `ff-action-flow` Step 1.4. `logShowPaywall` is a **manual** action placed on the conditional's TRUE branch; omit it and views never count. This is the mirror image of the native SDKs, where a builder-rendered flow logs it for you and a manual call *double*-counts (`sdk-flows-display`). |
| "getPaywallResult is empty", "placement not found", "how do I know the fetch worked" | `ff-action-flow` Steps 1.1–1.3. `getPaywall` takes the placement ID (plus optional `locale`), and success is tested with **Has Field** → `value` on `getPaywallResult` — not a null check. |
| "getPaywallProductResult" vs "getPaywallProductsResult" | Same variable, two spellings in the docs: created as `getPaywallProductsResult` in `ff-action-flow` Step 1.2 (and referenced that way by `ff-make-purchase`), but written without the "s" in `ff-action-flow` Step 1.5 and throughout `ff-add-variables-to-paywalls`. Expect either spelling in a ticket; don't treat one as a different object. |
| "price renders as an object", "price isn't formatted", "wrong decimals" | `ff-add-variables-to-paywalls` Step 2.2. The binding chain is `value` → Item at Index First → `price` → `amount` with **Decimal / Automatic**. The already-store-formatted `AdaptyPrice.localizedString` is documented in `ff-resources` but the walkthrough never uses it. |
| "product name is blank on the paywall", "title shows product.title" | `ff-add-variables-to-paywalls` Step 2.1 — the field is `localizedTitle`, bound via **Set from Variable** with **Default Variable Value** null. A text still reading `product.title` in the editor is expected: **UI Builder Display Value** is arbitrary design-time text, not the bound field. |
| "makePurchase arguments", "subscriptionUpdateParameters", "replace/upgrade an Android subscription", "proration mode", "isOfferPersonalized" | `ff-make-purchase` Step 3.1 — the walkthrough attaches an empty `AdaptySubscriptionUpdateParameters` object and says to leave it empty unless replacing an Android subscription. Enum values (`AdaptySubscriptionUpdateReplacementMode`) and the `isOfferPersonalized` argument exist only in `ff-resources`. The argument name differs between the two articles (`subscriptionUpdateParameters` in the walkthrough, `subscriptionUpdateParams` in the reference). |
| "purchase went through but content didn't unlock", "how do I confirm the purchase" | `ff-make-purchase` Steps 3.2–3.3 — a **Has Field** conditional on `makePurchaseResult`, then a **Navigate To** on TRUE. Post-purchase navigation is an action the developer wires by hand; nothing dismisses or advances automatically. |
| "show the error to the user", "error message is empty", "what does this error code mean" | The `error` → `errorMessage` chain, in `ff-action-flow` Step 1.5 (fetch failure) and `ff-make-purchase` Step 3.4 (purchase failure); both then need a **Terminate** action on the FALSE branch or the flow keeps running. Numeric codes are not in this zone — `sdk-errors-events`. |
| "gate premium content", "check if the user is subscribed", "currentProfile is empty/stale" | `ff-check-subscription-status`. It reads the `currentProfile` App State variable (documented in the last table of `ff-resources`: not persisted, "keep it up-to-date") and never calls `getProfile`, so a stale or empty `currentProfile` is the usual cause of a wrong gate. |
| "accessLevels is a list, not a map", "how do I look up the premium level" | `ff-check-subscription-status` Step 6 — **Filter List Items** on `accessLevelIdentifier` **Equal to** the level ID, then Item at Index First → `accessLevel` → `isActive`. FlutterFlow has no map type, so `ff-resources` replaces every Adapty dictionary with a key/value struct (`AdaptyAccessLevelIdentifiers`, `MapKeySubscriptions`, `MapKeyNonSubscriptions`) — this is why the shape differs from the SDK docs. |
| "restore purchases button", "identify / logout the user", "intro offer eligibility", "redeem a promo code" | `ff-resources` only. `restorePurchases`, `identify`, `logout`, `updateProfile`, `getProductsIntroductoryOfferEligibility` and `presentCodeRedemptionSheet` (iOS only) ship as plugin actions but no walkthrough step covers them, so tickets here are documentation gaps rather than plugin bugs. |

## Gaps and misses

