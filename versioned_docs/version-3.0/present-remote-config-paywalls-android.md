---
title: "Present remote config paywalls"
description: "Display paywalls designed with remote config in your Android app."
metadataTitle: "Present remote config paywalls | Android SDK | Adapty Docs"
displayed_sidebar: sdkandroid
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can present paywalls that are designed using remote config in your Android app. This allows you to create and modify paywalls without updating your app.

## Get paywalls

First, fetch the paywalls data from Adapty:

```kotlin
Adapty.getPaywalls { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywalls = result.value
            // Present paywall
        }
        is AdaptyResult.Error -> {
            // Handle error
        }
    }
}
```

## Present paywall

Use the `Adapty.presentPaywall()` method to display a paywall:

```kotlin
Adapty.presentPaywall(paywall) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val purchase = result.value
            // Handle successful purchase
        }
        is AdaptyResult.Error -> {
            // Handle error
        }
    }
}
```

## Handle paywall events

You can listen for paywall events to track user interactions:

```kotlin
Adapty.setPaywallListener { event ->
    when (event) {
        is AdaptyPaywallEvent.PaywallShown -> {
            // Paywall was displayed
        }
        is AdaptyPaywallEvent.PaywallClosed -> {
            // Paywall was closed
        }
        is AdaptyPaywallEvent.PurchaseStarted -> {
            // Purchase process started
        }
        is AdaptyPaywallEvent.PurchaseCancelled -> {
            // Purchase was cancelled
        }
        is AdaptyPaywallEvent.PurchaseCompleted -> {
            // Purchase completed successfully
        }
        is AdaptyPaywallEvent.PurchaseFailed -> {
            // Purchase failed
        }
    }
}
```

## Customize paywall presentation

You can customize how the paywall is presented:

```kotlin
val options = AdaptyPaywallPresentationOptions.Builder()
    .setStyle(AdaptyPaywallStyle.MODAL) // or SHEET
    .setAnimated(true)
    .build()

Adapty.presentPaywall(paywall, options) { result ->
    // Handle result
}
```

## Handle purchase results

After a successful purchase, you'll receive a purchase object:

```kotlin
Adapty.presentPaywall(paywall) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val purchase = result.value
            // Access purchase details
            val productId = purchase.productId
            val transactionId = purchase.transactionId
            val purchaseDate = purchase.purchaseDate
        }
        is AdaptyResult.Error -> {
            // Handle purchase error
        }
    }
}
```

## Error handling

Handle various error scenarios:

```kotlin
Adapty.presentPaywall(paywall) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            // Handle success
        }
        is AdaptyResult.Error -> {
            when (result.error) {
                is AdaptyError.PurchaseCancelled -> {
                    // User cancelled the purchase
                }
                is AdaptyError.PurchaseFailed -> {
                    // Purchase failed
                }
                is AdaptyError.NetworkError -> {
                    // Network issues
                }
                else -> {
                    // Other errors
                }
            }
        }
    }
}
```

## Next steps

After presenting paywalls, you can:

1. [Handle paywall events](/android-handling-events)
2. [Check subscription status](/android-check-subscription-status)
3. [Restore purchases](/android-restore-purchase) 