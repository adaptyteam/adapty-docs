---
zone: sdk-errors-events
sources: [android-sdk, flutter-sdk, ios-sdk, jscore, kmp-sdk, unity-sdk]
reviewed_shape:
reviewed_at:
---

## What this is

The "Reference" and "Handle errors" categories of each platform SDK: the SDK's error/event reference (specific error codes like InvalidProductIdentifiers, cantMakePayments), and how to catch and handle SDK errors and delegate/listener events in code. Readers are developers debugging a specific SDK error or wiring up event listeners, usually after something in a purchase or paywall-presentation flow has already gone wrong elsewhere.

## Surfaces

## Sources of truth

A claim in this zone has four layers that drift independently — the error's **name**, its **number**, its
**message**, and its **cause** — and only the first three have something you can read. Treat every code
table in the roster as a *transcription* of an enum, never as the enum.

- **The authoritative name→number list is one file per platform, and not one repo per platform.**
  Established by `git show <ref>:<path>` against each source in `sources.md`, not from a working tree:
  `ios-sdk` `origin/master` → `Sources/Errors/AdaptyError.swift` (`enum ErrorCode: Int`); `android-sdk`
  `origin/master` → `adapty/src/main/java/com/adapty/errors/AdaptyErrorCode.kt`; `flutter-sdk`
  `origin/master` → `lib/src/models/adapty_error_code.dart`; `unity-sdk` `origin/main` →
  `Packages/com.adapty.unity-sdk/Runtime/Models/AdaptyErrorCode.cs`; `kmp-sdk` `origin/main` →
  `adapty/src/commonMain/kotlin/com/adapty/kmp/models/AdaptyErrorCode.kt`; and for **React Native and
  Capacitor, `jscore` `origin/master` → `src/types/error.ts`**, which holds two parallel maps (`ErrorCode`,
  number→name, and `ErrorCodeName`, name→number). Neither wrapper repo declares codes of its own, so the
  `jscore` rule in `platforms.md` applies here with no exception. Note `unity-sdk` and `kmp-sdk` resolve to
  `origin/main`, which is still their v3 line — a list read there is the v3 list, and their v4 codes live on
  `origin/release/4.0.0`.
- **The transcription drifts, per platform, in both directions — so re-derive instead of copying a
  neighbouring platform's table.** A mechanical name/number diff of each table against its own enum:
  `ios-sdk-error-handling` matches `AdaptyError.swift` exactly, zero rows either way. The other three do
  not. `error-handling-on-flutter-react-native-unity` carries three rows Flutter's enum does not define
  (`noProductsFound` 1001, `missingOfferSigningParams` 1007, `persistingDataError` 3100) and omits four it
  does; `react-native-handle-errors` carries four `jscore` does not define and omits `billingNetworkError`
  112; `unity-handle-errors` carries four Unity's enum does not define, one of which
  (`noPurchasesToRestore` 1004) is explicitly commented out in the C# source. "The iOS article says X" is a
  fine hypothesis and a bad citation.
- **A number is not portable across platforms, and this is the sharpest trap in the zone.** Across all six
  enums no name carries two different numbers, but **five numbers carry two different names**, and two of
  those change the meaning outright. `2002` is `notActivated` on iOS, Flutter, Unity and `jscore`; on
  Android and KMP `2002` is `AUTHENTICATION_ERROR`, and the not-activated condition is a *different number*
  — `20` (`ADAPTY_NOT_INITIALIZED`). `5` is Apple's `storeProductNotAvailable` on iOS/Flutter/Unity/`jscore`
  and Play's `ITEM_UNAVAILABLE` on Android/KMP: same number, two different stores. (`2005`, `3001` and
  `3020` differ in name only.) A pasted number identifies nothing until the platform is known — and this
  zone's own *Ticket language* row puts `2002`, `notActivated`, `ADAPTY_NOT_INITIALIZED` and
  `AUTHENTICATION_ERROR` on one line, which is right about the ticket and wrong about the codes.
- **The exact message is code too, in a different file from the codes.** On iOS it is
  `Sources/Errors/AdaptyError+Description.swift`, keyed by the same enum. When an article quotes what the
  developer actually sees, quote it from there rather than paraphrasing.
- **A cause falls into one of three classes, and only the first is checkable. Grep the internal name, not
  the public one:** throw sites use internal cases that a separate mapping table turns into a public code
  (`Sources/Errors/InternalAdaptyError.swift` on iOS), so grepping the public name finds the *definition*
  and misses the *mechanism*.
  1. **Code-anchored — there is a `throw` to point at.** Verified on `ios-sdk` `origin/master`: `1000`
     `noProductIDsFound` has three throw sites in `Sources/StoreKit/ProductsManager.swift`; `1006`
     `productPurchaseFailed` wraps whatever StoreKit's purchase call threw
     (`Sources/StoreKit/StoreKitPurchaser.swift:188`) but has one path that wraps **nothing** (`:252`,
     StoreKit's `@unknown default`), so "read `originalError`" is not always an answer; and the
     fallback-file cause of `3001` is real rather than folklore —
     `Sources/Placements/Entities/FallbackPlacements.swift` compares the file's `formatVersion` against
     `Adapty.fallbackFormatVersion` and throws `wrongVersionFallback`, which `InternalAdaptyError.swift`
     maps to `wrongParam`, choosing between two messages depending on which side is stale (regenerate the
     file vs. update the SDK). The docs give only one of those two directions.
  2. **Message ≠ cause by construction.** `3001` `wrongParam` is a generic carrier: a dozen distinct throw
     sites on iOS, each supplying its own free-text description ("Transaction is not in \"purchased\"
     state", "Wrong screenOrder parameter value…", "AdaptyFlow.viewConfiguration is nil", custom-attribute
     length limits). The table shows the enum name; the description string is the only thing that
     distinguishes them, and no article tells the reader to read it. `1006` has the same shape.
  3. **Support-desk judgment with no code anchor — label it, don't dress it as a fact.** Two documented
     causes here have no throw site at all: "**Show on device** is off in the builder" for `3001` (zero hits
     in the iOS sources for any casing or separator of "show on device") and "an invalid API key" for `2006`
     `decodingFailed` (the only trace is a `// TODO: is wrong api key - return error` comment in
     `Sources/Adapty.swift` — an invalid key does not currently raise a distinct error). Everything in the
     `1000` and `1003` articles is in this class permanently: those causes live in App Store Connect and in
     device settings, and no source registered in `sources.md` covers either. They are ticket-derived and
     load-bearing, and they can only be replaced by a newer judgment, never "corrected against the source".
- **The `reference` family is not the code catalogue.** All seven read end to end — `ios-reference`,
  `android-reference`, `react-native-reference`, `flutter-reference`, `unity-reference`, `kmp-reference`,
  `capacitor-reference` — are 10–11-line stubs of identical shape: one intro line and exactly two bullets,
  "SDK models" pointing at an externally generated site and "Handle errors" pointing at that platform's code
  table. Zero tables and zero codes between the seven of them. The data-model half is generated outside this
  repo (`swift.adapty.io`, `android.adapty.io`, `react-native.adapty.io/modules`, `pub.dev`,
  `unity.adapty.io`, `kmp.adapty.io`, `capacitor.adapty.io`), so no source in `sources.md` can verify it and
  a wrong target there is invisible to every check we run.

## What we document, what we don't

- **An error earns its own article only when the fix is a multi-step walkthrough of somebody else's
  console.** Exactly two codes have one, and both are App Store only: `1000` (`InvalidProductIdentifiers`
  plus `InvalidProductIdentifiers-react-native`, `-flutter`, `-unity`, `-kmp`) and `1003`
  (`cantMakePayments` plus `cantMakePayments-react-native`, `-flutter`, `-unity`, `-kmp`). Everything else
  stays a row, including codes with long causes — `BILLING_UNAVAILABLE`'s five reasons live in a single
  table cell. The test is not severity or ticket volume; it is whether the answer is an ordered procedure
  through a third party's UI that needs screenshots.
- **The table row does not disappear once the article exists.** In every code table the `1000` and `1003`
  rows keep a one-sentence gloss and then link out. The article is reached *from* the table, never instead
  of it, and the tables are the only pages in this zone that link to them at all.
- **What the per-error article carries that a row cannot:** ordered steps against App Store Connect, the
  screenshots that make each step findable (`InvalidProductIdentifiers` has twelve), and — the part most
  worth protecting — a **terminal step for when every check passed**: the product can be stuck in Apple's
  registry, visible in App Store Connect but not exposed to StoreKit, so delete and recreate it with the
  same id and allow 24 h. That last step is why the article exists; the checklist above it is available
  anywhere.
- **The two families are built differently, and that difference is a maintenance rule.** All five `1003`
  articles are frontmatter plus one import — the entire body is `src/components/reusable/1003.md`, so there
  is exactly one place to edit and per-platform wording is not on offer. The five `1000` articles are full
  ~200-line copies with no shared snippet, kept in step by hand (body diffs of 24–38 lines against the iOS
  original, all of it link targets, heading anchors and smart quotes). Editing one `1000` article and not
  the other four is the standing failure mode.
- **Against the store's own error surface we restate the store's code list one row deep, then stop.** Every
  StoreKit code 0–14 and every Play response code we surface gets a row carrying the store's own name, its
  number, one sentence, and a deep link to the store's page (20 Apple links in `ios-sdk-error-handling`, 11
  Google links in `android-sdk-error-handling`, ~16 Apple plus 1 Google in each cross-platform table). We
  do not restate the store's taxonomy past that sentence and do not reproduce its remediation guidance —
  the Adapty-authored content is the Solution column. The exception is where a store condition has a
  consequence the store's page will not mention: the Play testing-track and Testers-group cause behind
  `ITEM_UNAVAILABLE`, or the fact that `1006` wraps one of codes 0–14. That is content about our wrapper,
  not about their taxonomy.
- **Android's table omits numbers deliberately — don't "fix" it by adding them.**
  `android-sdk-error-handling` is keyed by error name only, and adding numbers means choosing *which*
  number, where the two candidates are never equal: `AdaptyErrorCode.kt`'s `fromBilling` derives Adapty's
  value from a Play response code by adding **100** (with `ITEM_UNAVAILABLE` special-cased to 5), so
  `BILLING_UNAVAILABLE` is 103 to us and 3 to Play. Printing one number while linking the other is how this
  table becomes wrong.
- **A per-platform article may omit the tables entirely only if it renders the shared snippet — and today
  exactly one does.** `capacitor-handle-errors` ends with `<CrossPlatformErrors />` and carries no tables of
  its own. `react-native-handle-errors`, `unity-handle-errors` and
  `error-handling-on-flutter-react-native-unity` each *import*
  `src/components/reusable/CrossPlatformErrors.md` and never render it, carrying inlined copies instead. So
  the snippet is not a canonical table with four dependants; it is a fifth copy that one platform depends
  on. Its rows are not the inlined rows either — it drops every per-code Apple deep link and keeps an
  `operationInterrupted` 9000 row the three inlined copies lack, and its `notActivated` /
  `adaptyNotInitialized` rows send the reader to React Native install docs while rendering on the Capacitor
  page. Any de-duplication starts by deciding which of the five copies is canonical.
- **A per-platform article may also be deliberately shallower than a full table.** `kmp-handle-errors` is a
  five-row summary plus handling patterns rather than a catalogue, and *Ticket language* routes accordingly.
  Shallow by design is allowed; wrong is not, and those five rows disagree with KMP's own enum (they assign
  1001, 1002 and 1004 meanings `AdaptyErrorCode.kt` does not define) — a defect, not a scoping choice.
- **The "events" half of this zone's name is currently unbuilt, and that is a scope fact, not a gap to
  fill on sight.** All 24 articles are error material: seven `reference` stubs, seven code-table pages, and
  the two per-error-code families of five. No event or listener signature reference exists here; per
  *Boundaries* the
  handler wiring belongs to `sdk-flows-display`, and a ticket asking "what does this presentation event
  mean" has no destination in this roster today.

## Articles
<!-- mill:auto:roster -->
| family | ios | android | react-native | flutter | unity | kmp | capacitor |
|---|---|---|---|---|---|---|---|
| InvalidProductIdentifiers | InvalidProductIdentifiers |  | InvalidProductIdentifiers-react-native | InvalidProductIdentifiers-flutter | InvalidProductIdentifiers-unity | InvalidProductIdentifiers-kmp |  |
| cantMakePayments | cantMakePayments |  | cantMakePayments-react-native | cantMakePayments-flutter | cantMakePayments-unity | cantMakePayments-kmp |  |
| error-handling-on |  |  |  | error-handling-on-flutter-react-native-unity |  |  |  |
| handle-errors |  |  | react-native-handle-errors |  | unity-handle-errors | kmp-handle-errors | capacitor-handle-errors |
| reference | ios-reference | android-reference | react-native-reference | flutter-reference | unity-reference | kmp-reference | capacitor-reference |
| sdk-error-handling | ios-sdk-error-handling | android-sdk-error-handling |  |  |  |  |  |

| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| InvalidProductIdentifiers | — | dev | 7 | ios |
| InvalidProductIdentifiers-flutter | — | dev | 6 | flutter |
| InvalidProductIdentifiers-kmp | — | dev | 6 | kmp |
| InvalidProductIdentifiers-react-native | — | dev | 6 | react-native |
| InvalidProductIdentifiers-unity | — | dev | 6 | unity |
| android-reference | entry | dev | 0 | android |
| android-sdk-error-handling | — | dev | 2 | android |
| cantMakePayments | — | dev | 0 | ios |
| cantMakePayments-flutter | — | dev | 0 | flutter |
| cantMakePayments-kmp | — | dev | 0 | kmp |
| cantMakePayments-react-native | — | dev | 0 | react-native |
| cantMakePayments-unity | — | dev | 0 | unity |
| capacitor-handle-errors | — | dev | 10 | capacitor |
| capacitor-reference | entry | dev | 0 | capacitor |
| error-handling-on-flutter-react-native-unity | entry | dev | 6 | flutter |
| flutter-reference | entry | dev | 0 | flutter |
| ios-reference | entry | dev | 0 | ios |
| ios-sdk-error-handling | entry | dev | 4 | ios |
| kmp-handle-errors | entry | dev | 9 | kmp |
| kmp-reference | entry | dev | 0 | kmp |
| react-native-handle-errors | entry | dev | 5 | react-native |
| react-native-reference | entry | dev | 0 | react-native |
| unity-handle-errors | entry | dev | 5 | unity |
| unity-reference | entry | dev | 0 | unity |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **sdk-flows-manual** — is the ticket about the general reference/handling pattern for an error (sdk-errors-events), or about the specific purchase/restore flow that produced it (sdk-flows-manual)? "What does this error code mean" is sdk-errors-events; "my purchase call keeps failing" is sdk-flows-manual, with the error-reference page as a cross-link.
- **sdk-flows-display** — same distinction for paywall-presentation events: the catalogue of what an event/error means is sdk-errors-events; the presentation code that triggers it is sdk-flows-display.
- **testing-and-release** — is the error happening specifically in a sandbox/test-purchase context (testing-and-release), or is it a general SDK error/event reference question independent of the test environment (sdk-errors-events)?

## Ticket language

A ticket in this zone almost never arrives as a concept — it arrives as a **pasted string or code
number** (`1003`, `noProductIDsFound`, `PROFILE_WAS_CHANGED`) with "what does this mean?" attached.
So the left column below is what the developer pasted, and the right column is where that string
gets decoded. Restating an error name is not a wasted row here: the reader already has the string
and only needs the destination.

One shorthand, because the family name differs per platform for no good reason. **"the code table"**
= the platform's exhaustive error-code article: `sdk-error-handling` (iOS, Android),
`handle-errors` (React Native, Unity, KMP, Capacitor), `error-handling-on` (Flutter — the id is
`error-handling-on-flutter-react-native-unity`, which serves **Flutter only** despite naming three
platforms). Corpus-wide synonyms live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| `1000`, `noProductIDsFound`, `InvalidProductIdentifiers` warning, "empty paywall", "no purchase options", "products approved but not found" | `InvalidProductIdentifiers` (iOS, plus `-react-native` / `-flutter` / `-unity` / `-kmp` variants). A **store-configuration** problem, not a code problem, and the pages are App-Store-only: bundle ID, Ready to Submit, availability, prices, Paid Apps Agreement / bank / tax. The warning **without** an error is harmless and should be ignored. Android and Capacitor have no variant page — the Google Play equivalent (package name, tax status, testing track) is inline as `NO_PRODUCT_IDS_FOUND` in `android-sdk-error-handling`. |
| "everything matches and the product is Approved, but still 1000" | Still `InvalidProductIdentifiers`, final step: the product can be stuck in Apple's registry — visible in App Store Connect but not exposed to StoreKit lookup. Delete and recreate it with the same ID, then wait up to 24 h. |
| `1003`, `cantMakePayments`, "in-app purchases not allowed on this device" | `cantMakePayments` (iOS, plus `-react-native` / `-flutter` / `-unity` / `-kmp`). **Two causes, both real, and the reusable `1003.md` that forms the whole body of those five articles has been right all along.** (1) **Device restrictions** — Screen Time's IAP restriction, a suspended Apple account, an unsupported region; iOS's error text says exactly that. (2) **Observer mode plus `makePurchase`, which cannot coexist.** The mechanism is a nil collaborator, not a dedicated error: `Sources/Adapty.swift` builds `purchaser` only `if !observerMode`, and `Sources/StoreKit/Adapty+MakePurchase.swift` opens with `guard let purchaser = sdk.purchaser else { throw .cantMakePayments() }`. A second route exists too — `InternalAdaptyError.swift` maps `notAllowedInObserveMode` onto `cantMakePayments`. Android is different: its enum defines no `CANT_MAKE_PAYMENTS` at all, so this code is not portable. **History worth keeping, because it cost two wrong edits:** this row first named observer mode, then "corrected" it away on the strength of a grep for `notAllowedInObserveMode` alone — the wrong grep, since the real path never mentions that name. Disproving one mechanism is not disproving the claim. |
| `1006`, `productPurchaseFailed`, "purchase failed with no reason given" | The code table. The message is deliberately empty — it **wraps** a StoreKit code 0–14 (usually `paymentCancelled`, `paymentInvalid`, `paymentNotAllowed`, `invalidOfferPrice`). Read `originalError` (`detail` on Capacitor) or turn on verbose logs; the wrapped error is the actual answer. |
| `2002` / `notActivated` / `ADAPTY_NOT_INITIALIZED` / `AUTHENTICATION_ERROR`, "SDK not initialized", "app not activated" | The code table, which hands off to the platform's call-order article. Typically a splash screen or early UI hook calling Adapty before `activate` returns — **intermittent, and often does not reproduce on simulator/emulator** because real-device timing differs. **Ask which platform before reading the number — corrected 2026-08-11:** these four are one *ticket*, not one code. `2002` is `notActivated` on iOS, Flutter, Unity and `jscore`, but on **Android and KMP `2002` is `AUTHENTICATION_ERROR`** and not-activated is a different number entirely, `20` (`ADAPTY_NOT_INITIALIZED`). So an Android developer pasting `2002` has an auth problem, not a call-order problem, and this row previously sent them to the wrong article. |
| `3006` / `profileWasChanged` / `PROFILE_WAS_CHANGED`, "profile changed mid-call" | The code table. Cause is a call issued while `identify` is still in flight; the call lands on a profile about to be swapped and the SDK rejects it. Await `identify` first. |
| `3001` / `wrongParam` / `WRONG_PARAMETER`, "some of your parameters are not correct" | The code table — and the message **misdescribes the cause**. For a builder flow that won't display, it usually means **Show on device** is off in the builder, or the local fallback file's version doesn't match the SDK version. Configuration, not parameters. |
| `2006` / `decodingFailed` / `DECODING_FAILED`, "response decoding failed" | The code table. Reads like a parsing bug; the documented cause is an **invalid API key**. |
| `2`, `paymentCancelled`, "payment cancelled by user"; `1004`, `noPurchasesToRestore`, "restore found nothing" | The code table, but neither is a defect to fix — they are normal outcomes the store reported. Handle them in business logic (offer a discount, show an empty-restore message). |
| `1005`, `cantReadReceipt`, "sandbox receipt missing" | The code table. Sandbox-specific: there is no receipt on the device until a purchase has actually been made, and the device must be signed into a valid sandbox account. Sandbox setup itself is `testing-and-release`. |
| `11`–`14` (`invalidOfferIdentifier`, `invalidSignature`, `missingOfferParams`, `invalidOfferPrice`), Flutter's `1007` `missingOfferSigningParams`, "invalid offer identifier" | The code table. All App Store **configuration**: the offer isn't set up (or was revoked) in App Store Connect, the offer price isn't a discount, or the App Store integration is missing the In-app purchase Key ID and private key. |
| `BILLING_UNAVAILABLE` / `billingUnavailable` (`103`), "billing unavailable", "purchase declined" | The code table. Nothing to fix in your code — outdated or missing Play Store app, unsupported country, enterprise admin blocking purchases, a declined payment method, or a user not signed into Play. |
| `ITEM_UNAVAILABLE` / `PRODUCT_NOT_FOUND` / `productNotFound` (`22`) | The code table. On Android this is mostly a **testing-stage** symptom: the product isn't in production yet, or the tester isn't in the Play Console Testers group. Overlaps `testing-and-release` — route there if the ticket is about the test track itself. |
| "which page lists all the error codes?", "where's the full code reference?" | The code table, **not** the `reference` family. Note two traps: Flutter's copy is `error-handling-on-flutter-react-native-unity`, and the Android table is keyed by error **name** with no numeric codes at all — a number pasted from an Android build won't be findable there, only the equivalent "Custom Android codes" rows (`20`–`108`) in the cross-platform tables carry numbers. |
| "where are the SDK type definitions / data models / class list", "TypeDoc link", "pub.dev docs" | The `reference` family — a two-link landing stub per platform, pointing at externally generated model docs (`swift.adapty.io`, `android.adapty.io`, `pub.dev`, etc.) plus the code table. The data-model reference is **not** in this corpus; don't hunt for it here. KMP's `kmp-handle-errors` is also worth flagging as a five-row summary rather than a full table. |

## Gaps and misses

