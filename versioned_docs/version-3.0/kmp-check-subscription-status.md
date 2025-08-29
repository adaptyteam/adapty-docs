---
title: "Check subscription status in Kotlin Multiplatform SDK"
description: "Learn how to check subscription status in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
keywords: ['getProfile', 'subscription status']
rank: 95
displayed_sidebar: sdkkmp
---

To decide whether users can access paid content or see a paywall, you need to check their [access level](access-level.md) in the profile.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Get subscription status

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call `getProfile` if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

### Get profile

The easiest way to get the subscription status is to use the `getProfile` method to access the profile:

```kotlin showLineNumbers
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // check the access
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

### Listen to subscription updates

To automatically receive profile updates in your app:

1. Use `Adapty.setOnProfileUpdatedListener()` to listen for profile changes - Adapty will automatically call this method whenever the user's subscription status changes.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

```kotlin showLineNumbers
class SubscriptionManager {
    private var currentProfile: AdaptyProfile? = null
    
    init {
        // Listen for profile updates
        Adapty.setOnProfileUpdatedListener { profile ->
            currentProfile = profile
            // Update UI, unlock content, etc.
        }
    }
    
    // Use stored profile instead of calling getProfile()
    fun hasAccess(): Boolean {
        return currentProfile?.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true
    }
}
```

:::note
Adapty automatically calls the profile update listener when your app starts, providing cached subscription data even if the device is offline.
:::

## Connect profile with paywall logic

When you need to make immediate decisions about showing paywalls or granting access to paid features, you can check the user's profile directly. This approach is useful for scenarios like app launch, when entering premium sections, or before displaying specific content.

```kotlin showLineNumbers
private fun initializePaywall() {
    loadPaywall { paywallView ->
        checkAccessLevel { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    if (!result.value && paywallView != null) {
                        // Show paywall if no access
                        // Implementation depends on your app's UI framework
                    }
                }
                is AdaptyResult.Error -> {
                    if (paywallView != null) {
                        // Show paywall if access check fails
                        // Implementation depends on your app's UI framework
                    }
                }
            }
        }
    }
}

private fun checkAccessLevel(callback: (AdaptyResult<Boolean>) -> Unit) {
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val hasAccess = result.value.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true
                callback(AdaptyResult.Success(hasAccess))
            }
            is AdaptyResult.Error -> {
                callback(AdaptyResult.Error(result.error))
            }
        }
    }
}
```

## Next steps

Now, when you know how to track the subscription status, learn how to [work with user profiles](kmp-quickstart-identify.md) to ensure they can access what they have paid for.
