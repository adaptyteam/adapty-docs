---
rollout: flow-permission-kinds
status: in-progress
zones: [sdk-flows-display, flow-logic]
unattended: false
---

## What changes

The Flow & Paywall Builder's **Request permission** action asks for any permission the Adapty SDK knows (21 kinds: push, tracking, location, camera, microphone, photos, contacts, health and others), not only push notifications. It has three outcome sections, **When allowed**, **When denied** and **After response**; the app's answer and the status it passes as the detail string pick one. The flow sends one request at a time and reports `flow_permission_requested` / `flow_permission_answered` / `flow_permission_unanswered` to the app's flow analytics callback; `outcome` of the answered event is the user's answer category (`granted`, `limited`, `provisional`, `denied`, `restricted`, `permanently_denied`, `unsupported`, `other`, `no_status`), not the section that ran (decision of 2026-11-25). No SDK API changed: the handlers already received a permission value and returned an optional detail string, so every platform that had the v1 guide gets the new contract at once.

## Canon — decisions made on the first platform

- All seven guides change in one pass, because nothing is platform-gated: the change ships in the flow, and an app built for v1 keeps working (its answers carry no status, so they run **After response**).
- Handler samples use an allow-list: two permissions (push and camera) plus a default branch that answers `unsupported` without a dialog. Every answer carries a status string.
- The `Info.plist` crash is a `:::warning` at the top of `## Implement the handler` on the six guides that run on iOS. Android gets the same rule as prose, without the crash.
- Platform-independent text lives in three reusables: `FlowPermissionAnswers` (routing and statuses), `FlowPermissionDeclarations` (the summary table of every kind; rendered in the five cross-platform guides and in `flow-permissions`) and `FlowPermissionEvents` (the analytics events, in the test section). iOS and Android carry one-platform tables inline, with first-column links to `flow-permissions#<value>`. No reusable links to `flow-permissions`, because the reference renders all three.
- Per-kind detail (dialog, declarations, OS versions, native result → answer → section → `outcome`, limitations) lives in one shared article, `flow-permissions` (**System permissions**), under Flow & Paywall Builder → Navigation and interaction, after `onboarding-actions`. The guides point to it from `## Declare the permissions`. Its H3 ids equal the wire values. The minimum OS version is folded into the table cells, not a fifth column: the four-column table already fills the content width at 1440 px (built page, 2026-11-26).
- The five cross-platform guides gain `## Request each permission` (KMP: `### Use moko-permissions` under its platform section): one table of what the usual permission library requests per kind, and its status mapping to the flow's strings.
- The analytics events are documented once, in `FlowPermissionEvents`; the seven guides only point to it. The builder's warning about a screen whose only way off is the request lives in `onboarding-actions#request-permission`, not in the guides.
- The guides keep their v1 outline and gain `## Declare the permissions` before the registration section, and, on the five cross-platform guides, `## Request each permission` before it.

## Platform state
| platform | code branch | code | docs | articles written | docs commit | docs PR |
|---|---|---|---|---|---|---|
| ios | — | no SDK change (4.0.0+) | written | ios-handle-permissions, handle-paywall-actions | d175086b7 + 97b790005 + e299dbe23 + e8a11c8c6 | — |
| android | — | no SDK change (4.0.0+) | written | android-handle-permissions, android-handle-paywall-actions, android-handling-events | d175086b7 + 97b790005 + e299dbe23 + e8a11c8c6 | — |
| react-native | — | no SDK change (4.0.0+) | written | react-native-handle-permissions, react-native-handle-paywall-actions, react-native-handling-events-1 | d175086b7 + 97b790005 + e299dbe23 + e8a11c8c6 | — |
| flutter | — | no SDK change (4.0.0+) | written | flutter-handle-permissions, flutter-handle-paywall-actions, flutter-handling-events | d175086b7 + 97b790005 + e299dbe23 + e8a11c8c6 | — |
| unity | — | no SDK change (4.1.0+, 4.3.0+ on Android) | written | unity-handle-permissions, unity-handle-paywall-actions, unity-handling-events | d175086b7 + 97b790005 + e299dbe23 + e8a11c8c6 | — |
| kmp | — | no SDK change (4.1.0+) | written | kmp-handle-permissions, kmp-handle-paywall-actions | d175086b7 + 97b790005 + e299dbe23 + e8a11c8c6 | — |
| capacitor | — | no SDK change (4.1.0+) | written | capacitor-handle-permissions, capacitor-handle-paywall-actions, capacitor-handling-events | d175086b7 + 97b790005 + e299dbe23 + e8a11c8c6 | — |

## Open questions for the SDK team

- Unity passes the permission as a plain `string` with no constants, unlike Flutter and KMP (`AdaptyUIPermission` constants) and React Native / Capacitor (`AdaptyPermission` literal union). The Unity guide compares strings. Is a constants class planned?
- No SDK defines constants for the statuses (`granted`, `denied`, `restricted`, `permanently_denied`, `limited`, `provisional`, `unsupported`). The guides spell the strings out; a typo silently routes a refusal to **After response**.
- Not verified: whether `FlowPermissionResponse` is exported from React Native 4.0.0 and Capacitor 4.1.0, the minimum versions the guides state. The samples import it; the current tags export it.
- Unity: the Unity guide requires "4.3.0 or later on Android", but the only Unity 4.3 tag on 2026-11-26 is `4.3.0-beta.1` (a pre-release that needs Unity 6), and the latest stable release is 4.1.2. Which version should the guide name until 4.3.0 ships? The guide's statement is unchanged.
- Unity: on Android, 4.1.0–4.1.2 with GameActivity (the default entry point of new Unity 6 projects) deliver no event to C#, so the permission handler is never called (`CHANGELOG.md` of `4.3.0-beta.1`, Fixed). Should the guide say so, and for which versions? Not added to the docs.
- Unity: the Android sample uses `PermissionCallbacks.PermissionRequestDismissed`, which the Unity 2022.3 scripting reference doesn't list, while Unity 4.1.x supports 2022.3. Does the sample compile on 2022.3? Not compiled.
- Unity and KMP: the SDK code comments and the KMP migration guide say a pending request "resolves as denied when the flow tears down"; the native bridges flush pending requests only when the event handler is registered again (AdaptySDK-iOS `Sources.AdaptyPlugin/Events/EventHandler.swift`; AdaptySDK-Android `crossplatform/.../ui/FlowUiManager.kt`). Fix the comments, or make the bridge answer at teardown?
- Unity and KMP stable releases pin AdaptySDK-iOS 4.1.3 exactly. Is a 4.3 stable release with a newer native pin planned?
- Builder callout: it says Android has no permission for `health` and `music`; the reference gives Health Connect for `health` and `READ_MEDIA_AUDIO` as an option for `music`. Align the callout?
- Pre-permission screens: Apple's Human Interface Guidelines recommend one button and no way to leave before the system alert; `onboarding-actions#request-permission` recommends a **Skip** button for app versions that don't answer. Which one should the docs lead with?
- Not verified on a device: whether Unity `PermissionCallbacks` and moko-permissions results reach the app while the wrapper's flow activity covers the app's activity, and whether Unity keeps running coroutines on iOS while a flow is presented.
- Unverified claims kept out of the docs on 2026-11-26 are listed in the `sdk-flows-display` brief, `Gaps and misses`, "Per-kind permission reference — 2026-11-26".
