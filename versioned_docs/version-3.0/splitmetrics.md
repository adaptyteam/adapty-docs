---
title: "SplitMetrics Acquire"
description: "Use SplitMetrics with Adapty for subscription A/B testing and optimization."
metadataTitle: "SplitMetrics Integration for A/B Testing | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

With [SplitMetrics Acquire ](https://splitmetrics.com/acquire/)integration, you can see exactly how much money your Apple Search Ads make from subscriptions. And you can track your users for months to know how much money your ads make over time.

In addition, Adapty sends [subscription events](events) to SplitMetrics Acquire so that you can build custom dashboards and automation there, based on Apple Search Ads attribution.  
It doesn't add any attribution data to Adapty, as we already have everything we need from ASA directly.

## How to set up SplitMetrics Acquire integration

To integrate SplitMetrics Acquire go to [Integrations > SplitMetrics Acquire](https://app.adapty.io/integrations/splitmetrics) and set credentials.

<Zoom>
  <img src={require('./img/8255349-CleanShot_2023-08-14_at_17.39.422x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Open your SplitMetrics Acquire account, hover over one of the MMP logos, and click the **Settings** button. Find your Client ID in the dialog under item **5**, copy it, and then paste it to Adapty as **Client ID**.

<Zoom>
  <img src={require('./img/4d0b2b6-Adapty.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<Zoom>
  <img src={require('./img/4f8d0b8-AdaptyGuide.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

You will also have to set Apple App ID to use the integration. To find your App ID, open your app page in App Store Connect, go to the **App Information page** in the **General** section, and find the **Apple ID** in the left bottom part of the screen.

<Zoom>
  <img src={require('./img/61578ee-CleanShot_2022-04-20_at_17.55.03.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Events and tags

Below the credentials, there are three groups of events you can send to SplitMetrics Acquire from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).

<Zoom>
  <img src={require('./img/1b0c777-CleanShot_2023-08-11_at_14.56.362x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

We recommend using the default event names provided by Adapty. But you can change the event names based on your needs. Adapty will send subscription events to SplitMetrics Acquire using a server-to-server integration, allowing you to view all subscription events in your SplitMetrics dashboard.

## SDK configuration

You don't have to configure anything on the SDK side, but we recommend sending `customerUserId` to Adapty for better accuracy.

:::warning
Make sure you've configured [Apple Search Ads](apple-search-ads) in Adapty and [uploaded credentials](https://app.adapty.io/settings/apple-search-ads), without them, SplitMetrics Acquire won't work.
:::

## Troubleshooting

If the integration with SplitMetrics Acquire isn't working despite the correct setup, ensure the **Receive Apple Search Ads attribution in Adapty** toggle is enabled in the [**App Settings** -> **Apple Search Ads** tab.