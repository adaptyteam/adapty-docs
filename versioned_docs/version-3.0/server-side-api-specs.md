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

## Paywall

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

## Add Integration identifiers

Adds integration identifiers to profile.

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
