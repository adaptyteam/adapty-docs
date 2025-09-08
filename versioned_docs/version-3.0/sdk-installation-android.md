---
title: "Install & configure Android SDK"
description: "Step-by-step guide on installing Adapty SDK on Android for subscription-based apps."
metadataTitle: "Installing Adapty SDK on Android | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk android', 'google play billing library', 'gpbl', 'billing library', 'adaptyui']
rank: 70
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import GetKey from '@site/src/components/reusable/GetKey.md';

Adapty SDK includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls.

:::tip
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our [sample app](https://github.com/adaptyteam/AdaptySDK-Android), which demonstrates the full setup, including displaying paywalls, making purchases, and other basic functionality.
:::

:::info
Adapty supports Google Play Billing Library up to 7.x. Support for [Billing Library 8.0.0 (released 30 June, 2025)](https://developer.android.com/google/play/billing/release-notes#8-0-0) is planned.
:::

## Install Adapty SDK

Choose your dependency setup method:
- Standard Gradle: Add dependencies to your **module-level** `build.gradle`
- If your project uses `.gradle.kts` files, add dependencies to your module-level `build.gradle.kts`
- If you use version catalogs, add dependencies to your `libs.versions.toml` file and then, reference it in `build.gradle.kts`

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Android.svg?style=flat&logo=android)](https://github.com/adaptyteam/AdaptySDK-Android/releases)

<Tabs>
<TabItem value="module-level build.gradle" label="module-level build.gradle" default>

```groovy showLineNumbers
dependencies {
    ...
    implementation platform('io.adapty:adapty-bom:<the latest SDK version>')
    implementation 'io.adapty:android-sdk'
    
    // Only add this line if you plan to use Paywall Builder
    implementation 'io.adapty:android-ui'
}
```

</TabItem>
<TabItem value="module-level build.gradle.kts" label="module-level build.gradle.kts" default>

```kotlin showLineNumbers
dependencies {
    ...
    implementation(platform("io.adapty:adapty-bom:<the latest SDK version>"))
    implementation("io.adapty:android-sdk")
    
    // Only add this line if you plan to use Paywall Builder:
    implementation("io.adapty:android-ui")
}
```

</TabItem>
<TabItem value="version catalog" label="version catalog" default>

```toml showLineNumbers
//libs.versions.toml

[versions]
..
adaptyBom = "<the latest SDK version>"

[libraries]
..
adapty-bom = { module = "io.adapty:adapty-bom", version.ref = "adaptyBom" }
adapty = { module = "io.adapty:android-sdk" }

// Only add this line if you plan to use Paywall Builder:
adapty-ui = { module = "io.adapty:android-ui" }


//module-level build.gradle.kts

dependencies {
    ...
    implementation(platform(libs.adapty.bom))
    implementation(libs.adapty)
    
    // Only add this line if you plan to use Paywall Builder:
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

## Activate Adapty module of Adapty SDK

### Basic setup

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// In your Application class
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Adapty.activate(
            applicationContext,
            AdaptyConfig.Builder("PUBLIC_SDK_KEY")
                .build()
        )
    }
}
```

</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// In your Application class
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Adapty.activate(
            getApplicationContext(),
            new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
                .build()
        );
    }
}
```

</TabItem>
</Tabs>

<GetKey />

## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](adapty-paywall-builder.md) and have [installed AdaptyUI module](sdk-installation-android#install-adapty-sdk), you also need to activate AdaptyUI:

:::important
In your code, you must activate the core Adapty module before activating AdaptyUI.
:::

```kotlin showLineNumbers title="Kotlin"
import com.adapty.ui.AdaptyUI

AdaptyUI.activate()
```

```java showLineNumbers title="Java"
import com.adapty.ui.AdaptyUI;

AdaptyUI.activate();
```

## Configure Proguard

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

You can set the log level in your app before configuring Adapty.

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
Adapty.logLevel = AdaptyLogLevel.VERBOSE 
//recommended for development and the first production release
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
Adapty.setLogLevel(AdaptyLogLevel.VERBOSE);
//recommended for development and the first production release
```
</TabItem>
</Tabs>

#### Redirect the logging system messages

If you for some reason need to send messages from Adapty to your system or save them to a file, you can override the default behavior:

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
Adapty.setLogHandler { level, message ->
    //handle the log
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
Adapty.setLogHandler((level, message) -> {
    //handle the log
});
```
</TabItem>
</Tabs>

### Data policies

Adapty doesn't store personal data of your users unless you explicitly send it, but you can implement additional data security policies to comply with the store or country guidelines.

#### Disable IP address collection and sharing

When activating the Adapty module, set `ipAddressCollectionDisabled` to `true` to disable user IP address collection and sharing. The default value is `false`.

Use this parameter to enhance user privacy, comply with regional data protection regulations (like GDPR or CCPA), or reduce unnecessary data collection when IP-based features aren't required for your app.

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withIpAddressCollectionDisabled(true)
    .build()
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withIpAddressCollectionDisabled(true)
    .build();
```
</TabItem>
</Tabs>

#### Disable advertising ID (Ad ID) collection and sharing

When activating the Adapty module, set `adIdCollectionDisabled` to `true` to disable the collection of the user [advertising ID](https://support.google.com/googleplay/android-developer/answer/6048248). The default value is `false`.

Use this parameter to comply with Play Store policies, avoid triggering the advertising ID permission prompt, or if your app does not require advertising attribution or analytics based on Ad ID.

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withAdIdCollectionDisabled(true)
    .build()
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withAdIdCollectionDisabled(true)
    .build();
```
</TabItem>
</Tabs>

#### Set up media cache configuration for AdaptyUI

By default, AdaptyUI caches media (such as images and videos) to improve performance and reduce network usage. You can customize the cache settings by providing a custom configuration.

Use `AdaptyUI.configureMediaCache` to override the default cache size and validity period. This is optional—if you don't call this method, default values will be used (100MB disk size, 7 days validity).

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
import com.adapty.ui.AdaptyUI
import com.adapty.ui.AdaptyUI.MediaCacheConfiguration

val cacheConfig = MediaCacheConfiguration.Builder()
    .overrideDiskStorageSizeLimit(200L * 1024 * 1024) // 200 MB
    .overrideDiskCacheValidityTime(3.days)
    .build()

AdaptyUI.configureMediaCache(cacheConfig)
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
import com.adapty.ui.AdaptyUI;
import com.adapty.ui.AdaptyUI.MediaCacheConfiguration;

MediaCacheConfiguration cacheConfig = new MediaCacheConfiguration.Builder()
    .overrideDiskStorageSizeLimit(200L * 1024 * 1024) // 200 MB
    .overrideDiskCacheValidityTime(TimeInterval.days(3))
    .build();

AdaptyUI.configureMediaCache(cacheConfig);
```
</TabItem>
</Tabs>

**Parameters:**

| Parameter                | Presence | Description                                                                 |
|-------------------------|----------|-----------------------------------------------------------------------------|
| diskStorageSizeLimit    | optional | Total cache size on disk in bytes. Default is 100 MB.                       |
| diskCacheValidityTime   | optional | How long cached files are considered valid. Default is 7 days.              |

:::tip
You can clear the media cache at runtime using `AdaptyUI.clearMediaCache(strategy)`, where `strategy` can be `CLEAR_ALL` or `CLEAR_EXPIRED_ONLY`.
:::