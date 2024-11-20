---
title: "Flutter - Adapty SDK Installation and configuration"
description: "Discover step-by-step instructions for installing and configuring Adapty SDK and AdaptyUI SDK on Flutter, enabling seamless integration of Adapty into your mobile app . Find the correct pair of SDKs with the compatibility table provided."
metadataTitle: "Flutter - Adapty SDK Installation and Configuration Guide"
---

Adapty SDK includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This module is required if you’re using the Adapty Paywall Builder—a no-code, user-friendly tool for creating cross-platform paywalls. With a visual constructor right in the dashboard, you can build paywalls that run natively on devices and are designed to deliver high performance with minimal effort. 
  The module is installed automatically with the Adapty SDK, but you can leave it deactivated if you don’t need it.

:::danger
Go through the release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDKs

1. Add Adapty and AdaptyUI to your `pubspec.yaml` file:

   ```yaml title="pubspec.yaml"
   dependencies:
   adapty_flutter: ^3.2.1
   ```

2. Run:

   ```bash title="Bash"
   flutter pub get
   ```

## Configure Adapty SDKs

You only need to configure the Adapty SDK once, typically early in your app's lifecycle.

### Activate Adapty module of Adapty SDK

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
| **withIdfaCollectionDisabled**      | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>the user IP address sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa)   section.</p> |
| **withIpAddressCollectionDisabled** | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |

### Activate AdaptyUI module of Adapty SDK

You need to configure the AdaptyUI module only if you plan to use [Paywall Builder](display-pb-paywalls) and have [installed AdaptyUI module](sdk-installation-ios#install-sdks-via-cocoapods):

```dart title="Dart"

try {
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

Please note that AdaptyUI configuration is optional, you can activate AdaptyUI module without its config. However, if you use the config, all parameters are required in it.

Parameters:

| Parameter                       | Presence | Description                                                  |
| :------------------------------ | :------- | :----------------------------------------------------------- |
| **memoryStorageTotalCostLimit** | required | Total cost limit of the storage in bytes.                    |
| **memoryStorageCountLimit**     | required | The item count limit of the memory storage.                  |
| **diskStorageSizeLimit**        | required | The file size limit on disk of the storage in bytes. 0 means no limit. |

:::danger
Read the checklist before releasing your app

Before launching your app, make sure to go through the [Release Checklist](release-checklist) to confirm all steps are completed. Additionally, evaluate the integration's success using the provided criteria.
:::