---
title: "Flutter - Adapty SDK Installation and configuration"
description: "Discover step-by-step instructions for installing and configuring Adapty SDK and AdaptyUI SDK on Flutter, enabling seamless integration of Adapty into your mobile app . Find the correct pair of SDKs with the compatibility table provided."
metadataTitle: "Flutter - Adapty SDK Installation and Configuration Guide"
---

Adapty SDK includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This optional module is needed if you use the Adapty Paywall Builder, a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built with a visual constructor right in our dashboard, run natively on the device, and require minimal effort to create high-performing designs.

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

:::danger
Go through the release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDKs

1. Add Adapty and AdaptyUI to your `pubspec.yaml` file:

   ```yaml title="pubspec.yaml"
   dependencies:
   adapty_flutter: ^3.2.0
   ```

2. Run:

   ```bash title="Bash"
   flutter pub get
   ```

## Configure Adapty SDKs

1. Import Adapty SDKs in your application in the following way:

   ```dart title="Dart"
   import 'package:adapty_flutter/adapty_flutter.dart';
   ```

2. Activate Adapty SDK with the following code:

```dart title="Dart"
try {
    await Adapty().activate(
        configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
          ..withLogLevel(AdaptyLogLevel.debug)
          ..withObserverMode(false)
          ..withCustomerUserId(null)
          ..withIpAddressCollectionDisabled(false)
          ..withIdfaCollectionDisabled(false),
    );

    final mediaCache = AdaptyUIMediaCacheConfiguration(
        memoryStorageTotalCostLimit: 100 * 1024 * 1024, // 100MB
        memoryStorageCountLimit: 2147483647, // 2^31 - 1, max int value in Dart
        diskStorageSizeLimit: 100 * 1024 * 1024, // 100MB
    );

    await AdaptyUI().activate(
        configuration: AdaptyUIConfiguration(mediaCache: mediaCache),
        observer: <AdaptyUIObserver Implementation>,
    );
} catch (e) {
    // handle the error
}
```

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
Read the checklist before releasing your app

Before launching your app, make sure to go through the [Release Checklist](release-checklist) to confirm all steps are completed. Additionally, evaluate the integration's success using the provided criteria.
:::