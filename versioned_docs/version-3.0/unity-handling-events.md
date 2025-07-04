---
title: "Unity - Handle paywall events"
description: "Handle events in Unity using Adapty to track and manage subscriptions."
metadataTitle: "Handling Events in Unity with Adapty | Adapty Docs"
toc_max_heading_level: 4
keywords: ['paywallViewDidPerformAction', 'paywallViewDidSelectProduct', 'paywallViewDidStartPurchase', 'paywallViewDidFinishPurchase', 'paywallViewDidFailPurchase', 'paywallViewDidFinishRestore', 'paywallViewDidFailRestore', 'paywallViewDidFailLoadingProducts', 'paywallViewDidFailRendering']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 
import Details from '@site/src/components/Details';

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning
This guide is for **new Paywall Builder paywalls** only which require Adapty SDK v3.3.0 or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Handle paywall events designed with legacy Paywall Builder](react-native-handling-events-legacy).
:::

<SampleApp />

### User-generated events

#### Actions

If a user has performed some action, this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidPerformAction(
  AdaptyUIView view, 
  AdaptyUIUserAction action
) {
  switch (action.Type) {
    case AdaptyUIUserActionType.Close:
      view.Dismiss(null);
      break;
    case AdaptyUIUserActionType.OpenUrl:
      var urlString = action.Value;
      if (urlString != null {
      	Application.OpenURL(urlString); 
      }
    default:
      // handle other events
      break;
  }
}
```

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// Close action
{
  "actionType": "Close"
}

// Open URL action
{
  "actionType": "OpenUrl",
  "value": "https://example.com/terms"
}

// Custom action
{
  "actionType": "Custom",
  "value": "login"
}

// System back action
{
  "actionType": "SystemBack"
}
```
</Details>

The following action types are supported:

- `Close`
- `OpenUrl`
- `Custom`
- `SystemBack`. 

 At the very least you need to implement the reactions to both `close` and `openURL`.

For example, if a user taps the close button, the action `Close` will occur and you are supposed to dismiss the paywall.  
Note that `AdaptyUIUserAction` has optional value property: look at this in the case of `OpenUrl` and `Custom`.

> 💡 Login Action
> 
> If you have configured Login Action in the dashboard, you should implement reaction for `Custom` action with value `"login"`

#### Product selection

If a product was selected for purchase (by a user or by the system), this method will be invoked.

```csharp showLineNumbers title="Unity"
public void PaywallViewDidSelectProduct(
  AdaptyUIView view, 
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

If a user initiates the purchase process, this method will be invoked.

```csharp showLineNumbers title="Unity"
public void PaywallViewDidStartPurchase(
  AdaptyUIView view, 
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

#### Successful or canceled purchase

If `Adapty.MakePurchase()` succeeds, the user cancels their purchase or the purchase appears to be pending, this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFinishPurchase(
  AdaptyUIView view, 
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
    "type": "Cancelled"
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

If `Adapty.MakePurchase()` fails, this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailPurchase(
  AdaptyUIView view, 
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

#### Successful restore

If `Adapty.RestorePurchases()` succeeds, this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFinishRestore(
  AdaptyUIView view, 
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

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

#### Failed restore

If `Adapty.RestorePurchases()` fails, this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailRestore(
  AdaptyUIView view, 
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

### Data fetching and rendering

#### Product loading errors

If you didn't pass the product array during initialization, AdaptyUI will retrieve the necessary objects from the server by itself. In this case, this operation may fail, and AdaptyUI will report the error by invoking this method:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailLoadingProducts(
  AdaptyUIView view, 
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

If an error occurs during the interface rendering, it will be reported by calling this method:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailRendering(
  AdaptyUIView view, 
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