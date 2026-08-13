---
zone: sdk-best-practices
sources: [android-sdk, capacitor-sdk, flutter-sdk, ios-sdk, jscore, rn-sdk, unity-sdk]
reviewed_shape:
reviewed_at:
---

## What this is

The "Best practices" category of each platform SDK: recommended SDK call order during app startup, optimizing paywall fetching (caching/pre-fetching to avoid latency), and showing an Apple-Search-Ads-targeted paywall. It's advisory and optimization content layered on top of the core integration, not a required step — readers land here after the basic integration already works and they're tuning performance, call sequencing, or UX polish.

## Surfaces

## Sources of truth

The articles here are recommendations, so "verify it" splits by claim class. Three classes have a real
ground truth; one has none, and pretending otherwise is how this zone goes wrong.

- **A hard ordering constraint is a property of the platform's activation gate, and you read the gate.**
  iOS (`ios-sdk`, `origin/master`, tag `4.0.2`): `Sources/Adapty+Shared.swift`'s `activatedSDK`, plus
  `profileManager(withProfileId:)` / `createdProfileManager` in `Sources/Adapty.swift`; the codes are in
  `Sources/Errors/AdaptyError.swift` (`notActivated = 2002`, `profileWasChanged = 3006`). Android
  (`android-sdk`, `origin/master`, tag `4.0.1`): the `isActivated` boolean in `adapty/.../com/adapty/Adapty.kt`,
  re-checked at the top of every public method, with `ADAPTY_NOT_INITIALIZED(20)` and
  `PROFILE_WAS_CHANGED(3006)` in `errors/AdaptyErrorCode.kt`. **The two gates do not behave the same, so
  this class cannot be mirrored:** iOS's `activatedSDK` *awaits* an activation already in flight
  (`case let .activating(task): return await task.value`) and throws `notActivated` only when activation
  was never started, while Android's check fails the call immediately. Every article in the family
  currently says a call "before or in parallel with `activate()`" fails — exact for Android, half-true
  for iOS.
- **A version floor is checkable by tag, and for the JS platforms only through the pin.**
  `appliedAttributionSources` is absent from `ios-sdk` tag `3.17.0` and present at `3.17.1`
  (`git grep -c appliedAttributionSources <tag> -- 'Sources/*'`: nothing, then
  `Sources/Profile/Entities/AdaptyProfile.swift`) — the floor the iOS article prints. Flutter's different
  floor is real, not a typo: absent at `flutter-sdk` `3.16.0`, present at `3.17.0`. For React Native and
  Capacitor the printed number is the **wrapper's** tag, derivable only by reading that tag's
  `@adapty/core` pin and then `jscore`: `rn-sdk` `v3.17.0` pins core `3.17.0` (field absent), `v3.17.1`
  pins `3.17.2` (present), and `capacitor-sdk` `v3.17.1` pins the same core. Reading `jscore` alone gives
  `3.17.2` — the wrong number to print in an RN or Capacitor article.
- **The AA family's scope limit ("first launch only") is SDK behaviour, not an assumption.**
  `ios-sdk` `Sources/Profile/Adapty+UpdateASAToken.swift` on `origin/master`: `updateASATokenIfNeed`
  returns early unless `appleSearchAdsSyncDate(for:)` is nil, fetches the token in a detached `Task`,
  posts it, then stamps the sync date — one fetch per profile, delivered back through the ordinary
  profile-response path. The value is `AdaptyAttributionSource(rawValue: "apple_search_ads")`
  (`Sources/Profile/Entities/AdaptyAttributionSource.swift`); `jscore` types it as the bare string and
  makes the array optional (`src/types/index.ts`), which is why the RN and Capacitor snippets use
  `?.includes(...)`.
- **Every number in the timing advice is an unrecorded judgment call.** "1–2 seconds after `activate`",
  "`loadTimeout` 3–5 s", "a 3–5 second timer", "30 s of listening", "usually arrives within a few
  seconds" — none traces to code, a spec, or a ticket. The only adjacent checkable fact is that
  `loadTimeout` defaults to 5 s, stated in `fetch-paywalls-and-products`, so "3–5 s" is a deliberate
  tightening of a documented default. The founding commits carry one-line messages with no ticket or PR
  reference (`15266851c` "SDK initialization order", `1cb17272d` "Guide — Optimize paywall fetching",
  both 2026-05-11), and `sources.md` registers no ticket or support-case source at all. So these numbers
  can be changed by a new judgment but cannot be "corrected against the source" — there is none. The
  same holds for "bulk prefetch blocks the main thread and produces a black screen": a runtime claim with
  no code anchor, and `git grep "DispatchQueue.main\|@MainActor" origin/master -- Sources/Placements` in
  `ios-sdk` returns zero hits, so the fetch path itself never hops to the main thread.
- **There is no canonical copy of a recommendation — each platform's article is authoritative for its own
  platform, and the families were seeded as one template.** All seven `sdk-call-order` articles were
  created in a single commit (`15266851c`) and remain line-for-line identical apart from symbol names,
  launch hooks, listener names, error names and link ids (`diff` the iOS file against each of the other
  six); `optimize-paywall-fetching` likewise (`1cb17272d`). So a difference between two platforms is
  either meaningful or a miss, and the kind of difference tells you which:
  - **A different recommended *pattern* can be deliberate.** The `Ticket language` table records the one
    that is, and it is intentional by structure, not just wording: `ios-show-aa-targeted-paywall` and
    `flutter-show-aa-targeted-paywall` are built around a timeout branch that calls
    `getPaywallForDefaultAudience`, and `react-native-show-aa-targeted-paywall` /
    `capacitor-show-aa-targeted-paywall` have no timeout branch at all.
  - **A difference in *symbol-naming era* is always a miss, and it is mechanically checkable** against
    the platform's `default_ref` in `platforms.md`. As of this pass: iOS GA v4 exposes only
    `getFlow`/`getFlowForDefaultAudience` (no `Adapty.getPaywall(placementId:)` on `origin/master`),
    Android GA v4 the same in `Adapty.kt`, and React Native GA v4 the `get_flow` bridge method with no
    `get_paywall` in `jscore` — yet all three platforms' articles here use v3 names with no v4 note,
    while Flutter, KMP and Capacitor carry an explicit "in SDK v4 `getPaywall` is renamed to `getFlow`"
    line (grep `getFlow\|SDK v4` across the 25 articles: hits only in the `flutter-`, `kmp-` and
    `capacitor-` files). Each note arrived with that platform's own v4 docs pass; iOS's only
    post-founding edit was cosmetic, and the Android and RN v4 passes never opened these files. Unity's
    v3 names are correct — its GA line (`unity-sdk`, `origin/main`, tag `3.17.0`) really does expose
    `GetPaywall`.
  - **A floor and the symbols around it must agree.** `capacitor-show-aa-targeted-paywall` requires
    "Capacitor SDK 3.17.1 or later" but writes `getFlow` throughout, and at the core that
    `capacitor-sdk` `v3.17.1` pins (`jscore` `v3.17.2`) the bridge method is `get_paywall`; `get_flow`
    arrives only in v4, which Capacitor has not released. The symbols were rewritten by the Capacitor v4
    pass without revisiting the floor.
- **Never carry across platforms without re-reading that platform's repo:** the activation/identify
  failure mode, the error name and code, the profile-update mechanism a recommendation hangs off
  (`didLoadLatestProfile`, `setOnProfileUpdatedListener`, `didUpdateProfileStream`, `onLatestProfileLoad`,
  `OnLoadLatestProfile` — five shapes, and Flutter's article additionally has to pair the stream with one
  `getProfile()` because it doesn't replay), the parameter spelling (`loadTimeout` everywhere except
  `loadTimeoutMs` in `jscore`), and the version floor. For the AA family, also whether the platform
  exposes `appliedAttributionSources` on the line the docs target: Unity does on its GA line
  (`AppliedAttributionSources` in `Packages/com.adapty.unity-sdk/Runtime/Models/AdaptyProfile.cs`,
  `origin/main`), KMP only on the unreleased v4 beta
  (`adapty/src/commonMain/kotlin/com/adapty/kmp/models/AdaptyProfile.kt` on `origin/release/4.0.0`;
  absent from `origin/main`).

## What we document, what we don't

Delta from `scope.md` only. This zone writes recommendations, so the scope question is which
recommendations become articles and which stay where the mechanism is documented.

- **A recommendation earns its own article only when the failure it prevents is silent *and* more than
  one existing article would otherwise have to repeat it.** Both hold for the two families that have
  prose: the wrong-audience paywall comes back with no error at all, and a call racing activation on iOS
  is awaited rather than rejected (see *Sources of truth*), so a reader never sees a signal to search on.
  And `sdk-call-order` is linked inbound from three separate places on every platform — all eight install
  articles (`sdk-installation-ios`, `sdk-installation-unity`, and the six others), all seven identify
  articles (`ios-quickstart-identify` and its siblings), and the platform's error-handling article (five
  ids, including `error-handling-on-flutter-react-native-unity`) — which is what extraction is for.
- **A recommendation that concerns exactly one call stays with the call.** The standing advice against
  `getFlowForDefaultAudience` is a `:::warning` inside `fetch-paywalls-and-products` (zone
  `sdk-flows-manual`), stating its two drawbacks next to the method itself. It never became a
  best-practice article, and that is the right shape — copy it.
- **Against `sdk-flows-manual` / `sdk-flows-display`: they own the call, this zone owns the timing around
  it.** An article here may name a method and say when to call it, in what order, and what to do when
  it's slow — never how to call it, what it returns, or what a parameter means. Concretely: this zone
  writes "set `loadTimeout` to 3–5 seconds"; the parameter table, the 5 s default and the per-platform
  spelling stay in the family's `fetch-paywalls-and-products`. Working test: if the sentence would still
  be true with the parameter reference deleted, it belongs here.
- **Against `sdk-quickstart`: that zone writes the path that works, this zone writes only what to do
  differently once it does.** A rule that changes the first integration is a quickstart edit, not a new
  article here — which is why the install and identify articles link *out* to `sdk-call-order` instead of
  restating it.
- **Code here exists to show control flow, not API usage.** Only the four AA articles carry code fences;
  the other 21 articles in the roster have none (fenced blocks counted across all 25). What those examples
  implement is a race, a timeout and a deduplication flag — the API calls inside them are one line each,
  and the platform's own how-to article is what a reader follows to write them.
- **Per-platform applicability, this zone's version of the `scope.md` rule: a recommendation may be
  extended to another platform only after that platform's own SDK is shown to expose the mechanism the
  recommendation hangs off, read at the ref `platforms.md` names for it.** "It ships an iOS target, so
  Apple Ads attribution applies" is exactly the same-toolchain inference `scope.md` forbids, and running
  the check gives two different answers for two platforms that argument would treat alike: Unity exposes
  `AppliedAttributionSources` on its GA line, KMP only on its unreleased v4 beta. Neither result makes
  the absent article a gap — an empty cell isn't one — but they decide what *could* be written and
  against which version.

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| best-practices | ios-best-practices | android-best-practices | react-native-best-practices | flutter-best-practices | unity-best-practices | kmp-best-practices | capacitor-best-practices |
| optimize-paywall-fetching | ios-optimize-paywall-fetching | android-optimize-paywall-fetching | react-native-optimize-paywall-fetching | flutter-optimize-paywall-fetching | unity-optimize-paywall-fetching | kmp-optimize-paywall-fetching | capacitor-optimize-paywall-fetching |
| sdk-call-order | ios-sdk-call-order | android-sdk-call-order | react-native-sdk-call-order | flutter-sdk-call-order | unity-sdk-call-order | kmp-sdk-call-order | capacitor-sdk-call-order |
| show-aa-targeted-paywall | ios-show-aa-targeted-paywall |  | react-native-show-aa-targeted-paywall | flutter-show-aa-targeted-paywall |  |  | capacitor-show-aa-targeted-paywall |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-best-practices | entry | dev | 0 | android |
| android-optimize-paywall-fetching | — | dev | 2 | android |
| android-sdk-call-order | — | dev | 2 | android |
| capacitor-best-practices | entry | dev | 0 | capacitor |
| capacitor-optimize-paywall-fetching | — | dev | 2 | capacitor |
| capacitor-sdk-call-order | — | dev | 2 | capacitor |
| capacitor-show-aa-targeted-paywall | — | dev | 4 | capacitor |
| flutter-best-practices | entry | dev | 0 | flutter |
| flutter-optimize-paywall-fetching | — | dev | 2 | flutter |
| flutter-sdk-call-order | — | dev | 2 | flutter |
| flutter-show-aa-targeted-paywall | — | dev | 4 | flutter |
| ios-best-practices | entry | dev | 0 | ios |
| ios-optimize-paywall-fetching | — | dev | 4 | ios |
| ios-sdk-call-order | — | dev | 2 | ios |
| ios-show-aa-targeted-paywall | — | dev | 4 | ios |
| kmp-best-practices | entry | dev | 0 | kmp |
| kmp-optimize-paywall-fetching | — | dev | 2 | kmp |
| kmp-sdk-call-order | — | dev | 2 | kmp |
| react-native-best-practices | entry | dev | 0 | react-native |
| react-native-optimize-paywall-fetching | — | dev | 2 | react-native |
| react-native-sdk-call-order | — | dev | 2 | react-native |
| react-native-show-aa-targeted-paywall | — | dev | 4 | react-native |
| unity-best-practices | entry | dev | 0 | unity |
| unity-optimize-paywall-fetching | — | dev | 2 | unity |
| unity-sdk-call-order | — | dev | 2 | unity |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **sdk-quickstart** — is the ticket about how to set up the SDK correctly the first time (sdk-quickstart), or about optimizing/sequencing calls after basic integration already works (sdk-best-practices)?
- **sdk-flows-display / sdk-flows-manual** — is this a general best-practice recommendation (sdk-best-practices), or a specific bug/how-to in actually fetching or presenting a paywall (sdk-flows-display/sdk-flows-manual)? "How do I avoid a flash of the wrong paywall" is best-practices; "the paywall didn't fetch" is a display/manual bug.
- **attribution** — is the "targeted paywall" ticket about the SDK-side best practice for showing it (sdk-best-practices), or about setting up the Apple Search Ads attribution data itself (attribution)?

## Ticket language

Rows name a **family**, not a platform article — the roster above expands each one across the
platforms that have it. Corpus-wide synonyms (Adapty Search Ads ↔ Apple Search Ads ↔
`apple_search_ads`, paywall ↔ flow in v4, profile ↔ `getProfile`) live in `aliases.md` and are
deliberately not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "`#2002 notActivated`", "`ADAPTY_NOT_INITIALIZED`", "SDK works only sometimes on launch", "race condition calling Adapty too early" | `sdk-call-order`. Nothing may run before `activate()` resolves — until then the SDK has no state. The error name is the only per-platform difference: Android says `ADAPTY_NOT_INITIALIZED`, KMP just "an activation error", the rest `#2002 notActivated`. |
| "`#3006 profileWasChanged`", "lost premium access after login", "returning user shows as free", "an anonymous profile got created" | `sdk-call-order`, step 4. Calls racing `identify` either fail or land on the anonymous profile created at activation (Android and KMP document only the second outcome, not the `#3006` code). The documented fix isn't ordering the two calls better — it's passing `customerUserId` into `activate()` (path 2a) so no anonymous profile ever exists. |
| "`appsflyer_id` missing from the profile", "attribution/MMP ID not attached", "AppsFlyer + Adjust + Branch + PostHog init order" | `sdk-call-order`, steps 1 and 3. Two constraints, both easy to miss: initialize the MMP and await its UID callback *before* `activate`, then call `setIntegrationIdentifier` before any user-action call. |
| "web purchase not visible in the app", "web2app install not linked", "Stripe/Paddle checkout missing on device" | `sdk-call-order`, the Web2app section — not an integration or webhook bug. The device's first `activate()` makes a fresh anonymous profile with no link to the web one, so the purchase stays invisible until `identify` then `restorePurchases`. |
| "wrong audience paywall returned", "audience segments silently bypassed", "ASA personalization not applied" | `optimize-paywall-fetching` when the cause is timing: `getPaywall` called at launch (`App.init()`, `Application.onCreate()`, `main()`, `Awake()`) resolves before attribution lands, against the default audience, with no error. Rule out two other causes first — an explicit default-audience fetch (`sdk-flows-manual`) and fetching before `identify` resolves (`sdk-call-order`). |
| "black screen on app launch", "app freezes for a second at startup" | `optimize-paywall-fetching`. The documented cause is bulk-prefetching every placement concurrently, which blocks the main thread (JS thread on React Native) during the burst. Fetch only the placement you're about to show. |
| "paywall fetch is slow", "reduce time to first paywall", "blank screen while the paywall loads", "users on rural / transit connections" | `optimize-paywall-fetching`. Cache-first fetch policy after the first fetch, a 3–5 s `loadTimeout` (`loadTimeoutMs` on React Native and Capacitor), a dashboard fallback paywall per placement, and never gating display on `getProfile`. The default-audience fetch is the other speed lever, and it costs targeting: see the corresponding row in `sdk-flows-manual`. |
| "Apple Search Ads paywall shows the wrong offer on first open", "`appliedAttributionSources`", "wait for attribution before showing the paywall" | `show-aa-targeted-paywall`. Scope first: this only ever affects the **first** launch — Apple Ads attribution is stored on the profile permanently, so later launches return the segmented paywall with no wait. Requires SDK 3.17.1+ (Flutter 3.17.0+), and only iOS, React Native, Flutter and Capacitor have this article. |
| "should we delay the paywall, or swap it once attribution lands?" | `show-aa-targeted-paywall` — the recommended pattern deliberately diverges by platform, so don't mirror one platform's article into another's. iOS and Flutter wait for attribution against a timeout and fall back to `getPaywallForDefaultAudience`; React Native and Capacitor show a paywall immediately and refetch when `apple_search_ads` appears. |
| "give us a production-readiness checklist", "recommended integration patterns", "common integration mistakes" | The `best-practices` family, but expect the ticket to need more: those pages are card lists with no prose of their own. The actual content is the three families above, and a checklist-shaped request usually also reaches into `sdk-quickstart` and the platform's error-handling article. |

## Gaps and misses

