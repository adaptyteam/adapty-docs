---
title: "Handle events in Kotlin Multiplatform SDK"
description: "Learn how to handle events in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Handle Events | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to handle events in the Adapty Kotlin Multiplatform SDK.

## Events overview

Adapty SDK provides various events that you can listen to for different purposes:

- **Profile updates** - When user subscription status changes
- **Paywall actions** - When users interact with paywall elements
- **Purchase events** - When purchases are made or fail

## Profile update events

Listen to profile updates to get real-time subscription status changes:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// Set up profile update listener
Adapty.setOnProfileUpdatedListener { profile ->
    // Profile updated - handle the change
    handleProfileUpdate(profile)
}

private fun handleProfileUpdate(profile: AdaptyProfile) {
    // Check subscription status
    val hasPremium = profile.accessLevels["premium"]?.isActive == true
    val hasPro = profile.accessLevels["pro"]?.isActive == true
    
    // Update UI based on subscription status
    if (hasPremium) {
        unlockPremiumFeatures()
    } else {
        lockPremiumFeatures()
    }
    
    if (hasPro) {
        unlockProFeatures()
    } else {
        lockProFeatures()
    }
    
    // Log the update
    Log.d("Adapty", "Profile updated: ${profile.profileId}")
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// Set up profile update listener
Adapty.setOnProfileUpdatedListener(profile -> {
    // Profile updated - handle the change
    handleProfileUpdate(profile);
});

private void handleProfileUpdate(AdaptyProfile profile) {
    // Check subscription status
    boolean hasPremium = profile.getAccessLevels().get("premium") != null && 
                        profile.getAccessLevels().get("premium").isActive();
    boolean hasPro = profile.getAccessLevels().get("pro") != null && 
                     profile.getAccessLevels().get("pro").isActive();
    
    // Update UI based on subscription status
    if (hasPremium) {
        unlockPremiumFeatures();
    } else {
        lockPremiumFeatures();
    }
    
    if (hasPro) {
        unlockProFeatures();
    } else {
        lockProFeatures();
    }
    
    // Log the update
    Log.d("Adapty", "Profile updated: " + profile.getProfileId());
}
```
</TabItem>
</Tabs>

## Track subscription changes

Track when subscriptions start or expire by comparing old and new profiles:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class SubscriptionTracker {
    private var previousProfile: AdaptyProfile? = null
    
    init {
        // Set up profile update listener
        Adapty.setOnProfileUpdatedListener { newProfile ->
            trackSubscriptionChanges(newProfile)
        }
    }
    
    private fun trackSubscriptionChanges(newProfile: AdaptyProfile) {
        val oldProfile = previousProfile
        previousProfile = newProfile
        
        if (oldProfile != null) {
            // Compare access levels
            newProfile.accessLevels.forEach { (levelId, newAccessLevel) ->
                val oldAccessLevel = oldProfile.accessLevels[levelId]
                
                if (oldAccessLevel == null && newAccessLevel.isActive) {
                    // New subscription started
                    handleNewSubscription(levelId)
                } else if (oldAccessLevel?.isActive == true && !newAccessLevel.isActive) {
                    // Subscription expired
                    handleSubscriptionExpired(levelId)
                }
            }
        }
    }
    
    private fun handleNewSubscription(levelId: String) {
        Log.d("Subscription", "New subscription started: $levelId")
        
        when (levelId) {
            "premium" -> {
                showWelcomeMessage("Welcome to Premium!")
                trackEvent("premium_subscription_started")
            }
            "pro" -> {
                showWelcomeMessage("Welcome to Pro!")
                trackEvent("pro_subscription_started")
            }
        }
    }
    
    private fun handleSubscriptionExpired(levelId: String) {
        Log.d("Subscription", "Subscription expired: $levelId")
        
        when (levelId) {
            "premium" -> {
                showExpiredMessage("Your Premium subscription has expired")
                trackEvent("premium_subscription_expired")
            }
            "pro" -> {
                showExpiredMessage("Your Pro subscription has expired")
                trackEvent("pro_subscription_expired")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class SubscriptionTracker {
    private AdaptyProfile previousProfile;
    
    public SubscriptionTracker() {
        // Set up profile update listener
        Adapty.setOnProfileUpdatedListener(newProfile -> {
            trackSubscriptionChanges(newProfile);
        });
    }
    
    private void trackSubscriptionChanges(AdaptyProfile newProfile) {
        AdaptyProfile oldProfile = previousProfile;
        previousProfile = newProfile;
        
        if (oldProfile != null) {
            // Compare access levels
            for (Map.Entry<String, AdaptyAccessLevel> entry : newProfile.getAccessLevels().entrySet()) {
                String levelId = entry.getKey();
                AdaptyAccessLevel newAccessLevel = entry.getValue();
                AdaptyAccessLevel oldAccessLevel = oldProfile.getAccessLevels().get(levelId);
                
                if (oldAccessLevel == null && newAccessLevel.isActive()) {
                    // New subscription started
                    handleNewSubscription(levelId);
                } else if (oldAccessLevel != null && oldAccessLevel.isActive() && !newAccessLevel.isActive()) {
                    // Subscription expired
                    handleSubscriptionExpired(levelId);
                }
            }
        }
    }
    
    private void handleNewSubscription(String levelId) {
        Log.d("Subscription", "New subscription started: " + levelId);
        
        switch (levelId) {
            case "premium":
                showWelcomeMessage("Welcome to Premium!");
                trackEvent("premium_subscription_started");
                break;
            case "pro":
                showWelcomeMessage("Welcome to Pro!");
                trackEvent("pro_subscription_started");
                break;
        }
    }
    
    private void handleSubscriptionExpired(String levelId) {
        Log.d("Subscription", "Subscription expired: " + levelId);
        
        switch (levelId) {
            case "premium":
                showExpiredMessage("Your Premium subscription has expired");
                trackEvent("premium_subscription_expired");
                break;
            case "pro":
                showExpiredMessage("Your Pro subscription has expired");
                trackEvent("pro_subscription_expired");
                break;
        }
    }
}
```
</TabItem>
</Tabs>

## Paywall action events

Handle paywall action events when users interact with paywall elements:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val paywallEventListener = object : AdaptyUIEventListener {
    override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
        // Log the action
        Log.d("Paywall", "Action performed: $action")
        
        // Track the event
        trackPaywallAction(action)
        
        // Handle the action
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

private fun trackPaywallAction(action: AdaptyUI.Action) {
    when (action) {
        is AdaptyUI.Action.Close -> {
            trackEvent("paywall_closed")
        }
        is AdaptyUI.Action.OpenURL -> {
            trackEvent("paywall_url_opened", mapOf("url" to action.url))
        }
        is AdaptyUI.Action.MakePurchase -> {
            trackEvent("paywall_purchase_attempted", mapOf("product_id" to action.product.vendorProductId))
        }
        is AdaptyUI.Action.RestorePurchases -> {
            trackEvent("paywall_restore_attempted")
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
AdaptyUIEventListener paywallEventListener = new AdaptyUIEventListener() {
    @Override
    public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
        // Log the action
        Log.d("Paywall", "Action performed: " + action);
        
        // Track the event
        trackPaywallAction(action);
        
        // Handle the action
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

private void trackPaywallAction(AdaptyUI.Action action) {
    if (action instanceof AdaptyUI.Action.Close) {
        trackEvent("paywall_closed");
    } else if (action instanceof AdaptyUI.Action.OpenURL) {
        Map<String, Object> params = new HashMap<>();
        params.put("url", ((AdaptyUI.Action.OpenURL) action).getUrl());
        trackEvent("paywall_url_opened", params);
    } else if (action instanceof AdaptyUI.Action.MakePurchase) {
        Map<String, Object> params = new HashMap<>();
        params.put("product_id", ((AdaptyUI.Action.MakePurchase) action).getProduct().getVendorProductId());
        trackEvent("paywall_purchase_attempted", params);
    } else if (action instanceof AdaptyUI.Action.RestorePurchases) {
        trackEvent("paywall_restore_attempted");
    }
}
```
</TabItem>
</Tabs>

## Purchase events

Track purchase events for analytics and user experience:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun makePurchaseWithTracking(product: AdaptyProduct) {
    // Track purchase attempt
    trackEvent("purchase_attempted", mapOf(
        "product_id" to product.vendorProductId,
        "product_price" to product.price,
        "product_currency" to product.currencyCode
    ))
    
    product.makePurchase { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val purchase = result.value
                
                // Track successful purchase
                trackEvent("purchase_successful", mapOf(
                    "product_id" to purchase.vendorProductId,
                    "purchase_id" to purchase.purchaseId
                ))
                
                showSuccessMessage("Purchase successful!")
            }
            is AdaptyResult.Error -> {
                val error = result.error
                
                // Track failed purchase
                trackEvent("purchase_failed", mapOf(
                    "product_id" to product.vendorProductId,
                    "error_code" to error.code,
                    "error_message" to error.message
                ))
                
                showErrorMessage("Purchase failed: ${error.message}")
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void makePurchaseWithTracking(AdaptyProduct product) {
    // Track purchase attempt
    Map<String, Object> attemptParams = new HashMap<>();
    attemptParams.put("product_id", product.getVendorProductId());
    attemptParams.put("product_price", product.getPrice());
    attemptParams.put("product_currency", product.getCurrencyCode());
    trackEvent("purchase_attempted", attemptParams);
    
    product.makePurchase(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
            
            // Track successful purchase
            Map<String, Object> successParams = new HashMap<>();
            successParams.put("product_id", purchase.getVendorProductId());
            successParams.put("purchase_id", purchase.getPurchaseId());
            trackEvent("purchase_successful", successParams);
            
            showSuccessMessage("Purchase successful!");
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            
            // Track failed purchase
            Map<String, Object> failureParams = new HashMap<>();
            failureParams.put("product_id", product.getVendorProductId());
            failureParams.put("error_code", error.getCode());
            failureParams.put("error_message", error.getMessage());
            trackEvent("purchase_failed", failureParams);
            
            showErrorMessage("Purchase failed: " + error.getMessage());
        }
    });
}
```
</TabItem>
</Tabs>

## Complete event handling example

Here's a complete example of handling all events:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class AdaptyEventHandler {
    private var previousProfile: AdaptyProfile? = null
    
    init {
        setupEventListeners()
    }
    
    private fun setupEventListeners() {
        // Set up profile update listener
        Adapty.setOnProfileUpdatedListener { profile ->
            handleProfileUpdate(profile)
        }
    }
    
    private fun handleProfileUpdate(profile: AdaptyProfile) {
        val oldProfile = previousProfile
        previousProfile = profile
        
        // Track subscription changes
        if (oldProfile != null) {
            trackSubscriptionChanges(oldProfile, profile)
        }
        
        // Update UI
        updateUI(profile)
    }
    
    private fun trackSubscriptionChanges(oldProfile: AdaptyProfile, newProfile: AdaptyProfile) {
        newProfile.accessLevels.forEach { (levelId, newAccessLevel) ->
            val oldAccessLevel = oldProfile.accessLevels[levelId]
            
            if (oldAccessLevel == null && newAccessLevel.isActive) {
                // New subscription
                trackEvent("subscription_started", mapOf("level" to levelId))
                showWelcomeMessage("Welcome to $levelId!")
            } else if (oldAccessLevel?.isActive == true && !newAccessLevel.isActive) {
                // Subscription expired
                trackEvent("subscription_expired", mapOf("level" to levelId))
                showExpiredMessage("Your $levelId subscription has expired")
            }
        }
    }
    
    private fun updateUI(profile: AdaptyProfile) {
        // Update UI based on subscription status
        val hasPremium = profile.accessLevels["premium"]?.isActive == true
        val hasPro = profile.accessLevels["pro"]?.isActive == true
        
        if (hasPremium) {
            unlockPremiumFeatures()
        } else {
            lockPremiumFeatures()
        }
        
        if (hasPro) {
            unlockProFeatures()
        } else {
            lockProFeatures()
        }
    }
    
    fun createPaywallEventListener(): AdaptyUIEventListener {
        return object : AdaptyUIEventListener {
            override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
                trackPaywallAction(action)
                handlePaywallAction(action, context)
            }
        }
    }
    
    private fun trackPaywallAction(action: AdaptyUI.Action) {
        when (action) {
            is AdaptyUI.Action.Close -> {
                trackEvent("paywall_closed")
            }
            is AdaptyUI.Action.OpenURL -> {
                trackEvent("paywall_url_opened", mapOf("url" to action.url))
            }
            is AdaptyUI.Action.MakePurchase -> {
                trackEvent("paywall_purchase_attempted", mapOf("product_id" to action.product.vendorProductId))
            }
            is AdaptyUI.Action.RestorePurchases -> {
                trackEvent("paywall_restore_attempted")
            }
        }
    }
    
    private fun handlePaywallAction(action: AdaptyUI.Action, context: Context) {
        when (action) {
            is AdaptyUI.Action.Close -> {
                if (context is Activity) {
                    context.onBackPressed()
                }
            }
            is AdaptyUI.Action.OpenURL -> {
                try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(action.url))
                    context.startActivity(intent)
                } catch (e: Exception) {
                    Log.e("Paywall", "Failed to open URL: ${e.message}")
                }
            }
            is AdaptyUI.Action.MakePurchase -> {
                makePurchaseWithTracking(action.product)
            }
            is AdaptyUI.Action.RestorePurchases -> {
                restorePurchasesWithTracking()
            }
        }
    }
    
    private fun makePurchaseWithTracking(product: AdaptyProduct) {
        trackEvent("purchase_attempted", mapOf("product_id" to product.vendorProductId))
        
        product.makePurchase { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val purchase = result.value
                    trackEvent("purchase_successful", mapOf("product_id" to purchase.vendorProductId))
                    showSuccessMessage("Purchase successful!")
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    trackEvent("purchase_failed", mapOf(
                        "product_id" to product.vendorProductId,
                        "error_code" to error.code
                    ))
                    showErrorMessage("Purchase failed: ${error.message}")
                }
            }
        }
    }
    
    private fun restorePurchasesWithTracking() {
        trackEvent("restore_attempted")
        
        Adapty.restorePurchases { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    val hasActiveSubscriptions = profile.accessLevels.values.any { it.isActive }
                    
                    if (hasActiveSubscriptions) {
                        trackEvent("restore_successful")
                        showSuccessMessage("Purchases restored successfully!")
                    } else {
                        trackEvent("restore_no_purchases")
                        showMessage("No previous purchases found.")
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    trackEvent("restore_failed", mapOf("error_code" to error.code))
                    showErrorMessage("Failed to restore purchases: ${error.message}")
                }
            }
        }
    }
    
    private fun trackEvent(eventName: String, parameters: Map<String, Any> = emptyMap()) {
        // Implement your analytics tracking here
        Log.d("Analytics", "Event: $eventName, Parameters: $parameters")
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class AdaptyEventHandler {
    private AdaptyProfile previousProfile;
    
    public AdaptyEventHandler() {
        setupEventListeners();
    }
    
    private void setupEventListeners() {
        // Set up profile update listener
        Adapty.setOnProfileUpdatedListener(profile -> {
            handleProfileUpdate(profile);
        });
    }
    
    private void handleProfileUpdate(AdaptyProfile profile) {
        AdaptyProfile oldProfile = previousProfile;
        previousProfile = profile;
        
        // Track subscription changes
        if (oldProfile != null) {
            trackSubscriptionChanges(oldProfile, profile);
        }
        
        // Update UI
        updateUI(profile);
    }
    
    private void trackSubscriptionChanges(AdaptyProfile oldProfile, AdaptyProfile newProfile) {
        for (Map.Entry<String, AdaptyAccessLevel> entry : newProfile.getAccessLevels().entrySet()) {
            String levelId = entry.getKey();
            AdaptyAccessLevel newAccessLevel = entry.getValue();
            AdaptyAccessLevel oldAccessLevel = oldProfile.getAccessLevels().get(levelId);
            
            if (oldAccessLevel == null && newAccessLevel.isActive()) {
                // New subscription
                Map<String, Object> params = new HashMap<>();
                params.put("level", levelId);
                trackEvent("subscription_started", params);
                showWelcomeMessage("Welcome to " + levelId + "!");
            } else if (oldAccessLevel != null && oldAccessLevel.isActive() && !newAccessLevel.isActive()) {
                // Subscription expired
                Map<String, Object> params = new HashMap<>();
                params.put("level", levelId);
                trackEvent("subscription_expired", params);
                showExpiredMessage("Your " + levelId + " subscription has expired");
            }
        }
    }
    
    private void updateUI(AdaptyProfile profile) {
        // Update UI based on subscription status
        boolean hasPremium = profile.getAccessLevels().get("premium") != null && 
                            profile.getAccessLevels().get("premium").isActive();
        boolean hasPro = profile.getAccessLevels().get("pro") != null && 
                         profile.getAccessLevels().get("pro").isActive();
        
        if (hasPremium) {
            unlockPremiumFeatures();
        } else {
            lockPremiumFeatures();
        }
        
        if (hasPro) {
            unlockProFeatures();
        } else {
            lockProFeatures();
        }
    }
    
    public AdaptyUIEventListener createPaywallEventListener() {
        return new AdaptyUIEventListener() {
            @Override
            public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
                trackPaywallAction(action);
                handlePaywallAction(action, context);
            }
        };
    }
    
    private void trackPaywallAction(AdaptyUI.Action action) {
        if (action instanceof AdaptyUI.Action.Close) {
            trackEvent("paywall_closed");
        } else if (action instanceof AdaptyUI.Action.OpenURL) {
            Map<String, Object> params = new HashMap<>();
            params.put("url", ((AdaptyUI.Action.OpenURL) action).getUrl());
            trackEvent("paywall_url_opened", params);
        } else if (action instanceof AdaptyUI.Action.MakePurchase) {
            Map<String, Object> params = new HashMap<>();
            params.put("product_id", ((AdaptyUI.Action.MakePurchase) action).getProduct().getVendorProductId());
            trackEvent("paywall_purchase_attempted", params);
        } else if (action instanceof AdaptyUI.Action.RestorePurchases) {
            trackEvent("paywall_restore_attempted");
        }
    }
    
    private void handlePaywallAction(AdaptyUI.Action action, Context context) {
        if (action instanceof AdaptyUI.Action.Close) {
            if (context instanceof Activity) {
                ((Activity) context).onBackPressed();
            }
        } else if (action instanceof AdaptyUI.Action.OpenURL) {
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(((AdaptyUI.Action.OpenURL) action).getUrl()));
                context.startActivity(intent);
            } catch (Exception e) {
                Log.e("Paywall", "Failed to open URL: " + e.getMessage());
            }
        } else if (action instanceof AdaptyUI.Action.MakePurchase) {
            makePurchaseWithTracking(((AdaptyUI.Action.MakePurchase) action).getProduct());
        } else if (action instanceof AdaptyUI.Action.RestorePurchases) {
            restorePurchasesWithTracking();
        }
    }
    
    private void makePurchaseWithTracking(AdaptyProduct product) {
        Map<String, Object> params = new HashMap<>();
        params.put("product_id", product.getVendorProductId());
        trackEvent("purchase_attempted", params);
        
        product.makePurchase(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPurchase purchase = ((AdaptyResult.Success<AdaptyPurchase>) result).getValue();
                Map<String, Object> successParams = new HashMap<>();
                successParams.put("product_id", purchase.getVendorProductId());
                trackEvent("purchase_successful", successParams);
                showSuccessMessage("Purchase successful!");
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                Map<String, Object> failureParams = new HashMap<>();
                failureParams.put("product_id", product.getVendorProductId());
                failureParams.put("error_code", error.getCode());
                trackEvent("purchase_failed", failureParams);
                showErrorMessage("Purchase failed: " + error.getMessage());
            }
        });
    }
    
    private void restorePurchasesWithTracking() {
        trackEvent("restore_attempted");
        
        Adapty.restorePurchases(result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                boolean hasActiveSubscriptions = profile.getAccessLevels().values().stream()
                    .anyMatch(AdaptyAccessLevel::isActive);
                
                if (hasActiveSubscriptions) {
                    trackEvent("restore_successful");
                    showSuccessMessage("Purchases restored successfully!");
                } else {
                    trackEvent("restore_no_purchases");
                    showMessage("No previous purchases found.");
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                Map<String, Object> params = new HashMap<>();
                params.put("error_code", error.getCode());
                trackEvent("restore_failed", params);
                showErrorMessage("Failed to restore purchases: " + error.getMessage());
            }
        });
    }
    
    private void trackEvent(String eventName, Map<String, Object> parameters) {
        // Implement your analytics tracking here
        Log.d("Analytics", "Event: " + eventName + ", Parameters: " + parameters);
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Listen to subscription changes](kmp-listen-subscription-changes.md) - Learn about subscription monitoring
- [Handle paywall actions](kmp-handle-paywall-actions.md) - Learn about paywall action handling
- [Making purchases](kmp-making-purchases.md) - Learn about making purchases
