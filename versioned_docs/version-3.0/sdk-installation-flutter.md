---
title: "Flutter - Adapty SDK installation & configuration"
description: "Step-by-step guide on installing Adapty SDK on Flutter for subscription-based apps."
metadataTitle: "Installing Adapty SDK on Flutter | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk flutter', 'flutter sdk', 'cross platform']
rank: 75
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import GetKey from '@site/src/components/reusable/GetKey.md';

Adapty SDK includes two key modules for seamless integration into your Flutter app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This optional module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls.

:::tip
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our [sample app](https://github.com/adaptyteam/AdaptySDK-Flutter/tree/master/example), which demonstrates the full setup, including displaying paywalls, making purchases, and other basic functionality.
:::

## Requirements

Adapty SDK supports iOS 13.0+, but requires iOS 15.0+ to work properly with paywalls created in the paywall builder.

:::info
Adapty supports Google Play Billing Library up to 7.x. Support for [Billing Library 8.0.0 (released 30 June, 2025)](https://developer.android.com/google/play/billing/release-notes#8-0-0) is planned.
:::

## Install Adapty SDK

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Flutter.svg?style=flat&logo=flutter)](https://github.com/adaptyteam/AdaptySDK-Flutter/releases)

1. Add Adapty to your `pubspec.yaml` file:

   ```yaml showLineNumbers title="pubspec.yaml"
   dependencies: 
     adapty_flutter: ^<the latest SDK version>
   ```

2. Run the following command to install dependencies:

   ```bash showLineNumbers title="Terminal"
   flutter pub get
   ```

3. Import Adapty SDKs in your application:

   ```dart showLineNumbers title="main.dart"
   import 'package:adapty_flutter/adapty_flutter.dart';
   ```

## Activate Adapty module of Adapty SDK

```dart showLineNumbers title="main.dart"
import 'package:adapty_flutter/adapty_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Configure and activate Adapty SDK
  await Adapty().activate(
    configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
  );
  
  runApp(MyApp());
}
```

<GetKey />


## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](adapty-paywall-builder.md) and have [installed AdaptyUI module](sdk-installation-flutter#install-adapty-sdk), you also need to activate AdaptyUI:

:::important
In your code, you must activate the core Adapty module before activating AdaptyUI.
:::

```dart showLineNumbers title="main.dart"
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withActivateUI(true), // This automatically activates AdaptyUI
);
```

## Platform-specific configuration

<Tabs>
<TabItem value="ios" label="iOS" default>

Create `Adapty-Info.plist` and add it to your iOS project. Add the following configuration:

```xml showLineNumbers title="ios/Runner/Adapty-Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>AdaptyPublicSdkKey</key>
    <string>YOUR_PUBLIC_SDK_KEY</string>
    <key>AdaptyObserverMode</key>
    <false/>
    <key>AdaptyAppleIdfaCollectionDisabled</key>
    <false/>
</dict>
</plist>
```

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **AdaptyPublicSdkKey** | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **AdaptyObserverMode** | optional | A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`. 🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it. |
| **AdaptyAppleIdfaCollectionDisabled** | optional | A boolean parameter that allows you to disable Apple IDFA collection for your iOS app. The default value is `false`. For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers) section. |

</TabItem>

<TabItem value="android" label="Android">
Add the following configuration to your `AndroidManifest.xml`:

```xml showLineNumbers title="android/app/src/main/AndroidManifest.xml"
<application ...>
    <!-- ... other configurations ... -->
    
    <meta-data
        android:name="AdaptyPublicSdkKey"
        android:value="YOUR_PUBLIC_SDK_KEY" />
    <meta-data
        android:name="AdaptyObserverMode"
        android:value="false" />
    <meta-data
        android:name="AdaptyGoogleAdvertisingIdCollectionDisabled"
        android:value="false" />
</application>
```

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **AdaptyPublicSdkKey** | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general). Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only. |
| **AdaptyObserverMode** | optional | A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`. 🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it. |
| **AdaptyGoogleAdvertisingIdCollectionDisabled** | optional | A boolean parameter that allows you to disable Google Advertising ID collection for your app. The default value is `false`. For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers) section. |

</TabItem>
</Tabs>

## Optional setup

### Logging

#### Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. There are the following levels available:

| Level                    | Description                                                                                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `AdaptyLogLevel.none`    | Nothing will be logged. Default value                                                                                     |
| `AdaptyLogLevel.error`   | Only errors will be logged                                                                                                |
| `AdaptyLogLevel.warn`    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.     |
| `AdaptyLogLevel.info`    | Errors, warnings, and various information messages will be logged.                                                        |
| `AdaptyLogLevel.verbose` | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged. |

You can set the log level in your app before configuring Adapty:

```dart showLineNumbers title="main.dart"
// Set log level before activation
await Adapty().setLogLevel(AdaptyLogLevel.verbose);

// Or set it during configuration
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withLogLevel(AdaptyLogLevel.verbose),
);
```

### Data policies

#### Disable IP address collection and sharing

When activating the Adapty module, set `ipAddressCollectionDisabled` to `true` to disable user IP address collection and sharing. The default value is `false`.

Use this parameter to enhance user privacy, comply with regional data protection regulations (like GDPR or CCPA), or reduce unnecessary data collection when IP-based features aren't required for your app.

```dart showLineNumbers title="main.dart"
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withIpAddressCollectionDisabled(true),
);
```

#### Disable advertising ID collection and sharing

When activating the Adapty module, set `appleIdfaCollectionDisabled` (iOS) or `googleAdvertisingIdCollectionDisabled` (Android) to `true` to disable the collection of advertising identifiers. The default value is `false`.

Use this parameter to comply with App Store/Play Store policies, avoid triggering the App Tracking Transparency prompt, or if your app does not require advertising attribution or analytics based on advertising IDs.

```dart showLineNumbers title="main.dart"
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withAppleIdfaCollectionDisabled(true)      // iOS
    ..withGoogleAdvertisingIdCollectionDisabled(true), // Android
);
```

#### Set up media cache configuration for AdaptyUI

The module is activated automatically with the Adapty SDK. If you do not use the Paywall Builder and want to deactivate the AdaptyUI module, pass `withActivateUI(false)` during activation.

By default, AdaptyUI caches media (such as images and videos) to improve performance and reduce network usage. You can customize the cache settings by providing a custom configuration.

Use `withMediaCacheConfiguration` to override the default cache size and validity period. This is optional—if you don't call this method, default values will be used (100MB disk size, unlimited memory count). However, if you use the configuration, all parameters must be included.

```dart showLineNumbers title="main.dart"
import 'package:adapty_flutter/adapty_flutter.dart';

final mediaCacheConfig = AdaptyUIMediaCacheConfiguration(
  memoryStorageTotalCostLimit: 200 * 1024 * 1024, // 200 MB
  memoryStorageCountLimit: 2147483647, // max int value
  diskStorageSizeLimit: 200 * 1024 * 1024, // 200 MB
);

await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withMediaCacheConfiguration(mediaCacheConfig),
);
```

**Parameters:**

| Parameter                | Presence | Description                                                                 |
|-------------------------|----------|-----------------------------------------------------------------------------|
| memoryStorageTotalCostLimit | optional | Total cache size in memory in bytes. Default is 100 MB.                       |
| memoryStorageCountLimit     | optional | The item count limit of the memory storage. Default is max int value.              |
| diskStorageSizeLimit        | optional | The file size limit on disk in bytes. Default is 100 MB.              |
