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

Retrieves a list of paywalls in your app.

## Method and endpoint

```http
GET https://api.adapty.io/api/v2/server-side-api/paywalls/
```

## Example request

<Tabs groupId="api-lang" queryString> 

<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/paywalls/paywalls/?page%5Bnumber%5D=1&page%5Bsize%5D=10' \
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
    "page[number]": 1,
    "page[size]": 2
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

fetch("https://api.adapty.io/api/v2/server-side-api/paywalls/paywalls/?page%5Bnumber%5D=1&page%5Bsize%5D=10", requestOptions)
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

| Parameter     | Type    | Required | Description                                                  |
| :------------ | :------ | -------- | :----------------------------------------------------------- |
| `page[number]` | integer | No       | Page number for pagination (default: 1)          |
| `page[size]`   | integer | No       | Number of items per page (default: 20, max: 100) |

---

## Successful response: 200: OK

Returns a paginated list of paywalls with their basic information and the list metadata.

A `paywall` object contains the following properties:

| Name                      | Type             | Required           | Description                                                                        |
|---------------------------|------------------|--------------------|------------------------------------------------------------------------------------|
| title                     | String           | Yes      | The name of the paywall, as defined in your Adapty Dashboard.                      |
| paywall_id                | String(uuid)     | Yes      | The unique identifier of the paywall.                                              |
| use_paywall_builder       | Boolean          | Yes      | Whether the paywall uses the paywall builder.                                      |
| use_paywall_builder_legacy| Boolean          | Yes      | Whether the paywall uses the legacy paywall builder.                               |
| updated_at                | String           | Yes      | Timestamp when the paywall was last updated.                                       |
| created_at                | String           | Yes      | Timestamp when the paywall was created.                                            |
| state                     | String           | Yes      | The current state of the paywall (e.g., "live").                                   |
| is_deleted                | Boolean          | Yes      | Whether the paywall is marked as deleted.                                          |
| web_purchase_url          | String           | No       | URL for web purchases, if applicable.                                              |
| products                  | Array of objects | Yes      | Array of product objects containing product information for the paywall.           |


The response includes a `meta` object with the `pagination` object inside. The `pagination` object contains the following properties:

| Name  | Type    | Required          | Description               |
|-------|---------|-------------------|---------------------------|
| count | Integer | Yes | Total number of paywalls. |
| page  | Integer | Yes | Current page number.      |
| pages | Integer | Yes | Total number of pages.    |


### Example

```javascript showLineNumbers
{
  "data": [
    {
      "title": "LlkTlizT",
      "paywall_id": "fd891d4f-5906-45b9-97c1-13cc3dc665df",
      "use_paywall_builder": false,
      "use_paywall_builder_legacy": false,
      "updated_at": "2025-07-08T07:27:06.754527+00:00",
      "created_at": "2025-07-08T07:27:06.754541+00:00",
      "state": "live",
      "is_deleted": false,
      "web_purchase_url": null,
      "products": [
        {
          "product_id": "b95e9e51-a056-4eb6-9cf7-b75d139e7c3c",
          "title": "mFUQPcJQ",
          "product_set": "uncategorised",
          "offer": null
        }
      ]
    },
    {
      "title": "Premium Subscription",
      "paywall_id": "a1cf7850-1bb8-4151-8336-a4e588730c55",
      "use_paywall_builder": true,
      "use_paywall_builder_legacy": false,
      "updated_at": "2025-07-28T08:15:13.722680+00:00",
      "created_at": "2025-07-25T13:40:01.789853+00:00",
      "state": "live",
      "is_deleted": false,
      "web_purchase_url": "https://example.com/purchase",
      "products": [
        {
          "product_id": "b136422f-8153-402a-afbb-986929c68f6a",
          "title": "Premium Monthly",
          "product_set": "uncategorised",
          "offer": {
            "product_offer_id": "e31a4296-f250-4faf-ac80-3cc93c2da8f5",
            "title": "Free Trial"
          }
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "count": 365,
      "page": 1,
      "pages": 183
    }
  }
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

- [Get paywall](api-adapty#/operations/getPaywall)
- [Update paywall](api-adapty#/operations/updatePaywall) 