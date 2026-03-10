# Kotlin Multiplatform (KMP) Snippets

## Error Handling Pattern

Use `onSuccess/onError` chaining:

```kotlin
Adapty.getProfile()
    .onSuccess { profile ->
        // check the access
    }
    .onError { error ->
        // handle the error
    }
```

## Best Practices
- Use `onSuccess` and `onError` chaining
- Use `val` for immutable variables
- Use camelCase for variables
- Chain methods for readability
- Always handle both success and error

## Common Patterns

```kotlin
// Result chaining
Adapty.getProfile()
    .onSuccess { profile ->
        // use profile
    }
    .onError { error ->
        // handle error
    }

// Named parameters
Adapty.makePurchase(product = product).onSuccess { }

// Builder pattern
val purchaseParams = AdaptyPurchaseParameters.Builder()
    .setSubscriptionUpdateParams(subscriptionUpdateParams)
    .build()

// Null safety
profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true
```

## Examples

### Get Profile
```kotlin
Adapty.getProfile()
    .onSuccess { profile ->
        // check the access
    }
    .onError { error ->
        // handle the error
    }
```

### Purchase with All Result Types
```kotlin
Adapty.makePurchase(product = product).onSuccess { purchaseResult ->
    when (purchaseResult) {
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
}.onError { error ->
    // Handle the error
}
```

### Subscription Update (Multi-step Construction)
```kotlin
val subscriptionUpdateParams = AdaptyAndroidSubscriptionUpdateParameters(
    oldSubVendorProductId = "old_subscription_product_id",
    replacementMode = AdaptyAndroidSubscriptionUpdateReplacementMode.CHARGE_FULL_PRICE
)

val purchaseParams = AdaptyPurchaseParameters.Builder()
    .setSubscriptionUpdateParams(subscriptionUpdateParams)
    .build()

Adapty.makePurchase(
    product = product,
    parameters = purchaseParams
).onSuccess { purchaseResult ->
    // handle success
}.onError { error ->
    // Handle the error
}
```
