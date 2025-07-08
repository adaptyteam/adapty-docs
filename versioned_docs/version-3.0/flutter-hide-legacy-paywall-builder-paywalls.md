---
title: "Hide legacy Paywall Builder paywalls in Flutter SDK"
description: "Hide legacy paywalls in your Flutter app with Adapty SDK."
metadataTitle: "Hide Legacy Paywall Builder Paywalls | Flutter SDK | Adapty Docs"
displayed_sidebar: sdkflutter
---

While Paywall Builder seamlessly handles the purchasing process upon clicking "buy" buttons, you have to manage the closure of paywall screens within your Flutter app.

:::warning
This guide covers only hiding **legacy Paywall Builder paywalls** which supports Adapty SDK v2.x or earlier. To learn how to hide **new Paywall Builder paywalls**, read the [Hide Paywall Builder paywalls](hide-paywall-builder-paywalls)
:::

You can hide a paywall screen by calling the `view.dismiss` method.

```dart showLineNumbers
try {
  await view.dismiss();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
``` 