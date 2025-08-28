---
title: "Restore purchases in Kotlin Multiplatform SDK"
description: "Learn how to restore purchases in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Restore Purchases | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to restore purchases using the Adapty Kotlin Multiplatform SDK.

## Restore purchases

To restore previous purchases, call the `restorePurchases` method:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.restorePurchases { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // Purchases restored successfully
            showRestoreSuccessMessage()
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle error
            showRestoreErrorMessage(error.message)
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.restorePurchases(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // Purchases restored successfully
        showRestoreSuccessMessage();
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle error
        showRestoreErrorMessage(error.getMessage());
    }
});
```
</TabItem>
</Tabs>

## Complete restore flow

Here's a complete example of the restore purchase flow:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class RestoreManager {
    fun restorePurchases() {
        // Show loading indicator
        showLoadingIndicator()
        
        Adapty.restorePurchases { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    // Purchases restored
                    hideLoadingIndicator()
                    
                    // Check if any purchases were restored
                    val hasActiveSubscriptions = profile.accessLevels.values.any { it.isActive }
                    
                    if (hasActiveSubscriptions) {
                        showRestoreSuccessMessage("Purchases restored successfully!")
                        updateUI(profile)
                    } else {
                        showNoPurchasesMessage("No previous purchases found.")
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    // Handle error
                    hideLoadingIndicator()
                    
                    when (error.code) {
                        1001 -> {
                            // Network error
                            showNetworkErrorMessage()
                        }
                        else -> {
                            // Other errors
                            showRestoreErrorMessage("Restore failed: ${error.message}")
                        }
                    }
                }
            }
        }
    }
    
    private fun updateUI(profile: AdaptyProfile) {
        // Update UI based on restored profile
        profile.accessLevels.forEach { (levelId, accessLevel) ->
            if (accessLevel.isActive) {
                when (levelId) {
                    "premium" -> unlockPremiumFeatures()
                    "pro" -> unlockProFeatures()
                    // Add other access levels as needed
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class RestoreManager {
    public void restorePurchases() {
        // Show loading indicator
        showLoadingIndicator();
        
        Adapty.restorePurchases(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                // Purchases restored
                hideLoadingIndicator();
                
                // Check if any purchases were restored
                boolean hasActiveSubscriptions = profile.getAccessLevels().values().stream()
                    .anyMatch(AdaptyAccessLevel::isActive);
                
                if (hasActiveSubscriptions) {
                    showRestoreSuccessMessage("Purchases restored successfully!");
                    updateUI(profile);
                } else {
                    showNoPurchasesMessage("No previous purchases found.");
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                // Handle error
                hideLoadingIndicator();
                
                switch (error.getCode()) {
                    case 1001:
                        // Network error
                        showNetworkErrorMessage();
                        break;
                    default:
                        // Other errors
                        showRestoreErrorMessage("Restore failed: " + error.getMessage());
                        break;
                }
            }
        });
    }
    
    private void updateUI(AdaptyProfile profile) {
        // Update UI based on restored profile
        for (Map.Entry<String, AdaptyAccessLevel> entry : profile.getAccessLevels().entrySet()) {
            String levelId = entry.getKey();
            AdaptyAccessLevel accessLevel = entry.getValue();
            
            if (accessLevel.isActive()) {
                switch (levelId) {
                    case "premium":
                        unlockPremiumFeatures();
                        break;
                    case "pro":
                        unlockProFeatures();
                        break;
                    // Add other access levels as needed
                }
            }
        }
    }
}
```
</TabItem>
</Tabs>

## When to restore purchases

Restore purchases in these scenarios:

- **App reinstall** - When users reinstall your app
- **Device change** - When users switch to a new device
- **Manual restore** - When users tap a "Restore Purchases" button
- **App launch** - Automatically on app startup (optional)

## Automatic restore on app launch

You can automatically restore purchases when the app launches:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Automatically restore purchases on app launch
        restorePurchasesOnLaunch()
    }
    
    private fun restorePurchasesOnLaunch() {
        Adapty.restorePurchases { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    // Update UI based on restored profile
                    updateUI(profile)
                }
                is AdaptyResult.Error -> {
                    // Silently handle error - don't show to user
                    Log.w("Adapty", "Auto-restore failed: ${result.error.message}")
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
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Automatically restore purchases on app launch
        restorePurchasesOnLaunch();
    }
    
    private void restorePurchasesOnLaunch() {
        Adapty.restorePurchases(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                // Update UI based on restored profile
                updateUI(profile);
            } else if (result instanceof AdaptyResult.Error) {
                // Silently handle error - don't show to user
                Log.w("Adapty", "Auto-restore failed: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Restore button in settings

Add a restore button in your app's settings:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class SettingsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)
        
        findViewById<Button>(R.id.restore_button).setOnClickListener {
            restorePurchases()
        }
    }
    
    private fun restorePurchases() {
        // Show loading indicator
        showLoadingIndicator()
        
        Adapty.restorePurchases { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    hideLoadingIndicator()
                    
                    val hasActiveSubscriptions = profile.accessLevels.values.any { it.isActive }
                    if (hasActiveSubscriptions) {
                        showSuccessMessage("Purchases restored successfully!")
                    } else {
                        showInfoMessage("No previous purchases found.")
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    hideLoadingIndicator()
                    showErrorMessage("Restore failed: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class SettingsActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        
        findViewById(R.id.restore_button).setOnClickListener(v -> restorePurchases());
    }
    
    private void restorePurchases() {
        // Show loading indicator
        showLoadingIndicator();
        
        Adapty.restorePurchases(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                hideLoadingIndicator();
                
                boolean hasActiveSubscriptions = profile.getAccessLevels().values().stream()
                    .anyMatch(AdaptyAccessLevel::isActive);
                
                if (hasActiveSubscriptions) {
                    showSuccessMessage("Purchases restored successfully!");
                } else {
                    showInfoMessage("No previous purchases found.");
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                hideLoadingIndicator();
                showErrorMessage("Restore failed: " + error.getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Making purchases](kmp-making-purchases.md) - Learn about making new purchases
- [Check subscription status](kmp-check-subscription-status.md) - Verify purchase status
- [Handle purchase errors](kmp-troubleshoot-purchases.md) - Troubleshoot issues
