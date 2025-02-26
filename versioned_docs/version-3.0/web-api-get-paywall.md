---
title: " Get paywall API request"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import PaywallObject from '@site/src/components/reusable/PaywallObject.md';
import VariationIdNotFound from '@site/src/components/reusable/VariationIdNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ParseError from '@site/src/components/reusable/ParseError.md';

Receives the paywall from the provided placement.

## Method and endpoint

```text showLineNumbers
POST https://api.adapty.io/api/v2/web-api/paywall/
```

<Tabs> 
<TabItem value="curl" label="cURL" default>  

 ```shell showLineNumbers
curl --location 'https://api.adapty.io/api/v2/web-api/paywall/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_PUBLIC_API_KEY>' \
--data '{
  "store": "app_store",
  "locale": "en",
  "placement_id": "PaywallPlacementId",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>"
}'
 ```

</TabItem>  
<TabItem value="js" label="JavaScript" default>

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Api-Key <YOUR_PUBLIC_API_KEY>");

const raw = JSON.stringify({
  "store": "app_store",
  "locale": "en",
  "placement_id": "PaywallPlacementId",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/web-api/paywall/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem>
<TabItem value="ruby" label="Ruby" default>

```ruby showLineNumbers
require "uri"
require "json"
require "net/http"

url = URI("https://api.adapty.io/api/v2/web-api/paywall/")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request["Authorization"] = "Api-Key <YOUR_PUBLIC_API_KEY>"
request.body = JSON.dump({
  "store": "app_store",
  "locale": "en",
  "placement_id": "PaywallPlacementId",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>"
})

response = https.request(request)
puts response.read_body
```

</TabItem>  
<TabItem value="php" label="PHP" default>

```php showLineNumbers
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.adapty.io/api/v2/web-api/paywall/',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "store": "app_store",
  "locale": "en",
  "placement_id": "PaywallPlacementId",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>"
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

| Name                   | Type             | Required           | Description                                                  |
| ---------------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| title                  | String           | :heavy_plus_sign:  |                                                              |
| use_paywall_builder    | Boolean          | :heavy_plus_sign:  |                                                              |
| use_paywall_builder_v4 | Boolean          | :heavy_minus_sign: | `false is used by default                                    |
| remote_config_legacy   | String           | :heavy_minus_sign: |                                                              |
| screenshot_id          | Integer          | :heavy_minus_sign: |                                                              |
| builder_screenshot_id  | Integer          | :heavy_minus_sign: |                                                              |
| products               | Array of objects | :heavy_plus_sign:  | Array of the [Product](web-api-objects#products-object) objects containing information about products that can be sold in the paywall. |
| remote_configs         | Array of objects | :heavy_minus_sign: | Array of the [RemoteConfig](web-api-objects#remoteconfig-object) objects containing information about remote configs of the paywall. |
| paywall_builder        | Object           | :heavy_minus_sign: |                                                              |
| paywall_builder_v3     | Object           | :heavy_minus_sign: |                                                              |



---

## Responses

### 200: OK

The successful response will contain the [Paywall](web-api-objects#paywall-object) object.

<PaywallObject /> 

### 400: Bad Request

<ParseError />

### 401: Unauthorised

<ProfileResponseUnauthorized />

### 404: Not Found

<VariationIdNotFound />
