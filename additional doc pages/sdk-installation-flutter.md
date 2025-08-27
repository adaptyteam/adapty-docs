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

:::info
If you're using an older version of Adapty SDK and want to upgrade to version 3.x, we recommend following our [Migration guide to Adapty SDK v.3.x or later](migration-to-adapty-sdk-v3).
:::

## Requirements

- **Flutter 3.0.0+**
- **Dart 3.0.0+**
- **iOS 13.0+** (for iOS builds)
- **Android API 19+** (for Android builds)
- **Xcode 15.0+** (for iOS development)
- **Android Studio / Gradle** (for Android development)

:::note
While the core Adapty SDK supports iOS 13.0+ and Android API 19+, AdaptyUI requires iOS 15.0+ and Android API 21+ for full functionality.
:::

## Install Adapty SDK

1. Add Adapty and AdaptyUI to your `pubspec.yaml` file:

   ```yaml showLineNumbers title="pubspec.yaml"
   dependencies:
     flutter:
       sdk: flutter
     
     # Core Adapty SDK (required)
     adapty_flutter: ^3.8.0
     
     # AdaptyUI SDK (optional - only if you plan to use Paywall Builder)
     adapty_ui_flutter: ^3.8.0
   ```

2. Run the following command to install dependencies:

   ```bash showLineNumbers title="Terminal"
   flutter pub get
   ```

3. Import Adapty SDKs in your application:

   ```dart showLineNumbers title="main.dart"
   import 'package:adapty_flutter/adapty_flutter.dart';
   import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';
   ```

## Activate Adapty module of Adapty SDK

### Basic setup

```dart showLineNumbers title="main.dart"
import 'package:adapty_flutter/adapty_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Configure and activate Adapty SDK
  await Adapty().activate(
    configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
      ..withLogLevel(AdaptyLogLevel.verbose)
      ..withObserverMode(false)
      ..withCustomerUserId(null)
      ..withIpAddressCollectionDisabled(false)
      ..withAppleIdfaCollectionDisabled(false)
      ..withGoogleAdvertisingIdCollectionDisabled(false)
      ..withActivateUI(true),
  );
  
  runApp(MyApp());
}
```

Parameters:

| Parameter                   | Presence | Description                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| apiKey                      | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general). Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only. |
| observerMode                | optional | A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`. 🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it. |
| customerUserId              | optional | An identifier of the user in your system. We recommend passing this parameter if it is known before you call `Adapty.activate`. We send it in subscription and analytical events to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. |

<SampleApp />

### Observer mode setup

```dart showLineNumbers title="main.dart"
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withObserverMode(true) // Enable observer mode
    ..withLogLevel(AdaptyLogLevel.verbose),
);
```

Parameters:

| Parameter                   | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| observerMode                | A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`. 🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it. |

### Get the SDK key

<GetKey />

## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](display-pb-paywalls) and have [installed AdaptyUI module](sdk-installation-flutter#install-adapty-sdk), you also need to activate AdaptyUI:

:::important
In your code, you must activate the core Adapty module before activating AdaptyUI.
:::

```dart showLineNumbers title="main.dart"
import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';

// AdaptyUI is automatically activated when you set withActivateUI(true) in AdaptyConfiguration
// If you need to configure it separately, you can do so after Adapty activation:

// Set up AdaptyUI observers (optional)
AdaptyUI().setPaywallsEventsObserver(yourPaywallsObserver);
AdaptyUI().setOnboardingsEventsObserver(yourOnboardingsObserver);
```

## Platform-specific configuration

### iOS Configuration

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

### Android Configuration

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

## Optional setup

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

#### Set customer user ID

When activating the Adapty module, you can set a `customerUserId` to identify the user in your system. This identifier is sent in subscription and analytical events to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu.

If you don't have a user ID at the time of Adapty initialization, you can set it later using the `.identify()` method. Read more in the [Identifying users](identifying-users) section.

```dart showLineNumbers title="main.dart"
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withCustomerUserId('user123'),
);
```

#### Set up media cache configuration for AdaptyUI

By default, AdaptyUI caches media (such as images and videos) to improve performance and reduce network usage. You can customize the cache settings by providing a custom configuration.

Use `withMediaCacheConfiguration` to override the default cache size and validity period. This is optional—if you don't call this method, default values will be used (100MB disk size, unlimited memory count).

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

:::tip
You can clear the media cache at runtime using `AdaptyUI.clearMediaCache(strategy)`, where `strategy` can be `CLEAR_ALL` or `CLEAR_EXPIRED_ONLY`.
:::

#### Set up server cluster

You can configure Adapty to use a specific server cluster for data processing and storage:

```dart showLineNumbers title="main.dart"
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withServerCluster(AdaptyServerCluster.eu), // Options: defaultCluster, eu, cn
);
```

#### Set up custom backend URLs

For advanced configurations, you can set custom backend URLs:

```dart showLineNumbers title="main.dart"
await Adapty().activate(
  configuration: AdaptyConfiguration(apiKey: 'YOUR_PUBLIC_SDK_KEY')
    ..withBackendBaseUrl('https://your-custom-backend.com')
    ..withBackendFallbackBaseUrl('https://your-fallback-backend.com')
    ..withBackendConfigsBaseUrl('https://your-configs-backend.com'),
);
```

## Hot restart support

For development purposes, you can use the `setupAfterHotRestart` method to reinitialize the plugin after a hot restart:

```dart showLineNumbers title="main.dart"
// Check if SDK is already activated
final isActivated = await Adapty().isActivated();

if (!isActivated) {
  // Normal activation
  await Adapty().activate(configuration: config);
} else {
  // Setup after hot restart (debug builds only)
  Adapty().setupAfterHotRestart();
}
```

:::warning
Use `setupAfterHotRestart` only in debug builds to avoid unexpected issues in release builds.
:::

## Next steps

Remember that for paywalls and products to display in your app, and for analytics to function, you need to [display the paywalls](display-pb-paywalls) and, if you're not using the Paywall Builder, [handle the purchase process](making-purchases) within your app.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::