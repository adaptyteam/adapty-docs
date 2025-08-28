---
title: "Listen to subscription changes in Kotlin Multiplatform SDK"
description: "Learn how to listen to subscription changes in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Listen to Subscription Changes | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to listen to subscription changes using the Adapty Kotlin Multiplatform SDK.

## Listen to profile updates

To automatically receive updates when a user's subscription status changes, use the `setOnProfileUpdatedListener` method:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.setOnProfileUpdatedListener { profile ->
    // Profile updated - check subscription status
    val hasPremium = profile.accessLevels["premium"]?.isActive == true
    if (hasPremium) {
        // User has premium access
        unlockPremiumFeatures()
    } else {
        // User doesn't have premium access
        lockPremiumFeatures()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.setOnProfileUpdatedListener(profile -> {
    // Profile updated - check subscription status
    boolean hasPremium = profile.getAccessLevels().get("premium") != null && 
                        profile.getAccessLevels().get("premium").isActive();
    if (hasPremium) {
        // User has premium access
        unlockPremiumFeatures();
    } else {
        // User doesn't have premium access
        lockPremiumFeatures();
    }
});
```
</TabItem>
</Tabs>

## Complete subscription monitoring

Here's a complete example of monitoring subscription changes:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class SubscriptionMonitor {
    private var currentProfile: AdaptyProfile? = null
    
    init {
        // Set up profile update listener
        Adapty.setOnProfileUpdatedListener { profile ->
            currentProfile = profile
            handleProfileUpdate(profile)
        }
    }
    
    private fun handleProfileUpdate(profile: AdaptyProfile) {
        // Check all access levels
        profile.accessLevels.forEach { (levelId, accessLevel) ->
            when (levelId) {
                "premium" -> {
                    if (accessLevel.isActive) {
                        unlockPremiumFeatures()
                        showPremiumWelcomeMessage()
                    } else {
                        lockPremiumFeatures()
                        showPremiumExpiredMessage()
                    }
                }
                "pro" -> {
                    if (accessLevel.isActive) {
                        unlockProFeatures()
                    } else {
                        lockProFeatures()
                    }
                }
                // Add other access levels as needed
            }
        }
        
        // Update UI
        updateUI(profile)
    }
    
    private fun updateUI(profile: AdaptyProfile) {
        // Update UI elements based on subscription status
        val hasAnySubscription = profile.accessLevels.values.any { it.isActive }
        
        if (hasAnySubscription) {
            hidePaywallButton()
            showSubscriptionStatus(profile)
        } else {
            showPaywallButton()
            hideSubscriptionStatus()
        }
    }
    
    fun getCurrentProfile(): AdaptyProfile? = currentProfile
    
    fun hasAccess(levelId: String): Boolean {
        return currentProfile?.accessLevels[levelId]?.isActive == true
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class SubscriptionMonitor {
    private AdaptyProfile currentProfile;
    
    public SubscriptionMonitor() {
        // Set up profile update listener
        Adapty.setOnProfileUpdatedListener(profile -> {
            currentProfile = profile;
            handleProfileUpdate(profile);
        });
    }
    
    private void handleProfileUpdate(AdaptyProfile profile) {
        // Check all access levels
        for (Map.Entry<String, AdaptyAccessLevel> entry : profile.getAccessLevels().entrySet()) {
            String levelId = entry.getKey();
            AdaptyAccessLevel accessLevel = entry.getValue();
            
            switch (levelId) {
                case "premium":
                    if (accessLevel.isActive()) {
                        unlockPremiumFeatures();
                        showPremiumWelcomeMessage();
                    } else {
                        lockPremiumFeatures();
                        showPremiumExpiredMessage();
                    }
                    break;
                case "pro":
                    if (accessLevel.isActive()) {
                        unlockProFeatures();
                    } else {
                        lockProFeatures();
                    }
                    break;
                // Add other access levels as needed
            }
        }
        
        // Update UI
        updateUI(profile);
    }
    
    private void updateUI(AdaptyProfile profile) {
        // Update UI elements based on subscription status
        boolean hasAnySubscription = profile.getAccessLevels().values().stream()
            .anyMatch(AdaptyAccessLevel::isActive);
        
        if (hasAnySubscription) {
            hidePaywallButton();
            showSubscriptionStatus(profile);
        } else {
            showPaywallButton();
            hideSubscriptionStatus();
        }
    }
    
    public AdaptyProfile getCurrentProfile() {
        return currentProfile;
    }
    
    public boolean hasAccess(String levelId) {
        return currentProfile != null && 
               currentProfile.getAccessLevels().get(levelId) != null &&
               currentProfile.getAccessLevels().get(levelId).isActive();
    }
}
```
</TabItem>
</Tabs>

## Handle specific subscription events

### New subscription

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun handleNewSubscription(profile: AdaptyProfile, levelId: String) {
    when (levelId) {
        "premium" -> {
            // User just got premium
            unlockPremiumFeatures()
            showWelcomeMessage("Welcome to Premium!")
            trackEvent("premium_subscription_started")
        }
        "pro" -> {
            // User just got pro
            unlockProFeatures()
            showWelcomeMessage("Welcome to Pro!")
            trackEvent("pro_subscription_started")
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void handleNewSubscription(AdaptyProfile profile, String levelId) {
    switch (levelId) {
        case "premium":
            // User just got premium
            unlockPremiumFeatures();
            showWelcomeMessage("Welcome to Premium!");
            trackEvent("premium_subscription_started");
            break;
        case "pro":
            // User just got pro
            unlockProFeatures();
            showWelcomeMessage("Welcome to Pro!");
            trackEvent("pro_subscription_started");
            break;
    }
}
```
</TabItem>
</Tabs>

### Subscription expired

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun handleSubscriptionExpired(profile: AdaptyProfile, levelId: String) {
    when (levelId) {
        "premium" -> {
            // Premium subscription expired
            lockPremiumFeatures()
            showExpiredMessage("Your Premium subscription has expired")
            trackEvent("premium_subscription_expired")
        }
        "pro" -> {
            // Pro subscription expired
            lockProFeatures()
            showExpiredMessage("Your Pro subscription has expired")
            trackEvent("pro_subscription_expired")
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void handleSubscriptionExpired(AdaptyProfile profile, String levelId) {
    switch (levelId) {
        case "premium":
            // Premium subscription expired
            lockPremiumFeatures();
            showExpiredMessage("Your Premium subscription has expired");
            trackEvent("premium_subscription_expired");
            break;
        case "pro":
            // Pro subscription expired
            lockProFeatures();
            showExpiredMessage("Your Pro subscription has expired");
            trackEvent("pro_subscription_expired");
            break;
    }
}
```
</TabItem>
</Tabs>

## Track subscription changes

You can track when subscriptions change by comparing the old and new profiles:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class SubscriptionTracker {
    private var previousProfile: AdaptyProfile? = null
    
    fun trackSubscriptionChanges(newProfile: AdaptyProfile) {
        val oldProfile = previousProfile
        previousProfile = newProfile
        
        if (oldProfile != null) {
            // Compare access levels
            newProfile.accessLevels.forEach { (levelId, newAccessLevel) ->
                val oldAccessLevel = oldProfile.accessLevels[levelId]
                
                if (oldAccessLevel == null && newAccessLevel.isActive) {
                    // New subscription started
                    handleNewSubscription(newProfile, levelId)
                } else if (oldAccessLevel?.isActive == true && !newAccessLevel.isActive) {
                    // Subscription expired
                    handleSubscriptionExpired(newProfile, levelId)
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class SubscriptionTracker {
    private AdaptyProfile previousProfile;
    
    public void trackSubscriptionChanges(AdaptyProfile newProfile) {
        AdaptyProfile oldProfile = previousProfile;
        previousProfile = newProfile;
        
        if (oldProfile != null) {
            // Compare access levels
            for (Map.Entry<String, AdaptyAccessLevel> entry : newProfile.getAccessLevels().entrySet()) {
                String levelId = entry.getKey();
                AdaptyAccessLevel newAccessLevel = entry.getValue();
                AdaptyAccessLevel oldAccessLevel = oldProfile.getAccessLevels().get(levelId);
                
                if (oldAccessLevel == null && newAccessLevel.isActive()) {
                    // New subscription started
                    handleNewSubscription(newProfile, levelId);
                } else if (oldAccessLevel != null && oldAccessLevel.isActive() && !newAccessLevel.isActive()) {
                    // Subscription expired
                    handleSubscriptionExpired(newProfile, levelId);
                }
            }
        }
    }
}
```
</TabItem>
</Tabs>

## Initialize with current profile

When your app starts, get the current profile and set up the listener:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class MainActivity : AppCompatActivity() {
    private lateinit var subscriptionMonitor: SubscriptionMonitor
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Initialize subscription monitoring
        subscriptionMonitor = SubscriptionMonitor()
        
        // Get current profile
        Adapty.getProfile { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    // Handle initial profile
                    subscriptionMonitor.handleProfileUpdate(profile)
                }
                is AdaptyResult.Error -> {
                    // Handle error
                    Log.e("Adapty", "Failed to get profile: ${result.error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class MainActivity extends AppCompatActivity {
    private SubscriptionMonitor subscriptionMonitor;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Initialize subscription monitoring
        subscriptionMonitor = new SubscriptionMonitor();
        
        // Get current profile
        Adapty.getProfile(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                // Handle initial profile
                subscriptionMonitor.handleProfileUpdate(profile);
            } else if (result instanceof AdaptyResult.Error) {
                // Handle error
                Log.e("Adapty", "Failed to get profile: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Check subscription status](kmp-check-subscription-status.md) - Learn about checking subscription status
- [Making purchases](kmp-making-purchases.md) - Learn about making purchases
- [Handle errors](kmp-handle-errors.md) - Learn about error handling
