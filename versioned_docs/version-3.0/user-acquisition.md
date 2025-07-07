---
title: "User Acquisition"
description: "Connect with Adapty User Acquisition to blend ad spending and subscription revenue and see the whole app economy in one place."
metadataTitle: "Connecting with Adapty User Acquisition | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty's User Acquisition helps you connect ad spend with subscription revenue, giving you a complete view of your app's economy in one place. 

This is a one-way integration — to see your revenue data in User Acquisition, you must first enable the integration in Adapty.

## How to set up User Acquisition integration
To enable the integration:
1. Go to [Integrations > Adapty](https://app.adapty.io/integrations/user-acquisition) in the Adapty Dashboard.
2. Turn on the toggle.

Once your events begin firing, you’ll see the following details for each event:
- Event name
- Status
- Environment
- Date time

<Zoom>
  <img src={require('./img/toggle-ua.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Events

By default, Adapty sends three groups of events to User Acquisition:
- Trials
- Subscription
- Issues

You can check the full list of supported events [here](events.md).

<Zoom>
  <img src={require('./img/events-ua.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
