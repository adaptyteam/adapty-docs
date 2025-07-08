---
title: "Migrate Adapty React Native SDK to v. 3.3"
description: "Migrate to Adapty React Native SDK v3.3 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty React Native SDK v3.3 | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.1 is a major release that brought some improvements that may require some migration steps from you.

1. Upgrade to Adapty SDK v3.3.x.
2. Update models.
3. Remove the `getProductsIntroductoryOfferEligibility` method.
4. Update making purchase.
5. Update Paywall Builder paywall presentation.
6. Revise the developer-defined timer implementation.
7. Update handling of Paywall Builder purchase events.
8. Update handling of Paywall Builder custom action events.
9. Modify the `onProductSelected` callback.
10. Remove third-party integration parameters from the `updateProfile` method.
11. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, and Pushwoosh.
12. Update Observer mode implementation.

## Upgrade Adapty React Native SDK to 3.3.x

Before version 3.3.1, `react-native-adapty` SDK served as the core and mandatory SDK for Adapty to function properly in your app. The `@adapty/react-native-ui` SDK was optional and only needed if you were using the Adapty Paywall Builder.

As of version 3.3.1, the `@adapty/react-native-ui` SDK is deprecated, and its functionality has been merged into the `react-native-adapty` SDK. To upgrade to version 3.3.1, follow these steps:

1. Update the `react-native-adapty` package to version 3.3.1.
2. Remove the `@adapty/react-native-ui` package from your project dependencies.
3. Sync your project dependencies to apply the changes.

## Changes in models

### New models

1. [AdaptySubscriptionOffer](https://react-native.adapty.io/interfaces/adaptysubscriptionoffer):

    ```typescript showLineNumbers
    export interface AdaptySubscriptionOffer {
      readonly identifier: AdaptySubscriptionOfferId;

      phases: AdaptyDiscountPhase[];

      android?: {
        offerTags?: string[];
      };
    }
    ```

2. [AdaptySubscriptionOfferId](https://react-native.adapty.io/types/adaptysubscriptionofferid):

    ```typescript showLineNumbers
    export type AdaptySubscriptionOfferId =
      | { id?: string; type: 'introductory'; }
      | { id: string; type: 'promotional' | 'win_back'; };
    ```

### Changed models

1. [AdaptyPaywallProduct](https://react-native.adapty.io/interfaces/adaptypaywallproduct):
   
    - Renamed the `subscriptionDetails` property to `subscription`.
      
      <p> </p>
      
     ```diff showLineNumbers
     -  subscriptionDetails?: AdaptySubscriptionDetails; 
     +  subscription?: AdaptySubscriptionDetails;
     ```
    
2. [AdaptySubscriptionDetails](https://react-native.adapty.io/interfaces/adaptysubscriptiondetails):

    - `promotionalOffer` is removed. Now the promotional offer is delivered within the `offer` property only if it's available. In this case `offer?.identifier?.type` will be `'promotional'`. 

    - `introductoryOfferEligibility` is removed (offers are returned only if the user is eligible).

    - `offerId` is removed. Offer ID is now stored in `AdaptySubscriptionOffer.identifier`.

    - `offerTags` is moved to `AdaptySubscriptionOffer.android`.
      
      <p> </p>



    ```diff showLineNumbers
    -  introductoryOffers?: AdaptyDiscountPhase[];
    +  offer?: AdaptySubscriptionOffer;
    
       ios?: {
    -    promotionalOffer?: AdaptyDiscountPhase;
         subscriptionGroupIdentifier?: string;
       };
    
       android?: {
    -    offerId?: string;
         basePlanId: string;
    -    introductoryOfferEligibility: OfferEligibility;
    -    offerTags?: string[];
         renewalType?: 'prepaid' | 'autorenewable';
       };
     }
    ```
3. [AdaptyDiscountPhase](https://react-native.adapty.io/interfaces/adaptydiscountphase):
   
    - The `identifier` field is removed from the `AdaptyDiscountPhase` model. The offer identifier is now stored in `AdaptySubscriptionOffer.identifier`.
      
      <p> </p>
      
     ```diff showLineNumbers
     -  ios?: {
     -    readonly identifier?: string;
     -  };
     ```

### Remove models

1. `AttributionSource`:
   - The string is now used in places where `AttributionSource` was previously used.
2. `OfferEligibility`:
   - This model has been removed as it is no longer needed. Now, an offer is returned only if the user is eligible.

## Remove `getProductsIntroductoryOfferEligibility` method

Before Adapty SDK 3.3.1, product objects always included offers, even if the user wasn’t eligible. This required you to manually check eligibility before using the offer.

Starting with version 3.3.1, the product object includes offers only if the user is eligible. This simplifies the process, as you can assume the user is eligible if an offer is present.

## Update making purchase

In earlier versions, canceled and pending purchases were treated as errors and returned the codes `2: 'paymentCancelled'` and `25: 'pendingPurchase'`, respectively.

Starting with version 3.3.1, canceled and pending purchases are now considered successful results and should be handled accordingly:

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

## Update Paywall Builder paywall presentation

For updated examples, see the [Present new Paywall Builder paywalls in React Native](react-native-present-paywalls) documentation.

```diff showLineNumbers
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

## Update developer-defined timer implementation

Rename the `timerInfo` parameter to `customTimers`:

```diff showLineNumbers
- let timerInfo = { 'CUSTOM_TIMER_NY': new Date(2025, 0, 1) }
+ let customTimers = { 'CUSTOM_TIMER_NY': new Date(2025, 0, 1) }
 //and then you can pass it to createPaywallView as follows:
- view = await createPaywallView(paywall, { timerInfo })
+ view = await createPaywallView(paywall, { customTimers })
```

## Modify Paywall Builder purchase events

Previously:

- Canceled purchases triggered the `onPurchaseCancelled` callback.
- Pending purchases returned error code `25: 'pendingPurchase'`.

Now:

- Both are handled by the `onPurchaseCompleted` callback.

#### Steps to migrate:

1. Remove the `onPurchaseCancelled` callback.
2. Remove error code handling for `25: 'pendingPurchase'`.
3. Update the `onPurchaseCompleted` callback:

```typescript showLineNumbers
import {createPaywallView} from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

const unsubscribe = view.registerEventHandlers({
  // ... other optional callbacks
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

Removed callbacks:

-  `onAction`
-  `onCustomEvent`

Added callback:

- New  `onCustomAction(actionId)` callback. Use it for custom actions.

## Modify `onProductSelected` callback

Previously, `onProductSelected` required the `product` object. Now requires `productId` as a string.

## Remove third-party integration parameters from `updateProfile` method

Third-party integration identifiers are now set using the `setIntegrationIdentifier` method. The `updateProfile` method no longer accepts them.

## Update third-party integration SDK configuration

To ensure integrations work properly with Adapty React Native SDK 3.3.1 and later, update your SDK configurations for the following integrations as described in the sections below. 

In addition, if you used the `AttributionSource` to get the attribution identifier, change your code to provide the required identifier as a string.

### Adjust

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Adjust integration](adjust#sdk-configuration).

```diff showLineNumbers
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

```diff showLineNumbers
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

```diff showLineNumbers
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

```diff showLineNumbers
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

```diff showLineNumbers
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

```diff showLineNumbers
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

```diff showLineNumbers
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

```diff showLineNumbers
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

```diff showLineNumbers
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

<Tabs groupId="current-os" queryString> 

<TabItem value="v5+" label="OneSignal SDK v5+ (current)" default> 

```diff showLineNumbers
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

```diff showLineNumbers
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

```diff showLineNumbers
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

Update how you link paywalls to transactions. Previously, you used the `setVariationId` method to assign the `variationId`. Now, you can include the `variationId` directly when recording the transaction using the new `reportTransaction` method. Check out the final code example in the [Associate paywalls with purchase transactions in Observer mode](report-transactions-observer-mode).

:::warning

Don't forget to record the transaction using the `reportTransaction` method. Skipping this step means Adapty won't recognize the transaction, won't grant access levels, won't include it in analytics, and won't send it to integrations. This step is essential!

:::

:::note

Please pay attention that the order of the parameters for the `reportTransaction` method differs from the one for the `setVariationId` method.

:::

```diff showLineNumbers
  const variationId = paywall.variationId;

 try {
-    await adapty.setVariationId(variationId, transactionId);
+    await adapty.reportTransaction(transactionId, variationId);
 } catch (error) {
     // handle the `AdaptyError`
 }

```

