---
title: "Make purchases in mobile app in React Native SDK"
description: "Guide on handling in-app purchases and subscriptions using Adapty."
metadataTitle: "Handling In-App Purchases in Adapty | Adapty Docs"
keywords: ['makePurchase']
rank: 100
displayed_sidebar: sdkreactnative
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

:::info
**Version 3.8.2+**: The `MakePurchaseParamsInput` structure has been updated. `oldSubVendorProductId` and `prorationMode` are now nested under `subscriptionUpdateParams`, and `isOfferPersonalized` is moved to the upper level.

Example:
```javascript
makePurchase(product, {
    android: {
        subscriptionUpdateParams: {
            oldSubVendorProductId: 'old_product_id',
            prorationMode: 'charge_prorated_price'
        },
        isOfferPersonalized: true, 
        obfuscatedAccountId: 'account_123',
        obfuscatedProfileId: 'profile_456'
    }
});
```
:::


You can read more about subscriptions and replacement modes in the Google Developer documentation:

- [About replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-modes)
- [Recommendations from Google for replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-recommendations)
- Replacement mode [`CHARGE_PRORATED_PRICE`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#CHARGE_PRORATED_PRICE()). Note: this method is available only for subscription upgrades. Downgrades are not supported.
- Replacement mode [`DEFERRED`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#DEFERRED()). Note: A real subscription change will occur only when the current subscription billing period ends.

## Redeem Offer Code in iOS

Since iOS 14.0, your users can redeem Offer Codes. Code redemption means using a special code, like a promotional or gift card code, to get free access to content or features in an app or on the App Store. To enable users to redeem offer codes, you can display the offer code redemption sheet by using the appropriate SDK method:


```typescript showLineNumbers
adapty.presentCodeRedemptionSheet();
```

:::danger
Based on our observations, the Offer Code Redemption sheet in some apps may not work reliably. We recommend redirecting the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::