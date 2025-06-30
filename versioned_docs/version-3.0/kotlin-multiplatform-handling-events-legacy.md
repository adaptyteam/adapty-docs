---
title: "Kotlin Multiplatform - Handle legacy Paywall Builder paywall events"
description: "Learn how to handle legacy paywall events on Kotlin Multiplatform for effective user interaction."
metadataTitle: "Handling Legacy Paywall Events on Kotlin Multiplatform | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

To handle paywall events, you need to implement the `AdaptyUiEventListener` interface. We recommend extending `AdaptyUiDefaultEventListener` for ease of use, as it provides default implementations for all methods.

:::warning

This guide is for **legacy Paywall Builder paywalls** only. The process for handling events differs for paywalls designed with different versions of Paywall Builder, remote config paywalls, and [Observer mode](observer-vs-full-mode).

- For handling **new Paywall Builder paywall events**, check out [Kotlin Multiplatform - Handle new Paywall Builder paywall events](kotlin-multiplatform-handling-events).
- For handling **Remote config paywall events**, see [Render paywall designed by remote config](present-remote-config-paywalls).
- For handling **Observer mode paywall events**, see [Kotlin Multiplatform - Present Paywall Builder paywalls in Observer mode](kotlin-multiplatform-present-paywall-builder-paywalls-in-observer-mode)

:::

## Basic event handling

Here's a basic example of how to handle paywall events:

```kotlin showLineNumbers
class MyPaywallEventListener : AdaptyUiDefaultEventListener() {
    override fun onPaywallViewClosed(paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onPaywallViewOpened(paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onProductSelected(product: AdaptyPaywallProduct, paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onPurchaseStarted(product: AdaptyPaywallProduct, paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onPurchaseCancelled(product: AdaptyPaywallProduct, paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onPurchaseCompleted(product: AdaptyPaywallProduct, paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onPurchaseFailure(product: AdaptyPaywallProduct, error: AdaptyError, paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onRestoreStarted(paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onRestoreCompleted(paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onRestoreFailure(error: AdaptyError, paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onPromoCodeStarted(paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onPromoCodeCompleted(paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onPromoCodeFailure(error: AdaptyError, paywall: AdaptyPaywall) {
        // some code snippet
    }
    
    override fun onCustomAction(action: AdaptyPaywallAction, paywall: AdaptyPaywall) {
        // some code snippet
    }
}
```

## Available events

| Event | Description |
|-------|-------------|
| `onPaywallViewClosed` | Called when the paywall view is closed by the user |
| `onPaywallViewOpened` | Called when the paywall view is opened |
| `onProductSelected` | Called when a product is selected by the user |
| `onPurchaseStarted` | Called when a purchase is initiated |
| `onPurchaseCancelled` | Called when a purchase is cancelled by the user |
| `onPurchaseCompleted` | Called when a purchase is successfully completed |
| `onPurchaseFailure` | Called when a purchase fails |
| `onRestoreStarted` | Called when restore purchases is initiated |
| `onRestoreCompleted` | Called when restore purchases is completed successfully |
| `onRestoreFailure` | Called when restore purchases fails |
| `onPromoCodeStarted` | Called when promo code entry is initiated |
| `onPromoCodeCompleted` | Called when promo code is successfully applied |
| `onPromoCodeFailure` | Called when promo code application fails |
| `onCustomAction` | Called when a custom action is triggered |

## Pass event listener to paywall

To use your event listener, pass it to the paywall view:

```kotlin showLineNumbers
val eventListener = MyPaywallEventListener()

val paywallView = AdaptyUI.getPaywallView(
    activity,
    paywall,
    products,
    eventListener,
    insets,
    productTitleResolver
)
```

<SampleApp /> 