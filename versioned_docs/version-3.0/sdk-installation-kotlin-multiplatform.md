---
title: "Kotlin Multiplatform - Adapty SDK Installation and configuration"
description: "Install and configure Adapty SDK for Kotlin Multiplatform apps."
metadataTitle: "Installing Adapty SDK on Kotlin Multiplatform | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk kotlin multiplatform']
rank: 70
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

Adapty SDK includes two key modules for seamless integration into your mobile app:

- Core **AdaptySDK**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI SDK**: This optional module is needed if you use the Adapty Paywall Builder, a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built with a visual constructor right in our dashboard, run natively on the device, and require minimal effort to create high-performing designs.


## Install via Gradle

Adapty SDK installation with Gradle is required for both Android and iOS apps.

To install Adapty SDK via Graddle:

1. Edit your version catalog in `libs.versions.toml`.

```toml title="libs.versions.toml" showLineNumbers
[versions]
..
kotlin        = "2.1.10"  
adapty-kmp    = "3.6.0"
agp = "8.7.3"
kotlinx-coroutines = "1.10.1"
kotlinx-serialization = "1.8.1"

[libraries]
..
adapty-kmp          = { module = "com.adapty:adapty-kmp", version.ref = "adapty-kmp" }
kotlinx-coroutines  = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlinx-coroutines" }
kotlinx-serialization = { module = "org.jetbrains.kotlinx:kotlinx-serialization-json", version.ref = "kotlinx-serialization" }

[plugins]
..
kotlinMultiplatform = { id = "org.jetbrains.kotlin.multiplatform", version.ref = "kotlin" }
androidLibrary      = { id = "com.android.library", version.ref = "agp" }
kotlinSerialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }


```

2. Edit your shared module's `build.gradle.kts`.


```kotlin title="build.gradle.kts" showLineNumbers
plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidLibrary)
    alias(libs.plugins.kotlinSerialization)
}

kotlin {
    androidTarget()
    iosX64()
    iosArm64()
    iosSimulatorArm64()

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(libs.adapty.kmp)
                implementation(libs.kotlinx.coroutines)
                implementation(libs.kotlinx.serialization)
                
            }
        }
    }
}
```

:::note
If you get a Maven related error, make sure that you have `mavenCentral()` in your Gradle scripts.

<details>
   <summary>The instruction on how to add it</summary>

If your project doesn't have `dependencyResolutionManagement` in your `settings.gradle`, add the following to your top-level `build.gradle` at the end of repositories:

```groovy showLineNumbers title="top-level build.gradle"
allprojects {
    repositories {
        ...
        mavenCentral()
    }
}
```

Otherwise, add the following to your `settings.gradle` in `repositories` of `dependencyResolutionManagement` section:

```groovy showLineNumbers title="settings.gradle"
dependencyResolutionManagement {
    ...
    repositories {
        ...
        google()
        mavenCentral()
    }
}
```

</details>
:::

## Add iOS wrapper

You can skip this step for a pure Compose Multiplatform app.

If your project includes a native Xcode module (for extra iOS-specific features), add the Adapty iOS wrapper with one of the package managers below.

:::note
Do not call `Adapty.activate` in Swift/Obj-C. Initialisation must stay in your shared Kotlin code; the iOS wrapper only forwards calls from the KMP layer.
:::

### Install via Swift Package Manager

1. Enter the repository URL: [https://github.com/AdaptyTeam/AdaptySDK-iOS.git](https://github.com/AdaptyTeam/AdaptySDK-iOS.git).
2. Select the version and click **Add Package**.
3. Choose the modules you need:
   1. **Adapty** is the mandatory module.
   2. **AdaptyUI** is optional and needed if you plan to use the Adapty Paywall Builder.
4. Xcode will add the package dependency to your project. To import it, in the **Choose Package Products** window, click the **Add package** button once again. The package will then appear in the **Packages** list.

### Install via CocoaPods

:::info

CocoaPods is now in maintenance mode, with development officially stopped. We recommend switching to [Swift Package Manager](sdk-installation-kotlin-multiplatform#install-via-swift-package-manager).

:::

1. Add Adapty to your `Podfile`. Choose the modules you need:

   1. **Adapty** is the mandatory module.
   2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](adapty-paywall-builder).

   ```shell showLineNumbers title="Podfile"
   pod 'Adapty', '~> 3.6.0'
   pod 'AdaptyUI', '~> 3.6.0' # optional module needed only for Paywall Builder
   ```

2. Run:

   ```showLineNumbers title="Shell"
   pod install
   ```

This will create a `.xcworkspace` file for your app. Use this file for all future development.

## Build static frameworks for iOS targets

:::note
This step is optional — only if the build fails.
:::

In some projects Xcode insists on linking static Kotlin/Native frameworks. Add `isStatic = true` to every iOS target in your shared module:


```kotlin title="build.gradle.kts" showLineNumbers
kotlin {
    // Make each generated framework static
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "Shared"      // adjust if your Xcode import expects another name
            isStatic = true
        }
    }
}
```

## Configure Proguard (Android)

You should add `-keep class com.adapty.** { *; }` to your Proguard configuration.

## Activate Adapty SDK

### Get SDK key

Before configuring the SDK, you need your **Public SDK Key**:

1. Go to Adapty Dashboard and navigate to [App settings → General](https://app.adapty.io/settings/general).
2. From the **Api keys** section, copy the **Public SDK Key** (NOT the Secret Key).
3. Replace `"YOUR_PUBLIC_SDK_KEY"` in the code below.

:::info
- Make sure you use the Public SDK key for Adapty initialization, the Secret key should be used for [server-side API](getting-started-with-server-side-api) only.
- SDK keys are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

### Basic setup

Add the initialization as early as possible—typically in your shared Kotlin code for both platforms.

```kotlin title="Kotlin" showLineNumbers
// In your Application subclass
class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = AdaptyConfig
            .Builder("PUBLIC_SDK_KEY")
            .build()

        Adapty.activate(configuration = config) { error ->
            if (error == null) {
                Log.d("Adapty", "SDK initialised")
            } else {
                Log.e("Adapty", "Adapty init error: ${'$'}{error.message}")
            }
        }
    }
}
```

Parameters:

| Parameter                   | Presence | Description                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| apiKey                      | required | <p>The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).</p><p>Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api)  only.</p> |

<SampleApp />

### Observer mode setup

```kotlin title="Kotlin" showLineNumbers
        val config = AdaptyConfig
            .Builder("PUBLIC_SDK_KEY")
            .withObserverMode(true) // true for observer‑mode
            .build()  
```

## Activate AdaptyUI module of Adapty SDK

If you plan to activate the **AdaptyUI** module to use the [Adapty Paywall Builder](display-pb-paywalls.md), make sure to set `.withActivateUI(true)` in your configuration.

```kotlin title="Kotlin" showLineNumbers
        val config = AdaptyConfig
            .Builder("PUBLIC_SDK_KEY")
            .withActivateUI(true)           // true for activating the AdaptyUI module
            .build()  
```

## Optional setup

#### Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. You can set up levels the following way:

```kotlin title="Kotlin" showLineNumbers
 val config = AdaptyConfig
      .Builder("PUBLIC_SDK_KEY")
      .withLogLevel(AdaptyLogLevel.VERBOSE) // ERROR, WARN, INFO, VERBOSE, DEBUG
      .build()   
```
#### Disable IP address collection and sharing

When activating the Adapty module, set `ipAddressCollectionDisabled` to `true` to disable user IP address collection and sharing. The default value is `false`.

Use this parameter to enhance user privacy, comply with regional data protection regulations (like GDPR or CCPA), or reduce unnecessary data collection when IP-based features aren't required for your app.

```kotlin title="Kotlin" showLineNumbers
        val config = AdaptyConfig
            .Builder("PUBLIC_SDK_KEY")
            .withIpAddressCollectionDisabled(false)   // set true to skip IP collection
            .build()  
```
#### Disable advertising ID collection and sharing

When activating the Adapty module, set `appleIdfaCollectionDisabled` (iOS) or `googleAdvertisingIdCollectionDisabled` (Android) to true to disable the collection of advertising identifiers. The default value is false.

Use this parameter to comply with App Store/Play Store policies, avoid triggering the App Tracking Transparency prompt, or if your app does not require advertising attribution or analytics based on advertising IDs.

```kotlin title="Kotlin" showLineNumbers
        val config = AdaptyConfig
            .Builder("PUBLIC_SDK_KEY")
            .withGoogleAdvertisingIdCollectionDisabled(true)        // Android only
            .withAppleIdfaCollectionDisabled(true)                  // iOS only
            .build()  
```
#### Set customer user ID

When activating the Adapty module, you can set a customerUserId to identify the user in your system. This identifier is sent in subscription and analytical events to attribute events to the right profile. You can also find customers by customerUserId in the [Profiles and Segments](https://app.adapty.io/profiles/users) menu.

If you don't have a user ID at the time of Adapty initialization, set to `null`. You can set it later using the `.identify()` method. Read more in the [Identifying users](identifying-users.md) section.

```kotlin title="Kotlin" showLineNumbers
        val config = AdaptyConfig
            .Builder("PUBLIC_SDK_KEY")
            .withCustomerUserId("CUSTOM_USER_ID")     // your own user id or default null
            .build()  
```

#### Set up media cache configuration for AdaptyUI

By default, AdaptyUI caches media (such as images and videos) to improve performance and reduce network usage. You can customize the cache settings by providing a custom configuration.

Use `mediaCache` to override the default cache settings:



:::danger
Go through the release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::
