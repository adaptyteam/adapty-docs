---
title: "Migrate Adapty Flutter SDK to v. 3.0"
description: "Migrate to Adapty Flutter SDK v3.0 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty Flutter SDK v3.0 | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK v.3.0 brings support for the new exciting [Adapty Paywall Builder](adapty-paywall-builder), the new version of the no-code user-friendly tool to create paywalls. With its maximum flexibility and rich design capabilities, your paywalls will become most effective and profitable.

:::info

Please note that the AdaptyUI library is deprecated and is now included as part of AdaptySDK.

:::

## Remove AdaptyUI SDK

1. AdaptyUI becomes a module in Adapty SDK, so please remove `adapty_ui_flutter` from your  `pubspec.yaml` file:

   ```diff showLineNumbers
   dependencies:
   + adapty_flutter: ^3.2.1
   - adapty_flutter: ^2.10.3
   - adapty_ui_flutter: ^2.1.3
   ```

2. Run:

   ```bash showLineNumbers title="Bash"
   flutter pub get
   ```

## Configure Adapty SDKs

Previously, you needed to use `Adapty-Info.plist` and `AndroidManifest.xml` files for Adapty SDK configuration.

Now, there's no need to use additional files. Instead, you can provide all required parameters during activation.

You only need to configure the Adapty SDK once, typically at the start of your app's lifecycle.

### Activate Adapty module of Adapty SDK

1. Remove the AdaptyUI SDK import from your application as follows:

   ```diff showLineNumbers
   import 'package:adapty_flutter/adapty_flutter.dart';
   - import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';
   ```

2. Update the Adapty SDK activation like this:

   ```diff showLineNumbers
   try {
   -	Adapty().activate();  
   +    await Adapty().activate(
   +        configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
   +         ..withLogLevel(AdaptyLogLevel.debug)
   +         ..withObserverMode(false)
   +         ..withCustomerUserId(null)
   +         ..withIpAddressCollectionDisabled(false)
   +         ..withIdfaCollectionDisabled(false),
   +   );
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
| **withIdfaCollectionDisabled**      | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>the user IP address sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers)   section.</p> |
| **withIpAddressCollectionDisabled** | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |

### Activate AdaptyUI module of Adapty SDK

You need to configure the AdaptyUI module only if you plan to use [Paywall Builder](display-pb-paywalls):

```dart showLineNumbers title="Dart"
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