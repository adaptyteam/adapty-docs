---
title: "Unity - Adapty SDK installation & configuration"
description: "Step-by-step guide on installing Adapty SDK on Unity for subscription-based apps."
metadataTitle: "Installing Adapty SDK on Unity | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk unity', 'google play billing library', 'gpbl', 'billing library']
rank: 30
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import GetKey from '@site/src/components/reusable/GetKey.md';

Adapty SDK includes two key modules for seamless integration into your Unity app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This optional module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls.

:::info
If you're using an older version of Adapty SDK and want to upgrade to version 3.x, we recommend following our [Migration guide to Adapty SDK v.3.x or later](migration-to-unity-sdk-v3).
:::

## Requirements

Adapty SDK supports iOS 13.0+, but requires iOS 15.0+ to work with paywalls created in the paywall builder.

:::info
Adapty supports Google Play Billing Library up to 7.x. Support for [Billing Library 8.0.0 (released 30 June, 2025)](https://developer.android.com/google/play/billing/release-notes#8-0-0) is planned.
:::

## Install Adapty SDK

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Unity.svg?style=flat&logo=unity)](https://github.com/adaptyteam/AdaptySDK-Unity/releases)

1. Download the `adapty-unity-plugin-*.unitypackage` from GitHub and import it into your project.

<Zoom>
  <img src={require('./img/456bd98-adapty-unity-plugin.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Download and import the [External Dependency Manager plugin](https://github.com/googlesamples/unity-jar-resolver).

3. The SDK uses the "External Dependency Manager" plugin to handle iOS Cocoapods dependencies and Android gradle dependencies. After the installation, you may need to invoke the dependency manager:

   `Assets -> External Dependency Manager -> Android Resolver -> Force Resolve`

   and

   `Assets -> External Dependency Manager -> iOS Resolver -> Install Cocoapods`

4. When building your Unity project for iOS, you would get `Unity-iPhone.xcworkspace` file, which you have to open instead of `Unity-iPhone.xcodeproj`, otherwise, Cocoapods dependencies won't be used.

## Activate Adapty module of Adapty SDK

### Basic setup

```csharp showLineNumbers title="C#"
using UnityEngine;
using AdaptySDK;

public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
    void Start() {
        DontDestroyOnLoad(this.gameObject);
        Adapty.SetEventListener(this);

        var builder = new AdaptyConfiguration.Builder("YOUR_PUBLIC_SDK_KEY");

        Adapty.Activate(builder.Build(), (error) => {
            if (error != null) {
                // handle the error
                return;
            }
        });
    }
}
```

<GetKey />

### Observer mode setup

Turn on the Observer mode if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.

:::important
When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.
:::

```csharp showLineNumbers title="C#"
using UnityEngine;
using AdaptySDK;

public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
    void Start() {
        DontDestroyOnLoad(this.gameObject);
        Adapty.SetEventListener(this);

        var builder = new AdaptyConfiguration.Builder("YOUR_PUBLIC_SDK_KEY")
            .SetObserverMode(true); // Enable observer mode

        Adapty.Activate(builder.Build(), (error) => {
            if (error != null) {
                // handle the error
                return;
            }
        });
    }
}
```

Parameters:

| Parameter    | Description                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------------|
| observerMode | A boolean value that controls [Observer mode](observer-vs-full-mode). The default value is `false`. |


## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](adapty-paywall-builder.md) and have installed AdaptyUI module, you need AdaptyUI to be active. You can activate it during the configuration:

```csharp showLineNumbers title="C#"
var builder = new AdaptyConfiguration.Builder("YOUR_PUBLIC_SDK_KEY")
    .SetActivateUI(true);
```

## Optional setup

#### Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. There are the following levels available:

| Level      | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `error`    | Only errors will be logged                                    |
| `warn`     | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged |
| `info`     | Errors, warnings, and various information messages will be logged |
| `verbose`  | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged |

You can set the log level in your app during Adapty configuration:

```csharp showLineNumbers title="C#"
var builder = new AdaptyConfiguration.Builder("YOUR_PUBLIC_SDK_KEY")
    .SetLogLevel(AdaptyLogLevel.Verbose);
```

#### Disable IP address collection and sharing

When activating the Adapty module, set `SetIPAddressCollectionDisabled` to `true` to disable user IP address collection and sharing. The default value is `false`.

Use this parameter to enhance user privacy, comply with regional data protection regulations (like GDPR or CCPA), or reduce unnecessary data collection when IP-based features aren't required for your app.

```csharp showLineNumbers title="C#"
var builder = new AdaptyConfiguration.Builder("YOUR_PUBLIC_SDK_KEY")
    .SetIPAddressCollectionDisabled(true);
```

#### Disable advertising ID collection and sharing

When activating the Adapty module, set `SetAppleIDFACollectionDisabled` and/or `SetGoogleAdvertisingIdCollectionDisabled` to `true` to disable the collection of advertising identifiers. The default value is `false`.

Use this parameter to comply with App Store/Google Play policies, avoid triggering the App Tracking Transparency prompt, or if your app does not require advertising attribution or analytics based on advertising IDs.

```csharp showLineNumbers title="C#"
var builder = new AdaptyConfiguration.Builder("YOUR_PUBLIC_SDK_KEY")
    .SetAppleIDFACollectionDisabled(true);
    .SetGoogleAdvertisingIdCollectionDisabled(true);
```

#### Set customer user ID

When activating the Adapty module, you can set a `customerUserId` to identify the user in your system. This identifier is sent in subscription and analytical events to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu.

If you don't have a user ID at the time of Adapty initialization, you can set it later using the `.Identify()` method. Read more in the [Identifying users](unity-identifying-users) section.

```csharp showLineNumbers title="C#"
var builder = new AdaptyConfiguration.Builder("YOUR_PUBLIC_SDK_KEY")
    .SetCustomerUserId("user123");
```

#### Set up media cache configuration for AdaptyUI

By default, AdaptyUI caches media (such as images and videos) to improve performance and reduce network usage. You can customize the cache settings by providing a custom configuration.

Use `SetAdaptyUIMediaCache` to override the default cache settings:

```csharp showLineNumbers title="C#"
var builder = new AdaptyConfiguration.Builder("YOUR_PUBLIC_SDK_KEY")
    .SetAdaptyUIMediaCache(
        100 * 1024 * 1024, // MemoryStorageTotalCostLimit 100MB
        null, // MemoryStorageCountLimit
        100 * 1024 * 1024 // DiskStorageSizeLimit 100MB
    );
```

Parameters:
| Parameter | Required | Description |
|-----------|----------|-------------|
| memoryStorageTotalCostLimit | optional | Total cache size in memory in bytes. Defaults to platform-specific value. |
| memoryStorageCountLimit | optional | The item count limit of the memory storage. Defaults to platform-specific value. |
| diskStorageSizeLimit | optional | The file size limit on disk in bytes. Defaults to platform-specific value. |

## Set up event listening

Create a script to listen to Adapty events. Name it `AdaptyListener` in your scene. We suggest using the `DontDestroyOnLoad` method for this object to ensure it persists throughout the application's lifespan.

<Zoom>
  <img src={require('./img/2ccd564-create_adapty_listener.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Adapty uses `AdaptySDK` namespace. At the top of your script files that use the Adapty SDK, you may add:

```csharp showLineNumbers title="C#"
using AdaptySDK;
```

Subscribe to Adapty events:

```csharp showLineNumbers title="C#"
using UnityEngine;
using AdaptySDK;

public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
     public void OnLoadLatestProfile(Adapty.Profile profile) {
       // handle updated profile data
     }
}
```

We recommend adjusting the Script Execution Order to place the AdaptyListener before Default Time. This ensures that Adapty initializes as early as possible.

<Zoom>
  <img src={require('./img/activate_unity.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Add Kotlin Plugin to your project

:::warning

This step is required. If you skip it, your mobile app can crash when the paywall is displayed.

:::

1. In **Player Settings**, ensure that the **Custom Launcher Gradle Template** and **Custom Base Gradle Template** options are selected.
   <Zoom>
   <img src={require('./img/kotlin-plugin1.webp').default}
   style={{
   border: 'none', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

2. Add the following line to `/Assets/Plugins/Android/launcherTemplate.gradle`:

   ```groovy showLineNumbers
   apply plugin: 'com.android.application'
   // highlight-next-line
   apply plugin: 'kotlin-android'
   apply from: 'setupSymbols.gradle'
   apply from: '../shared/keepUnitySymbols.gradle'
   ```

3. Add the following line to `/Assets/Plugins/Android/baseProjectTemplate.gradle`:

   ```groovy showLineNumbers
   plugins {
       // If you are changing the Android Gradle Plugin version, make sure it is compatible with the Gradle version preinstalled with Unity
       // See which Gradle version is preinstalled with Unity here https://docs.unity3d.com/Manual/android-gradle-overview.html
       // See official Gradle and Android Gradle Plugin compatibility table here https://developer.android.com/studio/releases/gradle-plugin#updating-gradle
       // To specify a custom Gradle version in Unity, go do "Preferences > External Tools", uncheck "Gradle Installed with Unity (recommended)" and specify a path to a custom Gradle version
       id 'com.android.application' version '8.3.0' apply false
       id 'com.android.library' version '8.3.0' apply false
   // highlight-next-line
       id 'org.jetbrains.kotlin.android' version '1.8.0' apply false
       **BUILD_SCRIPT_DEPS**
   }
   ```

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to [display the paywalls](unity-quickstart-paywalls.md) and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.