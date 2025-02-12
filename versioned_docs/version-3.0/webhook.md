---
title: "Webhook integration"
description: "Adapty Webhook Integration | Adapty Docs"
metadataTitle: "Integrate webhooks in Adapty to automate subscription event tracking."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A webhook is a convenient and fast way to get notifications about [events](events). For example, if a new trial is started, a subscription is renewed, or a billing issue happens. The webhook mechanism works through a callback function. You set up a URL (called Endpoint URL) to which an HTTP request is sent when an event occurs. 


<Zoom>
  <img src={require('./img/e5dce30-image_3.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Unlike API requests, which require repeatedly requesting information from the server, a webhook is configured only once. When the target event occurs in your app, it immediately sends data via the HTTP protocol.

With webhooks integrated, you can:

- Keep track of subscriptions and purchases in your backend system.
- Automate processes and workflows based on subscription lifecycles.
- Engage with subscribers by reminding them of app benefits, addressing unsubscribe decisions, and handling billing issues.
- Conduct a detailed analysis of the user behavior.

**Integration characteristics**

| Integration characteristic | Description                                                 |
| :------------------------- | :---------------------------------------------------------- |
| Schedule                   | Real-time updates                                           |
| Data direction             | One-way data transmission: from Adapty to your server       |
| Adapty integration flow    | Events are sent by the Adapty server once they are received |

