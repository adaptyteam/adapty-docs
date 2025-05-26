---
title: "Webhook integration"
description: "Integrate webhooks in Adapty to automate subscription event tracking."
metadataTitle: "Adapty Webhook Integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import WebhookEvents from '@site/src/components/reusable/WebhookEvents.md';

A webhook is an efficient way to receive real-time notifications about [events](webhook-event-types-and-fields#webhook-event-types), especially for tracking subscription and purchase changes. This allows you to monitor subscriber status and react accordingly.

Unlike API requests that require constant polling, a webhook is configured once and automatically sends data via HTTP when an event occurs.

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

You can send all of them to your webhook or choose only some of them. Consult our [Event flows](event-flows) page to decide which events are required or not. You can disable the event types you do not need when you [set up your Webhook integration](set-up-webhook-integration#configure-webhook-integration-in-the-adapty-dashboard). There, you can also replace the Adapty default event IDs with your own if required.

**What's next:**

- [Webhook event types and fields](webhook-event-types-and-fields): Explore detailed descriptions of each event and their data fields.
- [Event flows](event-flows): Learn about the sequence of events and their dependencies.
- [Set up webhook integration](set-up-webhook-integration): Step-by-step guidance on configuring your webhook in the Adapty Dashboard.
- [Test webhook integration](test-webhook): Ensure your webhook is set up correctly with our testing tools.
