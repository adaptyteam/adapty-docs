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
This guide is for **new Paywall Builder paywalls** only which require Adapty SDK v3.3.0 or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Handle paywall events designed with legacy Paywall Builder](react-native-handling-events-legacy).
:::

<SampleApp />

### User-generated events

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

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](unity-listen-subscription-changes.md) topic to learn how to check it.

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

## Paywall observer

To handle paywall events, use the `Adapty` event handlers:

```csharp
using Adapty;

Adapty.OnPaywallPresented += (paywall) =>
{
    Debug.Log($"Paywall presented: {paywall.DeveloperId}");
};

Adapty.OnPaywallDismissed += (paywall) =>
{
    Debug.Log($"Paywall dismissed: {paywall.DeveloperId}");
};
```

## Handle paywall actions

Paywalls can trigger various actions:

```csharp
Adapty.OnPaywallAction += (action) =>
{
    switch (action.Type)
    {
        case "close":
            Debug.Log("User closed paywall");
            break;
        case "purchase":
            Debug.Log("User initiated purchase");
            HandlePurchase(action.ProductId);
            break;
        case "restore":
            Debug.Log("User initiated restore");
            HandleRestore();
            break;
        case "custom":
            Debug.Log($"Custom action: {action.Data}");
            HandleCustomAction(action.Data);
            break;
    }
};
```

## Track paywall interactions

Track user interactions with paywalls:

```csharp
Adapty.OnPaywallPresented += (paywall) =>
{
    Debug.Log($"User viewed paywall: {paywall.DeveloperId}");
    
    // Track analytics
    TrackPaywallView(paywall.DeveloperId);
};

Adapty.OnPaywallDismissed += (paywall) =>
{
    Debug.Log($"User dismissed paywall: {paywall.DeveloperId}");
    
    // Track analytics
    TrackPaywallDismiss(paywall.DeveloperId);
};
```

## Handle purchase events

When user makes a purchase through paywall:

```csharp
Adapty.OnPaywallAction += async (action) =>
{
    if (action.Type == "purchase")
    {
        try
        {
            var paywalls = await Adapty.GetPaywalls();
            var paywall = paywalls.FirstOrDefault(p => p.DeveloperId == action.PaywallId);
            var product = paywall?.Products.FirstOrDefault(p => p.VendorProductId == action.ProductId);
            
            if (product != null)
            {
                var purchase = await Adapty.MakePurchase(product);
                Debug.Log($"Purchase successful: {purchase.PurchaseId}");
                // Close paywall and update UI
            }
        }
        catch (Exception error)
        {
            Debug.LogError($"Purchase failed: {error.Message}");
        }
    }
};
```

## Custom paywall actions

Handle custom actions defined in your paywall:

```csharp
Adapty.OnPaywallAction += (action) =>
{
    if (action.Type == "custom")
    {
        switch (action.Data["action"])
        {
            case "open_settings":
                OpenAppSettings();
                break;
            case "contact_support":
                OpenSupportChat();
                break;
            case "skip_paywall":
                SkipPaywall();
                break;
            default:
                Debug.Log($"Unknown custom action: {action.Data}");
                break;
        }
    }
};
```

## Paywall state management

Manage paywall state in your app:

```csharp
public class PaywallManager : MonoBehaviour
{
    private AdaptyPaywall currentPaywall;
    
    void Start()
    {
        Adapty.OnPaywallPresented += (paywall) =>
        {
            currentPaywall = paywall;
            Debug.Log($"Paywall presented: {paywall.DeveloperId}");
        };
        
        Adapty.OnPaywallDismissed += (paywall) =>
        {
            if (currentPaywall?.DeveloperId == paywall.DeveloperId)
            {
                currentPaywall = null;
            }
            Debug.Log($"Paywall dismissed: {paywall.DeveloperId}");
        };
    }
}
```

## Error handling

Handle paywall errors:

```csharp
Adapty.OnPaywallError += (error) =>
{
    Debug.LogError($"Paywall error: {error.Message}");
    
    switch (error.Code)
    {
        case "LOAD_ERROR":
            Debug.Log("Failed to load paywall");
            ShowFallbackPaywall();
            break;
        case "PRESENTATION_ERROR":
            Debug.Log("Failed to present paywall");
            break;
        default:
            Debug.Log($"Unknown paywall error: {error.Code}");
            break;
    }
};
```

## Clean up events

Don't forget to clean up event handlers:

```csharp
void OnDestroy()
{
    Adapty.OnPaywallPresented -= HandlePaywallPresented;
    Adapty.OnPaywallDismissed -= HandlePaywallDismissed;
    Adapty.OnPaywallAction -= HandlePaywallAction;
    Adapty.OnPaywallError -= HandlePaywallError;
}

private void HandlePaywallPresented(AdaptyPaywall paywall)
{
    // Handle paywall presented
}

private void HandlePaywallDismissed(AdaptyPaywall paywall)
{
    // Handle paywall dismissed
}

private void HandlePaywallAction(AdaptyPaywallAction action)
{
    // Handle paywall action
}

private void HandlePaywallError(AdaptyError error)
{
    // Handle paywall error
}
```