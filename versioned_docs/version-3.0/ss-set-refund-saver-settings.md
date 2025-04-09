---
title: "Set user consent and refund settings with API"
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

[Adapty Refund Saver](refund-saver) helps you handle refund requests from Apple’s App Store automatically and more efficiently.

By default, Refund Saver always asks Apple to decline a user’s refund request. You can [change this default behavior](refund-saver#set-a-default-refund-behavior) for all users in the Adapty Dashboard, or adjust it for a specific user [using the Dashboard](refund-saver#set-refund-behavior-for-a-specific-user-in-the-dashboard), the [Adapty SDK](refund-saver#set-refund-behavior-for-a-specific-user-in-the-sdk), or the server-side API, as explained below.

To use Refund Saver, you need to get the user’s consent to share their data with Apple. You can record user's consent [through the Adapty SDK](refund-saver#update-user-consent-in-the-sdk) or the server-side API, as shown below.

## Method and endpoint

```
POST https://api.adapty.io/api/v2/server-side-api/purchase/profile/refund-saver/settings/
```

## Example request

<Tabs groupId="api-lang" queryString>  
<TabItem value="curl" label="cURL" default>  

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/purchase/profile/refund-saver/settings/' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--data '{
  "settings": {
    "custom_preference": 0,
    "consent": 0
  }
}'
```

</TabItem>  
<TabItem value="python" label="Python" default>  

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/purchase/profile/refund-saver/settings/"

payload = json.dumps({
  "settings": {
    "custom_preference": 0,
    "consent": 0
  }
})
headers = {
  'adapty-customer-user-id': '<YOUR_CUSTOMER_USER_ID>',
  'Content-Type': 'application/json',
  'Authorization': 'Api-Key <YOUR_SECRET_API_KEY>'
}

response = requests.request("POST", url, headers=headers, data=payload)

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
  "settings": {
    "custom_preference": 0,
    "consent": 0
  }
});

const requestOptions = {
  method: "POST",
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

| Parameter         | Type    | Required in request | Nullable in request | Description                                                  |
| ----------------- | ------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| custom_preference | String  | :heavy_minus_sign:  | :heavy_plus_sign:   | Set the refund preference individually for the user. Possible values are: `grant`, `no_preference`, `decline`. The default value is `null`. |
| consent           | Boolean | :heavy_minus_sign:  | :heavy_plus_sign:   | Record if the user gave their consent to share their data.<p>The default value is `null`.</p> |

---

## Successful response: 200: OK

<ProfileResponse />

### Successful response example

<ResponseExample />  

---

## Errors

### 400: Bad request

#### profile_does_not_exist

<AccessLevelProfileNotFound />  

---

### 401: Unauthorized

<ProfileResponseUnauthorized />  

---

### 404: Not found

<ProfileResponseNotFound />  



---

**See also:**

- [Revoke access level](ss-revoke-access-level)
- [Set transaction](ss-set-transaction)
- [Validate Stripe purchases, manage access levels, and import transaction history](ss-purchase-in-stripe)
