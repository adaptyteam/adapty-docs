---
title: "Check subscription status in Kotlin Multiplatform SDK"
description: "Learn how to check subscription status in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
keywords: ['getProfile', 'subscription status']
rank: 95
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To decide whether users can access paid content or see a paywall, you need to check their [access level](access-level.md) in the profile.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Get subscription status

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call `getProfile` if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

### Get profile

The easiest way to get the subscription status is to use the `getProfile` method to access the profile:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

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
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
Adapty.getProfile(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // check the access

    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
</TabItem>
</Tabs>

### Listen to subscription updates

To automatically receive profile updates in your app:

1. Use `Adapty.setOnProfileUpdatedListener()` to listen for profile changes - Adapty will automatically call this method whenever the user's subscription status changes.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

<Tabs>
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
        return currentProfile?.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true
    }
}
```

</TabItem>

<TabItem value="java" label="Java">

```java
public class SubscriptionManager {
    private AdaptyProfile currentProfile;

    public SubscriptionManager() {
        // Listen for profile updates
        Adapty.setOnProfileUpdatedListener(profile -> {
            currentProfile = profile;
            // Update UI, unlock content, etc.
        });
    }

    // Use stored profile instead of calling getProfile()
    public boolean hasAccess() {
        return currentProfile != null && 
               currentProfile.getAccessLevels().get("YOUR_ACCESS_LEVEL") != null &&
               currentProfile.getAccessLevels().get("YOUR_ACCESS_LEVEL").isActive();
    }
}
```

</TabItem>
</Tabs>

## Check access level

Once you have the profile, you can check if the user has access to a specific [access level](access-level.md):

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun hasAccess(profile: AdaptyProfile): Boolean {
    val accessLevel = profile.accessLevels["YOUR_ACCESS_LEVEL"]
    return accessLevel?.isActive == true
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public boolean hasAccess(AdaptyProfile profile) {
    AdaptyAccessLevel accessLevel = profile.getAccessLevels().get("YOUR_ACCESS_LEVEL");
    return accessLevel != null && accessLevel.isActive();
}
```
</TabItem>
</Tabs>

## Example: Show paywall or grant access

Here's a complete example of how to check subscription status and decide whether to show a paywall or grant access to paid features:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        checkSubscriptionStatus()
    }

    private fun checkSubscriptionStatus() {
        Adapty.getProfile { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    if (hasAccess(profile)) {
                        // User has active subscription - show paid content
                        showPaidContent()
                    } else {
                        // User doesn't have subscription - show paywall
                        showPaywall()
                    }
                }
                is AdaptyResult.Error -> {
                    // Handle error - show paywall as fallback
                    showPaywall()
                }
            }
        }
    }

    private fun hasAccess(profile: AdaptyProfile): Boolean {
        val accessLevel = profile.accessLevels["premium"]
        return accessLevel?.isActive == true
    }

    private fun showPaidContent() {
        // Unlock premium features
        findViewById<TextView>(R.id.premium_content).visibility = View.VISIBLE
    }

    private fun showPaywall() {
        // Show paywall to user
        // Implementation depends on your paywall setup
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        checkSubscriptionStatus();
    }

    private void checkSubscriptionStatus() {
        Adapty.getProfile(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                if (hasAccess(profile)) {
                    // User has active subscription - show paid content
                    showPaidContent();
                } else {
                    // User doesn't have subscription - show paywall
                    showPaywall();
                }
            } else if (result instanceof AdaptyResult.Error) {
                // Handle error - show paywall as fallback
                showPaywall();
            }
        });
    }

    private boolean hasAccess(AdaptyProfile profile) {
        AdaptyAccessLevel accessLevel = profile.getAccessLevels().get("premium");
        return accessLevel != null && accessLevel.isActive();
    }

    private void showPaidContent() {
        // Unlock premium features
        findViewById(R.id.premium_content).setVisibility(View.VISIBLE);
    }

    private void showPaywall() {
        // Show paywall to user
        // Implementation depends on your paywall setup
    }
}
```
</TabItem>
</Tabs>

## Next steps

Now that you can check subscription status, you can:

- [Show paywalls](kmp-present-paywalls.md) when users don't have access
- [Identify users](kmp-quickstart-identify.md) to track their subscription status across devices
- [Handle subscription changes](kmp-listen-subscription-changes.md) in real-time
