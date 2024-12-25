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
6. изменилась сигнатура `UpdateAttribution` - будет отдельный коммент по этой части как для флаттера
7. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.

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
