---
title: "Check subscription status in iOS SDK"
description: "Learn how to check subscription status in your iOS app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
displayed_sidebar: sdkios
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To decide whether users can access paid content or see a paywall, you need to check their [access level](access-level.md) in the profile.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Get subscription status

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call `getProfile` if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

:::important
By default, the `premium` access level already exists in Adapty. If you don't need to set up more than one access level, you can just use `premium`. 
:::

### Get profile

The easiest way to get the subscription status is to use the `getProfile` method to access the profile:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
do {
    let profile = try await Adapty.getProfile()
    
    if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
        // grant access to premium features
    }
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
        profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
            // grant access to premium features
        }
    }
}
```
</TabItem>
</Tabs>

### Listen to subscription updates

If you want to automatically receive profile updates in your app:

1. Conform to the `AdaptyDelegate` protocol in a type of your choice and implement the `didLoadLatestProfile` method - Adapty will automatically call this method whenever the user's subscription status changes. In the example below we use a `SubscriptionManager` type to assist with handling subscription workflows and the user's profile. This type can be injected as a dependency or set up as a singleton in a UIKit app, or added to the SwiftUI environment from the app main struct.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

```swift
class SubscriptionManager: AdaptyDelegate {
    private var currentProfile: AdaptyProfile?
    
    nonisolated func didLoadLatestProfile(_ profile: AdaptyProfile) {
        self.currentProfile = profile
        // Update UI, unlock content, etc.
    }
    
    func hasAccess() -> Bool {
        return currentProfile?.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false
    }
}

// Set delegate after Adapty activation
Adapty.delegate = subscriptionManager
```

:::note
Adapty automatically calls `didLoadLatestProfile` when your app starts, providing cached subscription data even if the device is offline.
:::

## Connect profile with paywall logic

When you need to make immediate decisions about showing paywalls or granting access to paid features, you can check the user's profile directly. This approach is useful for scenarios like app launch, when entering premium sections, or before displaying specific content.

<Tabs>
<TabItem value="swiftui" label="SwiftUI" default>

```swift
private func checkAccessLevel() async -> Bool {
    do {
        let profile = try await Adapty.getProfile()
        return profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false
    } catch {
        print("Error checking access level: \(error)")
        return false
    }
}

// In your initialization logic:
let hasAccess = await checkAccessLevel()
if !hasAccess {
    paywallPresented = true // Show paywall if no access
}
```

</TabItem>
<TabItem value="uikit" label="UIKit">

```swift
private func checkAccessLevel() async throws -> Bool {
    let profile = try await Adapty.getProfile()
    return profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false
}

// In your initialization logic:
let hasAccess = try await checkAccessLevel()
if !hasAccess {
    presentPaywall(with: paywallConfiguration)
}
```

</TabItem>
</Tabs>

## Next steps

Now, when you know how to track the subscription status, [learn how to work with user profiles](ios-quickstart-identify.md) to ensure it aligns with your existing authentication system and paid access sharing permissions. 

If you don't have your own authentication system, that's not a problem at all, and Adapty will manage users for you, but you can still read the [guide](ios-quickstart-identify.md) to learn how Adapty works with anonymous users.