---
title: "Android - Handle paywall events"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

If you need to control or monitor the processes that take place on the purchase screen, implement the `AdaptyUiEventListener` methods.

If you would like to leave the default behavior in some cases, you can extend `AdaptyUiDefaultEventListener` and override only those methods you want to change.

Below are the defaults from `AdaptyUiDefaultEventListener`.

### User-generated events

#### Actions

When a user performs an action (like clicking a close, custom button, or opening a URL), the `onActionPerformed(…)` method will be triggered. You’ll need to define what each action should do. 

The following built-in actions are supported:

- `Close`
- `OpenUrl(url)`

Custom actions are handled differently. For example, if a user taps a custom button, like **Login** or **Open another paywall**, the delegate method `onActionPerformed(…)` will be triggered with the `Custom(id)` case and the `id` parameter is the **Button action ID** from the Adapty Dashboard. The ID for the custom action "login" is predefined, but for other custom actions, you can create your own IDs, like "open_another_paywall". 

Here’s an example, but feel free to handle the actions in your own way:

```kotlin title="Kotlin"
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
    when (action) {
        AdaptyUI.Action.Close -> (context as? Activity)?.onBackPressed()
        
        is AdaptyUI.Action.OpenUrl -> //launching intent to open url
       
        is AdaptyUI.Action.Custom -> //no default action
    }
}
```

:::tip

Make sure to implement responses for all [predefined and custom actions](paywall-buttons) you’ve set up in the Adapty Dashboard.

:::

#### Product selection

If a product is selected for purchase (by a user or by the system), this method will be invoked:

```kotlin title="Kotlin"
public override fun onProductSelected(
    product: AdaptyPaywallProduct,
    context: Context,
) {}
```

#### Started purchase

If a user initiates the purchase process, this method will be invoked:

```kotlin title="Kotlin"
public override fun onPurchaseStarted(
    product: AdaptyPaywallProduct,
    context: Context,
) {}
```

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Canceled purchase

If a user initiates the purchase process but manually interrupts it afterward, the method below will be invoked. This event occurs when the `Adapty.makePurchase()` function completes with the `USER_CANCELED` error:

```kotlin title="Kotlin"
public override fun onPurchaseCanceled(
    product: AdaptyPaywallProduct,
    context: Context,
) {}
```

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Successful purchase

If `Adapty.makePurchase()` succeeds, this method will be invoked:

```kotlin title="Kotlin"
public override fun onPurchaseSuccess(
    profile: AdaptyProfile?,
    product: AdaptyPaywallProduct,
    context: Context,
) {
    (context as? Activity)?.onBackPressed()
}
```

We recommend dismissing the screen in that case. 

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Failed purchase

If `Adapty.makePurchase()` fails, this method will be invoked:

```kotlin title="Kotlin"
public override fun onPurchaseFailure(
    error: AdaptyError,
    product: AdaptyPaywallProduct,
    context: Context,
) {}
```

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Successful restore

If `Adapty.restorePurchases()` succeeds, this method will be invoked:

```kotlin title="Kotlin"
public override fun onRestoreSuccess(
    profile: AdaptyProfile,
    context: Context,
) {}
```

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

#### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```kotlin title="Kotlin"
public override fun onRestoreFailure(
    error: AdaptyError,
    context: Context,
) {}
```

#### Upgrade subscription

If a new subscription is purchased while another one is still active, override this method to replace the current subscription with the new one. If the active subscription should remain active and the new one is added separately, return `null`:

```kotlin title="Kotlin"
public override fun onAwaitingSubscriptionUpdateParams(
    product: AdaptyPaywallProduct,
    context: Context,
): AdaptySubscriptionUpdateParameters? {
    return AdaptySubscriptionUpdateParameters(...)
}
```

### Data fetching and rendering

#### Product loading errors

If you don't pass the products during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will report the error by invoking this method:

```kotlin title="Kotlin"
public override fun onLoadingProductsFailure(
    error: AdaptyError,
    context: Context,
): Boolean = false
```

If you return `true`, AdaptyUI will repeat the request in 2 seconds.

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by calling this method:

```kotlin title="Kotlin"
public override fun onRenderingError(
    error: AdaptyError,
    context: Context,
) {}
```

In a normal situation, such errors should not occur, so if you come across one, please let us know.