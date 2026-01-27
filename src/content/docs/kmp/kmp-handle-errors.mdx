---
title: "Handle errors in Kotlin Multiplatform SDK"
description: "Learn how to handle errors in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Handle Errors | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers error handling in the Adapty Kotlin Multiplatform SDK.

## Error handling basics

All Adapty SDK methods return results that can be either success or error. Always handle both cases:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // Handle success
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle error
            Log.e("Adapty", "Error: ${error.message}")
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.getProfile(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // Handle success
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle error
        Log.e("Adapty", "Error: " + error.getMessage());
    }
});
```
</TabItem>
</Tabs>

## Common error codes

| Error Code | Description | Solution |
|------------|-------------|----------|
| 1000 | No product IDs found | Check product configuration in dashboard |
| 1001 | Network error | Check internet connection |
| 1002 | Invalid SDK key | Verify your SDK key |
| 1003 | Can't make payments | Device doesn't support payments |
| 1004 | Product not available | Product not configured in store |

## Handle specific errors

### Network errors

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.getPaywall("main") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            // Use paywall
        }
        is AdaptyResult.Error -> {
            val error = result.error
            when (error.code) {
                1001 -> {
                    // Network error - show offline message
                    showOfflineMessage()
                }
                else -> {
                    // Other errors
                    showErrorMessage(error.message)
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.getPaywall("main", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        // Use paywall
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        switch (error.getCode()) {
            case 1001:
                // Network error - show offline message
                showOfflineMessage();
                break;
            default:
                // Other errors
                showErrorMessage(error.getMessage());
                break;
        }
    }
});
```
</TabItem>
</Tabs>

### Purchase errors

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
                    // Other purchase errors
                    showPurchaseErrorMessage(error.message)
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
        AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
        // Purchase successful
        showSuccessMessage();
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
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
                // Other purchase errors
                showPurchaseErrorMessage(error.getMessage());
                break;
        }
    }
});
```
</TabItem>
</Tabs>

## Error recovery strategies

### Retry on network errors

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun getPaywallWithRetry(placementId: String, maxRetries: Int = 3) {
    var retryCount = 0
    
    fun attemptGetPaywall() {
        Adapty.getPaywall(placementId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    // Use paywall
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    if (error.code == 1001 && retryCount < maxRetries) {
                        // Network error - retry
                        retryCount++
                        Handler(Looper.getMainLooper()).postDelayed({
                            attemptGetPaywall()
                        }, 1000 * retryCount) // Exponential backoff
                    } else {
                        // Max retries reached or other error
                        showErrorMessage(error.message)
                    }
                }
            }
        }
    }
    
    attemptGetPaywall()
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void getPaywallWithRetry(String placementId, int maxRetries) {
    AtomicInteger retryCount = new AtomicInteger(0);
    
    Runnable attemptGetPaywall = new Runnable() {
        @Override
        public void run() {
            Adapty.getPaywall(placementId, result -> {
                if (result instanceof AdaptyResult.Success) {
                    AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                    // Use paywall
                } else if (result instanceof AdaptyResult.Error) {
                    AdaptyError error = ((AdaptyResult.Error) result).getError();
                    if (error.getCode() == 1001 && retryCount.get() < maxRetries) {
                        // Network error - retry
                        retryCount.incrementAndGet();
                        new Handler(Looper.getMainLooper()).postDelayed(this, 1000 * retryCount.get());
                    } else {
                        // Max retries reached or other error
                        showErrorMessage(error.getMessage());
                    }
                }
            });
        }
    };
    
    attemptGetPaywall.run();
}
```
</TabItem>
</Tabs>

### Fallback to cached data

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class PaywallManager {
    private var cachedPaywall: AdaptyPaywall? = null
    
    fun getPaywall(placementId: String) {
        Adapty.getPaywall(placementId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    cachedPaywall = paywall
                    showPaywall(paywall)
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    if (error.code == 1001 && cachedPaywall != null) {
                        // Network error - use cached paywall
                        showPaywall(cachedPaywall!!)
                        showOfflineIndicator()
                    } else {
                        // No cache available or other error
                        showErrorMessage(error.message)
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
public class PaywallManager {
    private AdaptyPaywall cachedPaywall;
    
    public void getPaywall(String placementId) {
        Adapty.getPaywall(placementId, result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                cachedPaywall = paywall;
                showPaywall(paywall);
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                if (error.getCode() == 1001 && cachedPaywall != null) {
                    // Network error - use cached paywall
                    showPaywall(cachedPaywall);
                    showOfflineIndicator();
                } else {
                    // No cache available or other error
                    showErrorMessage(error.getMessage());
                }
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Fix for Code-1000 noProductIDsFound error](InvalidProductIdentifiers-kmp.md)
- [Fix for Code-1003 cantMakePayments error](cantMakePayments-kmp.md)
- [Complete API reference](https://kotlin.adapty.io) - Full SDK documentation
