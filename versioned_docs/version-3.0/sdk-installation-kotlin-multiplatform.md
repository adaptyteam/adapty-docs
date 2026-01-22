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
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our [sample app](https://github.com/adaptyteam/AdaptySDK-KMP/tree/main/example), which demonstrates the full setup, including displaying paywalls, making purchases, and other basic functionality.
:::

For a complete implementation walkthrough, you can also see the video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/JfwJvwnloNw?si=HskPxRk4WGkF_u9s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

:::info
Adapty is compatible with Google Play Billing Library up to 8.x. By default, Adapty works with Google Play Billing Library v.7.0.0 but, if you want to force a later version, you can manually [add the dependency](https://developer.android.com/google/play/billing/integrate#dependency).
:::


## Install Adapty SDK via Gradle

Adapty SDK installation with Gradle is required for both Android and iOS apps.

Choose your dependency setup method:
- Standard Gradle: Add dependencies to your **module-level** `build.gradle`
- If your project uses `.gradle.kts` files, add dependencies to your **module-level** `build.gradle.kts`
- If you use version catalogs, add dependencies to your `libs.versions.toml` file and then, reference it in `build.gradle.kts`

<Tabs>
<TabItem value="module-level build.gradle" label="module-level build.gradle" default>

```kotlin showLineNumbers
kotlin {
    sourceSets {
        commonMain {
            dependencies {
                implementation libs.adapty.kmp
            }
        }
    }
}
```

</TabItem>
<TabItem value="module-level build.gradle.kts" label="module-level build.gradle.kts" default>

```kotlin showLineNumbers
kotlin {
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(libs.adapty.kmp)
            }
        }
    }
}
```

</TabItem>


<TabItem value="version-catalog" label="Versions library" default>

```toml showLineNumbers
// libs.versions.toml
[versions]
..
adapty-kmp    = "<the latest SDK version>"

[libraries]
..
adapty-kmp = { module = "io.adapty:adapty-kmp", version.ref = "adapty-kmp" }

// build.gradle.kts

kotlin {
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(libs.adapty.kmp)
            }
        }
    }
}

```

</TabItem>
</Tabs>


:::note
If you get a Maven-related error, make sure that you have `mavenCentral()` in your Gradle scripts.

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

## Activate Adapty SDK

### Basic setup

Add the initialization as early as possible—typically in your shared Kotlin code for both platforms.

:::note
The Adapty SDK only needs to be activated once in your app.
:::

```kotlin title="Kotlin" showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig

val config = AdaptyConfig
    .Builder("PUBLIC_SDK_KEY")
    .build()

Adapty.activate(configuration = config)
    .onSuccess {
        Log.d("Adapty", "SDK initialised")
    }
    .onError { error ->
        Log.e("Adapty", "Adapty init error: ${error.message}")
    }
```

To get your **Public SDK Key**:

1. Go to Adapty Dashboard and navigate to [App settings → General](https://app.adapty.io/settings/general).
2. From the **Api keys** section, copy the **Public SDK Key** (NOT the Secret Key).
3. Replace `"YOUR_PUBLIC_SDK_KEY"` in the code.

:::info
- Make sure you use the Public SDK key for Adapty initialization, the Secret key should be used for [server-side API](getting-started-with-server-side-api) only.
- SDK keys are unique for every app, so if you have multiple apps make sure you choose the right one.
  :::




## Activate AdaptyUI module of Adapty SDK

If you plan to activate the **AdaptyUI** module to use the [Adapty Paywall Builder](kmp-present-paywalls.md), make sure to set `.withActivateUI(true)` in your configuration.

:::info
important
In your code, you must activate the core Adapty module before activating AdaptyUI.
:::

```kotlin title="Kotlin" showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig
import com.adapty.kmp.models.AdaptyLogLevel

val config = AdaptyConfig
    .Builder("PUBLIC_SDK_KEY")
    .withActivateUI(true)           // true for activating the AdaptyUI module
    .build()  

Adapty.activate(configuration = config)
    .onSuccess {
        Log.d("Adapty", "SDK initialised")
    }
    .onError { error ->
        Log.e("Adapty", "Adapty init error: ${error.message}")
    }    
```

## Configure Proguard (Android)

Before launching your app in the production, you might need to add `-keep class com.adapty.** { *; }` to your Proguard configuration.

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

## Troubleshooting

####  Android backup rules (Auto Backup configuration)

Some SDKs (including Adapty) ship their own Android Auto Backup configuration. If you use multiple SDKs that define backup rules, the Android manifest merger can fail with an error mentioning `android:fullBackupContent`, `android:dataExtractionRules`, or `android:allowBackup`.

Typical error symptoms: `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/sample_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

To resolve this, you need to:

- Tell the manifest merger to use your app’s values for backup-related attributes.

- Merge backup rules from Adapty and other SDKs into a single XML file (or a pair of files for Android 12+).

In a Kotlin Multiplatform project, these changes are applied in the Android application module (the one that produces the APK/AAB), for example, `androidApp` or `app`:

- Manifest: `androidApp/src/main/AndroidManifest.xml`

- Backup rules XML: `androidApp/src/main/res/xml/`

#### 1. Add the `tools` namespace to your manifest

In `androidApp/src/main/AndroidManifest.xml`, ensure the root `<manifest>` tag includes tools:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. Override backup attributes in `<application>`

In the same `androidApp/src/main/AndroidManifest.xml` file, update the `<application>` tag so that your app provides the final values and tells the manifest merger to replace library values:

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

Create XML files under `androidApp/src/main/res/xml/` that combine Adapty’s rules with rules from other SDKs.

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