---
title: "Enable purchases by using paywalls in Kotlin Multiplatform SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls kotlin multiplatform', 'sdk kotlin multiplatform', 'paywall', 'paywall builder', 'getPaywall']
rank: 70
displayed_sidebar: sdkkmp
---

import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';

To enable in-app purchases, you need to understand three key concepts:

- [**Products**](product.md) – anything users can buy (subscriptions, consumables, lifetime access)
- [**Paywalls**](paywalls.md) are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.
- [**Placements**](placements.md) – where and when you show paywalls in your app (like `main`, `onboarding`, `settings`). You set up paywalls for placements in the dashboard, then request them by placement ID in your code. This makes it easy to run A/B tests and show different paywalls to different users.

Adapty offers you three ways to enable purchases in your app. Select one of them depending on your app requirements:

| Implementation            | Complexity | When to use                                                                                                                                                                                                                                |
|---------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Adapty Paywall Builder    | ✅ Easy     | You [create a complete, purchase-ready paywall in the no-code builder](quickstart-paywalls). Adapty automatically renders it and handles all the complex purchase flow, receipt validation, and subscription management behind the scenes. |
| Manually created paywalls | 🟡 Medium  | You implement your paywall UI in your app code, but still get the paywall object from Adapty to maintain flexibility in product offerings. See the [guide](kmp-quickstart-manual).                                                         |
| Observer mode             | 🔴 Hard    | You already have your own purchase handling infrastructure and want to keep using it. Note that the observer mode has its limitations in Adapty. See the [article](observer-vs-full-mode).                                                 |

:::important
**The steps below show how to implement a paywall created in the Adapty paywall builder.**

If you don't want to use the paywall builder, see the [guide for handling purchases in manually created paywalls](kmp-making-purchases.md).
:::

To display a paywall created in the Adapty paywall builder, in your app code, you only need to:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall and Adapty will handle purchases for you**: Show the paywall container you've got in your app.
3. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.

## 1. Get the paywall

Your paywalls are associated with placements configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

To get a paywall created in the Adapty paywall builder, you need to:

1. Get the `paywall` object by the [placement](placements.md) ID using the `getPaywall` method and check whether it is a paywall created in the builder.

2. Get the paywall view configuration using the `createPaywallView` method. The view configuration contains the UI elements and styling needed to display the paywall.

:::important
To get the view configuration, you must switch on the **Show on device** toggle in the Paywall Builder. Otherwise, you will get an empty view configuration, and the paywall won't be displayed.
:::

```kotlin showLineNumbers
Adapty.getPaywall("YOUR_PLACEMENT_ID")
    .onSuccess { paywall ->
        if (!paywall.hasViewConfiguration) {
            return@onSuccess
        }
        
        val paywallView = AdaptyUI.createPaywallView(paywall = paywall)
        paywallView?.present()
    }
    .onError { error ->
        // handle the error
    }
```

## 2. Display the paywall

Now, when you have the paywall configuration, it's enough to add a few lines to display your paywall.

In order to display the visual paywall on the device screen, you must first configure it. To do this, call the method `AdaptyUI.createPaywallView()`:

```kotlin showLineNumbers
val paywallView = AdaptyUI.createPaywallView(paywall = paywall)
paywallView?.present()
```

After the view has been successfully created, you can present it on the screen of the device.

:::tip
For more details on how to display a paywall, see our [guide](kmp-present-paywalls.md).
:::

## 3. Handle button actions

When users click buttons in the paywall, the Kotlin Multiplatform SDK automatically handles purchases, restoration, closing the paywall, and opening links.

However, other buttons have custom or pre-defined IDs and require handling actions in your code. Or, you may want to override their default behavior.

For example, here is the default behavior for the close button. You don't need to add it in the code, but here, you can see how it is done if needed.

:::tip
Read our guides on how to handle button [actions](kmp-handle-paywall-actions.md) and [events](kmp-handling-events.md).
:::

```kotlin showLineNumbers
AdaptyUI.setObserver(object : AdaptyUIObserver {
    override fun paywallViewDidPerformAction(view: AdaptyUIView, action: AdaptyUIAction) {
        when (action) {
            AdaptyUIAction.CloseAction, AdaptyUIAction.AndroidSystemBackAction -> view.dismiss()
        }
    }
})
```

## Next steps

Your paywall is ready to be displayed in the app.

Now, you need to [check the users' access level](kmp-check-subscription-status.md) to ensure you display a paywall or give access to paid features to right users.

## Full example

Here is how all those steps can be integrated in your app together.

```kotlin showLineNumbers
// Set up the observer for handling paywall actions
AdaptyUI.setObserver(object : AdaptyUIObserver {
    override fun paywallViewDidPerformAction(view: AdaptyUIView, action: AdaptyUIAction) {
        when (action) {
            is AdaptyUIAction.CloseAction -> view.dismiss()
        }
    }
})

// Get and display the paywall
Adapty.getPaywall("YOUR_PLACEMENT_ID")
    .onSuccess { paywall ->
        if (!paywall.hasViewConfiguration) {
            // Use custom logic
            return@onSuccess
        }

        val paywallView = AdaptyUI.createPaywallView(paywall = paywall)
        paywallView?.present()
    }
    .onError { error ->
        // handle the error
    }
```
