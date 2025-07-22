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

To automatically receive profile updates in your app:

1. Conform to the `AdaptyDelegate` protocol in a type of your choice and implement the `didLoadLatestProfile` method - Adapty will automatically call this method whenever the user's subscription status changes. In the example below we use a `SubscriptionManager` type to assist with handling subscription workflows and the user's profile. This type can be injected as a dependency or set up as a singleton in a UIKit app, or added to the SwiftUI environment from the app main struct.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

```swift
// Declare a state variable for SwiftUI to inject into environment, or init manager and inject into view hierarchy in UIKit app
@State private var subscriptionManager = SubscriptionManager()

// Adapty init code to be placed in the App or Scene Delegate of a UIKit application, or the app main struct
Task {
	do {
    	let config = AdaptyConfiguration.builder(
    		withAPIKey: "Adapty SDK key goes here"
    	)
    	.build()
    	try await Adapty.activate(with: config)
    	Adapty.delegate = subscriptionManager // Step 1
    } catch {
        print("Adapty activation failed: ", error)
    }
} 

class SubscriptionManager: AdaptyDelegate {
    private var currentProfile: AdaptyProfile?
    
    // Store the profile when it updates
    nonisolated func didLoadLatestProfile(_ profile: AdaptyProfile) {
        self.currentProfile = profile // Step 2
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