---
title: "Flutter - Adapty SDK Installation and configuration"
description: "Discover step-by-step instructions for installing and configuring Adapty SDK and AdaptyUI SDK on Flutter, enabling seamless integration of Adapty into your mobile app . Find the correct pair of SDKs with the compatibility table provided."
metadataTitle: "Flutter - Adapty SDK Installation and Configuration Guide"
---

Adapty comprises two crucial SDKs for seamless integration into your mobile app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version | AdaptyUI SDK version |
| :----------------- | :------------------- |
| 2.9.3              | 2.1.0                |
| 2.10.0             | 2.1.1                |
| 2.10.1             | 2.1.2                |
| 2.10.2             | 2.1.3                |

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDKs

1. Add Adapty and AdaptyUI to your `pubspec.yaml` file:

   ```yaml title="pubspec.yaml"
   dependencies:
   adapty_flutter: ^2.10.1
   adapty_ui_flutter: ^2.1.1
   ```

2. Run:

   ```bash title="Bash"
   flutter pub get
   ```

3. Import Adapty SDKs in your application in the following way:

   ```dart title="Dart"
   import 'package:adapty_flutter/adapty_flutter.dart';
   import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';
   ```

## Configure Adapty SDKs

The configuration of the Adapty SDK for Flutter slightly differs depending on the mobile operating system (iOS or Android) you are going to release it for. 

### Configure Adapty SDKs for iOS

Create `Adapty-Info.plist` and add it to your project. Add the flag `AdaptyPublicSdkKey` in this file with the value of your Public SDK key.

```xml title="Adapty-Info.plist"
<dict>
    <key>AdaptyPublicSdkKey</key>
    <string>PUBLIC_SDK_KEY</string>
    <key>AdaptyObserverMode</key>
    <false/>
</dict>
```

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **AdaptyPublicSdkKey** | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **AdaptyObserverMode** | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. At any purchase or restore in your application, you'll need to call `.restorePurchases()` method to record the action in Adapty. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **idfaCollectionDisabled** | optional | <p>A boolean parameter, that allows you to disable IDFA collection for your iOS app. The default value is `false`.</p><p>For more details, refer to the [Analytics integration](analytics-integration#react-native)  section.</p> |


### Configure Adapty SDKs for Android

1. Add the `AdaptyPublicSdkKey` flag into the app’s `AndroidManifest.xml` \(Android) file with the value of your Public SDK key. 

   ```xml title="AndroidManifest.xml"
   <application ...>
       ...
       <meta-data
              android:name="AdaptyPublicSdkKey"
              android:value="PUBLIC_SDK_KEY" />
     	<meta-data
              android:name="AdaptyObserverMode"
              android:value="false" />
   </application>
   ```

   Required parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| PUBLIC_SDK_KEY | required | <p>Contents of the **Public SDK key** field in the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard. **SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.</p><p>Make sure you use the **Public SDK key** for Adapty initialization, since the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.</p> |
| AdaptyObserverMode | optional | <p>A boolean value that is controlling [Observer mode](observer-vs-full-mode) . Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| AdaptyIDFACollectionDisabled | optional | <p>A boolean parameter, that allows you to disable IDFA collection for your app. The default value is `false`.</p><p>For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa)   section.</p> |

   

2. In your application, add:

   ```javascript title="Flutter"
   import 'package:adapty_flutter/adapty_flutter.dart';
   ```

3. Activate Adapty SDK with the following code:

   ```javascript title="Flutter"
   try {
   	Adapty().activate();
   } on AdaptyError catch (adaptyError) {}
   } catch (e) {}
   ```

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to [display the paywalls](display-pb-paywalls) and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

### Set up the logging system

Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:

| Level   | Description                                                                                                                 |
| :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| error   | Only errors will be logged.                                                                                                 |
| warn    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.       |
| info    | Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged. |
| verbose | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.   |

You can set `logLevel` in your app before configuring Adapty.

```javascript title="Flutter"
try {
	await Adapty().setLogLevel(AdaptyLogLevel.verbose);
} on AdaptyError catch (adaptyError) {
} catch (e) {}
```

:::danger
Read checklist before releasing the app

Before releasing your application, go through the  [Release Checklist](release-checklist) to ensure that you have completed all the steps, and also check the success of the integration using the criteria for assessing its success.
:::