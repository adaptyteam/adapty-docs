---
title: "Identify users in Kotlin Multiplatform SDK"
description: "Learn how to identify users in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Identify Users | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to identify users in the Adapty Kotlin Multiplatform SDK.

## User identification overview

User identification allows you to link users to their Adapty profiles across devices and sessions. This enables:

- **Cross-device subscription access** - Users can access their subscriptions on multiple devices
- **Consistent analytics** - Track user behavior and subscription data consistently
- **Server-side operations** - Grant access levels from your backend

## Identify users

To identify a user, call the `identify` method with your user ID:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun identifyUser(userId: String) {
    Adapty.identify(userId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val profile = result.value
                Log.d("Adapty", "User identified successfully: ${profile.profileId}")
                
                // User is now linked to their Adapty profile
                showSuccessMessage("User identified successfully")
            }
            is AdaptyResult.Error -> {
                val error = result.error
                Log.e("Adapty", "Failed to identify user: ${error.message}")
                showErrorMessage("Failed to identify user: ${error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void identifyUser(String userId) {
    Adapty.identify(userId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
            Log.d("Adapty", "User identified successfully: " + profile.getProfileId());
            
            // User is now linked to their Adapty profile
            showSuccessMessage("User identified successfully");
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            Log.e("Adapty", "Failed to identify user: " + error.getMessage());
            showErrorMessage("Failed to identify user: " + error.getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Identify users on login

Identify users when they log into your app:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class LoginManager {
    fun onUserLogin(user: User) {
        // Show loading indicator
        showLoadingIndicator()
        
        // Identify user with Adapty
        Adapty.identify(user.id) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    hideLoadingIndicator()
                    
                    Log.d("Login", "User identified: ${profile.profileId}")
                    
                    // Check subscription status
                    checkSubscriptionStatus(profile)
                    
                    // Navigate to main screen
                    navigateToMainScreen()
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    hideLoadingIndicator()
                    
                    Log.e("Login", "Failed to identify user: ${error.message}")
                    
                    // Still allow login, but show warning
                    showWarningMessage("Login successful, but subscription sync failed")
                    navigateToMainScreen()
                }
            }
        }
    }
    
    private fun checkSubscriptionStatus(profile: AdaptyProfile) {
        // Check if user has active subscriptions
        val hasActiveSubscription = profile.accessLevels.values.any { it.isActive }
        
        if (hasActiveSubscription) {
            // User has subscription - unlock premium features
            unlockPremiumFeatures()
        } else {
            // User doesn't have subscription - show paywall if needed
            showPaywallIfNeeded()
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class LoginManager {
    public void onUserLogin(User user) {
        // Show loading indicator
        showLoadingIndicator();
        
        // Identify user with Adapty
        Adapty.identify(user.getId(), result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                hideLoadingIndicator();
                
                Log.d("Login", "User identified: " + profile.getProfileId());
                
                // Check subscription status
                checkSubscriptionStatus(profile);
                
                // Navigate to main screen
                navigateToMainScreen();
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                hideLoadingIndicator();
                
                Log.e("Login", "Failed to identify user: " + error.getMessage());
                
                // Still allow login, but show warning
                showWarningMessage("Login successful, but subscription sync failed");
                navigateToMainScreen();
            }
        });
    }
    
    private void checkSubscriptionStatus(AdaptyProfile profile) {
        // Check if user has active subscriptions
        boolean hasActiveSubscription = profile.getAccessLevels().values().stream()
            .anyMatch(AdaptyAccessLevel::isActive);
        
        if (hasActiveSubscription) {
            // User has subscription - unlock premium features
            unlockPremiumFeatures();
        } else {
            // User doesn't have subscription - show paywall if needed
            showPaywallIfNeeded();
        }
    }
}
```
</TabItem>
</Tabs>

## Handle identification errors

Handle errors that may occur during user identification:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun identifyUserWithErrorHandling(userId: String) {
    Adapty.identify(userId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val profile = result.value
                Log.d("Adapty", "User identified successfully")
                
                // Update UI to reflect identified user
                updateUIForIdentifiedUser(profile)
            }
            is AdaptyResult.Error -> {
                val error = result.error
                
                when (error.code) {
                    1001 -> {
                        // Network error
                        Log.w("Adapty", "Network error during identification")
                        showMessage("Network error. Will retry when connection is restored.")
                        
                        // Retry later
                        scheduleRetry(userId)
                    }
                    1002 -> {
                        // Invalid SDK key
                        Log.e("Adapty", "Invalid SDK key")
                        showErrorMessage("Configuration error. Please contact support.")
                    }
                    1005 -> {
                        // Invalid user ID
                        Log.e("Adapty", "Invalid user ID: $userId")
                        showErrorMessage("Invalid user ID. Please check your user ID format.")
                    }
                    else -> {
                        // Other errors
                        Log.e("Adapty", "Identification failed: ${error.message}")
                        showErrorMessage("Failed to identify user: ${error.message}")
                    }
                }
            }
        }
    }
}

private fun scheduleRetry(userId: String) {
    // Schedule retry after network is restored
    Handler(Looper.getMainLooper()).postDelayed({
        identifyUserWithErrorHandling(userId)
    }, 5000) // Retry after 5 seconds
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void identifyUserWithErrorHandling(String userId) {
    Adapty.identify(userId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
            Log.d("Adapty", "User identified successfully");
            
            // Update UI to reflect identified user
            updateUIForIdentifiedUser(profile);
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            
            switch (error.getCode()) {
                case 1001:
                    // Network error
                    Log.w("Adapty", "Network error during identification");
                    showMessage("Network error. Will retry when connection is restored.");
                    
                    // Retry later
                    scheduleRetry(userId);
                    break;
                case 1002:
                    // Invalid SDK key
                    Log.e("Adapty", "Invalid SDK key");
                    showErrorMessage("Configuration error. Please contact support.");
                    break;
                case 1005:
                    // Invalid user ID
                    Log.e("Adapty", "Invalid user ID: " + userId);
                    showErrorMessage("Invalid user ID. Please check your user ID format.");
                    break;
                default:
                    // Other errors
                    Log.e("Adapty", "Identification failed: " + error.getMessage());
                    showErrorMessage("Failed to identify user: " + error.getMessage());
                    break;
            }
        }
    });
}

private void scheduleRetry(String userId) {
    // Schedule retry after network is restored
    new Handler(Looper.getMainLooper()).postDelayed(() -> {
        identifyUserWithErrorHandling(userId);
    }, 5000); // Retry after 5 seconds
}
```
</TabItem>
</Tabs>

## Check if user is identified

Check if a user is currently identified:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun checkUserIdentification() {
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val profile = result.value
                
                if (profile.customerUserId != null) {
                    // User is identified
                    Log.d("Adapty", "User is identified: ${profile.customerUserId}")
                    showMessage("User is identified: ${profile.customerUserId}")
                } else {
                    // User is not identified
                    Log.d("Adapty", "User is not identified")
                    showMessage("User is not identified")
                }
            }
            is AdaptyResult.Error -> {
                val error = result.error
                Log.e("Adapty", "Failed to get profile: ${error.message}")
                showErrorMessage("Failed to check user identification: ${error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void checkUserIdentification() {
    Adapty.getProfile(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
            
            if (profile.getCustomerUserId() != null) {
                // User is identified
                Log.d("Adapty", "User is identified: " + profile.getCustomerUserId());
                showMessage("User is identified: " + profile.getCustomerUserId());
            } else {
                // User is not identified
                Log.d("Adapty", "User is not identified");
                showMessage("User is not identified");
            }
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            Log.e("Adapty", "Failed to get profile: " + error.getMessage());
            showErrorMessage("Failed to check user identification: " + error.getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Complete user identification example

Here's a complete example of user identification in an app:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class UserIdentificationManager {
    private var currentUserId: String? = null
    
    fun identifyUser(userId: String) {
        currentUserId = userId
        
        // Show loading indicator
        showLoadingIndicator()
        
        Adapty.identify(userId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    hideLoadingIndicator()
                    
                    Log.d("UserID", "User identified successfully")
                    Log.d("UserID", "Profile ID: ${profile.profileId}")
                    Log.d("UserID", "Customer User ID: ${profile.customerUserId}")
                    
                    // Update UI
                    updateUIForIdentifiedUser(profile)
                    
                    // Check subscription status
                    checkSubscriptionStatus(profile)
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    hideLoadingIndicator()
                    
                    Log.e("UserID", "Failed to identify user: ${error.message}")
                    
                    // Handle error based on error code
                    handleIdentificationError(error)
                }
            }
        }
    }
    
    fun logout() {
        // Clear current user ID
        currentUserId = null
        
        // Note: Adapty doesn't have a logout method
        // The user will remain identified until they identify as a different user
        // or the app is uninstalled
        
        Log.d("UserID", "User logged out")
        showMessage("User logged out")
    }
    
    fun isUserIdentified(): Boolean {
        return currentUserId != null
    }
    
    private fun updateUIForIdentifiedUser(profile: AdaptyProfile) {
        // Update UI to show user is identified
        showSuccessMessage("User identified successfully")
        
        // Update user info in UI
        updateUserInfo(profile.customerUserId)
    }
    
    private fun checkSubscriptionStatus(profile: AdaptyProfile) {
        // Check if user has active subscriptions
        val hasActiveSubscription = profile.accessLevels.values.any { it.isActive }
        
        if (hasActiveSubscription) {
            // User has subscription - unlock premium features
            unlockPremiumFeatures()
            showMessage("Premium features unlocked")
        } else {
            // User doesn't have subscription
            showMessage("No active subscription found")
        }
    }
    
    private fun handleIdentificationError(error: AdaptyError) {
        when (error.code) {
            1001 -> {
                // Network error
                showWarningMessage("Network error. Will retry when connection is restored.")
                scheduleRetry()
            }
            1002 -> {
                // Invalid SDK key
                showErrorMessage("Configuration error. Please contact support.")
            }
            1005 -> {
                // Invalid user ID
                showErrorMessage("Invalid user ID. Please check your user ID format.")
            }
            else -> {
                // Other errors
                showErrorMessage("Failed to identify user: ${error.message}")
            }
        }
    }
    
    private fun scheduleRetry() {
        Handler(Looper.getMainLooper()).postDelayed({
            currentUserId?.let { userId ->
                identifyUser(userId)
            }
        }, 5000) // Retry after 5 seconds
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class UserIdentificationManager {
    private String currentUserId;
    
    public void identifyUser(String userId) {
        currentUserId = userId;
        
        // Show loading indicator
        showLoadingIndicator();
        
        Adapty.identify(userId, result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                hideLoadingIndicator();
                
                Log.d("UserID", "User identified successfully");
                Log.d("UserID", "Profile ID: " + profile.getProfileId());
                Log.d("UserID", "Customer User ID: " + profile.getCustomerUserId());
                
                // Update UI
                updateUIForIdentifiedUser(profile);
                
                // Check subscription status
                checkSubscriptionStatus(profile);
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                hideLoadingIndicator();
                
                Log.e("UserID", "Failed to identify user: " + error.getMessage());
                
                // Handle error based on error code
                handleIdentificationError(error);
            }
        });
    }
    
    public void logout() {
        // Clear current user ID
        currentUserId = null;
        
        // Note: Adapty doesn't have a logout method
        // The user will remain identified until they identify as a different user
        // or the app is uninstalled
        
        Log.d("UserID", "User logged out");
        showMessage("User logged out");
    }
    
    public boolean isUserIdentified() {
        return currentUserId != null;
    }
    
    private void updateUIForIdentifiedUser(AdaptyProfile profile) {
        // Update UI to show user is identified
        showSuccessMessage("User identified successfully");
        
        // Update user info in UI
        updateUserInfo(profile.getCustomerUserId());
    }
    
    private void checkSubscriptionStatus(AdaptyProfile profile) {
        // Check if user has active subscriptions
        boolean hasActiveSubscription = profile.getAccessLevels().values().stream()
            .anyMatch(AdaptyAccessLevel::isActive);
        
        if (hasActiveSubscription) {
            // User has subscription - unlock premium features
            unlockPremiumFeatures();
            showMessage("Premium features unlocked");
        } else {
            // User doesn't have subscription
            showMessage("No active subscription found");
        }
    }
    
    private void handleIdentificationError(AdaptyError error) {
        switch (error.getCode()) {
            case 1001:
                // Network error
                showWarningMessage("Network error. Will retry when connection is restored.");
                scheduleRetry();
                break;
            case 1002:
                // Invalid SDK key
                showErrorMessage("Configuration error. Please contact support.");
                break;
            case 1005:
                // Invalid user ID
                showErrorMessage("Invalid user ID. Please check your user ID format.");
                break;
            default:
                // Other errors
                showErrorMessage("Failed to identify user: " + error.getMessage());
                break;
        }
    }
    
    private void scheduleRetry() {
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            if (currentUserId != null) {
                identifyUser(currentUserId);
            }
        }, 5000); // Retry after 5 seconds
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Set user attributes](kmp-setting-user-attributes.md) - Learn about setting user attributes
- [Check subscription status](kmp-check-subscription-status.md) - Learn about checking subscription status
- [Handle events](kmp-handling-events.md) - Learn about handling events
