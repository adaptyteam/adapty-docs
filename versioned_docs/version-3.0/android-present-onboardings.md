---
title: "Android - Present onboardings"
description: "Learn how to present onboardings on Android for effective user engagement."
metadataTitle: "Presenting Onboardings on Android | Adapty Docs"
keywords: ['getOnboardingConfiguration']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before you start, ensure that:

1. You have installed [Adapty Android SDK](installation-of-adapty-sdks.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

If you've customized an onboarding using the Onboarding Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such an onboarding contains both what should be shown and how it should be shown.



In order to display the visual onboarding on the device screen, you must first configure it. To do this, call the method `AdaptyUI.getOnboardingView()` or create the `OnboardingView` directly:

<Tabs groupId="views-code-examples" queryString>
  <TabItem value="kotlin" label="Kotlin (option 1)" default>

```kotlin
val onboardingView = AdaptyUI.getOnboardingView(
    activity = this,
    viewConfig = onboardingConfig,
    eventListener = eventListener
)
```
  </TabItem>
  <TabItem value="kotlin2" label="Kotlin (option 2)">

```kotlin
val onboardingView = AdaptyOnboardingView(activity)
onboardingView.show(
    viewConfig = onboardingConfig,
    delegate = eventListener
)
```
  </TabItem>
  <TabItem value="java" label="Java (option 1)">

```java
AdaptyOnboardingView onboardingView = AdaptyUI.getOnboardingView(
    activity,
    onboardingConfig,
    eventListener
);
```
  </TabItem>
  <TabItem value="java2" label="Java (option 2)">

```java
AdaptyOnboardingView onboardingView = new AdaptyOnboardingView(activity);
onboardingView.show(onboardingConfig, eventListener);
```
  </TabItem>
  <TabItem value="xml" label="XML">

```xml
<com.adapty.ui.onboardings.AdaptyOnboardingView
        android:id="@+id/onboardingView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
```
  </TabItem>
</Tabs>

After the view has been successfully created, you can add it to the view hierarchy and display it on the device screen.


Request parameters:

| Parameter | Presence | Description                                                                                                                                                                      |
| :-------- | :------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **viewConfig** | required | The onboarding configuration obtained from `AdaptyUI.getOnboardingConfiguration()`                                                                                               |
| **eventListener** | required | An implementation of `AdaptyOnboardingEventListener` to handle onboarding events. Refer to [Handling onboarding events](android-handle-onboarding-events) for more details.      |


## Change loading indicator color

You can override the default color of the loading indicator in the following way:

```xml
<!--your theme -->
<style name="AppTheme" parent="android:Theme.Material.Light.NoActionBar">
    <!--other attrs -->
    <item name="adapty_progressIndicatorColor">@color/yourColor</item>
</style>
```

## Add smooth transitions between the splash screen and onboarding

By default, between the splash screen and onboarding, you will see the loading screen until the onboarding is fully loaded. However, if you want to make the transition smoother, you can customize it and either extend the splash screen or display something else.

To do this, create `adapty_onboarding_placeholder_view.xml` in `res/layout` and define a placeholder (what exactly will be shown while the onboarding is being loaded) there. 

If you define a placeholder, the onboarding will be loaded in the background and automatically displayed once ready.

## Disable safe area paddings

By default, the onboarding view automatically applies safe area paddings to avoid system UI elements like status bar and navigation bar. However, if you want to disable this behavior and have full control over the layout, you can do so by setting the `safeAreaPaddings` parameter to `false`.

<Tabs groupId="views-code-examples" queryString>
  <TabItem value="kotlin" label="Kotlin (option 1)" default>

```kotlin
val onboardingView = AdaptyUI.getOnboardingView(
    activity = this,
    viewConfig = onboardingConfig,
    eventListener = eventListener,
    safeAreaPaddings = false
)
```
  </TabItem>
  <TabItem value="kotlin2" label="Kotlin (option 2)">

```kotlin
val onboardingView = AdaptyOnboardingView(activity)
onboardingView.show(
    viewConfig = onboardingConfig,
    delegate = eventListener,
    safeAreaPaddings = false
)
```
  </TabItem>
  <TabItem value="java" label="Java (option 1)">

```java
AdaptyOnboardingView onboardingView = AdaptyUI.getOnboardingView(
    activity,
    onboardingConfig,
    eventListener,
    false
);
```
  </TabItem>
  <TabItem value="java2" label="Java (option 2)">

```java
AdaptyOnboardingView onboardingView = new AdaptyOnboardingView(activity);
onboardingView.show(onboardingConfig, eventListener, false);
```
  </TabItem>
</Tabs>

Alternatively, you can control this behavior globally by adding a boolean resource to your app:

```xml
<!-- res/values/bools.xml -->
<resources>
    <bool name="adapty_onboarding_enable_safe_area_paddings">false</bool>
</resources>
```

When `safeAreaPaddings` is set to `false`, the onboarding will extend to the full screen without any automatic padding adjustments, giving you complete control over the layout and allowing the onboarding content to use the entire screen space.