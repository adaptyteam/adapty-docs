---
title: "Get Paywall Builder paywalls in Kotlin Multiplatform SDK"
description: "Learn how to get Paywall Builder paywalls in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Get Paywall Builder Paywalls | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to get Paywall Builder paywalls in the Adapty Kotlin Multiplatform SDK.

## Paywall Builder overview

Paywall Builder paywalls are created visually in the Adapty dashboard and include both product configuration and visual design. They provide a complete paywall experience with minimal code.

## Get Paywall Builder paywall

To retrieve a Paywall Builder paywall, use the `getPaywall` method with a placement ID:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun getPaywallBuilderPaywall(placementId: String) {
    Adapty.getPaywall(placementId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                
                // Check if paywall has view configuration (Paywall Builder paywall)
                if (paywall.hasViewConfiguration) {
                    // This is a Paywall Builder paywall
                    displayPaywallBuilderPaywall(paywall)
                } else {
                    // This is a manual paywall
                    displayManualPaywall(paywall)
                }
            }
            is AdaptyResult.Error -> {
                val error = result.error
                // Handle error
                showErrorMessage("Failed to load paywall: ${error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void getPaywallBuilderPaywall(String placementId) {
    Adapty.getPaywall(placementId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            
            // Check if paywall has view configuration (Paywall Builder paywall)
            if (paywall.hasViewConfiguration()) {
                // This is a Paywall Builder paywall
                displayPaywallBuilderPaywall(paywall);
            } else {
                // This is a manual paywall
                displayManualPaywall(paywall);
            }
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            // Handle error
            showErrorMessage("Failed to load paywall: " + error.getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Display Paywall Builder paywall

To display a Paywall Builder paywall, you need to get the view configuration and create the paywall view:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun displayPaywallBuilderPaywall(paywall: AdaptyPaywall) {
    // Get view configuration for the paywall
    AdaptyUI.getViewConfiguration(paywall) { configResult ->
        when (configResult) {
            is AdaptyResult.Success -> {
                val viewConfiguration = configResult.value
                
                // Create paywall view
                val paywallView = AdaptyUI.getPaywallView(
                    this, // Activity context
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
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void displayPaywallBuilderPaywall(AdaptyPaywall paywall) {
    // Get view configuration for the paywall
    AdaptyUI.getViewConfiguration(paywall, configResult -> {
        if (configResult instanceof AdaptyResult.Success) {
            AdaptyUI.LocalizedViewConfiguration viewConfiguration = 
                ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();
            
            // Create paywall view
            AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
                this, // Activity context
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
```
</TabItem>
</Tabs>

## Complete Paywall Builder example

Here's a complete example of getting and displaying a Paywall Builder paywall:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class PaywallBuilderActivity : AppCompatActivity() {
    private lateinit var loadingIndicator: ProgressBar
    private lateinit var errorView: TextView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_paywall_builder)
        
        // Initialize views
        loadingIndicator = findViewById(R.id.loading_indicator)
        errorView = findViewById(R.id.error_view)
        
        // Get placement ID from intent or use default
        val placementId = intent.getStringExtra("placement_id") ?: "main"
        
        // Load Paywall Builder paywall
        loadPaywallBuilderPaywall(placementId)
    }
    
    private fun loadPaywallBuilderPaywall(placementId: String) {
        showLoading()
        
        Adapty.getPaywall(placementId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    
                    if (paywall.hasViewConfiguration) {
                        // This is a Paywall Builder paywall
                        displayPaywallBuilderPaywall(paywall)
                    } else {
                        // Fallback to manual paywall
                        showError("Paywall Builder paywall not found. Using manual paywall.")
                        displayManualPaywall(paywall)
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    hideLoading()
                    showError("Failed to load paywall: ${error.message}")
                }
            }
        }
    }
    
    private fun displayPaywallBuilderPaywall(paywall: AdaptyPaywall) {
        AdaptyUI.getViewConfiguration(paywall) { configResult ->
            when (configResult) {
                is AdaptyResult.Success -> {
                    val viewConfiguration = configResult.value
                    
                    // Create event listener
                    val eventListener = createEventListener()
                    
                    // Create paywall view
                    val paywallView = AdaptyUI.getPaywallView(
                        this,
                        viewConfiguration,
                        null, // products = null means auto-fetch
                        eventListener
                    )
                    
                    // Display paywall
                    hideLoading()
                    setContentView(paywallView)
                }
                is AdaptyResult.Error -> {
                    val error = configResult.error
                    hideLoading()
                    showError("Failed to get view configuration: ${error.message}")
                }
            }
        }
    }
    
    private fun createEventListener(): AdaptyUIEventListener {
        return object : AdaptyUIEventListener {
            override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
                when (action) {
                    is AdaptyUI.Action.Close -> {
                        // Handle close action
                        finish()
                    }
                    is AdaptyUI.Action.OpenURL -> {
                        // Handle URL opening
                        try {
                            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(action.url))
                            context.startActivity(intent)
                        } catch (e: Exception) {
                            Log.e("Paywall", "Failed to open URL: ${e.message}")
                        }
                    }
                    is AdaptyUI.Action.MakePurchase -> {
                        // Handle purchase action
                        handlePurchase(action.product)
                    }
                    is AdaptyUI.Action.RestorePurchases -> {
                        // Handle restore action
                        handleRestore()
                    }
                }
            }
        }
    }
    
    private fun handlePurchase(product: AdaptyProduct) {
        product.makePurchase { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val purchase = result.value
                    showSuccessMessage("Purchase successful!")
                    finish()
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    showErrorMessage("Purchase failed: ${error.message}")
                }
            }
        }
    }
    
    private fun handleRestore() {
        Adapty.restorePurchases { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    val hasActiveSubscriptions = profile.accessLevels.values.any { it.isActive }
                    
                    if (hasActiveSubscriptions) {
                        showSuccessMessage("Purchases restored successfully!")
                        finish()
                    } else {
                        showMessage("No previous purchases found.")
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    showErrorMessage("Failed to restore purchases: ${error.message}")
                }
            }
        }
    }
    
    private fun showLoading() {
        loadingIndicator.visibility = View.VISIBLE
        errorView.visibility = View.GONE
    }
    
    private fun hideLoading() {
        loadingIndicator.visibility = View.GONE
    }
    
    private fun showError(message: String) {
        errorView.text = message
        errorView.visibility = View.VISIBLE
        loadingIndicator.visibility = View.GONE
    }
    
    private fun showMessage(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
    
    private fun showSuccessMessage(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
    
    private fun showErrorMessage(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class PaywallBuilderActivity extends AppCompatActivity {
    private ProgressBar loadingIndicator;
    private TextView errorView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_paywall_builder);
        
        // Initialize views
        loadingIndicator = findViewById(R.id.loading_indicator);
        errorView = findViewById(R.id.error_view);
        
        // Get placement ID from intent or use default
        String placementId = getIntent().getStringExtra("placement_id");
        if (placementId == null) {
            placementId = "main";
        }
        
        // Load Paywall Builder paywall
        loadPaywallBuilderPaywall(placementId);
    }
    
    private void loadPaywallBuilderPaywall(String placementId) {
        showLoading();
        
        Adapty.getPaywall(placementId, result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                
                if (paywall.hasViewConfiguration()) {
                    // This is a Paywall Builder paywall
                    displayPaywallBuilderPaywall(paywall);
                } else {
                    // Fallback to manual paywall
                    showError("Paywall Builder paywall not found. Using manual paywall.");
                    displayManualPaywall(paywall);
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                hideLoading();
                showError("Failed to load paywall: " + error.getMessage());
            }
        });
    }
    
    private void displayPaywallBuilderPaywall(AdaptyPaywall paywall) {
        AdaptyUI.getViewConfiguration(paywall, configResult -> {
            if (configResult instanceof AdaptyResult.Success) {
                AdaptyUI.LocalizedViewConfiguration viewConfiguration = 
                    ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();
                
                // Create event listener
                AdaptyUIEventListener eventListener = createEventListener();
                
                // Create paywall view
                AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
                    this,
                    viewConfiguration,
                    null, // products = null means auto-fetch
                    eventListener
                );
                
                // Display paywall
                hideLoading();
                setContentView(paywallView);
            } else if (configResult instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) configResult).getError();
                hideLoading();
                showError("Failed to get view configuration: " + error.getMessage());
            }
        });
    }
    
    private AdaptyUIEventListener createEventListener() {
        return new AdaptyUIEventListener() {
            @Override
            public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
                if (action instanceof AdaptyUI.Action.Close) {
                    // Handle close action
                    finish();
                } else if (action instanceof AdaptyUI.Action.OpenURL) {
                    // Handle URL opening
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(((AdaptyUI.Action.OpenURL) action).getUrl()));
                        context.startActivity(intent);
                    } catch (Exception e) {
                        Log.e("Paywall", "Failed to open URL: " + e.getMessage());
                    }
                } else if (action instanceof AdaptyUI.Action.MakePurchase) {
                    // Handle purchase action
                    handlePurchase(((AdaptyUI.Action.MakePurchase) action).getProduct());
                } else if (action instanceof AdaptyUI.Action.RestorePurchases) {
                    // Handle restore action
                    handleRestore();
                }
            }
        };
    }
    
    private void handlePurchase(AdaptyProduct product) {
        product.makePurchase(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
                showSuccessMessage("Purchase successful!");
                finish();
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                showErrorMessage("Purchase failed: " + error.getMessage());
            }
        });
    }
    
    private void handleRestore() {
        Adapty.restorePurchases(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                boolean hasActiveSubscriptions = profile.getAccessLevels().values().stream()
                    .anyMatch(AdaptyAccessLevel::isActive);
                
                if (hasActiveSubscriptions) {
                    showSuccessMessage("Purchases restored successfully!");
                    finish();
                } else {
                    showMessage("No previous purchases found.");
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                showErrorMessage("Failed to restore purchases: " + error.getMessage());
            }
        });
    }
    
    private void showLoading() {
        loadingIndicator.setVisibility(View.VISIBLE);
        errorView.setVisibility(View.GONE);
    }
    
    private void hideLoading() {
        loadingIndicator.setVisibility(View.GONE);
    }
    
    private void showError(String message) {
        errorView.setText(message);
        errorView.setVisibility(View.VISIBLE);
        loadingIndicator.setVisibility(View.GONE);
    }
    
    private void showMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
    
    private void showSuccessMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
    
    private void showErrorMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }
}
```
</TabItem>
</Tabs>

## Check paywall type

You can check if a paywall is a Paywall Builder paywall by examining its properties:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun checkPaywallType(paywall: AdaptyPaywall) {
    Log.d("Paywall", "Paywall ID: ${paywall.id}")
    Log.d("Paywall", "Placement ID: ${paywall.placementId}")
    Log.d("Paywall", "Has view configuration: ${paywall.hasViewConfiguration}")
    Log.d("Paywall", "Products count: ${paywall.products.size}")
    
    if (paywall.hasViewConfiguration) {
        Log.d("Paywall", "This is a Paywall Builder paywall")
        // Use Paywall Builder display method
        displayPaywallBuilderPaywall(paywall)
    } else {
        Log.d("Paywall", "This is a manual paywall")
        // Use manual display method
        displayManualPaywall(paywall)
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void checkPaywallType(AdaptyPaywall paywall) {
    Log.d("Paywall", "Paywall ID: " + paywall.getId());
    Log.d("Paywall", "Placement ID: " + paywall.getPlacementId());
    Log.d("Paywall", "Has view configuration: " + paywall.hasViewConfiguration());
    Log.d("Paywall", "Products count: " + paywall.getProducts().size());
    
    if (paywall.hasViewConfiguration()) {
        Log.d("Paywall", "This is a Paywall Builder paywall");
        // Use Paywall Builder display method
        displayPaywallBuilderPaywall(paywall);
    } else {
        Log.d("Paywall", "This is a manual paywall");
        // Use manual display method
        displayManualPaywall(paywall);
    }
}
```
</TabItem>
</Tabs>

## Error handling

Handle errors when loading Paywall Builder paywalls:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun loadPaywallWithErrorHandling(placementId: String) {
    showLoading()
    
    Adapty.getPaywall(placementId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                
                if (paywall.hasViewConfiguration) {
                    displayPaywallBuilderPaywall(paywall)
                } else {
                    hideLoading()
                    showError("Paywall Builder paywall not available for this placement")
                }
            }
            is AdaptyResult.Error -> {
                val error = result.error
                hideLoading()
                
                when (error.code) {
                    1001 -> {
                        // Network error
                        showError("Network error. Please check your connection and try again.")
                    }
                    else -> {
                        // Other errors
                        showError("Failed to load paywall: ${error.message}")
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
public void loadPaywallWithErrorHandling(String placementId) {
    showLoading();
    
    Adapty.getPaywall(placementId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            
            if (paywall.hasViewConfiguration()) {
                displayPaywallBuilderPaywall(paywall);
            } else {
                hideLoading();
                showError("Paywall Builder paywall not available for this placement");
            }
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            hideLoading();
            
            switch (error.getCode()) {
                case 1001:
                    // Network error
                    showError("Network error. Please check your connection and try again.");
                    break;
                default:
                    // Other errors
                    showError("Failed to load paywall: " + error.getMessage());
                    break;
            }
        }
    });
}
```
</TabItem>
</Tabs>

## Next steps

- [Paywalls overview](kmp-paywalls.md) - Learn about different paywall approaches
- [Handle paywall actions](kmp-handle-paywall-actions.md) - Learn about handling paywall actions
- [Troubleshoot Paywall Builder](kmp-troubleshoot-paywall-builder.md) - Debug Paywall Builder issues
