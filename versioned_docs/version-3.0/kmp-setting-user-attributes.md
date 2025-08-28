---
title: "Set user attributes in Kotlin Multiplatform SDK"
description: "Learn how to set user attributes in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Set User Attributes | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to set user attributes using the Adapty Kotlin Multiplatform SDK.

## Set user attributes

To set user attributes, call the `updateProfile` method with a map of attributes:

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
            val profile = result.value
            // Attributes updated successfully
        }
        is AdaptyResult.Error -> {
            val error = result.error
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
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // Attributes updated successfully
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle error
    }
});
```
</TabItem>
</Tabs>

## Common user attributes

Here are some common user attributes you might want to set:

### Basic user info

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val basicAttributes = mapOf(
    "email" to user.email,
    "name" to user.name,
    "phone" to user.phone,
    "country" to user.country
)

Adapty.updateProfile(basicAttributes) { result ->
    // Handle result
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Map<String, Object> basicAttributes = new HashMap<>();
basicAttributes.put("email", user.getEmail());
basicAttributes.put("name", user.getName());
basicAttributes.put("phone", user.getPhone());
basicAttributes.put("country", user.getCountry());

Adapty.updateProfile(basicAttributes, result -> {
    // Handle result
});
```
</TabItem>
</Tabs>

### App-specific attributes

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val appAttributes = mapOf(
    "user_type" to "premium",
    "app_version" to BuildConfig.VERSION_NAME,
    "device_model" to Build.MODEL,
    "os_version" to Build.VERSION.RELEASE,
    "last_login" to System.currentTimeMillis()
)

Adapty.updateProfile(appAttributes) { result ->
    // Handle result
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Map<String, Object> appAttributes = new HashMap<>();
appAttributes.put("user_type", "premium");
appAttributes.put("app_version", BuildConfig.VERSION_NAME);
appAttributes.put("device_model", Build.MODEL);
appAttributes.put("os_version", Build.VERSION.RELEASE);
appAttributes.put("last_login", System.currentTimeMillis());

Adapty.updateProfile(appAttributes, result -> {
    // Handle result
});
```
</TabItem>
</Tabs>

## Update attributes on user actions

Set attributes when users perform specific actions:

### On login

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun onUserLogin(user: User) {
    val attributes = mapOf(
        "email" to user.email,
        "name" to user.name,
        "login_count" to user.loginCount,
        "last_login" to System.currentTimeMillis()
    )
    
    Adapty.updateProfile(attributes) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                // User logged in successfully
                navigateToMainScreen()
            }
            is AdaptyResult.Error -> {
                // Handle error but still allow login
                navigateToMainScreen()
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void onUserLogin(User user) {
    Map<String, Object> attributes = new HashMap<>();
    attributes.put("email", user.getEmail());
    attributes.put("name", user.getName());
    attributes.put("login_count", user.getLoginCount());
    attributes.put("last_login", System.currentTimeMillis());
    
    Adapty.updateProfile(attributes, result -> {
        if (result instanceof AdaptyResult.Success) {
            // User logged in successfully
            navigateToMainScreen();
        } else if (result instanceof AdaptyResult.Error) {
            // Handle error but still allow login
            navigateToMainScreen();
        }
    });
}
```
</TabItem>
</Tabs>

### On subscription change

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun onSubscriptionChanged(profile: AdaptyProfile) {
    val subscriptionAttributes = mutableMapOf<String, Any>()
    
    // Check subscription status
    profile.accessLevels.forEach { (levelId, accessLevel) ->
        if (accessLevel.isActive) {
            subscriptionAttributes["current_subscription"] = levelId
            subscriptionAttributes["subscription_start"] = System.currentTimeMillis()
        }
    }
    
    if (subscriptionAttributes.isNotEmpty()) {
        Adapty.updateProfile(subscriptionAttributes) { result ->
            // Handle result
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void onSubscriptionChanged(AdaptyProfile profile) {
    Map<String, Object> subscriptionAttributes = new HashMap<>();
    
    // Check subscription status
    for (Map.Entry<String, AdaptyAccessLevel> entry : profile.getAccessLevels().entrySet()) {
        String levelId = entry.getKey();
        AdaptyAccessLevel accessLevel = entry.getValue();
        
        if (accessLevel.isActive()) {
            subscriptionAttributes.put("current_subscription", levelId);
            subscriptionAttributes.put("subscription_start", System.currentTimeMillis());
        }
    }
    
    if (!subscriptionAttributes.isEmpty()) {
        Adapty.updateProfile(subscriptionAttributes, result -> {
            // Handle result
        });
    }
}
```
</TabItem>
</Tabs>

## Batch attribute updates

You can update multiple attributes at once:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun updateUserProfile(user: User) {
    val attributes = mapOf(
        // Basic info
        "email" to user.email,
        "name" to user.name,
        "age" to user.age,
        
        // App usage
        "app_launches" to user.appLaunches,
        "total_time_spent" to user.totalTimeSpent,
        "favorite_feature" to user.favoriteFeature,
        
        // Device info
        "device_model" to Build.MODEL,
        "os_version" to Build.VERSION.RELEASE,
        "app_version" to BuildConfig.VERSION_NAME,
        
        // Timestamps
        "last_updated" to System.currentTimeMillis()
    )
    
    Adapty.updateProfile(attributes) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                Log.d("Adapty", "Profile updated successfully")
            }
            is AdaptyResult.Error -> {
                Log.e("Adapty", "Profile update failed: ${result.error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void updateUserProfile(User user) {
    Map<String, Object> attributes = new HashMap<>();
    
    // Basic info
    attributes.put("email", user.getEmail());
    attributes.put("name", user.getName());
    attributes.put("age", user.getAge());
    
    // App usage
    attributes.put("app_launches", user.getAppLaunches());
    attributes.put("total_time_spent", user.getTotalTimeSpent());
    attributes.put("favorite_feature", user.getFavoriteFeature());
    
    // Device info
    attributes.put("device_model", Build.MODEL);
    attributes.put("os_version", Build.VERSION.RELEASE);
    attributes.put("app_version", BuildConfig.VERSION_NAME);
    
    // Timestamps
    attributes.put("last_updated", System.currentTimeMillis());
    
    Adapty.updateProfile(attributes, result -> {
        if (result instanceof AdaptyResult.Success) {
            Log.d("Adapty", "Profile updated successfully");
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Adapty", "Profile update failed: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Error handling

Handle errors when updating user attributes:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun updateProfileWithErrorHandling(attributes: Map<String, Any>) {
    Adapty.updateProfile(attributes) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                // Attributes updated successfully
                showSuccessMessage("Profile updated")
            }
            is AdaptyResult.Error -> {
                val error = result.error
                when (error.code) {
                    1001 -> {
                        // Network error - retry later
                        Log.w("Adapty", "Network error, will retry later")
                        scheduleRetry(attributes)
                    }
                    1002 -> {
                        // Invalid SDK key
                        Log.e("Adapty", "Invalid SDK key")
                        showErrorMessage("Configuration error")
                    }
                    else -> {
                        // Other errors
                        Log.e("Adapty", "Profile update failed: ${error.message}")
                        showErrorMessage("Update failed: ${error.message}")
                    }
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void updateProfileWithErrorHandling(Map<String, Object> attributes) {
    Adapty.updateProfile(attributes, result -> {
        if (result instanceof AdaptyResult.Success) {
            // Attributes updated successfully
            showSuccessMessage("Profile updated");
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            switch (error.getCode()) {
                case 1001:
                    // Network error - retry later
                    Log.w("Adapty", "Network error, will retry later");
                    scheduleRetry(attributes);
                    break;
                case 1002:
                    // Invalid SDK key
                    Log.e("Adapty", "Invalid SDK key");
                    showErrorMessage("Configuration error");
                    break;
                default:
                    // Other errors
                    Log.e("Adapty", "Profile update failed: " + error.getMessage());
                    showErrorMessage("Update failed: " + error.getMessage());
                    break;
            }
        }
    });
}
```
</TabItem>
</Tabs>

## Next steps

- [Identify users](kmp-quickstart-identify.md) - Learn about user identification
- [Check subscription status](kmp-check-subscription-status.md) - Verify user access
- [Handle errors](kmp-handle-errors.md) - Learn about error handling
