---
title: "Implement paywalls manually in Kotlin Multiplatform SDK"
description: "Learn how to implement paywalls manually in your Kotlin Multiplatform app with Adapty SDK."
metadataTitle: "Implement Paywalls Manually | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import CustomDocCardList from '@site/src/components/CustomDocCardList';

## Accept purchases

If you are working with paywalls you've implemented yourself, you can delegate handling purchases to Adapty, using the `makePurchase` method. This way, we will handle all the user scenarios, and you will only need to handle the purchase results.

:::important
`makePurchase` works with products created in the Adapty dashboard. Make sure you configure products and ways to retrieve them in the dashboard by following the [quickstart guide](quickstart).
:::

<CustomDocCardList ids={['fetch-paywalls-and-products-kmp', 'present-remote-config-paywalls-kmp', 'kmp-making-purchases', 'kmp-restore-purchase', 'kmp-troubleshoot-purchases']} />

## Observer mode

If you want to implement your own purchase handling logic from scratch, but still want to benefit from the advanced analytics in Adapty, you can use the observer mode.

:::important
Consider the observer mode limitations [here](observer-vs-full-mode).
:::

<CustomDocCardList ids={['implement-observer-mode-kmp', 'report-transactions-observer-mode-kmp', 'kmp-troubleshoot-purchases']} />
