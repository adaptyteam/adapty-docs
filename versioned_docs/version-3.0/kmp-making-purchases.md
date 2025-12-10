---
title: "Make purchases in mobile app in Kotlin Multiplatform SDK"
description: "Guide on handling in-app purchases and subscriptions using Adapty."
metadataTitle: "Handling In-App Purchases in Adapty | Adapty Docs"
keywords: ['makePurchase', 'pending']
rank: 95
displayed_sidebar: sdkkmp
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

In other cases, you'll need to [verify the user's eligibility for an introductory offer on iOS](fetch-paywalls-and-products-kmp#check-intro-offer-eligibility-on-ios).  Skipping this step may result in your app being rejected during release. Moreover, it could lead to charging the full price to users who are eligible for an introductory offer.
:::

Make sure you've [done the initial configuration](quickstart) without skipping a single step. Without it, we can't validate purchases.

## Make purchase

:::note
In paywalls built with [Paywall Builder](adapty-paywall-builder) purchases are processed automatically with no additional code. If that's your case — you can skip this step.
:::


```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyPurchaseResult

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

Request parameters:

| Parameter   | Presence | Description                                                                                                                                   |
| :---------- | :------- |:----------------------------------------------------------------------------------------------------------------------------------------------|
| **Product** | required | An [`AdaptyPaywallProduct`](https://kmp.adapty.io///adapty/com.adapty.kmp.models/-adapty-paywall-product/) object retrieved from the paywall. |

Response parameters:

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Profile** | <p>If the request has been successful, the response contains this object. An [AdaptyProfile](khttps://kmp.adapty.io///adapty/com.adapty.kmp.models/-adapty-profile/) object provides comprehensive information about a user's access levels, subscriptions, and non-subscription purchases within the app.</p><p>Check the access level status to ascertain whether the user has the required access to the app.</p> |

:::warning
**Note:** if you're still on Apple's StoreKit version lower than v2.0 and Adapty SDK version lowers than v.2.9.0, you need to provide [Apple App Store shared secret](app-store-connection-configuration#step-4-enter-app-store-shared-secret) instead. This method is currently deprecated by Apple.
:::

## Change subscription when making a purchase

When a user opts for a new subscription instead of renewing the current one, the way it works depends on the app store. For Google Play, the subscription isn't automatically updated. You'll need to manage the switch in your mobile app code as described below.

To replace the subscription with another one in Android, call `.makePurchase()` method with the additional parameter:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyAndroidSubscriptionUpdateParameters
import com.adapty.kmp.models.AdaptyAndroidSubscriptionUpdateReplacementMode
import com.adapty.kmp.models.AdaptyPurchaseParameters
import com.adapty.kmp.models.AdaptyPurchaseResult

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
    when (purchaseResult) {
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
}.onError { error ->
    // Handle the error
}

```
Additional request parameter:

| Parameter      | Presence | Description                                                                                                                                                      |
|:---------------|:---------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **parameters** | optional | an [`AdaptyAndroidSubscriptionUpdateParameters`](https://kmp.adapty.io/////adapty/com.adapty.kmp.models/-adapty-android-subscription-update-parameters/) object passed through [`AdaptyPurchaseParameters`](https://kmp.adapty.io/adapty/com.adapty.kmp.models/-adapty-purchase-parameters/). |

You can read more about subscriptions and replacement modes in the Google Developer documentation:

- [About replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-modes)
- [Recommendations from Google for replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-recommendations)
- Replacement mode [`CHARGE_PRORATED_PRICE`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#CHARGE_PRORATED_PRICE()). Note: this method is available only for subscription upgrades. Downgrades are not supported.
- Replacement mode [`DEFERRED`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#DEFERRED()). Note: A real subscription change will occur only when the current subscription billing period ends.


## Redeem Offer Code in iOS

Since iOS 14.0, your users can redeem Offer Codes. Code redemption means using a special code, like a promotional or gift card code, to get free access to content or features in an app or on the App Store. To enable users to redeem offer codes, you can display the offer code redemption sheet by using the appropriate SDK method:


```kotlin showLineNumbers
Adapty.presentCodeRedemptionSheet()
    .onSuccess {
        // code redemption sheet presented successfully
    }
    .onError { error ->
        // handle the error
    }
```

:::danger
Based on our observations, the Offer Code Redemption sheet in some apps may not work reliably. We recommend redirecting the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::

## Manage prepaid plans (Android)

If your app users can purchase [prepaid plans](https://developer.android.com/google/play/billing/subscriptions#prepaid-plans) (e.g., buy a non-renewable subscription for several months), you can enable [pending transactions](https://developer.android.com/google/play/billing/subscriptions#pending) for prepaid plans.

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig

Adapty.activate(
    AdaptyConfig.Builder("PUBLIC_SDK_KEY")
        .withGoogleEnablePendingPrepaidPlans(true)
        .build()
).onSuccess {
    // successful activation
}.onError { error ->
    // handle the error
}
```