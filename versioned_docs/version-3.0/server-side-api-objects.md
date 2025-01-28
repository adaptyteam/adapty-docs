---
title: "API objects"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import ProfileObject from '@site/src/components/reusable/ProfileObject.md';
import AccessLevel from '@site/src/components/reusable/AccessLevel.md';
import Purchase from '@site/src/components/reusable/Purchase.md';

Adapty API has JSON objects so you can understand a response structure and wrap it into your code.

All datetime values are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), for example, "2020-01-15T15:10:36.517975+0000".

## Access level

Info about customer’s [access level](access-level). 

Access levels let you control what your app's users can do in your mobile app without hardcoding specific product IDs. Each product defines how long the user gets a certain access level. So, whenever a user makes a purchase, Adapty grants access to the app for a specific period (for subscriptions) or forever (for lifetime purchases). Alternatively, you can [grant specific access](ss-grant-access-level) for a specified time to a user via server-side API.

You can do the following action via Adapty server-side API:

- [Check users's access level](ss-get-profile) by retrieving their profile details
- [Grant specific access](ss-grant-access-level) to your end user without providing a transaction
- [Set transaction and grant access level](ss-set-transaction) to your end user
- [Revoke access level](ss-revoke-access-level) from your end user

<AccessLevel />

---

## Installation Meta

Information about installation of the app on a specific device. 

You can do the following action via Adapty server-side API:

- [Create a profile with spesific installation meta](ss-create-profile)
- [Update user's installation meta](ss-update-profile)

| Parameter          | Type   | Required in request | Nullable in request | Description                                                  |
| :----------------- | :----- | ------------------- | ------------------- | :----------------------------------------------------------- |
| device_id          | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The device identifier is generated on the client side.       |
| device             | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The end-user-visible device model name.                      |
| locale             | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The locale used by the end user.                             |
| os                 | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The operating system used by the end user.                   |
| platform           | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The device platform used by the end user.                    |
| timezone           | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The timezone of the end user.                                |
| user_agent         | String | :heavy_minus_sign:  | :heavy_plus_sign:   | Details about the end user environment: device, operating system, and browser information of the end user interacting with your application. |
| idfa               | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The Identifier for Advertisers, assigned by Apple to a user's device. |
| idfv               | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The Identifier for Vendors (IDFV) is a code assigned to all apps by one developer and is shared across all apps by that developer on your device. |
| advertising_id     | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The Advertising ID is a unique identifier offered by the Android Operating System that advertisers might use to uniquely identify you. |
| android_id         | String | :heavy_minus_sign:  | :heavy_plus_sign:   | On Android 8.0 (API level 26) and higher versions of the platform, a 64-bit number (expressed as a hexadecimal string), unique to each combination of app-signing key, user, and device. For more details, see [Android developer documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| android_app_set_id | String | :heavy_minus_sign:  | :heavy_plus_sign:   | An [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - unique, per-device, per developer-account user-resettable ID for non-monetizing advertising use cases. |

---

## Non Subscription

Info about non-subscription purchases. These can be one-time \(consumable\) products, unlocks \(like new map unlock in the game\), etc.  

You can do the following action via Adapty server-side API:

- [Check user's current non-subscriptions](ss-get-profile) by retrieving their profile details

| Parameter                     | Type          | Required in request | Nullable in request | Description                                                  |
| :---------------------------- | :------------ | :------------------ | :------------------ | :----------------------------------------------------------- |
| purchase_id                   | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | Identifier of the purchase in Adapty. You can use it to ensure that you’ve already processed this purchase, for example tracking one-time products. |
| store                         | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | Store where the product was purchased. Possible values are: **app_store**, **play_store**, **stripe**, name of your [custom store]('@site/docs/custom-store). |
| store_product_id              | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | Identifier of the product in the app store (App Store/Google Play/Stripe, etc.) that unlocked this access level. |
| store_base_plan_id            | String        | :heavy_plus_sign:   | :heavy_plus_sign:   | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| store_transaction_id          | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | The ID of the transaction in the app store (App Store/Google Play/Stripe, etc.). |
| store_original_transaction_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | <p>In case of prolonged subscriptions, a chain of subscriptions is generated. The original transaction i the very first transaction in this chain and the chain is linked by it. Other transactions in the chain are prolongations.</p><br /><p>If no prolongation, `store_original_transaction_id` will coincide with `store_transaction_id`.</p> |
| purchased_at                  | ISO 8601 date | :heavy_plus_sign:   | :heavy_minus_sign:  | The datetime when the access level was purchased the latest time. |
| environment                   | String        | :heavy_minus_sign:  | :heavy_minus_sign:  | Environment of the transaction that provided the access level. Possible values: `Sandbox`, `Production.` |
| is_refund                     | Boolean       | :heavy_plus_sign:   | :heavy_minus_sign:  | Indicates if the product has been refunded.                  |
| is_consumable                 | Boolean       | :heavy_plus_sign:   | :heavy_minus_sign:  | Indicates whether the product is consumable.                 |

---

## One-Time Purchase

<Purchase />

---

## Offer

Information on the applied offer. The Offer object is a part of the  [Subscription](server-side-api-objects#subscription), and [Access level](server-side-api-objects#access-level) objects.

You can do the following actions with offers via Adapty server-side API:

- [Apply offer](ss-set-transaction) when setting a transaction to your user

| Parameter      | Type   | Required in request | Nullable in request | Description                                                  |
| -------------- | ------ | ------------------- | ------------------- | ------------------------------------------------------------ |
| offer_category | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The category of the applied offer. Options are: **introductory**, **promotional**, **offer_code**, **win_back**. |
| offer_type     | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The type of active offer. Options are: **free_trial**, **pay_as_you_go**, **pay_up_front**, and **unknown**. If this isn’t null, it means the offer was applied in the current subscription period. |
| offer_id       | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The ID of the applied offer.                                 |

---

## Price

Information about the cost of your product in local currency. The Price object is a part of the  [Subscription](server-side-api-objects#subscription) and Purchase objects.

You can do the following actions with product price via Adapty server-side API:

- [Set transaction to your user](ss-set-transaction) and specify its price

| Parameter | Type   | Required in request | Nullable in request | Description                               |
| --------- | ------ | ------------------- | ------------------- | ----------------------------------------- |
| country   | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The country where the price applies.      |
| currency  | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The currency used for the price.          |
| value     | Float  | :heavy_plus_sign:   | :heavy_minus_sign:  | The product's cost in the local currency. |

---

## Profile

Info about the [customer and their subscription](server-side-api-objects#profile)

You can do the following actions with user profiles via Adapty server-side API:

- [Retrieve/get the end-user's profile](ss-get-profile) with their access levels, subscriptions, non-subscriptions, etc.
- [Create a new end-user profile](ss-create-profile)
- [Update your end-user profile](ss-update-profile)
- [Delete your end-user](ss-delete-profile)

<ProfileObject />

---

## Subscription

Info about your end user subscription.  You can do the following action via Adapty server-side API:

- [Check the user's current subscription](ss-get-profile) by retrieving their profile details
- [Set transaction to your user](ss-set-transaction) and grant a subscription to them

The request failed due to missing or incorrect authorization. Check the [Authorization](ss-authorization) page, paying close attention to the **Authorization header**.

The request also failed because the specified profile wasn’t found.

###### Body:

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `not_authenticated`.                |
| status_code | Integer | HTTP status. Always `401.`                                   |

###### Response example:

```json
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Authentication credentials were not provided."
      ]
    }
  ],
  "error_code": "not_authenticated",
  "status_code": 401
}
```

 
