---
title: "Implement paywalls manually in iOS SDK"
description: "Learn how to implement paywalls manually in your iOS app with Adapty SDK."
metadataTitle: "Implement Paywalls Manually | iOS SDK | Adapty Docs"
displayed_sidebar: sdkios
---

import CustomDocCardList from '@site/src/components/CustomDocCardList';

## Accept purchases

If you are working with paywalls you've implemented yourself, you can delegate handling purchases to Adapty, using the `makePurchase` method. This way, we will handle all the user scenarios, and you will only need to handle the purchase results.

:::important
`makePurchase` works with products created in the Adapty dashboard. Make sure you configure products and ways to retrieve them in the dashboard by following the [quickstart guide](quickstart).
:::

<CustomDocCardList ids={['fetch-paywalls-and-products', 'present-remote-config-paywalls', 'making-purchases', 'restore-purchase', 'ios-troubleshoot-purchases']} />

## Observer mode

If you want to implement your own purchase handling logic from scratch, but still want to benefit from the advanced analytics in Adapty, you can use the observer mode.

:::important
Consider the observer mode limitations [here](observer-vs-full-mode).
:::

<CustomDocCardList ids={['implement-observer-mode', 'report-transactions-observer-mode', 'ios-present-paywall-builder-paywalls-in-observer-mode', 'ios-troubleshoot-purchases']} />
