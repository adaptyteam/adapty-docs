---
title: "Retrieve user consent and refund settings with API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---



import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/ResponseExample.md';
import AccessLevelProfileNotFound from '@site/src/components/reusable/AccessLevelProfileNotFound.md';
import AccessLevelDoesNotExist from '@site/src/components/reusable/AccessLevelDoesNotExist.md';

Use this endpoint to:

- Learn the [Refund Saver preference for this user](refund-saver#set-a-default-refund-behavior) - whether Adapty should ask to decline or approve their refund request
- Learn if the user gave their [consent](refund-saver#obtain-user-consent) to share their data with Apple.

## Method and endpoint

```
GET https://api.adapty.io/api/v2/server-side-api/purchase/profile/refund-saver/settings/
```

## Example request

<Tabs groupId="api-lang" queryString>  
<TabItem value="curl" label="cURL" default>  

```bash showLineNumbers
curl --location --request GET 'https://api.adapty.io/api/v2/server-side-api/purchase/profile/refund-saver/settings/' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--data '{}'
```

</TabItem>  
<TabItem value="python" label="Python" default>  

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/purchase/profile/refund-saver/settings/"

payload = json.dumps({})
headers = {
  "adapty-customer-user-id": <YOUR_CUSTOMER_USER_ID>",
  "Content-Type": "application/jso",
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

const raw = JSON.stringify({});

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/purchase/profile/refund-saver/settings/", requestOptions)
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

---

## Errors

### 400: Bad request

#### profile_does_not_exist

<AccessLevelProfileNotFound />  

---

### 401: Unauthorized

<ProfileResponseUnauthorized />  

---

**See also:**

- [Refund Saver](refund-saver.md) 
-  [Set user consent and refund settings with API](ss-set-refund-saver-settings.md) 
