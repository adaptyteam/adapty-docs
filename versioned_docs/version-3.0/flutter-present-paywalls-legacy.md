---
title: "Flutter - Present legacy Paywall Builder paywalls"
description: ""
metadataTitle: ""
---
<!--- flutter-present-paywalls-legacy.md --->
If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.
:::warning

This guide covers the process for **legacy Paywall Builder paywalls** only which requires SDK v2.x or earlier. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For presenting **New Paywall Builder paywalls**, check out [Flutter - Present new Paywall Builder paywalls](flutter-present-paywalls).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

To show a paywall, call `view.present()` method. You can use `view` from the previous step, we will introduce a new one for visibility reasons:

```typescript title="Flutter"
try {
  await view.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

**Next step:**

- [Handle paywall events](flutter-handling-events-legacy)