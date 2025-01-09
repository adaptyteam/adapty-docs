---
title: "Webhook event types and fields"
description: ""
metadataTitle: ""
toc_max_heading_level: 4
---

import WebhookEvents from '@site/src/components/reusable/WebhookEvents.md';

Adapty sends webhooks in response to events that occur in your app. This section defines these event types and the data contained in each webhook.

## Webhook event types

You can send all event types to your webhook or choose only some of them. You can consult our [Event flows](event-flows) to decide which events are required or not. You can disable the event types you do not need when you [set up your Webhook integration](set-up-webhook-integration#step-3-configure-webhook-integration-in-the-adapty-dashboard). There, you can also replace Adapty default event IDs with your own if required.

<WebhookEvents />

## Webhook event structure

Adapty will send you only those events you've chosen in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.

Webhook events are serialized in JSON. The body of a `POST` request to your server will contain the serialized event wrapped into the structure below. All events have the same event fields; however, the list of event properties will depend on the event type, store, and your specific configuration. User attributes are the [custom user attributes](setting-user-attributes#custom-user-attributes) you set up, so they will contain what you've configured. Attribution data fields are the same for all event types as well, however, the list of attributions will depend on which attribution sources you use in your mobile app. See below an example of an event:

```json title="Json"
{
  "profile_id": "00000000-0000-0000-0000-000000000000",
  "customer_user_id": "UserIdInYourSystem",
  "idfv": "00000000-0000-0000-0000-000000000000",
  "idfa": "00000000-0000-0000-0000-000000000000",
  "advertising_id": "00000000-0000-0000-0000-000000000000",
  "profile_install_datetime": "2000-01-31T00:00:00.000000+0000",
  "user_agent": "ExampleUserAgent/1.0 (Device; OS Version) Browser/Engine",
  "email": "john.doe@company.com",
  "event_type": "subscription_started",
  "event_datetime": "2000-01-31T00:00:00.000000+0000",
  "event_properties": {
    "store": "play_store",
    "currency": "USD",
    "price_usd": 4.99,
    "profile_id": "00000000-0000-0000-0000-000000000000",
    "cohort_name": "All Users",
    "environment": "Production",
    "price_local": 4.99,
    "base_plan_id": "b1",
    "developer_id": "onboarding_placement",
    "paywall_name": "UsedPaywall",
    "proceeds_usd": 4.2315,
    "variation_id": "00000000-0000-0000-0000-000000000000",
    "purchase_date": "2024-11-15T10:45:36.181000+0000",
    "store_country": "AR",
    "event_datetime": "2000-01-31T00:00:00.000000+0000",
    "proceeds_local": 4.2415,
    "tax_amount_usd": 0,
    "transaction_id": "0000000000000000",
    "net_revenue_usd": 4.2415,
    "profile_country": "AR",
    "paywall_revision": "1",
    "profile_event_id": "00000000-0000-0000-0000-000000000000",
    "tax_amount_local": 0,
    "net_revenue_local": 4.2415,
    "vendor_product_id": "onemonth_no_trial",
    "profile_ip_address": "10.10.1.1",
    "consecutive_payments": 1,
    "rate_after_first_year": false,
    "original_purchase_date": "2000-01-31T00:00:00.000000+0000",
    "original_transaction_id": "0000000000000000",
    "subscription_expires_at": "2000-01-31T00:00:00.000000+0000",
    "profile_has_access_level": true,
    "profile_total_revenue_usd": 4.99
  },
  "event_api_version": 1,
  "profiles_sharing_access_level": [{"profile_id": "00000000-0000-0000-0000-000000000000", "customer_user_id": "UserIdInYourSystem"}],
   "attributions": {
    "appsflyer": {
      "ad_set": "Keywords 1.12",
      "status": "non_organic",
      "channel": "Google Ads",
      "ad_group": null,
      "campaign": "Social media influencers - Rest of the world",
      "creative": null,
      "created_at": "2000-01-31T00:00:00.000000+0000",
      "network_user_id": "UniqueIdentifierAssignedByAdNetwork"
    }
  },
  "user_attributes": {"Favourite_color": "Violet", "Pet_name": "Fluffy"}
  "integration_ids": {"firebase_app_instance_id": "val1", "branch_id": "val2", "one_signal_player_id": "val3"}
}
```

### Event fields

Event parameters are the same for all event types.

| **Field**                         | **Type**             | **Description**                                              |
| --------------------------------- | -------------------- | ------------------------------------------------------------ |
| **advertising_id**                | UUID                 | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device. Used for Android only. |
| **attributions**                  | JSON                 | JSON of [attribution data](webhook-event-types-and-fields#attribution-data). To send the attribution, enable the **Send Attribution** option in the [**Integrations** -> **Webhooks**](https://app.adapty.io/integrations/customwebhook) page. |
| **customer_user_id**              | String               | User ID you use in your app to identify the user if you do. For example, it can be your user UUID, email, or any other ID. If not set, this field will be null. You can find it in the **Customer User ID** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **email**                         | String               | E-mail of your user. You can find it in the **Email** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **event_api_version**             | Integer              | Adapty API version. The current value is `1`.                |
| **event_datetime**                | ISO 8601 date & time | Event date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html): starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **event_properties**              | JSON                 | JSON of [event properties](webhook-event-types-and-fields#event-properties). |
| **event_type**                    | String               | <p>Event name in Adapty format.</p> <ul><li> subscription_started</li><li> subscription_renewed</li><li> subscription_renewal_cancelled</li><li> subscription_renewal_reactivated</li><li> subscription_expired</li><li> subscription_paused</li><li> non_subscription_purchase</li><li> trial_started</li><li> trial_converted </li><li> trial_renewal_cancelled</li><li> trial_renewal_reactivated</li><li> trial_expired</li><li> entered_grace_period</li><li> billing_issue_detected</li><li> subscription_refunded</li><li> non_subscription_purchase_refunded</li><li> access_level_updated</li></ul><p> You can see them in the **Default event ID** of the [Webhook events](webhook-event-types-and-fields#webhook-event-types) table. Standard flows with events that are created and sent to Webhook are described on the [Webhook event flows](event-flows) page.</p> |
| **idfa**                          | UUID                 | The identifier for advertisers (IDFA) is a random device identifier assigned by Apple to a user's device. You can find it in the **IDFA** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **idfv**                          | UUID                 | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps. You can find it in the **IDFV** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **integration_ids**               | JSON                 | JSON of user integration identifiers. If a user doesn't have any identifier or integrations are disabled, then a null is sent. |
| **play_store_purchase_token**     | JSON                 | JSON containing the [Play Store purchase token](webhook-event-types-and-fields#play-store-purchase-token) used to revalidate the purchase is required. This is included only if the **Send Play Store purchase token** option is enabled in the Webhook integration settings. |
| **profile_id**                    | UUID                 | The ID of the profile in Adapty. You can find it in the **Adapty ID** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| **profile_install_datetime**      | ISO 8601 date & time | Installation date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html): starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **profiles_sharing_access_level** | JSON                 | <p> A list of objects, each containing the IDs of users who share the access level (excluding the current profile):</p><ul> <li> **profile_id**: (UUID) The Adapty Profile ID sharing the access level, excluding the current profile.</li> <li> **customer_user_id**: (String) The Customer User ID, if provided.</li> </ul> <p>This is used when your app allows [**Sharing paid access between user accounts**](general#6-sharing-purchases-between-user-accounts).</p> |
| **user_agent**                    | String               | User-agent used by the browser on the device.                |
| **user_attributes**               | JSON                 | JSON of [custom user attributes](setting-user-attributes#custom-user-attributes). This will include any custom attributes you’ve set up to send from your mobile app. To send it, enable the **Send User Attributes** option in the [**Integrations** -> **Webhooks**](https://app.adapty.io/integrations/customwebhook) page. |

### Attribution data

If you've chosen to send attribution data and if you have them, the data below will be sent with the event for every source. The same attribution data is sent to all event types.

To send the attribution, enable the **Send Attribution** option in the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page. 

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

### Integration IDs

The following integration IDs are used now in events: `adjust_device_id`, `airbridge_device_id`, `amplitude_device_id`, `amplitude_user_id`, `appmetrica_device_id`, `appmetrica_profile_id`, `appsflyer_id`, `branch_id`, `facebook_anonymous_id`, `firebase_app_instance_id`, `mixpanel_user_id`,  `pushwoosh_hwid`, `one_signal_player_id`, `one_signal_subscription_id`, `tenjin_analytics_installation_id`.

### Play Store purchase token

This field includes all the data needed to revalidate a purchase, if necessary. It is sent only if the **Send Play Store purchase token** option is enabled in the [Webhook integration settings](https://app.adapty.io/integrations/customwebhook).

| Field               | Type    | Description                                                  |
| :------------------ | :------ | :----------------------------------------------------------- |
| **product_id**      | String  | The unique identifier of the product (SKU) purchased in the Play Store. |
| **purchase_token**  | String  | A token generated by Google Play to uniquely identify this purchase transaction. |
| **is_subscription** | Boolean | Indicates whether the purchased product is a subscription (`true`) or a one-time purchase (`false`). |

### Event Properties

Event properties can vary depending on the event type and even between events of the same type. For instance, an event originating from the App Store won’t include Android-specific properties like `base_plan_id`.

The [Access Level Updated](webhook-event-types-and-fields#for-access-level-updated-event) event has distinct properties, so we’ve dedicated a separate section to it. Similarly, we’ve separated [Additional tax and revenue event properties](webhook-event-types-and-fields#additional-tax-and-revenue-event-properties), as they are specific to only certain event types.

#### For most event types

The event properties for most event types are consistent (except for **Access Level Updated** event, which is described in its own section). Below is a comprehensive table highlighting properties and indicating if they belong to specific events.

| Field                             | Type          | Description                                                  |
| :-------------------------------- | :------------ | :----------------------------------------------------------- |
| **ab_test_name**                  | String        | Name of the A/B test where the transaction originated.       |
| **base_plan_id**                  | String        | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| **cancellation_reason**           | String        | <p>Possible reasons for cancellation: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `cancelled_by_developer`, `new_subscription_replace`, `upgraded`, `unknown`, `adapty_revoked`.</p><p>Present in the following event types:</p>`subscription_cancelled`, `subscription_refunded`, and `trial_cancelled`. |
| **cohort_name**                   | String        | Name of the audience to which the profile belongs.           |
| **consecutive_payments**          | Integer       | The number of periods, that a user is subscribed to without interruptions. Includes the current period. |
| **currency**                      | String        | Local currency (defaults to USD).                            |
| **developer_id**                  | String        | The ID of the placement where the transaction originated.    |
| **environment**                   | String        | Possible values are `Sandbox` or `Production`.               |
| **event_datetime**                | ISO 8601 date | The date and time of the event.                              |
| **original_purchase_date**        | ISO 8601 date | For recurring subscriptions, the original purchase is the first transaction in the chain, its ID called original transaction ID  links the chain of renewals; later transactions are extensions of it. The original purchase date is the date and time of this first transaction. |
| **original_transaction_id**       | String        | <p>For recurring subscriptions, this is the original transaction ID that links the chain of renewals. The original transaction is the first in the chain; later transactions are extensions of it.</p><p>If no extensions, `original_transaction_id` matches store_transaction_id.</p> |
| **paywall_name**                  | String        | Name of the paywall where the transaction originated.        |
| **paywall_revision**              | Integer       | Revision of the paywall where the transaction originated. The default value is 1. |
| **price_local**                   | Float         | Product price before Apple/Google cut in local currency. Revenue. |
| **price_usd**                     | Float         | Product price before Apple/Google cut in USD. Revenue.       |
| **profile_country**               | String        | Determined by Adapty, based on profile IP.                   |
| **profile_event_id**              | UUID          | Unique event ID that can be used for deduplication.          |
| **profile_has_access_level**      | Boolean       | A boolean that indicates whether the profile has an active access level. |
| **profile_id**                    | UUID          | Adapty internal user ID.                                     |
| **profile_ip_address**            | String        | Profile IP (can be IPv4 or IPv6, with IPv4 preferred when available). |
| **profile_total_revenue_usd**     | Float         | Total revenue for the profile, refunds included.             |
| **profiles_sharing_access_level** | JSON          | <p> A list of objects, each containing the IDs of users who share the access level (excluding the current profile):</p><ul>  <li> **profile_id**: (UUID) The Adapty Profile ID sharing the access level, excluding the current profile.</li>  <li> **customer_user_id**: (string) The Customer User ID, if provided.</li> </ul> <p>This is used when your app allows [**Sharing paid access between user accounts**](general#6-sharing-purchases-between-user-accounts).</p> |
| **promotional_offer_id**          | String        | ID of promotional offer as indicated in the Product section of the Adapty Dashboard |
| **purchase_date**                 | ISO 8601 date | The date and time of the product purchase.                   |
| **rate_after_first_year**         | Boolean       | Boolean indicates that a vendor reduces cuts to 15%. Apple and Google have 30% first-year cut and 15% after it. |
| **store**                         | String        | Store where the product was bought. Possible values: **app_store**, **play_store**, **stripe**. |
| **store_country**                 | String        | The country sent to us by the app store.                     |
| **store_offer_category**          | String        | Applied offer category. Possible values are `introductory`, `promotional`, `winback`. |
| **store_offer_discount_type**     | String        | Applied offer type. Possible values are `free_trial`, `pay_as_you_go`, and `pay_up_front`. |
| **subscription_expires_at**       | ISO 8601 date | The Expiration date of subscription. Usually in the future.  |
| **transaction_id**                | String        | Unique identifier for a transaction.                         |
| **trial_duration**                | String        | Duration of a trial period in days. Sent in a format "{} days", for example, "7 days". Present in the trial connected event types only: `trial_started`, `trial_converted`, `trial_cancelled`. |
| **variation_id**                  | UUID          | Unique ID of the paywall where the purchase was made.        |
| **vendor_product_id**             | String        | Product ID in the Apple App Store, Google Play Store, or Stripe. |

#### Additional tax and revenue event properties

The event properties related to taxes and revenue below are additional fields that apply only to certain event types. This means that the listed event types include the [Event properties for most event types](webhook-event-types-and-fields#for-most-event-types), along with the extra fields listed below.

Event types that have the tax and revenue event properties:

- `subscription_renewed`
- `subscription_initial_purchase`
- `subscription_refunded`
- `non_subscription_purchase`

| Field                 | Type  | Description                                                  |
| :-------------------- | :---- | :----------------------------------------------------------- |
| **net_revenue_local** | Float | Net revenue (income after Apple/Google cut and taxes) in local currency. |
| **net_revenue_usd**   | Float | Net revenue (income after Apple/Google cut and taxes) in USD. |
| **proceeds_local**    | Float | Product price after Apple/Google cut in local currency.      |
| **proceeds_usd**      | Float | Product price after Apple/Google cut.                        |
| **tax_amount_local**  | Float | Tax amount deducted in local currency.                       |
| **tax_amount_usd**    | Float | Tax amount deducted in USD.                                  |

#### For Access Level Updated event

The **Access Level Updated** event is a specific webhook event generated only when the Webhook integration is active, and this event type is enabled. If enabled, it is sent to the configured Webhook and appears in the **Event Feed**. If not enabled, the event will not be created.

| Property                           | Type          | Description                                                  |
| ---------------------------------- | ------------- | ------------------------------------------------------------ |
| **ab_test_name**                   | String        | Name of the A/B test where the transaction originated.       |
| **access_level_id**                | String        | The ID of the access level.                                  |
| **activated_at**                   | ISO 8601 date | Date and time when the access was latest activated.          |
| **active_introductory_offer_type** | String        | Type of introductory offer applied. Possible values are `free_trial`, `pay_as_you_go`, and `pay_up_front`. |
| **active_promotional_offer_id**    | String        | ID of promotional offer as indicated in the Product section of the Adapty Dashboard |
| **active_promotional_offer_type**  | String        | Type of promotional offer applied. Possible values are `free_trial`, `pay_as_you_go`, and `pay_up_front`. |
| **base_plan_id**                   | String        | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| **billing_issue_detected_at**      | ISO 8601 date | Date and time of billing issue.                              |
| **cancellation_reason**            | String        | Possible reasons for cancellation: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `cancelled_by_developer`, `new_subscription_replace`, `upgraded`, `unknown`, `adapty_revoked`. |
| **cohort_name**                    | String        | Name of the audience to which the profile belongs.           |
| **currency**                       | String        | Local currency (defaults to USD).                            |
| **developer_id**                   | String        | The ID of the placement where the transaction originated.    |
| **environment**                    | String        | Possible values are `Sandbox` or `Production`.               |
| **event_datetime**                 | ISO 8601 date | The date and time of the event.                              |
| **expires_at**                     | ISO 8601 date | Date and time when the access will expire.                   |
| **is_active**                      | Boolean       | Boolean indicating whether the access level is active.       |
| **is_in_grace_period**             | Boolean       | Boolean indicating whether the profile is in the grace period. |
| **is_lifetime**                    | Boolean       | Boolean indicating whether the access level is lifetime.     |
| **is_refund**                      | Boolean       | Boolean indicating whether the transaction is a refund.      |
| **original_purchase_date**         | ISO 8601 date | For recurring subscriptions, the original purchase is the first transaction in the chain, its ID called original transaction ID  links the chain of renewals; later transactions are extensions of it. The original purchase date is the date and time of this first transaction. |
| **original_transaction_id**        | String        | <p>For recurring subscriptions, this is the original transaction ID that links the chain of renewals. The original transaction is the first in the chain; later transactions are extensions of it.</p><p>If no extensions, `original_transaction_id` matches store_transaction_id.</p>The transaction identifier of the original purchase. |
| **paywall_name**                   | String        | Name of the paywall where the transaction originated.        |
| **paywall_revision**               | Integer       | Revision of the paywall where the transaction originated. The default value is 1. |
| **profile_country**                | String        | Determined by Adapty, based on profile IP.                   |
| **profile_event_id**               | UUID          | Unique event ID that can be used for deduplication.          |
| **profile_has_access_level**       | Boolean       | Boolean indicating whether the profile has an active access level. |
| **profile_id**                     | UUID          | Adapty internal user profile ID.                             |
| **profile_ip_address**             | String        | Profile IP address of the user.                              |
| **profile_total_revenue_usd**      | Float         | Total revenue for the profile, refunds included.             |
| **profiles_sharing_access_level**  | JSON          | <p> A list of objects, each containing the IDs of users who share the access level (excluding the current profile):</p><ul>  <li> **profile_id**: (UUID) The Adapty Profile ID sharing the access level, excluding the current profile.</li>  <li> **customer_user_id**: (string) The Customer User ID, if provided.</li> </ul> <p>This is used when your app allows [**Sharing paid access between user accounts**](general#6-sharing-purchases-between-user-accounts).</p> |
| **purchase_date**                  | ISO 8601 date | The date and time of product purchase.                       |
| **renewed_at**                     | ISO 8601 date | Date and time when the access will be renewed.               |
| **store**                          | String        | Store where the product was bought. Possible values: **app_store**, **play_store**, **stripe**. |
| **store_country**                  | String        | Country sent to Adapty by the app store.                     |
| **subscription_expires_at**        | ISO 8601 date | Expiration date of the subscription.                         |
| **transaction_id**                 | String        | Unique identifier for a transaction.                         |
| **trial_duration**                 | String        | Duration of a trial period in days (e.g., "7 days").         |
| **variation_id**                   | UUID          | An identifier of a variation, used to attribute purchases to this paywall. |
| **vendor_product_id**              | String        | Product ID in the store (Apple/Google/Stripe).               |
| **will_renew**                     | Boolean       | Indicates whether the paid access level will be renewed.     |

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on specific fields rather than the entire structure.
:::
