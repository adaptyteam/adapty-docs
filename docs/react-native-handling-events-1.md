---
title: "React Native - Handle paywall events"
description: ""
metadataTitle: ""
---

Paywalls configured with the [Paywall Builder](https://docs.adapty.io/v3.0/docs/adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

To control or monitor processes occurring on the paywall screen within your mobile app, implement the`view.registerEventHandlers` method:

```typescript title="React Native (TSX)"
import {createPaywallView} from '@adapty/react-native-ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
  onCloseButtonPress() {
    return true;
  },
  onPurchaseCompleted(profile) {
    return true;
  },
  onPurchaseStarted() { /***/},
  onPurchaseCancelled() { /***/ },
  onPurchaseFailed(error) { /***/ },
  onRestoreCompleted(profile) { /***/ },
  onRestoreFailed(error) { /***/ },
  onProductSelected() { /***/},
  onRenderingFailed(error) { /***/ },
  onLoadingProductsFailed(error) { /***/ },
  onUrlPress(url) { /* handle url */ },
});

```

You can register event handlers you need, and miss those you do not need. In this case, unused event listeners would not be created.

Note that at the very least you need to implement the reactions to both `onCloseButtonPress` and `onUrlPress`.

Event handlers return a boolean. If `true` is returned, the displaying process is considered complete, thus the paywall screen closes and event listeners for this view are removed. 

Note, that `onCloseButtonPress`, `onPurchaseCompleted` and `onRestoreCompleted` in the example above return `true` — This is their default behavior that you can override.

### Event handlers

| Event handler               | Description                                                                                                                                                                                                                                                                                    |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **onCloseButtonPress**      | If the close button is visible and a user taps it, this method will be invoked. It is recommended to dismiss the paywall screen in this handler.                                                                                                                                               |
| **onPurchaseCompleted**     | If a user's purchase succeeds, this method will be invoked and will provide updated `AdaptyProfile`. It is recommended to dismiss the paywall view in this handler.                                                                                                                            |
| **onPurchaseStarted**       | If a user taps the "Purchase" action button to start the purchase process, this method will be invoked.                                                                                                                                                                                        |
| **onPurchaseCancelled**     | If a user initiates the purchase process and manually interrupts it, this method will be invoked.                                                                                                                                                                                              |
| **onPurchaseFailed**        | If the purchase process fails, this method will be invoked and provide `AdaptyError`.                                                                                                                                                                                                          |
| **onRestoreCompleted**      | If a user's purchase restoration succeeds, this method will be invoked and provide updated `AdaptyProfile`. It is recommended to dismiss the screen if the user has  the required `accessLevel`. Refer to the [Subscription status](subscription-status)   topic to learn how to check it. |
| **onRestoreFailed**         | If the restoring process fails, this method will be invoked and will provide `AdaptyError`.                                                                                                                                                                                                    |
| **onProductSelected**       | When any product in the paywall view is selected, this method will be invoked, so that you can monitor what the user selects before the purchase.                                                                                                                                              |
| **onRenderingFailed**       | If an error occurs during view rendering, this method will be invoked and provide `AdaptyError`. Such errors should not occur, so if you come across one, please let us know.                                                                                                                  |
| **onLoadingProductsFailed** | If you  haven't set `prefetchProducts: true` in view creation, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, this method will be invoked and provide `AdaptyError`.                                                                         |