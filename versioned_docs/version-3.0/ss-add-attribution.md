---
title: " Add attribution API request"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

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
=======
