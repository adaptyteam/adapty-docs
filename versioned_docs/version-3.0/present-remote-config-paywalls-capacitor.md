---
title: "Render paywall designed by remote config in Capacitor SDK"
description: "Discover how to present remote config paywalls in Adapty Capacitor SDK to personalize user experience."
metadataTitle: "Presenting Remote Config Paywalls | Capacitor SDK | Adapty Docs"
keywords: ['remote config', 'Capacitor']
displayed_sidebar: sdkcapacitor
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using remote config, you'll need to implement rendering in your mobile app's code to display it to users. Since remote config offers flexibility tailored to your needs, you're in control of what's included and how your paywall view appears. We provide a method for fetching the remote configuration, giving you the autonomy to showcase your custom paywall configured via remote config.

## Get paywall remote config and present it

To get a remote config of a paywall, access the `remoteConfig` property and extract the needed values.

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  const paywall = await adapty.getPaywall({ 
    placementId: 'YOUR_PLACEMENT_ID',
    params: {
      fetchPolicy: 'reload_revalidating_cache_data', // Load from server, fallback to cache
      loadTimeoutMs: 5000 // 5 second timeout
    }
  });
  const headerText = paywall.remoteConfig?.['header_text'];
} catch (error) {
  console.error('Failed to fetch paywall:', error);
}
```

At this point, once you've received all the necessary values, it's time to render and assemble them into a visually appealing page. Ensure that the design accommodates various mobile phone screens and orientations, providing a seamless and user-friendly experience across different devices.

:::warning
Make sure to [record the paywall view event](present-remote-config-paywalls-capacitor#track-paywall-view-events) as described below, allowing Adapty analytics to capture information for funnels and A/B tests.
:::

After you've done with displaying the paywall, continue with setting up a purchase flow. When the user makes a purchase, simply call `.makePurchase()` with the product from your paywall. For details on the`.makePurchase()` method, read [Making purchases](capacitor-making-purchases).

We recommend [creating a backup paywall called a fallback paywall](capacitor-use-fallback-paywalls). This backup will display to the user when there's no internet connection or cache available, ensuring a smooth experience even in these situations. 

## Track paywall view events

Adapty assists you in measuring the performance of your paywalls. While we gather data on purchases automatically, logging paywall views needs your input because only you know when a customer sees a paywall. 

To log a paywall view event, simply call `.logShowPaywall(paywall)`, and it will be reflected in your paywall metrics in funnels and A/B tests.

:::important
Calling `.logShowPaywall(paywall)` is not needed if you are displaying paywalls created in the [paywall builder](adapty-paywall-builder.md).
:::

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.logShowPaywall({ paywall });
} catch (error) {
  console.error('Failed to log paywall view:', error);
}
```

Request parameters:

| Parameter   | Presence | Description                                                |
| :---------- | :------- | :--------------------------------------------------------- |
| **paywall** | required | An [`AdaptyPaywall`](capacitor-sdk-models#adaptypaywall) object. | 
