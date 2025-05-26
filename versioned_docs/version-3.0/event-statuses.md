---
title: "Integration event statuses"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty determines deliverability based on the HTTP status code, considering any response outside the `200-399` range as a failure.

You can track the status of integration events in the **Event List** within the Adapty Dashboard. The system displays statuses for all enabled integrations, regardless of whether a specific event type is turned on for a given integration.

- Black: The event was successfully sent.
- <span style={{ color: 'grey' }}>Grey:</span> The event type is disabled for this integration.
- <span style={{ color: 'red' }}>Red:</span> There is an issue with the integration that requires attention.

For more details on failed events, hover over the integration name to see a tooltip with specific error information.

<Zoom>
  <img src={require('./img/event-status.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom> 

The **Event Feed** displays data from the past two weeks to optimize performance. This limitation improves page loading speed, making it easier for users to navigate and analyze events efficiently.