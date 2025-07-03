---
title: "Listen for subscription status changes"
description: "Learn how to listen for subscription status changes in your Unity app with Adapty SDK."
metadataTitle: "Listen for Subscription Changes | Unity SDK | Adapty Docs"
slug: /unity-listen-subscription-changes
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Profile observer

To listen for subscription status changes, use the `OnProfileUpdated` event:

```csharp
using Adapty;

Adapty.OnProfileUpdated += (profile) =>
{
    Debug.Log($"Profile updated: {profile.ProfileId}");
    
    // Check if premium access changed
    if (profile.AccessLevels.ContainsKey("premium") && profile.AccessLevels["premium"].IsActive)
    {
        Debug.Log("User gained premium access");
        // Enable premium features
    }
    else
    {
        Debug.Log("User lost premium access");
        // Disable premium features
    }
};

Adapty.OnProfileLoaded += (profile) =>
{
    Debug.Log($"Profile loaded: {profile.ProfileId}");
};
```

## Check access levels

You can check specific access levels when the profile updates:

```csharp
Adapty.OnProfileUpdated += (profile) =>
{
    // Check premium access
    var hasPremium = profile.AccessLevels.ContainsKey("premium") && profile.AccessLevels["premium"].IsActive;
    
    // Check pro access
    var hasPro = profile.AccessLevels.ContainsKey("pro") && profile.AccessLevels["pro"].IsActive;
    
    // Check any active subscription
    var hasAnySubscription = profile.AccessLevels.Values.Any(level => level.IsActive);
    
    Debug.Log($"Premium: {hasPremium}");
    Debug.Log($"Pro: {hasPro}");
    Debug.Log($"Any subscription: {hasAnySubscription}");
};
```

## Handle subscription changes

React to subscription changes in your app:

```csharp
Adapty.OnProfileUpdated += (profile) =>
{
    var hasPremium = profile.AccessLevels.ContainsKey("premium") && profile.AccessLevels["premium"].IsActive;
    
    if (hasPremium)
    {
        // User gained premium access
        EnablePremiumFeatures();
        ShowPremiumWelcomeMessage();
    }
    else
    {
        // User lost premium access
        DisablePremiumFeatures();
        ShowUpgradePrompt();
    }
};

private void EnablePremiumFeatures()
{
    // Enable premium features in your app
}

private void DisablePremiumFeatures()
{
    // Disable premium features in your app
}
```

## Clean up observer

Don't forget to clean up the observer when it's no longer needed:

```csharp
// In MonoBehaviour
void OnDestroy()
{
    Adapty.OnProfileUpdated -= HandleProfileUpdate;
    Adapty.OnProfileLoaded -= HandleProfileLoaded;
}

private void HandleProfileUpdate(AdaptyProfile profile)
{
    // Handle profile updates
}

private void HandleProfileLoaded(AdaptyProfile profile)
{
    // Handle profile loaded
}
```

## Manual profile refresh

You can also manually refresh the profile:

```csharp
var profile = await Adapty.GetProfile();
Debug.Log($"Current profile: {profile.ProfileId}");
``` 