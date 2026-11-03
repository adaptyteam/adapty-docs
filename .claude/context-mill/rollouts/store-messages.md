---
rollout: store-messages
status: in-progress
zones: [sdk-users-access, sdk-quickstart, sdk-errors-events]
unattended: false
---

## What changes

Manual control over when store messages appear: App Store messages (price increase consent, billing issue, win-back offer) on iOS, Google Play in-app messages (declined payment) on Android. An activation option switches handling from automatic to manual; `showStoreMessages` shows them at a moment the app picks; on iOS, `getPendingStoreMessageTypes` reads the queue. New error codes 3201 `operationInProgress` and 3202 `resolverFailure`.

## Canon — decisions made on the first platform

- One how-to article per platform (`<platform>-store-messages`), placed in the sidebar next to the subscription-status and ATT articles, plus a short "messages handling" subsection in the platform install page that links to it.
- Lead with the warning that manual mode without a `showStoreMessages` call means users never see the messages.
- Errors live in the article and in the platform error table, with the same causes.
- Cross-platform wrappers (React Native, 2026-11-03) get one article covering both stores: the iOS queue sections and the Google Play request behavior side by side, rather than two articles.

## Platform state
| platform | code branch | code | docs | articles written | docs commit | docs PR |
|---|---|---|---|---|---|---|
| ios | — | shipped (4.2) | shipped | ios-store-messages, sdk-installation-ios, ios-sdk-error-handling | 6c9606264 + 0584ae26f | #650, #664 |
| android | — | shipped (4.3.0) | shipped | android-store-messages, sdk-installation-android | 4180a8d23 | — |
| react-native | dev (4.3.0) | shipped (4.3.0, 2026-11-03) | in progress | react-native-store-messages, sdk-installation-react-native-pure, sdk-installation-react-native-expo, react-native-handle-errors | b3e62f613 + 73b8f42ce | — |
| flutter | — | not started | — | — | — | — |
| unity | — | not started | — | — | — | — |
| kmp | — | not started | — | — | — | — |
| capacitor | — | not started | — | — | — | — |

## Open questions for the SDK team

- Resolved 2026-11-03 (AdaptySDK-iOS 4.3.1 `Sources.AdaptyPlugin/Requests/Request.swift`): below iOS 16, the plugin doesn't register either store messages request, so both `getPendingStoreMessageTypes` and `showStoreMessages` reject with an unknown-request error on React Native.
