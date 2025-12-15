---
title: "Capacitor - Adapty SDK installation & configuration"
description: "Step-by-step guide on installing Adapty SDK on Capacitor for subscription-based apps."
metadataTitle: "Installing Adapty SDK on Capacitor | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk capacitor', 'capacitor', 'google play billing library', 'gpbl', 'billing library']
rank: 60
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import GetKey from '@site/src/components/reusable/GetKey.md';
import AndroidBackupRules from '@site/src/components/reusable/AndroidBackupRules.md';

Adapty SDK includes two key modules for seamless integration into your Capacitor app:

- **Core Adapty**: This module is required for Adapty to function properly in your app.
- **AdaptyUI**: This module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls. AdaptyUI is automatically activated along with the core module.

:::tip
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our [sample apps](https://github.com/adaptyteam/AdaptySDK-Capacitor/tree/master/example-app), which demonstrate the full setup, including displaying paywalls, making purchases, and other basic functionality.
:::

## Requirements

The [Adapty Capacitor SDK](https://github.com/adaptyteam/AdaptySDK-Capacitor/) supports iOS 14.0+, but using paywalls created in the [Adapty paywall builder](adapty-paywall-builder.md) requires iOS 15.0+.

:::info
Adapty supports Google Play Billing Library up to 7.x. Support for [Billing Library 8.0.0 (released 30 June, 2025)](https://developer.android.com/google/play/billing/release-notes#8-0-0) is planned.
:::

## Install Adapty SDK

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Capacitor.svg?style=flat&logo=capacitor)](https://github.com/adaptyteam/AdaptySDK-Capacitor/releases)

Install Adapty SDK:

```sh 
npm install @adapty/capacitor
npx cap sync   
```


## Activate Adapty module of Adapty SDK

:::note
The Adapty SDK only needs to be activated once in your app.
:::

Copy the following code to any app file to activate Adapty:

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.activate({
    apiKey: 'YOUR_PUBLIC_SDK_KEY',
    params: {
      // verbose logging is recommended for the development purposes and for the first production release
        logLevel: 'verbose', 
      // in the development environment, use this variable to avoid multiple activation errors. Set it to your development environment variable
      __ignoreActivationOnFastRefresh: true,
    }
  });
  console.log('Adapty activated successfully!');
} catch (error) {
  console.error('Failed to activate Adapty SDK:', error);
}
```

:::tip
To avoid activation errors in the development environment, use the [tips](#development-environment-tips).
:::

<GetKey />

## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](adapty-paywall-builder.md), you need the AdaptyUI module. It is done automatically when you activate the core module; you don't need to do anything else.

## Optional setup

### Logging

#### Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. There are the following levels available:

| Level      | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `error`    | Only errors will be logged                                    |
| `warn`     | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged |
| `info`     | Errors, warnings, and various information messages will be logged |
| `verbose`  | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged |

You can set the log level in your app before or during Adapty configuration:

```typescript showLineNumbers
// Set log level before activation
adapty.setLogLevel({ logLevel: 'verbose' });

// Or set it during configuration
await adapty.activate({
  apiKey: 'YOUR_PUBLIC_SDK_KEY',
  params: {
    logLevel: 'verbose',
  }
});
```

### Data policies

Adapty doesn't store personal data of your users unless you explicitly send it, but you can implement additional data security policies to comply with the store or country guidelines.

#### Disable IP address collection and sharing

When activating the Adapty module, set `ipAddressCollectionDisabled` to `true` to disable user IP address collection and sharing. The default value is `false`.

Use this parameter to enhance user privacy, comply with regional data protection regulations (like GDPR or CCPA), or reduce unnecessary data collection when IP-based features aren't required for your app.

```typescript showLineNumbers
await adapty.activate({
  apiKey: 'YOUR_PUBLIC_SDK_KEY',
  params: {
    ipAddressCollectionDisabled: true,
  }
});
```

#### Disable advertising ID collection and sharing

When activating the Adapty module, set `ios.idfaCollectionDisabled` (iOS) or `android.adIdCollectionDisabled` (Android) to `true` to disable the collection of advertising identifiers. The default value is `false`.

Use this parameter to comply with App Store/Play Store policies, avoid triggering the App Tracking Transparency prompt, or if your app does not require advertising attribution or analytics based on advertising IDs.

```typescript showLineNumbers
await adapty.activate({
  apiKey: 'YOUR_PUBLIC_SDK_KEY',
  params: {
    ios: {
      idfaCollectionDisabled: true,      
    },
    android: {
      adIdCollectionDisabled: true,      
    },
  }
});
```

#### Set up media cache configuration for AdaptyUI

By default, AdaptyUI caches media (such as images and videos) to improve performance and reduce network usage. You can customize the cache settings by providing a custom configuration.

Use `mediaCache` to override the default cache settings:

```typescript showLineNumbers
await adapty.activate({
  apiKey: 'YOUR_PUBLIC_SDK_KEY',
  params: {
    mediaCache: {
      memoryStorageTotalCostLimit: 200 * 1024 * 1024, // Optional: memory cache size in bytes
      memoryStorageCountLimit: 2147483647,            // Optional: max number of items in memory
      diskStorageSizeLimit: 200 * 1024 * 1024,       // Optional: disk cache size in bytes
    },
  }
});
```

Parameters:
| Parameter | Required | Description |
|-----------|----------|-------------|
| memoryStorageTotalCostLimit | optional | Total cache size in memory in bytes. Defaults to platform-specific value. |
| memoryStorageCountLimit | optional | The item count limit of the memory storage. Defaults to platform-specific value. |
| diskStorageSizeLimit | optional | The file size limit on disk in bytes. Defaults to platform-specific value. |

## Development environment tips

#### Troubleshoot SDK activation errors on Capacitor's live-reload

When developing with the Adapty SDK in Capacitor, you may encounter the error: `Adapty can only be activated once. Ensure that the SDK activation call is not made more than once.`

This occurs because Capacitor's live-reload feature triggers multiple activation calls during development. To prevent this, use the `__ignoreActivationOnFastRefresh` option set to the Capacitor's development mode flag – it will differ depending on the bundle you are using.

```typescript showLineNumbers
try {
  await adapty.activate({
    apiKey: 'YOUR_PUBLIC_SDK_KEY',
    params: {
        // Set your development environment variable
      __ignoreActivationOnFastRefresh: true, 
    }
  });
} catch (error) {
  console.error('Failed to activate Adapty SDK:', error);
  // Handle the error appropriately for your app
}
```

## Troubleshooting

#### Minimum iOS version error

If you get a minimum iOS version error, update your Podfile:

```diff
-platform :ios, min_ios_version_supported
+platform :ios, '14.0'  # For core features only
# OR
+platform :ios, '15.0'  # If using paywalls created in the paywall builder
```

####  Android backup rules (Auto Backup configuration)

<AndroidBackupRules />

:::tip
After changing native Android files, run `npx cap sync android` so Capacitor picks up the updated resources if you regenerate the platform.
:::