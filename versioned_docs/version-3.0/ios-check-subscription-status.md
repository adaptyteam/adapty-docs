---
title: "Check subscription status in iOS SDK"
description: "Learn how to check subscription status in your iOS app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
displayed_sidebar: sdkios
---

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call [`getProfile`](subscription-status.md) if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

To automatically receive profile updates in your app:

1. Extend `AdaptyDelegate` and implement the `didLoadLatestProfile` method - Adapty will automatically call this method whenever the user's subscription status changes.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

```swift
class SubscriptionManager: AdaptyDelegate {
    private var currentProfile: AdaptyProfile?
    
    init() {
        Adapty.delegate = self
    }
    
    // Store the profile when it updates
    nonisolated func didLoadLatestProfile(_ profile: AdaptyProfile) {
        self.currentProfile = profile
        // Update UI, unlock content, etc.
    }
    
    // Use stored profile instead of calling getProfile()
    func hasAccess() -> Bool {
        return currentProfile?.accessLevels["premium"]?.isActive ?? false
    }
}
```

:::note
Adapty automatically calls `didLoadLatestProfile` when your app starts, providing cached subscription data even if the device is offline.
:::