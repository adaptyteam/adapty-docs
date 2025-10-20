---
title: "Make purchases in mobile app in iOS SDK"
description: "Guide on handling in-app purchases and subscriptions using Adapty."
metadataTitle: "Handling In-App Purchases in Adapty | Adapty Docs"
keywords: ['makePurchase', 'pending', 'purchase', 'presentCodeRedemptionSheet']
rank: 100
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Displaying paywalls within your mobile app is an essential step in offering users access to premium content or services. However, simply presenting these paywalls is enough to support purchases only if you use [Paywall Builder](adapty-paywall-builder) to customize your paywalls.

If you don't use the Paywall Builder, you must use a separate method called `.makePurchase()` to complete a purchase and unlock the desired content. This method serves as the gateway for users to engage with the paywalls and proceed with their desired transactions.

If your paywall has an active promotional offer for the product a user is trying to buy, Adapty will automatically apply it at the time of purchase.

:::warning
Keep in mind that the introductory offer will be applied automatically only if you use the paywalls set up using the Paywall Builder.

In other cases, you'll need to [verify the user's eligibility for an introductory offer on iOS](fetch-paywalls-and-products#check-intro-offer-eligibility-on-ios).  Skipping this step may result in your app being rejected during release. Moreover, it could lead to charging the full price to users who are eligible for an introductory offer.
:::

Make sure you've [done the initial configuration](quickstart) without skipping a single step. Without it, we can't validate purchases.

## Make purchase

:::note
In paywalls built with [Paywall Builder](adapty-paywall-builder) purchases are processed automatically with no additional code. If that's your case — you can skip this step.
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
do {
    let purchaseResult = try await Adapty.makePurchase(product: product)

    switch purchaseResult {
        case .userCancelled:
            // Handle the case where the user canceled the purchase
        case .pending:
            // Handle deferred purchases (e.g., the user will pay offline with cash)
        case let .success(profile, transaction):
            if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
            // Grant access to the paid features
            }
    }
} catch {
    // Handle the error
}
```

</TabItem>
<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.makePurchase(product: product) { result in
    switch result {
    case let .success(purchaseResult):
        switch purchaseResult {
            case .userCancelled:
                // Handle the case where the user canceled the purchase
            case .pending:
                // Handle deferred purchases (e.g., the user will pay offline with cash)
            case let .success(profile, transaction):
                if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
                    // Grant access to the paid features
                }
        }
    case let .failure(error):
        // Handle the error
    }
}
```

</TabItem>

</Tabs>

Request parameters:

| Parameter   | Presence | Description                                                                                         |
| :---------- | :------- | :-------------------------------------------------------------------------------------------------- |
| **Product** | required | An [`AdaptyPaywallProduct`](https://swift.adapty.io/documentation/adapty/adaptypaywallproduct) object retrieved from the paywall. |

Response parameters:

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                            |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Profile** | <p>If the request has been successful, the response contains this object. An [AdaptyProfile](https://swift.adapty.io/documentation/adapty/adaptyprofile) object provides comprehensive information about a user's access levels, subscriptions, and non-subscription purchases within the app.</p><p>Check the access level status to ascertain whether the user has the required access to the app.</p> |

:::warning
**Note:** if you're still on Apple's StoreKit version lower than v2.0 and Adapty SDK version lower than v.2.9.0, you need to provide [Apple App Store shared secret](app-store-connection-configuration#step-4-enter-app-store-shared-secret) instead. This method is currently deprecated by Apple.
:::

## In-app purchases from the App Store

When a user initiates a purchase in the App Store and the transaction carries over to your app, you have two options:

- **Process the transaction immediately:** Return `true` in `shouldAddStorePayment`. This will trigger the Apple purchase system screen right away.
- **Store the product object for later processing:** Return `false` in `shouldAddStorePayment`, then call `makePurchase` with the stored product later. This may be useful if you need to show something custom to your user before triggering a purchase.

Here’s the complete snippet:

```swift showLineNumbers title="Swift"
final class YourAdaptyDelegateImplementation: AdaptyDelegate {
    nonisolated func shouldAddStorePayment(for product: AdaptyDeferredProduct) -> Bool {
        // 1a.
        // Return `true` to continue the transaction in your app. The Apple purchase system screen will show automatically.

        // 1b.
        // Store the product object and return `false` to defer or cancel the transaction.
        false
    }
    
    // 2. Continue the deferred purchase later on by passing the product to `makePurchase` when the timing is appropriate
    func continueDeferredPurchase() async {
        let storedProduct: AdaptyDeferredProduct = // get the product object from 1b.
        do {
            try await Adapty.makePurchase(product: storedProduct)
        } catch {
            // handle the error
        }
    }
}
```

## Redeem Offer Code in iOS

Since iOS 14.0, your users can redeem Offer Codes. Code redemption means using a special code, like a promotional or gift card code, to get free access to content or features in an app or on the App Store. To enable users to redeem offer codes, you can display the offer code redemption sheet by using the appropriate SDK method:

```swift showLineNumbers
Adapty.presentCodeRedemptionSheet()
```

:::danger
Based on our observations, the Offer Code Redemption sheet in some apps may not work reliably. We recommend redirecting the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::

## Finish transaction manually

:::info
This feature is available starting from SDK version 3.12.0.
:::

By default, Adapty automatically finishes transactions after successful validation. However, if you need advanced transaction validation (such as server-side receipt validation, fraud detection, or custom business logic), you can configure the SDK to use manual transaction finishing.

### Configure manual transaction finishing

When activating Adapty, set the transaction finishing behavior to manual:

```swift showLineNumbers title="Swift"
let configurationBuilder = AdaptyConfiguration
    .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY")
    .with(transactionsFinishBehavior: .manual) // .auto is the default
```

### Handle unfinished transactions

When using manual transaction finishing, you need to implement the `onUnfinishedTransaction` delegate method to handle unfinished transactions:

```swift showLineNumbers title="Swift"
extension YourApp: AdaptyDelegate {
    func onUnfinishedTransaction(_ transaction: AdaptyUnfinishedTransaction) async {
        // Perform your custom validation logic here
        // For example: server-side receipt validation, fraud detection, etc.
        
        // When ready, finish the transaction
        await transaction.finish()
    }
}
```