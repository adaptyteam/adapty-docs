---
title: "Events to send to 3d-party integrations"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Apple and Google send subscription events directly to the server using [App Store Server Notifications](enable-app-store-server-notifications) and [Real-time Developer Notifications (RTDN)](enable-real-time-developer-notifications-rtdn). Therefore, mobile apps cannot send events to analytical systems correctly and on-time. For example, if the user subscribed and then didn't open the app, without a server developer will get zero information about subscription status. 

After installing Adapty SDK and setting up [App Store Server Notifications](enable-app-store-server-notifications) for iOS and [Real-time Developer Notifications (RTDN)](enable-real-time-developer-notifications-rtdn). for Android, Adapty receives info about your customer behavior and converts it into human-readable events.

:::note
Adapty processes events into human-readable format instantly as they created and enriches them with additional information, such as customer ID, consecutive payments, store commission info, and others. Besides that Apple doesn't send events about subscription renewals but we do.
:::

## Events

| Event Name                             | Description                                                                                                                                                                                                                                                      |
| :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **subscription_started**               | A user has activated a subscription without a trial period i.e. he was billed instantly.                                                                                                                                                                         |
| **subscription_renewed**               | A subscription was renewed and the user was charged. For both trial and non-trial subscriptions, this event is sent starting from the second billing.                                                                                                            |
| **subscription_expired**               | A user has canceled a subscription and it is completely finished.                                                                                                                                                                                                |
| **trial_started**                      | A user has activated a trial subscription.                                                                                                                                                                                                                       |
| **trial_converted**                    | A trial period has ended and the user was billed, i.e. first purchase was made.                                                                                                                                                                                  |
| **trial_expired**                      | A trial has expired without converting to a subscription.                                                                                                                                                                                                        |
| **non_subscription_purchase**          | Any non-subscription purchase e.g. lifetime access or consumable product such as coins.                                                                                                                                                                          |
| **billing_issue_detected**             | An attempt to charge the user was made, but a billing issue happened. Usually, it means the user doesn't have enough card balance.                                                                                                                               |
| **entered_grace_period**               | The payment was not successful and the user entered into a grace period. The user still has access to the premium features of your app until the grace period is finished.                                                                                       |
| **trial_renewal_cancelled**            | A user turned off subscription auto-renewal during the trial. A user still has access to the premium features of your app until the end of the trial period.                                                                                                     |
| **trial_renewal_reactivated**          | A user turned on subscription auto-renewal during the trial period.                                                                                                                                                                                              |
| **subscription_renewal_cancelled**     | A user turned off subscription auto-renewal. A user still has access to the premium features of your app until the end of the subscription period.                                                                                                               |
| **subscription_renewal_reactivated**   | A user turned on subscription auto-renewal.                                                                                                                                                                                                                      |
| **subscription_refunded**              | A subscription was refunded \(e.g. by Apple support\).                                                                                                                                                                                                           |
| **non_subscription_purchase_refunded** | Non-subscription purchase was refunded.                                                                                                                                                                                                                          |
| **subscription_paused**                | User activated [subscription pause](https://developer.android.com/google/play/billing/subs#pause) (Android only).                                                                                                                                                |
| **subscription_deferred**              | A user's subscription has been deferred, ie they were granted free usage time (Android only). Usually, it happens in response to an [API](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/defer) call from your servers. |
| **access_level_updated**               | User's access level updated (Webhook only).                                                                                                                                                                                                                      |

:::note
**SUBSCRIPTION\_EXPIRED**(previously **SUBSCRIPTION\_CANCELED**) event means that the subscription completely finished and the user has no longer access to the premium features of the app. When the user unsubscribes, **AUTO\_RENEW\_OFF** or **AUTO\_RENEW\_OFF\_SUBSCRIPTION** is sent. The same logic applied to **TRIAL\_CANCELLED.**
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

## Properties

| Property | Type | Description |
|--------|----|-----------|
| **profile_id** | uuid | Adapty user ID. |
| **currency** | str | Local currency (defaults to USD). |
| **price_usd** | float | Product price before Apple/Google cut. Revenue. |
| **proceeds_usd** | float | Product price after Apple/Google cut. Net revenue. |
| **net_revenue_usd** | float | Net revenue (income after Apple/Google cut and taxes) in USD. Can be empty. |
| **price_local** | float | Product price before Apple/Google cut in local currency. Revenue. |
| **proceeds_local** | float | Product price after Apple/Google cut in local currency. Net revenue. |
| **transaction_id** | str | A unique identifier for a transaction such as a purchase or renewal. |
| **original_transaction_id** | str | The transaction identifier of the original purchase. |
| **purchase_date** | ISO 8601 date | The date and time of product purchase. |
| **original_purchase_date** | ISO 8601 date | The date and time of the original purchase. |
| **environment** | str | Can be _Sandbox_ or _Production_. |
| **vendor_product_id** | str | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **base_plan_id** | str | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973)   in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price)   in Stripe. |
| **event_datetime** | ISO 8601 date | The date and time of the event. |
| **store** | str | Can be _app_store_ or _play_store_. |
| **trial_duration** | str | Duration of a trial period in days. Sent in a format "{} days" , for example, "7 days". |
| **cancellation_reason** | str | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be</p><p>iOS & Android</p><p>_voluntarily_cancelled_, _billing_error_, _refund_</p><p>iOS</p><p>_price_increase_, _product_was_not_available_, _unknown_</p><p>Android</p><p>_new_subscription_replace_, _cancelled_by_developer_</p> |
| **subscription_expires_at** | ISO 8601 date | The Expiration date of subscription. Usually in the future. |
| **consecutive_payments** | int | The number of periods, that a user is subscribed to without interruptions. Includes the current period. |
| **rate_after_first_year** | bool | Boolean indicates that a vendor reduces cuts to 15%. Apple and Google have 30% first-year cut and 15% after it. |
| **promotional_offer_id** | str | ID of promotional offer as indicated in the Product section of the Adapty Dashboard |
| **store_offer_category** | str | Can be _introductory_ or _promotional_. |
| **store_offer_discount_type** | str | Can be _free_trial_, _pay_as_you_go_ or _pay_up_front_. |
| **paywall_name** | str | Name of the paywall where the transaction originated. |
| **paywall_revision** | int | Revision of the paywall where the transaction originated. The value is set to 1. |
| **developer_id** | str | Developer (SDK) ID of the placement where the transaction originated. |
| **ab_test_name** | str | Name of the A/B test where the transaction originated. |
| **ab_test_revision** | int | Revision of the A/B test where the transaction originated. The value is set to 1. |
| **cohort_name** | str | Name of the audience to which the profile belongs to. |
| **profile_event_id** | uuid | Unique event ID that can be used for deduplication. |
| **store_country** | str | The country sent to us by the store. |
| **profile_ip_address** | str | Profile IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes. |
| **profile_country** | str | Determined by Adapty, based on profile IP. |
| **profile_total_revenue_usd** | float | Total revenue for the profile, refunds included. |
| **variation_id** | uuid | Unique ID of the paywall where the purchase was made. |
| **access_level_id** | str | Paid access level ID |
| **is_active** | bool | Boolean indicating whether paid access level is active for the profile. |
| **will_renew** | bool | Boolean indicating whether paid access level will be renewed. |
| **is_refund** | bool | Boolean indicating whether transaction is refunded. |
| **is_lifetime** | bool | Boolean indicating whether paid access level is lifetime. |
| **is_in_grace_period** | bool | Boolean indicating whether profile is in grace period. |
| **starts_at** | ISO 8601 date | Date and time when paid access level starts for the user. |
| **renewed_at** | ISO 8601 date | Date and time when paid access will be renewed. |
| **expires_at** | ISO 8601 date | Date and time when paid access will expire. |
| **activated_at** | ISO 8601 date | Date and time when paid access was activated. |
| **billing_issue_detected_at** | ISO 8601 date | Date and time of billing issue. |
| **profile_has_access_level** | Bool | A boolean that indicates whether the profile has an active access level (Webhook only). |



Each event has the following properties:

`transaction_id, original_transaction_id, purchase_date, original_purchase_date, environment, vendor_product_id, event_datetime, store`. 

In addition, some events have additional properties. For the events `subscription_refunded` and `non_subscription_purchase_refunded`, it is mandatory to provide the values of `price_usd` and `proceeds_usd` as additional properties.

| Event Name                          | Properties                                                                                                             |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **subscription\_initial\_purchase** | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **subscription\_renewed**           | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **subscription\_cancelled**         | cancellation\_reason, trial\_duration                                                                                  |
| **trial\_started**                  | subscription\_expires\_at, trial\_duration                                                                             |
| **trial\_converted**                | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **trial\_cancelled**                | cancellation\_reason, trial\_duration                                                                                  |
| **non\_subscription\_purchase**     | price\_usd, proceeds\_usd                                                                                              |
| **billing\_issue\_detected**        | subscription\_expires\_at, trial\_duration                                                                             |
| **entered\_grace\_period**          | subscription\_expires\_at, trial\_duration                                                                             |

Event example

```json title="Json"
{
    "price_usd": 9.99,
    "proceeds_usd": 6.99,
    "transaction_id": "1000000628581600",
    "original_transaction_id": "1000000628581600",
    "purchase_date": "2020-02-18T18:40:22.000000+0000",
    "original_purchase_date": "2020-02-18T18:40:22.000000+0000",
    "environment": "Sandbox",
    "vendor_product_id": "premium",
    "event_datetime": "2020-02-18T18:40:22.000000+0000",
    "store": "app_store"
}
```

Adapty sends events to your server and 3rd party analytical systems.

**profile_ip_address** property is synchronized with the current device IP. Each time the Adapty servers receive info from the SDK, the IP will be updated if it differs from the one we have on record.

## Access level updated

Adapty has a special event `access_level_updated`. It is sent only to [webhook](webhook) integration every time the access level is updated/set for a specific customer. Use this event to update a customer's subscription in your database/system. Before you had to keep track of several events to sync subscription state and some cases were not covered, like setting access level manually from Adapty CRM. Now, no matter what was the source of access level changes, you will always receive a dedicated event for that, therefore it's more precise and has more details than `subscription_renewed`, `trial_started`, `entered_grace_period`, etc.


<Zoom>
  <img src={require('./img/6375cb2-CleanShot_2022-05-03_at_14.22.56.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





| Property                           | Type          |
| :--------------------------------- | :------------ |
| **store**                          | str           |
| **currency**                       | str           |
| **is_active**                      | bool          |
| **is_refund**                      | bool          |
| **expires_at**                     | ISO 8601 date |
| **starts at**                      | ISO 8601 date |
| **profile_id**                     | str           |
| **renewed_at**                     | ISO 8601 date |
| **will_renew**                     | bool          |
| **environment**                    | str           |
| **is_lifetime**                    | bool          |
| **activated_at**                   | ISO 8601 date |
| **purchase_date**                  | ISO 8601 date |
| **store_country**                  | str           |
| **event_datetime**                 | ISO 8601 date |
| **transaction_id**                 | str           |
| **access_level_id**                | str           |
| **profile_country**                | str           |
| **profile_event_id**               | str           |
| **vendor_product_id**              | str           |
| **is_in_grace_period**             | bool          |
| **original_purchase_date**         | ISO 8601 date |
| **original_transaction_id**        | str           |
| **subscription_expires_at**        | ISO 8601 date |
| **profile_total_revenue_usd**      | float         |
| **billing_issue_detected_at**      | ISO 8601 date |
| **cancellation_reason**            | str           |
| **active_introductory_offer_type** | str           |
| **active_promotional_offer_type**  | str           |
| **active_promotional_offer_id**    | str           |
| **profile_has_access_level** | bool |

We don't send `access_level_updated` upon subscription expiration - please, refer to **expires_at** value to end the subscriptions on your side. 

Please note that some properties can only be set using the [grant access level](ss-grant-access-level) API method. 

For detailed descriptions of the mentioned properties, you can refer to the [API objects documentation](server-side-api-objects).

## Sending failed

We determine the deliverability based on HTTP status and consider everything **outside the 200-399 range** to be a fail. 

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