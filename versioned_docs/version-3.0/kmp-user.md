---
title: "Users & access in Kotlin Multiplatform SDK"
description: "Learn how to manage users and access levels in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Users & Access | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section covers everything related to user management and access control in your Kotlin Multiplatform app with Adapty.

## User identification

Identify users to track their subscription status across devices and provide consistent analytics.

- [Identify users](kmp-quickstart-identify.md) - Link users to their Adapty profiles
- [Update user attributes](kmp-setting-user-attributes.md) - Store additional user data

## Subscription status

Check and monitor user subscription status to control access to paid features.

- [Check subscription status](kmp-check-subscription-status.md) - Determine if users have access to paid content
- [Listen to subscription changes](kmp-listen-subscription-changes.md) - Get real-time updates when subscription status changes

## Privacy and compliance

Handle privacy requirements and platform-specific features.

- [Deal with App Tracking Transparency (ATT)](kmp-deal-with-att.md) - Handle iOS tracking permission requests
- [Kids Mode](kids-mode-kmp.md) - Implement child-safe features

## Access levels

Access levels define what features users can access based on their subscriptions.

### Check access level

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun hasAccess(profile: AdaptyProfile): Boolean {
    val accessLevel = profile.accessLevels["premium"]
    return accessLevel?.isActive == true
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public boolean hasAccess(AdaptyProfile profile) {
    AdaptyAccessLevel accessLevel = profile.getAccessLevels().get("premium");
    return accessLevel != null && accessLevel.isActive();
}
```
</TabItem>
</Tabs>

### Monitor access level changes

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.setOnProfileUpdatedListener { profile ->
    val hasAccess = profile.accessLevels["premium"]?.isActive == true
    if (hasAccess) {
        // Unlock premium features
        unlockPremiumFeatures()
    } else {
        // Lock premium features
        lockPremiumFeatures()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.setOnProfileUpdatedListener(profile -> {
    boolean hasAccess = profile.getAccessLevels().get("premium") != null && 
                       profile.getAccessLevels().get("premium").isActive();
    if (hasAccess) {
        // Unlock premium features
        unlockPremiumFeatures();
    } else {
        // Lock premium features
        lockPremiumFeatures();
    }
});
```
</TabItem>
</Tabs>

## User attributes

Store additional information about your users for analytics and personalization.

### Set user attributes

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val attributes = mapOf(
    "email" to "user@example.com",
    "name" to "John Doe",
    "age" to 25,
    "subscription_tier" to "premium"
)

Adapty.updateProfile(attributes) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            // Attributes updated successfully
        }
        is AdaptyResult.Error -> {
            // Handle error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Map<String, Object> attributes = new HashMap<>();
attributes.put("email", "user@example.com");
attributes.put("name", "John Doe");
attributes.put("age", 25);
attributes.put("subscription_tier", "premium");

Adapty.updateProfile(attributes, result -> {
    if (result instanceof AdaptyResult.Success) {
        // Attributes updated successfully
    } else if (result instanceof AdaptyResult.Error) {
        // Handle error
    }
});
```
</TabItem>
</Tabs>

## Example: Complete user management

Here's a complete example of user management in your app:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class UserManager {
    private var currentProfile: AdaptyProfile? = null
    
    init {
        // Listen for profile updates
        Adapty.setOnProfileUpdatedListener { profile ->
            currentProfile = profile
            updateUI()
        }
    }
    
    fun identifyUser(userId: String) {
        Adapty.identify(userId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    currentProfile = result.value
                    updateUI()
                }
                is AdaptyResult.Error -> {
                    // Handle error
                }
            }
        }
    }
    
    fun updateUserAttributes(attributes: Map<String, Any>) {
        Adapty.updateProfile(attributes) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    // Attributes updated
                }
                is AdaptyResult.Error -> {
                    // Handle error
                }
            }
        }
    }
    
    fun hasPremiumAccess(): Boolean {
        return currentProfile?.accessLevels["premium"]?.isActive == true
    }
    
    private fun updateUI() {
        // Update UI based on current profile
        if (hasPremiumAccess()) {
            unlockPremiumFeatures()
        } else {
            lockPremiumFeatures()
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class UserManager {
    private AdaptyProfile currentProfile;
    
    public UserManager() {
        // Listen for profile updates
        Adapty.setOnProfileUpdatedListener(profile -> {
            currentProfile = profile;
            updateUI();
        });
    }
    
    public void identifyUser(String userId) {
        Adapty.identify(userId, result -> {
            if (result instanceof AdaptyResult.Success) {
                currentProfile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                updateUI();
            } else if (result instanceof AdaptyResult.Error) {
                // Handle error
            }
        });
    }
    
    public void updateUserAttributes(Map<String, Object> attributes) {
        Adapty.updateProfile(attributes, result -> {
            if (result instanceof AdaptyResult.Success) {
                // Attributes updated
            } else if (result instanceof AdaptyResult.Error) {
                // Handle error
            }
        });
    }
    
    public boolean hasPremiumAccess() {
        return currentProfile != null && 
               currentProfile.getAccessLevels().get("premium") != null &&
               currentProfile.getAccessLevels().get("premium").isActive();
    }
    
    private void updateUI() {
        // Update UI based on current profile
        if (hasPremiumAccess()) {
            unlockPremiumFeatures();
        } else {
            lockPremiumFeatures();
        }
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Identify users](kmp-quickstart-identify.md)
- [Check subscription status](kmp-check-subscription-status.md)
- [Update user attributes](kmp-setting-user-attributes.md)
- [Handle subscription changes](kmp-listen-subscription-changes.md)
