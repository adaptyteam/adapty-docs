---
title: "Get paywalls"
description: "Learn how to get paywalls in your Unity app with Adapty SDK."
metadataTitle: "Get Paywalls | Unity SDK | Adapty Docs"
slug: /unity-get-pb-paywalls
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Get paywalls

To get available paywalls from Adapty:

```csharp
using Adapty;

var paywalls = await Adapty.GetPaywalls();
Debug.Log($"Available paywalls: {paywalls.Count}");
```

## Get paywalls with options

You can specify options when getting paywalls:

```csharp
var paywalls = await Adapty.GetPaywalls(new AdaptyPaywallOptions
{
    Locale = "en_US",
    LoadTimeout = 10000
});
```

## Paywall structure

Each paywall contains the following information:

```csharp
var paywalls = await Adapty.GetPaywalls();

foreach (var paywall in paywalls)
{
    Debug.Log($"Paywall ID: {paywall.DeveloperId}");
    Debug.Log($"Paywall name: {paywall.Name}");
    Debug.Log($"Products: {paywall.Products.Count}");
    Debug.Log($"Visual paywall: {paywall.VisualPaywall != null}");
}
```

## Get specific paywall

To get a specific paywall by ID:

```csharp
var paywalls = await Adapty.GetPaywalls();
var specificPaywall = paywalls.FirstOrDefault(p => p.DeveloperId == "premium_paywall");

if (specificPaywall != null)
{
    Debug.Log($"Found paywall: {specificPaywall.Name}");
}
```

## Handle errors

Always handle potential errors when getting paywalls:

```csharp
try
{
    var paywalls = await Adapty.GetPaywalls();
    Debug.Log($"Paywalls loaded: {paywalls.Count}");
}
catch (Exception error)
{
    Debug.LogError($"Failed to get paywalls: {error.Message}");
    // Handle error appropriately
}
```

## Cache paywalls

Paywalls are cached locally for offline use:

```csharp
// Get paywalls (will use cache if available)
var paywalls = await Adapty.GetPaywalls();

// Force refresh from server
var freshPaywalls = await Adapty.GetPaywalls(new AdaptyPaywallOptions
{
    ForceUpdate = true
});
```

## Paywall observer

To listen for paywall updates:

```csharp
Adapty.OnPaywallsUpdated += (paywalls) =>
{
    Debug.Log($"Paywalls updated: {paywalls.Count}");
};

Adapty.OnPaywallsLoaded += (paywalls) =>
{
    Debug.Log($"Paywalls loaded: {paywalls.Count}");
};
```

## Check paywall availability

You can check if specific paywalls are available:

```csharp
var paywalls = await Adapty.GetPaywalls();

// Check if premium paywall is available
var hasPremiumPaywall = paywalls.Any(p => p.DeveloperId == "premium_paywall");

if (hasPremiumPaywall)
{
    Debug.Log("Premium paywall is available");
}
else
{
    Debug.Log("Premium paywall is not available");
}
```

## Filter paywalls

You can filter paywalls based on criteria:

```csharp
var paywalls = await Adapty.GetPaywalls();

// Get only active paywalls
var activePaywalls = paywalls.Where(p => p.IsActive).ToList();

// Get paywalls for specific locale
var localizedPaywalls = paywalls.Where(p => 
    p.VisualPaywall?.Localizations.Any(l => l.Locale == "en_US") == true
).ToList();
``` 