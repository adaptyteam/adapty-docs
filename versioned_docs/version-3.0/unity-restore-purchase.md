---
title: "Restore purchases"
description: "Learn how to restore purchases in your Unity app with Adapty SDK."
metadataTitle: "Restore Purchases | Unity SDK | Adapty Docs"
slug: /unity-restore-purchase
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Restore purchases

To restore purchases, use the `RestorePurchases` method:

```csharp
using Adapty;

try
{
    await Adapty.RestorePurchases();
    Debug.Log("Purchases restored successfully");
}
catch (Exception error)
{
    Debug.LogError($"Restore failed: {error.Message}");
}
```

## Check restored purchases

After restoring, check the user's profile for active subscriptions:

```csharp
await Adapty.RestorePurchases();

var profile = await Adapty.GetProfile();
var activeSubscriptions = profile.Subscriptions.Where(sub => sub.IsActive).ToList();

if (activeSubscriptions.Count > 0)
{
    Debug.Log($"Found active subscriptions: {activeSubscriptions.Count}");
    foreach (var sub in activeSubscriptions)
    {
        Debug.Log($"Product: {sub.VendorProductId}");
        Debug.Log($"Expires: {sub.ExpiresDate}");
    }
}
else
{
    Debug.Log("No active subscriptions found");
}
```

## Restore with progress

You can track restore progress:

```csharp
Adapty.OnRestoreStarted += () =>
{
    Debug.Log("Restore started");
    // Show loading indicator
};

Adapty.OnRestoreCompleted += (profile) =>
{
    Debug.Log("Restore completed");
    // Hide loading indicator
    // Update UI with restored purchases
};

Adapty.OnRestoreFailed += (error) =>
{
    Debug.LogError($"Restore failed: {error.Message}");
    // Hide loading indicator
    // Show error message
};

// Start restore
await Adapty.RestorePurchases();
```

## Handle restore errors

Handle different types of restore errors:

```csharp
try
{
    await Adapty.RestorePurchases();
}
catch (Exception error)
{
    Debug.LogError($"Restore error: {error.Message}");
}
```

## Restore UI integration

Integrate restore functionality into your UI:

```csharp
public class RestoreButton : MonoBehaviour
{
    public async void OnRestoreClicked()
    {
        try
        {
            await Adapty.RestorePurchases();
            var profile = await Adapty.GetProfile();
            
            if (profile.Subscriptions.Any(sub => sub.IsActive))
            {
                Debug.Log("Your purchases have been restored!");
            }
            else
            {
                Debug.Log("No active purchases found to restore.");
            }
        }
        catch (Exception error)
        {
            Debug.LogError("Failed to restore purchases. Please try again.");
        }
    }
}
```

## Automatic restore

You can automatically restore purchases on app launch:

```csharp
// In your app initialization
public async void InitializeApp()
{
    try
    {
        // Activate Adapty
        await Adapty.Activate();
        
        // Automatically restore purchases
        await Adapty.RestorePurchases();
        
        // Get updated profile
        var profile = await Adapty.GetProfile();
        Debug.Log($"App initialized with profile: {profile.ProfileId}");
    }
    catch (Exception error)
    {
        Debug.LogError($"App initialization failed: {error.Message}");
    }
}
``` 