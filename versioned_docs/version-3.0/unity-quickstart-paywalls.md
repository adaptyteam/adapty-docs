---
title: "Present a paywall"
description: "Learn how to present paywalls in your Unity app with Adapty SDK."
metadataTitle: "Present a Paywall | Unity SDK | Adapty Docs"
slug: /unity-quickstart-paywalls
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Get paywalls

To get available paywalls:

```csharp
using Adapty;

var paywalls = await Adapty.GetPaywalls();
Debug.Log($"Available paywalls: {paywalls.Count}");
```

## Present paywall

To present a paywall to the user:

```csharp
// Get paywalls first
var paywalls = await Adapty.GetPaywalls();

// Present the first paywall
if (paywalls.Count > 0)
{
    var paywall = paywalls[0];
    await Adapty.PresentPaywall(paywall);
}
```

## Handle paywall presentation

You can also handle the paywall presentation manually:

```csharp
var paywalls = await Adapty.GetPaywalls();

if (paywalls.Count > 0)
{
    var paywall = paywalls[0];
    
    // Show your custom UI with paywall data
    // Then handle purchase when user taps buy
    var purchase = await Adapty.MakePurchase(paywall.Products[0]);
    Debug.Log($"Purchase successful: {purchase.PurchaseId}");
}
```

## Paywall observer

To listen for paywall presentation events:

```csharp
Adapty.OnPaywallPresented += (paywall) =>
{
    Debug.Log($"Paywall presented: {paywall.DeveloperId}");
};

Adapty.OnPaywallDismissed += (paywall) =>
{
    Debug.Log($"Paywall dismissed: {paywall.DeveloperId}");
};
``` 