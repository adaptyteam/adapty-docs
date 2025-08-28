---
title: "Deal with App Tracking Transparency in Kotlin Multiplatform SDK"
description: "Learn how to handle App Tracking Transparency in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Deal with ATT | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to handle App Tracking Transparency (ATT) in the Adapty Kotlin Multiplatform SDK.

## App Tracking Transparency overview

App Tracking Transparency (ATT) is an iOS privacy feature that requires apps to request permission before tracking users across apps and websites. While this is primarily an iOS concern, it's important to understand how it affects your Kotlin Multiplatform app.

## ATT and Kotlin Multiplatform

Since Kotlin Multiplatform targets multiple platforms, ATT handling is primarily relevant for iOS targets. However, you should implement a consistent approach across your app.

## Check ATT status

Check the current ATT authorization status:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun checkATTStatus() {
    // Note: ATT is iOS-specific, so this would be platform-specific code
    // In a real KMP app, you'd use expect/actual declarations
    
    // For demonstration purposes, showing the concept
    val attStatus = getATTAuthorizationStatus()
    
    when (attStatus) {
        "authorized" -> {
            Log.d("ATT", "User authorized tracking")
            // Proceed with tracking
            enableTracking()
        }
        "denied" -> {
            Log.d("ATT", "User denied tracking")
            // Handle denied tracking
            handleDeniedTracking()
        }
        "restricted" -> {
            Log.d("ATT", "Tracking is restricted")
            // Handle restricted tracking
            handleRestrictedTracking()
        }
        "notDetermined" -> {
            Log.d("ATT", "User hasn't been asked yet")
            // Request permission
            requestATTPermission()
        }
        else -> {
            Log.d("ATT", "Unknown ATT status")
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void checkATTStatus() {
    // Note: ATT is iOS-specific, so this would be platform-specific code
    // In a real KMP app, you'd use expect/actual declarations
    
    // For demonstration purposes, showing the concept
    String attStatus = getATTAuthorizationStatus();
    
    switch (attStatus) {
        case "authorized":
            Log.d("ATT", "User authorized tracking");
            // Proceed with tracking
            enableTracking();
            break;
        case "denied":
            Log.d("ATT", "User denied tracking");
            // Handle denied tracking
            handleDeniedTracking();
            break;
        case "restricted":
            Log.d("ATT", "Tracking is restricted");
            // Handle restricted tracking
            handleRestrictedTracking();
            break;
        case "notDetermined":
            Log.d("ATT", "User hasn't been asked yet");
            // Request permission
            requestATTPermission();
            break;
        default:
            Log.d("ATT", "Unknown ATT status");
            break;
    }
}
```
</TabItem>
</Tabs>

## Request ATT permission

Request ATT permission from the user:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun requestATTPermission() {
    // Show explanation dialog first
    showATTExplanationDialog { userAgreed ->
        if (userAgreed) {
            // User agreed to see the ATT prompt
            requestATTAuthorization { status ->
                when (status) {
                    "authorized" -> {
                        Log.d("ATT", "User authorized tracking")
                        enableTracking()
                    }
                    "denied" -> {
                        Log.d("ATT", "User denied tracking")
                        handleDeniedTracking()
                    }
                    "restricted" -> {
                        Log.d("ATT", "Tracking is restricted")
                        handleRestrictedTracking()
                    }
                    else -> {
                        Log.d("ATT", "ATT request failed or was cancelled")
                    }
                }
            }
        } else {
            // User declined to see the ATT prompt
            Log.d("ATT", "User declined to see ATT prompt")
            handleDeclinedATT()
        }
    }
}

private fun showATTExplanationDialog(onResult: (Boolean) -> Unit) {
    // Show a custom dialog explaining why you need tracking
    AlertDialog.Builder(this)
        .setTitle("Personalized Experience")
        .setMessage("We use tracking to provide you with a personalized experience and relevant content. This helps us improve our app and show you content you might be interested in.")
        .setPositiveButton("Continue") { _, _ ->
            onResult(true)
        }
        .setNegativeButton("Not Now") { _, _ ->
            onResult(false)
        }
        .setCancelable(false)
        .show()
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void requestATTPermission() {
    // Show explanation dialog first
    showATTExplanationDialog(userAgreed -> {
        if (userAgreed) {
            // User agreed to see the ATT prompt
            requestATTAuthorization(status -> {
                switch (status) {
                    case "authorized":
                        Log.d("ATT", "User authorized tracking");
                        enableTracking();
                        break;
                    case "denied":
                        Log.d("ATT", "User denied tracking");
                        handleDeniedTracking();
                        break;
                    case "restricted":
                        Log.d("ATT", "Tracking is restricted");
                        handleRestrictedTracking();
                        break;
                    default:
                        Log.d("ATT", "ATT request failed or was cancelled");
                        break;
                }
            });
        } else {
            // User declined to see the ATT prompt
            Log.d("ATT", "User declined to see ATT prompt");
            handleDeclinedATT();
        }
    });
}

private void showATTExplanationDialog(OnResultListener<Boolean> onResult) {
    // Show a custom dialog explaining why you need tracking
    new AlertDialog.Builder(this)
        .setTitle("Personalized Experience")
        .setMessage("We use tracking to provide you with a personalized experience and relevant content. This helps us improve our app and show you content you might be interested in.")
        .setPositiveButton("Continue", (dialog, which) -> onResult.onResult(true))
        .setNegativeButton("Not Now", (dialog, which) -> onResult.onResult(false))
        .setCancelable(false)
        .show();
}
```
</TabItem>
</Tabs>

## Handle different ATT statuses

Handle different ATT authorization statuses:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun enableTracking() {
    // User authorized tracking
    Log.d("ATT", "Enabling tracking features")
    
    // Enable analytics tracking
    enableAnalyticsTracking()
    
    // Enable personalized content
    enablePersonalizedContent()
    
    // Show success message
    showMessage("Personalized experience enabled")
}

private fun handleDeniedTracking() {
    // User denied tracking
    Log.d("ATT", "User denied tracking")
    
    // Disable tracking features
    disableTrackingFeatures()
    
    // Show limited functionality message
    showMessage("Some features may be limited without tracking permission")
    
    // Optionally show settings prompt later
    scheduleSettingsPrompt()
}

private fun handleRestrictedTracking() {
    // Tracking is restricted (e.g., parental controls)
    Log.d("ATT", "Tracking is restricted")
    
    // Disable tracking features
    disableTrackingFeatures()
    
    // Show appropriate message
    showMessage("Tracking is restricted on this device")
}

private fun handleDeclinedATT() {
    // User declined to see the ATT prompt
    Log.d("ATT", "User declined ATT prompt")
    
    // Disable tracking features
    disableTrackingFeatures()
    
    // Show message about limited functionality
    showMessage("Some features may be limited")
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void enableTracking() {
    // User authorized tracking
    Log.d("ATT", "Enabling tracking features");
    
    // Enable analytics tracking
    enableAnalyticsTracking();
    
    // Enable personalized content
    enablePersonalizedContent();
    
    // Show success message
    showMessage("Personalized experience enabled");
}

private void handleDeniedTracking() {
    // User denied tracking
    Log.d("ATT", "User denied tracking");
    
    // Disable tracking features
    disableTrackingFeatures();
    
    // Show limited functionality message
    showMessage("Some features may be limited without tracking permission");
    
    // Optionally show settings prompt later
    scheduleSettingsPrompt();
}

private void handleRestrictedTracking() {
    // Tracking is restricted (e.g., parental controls)
    Log.d("ATT", "Tracking is restricted");
    
    // Disable tracking features
    disableTrackingFeatures();
    
    // Show appropriate message
    showMessage("Tracking is restricted on this device");
}

private void handleDeclinedATT() {
    // User declined to see the ATT prompt
    Log.d("ATT", "User declined ATT prompt");
    
    // Disable tracking features
    disableTrackingFeatures();
    
    // Show message about limited functionality
    showMessage("Some features may be limited");
}
```
</TabItem>
</Tabs>

## ATT and Adapty integration

Integrate ATT handling with Adapty:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class ATTManager {
    fun initializeWithATT() {
        // Check ATT status first
        checkATTStatus { attStatus ->
            when (attStatus) {
                "authorized" -> {
                    // User authorized tracking - initialize Adapty normally
                    initializeAdapty()
                }
                "denied", "restricted" -> {
                    // User denied or tracking is restricted
                    // Still initialize Adapty, but with limited tracking
                    initializeAdaptyWithLimitedTracking()
                }
                "notDetermined" -> {
                    // Request ATT permission first
                    requestATTPermission { status ->
                        when (status) {
                            "authorized" -> initializeAdapty()
                            else -> initializeAdaptyWithLimitedTracking()
                        }
                    }
                }
            }
        }
    }
    
    private fun initializeAdapty() {
        // Initialize Adapty with full tracking capabilities
        Adapty.activate("YOUR_SDK_KEY") { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    Log.d("Adapty", "Adapty initialized with tracking")
                    // Enable all features
                    enableAllFeatures()
                }
                is AdaptyResult.Error -> {
                    Log.e("Adapty", "Failed to initialize: ${result.error.message}")
                }
            }
        }
    }
    
    private fun initializeAdaptyWithLimitedTracking() {
        // Initialize Adapty with limited tracking
        Adapty.activate("YOUR_SDK_KEY") { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    Log.d("Adapty", "Adapty initialized with limited tracking")
                    // Enable basic features only
                    enableBasicFeatures()
                }
                is AdaptyResult.Error -> {
                    Log.e("Adapty", "Failed to initialize: ${result.error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class ATTManager {
    public void initializeWithATT() {
        // Check ATT status first
        checkATTStatus(attStatus -> {
            switch (attStatus) {
                case "authorized":
                    // User authorized tracking - initialize Adapty normally
                    initializeAdapty();
                    break;
                case "denied":
                case "restricted":
                    // User denied or tracking is restricted
                    // Still initialize Adapty, but with limited tracking
                    initializeAdaptyWithLimitedTracking();
                    break;
                case "notDetermined":
                    // Request ATT permission first
                    requestATTPermission(status -> {
                        switch (status) {
                            case "authorized":
                                initializeAdapty();
                                break;
                            default:
                                initializeAdaptyWithLimitedTracking();
                                break;
                        }
                    });
                    break;
            }
        });
    }
    
    private void initializeAdapty() {
        // Initialize Adapty with full tracking capabilities
        Adapty.activate("YOUR_SDK_KEY", result -> {
            if (result instanceof AdaptyResult.Success) {
                Log.d("Adapty", "Adapty initialized with tracking");
                // Enable all features
                enableAllFeatures();
            } else if (result instanceof AdaptyResult.Error) {
                Log.e("Adapty", "Failed to initialize: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
    
    private void initializeAdaptyWithLimitedTracking() {
        // Initialize Adapty with limited tracking
        Adapty.activate("YOUR_SDK_KEY", result -> {
            if (result instanceof AdaptyResult.Success) {
                Log.d("Adapty", "Adapty initialized with limited tracking");
                // Enable basic features only
                enableBasicFeatures();
            } else if (result instanceof AdaptyResult.Error) {
                Log.e("Adapty", "Failed to initialize: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Show settings prompt

Show a prompt to guide users to settings if they denied tracking:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun scheduleSettingsPrompt() {
    // Show settings prompt after a delay
    Handler(Looper.getMainLooper()).postDelayed({
        showSettingsPrompt()
    }, 30000) // Show after 30 seconds
}

private fun showSettingsPrompt() {
    AlertDialog.Builder(this)
        .setTitle("Enable Personalized Experience")
        .setMessage("To get the most out of our app, you can enable tracking in Settings. This helps us provide you with personalized content and improve your experience.")
        .setPositiveButton("Open Settings") { _, _ ->
            openAppSettings()
        }
        .setNegativeButton("Not Now") { _, _ ->
            // User declined
        }
        .setCancelable(true)
        .show()
}

private fun openAppSettings() {
    try {
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
            data = Uri.fromParts("package", packageName, null)
        }
        startActivity(intent)
    } catch (e: Exception) {
        Log.e("ATT", "Failed to open settings: ${e.message}")
        showMessage("Please open Settings manually and enable tracking for this app")
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void scheduleSettingsPrompt() {
    // Show settings prompt after a delay
    new Handler(Looper.getMainLooper()).postDelayed(() -> {
        showSettingsPrompt();
    }, 30000); // Show after 30 seconds
}

private void showSettingsPrompt() {
    new AlertDialog.Builder(this)
        .setTitle("Enable Personalized Experience")
        .setMessage("To get the most out of our app, you can enable tracking in Settings. This helps us provide you with personalized content and improve your experience.")
        .setPositiveButton("Open Settings", (dialog, which) -> openAppSettings())
        .setNegativeButton("Not Now", (dialog, which) -> {
            // User declined
        })
        .setCancelable(true)
        .show();
}

private void openAppSettings() {
    try {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(Uri.fromParts("package", getPackageName(), null));
        startActivity(intent);
    } catch (Exception e) {
        Log.e("ATT", "Failed to open settings: " + e.getMessage());
        showMessage("Please open Settings manually and enable tracking for this app");
    }
}
```
</TabItem>
</Tabs>

## Complete ATT handling example

Here's a complete example of ATT handling in a Kotlin Multiplatform app:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class ATTManager {
    private var hasShownSettingsPrompt = false
    
    fun initializeApp() {
        // Check ATT status and initialize accordingly
        checkATTStatus { attStatus ->
            when (attStatus) {
                "authorized" -> {
                    Log.d("ATT", "Tracking authorized - initializing with full features")
                    initializeWithFullFeatures()
                }
                "denied" -> {
                    Log.d("ATT", "Tracking denied - initializing with limited features")
                    initializeWithLimitedFeatures()
                    scheduleSettingsPrompt()
                }
                "restricted" -> {
                    Log.d("ATT", "Tracking restricted - initializing with limited features")
                    initializeWithLimitedFeatures()
                }
                "notDetermined" -> {
                    Log.d("ATT", "ATT not determined - requesting permission")
                    requestATTPermission { status ->
                        when (status) {
                            "authorized" -> initializeWithFullFeatures()
                            else -> initializeWithLimitedFeatures()
                        }
                    }
                }
            }
        }
    }
    
    private fun initializeWithFullFeatures() {
        // Initialize Adapty with full tracking
        Adapty.activate("YOUR_SDK_KEY") { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    Log.d("Adapty", "Initialized with full features")
                    enableAnalyticsTracking()
                    enablePersonalizedContent()
                    enableCrossAppTracking()
                }
                is AdaptyResult.Error -> {
                    Log.e("Adapty", "Initialization failed: ${result.error.message}")
                }
            }
        }
    }
    
    private fun initializeWithLimitedFeatures() {
        // Initialize Adapty with limited tracking
        Adapty.activate("YOUR_SDK_KEY") { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    Log.d("Adapty", "Initialized with limited features")
                    enableBasicAnalytics()
                    disablePersonalizedContent()
                    disableCrossAppTracking()
                }
                is AdaptyResult.Error -> {
                    Log.e("Adapty", "Initialization failed: ${result.error.message}")
                }
            }
        }
    }
    
    private fun scheduleSettingsPrompt() {
        if (!hasShownSettingsPrompt) {
            Handler(Looper.getMainLooper()).postDelayed({
                showSettingsPrompt()
            }, 30000) // 30 seconds delay
        }
    }
    
    private fun showSettingsPrompt() {
        hasShownSettingsPrompt = true
        
        AlertDialog.Builder(getCurrentActivity())
            .setTitle("Enable Personalized Experience")
            .setMessage("To get the most out of our app, you can enable tracking in Settings. This helps us provide you with personalized content and improve your experience.")
            .setPositiveButton("Open Settings") { _, _ ->
                openAppSettings()
            }
            .setNegativeButton("Not Now") { _, _ ->
                // User declined
            }
            .setCancelable(true)
            .show()
    }
    
    private fun openAppSettings() {
        try {
            val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
                data = Uri.fromParts("package", getCurrentActivity().packageName, null)
            }
            getCurrentActivity().startActivity(intent)
        } catch (e: Exception) {
            Log.e("ATT", "Failed to open settings: ${e.message}")
            showMessage("Please open Settings manually and enable tracking for this app")
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class ATTManager {
    private boolean hasShownSettingsPrompt = false;
    
    public void initializeApp() {
        // Check ATT status and initialize accordingly
        checkATTStatus(attStatus -> {
            switch (attStatus) {
                case "authorized":
                    Log.d("ATT", "Tracking authorized - initializing with full features");
                    initializeWithFullFeatures();
                    break;
                case "denied":
                    Log.d("ATT", "Tracking denied - initializing with limited features");
                    initializeWithLimitedFeatures();
                    scheduleSettingsPrompt();
                    break;
                case "restricted":
                    Log.d("ATT", "Tracking restricted - initializing with limited features");
                    initializeWithLimitedFeatures();
                    break;
                case "notDetermined":
                    Log.d("ATT", "ATT not determined - requesting permission");
                    requestATTPermission(status -> {
                        switch (status) {
                            case "authorized":
                                initializeWithFullFeatures();
                                break;
                            default:
                                initializeWithLimitedFeatures();
                                break;
                        }
                    });
                    break;
            }
        });
    }
    
    private void initializeWithFullFeatures() {
        // Initialize Adapty with full tracking
        Adapty.activate("YOUR_SDK_KEY", result -> {
            if (result instanceof AdaptyResult.Success) {
                Log.d("Adapty", "Initialized with full features");
                enableAnalyticsTracking();
                enablePersonalizedContent();
                enableCrossAppTracking();
            } else if (result instanceof AdaptyResult.Error) {
                Log.e("Adapty", "Initialization failed: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
    
    private void initializeWithLimitedFeatures() {
        // Initialize Adapty with limited tracking
        Adapty.activate("YOUR_SDK_KEY", result -> {
            if (result instanceof AdaptyResult.Success) {
                Log.d("Adapty", "Initialized with limited features");
                enableBasicAnalytics();
                disablePersonalizedContent();
                disableCrossAppTracking();
            } else if (result instanceof AdaptyResult.Error) {
                Log.e("Adapty", "Initialization failed: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
    
    private void scheduleSettingsPrompt() {
        if (!hasShownSettingsPrompt) {
            new Handler(Looper.getMainLooper()).postDelayed(() -> {
                showSettingsPrompt();
            }, 30000); // 30 seconds delay
        }
    }
    
    private void showSettingsPrompt() {
        hasShownSettingsPrompt = true;
        
        new AlertDialog.Builder(getCurrentActivity())
            .setTitle("Enable Personalized Experience")
            .setMessage("To get the most out of our app, you can enable tracking in Settings. This helps us provide you with personalized content and improve your experience.")
            .setPositiveButton("Open Settings", (dialog, which) -> openAppSettings())
            .setNegativeButton("Not Now", (dialog, which) -> {
                // User declined
            })
            .setCancelable(true)
            .show();
    }
    
    private void openAppSettings() {
        try {
            Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.setData(Uri.fromParts("package", getCurrentActivity().getPackageName(), null));
            getCurrentActivity().startActivity(intent);
        } catch (Exception e) {
            Log.e("ATT", "Failed to open settings: " + e.getMessage());
            showMessage("Please open Settings manually and enable tracking for this app");
        }
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Handle errors](kmp-handle-errors.md) - Learn about error handling
- [Test integration](kmp-test.md) - Test your ATT integration
- [Privacy best practices](https://developer.apple.com/app-store/review/guidelines/#privacy) - Apple's privacy guidelines
