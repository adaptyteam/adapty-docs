---
title: "Capacitor - Handle paywall events"
description: "Handle subscription events in Capacitor with Adapty's SDK."
metadataTitle: "Handling Events in Capacitor | Adapty Docs"
toc_max_heading_level: 4
keywords: ['onCustomAction', 'onUrlPress', 'onAndroidSystemBack', 'onCloseButtonPress', 'onPurchaseStarted', 'onPurchaseCompleted', 'onPurchaseFailed', 'onPurchaseCancelled', 'onRestoreStarted', 'onRestoreFailed', 'onRestoreCompleted', 'onProductSelected', 'onLoadingProductsFailed', 'onRenderingFailed', 'onAppeared', 'onDisappeared']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PaywallAction from '@site/src/components/reusable/PaywallAction.md';
import Details from '@site/src/components/Details';

:::important
This guide covers event handling for purchases, restorations, product selection, and paywall rendering. You must also implement button handling (closing paywall, opening links, etc.). See our [guide on handling button actions](capacitor-handle-paywall-actions.md) for details.
:::

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.


To control or monitor processes occurring on the paywall screen within your mobile app, implement the `view.setEventHandlers` method:

```typescript showLineNumbers
import { adapty, createPaywallView } from '@adapty/capacitor';

const view = await createPaywallView(paywall);

const unsubscribe = view.setEventHandlers({
  onCloseButtonPress() {
    console.log('User closed paywall');
    return true; // Allow the paywall to close
  },
  onAndroidSystemBack() {
    console.log('User pressed back button');
    return true; // Allow the paywall to close
  }, 
  onAppeared() {
    console.log('Paywall appeared');
    return false; // Don't close the paywall
  }, 
  onDisappeared() {
    console.log('Paywall disappeared');
  },
  onPurchaseCompleted(purchaseResult, product) {
    console.log('Purchase completed:', purchaseResult);
    return purchaseResult.type !== 'user_cancelled'; // Close if not cancelled
  },
  onPurchaseStarted(product) {
    console.log('Purchase started:', product);
    return false; // Don't close the paywall
  },
  onPurchaseFailed(error, product) {
    console.error('Purchase failed:', error);
    return false; // Don't close the paywall
  },
  onRestoreCompleted(profile) {
    console.log('Restore completed:', profile);
    return true; // Close the paywall after successful restore
  },
  onRestoreFailed(error) {
    console.error('Restore failed:', error);
    return false; // Don't close the paywall
  },
  onProductSelected(productId) {
    console.log('Product selected:', productId);
    return false; // Don't close the paywall
  },
  onRenderingFailed(error) {
    console.error('Rendering failed:', error);
    return false; // Don't close the paywall
  },
  onLoadingProductsFailed(error) {
    console.error('Loading products failed:', error);
    return false; // Don't close the paywall
  },
  onUrlPress(url) {
    window.open(url, '_blank');
    return false; // Don't close the paywall
  },
});
```

<Details>
<summary>Event examples (Click to expand)</summary>

```typescript
// onCloseButtonPress
{
  "event": "close_button_press"
}

// onAndroidSystemBack
{
  "event": "android_system_back"
}

// onAppeared
{
  "event": "paywall_shown"
}

// onDisappeared
{
  "event": "paywall_closed"
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
```
</Details>

You can register event handlers you need, and miss those you do not need. In this case, unused event listeners would not be created. There are no required event handlers.

Event handlers return a boolean. If `true` is returned, the displaying process is considered complete, thus the paywall screen closes and event listeners for this view are removed.

Some event handlers have a default behavior that you can override if needed:
- `onCloseButtonPress`: closes paywall when close button pressed.
- `onAndroidSystemBack`: closes paywall when the **Back** button pressed.
- `onRestoreCompleted`: closes paywall after successful restore.
- `onPurchaseCompleted`: closes paywall unless user cancelled.
- `onRenderingFailed`: closes paywall if its rendering fails.
- `onUrlPress`: opens URLs in system browser and keeps paywall open. 

### Event handlers

| Event handler               | Description                                                                                                                                                                                                                                                                                       |
|:----------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **onCustomAction**          | Invoked when a user performs a custom action, e.g., clicks a [custom button](paywall-buttons).                                                                                                                                                                                                    |
| **onUrlPress**              | Invoked when a user clicks a URL in your paywall.                                                                                                                                                                                                                                                 |
| **onAndroidSystemBack**     | Invoked when a user taps the system Android **Back** button.                                                                                                                                                                                                                                      |
| **onCloseButtonPress**      | Invoked when the close button is visible and a user taps it. It is recommended to dismiss the paywall screen in this handler.                                                                                                                                                                     |
| **onPurchaseCompleted**     | Invoked when the purchase completes, whether successful, cancelled by user, or pending approval. In case of a successful purchase, it provides an updated `AdaptyProfile`. User cancellations and pending payments (e.g., parental approval required) trigger this event, not `onPurchaseFailed`. |
| **onPurchaseStarted**       | Invoked when a user taps the "Purchase" action button to start the purchase process.                                                                                                                                                                                                              |
| **onPurchaseCancelled**     | Invoked when a user initiates the purchase process and manually interrupts it (cancels the payment dialog).                                                                                                                                                                                       |
| **onPurchaseFailed**        | Invoked when a purchase fails due to errors (e.g., payment restrictions, invalid products, network failures, transaction verification failures). Not invoked for user cancellations or pending payments, which trigger `onPurchaseCompleted` instead.                                             |
| **onRestoreStarted**        | Invoked when a user starts a purchase restoration process.                                                                                                                                                                                                                                        |
| **onRestoreCompleted**      | Invoked when purchase restoration succeeds and provides an updated `AdaptyProfile`. It is recommended to dismiss the screen if the user has the required `accessLevel`. Refer to the [Subscription status](capacitor-listen-subscription-changes) topic to learn how to check it.                 |
| **onRestoreFailed**         | Invoked when the restore process fails and provides `AdaptyError`.                                                                                                                                                                                                                                |
| **onProductSelected**       | Invoked when any product in the paywall view is selected, allowing you to monitor what the user selects before the purchase.                                                                                                                                                                      |
| **onAppeared**              | Invoked when the paywall view appears on screen. On iOS, also invoked when a user clicks the [web paywall button](web-paywall#step-2a-add-a-web-purchase-button) inside a paywall, and a web paywall opens in an in-app browser.                                                                  |
| **onDisappeared**           | Invoked when the paywall view disappears from screen. On iOS, also invoked when a [web paywall](web-paywall#step-2a-add-a-web-purchase-button) opened from a paywall in an in-app browser disappears from the screen.                                                                             |
| **onRenderingFailed**       | Invoked when an error occurs during view rendering and provides `AdaptyError`. Such errors should not occur, so if you come across one, please let us know.                                                                                                                                       |
| **onLoadingProductsFailed** | Invoked when product loading fails and provides `AdaptyError`. If you haven't set `prefetchProducts: true` in view creation, AdaptyUI will retrieve the necessary objects from the server by itself.                                                                                              |

