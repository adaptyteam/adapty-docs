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

Updates the [remote config](customize-paywall-with-remote-config.md) of a specific paywall. This endpoint allows you to modify the remote config values that helps you to customize the paywall's appearance and behavior.

## Method and endpoint

```http
PUT https://api.adapty.io/api/v2/server-side-api/paywalls/{paywall_id}/
```

## Example request

<Tabs groupId="api-lang" queryString> 

<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location --request PUT 'https://api.adapty.io/api/v2/server-side-api/paywalls/12345678-1234-1234-1234-123456789012/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--data '{
  "remote_configs": [
    {
      "key": "paywall_title",
      "value": "Unlock Premium Features"
    },
    {
      "key": "paywall_subtitle", 
      "value": "Get access to all premium content"
    },
    {
      "key": "button_text",
      "value": "Subscribe Now"
    }
  ]
}'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/paywalls/12345678-1234-1234-1234-123456789012/"

payload = {
    "remote_configs": [
        {
            "key": "paywall_title",
            "value": "Unlock Premium Features"
        },
        {
            "key": "paywall_subtitle",
            "value": "Get access to all premium content"
        },
        {
            "key": "button_text",
            "value": "Subscribe Now"
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
      "key": "paywall_title",
      "value": "Unlock Premium Features"
    },
    {
      "key": "paywall_subtitle",
      "value": "Get access to all premium content"
    },
    {
      "key": "button_text",
      "value": "Subscribe Now"
    }
  ]
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/paywalls/12345678-1234-1234-1234-123456789012/", requestOptions)
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
| `paywall_id` | string | Yes | The unique identifier of the paywall to update |

### Request body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `remote_configs` | array | Yes | Array of remote configuration key-value pairs to update |

#### Remote config object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | The configuration key |
| `value` | string | Yes | The configuration value |

---

## Successful response: 200: OK

The object that contains information on a paywall.

#### Properties

| Name          | Type             | Required           | Description                                                  |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | The ID of the [Placement](https://adapty.io/docs/placements) where this paywall is shown. This value is set when creating a placement in your Adapty Dashboard. |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | The variation ID used to track purchases linked to this specific paywall. |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | The unique identifier of the paywall.                        |
| ab_test_name  | String           | :heavy_minus_sign: | The name of the parent A/B test.                             |
| paywall_name  | String           | :heavy_plus_sign:  | The name of the paywall, as defined in your Adapty Dashboard. |
| products      | Array of objects | :heavy_plus_sign:  | Array of [Products](server-side-api-objects#product) objects containing product information for the paywall. |
| remote_config | JSON             | :heavy_minus_sign: | A [RemoteConfig](web-api-objects#remoteconfig-object) object in JSON format containing the full [remote config](customize-paywall-with-remote-config) of the paywall. |

#### Example

```json showLineNumbers
{
    "placement_id": "premium_paywall_placement",
    "variation_id": "12345678-1234-1234-1234-123456789012",
    "paywall_id": "internal_paywall_id_123",
    "ab_test_name": "Premium Offer A | Premium Offer B",
    "paywall_name": "Premium Subscription",
    "products": [
        {
            "title": "Premium Monthly",
            "is_consumable": false,
            "adapty_product_id": "prod_123456",
            "vendor_product_id": "premium_monthly",
            "introductory_offer_eligibility": true,
            "promotional_offer_eligibility": true,
            "base_plan_id": "B1",
            "offer": {
                "category": "introductory",
                "type": "free_trial",
                "id": "free_trial_offer_123"
            }
        }
    ],
    "remote_config": {
        "lang": "en",
        "data": {
            "paywall_title": "Unlock Premium Features",
            "paywall_subtitle": "Get access to all premium content",
            "button_text": "Subscribe Now",
            "background_color": "#ffffff",
            "text_color": "#000000"
        }
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