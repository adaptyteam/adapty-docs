---
title: "Android – Install AdaptyUI SDK"
description: ""
metadataTitle: ""
---

Begin configuring the Adapty paywall builder by installing the AdaptyUI SDK. Note that the AdaptyUI SDK is necessary only if you intend to use the paywalls created with the Paywall Builder.

You can easily install the AdaptyUI SDK via Gradle.

### Install via Gradle

Add Adapty to your `build.gradle`:

```groovy title="title="module-level build.gradle""
dependencies {
    ...
    implementation 'io.adapty:android-ui:2.11.0'
}
```
```kotlin title="title="module-level build.gradle.kts""
dependencies {
    ...
    implementation("io.adapty:android-ui:2.11.0")
}
```
```toml title="title="version catalog""
//libs.versions.toml

[versions]
..
adaptyUi = "2.11.0"

[libraries]
..
adapty-ui = { group = "io.adapty", name = "android-ui", version.ref = "adaptyUi" }



//module-level build.gradle.kts

dependencies {
    ...
    implementation(libs.adapty.ui)
}
```

:::warning
Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI.
:::

| Adapty SDK version | AdaptyUI version |
| :----------------- | :--------------- |
| 2.7.x–2.9.x        | 2.0.x            |
| 2.10.0             | 2.1.2            |
| 2.10.2             | 2.1.3            |
| 2.11.1             | 2.11.0           |