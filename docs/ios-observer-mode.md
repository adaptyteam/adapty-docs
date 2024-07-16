---
title: "iOS - Observer mode"
description: ""
metadataTitle: ""
---

If you have a functioning subscription system and want to give Adapty SDK a quick try, you can use Observer mode. With just one line of code you can:

- get insights by using our top-class [analytics](analytics-charts);
- send [subscription events](events) to your server and 3rd party services;
- view and analyze customers in Adapty [CRM](profiles-crm).

### Important

:::warning
When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.
:::

### Activating Observer Mode

Adapty SDK will automatically collect all transactions and will be sending subscription events. To turn on Observer mode, just set `observerMode` to `true` when activating Adapty.

```swift title="Swift"
Adapty.activate("PUBLIC_SDK_KEY", observerMode: true, customerUserId: "YOUR_USER_ID")

// And at any purchase or restore in your application

Adapty.restorePurchases { result in
    switch result {
        case .success:
            // successful restore
        case let .failure(error):
            // handle the error
    }
}
```

### A/B tests analytics

In Observer mode, Adapty SDK doesn't know, where the purchase was made from. If you display products using our [Paywalls](paywalls) or [A/B Tests](ab-test), you can manually assign variation to the purchase. After doing this, you'll be able to see metrics in Adapty Dashboard.

```swift title="Swift"
let transactionId = transaction.transactionIdentifier
let variationId = paywall.variationId

Adapty.setVariationId(variationId, forTransactionId: transactionId) { (error) in
    if error == nil {
        // successful binding
    }
}
```

Request parameters:

- `variationId` (required): a string identifier of variation. You can get it using `variationId` property of [`Paywall`](sdk-models#paywall)
- `transactionId` (required): a string identifier of your purchased transaction [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction) for iOS

We recommend delaying the call for setting the variation ID until after the Recipe validation and implementing a retry logic with a delay of 5 seconds and a limit of 3 attempts. This approach can help ensure that the variation ID is set correctly and reduce the likelihood of errors or unexpected behavior.