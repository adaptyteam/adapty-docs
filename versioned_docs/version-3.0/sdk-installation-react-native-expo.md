---
title: "Install & configure Adapty React Native SDK in an Expo project"
description: "Step-by-step guide on installing Adapty React Native SDK in an Expo project for subscription-based apps."
metadataTitle: "Installing Adapty SDK in an Expo React Native project | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk expo', 'expo dev client', 'expo react native', 'google play billing library', 'gpbl', 'billing library']
rank: 60
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import GetKey from '@site/src/components/reusable/GetKey.md';
import AndroidBackupRules from '@site/src/components/reusable/AndroidBackupRules.md';

:::important
This guide covers installing and configuring the Adapty React Native SDK **in an Expo project**.  

If you’re using **pure React Native (without Expo)**, follow the [React Native installation guide](sdk-installation-react-native-pure.md) instead.
:::

Adapty SDK includes two key modules for seamless integration into your React Native app:

- **Core Adapty**: This module is required for Adapty to function properly in your app.
- **AdaptyUI**: This module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls. AdaptyUI is automatically activated along with the core module.

If you need a full tutorial on how to implement IAP in your React Native app, check [this](https://adapty.io/blog/react-native-in-app-purchases-tutorial/) out.

:::tip
Want to see a real-world example of how Adapty SDK is integrated into an Expo app? Check out our sample apps:
- [Expo dev build sample](https://github.com/adaptyteam/AdaptySDK-React-Native/tree/master/examples/FocusJournalExpo) for full functionality including real purchases and Paywall Builder
- [Expo Go & Web sample](https://github.com/adaptyteam/AdaptySDK-React-Native/tree/master/examples/ExpoGoWebMock) for testing with mock mode
:::

For a complete implementation walkthrough, you can also see the video:
<div style={{ textAlign: 'center' }}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/TtCJswpt2ms?si=FlFJGvpj-U33yoNK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Requirements

The Adapty React Native SDK supports iOS 13.0+, but using paywalls created in the [Adapty paywall builder](adapty-paywall-builder.md) requires iOS 15.0+.

:::info
Adapty supports Google Play Billing Library up to 7.x. Support for [Billing Library 8.0.0 (released 30 June, 2025)](https://developer.android.com/google/play/billing/release-notes#8-0-0) is planned.
:::

## Install Adapty SDK

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-React-Native.svg?style=flat&logo=react)](https://github.com/adaptyteam/AdaptySDK-React-Native/releases)

:::important
[Expo Dev Client](https://docs.expo.dev/versions/latest/sdk/dev-client/) (a custom development build) is required to use Adapty in an Expo project.

Expo Go doesn't support custom native modules, so you can only use it with [**mock mode**](#set-up-mock-mode-for-expo-go--expo-web) for UI/logic development (no real purchases and no AdaptyUI/Paywall Builder rendering).
:::

1. Install Adapty SDK:
   ```sh 
   npx expo install react-native-adapty
   npx expo prebuild
   ```
2. Build your app for development using EAS or local build:

   <Tabs>
   <TabItem value="eas" label="EAS build" default>
      ```sh 
      # For iOS
      eas build --profile development --platform ios

   # For Android
   eas build --profile development --platform android
      ```
   </TabItem>
   
   <TabItem value="local" label="Local build">
      ```sh 
      # For iOS
      npx expo run:ios
      
      # For Android
      npx expo run:android
      ```
   </TabItem>
   </Tabs>
3. Start the dev server:
   ```sh 
   npx expo start --dev-client
   ```

## Activate Adapty module of Adapty SDK

Copy the following code to `App.tsx` to activate Adapty:

```typescript showLineNumbers title="App.tsx"
import { adapty } from 'react-native-adapty';

adapty.activate('YOUR_PUBLIC_SDK_KEY');
```

:::tip
To avoid activation errors in the development environment, use the [tips](#development-environment-tips).
:::

<GetKey />

## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](adapty-paywall-builder.md), you need the AdaptyUI module. It is activated automatically when you activate the core module; you don't need to do anything else.

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

```typescript showLineNumbers title="App.tsx"
// Set log level before activation
// 'verbose' is recommended for development and the first production release
adapty.setLogLevel('verbose');

// Or set it during configuration
adapty.activate('YOUR_PUBLIC_SDK_KEY', {
  logLevel: 'verbose',
});
```

### Data policies

Adapty doesn't store personal data of your users unless you explicitly send it, but you can implement additional data security policies to comply with the store or country guidelines.

#### Disable IP address collection and sharing

When activating the Adapty module, set `ipAddressCollectionDisabled` to `true` to disable user IP address collection and sharing. The default value is `false`.

Use this parameter to enhance user privacy, comply with regional data protection regulations (like GDPR or CCPA), or reduce unnecessary data collection when IP-based features aren't required for your app.

```typescript showLineNumbers title="App.tsx"
adapty.activate('YOUR_PUBLIC_SDK_KEY', {
  ipAddressCollectionDisabled: true,
});
```

#### Disable advertising ID collection and sharing

When activating the Adapty module, set `ios.idfaCollectionDisabled` (iOS) or `android.adIdCollectionDisabled` (Android) to `true` to disable the collection of advertising identifiers. The default value is `false`.

Use this parameter to comply with App Store/Play Store policies, avoid triggering the App Tracking Transparency prompt, or if your app does not require advertising attribution or analytics based on advertising IDs.

```typescript showLineNumbers title="App.tsx"
adapty.activate('YOUR_PUBLIC_SDK_KEY', {
  ios: {
    idfaCollectionDisabled: true,      
  },
  android: {
    adIdCollectionDisabled: true,      
  },
});
```

#### Set up media cache configuration for AdaptyUI

By default, AdaptyUI caches media (such as images and videos) to improve performance and reduce network usage. You can customize the cache settings by providing a custom configuration.

Use `mediaCache` to override the default cache settings:

```typescript
adapty.activate('YOUR_PUBLIC_SDK_KEY', {
  mediaCache: {
    memoryStorageTotalCostLimit: 200 * 1024 * 1024, // Optional: memory cache size in bytes
    memoryStorageCountLimit: 2147483647,            // Optional: max number of items in memory
    diskStorageSizeLimit: 200 * 1024 * 1024,       // Optional: disk cache size in bytes
  },
});
```

Parameters:
| Parameter | Required | Description |
|-----------|----------|-------------|
| memoryStorageTotalCostLimit | optional | Total cache size in memory in bytes. Defaults to platform-specific value. |
| memoryStorageCountLimit | optional | The item count limit of the memory storage. Defaults to platform-specific value. |
| diskStorageSizeLimit | optional | The file size limit on disk in bytes. Defaults to platform-specific value. |

### Enable local access levels (Android)

By default, [local access levels](local-access-levels.md) are enabled on iOS and disabled on Android. To enable them on Android as well, set `localAccessLevelAllowed` to `true`:

```typescript showLineNumbers title="App.tsx"
adapty.activate('YOUR_PUBLIC_SDK_KEY', {
  android: {
     localAccessLevelAllowed: true,      
  },
});
```

## Development environment tips

#### Set up mock mode for Expo Go / Expo Web

Expo Go and Expo Web environments don't have access to Adapty's native modules. To avoid runtime errors while still being able to build and test your app's UI and paywall logic, Adapty provides **mock mode**.

::::important
Mock mode is **not** a tool for testing real purchases:

- It **doesn't open** App Store / Google Play purchase flows and **doesn't create** real transactions.
- It **doesn't render** paywalls/onboardings created with **Adapty Paywall Builder (AdaptyUI)**.
- Adapty's native modules are **completely bypassed**—even missing native SDK files in the Xcode/Android build or an invalid API key won't trigger errors.

To test real purchases and Paywall Builder paywalls, use an Expo Dev Client / production build where mock mode is automatically disabled.
::::

**By default**, the SDK automatically detects Expo Go and web environments and enables mock mode. You don't need to configure anything unless you want to customize the mock data.

When mock mode is active:
- All Adapty methods return mock data without making network requests to Adapty's servers.
- By default, the initial mock profile has no active subscriptions.
- By default, `makePurchase(...)` simulates a successful purchase and grants premium access.

You can customize the mock data using `mockConfig` during activation. See the config format and supported parameters [here](https://react-native.adapty.io/interfaces/adaptymockconfig).

```typescript showLineNumbers title="App.tsx"
import { adapty } from 'react-native-adapty';

try {
  await adapty.activate('YOUR_PUBLIC_SDK_KEY', {
    mockConfig: {
      // Customize the initial mock profile (optional)
    },
  });
} catch (error) {
  console.error('Failed to activate Adapty SDK:', error);
}
```

If you need to call SDK methods before activation (such as `isActivated()` or `setLogLevel()`), use `enableMock()` before `activate()`. If the bridge is already initialized, this method does nothing.

```typescript showLineNumbers title="App.tsx"
import { adapty } from 'react-native-adapty';

adapty.enableMock(); // Optional: pass mockConfig to customize mock data

// Now you can call methods before activation

await adapty.activate('YOUR_PUBLIC_SDK_KEY');
```


#### Delay SDK activation for development purposes

Adapty pre-fetches all necessary user data upon SDK activation, enabling faster access to fresh data.

However, this may pose a problem in the iOS simulator, which frequently prompts for authentication during development. Although Adapty cannot control the StoreKit authentication flow, it can defer the requests made by the SDK to obtain fresh user data.

By enabling the `__debugDeferActivation` property, the activate call is held until you make the next Adapty SDK call. This prevents unnecessary prompts for authentication data if not needed.

It's important to note that **this feature is intended for development use only**, as it does not cover all potential user scenarios. In production, activation should not be delayed, as real devices typically remember authentication data and do not repeatedly prompt for credentials.

Here's the recommended approach for usage:

```typescript showLineNumbers title="Typescript"
try {
  adapty.activate('PUBLIC_SDK_KEY', {
    __debugDeferActivation: isSimulator(), // 'isSimulator' from any 3rd party library
  });
} catch (error) {
  console.error('Failed to activate Adapty SDK:', error);
  // Handle the error appropriately for your app
}
```

#### Troubleshoot SDK activation errors on React Native's Fast Refresh

When developing with the Adapty SDK in React Native, you may encounter the error: `Adapty can only be activated once. Ensure that the SDK activation call is not made more than once.`

This occurs because React Native's fast refresh feature triggers multiple activation calls during development. To prevent this, use the `__ignoreActivationOnFastRefresh` option set to `__DEV__` (React Native's development mode flag).
```typescript showLineNumbers title="Typescript"
try {
  adapty.activate('PUBLIC_SDK_KEY', {
    __ignoreActivationOnFastRefresh: __DEV__, 
  });
} catch (error) {
  console.error('Failed to activate Adapty SDK:', error);
  // Handle the error appropriately for your app
}
```

## Troubleshooting

#### Minimum iOS version error

When building for iOS, you may see an error about the **minimum iOS version** or deployment target, especially if you use paywalls created in the [Adapty paywall builder](adapty-paywall-builder.md), which require **iOS 15.0+**.

Because Expo generates the iOS project (including the `Podfile`) during `expo prebuild`, **you should not edit the `Podfile` directly**. Instead, configure the deployment target via the `expo-build-properties` config plugin.

1. Install the plugin:

   ```sh
   npx expo install expo-build-properties
   ```
2. Update your Expo config (`app.json` or `app.config.js`) to set the iOS deployment target:

```
{
    "expo": {
        // ...other Expo config...
        "plugins": [
            [
                "expo-build-properties",
                {
                    "ios": {
                        // Use "13.0" for core Adapty features only,
                        // or "15.0" if you use paywalls created in the paywall builder.
                        "deploymentTarget": "15.0"
                    }
                }
            ],
        ]
    }
}
```

3. Regenerate the native iOS project and rebuild:

```
npx expo prebuild --clean
npx expo run:ios      # or `eas build -p ios` on your CI
```

#### Android Auto Backup manifest conflict

When using Expo with multiple SDKs that configure Android Auto Backup (such as Adapty, AppsFlyer, or expo-secure-store), you may encounter a manifest merger conflict.

A typical error looks like this: `Manifest merger failed : Attribute application@fullBackupContent value=(@xml/secure_store_backup_rules) from AndroidManifest.xml:24:248-306
is also present at [io.adapty:android-sdk:3.12.0] AndroidManifest.xml:9:18-70 value=(@xml/adapty_backup_rules).`

To resolve this conflict, you need to let the Adapty plugin manage Android backup configuration.
If your project also uses `expo-secure-store`, disable its own backup setup to avoid overlap.

Here’s how to configure your `app.json`:

```json title="app.json"
{
  "expo": {
    "plugins": [
      ["react-native-adapty", { "replaceAndroidBackupConfig": true }],
      ["expo-secure-store", { "configureAndroidBackup": false }]
    ]
  }
}
```
The `replaceAndroidBackupConfig` option is `false` by default. When enabled, it lets the Adapty plugin control Android backup rules.
Include `"configureAndroidBackup": false` if you use `expo-secure-store` to prevent warnings, since SecureStore’s backup configuration will now be handled by Adapty.

:::important
This setup only respects backup requirements for Adapty, AppsFlyer, and expo-secure-store.
If other libraries in your project define custom backup rules, you’ll need to configure those manually.
:::