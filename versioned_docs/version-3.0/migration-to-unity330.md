---
title: "Migration guide to Adapty Unity SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Upgrade to Adapty SDK v3.3.x.
2. Rename:
   - Adapty.sdkVersion -> Adapty.SDKVersion
   - Adapty.LogLevel -> AdaptyLogLevel
   - Adapty.Paywall -> AdaptyPaywall
   - Adapty.PaywallFetchPolicy -> AdaptyPaywallFetchPolicy
   - PaywallProduct -> AdaptyPaywallProduct
   - Adapty.Profile -> AdaptyProfile
   - Adapty.ProfileParameters -> AdaptyProfileParameters
   - ProfileGender -> AdaptyProfileGender
   - Error -> AdaptyError
3. From now on, the `SetLogLevel` method accepts a callback as an argument.
4. From now on, the `PresentCodeRedemptionSheet` method accepts a callback as an argument.
5. Remove the `GetProductsIntroductoryOfferEligibility` method.
6. Save fallback paywalls to separate files (one per platform) in `Assets/StreamingAssets/` and pass the file names to the `SetFallbackPaywalls` method.
7. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh. изменилась сигнатура `UpdateAttribution` - будет отдельный коммент по этой части как для флаттера

## Upgrade Adapty Unity SDK to 3.3.x

## Renamings



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

## Remove the `GetProductsIntroductoryOfferEligibility` method

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



## Update 3d-party integration SDK configuration

Starting with Adapty iOS SDK 3.3.0, we’ve updated the public API for the `updateAttribution` method. Previously, it accepted a `[AnyHashable: Any]` dictionary, allowing you to pass attribution objects directly from various services. Now, it requires a `[String: any Sendable]`, so you’ll need to convert attribution objects before passing them.

To ensure integrations work properly with Adapty iOS SDK 3.3.0 and later, update your SDK configurations for the following integrations as described in the sections below.

### Adjust

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Adjust integration](adjust#sdk-configuration).

<Tabs>

<TabItem value="v5" label="Adjust 5.x+" default>

```diff
.
```

</TabItem>

<TabItem value="v4" label="Adjust 4.x" default>

```diff
.
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

### Facebook Ads

Update your mobile app code as shown below. For the complete code example, check out the [SDK configuration for Facebook Ads integration](facebook-ads#sdk-configuration).

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
