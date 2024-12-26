---
title: "Migration guide to Adapty Unity SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Upgrade to Adapty SDK v3.3.x.

2. Renamed multiple classes, properties, and methods in the Adapty and AdaptyUI modules of Adapty SDK.

3. From now on, the `SetLogLevel` method accepts a callback as an argument.

4. 

5. From now on, the `PresentCodeRedemptionSheet` method accepts a callback as an argument.

6. Remove the `GetProductsIntroductoryOfferEligibility` method.

7. Save fallback paywalls to separate files (one per platform) in `Assets/StreamingAssets/` and pass the file names to the `SetFallbackPaywalls` method.

8. Update making purchase

9. Update integration configurations for Adjust, Amplitude, AppMetrica, Appsflyer, Branch, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.

10. Update Observer mode implementation.

## Upgrade Adapty Unity SDK to 3.3.x

.

## Renamings

1. Rename in Adapty module:

   | Old version               | New version              |
   | ------------------------- | ------------------------ |
   | Adapty.sdkVersion         | Adapty.SDKVersion        |
   | Adapty.LogLevel           | AdaptyLogLevel           |
   | Adapty.Paywall            | AdaptyPaywall            |
   | Adapty.PaywallFetchPolicy | AdaptyPaywallFetchPolicy |
   | PaywallProduct            | AdaptyPaywallProduct     |
   | Adapty.Profile            | AdaptyProfile            |
   | Adapty.ProfileParameters  | AdaptyProfileParameters  |
   | ProfileGender             | AdaptyProfileGender      |
   | Error                     | AdaptyError              |

2. Rename in AdaptyUI module:

   | Old version        | New version        |
   | ------------------ | ------------------ |
   | CreatePaywallView  | CreateView         |
   | PresentPaywallView | PresentView        |
   | DismissPaywallView | DismissView        |
   | AdaptyUI.View      | AdaptyUIView       |
   | AdaptyUI.Action    | AdaptyUIUserAction |

## Change the SetLogLevel method

From now on, the `SetLogLevel` method accepts a callback as an argument.

```diff
- Adapty.SetLogLevel(Adapty.LogLevel.Verbose);
+ Adapty.SetLogLevel(Adapty.LogLevel.Verbose, null); // or you can pass the callback to handle the possible error
```

## Change the PresentCodeRedemptionSheet method

From now on, the `PresentCodeRedemptionSheet` method accepts a callback as an argument.

```diff
- Adapty.PresentCodeRedemptionSheet();
+ Adapty.PresentCodeRedemptionSheet(null); // or you can pass the callback to handle the possible error
```

## Remove the GetProductsIntroductoryOfferEligibility method

Before Adapty iOS SDK 3.3.0, the product object always included offers, regardless of whether the user was eligible. You had to manually check eligibility before using the offer.

Now, the product object only includes an offer if the user is eligible. This means you no longer need to check eligibility—if an offer is present, the user is eligible.

## Update method for providing fallback paywalls

Up to this version, the fallback paywalls were passed as a serialized JSON. Starting from v 3.3.0, the mechanism is changed:

1. Save fallback paywalls to files in `/Assets/StreamingAssets/`, 1 file for Android and another for iOS.
2. Pass the file names to the `SetFallbackPaywalls` method.

Your code will change this way:

```diff
using AdaptySDK;

void SetFallBackPaywalls() {

+ #if UNITY_IOS
+   var assetId = "adapty_fallback_ios.json";
+ #elif UNITY_ANDROID
+   var assetId = "adapty_fallback_android.json";
+ #else
+   var assetId = "";
+ #endif

-   Adapty.SetFallbackPaywalls("FALLBACK_PAYWALLS_JSON_STRING", (error) => {
+   Adapty.SetFallbackPaywalls(assetId, (error) => {
    // handle the error
  });
}
```

## Update making purchase

Previously canceled and pending purchases were considered errors and returned the `USER_CANCELED` and `pendingPurchase` codes, respectively.

Now a new `AdaptyPurchaseResultType` class is used to process canceled, successful, and pending purchases. Update the code of purchasing in the following way:

```diff
using AdaptySDK;

void MakePurchase(AdaptyPaywallProduct product) {
- Adapty.MakePurchase(product, (profile, error) => {
-   // handle successfull purchase
+ Adapty.MakePurchase(product, (result, error) => {
+   switch (result.Type) {
+     case AdaptyPurchaseResultType.Pending:
+       // handle pending purchase
+       break;
+     case AdaptyPurchaseResultType.UserCancelled:
+       // handle purchase cancellation
+       break;
+     case AdaptyPurchaseResultType.Success:
+       var profile = result.Profile;
+       // handle successfull purchase
+       break;
+     default:
+       break;
    }
  });
}
```



## Update 3d-party integration SDK configuration

Starting with Adapty Unity SDK 3.3.0, we’ve updated the public API for the `updateAttribution` method. Previously, it accepted a `[AnyHashable: Any]` dictionary, allowing you to pass attribution objects directly from various services. Now, it requires a `[String: any Sendable]`, so you’ll need to convert attribution objects before passing them.

To ensure integrations work properly with Adapty Unity SDK 3.3.0 and later, update your SDK configurations for the following integrations as described in the sections below.

### Adjust

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Adjust integration](adjust#sdk-configuration).

<Tabs>

<TabItem value="v5" label="Adjust 5.x+" default>

```diff
- using static AdaptySDK.Adapty;
 using AdaptySDK;

 Adjust.GetAdid((adid) => {
-   Adjust.GetAttribution((attribution) => {
-     Dictionary<String, object> data = new Dictionary<String, object>();
-
-     data["network"] = attribution.Network;
-     data["campaign"] = attribution.Campaign;
-     data["adgroup"] = attribution.Adgroup;
-     data["creative"] = attribution.Creative;
-
-     String attributionString = JsonUtility.ToJson(data);
-     Adapty.UpdateAttribution(attributionString, AttributionSource.Adjust, adid, (error) => {
-       // handle the error
-     });
+   if (adid != null) {
+     Adapty.SetIntegrationIdentifier(
+       "adjust_device_id", 
+       adid, 
+       (error) => {
+         // handle the error
+     });
    }
 });

 Adjust.GetAttribution((attribution) => {
   Dictionary<String, object> data = new Dictionary<String, object>();

   data["network"] = attribution.Network;
   data["campaign"] = attribution.Campaign;
   data["adgroup"] = attribution.Adgroup;
   data["creative"] = attribution.Creative;

   String attributionString = JsonUtility.ToJson(data);
    
-   Adapty.UpdateAttribution(attributionString, AttributionSource.Adjust, adid, (error) => {
+   Adapty.UpdateAttribution(attributionString, "adjust", (error) => {
       // handle the error
   });
 });
```

</TabItem>

<TabItem value="v4" label="Adjust 4.x" default>

```diff
.
```

</TabItem>
</Tabs>

### Amplitude

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Amplitude integration](amplitude#sdk-configuration).

```diff
- var builder = new Adapty.ProfileParameters.Builder();
- builder.SetAmplitudeUserId("AMPLITUDE_USER_ID");
- builder.SetAmplitudeDeviceId(amplitude.getDeviceId());

- Adapty.UpdateProfile(builder.Build(), (error) => {
-     // handle error
- });

+ using AdaptySDK;

+ Adapty.SetIntegrationIdentifier(
+   "amplitude_user_id", 
+   "AMPLITUDE_USER_ID", 
+   (error) => {
+   // handle the error
+ });

+ Adapty.SetIntegrationIdentifier(
+   "amplitude_device_id", 
+   amplitude.getDeviceId(), 
+   (error) => {
+   // handle the error
+ });
```

### AppMetrica

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppMetrica integration](appmetrica#sdk-configuration).

```diff
- var deviceId = AppMetrica.GetDeviceId();

- if (deviceId != null {
-   var builder = new Adapty.ProfileParameters.Builder();

-   builder.SetAppmetricaProfileId("YOUR_ADAPTY_CUSTOMER_USER_ID");
-   builder.SetAppmetricaDeviceId(deviceId);

-   Adapty.UpdateProfile(builder.Build(), (error) => {
-       // handle error
-   });
- }

+ using AdaptySDK;

+ var deviceId = AppMetrica.GetDeviceId();

+ if (deviceId != null {
+   Adapty.SetIntegrationIdentifier(
+     "appmetrica_device_id", 
+     deviceId, 
+     (error) => {
+     // handle the error
+   });
+   
+   Adapty.SetIntegrationIdentifier(
+     "appmetrica_profile_id", 
+     "YOUR_ADAPTY_CUSTOMER_USER_ID", 
+     (error) => {
+     // handle the error
+   });
+ }
```



### AppsFlyer

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppsFlyer integration](appsflyer#sdk-configuration).

```diff
 using AppsFlyerSDK;
 using AdaptySDK;

 // before SDK initialization
 AppsFlyer.getConversionData(this.name);

 // in your IAppsFlyerConversionData
 void onConversionDataSuccess(string conversionData) {
     // It's important to include the network user ID
-    string appsFlyerId = AppsFlyer.getAppsFlyerId();
-    Adapty.UpdateAttribution(conversionData, AttributionSource.Appsflyer, appsFlyerId, (error) => {
+    string appsFlyerId = AppsFlyer.getAppsFlyerId();
+    
+    Adapty.SetIntegrationIdentifier(
+      "appsflyer_id", 
+      appsFlyerId, 
+      (error) => {
         // handle the error
     });
+    
+    Adapty.UpdateAttribution(
+      conversionData, 
+      "appsflyer",
+      (error) => {
+        // handle the error
+      });
 }

```

### Branch

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Branch integration](branch#sdk-configuration).

```diff
- class YourBranchImplementation {
-     func initializeBranch() {
-         Branch.getInstance().initSession(launchOptions: launchOptions) { (data, error) in
-             if let data {
-                 Adapty.updateAttribution(data, source: .branch)
-             }
-         }
-     }
- }

+ using AdaptySDK;

+ Branch.initSession(delegate(Dictionary<string, object> parameters, string error) {
+     string attributionString = JsonUtility.ToJson(parameters);
+     
+     Adapty.UpdateAttribution(
+       attributionString, 
+       "branch", 
+       (error) => {
+         // handle the error
+       });
+ });
```

### Firebase and Google Analytics

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Firebase and Google Analytics integration](firebase-and-google-analytics).

```diff
 // We suppose FirebaseAnalytics Unity Plugin is already installed

 using AdaptySDK;

 Firebase.Analytics
   .FirebaseAnalytics
   .GetAnalyticsInstanceIdAsync()
   .ContinueWithOnMainThread((task) => {
     if (!task.IsCompletedSuccessfully) {
       // handle error
       return;
     }

     var firebaseId = task.Result
     var builder = new Adapty.ProfileParameters.Builder();
     
-    builder.SetFirebaseAppInstanceId(firebaseId);
-
-    Adapty.UpdateProfile(builder.Build(), (error) => {
-        // handle error
   
+     Adapty.SetIntegrationIdentifier(
+       "firebase_app_instance_id", 
+       firebaseId, 
+       (error) => {
+         // handle the error
     });
   });
```

### Mixpanel

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Mixpanel integration](mixpanel#sdk-configuration).

```diff
- var builder = new Adapty.ProfileParameters.Builder();
- builder.SetMixpanelUserId(Mixpanel.DistinctId);

- Adapty.UpdateProfile(builder.Build(), (error) => {
-     // handle error
- });

+ using AdaptySDK;

+ var distinctId = Mixpanel.DistinctId;

+ if (distinctId != null) {
+   Adapty.SetIntegrationIdentifier(
+     "mixpanel_user_id", 
+     distinctId, 
+     (error) => {
+       // handle the error
+   });
+ }
```

### OneSignal

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for OneSignal integration](onesignal#sdk-configuration).

```diff
- using OneSignalSDK;

- var pushUserId = OneSignal.Default.PushSubscriptionState.userId;

- var builder = new Adapty.ProfileParameters.Builder();
- builder.SetOneSignalPlayerId(pushUserId);

- Adapty.UpdateProfile(builder.Build(), (error) => {
-     // handle error
- });

+ using AdaptySDK;

+ var distinctId = Mixpanel.DistinctId;

+ if (distinctId != null) {
+   Adapty.SetIntegrationIdentifier(
+     "mixpanel_user_id", 
+     distinctId, 
+     (error) => {
+       // handle the error
+   });
+ }
```

### Pushwoosh

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Pushwoosh integration](pushwoosh#sdk-configuration).

```diff
- var builder = new Adapty.ProfileParameters.Builder();
- builder.SetPushwooshHWID(Pushwoosh.Instance.HWID);

- Adapty.UpdateProfile(builder.Build(), (error) => {
-     // handle error
- });

+ using AdaptySDK;

+ Adapty.SetIntegrationIdentifier(
+   "pushwoosh_hwid", 
+   Pushwoosh.Instance.HWID, 
+   (error) => {
+   // handle the error
+ });
```

## Update Observer mode implementation

Update how you link paywalls to transactions. Previously, you used the `setVariationId` method to assign the `variationId`. Now, you can include the `variationId` directly when recording the transaction using the new `reportTransaction` method. Check out the final code example in the [Associate paywalls with purchase transactions in Observer mode](associate-paywalls-to-transactions).

```diff
 // every time when calling transaction.finish()
- Adapty.SetVariationForTransaction("<variationId>", "<transactionId>", (error) => { 
-     if(error != null) {
-         // handle the error
-         return;
-     }
-
-     // successful binding
- });

+ Adapty.ReportTransaction(
+   "YOUR_TRANSACTION_ID", 
+   "PAYWALL_VARIATION_ID", // optional
+   (error) => {
+   // handle the error
+ });
```

