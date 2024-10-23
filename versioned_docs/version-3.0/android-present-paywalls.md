---
title: "Android - Present new Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only which require SDK v3.0. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builde, remote config paywalls, and [Observer mode](observer-vs-full-mode).

- For presenting **Legacy Paywall Builder paywalls**, check out [Android- Present legacy Paywall Builder paywalls](android-present-paywalls-legacy).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).
- For presenting **Observer mode paywalls**, see [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode)

:::

<Tabs>
<TabItem value="views" label="Views" default>

In order to display the visual paywall on the device screen, you must first configure it. To do this, call the method `AdaptyUI.getPaywallView()` or create the `AdaptyPaywallView` directly:

<Tabs>
  <TabItem value="kotlin1" label="Kotlin (option 1)" default>

```kotlin 
   val paywallView = AdaptyUI.getPaywallView(
       activity,
       viewConfiguration,
       products,
       eventListener,
       insets,
       personalizedOfferResolver,
       tagResolver,
       timerResolver,
   )
```
</TabItem>
<TabItem value="kotlin2" label="Kotlin (option 2)" default>

```kotlin
   val paywallView =
        AdaptyPaywallView(activity) // or retrieve it from xml
   ...
   with(paywallView) {
       showPaywall(
           viewConfiguration,
           products,
					 eventListener,
           insets,
           personalizedOfferResolver,
           tagResolver,
           timerResolver,
       )
   }
```

</TabItem>
<TabItem value="java1" label="Java (option 1)" default>

```java
AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
        activity,
        viewConfiguration,
        products,
        eventListener,
        insets,
        personalizedOfferResolver,
        tagResolver,
        timerResolver
);
```
</TabItem>
<TabItem value="java2" label="Java (option 2)" default>

```java
AdaptyPaywallView paywallView =
  new AdaptyPaywallView(activity); //add to the view hierarchy if needed, or you receive it from xml
...
paywallView.showPaywall(viewConfiguration, products, eventListener, insets, personalizedOfferResolver, tagResolver, timerResolver);
```

</TabItem>
<TabItem value="XML" label="XML" default>

```xml 
<com.adapty.ui.AdaptyPaywallView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```
</TabItem>
</Tabs>

After the view has been successfully created, you can add it to the view hierarchy and display it on the screen of the device.

If you get `AdaptyPaywallView` _not_ by calling `AdaptyUI.getPaywallView()`, you will also need to call the `.showPaywall()` method.

</TabItem>
<TabItem value="compose" label="Jetpack Compose" default>

In order to display the visual paywall on the device screen, you must first configure it. To do this, use this composable function:

```kotlin
AdaptyPaywallScreen(
    viewConfiguration,
    products,
    eventListener,
    insets,
    personalizedOfferResolver,
    tagResolver,
    timerResolver,
)
```
</TabItem>
</Tabs>

Request parameters:

| Parameter                     | Presence | Description                                                  |
| :---------------------------- | :------- | :----------------------------------------------------------- |
| **viewConfiguration**         | required | Supply an `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `Adapty.getViewConfiguration(paywall)` method to load it. Refer to [Fetch the visual configuration of paywall](get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) topic for more details. |
| **products**                  | optional | Provide an array of `AdaptyPaywallProduct `to optimize the display timing of products on the screen. If `null` is passed, AdaptyUI will automatically fetch the required products. |
| **eventListener**             | optional | Provide an `AdaptyUiEventListener` to observe paywall events. Extending AdaptyUiDefaultEventListener is recommended for ease of use. Refer to [Handling paywall events](android-handling-events)  topic for more details. |
| **insets**                    | optional | <p>Insets are the spaces around the paywall that prevent tapable elements from getting hidden behind system bars.</p><p>Default: `UNSPECIFIED` which means Adapty will automatically adjust the insets, which works great for edge-to-edge paywalls. </p><p>If your paywall isn’t edge-to-edge, you might want to set custom insets. For how to do that, read in the [Change paywall insets](android-present-paywalls#change-paywall-insets) section below.</p> |
| **personalizedOfferResolver** | optional | To indicate personalized pricing ([read more](https://developer.android.com/google/play/billing/integrate#personalized-price)  ), implement `AdaptyUiPersonalizedOfferResolver`  and pass your own logic that maps `AdaptyPaywallProduct` to true if the product's price is personalized, otherwise false. |
| **tagResolver**               | optional | Use `AdaptyUiTagResolver` to resolve custom tags within the paywall text. This resolver takes a tag parameter and resolves it to a corresponding string. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder) topic for more details. |
| **timerResolver**             | optional | Pass the resolver here if you are going to use custom timer functionality. |

## Change paywall insets

Insets are the spaces around the paywall that prevent tapable elements from getting hidden behind system bars. By default, Adapty will automatically adjust the insets, which works great for edge-to-edge paywalls.

If your paywall isn’t edge-to-edge, you might want to set custom insets:

- If neither the status bar nor the navigation bar overlap with the `AdaptyPaywallView`, use `AdaptyPaywallInsets.NONE`.
- For more custom setups, like if your paywall overlaps with the top status bar but not the bottom, you can set only the `bottomInset` to `0`, as shown in the example below:

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin
import androidx.core.graphics.Insets
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

//create extension function
fun View.onReceiveSystemBarsInsets(action: (insets: Insets) -> Unit) {
    ViewCompat.setOnApplyWindowInsetsListener(this) { _, insets ->
        val systemBarInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars())
        ViewCompat.setOnApplyWindowInsetsListener(this, null)
        action(systemBarInsets)
        insets
    }
}
//and then use it with the view
paywallView.onReceiveSystemBarsInsets { insets ->
    val paywallInsets = AdaptyPaywallInsets.vertical(insets.top, 0)
    paywallView.showPaywall(
           viewConfiguration,
           products,
					 eventListener,
           paywallInsets,
           personalizedOfferResolver,
           tagResolver,
           timerResolver,
       )
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

...

ViewCompat.setOnApplyWindowInsetsListener(paywallView, (view, insets) -> {
    Insets systemBarInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars());
    ViewCompat.setOnApplyWindowInsetsListener(paywallView, null);
  
    AdaptyPaywallInsets paywallInsets =
                AdaptyPaywallInsets.of(systemBarInsets.top, 0);
    paywallView.showPaywall(paywall, products, viewConfiguration, paywallInsets, productTitleResolver);
            
    return insets;
});
```
</TabItem>
</Tabs>

## Change paywall loading indicator color

You can override the default color of the loading indicator in the following way:

```XML title = "XML"
<!--your theme -->
<style name="AppTheme" parent="android:Theme.Material.Light.NoActionBar">
    <!--other attrs -->
    <item name="adapty_progressIndicatorColor">@color/yourColor</item>
</style>
```

