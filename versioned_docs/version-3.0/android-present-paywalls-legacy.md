---
title: "Android - Present legacy Paywall Builder paywalls"
description: "Present paywalls in Android (Legacy) and manage subscriptions effectively."
metadataTitle: "Presenting Paywalls on Android (Legacy) | Adapty Docs"
---

<!--- android-present-paywalls-legacy.md --->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide covers the process for **legacy Paywall Builder paywalls** only which requires SDK v2.x or earlier. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builde, remote config paywalls, and [Observer mode](observer-vs-full-mode).

- For presenting **New Paywall Builder paywalls**, check out [Android - Present new Paywall Builder paywalls](android-present-paywalls).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).
- For presenting **Observer mode paywalls**, see [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode)

:::

In order to display the visual paywall on the device screen, you must first configure it. To do this, call the method `AdaptyUI.getPaywallView()` or create the `AdaptyPaywallView` directly:

<Tabs groupId="current-os" queryString>
  <TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
   val paywallView = AdaptyUI.getPaywallView(
       activity,
       viewConfiguration,
       products,
       AdaptyPaywallInsets.of(topInset, bottomInset),
       eventListener,
       personalizedOfferResolver,
       tagResolver,
   )

   //======= OR =======

   val paywallView =
        AdaptyPaywallView(activity) // or retrieve it from xml
   ...
   with(paywallView) {
       setEventListener(eventListener)
       setObserverModeHandler(observerModeHandler)
       showPaywall(
           viewConfiguration,
           products,
           AdaptyPaywallInsets.of(topInset, bottomInset),
           personalizedOfferResolver,
           tagResolver,
       )
   }
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
        activity,
        viewConfiguration,
        products,
        AdaptyPaywallInsets.of(topInset, bottomInset),
        eventListener,
        personalizedOfferResolver,
        tagResolver
);

//======= OR =======

AdaptyPaywallView paywallView =
  new AdaptyPaywallView(activity); //add to the view hierarchy if needed, or you receive it from xml
...
paywallView.setEventListener(eventListener);
paywallView.showPaywall(viewConfiguration, products, AdaptyPaywallInsets.of(topInset, bottomInset), personalizedOfferResolver);
```
</TabItem>
<TabItem value="XML" label="XML" default>
```xml showLineNumbers
<com.adapty.ui.AdaptyPaywallView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```
</TabItem>
</Tabs>

   After the view has been successfully created, you can add it to the view hierarchy and display it on the screen of the device.

If you get `AdaptyPaywallView` _not_ by calling `AdaptyUI.getPaywallView()`, you will also need to call `.setEventListener()` and `.showPaywall()` methods.

Request parameters:

| Parameter                     | Presence | Description                                                  |
| :---------------------------- | :------- | :----------------------------------------------------------- |
| **Paywall**                   | required | Specify an `AdaptyPaywall` object, for which you are trying to get a screen representation. |
| **Products**                  | optional | Provide an array of `AdaptyPaywallProduct `to optimize the display timing of products on the screen. If `null` is passed, AdaptyUI will automatically fetch the required products. |
| **ViewConfiguration**         | required | Supply an `AdaptyViewConfiguration` object containing visual details of the paywall. Use the `Adapty.getViewConfiguration(paywall)` method to load it. Refer to [Fetch the visual configuration of paywall](get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) topic for more details. |
| **Insets**                    | required | Define an `AdaptyPaywallInsets` object containing information about the area overlapped by system bars, creating vertical margins for content. If neither the status bar nor the navigation bar overlaps the `AdaptyPaywallView`, pass `AdaptyPaywallInsets.NONE`. For fullscreen mode where system bars overlap part of your UI, obtain insets as shown under the table. |
| **EventListener**             | optional | Provide an `AdaptyUiEventListener` to observe paywall events. Extending AdaptyUiDefaultEventListener is recommended for ease of use. Refer to [Handling paywall events](android-handling-events)  topic for more details. |
| **PersonalizedOfferResolver** | optional | To indicate personalized pricing ([read more](https://developer.android.com/google/play/billing/integrate#personalized-price)  ), implement `AdaptyUiPersonalizedOfferResolver`  and pass your own logic that maps `AdaptyPaywallProduct` to true if the product's price is personalized, otherwise false. |
| **TagResolver**               | optional | Use `AdaptyUiTagResolver` to resolve custom tags within the paywall text. This resolver takes a tag parameter and resolves it to a corresponding string. Refer to [Custom tags in Paywall Builder](custom-tags-in-paywall-builder)  topic for more details. |

For fullscreen mode where system bars overlap part of your UI, obtain insets in the following way:

<Tabs groupId="current-os" queryString>
  <TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
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
    val paywallInsets = AdaptyPaywallInsets.of(insets.top, insets.bottom)
    paywallView.showPaywall(paywall, products, viewConfig, paywallInsets, productTitleResolver)
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

...

ViewCompat.setOnApplyWindowInsetsListener(paywallView, (view, insets) -> {
    Insets systemBarInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars());
    ViewCompat.setOnApplyWindowInsetsListener(paywallView, null);
  
    AdaptyPaywallInsets paywallInsets =
                AdaptyPaywallInsets.of(systemBarInsets.top, systemBarInsets.bottom);
    paywallView.showPaywall(paywall, products, viewConfiguration, paywallInsets, productTitleResolver);
            
    return insets;
});
```
</TabItem>
</Tabs>



Returns:

| Object              | Description                                        |
| :------------------ | :------------------------------------------------- |
| `AdaptyPaywallView` | object, representing the requested paywall screen. |

**Next step:**

- [Handle paywall events](android-handling-events-legacy)