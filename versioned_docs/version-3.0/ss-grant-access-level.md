---
title: " Grant access level with server-side API"
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


Provides access level to your end-user without providing info on the transaction. This comes in handy if you have bonuses for referrals or other events related to your products. 

The access level provided by this method will not be reflected in your [analytics](https://app.adapty.io/analytics). It will be sent to only webhook integration, and only in this case will appear in the **Event Feed**. If webhook integration is not enabled, granting access level will not be shown in the [**Event Feed**](https://app.adapty.io/event-feed).

To grant access and simultaneously provide the transaction details, please use the [Set Transaction request](ss-set-transaction) which is recommended.

## Method and endpoint

```
POST https://api.adapty.io/api/v2/server-side-api/purchase/profile/grant/access-level/
```

## Example request

<Tabs groupId="api-lang" queryString>  
<TabItem value="curl" label="cURL" default>  

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/purchase/profile/grant/access-level/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'Content-Type: application/json' \
--data '{
"access_level_id": "premium",
"starts_at": "2022-10-12T09:42:50.000000+0000",
"expires_at": "2024-10-12T09:42:50.000000+0000"
}'
```

</TabItem>  
<TabItem value="python" label="Python" default>  

```python showLineNumbers
import requests

url = "https://api.adapty.io/api/v2/server-side-api/purchase/profile/grant/access-level/"

payload = {
    "access_level_id": "premium",
    "starts_at": "2022-10-12T09:42:50.000000+0000",
    "expires_at": "2024-10-12T09:42:50.000000+0000"
}

headers = {
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>",
    "adapty-customer-user-id": "<YOUR_CUSTOMER_USER_ID>",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers, json=payload)

print(response.text)
```

</TabItem>  
<TabItem value="js" label="JavaScript" default>  

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "access_level_id": "premium",
  "starts_at": "2022-10-12T09:42:50.000000+0000",
  "expires_at": "2024-10-12T09:42:50.000000+0000"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/purchase/profile/grant/access-level/", requestOptions)
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

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard. |
| starts_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will be active. Maybe in the future. The default value is `null`. |
| expires_at      | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access.  The default value is `null`. |

---

## Successful response: 200: OK

<ProfileResponse />

### Successful response example

<ResponseExample />  

---

## Errors

### 400: Bad request

#### paid_access_level_does_not_exist

<AccessLevelDoesNotExist />
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
