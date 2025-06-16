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
    "custom_preference": "grant",
    "consent": true
}'
```

</TabItem>  
<TabItem value="python" label="Python" default>  

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/purchase/profile/refund-saver/settings/"

payload = json.dumps({
    "custom_preference": "grant",
    "consent": True
})
headers = {
 "adapty-customer-user-id": "<YOUR_CUSTOMER_USER_ID>",
  "Content-Type": "application/json",
  "Authorization": "Api-Key <YOUR_SECRET_API_KEY>"
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
    "custom_preference": "grant",
    "consent": true
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

| Parameter         | Type    | Required in request | Nullable in request | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | ------- | ------------------- | ------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| custom_preference | String  | :heavy_minus_sign:  | :heavy_plus_sign:   | Set the refund preference individually for the user.  <br/> Possible values are: <br/>– `grant`: approve each refund request <br/>– `no_preference`: do not provide any recommendations to Apple. In this case, Apple will determine the refund outcome based on its internal policies and user history) <br/>– `decline`: decline each refund request. <br/>The default value is `null`. So, if you don't set `custom_preference`, the [default behavior](refund-saver#set-a-default-refund-behavior) will be used. |
| consent           | Boolean | :heavy_minus_sign:  | :heavy_plus_sign:   | Record if the user gave their consent to share their data. <br/>– `True` means that if you receive an in-app refund request, you may provide Apple with information about the user's in-app purchase activity. <br/>– `false` means Refund Saver won't share the user's data with Apple. <br/> The default value is `null`. So, if you don't set `consent`, the [default behavior](refund-saver#set-a-default-refund-behavior) will be used.                                                                             |

## Successful response: 200: OK

| Parameter         | Type    | Description                                                                       |
|-------------------|---------|-----------------------------------------------------------------------------------|
| profile_id        | String  | Customer profile ID.                                                              |
| consent           | Boolean | Defines whether the user consented to share their data.                           |
| custom preference | String  | The refund preference.   |

## Successful response example

``` json showLineNumbers
{
    "profile_id": "e5aab402-b1bd-4039-b632-57a91ebc0779",
    "settings": {
        "consent": true,
        "custom_preference": "no_preference"
    }
}
```

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
- [Retrieve user consent and refund settings with API](ss-get-refund-saver-settings.md) 
