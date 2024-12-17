---
title: "API specs"
description: ""
metadataTitle: ""
hide_table_of_contents: true
displayed_sidebar: APISidebar
---

import Details from '@site/src/components/Details';

import ProfileObject from '@site/src/components/reusable/ProfileObject.md';import CreateProfileRequestExample from '@site/src/components/reusable/CreateProfileRequestExample.md';
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; 
import ProfileRequest from '@site/src/components/reusable/ProfileRequest.md';
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseBadRequest from '@site/src/components/reusable/ProfileResponseBadRequest.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/responseExample.md';
import AccessLevel from '@site/src/components/reusable/AccessLevel.md';
import AccessLevelProfileNotFound from '@site/src/components/reusable/AccessLevelProfileNotFound.md';
import AccessLevelDoesNotExist from '@site/src/components/reusable/AccessLevelDoesNotExist.md';
import AccessLevelNoProfileAccessLevel from '@site/src/components/reusable/AccessLevelNoProfileAccessLevel.md';
import RevocationDateIsMoreThanExpirationDate from '@site/src/components/reusable/RevocationDateIsMoreThanExpirationDate.md';
import Purchase from '@site/src/components/reusable/Purchase.md';
import Subscription from '@site/src/components/reusable/Subscription.md';
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
import PaywallObject from '@site/src/components/reusable/PaywallObject.md';
import ResponseExampleNew from '@site/src/components/reusable/ResponseExample-new.md';


Adapty's API lets you access and modify your Adapty data programmatically. We also support [webhooks](webhook), where we notify your server of events as they happen.

This API enables you to seamlessly integrate Adapty with your existing services.

---

## Authorization

- **Base URL**: https://api.adapty.io/api/v2/server-side-api/
- **Authorization header**: API requests must be authenticated by including your API key:
  - For profile requests, use either the public or secret API key as the **Authorization** header with the value `Api-Key {YOUR_SECRET_API_KEY}` or `Api-Key {YOUR_PUBLIC_API_KEY}`, for example, `Api-Key public_live_iNuUlSsN.83zcTTT8D5Y8FI9cGUI6`. You can find your secret API key in the [Adapty Dashboard -> **App Settings** -> **General** tab -> **API keys** section](https://app.adapty.io/settings/general). Remember, this key is secret, so keep it private.

  - For access level and transaction requests, you can secret API key as the **Authorization** header with the value `Api-Key {YOUR_SECRET_API_KEY}`, like this: `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. Find these keys in the [Adapty Dashboard -> **App Settings** -> **General** tab -> **API keys** section](https://app.adapty.io/settings/general).

  - Public API key as the **Authorization** header with the value `Api-Key {YOUR_PUBLIC_API_KEY}`, for example, `Api-Key public_live_iNuUlSsN.83zcTTT8D5Y8FI9cGUI6`. Find these keys in the [Adapty Dashboard -> **App Settings** -> **General** tab -> **API keys** section](https://app.adapty.io/settings/general).
- **Content-Type header**: Set the **Content-Type** header to `application/json` for the API to process your request.
- **Headers**: 

    - **adapty-platform**: Use this header to specify the app's platform. Possible options include:
      `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`.
    - Use one of the following to identify the user profile:
      - **adapty-profile-id**: The user’s Adapty profile ID, visible in the **Adapty ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
        - **adapty-customer-user-id**: The user’s ID in your system, visible in the **Customer user ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
          ⚠️ This works only if you [identify users](identifying-users) in your app code using the Adapty SDK.

- **Body**:  The API expects the request to use the body as JSON.

---

## Profile

Info about your customer and their subscription.

### Profile object

The object that contains details about your customer and their subscription.

<ProfileObject />

---

### Retrieve profile

Retrieves the details of an existing end user of your app.

#### Endpoint

```
https://api.adapty.io/api/v2/server-side-api/profile/
```

#### Method

```
GET
```

#### Authentication header

Public or secret API Key

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
https://api.adapty.io/api/v2/server-side-api/profile/
```

#### Method

```
POST
```

#### Authentication header

Public or secret API Key

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
https://api.adapty.io/api/v2/server-side-api/profile/
```

#### Method

```
PATCH
```

#### Authentication header

Public or secret API Key

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

Should another profile make a purchase from the device with the same Apple ID (or when the subscription is restored), the profile history will be reassigned to the new profile, and integration events will be reissued.

Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.

#### Endpoint

```
https://api.adapty.io/api/v2/server-side-api/profile/
```

#### Method

```
DELETE
```

#### Authentication header

Public or secret API Key

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
---

## Paywall

### Paywall object

<PaywallObject />

---

### Get paywall

Receives the paywall from the provided placement.

<Tabs> 
<TabItem value="shell" label="Shell" default>  

 ```shell
-# You can also use wget
-curl -X POST http://localhost:8000/api/v1/web-api/paywall/ \
-  -H 'Content-Type: application/json' \
-  -H 'Accept: application/json' \
-  -H 'Authorization: Api-Key public_live_iNuUlSsN.83zcTTT8D5Y8FI9cGUI6'
+
 
 ```

</TabItem>  
<TabItem value="http" label="HTTP" default>

```http
POST http://localhost:8000/api/v1/web-api/paywall/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Accept: application/json

```

</TabItem>  
<TabItem value="javascript" label="Javascript" default>

```javascript
const inputBody = '{
  "store": "app_store",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:8000/api/v1/web-api/paywall/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>
<TabItem value="ruby" label="Ruby" default>

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:8000/api/v1/web-api/paywall/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>  
<TabItem value="php" label="PHP" default>

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:8000/api/v1/web-api/paywall/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>   
</Tabs>

#### Endpoint

```text
https://api-admin.adapty.io/api/v1/web-api/paywall/
```

#### Method

```text
POST
```

#### Authentication header

Public API Key

#### Parameters

| Name             | Required           | Description                                                  |
| ---------------- | ------------------ | ------------------------------------------------------------ |
| store            | :heavy_plus_sign:  | Store where the product was bought. Possible values: **app_store**, **play_store**, **stripe**, or the **Store ID** of your [custom store](https://dev-docs.adapty.io/docs/initial-custom). |
| locale           | :heavy_plus_sign:  | An identifier of a paywall locale. This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region (The support for regions will be added later).  Example: `en` means English, `en-US` represents US English. The paywall will be created in the default locale if the parameter is omitted. |
| placement_id     | :heavy_plus_sign:  | The identifier of the [Placement](https://adapty.io/docs/placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| customer_user_id | :heavy_plus_sign:* | An identifier of a user in your system. Either `customer_user_id` or `profile_id` is required. |
| profile_id       | :heavy_plus_sign:* | An identifier of a user in Adapty. Either `customer_user_id` or `profile_id` is required. |

#### Request example

```json
{
  "store": "app_store",
  "locale": "en",
  "placement_id": "PaywallPlacementId",
  "customer_user_id": "UserIdInYourSystem"
}
```

#### Responses

| Status | Meaning            |
| ------ | ------------------ |
| 200    | Successful request |
| 400    | Bad Request        |
| 401    | Unauthorized       |
| 404    | Not Found          |

<details>
   <summary>200 Response example (click to expand) (click to expand)</summary>
```json
{
  "placement_id": "PaywallPlacementId",
  "variation_id": "5130138e-590b-4f7e-8df9-63af3334262c",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "ab_test_name": "Standard Flow vs Optimized Flow",
  "paywall_name": "UsedPaywall",
  "products": [
    {
      "title": "Monthly Premium. No trial",
      "is_consumable": false,
      "adapty_product_id": "onemonth_no_trial",
      "vendor_product_id": "onemonth_no_trial",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": true,
      "base_plan_id": "null",
      "offer": {
        "category": "promotional",
        "type": "pay_up_front",
        "id": "offer_promo_summer2024"
      }
    }
  ],
  "remote_config": {
    "lang": "en",
    "data": "RemoteConfig"
  }
}
```
</details>
---


### Record paywall view

Adapty assists you in measuring the performance of your paywalls. However logging paywall views needs your input because only you know when a customer sees a paywall. Use this request to log a paywall view.


<Tabs> 
<TabItem value="shell" label="Shell" default>  

```shell
# You can also use wget
curl -X POST http://localhost:8000/api/v1/web-api/paywall/visit/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Api-Key public_live_iNuUlSsN.83zcTTT8D5Y8FI9cGUI6'

```

</TabItem>  
<TabItem value="http" label="HTTP" default>  

 ```http
POST http://localhost:8000/api/v1/web-api/paywall/visit/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Accept: application/json

 ```

</TabItem>  
<TabItem value="javascript" label="Javascript" default>   

```javascript
const inputBody = '{
  "visited_at": "2019-08-24T14:15:22Z",
  "store": "app_store",
  "variation_id": "5130138e-590b-4f7e-8df9-63af0004262c",
  "customer_user_id": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:8000/api/v1/web-api/paywall/visit/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem>  
<TabItem value="ruby" label="Ruby" default>

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:8000/api/v1/web-api/paywall/visit/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem>   
<TabItem value="php" label="PHP" default>

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:8000/api/v1/web-api/paywall/visit/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem>  
</Tabs>

#### Endpoint

```text
https://api-admin.adapty.io/api/v1/web-api/paywall/visit/
```

#### Method

```text
POST
```

#### Authentication header

Public API Key

#### Parameters

| Name             | Required           | Description                                                  |
| ---------------- | ------------------ | ------------------------------------------------------------ |
| store            | :heavy_plus_sign:  | Store where the product was bought. Possible values: **app_store**, **play_store**, **stripe**, or the **Store ID** of your [custom store](https://dev-docs.adapty.io/docs/initial-custom). |
| locale           | :heavy_plus_sign:  | An identifier of a paywall locale. This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region (The support for regions will be added later).  Example: `en` means English, `en-US` represents US English. The paywall will be created in the default locale if the parameter is omitted. |
| placement_id     | :heavy_plus_sign:  | The identifier of the [Placement](https://adapty.io/docs/placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| customer_user_id | :heavy_plus_sign:* | An identifier of a user in your system. Either `customer_user_id` or `profile_id` is required. |
| profile_id       | :heavy_plus_sign:* | An identifier of a user in Adapty. Either `customer_user_id` or `profile_id` is required. |

#### Request example

```json
{
  "visited_at": "2024-08-24T14:15:22Z",
  "store": "app_store",
  "variation_id": "00000000-0000-0000-0000-000000000000",
  "customer_user_id": "UserIdInYourSystem"
}
```

<h3 id="web_api_paywall_visit_create-responses">Responses</h3>

| Status | Meaning              |
| ------ | -------------------- |
| 201    | Successfully created |
| 400    | Bad request          |
| 401    | Unauthorized         |
| 404    | Not Found            |

#### Response example

<ResponseExampleNew />

---

## Transactions

### One-time purchase object

<Purchase />

---

### Subscription object

<Subscription />

---

### Set transaction

Creates a new transaction for an end user of your app in Adapty and provides access level. The transaction created by this method will appear in your [analytics](https://app.adapty.io/analytics) and [**Event Feed**](https://app.adapty.io/event-feed) and well as will be sent to all integrations.

This method is recommended over the [Grant access level](server-side-api-specs#grant-access-level) one.

:::warning

Before setting a transaction, make sure the product is [created in Adapty](create-product). Without this step, the transaction will still be recorded in the Adapty database, meaning it will appear in analytics and be included in integration events. However, the user won’t get access in the mobile app since no access level will be assigned.

:::

#### Endpoint

```
https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/
```

#### Method

```
POST
```

#### Authentication header

Secret API Key

#### Parameters

Varies based on whether the purchase is a **subscription** or a **one-time purchase**.

##### For subscription

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

##### For one-time purchase

<Purchase />

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


---

##  Access levels

### Access level object

Info about current customer’s [access level](https://adapty.io/docs/access-level).

<AccessLevel />

---

### Grant access level

Provides access level to your end-user without providing info on the transaction. This comes in handy if you have bonuses for referrals or other events related to your products. 

The access level provided by this method will not be reflected in your [analytics](https://app.adapty.io/analytics). It will be sent to only webhook integration, and only in this case will appear in the **Event Feed**. If webhook integration is not enabled, granting access level will not be shown in the [**Event Feed**](https://app.adapty.io/event-feed).

To grant access and simultaneously provide the transaction details, please use the [Set Transaction request](server-side-api-specs#set-transaction) which is recommended.

#### Endpoint

```
https://api.adapty.io/api/v2/server-side-api/grant/access-level/
```

#### Method

```
POST
```

#### Authentication header

Secret API Key

#### Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard |
| starts_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will be active. Maybe in the future |
| expires_at      | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access |

#### Example request

<details>    
<summary>Example request (click to expand)</summary>
  ```json
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
https://api.adapty.io/api/v2/server-side-api/purchase/profile/revoke/access-level/
```

#### Method

```
POST
```

#### Authentication header

Secret API Key

#### Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard |
| revoke_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access |

#### Request example
<details>    
<summary>Example request (click to expand)</summary>

```json
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
https://api.adapty.io/api/v2/server-side-api/purchase/stripe/token/validate/
```

#### Method

```
POST
```

#### Authentication header

Secret API Key

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
| **customer\_user\_id** | String | :heavy_plus_sign: | :heavy_minus_sign: | The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. For it to work, you must [identify the users](identifying-users) in your mobile app code via Adapty SDK |
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

---

## Integration

Adds integration identifiers.

#### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/integration/profile/set/integration-identifiers/
```

#### Method

```
POST
```

#### Authentication header

Public API Key

#### Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description |
| --------------- | ------------- | ------------------- | ------------------------------------------------------------ | --------------- |
| facebook_anonymous_id | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user in [Facebook Ads integration](facebook-ads). |
| amplitude_user_id | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user in [Amplitude integration](amplitude).    |
| amplitude_device_id | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user's device in  [Amplitude integration](amplitude). |
| mixpanel_user_i | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user in [Mixpanel integration](mixpanel).      |
| appmetrica_profile_id | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user in [AppMetrica integration](appmetrica).  |
| appmetrica_device_id | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user's device in  [AppMetrica integration](appmetrica). |
| one_signal_subscription_id | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user in [OneSignal integration](onesignal).    |
| pushwoosh_hwid   | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user's device in  [Pushwoosh integration.](pushwoosh) |
| firebase_app_instance_id | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user in  [Firebase integration](firebase-and-google-analytics). |
| airbridge_device_id | String                                                       | :heavy_minus_sign: | :heavy_minus_sign: | The ID of the user's device in  [Airbridge integration.](airbridge) |
| branch_id | String | :heavy_minus_sign: | :heavy_minus_sign: | The Branch Key of the user's app in the Branch integration. |
| appsflyer_id |  |  |  | The network user's ID in the [AppsFlyer integration](appsflyer). |
| adjust_device_id |  |  |  |  |

#### Example request

<details>    
<summary>Example request (click to expand)</summary>
  ```json title="JSON"
{
  "pushwoosh_hwid": "string",
  "mixpanel_user_id": "string",
  "facebook_anonymous_id": "string",
  "firebase_app_instance_id": "string",
  "amplitude_user_id": "string",
  "amplitude_device_id": "string",
  "appmetrica_device_id": "string",
  "appmetrica_profile_id": "string",
  "one_signal_subscription_id": "string",
  "branch_id": "string",
  "appsflyer_id": "string",
  "adjust_device_id": "string",
  "airbridge_device_id": "string"
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



---

## Attribution

### Add attribution

Adds attribution data to a profile.

<Tabs> <TabItem value="shell" label="Shell" default>

```shell
# You can also use wget
curl -X POST http://localhost:8000/api/v1/web-api/attribution/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Api-Key public_live_iNuUlSsN.83zcTTT8D5Y8FI9cGUI6'

```

</TabItem> 
<TabItem value="http" label="HTTP" default> 

```http
POST http://localhost:8000/api/v1/web-api/attribution/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Accept: application/json

```

</TabItem> 
<TabItem value="javascript" label="Javascript" default>  

```javascript
const inputBody = '{
  "status": "organic",
  "attribution_user_id": "string",
  "channel": "string",
  "campaign": "string",
  "ad_group": "string",
  "ad_set": "string",
  "creative": "string",
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:8000/api/v1/web-api/attribution/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

</TabItem> 
<TabItem value="ruby" label="Ruby" default>  

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:8000/api/v1/web-api/attribution/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

</TabItem> 
<TabItem value="php" label="PHP" default>  

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:8000/api/v1/web-api/attribution/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

</TabItem> 
</Tabs>

#### Endpoint

```text
https://api-admin.adapty.io/api/v1/web-api/attribution/
```

#### Method

```text
POST
```

#### Request example

```json
{
  "status": "organic",
  "attribution_user_id": "UniqueIdentifierAssignedByAdNetwork",
  "channel": "Google Ads",
  "campaign": "Social media influencers - Rest of the world",
  "ad_group": "null",
  "ad_set": "Keywords 1.12",
  "creative": "null",
  "profile_id": "bfcb6779-b1f9-41fc-92d7-33f8bc1d12e3"
}
```

#### Authentication header

Public API Key

#### Parameters

| Name                | Type   | Required           | Description                                                  |
| ------------------- | ------ | ------------------ | ------------------------------------------------------------ |
| status              | String | :heavy_plus_sign:  | <p>Indicates if the attribution is organic or non-organic.</p><p>Possible values are:</p><ul><li> organic</li><li> non-organic</li><li> unknown</li></ul> |
| attribution_user_id | String | :heavy_minus_sign: | ID assigned to the user by the attribution source.           |
| channel             | String | :heavy_minus_sign: | Marketing channel name.                                      |
| campaign            | String | :heavy_minus_sign: | Marketing campaign name.                                     |
| ad_group            | String | :heavy_minus_sign: | Attribution ad group.                                        |
| ad_set              | String | :heavy_minus_sign: | Attribution ad set.                                          |
| creative            | String | :heavy_minus_sign: | Attribution creative keyword.                                |
| customer_user_id    | String | :heavy_plus_sign:* | User ID you use in your app to identify the user if you do. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. You can find it in the **Customer User ID** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| profile_id          | String | :heavy_plus_sign:* | An identifier of a user in Adapty. Either `customer_user_id` or `profile_id` is required. |

#### Responses

| Status | Meaning              |
| ------ | -------------------- |
| 201    | Successfully created |
| 400    | Bad Request          |
| 401    | Unauthorized         |
| 404    | Not Found            |

#### Response example

<PaywallObject /> 
