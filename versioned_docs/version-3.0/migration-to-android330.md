---
title: "Migration guide to Android Adapty SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Update how you handle making purchases in paywalls not created with Paywall Builder. Stop processing the `USER_CANCELED` and `PENDING_PURCHASE` error codes. A canceled purchase is no longer considered an error and will now appear in the non-error purchase results.
2. Replace the `onPurchaseCanceled` and `onPurchaseSuccess` events with the new `onPurchaseFinished` event for paywalls created with Paywall Builder. This change is for the same reason: canceled purchases are no longer treated as errors and will be included in the non-error purchase results.
3. Change the method signature of `onAwaitingSubscriptionUpdateParams` for Paywall Builder paywalls.
4. Update the method used to provide fallback paywalls if you pass the file URI directly.
5. Update the integration configurations for for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.

## Update making purchase

Previously canceled and pending purchases were considered errors and returned the `USER_CANCELED` and `PENDING_PURCHASE` codes, respectively.  

Now a new `AdaptyPurchaseResult` class is used to indicate canceled, successful, and pending purchases. Update the code of purchasing in the following way:

~~~diff
Adapty.makePurchase(activity, product) { result ->
     when (result) {
         is AdaptyResult.Success -> {
-            val info = result.value
-            val profile = info?.profile
-        
-            if (profile?.accessLevels?.get("YOUR_ACCESS_LEVEL")?.isActive == true) {
-                // Grant access to the paid features
-            }
+            when (val purchaseResult = result.value) {
+                is AdaptyPurchaseResult.Success -> {
+                    val profile = purchaseResult.profile
+                    if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true) {
+                        // Grant access to the paid features
+                    }
+                }
+
+                is AdaptyPurchaseResult.UserCanceled -> {
+                    // Handle the case where the user canceled the purchase
+                }
+
+                is AdaptyPurchaseResult.Pending -> {
+                    // Handle deferred purchases (e.g., the user will pay offline with cash
+                }
+            }
         }
         is AdaptyResult.Error -> {
             val error = result.error
             // Handle the error
         }
     }
 }
~~~

For the complete code example, check out the [Make purchases in mobile app](making-purchases#make-purchase) page. 

## Modify Paywall Builder purchase events

1. Add `onPurchaseFinished` event:

   ```diff showLineNumbers
   + public override fun onPurchaseFinished(
   +     purchaseResult: AdaptyPurchaseResult,
   +     product: AdaptyPaywallProduct,
   +     context: Context,
   + ) {
   +    when (purchaseResult) {
   +        is AdaptyPurchaseResult.Success -> {
   +            // Grant access to the paid features
   +        }
   +        is AdaptyPurchaseResult.UserCanceled -> {
   +            // Handle the case where the user canceled the purchase
   +        }
   +        is AdaptyPurchaseResult.Pending -> {
   +            // Handle deferred purchases (e.g., the user will pay offline with cash)
   +        }
   +    }
   + }
   ```

   For the complete code example, check out the [Successful, canceled, or pending purchase](android-handling-events#successful-canceled-or-pending-purchase) and event description.

2. Remove processing of the `onPurchaseCancelled` event:

   ```diff showLineNumbers
   - public override fun onPurchaseCanceled(
   -     product: AdaptyPaywallProduct,
   -     context: Context,
   - ) {}
   ```

3. Remove  `onPurchaseSuccess`:

   ```diff showLineNumbers
   
   - public override fun onPurchaseSuccess(
   -     profile: AdaptyProfile?,
   -     product: AdaptyPaywallProduct,
   -   context: Context,
   - ) {
   -     // Your logic on successful purchase
   - }
   ```

## Change the signature of  onAwaitingSubscriptionUpdateParams method

Now if a new subscription is purchased while another is still active, call `onSubscriptionUpdateParamsReceived(AdaptySubscriptionUpdateParameters...))` if the new subscription should replace a currently active subscription or `onSubscriptionUpdateParamsReceived(null)` if the active subscription should remain active and the new one should be added separately:

 ```diff showLineNumbers
- public override fun onAwaitingSubscriptionUpdateParams(
-     product: AdaptyPaywallProduct,
-     context: Context,
- ): AdaptySubscriptionUpdateParameters? {
-     return AdaptySubscriptionUpdateParameters(...)
- }
+ public override fun onAwaitingSubscriptionUpdateParams(
+     product: AdaptyPaywallProduct,
+     context: Context,
+     onSubscriptionUpdateParamsReceived: SubscriptionUpdateParamsCallback,
+ ) {
+     onSubscriptionUpdateParamsReceived(AdaptySubscriptionUpdateParameters(...))
+ }
 ```

See the [Upgrade subscription](android-handling-events#upgrade-subscription) doc section for the final code example.

## Update providing fallback paywalls

If you pass file URI to provide fallback paywalls, update how you do it in the following way:

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```diff showLineNumbers
val fileUri: Uri = // Get the URI for the file with fallback paywalls
- Adapty.setFallbackPaywalls(fileUri, callback)
+ Adapty.setFallbackPaywalls(FileLocation.fromFileUri(fileUri), callback)
```

</TabItem>
<TabItem value="java" label="Java" default>

```diff showLineNumbers
Uri fileUri = // Get the URI for the file with fallback paywalls
- Adapty.setFallbackPaywalls(fileUri, callback);
+ Adapty.setFallbackPaywalls(FileLocation.fromFileUri(fileUri), callback);
```

</TabItem>
</Tabs>

## Update third-party integration SDK configuration

To ensure integrations work properly with Adapty Android SDK 3.3.0 and later, update your SDK configurations for the following integrations as described in the sections below. 

### Adjust

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Adjust integration](adjust#sdk-configuration).

<Tabs>

<TabItem value="v5" label="Adjust 5.x+" default>

```diff showLineNumbers
- Adjust.getAttribution { attribution ->
-     if (attribution == null) return@getAttribution
-
-     Adjust.getAdid { adid ->
-         if (adid == null) return@getAdid
-
-         Adapty.updateAttribution(attribution, AdaptyAttributionSource.ADJUST, adid) { error ->
-             // Handle the error
-         }
-     }
- }

+ Adjust.getAdid { adid ->
+     if (adid == null) return@getAdid
+
+     Adapty.setIntegrationIdentifier("adjust_device_id", adid) { error ->
+         if (error != null) {
+             // Handle the error
+         }
+     }
+ }
+
+ Adjust.getAttribution { attribution ->
+     if (attribution == null) return@getAttribution
+
+     Adapty.updateAttribution(attribution, "adjust") { error ->
+         if (error != null) {
+             // Handle the error
+         }
+     }
+ }
```

</TabItem>

<TabItem value="v4" label="Adjust 4.x" default>

```diff showLineNumbers
 val config = AdjustConfig(context, adjustAppToken, environment)
 config.setOnAttributionChangedListener { attribution ->
     attribution?.let { attribution ->
-         Adapty.updateAttribution(attribution, AdaptyAttributionSource.ADJUST) { error ->
+         Adapty.updateAttribution(attribution, "adjust") { error ->
             if (error != null) {
                 // Handle the error
             }
         }
     }
 }
 Adjust.onCreate(config)
```

</TabItem>
</Tabs>

### AirBridge

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AirBridge integration](airbridge#sdk-configuration).

```diff showLineNumbers
 Airbridge.getDeviceInfo().getUUID(object: AirbridgeCallback.SimpleCallback<String>() {
     override fun onSuccess(result: String) {
-         val params = AdaptyProfileParameters.Builder()
-             .withAirbridgeDeviceId(result)
-             .build()
-         Adapty.updateProfile(params) { error ->
-             if (error != null) {
-                 // Handle the error
-             }
-         }
+         Adapty.setIntegrationIdentifier("airbridge_device_id", result) { error ->
+             if (error != null) {
+                 // Handle the error
+             }
+         }
     }
     override fun onFailure(throwable: Throwable) {
     }
 })
```

### Amplitude

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Amplitude integration](amplitude#sdk-configuration).

```diff showLineNumbers
 // For Amplitude maintenance SDK (obsolete)
 val amplitude = Amplitude.getInstance()
 val amplitudeDeviceId = amplitude.getDeviceId()
 val amplitudeUserId = amplitude.getUserId()

 //for actual Amplitude Kotlin SDK
 val amplitude = Amplitude(
     Configuration(
         apiKey = AMPLITUDE_API_KEY,
         context = applicationContext
     )
 )
 val amplitudeDeviceId = amplitude.store.deviceId
 val amplitudeUserId = amplitude.store.userId

 //

- val params = AdaptyProfileParameters.Builder()
-     .withAmplitudeDeviceId(amplitudeDeviceId)
-     .withAmplitudeUserId(amplitudeUserId)
-     .build()
- Adapty.updateProfile(params) { error ->
-     if (error != null) {
-         // Handle the error
-     }
- }

+ Adapty.setIntegrationIdentifier("amplitude_user_id", amplitudeUserId) { error ->
+     if (error != null) {
+         // Handle the error
+     }
+ }

+ Adapty.setIntegrationIdentifier("amplitude_device_id", amplitudeDeviceId) { error ->
+     if (error != null) {
+         // Handle the error
+     }
+ }
```

### AppMetrica

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppMetrica integration](appmetrica#sdk-configuration).

```diff showLineNumbers
 val startupParamsCallback = object: StartupParamsCallback {
     override fun onReceive(result: StartupParamsCallback.Result?) {
         val deviceId = result?.deviceId ?: return

-        val params = AdaptyProfileParameters.Builder()
-            .withAppmetricaDeviceId(deviceId)
-            .withAppmetricaProfileId("YOUR_ADAPTY_CUSTOMER_USER_ID")
-            .build()
-        Adapty.updateProfile(params) { error ->
-            if (error != null) {
-                // Handle the error
-            }
-        }

+        Adapty.setIntegrationIdentifier("appmetrica_device_id", deviceId) { error ->
+            if (error != null) {
+                // Handle the error
+            }
+        }
+        
+        Adapty.setIntegrationIdentifier("appmetrica_profile_id", "YOUR_ADAPTY_CUSTOMER_USER_ID") { error ->
+            if (error != null) {
+                // Handle the error
+            }
+        }
     }

     override fun onRequestError(
         reason: StartupParamsCallback.Reason,
         result: StartupParamsCallback.Result?
     ) {
         // Handle the error
     }
 }

 AppMetrica.requestStartupParams(context, startupParamsCallback, listOf(StartupParamsCallback.APPMETRICA_DEVICE_ID))
```

### AppsFlyer

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for AppsFlyer integration](appsflyer#sdk-configuration).

```diff showLineNumbers
 val conversionListener: AppsFlyerConversionListener = object : AppsFlyerConversionListener {
     override fun onConversionDataSuccess(conversionData: Map<String, Any>) {
-        Adapty.updateAttribution(
-            conversionData,
-            AdaptyAttributionSource.APPSFLYER,
-            AppsFlyerLib.getInstance().getAppsFlyerUID(context)
-        ) { error ->
-            if (error != null) {
-                // Handle the error
-            }
-        }

+        val uid = AppsFlyerLib.getInstance().getAppsFlyerUID(context)
+        Adapty.setIntegrationIdentifier("appsflyer_id", uid) { error ->
+            if (error != null) {
+                // Handle the error
+            }
+        }
+        Adapty.updateAttribution(conversionData, "appsflyer") { error ->
+            if (error != null) {
+                // Handle the error
+            }
+        }
     }
 }
```

### Branch

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Branch integration](branch#sdk-configuration).

```diff showLineNumbers
// Login and update attribution
 Branch.getAutoInstance(this)
   .setIdentity("YOUR_USER_ID") { referringParams, error ->
       referringParams?.let { data ->
-            Adapty.updateAttribution(data, AdaptyAttributionSource.BRANCH) { error ->
-                if (error != null) {
-                    // Handle the error
-                }
-            }
+            Adapty.updateAttribution(data, "branch") { error ->
+                if (error != null) {
+                    // Handle the error
+                }
+            }
       }
   }

 // Logout
 Branch.getAutoInstance(context).logout()
```

### Facebook Ads

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Facebook Ads integration](facebook-ads#sdk-configuration).

```diff showLineNumbers
- val builder = AdaptyProfileParameters.Builder()
-     .withFacebookAnonymousId(AppEventsLogger.getAnonymousAppDeviceGUID(context))
-   
- Adapty.updateProfile(builder.build()) { error ->
-     if (error != null) {
-        // Handle the error
-     }
- }

+ Adapty.setIntegrationIdentifier(
+     "facebook_anonymous_id",
+     AppEventsLogger.getAnonymousAppDeviceGUID(context)
+ ) { error ->
+     if (error != null) {
+        // Handle the error
+     }
+ }
```

### Firebase and Google Analytics

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Firebase and Google Analytics integration](firebase-and-google-analytics).

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```diff showLineNumbers
 // After Adapty.activate()

 FirebaseAnalytics.getInstance(context).appInstanceId.addOnSuccessListener { appInstanceId ->
-    Adapty.updateProfile(
-        AdaptyProfileParameters.Builder()
-            .withFirebaseAppInstanceId(appInstanceId)
-            .build()
-    ) { error ->
-        if (error != null) {
-            // Handle the error
-        }
-    }
+    Adapty.setIntegrationIdentifier("firebase_app_instance_id", appInstanceId) { error ->
+        if (error != null) {
+            // Handle the error
+        }
+    }
 }
```

</TabItem>
<TabItem value="java" label="Java" default>

```diff showLineNumbers
// After Adapty.activate()

- FirebaseAnalytics.getInstance(context).getAppInstanceId().addOnSuccessListener(appInstanceId -> {
-     AdaptyProfileParameters params = new AdaptyProfileParameters.Builder()
-         .withFirebaseAppInstanceId(appInstanceId)
-         .build();
-     
-     Adapty.updateProfile(params, error -> {
-         if (error != null) {
-             // Handle the error
-         }
-     });
- });

+ FirebaseAnalytics.getInstance(context).getAppInstanceId().addOnSuccessListener(appInstanceId -> {
+     Adapty.setIntegrationIdentifier("firebase_app_instance_id", appInstanceId, error -> {
+        if (error != null) {
+            // Handle the error
+         }
+     });
+ });
```

</TabItem>
</Tabs>

### Mixpanel

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Mixpanel integration](mixpanel#sdk-configuration).

```diff showLineNumbers
- val params = AdaptyProfileParameters.Builder()
-     .withMixpanelUserId(mixpanelAPI.distinctId)
-     .build()
-
- Adapty.updateProfile(params) { error ->
-     if (error != null) {
-         // Handle the error
-     }
- }

+ Adapty.setIntegrationIdentifier("mixpanel_user_id", mixpanelAPI.distinctId) { error ->
+     if (error != null) {
+         // Handle the error
+     }
+ }
```

### OneSignal

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for OneSignal integration](onesignal#sdk-configuration).

<Tabs> 

<TabItem value="v5+" label="OneSignal SDK v5+ (current)" default> 

<Tabs> 

<TabItem value="kotlin" label="Android (Kotlin)" default>

```diff showLineNumbers
 // SubscriptionID 
 val oneSignalSubscriptionObserver = object: IPushSubscriptionObserver {
     override fun onPushSubscriptionChange(state: PushSubscriptionChangedState) {
-        val params = AdaptyProfileParameters.Builder()
-            .withOneSignalSubscriptionId(state.current.id)
-            .build()
-        
-        Adapty.updateProfile(params) { error ->
+        Adapty.setIntegrationIdentifier("one_signal_subscription_id", state.current.id) { error ->
             if (error != null) {
                 // Handle the error
             }
        }
     }
 }
```

</TabItem>
<TabItem value="java" label="(Android) Java" default>

```diff showLineNumbers
 // SubscriptionID 
 IPushSubscriptionObserver oneSignalSubscriptionObserver = state -> {
-    AdaptyProfileParameters params = new AdaptyProfileParameters.Builder()
-            .withOneSignalSubscriptionId(state.getCurrent().getId())
-            .build();
-    Adapty.updateProfile(params, error -> {
+    Adapty.setIntegrationIdentifier("one_signal_subscription_id", state.getCurrent().getId(), error -> {
         if (error != null) {
             // Handle the error
         }
     });
 };
```

</TabItem>  
</Tabs>

</TabItem> 

<TabItem value="pre-v5" label="OneSignal SDK v. up to 4.x (legacy)" default> 

<Tabs>

<TabItem value="kotlin" label="Android (Kotlin)" default>

```diff showLineNumbers
 // PlayerID 
 val osSubscriptionObserver = OSSubscriptionObserver { stateChanges ->
     stateChanges?.to?.userId?.let { playerId ->
-        val params = AdaptyProfileParameters.Builder()
-            .withOneSignalPlayerId(playerId)
-            .build()
-      
-        Adapty.updateProfile(params) { error ->
+        Adapty.setIntegrationIdentifier("one_signal_player_id", playerId) { error ->
             if (error != null) {
                 // Handle the error
             }
-        }
     }
 }
```

</TabItem>
<TabItem value="java" label="Java" default>

```diff showLineNumbers
 // PlayerID 
 OSSubscriptionObserver osSubscriptionObserver = stateChanges -> {
     OSSubscriptionState to = stateChanges != null ? stateChanges.getTo() : null;
     String playerId = to != null ? to.getUserId() : null;
     
     if (playerId != null) {
-        AdaptyProfileParameters params1 = new AdaptyProfileParameters.Builder()
-                .withOneSignalPlayerId(playerId)
-                .build();
-        
-        Adapty.updateProfile(params1, error -> {
+        Adapty.setIntegrationIdentifier("one_signal_player_id", playerId, error -> {
             if (error != null) {
                 // Handle the error
             }
-        });
     }
 };
```

</TabItem> 

</Tabs>

 </TabItem> 

</Tabs> 

### Pushwoosh

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Pushwoosh integration](pushwoosh#sdk-configuration).

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```diff showLineNumbers
- val params = AdaptyProfileParameters.Builder()
-     .withPushwooshHwid(Pushwoosh.getInstance().hwid)
-     .build()
  
- Adapty.updateProfile(params) { error ->
+ Adapty.setIntegrationIdentifier("pushwoosh_hwid", Pushwoosh.getInstance().hwid) { error ->
     if (error != null) {
         // Handle the error
     }
  }
```

</TabItem> <TabItem value="java" label="Java" default>

```diff showLineNumbers
- AdaptyProfileParameters params = new AdaptyProfileParameters.Builder()
-     .withPushwooshHwid(Pushwoosh.getInstance().getHwid())
-     .build();
-
- Adapty.updateProfile(params, error -> {
+ Adapty.setIntegrationIdentifier("pushwoosh_hwid", Pushwoosh.getInstance().getHwid(), error -> {
     if (error != null) {
         // Handle the error
     }
  });
```

</TabItem> 

</Tabs>
