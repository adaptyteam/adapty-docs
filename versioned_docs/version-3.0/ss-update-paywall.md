---
title: "Update paywall with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import PaywallObject from '@site/src/components/reusable/PaywallObject.md';

Updates the [remote config](customize-paywall-with-remote-config.md) of a specific paywall. This endpoint allows you to modify the remote config values that help you to customize the paywall's appearance and behavior.

:::important
If you update a remote config, it will overwrite all the existing remote configs!

If you need to preserve the existing remote configs, first, [get the paywall](ss-get-paywall.md). Then, copy the `remote_configs` from there and modify the objects you need in the update request.
:::

## Method and endpoint

```http
PUT https://api.adapty.io/api/v2/server-side-api/paywalls/{paywall_id}/
```

## Example request

<Tabs groupId="api-lang" queryString> 

<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location --request PUT 'https://api.adapty.io/api/v2/server-side-api/paywalls/{paywall_id}/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--data '{
  "remote_configs": [
    {
      "locale": "en",
      "data": "{\"title\":\"Premium Features\",\"subtitle\":\"Unlock all premium content\"}"
    }
  ]
}'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/paywalls/{paywall_id}/"

payload = {
    "remote_configs": [
       {
            "locale": "en",
            "data": "{\"title\":\"Premium Features\",\"subtitle\":\"Unlock all premium content\"}"
        }
    ]
}

headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>"
}

response = requests.put(url, headers=headers, json=payload)

print(response.text)
```

</TabItem> 

<TabItem value="js" label="JavaScript" default> 

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "remote_configs": [
      {
          "locale": "en",
          "data": "{\"title\":\"Premium Features\",\"subtitle\":\"Unlock all premium content\"}"
      }
  ]
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
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
- `{paywall_id}`: The unique identifier of the paywall to update.

## Parameters

### Path parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `paywall_id` | string | :heavy_plus_sign: | The unique identifier of the paywall to update |

### Request body

| Parameter | Type | Required | Description                                                                    |
|-----------|------|----------|--------------------------------------------------------------------------------|
| `remote_configs` | array | :heavy_plus_sign: | Array of [RemoteConfig](web-api-objects#remoteconfig-object) objects to update |

---

## Successful response: 200: OK

Returns the updated paywall information. The `paywall` object contains the following properties:


| Name                      | Type             | Required           | Description                                                                                 |
|---------------------------|------------------|--------------------|---------------------------------------------------------------------------------------------|
| title                     | String           | :heavy_plus_sign:  | The name of the paywall, as defined in your Adapty Dashboard.                               |
| paywall_id                | String           | :heavy_plus_sign:  | The unique identifier of the paywall.                                                       |
| use_paywall_builder       | Boolean          | :heavy_plus_sign:  | Whether the paywall uses the paywall builder.                                               |
| use_paywall_builder_legacy| Boolean          | :heavy_plus_sign:  | Whether the paywall uses the legacy paywall builder.                                        |
| updated_at                | String           | :heavy_plus_sign:  | Timestamp when the paywall was last updated.                                                |
| created_at                | String           | :heavy_plus_sign:  | Timestamp when the paywall was created.                                                     |
| state                     | String           | :heavy_plus_sign:  | The current state of the paywall: `draft`, `live`, `inactive`, or `archived`.               |
| is_deleted                | Boolean          | :heavy_plus_sign:  | Whether the paywall is marked as deleted.                                                   |
| web_purchase_url          | String           | :heavy_minus_sign: | URL for [web purchases](web-paywall), if applicable.                                        |
| products                  | Array of objects | :heavy_plus_sign:  | Array of [Product](web-api-objects#products-object) objects containing product information. |
| remote_configs            | Array of objects | :heavy_minus_sign: | Array of [RemoteConfig](web-api-objects#remoteconfig-object) objects with locale and data.  |
| main_screenshot           | Object           | :heavy_minus_sign: | Main screenshot object with `image_id` and `url`.                                           |

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
      },
      "ordering_index": 0
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

### 400: Bad request

Returns when the request body is invalid or missing required fields.

```json showLineNumbers
{
    "errors": [
        {
            "source": "remote_configs",
            "errors": [
                "At least one field must be provided"
            ]
        }
    ],
    "error_code": "validation_error",
    "status_code": 400
}
```

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

- [Get paywall](ss-get-paywall)
- [List paywalls](ss-list-paywalls) 