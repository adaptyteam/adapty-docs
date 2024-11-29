---
title: "API specs"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

<<<<<<< HEAD
**Base URL**: `https://api.adapty.io/api/v1/sdk`

## Authorization

Each API request must be signed with the [Secret Key](general).

When calling API:

- You must set **Authorization** header with value "Api-Key \{secret\_token\}" \(without quotes\) to each request, for example `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`
- Use JSON payload in the request body for POST and PATCH requests
- All request must set header **Content-Type**: application/json
=======
import ProfileObject from '@site/src/components/reusable/ProfileObject.md';import CreateProfileRequestExample from '@site/src/components/reusable/CreateProfileRequestExample.md';
import ProfileRequest from '@site/src/components/reusable/ProfileRequest.md';
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseBadRequest from '@site/src/components/reusable/ProfileResponseBadRequest.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/responseExample.md';
import AccessLevel from '@site/src/components/reusable/AccessLevel.md';
import AccessLevelProfileNotFound from '@site/src/components/reusable/AccessLevelProfileNotFound.md';
import AccessLevelDoesNotExist from '@site/src/components/reusable/AccessLevelDoesNotExist.md';
import AccessLevelNoProfileAccessLevel from '@site/src/components/reusable/AccessLevelNoProfileAccessLevel.md';
import RevocationDateIsMoreThanExpirationDate from '@site/src/components/reusable/RevocationDateIsMoreThanExpirationDate.md';
import Purchase from '@site/src/components/reusable/Purchase.md';
import Subscription from '@site/src/components/reusable/Subscription.md';
import FreeTrialPrice from '@site/src/components/reusable/FreeTrialPrice.md'; 
import MissingOfferID from '@site/src/components/reusable/MissingOfferID.md'; 
import BillingIssueDetectedDate from '@site/src/components/reusable/BillingIssueDetectedDate.md'; 
import ExpiresDate from '@site/src/components/reusable/ExpiresDate.md'; 
import FamilySharePrice from '@site/src/components/reusable/FamilySharePrice.md'; 
import GracePeriodBilling from '@site/src/components/reusable/GracePeriodBilling.md'; 
import RefundDate from '@site/src/components/reusable/RefundDate.md'; 
import RefundDateNull from '@site/src/components/reusable/RefundDateNull.md'; 
import RenewStatusChangedDate from '@site/src/components/reusable/RenewStatusChangedDate.md'; 
import StoreTransactionId from '@site/src/components/reusable/StoreTransactionId.md'; 


Adapty's API lets you access and modify your Adapty data programmatically. We also support [webhooks](webhook), where we notify your server of events as they happen.

This API enables you to seamlessly integrate Adapty with your existing services.

---

## Authorization

- **Base URL**: https://api.adapty.io/api/v1/server-side-api/
- **Authorization header**: API requests must be authenticated by including your API key:
  - For profile requests, use your secret API key as the **Authorization** header with the value `Api-Key {YOUR_SECRET_API_KEY}`, like this: `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in the [Adapty Dashboard -> **App Settings** -> **General** tab -> **API keys** section](https://app.adapty.io/settings/general). Remember, this key is secret, so keep it private.

  - For access level and transaction requests, you can use either the public or secret API key as the **Authorization** header with the value `Api-Key {YOUR_SECRET_API_KEY}` or `Api-Key {YOUR_PUBLIC_API_KEY}`, for example, `Api-Key public_live_iNuUlSsN.83zcTTT8D5Y8FI9cGUI6`. Find these keys in the [Adapty Dashboard -> **App Settings** -> **General** tab -> **API keys** section](https://app.adapty.io/settings/general).

- **Content-Type header**: Set the **Content-Type** header to `application/json` for the API to process your request.
- **Header**: Use one of these parameters:
  - **adapty-profile-id**: The ID of your user’s profile, visible in the **Adapty ID** field in the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
  - **adapty-customer-user-id**: The user’s ID in your system, visible in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. This works only if you [identify users](identifying-users) in your app code with the Adapty SDK.
- **Body**:  The API expects the request to use the body as JSON.
>>>>>>> ADP-1386-Custom-stores-server-side-api

## Working with customer user ID

Most server-side API requests allow passing `customer_user_id` as a URL parameter. This makes it easy for you to query/update data in Adapty, without having to store Adapty's `profile_id`.  In most cases, you should pass `customer_user_id` as is, without any modifications.

However, if your `customer_user_id` contains [reserved URI characters](https://en.wikipedia.org/wiki/Percent-encoding), for example `/`, `?`, `+` you should pass it encoded. Use the [Base64URL](https://www.base64encode.org/) encoding (not the regular Base64). This way, all special characters will be encoded and Adapty will decode it upon receiving. To tell Adapty the `customer_user_id` is encoded, pass the `is_user_id_base64url_encoded=1` get parameter. Note, that passing the `is_user_id_base64url_encoded=1` get parameter without actual encoding, will end up with 400 validation error.

You should only encode the `customer_user_id` if you pass it as a URL path. When sending `customer_user_id` inside the JSON payload (for example, when creating the profile), you should not encode it.

```python title="Python"
## Don't encode
customer_user_id = '123' # GET: /profiles/123/
customer_user_id = 'abc' # GET: /profiles/abc/
customer_user_id = '3c410419-9959-447a-84b5-be7cb6a308d9' # GET: /profiles/3c410419-9959-447a-84b5-be7cb6a308d9/

<<<<<<< HEAD
## Base64URL encode
customer_user_id = '123+456' # GET: /profiles/MTIzKzQ1Ng==/?is_user_id_base64url_encoded=1
customer_user_id = 'abc/def' # GET: /profiles/YWJjL2RlZg==/?is_user_id_base64url_encoded=1
customer_user_id = '012?012' # GET: /profiles/MDEyPzAxMg==/?is_user_id_base64url_encoded=1
=======
<ProfileObject />

---

### Retrieve profile

Retrieves the details of an existing end user of your app.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profile/
>>>>>>> ADP-1386-Custom-stores-server-side-api
```

## Requests

### Prolong/grant a subscription for a user

```text title="Text"
POST: /profiles/{profile_id_or_customer_user_id}/paid-access-levels/{access_level}/grant/
```

Path parameters:

<<<<<<< HEAD
| Param                              | Type | Required | Nullable | Description                                                     |
| :--------------------------------- | :--- | :------- | :------- | :-------------------------------------------------------------- |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or developer's internal ID                    |
| **access_level**                   | str  | ✅        | ❌        | ID \(slug\) of a paid access level. Find it in Adapty Dashboard |
=======
None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](server-side-api-specs#authorization).
>>>>>>> ADP-1386-Custom-stores-server-side-api

Request parameters:

| Param | Type | Required | Nullable | Description |
|-----|----|--------|--------|-----------|
| **expires_at** | ISO 8601 date | ✅\* see below | ❌ | Subscription deadline |
| **duration_days** | int | ✅\* see below | ❌ | Additional days to a current subscription\*\* |
| **is_lifetime** | bool | ✅\* see below | ❌ | If set true, then a user will forever have a paid access level forever |
| **starts_at** | ISO 8601 date | ❌ | ❌ | If the start time of the action is in the future, then you can transfer it. If the start time and the period are indicated, the period will be counted from the indicated time |
| **vendor_product_id** | str | ❌ | ❌ | When posting a transaction, include the product ID that triggers the subscription renewal. If you're granting an access level without a transaction, skip this parameter, and **adapty_server_side_product** will be used by default. |
| **base_plan_id** | str | ❌ | ❌ | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| **vendor_original_transaction_id** | str | ❌ | ❌ | ID of the original transaction in the subscription renewal chain in a vendor environment. |
| **vendor_transaction_id** | str | ❌ | ❌ | <p>Transaction ID in a vendor environment.</p><p>If it is the same as **vendor_original_transaction_id** or if **vendor_original_transaction_id** is absent, Adapty considers it the first subscription purchase. If it differs from **vendor_original_transaction_id**, Adapty considers the purchase the subscription renewal.</p> |
| **store** | str | ❌ | ❌ | A store where users purchased a product, such as **app\_store** and **play\_store**, can be custom. Default is **adapty** |
| **introductory_offer_type** | str | ❌ | ❌ | A type of introduction offer. Available values are **free\_trial**, **pay\_as\_you\_go**, and **pay\_up\_front**. |
| **price** | float | ❌ | ❌ | <p>Price of the subscription/purchase to save in [transaction](server-side-api-specs#transaction).</p><p>The first subscription purchase with a zero price is considered a free trial, while a renewal with a zero price is considered a free subscription renewal.</p><p></p><p>If you provide price, provide `price_locale` as well.</p> |
| **price_locale** | str | ❌ | ❌ | The currency of the transaction in the [three-letter](https://en.wikipedia.org/wiki/ISO_4217) format. `USD` is used by default. |
| **proceeds** | float | ❌ | ❌ | Proceeds \(price that is reduced due to stores' fee\) of the subscription/purchase to save in [transaction](server-side-api-specs#transaction). |
| **is_sandbox** | bool | ❌ | ❌ | Boolean indicating whether the product was purchased in the sandbox or production environment. |


#### Paid access level

There are three ways to grant users a subscription. So, at least one of **is\_lifetime**, **expires\_at**, or **duration\_days** must be set. If more than one param is set, then **is\_lifetime=true** has a maximum priority, then **expires\_at**, and lastly **duration\_days**.

As all payment processing is done by Apple/Google, Adapty can not control or affect it. So, when using **duration\_days** to a current subscription, remember that a user still will be charged on a needed day. For example, the user has a monthly subscription and the next charge date will be the 5th of April. You grant a user additional 7 days, _but the user still is charged on the 5th of April!._ It's best using **duration\_days** with never subscribed users or churned. In that case, reference day is a day of granting.

#### Transaction

If all **vendor_product_id**, **vendor\_transaction\_id,** and **store** are specified, Adapty creates and saves transaction entry so this grant is accounted in [Charts](analytics-charts) \(Revenue, MRR, Subscriptions\) unless the transaction with these parameters already exists \(e.g. it was generated by iOS purchase\). If **price** is specified, it is associated with this transaction.

Currently, this type of transaction does not generate any profile events, does not affect users' subscription status, and does not show up in the [**Event Feed**](https://app.adapty.io/event-feed).

Also, be aware that these transactions affect billing since they are counted towards MTR.

<<<<<<< HEAD
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
=======
```
https://api.adapty.io/api/v1/server-side-api/profile/
>>>>>>> ADP-1386-Custom-stores-server-side-api
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

<<<<<<< HEAD
### Revoke subscription from a user

```text title="Text"
POST: /profiles/{profile_id_or_customer_user_id}/paid-access-levels/{access_level}/revoke/
=======
 `Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](server-side-api-specs#authorization).
  <ProfileRequest /> 

#### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

#### Successful response

**200 - Success**

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>

#### Errors

<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
<ProfileResponseUnauthorized /> 
</details>


<details>    
<summary>**404 - Not found** (click to expand)</summary> 
<ProfileResponseNotFound />  
</details>


___

### Update profile

Changes your end user profile attributes.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profile/
>>>>>>> ADP-1386-Custom-stores-server-side-api
```

Path parameters:

| Param                              | Type | Required | Nullable | Description                                                   |
| :--------------------------------- | :--- | :------- | :------- | :------------------------------------------------------------ |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or developer's internal ID                  |
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

<<<<<<< HEAD
Request parameters:
=======
`Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](server-side-api-specs#authorization).
  <ProfileRequest /> 
>>>>>>> ADP-1386-Custom-stores-server-side-api

| Param                  | Type | Required | Nullable | Description                                                                                                                                            |
| :--------------------- | :--- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **customer\_user\_id** | str  | ✅        | ❌        | Developer's internal customer ID                                                                                                                       |
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

The response example is the same as for [Prolong/grant a subscription for a user](server-side-api-specs#prolonggrant-a-subscription-for-a-user).

To get an extended response, add Key **"extended"** with any value to Query Params. It works only for the GET request.

| Property                  | Type          | Required | Nullable | Description                                                                                                                                       |
| :------------------------ | :------------ | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **created_at**            | ISO 8601 date | ✅        | ❌        | The date when the profile was created, usually equals the installation date                                                                       |
| **email**                 | str           | ✅        | ✅        | User's email                                                                                                                                      |
| **phone_number**          | str           | ✅        | ✅        | User's phone number                                                                                                                               |
| **att_status**            | str           | ✅        | ✅        |                                                                                                                                                   |
| **first_name**            | str           | ✅        | ✅        | User's first name                                                                                                                                 |
| **last_name**             | str           | ✅        | ✅        | User's last name                                                                                                                                  |
| **username**              | str           | ✅        | ✅        | Username                                                                                                                                          |
| **gender**                | str           | ✅        | ✅        | User's gender                                                                                                                                     |
| **birthday**              | ISO 8601 date | ✅        | ✅        | User's birthday                                                                                                                                   |
| **idfa**                  | str           | ✅        | ✅        | The Identifier for Advertisers, assigned by Apple to a user's device.                                                                             |
| **idfv**                  | str           | ✅        | ✅        | The Identifier for Vendors (IDFV) is a code assigned to all apps by one developer and is shared across all apps by that developer on your device. |
| **advertising_id**        | str           | ✅        | ✅        | The Advertising ID is a unique identifier offered by the Android Operating System that advertisers might use to uniquely identify you.            |
| **appsflyer_id**          | str           | ✅        | ✅        | An AppsFlyer ID, automatically created id by AppsFlyer for every new install of an app.                                                           |
| **amplitude_user_id**     | str           | ✅        | ✅        | The Amplitude User Id property specified and OneSignal's External User Id property needs to be set for message data of that device to be tracked. |
| **amplitude_device_id**   | str           | ✅        | ✅        | The Amplitude Device ID, directly comes from your users' devices.                                                                                 |
| **mixpanel_user_id**      | str           | ✅        | ✅        | User ID from Mixpanel.                                                                                                                            |
| **appmetrica_profile_id** | str           | ✅        | ✅        | User profile ID from AppMetrica.                                                                                                                  |
| **appmetrica_device_id**  | str           | ✅        | ✅        | AppMetrica Device Id.                                                                                                                             |
| **facebook_anonymous_id** | str           | ✅        | ✅        | Facebook Anonymous ID.                                                                                                                            |

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

| Param        | Type | Required | Nullable | Description                                                                                        |
| :----------- | :--- | :------- | :------- | :------------------------------------------------------------------------------------------------- |
| ip_country   | str  | ❌        | ✅        | Country code in the [two-letter](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format, eg. US. |
| email        | str  | ❌        | ✅        |                                                                                                    |
| phone_number | str  | ❌        | ✅        |                                                                                                    |
| first_name   | str  | ❌        | ✅        |                                                                                                    |
| last_name    | str  | ❌        | ✅        |                                                                                                    |
| gender       | str  | ❌        | ✅        | User's gender                                                                                      |
| birthday     | date | ❌        | ✅        | Date in YYYY-MM-DD format, eg. 1990-10-31.                                                         |

If you'd like to set custom attributes, you can pass them in `custom_attributes` dictionary. A maximum of 10 custom attributes for the profile are allowed to be set. Only strings and floats are allowed as values, booleans will be converted to floats.

| Param                | Type       | Required | Nullable | Description                                                                                                               |
| :------------------- | :--------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------ |
| **attribute\_key**   | str        | ✅        | ❌        | Only letters, numbers, dashes, points, and underscores are allowed. The attribute key must be no more than 30 characters. |
| **attribute\_value** | str\|float | ✅        | ✅        | The attribute value must be no more than 30 characters. Send an empty value or null to delete the attribute.              |

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

Should another profile make a purchase from the device with the same Apple ID (or when the subscription is restored), the profile history will be reassigned to the new profile, and integration events will be reissued.

<<<<<<< HEAD
Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.
=======
Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profile/
```

#### Method

```
DELETE
```

#### Parameters

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](server-side-api-specs#authorization).

#### Successful response

**204 - Success**

##### Header:

| Name       | Type   | Description                                                  |
| :--------- | ------ | :----------------------------------------------------------- |
| Request-Id | String | Request ID, all backend logs have this id Example: 758f01dfd9e74ccfbabb4934241c4966 |


<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
<ProfileResponseNotFound />  
</details>
## Transactions

### One-time purchase object

<Purchase />

### Subscription object

<Subscription />

### Set transaction

Creates a new transaction for an end user of your app in Adapty and provides access level. The transaction created by this method will appear in your [analytics](https://app.adapty.io/analytics) and [**Event Feed**](https://app.adapty.io/event-feed) and well as will be sent to all integrations.

This method is recommended over the [Grant access level](server-side-api-specs#grant-access-level) one.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/purchase/set/transaction/
```

#### Method

```
POST
```

#### Parameters

Either the [One-time purchase](server-side-api-specs#one-time-purchase-object) or [Subscription](server-side-api-specs#subscription-object) object.

#### Request example

<details>    
<summary>Request example (click to expand)</summary>
```json title="JSON"{
  "purchase_type": "one_time_purchase",
  "store": "app_store",
  "environment": "Production",
  "store_product_id": "1year.premium",
  "store_transaction_id": "30002109551456",
  "store_original_transaction_id": "30002109461269",
  "offer": {
    "category": "introductory",
    "type": "free_trial",
    "id": "annual_free_trial"
  },
  "is_family_shared": false,
  "price": {
    "country": "US",
    "currency": "USD",
    "value": 0
  },
  "purchased_at": "2022-10-12T09:42:50.000000+0000",
  "refunded_at": "2022-10-12T09:42:50.000000+0000",
  "cancellation_reason": "voluntarily_cancelled",
  "variation_id": "81109d24-ea95-4806-9ec7-b482bbd1a33d"
}
```

</details>

#### Successful response: 200 - Success

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>


#### Errors

**400 - Bad request**

<div style={{ marginLeft: '20px' }}>
<details>    
<summary>**billing_issue_detected_at_date_comparison_error** (click to expand)</summary> 
  <p> </p>
<BillingIssueDetectedDate />
</details>
<details>    
<summary>**expires_date_error** (click to expand) </summary> 
  <p> </p>
<ExpiresDate />
</details>
<details> 
<summary>**family_share_price_error** (click to expand)</summary> 
  <p> </p>
<FamilySharePrice />
</details>
<details>    
<summary>**free_trial_price_error** (click to expand)</summary> 
  <p> </p>
<FreeTrialPrice />
</details>
<details>    
<summary>**grace_period_billing_error** (click to expand)</summary> 
  <p> </p>
<GracePeriodBilling />
</details>
<details>    
<summary>**grace_period_expires_date_error** (click to expand)</summary> 
  <p> </p>
<FreeTrialPrice />
</details>
<details>    
<summary>**missing_offer_id** (click to expand)</summary> 
  <p> </p>
<MissingOfferID />
</details>
<details>    
<summary>**originally_purchased_date_error** (click to expand)</summary> 
  <p> </p>
<originallyPurchasedDate />
</details>
<details>    
<summary>**profile_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelProfileNotFound /> 
</details>
<details>    
<summary>**refund_date_error** (click to expand)</summary> 
  <p> </p>
<RefundDate />
</details>
<details>    
<summary>**refund_fields_error** (click to expand)</summary> 
  <p> </p>
<RefundDateNull />
</details>
<details>    
<summary>**renew_status_changed_date_error** (click to expand)</summary> 
  <p> </p>
<RenewStatusChangedDate />
</details>
<details>    
<summary>**store_transaction_id_error** (click to expand)</summary> 
  <p> </p>
<StoreTransactionId />
</details>
</div>
<p> </p>
<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
  <p> </p>
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
  <p> </p>
<ProfileResponseNotFound />  
</details>


___




##  Access levels

### Access level object

Info about current customer’s [access level](https://adapty.io/docs/access-level).

<AccessLevel />

### Grant access level

Provides access level to your end-user without providing info on the transaction. This comes in handy if you have bonuses for referrals or other events related to your products. 

The access level provided by this method will not be reflected in your [analytics](https://app.adapty.io/analytics). It will be sent to only webhook integration, and only in this case will appear in the **Event Feed**. If webhook integration is not enabled, granting access level will not be shown in the [**Event Feed**](https://app.adapty.io/event-feed).

To grant access and simultaneously provide the transaction details, please use the [Set Transaction request](server-side-api-specs#set-transaction) which is recommended.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/grant/access-level/
```

#### Method

```
POST
```

#### Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard |
| starts_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will be active. Maybe in the future |
| expires_at      | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access |

#### Example request

<details>    
<summary>Example request (click to expand)</summary>
  ```json title="JSON"
{
  "access_level_id": "premium",
  "starts_at": "2022-10-12T09:42:50.000000+0000",
  "expires_at": "2024-10-12T09:42:50.000000+0000"
}
```
</details>
#### Successful response: 200 - Success

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>
#### Errors

 **400 - Bad request**
<div style={{ marginLeft: '20px' }}>

<details> 
<summary>**paid_access_level_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelDoesNotExist />

</details>

<details> 
<summary> **profile_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelProfileNotFound />  
</details>

</div>
<p> </p>
<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
  <p> </p>
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
  <p> </p>
<ProfileResponseNotFound />  
</details>

___



### Revoke access level

Removes an access level from an end user of your app in Adapty.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/purchase/profile/revoke/access-level/
```

#### Method

```
POST
```

#### Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard |
| revoke_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access |

#### Request example
<details>    
<summary>Example request (click to expand)</summary>

```json title="JSON"
{
  "access_level_id": "premium",
  "revoke_at": "2024-10-12T09:42:50.000000+0000"
}
```

</details>    
#### Successful response: 200 - Success

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>

#### Errors

**400 - Bad request**
<div style={{ marginLeft: '20px' }}>

<details> 
<summary>**paid_access_level_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelDoesNotExist />
</details>

<details>    
<summary> **profile_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelProfileNotFound />  
</details>

<details> 
<summary>**profile_paid_access_level_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelNoProfileAccessLevel />
</details>

<details> 
<summary>**revocation_date_more_than_expiration_date** (click to expand)</summary> 
  <p> </p>
<RevocationDateIsMoreThanExpirationDate />
</details>

</div>
<p> </p>

<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
  <p> </p>
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
  <p> </p>
<ProfileResponseNotFound />  
</details>

___

## Purchase in Stripe
### Validate purchase, provide access level to customer, and import their transaction history

Validates a purchase using the provided Stripe token using the credentials of Stripe in your App Settings inside Adapty Dashboard. If the purchase is valid, the transaction history is imported from Stripe to the profile in Adapty with the specified `customer_user_id`. If there was no profile with this `customer_user_id` before — it will be created.

Profile events are generated along the way and imported transactions are counted towards MTR.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/purchase/stripe/token/validate/
```

#### Method

```
POST
```

#### Parameters

:::warning
This request requires different authorization parameters:

- **Base URL**: https://api.adapty.io/api/v1/sdk/purchase/stripe/token/validate/
- **Authorization header**: API requests must be authenticated by including your secret API key as an **Authorization** header with value `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.
- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/vnd.api+json`.
- **Body**:  The API expects the request to use the body as JSON.

:::

| Param                  | Type   | Required          | Nullable           | Description                                                  |
| :--------------------- | :----- | :---------------- | :----------------- | :----------------------------------------------------------- |
| **customer\_user\_id** | String | :heavy_plus_sign: | :heavy_minus_sign: | The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. For it to work, you must [identify the users](identifying-users) in your mobile app code via Adapty SDK |
| **stripe\_token**      | String | :heavy_plus_sign: | :heavy_minus_sign: | Token of a Stripe object that represents a unique purchase. Could either be a token of Stripe's Subscription (`sub_XXX`) or Payment Intent (`pi_XXX`). |

#### Example request


  ```curl title="CURL"
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

#### Successful response: 200 - Success

```json
{
  "data": null
}
```

#### Errors

##### **400** Bad request

Contain a list of errors with parameters.

**Parameters**

| Parameter | Type    | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| detail    | String  | Descriptive information about the error.                     |
| source    | String  | An object containing a `"pointer"` that references the exact location in the request document causing the issue |
| Status    | Integer | HTTP status. Always `400`                                    |

**Response example**

```
{
  "errors": [
    {
      "detail": "none is not an allowed value",
      "source": {
        "pointer": "/data/attributes/stripe_token"
      },
      "status": "400"
    }
  ]
}
```

>>>>>>> ADP-1386-Custom-stores-server-side-api
