---
title: "Webhook integration"
description: "Learn how to use webhooks to get instant notifications about subscription events like new trials and billing issues, enabling seamless automation and enhanced backend management for your app."
metadataTitle: "Understanding Webhooks: Real-Time Notifications for Subscription Events"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import WebhookEvents from '@site/src/components/reusable/WebhookEvents.md';


A webhook is a convenient and fast way to get notifications about [events](webhook-event-types-and-fields#webhook-event-types). For example, if a new trial is started, a subscription is renewed, or a billing issue occurs. The webhook mechanism works through a callback function. You set up a URL (called Endpoint URL) to which an HTTP request is sent when an event occurs. 

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

## Events sent to webhook

You can see all event types that can be sent to a webhook in the [Webhook event types and fields](webhook-event-types-and-fields) page.

You can send all of them to your webhook or choose only some of them. Consult our [Event flows](event-flows) page to decide which events are required or not. You can disable the event types you do not need when you [set up your Webhook integration](set-up-webhook-integration#step-3-configure-webhook-integration-in-the-adapty-dashboard). There, you can also replace the Adapty default event IDs with your own if required.

**What's next:**

- [Event flows](event-flows): Learn about the sequence of events and their dependencies.
- [Webhook event types and fields](webhook-event-types-and-fields): Explore detailed descriptions of each event and their data fields.
- [Set up webhook integration](set-up-webhook-integration): Step-by-step guidance on configuring your webhook in the Adapty Dashboard.
- [Test webhook integration](test-webhook): Ensure your webhook is set up correctly with our testing tools.
