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

Retrieves a list of paywalls in your app. Returned objects contain information about placements and audiences but don't contain detailed paywall configuration.

## Method and endpoint

```http
GET https://api.adapty.io/api/v2/server-side-api/paywalls/
```

## Example request

<Tabs groupId="api-lang" queryString> 

<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/paywalls/?page=1&page_size=2' \
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
    "page_size": 2
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

fetch("https://api.adapty.io/api/v2/server-side-api/paywalls/?page=1&page_size=2", requestOptions)
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

| Parameter   | Type    | Required | Description                                      |
|-------------|---------|----------|--------------------------------------------------|
| `page`      | integer | :heavy_minus_sign:       | Page number for pagination (default: 1)          |
| `page_size` | integer | :heavy_minus_sign:       | Number of items per page (default: 20, max: 100) |

---

## Successful response: 200: OK

Returns a paginated list of paywalls with their basic information and the list metadata.

A `paywall` object contains the following properties:

| Name                                  | Type             | Required           | Description                                                                        |
|---------------------------------------|------------------|--------------------|------------------------------------------------------------------------------------|
| title                                 | String           | :heavy_plus_sign:  | The name of the paywall, as defined in your Adapty Dashboard.                      |
| use_paywall_builder                   | Boolean          | :heavy_plus_sign:  | Whether the paywall uses the legacy paywall builder.                               |
| use_paywall_builder_v4                | Boolean          | :heavy_plus_sign:  | Whether the paywall uses the new [Adapty paywall builder](adapty-paywall-builder). |
| remote_config_legacy                  | String           | :heavy_plus_sign:  | Legacy remote config string.                                                       |
| paywall_id                            | String(uuid)     | :heavy_plus_sign:  | The unique identifier of the paywall.                                              |
| updated_at                            | String           | :heavy_plus_sign:  | Timestamp when the paywall was last updated.                                       |
| created_at                            | String           | :heavy_plus_sign:  | Timestamp when the paywall was created.                                            |
| state                                 | String           | :heavy_plus_sign:  | The current state of the paywall (e.g., "live").                                   |
| is_deleted                            | Boolean          | :heavy_plus_sign:  | Whether the paywall is marked as deleted.                                          |
| type                                  | String           | :heavy_plus_sign:  | The type of paywall (e.g., "normal").                                              |
| has_transactions                      | Boolean          | :heavy_plus_sign:  | Whether the paywall has associated transactions.                                   |
| allow_to_update                       | Boolean          | :heavy_plus_sign:  | Whether the paywall can be updated.                                                |
| web_purchase_url                      | String           | :heavy_minus_sign: | URL for web purchases, if applicable.                                              |
| has_deprecated_paywall_builder_config | Boolean          | :heavy_plus_sign:  | Whether the paywall has deprecated builder config.                                 |
| builder_screenshot                    | Object           | :heavy_minus_sign: | Screenshot object with `image_id` and `url`.                                       |
| products                              | Array of objects | :heavy_plus_sign:  | Array of product objects containing product information for the paywall.           |
| latest_placements                     | Array of objects | :heavy_plus_sign:  | Array of placement objects with state and audiences.                               |
| main_screenshot                       | Object           | :heavy_minus_sign: | Main screenshot object with `image_id` and `url`.                                  |


The response includes a `meta` object with the `pagination` object inside. The `pagination` object contains the following properties:

| Name  | Type    | Required          | Description               |
|-------|---------|-------------------|---------------------------|
| count | Integer | :heavy_plus_sign: | Total number of paywalls. |
| page  | Integer | :heavy_plus_sign: | Current page number.      |
| pages | Integer | :heavy_plus_sign: | Total number of pages.    |


### Example

```javascript showLineNumbers
{
  "data": [
    {
      "title": "Premium monthly",
      "use_paywall_builder": false,
      "use_paywall_builder_v4": true,
      "remote_config_legacy": "",
      "paywall_id": "a1cf7850-1bb8-4151-8336-a4e588730c55",
      "updated_at": "2025-07-28T08:15:13.722680+00:00",
      "created_at": "2025-07-25T13:40:01.789853+00:00",
      "state": "live",
      "is_deleted": false,
      "type": "normal",
      "has_transactions": true,
      "allow_to_update": false,
      "web_purchase_url": null,
      "has_deprecated_paywall_builder_config": false,
      "builder_screenshot": {
        "image_id": 219591,
        "url": "https://public-media.adapty.io/public/fd/91/fd91503a-dd52-4a68-9ec2-7ef03f4f505f/bd6b5c60.jpeg"
      },
      "products": [
        {
          "product_id": "b136422f-8153-402a-afbb-986929c68f6a",
          "title": "Weekly Premium",
          "product_set": "weekly",
          "offer": null
        },
        {
          "product_id": "e31a4296-f250-4faf-ac80-3cc93c2da8f5",
          "title": "Monthly Trial Premium",
          "product_set": "monthly",
          "offer": null
        }
      ],
      "latest_placements": [
        {
          "placement": {
            "title": "test_list",
            "developer_id": "test_list",
            "placement_id": "e32891e6-f277-40c5-8e7a-0906596e9f3a",
            "has_deprecated_paywall_builder_configs": false,
            "purchase_group": null,
            "purchase_container": null,
            "is_active": false,
            "is_deleted": false,
            "is_tracking_purchases": null,
            "type": "paywall",
            "updated_at": "2025-07-25T15:25:17.954969+00:00",
            "created_at": "2025-07-25T15:25:17.954982+00:00"
          },
          "state": "live",
          "audiences": [
            {
              "audience": {
                "segments": [],
                "audience_id": "154509ec-c3dc-46d9-a2de-15d307fe5738",
                "title": "All Users",
                "is_default": true
              },
              "started_at": "2025-07-25T15:25:17.961023+00:00",
              "finished_at": null,
              "content_type": "paywall"
            }
          ]
        }
      ],
      "main_screenshot": {
        "image_id": 219591,
        "url": "https://public-media.adapty.io/public/fd/91/fd91503a-dd52-4a68-9ec2-7ef03f4f505f/bd6b5c60.jpeg"
      }
    },
    {
      "title": "Premium weekly",
      "use_paywall_builder": false,
      "use_paywall_builder_v4": true,
      "remote_config_legacy": "",
      "paywall_id": "42889e27-7ef9-4a8d-a716-984a1dcd9af9",
      "updated_at": "2025-07-24T10:51:54.495786+00:00",
      "created_at": "2025-07-24T10:48:22.027189+00:00",
      "state": "live",
      "is_deleted": false,
      "type": "normal",
      "has_transactions": true,
      "allow_to_update": false,
      "web_purchase_url": null,
      "has_deprecated_paywall_builder_config": false,
      "builder_screenshot": {
        "image_id": 218204,
        "url": "https://public-media.adapty.io/public/81/c9/81c9fee7-1bb0-406c-99c4-43ae927260f7/19043124.jpeg"
      },
      "products": [
        {
          "product_id": "b136422f-8153-402a-afbb-986929c68f6a",
          "title": "Weekly Premium",
          "product_set": "weekly",
          "offer": null
        }
      ],
      "latest_placements": [
        {
          "placement": {
            "title": "smuratov-test",
            "developer_id": "smuratov-test",
            "placement_id": "fc9bc8f1-964a-4045-aa91-f91dcb19f88a",
            "has_deprecated_paywall_builder_configs": false,
            "purchase_group": null,
            "purchase_container": null,
            "is_active": false,
            "is_deleted": false,
            "is_tracking_purchases": true,
            "type": "paywall",
            "updated_at": "2025-03-13T17:36:20.041404+00:00",
            "created_at": "2025-03-13T17:36:20.041414+00:00"
          },
          "state": "live",
          "audiences": [
            {
              "audience": {
                "segments": [],
                "audience_id": "154509ec-c3dc-46d9-a2de-15d307fe5738",
                "title": "All Users",
                "is_default": true
              },
              "started_at": "2025-07-24T10:49:09.197086+00:00",
              "finished_at": null,
              "content_type": "paywall"
            }
          ]
        }
      ],
      "main_screenshot": {
        "image_id": 218204,
        "url": "https://public-media.adapty.io/public/81/c9/81c9fee7-1bb0-406c-99c4-43ae927260f7/19043124.jpeg"
      }
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

- [Get paywall](ss-get-paywall)
- [Update paywall](ss-update-paywall) 