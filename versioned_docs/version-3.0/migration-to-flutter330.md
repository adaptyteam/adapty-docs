---
title: "Migration guide to Adapty iOS SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

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

  final deviceUUID = await Airbridge.state.deviceUUID;
  
  try {
-     final builder = AdaptyProfileParametersBuilder()
-         ..setAirbridgeDeviceId(deviceUUID);  
-     await Adapty().updateProfile(builder.build());

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

 final deviceId = await amplitude.getDeviceId();
 final userId = await amplitude.getUserId();

 try {
-  final builder = AdaptyProfileParametersBuilder()
-     ..setAmplitudeDeviceId(deviceId)
-     ..setAmplitudeUserId(userId);
-     await adapty.updateProfile(builder.build());

+     await Adapty().setIntegrationIdentifier(
+         key: "amplitude_user_id", 
+         value: userId,
+     );
+     await Adapty().setIntegrationIdentifier(
+         key: "amplitude_device_id", 
+         value: deviceId,
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
   try {
-   final builder = AdaptyProfileParametersBuilder()
-     ..setAppmetricaDeviceId(deviceId)
-     ..setAppmetricaProfileId("YOUR_ADAPTY_CUSTOMER_USER_ID");
-
-     await adapty.updateProfile(builder.build());
   
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

FlutterBranchSdk.initSession().listen((data) async {
  try {
+     await Adapty().setIntegrationIdentifier(
+         key: "branch_id", 
+         value: <BRANCH_IDENTITY_ID>,
+     );
-    await Adapty().updateAttribution(data, source: AdaptyAttributionSource.branch);
+    await Adapty().updateAttribution(data, source: "branch");
  } on AdaptyError catch (adaptyError) {
      // handle the error
  } catch (e) {
      // handle the error
  }
);
```

### Firebase and Google Analytics

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Firebase and Google Analytics integration](firebase-and-google-analytics).

```diff
import 'package:firebase_analytics/firebase_analytics.dart';

final appInstanceId = await FirebaseAnalytics.instance.appInstanceId;

try {
-  final builder = AdaptyProfileParametersBuilder()
-         ..setFirebaseAppInstanceId(appInstanceId);
-  await adapty.updateProfile(builder.build());

+  await Adapty().setIntegrationIdentifier(
+         key: "firebase_app_instance_id", 
+         value: appInstanceId,
+  );
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
final distinctId = await mixpanel.getDistinctId();

try {
-   final builder = AdaptyProfileParametersBuilder()
-      ..setMixpanelUserId(distinctId);
-     await Adapty().updateProfile(builder.build());

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
          try {
-             Adapty().updateProfile(builder.build());

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

final hwid = await Pushwoosh.getInstance.getHWID;

- final builder = AdaptyProfileParametersBuilder()
-         ..setPushwooshHWID(hwid);
  try {
-     await adapty.updateProfile(builder.build());

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

