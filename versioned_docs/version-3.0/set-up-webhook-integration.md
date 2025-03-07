---
title: "Set up webhook integration"
description: "Set up webhook integration in Adapty to automate event tracking."
metadataTitle: "Setting Up Webhook Integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty [webhook integration](webhook) consists of the following steps:

<Zoom>
  <img src={require('./img/webhook-setup.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '300px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



1. **You set up your endpoint:**
   1. Ensure your server can process Adapty requests with the **Content-Type** header set to `application/json`.
   2. Configure your server to receive Adapty's verification request and respond with any `2xx` status and a JSON body.
   3. [Handle subscription events](#subscription-events) once the connection is verified.
2. **You [configure and enable the webhook integration](#configure-webhook-integration-in-the-adapty-dashboard)** in the Adapty Dashboard. You can also [map Adapty events to custom event names](https://dev-docs.adapty.io/docs/set-up-webhook-integration#step-3-configure-webhook-integration-in-the-adapty-dashboard). We recommend testing in the **Sandbox environment** before switching to production.
3. **Adapty sends a verification request** to your server.
4. **Your server responds** with a `2XX` status and a JSON body.
5. **Once Adapty receives a valid response, it starts sending subscription events.**

## Set up your server to process Adapty requests

Adapty will send to your webhook endpoint 2 types of requests:

1. [Verification request](#verification-request): the initial request to verify the connection is set up correctly. This request will not contain any event and will be sent the moment you click the **Save** button in the Webhook integration of the Adapty Dashboard. To confirm your endpoint successfully received the verification request, your endpoint should answer with the verification response.
2. [Subscription event](#subscription-events): A standard request Adapty server sends every time an event is created in it. Your server does not need to reply with any specific response. The only thing the Adapty server needs is to receive a standard 200-code HTTP response if it successfully receives the message.

### Verification request

After you enable webhook integration in the Adapty Dashboard, Adapty will send a POST verification request containing an empty JSON object `{}` as a body.

Set up your endpoint to have the **Content-Type header** as `application/json`, i.e. your server's endpoint should expect the incoming webhook request to have its payload formatted as JSON.

Your server must reply with a 2xx status code and send any valid JSON response, for example:

```json title="Json"
{}
```

Once Adapty receives the verification response in the correct format and with a 2xx status code, your Adapty webhook integration is fully configured.

### Subscription events

Subscription events are sent with the **Content-Type** header set to `application/json` and contain event data in JSON format. 

#### Webhook event structure

Adapty will send you those events you've chosen in the **Events names** section of the [Integrations ->  Webhooks](https://app.adapty.io/integrations/customwebhook) page.

Each event is wrapped into the following structure:

```json showLineNumbers title="Json"
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

#### Event parameters

| Property                          | Type                 | Description                                                  |
| :-------------------------------- | :------------------- | :----------------------------------------------------------- |
| **profile_id**                    | String               | The Сustomer user ID of the profile in Adapty.               |
| **customer_user_id**              | String               | User ID you use in your app to identify the user. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. |
| **idfv**                          | String               | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps |
| **idfa**                          | String               | The identifier for advertisers (IDFA) is a random device identifier assigned by Apple to a user's device. |
| **advertising_id**                | String               | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device. |
| **profile_install_datetime**      | ISO 8601 date & time | Installation date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html): starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **profiles_sharing_access_level** | JSON                 | <p> A list of objects, each containing the IDs of users who share the access level (including the current profile):</p><ul>  <li> **profile_id**: (UUID4) The Adapty Profile ID sharing the access level, including the current profile.</li>  <li> **customer_user_id**: (string) The Customer User ID, if provided.</li> </ul> <p>This is used when your app allows [Sharing paid access between user accounts](general#6-sharing-purchases-between-user-accounts).</p> |
| **user_agent**                    | String               | User-agent used by the browser on the device.                |
| **email**                         | String               | E-mail of your user.                                         |
| **event_type**                    | String               | Event name as set up in the in the **Events names** section of the [Integrations ->  Webhooks](https://app.adapty.io/integrations/customwebhook)  page in lowercase. |
| **event_datetime**                | ISO 8601 date & time | Event date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html) : starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **event_properties**              | JSON                 | JSON of [event properties](set-up-webhook-integration#event-properties). |
| **event_api_version**             | Integer              | Adapty API version. The current value is `1`.                |
| **attributions**                  | JSON                 | JSON of [attribution data](set-up-webhook-integration#attribution-data). |
| **user_attributes**               | JSON                 | JSON of [custom user attributes](setting-user-attributes#custom-user-attributes). |
| **integration_ids**               | JSON                 | JSON of user integration identifiers. If a user doesn't have any identifier or integrations are disabled, then a null is sent. |

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Webhook integration enables the control of sending attribution and user attributes. 

- Enable the **Send Attribution** option in the [Integrations ->  Webhooks](https://app.adapty.io/integrations/customwebhook) page to send the information about the source of app installs from data providers. 
- Enable the **Send User Attributes** option to send custom user attributes set up from the Adapty SDK, such as user preferences and app usage data.

#### Attribution data

If you've chosen to send attribution data, the following data will be sent with the event:

| Field name          | Field type    | Description                                        |
| :------------------ | :------------ | :------------------------------------------------- |
| **network_user_id** | str           | ID assigned to the user by the attribution source. |
| **status**          | str           | Can be `organic`, `non_organic` or `unknown`.      |
| **created_at**      | ISO 8601 date | Date and time of attribution record creation.      |
| **channel**         | str           | Marketing channel name.                            |
| **campaign**        | str           | Marketing campaign name.                           |
| **ad_group**        | str           | Attribution ad group.                              |
| **ad_set**          | str           | Attribution ad set.                                |
| **creative**        | str           | Attribution creative keyword.                      |

#### Event properties

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
| **rate_after_first_year**     | bool          | Boolean indicates that a vendor reduces cuts to 15%. Apple and Google have 30% first-year cut and 15% after it. |
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
| **profile_has_access_level**  | Bool          | A boolean that indicates whether the profile has an active access level. |

##3# Event properties example

```json showLineNumbers
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

## Configure webhook integration in the Adapty Dashboard

Within Adapty, you can configure separate flows for production events and test events received from the Apple or Stripe sandbox environment or Google test account. 

For production events, use the **Production endpoint URL** field specifying the URL to which the callbacks will be sent. Additionally, configure the **Authorization header value for production endpoint** field - the header for your server to authenticate Adapty events. Note that we'll use the value specified in the **Authorization header value for production endpoint** field as the `Authorization` header exactly as provided, without any changes or additions.

For test events, employ the  **Sandbox endpoint URL** and **Authorization header value for sandbox endpoint** fields accordingly.

To set up the webhook integration:

1. Open [Integrations -> Webhook](https://app.adapty.io/integrations/customwebhook) in your Adapty Dashboard.


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

### Choose events to send and map event names

Choose the events you want to receive in your server by enabling the toggle next to it. If your event names differ from those used in Adapty and you need to keep your names as is, you can set up the mapping by replacing the default Adapty event names with your own in the **Events names** section of the [Integrations ->  Webhooks](https://app.adapty.io/integrations/customwebhook) page.

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


The event name can be any string. You cannot leave the fields empty for enabled events. If you accidentally removed Adapty event name, you can always copy the name from the [Events to send to third-party integrations](events) topic.

## Handle webhook events

Webhooks are typically delivered within 5 to 60 seconds of the event occurring. Cancellation events, however, may take up to 2 hours to be delivered after a user cancels their subscription.

If your server's response status code is outside the 200-404 range, Adapty will retry sending the event up to 9 times over 24 hours with exponential backoff. We suggest you set up your webhook to do only basic validation of the event body from Adapty before responding. If your server can't process the event and you don't want Adapty to retry, use a status code within the 200-404 range. Also, handle any time-consuming tasks asynchronously and respond to Adapty quickly. If Adapty doesn't receive a response within 10 seconds, it will consider the attempt a failure and will retry

