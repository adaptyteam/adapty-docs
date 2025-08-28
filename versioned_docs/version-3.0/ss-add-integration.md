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

Adds integration identifiers to a profile.

## Endpoint and method

```
POST https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/
```

## Example request

<Tabs groupId="api-lang" queryString>
<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
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
  "one_signal_player_id": "example_one_signal_player_id",
  "branch_id": "example_branch_id",
  "appsflyer_id": "example_appsflyer_id",
  "adjust_device_id": "example_adjust_device_id",
  "airbridge_device_id": "example_airbridge_device_id",
  "tenjin_analytics_installation_id": "example_tenjin_analytics_installation_id",
  "posthog_distinct_user_id": "example_posthog_distinct_user_id"
}'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/"

payload = {
    "pushwoosh_hwid": "example_pushwoosh_hwid",
    "mixpanel_user_id": "example_mixpanel_user_id",
    "facebook_anonymous_id": "example_facebook_anonymous_id",
    "firebase_app_instance_id": "example_firebase_app_instance_id",
    "amplitude_user_id": "example_amplitude_user_id",
    "amplitude_device_id": "example_amplitude_device_id",
    "appmetrica_device_id": "example_appmetrica_device_id",
    "appmetrica_profile_id": "example_appmetrica_profile_id",
    "one_signal_subscription_id": "example_one_signal_subscription_id",
    "one_signal_player_id": "example_one_signal_player_id",
    "branch_id": "example_branch_id",
    "appsflyer_id": "example_appsflyer_id",
    "adjust_device_id": "example_adjust_device_id",
    "airbridge_device_id": "example_airbridge_device_id",
    "tenjin_analytics_installation_id": "example_tenjin_analytics_installation_id",
    "posthog_distinct_user_id": "example_posthog_distinct_user_id"
}

headers = {
    "adapty-customer-user-id": "<YOUR_CUSTOMER_USER_ID>",
    "Content-Type": "application/json",
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>"
}

response = requests.post(url, headers=headers, json=payload)

print(response.text)

```

</TabItem> 

<TabItem value="js" label="JavaScript" default> 

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
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
  "one_signal_player_id": "example_one_signal_player_id",
  "branch_id": "example_branch_id",
  "appsflyer_id": "example_appsflyer_id",
  "adjust_device_id": "example_adjust_device_id",
  "airbridge_device_id": "example_airbridge_device_id",
  "tenjin_analytics_installation_id": "example_tenjin_analytics_installation_id",
  "posthog_distinct_user_id": "example_posthog_distinct_user_id"
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

Placeholders: 

- `<YOUR_CUSTOMER_USER_ID>`: The unique ID of the customer in your system.
- `<YOUR_SECRET_API_KEY>`: Your secret API key for authorization.

#### Parameters

| Parameter                        | Type   | Required | Nullable | Description                                                  |
| -------------------------------- | ------ | -------- | -------- | ------------------------------------------------------------ |
| adjust_device_id                 | String | No       | No       | The network user's ID in the [Adjust integration](adjust).   |
| airbridge_device_id              | String | No       | No       | The ID of the user's device in  [Airbridge integration.](airbridge) |
| amplitude_device_id              | String | No       | No       | The ID of the user's device in  [Amplitude integration](amplitude). |
| amplitude_user_id                | String | No       | No       | The ID of the user in [Amplitude integration](amplitude).    |
| appmetrica_device_id             | String | No       | No       | The ID of the user's device in  [AppMetrica integration](appmetrica). |
| appmetrica_profile_id            | String | No       | No       | The ID of the user in [AppMetrica integration](appmetrica).  |
| appsflyer_id                     | String | No       | No       | The network user's ID in the [AppsFlyer integration](appsflyer). |
| branch_id                        | String | No       | No       | The Branch Key of the user's app in the Branch integration.  |
| facebook_anonymous_id            | String | No       | No       | The ID of the user in [Facebook Ads integration](facebook-ads). |
| firebase_app_instance_id         | String | No       | No       | The ID of the user in  [Firebase integration](firebase-and-google-analytics). |
| mixpanel_user_id                 | String | No       | No       | The ID of the user in [Mixpanel integration](mixpanel).      |
| one_signal_player_id             | String | No       | No       | The ID of the user in [OneSignal integration](onesignal). Legacy identifier. |
| one_signal_subscription_id       | String | No       | No       | The ID of the user in [OneSignal integration](onesignal). Recommended identifier. |
| posthog_distinct_user_id         | String | No       | No       | The ID of the user in [PostHog integration](posthog).        |
| pushwoosh_hwid                   | String | No       | No       | The ID of the user's device in  [Pushwoosh integration.](pushwoosh) |
| tenjin_analytics_installation_id | String | No       | No       | The ID of the user's device in  [Tenjin integration.](tenjin) |


## Successful response: 200: OK

The request is successful. The response body is blank.



---

**See also:**

- [Get integration identifiers](ss-get-integration)
- [Get profile](ss-get-profile)