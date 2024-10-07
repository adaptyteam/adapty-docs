
---
title: "Flutter - Present Paywall Builder paywalls"
description: ""
metadataTitle: ""
---
<!--- flutter-present-paywalls-legacy.md --->
If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

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