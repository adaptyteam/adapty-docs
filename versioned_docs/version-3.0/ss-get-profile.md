---
title: " Get profile with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
keywords: ['get profile']
rank: 80
---

import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/ResponseExample.md';

import ProfileObject from '@site/src/components/reusable/ProfileObject.md';  
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

Retrieves the details of an existing end user of your app.

## Method and endpoint

```http
GET https://api.adapty.io/api/v2/server-side-api/profile/
```

## Example request

<Tabs groupId="api-lang" queryString> 

<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/profile/' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'Accept: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/profile/"

headers = {
    "adapty-customer-user-id": "<YOUR_CUSTOMER_USER_ID>",
    "Accept": "application/json",
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
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
myHeaders.append("Accept", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/profile/", requestOptions)
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

No parameters

---

## Successful response: 200: OK

<ProfileResponse />	

### Successful response example

```json showLineNumbers
{
    "data": {
        "app_id": "14c3d333-2f3a-455a-aa86-ef83dff6913b",
        "profile_id": "d8533a10-bcce-4e33-8c9d-88b05ac56559",
        "customer_user_id": "77B14FB4-FD2A-4D38-AA3A-4C433F79863C",
        "total_revenue_usd": 9.99,
        "segment_hash": "fdaeef7f8aaa33c9",
        "timestamp": 1733324566777,
        "custom_attributes": [
            {
                "key": "favourite_sport",
                "value": "yoga"
            }
        ],
        "access_levels": [
            {
                "access_level_id": "premium",
                "store": "app_store",
                "store_product_id": "unlimited.9999",
                "store_base_plan_id": null,
                "store_transaction_id": "2000000335013007",
                "store_original_transaction_id": "2000000335013007",
                "offer": null,
                "starts_at": null,
                "purchased_at": "2024-12-24T10:50:23+00:00",
                "originally_purchased_at": "2024-12-24T10:50:23+00:00",
                "expires_at": null,
                "renewal_cancelled_at": "2025-01-05T13:27:47.461425+00:00",
                "billing_issue_detected_at": null,
                "is_in_grace_period": false,
                "cancellation_reason": null
            }
        ],
        "subscriptions": [
            {
                "store": "app_store",
                "store_product_id": "unlimited.9999",
                "store_base_plan_id": null,
                "store_transaction_id": "2000000815013007",
                "store_original_transaction_id": "2000000815013007",
                "offer": null,
                "environment": "Sandbox",
                "purchased_at": "2024-12-24T10:50:23+00:00",
                "originally_purchased_at": "2024-12-24T10:50:23+00:00",
                "expires_at": null,
                "renewal_cancelled_at": null,
                "billing_issue_detected_at": null,
                "is_in_grace_period": false,
                "cancellation_reason": null
            },
            {
                "store": "app_store",
                "store_product_id": "weekly.premium.599",
                "store_base_plan_id": null,
                "store_transaction_id": "2000000825768152",
                "store_original_transaction_id": "2000000815033245",
                "offer": null,
                "environment": "Sandbox",
                "purchased_at": "2024-12-24T11:13:04+00:00",
                "originally_purchased_at": "2024-12-24T11:13:04+00:00",
                "expires_at": "2025-01-10T11:34:40+00:00",
                "renewal_cancelled_at": null,
                "billing_issue_detected_at": null,
                "is_in_grace_period": false,
                "cancellation_reason": null
            }
        ],
        "non_subscriptions": [
            {
                "purchase_id": "7a5f9a7d-e236-33e6-96d8-53a3c59c5562",
                "store": "app_store",
                "store_product_id": "1year.premium",
                "store_base_plan_id": null,
                "store_transaction_id": "30002109551456",
                "store_original_transaction_id": "30002109551456",
                "purchased_at": "2022-10-12T09:42:50+00:00",
                "environment": "Production",
                "is_refund": false,
                "is_consumable": false
            }
        ]
    }
}
```

<!--- <ResponseExample />   --->

---

## Errors

### 401: Unauthorized

<ProfileResponseUnauthorized /> 

### 404: Not found

<ProfileResponseNotFound />  



------

**See also:**

- [Create profile](ss-create-profile)
- [Update profile](ss-update-profile)
- [Delete profile](ss-delete-profile)
