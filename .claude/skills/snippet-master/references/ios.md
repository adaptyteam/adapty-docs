# iOS (Swift) Snippets

## Error Handling Pattern

Use `async/await` with `do-catch`:

```swift
do {
    let profile = try await Adapty.getProfile()
    // use the profile
} catch {
    // handle the error
}
```

## Best Practices
- Use `async/await` for asynchronous operations (modern Swift)
- Use `guard` statements for early returns
- Use optional chaining (`?.`) and nil coalescing (`??`)
- Use descriptive variable names with camelCase
- Always include error handling

## Common Patterns

```swift
// Checking optional values
if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
    // grant access
}

// Guard statements
guard let userId = profile.userId else {
    // handle missing userId
    return
}

// Optional binding
if let subscription = profile.subscriptions["product_id"] {
    // use subscription
}
```

## Callback Variant

When showing both async and callback patterns, use tabs with labels `Swift` / `Swift-Callback`:

```swift
// Swift (async/await) — default tab
let profile = try await Adapty.getProfile()

// Swift-Callback — alternative tab
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
    }
}
```

## SwiftUI Paywall Presentation

```swift
@State var paywallPresented = false

var body: some View {
    Text("Hello, AdaptyUI!")
        .paywall(
            isPresented: $paywallPresented,
            paywallConfiguration: <AdaptyUI.PaywallConfiguration>,
            didPerformAction: { action in
                switch action {
                    case .close:
                        paywallPresented = false
                    case let .openURL(url):
                        // handle opening the URL
                    default:
                        // handle other actions
                }
            }
        )
}
```

Key patterns:
- `@State` for presentation state, binding with `$paywallPresented`
- Switch on action enums with associated values: `case let .openURL(url):`
- Inline closure handlers

Tab labels: `SwiftUI` / `UIKit`

## Examples

### Get Profile
```swift
do {
    let profile = try await Adapty.getProfile()

    if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
        // grant access to premium features
    }
} catch {
    // handle the error
}
```

### Make Purchase with Context
```swift
do {
    let product = try await Adapty.getPaywallProduct(
        paywallId: "paywall_id",
        productId: "product_id"
    )

    let profile = try await Adapty.makePurchase(product: product)
    // process the purchase
} catch {
    // handle the error
}
```

### Purchase with All Result Types
```swift
do {
    let result = try await Adapty.makePurchase(product: product)

    switch result {
    case .success(let profile):
        if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
            // grant access to premium features
        }
    case .cancelled:
        // handle the case where the user canceled the purchase
    case .pending:
        // handle deferred purchases (e.g., the user will pay offline with cash)
    }
} catch {
    // handle the error
}
```

### Event Handler (UIKit Delegate)
```swift
func paywallController(
    _ controller: AdaptyPaywallController,
    didFinishPurchase product: AdaptyPaywallProductWithoutDeterminingOffer,
    purchaseResult: AdaptyPurchaseResult
) { }
```

Event handlers often have minimal bodies in examples — focus is on the signature.
