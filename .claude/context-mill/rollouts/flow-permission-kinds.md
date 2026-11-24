---
rollout: flow-permission-kinds
status: in-progress
zones: [sdk-flows-display, flow-logic]
unattended: false
---

## What changes

The Flow & Paywall Builder's **Request permission** action asks for any permission the Adapty SDK knows (21 kinds: push, tracking, location, camera, microphone, photos, contacts, health and others), not only push notifications. It has three outcome sections, **When allowed**, **When denied** and **After response**; the app's answer and the status it passes as the detail string pick one. The flow sends one request at a time and reports `flow_permission_requested` / `flow_permission_answered` to the app's flow analytics callback. No SDK API changed: the handlers already received a permission value and returned an optional detail string, so every platform that had the v1 guide gets the new contract at once.

## Canon — decisions made on the first platform

- All seven guides change in one pass, because nothing is platform-gated: the change ships in the flow, and an app built for v1 keeps working (its answers carry no status, so they run **After response**).
- Handler samples use an allow-list: two permissions (push and camera) plus a default branch that answers `unsupported` without a dialog. Every answer carries a status string.
- The `Info.plist` crash is a `:::warning` at the top of `## Implement the handler` on the six guides that run on iOS. Android gets the same rule as prose, without the crash.
- Platform-independent text lives in three reusables: `FlowPermissionAnswers` (routing and statuses), `FlowPermissionDeclarations` (the per-kind declaration table, cross-platform guides only) and `FlowPermissionEvents` (the analytics events, in the test section). iOS and Android carry one-platform tables inline.
- The guides keep their v1 outline and gain one H2, `## Declare the permissions`, before the registration section.

## Platform state
| platform | code branch | code | docs | articles written | docs commit | docs PR |
|---|---|---|---|---|---|---|
| ios | — | no SDK change (4.0.0+) | written | ios-handle-permissions, handle-paywall-actions | d175086b7 + 97b790005 + e299dbe23 | — |
| android | — | no SDK change (4.0.0+) | written | android-handle-permissions, android-handle-paywall-actions, android-handling-events | d175086b7 + 97b790005 + e299dbe23 | — |
| react-native | — | no SDK change (4.0.0+) | written | react-native-handle-permissions, react-native-handle-paywall-actions, react-native-handling-events-1 | d175086b7 + 97b790005 + e299dbe23 | — |
| flutter | — | no SDK change (4.0.0+) | written | flutter-handle-permissions, flutter-handle-paywall-actions, flutter-handling-events | d175086b7 + 97b790005 + e299dbe23 | — |
| unity | — | no SDK change (4.1.0+, 4.3.0+ on Android) | written | unity-handle-permissions, unity-handle-paywall-actions, unity-handling-events | d175086b7 + 97b790005 + e299dbe23 | — |
| kmp | — | no SDK change (4.1.0+) | written | kmp-handle-permissions, kmp-handle-paywall-actions | d175086b7 + 97b790005 + e299dbe23 | — |
| capacitor | — | no SDK change (4.1.0+) | written | capacitor-handle-permissions, capacitor-handle-paywall-actions, capacitor-handling-events | d175086b7 + 97b790005 + e299dbe23 | — |

## Open questions for the SDK team

- Unity passes the permission as a plain `string` with no constants, unlike Flutter and KMP (`AdaptyUIPermission` constants) and React Native / Capacitor (`AdaptyPermission` literal union). The Unity guide compares strings. Is a constants class planned?
- No SDK defines constants for the statuses (`granted`, `denied`, `restricted`, `permanently_denied`, `limited`, `provisional`, `unsupported`). The guides spell the strings out; a typo silently routes a refusal to **After response**.
- Not verified: whether `FlowPermissionResponse` is exported from React Native 4.0.0 and Capacitor 4.1.0, the minimum versions the guides state. The samples import it; the current tags export it.
