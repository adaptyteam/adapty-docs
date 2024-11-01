---
title: "API specs"
description: ""
metadataTitle: ""
hide_table_of_contents: true
displayed_sidebar: APISidebar
---

import Details from '@site/src/components/Details';

import ProfileObject from './reusable/ProfileObject.md';import CreateProfileRequestExample from './reusable/CreateProfileRequestExample.md';
import ProfileRequest from './reusable/ProfileRequest.md';
import ProfileResponse from './reusable/ProfileResponse.md';
import ProfileResponseBadRequest from './reusable/ProfileResponseBadRequest.md';
import ProfileResponseNotFound from './reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from './reusable/ProfileResponseUnauthorized.md';
import ResponseExample from './reusable/responseExample.md';
import AccessLevel from './reusable/AccessLevel.md';
import AccessLevelProfileNotFound from './reusable/AccessLevelProfileNotFound.md';
import AccessLevelDoesNotExist from './reusable/AccessLevelDoesNotExist.md';
import AccessLevelNoProfileAccessLevel from './reusable/AccessLevelNoProfileAccessLevel.md';
import RevocationDateIsMoreThanExpirationDate from './reusable/RevocationDateIsMoreThanExpirationDate.md';
import Purchase from './reusable/Purchase.md';
import Subscription from './reusable/Subscription.md';
import FreeTrialPrice from './reusable/FreeTrialPrice.md'; 
import MissingOfferID from './reusable/MissingOfferID.md'; 
import BillingIssueDetectedDate from './reusable/BillingIssueDetectedDate.md'; 
import ExpiresDate from './reusable/ExpiresDate.md'; 
import FamilySharePrice from './reusable/FamilySharePrice.md'; 
import GracePeriodBilling from './reusable/GracePeriodBilling.md'; 
import RefundDate from './reusable/RefundDate.md'; 
import RefundDateNull from './reusable/RefundDateNull.md'; 
import RenewStatusChangedDate from './reusable/RenewStatusChangedDate.md'; 
import StoreTransactionId from './reusable/StoreTransactionId.md'; 


Adapty's API lets you access and modify your Adapty data programmatically. We also support [webhooks](webhook), where we notify your server of events as they happen.

This API enables you to seamlessly integrate Adapty with your existing services.

---

## Authorization

- **Base URL**: https://api.adapty.io/api/v1/server-side-api/
- **Authorization header**: API requests must be authenticated by including your secret API key as an **Authorization** header with value `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.

- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/json`.
- **Header**: One of the following parameters:
  - **adapty-profile-id**: The ID of your user's profile. You can see it in the **Adapty ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
  - **adapty-customer-user-id**: The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. It will work only if you [identify the users](identifying-users) in your mobile app code via Adapty SDK.

- **Body**:  The API expects the request to use the body as JSON.

---

## Profile

Info about your customer and their subscription.

### Profile object

Object that contains details about your customer and their subscription.

<ProfileObject />

---

### Retrieve profile

Retrieves the details of an existing end user of your app.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profiles/
```

#### Method

```
GET
```

#### Parameters

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](server-side-api-specs#authorization).

#### Successful response: 200 - Success

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>

#### Errors

<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
<ProfileResponseUnauthorized /> 
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
<ProfileResponseNotFound />  
</details>

___

### Create profile

Creates a new end user of your app in Adapty.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profiles/
```

#### Method

```
POST
```

#### Parameters

 `Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](server-side-api-specs#authorization).
  <ProfileRequest /> 

#### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

#### Successful response

**200 - Success**

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>

#### Errors

<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
<ProfileResponseUnauthorized /> 
</details>


<details>    
<summary>**404 - Not found** (click to expand)</summary> 
<ProfileResponseNotFound />  
</details>


___

### Update profile

Changes your end user profile attributes.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profiles/
```

#### Method

```
PATCH
```

#### Parameters

`Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](server-side-api-specs#authorization).
  <ProfileRequest /> 


#### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

#### Successful response

**200 - Success**

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>

#### Errors


<details>    
<summary>**400 - Bad request** (click to expand)</summary> 
<ProfileResponseBadRequest />  
</details>

<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
<ProfileResponseNotFound />  
</details>

___

### Delete profile

Deletes an end user of your app in Adapty.

Calling this endpoint enables the deletion of a user's profile and all related data, rendering it inaccessible to the client. Any profile history linked to the deleted profile will be detached, and integration events previously sent to integrations will be deleted from the event feed. 

Should another profile make a purchase from the device with the same Apple ID (or when subscription is restored), the profile history will be reassigned to the new profile, and integration events will be reissued.

Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profiles/
```

#### Method

```
DELETE
```

#### Parameters

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](server-side-api-specs#authorization).

#### Successful response

**204 - Success**

##### Header:

| Name       | Type   | Description                                                  |
| :--------- | ------ | :----------------------------------------------------------- |
| Request-Id | String | Request ID, all backend logs have this id Example: 758f01dfd9e74ccfbabb4934241c4966 |


<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
<ProfileResponseNotFound />  
</details>
## Transactions

### One-time purchase object

<Purchase />

### Subscription object

<Subscription />

### Set transaction

Creates a new transaction for an end user of your app in Adapty and provides access level. The transaction created by this method will appear in your [analytics](https://app.adapty.io/analytics) and [**Event Feed**](https://app.adapty.io/event-feed) and well as will be sent to all integrations.

This method is recommended over the [Grant access level](server-side-api-specs#grant-access-level) one.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/purchase/set/transaction/
```

#### Method

```
POST
```

#### Parameters

Either the [One-time purchase](server-side-api-specs#one-time-purchase-object) or [Subscription](server-side-api-specs#subscription-object) object.

#### Request example

<details>    
<summary>Request example (click to expand)</summary>
```json title="JSON"{
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

</details>

#### Successful response: 200 - Success

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>


#### Errors

**400 - Bad request**

<div style={{ marginLeft: '20px' }}>
<details>    
<summary>**billing_issue_detected_at_date_comparison_error** (click to expand)</summary> 
  <p> </p>
<BillingIssueDetectedDate />
</details>
<details>    
<summary>**expires_date_error** (click to expand) </summary> 
  <p> </p>
<ExpiresDate />
</details>
<details> 
<summary>**family_share_price_error** (click to expand)</summary> 
  <p> </p>
<FamilySharePrice />
</details>
<details>    
<summary>**free_trial_price_error** (click to expand)</summary> 
  <p> </p>
<FreeTrialPrice />
</details>
<details>    
<summary>**grace_period_billing_error** (click to expand)</summary> 
  <p> </p>
<GracePeriodBilling />
</details>
<details>    
<summary>**grace_period_expires_date_error** (click to expand)</summary> 
  <p> </p>
<FreeTrialPrice />
</details>
<details>    
<summary>**missing_offer_id** (click to expand)</summary> 
  <p> </p>
<MissingOfferID />
</details>
<details>    
<summary>**originally_purchased_date_error** (click to expand)</summary> 
  <p> </p>
<originallyPurchasedDate />
</details>
<details>    
<summary>**profile_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelProfileNotFound /> 
</details>
<details>    
<summary>**refund_date_error** (click to expand)</summary> 
  <p> </p>
<RefundDate />
</details>
<details>    
<summary>**refund_fields_error** (click to expand)</summary> 
  <p> </p>
<RefundDateNull />
</details>
<details>    
<summary>**renew_status_changed_date_error** (click to expand)</summary> 
  <p> </p>
<RenewStatusChangedDate />
</details>
<details>    
<summary>**store_transaction_id_error** (click to expand)</summary> 
  <p> </p>
<StoreTransactionId />
</details>
</div>
<p> </p>
<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
  <p> </p>
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
  <p> </p>
<ProfileResponseNotFound />  
</details>


___




##  Access levels

### Access level object

Info about current customer’s [access level](https://adapty.io/docs/access-level).

<AccessLevel />

### Grant access level

Provides access level to your end-user without providing info on the transaction. This comes in handy if you have bonuses for referrals or other events related to your products. 

The access level provided by this method will not be reflected in your [analytics](https://app.adapty.io/analytics). It will be sent to only webhook integration, and only in this case will appear in the **Event Feed**. If webhook integration is not enabled, granting access level will not be shown in the [**Event Feed**](https://app.adapty.io/event-feed).

To grant access and simultaneously provide the transaction details, please use the [Set Transaction request](server-side-api-specs#set-transaction) which is recommended.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/grant/access-level/
```

#### Method

```
POST
```

#### Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard |
| starts_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will be active. May be in the future |
| expires_at      | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access |

#### Example request

<details>    
<summary>Example request (click to expand)</summary>
  ```json title="JSON"
{
  "access_level_id": "premium",
  "starts_at": "2022-10-12T09:42:50.000000+0000",
  "expires_at": "2024-10-12T09:42:50.000000+0000"
}
```
</details>
#### Successful response: 200 - Success

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>
#### Errors

 **400 - Bad request**
<div style={{ marginLeft: '20px' }}>

<details> 
<summary>**paid_access_level_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelDoesNotExist />

</details>

<details> 
<summary> **profile_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelProfileNotFound />  
</details>

</div>
<p> </p>
<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
  <p> </p>
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
  <p> </p>
<ProfileResponseNotFound />  
</details>

___



### Revoke access level

Removes an access level from an end user of your app in Adapty.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/purchase/profile/revoke/access-level/
```

#### Method

```
POST
```

#### Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard |
| revoke_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access |

#### Request example
<details>    
<summary>Example request (click to expand)</summary>

```json title="JSON"
{
  "access_level_id": "premium",
  "revoke_at": "2024-10-12T09:42:50.000000+0000"
}
```

</details>    
#### Successful response: 200 - Success

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>

#### Errors

**400 - Bad request**
<div style={{ marginLeft: '20px' }}>

<details> 
<summary>**paid_access_level_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelDoesNotExist />
</details>

<details>    
<summary> **profile_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelProfileNotFound />  
</details>

<details> 
<summary>**profile_paid_access_level_does_not_exist** (click to expand)</summary> 
  <p> </p>
<AccessLevelNoProfileAccessLevel />
</details>

<details> 
<summary>**revocation_date_more_than_expiration_date** (click to expand)</summary> 
  <p> </p>
<RevocationDateIsMoreThanExpirationDate />
</details>

</div>
<p> </p>

<details>    
<summary>**401 - Unauthorized** (click to expand)</summary> 
  <p> </p>
<ProfileResponseUnauthorized />  
</details>

<details>    
<summary>**404 - Not found** (click to expand)</summary> 
  <p> </p>
<ProfileResponseNotFound />  
</details>

___

## Purchase in Stripe
### Validate purchase, provide access level to customer, and import their transaction history

Validates a purchase using the provided Stripe token using the credentials of Stripe in your App Settings inside Adapty Dashboard. If the purchase is valid, the transaction history is imported from Stripe to the profile in Adapty with the specified `customer_user_id`. If there was no profile with this `customer_user_id` before — it will be created.

Profile events are generated along the way and imported transactions are counted towards MTR.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/purchase/stripe/token/validate/
```

#### Method

```
POST
```

#### Parameters

:::warning
This request requires different authorization parameters:

- **Base URL**: https://api.adapty.io/api/v1/sdk/purchase/stripe/token/validate/
- **Authorization header**: API requests must be authenticated by including your secret API key as an **Authorization** header with value `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.
- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/vnd.api+json`.
- **Body**:  The API expects the request to use the body as JSON.

:::

| Param                  | Type   | Required          | Nullable           | Description                                                  |
| :--------------------- | :----- | :---------------- | :----------------- | :----------------------------------------------------------- |
| **customer\_user\_id** | String | :heavy_plus_sign: | :heavy_minus_sign: | The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. For it to work, you must [identify the users](http://localhost:3000/docs/identifying-users) in your mobile app code via Adapty SDK |
| **stripe\_token**      | String | :heavy_plus_sign: | :heavy_minus_sign: | Token of a Stripe object that represents a unique purchase. Could either be a token of Stripe's Subscription (`sub_XXX`) or Payment Intent (`pi_XXX`). |

#### Example request


  ```curl title="CURL"
  --location 'https://api.adapty.io/api/v1/sdk/purchase/stripe/token/validate/' \
  --header 'Content-Type: application/vnd.api+json' \
  --header 'Authorization: Api-Key <PUBLIC_OR_PRIVATE_KEY' \
  --data-raw '{
    "data": {
      "type": "stripe_receipt_validation_result",
      "attributes": {
          "customer_user_id": "<CUSTOMER_USER_ID>",
          "stripe_token": "sub_1OM8brJTlbIG45BdDRFOHWAU"
      }
    }
  }'
  ```


#### Successful response: 200 - Success

```json
{
  "data": null
}
```

#### Errors

##### **400** Bad request

Contain a list of errors with parameters.

**Parameters**

| Parameter | Type    | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| detail    | String  | Descriptive information about the error.                     |
| source    | String  | An object containing a `"pointer"` that references the exact location in the request document causing the issue |
| Status    | Integer | HTTP status. Always `400`                                    |

**Response example**

```
{
  "errors": [
    {
      "detail": "none is not an allowed value",
      "source": {
        "pointer": "/data/attributes/stripe_token"
      },
      "status": "400"
    }
  ]
}
```

