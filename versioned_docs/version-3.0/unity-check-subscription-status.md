---
title: "Check the subscription status"
description: "Learn how to check subscription status in your Unity app with Adapty SDK."
metadataTitle: "Check Subscription Status | Unity SDK | Adapty Docs"
slug: /unity-check-subscription-status
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Get access level

To check if a user has access to premium content:

```csharp
using Adapty;

var profile = await Adapty.GetProfile();

if (profile.AccessLevels.ContainsKey("premium") && profile.AccessLevels["premium"].IsActive)
{
    // User has active premium subscription
    Debug.Log("Premium access granted");
}
else
{
    // User doesn't have premium access
    Debug.Log("Premium access denied");
}
```

## Check specific access level

You can check specific access levels:

```csharp
var profile = await Adapty.GetProfile();

// Check premium access
var hasPremium = profile.AccessLevels.ContainsKey("premium") && profile.AccessLevels["premium"].IsActive;

// Check pro access
var hasPro = profile.AccessLevels.ContainsKey("pro") && profile.AccessLevels["pro"].IsActive;

// Check any active subscription
var hasAnySubscription = profile.AccessLevels.Values.Any(level => level.IsActive);
```

## Listen for subscription changes

To listen for subscription status changes:

```csharp
Adapty.OnProfileUpdated += (profile) =>
{
    if (profile.AccessLevels.ContainsKey("premium") && profile.AccessLevels["premium"].IsActive)
    {
        Debug.Log("User gained premium access");
    }
    else
    {
        Debug.Log("User lost premium access");
    }
};
```

## Get subscription details

To get detailed subscription information:

```csharp
var profile = await Adapty.GetProfile();

// Get active subscriptions
var activeSubscriptions = profile.Subscriptions.Where(sub => sub.IsActive).ToList();

foreach (var subscription in activeSubscriptions)
{
    Debug.Log($"Product ID: {subscription.VendorProductId}");
    Debug.Log($"Expires at: {subscription.ExpiresDate}");
    Debug.Log($"Store: {subscription.Store}");
}
``` 