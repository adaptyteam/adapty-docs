---
zone: sdk-errors-events
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The "Reference" and "Handle errors" categories of each platform SDK: the SDK's error/event reference (specific error codes like InvalidProductIdentifiers, cantMakePayments), and how to catch and handle SDK errors and delegate/listener events in code. Readers are developers debugging a specific SDK error or wiring up event listeners, usually after something in a purchase or paywall-presentation flow has already gone wrong elsewhere.

## Surfaces

## Sources of truth

## What we document, what we don't

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
| InvalidProductIdentifiers | — | dev | 6 | ios |
| InvalidProductIdentifiers-flutter | — | dev | 6 | flutter |
| InvalidProductIdentifiers-kmp | — | dev | 6 | kmp |
| InvalidProductIdentifiers-react-native | — | dev | 6 | react-native |
| InvalidProductIdentifiers-unity | — | dev | 6 | unity |
| android-reference | entry | dev | 0 | android |
| android-sdk-error-handling | — | dev | 1 | android |
| cantMakePayments | — | dev | 0 | ios |
| cantMakePayments-flutter | — | dev | 0 | flutter |
| cantMakePayments-kmp | — | dev | 0 | kmp |
| cantMakePayments-react-native | — | dev | 0 | react-native |
| cantMakePayments-unity | — | dev | 0 | unity |
| capacitor-handle-errors | — | dev | 10 | capacitor |
| capacitor-reference | entry | dev | 0 | capacitor |
| error-handling-on-flutter-react-native-unity | entry | dev | 5 | flutter |
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
| `1003`, `cantMakePayments`, "in-app purchases not allowed on this device" | `cantMakePayments` (iOS, plus `-react-native` / `-flutter` / `-unity` / `-kmp`). Two causes only, neither of them a bug in your purchase code: device restrictions (Screen Time IAP restriction, suspended Apple account, unsupported region), or observer mode enabled at activation while you also call `makePurchase` — the two cannot coexist. The observer-mode half is the same finding `sdk-flows-manual` records for "makePurchase does nothing"; drop observer mode from the activation call. |
| `1006`, `productPurchaseFailed`, "purchase failed with no reason given" | The code table. The message is deliberately empty — it **wraps** a StoreKit code 0–14 (usually `paymentCancelled`, `paymentInvalid`, `paymentNotAllowed`, `invalidOfferPrice`). Read `originalError` (`detail` on Capacitor) or turn on verbose logs; the wrapped error is the actual answer. |
| `2002` / `notActivated` / `ADAPTY_NOT_INITIALIZED` / `AUTHENTICATION_ERROR`, "SDK not initialized", "app not activated" | The code table, which hands off to the platform's call-order article. Typically a splash screen or early UI hook calling Adapty before `activate` returns — **intermittent, and often does not reproduce on simulator/emulator** because real-device timing differs. |
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

