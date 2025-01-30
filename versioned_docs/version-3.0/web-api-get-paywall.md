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

```text
POST https://api.adapty.io/api/v2/web-api/paywall/
```

<Tabs> 
<TabItem value="shell" label="cURL" default>  

 ```shell
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
<TabItem value="javascript" label="JavaScript" default>

```javascript
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

```ruby
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

```php
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

| Name             | Required           | Description                                                  |
| ---------------- | ------------------ | ------------------------------------------------------------ |
| store            | :heavy_plus_sign:  | Store where the product was bought. Possible values: **app_store**, **play_store**, **stripe**, or the **Store ID** of your [custom store](https://dev-docs.adapty.io/docs/initial-custom). |
| locale           | :heavy_plus_sign:  | An identifier of a paywall locale. This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region (The support for regions will be added later).  Example: `en` means English, `en-US` represents US English. The paywall will be created in the default locale if the parameter is omitted. |
| placement_id     | :heavy_plus_sign:  | The identifier of the [Placement](https://adapty.io/docs/placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| customer_user_id | :heavy_plus_sign:* | <p>An identifier of a user in your system.</p><p> * Either `customer_user_id` or `profile_id` is required.</p> |
| profile_id       | :heavy_plus_sign:* | <p>An identifier of a user in Adapty. </p><p>* Either `customer_user_id` or `profile_id` is required.</p> |

---

## Responses

### 200 - Successful request

The successful response will contain the [Paywall](web-api-objects#paywall-object) object.

<PaywallObject /> 

### 400 - Bad Request

<ParseError />

### 401 - Unauthorised

<ProfileResponseUnauthorized />

### 404 - Not Found

<VariationIdNotFound />
