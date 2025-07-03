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

#### Started purchase

If a user initiates the purchase process, this method will be invoked.

```csharp showLineNumbers title="Unity"
public void PaywallViewDidStartPurchase(
  AdaptyUIView view, 
  AdaptyPaywallProduct product
) { }
```

#### Successful or canceled purchase

If `Adapty.MakePurchase()` succeeds, the user cancels their purchase or the purchase appears to be pending, this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFinishPurchase(
  AdaptyUIView view, 
  AdaptyPaywallProduct product, 
  AdaptyPurchaseResult purchasedResult
) { }
```

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

#### Successful restore

If `Adapty.RestorePurchases()` succeeds, this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFinishRestore(
  AdaptyUIView view, 
  AdaptyProfile profile
) { }
```

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

#### Failed restore

If `Adapty.RestorePurchases()` fails, this method will be invoked:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailRestore(
  AdaptyUIView view, 
  AdaptyError error
) { }
```

### Data fetching and rendering

#### Product loading errors

If you didn't pass the product array during initialization, AdaptyUI will retrieve the necessary objects from the server by itself. In this case, this operation may fail, and AdaptyUI will report the error by invoking this method:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailLoadingProducts(
  AdaptyUIView view, 
  AdaptyError error
) { }
```

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by calling this method:

```csharp showLineNumbers title="Unity"
public void PaywallViewDidFailRendering(
  AdaptyUIView view, 
  AdaptyError error
) { }
```

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