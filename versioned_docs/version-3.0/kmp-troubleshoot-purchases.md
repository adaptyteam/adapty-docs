---
title: "Troubleshoot purchases in Kotlin Multiplatform SDK"
description: "Learn how to troubleshoot purchase issues in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Troubleshoot Purchases | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to troubleshoot purchase issues in the Adapty Kotlin Multiplatform SDK.

## Common purchase issues

Here are the most common purchase issues and how to resolve them:

### Error 1003: Can't make payments

This error occurs when the device doesn't support in-app purchases.

**Causes:**
- Device doesn't have Google Play Store
- Google Play Services not available
- Device is rooted/jailbroken
- App not installed from Google Play Store

**Solutions:**

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
product.makePurchase { result ->
    when (result) {
        is AdaptyResult.Success -> {
            // Purchase successful
        }
        is AdaptyResult.Error -> {
            val error = result.error
            when (error.code) {
                1003 -> {
                    // Can't make payments
                    showMessage("In-app purchases are not available on this device. Please install the app from Google Play Store.")
                }
                else -> {
                    // Other errors
                    showErrorMessage("Purchase failed: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
product.makePurchase(result -> {
    if (result instanceof AdaptyResult.Success) {
        // Purchase successful
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        switch (error.getCode()) {
            case 1003:
                // Can't make payments
                showMessage("In-app purchases are not available on this device. Please install the app from Google Play Store.");
                break;
            default:
                // Other errors
                showErrorMessage("Purchase failed: " + error.getMessage());
                break;
        }
    }
});
```
</TabItem>
</Tabs>

### Error 1004: Product not available

This error occurs when a product is not available for purchase.

**Causes:**
- Product not configured in Google Play Console
- Product not approved by Google
- Product not available in user's region
- Product removed from store

**Solutions:**

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
product.makePurchase { result ->
    when (result) {
        is AdaptyResult.Success -> {
            // Purchase successful
        }
        is AdaptyResult.Error -> {
            val error = result.error
            when (error.code) {
                1004 -> {
                    // Product not available
                    showMessage("This product is currently not available. Please try again later.")
                    // Optionally refresh products
                    refreshProducts()
                }
                else -> {
                    // Other errors
                    showErrorMessage("Purchase failed: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
product.makePurchase(result -> {
    if (result instanceof AdaptyResult.Success) {
        // Purchase successful
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        switch (error.getCode()) {
            case 1004:
                // Product not available
                showMessage("This product is currently not available. Please try again later.");
                // Optionally refresh products
                refreshProducts();
                break;
            default:
                // Other errors
                showErrorMessage("Purchase failed: " + error.getMessage());
                break;
        }
    }
});
```
</TabItem>
</Tabs>

### Network errors during purchase

Network errors can occur during the purchase process.

**Solutions:**

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun makePurchaseWithRetry(product: AdaptyProduct, maxRetries: Int = 3) {
    var retryCount = 0
    
    fun attemptPurchase() {
        product.makePurchase { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    // Purchase successful
                    showSuccessMessage("Purchase completed!")
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    if (error.code == 1001 && retryCount < maxRetries) {
                        // Network error - retry
                        retryCount++
                        showMessage("Network error, retrying... (${retryCount}/${maxRetries})")
                        Handler(Looper.getMainLooper()).postDelayed({
                            attemptPurchase()
                        }, 1000 * retryCount) // Exponential backoff
                    } else {
                        // Max retries reached or other error
                        showErrorMessage("Purchase failed: ${error.message}")
                    }
                }
            }
        }
    }
    
    attemptPurchase()
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void makePurchaseWithRetry(AdaptyProduct product, int maxRetries) {
    AtomicInteger retryCount = new AtomicInteger(0);
    
    Runnable attemptPurchase = new Runnable() {
        @Override
        public void run() {
            product.makePurchase(result -> {
                if (result instanceof AdaptyResult.Success) {
                    // Purchase successful
                    showSuccessMessage("Purchase completed!");
                } else if (result instanceof AdaptyResult.Error) {
                    AdaptyError error = ((AdaptyResult.Error) result).getError();
                    if (error.getCode() == 1001 && retryCount.get() < maxRetries) {
                        // Network error - retry
                        retryCount.incrementAndGet();
                        showMessage("Network error, retrying... (" + retryCount.get() + "/" + maxRetries + ")");
                        new Handler(Looper.getMainLooper()).postDelayed(this, 1000 * retryCount.get());
                    } else {
                        // Max retries reached or other error
                        showErrorMessage("Purchase failed: " + error.getMessage());
                    }
                }
            });
        }
    };
    
    attemptPurchase.run();
}
```
</TabItem>
</Tabs>

## Debug purchase issues

### Enable debug logging

Enable debug logging to get more information about purchase issues:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// Enable debug logging
Adapty.setLogLevel(AdaptyLogLevel.DEBUG)

// Make purchase with detailed logging
product.makePurchase { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val purchase = result.value
            Log.d("Purchase", "Purchase successful: ${purchase.vendorProductId}")
            Log.d("Purchase", "Purchase details: $purchase")
        }
        is AdaptyResult.Error -> {
            val error = result.error
            Log.e("Purchase", "Purchase failed with code: ${error.code}")
            Log.e("Purchase", "Error message: ${error.message}")
            Log.e("Purchase", "Error details: ${error.details}")
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// Enable debug logging
Adapty.setLogLevel(AdaptyLogLevel.DEBUG);

// Make purchase with detailed logging
product.makePurchase(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
        Log.d("Purchase", "Purchase successful: " + purchase.getVendorProductId());
        Log.d("Purchase", "Purchase details: " + purchase);
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        Log.e("Purchase", "Purchase failed with code: " + error.getCode());
        Log.e("Purchase", "Error message: " + error.getMessage());
        Log.e("Purchase", "Error details: " + error.getDetails());
    }
});
```
</TabItem>
</Tabs>

### Check product availability

Before making a purchase, check if the product is available:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun checkProductAvailability(product: AdaptyProduct) {
    Log.d("Product", "Product ID: ${product.vendorProductId}")
    Log.d("Product", "Title: ${product.localizedTitle}")
    Log.d("Product", "Description: ${product.localizedDescription}")
    Log.d("Product", "Price: ${product.localizedPrice}")
    Log.d("Product", "Currency: ${product.currencyCode}")
    
    // Check if product has subscription period
    if (product.subscriptionPeriod != null) {
        Log.d("Product", "Subscription period: ${product.subscriptionPeriod}")
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void checkProductAvailability(AdaptyProduct product) {
    Log.d("Product", "Product ID: " + product.getVendorProductId());
    Log.d("Product", "Title: " + product.getLocalizedTitle());
    Log.d("Product", "Description: " + product.getLocalizedDescription());
    Log.d("Product", "Price: " + product.getLocalizedPrice());
    Log.d("Product", "Currency: " + product.getCurrencyCode());
    
    // Check if product has subscription period
    if (product.getSubscriptionPeriod() != null) {
        Log.d("Product", "Subscription period: " + product.getSubscriptionPeriod());
    }
}
```
</TabItem>
</Tabs>

## Purchase validation

### Verify purchase completion

After a successful purchase, verify that the user's profile has been updated:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun verifyPurchaseCompletion(productId: String) {
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val profile = result.value
                
                // Check if user has access to the purchased product
                val hasAccess = profile.accessLevels.values.any { accessLevel ->
                    accessLevel.isActive && accessLevel.vendorProductId == productId
                }
                
                if (hasAccess) {
                    Log.d("Purchase", "Purchase verified - user has access")
                    showSuccessMessage("Purchase completed and verified!")
                } else {
                    Log.w("Purchase", "Purchase not reflected in profile yet")
                    showMessage("Purchase completed! Please wait a moment for access to be granted.")
                }
            }
            is AdaptyResult.Error -> {
                Log.e("Purchase", "Failed to verify purchase: ${result.error.message}")
                showMessage("Purchase completed! Please restart the app to verify access.")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void verifyPurchaseCompletion(String productId) {
    Adapty.getProfile(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
            
            // Check if user has access to the purchased product
            boolean hasAccess = profile.getAccessLevels().values().stream()
                .anyMatch(accessLevel -> accessLevel.isActive() && 
                         productId.equals(accessLevel.getVendorProductId()));
            
            if (hasAccess) {
                Log.d("Purchase", "Purchase verified - user has access");
                showSuccessMessage("Purchase completed and verified!");
            } else {
                Log.w("Purchase", "Purchase not reflected in profile yet");
                showMessage("Purchase completed! Please wait a moment for access to be granted.");
            }
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Purchase", "Failed to verify purchase: " + ((AdaptyResult.Error) result).getError().getMessage());
            showMessage("Purchase completed! Please restart the app to verify access.");
        }
    });
}
```
</TabItem>
</Tabs>

## Common troubleshooting steps

### 1. Check SDK initialization

Ensure the SDK is properly initialized:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun checkSDKInitialization() {
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                Log.d("SDK", "SDK is properly initialized")
            }
            is AdaptyResult.Error -> {
                val error = result.error
                if (error.code == 1002) {
                    Log.e("SDK", "SDK not initialized - check your SDK key")
                } else {
                    Log.e("SDK", "SDK error: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void checkSDKInitialization() {
    Adapty.getProfile(result -> {
        if (result instanceof AdaptyResult.Success) {
            Log.d("SDK", "SDK is properly initialized");
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            if (error.getCode() == 1002) {
                Log.e("SDK", "SDK not initialized - check your SDK key");
            } else {
                Log.e("SDK", "SDK error: " + error.getMessage());
            }
        }
    });
}
```
</TabItem>
</Tabs>

### 2. Check network connectivity

Verify network connectivity before making purchases:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun checkNetworkConnectivity(): Boolean {
    val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    val network = connectivityManager.activeNetwork
    val capabilities = connectivityManager.getNetworkCapabilities(network)
    
    return capabilities != null && (
        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)
    )
}

fun makePurchaseWithNetworkCheck(product: AdaptyProduct) {
    if (!checkNetworkConnectivity()) {
        showMessage("No internet connection. Please check your network and try again.")
        return
    }
    
    product.makePurchase { result ->
        // Handle purchase result
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public boolean checkNetworkConnectivity() {
    ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
    Network network = connectivityManager.getActiveNetwork();
    NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(network);
    
    return capabilities != null && (
        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)
    );
}

public void makePurchaseWithNetworkCheck(AdaptyProduct product) {
    if (!checkNetworkConnectivity()) {
        showMessage("No internet connection. Please check your network and try again.");
        return;
    }
    
    product.makePurchase(result -> {
        // Handle purchase result
    });
}
```
</TabItem>
</Tabs>

## Next steps

- [Handle errors](kmp-handle-errors.md) - Learn about general error handling
- [Test integration](kmp-test.md) - Test your purchase flow
- [Fix for Code-1003 cantMakePayments error](cantMakePayments-kmp.md) - Specific fix for payment issues
