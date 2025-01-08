---
title: " Create profile with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileObject from '@site/src/components/reusable/ProfileObject.md';import CreateProfileRequestExample from '@site/src/components/reusable/CreateProfileRequestExample.md';
import ProfileRequest from '@site/src/components/reusable/ProfileRequest.md';
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/responseExample.md';

Creates a new end user of your app in Adapty.

## Method and endpoint

```http
POST https://api.adapty.io/api/v2/server-side-api/profile/
```

## Parameters

  <ProfileRequest /> 

## Example request

<Tabs> 

<TabItem value="curl" label="cURL" default> 

```bash
curl --location 'https://api.adapty.io/api/v2/server-side-api/profile/' \
--header 'adapty-customer-user-id: YOUR_CUSTOMER_USER_ID' \
--header 'adapty-platform: iOS' \
--header 'Content-Type: application/json' \
--header 'adapty-profile-id: YOUR_USER_PROFILE_ID' \
--header 'Authorization: Api-Key YOUR_SECRET_API_KEY' \
--data-raw '{
  "first_name": "Jane",
  "last_name": "Doe",
  "gender": "f",
  "email": "jane.dow@example.com",
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

```python
const myHeaders = new Headers();
myHeaders.append("adapty-customer-user-id", "YOUR_CUSTOMER_USER_ID");
myHeaders.append("adapty-platform", "iOS");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("adapty-profile-id", "YOUR_USER_PROFILE_ID");
myHeaders.append("Authorization", "Api-Key YOUR_SECRET_API_KEY");

const raw = JSON.stringify({
  "first_name": "Jane",
  "last_name": "Doe",
  "gender": "f",
  "email": "jane.dow@example.com",
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
  method: "POST",
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

<TabItem value="js" label="JavaScript" default> 

```javascript
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/profile/"

payload = json.dumps({
  "first_name": "Jane",
  "last_name": "Doe",
  "gender": "f",
  "email": "jane.dow@example.com",
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
})
headers = {
  'adapty-customer-user-id': 'YOUR_CUSTOMER_USER_ID',
  'adapty-platform': 'iOS',
  'Content-Type': 'application/json',
  'adapty-profile-id': 'YOUR_USER_PROFILE_ID',
  'Authorization': 'Api-Key YOUR_SECRET_API_KEY'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

</TabItem> 

</Tabs>

<!--- <CreateProfileRequestExample /> --->

---

## Successful response

<ProfileResponse />

## Successful response example
<ResponseExample />  

---



## Errors

### 401 - Unauthorized

<ProfileResponseUnauthorized /> 




---

### 404 - Not found
<ProfileResponseNotFound />  

---

**See also:**

- [Get profile](ss-get-profile)
- [Update profile](ss-update-profile)
- [Delete profile](ss-delete-profile)
