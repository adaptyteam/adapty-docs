---
title: "Legacy installation guide"
description: "Get started with Adapty on Android to streamline subscription setup and management."
metadataTitle: "Getting Started with Android | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version | AdaptyUI version |
| :----------------- | :--------------- |
| 2.7.x–2.9.x        | 2.0.x            |
| 2.10.0             | 2.1.2            |
| 2.10.2             | 2.1.3            |
| 2.11.0 - 2.11.3    | 2.11.0 - 2.11.2  |
| 2.11.5             | 2.11.3           |

You can install Adapty SDK via Gradle.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

### Install via Gradle

<Tabs groupId="current-os" queryString>
  <TabItem value="module-level build.gradle" label="module-level build.gradle" default>

```groovy showLineNumbers
dependencies {
    ...
    implementation 'io.adapty:android-sdk:2.11.5'
    implementation 'io.adapty:android-ui:2.11.3'
}
```

</TabItem>
<TabItem value="module-level build.gradle.kts" label="module-level build.gradle.kts" default>

```kotlin showLineNumbers
dependencies {
    ...
    implementation("io.adapty:android-sdk:2.11.5")
    implementation("io.adapty:android-ui:2.11.3")
}
```

</TabItem>
<TabItem value="version catalog" label="version catalog" default>

```toml showLineNumbers
//libs.versions.toml

[versions]
..
adapty = "2.11.5"
adaptyUi = "2.11.3"

[libraries]
..
adapty = { group = "io.adapty", name = "android-sdk", version.ref = "adapty" }
adapty-ui = { group = "io.adapty", name = "android-ui", version.ref = "adaptyUi" }



//module-level build.gradle.kts

dependencies {
    ...
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

### Configure Proguard

You should add `-keep class com.adapty.** { *; }` to your Proguard configuration.

### Configure Adapty SDK

Add the following to your `Application` class:

<Tabs groupId="current-os" queryString>
  <TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
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
<TabItem value="java" label="Java" default>

```java showLineNumbers
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

| Parameter                   | Presence | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey                      | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general). Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.                                                                                            |
| observerMode                | optional | A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`. 🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.                                                                                                                |
| customerUserId              | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. If you don't have a user ID at the time of Adapty initialization, you can set it later using `.identify()` method. Read more in the [Identifying users](android-identifying-users) section. |
| IpAddressCollectionDisabled | optional | A boolean parameter. Set to `true` to disable the collection of the user IP address. The default value is `false`. Parameter works with `AdaptyConfig.Builder` only.                                                                                                                                                                                                                                                                                             |

:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::