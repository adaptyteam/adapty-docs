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

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).

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

 `Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).
  <ProfileRequest /> 

#### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

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

`Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).
  <ProfileRequest /> 


#### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

#### Successful response: 200 - Success

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

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).

#### Successful response: 204 - Success

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

##  Access levels

### Access level object

Info about current customer’s [access level](https://adapty.io/docs/access-level).

<AccessLevel />

### Grant access level

Provides access level to your end-user without providing an info on the transaction. This comes in handy if you have bonuses for referrals or other events related to your products.

To grant access with providing the transaction details, please use the Set Transaction request <!--- ??? --->

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
#### Successful response

<ProfileResponse />

<details>    
  <summary>Successful response example</summary>
<ResponseExample />  
</details>

#### Errors


<details>    
<summary>**400 - Bad request** (click to expand)</summary> 
  <p> </p>
<AccessLevelProfileNotFound />  
<AccessLevelDoesNotExist />
</details>

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
#### Responses

<details>    
<summary>**200 - Success** (click to expand)</summary> 
  <p> </p>
<ProfileResponse />
Response example
<ResponseExample />  
</details>
<details>    
<summary>**400 - Bad request** (click to expand)</summary> 
 #### Access level does not exist
<AccessLevelDoesNotExist />
---
#### No profile access level
<AccessLevelNoProfileAccessLevel />
---
#### Profile not found
<AccessLevelProfileNotFound /> 
---
#### Revocation date is more than current expiration date
<RevocationDateIsMoreThanExpirationDate />


</details>


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

## Transactions

### Set transaction

Creates a new transaction for an end user of your app in Adapty and provides access level.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/purchase/set/transaction/
```

#### Method

```
POST
```

#### Parameters

Either the **Purchase** or **Subscription** object:

##### Purchase object

<Purchase />

##### Subscription object

<Subscription />

#### Request example
<details>    
<summary>Request example (click to expand)</summary>
```json title="JSON"
{
  "store": "app_store",
  "environment": "Production",
  "store_product_id": "1year.premium",
  "store_transaction_id": "30002109551456",
  "store_original_transaction_id": "30002109561269",
  "offer_category": "introductory",
  "offer_type": "free_trial",
  "offer_id": "annual_free_trial",
  "is_family_shared": false,
  "price": {
    "country": "US",
    "currency": "USD",
    "value": 0
  },
  "purchased_at": "2022-10-12T09:42:50.000000+0000",
  "refunded_at": "2022-10-15T09:42:50.000000+0000",
  "cancellation_reason": "voluntarily_cancelled",
  "variation_id": "81109d24-ea95-4806-9ec7-b482bbd1a33d"
}
```
</details>
#### Responses

<details>    
<summary>**200 - Success** (click to expand)</summary> 
  <p> </p>
<ProfileResponse />
Response example
<ResponseExample />  
</details>
<details>    
<summary>**400 - Bad request** (click to expand)</summary> 
  <p> </p>
#### Free trial price must be 0
<FreeTrialPrice />
---
#### Missing offer ID for promotional offer or offer code
<MissingOfferID />
---
#### Profile not found
<AccessLevelProfileNotFound /> 
---




</details>


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



### Validate a purchase from Stripe, provide access level to a customer, and import his transaction history from Stripe

```
POST: /api/v1/sdk/purchase/stripe/token/validate/
```

:::warning
This request must use a different Content-Type: `Content-Type: application/vnd.api+json'`
:::

Request parameters:

| Param                  | Type | Required | Nullable | Description                                                                                                                                            |
| :--------------------- | :--- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **customer\_user\_id** | str  | ✅        | ❌        | Developer's internal customer ID                                                                                                                       |
| **stripe\_token**      | str  | ✅        | ❌        | Token of a Stripe object that represents a unique purchase. Could either be a token of Stripe's Subscription (`sub_XXX`) or Payment Intent (`pi_XXX`). |

Sample request:

```json title="CURL"
curl
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

Validates a purchase using provided Stripe token using the credentials of Stripe in your App Settings inside Adapty Dashboard. If the purchase is valid, the transaction history is imported from Stripe to the profile in Adapty with the specified customer_user_id. If there was no profile with this customer_user_id before — it will be created.

Profile events are generated along the way and imported transactions are counted towards MTR.

