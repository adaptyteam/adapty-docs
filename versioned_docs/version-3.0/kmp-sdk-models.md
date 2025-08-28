---
title: "SDK models in Kotlin Multiplatform SDK"
description: "Data models and structures used by the Adapty Kotlin Multiplatform SDK."
metadataTitle: "SDK Models | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes the main data models and structures used by the Adapty Kotlin Multiplatform SDK.

## AdaptyProfile

Represents a user's profile with their subscription status and access levels.

### Properties

- `accessLevels: Map<String, AdaptyAccessLevel>` - User's access levels
- `customerUserId: String?` - Custom user identifier
- `profileId: String` - Unique profile identifier

## AdaptyAccessLevel

Represents an access level that defines what features a user can access.

### Properties

- `id: String` - Access level identifier
- `isActive: Boolean` - Whether the access level is currently active
- `expiresAt: String?` - Expiration date (ISO 8601 format)
- `vendorProductId: String?` - Associated product identifier

## AdaptyPaywall

Represents a paywall configuration with products and visual settings.

### Properties

- `id: String` - Paywall identifier
- `products: List<AdaptyProduct>` - Available products
- `hasViewConfiguration: Boolean` - Whether paywall has visual configuration
- `placementId: String` - Associated placement identifier

## AdaptyProduct

Represents a product available for purchase.

### Properties

- `vendorProductId: String` - Product identifier
- `localizedTitle: String` - Localized product title
- `localizedDescription: String` - Localized product description
- `localizedPrice: String` - Localized price string
- `price: Double` - Product price
- `currencyCode: String` - Currency code
- `subscriptionPeriod: String?` - Subscription period (for subscriptions)

## AdaptyError

Represents an error that occurred during SDK operations.

### Properties

- `code: Int` - Error code
- `message: String` - Error message
- `details: String?` - Additional error details

## Example usage

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// Get user profile
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            
            // Check access level
            val premiumAccess = profile.accessLevels["premium"]
            if (premiumAccess?.isActive == true) {
                // User has premium access
                unlockPremiumFeatures()
            }
            
            // Get user ID
            val userId = profile.customerUserId
        }
        is AdaptyResult.Error -> {
            val error = result.error
            Log.e("Adapty", "Error: ${error.message}")
        }
    }
}

// Get paywall
Adapty.getPaywall("main") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            
            // Access products
            paywall.products.forEach { product ->
                Log.d("Adapty", "Product: ${product.localizedTitle} - ${product.localizedPrice}")
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            Log.e("Adapty", "Error: ${error.message}")
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// Get user profile
Adapty.getProfile(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        
        // Check access level
        AdaptyAccessLevel premiumAccess = profile.getAccessLevels().get("premium");
        if (premiumAccess != null && premiumAccess.isActive()) {
            // User has premium access
            unlockPremiumFeatures();
        }
        
        // Get user ID
        String userId = profile.getCustomerUserId();
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        Log.e("Adapty", "Error: " + error.getMessage());
    }
});

// Get paywall
Adapty.getPaywall("main", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        
        // Access products
        for (AdaptyProduct product : paywall.getProducts()) {
            Log.d("Adapty", "Product: " + product.getLocalizedTitle() + " - " + product.getLocalizedPrice());
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        Log.e("Adapty", "Error: " + error.getMessage());
    }
});
```
</TabItem>
</Tabs>

## Next steps

- [Handle errors](kmp-handle-errors.md) - Learn about error handling
- [Complete API reference](https://kotlin.adapty.io) - Full SDK documentation
