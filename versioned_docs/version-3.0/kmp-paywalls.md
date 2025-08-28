---
title: "Paywalls in Kotlin Multiplatform SDK"
description: "Learn how to work with paywalls in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Paywalls | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Paywalls are the core of Adapty's monetization system. They define which products to offer and how to present them to users. This guide covers all aspects of working with paywalls in your Kotlin Multiplatform app.

## What are paywalls?

A paywall in Adapty is a configuration that defines:

- **Products to offer** - Which subscriptions, consumables, or lifetime products to show
- **Visual design** - How the paywall looks and behaves
- **User experience** - How users interact with the paywall

## Types of paywalls

Adapty offers two main approaches to paywalls:

### 1. Adapty Paywall Builder (Recommended)

The easiest way to create paywalls is using the [Adapty Paywall Builder](adapty-paywall-builder.md). This no-code tool lets you:

- Design paywalls visually in the dashboard
- Test different layouts and product combinations
- Update paywalls without app updates
- Run A/B tests easily

**Implementation**: [Quickstart guide](kmp-quickstart-paywalls.md)

### 2. Manually created paywalls

For more control, you can create paywalls in your app code while still using Adapty's product management:

- Design your own UI
- Get products from Adapty
- Handle purchases manually
- Maintain flexibility in product offerings

**Implementation**: [Manual implementation guide](kmp-implement-paywalls-manually.md)

## Get paywalls

To retrieve a paywall, you need its placement ID. Placements are configured in the Adapty dashboard and allow you to:

- Run different paywalls for different audiences
- A/B test different paywall designs
- Show different paywalls at different times

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.getPaywall("YOUR_PLACEMENT_ID") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            // Use the paywall
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.getPaywall("YOUR_PLACEMENT_ID", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        // Use the paywall
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle error
    }
});
```
</TabItem>
</Tabs>

## Display paywalls

### Paywall Builder paywalls

For paywalls created in the Paywall Builder:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// Get paywall view configuration
AdaptyUI.getViewConfiguration(paywall) { configResult ->
    if (configResult is AdaptyResult.Success) {
        val viewConfiguration = configResult.value
        
        // Create and display paywall view
        val paywallView = AdaptyUI.getPaywallView(
            activity,
            viewConfiguration,
            null, // products = null means auto-fetch
            eventListener
        )
        
        // Add to view hierarchy
        setContentView(paywallView)
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// Get paywall view configuration
AdaptyUI.getViewConfiguration(paywall, configResult -> {
    if (configResult instanceof AdaptyResult.Success) {
        AdaptyUI.LocalizedViewConfiguration viewConfiguration = 
            ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();
        
        // Create and display paywall view
        AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
            activity,
            viewConfiguration,
            null, // products = null means auto-fetch
            eventListener
        );
        
        // Add to view hierarchy
        setContentView(paywallView);
    }
});
```
</TabItem>
</Tabs>

### Manual paywalls

For manually created paywalls, you design your own UI and use the paywall's products:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// Get products from paywall
val products = paywall.products

// Display products in your custom UI
products.forEach { product ->
    // Create UI elements for each product
    // Handle purchase when user taps
    product.makePurchase { result ->
        when (result) {
            is AdaptyResult.Success -> {
                // Purchase successful
            }
            is AdaptyResult.Error -> {
                // Handle error
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// Get products from paywall
List<AdaptyProduct> products = paywall.getProducts();

// Display products in your custom UI
for (AdaptyProduct product : products) {
    // Create UI elements for each product
    // Handle purchase when user taps
    product.makePurchase(result -> {
        if (result instanceof AdaptyResult.Success) {
            // Purchase successful
        } else if (result instanceof AdaptyResult.Error) {
            // Handle error
        }
    });
}
```
</TabItem>
</Tabs>

## Handle paywall events

Paywalls can trigger various events that you need to handle:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
object : AdaptyUIEventListener {
    override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
        when (action) {
            is AdaptyUI.Action.Close -> {
                // Handle close action
                (context as? Activity)?.onBackPressed()
            }
            is AdaptyUI.Action.OpenURL -> {
                // Handle URL opening
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(action.url))
                context.startActivity(intent)
            }
            // Handle other actions...
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
new AdaptyUIEventListener() {
    @Override
    public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
        if (action instanceof AdaptyUI.Action.Close) {
            // Handle close action
            if (context instanceof Activity) {
                ((Activity) context).onBackPressed();
            }
        } else if (action instanceof AdaptyUI.Action.OpenURL) {
            // Handle URL opening
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(((AdaptyUI.Action.OpenURL) action).getUrl()));
            context.startActivity(intent);
        }
        // Handle other actions...
    }
}
```
</TabItem>
</Tabs>

## Fallback paywalls

When network issues prevent loading paywalls, you can use fallback paywalls:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.getPaywall("YOUR_PLACEMENT_ID") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            // Use the paywall
        }
        is AdaptyResult.Error -> {
            // Use fallback paywall
            useFallbackPaywall()
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.getPaywall("YOUR_PLACEMENT_ID", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        // Use the paywall
    } else if (result instanceof AdaptyResult.Error) {
        // Use fallback paywall
        useFallbackPaywall();
    }
});
```
</TabItem>
</Tabs>

## Next steps

- [Quickstart with Paywall Builder](kmp-quickstart-paywalls.md)
- [Manual paywall implementation](kmp-implement-paywalls-manually.md)
- [Handle paywall actions](kmp-handle-paywall-actions.md)
- [Handle paywall events](kmp-handling-events.md)
- [Use fallback paywalls](kmp-use-fallback-paywalls.md)
