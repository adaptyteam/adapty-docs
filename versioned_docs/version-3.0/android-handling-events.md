---
title: "Android - Handle paywall events"
description: "Handle Android subscription events efficiently with Adapty's event tracking tools."
metadataTitle: "Handling Events in Android | Adapty Docs"
toc_max_heading_level: 4
keywords: ['AdaptyUiEventListener', 'onActionPerformed', 'onProductSelected', 'onPurchaseStarted', 'onPurchaseFinished', 'onPurchaseFailure', 'onRestoreSuccess', 'onRestoreFailure', 'onAwaitingSubscriptionUpdateParams', 'onLoadingProductsFailure', 'onRenderingError']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import PaywallAction from '@site/src/components/reusable/PaywallAction.md';

<PaywallAction />

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning
This guide is for **new Paywall Builder paywalls** only which require Adapty SDK v3.0 or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Handle paywall events designed with legacy Paywall Builder](android-handling-events-legacy).
:::

<SampleApp />

If you need to control or monitor the processes that take place on the purchase screen, implement the `AdaptyUiEventListener` methods.

If you would like to leave the default behavior in some cases, you can extend `AdaptyUiDefaultEventListener` and override only those methods you want to change.

Below are the defaults from `AdaptyUiDefaultEventListener`.

### User-generated events

#### Product selection

If a product is selected for purchase (by a user or by the system), this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onProductSelected(
    product: AdaptyPaywallProduct,
    context: Context,
) {}
```

#### Started purchase

If a user initiates the purchase process, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onPurchaseStarted(
    product: AdaptyPaywallProduct,
    context: Context,
) {}
```

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Successful, canceled, or pending purchase

If `Adapty.makePurchase()` succeeds, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onPurchaseFinished(
    purchaseResult: AdaptyPurchaseResult,
    product: AdaptyPaywallProduct,
    context: Context,
) {
    if (purchaseResult !is AdaptyPurchaseResult.UserCanceled)
        context.getActivityOrNull()?.onBackPressed()
}
```

We recommend dismissing the screen in that case. 

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Failed purchase

If `Adapty.makePurchase()` fails, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onPurchaseFailure(
    error: AdaptyError,
    product: AdaptyPaywallProduct,
    context: Context,
) {}
```

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Successful restore

If `Adapty.restorePurchases()` succeeds, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onRestoreSuccess(
    profile: AdaptyProfile,
    context: Context,
) {}
```

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

#### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onRestoreFailure(
    error: AdaptyError,
    context: Context,
) {}
```

#### Upgrade subscription

If a new subscription is purchased while another is still active, override this method to replace the current one with the new one. If the active subscription should remain active and the new one is added separately, call `onSubscriptionUpdateParamsReceived(null)`:

```kotlin showLineNumbers title="Kotlin"
public override fun onAwaitingSubscriptionUpdateParams(
    product: AdaptyPaywallProduct,
    context: Context,
    onSubscriptionUpdateParamsReceived: SubscriptionUpdateParamsCallback,
) {
    onSubscriptionUpdateParamsReceived(AdaptySubscriptionUpdateParameters(...))
}
```

### Data fetching and rendering

#### Product loading errors

If you don't pass the products during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will report the error by invoking this method:

```kotlin showLineNumbers title="Kotlin"
public override fun onLoadingProductsFailure(
    error: AdaptyError,
    context: Context,
): Boolean = false
```

If you return `true`, AdaptyUI will repeat the request in 2 seconds.

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by calling this method:

```kotlin showLineNumbers title="Kotlin"
public override fun onRenderingError(
    error: AdaptyError,
    context: Context,
) {}
```

In a normal situation, such errors should not occur, so if you come across one, please let us know.