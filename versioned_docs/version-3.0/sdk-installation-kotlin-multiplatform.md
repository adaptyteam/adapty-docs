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

Adapty comprises two crucial SDKs for seamless integration into your Kotlin Multiplatform app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall Builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

You can install Adapty SDK via Gradle.

:::danger
Go through the release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install via Gradle

<Tabs groupId="current-os" queryString>
  <TabItem value="module-level build.gradle.kts" label="module-level build.gradle.kts" default>

```kotlin showLineNumbers
dependencies {
    ...
    implementation(platform("io.adapty:adapty-bom:3.8.0"))
    implementation("io.adapty:kotlin-multiplatform-sdk")
    implementation("io.adapty:kotlin-multiplatform-ui")
}
```

</TabItem>
<TabItem value="version catalog" label="version catalog" default>

```toml showLineNumbers
//libs.versions.toml

[versions]
..
adaptyBom = "3.8.0"

[libraries]
..
adapty-bom = { module = "io.adapty:adapty-bom", version.ref = "adaptyBom" }
adapty = { module = "io.adapty:kotlin-multiplatform-sdk" }
adapty-ui = { module = "io.adapty:kotlin-multiplatform-ui" }


//module-level build.gradle.kts

dependencies {
    ...
    implementation(platform(libs.adapty.bom))
    implementation(libs.adapty)
    implementation(libs.adapty.ui)
}
```

</TabItem>
</Tabs>

If the dependency is not being resolved, please make sure that you have `mavenCentral()` in your Gradle scripts. 

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
        mavenCentral()
    }
}
```

</details>

## Configure Proguard

You should add `-keep class com.adapty.** { *; }` to your Proguard configuration.

## Configure Adapty SDK

Add the following to your `Application` class:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig
import com.adapty.kmp.models.AdaptyLogLevel

object AppInitializer {
    fun initialize() {
        val adaptyKey = when (getPlatform()) {
            Platform.Android -> BuildConfig.ADAPTY_ANDROID_API_KEY
            Platform.Ios -> BuildConfig.ADAPTY_IOS_API_KEY
        }

        Adapty.activate(
            AdaptyConfig.Builder(adaptyKey)
                .withLogLevel(AdaptyLogLevel.DEBUG)
                .withObserverMode(false) //default false
                .withCustomerUserId(null)
                .withIpAddressCollectionDisabled(false) //default false
                .withAppleIdfaCollectionDisabled(false)
                .withGoogleAdvertisingIdCollectionDisabled(false) // default false
                .withActivateUI(true)
                .build(),
            onError = { error ->
                error?.let {
                    // Handle error
                }
            }
        )
    }
}
```

Configurational options:

| Parameter                   | Presence | Description                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| apiKey                      | required | <p>The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).</p><p>Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api)  only.</p> |
| observerMode                | optional | <p>A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| customerUserId              | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. If you don't have a user ID at the time of Adapty initialization, you can set it later using `.identify()` method. Read more in the [Identifying users](identifying-users) section. |
| ipAddressCollectionDisabled | optional | <p>A boolean parameter. Set to `true` to disable the collection of the user IP address. The default value is `false`.</p><p>Parameter works with `AdaptyConfig.Builder` only.</p> |
| adIdCollectionDisabled      | optional | <p>A boolean parameter. Set to `true` to disable the collection of the user [advertising ID](https://support.google.com/googleplay/android-developer/answer/6048248). The default value is `false`.</p><p>Parameter works with `AdaptyConfig.Builder` only.</p> |

:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

<SampleApp /> 