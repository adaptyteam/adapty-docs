---
title: "Record paywall view API request"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar

---

import ResponseExampleNew from '@site/src/components/reusable/ResponseExample-new.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import VariationIdNotFound from '@site/src/components/reusable/VariationIdNotFound.md';
import InvalidDateFormat from '@site/src/components/reusable/InvalidDateFormat.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';

Adapty can help you measure the conversion of your paywalls. However, to do so, it is required for you to log when a paywall gets shown — without that we'd only know about the users who made a purchase and we'd miss those who did not. Use this request to log a paywall view.

## Endpoint and method

```text showLineNumbers
POST https://api.adapty.io/api/v2/web-api/paywall/visit/
```

<Tabs groupId="api-lang" queryString> 
<TabItem value="curl" label="cURL" default>  

```shell showLineNumbers
curl --location 'https://api.adapty.io/api/v2/web-api/paywall/visit/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Api-Key <YOUR_PUBLIC_API_KEY>' \
--data '{
  "visited_at": "2024-08-24T14:15:22Z",
  "store": "app_store",
  "variation_id": "00000000-0000-0000-0000-000000000000",
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
  "visited_at": "2024-08-24T14:15:22Z",
  "store": "app_store",
  "variation_id": "00000000-0000-0000-0000-000000000000",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v2/web-api/paywall/visit/", requestOptions)
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

url = URI("https://api.adapty.io/api/v2/web-api/paywall/visit/")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request["Authorization"] = "Api-Key <YOUR_PUBLIC_API_KEY>"
request.body = JSON.dump({
  "visited_at": "2024-08-24T14:15:22Z",
  "store": "app_store",
  "variation_id": "00000000-0000-0000-0000-000000000000",
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
  CURLOPT_URL => 'https://api.adapty.io/api/v2/web-api/paywall/visit/',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "visited_at": "2024-08-24T14:15:22Z",
  "store": "app_store",
  "variation_id": "00000000-0000-0000-0000-000000000000",
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

| Name             | Type          | Required           | Description                                                  |
| ---------------- | ------------- | ------------------ | ------------------------------------------------------------ |
| customer_user_id | String        | :heavy_plus_sign:* | <p>An identifier of a user in your system.</p><p>* Either `customer_user_id` or `profile_id` is required.</p> |
| profile_id       | String        | :heavy_plus_sign:* | <p>An identifier of a user in Adapty. </p><p>* Either `customer_user_id` or `profile_id` is required.</p> |
| visited at       | ISO 8601 date | :heavy_minus_sign: | The datetime when the user opened the paywall.               |
| store            | String        | :heavy_plus_sign:  | Store where the product was bought. Possible values: **app_store**, **play_store**, **stripe**, or the **Store ID** of your [custom store](custom-store). |
| variation_id     | String        | :heavy_plus_sign:  | The variation ID used to trace purchases to the specific paywall they were made from. |

<!---

| locale           | :heavy_plus_sign:  | An identifier of a paywall locale. This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region (The support for regions will be added later).  Example: `en` means English, `en-US` represents US English. The paywall will be created in the default locale if the parameter is omitted. |
| placement_id     | :heavy_plus_sign:  | The identifier of the [Placement](https://adapty.io/docs/placements). This is the value you specified when creating a placement in your Adapty Dashboard. |

--->
---

## Responses

### 201: Created

The paywall view is recorded successfully.

### 400: Bad Request

<InvalidDateFormat />

### 401: Unauthorised

<ProfileResponseUnauthorized />

### 404: Not Found

<ProfileResponseNotFound />
