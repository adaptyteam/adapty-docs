---
title: "  Update profile with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileObject from '@site/src/components/reusable/ProfileObject.md';
import CreateProfileRequestExample from '@site/src/components/reusable/CreateProfileRequestExample.md';
import ProfileRequest from '@site/src/components/reusable/ProfileRequest.md';
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseBadRequest from '@site/src/components/reusable/ProfileResponseBadRequest.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/ResponseExample.md';



Changes your end user profile attributes.

## Method and endpoint

```
PATCH https://api.adapty.io/api/v2/server-side-api/profile/
```


## Example request

<Tabs groupId="api-lang" queryString> 

<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location --request PATCH 'https://api.adapty.io/api/v2/server-side-api/profile/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'adapty-platform: <OPTIONAL_DEVICE_PLATFORM>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "first_name": "Jane",
  "last_name": "Doe",
  "gender": "f",
  "email": "jane.doe@example.com",
  "phone_number": "+1234567890",
  "birthday": "2000-12-31",
  "ip_country": "FR",
  "store_country": "US",
  "store": "app_store",
  "analytics_disabled": true,
  "custom_attributes": [
    {
      "key": "favourite_sport",
      "value": "yoga"
    }
  ],
  "installation_meta": {
    "device_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "device": "string",
    "locale": "en",
    "os": "string",
    "platform": "iOS",
    "timezone": "Europe/Rome",
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "idfa": "EA7583CD-A667-48BC-B806-42ECB2B48333",
    "idfv": "E9D48DA5-3930-4B41-8521-D953AECD2F33",
    "advertising_id": "",
    "android_id": "",
    "android_app_set_id": ""
  }
}'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests

url = "https://api.adapty.io/api/v2/server-side-api/profile/"

payload = {
    "first_name": "Jane",
    "last_name": "Doe",
    "gender": "f",
    "email": "jane.doe@example.com",
    "phone_number": "+1234567890",
    "birthday": "2000-12-31",
    "ip_country": "FR",
    "store_country": "US",
    "store": "app_store",
    "analytics_disabled": True,
    "custom_attributes": [
        {
            "key": "favourite_sport",
            "value": "yoga"
        }
    ],
    "installation_meta": {
        "device_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "device": "string",
        "locale": "en",
        "os": "string",
        "platform": "iOS",
        "timezone": "Europe/Rome",
        "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
        "idfa": "EA7583CD-A667-48BC-B806-42ECB2B48333",
        "idfv": "E9D48DA5-3930-4B41-8521-D953AECD2F33",
        "advertising_id": "",
        "android_id": "",
        "android_app_set_id": ""
    }
}

headers = {
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>",
    "adapty-customer-user-id": "<YOUR_CUSTOMER_USER_ID>",
    "adapty-platform": "<OPTIONAL_DEVICE_PLATFORM>",
    "Content-Type": "application/json"
}

response = requests.patch(url, headers=headers, json=payload)

print(response.text)
```

</TabItem> 

<TabItem value="js" label="JavaScript" default> 

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
myHeaders.append("adapty-platform", "<OPTIONAL_DEVICE_PLATFORM>");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "first_name": "Jane",
  "last_name": "Doe",
  "gender": "f",
  "email": "jane.doe@example.com",
  "phone_number": "+1234567890",
  "birthday": "2000-12-31",
  "ip_country": "FR",
  "store_country": "US",
  "store": "app_store",
  "analytics_disabled": true,
  "custom_attributes": [
    {
      "key": "favourite_sport",
      "value": "yoga"
    }
  ],
  "installation_meta": {
    "device_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "device": "string",
    "locale": "en",
    "os": "string",
    "platform": "iOS",
    "timezone": "Europe/Rome",
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "idfa": "EA7583CD-A667-48BC-B806-42ECB2B48333",
    "idfv": "E9D48DA5-3930-4B41-8521-D953AECD2F33",
    "advertising_id": "",
    "android_id": "",
    "android_app_set_id": ""
  }
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/profile/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem> 

</Tabs>

Placeholders: 

- `<YOUR_CUSTOMER_USER_ID>`: The unique ID of the customer in your system.
- `<YOUR_SECRET_API_KEY>`: Your secret API key for authorization.
- `<OPTIONAL_DEVICE_PLATFORM>`: The platform of the device where the user has your app installed. Useful when the user has installed your app on multiple devices.

<!--- <CreateProfileRequestExample /> --->

## Parameters

 <ProfileRequest />

:::tip

`profile_id` and/or `customer_user_id` must be included in the request header, as described in the [Authorization](ss-authorization) section.

If you're adding a `customer_user_id` to an existing profile:

1. Use the `POST` method.
2. Add both `profile_id` and `customer_user_id` to the request header.

This will link the `customer_user_id` to the user's existing profile.

:::

---

## Successful response: 200: OK

<ProfileResponse />

### Successful response example
<ResponseExample />  

---

## Errors

### 400: Bad request

<ProfileResponseBadRequest />  

### 401: Unauthorized

<ProfileResponseUnauthorized />  
### 404: Not found

<ProfileResponseNotFound />  



---

**See also:**

- [Get profile](ss-get-profile)
- [Create profile](ss-create-profile)
- [Delete profile](ss-delete-profile)