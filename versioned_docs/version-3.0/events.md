---
title: "Events to send to 3d-party integrations"
description: ""
metadataTitle: ""
---

import WebhookEvents from '@site/src/components/reusable/WebhookEvents.md';

Apple and Google send subscription events directly to servers via [App Store Server Notifications](app-store-server-notifications) and [Real-time Developer Notifications (RTDN)](real-time-developer-notifications-rtdn). As a result, mobile apps cannot reliably send events to analytics systems in real time. For example, if a user subscribes but never reopens the app, the developer won't receive any subscription status updates without a server.

Adapty bridges this gap by collecting subscription data and converting it into human-readable events. These integration events are sent in JSON format. While all events share the same structure, their fields vary depending on the event type, store, and specific configuration. You can find the exact fields included in each event on the respective integration pages.

## Event types

Most events are created and sent to all configured integrations if they’re enabled. However, the **Access level updated** event only triggers if the [webhook integration](webhook) is configured and this event is enabled. This event will appear in the [Event Feed](https://app.adapty.io/event-feed) and will also be sent to the webhook, but it won’t be shared with other integrations.

If a webhook integration isn’t configured or this event type isn’t enabled, the **Access level updated** event won’t be created and won’t appear in the [Event Feed](https://app.adapty.io/event-feed).

<WebhookEvents />

The events above fully cover the users' state in terms of purchases. Let's look at some examples.

### Example 1

_The user has activated a monthly subscription on April 1st with 7 days trial. On the 4th day, he unsubscribed._

In that case following events will be sent:

1. trial\_started on April 1st
2. auto\_renew\_off on 4th April
3. trial\_cancelled on 7th April

### Example 2

_The user has activated a monthly subscription on April 1st with 7 days trial. On the 10th day, he unsubscribed._

In that case following events will be sent:

1. trial\_started on April 1st
2. trial\_converted on April 7th
3. auto\_renew\_off\_subscription on April 10th
4. subscription\_cancelled on May 1st

---

**What's next:**

-  [Event statuses](event-statuses.md) 
-  [Event Flows](event-flows.md) 

