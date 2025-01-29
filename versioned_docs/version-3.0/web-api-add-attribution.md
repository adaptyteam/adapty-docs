---
title: " Add attribution API request"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 
import PaywallObject from '@site/src/components/reusable/PaywallObject.md';
import VariationIdNotFound from '@site/src/components/reusable/VariationIdNotFound.md';
import InvalidDateFormat from '@site/src/components/reusable/InvalidDateFormat.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import InvalidEnumerationMember from '@site/src/components/reusable/InvalidEnumerationMember.md';

Adds marketing attribution data to a profile.

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
  "status": "organic",
  "attribution_user_id": "attribution_user_id_value",
  "channel": "marketing_channel_value",
  "campaign": "campaign_name_value",
  "ad_group": "ad_group_name_value",
  "ad_set": "ad_set_name_value",
  "creative": "creative_name_value",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>"
}
'
```

</TabItem> 
<TabItem value="javascript" label="Javascript" default>  

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Api-Key <YOUR_PUBLIC_API_KEY>");

const raw = JSON.stringify({
  "status": "organic",
  "attribution_user_id": "attribution_user_id_value",
  "channel": "marketing_channel_value",
  "campaign": "campaign_name_value",
  "ad_group": "ad_group_name_value",
  "ad_set": "ad_set_name_value",
  "creative": "creative_name_value",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>"
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
  "status": "organic",
  "attribution_user_id": "attribution_user_id_value",
  "channel": "marketing_channel_value",
  "campaign": "campaign_name_value",
  "ad_group": "ad_group_name_value",
  "ad_set": "ad_set_name_value",
  "creative": "creative_name_value",
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
  CURLOPT_URL => 'https://api.adapty.io/api/v2/web-api/attribution/',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "status": "organic",
  "attribution_user_id": "attribution_user_id_value",
  "channel": "marketing_channel_value",
  "campaign": "campaign_name_value",
  "ad_group": "ad_group_name_value",
  "ad_set": "ad_set_name_value",
  "creative": "creative_name_value",
  "customer_user_id": "<YOUR_CUSTOMER_USER_ID>"
}
',
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
| customer_user_id    | String | :heavy_plus_sign:* | <p>User ID you use in your app to identify the user if you do. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. You can find it in the **Customer User ID** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users).</p><p>Either `customer_user_id` or `profile_id` is required.</p> |
| profile_id          | String | :heavy_plus_sign:* | <p>An identifier of a user in Adapty.  You can find it in the **Adapty ID** field of the profile in the [Adapty Dashboard](https://app.adapty.io/profiles/users).</p><p>Either `customer_user_id` or `profile_id` is required.</p> |

---

## Responses

### 201 - Created

The paywall view is recorded successfully. The response body is blank.

### 400 - Bad Request

<InvalidEnumerationMember />

### 401 - Unauthorised

<ProfileResponseUnauthorized />

### 404 - Not Found

<ProfileResponseNotFound />
