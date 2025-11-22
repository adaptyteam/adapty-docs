---
title: "Make purchases in mobile app in Unity SDK"
description: "Guide on handling in-app purchases and subscriptions using Adapty."
metadataTitle: "Handling In-App Purchases in Adapty | Adapty Docs"
keywords: ['makePurchase', 'pending']
rank: 60
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

In other cases, you'll need to [verify the user's eligibility for an introductory offer on iOS](fetch-paywalls-and-products-unity#check-intro-offer-eligibility-on-ios).  Skipping this step may result in your app being rejected during release. Moreover, it could lead to charging the full price to users who are eligible for an introductory offer.
:::

Make sure you've [done the initial configuration](quickstart) without skipping a single step. Without it, we can't validate purchases.

## Make purchase

:::note
In paywalls built with [Paywall Builder](adapty-paywall-builder) purchases are processed automatically with no additional code. If that's your case — you can skip this step.
:::


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

Request parameters:

| Parameter   | Presence | Description                                                                                           |
| :---------- | :------- |:------------------------------------------------------------------------------------------------------|
| **Product** | required | An [`AdaptyPaywallProduct`](unity-sdk-models#adaptypaywallproduct) object retrieved from the paywall. |

Response parameters:

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                                  |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Profile** | <p>If the request has been successful, the response contains this object. An [AdaptyProfile](unity-sdk-models#adaptyprofile) object provides comprehensive information about a user's access levels, subscriptions, and non-subscription purchases within the app.</p><p>Check the access level status to ascertain whether the user has the required access to the app.</p> |

:::warning
**Note:** if you're still on Apple's StoreKit version lower than v2.0 and Adapty SDK version lowers than v.2.9.0, you need to provide [Apple App Store shared secret](app-store-connection-configuration#step-4-enter-app-store-shared-secret) instead. This method is currently deprecated by Apple.
:::

## Change subscription when making a purchase

When a user opts for a new subscription instead of renewing the current one, the way it works depends on the app store:

- For the App Store, the subscription is automatically updated within the subscription group. If a user purchases a subscription from one group while already having a subscription from another, both subscriptions will be active at the same time.
- For Google Play, the subscription isn't automatically updated. You'll need to manage the switch in your mobile app code as described below.

To replace the subscription with another one in Android, call `.makePurchase()` method with the additional parameter:

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

| Parameter                    | Presence | Description                                                                                            |
| :--------------------------- | :------- |:-------------------------------------------------------------------------------------------------------|
| **subscriptionUpdateParams** | required | an [`AdaptySubscriptionUpdateParameters`](unity-sdk-models#adaptysubscriptionupdateparameters) object. |


You can read more about subscriptions and replacement modes in the Google Developer documentation:

- [About replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-modes)
- [Recommendations from Google for replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-recommendations)
- Replacement mode [`CHARGE_PRORATED_PRICE`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#CHARGE_PRORATED_PRICE()). Note: this method is available only for subscription upgrades. Downgrades are not supported.
- Replacement mode [`DEFERRED`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#DEFERRED()). Note: A real subscription change will occur only when the current subscription billing period ends.

### Set obfuscated account IDs (Android)

Google Play requires obfuscated account IDs for certain use cases to enhance user privacy and security. These IDs help Google Play identify purchases while keeping user information anonymous, which is particularly important for fraud prevention and analytics.

You may need to set these IDs if your app handles sensitive user data or if you're required to comply with specific privacy regulations. The obfuscated IDs allow Google Play to track purchases without exposing actual user identifiers.

```csharp showLineNumbers title="Unity"
var purchaseParameters = new AdaptyPurchaseParametersBuilder()
    .SetObfuscatedAccountId("YOUR_OBFUSCATED_ACCOUNT_ID")
    .SetObfuscatedProfileId("YOUR_OBFUSCATED_PROFILE_ID")
    .Build();

Adapty.MakePurchase(product, purchaseParameters, (result, error) => {
    if (error != null) {
        // Handle the error
        return;
    }
    
    switch (result.Type) {
        case AdaptyPurchaseResultType.Success:
            // Handle successful purchase
            break;
        // Handle other cases
    }
});
```

## Redeem Offer Code in iOS

Since iOS 14.0, your users can redeem Offer Codes. Code redemption means using a special code, like a promotional or gift card code, to get free access to content or features in an app or on the App Store. To enable users to redeem offer codes, you can display the offer code redemption sheet by using the SDK method:

```csharp showLineNumbers
Adapty.PresentCodeRedemptionSheet((error) => {
  // handle the error
});
```

:::danger
Based on our observations, the Offer Code Redemption sheet in some apps may not work reliably. We recommend redirecting the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::