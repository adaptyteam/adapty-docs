---
title: "Use fallback paywalls"
description: "Handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Work with Paywalls Offline | Unity SDK | Adapty Docs"
slug: /unity-use-fallback-paywalls
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

## Fallback paywalls

Fallback paywalls allow your app to work offline by using locally cached paywall data.

## Set fallback paywalls

To set fallback paywalls for offline use:

```csharp
using Adapty;

// Set fallback paywalls
var fallbackPaywalls = new List<AdaptyPaywall>
{
    // Your fallback paywall data
};
Adapty.SetFallback(fallbackPaywalls);
```

## Use fallback paywalls

When network is unavailable, Adapty automatically uses fallback paywalls:

```csharp
try
{
    var paywalls = await Adapty.GetPaywalls();
    // Use online paywalls
}
catch (Exception error)
{
    Debug.Log("Using fallback paywalls due to network error");
    // Adapty will automatically use fallback paywalls
}
```

## Cache paywalls locally

Paywalls are automatically cached for offline use:

```csharp
// Get paywalls (will be cached automatically)
var paywalls = await Adapty.GetPaywalls();

// Later, when offline, these cached paywalls will be used
var cachedPaywalls = await Adapty.GetPaywalls();
```

## Handle offline scenarios

Handle cases when the app is offline:

```csharp
public class PaywallManager : MonoBehaviour
{
    public async void ShowPaywall()
    {
        try
        {
            var paywalls = await Adapty.GetPaywalls();
            await Adapty.PresentPaywall(paywalls[0]);
        }
        catch (Exception error)
        {
            Debug.Log("Network error, using cached paywalls");
            // Adapty will use cached paywalls automatically
        }
    }
}
```

<SampleApp />