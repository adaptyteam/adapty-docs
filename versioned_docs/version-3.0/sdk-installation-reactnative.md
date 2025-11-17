---
title: "Install & configure React Native SDK"
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

- **Core Adapty**: This module is required for Adapty to function properly in your app.
- **AdaptyUI**: This module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls. AdaptyUI is automatically activated along with the core module.

If you need a full tutorial on how to implement IAP in your React Native app, check [this](https://adapty.io/blog/react-native-in-app-purchases-tutorial/) out.

:::tip
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our [sample apps](https://github.com/adaptyteam/AdaptySDK-React-Native/tree/master/examples), which demonstrate the full setup, including displaying paywalls, making purchases, and other basic functionality.
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

<Tabs>
<TabItem value="expo" label="Expo" default>

:::important
[Expo DevClient](https://docs.expo.dev/versions/latest/sdk/dev-client/) is required. Expo Go will **not** work because the Adapty SDK includes native dependencies.
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

## Development environment tips

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

If you get a minimum iOS version error, update your Podfile:

```diff
-platform :ios, min_ios_version_supported
+platform :ios, '13.0'  # For core features only
# OR
+platform :ios, '15.0'  # If using paywalls created in the paywall builder
```

#### Android backup rules (Auto Backup configuration)

Some SDKs (including Adapty) ship their own Android Auto Backup configuration. If you use multiple SDKs that define backup rules, the Android manifest merger can fail with an error mentioning `android:fullBackupContent`, `android:dataExtractionRules`, or `android:allowBackup`.

Typical error symptoms: `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/sample_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

To resolve this, you need to:

- Tell the manifest merger to use your app’s values for backup-related attributes.

- Merge backup rules from Adapty and other SDKs into a single XML file (or a pair of files for Android 12+).

#### 1. Add the `tools` namespace to your manifest

In `android/app/src/main/AndroidManifest.xml`, ensure the root `<manifest>` tag includes tools:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. Override backup attributes in `<application>`

In the same `android/app/src/main/AndroidManifest.xml` file, update the `<application>` tag so that your app provides the final values and tells the manifest merger to replace library values:

```xml
<application
android:name=".App"
android:allowBackup="true"
android:fullBackupContent="@xml/sample_backup_rules"           <!-- Android 11 and lower -->
android:dataExtractionRules="@xml/sample_data_extraction_rules"<!-- Android 12+ -->
tools:replace="android:fullBackupContent,android:dataExtractionRules">

    ...
</application>
```

If any SDK also sets `android:allowBackup`, you can optionally include it in `tools:replace` as well:

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

If your `compileSdkVersion` is lower than 31, and you don’t use `dataExtractionRules`, remove that attribute from `<application>` and from `tools:replace`.

#### 3. Create merged backup rules files

Create XML files under `android/app/src/main/res/xml/` that combine Adapty’s rules with rules from other SDKs.

<Tabs>
<TabItem value="12-plus" label="Android 12 and higher">

```xml title="sample_data_extraction_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
    <cloud-backup>
        <!-- AppsFlyer backup rules -->
        <exclude domain="sharedpref" path="appsflyer-data"/>
        <!-- Adapty backup rules -->
        <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>
    </cloud-backup>

    <device-transfer>
        <!-- Usually the same rules as cloud-backup -->
        <exclude domain="sharedpref" path="appsflyer-data"/>
        <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>
    </device-transfer>
</data-extraction-rules>
```

</TabItem>
<TabItem value="11-minus" label="Android 11 and lower">

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    <!-- AppsFlyer backup rules -->
    <exclude domain="sharedpref" path="appsflyer-data"/>

    <!-- Adapty backup rules -->
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    <!-- Your own app-specific rules (if any) -->
    <!-- <exclude domain="database" path="your_database_name" /> -->
</full-backup-content>
```

</TabItem>
</Tabs>

With this setup:

- Adapty’s backup exclusions (`AdaptySDKPrefs.xml`) are preserved.

- Other SDKs’ exclusions (for example, `appsflyer-data`) are also applied.

- The manifest merger uses your app’s configuration and no longer fails on conflicting backup attributes.