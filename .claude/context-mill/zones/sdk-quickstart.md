---
zone: sdk-quickstart
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The "Get started" category of each platform SDK's sidebar: installing the SDK, activating it with an API key, identifying a user, and showing a first paywall or checking subscription status for the first time. It's the earliest integration surface a developer touches, organized as a family × platform matrix (sdk-installation, sdk-overview, quickstart-identify, quickstart-paywalls, check-subscription-status) repeated across iOS, Android, React Native, Flutter, Unity, KMP, and Capacitor. Readers are developers doing their first Adapty integration in a new app, before any paywall design or custom purchase logic is added.

## Surfaces

- **The platform's own toolchain** — this is what makes the installation family diverge, and it is the
  only step in the zone with no shared answer. Confirmed one article at a time: Xcode **File → Add Package
  Dependency** with `Adapty` / `AdaptyUI` product checkboxes (`sdk-installation-ios`); a module-level
  `build.gradle` / `build.gradle.kts` / `libs.versions.toml` entry against the `io.adapty:adapty-bom`
  platform (`sdk-installation-android`, `sdk-installation-kotlin-multiplatform`); `pubspec.yaml` +
  `flutter pub get` (`sdk-installation-flutter`); `npx expo install react-native-adapty` + `expo prebuild`
  + an EAS or local dev-client build (`sdk-installation-react-native-expo`) versus plain npm +
  CocoaPods/SPM (`sdk-installation-react-native-pure`); `npm install @adapty/capacitor` + `npx cap sync`
  (`sdk-installation-capacitor`); Unity Package Manager via Git URL or a downloaded `.unitypackage`
  (`sdk-installation-unity`).
- **One activation call and its configuration builder.** Every knob under "Optional setup" — log level,
  IDFA/Ad-ID and IP collection, media cache, local access levels, backup clearing, transaction finishing —
  is a parameter on that one builder, not a separate API. This is why the whole "Optional setup" section
  lives in the install article rather than in the feature article a reader would look for it in.
- **AdaptyUI activation, which is three different mechanisms and not one.** Verified across all eight
  install articles: a genuinely separate second call on **iOS only** (`AdaptyUI.activate()`); a flag on the
  same activation call on **Flutter** (`withActivateUI(true)`), **Unity** (`SetActivateUI(true)`) and
  **KMP** (`withActivateUI(true)`); and **nothing at all** on **Android, React Native (both articles) and
  Capacitor**, whose articles each say it "is activated automatically when you activate the core module;
  you don't need to do anything else." See Gaps and misses — the current `Ticket language` row on this
  reads as if iOS's shape were universal.
- **Exactly one dashboard screen: App settings → General → Api keys**, for the Public SDK Key. It reaches
  seven of the eight install articles through the shared `GetKey` snippet, which also offers the Adapty CLI
  (`adapty auth login` / `adapty apps list`) as an alternative. Every other dashboard screen this zone
  needs — store connection, product, flow, placement — appears only as a link in `## Before you start`.
- **Store consoles are not a surface here.** No install article documents App Store Connect or Google Play
  Console; `initial_ios` and `initial-android` (zones `apple-platform` / `google-platform`) own that, and
  they are step 1 of the identical five-step `## Before you start` list in every `quickstart-paywalls`.
- **App-code surfaces for the other three families**, each one call plus one callback: `Adapty.getFlow` →
  `AdaptyUI.getFlowConfiguration` → the flow view/controller and its purchase/restore/error handlers
  (`quickstart-paywalls`); `Adapty.getProfile` plus the profile-update delegate/listener and
  `profile.accessLevels["…"].isActive` (`check-subscription-status`); `Adapty.identify` / `logout` /
  `customerUserId` on activation (`quickstart-identify`).
- **The sidebar itself is a surface**, because it is the zone's real table of contents: a **Get started**
  category whose landing page is the platform's `sdk-overview`, then four numbered children — "1. Install &
  configure", "2. Enable purchases by using flows", "3. Check the subscription status", "4. Identify users"
  — plus an **Integrate with AI** subcategory that belongs to `agent-tooling` (see Boundaries). React Native
  is the only platform where child 1 is itself a category with two pages under it. Confirmed in all seven
  sidebar JSONs. Two shapes carry the landing page — five platforms put a bare `id` on the category object,
  KMP and Capacitor use `link: {type: doc, id}` — and both resolve; neither overview is orphaned.

## Sources of truth

- **Activation-configuration flag names must be read from the platform's own SDK repo, never copied from a
  neighbouring platform's install article.** This is the single highest-risk claim class in the zone,
  because the flags do the same thing under five different names. One flag, as documented today:
  `clearDataOnBackup` (iOS, Capacitor, React Native), `withAppleClearDataOnBackup` (KMP),
  `appleClearDataOnBackup` in Flutter's prose but `withAppleClearDataOnBackup` in Flutter's own snippet,
  `SetAppleClearDataOnBackup` (Unity). The neighbouring flag is just as bad:
  `withLocalAccessLevelAllowed` (Android), `withGoogleLocalAccessLevelAllowed` (Flutter, KMP),
  `localAccessLevelAllowed` (React Native, Capacitor), `SetGoogleLocalAccessLevelAllowed` (Unity). The
  copy-from-a-neighbour failure has already happened in this corpus — see Gaps and misses #2.
  Per-repo entry points, verified by reading them: `Sources/` (iOS);
  `adapty/src/main/java/com/adapty/models/AdaptyConfig.kt` (Android);
  `lib/src/models/adapty_configuration.dart` (Flutter — read the **public method**, not the private field
  and not the doc comment, which is itself wrong there);
  `Packages/com.adapty.unity-sdk/Runtime/Models/AdaptyConfiguration.Builder.cs` (Unity);
  `adapty/api/adapty.api` and `adapty/api/adapty.klib.api` (KMP — these are checked-in binary-compatibility
  dumps of the whole public surface, the fastest correct answer for any KMP naming question); and
  `src/types/inputs.ts` in `jscore` for React Native **and** Capacitor, whose own repos only re-export a
  pinned `@adapty/core`.
- **`platforms.md` for the version state**, before writing any "SDK 4.0" framing. Three of the seven are
  not on GA v4 (Unity and KMP are v4-beta-only; Capacitor has no v4 tag at all as of 2026-08-06), and four
  install articles therefore carry a dual structure — a stable-3.x install path plus a separate `### Adapty
  SDK 4.0 …` subsection: `sdk-installation-flutter`, `sdk-installation-capacitor`,
  `sdk-installation-react-native-expo`, `sdk-installation-react-native-pure` (plus a pre-release pinning
  note in `sdk-installation-kotlin-multiplatform`). iOS and Android have no dual path. Don't add or remove
  one of those subsections from the version number alone.
- **The Google Play Billing Library default version is a fact about which Android artifact the wrapper
  pulls, and the two artifacts disagree on the same commit.** In `AdaptySDK-Android` at `origin/master`,
  `adapty/build.gradle` pins `com.android.billingclient:billing:7.0.0` while `crossplatform/build.gradle`
  pins `8.0.0`; every wrapper (Flutter, Unity, KMP — confirmed in each repo's Gradle files) depends on
  `io.adapty.internal:crossplatform`, not on `io.adapty:android-sdk` directly. So "7.0.0" and "8.0.0" can
  both be right, for different readers. Read the pinned `crossplatform` version's build file rather than
  copying either sentence between install articles — and see Gaps and misses #4, where the corpus currently
  states both.
- **Exact dashboard labels** (the `GetKey` path, "Show on device") → `dashboard-interface` per
  `sources.md`. Verified while writing this brief: "Show on device" exists only under `packages/builder`
  (the legacy Paywall Builder) and `packages/paywall-builder-migration`, with **zero** hits in
  `packages/unified-builder` (the Flow Builder). Do not describe it as a Flow Builder control without
  re-checking.
- **The Adapty CLI commands inside the `GetKey` snippet are `agent-tooling`'s**, not this zone's — change
  them there, not by editing seven install articles.
- **Everything the reader must do in the dashboard first is another zone's truth**, and this zone only links
  it. Never restate a store-connection, product, flow or placement step here from memory of what
  `quickstart` says.

## What we document, what we don't

- **We document** the toolchain steps to get the dependency in, the one activation call, every
  activation-time configuration flag, the platform-specific build failures that follow (Swift 6 with Tuist,
  Podfile `SWIFT_VERSION` overrides, Gradle/manifest-merger conflicts, Expo dev-client requirements,
  minimum-OS errors), and for each of the four numbered steps the **minimum** code that works — then a link
  out.
- **We do not restate the dashboard prerequisites.** All seven `quickstart-paywalls` articles carry the same
  five-item `## Before you start` list of links (store connection → products → flow → placement → install),
  and none of them explains any of those steps. That link list is the contract; expanding it here would
  duplicate `getting-started` and four other zones.
- **We do not carry the full API.** Every quickstart step closes with a pointer ("For more details on how to
  display a flow, see our guide") into `sdk-flows-display`, and the intro's three-way comparison table hands
  the other two implementation styles to `sdk-flows-manual` and observer-mode articles outright. A
  quickstart that grew a second way of doing the same thing would be a defect.
- **An automatic step gets one sentence, not a procedure.** The clearest instance of the house rule in this
  zone is AdaptyUI on Android, React Native and Capacitor: a single sentence stating it happens along with
  the core activation, and nothing else. Keep it that way when a platform's activation absorbs a step.
- **Obvious UI affordances stay out** — no install article walks the Xcode or Gradle UI beyond the click
  path, and none of them screenshots a dashboard field. The one arguable exception is
  `sdk-installation-ios`'s step 5 ("Verify installation: … you should see Adapty … under Package
  Dependencies"), which no other platform's article has an equivalent of.
- **De-duplication here is a real practice, and its failure mode is under-use, not over-use.** Four snippets
  carry the zone's shared text: `InstallationPrereqs` (all eight install articles), `GetKey` (seven of
  eight), `SkillPromo` (all seven overviews) and `SupportForum` (six of seven `quickstart-paywalls`). All
  four are short — a callout or a three-step list — so stacking is not yet a problem. What *is* a problem is
  the two places that hand-copied instead: `sdk-installation-kotlin-multiplatform` inlines its own copy of
  the `GetKey` steps (missing the CLI path the snippet has), and `sdk-installation-android` hand-writes the
  `AndroidBackupRules` section. Note the Android case is defensible and should not be "fixed" reflexively:
  the reusable is written for wrappers (it tells the reader to work in "your project's `android/` folder"),
  while Android's copy uses native paths (`app/src/main/res/xml/`). Two deliberate variants of one section,
  not one duplicated section — a `diff` of the two shows only path and wording drift.
- **Per the standing house rule, an absent per-platform article is not a gap.** The zone's real asymmetries
  are the opposite shape: iOS has no local-access-levels flag because it is on by default there, and Unity
  has an event-listener step no other platform needs.

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| check-subscription-status | ios-check-subscription-status | android-check-subscription-status | react-native-check-subscription-status | flutter-check-subscription-status | unity-check-subscription-status | kmp-check-subscription-status | capacitor-check-subscription-status |
| quickstart-identify | ios-quickstart-identify | android-quickstart-identify | react-native-quickstart-identify | flutter-quickstart-identify | unity-quickstart-identify | kmp-quickstart-identify | capacitor-quickstart-identify |
| quickstart-paywalls | ios-quickstart-paywalls | android-quickstart-paywalls | react-native-quickstart-paywalls | flutter-quickstart-paywalls | unity-quickstart-paywalls | kmp-quickstart-paywalls | capacitor-quickstart-paywalls |
| sdk-installation | sdk-installation-ios | sdk-installation-android | sdk-installation-reactnative | sdk-installation-flutter | sdk-installation-unity | sdk-installation-kotlin-multiplatform | sdk-installation-capacitor |
| sdk-installation-expo |  |  | sdk-installation-react-native-expo |  |  |  |  |
| sdk-installation-pure |  |  | sdk-installation-react-native-pure |  |  |  |  |
| sdk-overview | ios-sdk-overview | android-sdk-overview | react-native-sdk-overview | flutter-sdk-overview | unity-sdk-overview | kmp-sdk-overview | capacitor-sdk-overview |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| android-check-subscription-status | — | dev | 5 | android |
| android-quickstart-identify | — | dev | 7 | android |
| android-quickstart-paywalls | — | dev | 6 | android |
| android-sdk-overview | entry | dev | 3 | android |
| capacitor-check-subscription-status | — | dev | 5 | capacitor |
| capacitor-quickstart-identify | — | dev | 6 | capacitor |
| capacitor-quickstart-paywalls | — | dev | 6 | capacitor |
| capacitor-sdk-overview | entry | dev | 3 | capacitor |
| flutter-check-subscription-status | — | dev | 5 | flutter |
| flutter-quickstart-identify | — | dev | 7 | flutter |
| flutter-quickstart-paywalls | — | dev | 6 | flutter |
| flutter-sdk-overview | entry | dev | 3 | flutter |
| ios-check-subscription-status | — | dev | 5 | ios |
| ios-quickstart-identify | — | dev | 7 | ios |
| ios-quickstart-paywalls | — | dev | 6 | ios |
| ios-sdk-overview | entry | dev | 3 | ios |
| kmp-check-subscription-status | — | dev | 5 | kmp |
| kmp-quickstart-identify | — | dev | 7 | kmp |
| kmp-quickstart-paywalls | — | dev | 6 | kmp |
| kmp-sdk-overview | entry | dev | 3 | kmp |
| react-native-check-subscription-status | — | dev | 5 | react-native |
| react-native-quickstart-identify | — | dev | 7 | react-native |
| react-native-quickstart-paywalls | — | dev | 6 | react-native |
| react-native-sdk-overview | entry | dev | 3 | react-native |
| sdk-installation-android | — | dev | 13 | android |
| sdk-installation-capacitor | — | dev | 12 | capacitor |
| sdk-installation-flutter | — | dev | 11 | flutter |
| sdk-installation-ios | — | dev | 10 | ios |
| sdk-installation-kotlin-multiplatform | — | dev | 12 | kmp |
| sdk-installation-react-native-expo | — | dev | 12 | react-native |
| sdk-installation-react-native-pure | — | dev | 12 | react-native |
| sdk-installation-reactnative | entry | dev | 0 | react-native |
| sdk-installation-unity | — | dev | 11 | unity |
| unity-check-subscription-status | — | dev | 5 | unity |
| unity-quickstart-identify | — | dev | 7 | unity |
| unity-quickstart-paywalls | — | dev | 6 | unity |
| unity-sdk-overview | entry | dev | 3 | unity |
<!-- /mill:auto -->
## Reader jobs

The order of arrival is the sidebar's own numbering, and it is worth trusting: the article-level "Next
steps" chains match it, so a reader who follows the prose walks the same path as a reader who follows the
sidebar. Each job continues out of the zone at the end.

1. **"Which platform am I on, what will this cost me, and what are the words?"** The platform's
   `sdk-overview` — a four-step map of the integration plus the "Main concepts" glossary (product / flow or
   paywall / placement / profile). It links out to `product`, `placements`, `profiles-crm` and
   `adapty-flow-builder` for each term and never explains one twice. Readers who arrive from search skip
   this entirely, which is why the four steps are also linked from every quickstart's `## Before you start`.
2. **"Get the dependency into my build and the SDK activated."** The platform's install article. This job
   forks in two directions before it can finish: back out to `quickstart` (zone `getting-started`) for the
   dashboard side, because activation succeeds long before a placement exists; and onward to step 2. This is
   also the only article in the zone a reader comes back to later, and they come back for
   `## Optional setup` or `## Troubleshooting`, not for the install steps.
3. **"Show something a user can buy."** `quickstart-paywalls` — get the flow, display it, handle the button
   actions, and no more than that. It continues into `sdk-flows-display` for anything real (fetching
   options, events, actions, fallbacks, localization), or peels off at the intro's comparison table into
   `sdk-flows-manual` for own-UI and observer-mode readers. Its own "Next steps" sends the reader to
   `test-purchases-in-sandbox` (zone `testing-and-release`) before step 4, which is the right order: a flow
   that renders is not yet a purchase that works.
4. **"Gate my paid features."** `check-subscription-status` — read the access level off the profile, and
   prefer subscribing to profile updates over polling. Continues into `access-levels` for what an access
   level is and `sdk-users-access` for the ongoing profile/attribute surface.
5. **"Make purchases follow my own logged-in user."** `quickstart-identify`, numbered last and labelled
   "(optional)" in every overview, because an app with no auth system never needs it. Continues into
   `sdk-users-access`, and sideways into `app-and-account-settings` twice — for the installs definition and
   for the paid-access-sharing setting, both of which are dashboard settings that decide behaviour this
   article only describes.
6. **"My build broke."** Not in the numbered path but demonstrably the second-biggest job here: the install
   articles carry 10–15 commits each (the highest in the zone) and much of that traffic is
   `## Troubleshooting`. This reader arrives from a compiler or Gradle error, straight into the middle of an
   install article, having read none of steps 1–5 — so a troubleshooting entry has to be self-contained and
   name the symptom, not the cause.

## Ripple rules

1. **A new "Optional setup" or "Troubleshooting" item sweeps all eight real install articles at once, and
   never the routing page.** Evidence, four separate sweeps: `890729c97` ("Add prereqs to the SDK
   installation guides"), `eb1633fb2` ("Improve installation guides…") and `5d5464cda` ("Add troubleshooting
   for Android") each touched the platform install articles as a block, and `sdk-installation-reactnative`
   is absent from every one of them — correctly, since it holds no steps. Treat "eight, not nine, and not
   seven" as the default scope for this family.
2. **An activation-semantics change sweeps the install family *and* `quickstart-identify` together.**
   Evidence: `15266851c` ("SDK initialization order") edited 15 files in one commit — all eight install
   articles plus six of the seven `quickstart-identify` articles plus `sdk-installation-unity`. The reason
   is structural rather than stylistic: `customerUserId` is a parameter on the same builder the install
   article documents, so call-order and activation rules are stated in both places by design. Six of the
   seven identify articles have not been touched since that commit.
3. **A platform's v4 landing touches its install + `quickstart-paywalls` + `sdk-overview` +
   `check-subscription-status` in a single commit.** Evidence, one commit per platform: `ccb3e9b07`
   ("Capacitor — v4"), `dfdacb088` ("Flutter v4 (#402)"), `69a416d45` ("KMP v4"), `27ce051c7` ("Android
   v4"), `589a51ec3` ("RN v4 (#361)"). Then a *second*, separate commit removes the beta framing —
   `512d3e3d5` (React Native), `e81513c96` ("Remove beta for iOS and Android"), `7e637f086` ("flutter v4 out
   of beta") — and that one lands on the install article and `quickstart-paywalls`, not on the whole set. Two
   passes, not one.
4. **An installation-method change is shared with `sdk-migrations` and must be written twice, once as a diff
   and once as the live procedure.** Evidence: `sdk-installation-ios` co-changes with
   `migration-to-ios-sdk-v4` 2× (flagged CROSS-ZONE), and `sdk-installation-capacitor` with
   `migration-to-capacitor-sdk-v4` and `capacitor-sdk-migration-guides`. This is the same rule
   `sdk-migrations` states from its side; neither side owns it alone.
5. **A cross-cutting boilerplate block sweeps one family across all seven platforms — and a platform missed
   in that sweep stays missed.** Evidence: `59ad4c907` and `21667be9f` ("SDK integration skill promo") each
   touched all seven `sdk-overview` articles; `002a01b98` ("Developer CLI") and `6025ab750` ("Add
   prerequisites and testing links to paywall quickstarts") each touched all seven `quickstart-paywalls`.
   But `47a6ec5a1` ("Add links to the Support forum") touched only six — KMP was left out — which is exactly
   why `kmp-quickstart-paywalls` is the one article in that family with no `SupportForum` snippet today.
   Count the files in this kind of commit before merging it.
6. **A toolchain fact ripples only to the platforms that host that toolchain, and the host set is not
   obvious.** Evidence: `2c085c3c2` ("Document Swift 6 / Podfile SWIFT_VERSION override troubleshooting")
   touched `sdk-installation-ios`, `sdk-installation-flutter`, `sdk-installation-react-native-pure` and
   `sdk-installation-capacitor` — the CocoaPods-hosting set — and deliberately not
   `sdk-installation-react-native-expo`, which builds for iOS too. Conversely `5c1246993` ("Raise the
   minimum iOS version to 15.0 (SDK v4)") landed on `sdk-installation-ios` alone, even though four other
   install articles also state an iOS minimum. Decide the host set from the build system, then check what
   the last comparable commit did.
7. **A flow/paywall rename sweep has to include the installation family, and the last one did not.** Six of
   seven `quickstart-paywalls` and six of seven `sdk-overview` articles are fully flow-worded (`getFlow`,
   "Flow Builder"), while **every one of the eight install articles still says "Paywall Builder" and links
   `adapty-paywall-builder`** — including iOS and Android, whose v4 is GA and whose quickstarts contain zero
   "Paywall Builder" strings. Verified by counting both strings in all 17 articles; see Gaps and misses #1.
8. **Not a ripple — the co-change noise this zone generates most.** `npm run mill:cochange sdk-quickstart`
   reports up to 5× pairing between arbitrary install-article pairs (`sdk-installation-capacitor +
   sdk-installation-flutter` 4×, `sdk-installation-react-native-expo + …-pure` 5×). All of it traces to
   whole-family sweeps and repo-wide passes — `96a345a23` ("offers + link checker 2.0 + all links fixed", 36
   zone files in one commit), `236f037a7` / `172b22e91` (the January 2026 import), plus the rule-1 sweeps
   above. The only pair with a genuine content dependency is the two React Native articles, which document
   one SDK under two build systems. Don't derive a per-pair rule from this table; derive the per-family rule.

## Boundaries

- **sdk-flows-display / sdk-flows-manual** — is the ticket about the very first "show a paywall" quickstart step (sdk-quickstart's quickstart-paywalls family), or about the fuller display/manual-implementation guides used once past initial setup? Deeper display or manual-fetch-and-render work belongs to sdk-flows-display or sdk-flows-manual.
- **sdk-users-access** — is the ticket about identifying a user for the first time (quickstart-identify, part of quickstart), or about ongoing user/attribute/access-level management (sdk-users-access)?
- **getting-started** — is this a platform SDK's own quickstart (sdk-quickstart), or the platform-agnostic "getting started" overview (installation-of-adapty-sdks, integrate-payments, adapty-ecosystem) that orients a reader before they've picked a platform?
- **sdk-migrations** — is the ticket about installing/activating the SDK for the first time (sdk-quickstart), or about migrating an existing integration from an older SDK version (sdk-migrations)?
- **agent-tooling occupies this zone's sidebar without being this zone's content.** Every platform's **Get
  started** category ends with an **Integrate with AI** subcategory holding `adapty-sdk-integration-skill`
  and `adapty-cursor` (and their six per-platform siblings), all zoned `agent-tooling`; and `<SkillPromo />`
  sits at the top of `## Get started` in all seven `sdk-overview` articles. So a reader's "getting started"
  surface is partly another zone's, and a change to the skill or CLI story shows up here as a sweep across
  seven overviews (rule 5) without any of this zone's articles owning the fact.
- **paywalls-legacy still owns the builder concept that this zone's install family links to.** All eight
  install articles point at `adapty-paywall-builder`, and all seven `quickstart-paywalls` articles point at
  `create-paywall` (titled "Create paywall") for the step they themselves call "Create a flow and add
  products to it". Whether those links should move to `adapty-flow-builder` and a renamed create-flow
  article is a `paywalls-legacy` / `flow-logic` decision, not one this zone can settle alone — see Gaps and
  misses #1 and the question filed with it.

## Ticket language

Rows name a **family** where the concern is the same on every platform — the roster expands each one
across the seven platforms. Installation is the exception: the toolchain *is* the question, so those
rows name a specific article id. Corpus-wide synonyms (access level ↔ entitlement ↔ premium access,
profile ↔ `getProfile`, flow ↔ paywall in v4) live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "where does the public SDK key go", "activation failed", "SDK not initialized", "activated twice on live reload / fast refresh" | `sdk-installation` → *Activate Adapty module*. Activation happens exactly once per app launch; the key is the **public** SDK key from the dashboard, not a secret key. Double-activation reports come from Capacitor live reload and RN fast refresh and are expected dev-only noise. |
| "flow returns but nothing renders", "AdaptyUI missing", "builder UI not available" | `sdk-installation` → *Activate AdaptyUI module* — but **check the platform before routing, because the answer is three different things** (corrected 2026-08-10; this row previously called it "a second, separate call" everywhere, which is true on iOS alone). **iOS:** a genuinely separate activation call, easy to skip. **Flutter, Unity, KMP:** a flag on the *same* `activate` call (`withActivateUI(true)`, Unity `SetActivateUI(true)`) — still skippable, different fix. **Android, React Native (both articles), Capacitor:** activated automatically with the core module, nothing to do — so on those three a missed AdaptyUI activation **cannot** be the cause and this route is a dead end; go to `sdk-flows-display`'s troubleshooting. Flutter/RN/Capacitor additionally need Swift Package Manager enabled for iOS on SDK 4.0. |
| "what has to exist before the first `getFlow`", "getFlow returns nothing / placement not found on a fresh integration" | `quickstart-paywalls` → *Before you start*. Four dashboard steps (store connection, products, flow, placement) precede any app code; on a first integration the empty result is nearly always one of them, not an SDK bug. |
| "which approach should we use", "no-code vs our own UI vs keep our existing purchase code" | `quickstart-paywalls` intro carries the three-way comparison table (builder / manual / observer mode). Only the builder path continues in this zone — manual UI and observer mode hand off to `sdk-flows-manual`. |
| "which React Native install guide", "Expo or bare", "Expo Go can't complete a purchase", "mock purchases for UI work" | `sdk-installation-reactnative` is a contentless routing page — the real steps are `sdk-installation-react-native-expo` or `sdk-installation-react-native-pure`. Expo Go cannot make real purchases at all; a dev client is required, and the mocking tips live in the Expo article. |
| "Sendable / Swift 6 build error", "pod install fails", "CocoaPods vs SPM", "kotlin-gradle-plugin classpath conflict", "manifest merger failed", "xcworkspace vs xcodeproj", "minimum version required" | The platform's own installation article's *Requirements* + *Troubleshooting* — `sdk-installation-ios`, `sdk-installation-android`, `sdk-installation-flutter`, `sdk-installation-unity`, `sdk-installation-capacitor`, `sdk-installation-kotlin-multiplatform`, `sdk-installation-react-native-pure`. There is no shared answer; the fix is per-toolchain. |
| "ATT / tracking prompt appears unexpectedly", "stop collecting the advertising ID", "App Store privacy questionnaire", "IDFA rejection" | `sdk-installation` → *Data policies* (optional setup). These are activation-time configuration flags, not a dashboard or legal-docs question. |
| "old user reappears after reinstall", "restored-from-backup device shows the wrong profile", "backup rules / dataExtractionRules merge conflict" | `sdk-installation` → *Clear data on backup restore* — **except on Android, which has no such section** (corrected 2026-08-10: seven of the eight install articles have it, `sdk-installation-android` does not, and the flag it documents is Apple-side on every platform that names it). An Android backup ticket is the manifest-merger variant instead — a different root cause, where Expo's `expo-secure-store` declares competing backup rules. Whether Android's omission is correct or a gap is question 6 in this zone's `Gaps and misses`. |
| "grant access without a network call", "access level must work offline / on first launch" | `sdk-installation` → *Enable local access levels* (Android-side flag set at activation) — **not** an API in `check-subscription-status`, which is where people look first. |
| "purchase lost after returning from the Play Store or a banking app", "result never comes back from the billing flow" | `sdk-installation-android` troubleshooting — activity/process lifecycle. Related Android-only knobs in the same article: running Adapty in a custom process, obfuscated account IDs. |
| "we validate receipts on our backend", "fraud check before granting access", "finish the transaction ourselves" | `sdk-installation-ios` → *Transaction finishing behavior*. iOS-only, and it must be set at activation — changing it later doesn't retroactively apply. |
| "profile updates never arrive in Unity", "listener callbacks silent", "script execution order" | `sdk-installation-unity` → *Set up event listening*. Unity requires an explicit listener object with a guaranteed execution order; no other platform has this step, so cross-platform reasoning misleads here. |
| "is the user premium", "gate a feature", "should we show the paywall", "detect an active subscription", "does it work offline" | `check-subscription-status`. The answer is the access level on the profile, and the recommendation is to subscribe to profile updates rather than poll; the cached profile is what makes the first offline launch work. |
| "purchase made before signup", "logout loses access", "same subscription on a new device", "installs counted twice after reinstall", "share paid access between accounts" | `quickstart-identify`. Passing the customer user ID **into activation** avoids creating a throwaway anonymous profile; after switching to an already-existing profile you must re-read the profile to get the real access level. Install double-counting is a dashboard *Installs definition* setting, linked from here. |
| "`profileWasChanged`", "error 3006", "identify race on launch" | `quickstart-identify` — concurrent or interleaved `identify` calls. Await identification before any other SDK call. |

## Gaps and misses

Every entry below was established by reading or grepping the named files on 2026-08-10; where an entry
claims an absence, the check that established it is stated.

### Owner decisions, 2026-08-10 — settled, not open questions

Four of this zone's open questions were put to the docs owner and answered. These are now decisions, so
don't re-litigate them; the remaining content work is tracked as a separate task.

1. **The installation family gets flow wording. Yes.** All eight install articles currently say "Paywall
   Builder" and link `adapty-paywall-builder`, while all seven quickstarts already say "Flow Builder" and
   `getFlow`. That split is not deliberate — it's a sweep that stopped short. Bring the install family
   over.
2. **"Show on device" is not required for flows. No.** So the note is **stale in the four quickstarts that
   carry it** (Android, Flutter, Unity, KMP) rather than missing from the three that don't (iOS, RN,
   Capacitor) — remove it, don't propagate it. This matches the code evidence: the string lives only in
   the `builder` and `paywall-builder-migration` packages of `adapty-dashboard-interface`, with zero hits
   in `unified-builder`.
3. **The Google Play Billing v8 fact must reach Flutter and Unity — if it is true.** The owner's condition
   is explicit, so verify before writing: on one commit of the Android SDK, `adapty/build.gradle` pins
   7.0.0 while `crossplatform/build.gradle` pins 8.0.0, and Flutter, Unity and KMP all depend on
   `crossplatform`. The v8 sentence was rolled out to Capacitor, RN and KMP and never reached Flutter or
   Unity. **Unresolved sub-question:** `crossplatform/` does not exist at the `3.17.x` tags Unity and KMP
   pin, so what those two effectively ship still needs establishing.
4. **`sdk-installation-flutter`'s "latest stable SDK (3.x)" callout is stale. Yes.** Flutter v4 is GA
   (tag `4.0.1`), and the article's own snippet uses a caret range that resolves to 4.x. The same
   dual-structure question applies to Capacitor and React Native — check those while fixing Flutter.

1. **The installation family never got the flow rename.** All eight install articles contain "Paywall
   Builder" (3–7 occurrences each) and link `adapty-paywall-builder` (2–3 links each); none of them mentions
   a flow except Flutter, Capacitor and the two React Native articles, which say both. Meanwhile
   `ios-quickstart-paywalls` and `android-quickstart-paywalls` contain zero "Paywall Builder" strings.
   Established by counting `Flow Builder` / `Paywall Builder` / `adapty-flow-builder` /
   `adapty-paywall-builder` in all 17 install-and-quickstart articles. A developer walking steps 1→2 in the
   sidebar today reads "activate AdaptyUI if you use the Paywall Builder", then lands on a page about flows.
2. **A verified wrong API name, and it is the copy-from-a-neighbour failure.**
   `sdk-installation-kotlin-multiplatform`'s "Enable local access levels (Android)" prose says to set
   `withLocalAccessLevelAllowed` — Android's name. KMP's actual public method is
   `withGoogleLocalAccessLevelAllowed`, confirmed in `AdaptySDK-KMP`'s checked-in API dumps
   (`adapty/api/adapty.api` and `adapty/api/adapty.klib.api`) on both `origin/main` and
   `origin/release/4.0.0`. The code snippet three lines below the prose already uses the right name, so the
   article contradicts itself. One-line fix, but the class of error is the one *Sources of truth* exists for.
3. **The same prose-versus-snippet split in Flutter.** `sdk-installation-flutter`'s "Clear data on backup
   restore" prose names `appleClearDataOnBackup`; the snippet under it correctly calls
   `withAppleClearDataOnBackup`. `appleClearDataOnBackup` is the private field, not the public method
   (`lib/src/models/adapty_configuration.dart:47` vs `:118` on `origin/master`). Worth knowing that the
   Flutter SDK's own doc comment at `:117` is wrong the same way — so this one cannot be settled by reading
   the docstring, only the signature.
4. **The Google Play Billing Library default is stated two contradictory ways inside the zone.**
   `sdk-installation-android`, `sdk-installation-flutter` and `sdk-installation-unity` say Adapty works with
   v7.0.0 by default; `sdk-installation-react-native-expo`, `-pure`, `sdk-installation-capacitor` and
   `sdk-installation-kotlin-multiplatform` say "Starting from SDK v3.17, Adapty SDK uses … v8.0.0 by
   default." Both trace to real pins in `AdaptySDK-Android` at `origin/master` (`adapty/build.gradle` →
   7.0.0, `crossplatform/build.gradle` → 8.0.0), and the v8 statement was rolled out platform-by-platform in
   `2f100f627` (Capacitor), `d9f5a3a39` (React Native) and `a8a847759` (KMP) without reaching Flutter or
   Unity — both of which do depend on `crossplatform`. **Not resolved here:** `crossplatform/` does not
   exist at the `3.17.x` tags Unity and KMP pin, so which billing version those two effectively ship could
   not be established from that repo. Question filed.
5. **`sdk-installation-android` is the only install article with no "Clear data on backup restore"
   section.** Established by grep: the heading appears in seven files (iOS, Flutter, Unity, KMP, Capacitor,
   both React Native), and `clearDataOnBackup` in seven files, neither in the Android article. This is
   probably correct — the flag is iCloud-restore behaviour and the other six document it as an Apple-side
   knob (`SetAppleClearDataOnBackup`, `withAppleClearDataOnBackup`) — but it makes the current
   `Ticket language` row's "`sdk-installation` → *Clear data on backup restore*" route to a section that
   does not exist for an Android-only ticket. Android's nearest content is the `## Troubleshooting` →
   "Android backup rules" manifest-merger item, which is a different problem.
6. **Two blocks missing from single articles, both traceable to a sweep that undercounted.**
   `kmp-quickstart-paywalls` has no `SupportForum` snippet (commit `47a6ec5a1` covered six of seven — see
   Ripple rule 5), and `capacitor-quickstart-identify` is the only one of the seven identify articles with no
   `## Next steps` section at all, so that platform's numbered path ends without an exit. Both established
   from the heading and import inventories of all seven siblings.
7. **`sdk-installation-kotlin-multiplatform` hand-copies the `GetKey` snippet** rather than importing it —
   the same three dashboard steps and the same "Public vs Secret key" callout, but without the Adapty CLI
   alternative the snippet carries. It is the only install article of the eight that does not import
   `GetKey`. A reader on KMP is therefore never told the CLI exists.
8. **Three formatting defects in `sdk-installation-kotlin-multiplatform`**, all in the same file, all
   cosmetic but visible: a malformed callout in the AdaptyUI section (`:::info` opened, with the word
   `important` on its own line as the first line of content — clearly a mangled `:::important`); the
   Kotlin snippet in "Clear data on backup restore" fenced as ` ```swift `; and the AdaptyUI section's link
   labelled "Adapty Paywall Builder" pointing at `kmp-present-paywalls` rather than a builder article.
   Family-wide, one dead import is universal: **all nine** installation articles import the `SampleApp`
   snippet and **none** renders it — each hand-writes its own sample-app tip instead, so the snippet is
   loaded nine times and used zero. `sdk-installation-react-native-expo` additionally imports
   `AndroidBackupRules` unused (it has its own Expo-specific variant of that section), and
   `sdk-installation-reactnative` imports seven things and renders one (`CustomDocCardList`).
9. **`check-subscription-status` is the zone's least-maintained family and the gap is age, not content.**
   Commit counts: 2–3 per article, against 10–15 for the install articles. Five of the seven have not been
   touched since 2026-03-14 (`96a345a23`, a repo-wide link-checker pass) — Android, iOS, KMP, React Native,
   Unity. Only Flutter and Capacitor were revisited, both by their v4 commits. Nothing is known to be wrong;
   it simply has not been re-read against a v4 SDK, and the family's depth already varies 2× between
   platforms (`android-check-subscription-status` 209 lines vs `react-native-check-subscription-status` 94).
10. **Unity is the one platform not yet reworked for flows, consistently and correctly.**
    `unity-quickstart-paywalls` is titled "Enable purchases by using paywalls", its headings are "1. Get the
    paywall" / "2. Display the paywall", it uses `GetPaywall` / `CreatePaywallView`, and
    `unity-sdk-overview`'s "Main concepts" still has the single pre-flow **Paywall** entry rather than the
    Flow-or-Paywall pair the other six carry. This matches `platforms.md` (Unity v4 is beta-only) and
    `sdk-migrations` (no Unity cell in the 4.0 row). Recorded so nobody "fixes" Unity's wording ahead of its
    SDK, and so a future Unity v4 pass knows the full set: install + overview + quickstart-paywalls, plus the
    Unity sidebar's category labels, which still read "Paywalls" / "2. Enable purchases by using paywalls".
11. **The "Show on device" prerequisite is present on four platforms and absent on three, and may be
    obsolete on all of them.** Present in `android-quickstart-paywalls` (phrased "in the Flow Builder"),
    `flutter-quickstart-paywalls`, `unity-quickstart-paywalls`, `kmp-quickstart-paywalls`; absent from iOS,
    React Native and Capacitor — the same 4/3 split as the Developer-CLI tip, which suggests one rewrite wave
    dropped both. In `dashboard-interface` at `origin/master` the string exists only under
    `packages/builder` and `packages/paywall-builder-migration` and **not once** in `packages/unified-builder`,
    and in this corpus the only non-SDK article that documents it (`quickstart-paywalls`, zone
    `getting-started`) does so in its *legacy paywall* branch, not its flow branch. Question filed — this is
    either four stale notes or three missing ones, and the evidence leans stale.
12. **Framing that may have gone stale at v4 GA, not confirmed either way.**
    `sdk-installation-flutter` opens its install section with ":::important The steps below install the
    latest stable SDK (3.x)" and treats v4 as an opt-in subsection, although `platforms.md` records Flutter
    v4 as GA (tag `4.0.1`, and `pubspec.yaml` reads `4.0.1`), and the default snippet installs
    `adapty_flutter: ^<the latest SDK version>`, which would resolve to 4.x. Whether pub.dev's latest stable
    is in fact 3.x could not be checked offline. Question filed.

