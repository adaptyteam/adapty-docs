---
title: "Android - Adapty SDK Installation and configuration"
description: "Discover step-by-step instructions for installing and configuring Adapty SDK and AdaptyUI SDK on Android, enabling seamless integration of Adapty into your mobile app. Find the correct pair of SDKs with the compatibility table provided"
metadataTitle: "Android - Adapty SDK Installation and Configuration Guide"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';

Adapty comprises two crucial SDKs for seamless integration into your mobile app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

You can install Adapty SDK via Gradle.

:::danger
Go through the release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install via Gradle

<Tabs>
  <TabItem value="module-level build.gradle" label="module-level build.gradle" default>
```groovy 
dependencies {
    ...
    implementation platform('io.adapty:adapty-bom:3.0.1')
    implementation 'io.adapty:android-sdk'
    implementation 'io.adapty:android-ui'
}
```
</TabItem>
<TabItem value="module-level build.gradle.kts" label="module-level build.gradle.kts" default>

```kotlin 
dependencies {
    ...
    implementation(platform("io.adapty:adapty-bom:3.0.1"))
    implementation("io.adapty:android-sdk")
    implementation("io.adapty:android-ui")
}
```
</TabItem>
<TabItem value="version catalog" label="version catalog" default>
```toml 
//libs.versions.toml

[versions]
..
adaptyBom = "3.0.1"

[libraries]
..
adapty-bom = { module = "io.adapty:adapty-bom", version.ref = "adaptyBom" }
adapty = { module = "io.adapty:android-sdk" }
adapty-ui = { module = "io.adapty:android-ui" }



//module-level build.gradle.kts

dependencies {
    ...
    implementation(libs.adapty.bom)
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

<Tabs>
  <TabItem value="Kotlin" label="Kotlin" default>
```kotlin 
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
          .withObserverMode(false) //default false
          .withCustomerUserId(customerUserId) //default null
          .withIpAddressCollectionDisabled(false) //default false
          .build()
    )  
      
    //OR 
    //the method is deprecated since Adapty SDK v2.10.5
    
    Adapty.activate(applicationContext, "PUBLIC_SDK_KEY", observerMode = false, customerUserId = "YOUR_USER_ID")
}
```
</TabItem>
<TabItem value="Java" label="Java" default>

```java 
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
          .withObserverMode(false) //default false
          .withCustomerUserId(customerUserId) //default null
          .withIpAddressCollectionDisabled(false) //default false
          .build()
    );
  
    //OR
    //the method is deprecated since Adapty SDK v2.10.5
  
    Adapty.activate(getApplicationContext(), "PUBLIC_SDK_KEY", false, "YOUR_USER_ID");
}
```
</TabItem>
</Tabs>

Configurational options:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **PUBLIC_SDK_KEY** | required | <p>The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).</p><p>Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api)  only.</p> |
| **observerMode** | optional | <p>A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **customerUserId** | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. If you don't have a user ID at the time of Adapty initialization, you can set it later using `.identify()` method. Read more in the [Identifying users](android-identifying-users) section. |
| **IpAddressCollectionDisabled** | optional | <p>A boolean parameter. Set to `true` to disable the collection of the user IP address. The default value is `false`.</p><p>Parameter works with `AdaptyConfig.Builder` only.</p> |


:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

## Set up the logging system

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
```kotlin 
Adapty.logLevel = AdaptyLogLevel.VERBOSE
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Adapty.setLogLevel(AdaptyLogLevel.VERBOSE);
```
</TabItem>
</Tabs>

## Redirect the logging system messages

If you for some reason need to send messages from Adapty to your system or save them to a file, you can override the default behavior:

<Tabs>
  <TabItem value="kotlin" label="Kotlin" default>
```kotlin 
Adapty.setLogHandler { level, message ->
    //handle the log
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Adapty.setLogHandler((level, message) -> {
    //handle the log
});
```
</TabItem>
</Tabs>