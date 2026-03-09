# Android (Kotlin) Snippets

## Error Handling Pattern

Use `AdaptyResult` sealed class with `when`:

```kotlin
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // check the access
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

## Best Practices
- Use `when` expressions (not `if/else` for sealed classes)
- Use `val` for immutable variables (prefer over `var`)
- Use descriptive variable names with camelCase
- Always handle both Success and Error cases
- Use named parameters for clarity when constructing objects

## Common Patterns

```kotlin
// Object construction with named parameters
val params = AdaptySubscriptionUpdateParameters(
    oldSubVendorProductId = "old_product_id",
    replacementMode = AdaptySubscriptionUpdateReplacementMode.WITH_TIME_PRORATION
)

// Null safety
profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true

// Sealed class handling
when (result) {
    is AdaptyResult.Success -> { /* ... */ }
    is AdaptyResult.Error -> { /* ... */ }
}
```

## Nested Result Types

Purchase results use nested `when` expressions:

```kotlin
Adapty.makePurchase(activity, product, null) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            when (val purchaseResult = result.value) {
                is AdaptyPurchaseResult.Success -> {
                    val profile = purchaseResult.profile
                    // Grant access to the paid features
                }
                is AdaptyPurchaseResult.UserCanceled -> { }
                is AdaptyPurchaseResult.Pending -> { }
            }
        }
        is AdaptyResult.Error -> { }
    }
}
```

Key pattern: Nested `when` expressions for multi-level result types.

## Event Listeners (Override Pattern)

```kotlin
public override fun onPurchaseFinished(
    purchaseResult: AdaptyPurchaseResult,
    product: AdaptyPaywallProduct,
    context: Context,
) {
    if (purchaseResult !is AdaptyPurchaseResult.UserCanceled)
        context.getActivityOrNull()?.onBackPressed()
}
```

Key patterns: `public override` visibility; named parameters on multiple lines; negative type checking `!is`.

## Examples

### Get Profile
```kotlin
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // check the access
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

### Make Purchase with Context
```kotlin
val product = AdaptyProduct(
    vendorProductId = "product_id",
    paywallId = "paywall_id"
)

Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // process the purchase
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

### Subscription Update (Full Context)
```kotlin
val subscriptionUpdateParams = AdaptySubscriptionUpdateParameters(
    oldSubVendorProductId = "old_product_id",
    replacementMode = AdaptySubscriptionUpdateReplacementMode.WITH_TIME_PRORATION
)

val product = AdaptyProduct(
    vendorProductId = "new_product_id",
    paywallId = "paywall_id"
)

Adapty.makePurchase(activity, product, subscriptionUpdateParams) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // subscription updated
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

### Purchase with All Result Types
```kotlin
Adapty.makePurchase(activity, product, null) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            when (val purchaseResult = result.value) {
                is AdaptyPurchaseResult.Success -> {
                    val profile = purchaseResult.profile
                    if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true) {
                        // Grant access to the paid features
                    }
                }
                is AdaptyPurchaseResult.UserCanceled -> {
                    // Handle the case where the user canceled the purchase
                }
                is AdaptyPurchaseResult.Pending -> {
                    // Handle deferred purchases (e.g., the user will pay offline with cash)
                }
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle the error
        }
    }
}
```

### Builder Pattern for Purchase Parameters
```kotlin
Adapty.makePurchase(
    activity,
    product,
    AdaptyPurchaseParameters.Builder()
        .withSubscriptionUpdateParams(subscriptionUpdateParams)
        .build()
) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            when (val purchaseResult = result.value) {
                is AdaptyPurchaseResult.Success -> {
                    val profile = purchaseResult.profile
                    // successful cross-grade
                }
                is AdaptyPurchaseResult.UserCanceled -> {
                    // user canceled the purchase flow
                }
                is AdaptyPurchaseResult.Pending -> {
                    // the purchase has not been finished yet
                }
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle the error
        }
    }
}
```

### Configuration
```kotlin
AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withEnablePendingPrepaidPlans(true)
    .build()
```
