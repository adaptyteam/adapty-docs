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

You can install Adapty SDK via Gradle.

1. Edit your version catalog in `libs.versions.toml`.

<Tabs groupId="current-os" queryString>
<TabItem value="libs.versions.toml" label="libs.versions.toml" default>

```toml showLineNumbers
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
</TabItem>
</Tabs>

2. Edit your shared module's `build.gradle.kts`.


<Tabs groupId="current-os" queryString>
<TabItem value="build.gradle.kts" label="build.gradle.kts" default>

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
                implementation(libs.adapty.kmp)
                implementation(libs.kotlinx.coroutines)
                implementation(libs.kotlinx.serialization)
            }
        }
    }
}
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

## Install via Swift Package Manager

1. Enter the repository URL: [https://github.com/AdaptyTeam/AdaptySDK-iOS.git](https://github.com/AdaptyTeam/AdaptySDK-iOS.git).
2. Select the version and click **Add Package**.
3. Choose the modules you need:
   1. **Adapty** is the mandatory module.
   2. **AdaptyUI** is optional and needed if you plan to use the Adapty Paywall Builder.
4. Xcode will add the package dependency to your project. To import it, in the **Choose Package Products** window, click the **Add package** button once again. The package will then appear in the **Packages** list.

## Install via CocoaPods

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

## Configure Proguard (Android)

You should add `-keep class com.adapty.** { *; }` to your Proguard configuration.

## Configure Adapty SDK

Add the initialization as early as possible—typically in your shared Kotlin code for both platforms, then in the Android `Application` class or the iOS app entry point if you need platform-specific logging.

:::info

If you plan to activate the **AdaptyUI** module to use the Adapty Paywall Builder, make sure to set `.withActivateUI(true)` in your configuration.

:::

<Tabs groupId="current-os" queryString>
  <TabItem value="Shared" label="Shared" default>

```kotlin showLineNumbers
// In your shared module (commonMain)
val config = AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withObserverMode(false)                  // true for observer‑mode only
    .withCustomerUserId("CUSTOM_USER_ID")     // your own user id or default null
    .withIpAddressCollectionDisabled(false)   // set true to skip IP collection
    .withGoogleAdvertisingIdCollectionDisabled(false)        // Android only
    .withAppleIdfaCollectionDisabled(false)                  // iOS only
    .withActivateUI(true)                     // true for activating the AdaptyUI module
    .build()

Adapty.activate(configuration = config) { error ->
    error?.let { println("Adapty initialization failed: ${'$'}{error.message}") }
}
```

</TabItem>
<TabItem value="Android" label="Android" default>

```kotlin showLineNumbers
// In your Application subclass
class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = AdaptyConfig
            .Builder("PUBLIC_SDK_KEY")
            .withActivateUI(true)                // true for activating the AdaptyUI module
            .withLogLevel(AdaptyLogLevel.VERBOSE)
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

</TabItem>
<TabItem value="iOS" label="iOS" default>

```swift showLineNumbers
// In your AppDelegate or SwiftUI App entry
let config = AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withActivateUI(true)                     // true for activating the AdaptyUI module
    .withLogLevel(.verbose)
    .build()

Adapty.activate(configuration: config) { error in
    if let error {
        print("Adapty init failed: \(error.localizedDescription)")
    } else {
        print("Adapty initialised")
    }
}
```

</TabItem>
</Tabs>



Configurational options:

| Parameter                   | Presence | Description                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| apiKey                      | required | <p>The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).</p><p>Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api)  only.</p> |
| observerMode                | optional | <p>A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| customerUserId              | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. If you don't have a user ID at the time of Adapty initialization, you can set it later using `.identify()` method. Read more in the [Identifying users](identifying-users) section. |
| ipAddressCollectionDisabled | optional | <p>A boolean parameter. Set to `true` to disable the collection of the user IP address. The default value is `false`.</p><p>Parameter works with `AdaptyConfig.Builder` only.</p> |
| googleAdvertisingIdCollectionDisabled | optional | <p>A boolean parameter. Set to `true` to disable the collection of the user [advertising ID](https://support.google.com/googleplay/android-developer/answer/6048248) on Android. The default value is `false`.</p><p>Parameter works with `AdaptyConfig.Builder` only.</p> |
| appleIdfaCollectionDisabled | optional | <p>A boolean parameter. Set to `true` to disable the collection of the user IDFA on iOS. The default value is `false`.</p><p>Parameter works with `AdaptyConfig.Builder` only.</p> |
| activateUI | optional | <p>A boolean parameter. Set to `true` to enable the AdaptyUI module, which is required to use the Adapty Paywall Builder. The default value is `false`.</p> |


:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

<SampleApp />

## Redirect the logging system messages

If you need to send Adapty's log messages to your system or save them to a file, you can add the desired behavior:

<Tabs groupId="current-os" queryString>
  <TabItem value="Kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.setLogLevel(AdaptyLogLevel.VERBOSE)   // ERROR, WARN, INFO, VERBOSE, DEBUG
```
</TabItem>
</Tabs>

:::danger
Go through the release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::


