---
title: "Implement paywalls manually in Kotlin Multiplatform SDK"
description: "Learn how to implement paywalls manually in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Implement Paywalls Manually | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to implement paywalls manually in the Adapty Kotlin Multiplatform SDK.

## Manual paywall implementation

When you implement paywalls manually, you design your own UI while still using Adapty's product management and purchase handling.

## Get paywall with products

First, get a paywall that contains the products you want to offer:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun loadManualPaywall(placementId: String) {
    Adapty.getPaywall(placementId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                // Use the paywall's products to build your UI
                displayManualPaywall(paywall)
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
public void loadManualPaywall(String placementId) {
    Adapty.getPaywall(placementId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            // Use the paywall's products to build your UI
            displayManualPaywall(paywall);
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

## Display products in custom UI

Create your own UI to display the products:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun displayManualPaywall(paywall: AdaptyPaywall) {
    // Get products from paywall
    val products = paywall.products
    
    // Create UI for each product
    products.forEach { product ->
        createProductView(product)
    }
}

private fun createProductView(product: AdaptyProduct) {
    // Create your custom product view
    val productView = LayoutInflater.from(this).inflate(R.layout.product_item, null)
    
    // Set product information
    productView.findViewById<TextView>(R.id.product_title).text = product.localizedTitle
    productView.findViewById<TextView>(R.id.product_description).text = product.localizedDescription
    productView.findViewById<TextView>(R.id.product_price).text = product.localizedPrice
    
    // Set up purchase button
    productView.findViewById<Button>(R.id.purchase_button).setOnClickListener {
        makePurchase(product)
    }
    
    // Add to your layout
    findViewById<LinearLayout>(R.id.products_container).addView(productView)
}

private fun makePurchase(product: AdaptyProduct) {
    // Show loading indicator
    showLoadingIndicator()
    
    product.makePurchase { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val purchase = result.value
                hideLoadingIndicator()
                showSuccessMessage("Purchase successful!")
                
                // Update UI to reflect new subscription status
                updateSubscriptionStatus()
            }
            is AdaptyResult.Error -> {
                val error = result.error
                hideLoadingIndicator()
                showErrorMessage("Purchase failed: ${error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void displayManualPaywall(AdaptyPaywall paywall) {
    // Get products from paywall
    List<AdaptyProduct> products = paywall.getProducts();
    
    // Create UI for each product
    for (AdaptyProduct product : products) {
        createProductView(product);
    }
}

private void createProductView(AdaptyProduct product) {
    // Create your custom product view
    View productView = LayoutInflater.from(this).inflate(R.layout.product_item, null);
    
    // Set product information
    ((TextView) productView.findViewById(R.id.product_title)).setText(product.getLocalizedTitle());
    ((TextView) productView.findViewById(R.id.product_description)).setText(product.getLocalizedDescription());
    ((TextView) productView.findViewById(R.id.product_price)).setText(product.getLocalizedPrice());
    
    // Set up purchase button
    productView.findViewById(R.id.purchase_button).setOnClickListener(v -> makePurchase(product));
    
    // Add to your layout
    ((LinearLayout) findViewById(R.id.products_container)).addView(productView);
}

private void makePurchase(AdaptyProduct product) {
    // Show loading indicator
    showLoadingIndicator();
    
    product.makePurchase(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
            hideLoadingIndicator();
            showSuccessMessage("Purchase successful!");
            
            // Update UI to reflect new subscription status
            updateSubscriptionStatus();
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            hideLoadingIndicator();
            showErrorMessage("Purchase failed: " + error.getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Complete manual paywall example

Here's a complete example of a manual paywall implementation:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class ManualPaywallActivity : AppCompatActivity() {
    private lateinit var productsContainer: LinearLayout
    private lateinit var loadingIndicator: ProgressBar
    private lateinit var errorView: TextView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_manual_paywall)
        
        // Initialize views
        productsContainer = findViewById(R.id.products_container)
        loadingIndicator = findViewById(R.id.loading_indicator)
        errorView = findViewById(R.id.error_view)
        
        // Load paywall
        loadPaywall()
    }
    
    private fun loadPaywall() {
        showLoading()
        
        Adapty.getPaywall("manual_paywall") { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    hideLoading()
                    displayProducts(paywall.products)
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    hideLoading()
                    showError("Failed to load paywall: ${error.message}")
                }
            }
        }
    }
    
    private fun displayProducts(products: List<AdaptyProduct>) {
        if (products.isEmpty()) {
            showError("No products available")
            return
        }
        
        products.forEach { product ->
            val productView = createProductView(product)
            productsContainer.addView(productView)
        }
    }
    
    private fun createProductView(product: AdaptyProduct): View {
        val productView = LayoutInflater.from(this).inflate(R.layout.product_item, null)
        
        // Set product information
        productView.findViewById<TextView>(R.id.product_title).text = product.localizedTitle
        productView.findViewById<TextView>(R.id.product_description).text = product.localizedDescription
        productView.findViewById<TextView>(R.id.product_price).text = product.localizedPrice
        
        // Set up purchase button
        productView.findViewById<Button>(R.id.purchase_button).setOnClickListener {
            makePurchase(product)
        }
        
        return productView
    }
    
    private fun makePurchase(product: AdaptyProduct) {
        showLoading()
        
        product.makePurchase { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val purchase = result.value
                    hideLoading()
                    showSuccess("Purchase successful!")
                    
                    // Close paywall and return to main screen
                    finish()
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    hideLoading()
                    showError("Purchase failed: ${error.message}")
                }
            }
        }
    }
    
    private fun showLoading() {
        loadingIndicator.visibility = View.VISIBLE
        productsContainer.visibility = View.GONE
        errorView.visibility = View.GONE
    }
    
    private fun hideLoading() {
        loadingIndicator.visibility = View.GONE
        productsContainer.visibility = View.VISIBLE
        errorView.visibility = View.GONE
    }
    
    private fun showError(message: String) {
        errorView.text = message
        errorView.visibility = View.VISIBLE
        loadingIndicator.visibility = View.GONE
        productsContainer.visibility = View.GONE
    }
    
    private fun showSuccess(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class ManualPaywallActivity extends AppCompatActivity {
    private LinearLayout productsContainer;
    private ProgressBar loadingIndicator;
    private TextView errorView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manual_paywall);
        
        // Initialize views
        productsContainer = findViewById(R.id.products_container);
        loadingIndicator = findViewById(R.id.loading_indicator);
        errorView = findViewById(R.id.error_view);
        
        // Load paywall
        loadPaywall();
    }
    
    private void loadPaywall() {
        showLoading();
        
        Adapty.getPaywall("manual_paywall", result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                hideLoading();
                displayProducts(paywall.getProducts());
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                hideLoading();
                showError("Failed to load paywall: " + error.getMessage());
            }
        });
    }
    
    private void displayProducts(List<AdaptyProduct> products) {
        if (products.isEmpty()) {
            showError("No products available");
            return;
        }
        
        for (AdaptyProduct product : products) {
            View productView = createProductView(product);
            productsContainer.addView(productView);
        }
    }
    
    private View createProductView(AdaptyProduct product) {
        View productView = LayoutInflater.from(this).inflate(R.layout.product_item, null);
        
        // Set product information
        ((TextView) productView.findViewById(R.id.product_title)).setText(product.getLocalizedTitle());
        ((TextView) productView.findViewById(R.id.product_description)).setText(product.getLocalizedDescription());
        ((TextView) productView.findViewById(R.id.product_price)).setText(product.getLocalizedPrice());
        
        // Set up purchase button
        productView.findViewById(R.id.purchase_button).setOnClickListener(v -> makePurchase(product));
        
        return productView;
    }
    
    private void makePurchase(AdaptyProduct product) {
        showLoading();
        
        product.makePurchase(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
                hideLoading();
                showSuccess("Purchase successful!");
                
                // Close paywall and return to main screen
                finish();
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                hideLoading();
                showError("Purchase failed: " + error.getMessage());
            }
        });
    }
    
    private void showLoading() {
        loadingIndicator.setVisibility(View.VISIBLE);
        productsContainer.setVisibility(View.GONE);
        errorView.setVisibility(View.GONE);
    }
    
    private void hideLoading() {
        loadingIndicator.setVisibility(View.GONE);
        productsContainer.setVisibility(View.VISIBLE);
        errorView.setVisibility(View.GONE);
    }
    
    private void showError(String message) {
        errorView.setText(message);
        errorView.setVisibility(View.VISIBLE);
        loadingIndicator.setVisibility(View.GONE);
        productsContainer.setVisibility(View.GONE);
    }
    
    private void showSuccess(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
}
```
</TabItem>
</Tabs>

## Handle subscription status

Update your UI based on the user's subscription status:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun updateSubscriptionStatus() {
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val profile = result.value
                
                // Check if user has active subscription
                val hasActiveSubscription = profile.accessLevels.values.any { it.isActive }
                
                if (hasActiveSubscription) {
                    // User has subscription - hide paywall
                    hidePaywall()
                    showSubscriptionActiveMessage()
                } else {
                    // User doesn't have subscription - show paywall
                    showPaywall()
                }
            }
            is AdaptyResult.Error -> {
                // Handle error
                Log.e("Paywall", "Failed to get profile: ${result.error.message}")
            }
        }
    }
}

private fun hidePaywall() {
    // Hide paywall UI
    findViewById<View>(R.id.paywall_container).visibility = View.GONE
}

private fun showPaywall() {
    // Show paywall UI
    findViewById<View>(R.id.paywall_container).visibility = View.VISIBLE
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void updateSubscriptionStatus() {
    Adapty.getProfile(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
            
            // Check if user has active subscription
            boolean hasActiveSubscription = profile.getAccessLevels().values().stream()
                .anyMatch(AdaptyAccessLevel::isActive);
            
            if (hasActiveSubscription) {
                // User has subscription - hide paywall
                hidePaywall();
                showSubscriptionActiveMessage();
            } else {
                // User doesn't have subscription - show paywall
                showPaywall();
            }
        } else if (result instanceof AdaptyResult.Error) {
            // Handle error
            Log.e("Paywall", "Failed to get profile: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
}

private void hidePaywall() {
    // Hide paywall UI
    findViewById(R.id.paywall_container).setVisibility(View.GONE);
}

private void showPaywall() {
    // Show paywall UI
    findViewById(R.id.paywall_container).setVisibility(View.VISIBLE);
}
```
</TabItem>
</Tabs>

## Handle purchase errors

Implement proper error handling for purchases:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun makePurchaseWithErrorHandling(product: AdaptyProduct) {
    showLoadingIndicator()
    
    product.makePurchase { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val purchase = result.value
                hideLoadingIndicator()
                showSuccessMessage("Purchase successful!")
                
                // Update UI
                updateSubscriptionStatus()
            }
            is AdaptyResult.Error -> {
                val error = result.error
                hideLoadingIndicator()
                
                when (error.code) {
                    1003 -> {
                        // Can't make payments
                        showErrorMessage("In-app purchases are not available on this device.")
                    }
                    1004 -> {
                        // Product not available
                        showErrorMessage("This product is currently not available.")
                    }
                    1001 -> {
                        // Network error
                        showErrorMessage("Network error. Please check your connection and try again.")
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
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void makePurchaseWithErrorHandling(AdaptyProduct product) {
    showLoadingIndicator();
    
    product.makePurchase(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
            hideLoadingIndicator();
            showSuccessMessage("Purchase successful!");
            
            // Update UI
            updateSubscriptionStatus();
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            hideLoadingIndicator();
            
            switch (error.getCode()) {
                case 1003:
                    // Can't make payments
                    showErrorMessage("In-app purchases are not available on this device.");
                    break;
                case 1004:
                    // Product not available
                    showErrorMessage("This product is currently not available.");
                    break;
                case 1001:
                    // Network error
                    showErrorMessage("Network error. Please check your connection and try again.");
                    break;
                default:
                    // Other errors
                    showErrorMessage("Purchase failed: " + error.getMessage());
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
- [Making purchases](kmp-making-purchases.md) - Learn about making purchases
- [Handle errors](kmp-handle-errors.md) - Learn about error handling
