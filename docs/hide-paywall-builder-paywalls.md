---
title: "Hide Paywall Builder paywalls (on cross-platform SDKs)"
description: ""
metadataTitle: ""
---

While Paywall Builder seamlessly handles the purchasing process upon clicking "buy" buttons, you have to manage the closure of paywall screens within your mobile app.

In native iOS and Android SDKs you have complete control over both presenting and hiding the paywalls. However in Flutter, React Native, and Unity SDKs this works a bit differently. Learn how below.

## Dismiss a paywall screen in Flutter

You can hide a paywall screen by calling the `view.dismiss` method.

```typescript Flutter
try {
  await view.dismiss();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

## Dismiss a paywall screen in React Native

You can hide a paywall view in 2 ways: 

- call the `view.dismiss` method 
- return `true` from any [event ve-handlinhandler](handling-pb-paywall-events).

```typescript React Native (TSX)
try {
  await view.dismiss();
} catch (error) {
  // handle the error
}

```

## Dismiss a paywall screen in Unity

You can hide a paywall view by calling the `view.Dismiss` method.

```typescript Flutter
view.Dismiss((error) => {
  // handle the error
});
```