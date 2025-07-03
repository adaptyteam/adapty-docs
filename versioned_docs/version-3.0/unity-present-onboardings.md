---
title: "Display onboardings"
description: "Learn how to display onboardings in your Unity app with Adapty SDK."
metadataTitle: "Display Onboardings | Unity SDK | Adapty Docs"
slug: /unity-present-onboardings
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Present onboarding

To present an onboarding to the user:

```csharp
using Adapty;

// Get onboardings first
var onboardings = await Adapty.GetOnboardings();

// Present the first onboarding
if (onboardings.Count > 0)
{
    var onboarding = onboardings[0];
    await Adapty.PresentOnboarding(onboarding);
}
```

## Present specific onboarding

To present a specific onboarding by ID:

```csharp
var onboardings = await Adapty.GetOnboardings();
var welcomeOnboarding = onboardings.FirstOrDefault(o => o.DeveloperId == "welcome_onboarding");

if (welcomeOnboarding != null)
{
    await Adapty.PresentOnboarding(welcomeOnboarding);
}
```

## Handle onboarding presentation

You can also handle the onboarding presentation manually:

```csharp
var onboardings = await Adapty.GetOnboardings();

if (onboardings.Count > 0)
{
    var onboarding = onboardings[0];
    // Show your custom UI with onboarding data
    UpdateOnboardingUI(onboarding);
}

private void UpdateOnboardingUI(AdaptyOnboarding onboarding)
{
    // Update your UI elements with onboarding data
    // Title, description, screens, etc.
}
```

## Onboarding observer

To listen for onboarding presentation events:

```csharp
Adapty.OnOnboardingPresented += (onboarding) =>
{
    Debug.Log($"Onboarding presented: {onboarding.DeveloperId}");
};

Adapty.OnOnboardingDismissed += (onboarding) =>
{
    Debug.Log($"Onboarding dismissed: {onboarding.DeveloperId}");
};
``` 