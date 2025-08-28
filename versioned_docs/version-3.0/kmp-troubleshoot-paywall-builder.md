---
title: "Troubleshoot Paywall Builder in Kotlin Multiplatform SDK"
description: "Learn how to troubleshoot Paywall Builder issues in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Troubleshoot Paywall Builder | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to troubleshoot Paywall Builder issues in the Adapty Kotlin Multiplatform SDK.

## Common Paywall Builder issues

Here are the most common Paywall Builder issues and how to resolve them:

### Paywall not loading

If paywalls created in the Paywall Builder are not loading:

**Causes:**
- Invalid placement ID
- Paywall not published
- Network connectivity issues
- SDK not initialized

**Solutions:**

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun troubleshootPaywallLoading(placementId: String) {
    // First check SDK initialization
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                // SDK is initialized, try to get paywall
                Adapty.getPaywall(placementId) { paywallResult ->
                    when (paywallResult) {
                        is AdaptyResult.Success -> {
                            val paywall = paywallResult.value
                            Log.d("Paywall", "Paywall loaded successfully: ${paywall.id}")
                            
                            // Check if paywall has view configuration
                            if (paywall.hasViewConfiguration) {
                                Log.d("Paywall", "Paywall has view configuration")
                            } else {
                                Log.w("Paywall", "Paywall does not have view configuration")
                            }
                        }
                        is AdaptyResult.Error -> {
                            val error = paywallResult.error
                            Log.e("Paywall", "Failed to load paywall: ${error.message}")
                            
                            when (error.code) {
                                1001 -> {
                                    showMessage("Network error. Please check your internet connection.")
                                }
                                else -> {
                                    showMessage("Failed to load paywall. Please try again later.")
                                }
                            }
                        }
                    }
                }
            }
            is AdaptyResult.Error -> {
                Log.e("SDK", "SDK not initialized: ${result.error.message}")
                showMessage("SDK not initialized. Please restart the app.")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void troubleshootPaywallLoading(String placementId) {
    // First check SDK initialization
    Adapty.getProfile(result -> {
        if (result instanceof AdaptyResult.Success) {
            // SDK is initialized, try to get paywall
            Adapty.getPaywall(placementId, paywallResult -> {
                if (paywallResult instanceof AdaptyResult.Success) {
                    AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) paywallResult).getValue();
                    Log.d("Paywall", "Paywall loaded successfully: " + paywall.getId());
                    
                    // Check if paywall has view configuration
                    if (paywall.hasViewConfiguration()) {
                        Log.d("Paywall", "Paywall has view configuration");
                    } else {
                        Log.w("Paywall", "Paywall does not have view configuration");
                    }
                } else if (paywallResult instanceof AdaptyResult.Error) {
                    AdaptyError error = ((AdaptyResult.Error) paywallResult).getError();
                    Log.e("Paywall", "Failed to load paywall: " + error.getMessage());
                    
                    switch (error.getCode()) {
                        case 1001:
                            showMessage("Network error. Please check your internet connection.");
                            break;
                        default:
                            showMessage("Failed to load paywall. Please try again later.");
                            break;
                    }
                }
            });
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("SDK", "SDK not initialized: " + ((AdaptyResult.Error) result).getError().getMessage());
            showMessage("SDK not initialized. Please restart the app.");
        }
    });
}
```
</TabItem>
</Tabs>

### Paywall view not displaying

If the paywall loads but the view doesn't display:

**Causes:**
- Missing view configuration
- Invalid activity context
- UI rendering issues

**Solutions:**

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun troubleshootPaywallView(paywall: AdaptyPaywall, activity: Activity) {
    // Check if paywall has view configuration
    if (!paywall.hasViewConfiguration) {
        Log.e("Paywall", "Paywall does not have view configuration")
        showMessage("Paywall configuration error. Please contact support.")
        return
    }
    
    // Get view configuration
    AdaptyUI.getViewConfiguration(paywall) { configResult ->
        when (configResult) {
            is AdaptyResult.Success -> {
                val viewConfiguration = configResult.value
                Log.d("Paywall", "View configuration loaded successfully")
                
                // Create paywall view
                val paywallView = AdaptyUI.getPaywallView(
                    activity,
                    viewConfiguration,
                    null, // products = null means auto-fetch
                    eventListener
                )
                
                // Add to view hierarchy
                setContentView(paywallView)
                Log.d("Paywall", "Paywall view displayed successfully")
            }
            is AdaptyResult.Error -> {
                val error = configResult.error
                Log.e("Paywall", "Failed to get view configuration: ${error.message}")
                showMessage("Failed to load paywall. Please try again.")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void troubleshootPaywallView(AdaptyPaywall paywall, Activity activity) {
    // Check if paywall has view configuration
    if (!paywall.hasViewConfiguration()) {
        Log.e("Paywall", "Paywall does not have view configuration");
        showMessage("Paywall configuration error. Please contact support.");
        return;
    }
    
    // Get view configuration
    AdaptyUI.getViewConfiguration(paywall, configResult -> {
        if (configResult instanceof AdaptyResult.Success) {
            AdaptyUI.LocalizedViewConfiguration viewConfiguration = 
                ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();
            Log.d("Paywall", "View configuration loaded successfully");
            
            // Create paywall view
            AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
                activity,
                viewConfiguration,
                null, // products = null means auto-fetch
                eventListener
            );
            
            // Add to view hierarchy
            setContentView(paywallView);
            Log.d("Paywall", "Paywall view displayed successfully");
        } else if (configResult instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) configResult).getError();
            Log.e("Paywall", "Failed to get view configuration: " + error.getMessage());
            showMessage("Failed to load paywall. Please try again.");
        }
    });
}
```
</TabItem>
</Tabs>

### Paywall actions not working

If paywall actions (buttons, links) are not working:

**Causes:**
- Missing event listener
- Incorrect action handling
- Context issues

**Solutions:**

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val eventListener = object : AdaptyUIEventListener {
    override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
        Log.d("Paywall", "Action performed: $action")
        
        when (action) {
            is AdaptyUI.Action.Close -> {
                Log.d("Paywall", "Close action triggered")
                (context as? Activity)?.onBackPressed()
            }
            is AdaptyUI.Action.OpenURL -> {
                Log.d("Paywall", "Open URL action triggered: ${action.url}")
                try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(action.url))
                    context.startActivity(intent)
                } catch (e: Exception) {
                    Log.e("Paywall", "Failed to open URL: ${e.message}")
                    showMessage("Failed to open link. Please try again.")
                }
            }
            is AdaptyUI.Action.MakePurchase -> {
                Log.d("Paywall", "Make purchase action triggered")
                // Handle purchase action
                handlePurchaseAction(action.product)
            }
            else -> {
                Log.d("Paywall", "Unhandled action: $action")
            }
        }
    }
}

private fun handlePurchaseAction(product: AdaptyProduct) {
    product.makePurchase { result ->
        when (result) {
            is AdaptyResult.Success -> {
                Log.d("Paywall", "Purchase successful")
                showSuccessMessage("Purchase completed!")
            }
            is AdaptyResult.Error -> {
                Log.e("Paywall", "Purchase failed: ${result.error.message}")
                showErrorMessage("Purchase failed: ${result.error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
AdaptyUIEventListener eventListener = new AdaptyUIEventListener() {
    @Override
    public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
        Log.d("Paywall", "Action performed: " + action);
        
        if (action instanceof AdaptyUI.Action.Close) {
            Log.d("Paywall", "Close action triggered");
            if (context instanceof Activity) {
                ((Activity) context).onBackPressed();
            }
        } else if (action instanceof AdaptyUI.Action.OpenURL) {
            Log.d("Paywall", "Open URL action triggered: " + ((AdaptyUI.Action.OpenURL) action).getUrl());
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(((AdaptyUI.Action.OpenURL) action).getUrl()));
                context.startActivity(intent);
            } catch (Exception e) {
                Log.e("Paywall", "Failed to open URL: " + e.getMessage());
                showMessage("Failed to open link. Please try again.");
            }
        } else if (action instanceof AdaptyUI.Action.MakePurchase) {
            Log.d("Paywall", "Make purchase action triggered");
            // Handle purchase action
            handlePurchaseAction(((AdaptyUI.Action.MakePurchase) action).getProduct());
        } else {
            Log.d("Paywall", "Unhandled action: " + action);
        }
    }
};

private void handlePurchaseAction(AdaptyProduct product) {
    product.makePurchase(result -> {
        if (result instanceof AdaptyResult.Success) {
            Log.d("Paywall", "Purchase successful");
            showSuccessMessage("Purchase completed!");
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Paywall", "Purchase failed: " + ((AdaptyResult.Error) result).getError().getMessage());
            showErrorMessage("Purchase failed: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Debug Paywall Builder issues

### Enable debug logging

Enable debug logging to get more information about Paywall Builder issues:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// Enable debug logging
Adapty.setLogLevel(AdaptyLogLevel.DEBUG)

// Debug paywall loading
fun debugPaywallLoading(placementId: String) {
    Log.d("Paywall", "Attempting to load paywall for placement: $placementId")
    
    Adapty.getPaywall(placementId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                Log.d("Paywall", "Paywall loaded successfully")
                Log.d("Paywall", "Paywall ID: ${paywall.id}")
                Log.d("Paywall", "Has view configuration: ${paywall.hasViewConfiguration}")
                Log.d("Paywall", "Products count: ${paywall.products.size}")
                
                // Log product details
                paywall.products.forEach { product ->
                    Log.d("Paywall", "Product: ${product.vendorProductId} - ${product.localizedTitle}")
                }
            }
            is AdaptyResult.Error -> {
                val error = result.error
                Log.e("Paywall", "Paywall loading failed")
                Log.e("Paywall", "Error code: ${error.code}")
                Log.e("Paywall", "Error message: ${error.message}")
                Log.e("Paywall", "Error details: ${error.details}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// Enable debug logging
Adapty.setLogLevel(AdaptyLogLevel.DEBUG);

// Debug paywall loading
public void debugPaywallLoading(String placementId) {
    Log.d("Paywall", "Attempting to load paywall for placement: " + placementId);
    
    Adapty.getPaywall(placementId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            Log.d("Paywall", "Paywall loaded successfully");
            Log.d("Paywall", "Paywall ID: " + paywall.getId());
            Log.d("Paywall", "Has view configuration: " + paywall.hasViewConfiguration());
            Log.d("Paywall", "Products count: " + paywall.getProducts().size());
            
            // Log product details
            for (AdaptyProduct product : paywall.getProducts()) {
                Log.d("Paywall", "Product: " + product.getVendorProductId() + " - " + product.getLocalizedTitle());
            }
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            Log.e("Paywall", "Paywall loading failed");
            Log.e("Paywall", "Error code: " + error.getCode());
            Log.e("Paywall", "Error message: " + error.getMessage());
            Log.e("Paywall", "Error details: " + error.getDetails());
        }
    });
}
```
</TabItem>
</Tabs>

### Check placement configuration

Verify that your placement is properly configured:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun checkPlacementConfiguration(placementId: String) {
    Log.d("Placement", "Checking placement configuration for: $placementId")
    
    // Check if placement ID is valid
    if (placementId.isBlank()) {
        Log.e("Placement", "Placement ID is empty")
        return
    }
    
    // Try to get paywall
    Adapty.getPaywall(placementId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                Log.d("Placement", "Placement is configured correctly")
                Log.d("Placement", "Paywall ID: ${paywall.id}")
                Log.d("Placement", "Placement ID: ${paywall.placementId}")
            }
            is AdaptyResult.Error -> {
                val error = result.error
                Log.e("Placement", "Placement configuration issue")
                Log.e("Placement", "Error: ${error.message}")
                
                when (error.code) {
                    1001 -> {
                        Log.e("Placement", "Network error - check internet connection")
                    }
                    else -> {
                        Log.e("Placement", "Placement may not be configured or published")
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
public void checkPlacementConfiguration(String placementId) {
    Log.d("Placement", "Checking placement configuration for: " + placementId);
    
    // Check if placement ID is valid
    if (placementId == null || placementId.trim().isEmpty()) {
        Log.e("Placement", "Placement ID is empty");
        return;
    }
    
    // Try to get paywall
    Adapty.getPaywall(placementId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            Log.d("Placement", "Placement is configured correctly");
            Log.d("Placement", "Paywall ID: " + paywall.getId());
            Log.d("Placement", "Placement ID: " + paywall.getPlacementId());
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            Log.e("Placement", "Placement configuration issue");
            Log.e("Placement", "Error: " + error.getMessage());
            
            switch (error.getCode()) {
                case 1001:
                    Log.e("Placement", "Network error - check internet connection");
                    break;
                default:
                    Log.e("Placement", "Placement may not be configured or published");
                    break;
            }
        }
    });
}
```
</TabItem>
</Tabs>

## Common troubleshooting steps

### 1. Verify placement ID

Ensure you're using the correct placement ID:

- Check the placement ID in your Adapty dashboard
- Verify the placement is published
- Make sure the placement is assigned to a paywall

### 2. Check network connectivity

Ensure the device has internet connectivity:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun checkNetworkForPaywall() {
    val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    val network = connectivityManager.activeNetwork
    val capabilities = connectivityManager.getNetworkCapabilities(network)
    
    val hasInternet = capabilities != null && (
        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)
    )
    
    if (!hasInternet) {
        showMessage("No internet connection. Please check your network and try again.")
        return
    }
    
    // Proceed with paywall loading
    loadPaywall()
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void checkNetworkForPaywall() {
    ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
    Network network = connectivityManager.getActiveNetwork();
    NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(network);
    
    boolean hasInternet = capabilities != null && (
        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
        capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)
    );
    
    if (!hasInternet) {
        showMessage("No internet connection. Please check your network and try again.");
        return;
    }
    
    // Proceed with paywall loading
    loadPaywall();
}
```
</TabItem>
</Tabs>

### 3. Test with fallback

If Paywall Builder paywalls fail, use a fallback:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun loadPaywallWithFallback(placementId: String) {
    Adapty.getPaywall(placementId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                if (paywall.hasViewConfiguration) {
                    // Use Paywall Builder paywall
                    showPaywallBuilderPaywall(paywall)
                } else {
                    // Fallback to manual paywall
                    showManualPaywall(paywall)
                }
            }
            is AdaptyResult.Error -> {
                // Show fallback paywall
                showFallbackPaywall()
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void loadPaywallWithFallback(String placementId) {
    Adapty.getPaywall(placementId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            if (paywall.hasViewConfiguration()) {
                // Use Paywall Builder paywall
                showPaywallBuilderPaywall(paywall);
            } else {
                // Fallback to manual paywall
                showManualPaywall(paywall);
            }
        } else if (result instanceof AdaptyResult.Error) {
            // Show fallback paywall
            showFallbackPaywall();
        }
    });
}
```
</TabItem>
</Tabs>

## Next steps

- [Handle errors](kmp-handle-errors.md) - Learn about general error handling
- [Use fallback paywalls](kmp-use-fallback-paywalls.md) - Implement fallback paywalls
- [Test integration](kmp-test.md) - Test your paywall integration
