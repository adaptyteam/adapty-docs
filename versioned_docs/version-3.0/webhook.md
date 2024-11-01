---
title: "Webhook integration"
description: "Learn how to use webhooks to get instant notifications about subscription events like new trials and billing issues, enabling seamless automation and enhanced backend management for your app."
metadataTitle: "Understanding Webhooks: Real-Time Notifications for Subscription Events"
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

## Events than can be sent to a webhook

| Event Name                             | Description                                                  |
| :------------------------------------- | :----------------------------------------------------------- |
| **subscription_started**               | A user has activated a subscription without a trial period i.e. he was billed instantly. |
| **subscription_renewed**               | A subscription was renewed and the user was charged. For both trial and non-trial subscriptions, this event is sent starting from the second billing. |
| **subscription_expired**               | A user has canceled a subscription and it is completely finished. |
| **trial_started**                      | A user has activated a trial subscription.                   |
| **trial_converted**                    | A trial period has ended and the user was billed, i.e. first purchase was made. |
| **trial_expired**                      | A trial has expired without converting to a subscription.    |
| **non_subscription_purchase**          | Any non-subscription purchase e.g. lifetime access or consumable product such as coins. |
| **billing_issue_detected**             | An attempt to charge the user was made, but a billing issue happened. Usually, it means the user doesn't have enough card balance. |
| **entered_grace_period**               | The payment was not successful and the user entered into a grace period. The user still has access to the premium features of your app until the grace period is finished. |
| **trial_renewal_cancelled**            | A user turned off subscription auto-renewal during the trial. A user still has access to the premium features of your app until the end of the trial period. |
| **trial_renewal_reactivated**          | A user turned on subscription auto-renewal during the trial period. |
| **subscription_renewal_cancelled**     | A user turned off subscription auto-renewal. A user still has access to the premium features of your app until the end of the subscription period. |
| **subscription_renewal_reactivated**   | A user turned on subscription auto-renewal.                  |
| **subscription_refunded**              | A subscription was refunded \(e.g. by Apple support\).       |
| **non_subscription_purchase_refunded** | Non-subscription purchase was refunded.                      |
| **subscription_paused**                | User activated [subscription pause](https://developer.android.com/google/play/billing/subs#pause) (Android only). |
| **subscription_deferred**              | A user's subscription has been deferred, ie they were granted free usage time (Android only). Usually, it happens in response to an [API](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/defer) call from your servers. |
| **access_level_updated**               | User's access level updated (Webhook only).                  |

:::note
**SUBSCRIPTION\_EXPIRED**(previously **SUBSCRIPTION\_CANCELED**) event means that the subscription completely finished and the user has no longer access to the premium features of the app. When the user unsubscribes, **AUTO\_RENEW\_OFF** or **AUTO\_RENEW\_OFF\_SUBSCRIPTION** is sent. The same logic applied to **TRIAL\_CANCELLED.**
:::

The events above fully cover the users' state in terms of purchases. Let's look at some examples.
