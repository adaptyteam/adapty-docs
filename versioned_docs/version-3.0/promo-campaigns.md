---
title: "Promo Campaigns"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Promo Campaigns designed for upselling in your app. Send promo offers with automated campaigns in push notifications. To start:

- Create a [segment](segments) or use predefined one
- Target a deal with an [A/B Test](ab-tests) 
- Set a trigger for sending a push

:::note
Promo offers are sent _only once per campaign per user._ So you can't accidentally spam your user with many pushes. Each user can receive only one message for a given campaign. If you need to send multiple pushes, just create another campaign.
:::

<Zoom>
  <img src={require('./img/ca4f82e-Promo_campaigns.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Before you start

:::warning
Make sure to upload the [push certificate](ios-push-notifications) for iOS and set up [FCM server key](android-push-notifications) for Android in Adapty Dashboard, without them, we can't send push notifications.
:::

### Creation

<Zoom>
  <img src={require('./img/ca4f82e-Promo_campaigns.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

There are two ways to send a push with a promo offer:

1. Action-based. Choose the [event](events) and Adapty will send a promo offer right after the event was triggered
2. One-time. No auto trigger is set, you can only manually trigger sending a push from a table view

Also, you can set a delay for sending push notifications. This could be especially useful in action-based campaigns so users don't feel tracked so much.

<Zoom>
  <img src={require('./img/7fd39d3-Delay.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<Zoom>
  <img src={require('./img/6d1e90f-Promo_campaigns_send_now.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

You can use Send now button multiple times, but only new users will receive the offer.