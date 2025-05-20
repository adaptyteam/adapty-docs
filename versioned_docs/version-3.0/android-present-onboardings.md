---
title: "Android - Present onboardings"
description: "Learn how to present onboardings on Android for effective user engagement."
metadataTitle: "Presenting Onboardings on Android | Adapty Docs"
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

<Tabs groupId="current-os" queryString>
<TabItem value="views" label="Views" default>

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
val onboardingView = OnboardingView(activity)
onboardingView.show(
    viewConfig = onboardingConfig,
    delegate = eventListener
)
```
  </TabItem>
  <TabItem value="java" label="Java (option 1)">

```java
OnboardingView onboardingView = AdaptyUI.getOnboardingView(
    activity,
    onboardingConfig,
    eventListener
);
```
  </TabItem>
  <TabItem value="java2" label="Java (option 2)">

```java
OnboardingView onboardingView = new OnboardingView(activity);
onboardingView.show(onboardingConfig, eventListener);
```
  </TabItem>
  <TabItem value="xml" label="XML">

```xml
<com.adapty.ui.onboardings.OnboardingView
        android:id="@+id/onboardingView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
```
  </TabItem>
</Tabs>

After the view has been successfully created, you can add it to the view hierarchy and display it on the device screen.

</TabItem>
<TabItem value="compose" label="Jetpack Compose">

To display the visual onboarding on the device screen, you must first configure it. To do this, use this composable function:

```kotlin
AdaptyOnboardingScreen(
    viewConfig = onboardingConfig,
    eventListener = eventListener
)
```

</TabItem>
</Tabs>

Request parameters:

| Parameter | Presence | Description |
| :-------- | :------- | :---------- |
| **viewConfig** | required | The onboarding configuration obtained from `AdaptyUI.getOnboardingConfiguration()` |
| **eventListener** | required | An implementation of `OnboardingsDelegate` to handle onboarding events |


## Change loading indicator color

You can override the default color of the loading indicator in the following way:

```xml
<!--your theme -->
<style name="AppTheme" parent="android:Theme.Material.Light.NoActionBar">
    <!--other attrs -->
    <item name="adapty_progressIndicatorColor">@color/yourColor</item>
</style>
```