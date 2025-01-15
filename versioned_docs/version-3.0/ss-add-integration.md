---
title: "Add integration identifiers API request"
description: ""
metadataTitle: ""
hide_table_of_contents: true
displayed_sidebar: APISidebar

---

Adds integration identifiers.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/integration/profile/set/integration-identifiers/
```

#### Method

```
POST
```

#### Authentication header

Public API Key

#### Parameters

| Parameter                  | Type   | Required in request | Nullable in request | Description                                                  |
| -------------------------- | ------ | ------------------- | ------------------- | ------------------------------------------------------------ |
| facebook_anonymous_id      | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user in [Facebook Ads integration](facebook-ads). |
| amplitude_user_id          | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user in [Amplitude integration](amplitude).    |
| amplitude_device_id        | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user's device in  [Amplitude integration](amplitude). |
| mixpanel_user_i            | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user in [Mixpanel integration](mixpanel).      |
| appmetrica_profile_id      | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user in [AppMetrica integration](appmetrica).  |
| appmetrica_device_id       | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user's device in  [AppMetrica integration](appmetrica). |
| one_signal_subscription_id | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user in [OneSignal integration](onesignal).    |
| pushwoosh_hwid             | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user's device in  [Pushwoosh integration.](pushwoosh) |
| firebase_app_instance_id   | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user in  [Firebase integration](firebase-and-google-analytics). |
| airbridge_device_id        | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The ID of the user's device in  [Airbridge integration.](airbridge) |
| branch_id                  | String | :heavy_minus_sign:  | :heavy_minus_sign:  | The Branch Key of the user's app in the Branch integration.  |
| appsflyer_id               |        |                     |                     | The network user's ID in the [AppsFlyer integration](appsflyer). |
| adjust_device_id           |        |                     |                     |                                                              |

#### Example request

<details>    
<summary>Example request (click to expand)</summary>
  ```json title="JSON"
{
  "pushwoosh_hwid": "string",
  "mixpanel_user_id": "string",
  "facebook_anonymous_id": "string",
  "firebase_app_instance_id": "string",
  "amplitude_user_id": "string",
  "amplitude_device_id": "string",
  "appmetrica_device_id": "string",
  "appmetrica_profile_id": "string",
  "one_signal_subscription_id": "string",
  "branch_id": "string",
  "appsflyer_id": "string",
  "adjust_device_id": "string",
  "airbridge_device_id": "string"
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