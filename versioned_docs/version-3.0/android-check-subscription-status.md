---
title: "Check subscription status in Android SDK"
description: "Learn how to check subscription status in your Android app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call [`getProfile`](android-subscription-status.md) if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

To automatically receive profile updates in your app:

1. Use `Adapty.setOnProfileUpdatedListener()` to listen for profile changes - Adapty will automatically call this method whenever the user's subscription status changes.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin
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
        return currentProfile?.accessLevels["premium"]?.isActive == true
    }
}
```

</TabItem>

<TabItem value="java" label="Java" default>

```java showLineNumbers
public class SubscriptionManager {
    private AdaptyProfile currentProfile;

    public SubscriptionManager() {
        // Listen for profile updates
        Adapty.setOnProfileUpdatedListener(profile -> {
            this.currentProfile = profile;
            // Update UI, unlock content, etc.
        });
    }
    
    // Use stored profile instead of calling getProfile()
    public boolean hasAccess() {
        if (currentProfile == null) {
            return false;
        }
        
        AdaptyAccessLevel premiumAccess = currentProfile.getAccessLevels().get("premium");
        return premiumAccess != null && premiumAccess.isActive();
    }
}
```
</TabItem>
</Tabs>

:::note
Adapty automatically calls the profile update listener when your app starts, providing cached subscription data even if the device is offline.
:::