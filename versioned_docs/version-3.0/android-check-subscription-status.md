---
title: "Check subscription status in Android SDK"
description: "Learn how to check subscription status in your Android app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
---

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call [`getProfile`](android-identifying-users.md) if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Listen to subscription updates

To automatically receive profile updates in your app:

1. Use `Adapty.setOnProfileUpdatedListener()` to listen for profile changes - Adapty will automatically call this method whenever the user's subscription status changes.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
        return currentProfile?.accessLevels["premium"]?.isActive == true
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

## Connect profile with paywall logic

When you need to make immediate decisions about showing paywalls or granting access to paid features, you can check the user's profile directly. This approach is useful for scenarios like app launch, when entering premium sections, or before displaying specific content.

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin
class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        initializePaywall()
    }
    
    private fun initializePaywall() {
        // Load paywall configuration
        loadPaywall { paywallView ->
            // Check if user has access to premium features
            checkAccessLevel { result ->
                when (result) {
                    is AdaptyResult.Success -> {
                        if (!result.value && paywallView != null) {
                            setContentView(paywallView) // Show paywall if no access
                        }
                    }
                    is AdaptyResult.Error -> {
                        println("Error checking access level: ${result.error}")
                        if (paywallView != null) {
                            setContentView(paywallView) // Show paywall if access check fails
                        }
                    }
                }
            }
        }
    }
    
    private fun checkAccessLevel(callback: ResultCallback<Boolean>) {
        Adapty.getProfile { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val hasAccess = result.value.accessLevels["premium"]?.isActive == true
                    callback.onResult(AdaptyResult.Success(hasAccess))
                }
                is AdaptyResult.Error -> {
                    callback.onResult(AdaptyResult.Error(result.error))
                }
            }
        }
    }
    
    private fun loadPaywall(callback: (AdaptyPaywallView?) -> Unit) {
        // Load paywall configuration
        // ... paywall loading logic
        callback(null)
    }
}
```

</TabItem>

<TabItem value="java" label="Java">

```java
public class MainActivity extends AppCompatActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        initializePaywall();
    }
    
    private void initializePaywall() {
        // Load paywall configuration
        loadPaywall(paywallView -> {
            // Check if user has access to premium features
            checkAccessLevel(result -> {
                if (result instanceof AdaptyResult.Success) {
                    boolean hasAccess = ((AdaptyResult.Success<Boolean>) result).getValue();
                    if (!hasAccess && paywallView != null) {
                        setContentView(paywallView); // Show paywall if no access
                    }
                } else if (result instanceof AdaptyResult.Error) {
                    System.out.println("Error checking access level: " + ((AdaptyResult.Error) result).getError());
                    if (paywallView != null) {
                        setContentView(paywallView); // Show paywall if access check fails
                    }
                }
            });
        });
    }
    
    private void checkAccessLevel(ResultCallback<Boolean> callback) {
        Adapty.getProfile(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                AdaptyAccessLevel premiumAccess = profile.getAccessLevels().get("premium");
                boolean hasAccess = premiumAccess != null && premiumAccess.isActive();
                callback.onResult(AdaptyResult.success(hasAccess));
            } else if (result instanceof AdaptyResult.Error) {
                callback.onResult(AdaptyResult.error(((AdaptyResult.Error) result).getError()));
            }
        });
    }
    
    private void loadPaywall(AdaptyCallback<AdaptyPaywallView> callback) {
        // Load paywall configuration
        // ... paywall loading logic
        callback.onResult(AdaptyResult.success(null));
    }
}
```

</TabItem>
</Tabs>