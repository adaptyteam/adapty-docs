---
title: "Make purchases in mobile app in Capacitor SDK"
description: "Guide on handling in-app purchases and subscriptions using Adapty."
metadataTitle: "Handling In-App Purchases in Adapty | Adapty Docs"
keywords: ['makePurchase']
rank: 100
displayed_sidebar: sdkcapacitor
---


import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

Displaying paywalls within your mobile app is an essential step in offering users access to premium content or services. However, simply presenting these paywalls is enough to support purchases only if you use [Paywall Builder](adapty-paywall-builder) to customize your paywalls.

If you don't use the Paywall Builder, you must use a separate method called `.makePurchase()` to complete a purchase and unlock the desired content. This method serves as the gateway for users to engage with the paywalls and proceed with their desired transactions.

If your paywall has an active promotional offer for the product a user is trying to buy, Adapty will automatically apply it at the time of purchase.

Make sure you've [done the initial configuration](quickstart) without skipping a single step. Without it, we can't validate purchases.

## Make purchase

:::note
In paywalls built with [Paywall Builder](adapty-paywall-builder) purchases are processed automatically with no additional code. If that's your case — you can skip this step.
:::

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  const result = await adapty.makePurchase({ product });
  
  if (result.type === 'success') {
    const isSubscribed = result.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;
    
    if (isSubscribed) {
      // Grant access to the paid features
      console.log('User is now subscribed!');
    }
  } else if (result.type === 'user_cancelled') {
    console.log('Purchase cancelled by user');
  } else if (result.type === 'pending') {
    console.log('Purchase is pending');
  }
} catch (error) {
  console.error('Purchase failed:', error);
}
```


Request parameters:

| Parameter   | Presence | Description                                                                                         |
| :---------- | :------- | :-------------------------------------------------------------------------------------------------- |
| **product** | required | An [`AdaptyPaywallProduct`](capacitor-sdk-models#adaptypaywallproduct) object retrieved from the paywall. |

Response parameters:

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                            |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **result** | An [`AdaptyPurchaseResult`](capacitor-sdk-models#adaptypurchaseresult) object with a `type` field indicating the purchase outcome (`'success'`, `'user_cancelled'`, or `'pending'`) and a `profile` field containing the updated [`AdaptyProfile`](capacitor-sdk-models#adaptyprofile) on successful purchases. |

## Change subscription when making a purchase

When a user opts for a new subscription instead of renewing the current one, the way it works depends on the app store:

- For the App Store, the subscription is automatically updated within the subscription group. If a user purchases a subscription from one group while already having a subscription from another, both subscriptions will be active at the same time.
- For Google Play, the subscription isn't automatically updated. You'll need to manage the switch in your mobile app code as described below.

To replace the subscription with another one in Android, call `.makePurchase()` method with the additional parameter:

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  const result = await adapty.makePurchase({ 
    product,
    params: {
      android: {
        subscriptionUpdateParams: {
          oldSubVendorProductId: 'old_product_id',
          prorationMode: 'charge_prorated_price'
        },
        isOfferPersonalized: true,
        obfuscatedAccountId: 'account_123',
        obfuscatedProfileId: 'profile_456'
      }
    }
  });
  
  if (result.type === 'success') {
    const isSubscribed = result.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;
    
    if (isSubscribed) {
      // Grant access to the paid features
      console.log('Subscription updated successfully!');
    }
  } else if (result.type === 'user_cancelled') {
    console.log('Purchase cancelled by user');
  } else if (result.type === 'pending') {
    console.log('Purchase is pending');
  }
} catch (error) {
  console.error('Purchase failed:', error);
}
```

Additional request parameter:

| Parameter  | Presence | Description                                                  |
| :--------- | :------- | :----------------------------------------------------------- |
| **params** | optional | An object of the [`MakePurchaseParamsInput`](capacitor-sdk-models#makepurchaseparamsinput) type containing platform-specific purchase parameters. |

The `MakePurchaseParamsInput` structure includes:

```typescript
{
  android: {
    subscriptionUpdateParams: {
      oldSubVendorProductId: 'old_product_id',
      prorationMode: 'charge_prorated_price'
    },
    isOfferPersonalized: true, 
    obfuscatedAccountId: 'account_123',
    obfuscatedProfileId: 'profile_456'
  }
}
```


You can read more about subscriptions and replacement modes in the Google Developer documentation:

- [About replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-modes)
- [Recommendations from Google for replacement modes](https://developer.android.com/google/play/billing/subscriptions#replacement-recommendations)
- Replacement mode [`CHARGE_PRORATED_PRICE`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#CHARGE_PRORATED_PRICE()). Note: this method is available only for subscription upgrades. Downgrades are not supported.
- Replacement mode [`DEFERRED`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode#DEFERRED()). Note: A real subscription change will occur only when the current subscription billing period ends.

## Redeem Offer Code in iOS

Since iOS 14.0, your users can redeem Offer Codes. Code redemption means using a special code, like a promotional or gift card code, to get free access to content or features in an app or on the App Store. To enable users to redeem offer codes, you can display the offer code redemption sheet by using the appropriate SDK method:

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.presentCodeRedemptionSheet();
} catch (error) {
  console.error('Failed to present code redemption sheet:', error);
}
```

:::danger
Based on our observations, the Offer Code Redemption sheet in some apps may not work reliably. We recommend redirecting the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::