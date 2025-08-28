---
title: "Events to send to 3d-party integrations"
description: "Track key subscription events using Adapty's analytics tools."
metadataTitle: "Tracking Subscription Events | Adapty Docs"
keywords: ['events', 'subscription_started', 'subscription_renewed', 'subscription_renewal_cancelled', 'subscription_renewal_reactivated', 'subscription_expired', 'subscription_paused', 'non_subscription_purchase', 'trial_started', 'trial_converted', 'trial_renewal_cancelled', 'trial_renewal_reactivated', 'trial_expired', 'entered_grace_period', 'billing_issue_detected', 'subscription_refunded', 'non_subscription_purchase_refunded', 'access_level_updated']
---

import WebhookEvents from '@site/src/components/reusable/WebhookEvents.md';

Apple and Google send subscription events directly to servers via [App Store Server Notifications](enable-app-store-server-notifications) and [Real-time Developer Notifications (RTDN)](enable-real-time-developer-notifications-rtdn). As a result, mobile apps cannot reliably send events to analytics systems in real time. For example, if a user subscribes but never reopens the app, the developer won't receive any subscription status updates without a server.

Adapty bridges this gap by collecting subscription data and converting it into human-readable events. These integration events are sent in JSON format. While all events share the same structure, their fields vary depending on the event type, store, and specific configuration. You can find the exact fields included in each event on the respective integration pages.

To understand how to determine whether an event was successfully processed or if something went wrong, check the [Event statuses](event-statuses.md) page.

## Event types

Most events are created and sent to all configured integrations if they’re enabled. However, the **Access level updated** event only triggers if the [webhook integration](webhook) is configured and this event is enabled. This event will appear in the [Event Feed](https://app.adapty.io/event-feed) and will also be sent to the webhook, but it won’t be shared with other integrations.

If a webhook integration isn’t configured or this event type isn’t enabled, the **Access level updated** event won’t be created and won’t appear in the [Event Feed](https://app.adapty.io/event-feed).

<WebhookEvents />

The events above fully cover the users' state in terms of purchases. Let's look at some examples.

### Example 1

_The user activated a monthly subscription on April 1st with a 7-day trial. On the 4th day, he unsubscribed._

In that case, the following events will be sent:

1. `trial_started` on April 1st
2. `trial_renewal_cancelled` on 4th April
3. `trial_expired` on 7th April

### Example 2

_The user activated a monthly subscription on April 1st with a 7-day trial. On the 10th day, he unsubscribed._

In that case, the following events will be sent:

1. `trial_started` on April 1st
2. `trial_converted` on April 7th
3. `subscription_renewal_cancelled` on April 10th
4. `subscription_expired` on May 1st

For a detailed breakdown of which events are triggered in each scenario, check out the [Event flows](event-flows.md).
