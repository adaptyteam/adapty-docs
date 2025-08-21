---
title: "Validate purchase in Paddle, provide access level, and import transaction history from  Paddle with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import NoProductsFound from '@site/src/components/reusable/NoProductsFound.md';
import PaddleApiKeyNotFound  from '@site/src/components/reusable/PaddleApiKeyNotFound.md';
import InvalidPaddleCredentionsOrPurchaseNotFound from '@site/src/components/reusable/InvalidPaddleCredentionsOrPurchaseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';

Validates a purchase using the provided Paddle token using the credentials of Paddle in your [App Settings](https://app.adapty.io/settings/general) inside Adapty Dashboard. If the purchase is valid, the transaction history is imported from Paddle to the profile in Adapty with the specified `customer_user_id`. If there was no profile with this `customer_user_id` before — it will be created.

## Request header

:::warning
This request requires a different set of headers than usual. Only the **Content-Type** header can be used.

Note that `customer_user_id` should be included in the request body, not in a header, and `profile_id` should not be provided at all.
:::

| **Header**       | **Description**                                              |
| ---------------- | ------------------------------------------------------------ |
| **Content-Type** | Set to `application/json` for the API to process the request. |

## Method and endpoint

```http
POST https://api.adapty.io/api/v2/server-side-api/purchase/paddle/token/validate/
```

## Example request
<Tabs groupId="api-lang" queryString>
<TabItem value="curl" label="cURL" default>
  ```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/purchase/paddle/token/validate/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--data '{
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
  "paddle_token": "live_7d279f61a3339fed520f7cd8c08"
}'
  ```
</TabItem>  
<TabItem value="python" label="Python" default>

```python showLineNumbers
import requests
import json

url = "https://api.adapty.io/api/v2/server-side-api/purchase/paddle/token/validate/"

payload = json.dumps({
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
  "paddle_token": "live_7d279f61a3339fed520f7cd8c08"
})
headers = 
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
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");

const raw = JSON.stringify({
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
  "paddle_token": "live_7d279f61a3339fed520f7cd8c08"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/purchase/paddle/token/validate/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```
</TabItem>  
</Tabs>

Placeholders: 

- `<YOUR_SECRET_API_KEY>`: Your secret API key for authorization.
- `<YOUR_CUSTOMER_USER_ID>`: The unique ID of the customer in your system.

## Parameters

:::

| Parameter        | Type   | Required | Nullable | Description                                                  |
| :--------------- | :----- | -------- | -------- | :----------------------------------------------------------- |
| customer_user_id | String | Yes      | No       | The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [Profiles](https://app.adapty.io/profiles/users) -> specific profile page. |
| paddle_token     | String | Yes      | No       | Token of a Paddle object that represents a unique purchase. Could be either a transaction id (txn_...) or a subscription id (sub_...), |

## Successful response: 200: OK

```json showLineNumbers
{
    "data": {
        "app_id": "14c3d623-2f3a-455a-aa86-ef83dff6913b",
        "profile_id": "3286abd3-48b0-4e9c-a5f6-ac0a006804a6",
        "customer_user_id": "Jane.doe@example.com",
        "total_revenue_usd": 0.0,
        "segment_hash": "8f45947bad31ab0c",
        "timestamp": 1736436751469,
        "custom_attributes": [
            {
                "key": "favourite_sport",
                "value": "yoga"
            }
        ],
        "access_levels": [],
        "subscriptions": [
          {
                "purchase_id": "5a7ab471-2299-45f7-ad69-1d395c1256e3",
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
        ],
        "non_subscriptions": []
    }
}
```

---

## Errors

### 400: Bad request

#### no_products_found

<NoProductsFound />

---

#### paddle_api_key_not_found

<PaddleApiKeyNotFound />

---

#### invalid_paddle_credentials_or_purchase_not_found

<InvalidPaddleCredentionsOrPurchaseNotFound />

---

### 401: Unauthorized

<ProfileResponseUnauthorized />  

---

**See also:**

- [Grant access level](ss-grant-access-level)
- [Revoke access level](ss-revoke-access-level)
- [Set transaction](ss-set-transaction)
