---
title: "Kotlin Multiplatform - Present new Paywall Builder paywalls"
description: "Learn how to present paywalls on Kotlin Multiplatform for effective monetization."
metadataTitle: "Presenting Paywalls on Kotlin Multiplatform | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only which require SDK v3.0. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builde, remote config paywalls, and [Observer mode](observer-vs-full-mode).

- For presenting **Legacy Paywall Builder paywalls**, check out [Kotlin Multiplatform - Present legacy Paywall Builder paywalls](kotlin-multiplatform-present-paywalls-legacy).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).
- For presenting **Observer mode paywalls**, see [Kotlin Multiplatform - Present Paywall Builder paywalls in Observer mode](kotlin-multiplatform-present-paywall-builder-paywalls-in-observer-mode)

:::

<Tabs groupId="current-os" queryString>
<TabItem value="views" label="Views" default>

In order to display the visual paywall on the device screen, you must first configure it. To do this, call the method `AdaptyUI.getPaywallView()` or create the `AdaptyPaywallView` directly:

```kotlin showLineNumbers
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.models.AdaptyPaywall
import com.adapty.kmp.models.AdaptyPaywallProduct

val paywallView = AdaptyUI.getPaywallView(
    paywall = paywall,
    products = products,
    observer = observer,
    loadProducts = loadProducts
)
```

After the view has been successfully created, you can add it to the view hierarchy and display it on the screen of the device.

If you get `AdaptyPaywallView` _not_ by calling `AdaptyUI.getPaywallView()`, you will also need to call the `.showPaywall()` method.

</TabItem>
<TabItem value="compose" label="Jetpack Compose" default>

In order to display the visual paywall on the device screen, you must first configure it. To do this, use this composable function:

```kotlin showLineNumbers
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.models.AdaptyPaywall
import com.adapty.kmp.models.AdaptyPaywallProduct

AdaptyPaywallScreen(
    paywall = paywall,
    products = products,
    observer = observer,
    loadProducts = loadProducts
)
```
</TabItem>
</Tabs>

Request parameters:

| Parameter                     | Presence | Description                                                  |
| :---------------------------- | :------- | :----------------------------------------------------------- |
| **paywall**                   | required | Supply an `AdaptyPaywall` object containing visual details of the paywall. Use the `Adapty.getPaywall(placementId)` method to load it. Refer to [Fetch the visual configuration of paywall](get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) topic for more details. |
| **products**                  | optional | Provide an array of `AdaptyPaywallProduct `to optimize the display timing of products on the screen. If `null` is passed, AdaptyUI will automatically fetch the required products. |
| **observer**                  | optional | Provide an `AdaptyUIObserver` to observe paywall events. Refer to [Handling paywall events](kotlin-multiplatform-handling-events)  topic for more details. |
| **loadProducts**              | optional | A boolean parameter that determines whether to load products automatically. Default is `false`. |

<SampleApp />

## Example usage

Here's a complete example of how to present a paywall:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.models.AdaptyPaywall
import com.adapty.kmp.models.onError
import com.adapty.kmp.models.onSuccess

// Fetch paywall
Adapty.getPaywall(placementId = "YOUR_PLACEMENT_ID")
    .onSuccess { paywall ->
        // Present paywall
        AdaptyUI.getPaywallView(
            paywall = paywall,
            products = null,
            observer = yourObserver,
            loadProducts = true
        )
    }.onError { error ->
        // Handle error
    }
``` 