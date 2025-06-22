---
title: "Webhook integration"
description: "Integrate webhooks in Adapty to automate subscription event tracking."
metadataTitle: "Adapty Webhook Integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import WebhookEvents from '@site/src/components/reusable/WebhookEvents.md';

A webhook is an efficient way to receive real-time notifications about [events](webhook-event-types-and-fields#webhook-event-types), especially for tracking subscription and purchase changes. It helps you monitor subscriber status and respond accordingly.

Unlike API requests that require constant polling, a webhook is configured once and automatically sends data via HTTP when an event occurs.

With webhooks integrated, you can:

- Track subscriptions and purchases in your backend system.
- Automate processes and workflows based on subscription lifecycles.
- Engage with subscribers by highlighting app benefits, addressing unsubscribe reasons, and handling billing issues.
- Analyze user behavior in greater detail.

**Integration characteristics**

| Integration characteristic | Description                                                 |
| :------------------------- | :---------------------------------------------------------- |
| Schedule                   | Real-time updates                                           |
| Data direction             | One-way data transmission: from Adapty to your server       |
| Adapty integration flow    | Events are sent by the Adapty server once they are received |

## Events sent to webhook

You can see all event types that can be sent to a webhook in the [Webhook event types and fields](webhook-event-types-and-fields) page.

You can choose to send all event types to your webhook or select only the ones you need. To help you decide which events are necessary, refer to the [Event flows](event-flows) page.

When [setting up your Webhook integration](set-up-webhook-integration#configure-webhook-integration-in-the-adapty-dashboard), you can disable any event types you don’t need. You can also replace Adapty’s default event IDs with your own, if required

**What's next:**

- [Webhook event types and fields](webhook-event-types-and-fields): Explore detailed descriptions of each event and their data fields.
- [Event flows](event-flows):  Learn how events are triggered and how they relate to each other.
- [Set up webhook integration](set-up-webhook-integration): Follow step-by-step instructions to configure your webhook in the Adapty Dashboard.
- [Test webhook integration](test-webhook): Use our testing tools to make sure your webhook is working correctly.
