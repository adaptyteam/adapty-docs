---
title: "Kotlin Multiplatform - Present new Paywall Builder paywalls"
description: "Learn how to present paywalls on Kotlin Multiplatform for effective monetization."
metadataTitle: "Presenting Paywalls on Kotlin Multiplatform | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only. The process for presenting paywalls differs for paywalls designed with remote config paywalls and [Observer mode](observer-vs-full-mode).

For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls-kmp).

:::

To display a paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance.

:::warning
Reusing the same `view` without recreating it may result in an error.
:::

```kotlin showLineNumbers title="Kotlin Multiplatform"
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.models.AdaptyPaywall
import kotlinx.coroutines.launch

viewModelScope.launch {
    val view = AdaptyUI.createPaywallView(paywall = paywall)
    view?.present()
}
```