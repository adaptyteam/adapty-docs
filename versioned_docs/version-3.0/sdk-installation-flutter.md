---
title: "Flutter - Adapty SDK Installation and configuration"
description: "Install Adapty SDK in Flutter to handle subscriptions with ease."
metadataTitle: "Installing Adapty SDK in Flutter | Adapty Docs"
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

<Tabs> <TabItem value="3" label="v3.2.x and up (current)" default> 

Adapty SDK includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential module is required for Adapty to function properly in your app.
- **AdaptyUI**: This module is required if you’re using the Adapty Paywall Builder—a no-code, user-friendly tool for creating cross-platform paywalls. With a visual constructor right in the dashboard, you can build paywalls that run natively on devices and are designed to deliver high performance with minimal effort. 
  The module is installed and activated automatically with the Adapty SDK, but you can deactivate it if you don’t need it.

:::danger
Go through the release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDK

1. Add Adapty and AdaptyUI to your `pubspec.yaml` file:

   ```yaml showLineNumbers title="pubspec.yaml"
   dependencies:
   adapty_flutter: ^3.3.1
   ```

2. Run:

   ```bash showLineNumbers title="Bash"
   flutter pub get
   ```

## Configure Adapty SDK

You only need to configure the Adapty SDK once, typically early in your app's lifecycle.

### Activate Adapty module of Adapty SDK

1. Import Adapty SDKs in your application in the following way:

   ```dart showLineNumbers title="Dart"
   import 'package:adapty_flutter/adapty_flutter.dart';
   ```

2. Activate Adapty SDK with the following code:

   ```dart showLineNumbers title="Dart"
   try {
       await Adapty().activate(
           configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
             ..withLogLevel(AdaptyLogLevel.debug)
             ..withObserverMode(false)
             ..withCustomerUserId(null)
             ..withIpAddressCollectionDisabled(false)
             ..withIdfaCollectionDisabled(false),
       );
   } catch (e) {
       // handle the error
   }
   ```

Parameters:

| Parameter                           | Presence | Description                                                  |
| ----------------------------------- | -------- | ------------------------------------------------------------ |
| **PUBLIC_SDK_KEY**                  | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **withLogLevel**                    | optional | Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:<ul><li> error: Only errors will be logged.</li><li> warn: Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.</li><li> info: Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged.</li><li> verbose: Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.</li></ul> |
| **withObserverMode**                | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **withCustomerUserId**              | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. |
| **withIdfaCollectionDisabled**      | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa)   section.</p> |
| **withIpAddressCollectionDisabled** | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |

### Activation and configuration of AdaptyUI module of Adapty SDK

The module is activated automatically with the Adapty SDK.

You can configure AdaptyUI by passing `AdaptyUIMediaCacheConfiguration` to the `withMediaCacheConfiguration` method while building the `AdaptyConfiguration` object. Note that AdaptyUI configuration is optional, and you can proceed without it. However, if you use the configuration, all parameters must be included.

Parameters:

| Parameter                       | Presence | Description                                                  |
| :------------------------------ | :------- | :----------------------------------------------------------- |
| **memoryStorageTotalCostLimit** | required | The total cost limit of the storage in bytes.                |
| **memoryStorageCountLimit**     | required | The item count limit of the memory storage.                  |
| **diskStorageSizeLimit**        | required | The file size limit on disk of the storage in bytes. 0 means no limit. |

If you do not use the Paywall Builder and want to deactivate the AdaptyUI module, pass `withActivateUI(false)` during activation.

 </TabItem> <TabItem value="2" label="Up to v2.x (legacy)" default> 

Adapty comprises two crucial SDKs for seamless integration into your mobile app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall Builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version | AdaptyUI SDK version |
| :----------------- | :------------------- |
| 2.9.3              | 2.1.0                |
| 2.10.0             | 2.1.1                |
| 2.10.1             | 2.1.2                |
| 2.10.3             | 2.1.3                |

## Install Adapty SDK

1. Add the Adapty and AdaptyUI modules to your `pubspec.yaml` file:

   ```yaml showLineNumbers title="pubspec.yaml"
   dependencies:
   adapty_flutter: ^2.10.3
   adapty_ui_flutter: ^2.1.3
   ```

2. Run:

   ```bash showLineNumbers title="Bash"
   flutter pub get
   ```

3. Import Adapty modules in your application in the following way:

   ```dart showLineNumbers title="Dart"
   import 'package:adapty_flutter/adapty_flutter.dart';
   import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';
   ```

## Configure Adapty SDK

The configuration of the Adapty SDK for Flutter slightly differs depending on the mobile operating system (iOS or Android) you are going to release it for. 

### Configure Adapty SDK for iOS

Create `Adapty-Info.plist` and add it to your project. Add the flag `AdaptyPublicSdkKey` in this file with the value of your Public SDK key.

```xml showLineNumbers title="Adapty-Info.plist"
<dict>
    <key>AdaptyPublicSdkKey</key>
    <string>PUBLIC_SDK_KEY</string>
    <key>AdaptyObserverMode</key>
    <false/>
</dict>
```

Parameters:

| Parameter                  | Presence | Description                                                  |
| -------------------------- | -------- | ------------------------------------------------------------ |
| **AdaptyPublicSdkKey**     | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **AdaptyObserverMode**     | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. At any purchase or restore in your application, you'll need to call `.restorePurchases()` method to record the action in Adapty. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **idfaCollectionDisabled** | optional | <p>A boolean parameter, that allows you to disable IDFA collection for your iOS app. The default value is `false`.</p><p>For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa)  section.</p> |

### Configure Adapty SDK for Android

1. Add the `AdaptyPublicSdkKey` flag into the app’s `AndroidManifest.xml` \(Android) file with the value of your Public SDK key. 

   ```xml showLineNumbers title="AndroidManifest.xml"
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

| Parameter                    | Presence | Description                                                  |
| ---------------------------- | -------- | ------------------------------------------------------------ |
| PUBLIC_SDK_KEY               | required | <p>Contents of the **Public SDK key** field in the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard. **SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.</p><p>Make sure you use the **Public SDK key** for Adapty initialization, since the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.</p> |
| AdaptyObserverMode           | optional | <p>A boolean value that is controlling [Observer mode](observer-vs-full-mode) . Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| AdaptyIDFACollectionDisabled | optional | <p>A boolean parameter, that allows you to disable IDFA collection for your app. The default value is `false`.</p><p>For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa)   section.</p> |

   

2. In your application, add:

   ```javascript showLineNumbers title="Flutter"
   import 'package:adapty_flutter/adapty_flutter.dart';
   ```

3. Activate Adapty SDK with the following code:

   ```javascript showLineNumbers title="Flutter"
   try {
   	Adapty().activate();
   } on AdaptyError catch (adaptyError) {}
   } catch (e) {}
   ```

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to [display the paywalls](display-pb-paywalls) and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

### Set up the logging system

Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:

| Level   | Description                                                  |
| :------ | :----------------------------------------------------------- |
| error   | Only errors will be logged.                                  |
| warn    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged. |
| info    | Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged. |
| verbose | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged. |

You can set `logLevel` in your app before configuring Adapty.

```javascript showLineNumbers title="Flutter"
try {
	await Adapty().setLogLevel(AdaptyLogLevel.verbose);
} on AdaptyError catch (adaptyError) {
} catch (e) {}
```

 </TabItem> </Tabs>

:::danger
Read checklist before releasing the app

Before releasing your application, go through the  [Release Checklist](release-checklist) to ensure that you have completed all the steps, and also check the success of the integration using the criteria for assessing its success.
:::

