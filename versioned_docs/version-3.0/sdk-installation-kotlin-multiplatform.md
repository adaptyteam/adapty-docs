---
title: "Install & configure the Adapty Kotlin Multiplatform SDK"
description: "Install and configure Adapty SDK for Kotlin Multiplatform apps."
metadataTitle: "Installing Adapty SDK on Kotlin Multiplatform | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk kotlin multiplatform']
rank: 50
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

Adapty SDK includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls.

:::tip
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our [sample app](https://github.com/adaptyteam/AdaptySDK-KMP/example), which demonstrates the full setup, including displaying paywalls, making purchases, and other basic functionality.
:::

:::info
Adapty supports Google Play Billing Library up to 7.x. Support for [Billing Library 8.0.0 (released 30 June, 2025)](https://developer.android.com/google/play/billing/release-notes#8-0-0) is planned.
:::


## Install Adapty SDK

The installation flow depends on your app:
- **Compose Multiplatform app**: Follow only the [Gradle installation](#install-via-gradle) section, but skip [adding iOS wrapper](#add-ios-wrapper).
- **App with a native iOS target (an Xcode module)**: Follow both [Gradle installation](#install-via-gradle) and [adding iOS wrapper](#add-ios-wrapper) sections.

### Install via Gradle

Adapty SDK installation with Gradle is required for both Android and iOS apps.

Choose your dependency setup method:
- If your project only uses `.gradle.kts` files, add dependencies to your module-level `build.gradle.kts`
- If you use version catalogs, add dependencies to your `libs.versions.toml` and `build.gradle.kts` files

<Tabs>
<TabItem value="module-level build.gradle.kts" label="module-level build.gradle.kts" default>

```kotlin showLineNumbers
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
                implementation(platform(libs.adapty.bom))  
                implementation(libs.adapty.kmp)
                implementation(libs.kotlinx.coroutines)
                implementation(libs.kotlinx.serialization)
                
            }
        }
    }
}
```

</TabItem>


<TabItem value="version catalog" label="libs.versions.toml" default>

```toml showLineNumbers
[versions]
..
kotlin        = "2.1.10"  
adapty-bom    = "<the latest SDK version>"
adapty-kmp    = "<the latest SDK version>"
agp = "8.7.3"
kotlinx-coroutines = "1.10.1"
kotlinx-serialization = "1.8.1"

[libraries]
..
adapty-bom = { module = "io.adapty:adapty-bom", version.ref = "adapty-bom" }
adapty-kmp = { module = "com.adapty:adapty-kmp", version.ref = "adapty-kmp" }
kotlinx-coroutines  = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlinx-coroutines" }
kotlinx-serialization = { module = "org.jetbrains.kotlinx:kotlinx-serialization-json", version.ref = "kotlinx-serialization" }

[plugins]
..
kotlinMultiplatform = { id = "org.jetbrains.kotlin.multiplatform", version.ref = "kotlin" }
androidLibrary      = { id = "com.android.library", version.ref = "agp" }
kotlinSerialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }


```

</TabItem>
</Tabs>


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

### Add iOS wrapper

If your project includes a native Xcode module (for extra iOS-specific features), add the Adapty iOS wrapper with one of the package managers below.

:::info
- You can skip this step for a pure Compose Multiplatform app.
- Do not call `Adapty.activate` in Swift/Obj-C. Initialisation must stay in your shared Kotlin code; the iOS wrapper only forwards calls from the KMP layer.
  :::

<Tabs>
<TabItem value="spm" label="Swift Package Manager (recommended)" default>

1. Enter the repository URL: [https://github.com/AdaptyTeam/AdaptySDK-iOS.git](https://github.com/AdaptyTeam/AdaptySDK-iOS.git).
2. Select the version and click **Add Package**.
3. Choose the modules you need:
    1. **Adapty** is the mandatory module.
    2. **AdaptyUI** is optional and needed if you plan to use the Adapty Paywall Builder.
4. Xcode will add the package dependency to your project. To import it, in the **Choose Package Products** window, click the **Add package** button once again. The package will then appear in the **Packages** list.

</TabItem>

<TabItem value="cocoapods" label="CocoaPods (legacy)" default>
:::info

CocoaPods is now in maintenance mode, with development officially stopped. We recommend switching to [Swift Package Manager](sdk-installation-kotlin-multiplatform#install-via-swift-package-manager).

:::

1. Add Adapty to your `Podfile`. Choose the modules you need:

    1. **Adapty** is the mandatory module.
    2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](adapty-paywall-builder).

   ```shell showLineNumbers title="Podfile"
   pod 'Adapty', '~> <the latest SDK version>'
   pod 'AdaptyUI', '~> <the latest SDK version>' # optional module needed only for Paywall Builder
   ```

2. Run:

   ```showLineNumbers title="Shell"
   pod install
   ```

This will create a `.xcworkspace` file for your app. Use this file for all future development.

</TabItem>
</Tabs>

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

## Activate Adapty SDK

### Basic setup

Add the initialization as early as possible—typically in your shared Kotlin code for both platforms.

```kotlin title="Kotlin" showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig
import com.adapty.kmp.models.AdaptyLogLevel
import android.util.Log

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

To get your your **Public SDK Key**:

1. Go to Adapty Dashboard and navigate to [App settings → General](https://app.adapty.io/settings/general).
2. From the **Api keys** section, copy the **Public SDK Key** (NOT the Secret Key).
3. Replace `"YOUR_PUBLIC_SDK_KEY"` in the code.

:::info
- Make sure you use the Public SDK key for Adapty initialization, the Secret key should be used for [server-side API](getting-started-with-server-side-api) only.
- SDK keys are unique for every app, so if you have multiple apps make sure you choose the right one.
  :::




## Activate AdaptyUI module of Adapty SDK

If you plan to activate the **AdaptyUI** module to use the [Adapty Paywall Builder](display-pb-paywalls.md), make sure to set `.withActivateUI(true)` in your configuration.

:::info
important
In your code, you must activate the core Adapty module before activating AdaptyUI.
:::

```kotlin title="Kotlin" showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig
import com.adapty.kmp.models.AdaptyLogLevel
import android.util.Log

class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = AdaptyConfig
            .Builder("PUBLIC_SDK_KEY")
            .withActivateUI(true)           // true for activating the AdaptyUI module
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

## Configure Proguard (Android)

Before launching your app in the production, add `-keep class com.adapty.** { *; }` to your Proguard configuration.

## Optional setup

### Logging

#### Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. There are the following levels available:

| Level                    | Description                                                                                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `AdaptyLogLevel.NONE`    | Nothing will be logged. Default value                                                                                     |
| `AdaptyLogLevel.ERROR`   | Only errors will be logged                                                                                                |
| `AdaptyLogLevel.WARN`    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.     |
| `AdaptyLogLevel.INFO`    | Errors, warnings, and various information messages will be logged.                                                        |
| `AdaptyLogLevel.VERBOSE` | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged. |

You can set the log level in your app before configuring Adapty:

```kotlin title="Kotlin" showLineNumbers
import com.adapty.kmp.models.AdaptyConfig
import com.adapty.kmp.models.AdaptyLogLevel

val config = AdaptyConfig
     .Builder("PUBLIC_SDK_KEY")
     .withLogLevel(AdaptyLogLevel.VERBOSE) // recommended for development
     .build()   
```

### Data policies

#### Disable IP address collection and sharing

When activating the Adapty module, set `ipAddressCollectionDisabled` to `true` to disable user IP address collection and sharing. The default value is `false`.

Use this parameter to enhance user privacy, comply with regional data protection regulations (like GDPR or CCPA), or reduce unnecessary data collection when IP-based features aren't required for your app.

```kotlin title="Kotlin" showLineNumbers
import com.adapty.kmp.models.AdaptyConfig

val config = AdaptyConfig
     .Builder("PUBLIC_SDK_KEY")
     .withIpAddressCollectionDisabled(true)  
     .build()  
```
#### Disable advertising ID collection and sharing

When activating the Adapty module, set `appleIdfaCollectionDisabled` (iOS) or `googleAdvertisingIdCollectionDisabled` (Android) to true to disable the collection of advertising identifiers. The default value is false.

Use this parameter to comply with App Store/Play Store policies, avoid triggering the App Tracking Transparency prompt, or if your app does not require advertising attribution or analytics based on advertising IDs.

```kotlin title="Kotlin" showLineNumbers
import com.adapty.kmp.models.AdaptyConfig

val config = AdaptyConfig
     .Builder("PUBLIC_SDK_KEY")
     .withGoogleAdvertisingIdCollectionDisabled(true)        // Android only
     .withAppleIdfaCollectionDisabled(true)                  // iOS only
     .build()  
```

#### Set up media cache configuration for AdaptyUI

By default, AdaptyUI caches media (such as images and videos) to improve performance and reduce network usage. You can customize the cache settings by providing a custom configuration.

Use `mediaCache` to override the default cache settings:

```kotlin
import com.adapty.kmp.models.AdaptyConfig

val config = AdaptyConfig
    .Builder("PUBLIC_SDK_KEY")
    .withMediaCacheConfiguration(
        AdaptyConfig.MediaCacheConfiguration(
            memoryStorageTotalCostLimit = 200 * 1024 * 1024, // 200 MB
            memoryStorageCountLimit = Int.MAX_VALUE,          
            diskStorageSizeLimit = 200 * 1024 * 1024 // 200 MB
        )
    )
    .build()
```
