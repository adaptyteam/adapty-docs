---
title: "Display paywalls"
description: "Learn how to display paywalls in your Unity app with Adapty SDK."
metadataTitle: "Display Paywalls | Unity SDK | Adapty Docs"
slug: /unity-present-paywalls
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide covers the **new Paywall Builder**, which requires Adapty SDK 3.3.0 or later. If you're using the legacy Paywall Builder (compatible with Adapty SDK version 2.x and earlier), check out [Present legacy Paywall Builder paywalls in Unity](unity-present-paywalls-legacy).

To present remote config paywalls, see [Render paywalls designed with remote config](present-remote-config-paywalls).

:::

To display a paywall, use the `view.Present()` method on the `view` created by the `CreateView` method. Each `view` can only be used once. If you need to display the paywall again, call `createView` one more to create a new `view` instance. 

:::warning

Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

```csharp showLineNumbers title="Unity"
view.Present((error) => {
  // handle the error
});
```

<SampleApp />

## Present paywall

To present a paywall to the user:

```csharp
using Adapty;

// Get paywalls first
var paywalls = await Adapty.GetPaywalls();

// Present the first paywall
if (paywalls.Count > 0)
{
    var paywall = paywalls[0];
    await Adapty.PresentPaywall(paywall);
}
```

## Present specific paywall

To present a specific paywall by ID:

```csharp
var paywalls = await Adapty.GetPaywalls();
var premiumPaywall = paywalls.FirstOrDefault(p => p.DeveloperId == "premium_paywall");

if (premiumPaywall != null)
{
    await Adapty.PresentPaywall(premiumPaywall);
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

## Custom paywall UI

You can create custom paywall UI using the paywall data:

```csharp
public class CustomPaywallUI : MonoBehaviour
{
    public async void ShowPaywall(string paywallId)
    {
        var paywalls = await Adapty.GetPaywalls();
        var paywall = paywalls.FirstOrDefault(p => p.DeveloperId == paywallId);
        
        if (paywall != null)
        {
            // Update UI with paywall data
            UpdatePaywallUI(paywall);
        }
    }
    
    private void UpdatePaywallUI(AdaptyPaywall paywall)
    {
        // Update your UI elements with paywall data
        // Title, description, products, etc.
    }
}
```