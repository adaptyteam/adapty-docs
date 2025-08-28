---
title: "Test your Kotlin Multiplatform SDK integration"
description: "Learn how to test your Adapty Kotlin Multiplatform SDK integration."
metadataTitle: "Test Integration | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to test your Adapty Kotlin Multiplatform SDK integration.

## Testing overview

Testing your Adapty integration is crucial to ensure everything works correctly. Here are the key areas to test:

- **SDK initialization** - Verify the SDK initializes properly
- **Paywall loading** - Test paywall retrieval and display
- **Purchase flow** - Test the complete purchase process
- **Subscription status** - Verify subscription checking works
- **Error handling** - Test error scenarios

## Test SDK initialization

First, test that the SDK initializes correctly:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class AdaptyTest {
    fun testInitialization() {
        // Test SDK initialization
        Adapty.activate("YOUR_SDK_KEY") { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    Log.d("Test", "SDK initialized successfully")
                    // Continue with other tests
                    testGetProfile()
                }
                is AdaptyResult.Error -> {
                    Log.e("Test", "SDK initialization failed: ${result.error.message}")
                }
            }
        }
    }
    
    private fun testGetProfile() {
        Adapty.getProfile { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    Log.d("Test", "Profile retrieved: ${profile.profileId}")
                }
                is AdaptyResult.Error -> {
                    Log.e("Test", "Get profile failed: ${result.error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class AdaptyTest {
    public void testInitialization() {
        // Test SDK initialization
        Adapty.activate("YOUR_SDK_KEY", result -> {
            if (result instanceof AdaptyResult.Success) {
                Log.d("Test", "SDK initialized successfully");
                // Continue with other tests
                testGetProfile();
            } else if (result instanceof AdaptyResult.Error) {
                Log.e("Test", "SDK initialization failed: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
    
    private void testGetProfile() {
        Adapty.getProfile(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                Log.d("Test", "Profile retrieved: " + profile.getProfileId());
            } else if (result instanceof AdaptyResult.Error) {
                Log.e("Test", "Get profile failed: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Test paywall loading

Test that paywalls load correctly:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun testPaywallLoading() {
    Adapty.getPaywall("test_placement") { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                Log.d("Test", "Paywall loaded: ${paywall.id}")
                Log.d("Test", "Products count: ${paywall.products.size}")
                
                // Test each product
                paywall.products.forEach { product ->
                    Log.d("Test", "Product: ${product.localizedTitle} - ${product.localizedPrice}")
                }
            }
            is AdaptyResult.Error -> {
                Log.e("Test", "Paywall loading failed: ${result.error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void testPaywallLoading() {
    Adapty.getPaywall("test_placement", result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            Log.d("Test", "Paywall loaded: " + paywall.getId());
            Log.d("Test", "Products count: " + paywall.getProducts().size());
            
            // Test each product
            for (AdaptyProduct product : paywall.getProducts()) {
                Log.d("Test", "Product: " + product.getLocalizedTitle() + " - " + product.getLocalizedPrice());
            }
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Test", "Paywall loading failed: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Test purchase flow

Test the complete purchase flow (use test products):

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun testPurchaseFlow() {
    // First get a paywall
    Adapty.getPaywall("test_placement") { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                val testProduct = paywall.products.firstOrNull()
                
                if (testProduct != null) {
                    // Test purchase
                    testProduct.makePurchase { purchaseResult ->
                        when (purchaseResult) {
                            is AdaptyResult.Success -> {
                                val purchase = purchaseResult.value
                                Log.d("Test", "Purchase successful: ${purchase.vendorProductId}")
                                
                                // Verify profile updated
                                testProfileAfterPurchase()
                            }
                            is AdaptyResult.Error -> {
                                Log.e("Test", "Purchase failed: ${purchaseResult.error.message}")
                            }
                        }
                    }
                } else {
                    Log.e("Test", "No test products available")
                }
            }
            is AdaptyResult.Error -> {
                Log.e("Test", "Failed to get paywall: ${result.error.message}")
            }
        }
    }
}

private fun testProfileAfterPurchase() {
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val profile = result.value
                Log.d("Test", "Profile after purchase: ${profile.accessLevels}")
            }
            is AdaptyResult.Error -> {
                Log.e("Test", "Failed to get profile after purchase: ${result.error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void testPurchaseFlow() {
    // First get a paywall
    Adapty.getPaywall("test_placement", result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            AdaptyProduct testProduct = paywall.getProducts().isEmpty() ? null : paywall.getProducts().get(0);
            
            if (testProduct != null) {
                // Test purchase
                testProduct.makePurchase(purchaseResult -> {
                    if (purchaseResult instanceof AdaptyResult.Success) {
                        AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) purchaseResult).getValue();
                        Log.d("Test", "Purchase successful: " + purchase.getVendorProductId());
                        
                        // Verify profile updated
                        testProfileAfterPurchase();
                    } else if (purchaseResult instanceof AdaptyResult.Error) {
                        Log.e("Test", "Purchase failed: " + ((AdaptyResult.Error) purchaseResult).getError().getMessage());
                    }
                });
            } else {
                Log.e("Test", "No test products available");
            }
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Test", "Failed to get paywall: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
}

private void testProfileAfterPurchase() {
    Adapty.getProfile(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
            Log.d("Test", "Profile after purchase: " + profile.getAccessLevels());
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Test", "Failed to get profile after purchase: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Test error handling

Test various error scenarios:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun testErrorHandling() {
    // Test invalid placement ID
    Adapty.getPaywall("invalid_placement") { result ->
        when (result) {
            is AdaptyResult.Success -> {
                Log.d("Test", "Unexpected success with invalid placement")
            }
            is AdaptyResult.Error -> {
                Log.d("Test", "Expected error with invalid placement: ${result.error.message}")
            }
        }
    }
    
    // Test invalid SDK key
    Adapty.activate("invalid_key") { result ->
        when (result) {
            is AdaptyResult.Success -> {
                Log.d("Test", "Unexpected success with invalid key")
            }
            is AdaptyResult.Error -> {
                Log.d("Test", "Expected error with invalid key: ${result.error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void testErrorHandling() {
    // Test invalid placement ID
    Adapty.getPaywall("invalid_placement", result -> {
        if (result instanceof AdaptyResult.Success) {
            Log.d("Test", "Unexpected success with invalid placement");
        } else if (result instanceof AdaptyResult.Error) {
            Log.d("Test", "Expected error with invalid placement: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
    
    // Test invalid SDK key
    Adapty.activate("invalid_key", result -> {
        if (result instanceof AdaptyResult.Success) {
            Log.d("Test", "Unexpected success with invalid key");
        } else if (result instanceof AdaptyResult.Error) {
            Log.d("Test", "Expected error with invalid key: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Test subscription status checking

Test subscription status checking:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun testSubscriptionStatus() {
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val profile = result.value
                
                // Test access level checking
                val hasPremium = profile.accessLevels["premium"]?.isActive == true
                val hasPro = profile.accessLevels["pro"]?.isActive == true
                
                Log.d("Test", "Has premium: $hasPremium")
                Log.d("Test", "Has pro: $hasPro")
                
                // Test all access levels
                profile.accessLevels.forEach { (levelId, accessLevel) ->
                    Log.d("Test", "Access level $levelId: active=${accessLevel.isActive}")
                }
            }
            is AdaptyResult.Error -> {
                Log.e("Test", "Failed to get profile: ${result.error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void testSubscriptionStatus() {
    Adapty.getProfile(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
            
            // Test access level checking
            boolean hasPremium = profile.getAccessLevels().get("premium") != null && 
                                profile.getAccessLevels().get("premium").isActive();
            boolean hasPro = profile.getAccessLevels().get("pro") != null && 
                            profile.getAccessLevels().get("pro").isActive();
            
            Log.d("Test", "Has premium: " + hasPremium);
            Log.d("Test", "Has pro: " + hasPro);
            
            // Test all access levels
            for (Map.Entry<String, AdaptyAccessLevel> entry : profile.getAccessLevels().entrySet()) {
                String levelId = entry.getKey();
                AdaptyAccessLevel accessLevel = entry.getValue();
                Log.d("Test", "Access level " + levelId + ": active=" + accessLevel.isActive());
            }
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Test", "Failed to get profile: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Test profile update listener

Test the profile update listener:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun testProfileUpdateListener() {
    // Set up listener
    Adapty.setOnProfileUpdatedListener { profile ->
        Log.d("Test", "Profile updated: ${profile.profileId}")
        Log.d("Test", "Access levels: ${profile.accessLevels}")
    }
    
    // Trigger a profile update (e.g., by making a purchase)
    Log.d("Test", "Profile update listener set up - make a purchase to test")
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void testProfileUpdateListener() {
    // Set up listener
    Adapty.setOnProfileUpdatedListener(profile -> {
        Log.d("Test", "Profile updated: " + profile.getProfileId());
        Log.d("Test", "Access levels: " + profile.getAccessLevels());
    });
    
    // Trigger a profile update (e.g., by making a purchase)
    Log.d("Test", "Profile update listener set up - make a purchase to test");
}
```
</TabItem>
</Tabs>

## Complete test suite

Here's a complete test suite you can run:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class AdaptyTestSuite {
    fun runAllTests() {
        Log.d("Test", "Starting Adapty test suite")
        
        // Test initialization
        testInitialization()
        
        // Test profile retrieval
        testGetProfile()
        
        // Test paywall loading
        testPaywallLoading()
        
        // Test subscription status
        testSubscriptionStatus()
        
        // Test error handling
        testErrorHandling()
        
        // Test profile update listener
        testProfileUpdateListener()
        
        Log.d("Test", "Adapty test suite completed")
    }
    
    // ... implement all test methods above
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class AdaptyTestSuite {
    public void runAllTests() {
        Log.d("Test", "Starting Adapty test suite");
        
        // Test initialization
        testInitialization();
        
        // Test profile retrieval
        testGetProfile();
        
        // Test paywall loading
        testPaywallLoading();
        
        // Test subscription status
        testSubscriptionStatus();
        
        // Test error handling
        testErrorHandling();
        
        // Test profile update listener
        testProfileUpdateListener();
        
        Log.d("Test", "Adapty test suite completed");
    }
    
    // ... implement all test methods above
}
```
</TabItem>
</Tabs>

## Testing checklist

Use this checklist to ensure comprehensive testing:

- [ ] SDK initializes with valid key
- [ ] SDK fails with invalid key
- [ ] Profile can be retrieved
- [ ] Paywalls can be loaded
- [ ] Products are available in paywalls
- [ ] Purchase flow works (with test products)
- [ ] Profile updates after purchase
- [ ] Subscription status is correct
- [ ] Error handling works for invalid inputs
- [ ] Profile update listener triggers
- [ ] Restore purchases works
- [ ] User identification works

## Next steps

- [Handle errors](kmp-handle-errors.md) - Learn about error handling
- [Troubleshoot purchases](kmp-troubleshoot-purchases.md) - Debug purchase issues
- [Troubleshoot paywall builder](kmp-troubleshoot-paywall-builder.md) - Debug paywall issues
