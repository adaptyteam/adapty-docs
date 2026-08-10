---
zone: sdk-migrations
sources: []
reviewed_shape: ecbc934e7292
reviewed_at: 2026-08-10
---

## What this is

The mechanical "what changed and how do I update my code" reference for upgrading an already-integrated
app across a breaking SDK-version boundary, on each of the seven platforms. A guide exists because a
developer's build broke (or will break) after bumping the SDK version — it is not an introduction to a
feature. Every guide is diff-shaped: it shows the old call next to the new one and links out to the live
how-to article for anything beyond "what do I change." It is a companion to the *live* SDK reference
(installation, present-paywalls/flows, handling-events, kids-mode, observer-mode), never a replacement
for it — confirmed by every guide in the roster ending its steps with "For the complete code example,
check out [live article]" rather than restating that article's content.

39 articles: 7 platform hub/index pages (`<platform>-sdk-migration-guides`), one extra Unity page that
duplicates the hub's job (`unity-migration-guide`, see Gaps and misses), and 31 per-version guides.
Guides exist for v3.0, 3.3, 3.4, 3.8, 3.10, 3.12, 3.14, 3.15, 3.16, and 4.0 — never for every platform at
every one of those versions (v3.15 is iOS + KMP only; v3.16 is Capacitor only; v3.10 is Flutter + Android
only) — because a guide follows a **breaking change landing on a specific platform's SDK**, not a shared
version-number timeline. Two platforms can ship the *same* underlying breaking change under two different
version numbers: the observer-class/fallback-method/view-class rename that Flutter shipped at 3.8 is,
almost line-for-line, the same change KMP shipped at 3.15 (compare `flutter-migration-guide-38` and
`migration-to-kmp-315`). Never read a shared version number across platforms as meaning anything.

## Surfaces

- **Hub pages** (7, one per platform, role `entry`, 0 H2s each): a title, one intro sentence, and a
  flat bullet list of "Migrate to vX.Y" links, newest version first. Confirmed identical shape on all
  seven. These are the only "index" pages in the zone — every reader who doesn't arrive via a direct link
  or search lands here first.
- **`unity-migration-guide`**: sits in the Unity sidebar alongside the real hub, also linked as an
  "SDK migration guide" entry, but its content is a generic templated stub, not real guide content — see
  Gaps and misses. Treat it as a legacy artifact, not a second surface to maintain.
- **Per-version guides** (31): one of three forms, scaling with how many breaking changes the version
  introduced. All three forms confirmed present in this corpus:
  - **Single change, zero `##` headings** — `migration-to-ios-315` (one new required Observer-mode
    callback) and `migration-to-capacitor-316` (Capacitor 8 minimum bump) both open with who's affected,
    why it's better, and a `diff` fence; neither restates the how-to it links to.
  - **Several changes, flat list, one `##` per change, imperative heading** — the majority of the
    roster (e.g. `migration-to-android330`, `migration-to-unity-sdk-314`, `flutter-migration-guide-38`,
    `migration-to-kmp-315`). Headings read like instructions: "Update making purchase," "Update fallback
    paywalls method name."
  - **Major, `## Quick reference` first** — all six v4 guides (`migration-to-ios-sdk-v4`, `-android-`,
    `-react-native-`, `-flutter-`, `-kmp-`, `-capacitor-sdk-v4`). Shared opening: Quick reference table →
    Minimum version(s) → Installation → Removed/deprecated APIs → then by area (Fetching → Tracking views
    → Displaying → Handling events). Renames are always formatted as a heading `old → new`, never buried
    in prose.

    **The ending is NOT uniform — corrected 2026-08-10.** This brief previously claimed all six close with
    **Default behavior changes** → **Onboarding API deprecation**, "confirmed across every one of the six".
    That is wrong and an acceptance test caught it: `migration-to-ios-sdk-v4` and
    `migration-to-android-sdk-v4` have **neither heading at any level** — both end at
    `## Attribution and integration identifiers`, and iOS/Android put the default-behaviour content in
    prose inside `## Handling events` instead. Only React Native, Flutter, KMP and Capacitor have the two
    closing sections. Never route a reader to a section name in this family without checking their
    platform's guide actually has it.

## Sources of truth

The guide's own claims (what's removed, renamed, or now required) must trace to the platform SDK's code
diff, not to institutional memory of the release. Per `sources.md`: `ios-sdk`, `android-sdk`, `flutter-sdk`,
`unity-sdk`, `kmp-sdk`, `capacitor-sdk` for their own platform's API, and — critically for React Native
and Capacitor — `jscore` for the actual public API surface, since `rn-sdk` and `capacitor-sdk` only wrap
a pinned `@adapty/core` version that is routinely behind `jscore`'s own `origin/master`. `platforms.md`
carries the current per-platform version state (which platform is on v3 vs. v4 GA vs. v4 beta) — read it
before assuming a "migrate to v4" task means the target platform has actually shipped v4 (KMP and
Capacitor are still beta-only as of 2026-08-06). The fallback-file format itself is documented in
`fallback-flows` / `fallback-paywalls` (zone `flow-logic` / `paywalls-legacy`), not here — see Boundaries.

## What we document, what we don't

Confirmed against the corpus, one house rule at a time:

- **A guide follows a breaking change on one platform, not a version bump.** Holds throughout: every
  guide read either renames/removes a symbol, changes a signature, makes a callback required, changes a
  default, raises a minimum platform/toolchain version, or changes installation. No guide in the roster
  documents a purely additive, backward-compatible change as its main subject.
- **Do write one for:** API removed/renamed (nearly every guide), signature changed
  (`onAwaitingSubscriptionUpdateParams` in `migration-to-android-310`), a callback becoming required
  (`didFinishPurchase`/`flowViewDidFinishPurchase` across all six v4 guides), a default behavior change
  (every v4 guide's dedicated "Default behavior changes" section), a minimum platform/toolchain rise
  (iOS 15.0 in all six v4 guides; Capacitor 8 in `migration-to-capacitor-316`; React Native 0.73.0 in
  `migration-react-native-314`), an installation change (CocoaPods → SPM in iOS/RN/Flutter/Capacitor v4;
  BoM packaging in `migration-to-android-sdk-v3`).
- **Do not write one for an additive, backward-compatible change** — confirmed directly in
  `flutter-migration-guide-310`'s own text: it closes with a "Backward compatibility" note stating both
  changes it just walked through are "deprecated but still functional," i.e. this guide exists for a
  *coming* removal, documented ahead of the breaking change itself, not after. This is the one guide in
  the roster that explicitly narrates why it exists despite nothing being broken yet — treat it as the
  reference example for "how do we write a guide for a change we've merely deprecated, not yet removed."
- **A soft deprecation with a working old path gets a note inside the live/major guide, not its own
  guide.** Confirmed: every one of the six v4 guides carries an "Onboarding API deprecation" section
  saying the legacy onboarding API "still works... will be removed in a future release" — folded into
  the big guide as one closing section, never split into a separate `migration-to-*-onboarding-deprecated`
  guide.
- **Never report a missing platform/version guide as a gap.** Not this tool's job — an absence means
  "no breaking change landed there," not "we forgot."

TODO(owner): `migration-to-android-310` and `migration-to-android-312` were checked directly and do
**not** overlap (310 = purchase-parameters callback rename, 312 = removed `logShowOnboarding`) — no
question there. The real open question is the two Observer-mode changes below, in Gaps and misses #6.

## Articles
<!-- mill:auto:roster -->
| version | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| 3.0 | migration-to-ios-sdk-v3 | migration-to-android-sdk-v3 | migration-to-react-native-sdk-v3 | migration-to-flutter-sdk-v3 | migration-to-unity-sdk-v3 |  |  |
| 3.3 | migration-to-ios330 | migration-to-android330 | migration-to-react-native330 | migration-to-flutter330 | migration-to-unity330 |  |  |
| 3.4 | migration-to-ios-sdk-34 | migration-to-android-sdk-34 | migration-to-react-native-sdk-34 | migration-to-flutter-sdk-34 | migration-to-unity-sdk-34 |  |  |
| 3.8 |  |  | react-native-migration-guide-380 | flutter-migration-guide-38 |  |  |  |
| 3.10 |  | migration-to-android-310 |  | flutter-migration-guide-310 |  |  |  |
| 3.12 |  | migration-to-android-312 |  |  |  |  |  |
| 3.14 |  |  | migration-react-native-314 |  | migration-to-unity-sdk-314 |  |  |
| 3.15 | migration-to-ios-315 |  |  |  |  | migration-to-kmp-315 |  |
| 3.16 |  |  |  |  |  |  | migration-to-capacitor-316 |
| 4.0 | migration-to-ios-sdk-v4 | migration-to-android-sdk-v4 | migration-to-react-native-sdk-v4 | migration-to-flutter-sdk-v4 |  | migration-to-kmp-sdk-v4 | migration-to-capacitor-sdk-v4 |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-sdk-migration-guides | entry | dev | 0 | android |
| capacitor-sdk-migration-guides | entry | dev | 0 | capacitor |
| flutter-migration-guide-310 | migration | dev | 3 | flutter |
| flutter-migration-guide-38 | migration | dev | 3 | flutter |
| flutter-sdk-migration-guides | entry | dev | 0 | flutter |
| ios-sdk-migration-guides | entry | dev | 0 | ios |
| kmp-sdk-migration-guides | entry | dev | 0 | kmp |
| migration-react-native-314 | migration | dev | 6 | react-native |
| migration-to-android-310 | migration | dev | 1 | android |
| migration-to-android-312 | migration | dev | 0 | android |
| migration-to-android-sdk-34 | migration | dev | 2 | android |
| migration-to-android-sdk-v3 | migration | dev | 0 | android |
| migration-to-android-sdk-v4 | migration | dev | 16 | android |
| migration-to-android330 | migration | dev | 16 | android |
| migration-to-capacitor-316 | migration | dev | 0 | capacitor |
| migration-to-capacitor-sdk-v4 | migration | dev | 23 | capacitor |
| migration-to-flutter-sdk-34 | migration | dev | 2 | flutter |
| migration-to-flutter-sdk-v3 | migration | dev | 4 | flutter |
| migration-to-flutter-sdk-v4 | migration | dev | 24 | flutter |
| migration-to-flutter330 | migration | dev | 14 | flutter |
| migration-to-ios-315 | migration | dev | 0 | ios |
| migration-to-ios-sdk-34 | migration | dev | 1 | ios |
| migration-to-ios-sdk-v3 | migration | dev | 2 | ios |
| migration-to-ios-sdk-v4 | migration | dev | 24 | ios |
| migration-to-ios330 | migration | dev | 18 | ios |
| migration-to-kmp-315 | migration | dev | 3 | kmp |
| migration-to-kmp-sdk-v4 | migration | dev | 17 | kmp |
| migration-to-react-native-sdk-34 | migration | dev | 2 | react-native |
| migration-to-react-native-sdk-v3 | migration | dev | 1 | react-native |
| migration-to-react-native-sdk-v4 | migration | dev | 26 | react-native |
| migration-to-react-native330 | migration | dev | 26 | react-native |
| migration-to-unity-sdk-314 | migration | dev | 8 | unity |
| migration-to-unity-sdk-34 | migration | dev | 2 | unity |
| migration-to-unity-sdk-v3 | migration | dev | 1 | unity |
| migration-to-unity330 | migration | dev | 22 | unity |
| react-native-migration-guide-380 | migration | dev | 3 | react-native |
| react-native-sdk-migration-guides | entry | dev | 0 | react-native |
| unity-migration-guide | migration | dev | 9 | unity |
| unity-sdk-migration-guides | entry | dev | 0 | unity |
<!-- /mill:auto -->
## Reader jobs

- "I'm on v[X] of the [platform] SDK and upgrading to v[Y] — what in my code needs to change?" The
  primary and effectively only job in this zone. The reader arrives already integrated, already shipping,
  and is here because they decided to upgrade (or their build broke after they did). They land on the
  platform hub, scan version numbers newest-first, and open the one guide between their current version
  and their target.
- "My app stopped compiling / behaving correctly after bumping the Adapty dependency — what changed?"
  Same underlying job as above, but the reader arrives via a compiler error or a changed runtime behavior
  rather than a deliberate "let's see what's new" visit — this is why every v4 guide's "Default behavior
  changes" section exists: those are exactly the changes that don't fail the build, so a reader who only
  searches for compile errors would otherwise never find them.
- **Not a reader job here:** "how do I use the new API for the first time" or "how do I implement X."
  That job belongs to the live how-to article the guide links out to — a migration guide is explicitly
  the diff, not the destination.

## Ripple rules

1. **Register on the hub + sidebar.** Every guide must appear as a bullet on its platform's
   `<platform>-sdk-migration-guides` hub AND under that platform's sidebar "SDK migration guide" category.
   Confirmed against all seven sidebar JSONs: every id in every hub's bullet list has a matching sidebar
   entry, in the same order, for all seven platforms.
2. **Installation-method changes ripple into `sdk-installation-<platform>` (zone `sdk-quickstart`).**
   When a guide's "Installation" section changes (CocoaPods removal, SPM requirement, BoM), the
   platform's install article changes in the same pass. Evidence (co-change, all flagged CROSS-ZONE):
   `migration-to-ios-sdk-v4 + sdk-installation-ios` (2×), `migration-to-android-sdk-v4 +
   sdk-installation-android`, `migration-to-flutter-sdk-v4 + sdk-installation-flutter`,
   `migration-to-capacitor-sdk-v4 + sdk-installation-capacitor`, `migration-to-react-native-sdk-v4 +
   sdk-installation-react-native-{expo,pure}`.
3. **Renamed/changed callbacks ripple into the live how-to articles for that platform** (zones
   `sdk-flows-display`, `sdk-users-access`). Evidence: `migration-to-ios-sdk-v4` co-changed with
   `ios-handling-events`, `ios-present-paywalls`, `ios-present-paywall-builder-paywalls-in-observer-mode`,
   `ios-quickstart-paywalls`, `handle-paywall-actions`, and `kids-mode`; `migration-to-flutter-sdk-v4`
   with `kids-mode-flutter`; `migration-to-kmp-sdk-v4` with `kmp-present-paywalls`.
4. **A platform's flows shipping/leaving beta ripples across its whole migration surface plus
   `flow-logic` and `getting-started`, in one pass.** Evidence: commit `7e637f086` ("flutter v4 out of
   beta") touched, together: `flutter-sdk-migration-guides`, `migration-to-flutter-sdk-v4`,
   `adapty-flow-builder`, `migrate-to-flows`, `whats-new`, `kids-mode-flutter`, `quickstart-paywalls`,
   `sdk-installation-flutter`. Co-change corroborates this with `flutter-sdk-migration-guides +
   migrate-to-flows`, `+ adapty-flow-builder`, `+ quickstart-paywalls`, `+ whats-new` (all cross-zone).
   Whenever a platform's v4 guide moves from "(beta)" to GA in its title, check all of these together, not
   just the guide itself.
5. **A v4-era change to locale handling or the fallback-file format touches all six live v4 guides at
   once, not one platform at a time.** Evidence: commit `40b608f0b` ("Big localization PR…") edited
   `migration-to-ios-sdk-v4`, `migration-to-android-sdk-v4`, `migration-to-react-native-sdk-v4`,
   `migration-to-flutter-sdk-v4`, `migration-to-kmp-sdk-v4`, and `migration-to-capacitor-sdk-v4`
   simultaneously, alongside every platform's `*-localizations-and-locale-codes` article and
   `fallback-flows`/`fallback-paywalls`, because the fallback-file/locale behavior changed identically
   across platforms in v4. Every v4 guide's "Fallback files" subsection is consequently near-identical
   one-or-two-sentence text — keep it that way; don't let one platform's wording drift from the other
   five without a reason.
6. **Version-number display style is shared across every hub and every guide title.** Evidence: commit
   `defa8581c` ("Unify the SDK version style") touched all seven hub pages' bullet lists plus several
   guide titles/intros in a single commit. A future change to "how we write vX.Y" must sweep all hub
   pages and all guide titles together — see the title-scheme drift in Gaps and misses #4 for what's
   still unresolved from the *last* such sweep.
7. **Not a ripple — a coincidence to not mistake for one:** co-change shows
   `migration-to-capacitor-sdk-v4 + migration-to-flutter-sdk-v4`. Traced to commit `3d9c84e5c`
   ("capacitor bump; flutter kids mode"), which bundled two unrelated platform updates into one commit.
   There is no content dependency between the Capacitor and Flutter v4 guides — don't treat this pair as
   a standing rule.

## Boundaries

- **The live how-to article, not this zone, owns the finished API.** A migration guide's job ends at
  "here's the diff"; `sdk-flows-display` (present-paywalls, handling-events), `sdk-users-access`
  (kids-mode), and `sdk-quickstart` (installation) own the destination the guide links to. Confirmed by
  the "For the complete code example, check out [live article]" pattern repeated in nearly every guide
  read — a guide restating that article's content in full would be a defect, not thoroughness.
- **`flow-logic` (`adapty-flow-builder`, `migrate-to-flows`) owns the *concept* of flows and the
  Paywall→Flow rename story; this zone owns only *how one platform's SDK renamed its own APIs* for that
  change.** The six v4 guides all open with the same one-sentence framing ("introduces flows and renames
  the paywall APIs accordingly... no setup changes are required on the Adapty Dashboard side") and then
  never re-explain what a flow conceptually is — that's `flow-logic`'s job.
- **`flow-logic`/`paywalls-legacy` (`fallback-flows`, `fallback-paywalls`) own the fallback-file format
  itself.** Every v4 guide's "Fallback files" subsection is one or two sentences plus a link — confirmed
  structurally identical across all six — never an inline explanation of the file format.
- **`getting-started` (`whats-new`) owns the announcement; this zone owns the reference.** A new major
  or beta guide gets a line in `whats-new.mdx` in the same pass (ripple rule 4/5), but the guide itself
  never doubles as the announcement.
- **Migrating a whole app off a competing SDK is a different zone (`migration-from-competitors`),
  despite the shared "migration" filename prefix.** `migration-from-revenuecat`, `migration-from-glassfy`,
  `migration-from-superwall` (all in `src/content/docs/version-3.0/`) are about switching vendors, not
  about moving between two Adapty SDK versions — they are correctly absent from this zone's roster; don't
  fold them in on a filename match.
- **Server-side/dashboard migrations are also out of scope despite adjacent filenames:**
  `migration-guide-to-server-side-API-v2.mdx`, `migrate-integrations-to-adapty.mdx`,
  `migrate-paywalls.mdx`, and `importing-historical-data-to-adapty.mdx` are dashboard- or server-API-side
  migrations, not mobile-SDK version migrations — different zones, different readers.

## Ticket language

Rows key on the **version**, not the platform — the roster above expands each version into the
per-platform guide that actually holds the answer. A version with no cell for a platform means no
breaking change landed there, so the row simply doesn't apply. Terms that only restate a guide's own
title ("migrate to 4.0", "Paywall → Flow rename") are deliberately absent, as are the corpus-wide
synonyms in `aliases.md`.

| How a ticket says it | Where it actually lives |
|---|---|
| "which guide do I need", "I'm several versions behind", "list of breaking changes" | The platform's hub, `<platform>-sdk-migration-guides`. Read the hub's list, not the version numbers from another platform — walk every entry between the current and target version. Two platforms shipping the *same* change under different numbers is normal. |
| "nothing fails to compile but the behaviour changed" — view stays open, Android back button stopped closing it, a handler stopped being called | The `4.0` guides. These are precisely the changes a compiler never flags, so a developer searching only for build errors never reaches them. **Where to look depends on the platform:** React Native, Flutter, KMP and Capacitor have a dedicated **Default behavior changes** section (React Native's is the `onAndroidSystemBack` default); iOS and Android have no such section at all — their equivalent content is prose inside `## Handling events`. Don't send anyone to a heading their guide doesn't have. |
| "purchase succeeds but the paywall stays open", "compiler demands a callback I never wrote" | `4.0` — one change, two symptoms: `didFinishPurchase` / `flowViewDidFinishPurchase` became required *and* the view stopped auto-dismissing. Fixing the compile error without implementing dismissal leaves the stuck view. |
| "pod install fails", "CocoaPods spec repo shutting down", "Xcode/deployment target too low", "Expo dynamic frameworks", "Flipper broke" | `4.0` installation sections (iOS, React Native, Flutter, Capacitor): SPM-only, iOS 15.0 minimum. Everything Expo/Flipper-flavoured is `migration-to-react-native-sdk-v4` specifically. |
| "rendering-error callback renamed", "`hasViewConfiguration` is gone", "error when reusing the view", "`lockMethodsUntilReady` removed" | `4.0` — the presentation surface was reshaped together: `onRenderingError`/`onRenderingFailed` → `onError`, the pre-flight config check replaced by view creation returning an error, and the view instance became single-use. |
| "stuck on Capacitor 7 — which Adapty version can I use", "React Native too old", "minimum OS bump" | The toolchain-floor guides: `migration-to-capacitor-316` (Capacitor 8, carries the compatibility table), `migration-react-native-314` (RN 0.73.0), and iOS 15.0 in every `4.0` guide. This is the one class of guide where the answer is "don't upgrade yet." |
| "`logShowOnboarding` is missing", "can't log onboarding views manually", "onboarding handlers stopped firing" | Split by version: the method was removed at `3.12` (Android) and `3.14` (React Native, which also changed handler registration and import paths). The separate *deprecation* of the whole legacy onboarding API is the closing section of every `4.0` guide — different change, don't conflate. |
| "Observer Mode transaction never reaches analytics", "`restorePurchases` no longer enough", "transaction not linked to a variation" | `3.4` made `reportTransaction` mandatory — but `3.3` is where `reportTransaction` *replaced* `setVariationId`. A reader coming from 3.0 or earlier needs both, and neither guide says so (Gaps and misses #6). |
| "Observer Mode restore stopped working in a builder paywall" | `3.15`, iOS only (`migration-to-ios-315`) — a new required delegate method, `observerModeDidInitiateRestorePurchases`. Not the same Observer-mode change as `3.3`/`3.4`; matching on the words "observer mode" alone routes wrong. |
| "AppDelegate stopped compiling after a point release", "SwiftUI init compile error after the SDK update", "activate no longer accepts our configuration" | `3.4`, iOS. The activation signature gained a build step — `Adapty.activate(with: configurationBuilder)` became `Adapty.activate(with: configurationBuilder.build())`. It arrives as a symptom, not as a version number, which is why it gets a row even though the guide's title says nothing about compiling. |
| "user cancellation arrives as an error", "`didCancelPurchase`/`onPurchaseCanceled` gone", "pending purchase treated as a failure" | `3.3` — cancellation and pending state moved out of the error channel into the purchase result. `migration-to-unity330` phrases it as an enum replacing error codes; the fix is reading the result, not restoring the callback. |
| "attribution IDs sent via `updateProfile` never reach the integration" | `3.3` (`setIntegrationIdentifier` took over that job); at `4.0` on Android the attribution *source* additionally became a typed enum instead of a string. |
| "my bundled fallback file stopped working" | Recurs at four boundaries, so the version decides everything: `3.3` changed where the file lives and how it's referenced (asset path / `FileLocation` / Unity `StreamingAssets`), `3.4` invalidated files generated earlier, `3.8` renamed `setFallbackPaywalls` → `setFallback` (KMP: `3.15`), and `4.0` changed the file again. Regenerating the file and renaming the call are two separate fixes. |
| "a property isn't on the paywall/product object anymore" — `abTestName`, product list, `vendorProductIds` | `3.8` and `3.14` moved paywall properties onto the placement (`react-native-migration-guide-380`, `migration-to-unity-sdk-314`); `4.0` moved products onto the flow variation; `3.10` renamed `vendorProductIds` → `productIdentifiers` (Flutter). `3.3` removed the intro-offer eligibility check outright — offers are now filtered before they reach the app, so there's nothing left to check. |
| "purchase call signature changed", "personalized price flag", "crossgrade / subscription-update params" | `3.10` — `migration-to-android-310` (renamed subscription-update params, `AdaptyUiPersonalizedOfferResolver` removed) and `flutter-migration-guide-310` (parameter object). Unity's equivalent builder change is `3.14`. Note `flutter-migration-guide-310`'s changes still work — it documents a coming removal, so "nothing is broken yet" doesn't mean the ticket is wrong. |
| "separate UI package is gone", "forgot to activate the UI module", "`Adapty-Info.plist` is ignored", "version mismatch between the SDK and UI artifacts" | `3.0` — the UI package was folded into the core one, which forces a package reinstall rather than a version bump: `migration-to-ios-sdk-v3` (SPM re-add + AdaptyUI activation), `migration-to-flutter-sdk-v3` (plist replaced by code activation), `migration-to-android-sdk-v3` (BoM, which is the fix for mismatched artifact versions). |
| "Kids Mode product missing", "promoted purchases stopped working", "mock-mode key renamed", "China cluster" | `4.0` side-effects that read as unrelated regressions: Kids Mode became its own package (iOS, Flutter), promoted purchases changed on iOS, React Native's mock-mode key became `flows`, and KMP gained the China server cluster. Filed as "the v4 upgrade broke feature X," they're all in that platform's v4 guide. |

## Gaps and misses

1. **`unity-migration-guide` is a live, sidebar-registered page whose content is a generic templated
   stub**, not real guide content: "Enhanced paywall presentation," "Better C# support," "Bug fixes and
   stability improvements" — none of it names an actual Unity API, method, or version-specific fact, and
   it duplicates the real hub (`unity-sdk-migration-guides`) without adding anything. Last touched
   2026-03-14 (3 commits total). A reader following the Unity sidebar meets both this and the real hub
   under "SDK migration guide" and has no way to tell which is canonical.
   TODO(owner): should this be pulled from the Unity sidebar / deleted, or is it intentionally kept as a
   placeholder for something not yet written? Not a call this brief can make.
2. **Two legacy guides have never been revised since their original import** and were not touched by the
   later "Unify the SDK version style" sweep that normalized every other legacy guide:
   `flutter-migration-guide-310` (1 commit, 2026-01-27) and `migration-to-kmp-315` (1 commit,
   2026-02-04). Worth a formatting spot-check the next time either is opened for content reasons.
3. **`flutter-migration-guide-310` and `migration-to-android-310` ship with empty `description` and
   `metadataTitle` frontmatter** (`""` for both) — an SEO gap, independent of content correctness.
4. **Title-scheme drift is worse than the id-scheme drift already documented — three distinct title
   sentence templates exist, not one:**
   - (A) Canon, "Migrate Adapty \<Platform\> SDK to v\<X.Y\>" — iOS's five guides, Android v3.0/3.3/3.4/3.12,
     RN v3.0/3.3/3.4/3.8/3.14, Flutter v3.0/3.3/3.4/3.8, Unity's four, Capacitor 3.16.
   - (B) "Migrate Adapty \<Platform\> SDK to v. \<X.Y\>" (space + period before the number) — Android,
     React Native, Flutter, KMP, and Capacitor's **v4.0 guides, all five of them**. Only the iOS v4 guide
     matches canon (A) cleanly; every other v4 guide uses (B).
   - (C) "Migration guide to \<Platform\> Adapty SDK \<X.Y.0\>" (reversed word order, trailing `.0`) —
     `flutter-migration-guide-310`, `migration-to-android-310`, `migration-to-kmp-315`.
   TODO(owner): the skill's written rule says title new guides "Migrate Adapty \<Platform\> SDK to
   v\<version\>" — scheme (A), no space-period — but five of the six most recently written guides (the
   v4 wave) independently converged on scheme (B) instead. Is (B) the newer intended convention that the
   written rule hasn't caught up to, or is iOS's v4 title the one that's correct and the other five need
   fixing? Whichever way this resolves, it decides what a future 8th guide should copy.
5. **The id-scheme padding rule needs one refinement.** Confirmed: real two-digit minors (3.10, 3.12,
   3.14 ×2, 3.15 ×2, 3.16) render as unambiguous 3-digit codes. But single-digit minors do **not** share
   one padding convention — 3.3 is zero-padded (`330`), while 3.4 and 3.8 are not (`34`, `38`). "Single
   -digit minor → padded" is not a reliable rule from this corpus; only 3.3 was padded.
6. **Two separate Observer-mode changes, one version apart, are undercross-linked.** v3.3 introduces
   `reportTransaction` to replace `setVariationId` (linking a transaction to a paywall variation); v3.4
   separately makes `reportTransaction` mandatory for Adapty to recognize an Observer-mode transaction at
   all (previously `restorePurchases` sufficed). Both are documented as isolated "Update Observer mode
   implementation" sections, one version apart, on every platform, with no cross-link between the two.
   TODO(owner): is this intentional scoping (each guide covers only its own version's change) or should
   the v3.4 guides note that they assume the v3.3 `reportTransaction` change already landed? A reader
   jumping straight from v3.0 to v3.4 has to reconcile both without either guide saying so.
7. **A factual defect found while reading:** `migration-to-kmp-315`'s renaming table for event-handling
   methods has one row reversed relative to the other seven in the same diff block —
   `paywallViewDidSelectProduct` shows the `-` (old) line as `AdaptyUIPaywallView` and the `+` (new) line
   as `AdaptyUIView`, backwards from every other row, which all go `AdaptyUIView` → `AdaptyUIPaywallView`.
   Likely a copy-paste slip; worth a one-line fix next time this file is opened.
8. **Cosmetic:** `migration-to-unity330`'s intro numbered list skips from "11." to "13." (no "12."),
   confirming these lists are hand-maintained rather than generated.
