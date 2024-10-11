---
title: "Hide new Paywall Builder paywalls on React Native"
description: ""
metadataTitle: ""
---

While Paywall Builder seamlessly handles the purchasing process upon clicking "buy" buttons, you have to manage the closure of paywall screens within your mobile app.

In native iOS and Android SDKs, you have complete control over both presenting and hiding the paywalls. However in Flutter, React Native, and Unity SDKs this works a bit differently. Learn how below.

:::warning
This guide covers only hiding  **new Paywall Builder paywalls** which requires Adapty SDK v3.0 or later. To learn how to hide **legacy Paywall Builder paywalls**, read the [Hide legacy Paywall Builder paywalls (on cross-platform SDKs)](hide-legacy-paywall-builder-paywalls)
:::

## Dismiss a paywall screen in React Native

You can hide a paywall view in 2 ways: 

- call the `view.dismiss` method 
- return `true` from any [event ve-handlinhandler](handling-pb-paywall-events).

```typescript title="React Native (TSX)"
try {
  await view.dismiss();
} catch (error) {
  // handle the error
}

```