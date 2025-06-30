---
title: "Kotlin Multiplatform - Present legacy Paywall Builder paywalls"
description: "Learn how to present legacy paywalls on Kotlin Multiplatform for effective monetization."
metadataTitle: "Presenting Legacy Paywalls on Kotlin Multiplatform | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

If you've customized a paywall using the legacy Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **legacy Paywall Builder paywalls** only. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder, remote config paywalls, and [Observer mode](observer-vs-full-mode).

- For presenting **new Paywall Builder paywalls**, check out [Kotlin Multiplatform - Present new Paywall Builder paywalls](kotlin-multiplatform-present-paywalls).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).
- For presenting **Observer mode paywalls**, see [Kotlin Multiplatform - Present Paywall Builder paywalls in Observer mode](kotlin-multiplatform-present-paywall-builder-paywalls-in-observer-mode)

:::

<Tabs groupId="current-os" queryString>
<TabItem value="views" label="Views" default>

In order to display the visual paywall on the device screen, you must first configure it. To do this, call the method `AdaptyUI.getPaywallView()` or create the `AdaptyPaywallView` directly:

```kotlin showLineNumbers
   val paywallView = AdaptyUI.getPaywallView(
       activity,
       paywall,
       products,
       eventListener,
       insets,
       productTitleResolver
   )
```

After the view has been successfully created, you can add it to the view hierarchy and display it on the screen of the device.

If you get `AdaptyPaywallView` _not_ by calling `AdaptyUI.getPaywallView()`, you will also need to call the `.showPaywall()` method.

</TabItem>
<TabItem value="compose" label="Jetpack Compose" default>

In order to display the visual paywall on the device screen, you must first configure it. To do this, use this composable function:

```kotlin showLineNumbers
AdaptyPaywallScreen(
    paywall,
    products,
    eventListener,
    insets,
    productTitleResolver
)
```
</TabItem>
</Tabs>

Request parameters:

| Parameter              | Presence | Description                                                  |
| :--------------------- | :------- | :----------------------------------------------------------- |
| **paywall**            | required | Supply an `AdaptyPaywall` object containing visual details of the paywall. Use the `Adapty.getPaywall(placementId)` method to load it. Refer to [Fetch legacy Paywall Builder paywalls and their configuration](get-legacy-pb-paywalls) topic for more details. |
| **products**           | optional | Provide an array of `AdaptyPaywallProduct `to optimize the display timing of products on the screen. If `null` is passed, AdaptyUI will automatically fetch the required products. |
| **eventListener**      | optional | Provide an `AdaptyUiEventListener` to observe paywall events. Extending AdaptyUiDefaultEventListener is recommended for ease of use. Refer to [Handling paywall events](kotlin-multiplatform-handling-events-legacy)  topic for more details. |
| **insets**             | optional | <p>Insets are the spaces around the paywall that prevent tapable elements from getting hidden behind system bars.</p><p>Default: `UNSPECIFIED` which means Adapty will automatically adjust the insets, which works great for edge-to-edge paywalls. </p><p>If your paywall isn't edge-to-edge, you might want to set custom insets. For how to do that, read in the [Change paywall insets](kotlin-multiplatform-present-paywalls-legacy#change-paywall-insets) section below.</p> |
| **productTitleResolver** | optional | Use `AdaptyUiProductTitleResolver` to resolve product titles within the paywall text. This resolver takes a product parameter and resolves it to a corresponding string. Refer to [Tag variables for product info](paywall-builder-tag-variables-legacy) topic for more details. |

<SampleApp />

## Change paywall insets

Insets are the spaces around the paywall that prevent tapable elements from getting hidden behind system bars. By default, Adapty will automatically adjust the insets, which works great for edge-to-edge paywalls.

If your paywall isn't edge-to-edge, you might want to set custom insets:

- If neither the status bar nor the navigation bar overlap with the `AdaptyPaywallView`, use `AdaptyPaywallInsets.NONE`.
- For more custom setups, like if your paywall overlaps with the top status bar but not the bottom, you can set only the `bottomInset` to `0`, as shown in the example below:

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
    val paywallInsets = AdaptyPaywallInsets.vertical(insets.top, 0)
    paywallView.showPaywall(
           paywall,
           products,
           eventListener,
           paywallInsets,
           productTitleResolver
       )
}
```

## Use product title resolver

You can implement your own product title resolution logic by implementing the `AdaptyUiProductTitleResolver` interface:

```kotlin showLineNumbers
class CustomProductTitleResolver : AdaptyUiProductTitleResolver {
    override fun resolveProductTitle(product: AdaptyPaywallProduct): String {
        // some code snippet
        return "custom_product_title"
    }
}
```

Then pass it to the paywall view:

```kotlin showLineNumbers
val paywallView = AdaptyUI.getPaywallView(
    activity,
    paywall,
    products,
    eventListener,
    insets,
    CustomProductTitleResolver()
)
``` 