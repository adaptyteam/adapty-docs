<!--- responseExample.md --->

```
{
  "data": {
    "app_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "profile_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "customer_user_id": "string",
    "total_revenue_usd": 0,
    "segment_hash": "string",
    "timestamp": 0,
    "custom_attributes": [
      {
        "key": "string",
        "value": "string"
      }
    ],
    "access_levels": [
      {
        "access_level_id": "string",
        "store": "string",
        "store_product_id": "string",
        "store_base_plan_id": "string",
        "store_transaction_id": "string",
        "store_original_transaction_id": "string",
        "offer": {
          "offer_category": "introductory",
          "offer_type": "free_trial",
          "offer_id": "string"
        },
        "environment": "Sandbox",
        "starts_at": "2022-10-12T09:42:50.000000+0000",
        "purchased_at": "2022-10-12T09:42:50.000000+0000",
        "originally_purchased_at": "2022-10-12T09:42:50.000000+0000",
        "expires_at": "2022-10-12T09:42:50.000000+0000",
        "renewal_cancelled_at": "2022-10-12T09:42:50.000000+0000",
        "billing_issue_detected_at": "2022-10-12T09:42:50.000000+0000",
        "is_in_grace_period": true,
        "cancellation_reason": "voluntarily_cancelled"
      }
    ],
    "subscriptions": [
      {
        "store": "app_store",
        "store_product_id": "string",
        "store_base_plan_id": "string",
        "store_transaction_id": "string",
        "store_original_transaction_id": "string",
        "offer": {
          "offer_category": "introductory",
          "offer_type": "free_trial",
          "offer_id": "string"
        },
        "environment": "Sandbox",
        "purchased_at": "2022-10-12T09:42:50.000000+0000",
        "originally_purchased_at": "2022-10-12T09:42:50.000000+0000",
        "expires_at": "2022-10-12T09:42:50.000000+0000",
        "renewal_cancelled_at": "2022-10-12T09:42:50.000000+0000",
        "billing_issue_detected_at": "2022-10-12T09:42:50.000000+0000",
        "is_in_grace_period": true,
        "cancellation_reason": "voluntarily_cancelled"
      }
    ],
    "non_subscriptions": [
      {
        "purchase_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "store": "string",
        "store_product_id": "string",
        "store_base_plan_id": "string",
        "store_transaction_id": "string",
        "store_original_transaction_id": "string",
        "purchased_at": "2022-10-12T09:42:50.000000+0000",
        "environment": "Sandbox",
        "is_refund": true,
        "is_consumable": true
      }
    ]
  }
}
```



### Profile[](https://adapty.io/docs/server-side-api-objects#profile)

Info about the [customer and his subscription.](https://adapty.io/docs/server-side-api-objects#profile)

| Param                  | Type  | Required | Nullable | Description                                                  |
| :--------------------- | :---- | :------- | :------- | :----------------------------------------------------------- |
| **profile_id**         | UUID  | ✅        | ❌        | Adapty profile ID                                            |
| **customer_user_id**   | str   | ✅        | ✅        | User ID in developer’s (your) system.                        |
| **paid_access_levels** | dict  | ✅        | ✅        | Dictionary where the keys are paid access level identifiers configured by a developer in the Adapty Dashboard. Values are [CustomerAccessLevel](https://adapty.io/docs/server-side-api-objects#customeraccesslevel) objects. Can be null if the customer has no access levels |
| **subscriptions**      | dict  | ✅        | ✅        | Dictionary where the keys are vendor product IDs. Values are [Subscription](https://adapty.io/docs/server-side-api-objects#subscription) objects. Can be null if the customer has no subscriptions |
| **non_subscriptions**  | dict  | ✅        | ✅        | Dictionary where the keys are vendor product ids. Values are an array of [Non-Subscription](https://adapty.io/docs/server-side-api-objects#non-subscription) objects. Can be null if the customer has no purchases. |
| **custom_attributes**  | dict  | ✅        | ✅        | The dictionary that collects the profile's all custom attributes about its own users. A maximum of 10 custom attributes for the profile are allowed to be set. Only strings and floats are allowed as values, booleans will be converted to floats. |
| **total_revenue_usd**  | float | ✅        | ❌        | Float value, it is equal to all total revenue USD which earned the profile. |

To get an extended response, add Key **"extended"** with any value to Query Params.

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