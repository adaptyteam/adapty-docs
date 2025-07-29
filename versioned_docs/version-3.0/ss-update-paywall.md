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


| Name                                  | Type             | Required           | Description                                                                                 |
|---------------------------------------|------------------|--------------------|---------------------------------------------------------------------------------------------|
| title                                 | String           | :heavy_plus_sign:  | The name of the paywall, as defined in your Adapty Dashboard.                               |
| use_paywall_builder                   | Boolean          | :heavy_plus_sign:  | Whether the paywall uses the legacy paywall builder.                                        |
| use_paywall_builder_v4                | Boolean          | :heavy_minus_sign: | Whether the paywall uses the [New paywall builder](adapty-paywall-builder).                 |
| remote_config_legacy                  | String           | :heavy_minus_sign: | Legacy remote config string.                                                                |
| paywall_id                            | String           | :heavy_minus_sign: | The unique identifier of the paywall.                                                       |
| screenshot_id                         | Integer          | :heavy_minus_sign: | ID of the main screenshot.                                                                  |
| builder_screenshot_id                 | Integer          | :heavy_minus_sign: | ID of the builder screenshot.                                                               |
| updated_at                            | String           | :heavy_minus_sign: | Timestamp when the paywall was last updated.                                                |
| created_at                            | String           | :heavy_minus_sign: | Timestamp when the paywall was created.                                                     |
| state                                 | String           | :heavy_minus_sign: | The current state of the paywall: `draft`, `live`, `inactive`, or `archived`.               |
| is_deleted                            | Boolean          | :heavy_minus_sign: | Whether the paywall is marked as deleted.                                                   |
| type                                  | String           | :heavy_minus_sign: | The paywall type.                                                                           |
| has_transactions                      | Boolean          | :heavy_minus_sign: | Whether the paywall has associated transactions.                                            |
| allow_to_update                       | Boolean          | :heavy_minus_sign: | Whether the paywall can be updated.                                                         |
| web_purchase_url                      | String           | :heavy_minus_sign: | URL for [web purchases](web-paywall), if applicable.                                        |
| has_deprecated_paywall_builder_config | Boolean          | :heavy_minus_sign: | Whether the paywall has deprecated builder config.                                          |
| screenshot                            | Object           | :heavy_minus_sign: | Main screenshot object with `image_id` and `url`.                                           |
| builder_screenshot                    | Object           | :heavy_minus_sign: | Builder screenshot object with `image_id` and `url`.                                        |
| products                              | Array of objects | :heavy_plus_sign:  | Array of [Product](web-api-objects#products-object) objects containing product information. |
| remote_configs                        | Array of objects | :heavy_minus_sign: | Array of [RemoteConfig](web-api-objects#remoteconfig-object) objects with locale and data.  |
| builder                               | Object           | :heavy_minus_sign: | The legacy paywall builder configuration object.                                            |
| paywall_builder_v3                    | Object           | :heavy_minus_sign: | The new paywall builder configuration object.                                               |

### Example

```json showLineNumbers
{
  "paywall": {
    "title": "Premium Subscription",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": false,
    "remote_config_legacy": "",
    "paywall_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "screenshot_id": 123,
    "builder_screenshot_id": 124,
    "updated_at": "2025-07-29T06:18:53.536Z",
    "created_at": "2025-07-29T06:18:53.536Z",
    "state": "draft",
    "is_deleted": false,
    "type": "normal",
    "has_transactions": true,
    "allow_to_update": false,
    "web_purchase_url": "https://example.com/purchase",
    "has_deprecated_paywall_builder_config": false
  },
  "screenshot": {
    "image_id": 123,
    "url": "https://public-media.adapty.io/public/screenshot.jpg"
  },
  "builder_screenshot": {
    "image_id": 124,
    "url": "https://public-media.adapty.io/public/builder-screenshot.jpg"
  },
  "products": [
    {
      "product_id": "b136422f-8153-402a-afbb-986929c68f6a",
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
  "builder": {
    "paywall_builder_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "config": {
      "format": "2.0.0",
      "template_id": "basic",
      "template_revision": 2,
      "assets": [
        {
          "id": "primary-color",
          "type": "color",
          "value": "#b8180F"
        },
        {
          "id": "background-gradient",
          "type": "linear-gradient",
          "values": [
            {
              "color": "#686bDf",
              "p": 0
            }
          ],
          "points": {
            "x0": 0,
            "y0": 0,
            "x1": 0,
            "y1": 0
          }
        }
      ],
      "default_localization": "en-GB",
      "localizations": [
        {
          "id": "en-GB",
          "strings": [
            {
              "id": "str-title",
              "value": "Become a Premium user",
              "has_tags": false,
              "fallback": "Premium Subscription"
            }
          ]
        }
      ],
      "is_hard_paywall": false,
      "main_image_relative_height": 0.56
    },
    "paywall_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "paywall_builder_v3": {
    "paywall_builder_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "paywall_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "builder_config": {
      "format": "4.0.0",
      "template_id": "premium_template",
      "template_revision": 1,
      "assets": [
        {
          "id": "primary-color",
          "type": "color",
          "value": "#b8180F"
        },
        {
          "id": "accent-color",
          "type": "linear-gradient",
          "values": [
            {
              "color": "#686bDf",
              "p": 0
            }
          ],
          "points": {
            "x0": 0,
            "y0": 0,
            "x1": 0,
            "y1": 0
          }
        },
        {
          "id": "main-font",
          "type": "font",
          "value": "system",
          "resources": [
            "font-resource"
          ],
          "family_name": "adapty_system",
          "weight": 400,
          "italic": true,
          "size": 15,
          "color": "#000000FF"
        }
      ],
      "default_localization": "en",
      "styles": "premium_style"
    },
    "front_config": {}
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