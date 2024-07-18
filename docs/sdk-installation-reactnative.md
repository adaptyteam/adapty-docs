---
title: "React Native - Adapty SDK installation & configuration"
description: "Discover step-by-step instructions for installing and configuring Adapty SDK and AdaptyUI SDK on React Native, enabling seamless integration of Adapty into your mobile app. Find the correct pair of SDKs with the compatibility table provided."
metadataTitle: "React Native -  - Adapty SDK Installation and Configuration Guide"
---

Adapty comprises two crucial SDKs for seamless integration into your mobile app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](https://docs.adapty.io/docs/release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDKs

Currently, React Native provides two development paths: Expo and Pure React Native. Adapty seamlessly integrates with both. Please refer to the section below that matches your chosen setup.

### Install Adapty SDKs for Expo React Native

You can streamline your development process with Expo Application Services (EAS). While configuration may vary based on your setup, here you'll find the most common and straightforward setup available:

1. If you haven't installed the EAS Command-Line Interface (CLI) yet, you can do so by using the following command:

```sh title="title="npm install -g eas-cli""
```

2. In the root of your project, install the dev client to make a development build:

```sh title="title="expo install expo-dev-client""
```

3. Run the installation command:

```sh title="title="expo install react-native-adapty""
expo install @adapty/react-native-ui
```

4. For iOS: Make an iOS build with EAS CLI. This command may prompt you for additional info. You can refer to [expo official documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) for more details:

```sh title="title="eas build --profile development --platform ios""
```

4. For Android: Make an Android build with EAS CLI. This command may prompt you for additional info. You can refer to [expo official documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) for more details:

```sh title="title="eas build --profile development --platform android""
```

5. Start a development server with the following command:

```sh title="title="expo start --dev-client""
```

This should result in the working app with react-native-adapty.

Possible errors:

| Error | Description |
|-----|-----------|
| `Failed to start (Invariant Violation: Native module cannot be null)` | <p>if you scan a QR code from a CLI dev client it might lead you to this error. To resolve it  you can try the following:</p><p></p><p>> On your device open EAS built app (it should provide some Expo screen) and manually insert the URL that Expo provides (screenshot below). You can unescape special characters in URL with the JS function `unescape(“string”)`, which should result in something like `http://192.168.1.35:8081`</p> |


### Install Adapty SDKs with Pure React Native

If you opt for a purely native approach, please consult the following instructions:

1. In your project, run the installation command:

```sh title="title="yarn add react-native-adapty""
yarn add @adapty/react-native-ui
```

2. For iOS: Install required pods:

```sh title="title="pod install --project-directory=ios""
pod install --project-directory=ios/
```

   The minimal supported iOS version is 13.0. If you encounter an error during pod installation, locate this line in your`ios/Podfile` and update the minimal target. Tand update the minimum target. Afterward, you should be able to successfully execute `pod install`.

```diff title="title="Podfile""
-platform :ios, min_ios_version_supported
+platform :ios, 13.0
```

2. For Android: Update the `/android/build.gradle` file. Make sure there is the `kotlin-gradle-plugin:1.8.0` dependency or a newer one:

```groovy title="title="/android/build.gradle""
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

```typescript title="title="/src/App.tsx""
import { adapty } from 'react-native-adapty';

adapty.activate('PUBLIC_SDK_KEY');

const App = () => {
	// ...
}
```

You can pass several optional parameters during activation:

```typescript title="title="adapty.activate('PUBLIC_SDK_KEY', {""
  observerMode: false,
  customerUserId: 'YOUR_USER_ID',
  logLevel: 'error',
  __debugDeferActivation: false,
  ipAddressCollectionDisabled: false,
  ios: {
    idfaCollectionDisabled: false,
  },
});
```
```javascript title="title="JavaScript""
import { IosStorekit2Usage, LogLevel } from 'react-native-adapty';

adapty.activate('PUBLIC_SDK_KEY', {
  observerMode: false,
  customerUserId: 'YOUR_USER_ID',
  logLevel: LogLevel.ERROR,
  __debugDeferActivation: false,
  ipAddressCollectionDisabled: false,
  ios: {
    idfaCollectionDisabled: false,
  },
});

```

Activation parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **PUBLIC_SDK_KEY** | required | <p>A Public SDK Key is the unique identifier used to integrate Adapty into your mobile app. You can copy it in the Adapty Dashboard:  [**App settings** -> **General **tab -> **API Keys** section](https://app.adapty.io/settings/general).</p><p>**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.</p><p>Make sure you use the **Public SDK key** for the Adapty initialization, since the **Secret key** should be used for the [server-side API](getting-started-with-server-side-api) only.</p> |
| **observerMode** | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode) . Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **customerUserId** | optional | <p>An identifier of a user in your system. We send it with subscription and analytical events, so we can match events to the right user profile. You can also find customers using the `customerUserId` in the [Profiles](profiles-crm)  section.</p><p></p><p>If you don't have a user ID when you start with Adapty, you can add it later using the `adapty.identify()` method. For more details, see the [Identifying users](react-native-identifying-users)  section.</p> |
| **logLevel** | optional | A string parameter that makes Adapty record errors and other important information to help you understand what's happening. |
| **\_\_debugDeferActivation** | optional | A boolean parameter, that lets you delay SDK activation until your next Adapty call. This is intended solely for development purposes and **should not be used in production**. |
| **ipAddressCollectionDisabled** | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |
| **idfaCollectionDisabled** | optional | A boolean parameter, that allows you to disable IDFA collection for your iOS app. The default value is `false`. For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa) section. |


Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to [display the paywalls](display-pb-paywalls) and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

## Set up the logging system

Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:

| Level   | Description                                                                                                                 |
| :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| error   | Only errors will be logged.                                                                                                 |
| warn    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.       |
| info    | Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged. |
| verbose | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.   |

You can set `logLevel` at any time in the application's lifespan, but we recommend that you do this before configuring Adapty.

```typescript title="title="adapty.setLogLevel('verbose');""
```
```javascript title="title="import { LogLevel } from 'react-native-adapty';""

adapty.setLogLevel(LogLevel.VERBOSE);
```

For both `activate` and `setLogLevel` methods TypeScript validates the string you pass as an argument. However, if you're using JavaScript, you may prefer to use the  `LogLevel` enum, that would guarantee to provide you a safe value:

## Handle logs

If you're storing your standard output logs, you might wish to distinguish Adapty logs from others. You can achieve this by appending a prefix to all  `AdaptyError` instances that are logged:

```typescript title="title="import { AdaptyError } from 'react-native-adapty';""

AdaptyError.prefix = "[ADAPTY]";
```

You can also handle all raised errors from any location you prefer using `onError`. Errors will be thrown where expected, but they will also be duplicated to your event listener.

```typescript title="title="import { AdaptyError } from 'react-native-adapty';""

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

```typescript title="title="adapty.activate('PUBLIC_SDK_KEY', {""
  __debugDeferActivation: isSimulator(), // 'isSimulator' from any 3rd party library
});
```