---
title: " Add attribution API request"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import PaywallObject from '@site/src/components/reusable/PaywallObject.md';

Adds attribution data to a profile.

## Endpoint and method

```text
POST https://api.adapty.io/api/v2/web-api/attribution/
```

## Request example

<Tabs> <TabItem value="shell" label="cURL" default>

```shell
curl --location 'https://api.adapty.io/api/v2/web-api/attribution/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_PUBLIC_API_KEY>' \
--data '{
  "placement_id": "PaywallPlacementId",
  "status": "non_organic",
  "variation_id": "00000000-0000-0000-0000-000000000000",
  "paywall_id": "InternalPaywallId",
  "ab_test_name": "Existing Offer | Improved Offer",
  "paywall_name": "Used Paywall",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
  "products": [
    {
      "title": "Monthly Subscription w/o Trial",
      "is_consumable": true,
      "adapty_product_id": "InternalProductId",
      "vendor_product_id": "onemonth_no_trial",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": true,
      "base_plan_id": "B1",
      "offer": {
        "category": "promotional",
        "type": "pay_up_front",
        "id": "StoreOfferId"
      }
    }
  ],
  "remote_config": {
    "lang": "en",
    "data": "RemoteConfigObject"
  }
}'
```

</TabItem> 
<TabItem value="javascript" label="Javascript" default>  

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Api-Key <YOUR_PUBLIC_API_KEY>");

const raw = JSON.stringify({
  "placement_id": "PaywallPlacementId",
  "status": "non_organic",
  "variation_id": "00000000-0000-0000-0000-000000000000",
  "paywall_id": "InternalPaywallId",
  "ab_test_name": "Existing Offer | Improved Offer",
  "paywall_name": "Used Paywall",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
  "products": [
    {
      "title": "Monthly Subscription w/o Trial",
      "is_consumable": true,
      "adapty_product_id": "InternalProductId",
      "vendor_product_id": "onemonth_no_trial",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": true,
      "base_plan_id": "B1",
      "offer": {
        "category": "promotional",
        "type": "pay_up_front",
        "id": "StoreOfferId"
      }
    }
  ],
  "remote_config": {
    "lang": "en",
    "data": "RemoteConfigObject"
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/web-api/attribution/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem> 
<TabItem value="ruby" label="Ruby" default>  

```ruby
require "uri"
require "json"
require "net/http"

url = URI("https://api.adapty.io/api/v2/web-api/attribution/")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request["Authorization"] = "Api-Key <YOUR_PUBLIC_API_KEY>"
request.body = JSON.dump({
  "placement_id": "PaywallPlacementId",
  "status": "non_organic",
  "variation_id": "00000000-0000-0000-0000-000000000000",
  "paywall_id": "InternalPaywallId",
  "ab_test_name": "Existing Offer | Improved Offer",
  "paywall_name": "Used Paywall",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
  "products": [
    {
      "title": "Monthly Subscription w/o Trial",
      "is_consumable": true,
      "adapty_product_id": "InternalProductId",
      "vendor_product_id": "onemonth_no_trial",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": true,
      "base_plan_id": "B1",
      "offer": {
        "category": "promotional",
        "type": "pay_up_front",
        "id": "StoreOfferId"
      }
    }
  ],
  "remote_config": {
    "lang": "en",
    "data": "RemoteConfigObject"
  }
})

response = https.request(request)
puts response.read_body
```

</TabItem> 
<TabItem value="php" label="PHP" default>  

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.adapty.io/api/v2/web-api/attribution/',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "placement_id": "PaywallPlacementId",
  "status": "non_organic",
  "variation_id": "00000000-0000-0000-0000-000000000000",
  "paywall_id": "InternalPaywallId",
  "ab_test_name": "Existing Offer | Improved Offer",
  "paywall_name": "Used Paywall",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
  "products": [
    {
      "title": "Monthly Subscription w/o Trial",
      "is_consumable": true,
      "adapty_product_id": "InternalProductId",
      "vendor_product_id": "onemonth_no_trial",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": true,
      "base_plan_id": "B1",
      "offer": {
        "category": "promotional",
        "type": "pay_up_front",
        "id": "StoreOfferId"
      }
    }
  ],
  "remote_config": {
    "lang": "en",
    "data": "RemoteConfigObject"
  }
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Authorization: Api-Key <YOUR_PUBLIC_API_KEY>'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
```

</TabItem> 
</Tabs>

## Parameters

| Name                | Type   | Required           | Description                                                  |
| ------------------- | ------ | ------------------ | ------------------------------------------------------------ |
| status              | String | :heavy_plus_sign:  | <p>Indicates if the attribution is organic or non-organic.</p><p>Possible values are:</p><ul><li> organic</li><li> non_organic</li><li> unknown</li></ul> |
| attribution_user_id | String | :heavy_minus_sign: | ID assigned to the user by the attribution source.           |
| channel             | String | :heavy_minus_sign: | Marketing channel name.                                      |
| campaign            | String | :heavy_minus_sign: | Marketing campaign name.                                     |
| ad_group            | String | :heavy_minus_sign: | Attribution ad group.                                        |
| ad_set              | String | :heavy_minus_sign: | Attribution ad set.                                          |
| creative            | String | :heavy_minus_sign: | Attribution creative keyword.                                |
| customer_user_id    | String | :heavy_plus_sign:* | User ID you use in your app to identify the user if you do. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. You can find it in the **Customer User ID** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users). |
| profile_id          | String | :heavy_plus_sign:* | An identifier of a user in Adapty. Either `customer_user_id` or `profile_id` is required. |

## Responses

| Status | Meaning              |
| ------ | -------------------- |
| 201    | Successfully created |
| 400    | Bad Request          |
| 401    | Unauthorized         |
| 404    | Not Found            |

## Response example

<PaywallObject /> 
