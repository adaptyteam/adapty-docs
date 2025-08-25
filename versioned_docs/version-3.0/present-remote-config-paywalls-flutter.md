---
title: "Render paywall designed by remote config in Flutter SDK"
description: "Discover how to present remote config paywalls in Adapty Flutter SDK to personalize user experience."
metadataTitle: "Presenting Remote Config Paywalls | Flutter SDK | Adapty Docs"
keywords: ['remote config']
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using remote config, you'll need to implement rendering in your mobile app's code to display it to users. Since remote config offers flexibility tailored to your needs, you're in control of what's included and how your paywall view appears. We provide a method for fetching the remote configuration, giving you the autonomy to showcase your custom paywall configured via remote config.

## Get paywall remote config and present it

To get a remote config of a paywall, access the `remoteConfig` property and extract the needed values.

```dart showLineNumbers
try {
  final paywall = await Adapty().getPaywall(id: "YOUR_PLACEMENT_ID");
  final String? headerText = paywall.remoteConfig?['header_text'];
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

At this point, once you've received all the necessary values, it's time to render and assemble them into a visually appealing page. Ensure that the design accommodates various mobile phone screens and orientations, providing a seamless and user-friendly experience across different devices.

:::warning
Make sure to [record the paywall view event](present-remote-config-paywalls-flutter#track-paywall-view-events) as described below, allowing Adapty analytics to capture information for funnels and A/B tests.
:::

After you've done with displaying the paywall, continue with setting up a purchase flow. When the user makes a purchase, simply call `.makePurchase()` with the product from your paywall. For details on the`.makePurchase()` method, read [Making purchases](flutter-making-purchases).

We recommend [creating a backup paywall called a fallback paywall](fallback-paywalls-flutter). This backup will display to the user when there's no internet connection or cache available, ensuring a smooth experience even in these situations. 

## Track paywall view events

Adapty assists you in measuring the performance of your paywalls. While we gather data on purchases automatically, logging paywall views needs your input because only you know when a customer sees a paywall. 

To log a paywall view event, simply call `.logShowPaywall(paywall)`, and it will be reflected in your paywall metrics in funnels and A/B tests.

:::important
Calling `.logShowPaywall(paywall)` is not needed if you are displaying paywalls created in the [paywall builder](adapty-paywall-builder.md).
:::

```dart showLineNumbers
try {
  final result = await Adapty().logShowPaywall(paywall: paywall);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

Request parameters:

| Parameter   | Presence | Description                                                |
| :---------- | :------- | :--------------------------------------------------------- |
| **paywall** | required | An [`AdaptyPaywall`](sdk-models-flutter#adaptypaywall) object. | 