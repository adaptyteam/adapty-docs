---
title: "   Delete profile with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';

Deletes an end user of your app in Adapty.

Calling this endpoint enables the deletion of a user's profile and all related data, rendering it inaccessible to the client. Any profile history linked to the deleted profile will be detached, and integration events previously sent to integrations will be deleted from the event feed. 

Should another profile make a purchase from the device with the same Apple ID (or when the subscription is restored), the profile history will be reassigned to the new profile, and integration events will be reissued.

Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.

## Method and endpoint

```http
DELETE https://api.adapty.io/api/v2/server-side-api/profile/
```

## Example request

<Tabs groupId="api-lang" queryString>  
<TabItem value="curl" label="cURL" default>  

```bash showLineNumbers
curl --location --request DELETE 'https://api.adapty.io/api/v2/server-side-api/profile/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'Content-Type: application/json' \
--data ''
```

</TabItem>  
<TabItem value="python" label="Python" default>  

```python showLineNumbers
import requests

url = "https://api.adapty.io/api/v2/server-side-api/profile/"

headers = {
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>",
    "adapty-customer-user-id": "<YOUR_CUSTOMER_USER_ID>",
    "Content-Type": "application/json"
}

response = requests.delete(url, headers=headers)

print(response.text)
```
</TabItem>  
<TabItem value="js" label="JavaScript" default>  

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
myHeaders.append("Content-Type", "application/json");

const raw = "";

const requestOptions = {
  method: "DELETE",
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

## Parameters

No parameters

---

## Successful response: 204: No Content

**204: No Content** with an empty body is a successful response. 

---

## Errors

### 401: Unauthorized

<ProfileResponseUnauthorized />  

---

### 404: Not found

<ProfileResponseNotFound />  



---

**See also:**

- [Get profile](ss-get-profile)
- [Create profile](ss-create-profile)
- [Update profile](ss-update-profile)

````
