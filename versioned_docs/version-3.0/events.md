---
title: "Events to send to 3d-party integrations"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Apple and Google send subscription events directly to the server using [App Store Server Notifications](app-store-server-notifications) and [Real-time Developer Notifications (RTDN)](real-time-developer-notifications-rtdn). Therefore, mobile apps cannot send events to analytical systems correctly and on-time. For example, if the user subscribed and then didn't open the app, without a server developer will get zero information about subscription status. 

After installing Adapty SDK and setting up [App Store Server Notifications](app-store-server-notifications) for iOS and [Real-time Developer Notifications (RTDN)](real-time-developer-notifications-rtdn). for Android, Adapty receives info about your customer behavior and converts it into human-readable events.

:::note
Adapty processes events into human-readable format instantly as they created and enriches them with additional information, such as customer ID, consecutive payments, store commission info, and others. Besides that Apple doesn't send events about subscription renewals but we do.
:::

## Events



| Event name                         | Description                                                  |
| :--------------------------------- | :----------------------------------------------------------- |
| subscription_started               | Triggered when a user activates a paid subscription without a trial period, meaning they are billed instantly. |
| subscription_renewed               | Occurs when a subscription is renewed and the user is charged. This event starts from the second billing, whether it's a trial or non-trial subscription. |
| subscription_renewal_cancelled     | A user has turned off subscription auto-renewal. The user retains access to premium features until the end of the paid subscription period. |
| subscription_renewal_reactivated   | Triggered when a user reactivates subscription auto-renewal. |
| subscription_expired               | Triggered when a subscription fully ends after being canceled. For instance, if a user cancels a subscription on December 12th but it remains active until December 31st, the event is recorded on December 31st when the subscription expires. |
| subscription_paused                | Occurs when a user activates [subscription pause](https://developer.android.com/google/play/billing/subs#pause) (Android only). |
| non_subscription_purchase          | Any non-subscription purchase, such as lifetime access or consumable products like in-game coins. |
| trial_started                      | Triggered when a user activates a trial subscription.        |
| trial_converted                    | Occurs when a trial ends and the user is billed (first purchase). For example, if a user has a trial until January 14th but is billed on January 7th, this event is recorded on January 7th. |
| trial_renewal_cancelled            | A user turned off subscription auto-renewal during the trial period. The user retains access to premium features until the trial ends but will not be billed or start a subscription. |
| trial_renewal_reactivated          | Occurs when a user reactivates subscription auto-renewal during the trial period. |
| trial_expired                      | Triggered when a trial ends without converting to a subscription. |
| entered_grace_period               | Occurs when a payment attempt fails, and the user enters a grace period (if enabled). The user retains premium access during this time. |
| billing_issue_detected             | Triggered when a billing issue occurs during a charge attempt (e.g., insufficient card balance). |
| subscription_refunded              | Triggered when a subscription is refunded (e.g., by Apple Support). |
| non_subscription_purchase_refunded | Triggered when a non-subscription purchase is refunded.      |

:::note
**Subscription expired (churned)** event means that the subscription completely finished and the user has no longer access to the premium features of the app. When the user unsubscribes, **Subscription renewal canceled** is sent. The same logic applied to **Trial renewal cancelled**.**
:::

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

## Sending failed

We determine the deliverability based on HTTP status and consider everything outside the 200-399 range to be a fail. 

You can see the status of certain integration events in the event list in the Adapty Dashboard. The system displays the statuses of integrations that are enabled for the app, regardless of whether the event type is enabled or disabled for a specific integration. If the event type is disabled for a particular integration, it will be color-coded as gray in the event feed. If there are any issues with integration, the integration name will be highlighted in red, indicating that attention is required to resolve the problem. In addition, the system provides tooltips when you hover over the integration name. These tooltips offer more detailed information about the reasons for the non-delivery of an event. 


<Zoom>
  <img src={require('./img/f69ea1a-Screenshot_2023-06-02_at_14.58.48.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The Event feed utilizes a limitation on the number of events displayed, showing data from the past two weeks. This implementation enhances the loading speed of the page, enabling users to navigate and analyze data more efficiently.