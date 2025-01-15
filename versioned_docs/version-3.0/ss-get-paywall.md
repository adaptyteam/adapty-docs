---
title: " Get paywall API request"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

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

#### Method and endpoint

```text
POST https://api-admin.adapty.io/api/v2/web-api/paywall/
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
