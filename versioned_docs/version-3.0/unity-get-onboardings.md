---
title: "Get onboardings"
description: "Learn how to get onboardings in your Unity app with Adapty SDK."
metadataTitle: "Get Onboardings | Unity SDK | Adapty Docs"
slug: /unity-get-onboardings
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Get onboardings

To get available onboardings from Adapty:

```csharp
using Adapty;

var onboardings = await Adapty.GetOnboardings();
Debug.Log($"Available onboardings: {onboardings.Count}");
```

## Get onboardings with options

You can specify options when getting onboardings:

```csharp
var onboardings = await Adapty.GetOnboardings(new AdaptyOnboardingOptions
{
    Locale = "en_US",
    LoadTimeout = 10000
});
```

## Onboarding structure

Each onboarding contains the following information:

```csharp
var onboardings = await Adapty.GetOnboardings();

foreach (var onboarding in onboardings)
{
    Debug.Log($"Onboarding ID: {onboarding.DeveloperId}");
    Debug.Log($"Onboarding name: {onboarding.Name}");
    Debug.Log($"Screens: {onboarding.Screens.Count}");
    Debug.Log($"Visual onboarding: {onboarding.VisualOnboarding != null}");
}
```

## Get specific onboarding

To get a specific onboarding by ID:

```csharp
var onboardings = await Adapty.GetOnboardings();
var specificOnboarding = onboardings.FirstOrDefault(o => o.DeveloperId == "welcome_onboarding");

if (specificOnboarding != null)
{
    Debug.Log($"Found onboarding: {specificOnboarding.Name}");
}
```

## Handle errors

Always handle potential errors when getting onboardings:

```csharp
try
{
    var onboardings = await Adapty.GetOnboardings();
    Debug.Log($"Onboardings loaded: {onboardings.Count}");
}
catch (Exception error)
{
    Debug.LogError($"Failed to get onboardings: {error.Message}");
    // Handle error appropriately
}
```

## Cache onboardings

Onboardings are cached locally for offline use:

```csharp
// Get onboardings (will use cache if available)
var onboardings = await Adapty.GetOnboardings();

// Force refresh from server
var freshOnboardings = await Adapty.GetOnboardings(new AdaptyOnboardingOptions
{
    ForceUpdate = true
});
```

## Onboarding observer

To listen for onboarding updates:

```csharp
Adapty.OnOnboardingsUpdated += (onboardings) =>
{
    Debug.Log($"Onboardings updated: {onboardings.Count}");
};

Adapty.OnOnboardingsLoaded += (onboardings) =>
{
    Debug.Log($"Onboardings loaded: {onboardings.Count}");
};
```

## Check onboarding availability

You can check if specific onboardings are available:

```csharp
var onboardings = await Adapty.GetOnboardings();

// Check if welcome onboarding is available
var hasWelcomeOnboarding = onboardings.Any(o => o.DeveloperId == "welcome_onboarding");

if (hasWelcomeOnboarding)
{
    Debug.Log("Welcome onboarding is available");
}
else
{
    Debug.Log("Welcome onboarding is not available");
}
```

## Filter onboardings

You can filter onboardings based on criteria:

```csharp
var onboardings = await Adapty.GetOnboardings();

// Get only active onboardings
var activeOnboardings = onboardings.Where(o => o.IsActive).ToList();

// Get onboardings for specific locale
var localizedOnboardings = onboardings.Where(o => 
    o.VisualOnboarding?.Localizations.Any(l => l.Locale == "en_US") == true
).ToList();
``` 