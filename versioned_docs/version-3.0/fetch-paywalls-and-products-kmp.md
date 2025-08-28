---
title: "Fetch Paywalls and Products in Kotlin Multiplatform SDK"
description: "Learn how to fetch paywalls and products in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Fetch Paywalls and Products | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to fetch paywalls and products in the Adapty Kotlin Multiplatform SDK.

## Fetch paywalls

Fetch paywalls from Adapty:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun fetchPaywalls() {
    Adapty.getPaywalls { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywalls = result.value
                Log.d("Paywalls", "Fetched ${paywalls.size} paywalls")
                
                // Process paywalls
                processPaywalls(paywalls)
            }
            is AdaptyResult.Error -> {
                Log.e("Paywalls", "Failed to fetch paywalls: ${result.error.message}")
                handlePaywallError(result.error)
            }
        }
    }
}

private fun processPaywalls(paywalls: List<AdaptyPaywall>) {
    paywalls.forEach { paywall ->
        Log.d("Paywall", "Paywall: ${paywall.name}")
        Log.d("Paywall", "Developer ID: ${paywall.developerId}")
        Log.d("Paywall", "Revision: ${paywall.revision}")
        Log.d("Paywall", "Products count: ${paywall.products.size}")
        
        // Process products in this paywall
        processProducts(paywall.products)
    }
}

private fun processProducts(products: List<AdaptyPaywallProduct>) {
    products.forEach { product ->
        Log.d("Product", "Product: ${product.vendorProductId}")
        Log.d("Product", "Price: ${product.price}")
        Log.d("Product", "Currency: ${product.currencyCode}")
        Log.d("Product", "Subscription period: ${product.subscriptionPeriod}")
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void fetchPaywalls() {
    Adapty.getPaywalls(result -> {
        if (result instanceof AdaptyResult.Success) {
            List<AdaptyPaywall> paywalls = ((AdaptyResult.Success<List<AdaptyPaywall>>) result).getValue();
            Log.d("Paywalls", "Fetched " + paywalls.size() + " paywalls");
            
            // Process paywalls
            processPaywalls(paywalls);
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Paywalls", "Failed to fetch paywalls: " + ((AdaptyResult.Error) result).getError().getMessage());
            handlePaywallError(((AdaptyResult.Error) result).getError());
        }
    });
}

private void processPaywalls(List<AdaptyPaywall> paywalls) {
    for (AdaptyPaywall paywall : paywalls) {
        Log.d("Paywall", "Paywall: " + paywall.getName());
        Log.d("Paywall", "Developer ID: " + paywall.getDeveloperId());
        Log.d("Paywall", "Revision: " + paywall.getRevision());
        Log.d("Paywall", "Products count: " + paywall.getProducts().size());
        
        // Process products in this paywall
        processProducts(paywall.getProducts());
    }
}

private void processProducts(List<AdaptyPaywallProduct> products) {
    for (AdaptyPaywallProduct product : products) {
        Log.d("Product", "Product: " + product.getVendorProductId());
        Log.d("Product", "Price: " + product.getPrice());
        Log.d("Product", "Currency: " + product.getCurrencyCode());
        Log.d("Product", "Subscription period: " + product.getSubscriptionPeriod());
    }
}
```
</TabItem>
</Tabs>

## Fetch specific paywall

Fetch a specific paywall by ID:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun fetchSpecificPaywall(paywallId: String) {
    Adapty.getPaywall(paywallId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                Log.d("Paywall", "Fetched specific paywall: ${paywall.name}")
                
                // Process the specific paywall
                processSpecificPaywall(paywall)
            }
            is AdaptyResult.Error -> {
                Log.e("Paywall", "Failed to fetch paywall $paywallId: ${result.error.message}")
                handlePaywallError(result.error)
            }
        }
    }
}

private fun processSpecificPaywall(paywall: AdaptyPaywall) {
    Log.d("Paywall", "Paywall details:")
    Log.d("Paywall", "  Name: ${paywall.name}")
    Log.d("Paywall", "  Developer ID: ${paywall.developerId}")
    Log.d("Paywall", "  Revision: ${paywall.revision}")
    Log.d("Paywall", "  Products: ${paywall.products.size}")
    
    // Show paywall to user
    showPaywallToUser(paywall)
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void fetchSpecificPaywall(String paywallId) {
    Adapty.getPaywall(paywallId, result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
            Log.d("Paywall", "Fetched specific paywall: " + paywall.getName());
            
            // Process the specific paywall
            processSpecificPaywall(paywall);
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Paywall", "Failed to fetch paywall " + paywallId + ": " + ((AdaptyResult.Error) result).getError().getMessage());
            handlePaywallError(((AdaptyResult.Error) result).getError());
        }
    });
}

private void processSpecificPaywall(AdaptyPaywall paywall) {
    Log.d("Paywall", "Paywall details:");
    Log.d("Paywall", "  Name: " + paywall.getName());
    Log.d("Paywall", "  Developer ID: " + paywall.getDeveloperId());
    Log.d("Paywall", "  Revision: " + paywall.getRevision());
    Log.d("Paywall", "  Products: " + paywall.getProducts().size());
    
    // Show paywall to user
    showPaywallToUser(paywall);
}
```
</TabItem>
</Tabs>

## Fetch products

Fetch products from the app store:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun fetchProducts(productIds: List<String>) {
    Adapty.getProducts(productIds) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val products = result.value
                Log.d("Products", "Fetched ${products.size} products")
                
                // Process products
                processStoreProducts(products)
            }
            is AdaptyResult.Error -> {
                Log.e("Products", "Failed to fetch products: ${result.error.message}")
                handleProductError(result.error)
            }
        }
    }
}

private fun processStoreProducts(products: List<AdaptyProduct>) {
    products.forEach { product ->
        Log.d("Product", "Product details:")
        Log.d("Product", "  Vendor Product ID: ${product.vendorProductId}")
        Log.d("Product", "  Price: ${product.price}")
        Log.d("Product", "  Currency: ${product.currencyCode}")
        Log.d("Product", "  Localized Title: ${product.localizedTitle}")
        Log.d("Product", "  Localized Description: ${product.localizedDescription}")
        Log.d("Product", "  Subscription Period: ${product.subscriptionPeriod}")
        Log.d("Product", "  Introductory Offer: ${product.introductoryOfferEligibility}")
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void fetchProducts(List<String> productIds) {
    Adapty.getProducts(productIds, result -> {
        if (result instanceof AdaptyResult.Success) {
            List<AdaptyProduct> products = ((AdaptyResult.Success<List<AdaptyProduct>>) result).getValue();
            Log.d("Products", "Fetched " + products.size() + " products");
            
            // Process products
            processStoreProducts(products);
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Products", "Failed to fetch products: " + ((AdaptyResult.Error) result).getError().getMessage());
            handleProductError(((AdaptyResult.Error) result).getError());
        }
    });
}

private void processStoreProducts(List<AdaptyProduct> products) {
    for (AdaptyProduct product : products) {
        Log.d("Product", "Product details:");
        Log.d("Product", "  Vendor Product ID: " + product.getVendorProductId());
        Log.d("Product", "  Price: " + product.getPrice());
        Log.d("Product", "  Currency: " + product.getCurrencyCode());
        Log.d("Product", "  Localized Title: " + product.getLocalizedTitle());
        Log.d("Product", "  Localized Description: " + product.getLocalizedDescription());
        Log.d("Product", "  Subscription Period: " + product.getSubscriptionPeriod());
        Log.d("Product", "  Introductory Offer: " + product.getIntroductoryOfferEligibility());
    }
}
```
</TabItem>
</Tabs>

## Fetch paywalls with products

Fetch paywalls and their associated products:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun fetchPaywallsWithProducts() {
    Adapty.getPaywalls { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywalls = result.value
                Log.d("Paywalls", "Fetched ${paywalls.size} paywalls with products")
                
                // Extract all product IDs from paywalls
                val allProductIds = paywalls.flatMap { paywall ->
                    paywall.products.map { it.vendorProductId }
                }.distinct()
                
                Log.d("Products", "Found ${allProductIds.size} unique product IDs")
                
                // Fetch detailed product information
                fetchProducts(allProductIds) { productsResult ->
                    when (productsResult) {
                        is AdaptyResult.Success -> {
                            val products = productsResult.value
                            Log.d("Products", "Fetched ${products.size} detailed products")
                            
                            // Create a map for quick lookup
                            val productMap = products.associateBy { it.vendorProductId }
                            
                            // Process paywalls with detailed product info
                            processPaywallsWithDetailedProducts(productMap)
                        }
                        is AdaptyResult.Error -> {
                            Log.e("Products", "Failed to fetch products: ${productsResult.error.message}")
                            handleProductError(productsResult.error)
                        }
                    }
                }
            }
            is AdaptyResult.Error -> {
                Log.e("Paywalls", "Failed to fetch paywalls: ${result.error.message}")
                handlePaywallError(result.error)
            }
        }
    }
}

private fun fetchProducts(productIds: List<String>) {
    Adapty.getProducts(productIds) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val products = result.value
                Log.d("Products", "Fetched ${products.size} detailed products")
                
                // Create a map for quick lookup
                val productMap = products.associateBy { it.vendorProductId }
                
                // Process paywalls with detailed product info
                processPaywallsWithDetailedProducts(productMap)
            }
            is AdaptyResult.Error -> {
                Log.e("Products", "Failed to fetch products: ${result.error.message}")
                handleProductError(result.error)
            }
        }
    }
}

private fun processPaywallsWithDetailedProducts(productMap: Map<String, AdaptyProduct>) {
    // Now you have both paywalls and detailed product information
    // You can combine them for a complete view
    Log.d("Combined", "Processing paywalls with detailed product information")
    
    // Example: Create a complete paywall view
    createCompletePaywallView(productMap)
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void fetchPaywallsWithProducts() {
    Adapty.getPaywalls(result -> {
        if (result instanceof AdaptyResult.Success) {
            List<AdaptyPaywall> paywalls = ((AdaptyResult.Success<List<AdaptyPaywall>>) result).getValue();
            Log.d("Paywalls", "Fetched " + paywalls.size() + " paywalls with products");
            
            // Extract all product IDs from paywalls
            Set<String> allProductIds = new HashSet<>();
            for (AdaptyPaywall paywall : paywalls) {
                for (AdaptyPaywallProduct product : paywall.getProducts()) {
                    allProductIds.add(product.getVendorProductId());
                }
            }
            
            Log.d("Products", "Found " + allProductIds.size() + " unique product IDs");
            
            // Fetch detailed product information
            fetchProducts(new ArrayList<>(allProductIds));
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Paywalls", "Failed to fetch paywalls: " + ((AdaptyResult.Error) result).getError().getMessage());
            handlePaywallError(((AdaptyResult.Error) result).getError());
        }
    });
}

private void fetchProducts(List<String> productIds) {
    Adapty.getProducts(productIds, result -> {
        if (result instanceof AdaptyResult.Success) {
            List<AdaptyProduct> products = ((AdaptyResult.Success<List<AdaptyProduct>>) result).getValue();
            Log.d("Products", "Fetched " + products.size() + " detailed products");
            
            // Create a map for quick lookup
            Map<String, AdaptyProduct> productMap = new HashMap<>();
            for (AdaptyProduct product : products) {
                productMap.put(product.getVendorProductId(), product);
            }
            
            // Process paywalls with detailed product info
            processPaywallsWithDetailedProducts(productMap);
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("Products", "Failed to fetch products: " + ((AdaptyResult.Error) result).getError().getMessage());
            handleProductError(((AdaptyResult.Error) result).getError());
        }
    });
}

private void processPaywallsWithDetailedProducts(Map<String, AdaptyProduct> productMap) {
    // Now you have both paywalls and detailed product information
    // You can combine them for a complete view
    Log.d("Combined", "Processing paywalls with detailed product information");
    
    // Example: Create a complete paywall view
    createCompletePaywallView(productMap);
}
```
</TabItem>
</Tabs>

## Handle errors

Handle errors when fetching paywalls and products:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun handlePaywallError(error: AdaptyError) {
    when (error) {
        is AdaptyError.NetworkError -> {
            Log.e("Paywall", "Network error: ${error.message}")
            showNetworkError("Failed to fetch paywalls. Please check your internet connection.")
        }
        is AdaptyError.ServerError -> {
            Log.e("Paywall", "Server error: ${error.message}")
            showServerError("Server error occurred. Please try again later.")
        }
        is AdaptyError.InvalidResponse -> {
            Log.e("Paywall", "Invalid response: ${error.message}")
            showInvalidResponseError("Invalid response from server.")
        }
        else -> {
            Log.e("Paywall", "Unknown error: ${error.message}")
            showGenericError("An unexpected error occurred.")
        }
    }
}

private fun handleProductError(error: AdaptyError) {
    when (error) {
        is AdaptyError.NetworkError -> {
            Log.e("Product", "Network error: ${error.message}")
            showNetworkError("Failed to fetch products. Please check your internet connection.")
        }
        is AdaptyError.InvalidProductId -> {
            Log.e("Product", "Invalid product ID: ${error.message}")
            showInvalidProductError("One or more product IDs are invalid.")
        }
        is AdaptyError.StoreNotAvailable -> {
            Log.e("Product", "Store not available: ${error.message}")
            showStoreNotAvailableError("App store is not available on this device.")
        }
        else -> {
            Log.e("Product", "Unknown error: ${error.message}")
            showGenericError("An unexpected error occurred while fetching products.")
        }
    }
}

private fun showNetworkError(message: String) {
    // Show network error to user
    showErrorDialog("Network Error", message)
}

private fun showServerError(message: String) {
    // Show server error to user
    showErrorDialog("Server Error", message)
}

private fun showInvalidResponseError(message: String) {
    // Show invalid response error to user
    showErrorDialog("Invalid Response", message)
}

private fun showInvalidProductError(message: String) {
    // Show invalid product error to user
    showErrorDialog("Invalid Product", message)
}

private fun showStoreNotAvailableError(message: String) {
    // Show store not available error to user
    showErrorDialog("Store Not Available", message)
}

private fun showGenericError(message: String) {
    // Show generic error to user
    showErrorDialog("Error", message)
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void handlePaywallError(AdaptyError error) {
    if (error instanceof AdaptyError.NetworkError) {
        Log.e("Paywall", "Network error: " + error.getMessage());
        showNetworkError("Failed to fetch paywalls. Please check your internet connection.");
    } else if (error instanceof AdaptyError.ServerError) {
        Log.e("Paywall", "Server error: " + error.getMessage());
        showServerError("Server error occurred. Please try again later.");
    } else if (error instanceof AdaptyError.InvalidResponse) {
        Log.e("Paywall", "Invalid response: " + error.getMessage());
        showInvalidResponseError("Invalid response from server.");
    } else {
        Log.e("Paywall", "Unknown error: " + error.getMessage());
        showGenericError("An unexpected error occurred.");
    }
}

private void handleProductError(AdaptyError error) {
    if (error instanceof AdaptyError.NetworkError) {
        Log.e("Product", "Network error: " + error.getMessage());
        showNetworkError("Failed to fetch products. Please check your internet connection.");
    } else if (error instanceof AdaptyError.InvalidProductId) {
        Log.e("Product", "Invalid product ID: " + error.getMessage());
        showInvalidProductError("One or more product IDs are invalid.");
    } else if (error instanceof AdaptyError.StoreNotAvailable) {
        Log.e("Product", "Store not available: " + error.getMessage());
        showStoreNotAvailableError("App store is not available on this device.");
    } else {
        Log.e("Product", "Unknown error: " + error.getMessage());
        showGenericError("An unexpected error occurred while fetching products.");
    }
}

private void showNetworkError(String message) {
    // Show network error to user
    showErrorDialog("Network Error", message);
}

private void showServerError(String message) {
    // Show server error to user
    showErrorDialog("Server Error", message);
}

private void showInvalidResponseError(String message) {
    // Show invalid response error to user
    showErrorDialog("Invalid Response", message);
}

private void showInvalidProductError(String message) {
    // Show invalid product error to user
    showErrorDialog("Invalid Product", message);
}

private void showStoreNotAvailableError(String message) {
    // Show store not available error to user
    showErrorDialog("Store Not Available", message);
}

private void showGenericError(String message) {
    // Show generic error to user
    showErrorDialog("Error", message);
}
```
</TabItem>
</Tabs>

## Complete example

Here's a complete example of fetching paywalls and products:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class PaywallManager {
    private var paywalls: List<AdaptyPaywall> = emptyList()
    private var products: Map<String, AdaptyProduct> = emptyMap()
    
    fun initializePaywalls() {
        // Fetch paywalls first
        fetchPaywalls { paywallsResult ->
            when (paywallsResult) {
                is AdaptyResult.Success -> {
                    paywalls = paywallsResult.value
                    Log.d("PaywallManager", "Fetched ${paywalls.size} paywalls")
                    
                    // Extract product IDs and fetch products
                    val productIds = extractProductIds(paywalls)
                    fetchProducts(productIds) { productsResult ->
                        when (productsResult) {
                            is AdaptyResult.Success -> {
                                products = productsResult.value.associateBy { it.vendorProductId }
                                Log.d("PaywallManager", "Fetched ${products.size} products")
                                
                                // Notify that data is ready
                                onDataReady()
                            }
                            is AdaptyResult.Error -> {
                                Log.e("PaywallManager", "Failed to fetch products: ${productsResult.error.message}")
                                handleProductError(productsResult.error)
                            }
                        }
                    }
                }
                is AdaptyResult.Error -> {
                    Log.e("PaywallManager", "Failed to fetch paywalls: ${paywallsResult.error.message}")
                    handlePaywallError(paywallsResult.error)
                }
            }
        }
    }
    
    private fun extractProductIds(paywalls: List<AdaptyPaywall>): List<String> {
        return paywalls.flatMap { paywall ->
            paywall.products.map { it.vendorProductId }
        }.distinct()
    }
    
    fun getPaywall(id: String): AdaptyPaywall? {
        return paywalls.find { it.developerId == id }
    }
    
    fun getProduct(vendorProductId: String): AdaptyProduct? {
        return products[vendorProductId]
    }
    
    fun getAllPaywalls(): List<AdaptyPaywall> {
        return paywalls
    }
    
    fun getAllProducts(): List<AdaptyProduct> {
        return products.values.toList()
    }
    
    fun getPaywallWithProducts(paywallId: String): PaywallWithProducts? {
        val paywall = getPaywall(paywallId) ?: return null
        
        val paywallProducts = paywall.products.mapNotNull { paywallProduct ->
            products[paywallProduct.vendorProductId]?.let { detailedProduct ->
                PaywallProductInfo(paywallProduct, detailedProduct)
            }
        }
        
        return PaywallWithProducts(paywall, paywallProducts)
    }
    
    private fun onDataReady() {
        // Notify UI that data is ready
        Log.d("PaywallManager", "Paywall and product data is ready")
        
        // Update UI
        updateUI()
    }
    
    private fun updateUI() {
        // Update your UI with the fetched data
        // This could be updating a RecyclerView, ListView, etc.
        Log.d("PaywallManager", "Updating UI with ${paywalls.size} paywalls and ${products.size} products")
    }
}

data class PaywallWithProducts(
    val paywall: AdaptyPaywall,
    val products: List<PaywallProductInfo>
)

data class PaywallProductInfo(
    val paywallProduct: AdaptyPaywallProduct,
    val detailedProduct: AdaptyProduct
)
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class PaywallManager {
    private List<AdaptyPaywall> paywalls = new ArrayList<>();
    private Map<String, AdaptyProduct> products = new HashMap<>();
    
    public void initializePaywalls() {
        // Fetch paywalls first
        fetchPaywalls(paywallsResult -> {
            if (paywallsResult instanceof AdaptyResult.Success) {
                paywalls = ((AdaptyResult.Success<List<AdaptyPaywall>>) paywallsResult).getValue();
                Log.d("PaywallManager", "Fetched " + paywalls.size() + " paywalls");
                
                // Extract product IDs and fetch products
                List<String> productIds = extractProductIds(paywalls);
                fetchProducts(productIds, productsResult -> {
                    if (productsResult instanceof AdaptyResult.Success) {
                        List<AdaptyProduct> productsList = ((AdaptyResult.Success<List<AdaptyProduct>>) productsResult).getValue();
                        for (AdaptyProduct product : productsList) {
                            products.put(product.getVendorProductId(), product);
                        }
                        Log.d("PaywallManager", "Fetched " + products.size() + " products");
                        
                        // Notify that data is ready
                        onDataReady();
                    } else if (productsResult instanceof AdaptyResult.Error) {
                        Log.e("PaywallManager", "Failed to fetch products: " + ((AdaptyResult.Error) productsResult).getError().getMessage());
                        handleProductError(((AdaptyResult.Error) productsResult).getError());
                    }
                });
            } else if (paywallsResult instanceof AdaptyResult.Error) {
                Log.e("PaywallManager", "Failed to fetch paywalls: " + ((AdaptyResult.Error) paywallsResult).getError().getMessage());
                handlePaywallError(((AdaptyResult.Error) paywallsResult).getError());
            }
        });
    }
    
    private List<String> extractProductIds(List<AdaptyPaywall> paywalls) {
        Set<String> productIds = new HashSet<>();
        for (AdaptyPaywall paywall : paywalls) {
            for (AdaptyPaywallProduct product : paywall.getProducts()) {
                productIds.add(product.getVendorProductId());
            }
        }
        return new ArrayList<>(productIds);
    }
    
    public AdaptyPaywall getPaywall(String id) {
        for (AdaptyPaywall paywall : paywalls) {
            if (paywall.getDeveloperId().equals(id)) {
                return paywall;
            }
        }
        return null;
    }
    
    public AdaptyProduct getProduct(String vendorProductId) {
        return products.get(vendorProductId);
    }
    
    public List<AdaptyPaywall> getAllPaywalls() {
        return new ArrayList<>(paywalls);
    }
    
    public List<AdaptyProduct> getAllProducts() {
        return new ArrayList<>(products.values());
    }
    
    public PaywallWithProducts getPaywallWithProducts(String paywallId) {
        AdaptyPaywall paywall = getPaywall(paywallId);
        if (paywall == null) return null;
        
        List<PaywallProductInfo> paywallProducts = new ArrayList<>();
        for (AdaptyPaywallProduct paywallProduct : paywall.getProducts()) {
            AdaptyProduct detailedProduct = products.get(paywallProduct.getVendorProductId());
            if (detailedProduct != null) {
                paywallProducts.add(new PaywallProductInfo(paywallProduct, detailedProduct));
            }
        }
        
        return new PaywallWithProducts(paywall, paywallProducts);
    }
    
    private void onDataReady() {
        // Notify UI that data is ready
        Log.d("PaywallManager", "Paywall and product data is ready");
        
        // Update UI
        updateUI();
    }
    
    private void updateUI() {
        // Update your UI with the fetched data
        // This could be updating a RecyclerView, ListView, etc.
        Log.d("PaywallManager", "Updating UI with " + paywalls.size() + " paywalls and " + products.size() + " products");
    }
}

public class PaywallWithProducts {
    private AdaptyPaywall paywall;
    private List<PaywallProductInfo> products;
    
    public PaywallWithProducts(AdaptyPaywall paywall, List<PaywallProductInfo> products) {
        this.paywall = paywall;
        this.products = products;
    }
    
    // Getters
    public AdaptyPaywall getPaywall() { return paywall; }
    public List<PaywallProductInfo> getProducts() { return products; }
}

public class PaywallProductInfo {
    private AdaptyPaywallProduct paywallProduct;
    private AdaptyProduct detailedProduct;
    
    public PaywallProductInfo(AdaptyPaywallProduct paywallProduct, AdaptyProduct detailedProduct) {
        this.paywallProduct = paywallProduct;
        this.detailedProduct = detailedProduct;
    }
    
    // Getters
    public AdaptyPaywallProduct getPaywallProduct() { return paywallProduct; }
    public AdaptyProduct getDetailedProduct() { return detailedProduct; }
}
```
</TabItem>
</Tabs>

## Next steps

- [Handle errors](kmp-handle-errors.md) - Learn about error handling
- [Make purchases](kmp-making-purchases.md) - Learn how to make purchases
- [Present paywalls](kmp-present-paywalls.md) - Learn how to present paywalls to users
