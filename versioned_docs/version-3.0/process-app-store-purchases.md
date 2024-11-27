---
title: "Processing App Store purchases"
description: "Learn how to handle App Store purchases in your mobile app with Adapty. Step-by-step implementation guide for managing deferred purchases and transactions."
metadataTitle: "How to Process App Store Purchases in Your Mobile App | Adapty Guide"
---

When a user makes a purchase in the App Store, you’ll need to handle it in your mobile app. Here’s how you can do it:

```swift title="Swift"
final class YourAdaptyDelegateImplementation: AdaptyDelegate {
    nonisolated func shouldAddStorePayment(for product: AdaptyDeferredProduct) -> Bool {
        // 1a.
        // Return `true` to continue the transaction in your app.

        // 1b.
        // Store the product object and return `false` to defer or cancel the transaction.
        false
    }
    
    // 2. Continue the deferred purchase later on by passing the product to `makePurchase`
    func continueDeferredPurchase() async {
        let storedProduct: AdaptyDeferredProduct = // get the product object from the 1b.
        do {
            try await Adapty.makePurchase(product: storedProduct)
        } catch {
            // handle the error
        }
    }
}
```

To learn about purchases in your mobile app, check out [Make purchases in mobile app](making-purchases).