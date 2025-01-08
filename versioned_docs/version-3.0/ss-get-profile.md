---
title: " Get profile with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/responseExample.md';
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 


Retrieves the details of an existing end user of your app.

## Method and endpoint

```http
GET https://api.adapty.io/api/v2/server-side-api/profile/
```

## Example request

<Tabs> 

<TabItem value="curl" label="cURL" default> 

```bash
curl --location 'https://api.adapty.io/api/v2/server-side-api/profile/' \
--header 'adapty-customer-user-id: YOUR_CUSTOMER_USER_ID' \
--header 'adapty-platform: iOS' \
--header 'Content-Type: application/json' \
--header 'adapty-profile-id: YOUR_USER_PROFILE_ID' \
--header 'Authorization: Api-Key YOUR_SECRET_API_KEY'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/profile/"

payload = {}
headers = {
  'adapty-customer-user-id': 'YOUR_CUSTOMER_USER_ID',
  'adapty-platform': 'iOS',
  'Content-Type': 'application/json',
  'adapty-profile-id': 'YOUR_USER_PROFILE_ID',
  'Authorization': 'Api-Key YOUR_SECRET_API_KEY'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

</TabItem> 

<TabItem value="js" label="JavaScript" default> 

```javascript
const myHeaders = new Headers();
myHeaders.append("adapty-customer-user-id", "YOUR_CUSTOMER_USER_ID");
myHeaders.append("adapty-platform", "iOS");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("adapty-profile-id", "YOUR_USER_PROFILE_ID");
myHeaders.append("Authorization", "Api-Key YOUR_SECRET_API_KEY");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/profile/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem> 

</Tabs>

## Parameters

No parameters

## Successful response: 200 - Success

<ProfileResponse />

## Successful response example
<ResponseExample />  

## Errors

### 401 - Unauthorized

<ProfileResponseUnauthorized /> 
### 404 - Not found
<ProfileResponseNotFound />  



---

**See also:**

- [Create profile](ss-create-profile)
- [Update profile](ss-update-profile)
- [Delete profile](ss-delete-profile)
