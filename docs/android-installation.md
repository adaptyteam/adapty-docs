---
title: "Android – Install Adapty SDK"
description: ""
metadataTitle: ""
---

You can install Adapty SDK via Gradle.

:::note
Read Checklist before releasing your app

Be sure to carefully read [Release Checklist](release-checklist) when releasing your app. It's critical to make things right from the first attempt!
:::

### Install via Gradle

```groovy title="title="module-level build.gradle""
dependencies {
    ...
    implementation 'io.adapty:android-sdk:2.11.1'
}
```
```kotlin title="title="module-level build.gradle.kts""
dependencies {
    ...
    implementation("io.adapty:android-sdk:2.11.1")
}
```
```toml title="title="version catalog""
//libs.versions.toml

[versions]
..
adapty = "2.11.1"

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

```groovy title="title="top-level build.gradle""
allprojects {
    repositories {
        ...
        mavenCentral()
    }
}
```

Otherwise, add the following to your `settings.gradle` in `repositories` of `dependencyResolutionManagement` section: 

```groovy title="title="settings.gradle""
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