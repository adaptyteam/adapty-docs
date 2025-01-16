---
title: "Revoke access level with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---



import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/responseExample.md';
import AccessLevelProfileNotFound from '@site/src/components/reusable/AccessLevelProfileNotFound.md';
import AccessLevelDoesNotExist from '@site/src/components/reusable/AccessLevelDoesNotExist.md';
import AccessLevelNoProfileAccessLevel from '@site/src/components/reusable/AccessLevelNoProfileAccessLevel.md';
import RevocationDateIsMoreThanExpirationDate from '@site/src/components/reusable/RevocationDateIsMoreThanExpirationDate.md';

Removes an access level from an end user of your app in Adapty.

## Method and endpoint

```http
POST https://api.adapty.io/api/v2/server-side-api/purchase/profile/revoke/access-level/
```

## Example request

<Tabs>  
<TabItem value="curl" label="cURL" default>  

```bash 
curl --location 'https://api.adapty.io/api/v2/server-side-api/purchase/profile/revoke/access-level/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'adapty-platform: iOS' \
--header 'Content-Type: application/json' \
--data '{
  "access_level_id": "premium",
  "revoke_at": "2024-10-12T09:42:50.000000+0000"
}'
```

</TabItem>  
<TabItem value="python" label="Python" default>  

```python
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/purchase/profile/revoke/access-level/"

payload = json.dumps({
  "access_level_id": "premium",
  "revoke_at": "2024-10-12T09:42:50.000000+0000"
})
headers = {
  'Authorization': 'Api-Key <YOUR_SECRET_API_KEY>'
  'adapty-customer-user-id': '<YOUR_CUSTOMER_USER_ID>',
  'adapty-platform': 'iOS',
  'Content-Type': 'application/json',
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

</TabItem>  
<TabItem value="js" label="JavaScript" default>  

```javascript 
const myHeaders = new Headers();
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
myHeaders.append("adapty-platform", "iOS");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "access_level_id": "premium",
  "revoke_at": "2024-10-12T09:42:50.000000+0000"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/purchase/profile/revoke/access-level/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem>  
</Tabs>

## Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard |
| revoke_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access |

---

## Successful response: 200 - Success

<ProfileResponse />

### Successful response example

<ResponseExample />  

---

## Errors

### 400 - Bad request 
#### paid_access_level_does_not_exist
<AccessLevelDoesNotExist />
#### profile_does_not_exist
<AccessLevelProfileNotFound />  
#### profile_paid_access_level_does_not_exist
<AccessLevelNoProfileAccessLevel />
#### revocation_date_more_than_expiration_date
<RevocationDateIsMoreThanExpirationDate />

---

### 401 - Unauthorized
<ProfileResponseUnauthorized />  

---

### 404 - Not found
<ProfileResponseNotFound />  



---

**See also:**

- [Grant access level](ss-grant-access-level)
- [Set transaction](ss-set-transaction)
- [Validate Stripe purchases, manage access levels, and import transaction history](ss-purchase-in-stripe)
