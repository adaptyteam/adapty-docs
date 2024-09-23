---
title: "Getting started with server-side API"
description: ""
metadataTitle: ""
toc: false
---

Adapty's API lets you access and modify your Adapty data programmatically. We also support [webhooks](webhook), where we notify your server of events as they happen.

This API enables you to seamlessly integrate Adapty with your existing services.

## Authorization

**Authorization header**: API requests must be authenticated by including your secret API key as **Authorization** header with value `Api-Key {secret_token}` to each request, for example `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.

**Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/json`.

**Body**:  The API expects the request to use the body as JSON.

## Profile

Info about the [your customer and their subscription](server-side-api-objects#profile).

### The Profile object

| Param                    | Type  | Required | Nullable | Description                                                  |
| :----------------------- | :---- | :------- | :------- | :----------------------------------------------------------- |
| **profile\_id**          | UUID  | ✅        | ❌        | Adapty profile ID                                            |
| **customer\_user\_id**   | str   | ✅        | ✅        | User ID in your system.                                      |
| **paid\_access\_levels** | dict  | ✅        | ✅        | Dictionary where the keys are paid access level identifiers configured by a developer in the Adapty Dashboard. Values are [CustomerAccessLevel](#customeraccesslevel) objects. Can be null if the customer has no access levels |
| **subscriptions**        | dict  | ✅        | ✅        | Dictionary where the keys are vendor product IDs. Values are [Subscription](#subscription) objects. Can be null if the customer has no subscriptions |
| **non\_subscriptions**   | dict  | ✅        | ✅        | Dictionary where the keys are vendor product ids. Values are an array of [Non-Subscription](#non-subscription) objects. Can be null if the customer has no purchases. |
| **custom\_attributes**   | dict  | ✅        | ✅        | The dictionary that collects the profile's all custom attributes about its own users. A maximum of 10 custom attributes for the profile are allowed to be set. Only strings and floats are allowed as values, booleans will be converted to floats. |
| **total\_revenue\_usd**  | float | ✅        | ❌        | Float value, it is equal to all total revenue USD which earned the profile. |

### Retrieve profile

Retrives the details of an existing user of your app.

Endpoint

```
https://api.adapty.io/api/v1/sdk/profiles/{profile_id_or_customer_user_id}/
```

Method

```
GET
```

Example request with customer_user_id

```text
https://api.adapty.io/api/v1/sdk/profiles/john-doe
```

Example request with profile_ID

```
https://api.adapty.io/api/v1/sdk/profiles/2C8439F1-2F79-43C4-A429-6041975A311C
```

Example response



Parameters

| Parameter                          | Type | Required | Nullable | Description                                          |
| :--------------------------------- | :--- | :------- | :------- | :--------------------------------------------------- |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or internal user ID in your system |

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

### Create profile

Creates a new user of your app in Adapty.

Endpoint

```
https://api.adapty.io/api/v1/sdk/profiles/
```

Method

```
POST
```

Example request with customer_user_id

```json
{
    "customer_user_id": "john_doe"
}
```

Example request with profile_ID

```json
{
    "customer_user_id": "2C8439F1-2F79-43C4-A429-6041975A311C"
}
```

Example response



Parameters

| Param                  | Type | Required | Nullable | Description |
| :--------------------- | :--- | :------- | :------- | :---------- |
| **customer\_user\_id** | str  | ✅        | ❌        |             |

The response is the same as the GET request (**extended** parameter does not work here).

You can also set the user's attributes the same way as in the PATCH method.

### Set profile's attribute

Endpoint

```
https://api.adapty.io/api/v1/sdk/profiles/{profile_id_or_customer_user_id}/
```

Method

```
PATCH
```

Example request with customer_user_id

```text
https://api.adapty.io/api/v1/sdk/profiles/john-doe
```

Example request with profile_ID

```
https://api.adapty.io/api/v1/sdk/profiles/2C8439F1-2F79-43C4-A429-6041975A311C
```

Example response



Parameters

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
| gender       | str  | ❌        | ✅        | User's gender.                                               |
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

### Delete profile

Endpoint

```
https://api.adapty.io/api/v1/sdk/profiles/{profile_id_or_customer_user_id}/delete
```

Method

```
DELETE
```

Example request with customer_user_id

```text
https://api.adapty.io/api/v1/sdk/profiles/john-doe
```

Example request with profile_ID

```
https://api.adapty.io/api/v1/sdk/profiles/2C8439F1-2F79-43C4-A429-6041975A311C
```

Example response



Parameters

| Param                              | Type | Required | Nullable | Description                                  |
| :--------------------------------- | :--- | :------- | :------- | :------------------------------------------- |
| **profile_id_or_customer_user_id** | str  | ✅        | ❌        | Adapty profile ID or developer's internal ID |

Calling this endpoint enables the deletion of a user's profile and all related data, rendering it inaccessible to the client. Any profile history linked to the deleted profile will be detached, and integration events previously sent to integrations will be deleted from the event feed. 

Should another profile make a purchase from the device with the same Apple ID (or when subscription is restored), the profile history will be reassigned to the new profile, and integration events will be reissued.

Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.

## Archive

With API you can:

1. Get user's subscription status.
2. Activate a subscription for a user with an [access level](access-level).
3. Get user's attributes.
4. Set user's attributes.

:::note
You can't get subscription events via API, but you can use [Webhook](webhook) or direct integration with a service that you're using.
:::

To correctly work with API you need to use a unique ID for your users. This may be an email, a phone number, your internal ID. Without such an ID it's impossible to identify the same user on multiple platforms.

## Case 1: Syncing subscribers between web and mobile

Whenever Web payment providers you use such as Stripe, ChargeBee, or any other, you can sync subscribers. For that:

1. _Use a unique ID for your users_. For example, email or phone number.
2. Check subscription status via API.
3. If a user is freemium, show him a paywall on the Web.
4. After successful payment, update subscription status in Adapty via API.
5. Your subscribers will be automatically in sync with mobile. 

## Case 2: Grant a subscription

:::note
Due to security reasons, you can't grant a subscription via mobile SDK.
:::

Imagine a case, when you run a promotional campaign with offers 7 days of a trial and you want to sync in with mobile experience. To do that:

1. Get a unique ID for a user.
2. Set premium access via paid access level with API with a duration of 7 days.

After 7 days users who won't subscribe will be downgraded to the free tier.

## Case 3: Syncing users' attributes and custom properties

You may have custom attributes for your users, other than defaults such as IDFA, device model, etc. For example, in a language learning service, you may want to save the number of words a student has learned. To do that:

1. Get a unique ID for a user.
2. Update attribute with API or SDK.

With such attributes you can, for example, create a segment and run an A/B test. 

To learn more about S2S API go to [API Specs](server-side-api-specs).