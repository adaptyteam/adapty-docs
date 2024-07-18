---
title: "Android – Install and configure SDK (Liudmila)"
description: ""
metadataTitle: ""
---

Adapty offers two essential SDKs for seamless integration into your mobile app:

- **The primary Adapty SDK**: This is a foundational, obligatory SDK required for the operation of Adapty within your app.
- **AdaptyUI SDK**: This additional SDK is essential if you plan to use the Paywall Builder. The [Paywall Builder](paywall-builder-getting-started) is a convenient, user-friendly tool designed for a no-code approach. It empowers you to effortlessly create a subscription or other virtual product purchase page, known as a [Paywall](paywalls) in Adapty. This approach ensures seamless integration of paywalls directly into your iOS or Android apps as native layout pages.  
  The Adapty Paywall Builder is crafted to streamline the setup of core conversion-driving elements of paywalls with just a few clicks in the dashboard, eliminating the need to spend time on minor design tweaks and technical configurations. It also enables you to edit your paywall's native layout on-the-go by making visual changes in the Adapty web interface.  

Please refer to the compatibility table below to select the appropriate pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version     | AdaptyUI version |
| :--------------------- | :--------------- |
| `2.7.x`–`2.9.x`        | `2.0.x`          |
| `2.10.0`               | `2.1.2`          |
| Starting with `2.10.2` | `2.1.3`          |

You can install Adapty SDK via Gradle.

:::note
Read Checklist before releasing your app

Be sure to carefully read [Release Checklist](release-checklist) when releasing your app. It's critical to make things right from the first attempt!
:::

## Install via Gradle

```groovy title="module-level build.gradle"
dependencies {
    ...
    implementation 'io.adapty:android-sdk:2.10.3'
}
```
```kotlin title="module-level build.gradle.kts"
dependencies {
    ...
    implementation("io.adapty:android-sdk:2.10.2")
}
```
```toml title="version catalog"
//libs.versions.toml

[versions]
..
adapty = "2.10.2"

[libraries]
..
adapty = { group = "io.adapty", name = "android-sdk", version.ref = "adapty" }



//module-level build.gradle.kts

dependencies {
    ...
    implementation(libs.adapty)
}
```

If the dependency is not being resolved, please make sure that you have `mavenCentral()` in your Gradle scripts. 

<details>
   <summary><i>The instruction on how to add it</i></summary>

   If your project doesn't have `dependencyResolutionManagement` in your `settings.gradle`, add the following to your top-level `build.gradle` at the end of repositories:

```groovy title="top-level build.gradle"
allprojects {
    repositories {
        ...
        mavenCentral()
    }
}
```

Otherwise, add the following to your `settings.gradle` in `repositories` of `dependencyResolutionManagement` section: 

```groovy title="settings.gradle"
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

```kotlin title="Kotlin"
override fun onCreate() {
    super.onCreate()
    Adapty.activate(applicationContext, "PUBLIC_SDK_KEY", observerMode = false, customerUserId = "YOUR_USER_ID")
}
```
```java title="Java"
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(getApplicationContext(), "PUBLIC_SDK_KEY", false, "YOUR_USER_ID");
}
```

Configurational options:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **Public SDK key** | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **Observer mode** | optional | A boolean value controlling [Observer mode](observer-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. |
| **Customer user ID** | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. If you don't have a user ID at the time of Adapty initialization, you can set it later using `.identify()` method. Read more in the [Identifying Users](android-identifying-users) section. |
| **StoreKit 2 Usage** | required | <p>A value that controls StoreKit 1 or 2 API utilization. Read more in the [Displaying Paywalls & Products](https://docs.adapty.io/docs/displaying-products#adapty-sdk-version-250-and-higher) section.</p><p>The default value is `.forIntroEligibilityCheck`.</p> |


:::warning
Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.
:::

:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

## Logging

Adapty logs errors and other important information to help you understand what is going on. There are the following levels available:

| Level                    | Description                                                                                               |
| :----------------------- | :-------------------------------------------------------------------------------------------------------- |
| `AdaptyLogLevel.NONE`    | won't log anything. Default value                                                                         |
| `AdaptyLogLevel.ERROR`   | only errors will be logged                                                                                |
| `AdaptyLogLevel.WARN`    | messages from the SDK that do not cause critical errors, but are worth paying attention to                |
| `AdaptyLogLevel.INFO`    | various information messages                                                                              |
| `AdaptyLogLevel.VERBOSE` | any additional information that may be useful during debugging, such as function calls, API queries, etc. |

You can set the log level in your app before configuring Adapty.

```kotlin title="Kotlin"
Adapty.logLevel = AdaptyLogLevel.VERBOSE
```
```java title="Java"
Adapty.setLogLevel(AdaptyLogLevel.VERBOSE);
```

## Set up Redirecting the logging system messages

If you for some reason need to send messages from Adapty to your system or save them to a file, you can override the default behavior:

```kotlin title="Kotlin"
Adapty.setLogHandler { level, message ->
    //handle the log
}
```
```java title="Java"
Adapty.setLogHandler((level, message) -> {
    //handle the log
});
```