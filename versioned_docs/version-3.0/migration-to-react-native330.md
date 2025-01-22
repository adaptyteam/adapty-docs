---
title: "Migration guide to Adapty React Native SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Upgrade to Adapty SDK v3.3.x.
2. Renamings
3. Changes in models
4. Remove `getProductsIntroductoryOfferEligibility` method.
5. Update making purchase.
6. Modify Paywall Builder purchase events.
7. Modify Paywall Builder custom action events.
8. Modify `onProductSelected` callback.
9. Remove third-party integration parameters from `updateProfile` method.
10. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.
11. Update Observer mode implementation.

## Upgrade Adapty React Native SDK to 3.3.x

Up to this version, Adapty SDK was the core and mandatory SDK necessary for the proper functioning of Adapty within your app, and AdaptyUI SDK was an optional SDK that becomes necessary only if you use the Adapty Paywall builder.

Starting with version 3.3.0, AdaptyUI SDK is deprecated, and AdaptyUI is merged into Adapty SDK as a module. Because of these changes, you need to remove AdaptyUISDK and reinstall AdaptySDK.

1. Remove both **AdaptySDK** and **AdaptyUISDK** package dependencies from your project.
2. Delete the **AdaptySDK** and **AdaptyUISDK** folders.
3. Import the AdaptySDK package again as described in the [Adapty SDK installation & configuration for React Native](sdk-installation-reactnative) page.

## Renamings

Rename in Adapty module:

| Old version | New version    |
| ----------- | -------------- |
| `timerInfo` | `customTimers` |
|             |                |

## Changes in models

**New model**

(`AdaptySubscriptionOffer` это новая модель – думаю, тут достаточно будет просто ссылку на интерактивную доку добавить, сразу после релиза) (да и кажется как будто бы ко всем этим пунктам можно ссылки будет прикрепить)

1. `AdaptyPaywallProduct`: optional property `subscriptionDetails` renamed to `subscription






```
-  subscriptionDetails?: AdaptySubscriptionDetails; 
+  subscription?: AdaptySubscriptionDetails;
```


`AdaptySubscriptionDetails` (также поменялись проперти):





```
-  introductoryOffers?: AdaptyDiscountPhase[]; +  offer?: AdaptySubscriptionOffer;    ios?: { -    promotionalOffer?: AdaptyDiscountPhase;     subscriptionGroupIdentifier?: string;   };    android?: { -    offerId?: string;     basePlanId: string; -    introductoryOfferEligibility: OfferEligibility; -    offerTags?: string[];     renewalType?: 'prepaid' | 'autorenewable';   }; }
```


(`promotionalOffer` теперь при доступности будет в поле `offer` (#L2 в сниппете), тип офера будет указан в `AdaptySubscriptionOfferId` – будет ссылка на интерактивную доку) 
(`introductoryOfferEligibility` больше неактуально, т.к. возвращаются только eligible-оферы – но на всякий случай можно у Лехи уточнить по нюансам ios, либо найти аналог в доке по флаттеру и адаптировать)
(`offerId` теперь можно найти в `AdaptySubscriptionOffer.identifier` – тоже дадим ссылку на интерактивную доку)
(`offerTags` тоже переехал в `AdaptySubscriptionOffer.android` – дадим ссылку)

`AdaptyDiscountPhase`:





```
-  ios?: { -    readonly identifier?: string; -  };
```

(`identifier` теперь можно найти в `AdaptySubscriptionOffer.identifier` – тоже дадим ссылку на интерактивную доку)

## Update import for presenting Paywall Builder paywalls

For the complete code example, check out the [Present new Paywall Builder paywalls in React Native](react-native-present-paywalls).

```diff
- import { createPaywallView } from '@adapty/react-native-ui';
+ import { createPaywallView } from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

view.registerEventHandlers(); // handle close press, etc

try {
  await view.present();
} catch (error) {
  // handle the error
}
```

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

## Update developer-defined timer implementation

Rename the 

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
 import { Adjust, AdjustConfig } from "react-native-adjust";
 import { adapty } from "react-native-adapty";

 var adjustConfig = new AdjustConfig(appToken, environment);

 // Before submiting Adjust config...
 adjustConfig.setAttributionCallbackListener(attribution => {
   // Make sure Adapty SDK is activated at this point
   // You may want to lock this thread awaiting of `activate`
   adapty.updateAttribution(attribution, "adjust");
 });

 // ...
 Adjust.create(adjustConfig);

+ Adjust.getAdid((adid) => {
+   if (adid)
+     adapty.setIntegrationIdentifier("adjust_device_id", adid);
+ });
```

### AirBridge

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AirBridge integration](airbridge#sdk-configuration).

```diff
 import Airbridge from 'airbridge-react-native-sdk';
 import { adapty } from 'react-native-adapty';

 try {
   const deviceId = await Airbridge.state.deviceUUID();

-  await adapty.updateProfile({
-    airbridgeDeviceId: deviceId,
-  });
+  await adapty.setIntegrationIdentifier("airbridge_device_id", deviceId);
 } catch (error) {
   // handle `AdaptyError`
 }
```

### Amplitude

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Amplitude integration](amplitude#sdk-configuration).

```diff
  import { adapty } from 'react-native-adapty';

 try {
-   await adapty.updateProfile({
-     amplitudeDeviceId: deviceId,
-     amplitudeUserId: userId,
-   });
+   await adapty.setIntegrationIdentifier("amplitude_device_id", deviceId);
+   await adapty.setIntegrationIdentifier("amplitude_user_id", userId);
 } catch (error) {
   // handle `AdaptyError`
 }
```

### AppMetrica

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppMetrica integration](appmetrica#sdk-configuration).

```diff
 import { adapty } from 'react-native-adapty';
 import AppMetrica, { DEVICE_ID_KEY, StartupParams, StartupParamsReason } from '@appmetrica/react-native-analytics';

 // ...
 const startupParamsCallback = async (
   params?: StartupParams,
   reason?: StartupParamsReason
 ) => {
   const deviceId = params?.deviceId
   if (deviceId) {
     try {
-       await adapty.updateProfile({
-         appmetricaProfileId: 'YOUR_ADAPTY_CUSTOMER_USER_ID',
-         appmetricaDeviceId: deviceId,
-       });
+       await adapty.setIntegrationIdentifier("appmetrica_profile_id", 'YOUR_ADAPTY_CUSTOMER_USER_ID');
+       await adapty.setIntegrationIdentifier("appmetrica_device_id", deviceId);
     } catch (error) {
       // handle `AdaptyError`
     }
   }
 }

 AppMetrica.requestStartupParams(startupParamsCallback, [DEVICE_ID_KEY])
```

### AppsFlyer

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppsFlyer integration](appsflyer#sdk-configuration).

```diff
 import { adapty, AttributionSource } from 'react-native-adapty';
 import appsFlyer from 'react-native-appsflyer';

 appsFlyer.onInstallConversionData(installData => {
     try {
-        const networkUserId = appsFlyer.getAppsFlyerUID();
-        adapty.updateAttribution(installData, AttributionSource.AppsFlyer, networkUserId);
+        const uid = appsFlyer.getAppsFlyerUID();
+        adapty.setIntegrationIdentifier("appsflyer_id", uid);
+        adapty.updateAttribution(installData, "appsflyer");
     } catch (error) {
         // handle the error
     }
 });

 // ...
 appsFlyer.initSdk(/*...*/);
```

### Branch

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Branch integration](branch#sdk-configuration).

```diff
 import { adapty, AttributionSource } from 'react-native-adapty';
 import branch from 'react-native-branch';

 branch.subscribe({
   enComplete: ({
     params,
   }) => {
-    adapty.updateAttribution(params, AttributionSource.Branch);
+    adapty.updateAttribution(params, "branch");
   },
 });
```

### Facebook Ads

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Facebook Ads integration](facebook-ads#sdk-configuration).

```diff
 import { adapty } from 'react-native-adapty';
 import { AppEventsLogger } from 'react-native-fbsdk-next';

 try {
   const anonymousId = await AppEventsLogger.getAnonymousID();

-  await adapty.updateProfile({
-    facebookAnonymousId: anonymousId,
-  });
+  await adapty.setIntegrationIdentifier("facebook_anonymous_id", anonymousId);
 } catch (error) {
   // handle `AdaptyError`
 }
```

### Firebase and Google Analytics

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Firebase and Google Analytics integration](firebase-and-google-analytics).

```diff
 import analytics from '@react-native-firebase/analytics';
 import { adapty } from 'react-native-adapty';

 try {
   const appInstanceId = await analytics().getAppInstanceId();

-   await adapty.updateProfile({
-     firebaseAppInstanceId: appInstanceId,
-   });
+   await adapty.setIntegrationIdentifier("firebase_app_instance_id", appInstanceId);
 } catch (error) {
   // handle `AdaptyError`
 }
```

### Mixpanel

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Mixpanel integration](mixpanel#sdk-configuration).

```diff
 import { adapty } from 'react-native-adapty';
 import { Mixpanel } from 'mixpanel-react-native';

 // ...
 try {
-   await adapty.updateProfile({
-     mixpanelUserId: mixpanelUserId,
-   });
+   await adapty.setIntegrationIdentifier("mixpanel_user_id", mixpanelUserId);
 } catch (error) {
   // handle `AdaptyError`
 }
```

### OneSignal

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for OneSignal integration](onesignal#sdk-configuration).

<Tabs> 

<TabItem value="v5+" label="OneSignal SDK v5+ (current)" default> 

```diff
 import { adapty } from 'react-native-adapty';
 import OneSignal from 'react-native-onesignal';

 OneSignal.User.pushSubscription.addEventListener('change', (subscription) => {
   const subscriptionId = subscription.current.id;

   if (subscriptionId) {
-    adapty.updateProfile({
-      oneSignalSubscriptionId: subscriptionId,
-    });
+    adapty.setIntegrationIdentifier("one_signal_subscription_id", subscriptionId);
   }
 });
```

 </TabItem> 

<TabItem value="pre-v5" label="OneSignal SDK v. up to 4.x (legacy)" default> 

```diff
 import { adapty } from 'react-native-adapty';
 import OneSignal from 'react-native-onesignal';

 OneSignal.addSubscriptionObserver(event => {
   const playerId = event.to.userId;
   
-  adapty.updateProfile({
-    oneSignalPlayerId: playerId,
-  });
+  adapty.setIntegrationIdentifier("one_signal_player_id", playerId);
 });
```

 </TabItem> 

</Tabs>

### Pushwoosh

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Pushwoosh integration](pushwoosh#sdk-configuration).

```diff
 import { adapty } from 'react-native-adapty';
 import Pushwoosh from 'pushwoosh-react-native-plugin';

 // ...
 try {
-  await adapty.updateProfile({
-    pushwooshHWID: hwid,
-  });
+  await adapty.setIntegrationIdentifier("pushwoosh_hwid", hwid);
 } catch (error) {
   // handle `AdaptyError`
 }
```

## Update Observer mode implementation

Update how you link paywalls to transactions. Previously, you used the `setVariationId` method to assign the `variationId`. Now, you can include the `variationId` directly when recording the transaction using the new `reportTransaction` method. Check out the final code example in the [Associate paywalls with purchase transactions in Observer mode](associate-paywalls-to-transactions).

:::warning

Don't forget to record the transaction using the `reportTransaction` method. Skipping this step means Adapty won't recognize the transaction, won't grant access levels, won't include it in analytics, and won't send it to integrations. This step is essential!

:::

Please pay attention that the order of the parameters for the `reportTransaction` method differs from the one for the `setVariationId` method.

```diff
  const variationId = paywall.variationId;

 try {
-    await adapty.setVariationId('transaction_id', variationId);
+    await adapty.reportTransaction(transactionId, variationId);
 } catch (error) {
     // handle the `AdaptyError`
 }

```

