---
title: "Get integration identifiers API request"
description: ""
metadataTitle: ""
hide_table_of_contents: true
displayed_sidebar: APISidebar

---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';

Retrieves integration identifiers of a profile.

## Endpoint and method

```
GET https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/
```

## Example request

<Tabs groupId="api-lang" queryString>
<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--data ''
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/integration/profile/set/integration-identifiers/"

payload = ""
headers = {
  "adapty-customer-user-id": "<YOUR_CUSTOMER_USER_ID>",
  "Content-Type": "application/json",
  "Authorization": "Api-Key <YOUR_SECRET_API_KEY>"
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

</TabItem> 

<TabItem value="js" label="JavaScript" default> 

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");

const raw = "";

const requestOptions = {
  method: "GET",
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

## Parameters

No parameters

## Successful response: 200: OK

| Parameter                        | Type   | Description                                                  |
| -------------------------------- | ------ | ------------------------------------------------------------ |
| adjust_device_id                 | String | The network user's ID in the [Adjust integration](adjust).   |
| airbridge_device_id              | String | The ID of the user's device in  [Airbridge integration.](airbridge) |
| amplitude_device_id              | String | The ID of the user's device in  [Amplitude integration](amplitude). |
| amplitude_user_id                | String | The ID of the user in [Amplitude integration](amplitude).    |
| appmetrica_device_id             | String | The ID of the user's device in  [AppMetrica integration](appmetrica). |
| appmetrica_profile_id            | String | The ID of the user in [AppMetrica integration](appmetrica).  |
| appsflyer_id                     | String | The network user's ID in the [AppsFlyer integration](appsflyer). |
| branch_id                        | String | The Branch Key of the user's app in the Branch integration.  |
| facebook_anonymous_id            | String | The ID of the user in [Facebook Ads integration](facebook-ads). |
| firebase_app_instance_id         | String | The ID of the user in  [Firebase integration](firebase-and-google-analytics). |
| mixpanel_user_id                 | String | The ID of the user in [Mixpanel integration](mixpanel).      |
| one_signal_player_id             | String | The ID of the user in [OneSignal integration](onesignal). Legacy identifier. |
| one_signal_subscription_id       | String | The ID of the user in [OneSignal integration](onesignal). Recommended identifier. |
| posthog_distinct_user_id         | String | The ID of the user in [PostHog integration](posthog).        |
| pushwoosh_hwid                   | String | The ID of the user's device in  [Pushwoosh integration.](pushwoosh) |
| tenjin_analytics_installation_id | String | The ID of the user's device in  [Tenjin integration.](tenjin) |

## Successful response example

``` json showLineNumbers
{
    "facebook_anonymous_id": "XZ7EF7D15E-8FA1-49D8-B180-918EB333E42A",
    "amplitude_user_id": null,
    "amplitude_device_id": null,
    "mixpanel_user_id": "33w6yv5DPqVlyMVbjW31xvzJLtJ3",
    "appmetrica_profile_id": null,
    "appmetrica_device_id": null,
    "one_signal_player_id": null,
    "one_signal_subscription_id": "333ed338-757d-466a-a672-ab92db196a1f",
    "pushwoosh_hwid": null,
    "firebase_app_instance_id": "C333B35DF1DB418E99F7B815E9F5C549",
    "airbridge_device_id": null,
    "appsflyer_id": "1741933337626-3179568",
    "branch_id": null,
    "adjust_device_id": null,
    "tenjin_analytics_installation_id": null,
    "posthog_distinct_user_id": null
}
```

## Errors

### 401: Unauthorized

<ProfileResponseUnauthorized /> 

### 404: Not found

<ProfileResponseNotFound />  

---

**See also:**

- [Add integration identifiers](ss-add-integration)
- [Get profile](ss-get-profile)
