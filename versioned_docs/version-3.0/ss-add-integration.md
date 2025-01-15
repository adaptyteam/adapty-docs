---
title: "Add integration identifiers API request"
description: ""
metadataTitle: ""
hide_table_of_contents: true
displayed_sidebar: APISidebar

---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ResponseExample from '@site/src/components/reusable/ResponseExample.md';

Adds integration identifiers.

## Endpoint and method

```
POST https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/
```

## Example request

<Tabs>
<TabItem value="curl" label="cURL" default> 

```bash
curl --location 'https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'adapty-platform: iOS' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--data '{
  "pushwoosh_hwid": "example_pushwoosh_hwid",
  "mixpanel_user_id": "example_mixpanel_user_id",
  "facebook_anonymous_id": "example_facebook_anonymous_id",
  "firebase_app_instance_id": "example_firebase_app_instance_id",
  "amplitude_user_id": "example_amplitude_user_id",
  "amplitude_device_id": "example_amplitude_device_id",
  "appmetrica_device_id": "example_appmetrica_device_id",
  "appmetrica_profile_id": "example_appmetrica_profile_id",
  "one_signal_subscription_id": "example_one_signal_subscription_id",
  "branch_id": "example_branch_id",
  "appsflyer_id": "example_appsflyer_id",
  "adjust_device_id": "example_adjust_device_id",
  "airbridge_device_id": "example_airbridge_device_id"
}
'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/"

payload = json.dumps({
  "pushwoosh_hwid": "example_pushwoosh_hwid",
  "mixpanel_user_id": "example_mixpanel_user_id",
  "facebook_anonymous_id": "example_facebook_anonymous_id",
  "firebase_app_instance_id": "example_firebase_app_instance_id",
  "amplitude_user_id": "example_amplitude_user_id",
  "amplitude_device_id": "example_amplitude_device_id",
  "appmetrica_device_id": "example_appmetrica_device_id",
  "appmetrica_profile_id": "example_appmetrica_profile_id",
  "one_signal_subscription_id": "example_one_signal_subscription_id",
  "branch_id": "example_branch_id",
  "appsflyer_id": "example_appsflyer_id",
  "adjust_device_id": "example_adjust_device_id",
  "airbridge_device_id": "example_airbridge_device_id"
})
headers = {
  'adapty-customer-user-id': '<YOUR_CUSTOMER_USER_ID>',
  'adapty-platform': 'iOS',
  'Content-Type': 'application/json',
  'Authorization': 'Api-Key <YOUR_SECRET_API_KEY>'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

</TabItem> 

<TabItem value="js" label="JavaScript" default> 

```javascript
const myHeaders = new Headers();
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
myHeaders.append("adapty-platform", "iOS");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");

const raw = JSON.stringify({
  "pushwoosh_hwid": "example_pushwoosh_hwid",
  "mixpanel_user_id": "example_mixpanel_user_id",
  "facebook_anonymous_id": "example_facebook_anonymous_id",
  "firebase_app_instance_id": "example_firebase_app_instance_id",
  "amplitude_user_id": "example_amplitude_user_id",
  "amplitude_device_id": "example_amplitude_device_id",
  "appmetrica_device_id": "example_appmetrica_device_id",
  "appmetrica_profile_id": "example_appmetrica_profile_id",
  "one_signal_subscription_id": "example_one_signal_subscription_id",
  "branch_id": "example_branch_id",
  "appsflyer_id": "example_appsflyer_id",
  "adjust_device_id": "example_adjust_device_id",
  "airbridge_device_id": "example_airbridge_device_id"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem> 

</Tabs>

## Authentication header

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



#### Successful response: 200 - Success

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>

#### Errors