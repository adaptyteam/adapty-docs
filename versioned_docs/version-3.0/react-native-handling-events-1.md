---
title: "React Native - Handle paywall events"
description: "Handle subscription events in React Native with Adapty's SDK."
metadataTitle: "Handling Events in React Native | Adapty Docs"
toc_max_heading_level: 4
keywords: ['onCustomAction', 'onUrlPress', 'onAndroidSystemBack', 'onCloseButtonPress', 'onPurchaseStarted', 'onPurchaseCompleted', 'onPurchaseFailed', 'onPurchaseCancelled', 'onRestoreStarted', 'onRestoreFailed', 'onRestoreCompleted', 'onProductSelected', 'onLoadingProductsFailed', 'onRenderingFailed', 'onPaywallClosed', 'onPaywallShown', 'onWebPaymentNavigationFinished']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PaywallAction from '@site/src/components/reusable/PaywallAction.md';
import Details from '@site/src/components/Details';

:::important
This guide covers event handling for purchases, restorations, product selection, and paywall rendering. You must also implement button handling (closing paywall, opening links, etc.). See our [guide on handling button actions](react-native-handle-paywall-actions.md) for details.
:::

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning
This guide is for **new Paywall Builder paywalls** only which require Adapty SDK v3.0 or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Handle paywall events designed with legacy Paywall Builder](react-native-handling-events-legacy).
:::

To control or monitor processes occurring on the paywall screen within your mobile app, implement event handlers:

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>

<Tabs groupId="presentation-method" queryString>
<TabItem value="platform" label="React component" default>

For React component, you handle events through individual event handler props in the `AdaptyPaywallView` component:

```typescript showLineNumbers title="React Native (TSX)"
import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import { AdaptyPaywallView } from 'react-native-adapty';
import type { EventHandlers } from 'react-native-adapty';

function MyPaywall({ paywall }) {
  const onCloseButtonPress = useCallback<EventHandlers['onCloseButtonPress']>(() => {}, []);
  const onAndroidSystemBack = useCallback<EventHandlers['onAndroidSystemBack']>(() => {}, []);
  const onProductSelected = useCallback<EventHandlers['onProductSelected']>((productId) => {}, []);
  const onPurchaseStarted = useCallback<EventHandlers['onPurchaseStarted']>((product) => {}, []);
  const onPurchaseCompleted = useCallback<EventHandlers['onPurchaseCompleted']>((purchaseResult, product) => {}, []);
  const onPurchaseFailed = useCallback<EventHandlers['onPurchaseFailed']>((error, product) => {}, []);
  const onRestoreStarted = useCallback<EventHandlers['onRestoreStarted']>(() => {}, []);
  const onRestoreCompleted = useCallback<EventHandlers['onRestoreCompleted']>((profile) => {}, []);
  const onRestoreFailed = useCallback<EventHandlers['onRestoreFailed']>((error) => {}, []);
  const onPaywallShown = useCallback<EventHandlers['onPaywallShown']>(() => {}, []);
  const onPaywallClosed = useCallback<EventHandlers['onPaywallClosed']>(() => {}, []);
  const onRenderingFailed = useCallback<EventHandlers['onRenderingFailed']>((error) => {}, []);
  const onLoadingProductsFailed = useCallback<EventHandlers['onLoadingProductsFailed']>((error) => {}, []);
  const onUrlPress = useCallback<EventHandlers['onUrlPress']>((url) => {
    Linking.openURL(url);
  }, []);
  const onCustomAction = useCallback<EventHandlers['onCustomAction']>((actionId) => {}, []);
  const onWebPaymentNavigationFinished = useCallback<EventHandlers['onWebPaymentNavigationFinished']>(() => {}, []);

  return (
    <AdaptyPaywallView
      paywall={paywall}
      style={styles.container}
      onCloseButtonPress={onCloseButtonPress}
      onAndroidSystemBack={onAndroidSystemBack}
      onProductSelected={onProductSelected}
      onPurchaseStarted={onPurchaseStarted}
      onPurchaseCompleted={onPurchaseCompleted}
      onPurchaseFailed={onPurchaseFailed}
      onRestoreStarted={onRestoreStarted}
      onRestoreCompleted={onRestoreCompleted}
      onRestoreFailed={onRestoreFailed}
      onPaywallShown={onPaywallShown}
      onPaywallClosed={onPaywallClosed}
      onRenderingFailed={onRenderingFailed}
      onLoadingProductsFailed={onLoadingProductsFailed}
      onUrlPress={onUrlPress}
      onCustomAction={onCustomAction}
      onWebPaymentNavigationFinished={onWebPaymentNavigationFinished}
    />
  );
}
```

</TabItem>
<TabItem value="standalone" label="Modal presentation">

For modal presentation, implement the event handlers method.

:::important
Calling `setEventHandlers` multiple times will override the handlers you provide, replacing both default and previously set handlers for those specific events.
:::

```javascript showLineNumbers title="React Native (TSX)"
import { Linking } from 'react-native';
import {createPaywallView} from 'react-native-adapty';

const view = await createPaywallView(paywall);

const unsubscribe = view.setEventHandlers({
  onCloseButtonPress() {
    return true;
  },
  onAndroidSystemBack() {
    return true;
  },
  onPurchaseCompleted(purchaseResult, product) {
    return purchaseResult.type !== 'user_cancelled';
  },
  onPurchaseStarted(product) { /***/},
  onPurchaseFailed(error) { /***/ },
  onRestoreCompleted(profile) { /***/ },
  onRestoreFailed(error, product) { /***/ },
  onProductSelected(productId) { /***/},
  onRenderingFailed(error) { /***/ },
  onLoadingProductsFailed(error) { /***/ },
  onUrlPress(url) {
      Linking.openURL(url);
      return false; // Keep paywall open
  },
  onPaywallShown() { /***/ },
  onPaywallClosed() { /***/ },
  onWebPaymentNavigationFinished() { /***/ },  
});
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="old" label="SDK version < 3.14" default>

For SDK version < 3.14, only modal presentation is supported:

```javascript showLineNumbers title="React Native (TSX)"
import { Linking } from 'react-native';
import {createPaywallView} from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
  onCloseButtonPress() {
    return true;
  },
  onAndroidSystemBack() {
    return true;
  },
  onPurchaseCompleted(purchaseResult, product) {
    return purchaseResult.type !== 'user_cancelled';
  },
  onPurchaseStarted(product) { /***/},
  onPurchaseFailed(error, product) { /***/ },
  onRestoreCompleted(profile) { /***/ },
  onRestoreFailed(error) { /***/ },
  onProductSelected(productId) { /***/},
  onRenderingFailed(error) { /***/ },
  onLoadingProductsFailed(error) { /***/ },
  onUrlPress(url) {
      Linking.openURL(url);
      return false; // Keep paywall open
  },
  onPaywallShown() { /***/ },
  onPaywallClosed() { /***/ },
  onWebPaymentNavigationFinished() { /***/ },
});
```

</TabItem>
</Tabs>

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// onCloseButtonPress
{
  "event": "close_button_press"
}

// onAndroidSystemBack
{
  "event": "android_system_back"
}

// onUrlPress
{
  "event": "url_press",
  "url": "https://example.com/terms"
}

// onCustomAction
{
  "event": "custom_action",
  "actionId": "login"
}

// onProductSelected
{
  "event": "product_selected",
  "productId": "premium_monthly"
}

// onPurchaseStarted
{
  "event": "purchase_started",
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}

// onPurchaseCompleted - Success
{
  "event": "purchase_completed",
  "purchaseResult": {
    "type": "success",
    "profile": {
      "accessLevels": {
        "premium": {
          "id": "premium",
          "isActive": true,
          "expiresAt": "2024-02-15T10:30:00Z"
        }
      }
    }
  },
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}

// onPurchaseCompleted - Cancelled
{
  "event": "purchase_completed",
  "purchaseResult": {
    "type": "user_cancelled"
  },
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}

// onPurchaseFailed
{
  "event": "purchase_failed",
  "error": {
    "code": "purchase_failed",
    "message": "Purchase failed due to insufficient funds",
    "details": {
      "underlyingError": "Insufficient funds in account"
    },
    "product": {
        "vendorProductId": "premium_monthly",
            "localizedTitle": "Premium Monthly",
            "localizedDescription": "Premium subscription for 1 month",
            "localizedPrice": "$9.99",
            "price": 9.99,
            "currencyCode": "USD"
    }
  }
}

// onRestoreCompleted
{
  "event": "restore_completed",
  "profile": {
    "accessLevels": {
      "premium": {
        "id": "premium",
        "isActive": true,
        "expiresAt": "2024-02-15T10:30:00Z"
      }
    },
    "subscriptions": [
      {
        "vendorProductId": "premium_monthly",
        "isActive": true,
        "expiresAt": "2024-02-15T10:30:00Z"
      }
    ]
  }
}

// onRestoreFailed
{
  "event": "restore_failed",
  "error": {
    "code": "restore_failed",
    "message": "Purchase restoration failed",
    "details": {
      "underlyingError": "No previous purchases found"
    }
  }
}

// onRenderingFailed
{
  "event": "rendering_failed",
  "error": {
    "code": "rendering_failed",
    "message": "Failed to render paywall interface",
    "details": {
      "underlyingError": "Invalid paywall configuration"
    }
  }
}

// onLoadingProductsFailed
{
  "event": "loading_products_failed",
  "error": {
    "code": "products_loading_failed",
    "message": "Failed to load products from the server",
    "details": {
      "underlyingError": "Network timeout"
    }
  }
}

// onPaywallShown
{
  "event": "paywall_shown"
}

// onPaywallClosed
{
  "event": "paywall_closed"
}

// onWebPaymentNavigationFinished
{
  "event": "web_payment_navigation_finished"
}
```
</Details>

You can register event handlers you need, and miss those you do not need. In this case, unused event listeners would not be created. There are no required event handlers.

Event handlers return a boolean. If `true` is returned, the displaying process is considered complete, thus the paywall screen closes and event listeners for this view are removed.

Some event handlers have a default behavior that you can override if needed:
- `onCloseButtonPress`: closes paywall when close button pressed.
- `onUrlPress`: opens the tapped URL and keeps the paywall open.
- `onAndroidSystemBack`: closes paywall when the **Back** button pressed.
- `onRestoreCompleted`: closes paywall after successful restore.
- `onPurchaseCompleted`: closes paywall unless user cancelled.

### Event handlers

| Event handler                      | Description                                                                                                                                                                                                                                                                                       |
|:-----------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **onCustomAction**                 | Invoked when a user performs a custom action, e.g., clicks a [custom button](paywall-buttons).                                                                                                                                                                                                    |
| **onUrlPress**                     | Invoked when a user clicks a URL in your paywall.                                                                                                                                                                                                                                                 |
| **onAndroidSystemBack**            | Invoked when a user taps the system Android **Back** button.                                                                                                                                                                                                                                      |
| **onCloseButtonPress**             | Invoked when the close button is visible and a user taps it. It is recommended to dismiss the paywall screen in this handler.                                                                                                                                                                     |
| **onPurchaseCompleted**            | Invoked when the purchase completes, whether successful, cancelled by user, or pending approval. In case of a successful purchase, it provides an updated `AdaptyProfile`. User cancellations and pending payments (e.g., parental approval required) trigger this event, not `onPurchaseFailed`. |
| **onPurchaseStarted**              | Invoked when a user taps the "Purchase" action button to start the purchase process.                                                                                                                                                                                                              |
| **onPurchaseFailed**               | Invoked when a purchase fails due to errors (e.g., payment restrictions, invalid products, network failures, transaction verification failures). Not invoked for user cancellations or pending payments, which trigger `onPurchaseCompleted` instead.                                             |
| **onRestoreStarted**               | Invoked when a user starts a purchase restoration process.                                                                                                                                                                                                                                        |
| **onRestoreCompleted**             | Invoked when purchase restoration succeeds and provides an updated `AdaptyProfile`. It is recommended to dismiss the screen if the user has the required `accessLevel`. Refer to the [Subscription status](react-native-listen-subscription-changes) topic to learn how to check it.              |
| **onRestoreFailed**                | Invoked when the restore process fails and provides `AdaptyError`.                                                                                                                                                                                                                                |
| **onProductSelected**              | Invoked when any product in the paywall view is selected, allowing you to monitor what the user selects before the purchase.                                                                                                                                                                      |
| **onRenderingFailed**              | Invoked when an error occurs during view rendering and provides `AdaptyError`. Such errors should not occur, so if you come across one, please let us know.                                                                                                                                       |
| **onLoadingProductsFailed**        | Invoked when product loading fails and provides `AdaptyError`. If you haven't set `prefetchProducts: true` in view creation, AdaptyUI will retrieve the necessary objects from the server by itself.                                                                                              |
| **onPaywallShown**                 | Invoked when the paywall is displayed to the user.                                                                                                                                                                                                                                                |
| **onPaywallClosed**                | Invoked when the paywall is closed by the user.                                                                                                                                                                                                                                                   |
| **onWebPaymentNavigationFinished** | Invoked after attempting to open a [web paywall](web-paywall) for purchase, whether successful or failed.                                                                                                                                                                                         |