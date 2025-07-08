---
title: "Hide legacy Paywall Builder paywalls in React Native SDK"
description: "Hide legacy paywalls in your React Native app with Adapty SDK."
metadataTitle: "Hide Legacy Paywall Builder Paywalls | React Native SDK | Adapty Docs"
displayed_sidebar: sdkreactnative
---

While Paywall Builder seamlessly handles the purchasing process upon clicking "buy" buttons, you have to manage the closure of paywall screens within your React Native app.

:::warning
This guide covers only hiding **legacy Paywall Builder paywalls** which supports Adapty SDK v2.x or earlier. To learn how to hide **new Paywall Builder paywalls**, read the [Hide Paywall Builder paywalls](hide-paywall-builder-paywalls)
:::

You can hide a paywall view in 2 ways:

- call the `view.dismiss` method 
- return `true` from any [event we handle in handler](handling-pb-paywall-events).

```typescript showLineNumbers
try {
  await view.dismiss();
} catch (error) {
  // handle the error
}
``` 