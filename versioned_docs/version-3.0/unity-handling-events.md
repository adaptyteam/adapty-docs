---
title: "Handle paywall events"
description: "Learn how to handle paywall events in your Unity app with Adapty SDK."
metadataTitle: "Handle Paywall Events | Unity SDK | Adapty Docs"
slug: /unity-handling-events
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import PaywallAction from '@site/src/components/reusable/PaywallAction.md';
import Details from '@site/src/components/Details';

:::important
This guide covers event handling for purchases, restorations, product selection, and paywall rendering. You must also implement button handling (closing paywall, opening links, etc.). See our [guide on handling button actions](unity-handle-paywall-actions.md) for details.
:::

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning
This guide is for **new Paywall Builder paywalls** only which require Adapty SDK v3.3.0 or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Handle paywall events designed with legacy Paywall Builder](unity-handling-events-legacy).
:::

<SampleApp />

## Handling events

To control or monitor processes occurring on the paywall screen within your mobile app, implement the `AdaptyPaywallsEventsListener` interface:

```csharp showLineNumbers title="Unity"
using UnityEngine;
using AdaptySDK;

public class PaywallEventsHandler : MonoBehaviour, AdaptyPaywallsEventsListener
{
    void Start()
    {
        Adapty.SetPaywallsEventsListener(this);
    }

    // Implement all required interface methods below
}
```

### User-generated events

#### Paywall appeared

Invoked when the paywall view is presented on the screen.

:::note
On iOS, also invoked when a user taps the [web paywall button](web-paywall#step-2a-add-a-web-purchase-button) inside a paywall, and a web paywall opens in an in-app browser.
:::

```csharp showLineNumbers title="Unity"
public void PaywallViewDidAppear(AdaptyUIPaywallView view) { }
```

#### Paywall disappeared

Invoked when the paywall view is dismissed from the screen.

:::note
On iOS, also invoked when a [web paywall](web-paywall#step-2a-add-a-web-purchase-button) opened from a paywall in an in-app browser disappears from the screen.
:::

```csharp showLineNumbers title="Unity"
public void PaywallViewDidDisappear(AdaptyUIPaywallView view) { }
```

#### Product selection

Invoked when a product is selected for purchase (by a user or by the system).

```csharp showLineNumbers title="Unity"
public void PaywallViewDidSelectProduct(
    AdaptyUIPaywallView view, 
    string productId
) { }
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

Invoked when a user initiates the purchase process.

```csharp showLineNumbers title="Unity"
public void PaywallViewDidStartPurchase(
    AdaptyUIPaywallView view, 
    AdaptyPaywallProduct product
) { }
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

#### Successful, canceled, or pending purchase

If purchase succeeds, the user cancels their purchase, or the purchase appears to be pending, this method will be invoked. User cancellations and pending payments (e.g., parental approval required) trigger this method, not `PaywallViewDidFailPurchase`.

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFinishPurchase(
    AdaptyUIPaywallView view, 
    AdaptyPaywallProduct product, 
    AdaptyPurchaseResult purchasedResult
) { }
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
    "type": "Success",
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

// Cancelled purchase
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
    "type": "UserCancelled"
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
    "type": "Pending"
  }
}
```
</Details>

We recommend dismissing the screen in that case.

#### Failed purchase

If a purchase fails due to an error, this method will be invoked. This includes StoreKit/Google Play Billing errors (payment restrictions, invalid products, network failures), transaction verification failures, and system errors. Note that user cancellations trigger `PaywallViewDidFinishPurchase` with a cancelled result instead, and pending payments do not trigger this method.

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailPurchase(
    AdaptyUIPaywallView view, 
    AdaptyPaywallProduct product, 
    AdaptyError error
) { }
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

#### Started restore

Invoked when a user initiates the restore process:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidStartRestore(AdaptyUIPaywallView view) { }
```

#### Successful restore

Invoked when purchase restoration succeeds:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFinishRestore(
    AdaptyUIPaywallView view, 
    AdaptyProfile profile
) { }
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

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](unity-listen-subscription-changes.md) topic to learn how to check it.

#### Failed restore

Invoked when purchase restoration fails:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailRestore(
    AdaptyUIPaywallView view, 
    AdaptyError error
) { }
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

#### Finished web payment navigation

After attempting to open a [web paywall](web-paywall) for purchase (whether successful or failed), this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFinishWebPaymentNavigation(
    AdaptyUIPaywallView view, 
    AdaptyPaywallProduct product, 
    AdaptyError error
) { }
```

**Parameters:**
- `product`: The product for which the web paywall was opened (or attempted)
- `error`: `null` if the web paywall opened successfully, or an `AdaptyError` if it failed

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
    "code": "wrong_param",
    "message": "Current method is not available for this product",
    "details": {
      "underlyingError": "Product not configured for web purchases"
    }
  }
}
```
</Details>

### Data fetching and rendering

#### Product loading errors

Invoked when product loading fails and provides `AdaptyError`. If you didn't pass the product array during initialization, AdaptyUI will retrieve the necessary objects from the server by itself. This operation may fail, and AdaptyUI will report the error by invoking this method:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailLoadingProducts(
    AdaptyUIPaywallView view, 
    AdaptyError error
) { }
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

Invoked when an error occurs during interface rendering and provides `AdaptyError`:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailRendering(
    AdaptyUIPaywallView view, 
    AdaptyError error
) { }
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

