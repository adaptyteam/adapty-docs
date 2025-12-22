---
title: "Messaging service integrations"
description: "Use Adapty’s messaging tools to improve subscription engagement and retention."
metadataTitle: "Messaging and Notifications in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The acquisition is not easy or cheap in the growing mobile market. So wisely treating attracted users improves your unit economy, especially in highly competitive niches.

Adapty provides real-time information about core users' payment actions. We know when your customer took a trial, if he had troubles with his payment, or if he purchased a subscription and decided to cancel later. All these and other events show the change in the state of the customer. And this is the best moment to react - send an offer, or personal gift, or whatever retaining. 

Push notification platforms allow describing a user with standard and custom tags to build an effective automatic system of retention. To make this system work you just need trigger events to let the system know that it's time to send a message. These events will come to the push platform from Adapty through the set integration. 

Please choose below the service that you need to integrate and follow the instructions:

- [Braze](braze)
- [OneSignal](onesignal)
- [Pushwoosh](pushwoosh)
- [Slack](slack)

:::note
Don't see your attribution provider?

Let us know! [Write to the Adapty support](mailto:support@adapty.io) and we'll consider adding it.
:::

## Event properties

Webhook events are sent in JSON format. All events follow the same structure, but their fields vary based on the event type, store, and your specific configuration. 

| Property                      | Type          | Description                                                  |
| ----------------------------- | ------------- | ------------------------------------------------------------ |
| **profile_id**                | uuid          | Adapty user ID.                                              |
| **currency**                  | str           | Local currency (defaults to USD).                            |
| **price_usd**                 | float         | Product price before Apple/Google cut. Revenue.              |
| **proceeds_usd**              | float         | Product price after Apple/Google cut. Net revenue.           |
| **net_revenue_usd**           | float         | Net revenue (income after Apple/Google cut and taxes) in USD. Can be empty. |
| **price_local**               | float         | Product price before Apple/Google cut in local currency. Revenue. |
| **proceeds_local**            | float         | Product price after Apple/Google cut in local currency. Net revenue. |
| **transaction_id**            | str           | A unique identifier for a transaction such as a purchase or renewal. |
| **original_transaction_id**   | str           | The transaction identifier of the original purchase.         |
| **purchase_date**             | ISO 8601 date | The date and time of product purchase.                       |
| **original_purchase_date**    | ISO 8601 date | The date and time of the original purchase.                  |
| **environment**               | str           | Can be _Sandbox_ or _Production_.                            |
| **vendor_product_id**         | str           | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **base_plan_id**              | str           | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973)   in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price)   in Stripe. |
| **event_datetime**            | ISO 8601 date | The date and time of the event.                              |
| **store**                     | str           | Can be _app_store_ or _play_store_.                          |
| **trial_duration**            | str           | Duration of a trial period in days. Sent in a format "{} days" , for example, "7 days". |
| **cancellation_reason**       | str           | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be</p><p>iOS & Android</p><p>_voluntarily_cancelled_, _billing_error_, _refund_</p><p>iOS</p><p>_price_increase_, _product_was_not_available_, _unknown_</p><p>Android</p><p>_new_subscription_replace_, _cancelled_by_developer_</p> |
| **subscription_expires_at**   | ISO 8601 date | The Expiration date of subscription. Usually in the future.  |
| **consecutive_payments**      | int           | The number of periods, that a user is subscribed to without interruptions. Includes the current period. |
| **rate_after_first_year**     | bool          | Boolean indicates that the subscription qualifies for a reduced commission rate (typically 15%) after one year of continuous renewal. Commission rates vary based on program eligibility and country. See [Store commission and taxes](controls-filters-grouping-compare-proceeds#store-commission-and-taxes) for details. |
| **promotional_offer_id**      | str           | ID of promotional offer as indicated in the Product section of the Adapty Dashboard |
| **store_offer_category**      | str           | Can be _introductory_ or _promotional_.                      |
| **store_offer_discount_type** | str           | Can be _free_trial_, _pay_as_you_go_ or _pay_up_front_.      |
| **paywall_name**              | str           | Name of the paywall where the transaction originated.        |
| **paywall_revision**          | int           | Revision of the paywall where the transaction originated. The value is set to 1. |
| **developer_id**              | str           | Developer (SDK) ID of the placement where the transaction originated. |
| **ab_test_name**              | str           | Name of the A/B test where the transaction originated.       |
| **ab_test_revision**          | int           | Revision of the A/B test where the transaction originated. The value is set to 1. |
| **cohort_name**               | str           | Name of the audience to which the profile belongs to.        |
| **profile_event_id**          | uuid          | Unique event ID that can be used for deduplication.          |
| **store_country**             | str           | The country sent to us by the store.                         |
| **profile_ip_address**        | str           | Profile IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes. |
| **profile_country**           | str           | Determined by Adapty, based on profile IP.                   |
| **profile_total_revenue_usd** | float         | Total revenue for the profile, refunds included.             |
| **variation_id**              | uuid          | Unique ID of the paywall where the purchase was made.        |
| **access_level_id**           | str           | Paid access level ID                                         |
| **is_active**                 | bool          | Boolean indicating whether paid access level is active for the profile. |
| **will_renew**                | bool          | Boolean indicating whether paid access level will be renewed. |
| **is_refund**                 | bool          | Boolean indicating whether transaction is refunded.          |
| **is_lifetime**               | bool          | Boolean indicating whether paid access level is lifetime.    |
| **is_in_grace_period**        | bool          | Boolean indicating whether profile is in grace period.       |
| **starts_at**                 | ISO 8601 date | Date and time when paid access level starts for the user.    |
| **renewed_at**                | ISO 8601 date | Date and time when paid access will be renewed.              |
| **expires_at**                | ISO 8601 date | Date and time when paid access will expire.                  |
| **activated_at**              | ISO 8601 date | Date and time when paid access was activated.                |
| **billing_issue_detected_at** | ISO 8601 date | Date and time of billing issue.                              |
| **profile_has_access_level**  | Bool          | A boolean that indicates whether the profile has an active access level (Webhook only). |



Each event has the following properties:

`transaction_id, original_transaction_id, purchase_date, original_purchase_date, environment, vendor_product_id, event_datetime, store`. 

In addition, some events have additional properties. For the events `subscription_refunded` and `non_subscription_purchase_refunded`, it is mandatory to provide the values of `price_usd` and `proceeds_usd` as additional properties.

| Event Name                          | Properties                                                   |
| :---------------------------------- | :----------------------------------------------------------- |
| **subscription\_initial\_purchase** | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **subscription\_renewed**           | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **subscription\_cancelled**         | cancellation\_reason, trial\_duration                        |
| **trial\_started**                  | subscription\_expires\_at, trial\_duration                   |
| **trial\_converted**                | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **trial\_cancelled**                | cancellation\_reason, trial\_duration                        |
| **non\_subscription\_purchase**     | price\_usd, proceeds\_usd                                    |
| **billing\_issue\_detected**        | subscription\_expires\_at, trial\_duration                   |
| **entered\_grace\_period**          | subscription\_expires\_at, trial\_duration                   |

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