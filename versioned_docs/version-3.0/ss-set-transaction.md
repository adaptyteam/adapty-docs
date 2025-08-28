---
title: "Set transaction with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/ResponseExample.md';
import AccessLevelProfileNotFound from '@site/src/components/reusable/AccessLevelProfileNotFound.md';
import Purchase from '@site/src/components/reusable/Purchase.md';
import FreeTrialPrice from '@site/src/components/reusable/FreeTrialPrice.md'; 
import MissingOfferID from '@site/src/components/reusable/MissingOfferID.md'; 
import BillingIssueDetectedDate from '@site/src/components/reusable/BillingIssueDetectedDate.md'; 
import ExpiresDate from '@site/src/components/reusable/ExpiresDate.md'; 
import FamilySharePrice from '@site/src/components/reusable/FamilySharePrice.md'; 
import GracePeriodBilling from '@site/src/components/reusable/GracePeriodBilling.md'; 
import RefundDate from '@site/src/components/reusable/RefundDate.md'; 
import RefundDateNull from '@site/src/components/reusable/RefundDateNull.md'; 
import RenewStatusChangedDate from '@site/src/components/reusable/RenewStatusChangedDate.md'; 
import StoreTransactionId from '@site/src/components/reusable/StoreTransactionId.md'; 
import Subscription from '@site/src/components/reusable/Subscription.md'; 





Creates a new transaction for an end user of your app in Adapty and provides access level. The transaction created by this method will appear in your [analytics](https://app.adapty.io/analytics) and [**Event Feed**](https://app.adapty.io/event-feed) and well as will be sent to all integrations.

This method is recommended over the [Grant access level](ss-grant-access-level) one.

:::important
If the product is not [created in Adapty](create-product), the transaction will still be recorded in the Adapty database, meaning it will appear in analytics and be included in integration events. 

However, the user will get only the default `premium` access level. So, if you want to control access more flexibly and assign different access levels, you must [create products](create-product) in Adapty.
:::

## Method and endpoint

```http
POST https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/
```

Varies based on whether the purchase is a **subscription** or a **one-time purchase**.

## Example request

<Tabs groupId="api-lang" queryString>  
<TabItem value="curl" label="cURL" default>  

```bash showLineNumbers
curl --location 'https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'adapty-customer-user-id: <YOUR_CUSTOMER_USER_ID>' \
--header 'Content-Type: application/json' \
--data '{
  "purchase_type": "subscription",
  "store": "app_store",
  "environment": "Production",
  "store_product_id": "1year.premium",
  "store_transaction_id": "30002109551456",
  "store_original_transaction_id": "30002109551456",
  "is_family_shared": false,
  "price": {
    "country": "US",
    "currency": "USD",
    "value": 9.99
  },
  "purchased_at": "2022-10-12T09:42:50.000000+0000",
  "variation_id": "81109d24-ea95-4806-9ec7-b482bbd1a33d",
  "originally_purchased_at": "2022-10-12T09:42:50.000000+0000",
  "renew_status": true,
  "expires_at":  "2026-10-12T09:42:50.000000+0000"
}'
```

</TabItem>  
<TabItem value="python" label="Python" default>  

```python showLineNumbers
import requests

url = "https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/"

payload = {
    "purchase_type": "subscription",
    "store": "app_store",
    "environment": "Production",
    "store_product_id": "1year.premium",
    "store_transaction_id": "30002109551456",
    "store_original_transaction_id": "30002109551456",
    "is_family_shared": False,
    "price": {
        "country": "US",
        "currency": "USD",
        "value": 9.99
    },
    "purchased_at": "2022-10-12T09:42:50.000000+0000",
    "variation_id": "81109d24-ea95-4806-9ec7-b482bbd1a33d",
    "originally_purchased_at": "2022-10-12T09:42:50.000000+0000",
    "renew_status": True,
    "expires_at": "2026-10-12T09:42:50.000000+0000"
}

headers = {
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>",
    "adapty-customer-user-id": "<YOUR_CUSTOMER_USER_ID>",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers, json=payload)

print(response.text)
```

</TabItem>  
<TabItem value="js" label="JavaScript" default>  

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("adapty-customer-user-id", "<YOUR_CUSTOMER_USER_ID>");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");

const raw = JSON.stringify({
  "purchase_type": "subscription",
  "store": "app_store",
  "environment": "Production",
  "store_product_id": "1year.premium",
  "store_transaction_id": "30002109551456",
  "store_original_transaction_id": "30002109551456",
  "is_family_shared": false,
  "price": {
    "country": "US",
    "currency": "USD",
    "value": 9.99
  },
  "purchased_at": "2022-10-12T09:42:50.000000+0000",
  "variation_id": "81109d24-ea95-4806-9ec7-b482bbd1a33d",
  "originally_purchased_at": "2022-10-12T09:42:50.000000+0000",
  "renew_status": true,
  "expires_at": "2026-10-12T09:42:50.000000+0000"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem>  
</Tabs>

Placeholders: 

- `<YOUR_CUSTOMER_USER_ID>`: The unique ID of the customer in your system.
- `<YOUR_SECRET_API_KEY>`: Your secret API key for authorization.

### For subscription

<Subscription />

### For one-time purchase

<Purchase />

---

## Successful response: 200: OK

<ProfileResponse />

### Successful response example

<!--- <ResponseExample />  --->

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

#### billing_issue_detected_at_date_comparison_error

<BillingIssueDetectedDate />

---

#### expires_date_error

<ExpiresDate />

---

#### family_share_price_error

<FamilySharePrice />

---

#### free_trial_price_error
<FreeTrialPrice />

---

#### grace_period_billing_error
<GracePeriodBilling />

---

#### grace_period_expires_date_error
<FreeTrialPrice />

---

#### missing_offer_id
<MissingOfferID />

---

#### originally_purchased_date_error
<originallyPurchasedDate />

---

#### profile_does_not_exist
<AccessLevelProfileNotFound /> 

---

#### refund_date_error
<RefundDate />

---

#### refund_fields_error
<RefundDateNull />

---

#### renew_status_changed_date_error
<RenewStatusChangedDate />

---

#### store_transaction_id_error
<StoreTransactionId />

---

### 401: Unauthorized

<ProfileResponseUnauthorized />  
### 404: Not found

<ProfileResponseNotFound />  



---

**See also:**

- [Grant access level](ss-grant-access-level)
- [Revoke access level](ss-revoke-access-level)
- [Validate Stripe purchases, manage access levels, and import transaction history](ss-purchase-in-stripe)