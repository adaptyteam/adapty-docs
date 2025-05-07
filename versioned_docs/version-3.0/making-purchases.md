---
title: "Make purchases in mobile app"
description: "Guide on handling in-app purchases and subscriptions using Adapty."
metadataTitle: "Handling In-App Purchases in Adapty | Adapty Docs"
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
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.makePurchase(activity, product) { result ->
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
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.makePurchase(activity, product, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPurchaseResult purchaseResult = ((AdaptyResult.Success<AdaptyPurchaseResult>) result).getValue();

        if (purchaseResult instanceof AdaptyPurchaseResult.Success) {
            AdaptyProfile profile = ((AdaptyPurchaseResult.Success) purchaseResult).getProfile();
            AdaptyProfile.AccessLevel premium = profile.getAccessLevels().get("YOUR_ACCESS_LEVEL");

            if (premium != null && premium.isActive()) {
                // Grant access to the paid features
            }
        } else if (purchaseResult instanceof AdaptyPurchaseResult.UserCanceled) {
            // Handle the case where the user canceled the purchase
        } else if (purchaseResult instanceof AdaptyPurchaseResult.Pending) {
            // Handle deferred purchases (e.g., the user will pay offline with cash)
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle the error
    }
});
```
</TabItem>
<TabItem value="flutter" label="Flutter" default>
This snippet is valid for v.2.0 or later.

```javascript showLineNumbers
try {
  final purchaseResult = await Adapty().makePurchase(product: product);
    switch (purchaseResult) {
      case AdaptyPurchaseResultSuccess(profile: final profile):
        if (profile.accessLevels['premium']?.isActive ?? false) {
          // Grant access to the paid features
        }
        break;
      case AdaptyPurchaseResultPending():
        break;
      case AdaptyPurchaseResultUserCancelled():
        break;
      default:
        break;
    }
} on AdaptyError catch (adaptyError) {
    // Handle the error
} catch (e) {
    // Handle the error
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>

```csharp showLineNumbers
using AdaptySDK;

void MakePurchase(AdaptyPaywallProduct product) {
  Adapty.MakePurchase(product, (result, error) => {
    switch (result.Type) {
      case AdaptyPurchaseResultType.Pending:
        // handle pending purchase
        break;
      case AdaptyPurchaseResultType.UserCancelled:
        // handle purchase cancellation
        break;
      case AdaptyPurchaseResultType.Success:
        var profile = result.Profile;
        // handle successfull purchase
        break;
      default:
        break;
    }
  });
}
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
try {
    const purchaseResult = await adapty.makePurchase(product);
    switch (purchaseResult.type) {
      case 'success':
        const isSubscribed = purchaseResult.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;

        if (isSubscribed) {
          // Grant access to the paid features
        }
        break;
      case 'user_cancelled':
        // Handle the case where the user canceled the purchase
        break;
      case 'pending':
        // Handle deferred purchases (e.g., the user will pay offline with cash)
        break;
    }
} catch (error) {
    // Handle the error
}
```

</TabItem>
</Tabs>

Request parameters:

| Parameter   | Presence | Description                                                                                         |
| :---------- | :------- | :-------------------------------------------------------------------------------------------------- |
| **Product** | required | An [`AdaptyPaywallProduct`](sdk-models#adaptypaywallproduct) object retrieved from the paywall. |

Response parameters:

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                            |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Profile** | <p>If the request has been successful, the response contains this object. An [AdaptyProfile](sdk-models#adaptyprofile) object provides comprehensive information about a user's access levels, subscriptions, and non-subscription purchases within the app.</p><p>Check the access level status to ascertain whether the user has the required access to the app.</p> |

:::warning
**Note:** if you're still on Apple's StoreKit version lower than v2.0 and Adapty SDK version lowers than v.2.9.0, you need to provide [Apple App Store shared secret](app-store-connection-configuration#step-4-enter-app-store-shared-secret) instead. This method is currently deprecated by Apple.
:::

## Change subscription when making a purchase

When a user opts for a new subscription instead of renewing the current one, the way it works depends on the app store:

- For the App Store, the subscription is automatically updated within the subscription group. If a user purchases a subscription from one group while already having a subscription from another, both subscriptions will be active at the same time.
- For Google Play, the subscription isn't automatically updated. You'll need to manage the switch in your mobile app code as described below.

To replace the subscription with another one in Android, call `.makePurchase()` method with the additional parameter:

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
Adapty.makePurchase(activity, product, subscriptionUpdateParams) { result ->
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
                    // the purchase has not been finished yet, e.g. user will pay offline by cash
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
Additional request parameter:

| Parameter                    | Presence | Description                                                  |
| :--------------------------- | :------- | :----------------------------------------------------------- |
| **subscriptionUpdateParams** | required | an [`AdaptySubscriptionUpdateParameters`](sdk-models#adaptysubscriptionupdateparameters) object. |

</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.makePurchase(activity, product, subscriptionUpdateParams, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPurchaseResult purchaseResult = ((AdaptyResult.Success<AdaptyPurchaseResult>) result).getValue();

        if (purchaseResult instanceof AdaptyPurchaseResult.Success) {
            AdaptyProfile profile = ((AdaptyPurchaseResult.Success) purchaseResult).getProfile();

            // successful cross-grade
        } else if (purchaseResult instanceof AdaptyPurchaseResult.UserCanceled) {
            // user canceled the purchase flow
        } else if (purchaseResult instanceof AdaptyPurchaseResult.Pending) {
            // the purchase has not been finished yet, e.g. user will pay offline by cash
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle the error
    }
});
```
Additional request parameter:

| Parameter                    | Presence | Description                                                  |
| :--------------------------- | :------- | :----------------------------------------------------------- |
| **subscriptionUpdateParams** | required | an [`AdaptySubscriptionUpdateParameters`](sdk-models#adaptysubscriptionupdateparameters) object. |

</TabItem>
<TabItem value="flutter" label="Flutter" default>

```javascript showLineNumbers
try {
  final result = await adapty.makePurchase(
    product: product,
    subscriptionUpdateParams: subscriptionUpdateParams,
  );
  
  // successful cross-grade
} on AdaptyError catch (adaptyError) {
  // Handle the error
} catch (e) {
  // Handle the error
}
```
Additional request parameter:

| Parameter                    | Presence | Description                                                  |
| :--------------------------- | :------- | :----------------------------------------------------------- |
| **subscriptionUpdateParams** | required | an [`AdaptySubscriptionUpdateParameters`](sdk-models#adaptysubscriptionupdateparameters) object. |

</TabItem>
<TabItem value="unity" label="Unity" default>

```csharp showLineNumbers
Adapty.MakePurchase(product, subscriptionUpdateParams, (profile, error) => {
  if(error != null) {
      // Handle the error
      return;
  }
  
  // successful cross-grade
});
```

Additional request parameter:

| Parameter                    | Presence | Description                                                  |
| :--------------------------- | :------- | :----------------------------------------------------------- |
| **subscriptionUpdateParams** | required | an [`AdaptySubscriptionUpdateParameters`](sdk-models#adaptysubscriptionupdateparameters) object. |

</TabItem>
<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
try {
    const purchaseResult = await adapty.makePurchase(product, params);
    switch (purchaseResult.type) {
      case 'success':
        const isSubscribed = purchaseResult.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;

        if (isSubscribed) {
          // Grant access to the paid features
        }
        break;
      case 'user_cancelled':
        // Handle the case where the user canceled the purchase
        break;
      case 'pending':
        // Handle deferred purchases (e.g., the user will pay offline with cash)
        break;
    }
} catch (error) {
    // Handle the error
}
```
Additional request parameter:

| Parameter  | Presence | Description                                                  |
| :--------- | :------- | :----------------------------------------------------------- |
| **params** | required | an object of the [`MakePurchaseParamsInput`](https://react-native.adapty.io/interfaces/makepurchaseparamsinput) type. |

</TabItem>
</Tabs>

You can read more about subscriptions and replacement modes in the Google Developer documentation:

- [About replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-modes)
- [Recommendations from Google for replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-recommendations)
- Replacement mode [`CHARGE_PRORATED_PRICE`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#CHARGE_PRORATED_PRICE()). Note: this method is available only for subscription upgrades. Downgrades are not supported.
- Replacement mode [`DEFERRED`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#DEFERRED()). Note: A real subscription change will occur only when the current subscription billing period ends.

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

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers
Adapty.presentCodeRedemptionSheet()
```
</TabItem>

<TabItem value="flutter" label="Flutter" default>

```javascript showLineNumbers
try {
  await Adapty().presentCodeRedemptionSheet();
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle the error
}
```

</TabItem> 

<TabItem value="unity" label="Unity" default>

```csharp showLineNumbers
Adapty.PresentCodeRedemptionSheet((error) => {
  // handle the error
});
```
</TabItem>

<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
adapty.presentCodeRedemptionSheet();
```
</TabItem>
</Tabs>

:::danger
Based on our observations, the Offer Code Redemption sheet in some apps may not work reliably. We recommend redirecting the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::