---
title: "Set transaction with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---


import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/responseExample.md';
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



Creates a new transaction for an end user of your app in Adapty and provides access level. The transaction created by this method will appear in your [analytics](https://app.adapty.io/analytics) and [**Event Feed**](https://app.adapty.io/event-feed) and well as will be sent to all integrations.

This method is recommended over the [Grant access level](ss-grant-access-level) one.

:::warning

Before setting a transaction, make sure the product is [created in Adapty](create-product). Without this step, the transaction will still be recorded in the Adapty database, meaning it will appear in analytics and be included in integration events. However, the user won’t get access in the mobile app since no access level will be assigned.

:::

## Method and endpoint

```
POST https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/
```

Varies based on whether the purchase is a **subscription** or a **one-time purchase**.

## Example request

<Tabs>  
<TabItem value="curl" label="cURL" default>  

```bash 
.
```

</TabItem>  
<TabItem value="python" label="Python" default>  

```python
. 
```

</TabItem>  
<TabItem value="js" label="JavaScript" default>  

```javascript 
. 
```

</TabItem>  
</Tabs>

### For subscription

| Parameter                     | Type          | Required in request | Nullable in request    | Description                                                  |
| :---------------------------- | :------------ | :------------------ | :--------------------- | :----------------------------------------------------------- |
| purchase_type                 | String        | :heavy_plus_sign:   | :heavy_minus_sign:     | The type of product purchased. Possible value: `subscription`. |
| store                         | String        | :heavy_plus_sign:   | :heavy_minus_sign:     | Store where the product was bought. Options include **app_store**, **play_store**, **stripe**, or the name of your [custom store](initial-custom). |
| environment                   | String        | :heavy_minus_sign:  | :heavy_minus_sign:     | Environment where the transaction took place. Options are `Sandbox` or `Production`. |
| store_product_id              | String        | :heavy_plus_sign:   | :heavy_minus_sign:     | ID of the product in the app store (like App Store, Google Play, Stripe) that unlocked this access level. |
| store_transaction_id          | String        | :heavy_plus_sign:   | :heavy_minus_sign:     | Transaction ID in the app store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:     | <p>For subscriptions, this ID links to the first transaction in a renewal chain. Each renewal is connected to this original transaction.</p><br /><p>If there’s no renewal, store_original_transaction_id matches store_transaction_id.</p> |
| offer                         | Object        | :heavy_plus_sign:   | :heavy_minus_sign:     | The offer used in the purchase, provided as an [Offer](server-side-api-objects#offer) object. |
| is_family_shared              | Boolean       | :heavy_minus_sign:  | :heavy_minus_sign:     | A Boolean value indicating whether the product supports family sharing in App Store Connect. iOS only. Always `false` for iOS below 14.0 and macOS below 11.0. |
| price                         | Object        | :heavy_plus_sign:   | :heavy_minus_sign:     | Price of the subscription or purchase as a [Price](server-side-api-objects#price) object. An initial subscription purchase with zero cost is a free trial; a renewal with zero cost is a free renewal. |
| purchased_at                  | ISO 8601 date | :heavy_plus_sign:   | :heavy_minus_sign:     | The datetime of the most recent access level purchase.       |
| refunded_at                   | ISO 8601 date | :heavy_minus_sign:  | :heavy_minus_sign:     | The datetime when the subscription was refunded, if applicable. |
| cancellation_reason           | String        | :heavy_plus_sign:   | :heavy_plus_sign:      | Possible reasons for cancellation include: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, or `unknown`. |
| variation_id                  | String        | :heavy_minus_sign:  | :heavy_minus_sign:     | The variation ID used to trace purchases to the specific paywall they were made from. |
| originally_purchased_at       | ISO 8601 date | :heavy_plus_sign:   | :heavy_minus_sign:     | For subscription chains, this is the purchase date of the original transaction, linked by `store_original_transaction_id`. |
| expires_at                    | ISO 8601 date | :heavy_plus_sign:   | :heavy_plus_sign:      | The datetime when the access level expires. It may be in the past and may be `null` for lifetime access. |
| renew_status                  | Boolean       | :heavy_plus_sign:   | :heavy_minus_sign:     | Indicates if the subscription auto-renewal is enabled.       |
| renew_status_changed_at       | ISO 8601 date | :heavy_minus_sign:  | **:heavy_minus_sign:** | The datetime when auto-renewal when auto-renewal was either enabled or disabled. |
| billing_issue_detected_at     | ISO 8601 date | :heavy_plus_sign:   | :heavy_plus_sign:      | The datetime when a billing issue was detected (e.g., a failed card charge). Subscription might still be active. This is cleared if the payment goes through. |
| grace_period_expires_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_minus_sign:     | The datetime when the [grace period](https://developer.apple.com/news/?id=09122019c) will end, if the subscription is currently in one. |

### For one-time purchase

<Purchase />

## Request example

```json 
{
  "purchase_type": "one_time_purchase",
  "store": "app_store",
  "environment": "Production",
  "store_product_id": "1year.premium",
  "store_transaction_id": "30002109551456",
  "store_original_transaction_id": "30002109461269",
  "offer": {
    "category": "introductory",
    "type": "free_trial",
    "id": "annual_free_trial"
  },
  "is_family_shared": false,
  "price": {
    "country": "US",
    "currency": "USD",
    "value": 0
  },
  "purchased_at": "2022-10-12T09:42:50.000000+0000",
  "refunded_at": "2022-10-12T09:42:50.000000+0000",
  "cancellation_reason": "voluntarily_cancelled",
  "variation_id": "81109d24-ea95-4806-9ec7-b482bbd1a33d"
}
```


## Successful response

<ProfileResponse />

## Successful response example
<ResponseExample />  

## Errors

### 400 - Bad request
#### **billing_issue_detected_at_date_comparison_error
<BillingIssueDetectedDate />
#### expires_date_error
<ExpiresDate />
#### family_share_price_error
<FamilySharePrice />
#### free_trial_price_error
<FreeTrialPrice />
#### grace_period_billing_error
<GracePeriodBilling />
#### grace_period_expires_date_error
<FreeTrialPrice />
#### missing_offer_id
<MissingOfferID />
#### originally_purchased_date_error
<originallyPurchasedDate />
#### profile_does_not_exist
<AccessLevelProfileNotFound /> 
#### refund_date_error
<RefundDate />
#### refund_fields_error
<RefundDateNull />
#### renew_status_changed_date_error
<RenewStatusChangedDate />
#### store_transaction_id_error
<StoreTransactionId />
### 401 - Unauthorized
<ProfileResponseUnauthorized />  
### 404 - Not found
<ProfileResponseNotFound />  



---

**See also:**

- [Grant access level](ss-grant-access-level)
- [Revoke access level](ss-revoke-access-level)
- [Validate Stripe purchases, manage access levels, and import transaction history](ss-purchase-in-stripe)