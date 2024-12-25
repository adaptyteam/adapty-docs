---
title: "Legacy server-side API specs"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

**Base URL**: `https://api.adapty.io/api/v1/sdk`

## Authorization

:::warning

**You are viewing the guide for the legacy server-side API.**
For the latest version, refer to the [Server-side API V2](ss-authorization) and the [Migration Guide to Server-side API V2](migration-guide-to-server-side-API-v2).

:::

Each API request must be signed with the [Secret Key](general).

When calling API:

- You must set **Authorization** header with the value "Api-Key \{secret\_token\}" \(without quotes\) to each request, for example `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`
- Use JSON payload in the request body for POST and PATCH requests
- All requests must set header **Content-Type**: application/json

## Working with customer user ID

Most server-side API requests allow passing `customer_user_id` as a URL parameter. This makes it easy for you to query/update data in Adapty, without having to store Adapty's `profile_id`.  In most cases, you should pass `customer_user_id` as is, without any modifications.

However, if your `customer_user_id` contains [reserved URI characters](https://en.wikipedia.org/wiki/Percent-encoding), for example `/`, `?`, `+` you should pass it encoded. Use the [Base64URL](https://www.base64encode.org/) encoding (not the regular Base64). This way, all special characters will be encoded and Adapty will decode it upon receiving. To tell Adapty the `customer_user_id` is encoded, pass the `is_user_id_base64url_encoded=1` get parameter. Note, that passing the `is_user_id_base64url_encoded=1` get parameter without actual encoding, will end up with 400 validation error.

You should only encode the `customer_user_id` if you pass it as a URL path. When sending `customer_user_id` inside the JSON payload (for example, when creating the profile), you should not encode it.

```python title="Python"
## Don't encode
customer_user_id = '123' # GET: /profiles/123/
customer_user_id = 'abc' # GET: /profiles/abc/
customer_user_id = '3c410419-9959-447a-84b5-be7cb6a308d9' # GET: /profiles/3c410419-9959-447a-84b5-be7cb6a308d9/

## Base64URL encode
customer_user_id = '123+456' # GET: /profiles/MTIzKzQ1Ng==/?is_user_id_base64url_encoded=1
customer_user_id = 'abc/def' # GET: /profiles/YWJjL2RlZg==/?is_user_id_base64url_encoded=1
customer_user_id = '012?012' # GET: /profiles/MDEyPzAxMg==/?is_user_id_base64url_encoded=1
```

## Requests

### Prolong/grant a subscription for a user

```text title="Text"
POST: /profiles/{profile_id_or_customer_user_id}/paid-access-levels/{access_level}/grant/
```

Path parameters:

| Param                              | Type | Required | Nullable | Description                                                  |
| :--------------------------------- | :--- | :------- | :------- | :----------------------------------------------------------- |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or developer's internal ID                 |
| **access_level**                   | str  | ✅        | ❌        | ID \(slug\) of a paid access level. Find it in Adapty Dashboard |

Request parameters:

| Param                              | Type          | Required      | Nullable | Description                                                  |
| ---------------------------------- | ------------- | ------------- | -------- | ------------------------------------------------------------ |
| **expires_at**                     | ISO 8601 date | ✅\* see below | ❌        | Subscription deadline                                        |
| **duration_days**                  | int           | ✅\* see below | ❌        | Additional days to a current subscription\*\*                |
| **is_lifetime**                    | bool          | ✅\* see below | ❌        | If set true, then a user will forever have a paid access level forever |
| **starts_at**                      | ISO 8601 date | ❌             | ❌        | If the start time of the action is in the future, then you can transfer it. If the start time and the period are indicated, the period will be counted from the indicated time |
| **vendor_product_id**              | str           | ❌             | ❌        | When posting a transaction, include the product ID that triggers the subscription renewal. If you're granting an access level without a transaction, skip this parameter, and **adapty_server_side_product** will be used by default. |
| **base_plan_id**                   | str           | ❌             | ❌        | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| **vendor_original_transaction_id** | str           | ❌             | ❌        | ID of the original transaction in the subscription renewal chain in a vendor environment. |
| **vendor_transaction_id**          | str           | ❌             | ❌        | <p>Transaction ID in a vendor environment.</p><p>If it is the same as **vendor_original_transaction_id** or if **vendor_original_transaction_id** is absent, Adapty considers it the first subscription purchase. If it differs from **vendor_original_transaction_id**, Adapty considers the purchase the subscription renewal.</p> |
| **store**                          | str           | ❌             | ❌        | A store where users purchased a product, such as **app\_store** and **play\_store**, can be custom. Default is **adapty** |
| **introductory_offer_type**        | str           | ❌             | ❌        | A type of introduction offer. Available values are **free\_trial**, **pay\_as\_you\_go**, and **pay\_up\_front**. |
| **price**                          | float         | ❌             | ❌        | <p>Price of the subscription/purchase to save in [transaction](server-side-api-specs-legacy#transaction).</p><p>The first subscription purchase with a zero price is considered a free trial, while a renewal with a zero price is considered a free subscription renewal.</p><p></p><p>If you provide price, provide `price_locale` as well.</p> |
| **price_locale**                   | str           | ❌             | ❌        | The currency of the transaction in the [three-letter](https://en.wikipedia.org/wiki/ISO_4217) format. `USD` is used by default. |
| **proceeds**                       | float         | ❌             | ❌        | Proceeds \(price that is reduced due to stores' fee\) of the subscription/purchase to save in [transaction](server-side-api-specs-legacy#transaction). |
| **is_sandbox**                     | bool          | ❌             | ❌        | Boolean indicating whether the product was purchased in the sandbox or production environment. |


#### Paid access level

There are three ways to grant users a subscription. So, at least one of **is\_lifetime**, **expires\_at**, or **duration\_days** must be set. If more than one param is set, then **is\_lifetime=true** has a maximum priority, then **expires\_at**, and lastly **duration\_days**.

As all payment processing is done by Apple/Google, Adapty can not control or affect it. So, when using **duration\_days** to a current subscription, remember that a user still will be charged on a needed day. For example, the user has a monthly subscription and the next charge date will be the 5th of April. You grant a user additional 7 days, _but the user still is charged on the 5th of April!._ It's best using **duration\_days** with never subscribed users or churned. In that case, reference day is a day of granting.

#### Transaction

If all **vendor_product_id**, **vendor\_transaction\_id,** and **store** are specified, Adapty creates and saves transaction entry so this grant is accounted in [Charts](analytics-charts) \(Revenue, MRR, Subscriptions\) unless the transaction with these parameters already exists \(e.g. it was generated by iOS purchase\). If **price** is specified, it is associated with this transaction.

Currently, this type of transaction does not generate any profile events, does not affect users' subscription status, and does not show up in the [**Event Feed**](https://app.adapty.io/event-feed).

Also, be aware that these transactions affect billing since they are counted towards MTR.

Sample request:

```json title="Json"
{
    "starts_at": "2020-01-15T15:10:36.517975+0000",
    "expires_at": "2020-02-15T15:10:36.517975+0000",
    "vendor_product_id": "basic_subscription_1_month",
    "vendor_transaction_id": "1000000630116569",
    "store": "app_store",
    "introductory_offer_type": null
}
```

Sample response:

```json title="Json"
{
  "data": {
    "app_id": "ff90dd2e-e7f2-454b-9d86-071036a284fe",
    "profile_id": "77112400-89f1-4465-b9c9-5437e58c6688",
    "customer_user_id": "iwitaly@adapty.io",
    "paid_access_levels": {
      "premium": {
        "id": "premium",
        "is_active": true,
        "is_lifetime": false,
        "expires_at": "2023-03-29T15:30:34.000000+0000",
        "starts_at": null,
        "will_renew": false,
        "vendor_product_id": "adapty_server_side_product",
        "base_plan_id": "premium_autorenewing",
        "vendor_transaction_id": "1000000630116569",
        "vendor_original_transaction_id": "1000000625263604",
        "store": "adapty",
        "activated_at": "2020-03-26T16:24:19.497674+0000",
        "renewed_at": "2020-03-26T16:24:19.497674+0000",
        "unsubscribed_at": null,
        "billing_issue_detected_at": null,
        "is_in_grace_period": false,
        "active_introductory_offer_type": "free_trial",
        "active_promotional_offer_type": null,
        "active_promotional_offer_id": null,
        "cancellation_reason": null
      }
    },
    "subscriptions": {
      "com.adapty.premium.monthly": {
        "is_active": false,
        "is_lifetime": false,
        "expires_at": "2020-02-21T16:30:34.000000+0000",
        "starts_at": null,
        "will_renew": false,
        "vendor_product_id": "com.adapty.premium.monthly",
        "base_plan_id": "monthly_autorenewing",
        "vendor_transaction_id": "1000000630116569",
        "vendor_original_transaction_id": "1000000625263604",
        "store": "app_store",
        "activated_at": "2020-02-10T19:14:02.000000+0000",
        "renewed_at": "2020-02-21T16:25:34.000000+0000",
        "unsubscribed_at": "2020-02-21T16:30:34.000000+0000",
        "billing_issue_detected_at": "2020-02-21T16:30:34.000000+0000",
        "is_in_grace_period": false,
        "active_introductory_offer_type": null,
        "active_promotional_offer_type": null,
        "active_promotional_offer_id": null,
        "cancellation_reason": "voluntarily_cancelled",
        "is_sandbox": true
      },
      "com.adapty.premium.weekly": {
        "is_active": false,
        "is_lifetime": false,
        "expires_at": "2020-02-10T19:32:00.000000+0000",
        "starts_at": null,
        "will_renew": true,
        "vendor_product_id": "com.adapty.premium.weekly",
        "base_plan_id": "weekly_autorenewing",
        "vendor_transaction_id": "1000000625265713",
        "vendor_original_transaction_id": "1000000625263604",
        "store": "app_store",
        "activated_at": "2020-02-10T19:14:02.000000+0000",
        "renewed_at": "2020-02-10T19:29:00.000000+0000",
        "unsubscribed_at": null,
        "billing_issue_detected_at": null,
        "is_in_grace_period": false,
        "active_introductory_offer_type": null,
        "active_promotional_offer_type": null,
        "active_promotional_offer_id": null,
        "cancellation_reason": null,
        "is_sandbox": true
      },
      "basic_subscription_unlimited": {
        "is_active": true,
        "is_lifetime": false,
        "expires_at": "2021-02-27T11:00:30.000000+0000",
        "starts_at": null,
        "will_renew": false,
        "vendor_product_id": "basic_subscription_unlimited",
        "base_plan_id": "basic_prepaid",
        "vendor_transaction_id": "1000000632277988",
        "vendor_original_transaction_id": "1000000632277988",
        "store": "app_store",
        "activated_at": "2020-02-27T11:00:30.000000+0000",
        "renewed_at": null,
        "unsubscribed_at": null,
        "billing_issue_detected_at": null,
        "is_in_grace_period": false,
        "active_introductory_offer_type": null,
        "active_promotional_offer_type": null,
        "active_promotional_offer_id": null,
        "cancellation_reason": null,
        "is_sandbox": true
      }
    },
    "non_subscriptions": null
  }
}
```

Learn more about responses in the [API Objects](server-side-api-objects) section**.**

### Revoke subscription from a user

```text title="Text"
POST: /profiles/{profile_id_or_customer_user_id}/paid-access-levels/{access_level}/revoke/
```

Path parameters:

| Param                              | Type | Required | Nullable | Description                                                  |
| :--------------------------------- | :--- | :------- | :------- | :----------------------------------------------------------- |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or developer's internal ID                 |
| **access_level**                   | str  | ✅        | ❌        | ID (slug) of a paid access level. Find it in Adapty Dashboard |

Request parameters:

| Param          | Type | Required | Nullable | Description                                          |
| :------------- | :--- | :------- | :------- | :--------------------------------------------------- |
| **is\_refund** | bool | ✅        | ❌        | Whether this subscription is revoked due to a refund |

Revokes user's subscription by setting **unsubscribed\_at** to current datetime, and **expires\_at** to a maximum of current **starts\_at** and current datetime \(to avoid **expires\_at** being less than **starts\_at**). If there is a [transaction](server-side-api-specs#transaction) associated with this paid access level, this transaction expiration is also set to the new **expires\_at** value. If **is\_refund** is **true**, the transaction is marked as a refund, and revenue is set to zero.

### Validate a purchase from Stripe, provide access level to a customer, and import his transaction history from Stripe

```
POST: /api/v1/sdk/purchase/stripe/token/validate/
```

:::warning
This request must use a different Content-Type: `Content-Type: application/vnd.api+json'`
:::

Request parameters:

| Param                  | Type | Required | Nullable | Description                                                  |
| :--------------------- | :--- | :------- | :------- | :----------------------------------------------------------- |
| **customer\_user\_id** | str  | ✅        | ❌        | Developer's internal customer ID                             |
| **stripe\_token**      | str  | ✅        | ❌        | Token of a Stripe object that represents a unique purchase. Could either be a token of Stripe's Subscription (`sub_XXX`) or Payment Intent (`pi_XXX`). |

Sample request:

```json title="CURL"
curl
--location 'https://api.adapty.io/api/v1/sdk/purchase/stripe/token/validate/' \
--header 'Content-Type: application/vnd.api+json' \
--header 'Authorization: Api-Key <PUBLIC_OR_PRIVATE_KEY' \
--data-raw '{
  "data": {
    "type": "stripe_receipt_validation_result",
    "attributes": {
        "customer_user_id": "<CUSTOMER_USER_ID>",
        "stripe_token": "sub_1OM8brJTlbIG45BdDRFOHWAU"
    }
  }
}'
```

Validates a purchase using provided Stripe token using the credentials of Stripe in your App Settings inside Adapty Dashboard. If the purchase is valid, the transaction history is imported from Stripe to the profile in Adapty with the specified customer_user_id. If there was no profile with this customer_user_id before — it will be created.

Profile events are generated along the way and imported transactions are counted towards MTR.

### Get info about a user

```text title="Text"
GET: /profiles/{profile_id_or_customer_user_id}/
```

Path parameters:

| Param                              | Type | Required | Nullable | Description                                  |
| :--------------------------------- | :--- | :------- | :------- | :------------------------------------------- |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or developer's internal ID |

The response example is the same as for [Prolong/grant a subscription for a user](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user).

To get an extended response, add Key **"extended"** with any value to Query Params. It works only for the GET request.

| Property                  | Type          | Required | Nullable | Description                                                  |
| :------------------------ | :------------ | :------- | :------- | :----------------------------------------------------------- |
| **created_at**            | ISO 8601 date | ✅        | ❌        | The date when the profile was created, usually equals the installation date |
| **email**                 | str           | ✅        | ✅        | User's email                                                 |
| **phone_number**          | str           | ✅        | ✅        | User's phone number                                          |
| **att_status**            | str           | ✅        | ✅        |                                                              |
| **first_name**            | str           | ✅        | ✅        | User's first name                                            |
| **last_name**             | str           | ✅        | ✅        | User's last name                                             |
| **username**              | str           | ✅        | ✅        | Username                                                     |
| **gender**                | str           | ✅        | ✅        | User's gender                                                |
| **birthday**              | ISO 8601 date | ✅        | ✅        | User's birthday                                              |
| **idfa**                  | str           | ✅        | ✅        | The Identifier for Advertisers, assigned by Apple to a user's device. |
| **idfv**                  | str           | ✅        | ✅        | The Identifier for Vendors (IDFV) is a code assigned to all apps by one developer and is shared across all apps by that developer on your device. |
| **advertising_id**        | str           | ✅        | ✅        | The Advertising ID is a unique identifier offered by the Android Operating System that advertisers might use to uniquely identify you. |
| **appsflyer_id**          | str           | ✅        | ✅        | An AppsFlyer ID, automatically created id by AppsFlyer for every new install of an app. |
| **amplitude_user_id**     | str           | ✅        | ✅        | The Amplitude User Id property specified and OneSignal's External User Id property needs to be set for message data of that device to be tracked. |
| **amplitude_device_id**   | str           | ✅        | ✅        | The Amplitude Device ID, directly comes from your users' devices. |
| **mixpanel_user_id**      | str           | ✅        | ✅        | User ID from Mixpanel.                                       |
| **appmetrica_profile_id** | str           | ✅        | ✅        | User profile ID from AppMetrica.                             |
| **appmetrica_device_id**  | str           | ✅        | ✅        | AppMetrica Device Id.                                        |
| **facebook_anonymous_id** | str           | ✅        | ✅        | Facebook Anonymous ID.                                       |

### Create a user

```text title="Text"
POST: /profiles/
```

Request parameters:

| Param                  | Type | Required | Nullable | Description |
| :--------------------- | :--- | :------- | :------- | :---------- |
| **customer\_user\_id** | str  | ✅        | ❌        |             |

Sample request:

```json title="Json"
{
    "customer_user_id": "123456"
}
```

The response is the same as the GET request (**extended** parameter does not work here).

You can also set the user's attributes the same way as in the PATCH method.

### Set the user's attribute

```text title="Text"
PATCH: /profiles/{profile_id_or_customer_user_id}/
```

Path parameters:

| Param                              | Type | Required | Nullable | Description                                  |
| :--------------------------------- | :--- | :------- | :------- | :------------------------------------------- |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or developer's internal ID |

Request parameters:

| Param        | Type | Required | Nullable | Description                                                  |
| :----------- | :--- | :------- | :------- | :----------------------------------------------------------- |
| ip_country   | str  | ❌        | ✅        | Country code in the [two-letter](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, eg. US. |
| email        | str  | ❌        | ✅        |                                                              |
| phone_number | str  | ❌        | ✅        |                                                              |
| first_name   | str  | ❌        | ✅        |                                                              |
| last_name    | str  | ❌        | ✅        |                                                              |
| gender       | str  | ❌        | ✅        | User's gender                                                |
| birthday     | date | ❌        | ✅        | Date in YYYY-MM-DD format, eg. 1990-10-31.                   |

If you'd like to set custom attributes, you can pass them in `custom_attributes` dictionary. A maximum of 10 custom attributes for the profile are allowed to be set. Only strings and floats are allowed as values, booleans will be converted to floats.

| Param                | Type       | Required | Nullable | Description                                                  |
| :------------------- | :--------- | :------- | :------- | :----------------------------------------------------------- |
| **attribute\_key**   | str        | ✅        | ❌        | Only letters, numbers, dashes, points, and underscores are allowed. The attribute key must be no more than 30 characters. |
| **attribute\_value** | str\|float | ✅        | ✅        | The attribute value must be no more than 30 characters. Send an empty value or null to delete the attribute. |

Sample request:

```json title="Json"
{
    "phone_number": "+18003330000",
    "custom_attributes": {
        "grade": 10,
        "favorite_topic": "sports"
    }
}
```

The response is the same as the GET request (**extended** parameter does not work here).

### Delete user's data

```
DELETE /profiles/{profile_id_or_customer_user_id}/delete
```

Path parameters:

| Param                              | Type | Required | Nullable | Description                                  |
| :--------------------------------- | :--- | :------- | :------- | :------------------------------------------- |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or developer's internal ID |

Calling this endpoint enables the deletion of a user's profile and all related data, rendering it inaccessible to the client. Any profile history linked to the deleted profile will be detached, and integration events previously sent to integrations will be deleted from the event feed. 

Should another profile make a purchase from the device with the same Apple ID (or when subscription is restored), the profile history will be reassigned to the new profile, and integration events will be reissued.

Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.
