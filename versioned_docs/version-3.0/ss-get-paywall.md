---
title: "Get paywall with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import PaywallObject from '@site/src/components/reusable/PaywallObject.md';

Retrieves the details of a specific paywall in your app.

## Method and endpoint

```http
GET https://api.adapty.io/api/v2/server-side-api/paywalls/{paywall_id}/
```

## Example request

<Tabs groupId="api-lang" queryString> 

<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/paywalls/{paywall_id}/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/paywalls/{paywall_id}/"

headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>"
}

response = requests.get(url, headers=headers)

print(response.text)
```

</TabItem> 

<TabItem value="js" label="JavaScript" default> 

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/paywalls/{paywall_id}/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem> 

</Tabs>

Placeholders: 

- `<YOUR_SECRET_API_KEY>`: Your secret API key for authorization.
- `{paywall_id}`: The unique identifier of the paywall.

## Parameters

### Path parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `paywall_id` | string | Yes | The unique identifier of the paywall to retrieve |

---

## Successful response: 200: OK

<PaywallObject />

---

## Errors

### 401: Unauthorized

<ProfileResponseUnauthorized /> 

### 404: Not found

The request failed because the specified paywall wasn't found. Double-check the `paywall_id` for any typos.

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Paywall not found"
            ]
        }
    ],
    "error_code": "paywall_does_not_exist",
    "status_code": 404
}
```  

------

**See also:**

- [List paywalls](ss-list-paywalls)
- [Update paywall](ss-update-paywall) 