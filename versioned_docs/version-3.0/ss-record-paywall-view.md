---
title: "Record paywall view API request"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar

---

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