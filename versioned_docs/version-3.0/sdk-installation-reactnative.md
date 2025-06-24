---
title: "React Native - Adapty SDK installation & configuration"
description: "Install Adapty SDK for React Native and optimize your app's monetization."
metadataTitle: "Installing Adapty SDK for React Native | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk react native']
rank: 60
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

<Tabs groupId="current-os" queryString> 
<TabItem value="current" label="Adapty SDK v3.x+ (current)" default> 

[Adapty SDK](https://adapty.io/sdk/react-native/) includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential SDK module is required for Adapty to function properly in your app.
- **AdaptyUI**: This optional module is needed if you use the [Adapty Paywall Builder](https://adapty.io/paywall-builder/), a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built with a visual constructor right in our dashboard, run natively on the device, and require minimal effort to create high-performing designs.

## Install Adapty SDK

Currently, React Native provides two development paths: Expo and Pure React Native. Adapty seamlessly integrates with both. Please refer to the section below that matches your chosen setup.

If you need a full tutorial on how to implement IAP in your React Native app, check [this](https://adapty.io/blog/react-native-in-app-purchases-tutorial/) out.

### Install Adapty SDK for Expo React Native

You can streamline your development process with Expo Application Services (EAS). While configuration may vary based on your setup, here you'll find the most common and straightforward setup available:

1. If you haven't installed the EAS Command-Line Interface (CLI) yet, you can do so by using the following command:

   ```sh showLineNumbers title="Shell"
   npm install -g eas-cli
   ```

2. In the root of your project, install the dev client to make a development build:

   ```sh showLineNumbers title="Shell"
   expo install expo-dev-client
   ```

3. Run the installation command:

   ```sh showLineNumbers title="Shell"
   expo install react-native-adapty
   ```

4. For iOS: Make an iOS build with EAS CLI. This command may prompt you for additional info. You can refer to [expo official documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) for more details:

   ```sh showLineNumbers title="Shell"
   eas build --profile development --platform ios
   ```

5. For Android: Make an Android build with EAS CLI. This command may prompt you for additional info. You can refer to [expo official documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) for more details:

   ```sh showLineNumbers title="Shell"
   eas build --profile development --platform android
   ```

6. Start a development server with the following command:

   ```sh showLineNumbers title="Shell"
   expo start --dev-client
   ```

This should result in a working app with react-native-adapty.

Possible errors:

| Error                                                        | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `Failed to start (Invariant Violation: Native module cannot be null)` | <p>if you scan a QR code from a CLI dev client it might lead you to this error. To resolve it  you can try the following:</p><p></p><p>> On your device open EAS built app (it should provide some Expo screen) and manually insert the URL that Expo provides (screenshot below). You can unescape special characters in URL with the JS function `unescape(“string”)`, which should result in something like `http://192.168.1.35:8081`</p> |

### Install Adapty SDK with Pure React Native

If you opt for a purely native approach, please consult the following instructions:

1. In your project, run the installation command:

   ```sh showLineNumbers title="Shell"
   yarn add react-native-adapty
   ```

2. For iOS: Install required pods:

   ```sh showLineNumbers title="Shell"
   pod install --project-directory=ios
   ```

   The minimum supported iOS version is 13.0, but the [new Paywall Builder](adapty-paywall-builder) requires iOS 15.0 or higher.

   If you run into an error during pod installation, find this line in your `ios/Podfile` and update the minimum target. After that, you should be able to run `pod install` without any issues.

   ```diff showLineNumbers title="Podfile"
   -platform :ios, min_ios_version_supported
   +platform :ios, 15.0
   ```

3. For Android: Update the `/android/build.gradle` file. Make sure there is the `kotlin-gradle-plugin:1.8.0` dependency or a newer one:

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

## Configure Adapty SDK

To use Adapty SDKs, import `adapty` and invoke `activate` in your _core component_ such as `App.tsx`. Preferably, position the activation before the React component to ensure no other Adapty calls occur before the activation.

  ```typescript showLineNumbers title="/src/App.tsx"
  import { adapty } from 'react-native-adapty';

  adapty.activate('PUBLIC_SDK_KEY');

  const App = () => {
  	// ...
  }
  ```

You can pass several optional parameters during activation:

<Tabs groupId="current-os" queryString>
  <TabItem value="Typescript" label="Typescript" default>

```typescript showLineNumbers
import { adapty, LogLevel } from 'react-native-adapty';

try {
   await adapty.activate('PUBLIC_SDK_KEY', {
      observerMode: false,
      customerUserId: 'YOUR_USER_ID',
      logLevel: LogLevel.ERROR,
      __debugDeferActivation: false,
      __ignoreActivationOnFastRefresh: __DEV__,
      ipAddressCollectionDisabled: false,
      ios: {
         idfaCollectionDisabled: false,
      },
      android: {
         adIdCollectionDisabled: false,
      },
      activateUi: true,
      mediaCache: {
         memoryStorageTotalCostLimit: 100 * 1024 * 1024, // 100MB
         memoryStorageCountLimit: 2147483647, // 2^31 - 1
         diskStorageSizeLimit: 100 * 1024 * 1024, // 100MB
      },
   });

   // SDK successfully activated
} catch (error) {
   // Handle activation error
}
```

</TabItem>
<TabItem value="java" label="JavaScript" default>

```javascript showLineNumbers
import LogLevel  from 'react-native-adapty';

try {
  adapty.activate('PUBLIC_SDK_KEY', {
    observerMode: false,
    customerUserId: 'YOUR_USER_ID',
    logLevel: LogLevel.ERROR,
    ipAddressCollectionDisabled: false, 
    __debugDeferActivation: false,
    __ignoreActivationOnFastRefresh: __DEV__,
    ios: {
      idfaCollectionDisabled: false,
    },
     android: {
        adIdCollectionDisabled: false,
     },
      activateUi: true,
      mediaCache: {
        memoryStorageTotalCostLimit: 100 * 1024 * 1024, // 100MB
        memoryStorageCountLimit: 2147483647, // 2^31 - 1
        diskStorageSizeLimit: 100 * 1024 * 1024, // 100MB
      },
  });
} catch (error) {
  console.error('Failed to activate Adapty SDK:', error);
  // Handle the error appropriately for your app
}
```
</TabItem> 

</Tabs>

Parameters:

| Parameter                         | Presence | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|:----------------------------------|:---------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| observerMode                      | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself, and use Adapty for sending subscription events and analytics. The default value is `false`.</p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p>                                                                                                                                                                                                                                                                                 |
| customerUserId                    | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu.                                                                                                                                                                                                                                                                                                                                                                          |
| logLevel                          | optional | Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:<ul><li> **error:** Only errors will be logged.</li><li> **warn:** Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.</li><li> **info:** Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged.</li><li> **verbose:** Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.</li></ul> |
| activateUi                        | optional | Set to `false` to disable the Adapty UI module. This module is only required if you're using Paywall Builder paywalls. By default, it is always enabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| idfaCollectionDisabled            | optional | Set to `true` to disable IDFA collection and sharing. The default value is `false`. For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers) section.                                                                                                                                                                                                                                                                                                                                                                                                   |
| adIdCollectionDisabled            | optional | Set to `true` to disable AdId collection and sharing. The default value is `false`. For more details on AdId collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers) section.                                                                                                                                                                                                                                                                                                                                                                                                   |
| mediaCache                        | optional | <p>Define the limits for the cache of the media files: video and images.</p><ul><li>**memoryStorageTotalCostLimit:** (required) Total cost limit of the storage in bytes.</li><li>**memoryStorageCountLimit:** (required) The item count limit of the memory storage.</li><li>**diskStorageSizeLimit:** (required) The file size limit on the disk of the storage in bytes. 0 means no limit.</li></ul>                                                                                                                                                                                                                                       |
| \_\_debugDeferActivation          | optional | A boolean parameter, that lets you delay SDK activation until your next Adapty call. This is intended solely for development purposes and **should not be used in production**.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| \_\_ignoreActivationOnFastRefresh | optional | A parameter that lets you ignore multiple activation attempts on fast refresh in the development environment. If set to `__DEV__`, in the development environment, it skips activation if the SDK is already activated. Useful during development when React Native's fast refresh might trigger multiple activation calls and cause errors.                                                                                                                                                                                                                                                                                                  |

</TabItem> 

<TabItem value="old" label="Adapty SDK up to v2.x (legacy)" default> 

Adapty comprises two crucial SDKs for seamless integration into your mobile app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall Builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

You currently need to have a `react-native-adapty` of version 2.4.7 or higher to use UI SDK.

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version | AdaptyUI version |
| :----------------- | :--------------- |
| 2.7.0 – 2.9.2      | 2.0.0 - 2.0.1    |
| 2.9.3 - 2.9.8      | 2.1.0            |
| 2.10.0             | 2.1.1            |
| 2.10.1             | 2.1.2            |
| 2.11.2             | 2.11.0           |
| 2.11.3             | 2.11.1           |
| 3.0.1              | 3.0.0-3.0.1      |
| 3.1.0              | 3.1.0            |

:::danger
Go through the release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDKs

Currently, React Native provides two development paths: Expo and Pure React Native. Adapty seamlessly integrates with both. Please refer to the section below that matches your chosen setup.

### Install Adapty SDKs for Expo React Native

You can streamline your development process with Expo Application Services (EAS). While configuration may vary based on your setup, here you'll find the most common and straightforward setup available:

1. If you haven't installed the EAS Command-Line Interface (CLI) yet, you can do so by using the following command:

   ```sh showLineNumbers title="Shell"
   npm install -g eas-cli
   ```

2. In the root of your project, install the dev client to make a development build:

   ```sh showLineNumbers title="Shell"
   expo install expo-dev-client
   ```

3. Run the installation command:

   ```sh showLineNumbers title="Shell"
   expo install react-native-adapty
   expo install @adapty/react-native-ui
   ```

4. For iOS: Make an iOS build with EAS CLI. This command may prompt you for additional info. You can refer to [expo official documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) for more details:

   ```sh showLineNumbers title="Shell"
   eas build --profile development --platform ios
   ```

4. For Android: Make an Android build with EAS CLI. This command may prompt you for additional info. You can refer to [expo official documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) for more details:

   ```sh showLineNumbers title="Shell"
   eas build --profile development --platform android
   ```

5. Start a development server with the following command:

   ```sh showLineNumbers title="Shell"
   expo start --dev-client
   ```

This should result in the working app with react-native-adapty.

Possible errors:

| Error | Description |
|-----|-----------|
| `Failed to start (Invariant Violation: Native module cannot be null)` | <p>if you scan a QR code from a CLI dev client it might lead you to this error. To resolve it  you can try the following:</p><p></p><p>> On your device open EAS built app (it should provide some Expo screen) and manually insert the URL that Expo provides (screenshot below). You can unescape special characters in URL with the JS function `unescape(“string”)`, which should result in something like `http://192.168.1.35:8081`</p> |


### Install Adapty SDKs with Pure React Native

If you opt for a purely native approach to manage React Native purchases, please consult the following instructions:

1. In your project, run the installation command:

   ```sh showLineNumbers title="Shell"
   yarn add react-native-adapty
   yarn add @adapty/react-native-ui
   ```

2. For iOS: Install required pods:

   ```sh showLineNumbers title="Shell"
   pod install --project-directory=ios
   pod install --project-directory=ios/
   ```

   The minimum supported iOS version is 13.0, but the [new Paywall Builder](adapty-paywall-builder) requires iOS 15.0 or higher.

   If you run into an error during pod installation, find this line in your `ios/Podfile` and update the minimum target. After that, you should be able to run `pod install` without any issues.

   ```diff showLineNumbers title="Podfile"
   -platform :ios, min_ios_version_supported
   +platform :ios, 15.0
   ```

2. For Android: Update the `/android/build.gradle` file. Make sure there is the `kotlin-gradle-plugin:1.8.0` dependency or a newer one:

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

## Configure Adapty SDKs

To use Adapty SDKs, import `adapty` and invoke `activate` in your _core component_ such as `App.tsx`. Preferably, position the activation before the React component to ensure no other Adapty calls occur before the activation.

  ```typescript showLineNumbers title="/src/App.tsx"
  import { adapty, LogLevel } from 'react-native-adapty';

  adapty.activate('PUBLIC_SDK_KEY', {
    observerMode: false,
    customerUserId: 'YOUR_USER_ID',
    logLevel: LogLevel.ERROR,
    __debugDeferActivation: false,
    ipAddressCollectionDisabled: false,
    ios: {
      idfaCollectionDisabled: false,
    },
    activateUi: true, // NOT necessary as the default value is `true`, but you can pass `false` if you don't use the Paywall Builder
    mediaCache: {
      memoryStorageTotalCostLimit: 100 * 1024 * 1024, // 100MB
      memoryStorageCountLimit: 2147483647, // 2^31 - 1
      diskStorageSizeLimit: 100 * 1024 * 1024, // 100MB
    },
  });

  const App = () => {
  	// ...
  }
  ```

Activation parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| apiKey | required | <p>A Public SDK Key is the unique identifier used to integrate Adapty into your mobile app. You can copy it in the Adapty Dashboard:  [**App settings** -> **General **tab -> **API Keys** section](https://app.adapty.io/settings/general).</p><p>**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.</p><p>Make sure you use the **Public SDK key** for the Adapty initialization, since the **Secret key** should be used for the [server-side API](getting-started-with-server-side-api) only.</p> |
| observerMode | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode) . Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| customerUserId | optional | <p>An identifier of a user in your system. We send it with subscription and analytical events, so we can match events to the right user profile. You can also find customers using the `customerUserId` in the [Profiles](profiles-crm)  section.</p><p></p><p>If you don't have a user ID when you start with Adapty, you can add it later using the `adapty.identify()` method. For more details, see the [Identifying users](identifying-users)  section.</p> |
| logLevel | optional | A string parameter that makes Adapty record errors and other important information to help you understand what's happening. |
| \_\_debugDeferActivation | optional | A boolean parameter, that lets you delay SDK activation until your next Adapty call. This is intended solely for development purposes and **should not be used in production**. |
| ipAddressCollectionDisabled | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers)   section.</p> |
| idfaCollectionDisabled | optional | A boolean parameter, that allows you to disable IDFA collection for your iOS app. The default value is `false`. For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers) section. |

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to [display the paywalls](display-pb-paywalls) and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

</TabItem> 

</Tabs>

## Set up the logging system

Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:

| Level   | Description                                                                                                                 |
| :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| error   | Only errors will be logged.                                                                                                 |
| warn    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.       |
| info    | Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged. |
| verbose | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.   |

You can set `logLevel` at any time in the application's lifespan, but we recommend that you do this before configuring Adapty.

<Tabs groupId="current-os" queryString>
  <TabItem value="Typescript" label="Typescript" default>
```typescript showLineNumbers
adapty.setLogLevel('verbose');
```
</TabItem>
<TabItem value="java" label="Javascript" default>
```javascript showLineNumbers
import { LogLevel } from 'react-native-adapty';

adapty.setLogLevel(LogLevel.VERBOSE);
```
</TabItem>
</Tabs>

For both `activate` and `setLogLevel` methods TypeScript validates the string you pass as an argument. However, if you're using JavaScript, you may prefer to use the  `LogLevel` enum, that would guarantee to provide you a safe value:

## Handle logs

If you're storing your standard output logs, you might wish to distinguish Adapty logs from others. You can achieve this by appending a prefix to all  `AdaptyError` instances that are logged:

```typescript showLineNumbers title="Typescript"
import { AdaptyError } from 'react-native-adapty';

AdaptyError.prefix = "[ADAPTY]";
```

You can also handle all raised errors from any location you prefer using `onError`. Errors will be thrown where expected, but they will also be duplicated to your event listener.

```typescript showLineNumbers title="Typescript"
import { AdaptyError } from 'react-native-adapty';

AdaptyError.onError = error => {
	// ... 
  console.error(error);
};
```

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

In the development environment, you may also encounter the SDK activation error when React Native's fast refresh triggers multiple activation calls. Set `__ignoreActivationOnFastRefresh` to `__DEV__` to skip activation if the SDK is already activated.

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