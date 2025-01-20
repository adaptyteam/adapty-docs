---
title: "Migration guide to Adapty React Native SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Upgrade to Adapty SDK v3.3.x.
2. Remove `getProductsIntroductoryOfferEligibility` method.
3. Update making purchase.
4. Modify Paywall Builder purchase events.
5. Modify Paywall Builder custom action events.
6.  Modify `onProductSelected` callback.
7. Remove third-party integration parameters from `updateProfile` method.
8. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.
9. Update Observer mode implementation.

## Upgrade Adapty React Native SDK to 3.3.x

Up to this version, Adapty SDK was the core and mandatory SDK necessary for the proper functioning of Adapty within your app, and AdaptyUI SDK was an optional SDK that becomes necessary only if you use the Adapty Paywall builder.

Starting with version 3.3.0, AdaptyUI SDK is deprecated, and AdaptyUI is merged to Adapty SDK as a module. Because of these changes, you need to remove AdaptyUISDK and reinstall AdaptySDK.

1. Remove both **AdaptySDK** and **AdaptyUISDK** package dependencies from your project.
2. Delete the **AdaptySDK** and **AdaptyUISDK** folders.
3. Import the AdaptySDK package again as described in the [Adapty SDK installation & configuration for React Native](sdk-installation-reactnative) page.

## Remove `getProductsIntroductoryOfferEligibility` method

Before Adapty iOS SDK 3.3.0, the product object always included offers, regardless of whether the user was eligible. You had to manually check eligibility before using the offer.

Now, the product object only includes an offer if the user is eligible. This means you no longer need to check eligibility — if an offer is present, the user is eligible.

If you still want to view offers for users who are not eligible, refer to `sk1Product` and `sk2Product`.

## Update making purchase

Previously canceled and pending purchases were considered errors and returned the `2: 'paymentCancelled'` and `25: 'pendingPurchase'` codes, respectively.

Starting with version 3.3.0, both canceled and pending purchases are considered a successful result and should be processed appropriately:

```typescript title="React Native (TSX)"
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

## Modify Paywall Builder purchase events

Previously canceled purchases were considered an error and used to return the `onPurchaseCancelled` callback. Pending purchases were considered an error as well and used to return error code `25: 'pendingPurchase'`. 

Now both of them are considered a variant of the `onPurchaseCompleted` callback. To properly process this change, do the following:

1. Remove `onPurchaseCancelled` callback.
2. Remove processing of error code `25: 'pendingPurchase'`.
3. Extend the `onPurchaseCompleted` callback with these cases:

```typescript title="React Native (TSX)"
import {createPaywallView} from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
  onCloseButtonPress() {
    return true;
  },
  onPurchaseCompleted(purchaseResult, product) {
    switch (purchaseResult.type) {
      case 'success':
        const isSubscribed = purchaseResult.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;

        if (isSubscribed) {
          // Grant access to the paid features
        }
        break;
// highlight-start
      case 'user_cancelled':
        // Handle the case where the user canceled the purchase
        break;
      case 'pending':
        // Handle deferred purchases (e.g., the user will pay offline with cash)
        break;
// highlight-end
    }
// highlight-start
    return purchaseResult.type !== 'user_cancelled';
// highlight-end
  },
});
```

## Modify Paywall Builder custom action events

The `onAction` и `onCustomEvent` callbacks are replaced with the `onCustomAction(actionId)` one.

## Modify `onProductSelected` callback

In previous version, the `onProductSelected` callback requered `product` object. Now, it requires `productId` as a string.

## Remove third-party integration parameters from `updateProfile` method

Since a new `setIntegrationIdentifier` method provides the profile with third-party integration identifiers, we've updated the `updateProfile` method. Now it cannot accept these identifiers.

## Update 3d-party integration SDK configuration

To ensure integrations work properly with Adapty Flutter SDK 3.3.0 and later, update your SDK configurations for the following integrations as described in the sections below. 

In addition, if you used the `AttributionSource` to get the attribution identifier, change your code to provide the required identifier as a string.

### Adjust

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Adjust integration](adjust#sdk-configuration).

```diff
 .
```

### AirBridge

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AirBridge integration](airbridge#sdk-configuration).

```diff
.
```

### Amplitude

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Amplitude integration](amplitude#sdk-configuration).

```diff
 .
```

### AppMetrica

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppMetrica integration](appmetrica#sdk-configuration).

```diff
.
```

### AppsFlyer

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppsFlyer integration](appsflyer#sdk-configuration).

```diff
.
```

### Branch

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Branch integration](branch#sdk-configuration).

```diff
.
```

### Firebase and Google Analytics

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Firebase and Google Analytics integration](firebase-and-google-analytics).

```diff
.
```

### Mixpanel

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Mixpanel integration](mixpanel#sdk-configuration).

```diff
.
```

### OneSignal

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for OneSignal integration](onesignal#sdk-configuration).

```diff
 .
```

### Pushwoosh

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Pushwoosh integration](pushwoosh#sdk-configuration).

```diff
.
```

## Update Observer mode implementation

Update how you link paywalls to transactions. Previously, you used the `setVariationId` method to assign the `variationId`. Now, you can include the `variationId` directly when recording the transaction using the new `reportTransaction` method. Check out the final code example in the [Associate paywalls with purchase transactions in Observer mode](associate-paywalls-to-transactions).

:::warning

Don't forget to record the transaction using the `reportTransaction` method. Skipping this step means Adapty won't recognize the transaction, won't grant access levels, won't include it in analytics, and won't send it to integrations. This step is essential!

:::

Please pay attention that the order of the parameters for the `reportTransaction` method differs from the one for the `setVariationId` method.

```diff
 .
```

