---
title: "Migration guide to Android Adapty SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Update the making purchase in the paywalls designed without Paywall Builder. Remove processing of error codes `USER_CANCELLED` and `PENDING_PURCHASE`.
2. For Paywall Builder paywalls: Replace the `onPurchaseCanceled` and `onPurchaseSuccess` paywall builder events with the `onPurchaseFinished` event. Because a canceled purchase is not treated as an error anymore and is added to a non-error purchase result.
3. For Paywall Builder paywalls: Change the method signature of  `onAwaitingSubscriptionUpdateParams`.
4. Update the method for providing fallback paywalls.
5. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.

## Update making purchase

Previously canceled and pending purchases were considered errors and returned the `USER_CANCELED` and `PENDING_PURCHASE` codes, respectively.  

Now a new `AdaptyPurchaseResult` class is used to process canceled, successful, and pending purchases. Update the code of purchasing in the following way:

~~~diff title="Kotlin"
 Adapty.makePurchase(activity, product) { result ->
     when (result) {
         is AdaptyResult.Success -> {
-            val info = result.value
-            //NOTE: info is null in case of cross-grade with DEFERRED proration mode
-            val profile = info?.profile
-        
-            if (profile?.accessLevels?.get("YOUR_ACCESS_LEVEL")?.isActive == true) {
-                // grant access to premium features
+            when (val purchaseResult = result.value) {
+                is AdaptyPurchaseResult.Success -> {
+                    val profile = purchaseResult.profile
+                    if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true) {
+                        // grant access to premium features
+                    }
+                }
+
+                is AdaptyPurchaseResult.UserCanceled -> {
+                    // user canceled the purchase flow
+                }
+
+                is AdaptyPurchaseResult.Pending -> {
+                    // the purchase has not been finished yet, e.g. user will pay offline by cash
+                }
+            }
         }
         is AdaptyResult.Error -> {
             val error = result.error
             // handle the error
         }
     }
 }
~~~

## Add canceled purchase to non-error result

1. Add `onPurchaseFinished` event:

   ```diff
   + public override fun onPurchaseFinished(
   +     purchaseResult: AdaptyPurchaseResult,
   +     product: AdaptyPaywallProduct,
   +     context: Context,
   + ) {
   +    when (purchaseResult) {
   +        is AdaptyPurchaseResult.Success -> {
   +            // success
   +        }
   +        is AdaptyPurchaseResult.UserCanceled -> {
   +            // user canceled the purchase flow
   +        }
   +        is AdaptyPurchaseResult.Pending -> {
   +            // pending purchase
   +        }
   +    }
   + }
   ```

2. Remove processing of the `onPurchaseCancelled` event:

   ```diff
   - public override fun onPurchaseCanceled(
   -     product: AdaptyPaywallProduct,
   -     context: Context,
   - ) {}
   ```

3. Remove  `onPurchaseSuccess`:

   ```diff
   
   - public override fun onPurchaseSuccess(
   -     profile: AdaptyProfile?,
   -     product: AdaptyPaywallProduct,
   -   context: Context,
   - ) {
   -     // your logic on successful purchase
   - }
   ```

## Change the signature of  onAwaitingSubscriptionUpdateParams method

Now if a new subscription is purchased while another is still active, call `onSubscriptionUpdateParamsReceived(...)` either with `AdaptySubscriptionUpdateParameters` instance if the new subscription should replace a currently active subscription or with `null` if the active subscription should remain active and the new one should be added separately:

 ```diff
 public override fun onAwaitingSubscriptionUpdateParams(
     product: AdaptyPaywallProduct,
     context: Context,
-): AdaptySubscriptionUpdateParameters? {
-    return AdaptySubscriptionUpdateParameters(...)
+    onSubscriptionUpdateParamsReceived: SubscriptionUpdateParamsCallback,
+) {
+    onSubscriptionUpdateParamsReceived(AdaptySubscriptionUpdateParameters(...))
 }
 ```

See the [Upgrade subscription](android-handling-events#upgrade-subscription) doc section for the final code example.

## Update providing fallback paywalls

If you pass file Uri to provide fallback paywalls, update how you do it in the following way:

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```diff
val fileUri: Uri = //get Uri for the file with fallback paywalls
- Adapty.setFallbackPaywalls(fileUri, callback)
+ Adapty.setFallbackPaywalls(FileLocation.fromFileUri(fileUri), callback)
```

</TabItem>
<TabItem value="java" label="Java" default>

```diff
Uri fileUri = //get Uri for the file with fallback paywalls
- Adapty.setFallbackPaywalls(fileUri, callback);
+ Adapty.setFallbackPaywalls(FileLocation.fromFileUri(fileUri), callback);
```

</TabItem>
</Tabs>

## Update third-party integration SDK configuration

To ensure integrations work properly with Adapty iOS SDK 3.3.0 and later, update your SDK configurations for the following integrations as described in the sections below. 

### Adjust

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Adjust integration](adjust#sdk-configuration).

<Tabs>

<TabItem value="v5" label="Adjust 5.x+" default>

```diff
 ...
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

## OneSignal

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for OneSignal integration](onesignal#sdk-configuration).

```diff
.
```

### Pushwoosh

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Pushwoosh integration](pushwoosh#sdk-configuration).

```diff
.
```

## Update Observer mode implemetation

Update how you link paywalls to transactions. Previously, you used the `setVariationId` method to assign the `variationId`. Now, you can include the `variationId` directly when recording the transaction using the new `reportTransaction` method. Check out the final code example in the [Associate paywalls with purchase transactions in Observer mode](associate-paywalls-to-transactions).

:::warning

Don't forget to record the transaction using the `reportTransaction` method. Skipping this step means Adapty won't recognize the transaction, won't grant access levels, won't include it in analytics, and won't send it to integrations. This step is essential!

:::

```diff
.
```

