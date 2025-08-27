---
title: "Check subscription status in Unity SDK"
description: "Learn how to check subscription status in your Unity app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
displayed_sidebar: sdkunity
---

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call [`getProfile`](unity-listen-subscription-changes.md) if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Listen to subscription updates

To automatically receive profile updates in your app:

1. Extend `AdaptyEventListener` and implement the `OnLoadLatestProfile` method - Adapty will automatically call this method whenever the user's subscription status changes.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

```csharp
public class SubscriptionManager : MonoBehaviour, AdaptyEventListener {
    private AdaptyProfile currentProfile;
    
    void Start() {
        // Register this object as an Adapty event listener
        Adapty.AddEventListener(this);
    }
    
    // Store the profile when it updates
    public void OnLoadLatestProfile(AdaptyProfile profile) {
        currentProfile = profile;
        // Update UI, unlock content, etc.
    }
    
    // Use stored profile instead of calling getProfile()
    public bool HasAccess() {
        if (currentProfile?.AccessLevels != null && 
            currentProfile.AccessLevels.ContainsKey("premium")) {
            return currentProfile.AccessLevels["premium"].IsActive;
        }
        return false;
    }
}
```

:::note
Adapty automatically calls `OnLoadLatestProfile` when your app starts, providing cached subscription data even if the device is offline.
:::

## Connect profile with paywall logic

When you need to make immediate decisions about showing paywalls or granting access to paid features, you can check the user's profile directly. This approach is useful for scenarios like app launch, when entering premium sections, or before displaying specific content.

```csharp
using System;
using UnityEngine;

public class PaywallManager : MonoBehaviour
{
    [SerializeField] private string placementId = "YOUR_PLACEMENT_ID";
    
    void Start()
    {
        InitializePaywall();
    }
    
    private void InitializePaywall()
    {
        // Load paywall configuration
        LoadPaywall();
        
        // Check if user has access to premium features
        CheckAccessLevel();
    }
    
    private void CheckAccessLevel()
    {
        Adapty.GetProfile((profile, error) => {
            if (error != null) {
                Debug.LogError("Error checking access level: " + error.Message);
                ShowPaywall(); // Show paywall if access check fails
                return;
            }
            
            var accessLevel = profile.AccessLevels["premium"];
            if (accessLevel == null || !accessLevel.IsActive) {
                ShowPaywall(); // Show paywall if no access
            }
        });
    }
    
    private void LoadPaywall()
    {
        // Load paywall configuration
        // ... paywall loading logic
    }
    
    private void ShowPaywall()
    {
        // Present paywall
        // ... paywall presentation logic
    }
}
``` 