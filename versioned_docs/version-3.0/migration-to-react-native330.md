---
title: "Migration guide to Adapty Flutter SDK 3.3.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.3.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Upgrade to Adapty SDK v3.3.x.
2. Update the method for providing fallback paywalls.
3. Update integration configurations for Adjust, AirBridge, Amplitude, AppMetrica, Appsflyer, Branch, Facebook Ads, Firebase and Google Analytics, Mixpanel, OneSignal, Pushwoosh.
4. Update Observer mode implementation.

## Upgrade Adapty React Native SDK to 3.3.x

Up to this version, Adapty SDK was the core and mandatory SDK necessary for the proper functioning of Adapty within your app, and AdaptyUI SDK was an optional SDK that becomes necessary only if you use the Adapty Paywall builder.

Starting with version 3.3.0, AdaptyUI SDK is deprecated, and AdaptyUI is merged to Adapty SDK as a module. Because of these changes, you need to remove AdaptyUISDK and reinstall AdaptySDK.

1. Remove both **AdaptySDK** and **AdaptyUISDK** package dependencies from your project.
2. Delete the **AdaptySDK** and **AdaptyUISDK** folders.
3. Import the AdaptySDK package again as described in the [Adapty SDK installation & configuration for React Native](sdk-installation-reactnative) page.

## Update method for providing fallback paywalls

Previously, the method required the fallback paywall as a JSON string (`jsonString`), but now it takes the path to the local fallback file (`assetId`) instead.

```diff
.
```

For the complete code example, check out the [Use fallback paywalls](flutter-use-fallback-paywalls) page.

## Update 3d-party integration SDK configuration

To ensure integrations work properly with Adapty Flutter SDK 3.3.0 and later, update your SDK configurations for the following integrations as described in the sections below. 

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

```diff
 .
```

