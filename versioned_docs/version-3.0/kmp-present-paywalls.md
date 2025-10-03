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

## Custom tags

Custom tags let you avoid creating separate paywalls for different scenarios. Imagine a single paywall that adapts dynamically based on user data. For example, instead of a generic "Hello!", you could greet users personally with "Hello, John!" or "Hello, Ann!"

Here are some ways you can use custom tags:

- Display the user's name or email on the paywall.
- Show the current day of the week to boost sales (e.g., "Happy Thursday").
- Add personalized details about the products you're selling (like the name of a fitness program or a phone number in a VoIP app).

Custom tags help you create a flexible paywall that adapts to various situations, making your app's interface more personalized and engaging.

:::warning
Make sure to add fallbacks for every line with custom tags.

Remember to include fallbacks for every line with custom tags.

In some cases, your app might not know what to replace a custom tag with—especially if users are on an older version of the AdaptyUI SDK. To prevent this, always add fallback text that will replace lines containing unknown custom tags. Without this, users might see the tags displayed as code (`<USERNAME/>`).
:::

To use custom tags in your paywall, pass them when creating the paywall view:

```kotlin showLineNumbers
import kotlinx.coroutines.launch

viewModelScope.launch {
    val customTags = mapOf(
        "USERNAME" to "John",
        "DAY_OF_WEEK" to "Thursday"
    )
    
    val view = AdaptyUI.createPaywallView(
        paywall = paywall,
        customTags = customTags
    )
    view?.present()
}
```

## Custom timers

The paywall timer is a great tool for promoting special and seasonal offers with a time limit. However, it's important to note that this timer isn't connected to the offer's validity or the campaign's duration. It's simply a standalone countdown that starts from the value you set and decreases to zero. When the timer reaches zero, nothing happens—it just stays at zero.

You can customize the text before and after the timer to create the desired message, such as: "Offer ends in: 10:00 sec."

To use custom timers in your paywall, pass them when creating the paywall view:

```kotlin showLineNumbers
import kotlinx.coroutines.launch
import kotlinx.datetime.LocalDateTime

viewModelScope.launch {
    val customTimers = mapOf(
        "CUSTOM_TIMER_NY" to LocalDateTime(2025, 1, 1, 0, 0, 0),
        "CUSTOM_TIMER_SALE" to LocalDateTime(2024, 12, 31, 23, 59, 59)
    )
    
    val view = AdaptyUI.createPaywallView(
        paywall = paywall,
        customTimers = customTimers
    )
    view?.present()
}
```