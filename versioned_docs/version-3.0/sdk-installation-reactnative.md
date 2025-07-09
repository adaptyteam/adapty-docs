---
title: "React Native - Adapty SDK installation & configuration"
description: "Step-by-step guide on installing Adapty SDK on React Native for subscription-based apps."
metadataTitle: "Installing Adapty SDK on React Native | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk react native', 'expo', 'react native', 'google play billing library', 'gpbl', 'billing library']
rank: 60
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import GetKey from '@site/src/components/reusable/GetKey.md';

Adapty SDK includes two key modules for seamless integration into your React Native app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This optional module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls.

:::info
If you're using an older version of Adapty SDK and want to upgrade to version 3.x, we recommend following our [Migration guide to Adapty SDK v.3.x or later](migration-to-adapty-sdk-v3).
:::

If you need a full tutorial on how to implement IAP in your React Native app, check [this](https://adapty.io/blog/react-native-in-app-purchases-tutorial/) out.

## Requirements

- **React Native 0.60.0+** (recommended 0.71.0+ for best compatibility)
- **iOS:**
   - Core SDK: iOS 13.0+
   - AdaptyUI: iOS 15.0+
- **Android API 19+** (for Android builds)
- **Xcode 15.0+** (for iOS development)
- **Android Studio / Gradle** (for Android development)

:::note
While the core Adapty SDK supports iOS 13.0+ and Android API 19+, AdaptyUI requires iOS 15.0+ and Android API 21+ for full functionality.
:::


## Install Adapty SDK

<Tabs>
<TabItem value="expo" label="Expo" default>

1. Install EAS CLI (if not already):
   ```sh showLineNumbers title="Shell"
   npm install -g eas-cli
   ```
2. Install the dev client:
   ```sh showLineNumbers title="Shell"
   expo install expo-dev-client
   ```
3. Install Adapty SDK:
   ```sh showLineNumbers title="Shell"
   expo install react-native-adapty
   ```
4. Build your app for development:
   ```sh showLineNumbers title="Shell"
   eas build --profile development --platform ios
   eas build --profile development --platform android
   ```
5. Start the dev server:
   ```sh showLineNumbers title="Shell"
   expo start --dev-client
   ```

</TabItem>
<TabItem value="react-native" label="Pure React Native">

1. Install Adapty SDK:
   ```sh showLineNumbers title="Shell"
   yarn add react-native-adapty
   ```
2. For iOS, install pods:
   ```sh showLineNumbers title="Shell"
   cd ios && pod install
   ```
   If you get a minimum iOS version error, update your Podfile:
   ```diff
   -platform :ios, min_ios_version_supported
   +platform :ios, '13.0'  # For core SDK only
   # OR
   +platform :ios, '15.0'  # If using AdaptyUI
   ```

<details>
   <summary>For Android, if your React Native version is earlier than 0.73.0 (click to expand)</summary>

Update the `/android/build.gradle` file. Make sure there is the `kotlin-gradle-plugin:1.8.0` dependency or a newer one:

   ```groovy showLineNumbers title="/android/build.gradle"
   ...
   buildscript {
     ...
     dependencies {
       ...
       classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.0"
     }
   }
   ...
   ```

</details>

</TabItem>
</Tabs>

## Activate Adapty module of Adapty SDK

### Basic setup

```typescript showLineNumbers title="App.tsx"
import { adapty } from 'react-native-adapty';

adapty.activate('YOUR_PUBLIC_SDK_KEY');
```

Parameters:

| Parameter                   | Presence | Description                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| apiKey                      | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general). Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only. |

<SampleApp />

### Observer mode setup

```typescript showLineNumbers title="App.tsx"
import { adapty } from 'react-native-adapty';

adapty.activate('YOUR_PUBLIC_SDK_KEY', {
  observerMode: true, // Enable observer mode
});
```

Parameters:

| Parameter                   | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| observerMode                | A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`. 🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it. |

### Get the SDK key

<GetKey />

## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](display-pb-paywalls) and have installed AdaptyUI module, you need AdaptyUI to be active. It is done automatically when you activate the core module; you don't need to do anything else.

## Optional setup

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
adapty.setLogLevel('verbose');

// Or set it during configuration
adapty.activate('YOUR_PUBLIC_SDK_KEY', {
  logLevel: 'verbose',
});
```

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

#### Set customer user ID

When activating the Adapty module, you can set a `customerUserId` to identify the user in your system. This identifier is sent in subscription and analytical events to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu.

If you don't have a user ID at the time of Adapty initialization, you can set it later using the `.identify()` method. Read more in the [Identifying users](identifying-users) section.

```typescript showLineNumbers title="App.tsx"
adapty.activate('YOUR_PUBLIC_SDK_KEY', {
  customerUserId: 'user123',
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

## Delay SDK activation for development purposes

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

## Troubleshoot SDK activation errors on React Native's Fast Refresh

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
