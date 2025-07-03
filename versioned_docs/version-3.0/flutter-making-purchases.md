---
title: "Make purchases in mobile app"
description: "Guide on handling in-app purchases and subscriptions using Adapty."
metadataTitle: "Handling In-App Purchases in Adapty | Adapty Docs"
keywords: ['makePurchase']
rank: 100
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Displaying paywalls within your Flutter app is an essential step in offering users access to premium content or services. However, simply presenting these paywalls is enough to support purchases only if you use [Paywall Builder](adapty-paywall-builder) to customize your paywalls.

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

```dart showLineNumbers
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
    }
} catch (error) {
    // Handle the error
}
```
</TabItem>
</Tabs> 