---
title: "Legacy installation guide"
description: "Get started with Adapty on Flutter to streamline subscription setup and management."
metadataTitle: "Getting Started with Flutter | Adapty Docs"
displayed_sidebar: sdkflutter
---

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

| Parameter              | Presence | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| AdaptyPublicSdkKey     | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| AdaptyObserverMode     | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. At any purchase or restore in your application, you'll need to call `.restorePurchases()` method to record the action in Adapty. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| idfaCollectionDisabled | optional | <p>A boolean parameter, that allows you to disable IDFA collection for your iOS app. The default value is `false`.</p><p>For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers)  section.</p> |

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
| AdaptyIDFACollectionDisabled | optional | <p>A boolean parameter, that allows you to disable IDFA collection for your app. The default value is `false`.</p><p>For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers)   section.</p> |



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

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to display the paywalls and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

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
