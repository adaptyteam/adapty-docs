---
title: "List paywalls with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import PaywallObject from '@site/src/components/reusable/PaywallObject.md';

Retrieves a list of paywalls in your app with optional filtering, searching, and pagination.

## Method and endpoint

```http
GET https://api.adapty.io/api/v2/server-side-api/paywalls/
```

## Example request

<Tabs groupId="api-lang" queryString> 

<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/paywalls/?page=1&page_size=10&search=premium' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/paywalls/"
params = {
    "page": 1,
    "page_size": 10,
    "search": "premium"
}

headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>"
}

response = requests.get(url, headers=headers, params=params)

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

fetch("https://api.adapty.io/api/v2/server-side-api/paywalls/?page=1&page_size=10&search=premium", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem> 

</Tabs>

Placeholders: 

- `<YOUR_SECRET_API_KEY>`: Your secret API key for authorization.

## Parameters

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number for pagination (default: 1) |
| `page_size` | integer | No | Number of items per page (default: 20, max: 100) |
| `search` | string | No | Search term to filter paywalls by name |
| `ordering` | string | No | Sort order. Options: `state_index` (default), `name`, `created_at`, `updated_at` |
| `is_archived` | boolean | No | Filter by archived status |

---

## Successful response: 200: OK

Returns a paginated list of paywalls with their basic information.

### Successful response example

```json showLineNumbers
{
    "count": 25,
    "next": "https://api.adapty.io/api/v2/server-side-api/paywalls/?page=2&page_size=10",
    "previous": null,
    "results": [
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
                    "button_text": "Subscribe Now"
                }
            }
        },
        {
            "placement_id": "annual_paywall_placement",
            "variation_id": "87654321-4321-4321-4321-210987654321",
            "paywall_id": "internal_paywall_id_456",
            "ab_test_name": null,
            "paywall_name": "Annual Plan",
            "products": [
                {
                    "title": "Premium Yearly",
                    "is_consumable": false,
                    "adapty_product_id": "prod_789012",
                    "vendor_product_id": "premium_yearly",
                    "introductory_offer_eligibility": false,
                    "promotional_offer_eligibility": true,
                    "base_plan_id": "B2",
                    "offer": {
                        "category": "promotional",
                        "type": "pay_up_front",
                        "id": "yearly_discount_456"
                    }
                }
            ],
            "remote_config": {
                "lang": "en",
                "data": {
                    "paywall_title": "Save with Annual Plan",
                    "paywall_subtitle": "Get 2 months free with annual subscription",
                    "button_text": "Get Annual Plan"
                }
            }
        }
    ]
}
```

---

## Errors

### 400: Bad request

Returns when invalid query parameters are provided.

```json showLineNumbers
{
    "errors": [
        {
            "source": "page_size",
            "errors": [
                "Invalid page_size parameter. Must be between 1 and 100."
            ]
        }
    ],
    "error_code": "validation_error",
    "status_code": 400
}
```

### 401: Unauthorized

<ProfileResponseUnauthorized />

------

**See also:**

- [Get paywall](ss-get-paywall)
- [Update paywall](ss-update-paywall) 