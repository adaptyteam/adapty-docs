---
title: "Responses to server-side API requests"
description: ""
metadataTitle: ""
toc: false
---





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