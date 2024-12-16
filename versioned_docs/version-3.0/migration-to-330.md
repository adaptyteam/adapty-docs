---
title: "Migration guide to Adapty iOS SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

<Tabs groupId="migration-to-330"> 

<TabItem value="iOS" label="iOS" default> 

1. Rename `Adapty.Configuration` to `AdaptyConfiguration`.
2. Rename the `getViewConfiguration` method to `getPaywallConfiguration`.
3. Remove the `didCancelPurchase` and `paywall` parameters from SwiftUI, and rename the `viewConfiguration` parameter to `paywallConfiguration`.
4. Update how you process promotional in-app purchases from the App Store by removing the `defermentCompletion` parameter from the `AdaptyDelegate` method.
5. Remove the `getProductsIntroductoryOfferEligibility` method.
6. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.
7. Update Observer mode implementation.

## Rename Adapty.Configuration to AdaptyConfiguration

Update the code of Adapty iOS SDK activation in the following way:

<Tabs>
<TabItem value="Swift" label="Swift" default>

```diff
// In your AppDelegate class:
import Adapty

let configurationBuilder =
-        Adapty.Configuration
+        AdaptyConfiguration
          .builder(withAPIKey: "PUBLIC_SDK_KEY")
          .with(observerMode: false)
          .with(customerUserId: "YOUR_USER_ID")
          .with(idfaCollectionDisabled: false)
          .with(ipAddressCollectionDisabled: false)

Adapty.activate(with: configurationBuilder) { error in
  // handle the error
}
```

</TabItem>
<TabItem value="SwiftUI" label="SwiftUI" default>

```diff
import Adapty

@main
struct SampleApp: App {
    init() 
      let configurationBuilder =
-        Adapty.Configuration
+        AdaptyConfiguration
          .builder(withAPIKey: "PUBLIC_SDK_KEY")
          .with(observerMode: false) // optional
          .with(customerUserId: "YOUR_USER_ID") // optional
          .with(idfaCollectionDisabled: false) // optional
          .with(ipAddressCollectionDisabled: false) // optional

        Task {
            try await Adapty.activate(with: configurationBuilder)
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

</TabItem>
</Tabs>

## Rename getViewConfiguration method to getPaywallConfiguration

Update the method name to fetch the paywall's `viewConfiguration`:

```diff
import Adapty
import AdaptyUI

guard paywall.hasViewConfiguration else {
    //  use your custom logic
    return
}

do {
-    let paywallConfiguration = try await AdaptyUI.getViewConfiguration(
+    let paywallConfiguration = try await AdaptyUI.getPaywallConfiguration(
            forPaywall: paywall
    )
    // use loaded configuration
} catch {
    // handle the error
}
```

For more details about the method, check out [Fetch the view configuration of paywall designed using Paywall Builder](get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder)..

## Change parameters in SwiftUI

The following updates have been made to SwiftUI:

1. The `didCancelPurchase` parameter has been removed. Use `didFinishPurchase` instead.
2. The `.paywall()` method no longer accepts a paywall object.
3. The `paywallConfiguration` parameter has replaced the `viewConfiguration` parameter.

Update your code like this:

```diff
@State var paywallPresented = false

var body: some View {
	Text("Hello, AdaptyUI!")
			.paywall(
          isPresented: $paywallPresented,
-         paywall: <paywall object>,
-         viewConfiguration: <LocalizedViewConfiguration>,
+         paywallConfiguration: <AdaptyUI.PaywallConfiguration>,
          didPerformAction: { action in
              switch action {
                  case .close:
                      paywallPresented = false
                  default:
                      // Handle other actions
                      break
              }
          },
-         didFinishPurchase: { product, profile in paywallPresented = false },
+         didFinishPurchase: { product, purchaseResult in /* handle the result*/ },
          didFailPurchase: { product, error in /* handle the error */ },
          didFinishRestore: { profile in /* check access level and dismiss */  },
          didFailRestore: { error in /* handle the error */ },
          didFailRendering: { error in paywallPresented = false }
-         didCancelPurchase: { product in /* handle the result*/}

      )
}
```



## Update handling of promotional in-app purchases from App Store

Update how you handle promotional in-app purchases from the App Store by removing the `defermentCompletion` parameter from the `AdaptyDelegate` method, as shown in the example below:

```swift title="Swift"
final class YourAdaptyDelegateImplementation: AdaptyDelegate {
    nonisolated func shouldAddStorePayment(for product: AdaptyDeferredProduct) -> Bool {
        // 1a.
        // Return `true` to continue the transaction in your app.

        // 1b.
        // Store the product object and return `false` to defer or cancel the transaction.
        false
    }
    
    // 2. Continue the deferred purchase later on by passing the product to `makePurchase`
    func continueDeferredPurchase() async {
        let storedProduct: AdaptyDeferredProduct = // get the product object from the 1b.
        do {
            try await Adapty.makePurchase(product: storedProduct)
        } catch {
            // handle the error
        }
    }
}
```

## Remove getProductsIntroductoryOfferEligibility method

Before Adapty iOS SDK 3.2.0, the product object always included offers, regardless of whether the user was eligible. You had to manually check eligibility before using the offer.

Now, the product object only includes an offer if the user is eligible. This means you no longer need to check eligibility—if an offer is present, the user is eligible.

If you still want to view offers for users who are not eligible, refer to `sk1Product` and `sk2Product`.

## Update 3d-party integration SDK configuration

Starting with Adapty iOS SDK 3.2.0, we’ve updated the public API for the `updateAttribution` method. Previously, it accepted a `[AnyHashable: Any]` dictionary, allowing you to pass attribution objects directly from various services. Now, it requires a `[String: any Sendable]`, so you’ll need to convert attribution objects before passing them.

To ensure integrations work properly with Adapty iOS SDK 3.2.0 and later, update your SDK configurations for the following integrations as described in the sections below.

### Adjust

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Adjust integration](adjust#sdk-configuration).

<Tabs>

<TabItem value="v5" label="Adjust 5.x+" default>

```diff
class AdjustModuleImplementation {
-    func updateAdjustAttribution() {
-        Adjust.attribution { attribution in
-            guard let attributionDictionary = attribution?.dictionary()?.toSendableDict() else { return }
-
-            Adjust.adid { adid in
-                guard let adid else { return }
-
-                Adapty.updateAttribution(attributionDictionary, source: .adjust, networkUserId: adid) { error in
-                    // handle the error
-                }
-            }
-        }
-    }

+    func updateAdjustAdid() {
+        Adjust.adid { adid in
+            guard let adid else { return }
+
+            Adapty.setIntegrationIdentifier(key: "adjust_device_id", value: adid)
+        }
+    }
+
+    func updateAdjustAttribution() {
+        Adjust.attribution { attribution in
+            guard let attribution = attribution?.dictionary() else { 
+                return
+            }
+            
+            Adapty.updateAttribution(attribution, source: "adjust")
+        }
+    }
}
```

</TabItem>

<TabItem value="v4" label="Adjust 4.x" default>

```diff
class YourAdjustDelegateImplementation {
    // Find your implementation of AdjustDelegate 
    // and update adjustAttributionChanged method:
    func adjustAttributionChanged(_ attribution: ADJAttribution?) {
-       if let attribution = attribution?.dictionary()?.toSendableDict() {
-           Adapty.updateAttribution(attribution, source: .adjust)
+       if let attribution = attribution?.dictionary() {
+           Adapty.updateAttribution(attribution, source: "adjust")
        }
    }
}
```

</TabItem>
</Tabs>

### AirBridge

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AirBridge integration](airbridge#sdk-configuration).

```diff
 import AirBridge

- let builder = AdaptyProfileParameters.Builder()
-             .with(airbridgeDeviceId: AirBridge.deviceUUID())
-
- Adapty.updateProfile(params: builder.build())

+ do {
+     try await Adapty.setIntegrationIdentifier(
+         key: "airbridge_device_id", 
+         value: AirBridge.deviceUUID()
+     )
+ } catch {
+     // handle the error
+ }
```

### Amplitude

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Amplitude integration](amplitude#sdk-configuration).

```diff
 import Amplitude 

- let builder = AdaptyProfileParameters.Builder()
-             .with(amplitudeUserId: Amplitude.instance().userId)
-             .with(amplitudeDeviceId: Amplitude.instance().deviceId)
-
- Adapty.updateProfile(params: builder.build())

+ do {
+     try await Adapty.setIntegrationIdentifier(
+         key: "amplitude_user_id", 
+         value: Amplitude.instance().userId
+     )
+     try await Adapty.setIntegrationIdentifier(
+         key: "amplitude_device_id", 
+         value: Amplitude.instance().deviceId
+     )
+ } catch {
+     // handle the error
+ }

```

### AppMetrica

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppMetrica integration](appmetrica#sdk-configuration).

```diff
 import AppMetricaCore
        
- if let deviceID = AppMetrica.deviceID {
-   let builder = AdaptyProfileParameters.Builder()
-     .with(appmetricaDeviceId: deviceID)
-     .with(appmetricaProfileId: "YOUR_ADAPTY_CUSTOMER_USER_ID")
-
-   Adapty.updateProfile(params: builder.build())
- }

+ if let deviceID = AppMetrica.deviceID {
+     do {
+         try await Adapty.setIntegrationIdentifier(
+             key: "appmetrica_device_id", 
+             value: deviceID
+         )
+         try await Adapty.setIntegrationIdentifier(
+             key: "appmetrica_profile_id", 
+             value: "YOUR_ADAPTY_CUSTOMER_USER_ID"
+         )
+     } catch {
+         // handle the error
+     }
+ }

```



### AppsFlyer

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppsFlyer integration](appsflyer#sdk-configuration).

```diff
class YourAppsFlyerLibDelegateImplementation {
    // Find your implementation of AppsFlyerLibDelegate 
    // and update onConversionDataSuccess method:
-    func onConversionDataSuccess(_ conversionInfo: [AnyHashable : Any]) {
-        // It's important to include the network user ID
-        let networkUserId = AppsFlyerLib.shared().getAppsFlyerUID()
-
-        Adapty.updateAttribution(
-           conversionInfo.toSendableDict(),
-            source: .appsflyer,
-            networkUserId: networkUserId
-        )
+    func onConversionDataSuccess(_ installData: [AnyHashable : Any]) {
+        let uid = AppsFlyerLib.shared().getAppsFlyerUID()
+        Adapty.setIntegrationIdentifier(key: "appsflyer_id", value: uid)
+        Adapty.updateAttribution(conversionInfo, source: "appsflyer")
    }
}
```

### Branch

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Branch integration](branch#sdk-configuration).

```diff
class YourBranchImplementation {
    func initializeBranch() {
        // Pass the attribution you receive from the initializing method of Branch iOS SDK to Adapty.
        Branch.getInstance().initSession(launchOptions: launchOptions) { (data, error) in
-           if let data = data?.toSendableDict() {
-                Adapty.updateAttribution(data, source: .branch)
-           }
+           if let data {
+               Adapty.updateAttribution(data, source: "branch")
+           }
        }
    }
}
```

### Facebook Ads

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Facebook Ads integration](facebook-ads#sdk-configuration).

```diff
 import FacebookCore

- let builder = AdaptyProfileParameters.Builder()
-     .with(facebookAnonymousId: AppEvents.shared.anonymousID)
-
- do {
-     try Adapty.updateProfile(params: builder.build())
- } catch {
-     // handle the error
- }

+ do {
+     try await Adapty.setIntegrationIdentifier(
+         key: "facebook_anonymous_id", 
+         value: AppEvents.shared.anonymousID
+     )
+ } catch {
+     // handle the error
+ }

```



### Firebase and Google Analytics

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Firebase and Google Analytics integration](firebase-and-google-analytics).

```diff
 import FirebaseCore
 import FirebaseAnalytics

 FirebaseApp.configure()
        
- if let appInstanceId = Analytics.appInstanceID() {            
-     let builder = AdaptyProfileParameters.Builder()
-         .with(firebaseAppInstanceId: appInstanceId)
            
-     Adapty.updateProfile(params: builder.build()) { error in
-         // handle error
-     }
- }

+ if let appInstanceId = Analytics.appInstanceID() {            
+     do {
+         try await Adapty.setIntegrationIdentifier(
+             key: "firebase_app_instance_id", 
+             value: appInstanceId
+         )
+     } catch {
+         // handle the error
+     }
+ }
```

### Mixpanel

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Mixpanel integration](mixpanel#sdk-configuration).

```diff
 import Mixpanel

- let builder = AdaptyProfileParameters.Builder()
-             .with(mixpanelUserId: Mixpanel.mainInstance().distinctId)
-
- do {
-     try await Adapty.updateProfile(params: builder.build())
- } catch {
-     // handle the error
- }

+ do {
+     try await Adapty.setIntegrationIdentifier(
+         key: "mixpanel_user_id", 
+         value: Mixpanel.mainInstance().distinctId
+     )
+ } catch {
+     // handle the error
+ }

```

### OneSignal

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for OneSignal integration](onesignal#sdk-configuration).

```diff
 // PlayerID (pre-v5 OneSignal SDK)
 // in your OSSubscriptionObserver implementation
 func onOSSubscriptionChanged(_ stateChanges: OSSubscriptionStateChanges) {
     if let playerId = stateChanges.to.userId {
-         let params = AdaptyProfileParameters.Builder()
-             .with(oneSignalPlayerId: playerId)
-             .build()
-
-         Adapty.updateProfile(params:params) { error in
-             // check error
-         }
+         Task {
+             try await Adapty.setIntegrationIdentifier(
+                 key: "one_signal_player_id", 
+                 value: playerId
+             )
+         }
     }
 }

 // SubscriptionID (v5+ OneSignal SDK)
 OneSignal.Notifications.requestPermission({ accepted in
-     let id = OneSignal.User.pushSubscription.id
-
-     let builder = AdaptyProfileParameters.Builder()
-         .with(oneSignalSubscriptionId: id)
-
-     Adapty.updateProfile(params: builder.build())
+     Task {
+         try await Adapty.setIntegrationIdentifier(
+             key: "one_signal_subscription_id", 
+             value: OneSignal.User.pushSubscription.id
+         )
+     }
 }, fallbackToSettings: true)
```

### Pushwoosh

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Pushwoosh integration](pushwoosh#sdk-configuration).

```diff
- let params = AdaptyProfileParameters.Builder()
-     .with(pushwooshHWID: Pushwoosh.sharedInstance().getHWID())
-     .build()
-
- Adapty.updateProfile(params: params) { error in
-     // handle the error
- }

+ do {
+     try await Adapty.setIntegrationIdentifier(
+         key: "pushwoosh_hwid", 
+         value: Pushwoosh.sharedInstance().getHWID()
+     )
+ } catch {
+     // handle the error
+ }
```

## Update Observer mode implemetation

Update how you link paywalls to transactions. Previously, you used the `setVariationId` method to assign the `variationId`. Now, you can include the `variationId` directly when recording the transaction using the new `reportTransaction` method. Check out the final code example in the [Associate paywalls with purchase transactions in Observer mode](associate-paywalls-to-transactions).

:::warning

Don't forget to record the transaction using the `reportTransaction` method. Skipping this step means Adapty won't recognize the transaction, won't grant access levels, won't include it in analytics, and won't send it to integrations. This step is essential!

:::

```diff
- let variationId = paywall.variationId
-
- // There are two overloads: for StoreKit 1 and StoreKit 2
- Adapty.setVariationId(variationId, forPurchasedTransaction: transaction) { error in
-     if error == nil {
-         // successful binding
-     }
- }

+ do {
+     // every time when calling transaction.finish()
+     try await Adapty.reportTransaction(transaction, withVariationId: <YOUR_PAYWALL_VARIATION_ID>)
+ } catch {
+     // handle the error
+ }
```

 

</TabItem> 

<TabItem value="Flutter" label="Flutter" default> 

1. Update the method for providing fallback paywalls.
2. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.
3. Update Observer mode implementation.

## Update method for providing fallback paywalls

Previously, the method required the fallback paywall as a JSON string (`jsonString`), but now it takes the path to the local fallback file (`assetId`) instead.

```diff
 import 'dart:async' show Future;
 import 'dart:io' show Platform;
-import 'package:flutter/services.dart' show rootBundle;

-final filePath = Platform.isIOS ? 'assets/ios_fallback.json' : 'assets/android_fallback.json';
-final jsonString = await rootBundle.loadString(filePath);
+final assetId = Platform.isIOS ? 'assets/ios_fallback.json' : 'assets/android_fallback.json';

 try {
-  await adapty.setFallbackPaywalls(jsonString);
+  await adapty.setFallbackPaywalls(assetId);
 } on AdaptyError catch (adaptyError) {
   // handle the error
 } catch (e) {
 }

```

For the complete code example, check out the [Use fallback paywalls](flutter-use-fallback-paywalls) page.

## Update 3d-party integration SDK configuration

To ensure integrations work properly with Adapty iOS SDK 3.2.0 and later, update your SDK configurations for the following integrations as described in the sections below. 

### Adjust

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Adjust integration](adjust#sdk-configuration).

<Tabs>

<TabItem value="v5" label="Adjust 5.x+" default>

```diff
 import 'package:adjust_sdk/adjust.dart';
 import 'package:adjust_sdk/adjust_config.dart';

 try {
   final adid = await Adjust.getAdid();

   if (adid == null) {
     // handle the error
   }

+   await Adapty().setIntegrationIdentifier(
+     key: "adjust_device_id", 
+     value: adid,
+   );

   final attributionData = await Adjust.getAttribution();

   var attribution = Map<String, String>();

   if (attributionData.trackerToken != null) attribution['trackerToken'] = attributionData.trackerToken!;
   if (attributionData.trackerName != null) attribution['trackerName'] = attributionData.trackerName!;
   if (attributionData.network != null) attribution['network'] = attributionData.network!;
   if (attributionData.adgroup != null) attribution['adgroup'] = attributionData.adgroup!;
   if (attributionData.creative != null) attribution['creative'] = attributionData.creative!;
   if (attributionData.clickLabel != null) attribution['clickLabel'] = attributionData.clickLabel!;
   if (attributionData.costType != null) attribution['costType'] = attributionData.costType!;
   if (attributionData.costAmount != null) attribution['costAmount'] = attributionData.costAmount!.toString();
   if (attributionData.costCurrency != null) attribution['costCurrency'] = attributionData.costCurrency!;
   if (attributionData.fbInstallReferrer != null) attribution['fbInstallReferrer'] = attributionData.fbInstallReferrer!;

-   Adapty().updateAttribution(
-     attribution,
-     source: AdaptyAttributionSource.adjust,
-     networkUserId: adid,
-   );
+   await Adapty().updateAttribution(attribution, source: "adjust");
 } catch (e) {
   // handle the error
   } on AdaptyError catch (adaptyError) {
   // handle the error
 }
```

</TabItem>

<TabItem value="v4" label="Adjust 4.x" default>

```diff
...
```

</TabItem>
</Tabs>

### AirBridge

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AirBridge integration](airbridge#sdk-configuration).

```diff
 import 'package:airbridge_flutter_sdk/airbridge_flutter_sdk.dart';

- final builder = AdaptyProfileParametersBuilder()
-         ..setAirbridgeDeviceId(
-           await Airbridge.state.deviceUUID,
-         );
-
- try {
-     await Adapty().updateProfile(builder.build());

+ final deviceUUID = await Airbridge.state.deviceUUID;
+
+ try {
+     await Adapty().setIntegrationIdentifier(
+         key: "airbridge_device_id", 
+         value: deviceUUID,
+     );
  } on AdaptyError catch (adaptyError) {
     // handle the error
  } catch (e) {
     // handle the error
  }
```

### Amplitude

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Amplitude integration](amplitude#sdk-configuration).

```diff
 import 'package:amplitude_flutter/amplitude.dart';

 final Amplitude amplitude = Amplitude.getInstance(instanceName: "YOUR_INSTANCE_NAME");

- final builder = AdaptyProfileParametersBuilder()
-      ..setAmplitudeDeviceId(await amplitude.getDeviceId())
-      ..setAmplitudeUserId(await amplitude.getUserId());
-
- try {
-      await adapty.updateProfile(builder.build());

+ try {
+     await Adapty().setIntegrationIdentifier(
+         key: "amplitude_user_id", 
+         value: amplitude.getUserId(),
+     );
+     await Adapty().setIntegrationIdentifier(
+         key: "amplitude_device_id", 
+         value: amplitude.getDeviceId(),
+     );
  } on AdaptyError catch (adaptyError) {
      // handle the error
  } catch (e) {
      // handle the error
  }
```

### AppMetrica

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppMetrica integration](appmetrica#sdk-configuration).

```diff
 import 'package:appmetrica_plugin/appmetrica_plugin.dart';

 final deviceId = await AppMetrica.deviceId;

 if (deviceId != null) {
-   final builder = AdaptyProfileParametersBuilder()
-     ..setAppmetricaDeviceId(deviceId)
-     ..setAppmetricaProfileId("YOUR_ADAPTY_CUSTOMER_USER_ID");
-
-   try {
-     await adapty.updateProfile(builder.build());
+   try {
+     await Adapty().setIntegrationIdentifier(
+         key: "appmetrica_device_id", 
+         value: deviceId,
+     );
+     await Adapty().setIntegrationIdentifier(
+         key: "appmetrica_profile_id", 
+         value: "YOUR_ADAPTY_CUSTOMER_USER_ID",
+     );
    } on AdaptyError catch (adaptyError) {
      // handle the error
    } catch (e) {
      // handle the error
    }
 }
```

### AppsFlyer

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppsFlyer integration](appsflyer#sdk-configuration).

```diff
 import 'package:appsflyer_sdk/appsflyer_sdk.dart';

 AppsflyerSdk appsflyerSdk = AppsflyerSdk(<YOUR_OPTIONS>);
 
 appsflyerSdk.onInstallConversionData((data) async {
     try {
         // It's important to include the network user ID
         final appsFlyerUID = await appsFlyerSdk.getAppsFlyerUID();
-         await Adapty().updateAttribution(
-           data,
-           source: AdaptyAttributionSource.appsflyer,
-           networkUserId: appsFlyerUID,
-         );
+         await Adapty().setIntegrationIdentifier(
+           key: "appsflyer_id", 
+           value: appsFlyerUID,
+         );
+         
+         await Adapty().updateAttribution(data, source: "appsflyer");
     } on AdaptyError catch (adaptyError) {
         // handle the error

      } catch (e) {
          // handle the error
      }
 });

 appsflyerSdk.initSdk(
     registerConversionDataCallback: true,
     registerOnAppOpenAttributionCallback: true,
     registerOnDeepLinkingCallback: true,
 );
```

### Branch

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Branch integration](branch#sdk-configuration).

```diff
 import 'package:flutter_branch_sdk/flutter_branch_sdk.dart';

- FlutterBranchSdk.initSession().listen((data) async {
-     try {
-         await Adapty().updateAttribution(data, source: AdaptyAttributionSource.branch);

+ try {
+     await Adapty().setIntegrationIdentifier(
+         key: "branch_id", 
+         value: <BRANCH_IDENTITY_ID>,
+     );
  } on AdaptyError catch (adaptyError) {
      // handle the error
  } catch (e) {
      // handle the error
  });
```

### Firebase and Google Analytics

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Firebase and Google Analytics integration](firebase-and-google-analytics).

```diff
 import 'package:firebase_analytics/firebase_analytics.dart';

- final builder = AdaptyProfileParametersBuilder()
-         ..setFirebaseAppInstanceId(
-           await FirebaseAnalytics.instance.appInstanceId,
-         );
        
- try {
-     await adapty.updateProfile(builder.build());

+ final appInstanceId = await FirebaseAnalytics.instance.appInstanceId;

+ try {
+     await Adapty().setIntegrationIdentifier(
+         key: "firebase_app_instance_id", 
+         value: appInstanceId,
+     );
  } on AdaptyError catch (adaptyError) {
      // handle the error
  } catch (e) {
      // handle the error
  }
```

### Mixpanel

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Mixpanel integration](mixpanel#sdk-configuration).

```diff
 import 'package:mixpanel_flutter/mixpanel_flutter.dart';

 final mixpanel = await Mixpanel.init("Your Token", trackAutomaticEvents: true);

- final builder = AdaptyProfileParametersBuilder()
-         ..setMixpanelUserId(
-           await mixpanel.getDistinctId(),
-         );

- try {
-     await Adapty().updateProfile(builder.build());

+ final distinctId = await mixpanel.getDistinctId();

+ try {
+     await Adapty().setIntegrationIdentifier(
+         key: "mixpanel_user_id", 
+         value: distinctId,
+     );
  } on AdaptyError catch (adaptyError) {
      // handle the error
  } catch (e) {
      // handle the error
  }
```

### OneSignal

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for OneSignal integration](onesignal#sdk-configuration).

```diff
 OneSignal.shared.setSubscriptionObserver((changes) {
     final playerId = changes.to.userId;
     if (playerId != null) {
-         final builder = 
-             AdaptyProfileParametersBuilder()
-                 ..setOneSignalPlayerId(playerId);
-                 // ..setOneSignalSubscriptionId(playerId);
-         try {
-             Adapty().updateProfile(builder.build());
+         try {
+             await Adapty().setIntegrationIdentifier(
+                 key: "one_signal_player_id", 
+                 value: playerId,
+             );
          } on AdaptyError catch (adaptyError) {
              // handle error
          } catch (e) {
              // handle error
          }
     }
 });
```

### Pushwoosh

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Pushwoosh integration](pushwoosh#sdk-configuration).

```diff
 import 'package:pushwoosh/pushwoosh.dart';

- final builder = AdaptyProfileParametersBuilder()
-         ..setPushwooshHWID(
-           await Pushwoosh.getInstance.getHWID,
-         );
- try {
-     await adapty.updateProfile(builder.build());

+ final hwid = await Pushwoosh.getInstance.getHWID;

+ try {
+     await Adapty().setIntegrationIdentifier(
+         key: "pushwoosh_hwid", 
+         value: hwid,
+     );
  } on AdaptyError catch (adaptyError) {
      // handle the error
  } catch (e) {
      // handle the error
  }
```

## Update Observer mode implemetation

Update how you link paywalls to transactions. Previously, you used the `setVariationId` method to assign the `variationId`. Now, you can include the `variationId` directly when recording the transaction using the new `reportTransaction` method. Check out the final code example in the [Associate paywalls with purchase transactions in Observer mode](associate-paywalls-to-transactions).

:::warning

Don't forget to record the transaction using the `reportTransaction` method. Skipping this step means Adapty won't recognize the transaction, won't grant access levels, won't include it in analytics, and won't send it to integrations. This step is essential!

:::

```diff
- final transactionId = transaction.transactionIdentifier
- final variationId = paywall.variationId

- try {
-   await Adapty().setVariationId('transaction_id', variationId);

+ try {
+     // every time when calling transaction.finish()
+     await Adapty().reportTransaction(
+         "YOUR_TRANSACTION_ID", 
+         variationId: "PAYWALL_VARIATION_ID", // optional
+     );
  } on AdaptyError catch (adaptyError) {
      // handle the error
  } catch (e) {
      // handle the error
  }
```



</TabItem> 

</Tabs>

