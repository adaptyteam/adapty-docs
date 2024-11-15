---
title: "Set up webhook integration"
description: "Discover the step-by-step process to set up webhook integration in Adapty, enabling your server to receive real-time notifications for subscription events efficiently."
metadataTitle: "Set Up Webhook Integration for Real-Time Subscription Notifications"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty [webhook integration](webhook) consists of the following steps:

1. You set up your endpoint:
   1.  To [have the **Content-Type** header as `application/json`](set-up-webhook-integration#set-up-your-server-to-process-adapty-events). 
   2. To [receive the first Adapty verification request](set-up-webhook-integration#adaptys-verification-request) - the initial request to verify the connection is set up correctlyю
   3. And after that to [response](set-up-webhook-integration#your-servers-verification-response) to it for the Adapty server to learn the connection is successfully established.
   4. To [receive the standard events and process them](set-up-webhook-integration#adapty-standard-event-request).

2. [You configure the integration](set-up-webhook-integration#configure-webhook-integration-in-the-adapty-dashboard) in the Adapty Dashboard. Within this step, you can optionally [map Adapty events with your event names](set-up-webhook-integration#choose-events-to-send-and-map-event-names). We recommend to first use the Sandbox environment to test how your server processes Adapty events and after you make sure it does it as expected, switch to the production environment 
3. Adapty sends a verification request to your server.
4. Your server sends a verification response to Adapty.
5. After the Adapty server receives the verification response in the expected format, it's ready to send standard event requests.
6. [Test your webhook integration](test-webhook).

## Step 1. Set up your server to process Adapty requests

Please set up your endpoint to have the **Content-Type** header as `application/json` , i.e. your server's endpoint should expect the incoming webhook request to have its payload formatted as JSON.

Adapty will send to your webhook endpoint 2 types of requests:

1. [**Verification request**](set-up-webhook-integration#adaptys-verification-request): the initial request to verify the connection is set up correctly. This request will not contain any event and will be sent the moment you click the **Save** button in the Webhook integration of the Adapty Dashboard. To confirm your endpoint successfully received the verification request, your endpoint should answer with a [verification response](set-up-webhook-integration#your-servers-verification-response).
2. [**Usual event**](set-up-webhook-integration#webhook-event-structure): A standard request Adapty server sends every time an event is created in it. You server does not need to  reply with any specific responce. The only thing the Adapty server needs is to receive a standard 200-code HTTP responce if it successfully received the message.

## Step 2. Set up receiving Adapty's verification request by your server

After you enable webhook integration in the Adapty Dashboard, Adapty will automatically send a `isMount` POST verification request to your endpoint.

```json title="Json"
{
    adapty_check: {{check_string}}
}
```

:::note
Be sure your endpoint supports **Content-Type**: `application/json` header.
:::

## Step 3. Set up your server's verification response

Your server must reply with a 200 or 201 HTTP status code and send the response outlined below with the identical `check_string`. 

```json title="Json"
{
    adapty_check_response: {{check_string}}
}
```

Once Adapty receives the verification response in the correct format, your Adapty webhook integration is fully configured.

From then on, Adapty will send the selected events to your specified URL as they happen. Ensure your server promptly confirms each Adapty event with a response status code in the 200-404 range, the `check_string` is not required anymore.

## Step 4. Set up processing of Adapty standard events

### Webhook event structure

Adapty will send you those events you've chosen in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.

Webhook events are serialized in JSON. The body of a `POST` request to your server will contain the serialized event wrapped into the following structure:

```json title="Json"
{
  "profile_id": "772204ce-ebf6-4ed9-83b0-d8633ab62b01",
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
Event parameters are the same for all event types.

| Property                          | Type                 | Description                                                  |
| :-------------------------------- | :------------------- | :----------------------------------------------------------- |
| **idfv**                          | String               | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps. You can find it in the **IDFV** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **idfa**                          | String               | The identifier for advertisers (IDFA) is a random device identifier assigned by Apple to a user's device. You can find it in the **IDFA** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **email**                         | String               | E-mail of your user. You can find it in the **Email** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **event_type**                    | String               | <p>Event name as it's called in Adapty. You can see them in the  **Default event ID** of the [Web hook events](set-up-webhook-integration#webhook-events) table. Standard flows with events that are created and sent to webhook are described on the [Webhook event flows](webhook-flows) page.</p> |
| **profile_id**                    | String               | The ID of the profile in Adapty. You can find it in the **Adapty ID** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **user_agent**                    | String               | User-agent used by the browser on the device.                |
| **advertising_id**                | String               | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device. Used for Android only. |
| **event_datetime**                | ISO 8601 date & time | Event date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html) : starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **event_properties**              | JSON                 | JSON of [event properties](set-up-webhook-integration#event-properties). |
| **integration_ids**               | JSON                 | JSON of user integration identifiers. If a user doesn't have any identifier or integrations are disabled, then a null is sent. |
| **customer_user_id**              | String               | User ID you use in your app to identify the user if you do. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. You can find it in the **Customer User ID** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **event_api_version**             | Integer              | Adapty API version. The current value is `1`.                |
| **profile_install_datetime**      | ISO 8601 date & time | Installation date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html): starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **profiles_sharing_access_level** | JSON                 | <p> A list of objects, each containing the IDs of users who share the access level (including the current profile):</p><ul>  <li> **profile_id**: (UUID4) The Adapty Profile ID sharing the access level, including the current profile.</li>  <li> **customer_user_id**: (string) The Customer User ID, if provided.</li> </ul> <p>This is used when your app allows [**Sharing paid access between user accounts**](general#6-sharing-purchases-between-user-accounts).</p> |
| **attributions**                  | JSON                 | JSON of [attribution data](webhook#attribution-data).        |
| **user_attributes**               | JSON                 | JSON of [custom user attributes](setting-user-attributes#custom-user-attributes). This will include any custom attributes you’ve set up to send from your mobile app. |

#### Attribution data

If you've chosen to send attribution data and if you have them, the data below will be sent with the event for every source. The same attribution data is sent to all event types.

| Field name          | Field type    | Description                                        |
| :------------------ | :------------ | :------------------------------------------------- |
| **ad_set**          | String        | Attribution ad set.                                |
| **status**          | String        | Can be `organic`, `non_organic,` or `unknown`.     |
| **channel**         | String        | Marketing channel name.                            |
| **ad_group**        | String        | Attribution ad group.                              |
| **campaign**        | String        | Marketing campaign name.                           |
| **creative**        | String        | Attribution creative keyword.                      |
| **created_at**      | ISO 8601 date | Date and time of attribution record creation.      |
| **network_user_id** | String        | ID assigned to the user by the attribution source. |

#### Attributions example

```JSON
 "attributions": {
    "appsflyer": {
      "ad_set": "Keywords 1.12",
      "status": "non_organic",
      "channel": "Google Ads",
      "ad_group": null,
      "campaign": "Social media influencers - Rest of the world",
      "creative": null,
      "created_at": "2024-11-15T10:44:20.991232+0000",
      "network_user_id": "1731667450897-7022533399482074397"
    }
  },
```

#### Event properties for all events exept for the Access Level Updated event
Event properties can differ between events. For example, for Access Level Updated event they differ pretty much, so we've deparated them to a separate section Event properties for Access Level Updated event. Event properties for other events are nearly the same, so we provide them as one table with highlighting if the property belons to some specific event.


| Property                      | Type          | Description                                                  |
| ----------------------------- | ------------- | ------------------------------------------------------------ |
| **store**                     | String        | Can be _app_store_ or _play_store_.                          |
| **currency**                  | String        | Local currency (defaults to USD).                            |
| **price_usd**                 | Float         | Product price before Apple/Google cut. Revenue.              |
| **profile_id**                | UUID          | Adapty user ID.                                              |
| **cohort_name**               | String        | Name of the audience to which the profile belongs to.        |
| **environment**               | String        | Can be _Sandbox_ or _Production_.                            |
| **price_local**               | Float         | Product price before Apple/Google cut in local currency. Revenue. |
| **base_plan_id**              | String        | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973)   in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price)   in Stripe. |
| **developer_id**              | String        | Developer (SDK) ID of the placement where the transaction originated. |
| **paywall_name**              | String        | Name of the paywall where the transaction originated.        |
| **proceeds_usd**              | Float         | Product price after Apple/Google cut. Net revenue.           |
| **variation_id**              | UUID          | Unique ID of the paywall where the purchase was made.        |
| **purchase_date**             | ISO 8601 date | The date and time of product purchase.                       |
| **store_country**             | String        | The country sent to us by the store.                         |
| **event_datetime**            | ISO 8601 date | The date and time of the event.                              |
| **proceeds_local**            | Float         | Product price after Apple/Google cut in local currency. Net revenue. |
|tax_amount_usd|||
| **transaction_id**            | String        | A unique identifier for a transaction such as a purchase or renewal. |
| **trial_duration**            | String        | Duration of a trial period in days. Sent in a format "{} days" , for example, "7 days". |
| **net_revenue_usd**           | Float         | Net revenue (income after Apple/Google cut and taxes) in USD. Can be empty. |
| **profile_country**           | String        | Determined by Adapty, based on profile IP.                   |
| **paywall_revision**          | Integer       | Revision of the paywall where the transaction originated. The value is set to 1. |
| **profile_event_id**          | UUID          | Unique event ID that can be used for deduplication.          |
|tax_amount_local|||
|net_revenue_local|||
| **vendor_product_id**         | String        | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **profile_ip_address**        | String        | Profile IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes. |
| **cancellation_reason**       | String        | <p>A reason why the user canceled a subscription. </p><p></p><p>Can be</p><p>iOS & Android</p><p>voluntarily_cancelled, billing_error, refund</p><p>iOS</p><p>price_increase, product_was_not_available, unknown</p><p>Android</p><p>new_subscription_replace, cancelled_by_developer</p><p>This property is sent only with the following event types</p><ul><li> Subscription expired (churned)</li><li> listitem</li><li> listitem</li></ul> |
| **consecutive_payments**      | Integer       | The number of periods, that a user is subscribed to without interruptions. Includes the current period. |
| **store_offer_category**      | String        | Can be _introductory_ or _promotional_.                      |
| **rate_after_first_year**     | Boolean       | Boolean indicates that a vendor reduces cuts to 15%. Apple and Google have 30% first-year cut and 15% after it. |
| **original_purchase_date**    | ISO 8601 date | The date and time of the original purchase.                  |
| **original_transaction_id**   | String        | The transaction identifier of the original purchase.         |
| **subscription_expires_at**   | ISO 8601 date | The Expiration date of subscription. Usually in the future.  |
| **store_offer_discount_type** | String        | Can be _free_trial_, _pay_as_you_go_ or _pay_up_front_.      |
| **profile_has_access_level**  | Boolean       | A boolean that indicates whether the profile has an active access level. |
| **profile_total_revenue_usd** | Float         | Total revenue for the profile, refunds included.             |


| **promotional_offer_id**      | String        | ID of promotional offer as indicated in the Product section of the Adapty Dashboard |
| **ab_test_name**              | String        | Name of the A/B test where the transaction originated.       |
| **ab_test_revision**          | Integer       | Revision of the A/B test where the transaction originated. The value is set to 1. |
| **access_level_id**           | String        | Paid access level ID                                         |
| **will_renew**                | Boolean       | Boolean indicating whether paid access level will be renewed. |
| **is_lifetime**               | Boolean       | Boolean indicating whether paid access level is lifetime.    |
| **is_in_grace_period**        | Boolean       | Boolean indicating whether profile is in grace period.       |
| **starts_at**                 | ISO 8601 date | Date and time when paid access level starts for the user.    |
| **renewed_at**                | ISO 8601 date | Date and time when paid access will be renewed.              |
| **activated_at**              | ISO 8601 date | Date and time when paid access was activated.                |
| **billing_issue_detected_at** | ISO 8601 date | Date and time of billing issue.                              |

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Webhook integration enables the control of sending attribution and user attributes. 

- Enable the **Send Attribution** option in the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page to send the information about the source of app installs from data providers. 
- Enable the **Send User Attributes** option to send custom user attributes set up from the Adapty SDK, such as user preferences and app usage data.

#### Event properties for Access Level Updated event

| Property                      | Type          | Description                                                  |
| ----------------------------- | ------------- | ------------------------------------------------------------ |
| **store**                     | String        | Can be _app_store_ or _play_store_.                          |
| **currency**                  | String        | Local currency (defaults to USD).                            |
| **is_active**                 | Boolean       | Boolean indicating whether paid access level is active for the profile. AL |
| **is_refund**                 | Boolean       | Boolean indicating whether transaction is refunded.    AL      |
| **expires_at**                | ISO 8601 date | Date and time when paid access will expire.              AL    |
| **profile_id**                | UUID          | Adapty user ID.                                              |
| **renewed_at**                | ISO 8601 date | Date and time when paid access will be renewed.              |
| **will_renew**                | Boolean       | Boolean indicating whether paid access level will be renewed. |
| **environment**               | String        | Can be _Sandbox_ or _Production_.                            |
| **is_lifetime**               | Boolean       | Boolean indicating whether paid access level is lifetime.    |
| **activated_at**              | ISO 8601 date | Date and time when paid access was activated.                |
| **purchase_date**             | ISO 8601 date | The date and time of product purchase.                       |
| **store_country**             | String        | The country sent to us by the store.                         |
| **event_datetime**            | ISO 8601 date | The date and time of the event.                              |
| **transaction_id**            | String        | A unique identifier for a transaction such as a purchase or renewal. |
| **access_level_id**           | String        | Paid access level ID                                         |
| **profile_country**           | String        | Determined by Adapty, based on profile IP.                   |
| **profile_event_id**          | UUID          | Unique event ID that can be used for deduplication.          |
| **vendor_product_id**         | String        | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **is_in_grace_period**        | Boolean       | Boolean indicating whether profile is in grace period.       |
| **profile_ip_address**        | String        | Profile IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes. |
| **original_purchase_date**    | ISO 8601 date | The date and time of the original purchase.                  |
| **original_transaction_id**   | String        | The transaction identifier of the original purchase.         |
| **subscription_expires_at**   | ISO 8601 date | The Expiration date of subscription. Usually in the future.  |
| **profile_has_access_level**  | Boolean       | A boolean that indicates whether the profile has an active access level. |
| **profile_total_revenue_usd** | Float         | Total revenue for the profile, refunds included.             |


#### Event properties example

```json
  "event_properties": {
    "store": "play_store",
    "currency": "USD",
    "price_usd": 4.99,
    "profile_id": "82a8103e-cb8d-4837-ba43-33c02d628021",
    "cohort_name": "All Users",
    "environment": "Production",
    "price_local": 4.99,
    "base_plan_id": "b1",
    "developer_id": "offer_16",
    "paywall_name": "offer_16",
    "proceeds_usd": 4.2315,
    "variation_id": "a942d149-6545-4bae-33fc-b19e5a158804",
    "purchase_date": "2024-11-15T10:45:36.181000+0000",
    "store_country": "AR",
    "event_datetime": "2024-11-15T10:45:36.181000+0000",
    "proceeds_local": 4.2415,
    "tax_amount_usd": 0,
    "transaction_id": "TRA.3365-4326-1333-87868",
    "net_revenue_usd": 4.2415,
    "profile_country": "AR",
    "paywall_revision": "1",
    "profile_event_id": "2f2a1dc4-463e-4333-8a1b-493c75c9b78f",
    "tax_amount_local": 0,
    "net_revenue_local": 4.2415,
    "vendor_product_id": "weekly_499",
    "profile_ip_address": "129.62.230.4",
    "consecutive_payments": 1,
    "rate_after_first_year": false,
    "original_purchase_date": "2024-11-15T10:45:36.181000+0000",
    "original_transaction_id": "TRA.3365-4326-1333-87868",
    "subscription_expires_at": "2024-11-22T10:44:18.594000+0000",
    "profile_has_access_level": true,
    "profile_total_revenue_usd": 4.99
  },
```

## Step 5. Configure webhook integration in the Adapty Dashboard

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

## Step 6. (optional) Choose events to send and map event names

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

The event ID can be any string, simply make sure the event ID in your webhook processing server coinside with the one you eneterd in the Adapty Dashboard. You cannot leave the event ID empty for enabled events. If you accidentally removed Adapty event ID and need to restore it, you can always copy it from the **Webhook events** table below.

### Webhook events

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

## Step 7. Handle webhook events

Webhooks are typically delivered within 5 to 60 seconds of the event occurring. Cancellation events, however, may take up to 2 hours to be delivered after a user cancels their subscription.

If your server's response status code is outside the 200-404 range, Adapty will retry sending the event up to 9 times over 24 hours with exponential backoff. We suggest you set up your webhook to do only basic validation of the event body from Adapty before responding. If your server can't process the event and you don't want Adapty to retry, use a status code within the 200-404 range. Also, handle any time-consuming tasks asynchronously and respond to Adapty quickly. If Adapty doesn't receive a response within 10 seconds, it will consider the attempt a failure and will retry