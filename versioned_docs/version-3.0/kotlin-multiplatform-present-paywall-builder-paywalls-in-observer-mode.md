---
title: "Kotlin Multiplatform - Present Paywall Builder paywalls in Observer mode"
description: "Learn how to present Paywall Builder paywalls in Observer mode on Kotlin Multiplatform."
metadataTitle: "Presenting Paywall Builder Paywalls in Observer Mode on Kotlin Multiplatform | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Observer mode allows you to handle purchases and subscription status yourself while using Adapty for sending subscription events and analytics. In this mode, Adapty SDK won't close any transactions, so you need to handle them manually.

## Enable Observer mode

To enable Observer mode, set the `observerMode` parameter to `true` during Adapty initialization:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig
import com.adapty.kmp.models.AdaptyLogLevel

Adapty.activate(
    AdaptyConfig.Builder("YOUR_API_KEY")
        .withLogLevel(AdaptyLogLevel.DEBUG)
        .withObserverMode(true) // Enable observer mode
        .withCustomerUserId(null)
        .withIpAddressCollectionDisabled(false)
        .withAppleIdfaCollectionDisabled(false)
        .withGoogleAdvertisingIdCollectionDisabled(false)
        .withActivateUI(true)
        .build(),
    onError = { error ->
        error?.let {
            // Handle error
        }
    }
)
```

## Present paywalls in Observer mode

When presenting paywalls in Observer mode, you need to handle the purchase flow manually:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.models.AdaptyPaywall
import com.adapty.kmp.models.onError
import com.adapty.kmp.models.onSuccess

class ObserverModePaywallHandler : AdaptyUIObserver {
    override fun paywallViewDidStartPurchase(view: AdaptyUIView, product: AdaptyPaywallProduct) {
        // Handle purchase start manually
        // You can implement your own purchase logic here
    }

    override fun paywallViewDidFinishPurchase(
        view: AdaptyUIView,
        product: AdaptyPaywallProduct,
        purchaseResult: AdaptyPurchaseResult
    ) {
        when (purchaseResult) {
            is AdaptyPurchaseResult.Success -> {
                // Handle successful purchase
                // You may need to close the transaction manually
                if (purchaseResult.profile.accessLevels["premium"]?.isActive == true) {
                    view.dismiss()
                }
            }
            AdaptyPurchaseResult.Pending -> {
                // Handle pending purchase
            }
            AdaptyPurchaseResult.UserCanceled -> {
                // Handle user cancellation
            }
        }
    }

    override fun paywallViewDidFailPurchase(
        view: AdaptyUIView,
        product: AdaptyPaywallProduct,
        error: AdaptyError
    ) {
        // Handle purchase failure
    }
}

// Present paywall with observer mode handler
Adapty.getPaywall(placementId = "YOUR_PLACEMENT_ID")
    .onSuccess { paywall ->
        AdaptyUI.getPaywallView(
            paywall = paywall,
            products = null,
            observer = ObserverModePaywallHandler(),
            loadProducts = true
        )
    }.onError { error ->
        // Handle error
    }
```

## Important considerations

- In Observer mode, you are responsible for handling all purchase transactions
- Make sure to properly close transactions to avoid billing issues
- Test thoroughly to ensure your purchase flow works correctly
- Consider implementing proper error handling and retry logic

<SampleApp /> 