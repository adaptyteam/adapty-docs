---
title: "Present remote config paywalls"
description: "Display paywalls designed with remote config in your Unity app."
metadataTitle: "Present remote config paywalls | Unity SDK | Adapty Docs"
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can present paywalls that are designed using remote config in your Unity app. This allows you to create and modify paywalls without updating your app.

## Get paywalls

First, fetch the paywalls data from Adapty:

```csharp
Adapty.GetPaywalls((result) => {
    if (result.IsSuccess) {
        var paywalls = result.Value;
        // Present paywall
    } else {
        // Handle error
    }
});
```

## Present paywall

Use the `Adapty.PresentPaywall()` method to display a paywall:

```csharp
Adapty.PresentPaywall(paywall, (result) => {
    if (result.IsSuccess) {
        var purchase = result.Value;
        // Handle successful purchase
    } else {
        // Handle error
    }
});
```

## Handle paywall events

You can listen for paywall events to track user interactions:

```csharp
Adapty.SetPaywallListener((event) => {
    switch (event) {
        case AdaptyPaywallShownEvent:
            // Paywall was displayed
            break;
        case AdaptyPaywallClosedEvent:
            // Paywall was closed
            break;
        case AdaptyPurchaseStartedEvent:
            // Purchase process started
            break;
        case AdaptyPurchaseCancelledEvent:
            // Purchase was cancelled
            break;
        case AdaptyPurchaseCompletedEvent:
            // Purchase completed successfully
            break;
        case AdaptyPurchaseFailedEvent:
            // Purchase failed
            break;
    }
});
```

## Customize paywall presentation

You can customize how the paywall is presented:

```csharp
var options = new AdaptyPaywallPresentationOptions {
    Style = AdaptyPaywallStyle.Modal, // or Sheet
    Animated = true
};

Adapty.PresentPaywall(paywall, options, (result) => {
    // Handle result
});
```

## Handle purchase results

After a successful purchase, you'll receive a purchase object:

```csharp
Adapty.PresentPaywall(paywall, (result) => {
    if (result.IsSuccess) {
        var purchase = result.Value;
        // Access purchase details
        var productId = purchase.ProductId;
        var transactionId = purchase.TransactionId;
        var purchaseDate = purchase.PurchaseDate;
    } else {
        // Handle purchase error
    }
});
```

## Error handling

Handle various error scenarios:

```csharp
Adapty.PresentPaywall(paywall, (result) => {
    if (result.IsSuccess) {
        // Handle success
    } else {
        var error = result.Error;
        if (error is AdaptyPurchaseCancelledError) {
            // User cancelled the purchase
        } else if (error is AdaptyPurchaseFailedError) {
            // Purchase failed
        } else if (error is AdaptyNetworkError) {
            // Network issues
        } else {
            // Other errors
        }
    }
});
```

## Next steps

After presenting paywalls, you can:

1. [Handle paywall events](/unity-handling-events)
2. [Check subscription status](/unity-check-subscription-status)
3. [Restore purchases](/unity-restore-purchase) 