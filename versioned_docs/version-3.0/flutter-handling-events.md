---
title: "Flutter - Handle paywall events"
description: "Discover how to handle subscription-related events in Flutter using Adapty to track user interactions effectively."
metadataTitle: "Handling Events in Flutter | Adapty Docs"
keywords: ['event', 'paywallViewDidPerformAction', 'paywallViewDidSelectProduct', 'paywallViewDidStartPurchase', 'paywallViewDidFinishPurchase', 'paywallViewDidFailPurchase', 'paywallViewDidFinishRestore', 'paywallViewDidFailRestore', 'paywallViewDidFailLoadingProducts', 'paywallViewDidFailRendering']
---

import SampleApp from '@site/src/components/reusable/SampleApp.md';
import PaywallAction from '@site/src/components/reusable/PaywallAction.md';
import Details from '@site/src/components/Details';

:::important
This guide covers event handling for purchases, restorations, product selection, and paywall rendering. You must also implement button handling (closing paywall, opening links, etc.). See our [guide on handling button actions](flutter-handle-paywall-actions.md) for details.
:::

Paywalls configured with the [Paywall Builder](adapty-paywall-builder-legacy) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning

This guide is for **new Paywall Builder paywalls** only which require Adapty SDK v3.0 or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Flutter - Handle paywall events designed with legacy Paywall Builder](flutter-handling-events-legacy).

:::

To control or monitor processes occurring on the paywall screen within your mobile app, implement the `AdaptyUIPaywallsEventsObserver` methods and set the observer before presenting any screen:

```javascript showLineNumbers title="Flutter"
AdaptyUI().setPaywallsEventsObserver(this);
```

<SampleApp />

### User-generated events

#### Product selection

If a product is selected for purchase (by a user or by the system), this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidSelectProduct(AdaptyUIPaywallView view, String productId) {
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "productId": "premium_monthly"
}
```
</Details>

#### Started purchase

If a user initiates the purchase process, this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidStartPurchase(AdaptyUIPaywallView view, AdaptyPaywallProduct product) {
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}
```
</Details>

#### Completed purchase

This method is invoked when a purchase succeeds, the user cancels their purchase, or the purchase appears to be pending:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFinishPurchase(AdaptyUIPaywallView view, 
                                  AdaptyPaywallProduct product, 
                                  AdaptyPurchaseResult purchaseResult) {
    switch (purchaseResult) {
      case AdaptyPurchaseResultSuccess(profile: final profile):
        // successful purchase
        break;
      case AdaptyPurchaseResultPending():
        // purchase is pending
        break;
      case AdaptyPurchaseResultUserCancelled():
        // user cancelled the purchase
        break;
      default:
        break;
    }
}
```

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// Successful purchase
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "purchaseResult": {
    "type": "AdaptyPurchaseResultSuccess",
    "profile": {
      "accessLevels": {
        "premium": {
          "id": "premium",
          "isActive": true,
          "expiresAt": "2024-02-15T10:30:00Z"
        }
      }
    }
  }
}

// Pending purchase
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "purchaseResult": {
    "type": "AdaptyPurchaseResultPending"
  }
}

// User cancelled purchase
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "purchaseResult": {
    "type": "AdaptyPurchaseResultUserCancelled"
  }
}
```
</Details>

We recommend dismissing the screen in that case. Refer to [Respond to button actions](flutter-handle-paywall-actions.md) for details on dismissing a paywall screen.

#### Finished web payment navigation

This method is invoked after an attempt to open a [web paywall](web-paywall.md) for a specific product. This includes both successful and failed navigation attempts:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFinishWebPaymentNavigation(AdaptyUIPaywallView view, 
                                               AdaptyPaywallProduct? product, 
                                               AdaptyError? error) {
}
```

**Parameters:**

| Parameter   | Description                                                                                        |
|:------------|:---------------------------------------------------------------------------------------------------|
| **product** | An `AdaptyPaywallProduct` for which the web paywall was opened. Can be `null`.                     |
| **error**   | An `AdaptyError` object if the web paywall navigation failed; `null` if navigation was successful. |

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// Successful navigation
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "error": null
}

// Failed navigation
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "error": {
    "code": "web_navigation_failed",
    "message": "Failed to open web paywall",
    "details": {
      "underlyingError": "Browser unavailable"
    }
  }
}
```
</Details>

#### Failed purchase

This method is invoked when a purchase fails (for example, due to payment issues or network errors). It does **not** fire for user-initiated cancellations or pending transactions—those are handled by `paywallViewDidFinishPurchase`:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFailPurchase(AdaptyUIPaywallView view, 
                                AdaptyPaywallProduct product, 
                                AdaptyError error) {
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "error": {
    "code": "purchase_failed",
    "message": "Purchase failed due to insufficient funds",
    "details": {
      "underlyingError": "Insufficient funds in account"
    }
  }
}
```
</Details>

#### Successful restore

If restoring a purchase succeeds, this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFinishRestore(AdaptyUIPaywallView view, AdaptyProfile profile) {
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
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
```
</Details>

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](flutter-listen-subscription-changes.md) topic to learn how to check it and to [Respond to button actions](flutter-handle-paywall-actions.md) topic to learn how to dismiss a paywall screen.

#### Failed restore

If restoring a purchase fails, this method will be invoked:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFailRestore(AdaptyUIPaywallView view, AdaptyError error) {
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "error": {
    "code": "restore_failed",
    "message": "Purchase restoration failed",
    "details": {
      "underlyingError": "No previous purchases found"
    }
  }
}
```
</Details>

### Data fetching and rendering

#### Product loading errors

If you don't pass the product array during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will report the error by invoking this method:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFailLoadingProducts(AdaptyUIPaywallView view, AdaptyError error) {
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
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

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by calling this method:

```javascript showLineNumbers title="Flutter"
void paywallViewDidFailRendering(AdaptyUIPaywallView view, AdaptyError error) {
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "error": {
    "code": "rendering_failed",
    "message": "Failed to render paywall interface",
    "details": {
      "underlyingError": "Invalid paywall configuration"
    }
  }
}
```
</Details>

In a normal situation, such errors should not occur, so if you come across one, please let us know.