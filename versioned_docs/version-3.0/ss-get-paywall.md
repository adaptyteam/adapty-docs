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

Retrieves a specific paywall in your app. 

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

| Parameter | Type   | Required | Description                                                  |
| :-------- | :----- | -------- | :----------------------------------------------------------- |
| `paywall_id` | string | Yes      | The unique identifier of the paywall to retrieve |

---

## Successful response: 200: OK

The `paywall` object in the response contains the following properties:

| Name                      | Type             | Required           | Description                                                                                 |
|---------------------------|------------------|--------------------|---------------------------------------------------------------------------------------------|
| title                     | String           | Yes      | The name of the paywall, as defined in your Adapty Dashboard.                               |
| paywall_id                | String           | Yes      | The unique identifier of the paywall.                                                       |
| use_paywall_builder       | Boolean          | Yes      | Whether the paywall uses the paywall builder.                                               |
| use_paywall_builder_legacy| Boolean          | Yes      | Whether the paywall uses the legacy paywall builder.                                        |
| updated_at                | String           | Yes      | Timestamp when the paywall was last updated.                                                |
| created_at                | String           | Yes      | Timestamp when the paywall was created.                                                     |
| state                     | String           | Yes      | The current state of the paywall: `draft`, `live`, `inactive`, or `archived`.               |
| is_deleted                | Boolean          | Yes      | Whether the paywall is marked as deleted.                                                   |
| web_purchase_url          | String           | No       | URL for [web purchases](web-paywall), if applicable.                                        |
| products                  | Array of objects | Yes      | Array of [Product](web-api-objects#products-object) objects containing product information. |
| remote_configs            | Array of objects | No       | Array of [RemoteConfig](web-api-objects#remoteconfig-object) objects with locale and data.  |
| main_screenshot           | Object           | No       | Main screenshot object with `image_id` and `url`.                                           |

### Example

```json showLineNumbers
{
  "title": "Premium Subscription",
  "paywall_id": "fd891d4f-5906-45b9-97c1-13cc3dc665df",
  "use_paywall_builder": true,
  "use_paywall_builder_legacy": false,
  "updated_at": "2025-07-30T11:13:58.798Z",
  "created_at": "2025-07-30T11:13:58.798Z",
  "state": "live",
  "is_deleted": false,
  "web_purchase_url": "https://example.com/purchase",
  "products": [
    {
      "product_id": "b95e9e51-a056-4eb6-9cf7-b75d139e7c3c",
      "title": "Premium Monthly",
      "product_set": "uncategorised",
      "offer": {
        "product_offer_id": "e31a4296-f250-4faf-ac80-3cc93c2da8f5",
        "title": "Free Trial"
      }
    }
  ],
  "remote_configs": [
    {
      "locale": "en",
      "data": "{\"title\":\"Premium Features\",\"subtitle\":\"Unlock all premium content\"}"
    }
  ],
  "main_screenshot": {
    "image_id": 123456,
    "url": "https://public-media.adapty.io/public/screenshot.jpg"
  }
}
```

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