---
title: "Set up webhook integration"
description: "Discover the step-by-step process to set up webhook integration in Adapty, enabling your server to receive real-time notifications for subscription events efficiently."
metadataTitle: "Set Up Webhook Integration for Real-Time Subscription Notifications"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty [webhook integration](webhook) consists of the following steps:

1. You set up your endpoint to have the **Content-Type** header as `application/json`. 
2. [You configure the integration](set-up-webhook-integration#configure-webhook-integration-in-the-adapty-dashboard) in the Adapty Dashboard. Within this step, you can optionally [map Adapty events with your event names](set-up-webhook-integration#choose-events-to-send-and-map-event-names).
3. [Adapty sends a verification request to your server](set-up-webhook-integration#adaptys-verification-request).
4. [Your server sends a verification response to Adapty](set-up-webhook-integration#your-servers-verification-response)
5. [Test your webhook integration](test-webhook).

## Configure webhook integration in the Adapty Dashboard

Within Adapty, you can configure separate flows for production events and test events received from the Apple or Stripe sandbox environment or Google test account. 

For production events, use the **Production endpoint URL** field specifying the URL to which the callbacks will be sent. Additionally, configure the **Authorization header value for production endpoint** field - the header for your server to authenticate Adapty events. Note that we'll use the value specified in the **Authorization header value for production endpoint** field as the `Authorization` header exactly as provided, without any changes or additions.

For test events, employ the  **Sandbox endpoint URL** and **Authorization header value for sandbox endpoint** fields accordingly.

To set up the webhook integration:

1. Open [**Integrations** -> **Webhook**](https://app.adapty.io/integrations/customwebhook) in your Adapty Dashboard.


<Zoom>
  <img src={require('./img/a3e49a8-webhook_integration.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


2. Turn on the toggle to initiate the integration.
3. Fill out the integration fields:

| Field | Description |
|-----|-----------|
| **Production endpoint URL** | URL that is used by Adapty to send HTTP POST requests to this URL when events occur. |
| **Authorization header value for production endpoint** | <p>The header that your server will use to authenticate requests from Adapty in production. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |

   Additionally, for your testing needs in the staging environment, two other fields are available:

| Testing field | Description |
|-------------|-----------|
| **Sandbox endpoint URL** | Adapty will use this URL to send HTTP POST requests when events occur in the staging environment. |
| **Authorization header value for sandbox endpoint** | <p>The header that your server will use to authenticate requests from Adapty during testing in the sandbox environment. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |
4. Choose the events you want to receive and [map their names](set-up-webhook-integration#choose-events-to-send-and-map-event-names).
5. Additional fields and options are not obligatory; use them as needed. 
6. Remember to click the **Save** button to confirm the changes.

Please note that the moment you click the **Save** button, Adapty will send a verification request and will wait for your server verification response.

## Choose events to send and map event names

Choose the events you want to receive in your server by enabling the toggle next to it. If your event IDs differ from those used in Adapty and keep the IDs in your system as is and replace the default Adapty event IDs with yours in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.


<Zoom>
  <img src={require('./img/86942b8-event_names_renaming.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

The event ID can be any string, simply make sure the event ID in your webhook processing server coinside with the one you eneterd in the Adapty Dashboard. You cannot leave the event ID empty for enabled events. If you accidentally removed Adapty event ID and need to restore it, you can always copy it from the table below.

| Event Name                         | Default event ID                   | Description                                                  |
| ---------------------------------- | :--------------------------------- | :----------------------------------------------------------- |
| Subscription started               | subscription_started               | A user has activated a paid subscription without a trial period i.e. he was billed instantly. |
| Subscription renewed               | subscription_renewed               | A subscription was renewed and the user was charged. For both trial and non-trial subscriptions, this event is sent starting from the second billing. |
| Subscription renewal cancelled     | subscription_renewal_cancelled     | A user turned off subscription auto-renewal. A user still has access to the premium features of your app until the end of the paid subscription period. |
| Subscription renewal reactivated   | subscription_renewal_reactivated   | A user turned on subscription auto-renewal.                  |
| Subscription expired (churned)     | subscription_expired               | A user has canceled a subscription and it is completely finished. For example, if a user has a subscription till the 31st of December a cancells the subscription on 12th of December, the event will be created on the 31st of December when the subscription expires. |
| Subscription paused (Android only) | subscription_paused                | User activated [subscription pause](https://developer.android.com/google/play/billing/subs#pause) (Android only). |
| Non-subscription purchase          | non_subscription_purchase          | Any non-subscription purchase e.g. lifetime access or consumable product such as coins in a game. |
| Trial started                      | trial_started                      | A user has activated a trial subscription.                   |
| Trial converted                    | trial_converted                    | A trial period has ended and the user was billed, i.e. first purchase was made. Fro example, if a user has a 2-week trial subscription till the 14th of January and buys a paid subscription on the 7th of January, the event will be created when the user is billed - on the 7th of January. |
| Trial renewal cancelled            | trial_renewal_cancelled            | A user turned off subscription auto-renewal during the trial. A user still has access to the premium features of your app until the end of the trial period. But the subscription will not start and the user will not be billed. |
| Trial renewal reactivated          | trial_renewal_reactivated          | A user turned on subscription auto-renewal during the trial period. |
| Trial expired                      | trial_expired                      | A trial has expired without converting to a subscription.    |
| Entered grace period               | entered_grace_period               | The payment was not successful and the user entered into a grace period if you have it. The user still has access to the premium features of your app until the grace period is finished. |
| Billing issue detected             | billing_issue_detected             | An attempt to charge the user was made, but a billing issue happened. Usually, it means the user doesn't have enough card balance. |
| Subscription refunded              | subscription_refunded              | A subscription was refunded \(e.g. by Apple support\).       |
| Non-subscription purchase refunded | non_subscription_purchase_refunded | Non-subscription purchase was refunded.                      |
| Access level updated               | access_level_updated               | User's access level updated.                                 |

## Adapty's verification request

After you enable webhook integration in the Adapty Dashboard, Adapty will automatically send a `isMount` POST verification request to your endpoint.

```json title="Json"
{
    adapty_check: {{check_string}}
}
```

:::note
Be sure your endpoint supports **Content-Type**: `application/json` header.
:::

## Your server's verification response

Your server must reply with a 200 or 201 HTTP status code and send the response outlined below with the identical `check_string`. 

```json title="Json"
{
    adapty_check_response: {{check_string}}
}
```

Once Adapty receives the verification response in the correct format, your Adapty webhook integration is fully configured.

From then on, Adapty will send the selected events to your specified URL as they happen. Ensure your server promptly confirms each Adapty event with a response status code in the 200-404 range, the `check_string` is not required anymore.

## Set up your server to process Adapty events

### Webhook event structure

Adapty will send you those events you've chosen in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.

Each event is wrapped into the following structure:

```json title="Json"
{
  "profile_id": "772204ce-ebf6-4ed9-82b0-d8688ab62b01",
  "customer_user_id": "john.doe",
  "idfv": "00000000-0000-0000-0000-000000000000",
  "idfa": "00000000-0000-0000-0000-000000000000",
  "advertising_id": "00000000-0000-0000-0000-000000000000",
  "profile_install_datetime": "2020-02-18T18:40:22.000000+0000",
  "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  "email": "john.doe@company.com",
  "event_type": "non_subscription_purchase",
  "event_datetime": "2023-02-18T18:40:22.000000+0000",
  "event_properties": <event-specific properties>,
  "event_api_version": 1,
  "profiles_sharing_access_level": [{"profile_id": "f9e83cb0-0cf3-4e92-b1a4-733311fe5800", "customer_user_id": "example@gmail.com"}],
  "attributions": {"attribution_source1": <attribution_data>, "attribution_source2": <attribution_data>, ...},
  "user_attributes": {"attribute_name1": "attribute_value1", "attribute_name2": "attribute_value2", ...}
  "integration_ids": {"firebase_app_instance_id": "val1", "branch_id": "val2", "one_signal_player_id": "val3", ... }
}
```

### Event parameters

| Property                          | Type                 | Description                                                  |
| :-------------------------------- | :------------------- | :----------------------------------------------------------- |
| **profile_id**                    | String               | The Сustomer user ID of the profile in Adapty.               |
| **customer_user_id**              | String               | User ID you use in your app to identify the user. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. |
| **idfv**                          | String               | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps |
| **idfa**                          | String               | The identifier for advertisers (IDFA) is a random device identifier assigned by Apple to a user's device. |
| **advertising_id**                | String               | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device. |
| **profile_install_datetime**      | ISO 8601 date & time | Installation date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html): starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **profiles_sharing_access_level** | JSON                 | <p> A list of objects, each containing the IDs of users who share the access level (including the current profile):</p><ul>  <li> **profile_id**: (UUID4) The Adapty Profile ID sharing the access level, including the current profile.</li>  <li> **customer_user_id**: (string) The Customer User ID, if provided.</li> </ul> <p>This is used when your app allows [**Sharing paid access between user accounts**](general#6-sharing-purchases-between-user-accounts).</p> |
| **user_agent**                    | String               | User-agent used by the browser on the device.                |
| **email**                         | String               | E-mail of your user.                                         |
| **event_type**                    | String               | Event name as set up in the in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook)  page in lowercase. |
| **event_datetime**                | ISO 8601 date & time | Event date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html) : starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **event_properties**              | JSON                 | JSON of [event properties](set-up-webhook-integration#event-properties). |
| **event_api_version**             | Integer              | Adapty API version. The current value is `1`.                |
| **attributions**                  | JSON                 | JSON of [attribution data](webhook#attribution-data).        |
| **user_attributes**               | JSON                 | JSON of [custom user attributes](setting-user-attributes#custom-user-attributes). |
| **integration_ids**               | JSON                 | JSON of user integration identifiers. If a user doesn't have any identifier or integrations are disabled, then a null is sent. |

### Attribution data

If you've chosen to send attribution data, the following data will be sent with the event:

| Field name          | Field type    | Description                                        |
| :------------------ | :------------ | :------------------------------------------------- |
| **network_user_id** | String        | ID assigned to the user by the attribution source. |
| **status**          | String        | Can be `organic`, `non_organic` or `unknown`.      |
| **created_at**      | ISO 8601 date | Date and time of attribution record creation.      |
| **channel**         | String        | Marketing channel name.                            |
| **campaign**        | String        | Marketing campaign name.                           |
| **ad_group**        | String        | Attribution ad group.                              |
| **ad_set**          | String        | Attribution ad set.                                |
| **creative**        | String        | Attribution creative keyword.                      |

### Event properties

| Property                      | Type          | Description                                                  |
| ----------------------------- | ------------- | ------------------------------------------------------------ |
| **profile_id**                | uuid          | Adapty user ID.                                              |
| **currency**                  | String        | Local currency (defaults to USD).                            |
| **price_usd**                 | float         | Product price before Apple/Google cut. Revenue.              |
| **proceeds_usd**              | float         | Product price after Apple/Google cut. Net revenue.           |
| **net_revenue_usd**           | float         | Net revenue (income after Apple/Google cut and taxes) in USD. Can be empty. |
| **price_local**               | float         | Product price before Apple/Google cut in local currency. Revenue. |
| **proceeds_local**            | float         | Product price after Apple/Google cut in local currency. Net revenue. |
| **transaction_id**            | String        | A unique identifier for a transaction such as a purchase or renewal. |
| **original_transaction_id**   | String        | The transaction identifier of the original purchase.         |
| **purchase_date**             | ISO 8601 date | The date and time of product purchase.                       |
| **original_purchase_date**    | ISO 8601 date | The date and time of the original purchase.                  |
| **environment**               | String        | Can be _Sandbox_ or _Production_.                            |
| **vendor_product_id**         | String        | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **base_plan_id**              | String        | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973)   in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price)   in Stripe. |
| **event_datetime**            | ISO 8601 date | The date and time of the event.                              |
| **store**                     | String        | Can be _app_store_ or _play_store_.                          |
| **trial_duration**            | String        | Duration of a trial period in days. Sent in a format "{} days" , for example, "7 days". |
| **cancellation_reason**       | String        | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be</p><p>iOS & Android</p><p>_voluntarily_cancelled_, _billing_error_, _refund_</p><p>iOS</p><p>_price_increase_, _product_was_not_available_, _unknown_</p><p>Android</p><p>_new_subscription_replace_, _cancelled_by_developer_</p> |
| **subscription_expires_at**   | ISO 8601 date | The Expiration date of subscription. Usually in the future.  |
| **consecutive_payments**      | int           | The number of periods, that a user is subscribed to without interruptions. Includes the current period. |
| **rate_after_first_year**     | bool          | Boolean indicates that a vendor reduces cuts to 15%. Apple and Google have 30% first-year cut and 15% after it. |
| **promotional_offer_id**      | String        | ID of promotional offer as indicated in the Product section of the Adapty Dashboard |
| **store_offer_category**      | String        | Can be _introductory_ or _promotional_.                      |
| **store_offer_discount_type** | String        | Can be _free_trial_, _pay_as_you_go_ or _pay_up_front_.      |
| **paywall_name**              | String        | Name of the paywall where the transaction originated.        |
| **paywall_revision**          | int           | Revision of the paywall where the transaction originated. The value is set to 1. |
| **developer_id**              | String        | Developer (SDK) ID of the placement where the transaction originated. |
| **ab_test_name**              | String        | Name of the A/B test where the transaction originated.       |
| **ab_test_revision**          | int           | Revision of the A/B test where the transaction originated. The value is set to 1. |
| **cohort_name**               | String        | Name of the audience to which the profile belongs to.        |
| **profile_event_id**          | uuid          | Unique event ID that can be used for deduplication.          |
| **store_country**             | String        | The country sent to us by the store.                         |
| **profile_ip_address**        | String        | Profile IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes. |
| **profile_country**           | String        | Determined by Adapty, based on profile IP.                   |
| **profile_total_revenue_usd** | float         | Total revenue for the profile, refunds included.             |
| **variation_id**              | uuid          | Unique ID of the paywall where the purchase was made.        |
| **access_level_id**           | String        | Paid access level ID                                         |
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
| **profile_has_access_level**  | Bool          | A boolean that indicates whether the profile has an active access level. |

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Webhook integration enables the control of sending attribution and user attributes. 

- Enable the **Send Attribution** option in the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page to send the information about the source of app installs from data providers. 
- Enable the **Send User Attributes** option to send custom user attributes set up from the Adapty SDK, such as user preferences and app usage data.

### Event properties example

```json
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
    "profile_has_access_level": true,
    "store": "app_store"
}
```

## Handle webhook events

Webhooks are typically delivered within 5 to 60 seconds of the event occurring. Cancellation events, however, may take up to 2 hours to be delivered after a user cancels their subscription.

If your server's response status code is outside the 200-404 range, Adapty will retry sending the event up to 9 times over 24 hours with exponential backoff. We suggest you set up your webhook to do only basic validation of the event body from Adapty before responding. If your server can't process the event and you don't want Adapty to retry, use a status code within the 200-404 range. Also, handle any time-consuming tasks asynchronously and respond to Adapty quickly. If Adapty doesn't receive a response within 10 seconds, it will consider the attempt a failure and will retry