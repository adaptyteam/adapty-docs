---
title: "Handle paywall actions in Kotlin Multiplatform SDK"
description: "Learn how to handle paywall actions in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Handle Paywall Actions | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to handle paywall actions in the Adapty Kotlin Multiplatform SDK.

## Paywall actions overview

Paywall actions are events triggered by user interactions with paywall elements (buttons, links, etc.). You need to handle these actions to provide the appropriate user experience.

## Set up event listener

To handle paywall actions, you need to implement an `AdaptyUIEventListener`:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val eventListener = object : AdaptyUIEventListener {
    override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
        // Handle the action
        handlePaywallAction(action, context)
    }
}

private fun handlePaywallAction(action: AdaptyUI.Action, context: Context) {
    when (action) {
        is AdaptyUI.Action.Close -> {
            // Handle close action
            handleCloseAction(context)
        }
        is AdaptyUI.Action.OpenURL -> {
            // Handle URL opening
            handleOpenURLAction(action.url, context)
        }
        is AdaptyUI.Action.MakePurchase -> {
            // Handle purchase action
            handleMakePurchaseAction(action.product, context)
        }
        else -> {
            // Handle other actions
            Log.d("Paywall", "Unhandled action: $action")
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
        // Handle the action
        handlePaywallAction(action, context);
    }
};

private void handlePaywallAction(AdaptyUI.Action action, Context context) {
    if (action instanceof AdaptyUI.Action.Close) {
        // Handle close action
        handleCloseAction(context);
    } else if (action instanceof AdaptyUI.Action.OpenURL) {
        // Handle URL opening
        handleOpenURLAction(((AdaptyUI.Action.OpenURL) action).getUrl(), context);
    } else if (action instanceof AdaptyUI.Action.MakePurchase) {
        // Handle purchase action
        handleMakePurchaseAction(((AdaptyUI.Action.MakePurchase) action).getProduct(), context);
    } else {
        // Handle other actions
        Log.d("Paywall", "Unhandled action: " + action);
    }
}
```
</TabItem>
</Tabs>

## Handle specific actions

### Close action

Handle when users want to close the paywall:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun handleCloseAction(context: Context) {
    Log.d("Paywall", "Close action triggered")
    
    if (context is Activity) {
        // Close the activity
        context.onBackPressed()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void handleCloseAction(Context context) {
    Log.d("Paywall", "Close action triggered");
    
    if (context instanceof Activity) {
        // Close the activity
        ((Activity) context).onBackPressed();
    }
}
```
</TabItem>
</Tabs>

### Open URL action

Handle when users tap on links in the paywall:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun handleOpenURLAction(url: String, context: Context) {
    Log.d("Paywall", "Open URL action triggered: $url")
    
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        context.startActivity(intent)
    } catch (e: Exception) {
        Log.e("Paywall", "Failed to open URL: ${e.message}")
        showMessage("Failed to open link. Please try again.")
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void handleOpenURLAction(String url, Context context) {
    Log.d("Paywall", "Open URL action triggered: " + url);
    
    try {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        context.startActivity(intent);
    } catch (Exception e) {
        Log.e("Paywall", "Failed to open URL: " + e.getMessage());
        showMessage("Failed to open link. Please try again.");
    }
}
```
</TabItem>
</Tabs>

### Make purchase action

Handle when users tap on purchase buttons:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun handleMakePurchaseAction(product: AdaptyProduct, context: Context) {
    Log.d("Paywall", "Make purchase action triggered for product: ${product.vendorProductId}")
    
    // Show loading indicator
    showLoadingIndicator()
    
    product.makePurchase { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val purchase = result.value
                hideLoadingIndicator()
                
                Log.d("Paywall", "Purchase successful: ${purchase.vendorProductId}")
                showSuccessMessage("Purchase completed!")
                
                // Close paywall after successful purchase
                if (context is Activity) {
                    context.finish()
                }
            }
            is AdaptyResult.Error -> {
                val error = result.error
                hideLoadingIndicator()
                
                Log.e("Paywall", "Purchase failed: ${error.message}")
                showErrorMessage("Purchase failed: ${error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void handleMakePurchaseAction(AdaptyProduct product, Context context) {
    Log.d("Paywall", "Make purchase action triggered for product: " + product.getVendorProductId());
    
    // Show loading indicator
    showLoadingIndicator();
    
    product.makePurchase(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
            hideLoadingIndicator();
            
            Log.d("Paywall", "Purchase successful: " + purchase.getVendorProductId());
            showSuccessMessage("Purchase completed!");
            
            // Close paywall after successful purchase
            if (context instanceof Activity) {
                ((Activity) context).finish();
            }
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            hideLoadingIndicator();
            
            Log.e("Paywall", "Purchase failed: " + error.getMessage());
            showErrorMessage("Purchase failed: " + error.getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Complete event listener example

Here's a complete example of handling all paywall actions:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class PaywallActionHandler {
    private var loadingIndicator: ProgressBar? = null
    
    fun createEventListener(): AdaptyUIEventListener {
        return object : AdaptyUIEventListener {
            override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
                Log.d("Paywall", "Action performed: $action")
                
                when (action) {
                    is AdaptyUI.Action.Close -> {
                        handleCloseAction(context)
                    }
                    is AdaptyUI.Action.OpenURL -> {
                        handleOpenURLAction(action.url, context)
                    }
                    is AdaptyUI.Action.MakePurchase -> {
                        handleMakePurchaseAction(action.product, context)
                    }
                    is AdaptyUI.Action.RestorePurchases -> {
                        handleRestorePurchasesAction(context)
                    }
                    else -> {
                        Log.d("Paywall", "Unhandled action: $action")
                    }
                }
            }
        }
    }
    
    private fun handleCloseAction(context: Context) {
        Log.d("Paywall", "Close action triggered")
        
        if (context is Activity) {
            context.onBackPressed()
        }
    }
    
    private fun handleOpenURLAction(url: String, context: Context) {
        Log.d("Paywall", "Open URL action triggered: $url")
        
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            context.startActivity(intent)
        } catch (e: Exception) {
            Log.e("Paywall", "Failed to open URL: ${e.message}")
            showMessage(context, "Failed to open link. Please try again.")
        }
    }
    
    private fun handleMakePurchaseAction(product: AdaptyProduct, context: Context) {
        Log.d("Paywall", "Make purchase action triggered for product: ${product.vendorProductId}")
        
        showLoadingIndicator(context)
        
        product.makePurchase { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val purchase = result.value
                    hideLoadingIndicator(context)
                    
                    Log.d("Paywall", "Purchase successful: ${purchase.vendorProductId}")
                    showSuccessMessage(context, "Purchase completed!")
                    
                    // Close paywall after successful purchase
                    if (context is Activity) {
                        context.finish()
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    hideLoadingIndicator(context)
                    
                    Log.e("Paywall", "Purchase failed: ${error.message}")
                    showErrorMessage(context, "Purchase failed: ${error.message}")
                }
            }
        }
    }
    
    private fun handleRestorePurchasesAction(context: Context) {
        Log.d("Paywall", "Restore purchases action triggered")
        
        showLoadingIndicator(context)
        
        Adapty.restorePurchases { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    hideLoadingIndicator(context)
                    
                    // Check if any purchases were restored
                    val hasActiveSubscriptions = profile.accessLevels.values.any { it.isActive }
                    
                    if (hasActiveSubscriptions) {
                        showSuccessMessage(context, "Purchases restored successfully!")
                        // Close paywall
                        if (context is Activity) {
                            context.finish()
                        }
                    } else {
                        showMessage(context, "No previous purchases found.")
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    hideLoadingIndicator(context)
                    
                    Log.e("Paywall", "Restore failed: ${error.message}")
                    showErrorMessage(context, "Failed to restore purchases: ${error.message}")
                }
            }
        }
    }
    
    private fun showLoadingIndicator(context: Context) {
        // Show loading indicator
        loadingIndicator?.visibility = View.VISIBLE
    }
    
    private fun hideLoadingIndicator(context: Context) {
        // Hide loading indicator
        loadingIndicator?.visibility = View.GONE
    }
    
    private fun showMessage(context: Context, message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }
    
    private fun showSuccessMessage(context: Context, message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }
    
    private fun showErrorMessage(context: Context, message: String) {
        Toast.makeText(context, message, Toast.LENGTH_LONG).show()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class PaywallActionHandler {
    private ProgressBar loadingIndicator;
    
    public AdaptyUIEventListener createEventListener() {
        return new AdaptyUIEventListener() {
            @Override
            public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
                Log.d("Paywall", "Action performed: " + action);
                
                if (action instanceof AdaptyUI.Action.Close) {
                    handleCloseAction(context);
                } else if (action instanceof AdaptyUI.Action.OpenURL) {
                    handleOpenURLAction(((AdaptyUI.Action.OpenURL) action).getUrl(), context);
                } else if (action instanceof AdaptyUI.Action.MakePurchase) {
                    handleMakePurchaseAction(((AdaptyUI.Action.MakePurchase) action).getProduct(), context);
                } else if (action instanceof AdaptyUI.Action.RestorePurchases) {
                    handleRestorePurchasesAction(context);
                } else {
                    Log.d("Paywall", "Unhandled action: " + action);
                }
            }
        };
    }
    
    private void handleCloseAction(Context context) {
        Log.d("Paywall", "Close action triggered");
        
        if (context instanceof Activity) {
            ((Activity) context).onBackPressed();
        }
    }
    
    private void handleOpenURLAction(String url, Context context) {
        Log.d("Paywall", "Open URL action triggered: " + url);
        
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            context.startActivity(intent);
        } catch (Exception e) {
            Log.e("Paywall", "Failed to open URL: " + e.getMessage());
            showMessage(context, "Failed to open link. Please try again.");
        }
    }
    
    private void handleMakePurchaseAction(AdaptyProduct product, Context context) {
        Log.d("Paywall", "Make purchase action triggered for product: " + product.getVendorProductId());
        
        showLoadingIndicator(context);
        
        product.makePurchase(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
                hideLoadingIndicator(context);
                
                Log.d("Paywall", "Purchase successful: " + purchase.getVendorProductId());
                showSuccessMessage(context, "Purchase completed!");
                
                // Close paywall after successful purchase
                if (context instanceof Activity) {
                    ((Activity) context).finish();
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                hideLoadingIndicator(context);
                
                Log.e("Paywall", "Purchase failed: " + error.getMessage());
                showErrorMessage(context, "Purchase failed: " + error.getMessage());
            }
        });
    }
    
    private void handleRestorePurchasesAction(Context context) {
        Log.d("Paywall", "Restore purchases action triggered");
        
        showLoadingIndicator(context);
        
        Adapty.restorePurchases(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                hideLoadingIndicator(context);
                
                // Check if any purchases were restored
                boolean hasActiveSubscriptions = profile.getAccessLevels().values().stream()
                    .anyMatch(AdaptyAccessLevel::isActive);
                
                if (hasActiveSubscriptions) {
                    showSuccessMessage(context, "Purchases restored successfully!");
                    // Close paywall
                    if (context instanceof Activity) {
                        ((Activity) context).finish();
                    }
                } else {
                    showMessage(context, "No previous purchases found.");
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                hideLoadingIndicator(context);
                
                Log.e("Paywall", "Restore failed: " + error.getMessage());
                showErrorMessage(context, "Failed to restore purchases: " + error.getMessage());
            }
        });
    }
    
    private void showLoadingIndicator(Context context) {
        // Show loading indicator
        if (loadingIndicator != null) {
            loadingIndicator.setVisibility(View.VISIBLE);
        }
    }
    
    private void hideLoadingIndicator(Context context) {
        // Hide loading indicator
        if (loadingIndicator != null) {
            loadingIndicator.setVisibility(View.GONE);
        }
    }
    
    private void showMessage(Context context, String message) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
    }
    
    private void showSuccessMessage(Context context, String message) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
    }
    
    private void showErrorMessage(Context context, String message) {
        Toast.makeText(context, message, Toast.LENGTH_LONG).show();
    }
}
```
</TabItem>
</Tabs>

## Use event listener with paywall

Connect the event listener to your paywall:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class PaywallActivity : AppCompatActivity() {
    private lateinit var actionHandler: PaywallActionHandler
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_paywall)
        
        actionHandler = PaywallActionHandler()
        
        // Load and display paywall
        loadPaywall()
    }
    
    private fun loadPaywall() {
        Adapty.getPaywall("main") { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    displayPaywall(paywall)
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    showErrorMessage("Failed to load paywall: ${error.message}")
                }
            }
        }
    }
    
    private fun displayPaywall(paywall: AdaptyPaywall) {
        // Get view configuration
        AdaptyUI.getViewConfiguration(paywall) { configResult ->
            when (configResult) {
                is AdaptyResult.Success -> {
                    val viewConfiguration = configResult.value
                    
                    // Create paywall view with event listener
                    val eventListener = actionHandler.createEventListener()
                    val paywallView = AdaptyUI.getPaywallView(
                        this,
                        viewConfiguration,
                        null, // products = null means auto-fetch
                        eventListener
                    )
                    
                    // Add to view hierarchy
                    setContentView(paywallView)
                }
                is AdaptyResult.Error -> {
                    val error = configResult.error
                    showErrorMessage("Failed to get view configuration: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class PaywallActivity extends AppCompatActivity {
    private PaywallActionHandler actionHandler;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_paywall);
        
        actionHandler = new PaywallActionHandler();
        
        // Load and display paywall
        loadPaywall();
    }
    
    private void loadPaywall() {
        Adapty.getPaywall("main", result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                displayPaywall(paywall);
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                showErrorMessage("Failed to load paywall: " + error.getMessage());
            }
        });
    }
    
    private void displayPaywall(AdaptyPaywall paywall) {
        // Get view configuration
        AdaptyUI.getViewConfiguration(paywall, configResult -> {
            if (configResult instanceof AdaptyResult.Success) {
                AdaptyUI.LocalizedViewConfiguration viewConfiguration = 
                    ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();
                
                // Create paywall view with event listener
                AdaptyUIEventListener eventListener = actionHandler.createEventListener();
                AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
                    this,
                    viewConfiguration,
                    null, // products = null means auto-fetch
                    eventListener
                );
                
                // Add to view hierarchy
                setContentView(paywallView);
            } else if (configResult instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) configResult).getError();
                showErrorMessage("Failed to get view configuration: " + error.getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Paywalls overview](kmp-paywalls.md) - Learn about different paywall approaches
- [Making purchases](kmp-making-purchases.md) - Learn about making purchases
- [Handle errors](kmp-handle-errors.md) - Learn about error handling
