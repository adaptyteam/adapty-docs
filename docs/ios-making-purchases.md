---
title: "iOS – Making Purchases"
description: ""
metadataTitle: ""
---

To make the purchase, you have to call `.makePurchase()` method:

```swift
Adapty.makePurchase(product: product) { result in
    switch result {
    case let .success(profile):
        // successful purchase
    case let .failure(error):
        // handle the error
    }
}
```

Request parameters:

- **Product** (required): an [`AdaptyPaywallProduct`](sdk-models#adaptypaywallproduct) object retrieved from the paywall.

Response parameters:

- **Profile**: an [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases. Generally, you have to check only access level status to determine whether the user has premium access to the app.

:::warning
Make sure you've added [App Store Shared Secret](app-store-shared-secret) in Adapty Dashboard, without it, we can't validate purchases.
:::

Below is a complete example of making the purchase and checking the user's access level.

```swift
Adapty.makePurchase(product: product) { result in
    switch result {
    case let .success(profile):
        if profile.accessLevels["premium"]?.isActive ?? false {
            // grant access to premium features
        }
    case let .failure(error):
        // handle the error
    }
}
```

:::warning
Make sure to set up [App Store Server Notifications](app-store-server-notifications) to receive subscription updates without significant delays.
:::

:::warning
Subscription offers

If your paywall has an active promotional offer for the product you are attempting to purchase, Adapty will automatically apply that offer at the time of purchase.

Adapty signs the request according to Apple guidelines, please make sure you've uploaded [Subscription Key](app-store-promotional-offers) in Adapty Dashboard when using promotional offers.
:::

### Restoring purchases

To restore purchases, you have to call `.restorePurchases()` method:

```swift
Adapty.restorePurchases { [weak self] result in
    switch result {
        case let .success(profile):
            // check the access level
        case let .failure(error):
            // handle the error
    }
}
```

Response parameters:

- **Profile**: an [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases. Generally, you have to check only access level status to determine whether the user has premium access to the app.

### Deferred purchases

For deferred purchases, Adapty SDK has an optional delegate method, which is called when the user starts the purchase in the App Store, and the transaction continues in your app. Just store `makeDeferredPurchase` and call it later if you want to hold your purchase for now. Then show the paywall to your user. To continue purchase, call `makeDeferredPurchase`.

```swift
extension AppDelegate: AdaptyDelegate {

    func paymentQueue(shouldAddStorePaymentFor product: AdaptyDeferredProduct, defermentCompletion makeDeferredPurchase: @escaping (ResultCompletion<AdaptyProfile>?) -> Void) {
        // you can store makeDeferredPurchase callback and call it later
        
        // or you can call it right away
        makeDeferredPurchase { result in
            // check the purchase
        }
    }
    
}
```

### Redeeming an Offer Code

Since iOS 14.0 your users can redeem Offer Codes. To allow them to do so, you can present the Offer Code redemption sheet by calling the related SDK method.

```swift
Adapty.presentCodeRedemptionSheet()
```

:::danger
Our experience shows that in some applications Offer Code Redemption sheet behaves unstable. We recommend that you redirect the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::