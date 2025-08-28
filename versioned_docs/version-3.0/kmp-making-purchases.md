---
title: "Making purchases in Kotlin Multiplatform SDK"
description: "Learn how to make purchases in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Making Purchases | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to make purchases using the Adapty Kotlin Multiplatform SDK.

## Make a purchase

To make a purchase, call the `makePurchase` method on a product:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
product.makePurchase { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val purchase = result.value
            // Purchase successful
            showSuccessMessage()
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle error
            showErrorMessage(error.message)
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
product.makePurchase(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
        // Purchase successful
        showSuccessMessage();
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle error
        showErrorMessage(error.getMessage());
    }
});
```
</TabItem>
</Tabs>

## Purchase flow

Here's a complete example of the purchase flow:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class PurchaseManager {
    fun purchaseProduct(product: AdaptyProduct) {
        // Show loading indicator
        showLoadingIndicator()
        
        product.makePurchase { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val purchase = result.value
                    // Purchase successful
                    hideLoadingIndicator()
                    showSuccessMessage("Purchase successful!")
                    
                    // Update UI to reflect new subscription status
                    updateSubscriptionStatus()
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    // Handle error
                    hideLoadingIndicator()
                    
                    when (error.code) {
                        1003 -> {
                            // Can't make payments
                            showPaymentNotAvailableMessage()
                        }
                        1004 -> {
                            // Product not available
                            showProductNotAvailableMessage()
                        }
                        else -> {
                            // Other errors
                            showErrorMessage("Purchase failed: ${error.message}")
                        }
                    }
                }
            }
        }
    }
    
    private fun updateSubscriptionStatus() {
        // Get updated profile to reflect new subscription
        Adapty.getProfile { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    // Update UI based on new profile
                    updateUI(profile)
                }
                is AdaptyResult.Error -> {
                    // Handle error
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class PurchaseManager {
    public void purchaseProduct(AdaptyProduct product) {
        // Show loading indicator
        showLoadingIndicator();
        
        product.makePurchase(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
                // Purchase successful
                hideLoadingIndicator();
                showSuccessMessage("Purchase successful!");
                
                // Update UI to reflect new subscription status
                updateSubscriptionStatus();
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                // Handle error
                hideLoadingIndicator();
                
                switch (error.getCode()) {
                    case 1003:
                        // Can't make payments
                        showPaymentNotAvailableMessage();
                        break;
                    case 1004:
                        // Product not available
                        showProductNotAvailableMessage();
                        break;
                    default:
                        // Other errors
                        showErrorMessage("Purchase failed: " + error.getMessage());
                        break;
                }
            }
        });
    }
    
    private void updateSubscriptionStatus() {
        // Get updated profile to reflect new subscription
        Adapty.getProfile(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                // Update UI based on new profile
                updateUI(profile);
            } else if (result instanceof AdaptyResult.Error) {
                // Handle error
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Purchase with custom parameters

You can pass additional parameters when making a purchase:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val purchaseParams = mapOf(
    "custom_param" to "value",
    "source" to "paywall_main"
)

product.makePurchase(purchaseParams) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val purchase = result.value
            // Purchase successful
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
Map<String, String> purchaseParams = new HashMap<>();
purchaseParams.put("custom_param", "value");
purchaseParams.put("source", "paywall_main");

product.makePurchase(purchaseParams, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
        // Purchase successful
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle error
    }
});
```
</TabItem>
</Tabs>

## Handle purchase events

You can listen for purchase events to update your UI in real-time:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.setOnProfileUpdatedListener { profile ->
    // Profile updated - check if user has new access
    val hasPremium = profile.accessLevels["premium"]?.isActive == true
    if (hasPremium) {
        // User just got premium access
        unlockPremiumFeatures()
        showWelcomeMessage()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.setOnProfileUpdatedListener(profile -> {
    // Profile updated - check if user has new access
    boolean hasPremium = profile.getAccessLevels().get("premium") != null && 
                        profile.getAccessLevels().get("premium").isActive();
    if (hasPremium) {
        // User just got premium access
        unlockPremiumFeatures();
        showWelcomeMessage();
    }
});
```
</TabItem>
</Tabs>

## Restore purchases

To restore previous purchases:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.restorePurchases { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // Purchases restored
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
        // Purchases restored
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

## Next steps

- [Restore purchases](kmp-restore-purchase.md) - Learn more about purchase restoration
- [Handle purchase errors](kmp-troubleshoot-purchases.md) - Troubleshoot purchase issues
- [Check subscription status](kmp-check-subscription-status.md) - Verify purchase status
