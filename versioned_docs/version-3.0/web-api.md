---
title: Adapty API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; 

## Authentication

- HTTP Authentication, scheme: bearer 

## Attribution

### Create attribution

<Tabs> <TabItem value="shell" label="Shell" default>

```shell
# You can also use wget
curl -X POST http://localhost:8000/api/v1/web-api/attribution/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

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
<TabItem value="python" label="Python" default> 
```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:8000/api/v1/web-api/attribution/', headers = headers)

print(r.json())

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
<TabItem value="java" label="Java" default>  
```java
URL obj = new URL("http://localhost:8000/api/v1/web-api/attribution/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```
</TabItem> 
<TabItem value="go" label="Go" default>  

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:8000/api/v1/web-api/attribution/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

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
  "attribution_user_id": "string",
  "channel": "string",
  "campaign": "string",
  "ad_group": "string",
  "ad_set": "string",
  "creative": "string",
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8"
}
```

#### Parameters

Any of the following objects:

-  AttributionDataCustomerUserId

##### AttributionDataCustomerUserId object

| Name                | Type                                          | Required           | Description     |
| ------------------- | --------------------------------------------- | ------------------ | --------------- |
| status              | [AttributionStatus](#schemaattributionstatus) | :heavy_plus_sign:  | An enumeration. |
| attribution_user_id | string                                        | :heavy_minus_sign: | none            |
| channel             | string                                        | :heavy_minus_sign: | none            |
| campaign            | string                                        | :heavy_minus_sign: | none            |
| ad_group            | string                                        | :heavy_minus_sign: | none            |
| ad_set              | string                                        | :heavy_minus_sign: | none            |
| creative            | string                                        | :heavy_minus_sign: | none            |
| customer_user_id    | string                                        | :heavy_plus_sign:  | none            |

> Example responses

> 400 Response

```json
{
  "errors": {
    "property1": [
      "string"
    ],
    "property2": [
      "string"
    ]
  },
  "error_code": "base_error",
  "status_code": 400
}
```

<h3 id="web_api_attribution_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|No response body|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|[Errors](#schemaerrors)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|none|[Errors](#schemaerrors)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|[Errors](#schemaerrors)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
tokenAuth
</aside>

<h1 id="adapty-api-paywall">Paywall</h1>

## web_api_paywall_create

<a id="opIdweb_api_paywall_create"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:8000/api/v1/web-api/paywall/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:8000/api/v1/web-api/paywall/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "store": "adapty",
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

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:8000/api/v1/web-api/paywall/', headers = headers)

print(r.json())

```

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

```java
URL obj = new URL("http://localhost:8000/api/v1/web-api/paywall/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:8000/api/v1/web-api/paywall/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/web-api/paywall/`

> Body parameter

```json
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}
```

<h3 id="web_api_paywall_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[PaywallRequestData](#schemapaywallrequestdata)|false|none|

> Example responses

> 200 Response

```json
{
  "placement_id": "string",
  "variation_id": "5130138e-590b-4f7e-8df9-63af0004262c",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "ab_test_name": "string",
  "paywall_name": "string",
  "products": [
    {
      "title": "string",
      "is_consumable": true,
      "adapty_product_id": "6414dbe0-1fa8-4590-a838-ec1ead8ab951",
      "vendor_product_id": "string",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": false,
      "base_plan_id": "string",
      "offer": {
        "category": "no_offer",
        "type": "free_trial",
        "id": "string"
      }
    }
  ],
  "remote_config": {
    "lang": "string",
    "data": "string"
  }
}
```

<h3 id="web_api_paywall_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[PaywallResponseData](#schemapaywallresponsedata)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|[Errors](#schemaerrors)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|none|[Errors](#schemaerrors)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|[Errors](#schemaerrors)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
tokenAuth
</aside>

## web_api_paywall_visit_create

<a id="opIdweb_api_paywall_visit_create"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:8000/api/v1/web-api/paywall/visit/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:8000/api/v1/web-api/paywall/visit/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "visited_at": "2019-08-24T14:15:22Z",
  "store": "adapty",
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

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:8000/api/v1/web-api/paywall/visit/', headers = headers)

print(r.json())

```

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

```java
URL obj = new URL("http://localhost:8000/api/v1/web-api/paywall/visit/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:8000/api/v1/web-api/paywall/visit/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/v1/web-api/paywall/visit/`

> Body parameter

```json
{
  "visited_at": "2019-08-24T14:15:22Z",
  "store": "adapty",
  "variation_id": "5130138e-590b-4f7e-8df9-63af0004262c",
  "customer_user_id": "string"
}
```

<h3 id="web_api_paywall_visit_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[PaywallVisitRequestData](#schemapaywallvisitrequestdata)|false|none|

> Example responses

> 400 Response

```json
{
  "errors": {
    "property1": [
      "string"
    ],
    "property2": [
      "string"
    ]
  },
  "error_code": "base_error",
  "status_code": 400
}
```

<h3 id="web_api_paywall_visit_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|No response body|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|[Errors](#schemaerrors)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|none|[Errors](#schemaerrors)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|[Errors](#schemaerrors)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
tokenAuth
</aside>

# Schemas

<h2 id="tocS_ABPredict">ABPredict</h2>
<!-- backwards compatibility -->
<a id="schemaabpredict"></a>
<a id="schema_ABPredict"></a>
<a id="tocSabpredict"></a>
<a id="tocsabpredict"></a>

```json
{
  "certainty": true,
  "probabilities": [
    {
      "property1": 0,
      "property2": 0
    }
  ]
}

```

ABPredict

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|certainty|boolean|true|none|none|
|probabilities|[object]|true|none|none|
|» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

<h2 id="tocS_ABTest">ABTest</h2>
<!-- backwards compatibility -->
<a id="schemaabtest"></a>
<a id="schema_ABTest"></a>
<a id="tocSabtest"></a>
<a id="tocsabtest"></a>

```json
{
  "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
  "title": "string",
  "goal": "string",
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "created_at": "2019-08-24T14:15:22Z"
}

```

ABTest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ab_test_id|string(uuid)|true|none|none|
|title|string|true|none|none|
|goal|string|true|none|none|
|paywalls_group|[PaywallsGroup](#schemapaywallsgroup)|true|none|none|
|created_at|string(date-time)|true|none|none|

<h2 id="tocS_ABTestAggregate">ABTestAggregate</h2>
<!-- backwards compatibility -->
<a id="schemaabtestaggregate"></a>
<a id="schema_ABTestAggregate"></a>
<a id="tocSabtestaggregate"></a>
<a id="tocsabtestaggregate"></a>

```json
{
  "ab_test": {
    "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
    "title": "string",
    "goal": "string",
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "created_at": "2019-08-24T14:15:22Z"
  },
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "paywalls": [
    {
      "paywall": {
        "paywall": {
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "title": "string",
          "use_paywall_builder": true,
          "use_paywall_builder_v4": true,
          "screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "builder_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "main_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          }
        },
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "products": [
          {
            "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
            "title": "string",
            "product_set": "uncategorised",
            "offer": {
              "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
              "title": "string"
            },
            "ordering_index": 0
          }
        ]
      },
      "weight": 100,
      "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610"
    }
  ]
}

```

ABTestAggregate

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ab_test|[ABTest](#schemaabtest)|true|none|none|
|paywalls_group|[PaywallsGroup](#schemapaywallsgroup)|false|none|none|
|paywalls|[[ABTestPaywallWeightAggregate](#schemaabtestpaywallweightaggregate)]|true|none|[Difference with state of included pydantic fields.]|

<h2 id="tocS_ABTestData">ABTestData</h2>
<!-- backwards compatibility -->
<a id="schemaabtestdata"></a>
<a id="schema_ABTestData"></a>
<a id="tocSabtestdata"></a>
<a id="tocsabtestdata"></a>

```json
{
  "title": "string",
  "goal": "string",
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "paywalls": [
    {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "weight": 100
    },
    {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "weight": 100
    }
  ],
  "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
  "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417"
}

```

ABTestData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|goal|string|true|none|none|
|paywalls_group|[PaywallsGroupData](#schemapaywallsgroupdata)|false|none|Annotation:    This object is immutable dataset.  @dataclass(frozen=True)|
|paywalls|[[ABTestPaywallData](#schemaabtestpaywalldata)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|placement_id|string(uuid)|false|none|none|
|audience_id|string(uuid)|false|none|none|

<h2 id="tocS_ABTestDetailMetricsCollection">ABTestDetailMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemaabtestdetailmetricscollection"></a>
<a id="schema_ABTestDetailMetricsCollection"></a>
<a id="tocSabtestdetailmetricscollection"></a>
<a id="tocsabtestdetailmetricscollection"></a>

```json
{
  "ab_test": {
    "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
    "title": "string",
    "goal": "string",
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "created_at": "2019-08-24T14:15:22Z"
  },
  "state": "live",
  "placement": {
    "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
    "title": "string",
    "created_at": "2019-08-24T14:15:22Z"
  },
  "audience": {
    "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
    "title": "string",
    "is_default": true
  },
  "placement_audience_priority": 0,
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z",
  "metrics": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "string",
      "paywall": {
        "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
        "title": "string",
        "use_paywall_builder": true,
        "use_paywall_builder_v4": true,
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "main_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        }
      },
      "values": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "period": "2019-08-24T14:15:22Z",
          "low_boundary": 0,
          "average_per_1000": 0,
          "upper_boundary": 0,
          "probability": 0
        }
      ],
      "weight": 0,
      "low_boundary": 0,
      "average_per_1000": 0,
      "upper_boundary": 0,
      "probability": 0
    }
  ],
  "predict": {
    "certainty": true,
    "probabilities": [
      {
        "property1": 0,
        "property2": 0
      }
    ]
  },
  "segmentation_by": "product"
}

```

ABTestDetailMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ab_test|[ABTest](#schemaabtest)|true|none|none|
|state|[ABTestState](#schemaabteststate)|true|none|An enumeration.|
|placement|[Placement](#schemaplacement)|false|none|none|
|audience|[Audience](#schemaaudience)|false|none|none|
|placement_audience_priority|integer|false|none|none|
|started_at|string(date-time)|false|none|none|
|stopped_at|string(date-time)|false|none|none|
|metrics|[[ABTestPaywallMetrics](#schemaabtestpaywallmetrics)]|true|none|none|
|predict|[ABPredict](#schemaabpredict)|false|none|none|
|segmentation_by|[InAppDetailMetricsSegmentation](#schemainappdetailmetricssegmentation)|false|none|An enumeration.|

<h2 id="tocS_ABTestDetailTotalMetricsCollection">ABTestDetailTotalMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemaabtestdetailtotalmetricscollection"></a>
<a id="schema_ABTestDetailTotalMetricsCollection"></a>
<a id="tocSabtestdetailtotalmetricscollection"></a>
<a id="tocsabtestdetailtotalmetricscollection"></a>

```json
{
  "ab_test": {
    "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
    "title": "string",
    "goal": "string",
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "created_at": "2019-08-24T14:15:22Z"
  },
  "state": "live",
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z",
  "metrics": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "paywall": {
        "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
        "title": "string",
        "use_paywall_builder": true,
        "use_paywall_builder_v4": true,
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "main_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        }
      },
      "weight": 0,
      "low_boundary": 0,
      "average_per_1000": 0,
      "upper_boundary": 0,
      "probability": 0
    }
  ],
  "predict": {
    "certainty": true,
    "probabilities": [
      {
        "property1": 0,
        "property2": 0
      }
    ]
  }
}

```

ABTestDetailTotalMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ab_test|[ABTest](#schemaabtest)|true|none|none|
|state|[ABTestState](#schemaabteststate)|true|none|An enumeration.|
|started_at|string(date-time)|false|none|none|
|stopped_at|string(date-time)|false|none|none|
|metrics|[[ABTestPaywallTotalMetrics](#schemaabtestpaywalltotalmetrics)]|true|none|none|
|predict|[ABPredict](#schemaabpredict)|false|none|none|

<h2 id="tocS_ABTestListMetrics">ABTestListMetrics</h2>
<!-- backwards compatibility -->
<a id="schemaabtestlistmetrics"></a>
<a id="schema_ABTestListMetrics"></a>
<a id="tocSabtestlistmetrics"></a>
<a id="tocsabtestlistmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "probability": 0,
      "weight": 0
    }
  ],
  "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
  "predict": {
    "certainty": true,
    "probabilities": [
      {
        "property1": 0,
        "property2": 0
      }
    ]
  }
}

```

ABTestListMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|items|[[ABTestPaywallListMetrics](#schemaabtestpaywalllistmetrics)]|true|none|none|
|ab_test_id|string(uuid)|true|none|none|
|predict|[ABPredict](#schemaabpredict)|false|none|none|

<h2 id="tocS_ABTestListMetricsCollection">ABTestListMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemaabtestlistmetricscollection"></a>
<a id="schema_ABTestListMetricsCollection"></a>
<a id="tocSabtestlistmetricscollection"></a>
<a id="tocsabtestlistmetricscollection"></a>

```json
{
  "data": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "probability": 0,
          "weight": 0
        }
      ],
      "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
      "predict": {
        "certainty": true,
        "probabilities": [
          {
            "property1": 0,
            "property2": 0
          }
        ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

ABTestListMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[ABTestListMetrics](#schemaabtestlistmetrics)]|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_ABTestMetrics">ABTestMetrics</h2>
<!-- backwards compatibility -->
<a id="schemaabtestmetrics"></a>
<a id="schema_ABTestMetrics"></a>
<a id="tocSabtestmetrics"></a>
<a id="tocsabtestmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "items": [
            {
              "revenue": 0,
              "proceeds": 0,
              "net_revenue": 0,
              "purchases": 0,
              "trials": 0,
              "trials_cancelled": 0,
              "refunds": 0,
              "unique_subscribers": 0,
              "unique_paid_subscribers": 0,
              "views": 0,
              "unique_profiles_views": 0,
              "in_current_state": true,
              "arppu": 0,
              "arpas": 0,
              "apppu": 0,
              "appas": 0,
              "conversion_rate_purchases": 0,
              "conversion_rate_trials": 0,
              "conversion_rate_refunds": 0,
              "conversion_rate_purchases_by_users": 0,
              "conversion_rate_trials_by_users": 0
            }
          ],
          "title": "string",
          "paywall": {
            "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
            "title": "string",
            "use_paywall_builder": true,
            "use_paywall_builder_v4": true,
            "screenshot": {
              "image_id": 0,
              "url": "http://example.com"
            },
            "builder_screenshot": {
              "image_id": 0,
              "url": "http://example.com"
            },
            "main_screenshot": {
              "image_id": 0,
              "url": "http://example.com"
            }
          },
          "values": [
            {
              "revenue": 0,
              "proceeds": 0,
              "net_revenue": 0,
              "purchases": 0,
              "trials": 0,
              "trials_cancelled": 0,
              "refunds": 0,
              "unique_subscribers": 0,
              "unique_paid_subscribers": 0,
              "views": 0,
              "unique_profiles_views": 0,
              "in_current_state": true,
              "arppu": 0,
              "arpas": 0,
              "apppu": 0,
              "appas": 0,
              "conversion_rate_purchases": 0,
              "conversion_rate_trials": 0,
              "conversion_rate_refunds": 0,
              "conversion_rate_purchases_by_users": 0,
              "conversion_rate_trials_by_users": 0,
              "period": "2019-08-24T14:15:22Z",
              "low_boundary": 0,
              "average_per_1000": 0,
              "upper_boundary": 0,
              "probability": 0
            }
          ],
          "weight": 0,
          "low_boundary": 0,
          "average_per_1000": 0,
          "upper_boundary": 0,
          "probability": 0
        }
      ],
      "paywalls_group": {
        "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
        "title": "string"
      }
    }
  ],
  "ab_test": {
    "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
    "title": "string",
    "goal": "string",
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "created_at": "2019-08-24T14:15:22Z"
  },
  "predict": {
    "certainty": true,
    "probabilities": [
      {
        "property1": 0,
        "property2": 0
      }
    ]
  },
  "content_type": "ab_test"
}

```

ABTestMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|items|[[PaywallsGroupMetrics](#schemapaywallsgroupmetrics)]|true|none|none|
|ab_test|[ABTest](#schemaabtest)|true|none|none|
|predict|[ABPredict](#schemaabpredict)|false|none|none|
|content_type|[PlacementAudienceContentType](#schemaplacementaudiencecontenttype)|false|none|An enumeration.|

<h2 id="tocS_ABTestPaywallData">ABTestPaywallData</h2>
<!-- backwards compatibility -->
<a id="schemaabtestpaywalldata"></a>
<a id="schema_ABTestPaywallData"></a>
<a id="tocSabtestpaywalldata"></a>
<a id="tocsabtestpaywalldata"></a>

```json
{
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "weight": 100
}

```

ABTestPaywallData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywall_id|string(uuid)|true|none|none|
|weight|integer|true|none|none|

<h2 id="tocS_ABTestPaywallListMetrics">ABTestPaywallListMetrics</h2>
<!-- backwards compatibility -->
<a id="schemaabtestpaywalllistmetrics"></a>
<a id="schema_ABTestPaywallListMetrics"></a>
<a id="tocSabtestpaywalllistmetrics"></a>
<a id="tocsabtestpaywalllistmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "probability": 0,
  "weight": 0
}

```

ABTestPaywallListMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|paywall_id|string(uuid)|true|none|none|
|probability|number|false|none|none|
|weight|integer|false|none|none|

<h2 id="tocS_ABTestPaywallMetrics">ABTestPaywallMetrics</h2>
<!-- backwards compatibility -->
<a id="schemaabtestpaywallmetrics"></a>
<a id="schema_ABTestPaywallMetrics"></a>
<a id="tocSabtestpaywallmetrics"></a>
<a id="tocsabtestpaywallmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0
    }
  ],
  "title": "string",
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "values": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "period": "2019-08-24T14:15:22Z",
      "low_boundary": 0,
      "average_per_1000": 0,
      "upper_boundary": 0,
      "probability": 0
    }
  ],
  "weight": 0,
  "low_boundary": 0,
  "average_per_1000": 0,
  "upper_boundary": 0,
  "probability": 0
}

```

ABTestPaywallMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|items|[[InAppMetrics](#schemainappmetrics)]|true|none|none|
|title|string|true|none|none|
|paywall|[Paywall](#schemapaywall)|true|none|none|
|values|[[ABTestPeriodMetrics](#schemaabtestperiodmetrics)]|true|none|none|
|weight|integer|true|none|none|
|low_boundary|number|false|none|none|
|average_per_1000|number|false|none|none|
|upper_boundary|number|false|none|none|
|probability|number|false|none|none|

<h2 id="tocS_ABTestPaywallTotalMetrics">ABTestPaywallTotalMetrics</h2>
<!-- backwards compatibility -->
<a id="schemaabtestpaywalltotalmetrics"></a>
<a id="schema_ABTestPaywallTotalMetrics"></a>
<a id="tocSabtestpaywalltotalmetrics"></a>
<a id="tocsabtestpaywalltotalmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "weight": 0,
  "low_boundary": 0,
  "average_per_1000": 0,
  "upper_boundary": 0,
  "probability": 0
}

```

ABTestPaywallTotalMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|paywall|[Paywall](#schemapaywall)|true|none|none|
|weight|integer|true|none|none|
|low_boundary|number|false|none|none|
|average_per_1000|number|false|none|none|
|upper_boundary|number|false|none|none|
|probability|number|false|none|none|

<h2 id="tocS_ABTestPaywallWeightAggregate">ABTestPaywallWeightAggregate</h2>
<!-- backwards compatibility -->
<a id="schemaabtestpaywallweightaggregate"></a>
<a id="schema_ABTestPaywallWeightAggregate"></a>
<a id="tocSabtestpaywallweightaggregate"></a>
<a id="tocsabtestpaywallweightaggregate"></a>

```json
{
  "paywall": {
    "paywall": {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "title": "string",
      "use_paywall_builder": true,
      "use_paywall_builder_v4": true,
      "screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "builder_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "main_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      }
    },
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "products": [
      {
        "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
        "title": "string",
        "product_set": "uncategorised",
        "offer": {
          "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
          "title": "string"
        },
        "ordering_index": 0
      }
    ]
  },
  "weight": 100,
  "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610"
}

```

ABTestPaywallWeightAggregate

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywall|[PaywallRelatedAggregate](#schemapaywallrelatedaggregate)|true|none|Difference with state of included pydantic fields.|
|weight|integer|true|none|none|
|paywalls_group_paywall_id|string(uuid)|false|none|none|

<h2 id="tocS_ABTestPeriodMetrics">ABTestPeriodMetrics</h2>
<!-- backwards compatibility -->
<a id="schemaabtestperiodmetrics"></a>
<a id="schema_ABTestPeriodMetrics"></a>
<a id="tocSabtestperiodmetrics"></a>
<a id="tocsabtestperiodmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "period": "2019-08-24T14:15:22Z",
  "low_boundary": 0,
  "average_per_1000": 0,
  "upper_boundary": 0,
  "probability": 0
}

```

ABTestPeriodMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|period|string(date-time)|true|none|none|
|low_boundary|number|true|none|none|
|average_per_1000|number|true|none|none|
|upper_boundary|number|true|none|none|
|probability|number|true|none|none|

<h2 id="tocS_ABTestResultState">ABTestResultState</h2>
<!-- backwards compatibility -->
<a id="schemaabtestresultstate"></a>
<a id="schema_ABTestResultState"></a>
<a id="tocSabtestresultstate"></a>
<a id="tocsabtestresultstate"></a>

```json
"Significant test result!"

```

ABTestResultState

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ABTestResultState|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ABTestResultState|Significant test result!|
|ABTestResultState|Insignificant test results.|

<h2 id="tocS_ABTestState">ABTestState</h2>
<!-- backwards compatibility -->
<a id="schemaabteststate"></a>
<a id="schema_ABTestState"></a>
<a id="tocSabteststate"></a>
<a id="tocsabteststate"></a>

```json
"live"

```

ABTestState

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ABTestState|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ABTestState|live|
|ABTestState|draft|
|ABTestState|archived|
|ABTestState|completed|
|ABTestState|inactive|

<h2 id="tocS_ABTestType">ABTestType</h2>
<!-- backwards compatibility -->
<a id="schemaabtesttype"></a>
<a id="schema_ABTestType"></a>
<a id="tocSabtesttype"></a>
<a id="tocsabtesttype"></a>

```json
"regular"

```

ABTestType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ABTestType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ABTestType|regular|
|ABTestType|userflow_parent|
|ABTestType|userflow_child|

<h2 id="tocS_ASACredentials">ASACredentials</h2>
<!-- backwards compatibility -->
<a id="schemaasacredentials"></a>
<a id="schema_ASACredentials"></a>
<a id="tocSasacredentials"></a>
<a id="tocsasacredentials"></a>

```json
{
  "private_key": "string",
  "public_key": "string",
  "team_id": "string",
  "client_id": "string",
  "key_id": "string",
  "save_asa_attribution": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|private_key|string¦null|false|write-only|none|
|public_key|string¦null|true|read-only|none|
|team_id|string¦null|false|none|none|
|client_id|string¦null|false|none|none|
|key_id|string¦null|false|none|none|
|save_asa_attribution|boolean|false|none|none|

<h2 id="tocS_AbTestDetailMetricsResponse">AbTestDetailMetricsResponse</h2>
<!-- backwards compatibility -->
<a id="schemaabtestdetailmetricsresponse"></a>
<a id="schema_AbTestDetailMetricsResponse"></a>
<a id="tocSabtestdetailmetricsresponse"></a>
<a id="tocsabtestdetailmetricsresponse"></a>

```json
{
  "data": {
    "ab_test": {
      "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
      "title": "string",
      "goal": "string",
      "paywalls_group": {
        "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
        "title": "string"
      },
      "created_at": "2019-08-24T14:15:22Z"
    },
    "state": "live",
    "placement": {
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
      "title": "string",
      "created_at": "2019-08-24T14:15:22Z"
    },
    "audience": {
      "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
      "title": "string",
      "is_default": true
    },
    "placement_audience_priority": 0,
    "started_at": "2019-08-24T14:15:22Z",
    "stopped_at": "2019-08-24T14:15:22Z",
    "metrics": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0,
        "items": [
          {
            "revenue": 0,
            "proceeds": 0,
            "net_revenue": 0,
            "purchases": 0,
            "trials": 0,
            "trials_cancelled": 0,
            "refunds": 0,
            "unique_subscribers": 0,
            "unique_paid_subscribers": 0,
            "views": 0,
            "unique_profiles_views": 0,
            "in_current_state": true,
            "arppu": 0,
            "arpas": 0,
            "apppu": 0,
            "appas": 0,
            "conversion_rate_purchases": 0,
            "conversion_rate_trials": 0,
            "conversion_rate_refunds": 0,
            "conversion_rate_purchases_by_users": 0,
            "conversion_rate_trials_by_users": 0
          }
        ],
        "title": "string",
        "paywall": {
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "title": "string",
          "use_paywall_builder": true,
          "use_paywall_builder_v4": true,
          "screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "builder_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "main_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          }
        },
        "values": [
          {
            "revenue": 0,
            "proceeds": 0,
            "net_revenue": 0,
            "purchases": 0,
            "trials": 0,
            "trials_cancelled": 0,
            "refunds": 0,
            "unique_subscribers": 0,
            "unique_paid_subscribers": 0,
            "views": 0,
            "unique_profiles_views": 0,
            "in_current_state": true,
            "arppu": 0,
            "arpas": 0,
            "apppu": 0,
            "appas": 0,
            "conversion_rate_purchases": 0,
            "conversion_rate_trials": 0,
            "conversion_rate_refunds": 0,
            "conversion_rate_purchases_by_users": 0,
            "conversion_rate_trials_by_users": 0,
            "period": "2019-08-24T14:15:22Z",
            "low_boundary": 0,
            "average_per_1000": 0,
            "upper_boundary": 0,
            "probability": 0
          }
        ],
        "weight": 0,
        "low_boundary": 0,
        "average_per_1000": 0,
        "upper_boundary": 0,
        "probability": 0
      }
    ],
    "predict": {
      "certainty": true,
      "probabilities": [
        {
          "property1": 0,
          "property2": 0
        }
      ]
    },
    "segmentation_by": "product"
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

AbTestDetailMetricsResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[ABTestDetailMetricsCollection](#schemaabtestdetailmetricscollection)|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_AbTestDetailTotalMetricsResponse">AbTestDetailTotalMetricsResponse</h2>
<!-- backwards compatibility -->
<a id="schemaabtestdetailtotalmetricsresponse"></a>
<a id="schema_AbTestDetailTotalMetricsResponse"></a>
<a id="tocSabtestdetailtotalmetricsresponse"></a>
<a id="tocsabtestdetailtotalmetricsresponse"></a>

```json
{
  "data": {
    "ab_test": {
      "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
      "title": "string",
      "goal": "string",
      "paywalls_group": {
        "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
        "title": "string"
      },
      "created_at": "2019-08-24T14:15:22Z"
    },
    "state": "live",
    "started_at": "2019-08-24T14:15:22Z",
    "stopped_at": "2019-08-24T14:15:22Z",
    "metrics": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0,
        "paywall": {
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "title": "string",
          "use_paywall_builder": true,
          "use_paywall_builder_v4": true,
          "screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "builder_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "main_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          }
        },
        "weight": 0,
        "low_boundary": 0,
        "average_per_1000": 0,
        "upper_boundary": 0,
        "probability": 0
      }
    ],
    "predict": {
      "certainty": true,
      "probabilities": [
        {
          "property1": 0,
          "property2": 0
        }
      ]
    }
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

AbTestDetailTotalMetricsResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[ABTestDetailTotalMetricsCollection](#schemaabtestdetailtotalmetricscollection)|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_AccountingType">AccountingType</h2>
<!-- backwards compatibility -->
<a id="schemaaccountingtype"></a>
<a id="schema_AccountingType"></a>
<a id="tocSaccountingtype"></a>
<a id="tocsaccountingtype"></a>

```json
"revenue"

```

AccountingType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|AccountingType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|AccountingType|revenue|
|AccountingType|proceeds|
|AccountingType|net_revenue|

<h2 id="tocS_AssetColor">AssetColor</h2>
<!-- backwards compatibility -->
<a id="schemaassetcolor"></a>
<a id="schema_AssetColor"></a>
<a id="tocSassetcolor"></a>
<a id="tocsassetcolor"></a>

```json
{
  "id": "string",
  "type": "color",
  "value": "string"
}

```

AssetColor

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|value|string|true|none|#RRGGBBAA or #RRGGBB|

#### Enumerated Values

|Property|Value|
|---|---|
|type|color|

<h2 id="tocS_AssetColorGradient">AssetColorGradient</h2>
<!-- backwards compatibility -->
<a id="schemaassetcolorgradient"></a>
<a id="schema_AssetColorGradient"></a>
<a id="tocSassetcolorgradient"></a>
<a id="tocsassetcolorgradient"></a>

```json
{
  "id": "string",
  "type": "linear-gradient",
  "values": [
    {
      "color": "string",
      "p": 0
    }
  ],
  "points": {
    "x0": 0,
    "y0": 0,
    "x1": 0,
    "y1": 0
  }
}

```

AssetColorGradient

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|values|[[GradientColorValue](#schemagradientcolorvalue)]|true|none|none|
|points|[Points](#schemapoints)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|linear-gradient|
|type|radial-gradient|
|type|conic-gradient|

<h2 id="tocS_AssetFont">AssetFont</h2>
<!-- backwards compatibility -->
<a id="schemaassetfont"></a>
<a id="schema_AssetFont"></a>
<a id="tocSassetfont"></a>
<a id="tocsassetfont"></a>

```json
{
  "id": "string",
  "type": "font",
  "value": "string",
  "resources": [
    "string"
  ],
  "family_name": "string",
  "weight": 0,
  "italic": false,
  "size": 0,
  "color": "string",
  "horizontal_align": "left"
}

```

AssetFont

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|value|string|true|none|none|
|resources|[string]|false|none|none|
|family_name|string|false|none|none|
|weight|integer|false|none|none|
|italic|boolean|false|none|none|
|size|number|false|none|none|
|color|string|false|none|none|
|horizontal_align|[HorizontalAlign](#schemahorizontalalign)|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|type|font|

<h2 id="tocS_AssetImage">AssetImage</h2>
<!-- backwards compatibility -->
<a id="schemaassetimage"></a>
<a id="schema_AssetImage"></a>
<a id="tocSassetimage"></a>
<a id="tocsassetimage"></a>

```json
{
  "id": "string",
  "type": "image",
  "preview_value": "iVBORw0KGgoAAAANSUhEUgAAAHgAAA",
  "url": "http://example.com",
  "media_id": 0
}

```

AssetImage

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|preview_value|string|false|none|none|
|url|string(uri)|false|none|none|
|media_id|integer|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|image|

<h2 id="tocS_AssetsColor">AssetsColor</h2>
<!-- backwards compatibility -->
<a id="schemaassetscolor"></a>
<a id="schema_AssetsColor"></a>
<a id="tocSassetscolor"></a>
<a id="tocsassetscolor"></a>

```json
{
  "id": "string",
  "type": "color",
  "value": "string"
}

```

AssetsColor

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|value|string|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|color|

<h2 id="tocS_AssetsColorGradient">AssetsColorGradient</h2>
<!-- backwards compatibility -->
<a id="schemaassetscolorgradient"></a>
<a id="schema_AssetsColorGradient"></a>
<a id="tocSassetscolorgradient"></a>
<a id="tocsassetscolorgradient"></a>

```json
{
  "id": "string",
  "type": "linear-gradient",
  "values": [
    {
      "color": "string",
      "p": 0
    }
  ],
  "points": {
    "x0": 0,
    "y0": 0,
    "x1": 0,
    "y1": 0
  }
}

```

AssetsColorGradient

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|values|[[AssetsColorGradientPoint](#schemaassetscolorgradientpoint)]|true|none|none|
|points|[AssetsColorGradientPoints](#schemaassetscolorgradientpoints)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|linear-gradient|
|type|radial-gradient|
|type|conic-gradient|

<h2 id="tocS_AssetsColorGradientPoint">AssetsColorGradientPoint</h2>
<!-- backwards compatibility -->
<a id="schemaassetscolorgradientpoint"></a>
<a id="schema_AssetsColorGradientPoint"></a>
<a id="tocSassetscolorgradientpoint"></a>
<a id="tocsassetscolorgradientpoint"></a>

```json
{
  "color": "string",
  "p": 0
}

```

AssetsColorGradientPoint

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|color|string|true|none|none|
|p|number|true|none|none|

<h2 id="tocS_AssetsColorGradientPoints">AssetsColorGradientPoints</h2>
<!-- backwards compatibility -->
<a id="schemaassetscolorgradientpoints"></a>
<a id="schema_AssetsColorGradientPoints"></a>
<a id="tocSassetscolorgradientpoints"></a>
<a id="tocsassetscolorgradientpoints"></a>

```json
{
  "x0": 0,
  "y0": 0,
  "x1": 0,
  "y1": 0
}

```

AssetsColorGradientPoints

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|x0|number|true|none|none|
|y0|number|true|none|none|
|x1|number|true|none|none|
|y1|number|true|none|none|

<h2 id="tocS_AssetsFont">AssetsFont</h2>
<!-- backwards compatibility -->
<a id="schemaassetsfont"></a>
<a id="schema_AssetsFont"></a>
<a id="tocSassetsfont"></a>
<a id="tocsassetsfont"></a>

```json
{
  "id": "string",
  "type": "font",
  "value": "string",
  "resources": [
    "string"
  ],
  "family_name": "adapty_system",
  "weight": 400,
  "italic": true,
  "size": 15,
  "color": "#000000FF"
}

```

AssetsFont

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|value|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|resources|[string]|false|none|none|
|family_name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|weight|integer|false|none|none|
|italic|boolean|false|none|none|
|size|number|false|none|none|
|color|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|font|

<h2 id="tocS_AssetsImage">AssetsImage</h2>
<!-- backwards compatibility -->
<a id="schemaassetsimage"></a>
<a id="schema_AssetsImage"></a>
<a id="tocSassetsimage"></a>
<a id="tocsassetsimage"></a>

```json
{
  "id": "string",
  "type": "image",
  "value": "string",
  "url": "http://example.com"
}

```

AssetsImage

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|value|string|false|none|none|
|url|string(uri)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|image|

<h2 id="tocS_AssetsImageUrl">AssetsImageUrl</h2>
<!-- backwards compatibility -->
<a id="schemaassetsimageurl"></a>
<a id="schema_AssetsImageUrl"></a>
<a id="tocSassetsimageurl"></a>
<a id="tocsassetsimageurl"></a>

```json
{
  "url": "http://example.com",
  "preview_value": "string"
}

```

AssetsImageUrl

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|url|string(uri)|true|none|none|
|preview_value|string|true|none|none|

<h2 id="tocS_AssetsImageValue">AssetsImageValue</h2>
<!-- backwards compatibility -->
<a id="schemaassetsimagevalue"></a>
<a id="schema_AssetsImageValue"></a>
<a id="tocSassetsimagevalue"></a>
<a id="tocsassetsimagevalue"></a>

```json
{
  "value": "string"
}

```

AssetsImageValue

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|value|string|true|none|none|

<h2 id="tocS_AssetsVideo">AssetsVideo</h2>
<!-- backwards compatibility -->
<a id="schemaassetsvideo"></a>
<a id="schema_AssetsVideo"></a>
<a id="tocSassetsvideo"></a>
<a id="tocsassetsvideo"></a>

```json
{
  "id": "string",
  "type": "video",
  "url": "http://example.com",
  "image": {
    "value": "string"
  }
}

```

AssetsVideo

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|url|string(uri)|true|none|none|
|image|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsImageValue](#schemaassetsimagevalue)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsImageUrl](#schemaassetsimageurl)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|video|

<h2 id="tocS_AttributionDataCustomerUserId">AttributionDataCustomerUserId</h2>
<!-- backwards compatibility -->
<a id="schemaattributiondatacustomeruserid"></a>
<a id="schema_AttributionDataCustomerUserId"></a>
<a id="tocSattributiondatacustomeruserid"></a>
<a id="tocsattributiondatacustomeruserid"></a>

```json
{
  "status": "organic",
  "attribution_user_id": "string",
  "channel": "string",
  "campaign": "string",
  "ad_group": "string",
  "ad_set": "string",
  "creative": "string",
  "customer_user_id": "string"
}

```

AttributionDataCustomerUserId

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|[AttributionStatus](#schemaattributionstatus)|true|none|An enumeration.|
|attribution_user_id|string|false|none|none|
|channel|string|false|none|none|
|campaign|string|false|none|none|
|ad_group|string|false|none|none|
|ad_set|string|false|none|none|
|creative|string|false|none|none|
|customer_user_id|string|true|none|none|

<h2 id="tocS_AttributionDataProfileId">AttributionDataProfileId</h2>
<!-- backwards compatibility -->
<a id="schemaattributiondataprofileid"></a>
<a id="schema_AttributionDataProfileId"></a>
<a id="tocSattributiondataprofileid"></a>
<a id="tocsattributiondataprofileid"></a>

```json
{
  "status": "organic",
  "attribution_user_id": "string",
  "channel": "string",
  "campaign": "string",
  "ad_group": "string",
  "ad_set": "string",
  "creative": "string",
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8"
}

```

AttributionDataProfileId

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|[AttributionStatus](#schemaattributionstatus)|true|none|An enumeration.|
|attribution_user_id|string|false|none|none|
|channel|string|false|none|none|
|campaign|string|false|none|none|
|ad_group|string|false|none|none|
|ad_set|string|false|none|none|
|creative|string|false|none|none|
|profile_id|string(uuid)|true|none|none|

<h2 id="tocS_AttributionRequestData">AttributionRequestData</h2>
<!-- backwards compatibility -->
<a id="schemaattributionrequestdata"></a>
<a id="schema_AttributionRequestData"></a>
<a id="tocSattributionrequestdata"></a>
<a id="tocsattributionrequestdata"></a>

```json
{
  "status": "organic",
  "attribution_user_id": "string",
  "channel": "string",
  "campaign": "string",
  "ad_group": "string",
  "ad_set": "string",
  "creative": "string",
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8"
}

```

AttributionRequestData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|AttributionRequestData|any|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[AttributionDataProfileId](#schemaattributiondataprofileid)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[AttributionDataCustomerUserId](#schemaattributiondatacustomeruserid)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_AttributionStatus">AttributionStatus</h2>
<!-- backwards compatibility -->
<a id="schemaattributionstatus"></a>
<a id="schema_AttributionStatus"></a>
<a id="tocSattributionstatus"></a>
<a id="tocsattributionstatus"></a>

```json
"organic"

```

AttributionStatus

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|AttributionStatus|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|AttributionStatus|organic|
|AttributionStatus|non_organic|
|AttributionStatus|unknown|

<h2 id="tocS_Audience">Audience</h2>
<!-- backwards compatibility -->
<a id="schemaaudience"></a>
<a id="schema_Audience"></a>
<a id="tocSaudience"></a>
<a id="tocsaudience"></a>

```json
{
  "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
  "title": "string",
  "is_default": true
}

```

Audience

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|audience_id|string(uuid)|true|none|none|
|title|string|true|none|none|
|is_default|boolean|true|none|none|

<h2 id="tocS_AudienceBasedDetailMetrics">AudienceBasedDetailMetrics</h2>
<!-- backwards compatibility -->
<a id="schemaaudiencebaseddetailmetrics"></a>
<a id="schema_AudienceBasedDetailMetrics"></a>
<a id="tocSaudiencebaseddetailmetrics"></a>
<a id="tocsaudiencebaseddetailmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "items": [
            {
              "revenue": 0,
              "proceeds": 0,
              "net_revenue": 0,
              "purchases": 0,
              "trials": 0,
              "trials_cancelled": 0,
              "refunds": 0,
              "unique_subscribers": 0,
              "unique_paid_subscribers": 0,
              "views": 0,
              "unique_profiles_views": 0,
              "in_current_state": true,
              "arppu": 0,
              "arpas": 0,
              "apppu": 0,
              "appas": 0,
              "conversion_rate_purchases": 0,
              "conversion_rate_trials": 0,
              "conversion_rate_refunds": 0,
              "conversion_rate_purchases_by_users": 0,
              "conversion_rate_trials_by_users": 0,
              "items": [
                {
                  "revenue": 0,
                  "proceeds": 0,
                  "net_revenue": 0,
                  "purchases": 0,
                  "trials": 0,
                  "trials_cancelled": 0,
                  "refunds": 0,
                  "unique_subscribers": 0,
                  "unique_paid_subscribers": 0,
                  "views": 0,
                  "unique_profiles_views": 0,
                  "in_current_state": true,
                  "arppu": 0,
                  "arpas": 0,
                  "apppu": 0,
                  "appas": 0,
                  "conversion_rate_purchases": 0,
                  "conversion_rate_trials": 0,
                  "conversion_rate_refunds": 0,
                  "conversion_rate_purchases_by_users": 0,
                  "conversion_rate_trials_by_users": 0
                }
              ],
              "title": "string",
              "paywall": {
                "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
                "title": "string",
                "use_paywall_builder": true,
                "use_paywall_builder_v4": true,
                "screenshot": {
                  "image_id": 0,
                  "url": "http://example.com"
                },
                "builder_screenshot": {
                  "image_id": 0,
                  "url": "http://example.com"
                },
                "main_screenshot": {
                  "image_id": 0,
                  "url": "http://example.com"
                }
              },
              "values": [
                {
                  "revenue": 0,
                  "proceeds": 0,
                  "net_revenue": 0,
                  "purchases": 0,
                  "trials": 0,
                  "trials_cancelled": 0,
                  "refunds": 0,
                  "unique_subscribers": 0,
                  "unique_paid_subscribers": 0,
                  "views": 0,
                  "unique_profiles_views": 0,
                  "in_current_state": true,
                  "arppu": 0,
                  "arpas": 0,
                  "apppu": 0,
                  "appas": 0,
                  "conversion_rate_purchases": 0,
                  "conversion_rate_trials": 0,
                  "conversion_rate_refunds": 0,
                  "conversion_rate_purchases_by_users": 0,
                  "conversion_rate_trials_by_users": 0,
                  "period": "2019-08-24T14:15:22Z",
                  "low_boundary": 0,
                  "average_per_1000": 0,
                  "upper_boundary": 0,
                  "probability": 0
                }
              ],
              "weight": 0,
              "low_boundary": 0,
              "average_per_1000": 0,
              "upper_boundary": 0,
              "probability": 0
            }
          ],
          "paywalls_group": {
            "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
            "title": "string"
          }
        }
      ],
      "ab_test": {
        "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
        "title": "string",
        "goal": "string",
        "paywalls_group": {
          "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
          "title": "string"
        },
        "created_at": "2019-08-24T14:15:22Z"
      },
      "predict": {
        "certainty": true,
        "probabilities": [
          {
            "property1": 0,
            "property2": 0
          }
        ]
      },
      "content_type": "ab_test"
    }
  ],
  "audience": {
    "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
    "title": "string",
    "is_default": true
  },
  "title": "string"
}

```

AudienceBasedDetailMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|items|[anyOf]|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ABTestMetrics](#schemaabtestmetrics)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PaywallMetrics](#schemapaywallmetrics)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|audience|[Audience](#schemaaudience)|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_BaseModel">BaseModel</h2>
<!-- backwards compatibility -->
<a id="schemabasemodel"></a>
<a id="schema_BaseModel"></a>
<a id="tocSbasemodel"></a>
<a id="tocsbasemodel"></a>

```json
{}

```

BaseModel

### Properties

*None*

<h2 id="tocS_Button">Button</h2>
<!-- backwards compatibility -->
<a id="schemabutton"></a>
<a id="schema_Button"></a>
<a id="tocSbutton"></a>
<a id="tocsbutton"></a>

```json
{
  "shape": {
    "background": "string",
    "rect_corner_radius": 0,
    "border": "string",
    "thickness": 0,
    "type": "color",
    "value": "circle"
  },
  "title": {
    "size": 0,
    "color": "string",
    "horizontal_align": "left",
    "font": "string",
    "bullet_space": 0,
    "items": [
      {
        "string_id": "string",
        "font": "string",
        "size": 0,
        "color": "string",
        "horizontal_align": "left",
        "bullet": false
      }
    ]
  },
  "selected_shape": {
    "background": "string",
    "rect_corner_radius": 0,
    "border": "string",
    "thickness": 0,
    "type": "color",
    "value": "circle"
  },
  "selected_title": {
    "size": 0,
    "color": "string",
    "horizontal_align": "left",
    "font": "string",
    "bullet_space": 0,
    "items": [
      {
        "string_id": "string",
        "font": "string",
        "size": 0,
        "color": "string",
        "horizontal_align": "left",
        "bullet": false
      }
    ]
  },
  "align": "leading",
  "action": {
    "type": "color",
    "url": "string"
  }
}

```

Button

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|shape|[Shape](#schemashape)|false|none|none|
|title|[Text](#schematext)|false|none|none|
|selected_shape|[Shape](#schemashape)|false|none|none|
|selected_title|[Text](#schematext)|false|none|none|
|align|[ButtonAlign](#schemabuttonalign)|false|none|An enumeration.|
|action|[ButtonAction](#schemabuttonaction)|false|none|none|

<h2 id="tocS_ButtonAction">ButtonAction</h2>
<!-- backwards compatibility -->
<a id="schemabuttonaction"></a>
<a id="schema_ButtonAction"></a>
<a id="tocSbuttonaction"></a>
<a id="tocsbuttonaction"></a>

```json
{
  "type": "color",
  "url": "string"
}

```

ButtonAction

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ButtonAction|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ButtonActionItem1](#schemabuttonactionitem1)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ButtonActionItem2](#schemabuttonactionitem2)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ButtonActionItem3](#schemabuttonactionitem3)|false|none|none|

<h2 id="tocS_ButtonActionItem1">ButtonActionItem1</h2>
<!-- backwards compatibility -->
<a id="schemabuttonactionitem1"></a>
<a id="schema_ButtonActionItem1"></a>
<a id="tocSbuttonactionitem1"></a>
<a id="tocsbuttonactionitem1"></a>

```json
{
  "type": "color",
  "url": "string"
}

```

ButtonActionItem1

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|[Type](#schematype)|true|none|An enumeration.|
|url|string|true|none|none|

<h2 id="tocS_ButtonActionItem2">ButtonActionItem2</h2>
<!-- backwards compatibility -->
<a id="schemabuttonactionitem2"></a>
<a id="schema_ButtonActionItem2"></a>
<a id="tocSbuttonactionitem2"></a>
<a id="tocsbuttonactionitem2"></a>

```json
{
  "type": "color",
  "custom_id": "string"
}

```

ButtonActionItem2

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|[Type](#schematype)|true|none|An enumeration.|
|custom_id|string|true|none|none|

<h2 id="tocS_ButtonActionItem3">ButtonActionItem3</h2>
<!-- backwards compatibility -->
<a id="schemabuttonactionitem3"></a>
<a id="schema_ButtonActionItem3"></a>
<a id="tocSbuttonactionitem3"></a>
<a id="tocsbuttonactionitem3"></a>

```json
{
  "type": "color"
}

```

ButtonActionItem3

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|[Type](#schematype)|true|none|An enumeration.|

<h2 id="tocS_ButtonAlign">ButtonAlign</h2>
<!-- backwards compatibility -->
<a id="schemabuttonalign"></a>
<a id="schema_ButtonAlign"></a>
<a id="tocSbuttonalign"></a>
<a id="tocsbuttonalign"></a>

```json
"leading"

```

ButtonAlign

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ButtonAlign|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ButtonAlign|leading|
|ButtonAlign|trailing|
|ButtonAlign|center|
|ButtonAlign|fill|

<h2 id="tocS_CancellationReason">CancellationReason</h2>
<!-- backwards compatibility -->
<a id="schemacancellationreason"></a>
<a id="schema_CancellationReason"></a>
<a id="tocScancellationreason"></a>
<a id="tocscancellationreason"></a>

```json
"billing_error"

```

CancellationReason

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|CancellationReason|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|CancellationReason|billing_error|
|CancellationReason|cancelled_by_developer|
|CancellationReason|new_subscription_replace|
|CancellationReason|price_increase|
|CancellationReason|product_was_not_available|
|CancellationReason|refund|
|CancellationReason|unknown|
|CancellationReason|upgraded|
|CancellationReason|voluntarily_cancelled|
|CancellationReason|adapty_revoked|

<h2 id="tocS_ChartDashboardMetricsConditions">ChartDashboardMetricsConditions</h2>
<!-- backwards compatibility -->
<a id="schemachartdashboardmetricsconditions"></a>
<a id="schema_ChartDashboardMetricsConditions"></a>
<a id="tocSchartdashboardmetricsconditions"></a>
<a id="tocschartdashboardmetricsconditions"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_type": [
      "free_trial"
    ],
    "offer_category": [
      "no_offer"
    ],
    "offer_id": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation_by": "app_id",
  "metrics_types": [
    "revenue"
  ]
}

```

ChartDashboardMetricsConditions

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[MetricsFilters](#schemametricsfilters)|true|none|none|
|period_unit|[PeriodUnit](#schemaperiodunit)|false|none|An enumeration.|
|date_type|[DateType](#schemadatetype)|false|none|An enumeration.|
|segmentation_by|[ChartMetricsSegmentation](#schemachartmetricssegmentation)|false|none|An enumeration.|
|metrics_types|[[ChartMetricsType](#schemachartmetricstype)]|true|none|[An enumeration.]|

<h2 id="tocS_ChartFilters">ChartFilters</h2>
<!-- backwards compatibility -->
<a id="schemachartfilters"></a>
<a id="schema_ChartFilters"></a>
<a id="tocSchartfilters"></a>
<a id="tocschartfilters"></a>

```json
{
  "date": [
    "2019-08-24",
    "2019-08-24"
  ],
  "compare_date": [
    "2019-08-24",
    "2019-08-24"
  ],
  "store": [
    "string"
  ],
  "purchase_container_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "audience_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "paywall_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "placement_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "paywalls_group_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "placement_audience_version_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "segment_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "country": [
    "string"
  ],
  "store_product_id": [
    "string"
  ],
  "duration": [
    "string"
  ],
  "attribution_source": [
    "string"
  ],
  "attribution_status": [
    "organic"
  ],
  "attribution_channel": [
    "string"
  ],
  "attribution_campaign": [
    "string"
  ],
  "attribution_adgroup": [
    "string"
  ],
  "attribution_adset": [
    "string"
  ],
  "attribution_creative": [
    "string"
  ],
  "offer_category": [
    "string"
  ],
  "offer_type": [
    "string"
  ],
  "offer_id": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|date|[string]|true|none|none|
|compare_date|[string]¦null|false|none|none|
|store|[string]|false|none|none|
|purchase_container_id|[string]|false|none|none|
|audience_id|[string]|false|none|none|
|paywall_id|[string]|false|none|none|
|placement_id|[string]|false|none|none|
|paywalls_group_id|[string]|false|none|none|
|placement_audience_version_id|[string]|false|none|none|
|segment_id|[string]|false|none|none|
|country|[string]|false|none|none|
|store_product_id|[string]|false|none|none|
|duration|[string]|false|none|none|
|attribution_source|[string]|false|none|none|
|attribution_status|[string]|false|none|none|
|attribution_channel|[string]|false|none|none|
|attribution_campaign|[string]|false|none|none|
|attribution_adgroup|[string]|false|none|none|
|attribution_adset|[string]|false|none|none|
|attribution_creative|[string]|false|none|none|
|offer_category|[string]|false|none|none|
|offer_type|[string]|false|none|none|
|offer_id|[string]|false|none|none|

<h2 id="tocS_ChartMetricsConditions">ChartMetricsConditions</h2>
<!-- backwards compatibility -->
<a id="schemachartmetricsconditions"></a>
<a id="schema_ChartMetricsConditions"></a>
<a id="tocSchartmetricsconditions"></a>
<a id="tocschartmetricsconditions"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_type": [
      "free_trial"
    ],
    "offer_category": [
      "no_offer"
    ],
    "offer_id": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation_by": "app_id"
}

```

ChartMetricsConditions

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[MetricsFilters](#schemametricsfilters)|true|none|none|
|period_unit|[PeriodUnit](#schemaperiodunit)|false|none|An enumeration.|
|date_type|[DateType](#schemadatetype)|false|none|An enumeration.|
|segmentation_by|[ChartMetricsSegmentation](#schemachartmetricssegmentation)|false|none|An enumeration.|

<h2 id="tocS_ChartMetricsSegmentation">ChartMetricsSegmentation</h2>
<!-- backwards compatibility -->
<a id="schemachartmetricssegmentation"></a>
<a id="schema_ChartMetricsSegmentation"></a>
<a id="tocSchartmetricssegmentation"></a>
<a id="tocschartmetricssegmentation"></a>

```json
"app_id"

```

ChartMetricsSegmentation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ChartMetricsSegmentation|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ChartMetricsSegmentation|app_id|
|ChartMetricsSegmentation|period|
|ChartMetricsSegmentation|renewal_status|
|ChartMetricsSegmentation|cancellation_reason|
|ChartMetricsSegmentation|store_product_id|
|ChartMetricsSegmentation|country|
|ChartMetricsSegmentation|store|
|ChartMetricsSegmentation|purchase_container_id|
|ChartMetricsSegmentation|paywall_id|
|ChartMetricsSegmentation|audience_id|
|ChartMetricsSegmentation|placement_id|
|ChartMetricsSegmentation|attribution_source|
|ChartMetricsSegmentation|attribution_status|
|ChartMetricsSegmentation|attribution_channel|
|ChartMetricsSegmentation|attribution_campaign|
|ChartMetricsSegmentation|attribution_adgroup|
|ChartMetricsSegmentation|attribution_adset|
|ChartMetricsSegmentation|attribution_creative|
|ChartMetricsSegmentation|duration|
|ChartMetricsSegmentation|offer_category|
|ChartMetricsSegmentation|offer_type|
|ChartMetricsSegmentation|offer_id|
|ChartMetricsSegmentation|default|

<h2 id="tocS_ChartMetricsType">ChartMetricsType</h2>
<!-- backwards compatibility -->
<a id="schemachartmetricstype"></a>
<a id="schema_ChartMetricsType"></a>
<a id="tocSchartmetricstype"></a>
<a id="tocschartmetricstype"></a>

```json
"revenue"

```

ChartMetricsType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ChartMetricsType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ChartMetricsType|revenue|
|ChartMetricsType|mrr|
|ChartMetricsType|arr|
|ChartMetricsType|arppu|
|ChartMetricsType|arpas|
|ChartMetricsType|subscriptions_active|
|ChartMetricsType|subscriptions_new|
|ChartMetricsType|subscriptions_renewal_cancelled|
|ChartMetricsType|subscriptions_expired|
|ChartMetricsType|trials_active|
|ChartMetricsType|trials_new|
|ChartMetricsType|trials_renewal_cancelled|
|ChartMetricsType|trials_expired|
|ChartMetricsType|grace_period|
|ChartMetricsType|billing_issue|
|ChartMetricsType|refund_events|
|ChartMetricsType|refund_money|
|ChartMetricsType|refund_rate|
|ChartMetricsType|arpu|
|ChartMetricsType|installs|
|ChartMetricsType|funnel|
|ChartMetricsType|retention|
|ChartMetricsType|non_subscriptions|
|ChartMetricsType|ltv|
|ChartMetricsType|unique_subscribers|
|ChartMetricsType|unique_paid_subscribers|
|ChartMetricsType|purchases|
|ChartMetricsType|install_paid|
|ChartMetricsType|install_trial|
|ChartMetricsType|trial_paid|
|ChartMetricsType|from_paid_to_2_period_conversion|
|ChartMetricsType|from_2_period_to_3_period_conversion|
|ChartMetricsType|from_3_period_to_4_period_conversion|
|ChartMetricsType|from_4_period_to_5_period_conversion|
|ChartMetricsType|from_paid_to_6_months_conversion|
|ChartMetricsType|from_paid_to_12_months_conversion|
|ChartMetricsType|from_paid_to_24_months_conversion|

<h2 id="tocS_CohortMetricsConditions">CohortMetricsConditions</h2>
<!-- backwards compatibility -->
<a id="schemacohortmetricsconditions"></a>
<a id="schema_CohortMetricsConditions"></a>
<a id="tocScohortmetricsconditions"></a>
<a id="tocscohortmetricsconditions"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_type": [
      "free_trial"
    ],
    "offer_category": [
      "no_offer"
    ],
    "offer_id": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "period_type": "renewals",
  "value_type": "absolute",
  "value_field": "revenue",
  "accounting_type": "revenue",
  "renewal_days": [
    0
  ],
  "format": "json",
  "prediction_months": 12
}

```

CohortMetricsConditions

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[MetricsFilters](#schemametricsfilters)|true|none|none|
|period_unit|[PeriodUnit](#schemaperiodunit)|false|none|An enumeration.|
|period_type|[RenewalPeriodType](#schemarenewalperiodtype)|false|none|An enumeration.|
|value_type|[CohortValueType](#schemacohortvaluetype)|false|none|An enumeration.|
|value_field|[CohortValueField](#schemacohortvaluefield)|false|none|An enumeration.|
|accounting_type|[AccountingType](#schemaaccountingtype)|false|none|An enumeration.|
|renewal_days|[integer]|false|none|none|
|format|[MetricsFormat](#schemametricsformat)|false|none|An enumeration.|
|prediction_months|[PredictionMonths](#schemapredictionmonths)|false|none|An enumeration.|

<h2 id="tocS_CohortValueField">CohortValueField</h2>
<!-- backwards compatibility -->
<a id="schemacohortvaluefield"></a>
<a id="schema_CohortValueField"></a>
<a id="tocScohortvaluefield"></a>
<a id="tocscohortvaluefield"></a>

```json
"revenue"

```

CohortValueField

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|CohortValueField|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|CohortValueField|revenue|
|CohortValueField|arppu|
|CohortValueField|arpu|
|CohortValueField|arpas|
|CohortValueField|subscribers|
|CohortValueField|subscriptions|

<h2 id="tocS_CohortValueType">CohortValueType</h2>
<!-- backwards compatibility -->
<a id="schemacohortvaluetype"></a>
<a id="schema_CohortValueType"></a>
<a id="tocScohortvaluetype"></a>
<a id="tocscohortvaluetype"></a>

```json
"absolute"

```

CohortValueType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|CohortValueType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|CohortValueType|absolute|
|CohortValueType|relative|

<h2 id="tocS_ConversionsMetricsRequest">ConversionsMetricsRequest</h2>
<!-- backwards compatibility -->
<a id="schemaconversionsmetricsrequest"></a>
<a id="schema_ConversionsMetricsRequest"></a>
<a id="tocSconversionsmetricsrequest"></a>
<a id="tocsconversionsmetricsrequest"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "store": [
      "string"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "segment_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "string"
    ],
    "store_product_id": [
      "string"
    ],
    "duration": [
      "string"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "organic"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_category": [
      "string"
    ],
    "offer_type": [
      "string"
    ],
    "offer_id": [
      "string"
    ]
  },
  "segmentation": "period",
  "from_period": 0,
  "to_period": "string",
  "period_unit": "day"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[ChartFilters](#schemachartfilters)|true|none|none|
|segmentation|string|false|none|* `period` - Period * `renewal_status` - Renewal status * `cancellation_reason` - Cancellation reason * `store_product_id` - Store product id * `country` - Country * `store` - Store * `purchase_container_id` - Purchase container id * `paywall_id` - Paywall id * `audience_id` - Audience id * `placement_id` - Placement id * `attribution_source` - Attribution source * `attribution_status` - Attribution status * `attribution_channel` - Attribution channel * `attribution_campaign` - Attribution campaign * `attribution_adgroup` - Attribution adgroup * `attribution_adset` - Attribution adset * `attribution_creative` - Attribution creative * `duration` - Duration * `offer_category` - Offer category * `offer_type` - Offer type * `offer_id` - Offer id * `day` - Day * `week` - Week * `month` - Month * `year` - Year|
|from_period|integer¦null|false|none|null - from install;             0 - from trial;             1, 2, 3, 4, ... - from period.|
|to_period|string|true|none|0 - to trial;         1, 2, 3, 4, ... - to period;         6+, 12+, 24+, ... - to 6+ months and etc|
|period_unit|string|false|none|* `day` - Day * `week` - Week * `month` - Month * `quarter` - Quarter * `year` - Year * `none` - None|

#### Enumerated Values

|Property|Value|
|---|---|
|segmentation|period|
|segmentation|renewal_status|
|segmentation|cancellation_reason|
|segmentation|store_product_id|
|segmentation|country|
|segmentation|store|
|segmentation|purchase_container_id|
|segmentation|paywall_id|
|segmentation|audience_id|
|segmentation|placement_id|
|segmentation|attribution_source|
|segmentation|attribution_status|
|segmentation|attribution_channel|
|segmentation|attribution_campaign|
|segmentation|attribution_adgroup|
|segmentation|attribution_adset|
|segmentation|attribution_creative|
|segmentation|duration|
|segmentation|offer_category|
|segmentation|offer_type|
|segmentation|offer_id|
|segmentation|day|
|segmentation|week|
|segmentation|month|
|segmentation|year|
|period_unit|day|
|period_unit|week|
|period_unit|month|
|period_unit|quarter|
|period_unit|year|
|period_unit|none|

<h2 id="tocS_CornerRadius">CornerRadius</h2>
<!-- backwards compatibility -->
<a id="schemacornerradius"></a>
<a id="schema_CornerRadius"></a>
<a id="tocScornerradius"></a>
<a id="tocscornerradius"></a>

```json
{
  "tl": 0,
  "tr": 0,
  "br": 0,
  "bl": 0
}

```

CornerRadius

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tl|number|false|none|none|
|tr|number|false|none|none|
|br|number|false|none|none|
|bl|number|false|none|none|

<h2 id="tocS_CustomAttribute">CustomAttribute</h2>
<!-- backwards compatibility -->
<a id="schemacustomattribute"></a>
<a id="schema_CustomAttribute"></a>
<a id="tocScustomattribute"></a>
<a id="tocscustomattribute"></a>

```json
{
  "key": "string",
  "value": 0
}

```

CustomAttribute

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|key|string|true|none|none|
|value|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

<h2 id="tocS_CustomObject">CustomObject</h2>
<!-- backwards compatibility -->
<a id="schemacustomobject"></a>
<a id="schema_CustomObject"></a>
<a id="tocScustomobject"></a>
<a id="tocscustomobject"></a>

```json
{
  "type": "string"
}

```

CustomObject

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|none|

<h2 id="tocS_CustomStore">CustomStore</h2>
<!-- backwards compatibility -->
<a id="schemacustomstore"></a>
<a id="schema_CustomStore"></a>
<a id="tocScustomstore"></a>
<a id="tocscustomstore"></a>

```json
{
  "custom_store_id": "576656a6-4771-445d-b74a-98f7826a89b5",
  "value": "string",
  "name": "string",
  "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
  "is_deleted": false
}

```

CustomStore

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|custom_store_id|string(uuid)|false|none|none|
|value|string|true|none|none|
|name|string|true|none|A string containing only alphanumeric characters (both lowercase and uppercase), underscores (_), hyphens (-), and points without any whitespace before, after, or inside the string|
|app_id|string(uuid)|true|none|none|
|is_deleted|boolean|false|none|none|

<h2 id="tocS_CustomStoreDTO">CustomStoreDTO</h2>
<!-- backwards compatibility -->
<a id="schemacustomstoredto"></a>
<a id="schema_CustomStoreDTO"></a>
<a id="tocScustomstoredto"></a>
<a id="tocscustomstoredto"></a>

```json
{
  "value": "string",
  "name": "string"
}

```

CustomStoreDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|value|string|true|none|Custom store value. Cannot be any of (adapty, app_store, play_store, stripe)|
|name|string|true|none|A string containing only alphanumeric characters (both lowercase and uppercase), underscores (_), hyphens (-), and points without any whitespace before, after, or inside the string|

<h2 id="tocS_CustomStoreRequest">CustomStoreRequest</h2>
<!-- backwards compatibility -->
<a id="schemacustomstorerequest"></a>
<a id="schema_CustomStoreRequest"></a>
<a id="tocScustomstorerequest"></a>
<a id="tocscustomstorerequest"></a>

```json
{
  "data": {
    "value": "string",
    "name": "string"
  }
}

```

CustomStoreRequest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[CustomStoreDTO](#schemacustomstoredto)|true|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_CustomStoreResponse">CustomStoreResponse</h2>
<!-- backwards compatibility -->
<a id="schemacustomstoreresponse"></a>
<a id="schema_CustomStoreResponse"></a>
<a id="tocScustomstoreresponse"></a>
<a id="tocscustomstoreresponse"></a>

```json
{
  "data": {
    "custom_store_id": "576656a6-4771-445d-b74a-98f7826a89b5",
    "value": "string",
    "name": "string",
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
    "is_deleted": false
  }
}

```

CustomStoreResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[CustomStore](#schemacustomstore)|false|none|none|

<h2 id="tocS_CustomStoreResponseList">CustomStoreResponseList</h2>
<!-- backwards compatibility -->
<a id="schemacustomstoreresponselist"></a>
<a id="schema_CustomStoreResponseList"></a>
<a id="tocScustomstoreresponselist"></a>
<a id="tocscustomstoreresponselist"></a>

```json
{
  "data": [
    {
      "custom_store_id": "576656a6-4771-445d-b74a-98f7826a89b5",
      "value": "string",
      "name": "string",
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "is_deleted": false
    }
  ]
}

```

CustomStoreResponseList

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[CustomStore](#schemacustomstore)]|false|none|none|

<h2 id="tocS_DateType">DateType</h2>
<!-- backwards compatibility -->
<a id="schemadatetype"></a>
<a id="schema_DateType"></a>
<a id="tocSdatetype"></a>
<a id="tocsdatetype"></a>

```json
"purchase_date"

```

DateType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|DateType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|DateType|purchase_date|
|DateType|profile_install_date|

<h2 id="tocS_DeprecatedPurchaseContainer">DeprecatedPurchaseContainer</h2>
<!-- backwards compatibility -->
<a id="schemadeprecatedpurchasecontainer"></a>
<a id="schema_DeprecatedPurchaseContainer"></a>
<a id="tocSdeprecatedpurchasecontainer"></a>
<a id="tocsdeprecatedpurchasecontainer"></a>

```json
{
  "purchase_container_global_id": "9a3de371-51b1-470b-bff5-a5869bc9bd00",
  "purchase_container_id": "7dbb8ffa-9af1-4086-8587-b5de80aea12d",
  "title": "string"
}

```

DeprecatedPurchaseContainer

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|purchase_container_global_id|string(uuid)|true|none|none|
|purchase_container_id|string(uuid)|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_DeprecatedPurchaseGroup">DeprecatedPurchaseGroup</h2>
<!-- backwards compatibility -->
<a id="schemadeprecatedpurchasegroup"></a>
<a id="schema_DeprecatedPurchaseGroup"></a>
<a id="tocSdeprecatedpurchasegroup"></a>
<a id="tocsdeprecatedpurchasegroup"></a>

```json
{
  "purchase_group_global_id": "3267bcff-ba6b-4b40-8ea7-b41b56b53956",
  "purchase_group_id": "ce1dac31-281f-4a9e-9f4c-425f8dfca933",
  "title": "string"
}

```

DeprecatedPurchaseGroup

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|purchase_group_global_id|string(uuid)|true|none|none|
|purchase_group_id|string(uuid)|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_DevicePlatform">DevicePlatform</h2>
<!-- backwards compatibility -->
<a id="schemadeviceplatform"></a>
<a id="schema_DevicePlatform"></a>
<a id="tocSdeviceplatform"></a>
<a id="tocsdeviceplatform"></a>

```json
"iOS"

```

DevicePlatform

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|DevicePlatform|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|DevicePlatform|iOS|
|DevicePlatform|Android|
|DevicePlatform|macOS|
|DevicePlatform|iPadOS|
|DevicePlatform|visionOS|

<h2 id="tocS_Duration">Duration</h2>
<!-- backwards compatibility -->
<a id="schemaduration"></a>
<a id="schema_Duration"></a>
<a id="tocSduration"></a>
<a id="tocsduration"></a>

```json
"Weekly"

```

Duration

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Duration|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|Duration|Weekly|
|Duration|Monthly|
|Duration|2 months|
|Duration|3 months|
|Duration|6 months|
|Duration|Annual|
|Duration|Lifetime|
|Duration|Uncategorized|

<h2 id="tocS_Environment">Environment</h2>
<!-- backwards compatibility -->
<a id="schemaenvironment"></a>
<a id="schema_Environment"></a>
<a id="tocSenvironment"></a>
<a id="tocsenvironment"></a>

```json
"Sandbox"

```

Environment

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Environment|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|Environment|Sandbox|
|Environment|Production|

<h2 id="tocS_ErrorObject">ErrorObject</h2>
<!-- backwards compatibility -->
<a id="schemaerrorobject"></a>
<a id="schema_ErrorObject"></a>
<a id="tocSerrorobject"></a>
<a id="tocserrorobject"></a>

```json
{
  "source": "string",
  "errors": [
    "string"
  ]
}

```

ErrorObject

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|source|string|false|none|none|
|errors|[string]|true|none|none|

<h2 id="tocS_Errors">Errors</h2>
<!-- backwards compatibility -->
<a id="schemaerrors"></a>
<a id="schema_Errors"></a>
<a id="tocSerrors"></a>
<a id="tocserrors"></a>

```json
{
  "errors": {
    "property1": [
      "string"
    ],
    "property2": [
      "string"
    ]
  },
  "error_code": "base_error",
  "status_code": 400
}

```

Errors

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|errors|object|false|none|none|
|» **additionalProperties**|[string]|false|none|none|
|error_code|string|false|none|none|
|status_code|integer|false|none|none|

<h2 id="tocS_FallbackPlacementVariationCollection">FallbackPlacementVariationCollection</h2>
<!-- backwards compatibility -->
<a id="schemafallbackplacementvariationcollection"></a>
<a id="schema_FallbackPlacementVariationCollection"></a>
<a id="tocSfallbackplacementvariationcollection"></a>
<a id="tocsfallbackplacementvariationcollection"></a>

```json
{
  "developer_id": "string",
  "data": [
    {}
  ]
}

```

FallbackPlacementVariationCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|developer_id|string|true|none|none|
|data|[object]|true|none|none|

<h2 id="tocS_FallbackVariationCollection">FallbackVariationCollection</h2>
<!-- backwards compatibility -->
<a id="schemafallbackvariationcollection"></a>
<a id="schema_FallbackVariationCollection"></a>
<a id="tocSfallbackvariationcollection"></a>
<a id="tocsfallbackvariationcollection"></a>

```json
{
  "data": [
    {
      "developer_id": "string",
      "data": [
        {}
      ]
    }
  ],
  "meta": {
    "version": 0,
    "developer_ids": [
      "string"
    ],
    "response_created_at": 0
  }
}

```

FallbackVariationCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[FallbackPlacementVariationCollection](#schemafallbackplacementvariationcollection)]|true|none|none|
|meta|[FallbackVariationCollectionMeta](#schemafallbackvariationcollectionmeta)|true|none|none|

<h2 id="tocS_FallbackVariationCollectionMeta">FallbackVariationCollectionMeta</h2>
<!-- backwards compatibility -->
<a id="schemafallbackvariationcollectionmeta"></a>
<a id="schema_FallbackVariationCollectionMeta"></a>
<a id="tocSfallbackvariationcollectionmeta"></a>
<a id="tocsfallbackvariationcollectionmeta"></a>

```json
{
  "version": 0,
  "developer_ids": [
    "string"
  ],
  "response_created_at": 0
}

```

FallbackVariationCollectionMeta

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|version|integer|true|none|none|
|developer_ids|[string]|true|none|none|
|response_created_at|integer|false|none|none|

<h2 id="tocS_FeaturesBlock">FeaturesBlock</h2>
<!-- backwards compatibility -->
<a id="schemafeaturesblock"></a>
<a id="schema_FeaturesBlock"></a>
<a id="tocSfeaturesblock"></a>
<a id="tocsfeaturesblock"></a>

```json
{
  "type": "list"
}

```

FeaturesBlock

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|[FeaturesBlockType](#schemafeaturesblocktype)|true|none|An enumeration.|

<h2 id="tocS_FeaturesBlockType">FeaturesBlockType</h2>
<!-- backwards compatibility -->
<a id="schemafeaturesblocktype"></a>
<a id="schema_FeaturesBlockType"></a>
<a id="tocSfeaturesblocktype"></a>
<a id="tocsfeaturesblocktype"></a>

```json
"list"

```

FeaturesBlockType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|FeaturesBlockType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|FeaturesBlockType|list|
|FeaturesBlockType|timeline|

<h2 id="tocS_FilterField">FilterField</h2>
<!-- backwards compatibility -->
<a id="schemafilterfield"></a>
<a id="schema_FilterField"></a>
<a id="tocSfilterfield"></a>
<a id="tocsfilterfield"></a>

```json
{
  "type": "string",
  "arbitrary_value_allowed": true,
  "title": "string"
}

```

FilterField

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|[FilterFieldType](#schemafilterfieldtype)|true|none|An enumeration.|
|arbitrary_value_allowed|boolean|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_FilterFieldType">FilterFieldType</h2>
<!-- backwards compatibility -->
<a id="schemafilterfieldtype"></a>
<a id="schema_FilterFieldType"></a>
<a id="tocSfilterfieldtype"></a>
<a id="tocsfilterfieldtype"></a>

```json
"string"

```

FilterFieldType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|FilterFieldType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|FilterFieldType|string|
|FilterFieldType|integer|
|FilterFieldType|float|
|FilterFieldType|date|

<h2 id="tocS_FilterOperator">FilterOperator</h2>
<!-- backwards compatibility -->
<a id="schemafilteroperator"></a>
<a id="schema_FilterOperator"></a>
<a id="tocSfilteroperator"></a>
<a id="tocsfilteroperator"></a>

```json
{
  "type": "not",
  "title": "string"
}

```

FilterOperator

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|[FilterOperatorType](#schemafilteroperatortype)|true|none|An enumeration.|
|title|string|true|none|none|

<h2 id="tocS_FilterOperatorType">FilterOperatorType</h2>
<!-- backwards compatibility -->
<a id="schemafilteroperatortype"></a>
<a id="schema_FilterOperatorType"></a>
<a id="tocSfilteroperatortype"></a>
<a id="tocsfilteroperatortype"></a>

```json
"not"

```

FilterOperatorType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|FilterOperatorType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|FilterOperatorType|not|
|FilterOperatorType|many|
|FilterOperatorType|single|
|FilterOperatorType|between|

<h2 id="tocS_FontDTOCreate">FontDTOCreate</h2>
<!-- backwards compatibility -->
<a id="schemafontdtocreate"></a>
<a id="schema_FontDTOCreate"></a>
<a id="tocSfontdtocreate"></a>
<a id="tocsfontdtocreate"></a>

```json
{
  "font_name": "Roboto-Regular.ttf",
  "font_alias_android": "roboto_regular.ttf",
  "font_alias_ios": "Roboto-Regular.ttf",
  "font": "string"
}

```

FontDTOCreate

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|font_name|string|true|none|none|
|font_alias_android|string|false|none|none|
|font_alias_ios|string|false|none|none|
|font|string(binary)|true|none|base64 encoded font file|

<h2 id="tocS_FontDTOResponse">FontDTOResponse</h2>
<!-- backwards compatibility -->
<a id="schemafontdtoresponse"></a>
<a id="schema_FontDTOResponse"></a>
<a id="tocSfontdtoresponse"></a>
<a id="tocsfontdtoresponse"></a>

```json
{
  "font_name": "Roboto-Regular.ttf",
  "font_alias_android": "roboto_regular.ttf",
  "font_alias_ios": "Roboto-Regular.ttf",
  "font_id": "cc48777c-5a23-478d-89c6-e52eedca0be6",
  "font_link": "https://public-media.adapty.io/public/aa/bb/b6c84d5b-30c3-41d5-85f1-0aae727bb19f/Roboto-Regular.ttf"
}

```

FontDTOResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|font_name|string|true|none|none|
|font_alias_android|string|false|none|none|
|font_alias_ios|string|false|none|none|
|font_id|string(uuid)|false|none|none|
|font_link|string(uri)|false|none|none|

<h2 id="tocS_FontListResponse">FontListResponse</h2>
<!-- backwards compatibility -->
<a id="schemafontlistresponse"></a>
<a id="schema_FontListResponse"></a>
<a id="tocSfontlistresponse"></a>
<a id="tocsfontlistresponse"></a>

```json
{
  "data": [
    {
      "font_name": "Roboto-Regular.ttf",
      "font_alias_android": "roboto_regular.ttf",
      "font_alias_ios": "Roboto-Regular.ttf",
      "font_id": "cc48777c-5a23-478d-89c6-e52eedca0be6",
      "font_link": "https://public-media.adapty.io/public/aa/bb/b6c84d5b-30c3-41d5-85f1-0aae727bb19f/Roboto-Regular.ttf"
    }
  ]
}

```

FontListResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[FontDTOResponse](#schemafontdtoresponse)]|false|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|

<h2 id="tocS_FontResponse">FontResponse</h2>
<!-- backwards compatibility -->
<a id="schemafontresponse"></a>
<a id="schema_FontResponse"></a>
<a id="tocSfontresponse"></a>
<a id="tocsfontresponse"></a>

```json
{
  "data": {
    "font_name": "Roboto-Regular.ttf",
    "font_alias_android": "roboto_regular.ttf",
    "font_alias_ios": "Roboto-Regular.ttf",
    "font_id": "cc48777c-5a23-478d-89c6-e52eedca0be6",
    "font_link": "https://public-media.adapty.io/public/aa/bb/b6c84d5b-30c3-41d5-85f1-0aae727bb19f/Roboto-Regular.ttf"
  },
  "meta": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ]
}

```

FontResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[FontDTOResponse](#schemafontdtoresponse)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|
|meta|[string]|false|none|none|

<h2 id="tocS_FunnelMetricsConditions">FunnelMetricsConditions</h2>
<!-- backwards compatibility -->
<a id="schemafunnelmetricsconditions"></a>
<a id="schema_FunnelMetricsConditions"></a>
<a id="tocSfunnelmetricsconditions"></a>
<a id="tocsfunnelmetricsconditions"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_type": [
      "free_trial"
    ],
    "offer_category": [
      "no_offer"
    ],
    "offer_id": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation_by": "app_id",
  "format": "json"
}

```

FunnelMetricsConditions

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[MetricsFilters](#schemametricsfilters)|true|none|none|
|period_unit|[PeriodUnit](#schemaperiodunit)|false|none|An enumeration.|
|date_type|[DateType](#schemadatetype)|false|none|An enumeration.|
|segmentation_by|[ChartMetricsSegmentation](#schemachartmetricssegmentation)|false|none|An enumeration.|
|format|[MetricsFormat](#schemametricsformat)|false|none|An enumeration.|

<h2 id="tocS_FunnelsMetricsRequest">FunnelsMetricsRequest</h2>
<!-- backwards compatibility -->
<a id="schemafunnelsmetricsrequest"></a>
<a id="schema_FunnelsMetricsRequest"></a>
<a id="tocSfunnelsmetricsrequest"></a>
<a id="tocsfunnelsmetricsrequest"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "store": [
      "string"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "segment_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "string"
    ],
    "store_product_id": [
      "string"
    ],
    "duration": [
      "string"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "organic"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_category": [
      "string"
    ],
    "offer_type": [
      "string"
    ],
    "offer_id": [
      "string"
    ]
  },
  "segmentation": "period"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[ChartFilters](#schemachartfilters)|true|none|none|
|segmentation|string|false|none|* `period` - Period * `renewal_status` - Renewal status * `cancellation_reason` - Cancellation reason * `store_product_id` - Store product id * `country` - Country * `store` - Store * `purchase_container_id` - Purchase container id * `paywall_id` - Paywall id * `audience_id` - Audience id * `placement_id` - Placement id * `attribution_source` - Attribution source * `attribution_status` - Attribution status * `attribution_channel` - Attribution channel * `attribution_campaign` - Attribution campaign * `attribution_adgroup` - Attribution adgroup * `attribution_adset` - Attribution adset * `attribution_creative` - Attribution creative * `duration` - Duration * `offer_category` - Offer category * `offer_type` - Offer type * `offer_id` - Offer id * `day` - Day * `week` - Week * `month` - Month * `year` - Year|

#### Enumerated Values

|Property|Value|
|---|---|
|segmentation|period|
|segmentation|renewal_status|
|segmentation|cancellation_reason|
|segmentation|store_product_id|
|segmentation|country|
|segmentation|store|
|segmentation|purchase_container_id|
|segmentation|paywall_id|
|segmentation|audience_id|
|segmentation|placement_id|
|segmentation|attribution_source|
|segmentation|attribution_status|
|segmentation|attribution_channel|
|segmentation|attribution_campaign|
|segmentation|attribution_adgroup|
|segmentation|attribution_adset|
|segmentation|attribution_creative|
|segmentation|duration|
|segmentation|offer_category|
|segmentation|offer_type|
|segmentation|offer_id|
|segmentation|day|
|segmentation|week|
|segmentation|month|
|segmentation|year|

<h2 id="tocS_Gender">Gender</h2>
<!-- backwards compatibility -->
<a id="schemagender"></a>
<a id="schema_Gender"></a>
<a id="tocSgender"></a>
<a id="tocsgender"></a>

```json
"f"

```

Gender

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Gender|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|Gender|f|
|Gender|m|
|Gender|o|

<h2 id="tocS_GradientColorValue">GradientColorValue</h2>
<!-- backwards compatibility -->
<a id="schemagradientcolorvalue"></a>
<a id="schema_GradientColorValue"></a>
<a id="tocSgradientcolorvalue"></a>
<a id="tocsgradientcolorvalue"></a>

```json
{
  "color": "string",
  "p": 0
}

```

GradientColorValue

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|color|string|true|none|none|
|p|number|true|none|none|

<h2 id="tocS_HorizontalAlign">HorizontalAlign</h2>
<!-- backwards compatibility -->
<a id="schemahorizontalalign"></a>
<a id="schema_HorizontalAlign"></a>
<a id="tocShorizontalalign"></a>
<a id="tocshorizontalalign"></a>

```json
"left"

```

HorizontalAlign

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|HorizontalAlign|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|HorizontalAlign|left|
|HorizontalAlign|center|
|HorizontalAlign|right|

<h2 id="tocS_Image">Image</h2>
<!-- backwards compatibility -->
<a id="schemaimage"></a>
<a id="schema_Image"></a>
<a id="tocSimage"></a>
<a id="tocsimage"></a>

```json
{
  "image_id": 0,
  "url": "http://example.com"
}

```

Image

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|image_id|integer|true|none|none|
|url|string(uri)|true|none|none|

<h2 id="tocS_InAppDetailMetricsBasedOn">InAppDetailMetricsBasedOn</h2>
<!-- backwards compatibility -->
<a id="schemainappdetailmetricsbasedon"></a>
<a id="schema_InAppDetailMetricsBasedOn"></a>
<a id="tocSinappdetailmetricsbasedon"></a>
<a id="tocsinappdetailmetricsbasedon"></a>

```json
"placement"

```

InAppDetailMetricsBasedOn

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|InAppDetailMetricsBasedOn|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|InAppDetailMetricsBasedOn|placement|
|InAppDetailMetricsBasedOn|audience|
|InAppDetailMetricsBasedOn|paywall|

<h2 id="tocS_InAppDetailMetricsSegmentation">InAppDetailMetricsSegmentation</h2>
<!-- backwards compatibility -->
<a id="schemainappdetailmetricssegmentation"></a>
<a id="schema_InAppDetailMetricsSegmentation"></a>
<a id="tocSinappdetailmetricssegmentation"></a>
<a id="tocsinappdetailmetricssegmentation"></a>

```json
"product"

```

InAppDetailMetricsSegmentation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|InAppDetailMetricsSegmentation|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|InAppDetailMetricsSegmentation|product|
|InAppDetailMetricsSegmentation|profile_country|
|InAppDetailMetricsSegmentation|store|

<h2 id="tocS_InAppDetailTotalMetrics">InAppDetailTotalMetrics</h2>
<!-- backwards compatibility -->
<a id="schemainappdetailtotalmetrics"></a>
<a id="schema_InAppDetailTotalMetrics"></a>
<a id="tocSinappdetailtotalmetrics"></a>
<a id="tocsinappdetailtotalmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0
    }
  ],
  "title": "Total"
}

```

InAppDetailTotalMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|items|[[InAppMetrics](#schemainappmetrics)]|false|none|none|
|title|string|false|none|none|

<h2 id="tocS_InAppMetrics">InAppMetrics</h2>
<!-- backwards compatibility -->
<a id="schemainappmetrics"></a>
<a id="schema_InAppMetrics"></a>
<a id="tocSinappmetrics"></a>
<a id="tocsinappmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0
}

```

InAppMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|

<h2 id="tocS_InAppMetricsConditions">InAppMetricsConditions</h2>
<!-- backwards compatibility -->
<a id="schemainappmetricsconditions"></a>
<a id="schema_InAppMetricsConditions"></a>
<a id="tocSinappmetricsconditions"></a>
<a id="tocsinappmetricsconditions"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_type": [
      "free_trial"
    ],
    "offer_category": [
      "no_offer"
    ],
    "offer_id": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "based_on": "placement",
  "segmentation_by": "product",
  "date_type": "purchase_date"
}

```

InAppMetricsConditions

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[MetricsFilters](#schemametricsfilters)|true|none|none|
|period_unit|[PeriodUnit](#schemaperiodunit)|false|none|An enumeration.|
|based_on|[InAppDetailMetricsBasedOn](#schemainappdetailmetricsbasedon)|false|none|An enumeration.|
|segmentation_by|[InAppDetailMetricsSegmentation](#schemainappdetailmetricssegmentation)|false|none|An enumeration.|
|date_type|[DateType](#schemadatetype)|false|none|An enumeration.|

<h2 id="tocS_InAppMetricsFilterFieldValueData">InAppMetricsFilterFieldValueData</h2>
<!-- backwards compatibility -->
<a id="schemainappmetricsfilterfieldvaluedata"></a>
<a id="schema_InAppMetricsFilterFieldValueData"></a>
<a id="tocSinappmetricsfilterfieldvaluedata"></a>
<a id="tocsinappmetricsfilterfieldvaluedata"></a>

```json
{
  "field": "app_id",
  "value": "string",
  "title": "string",
  "is_trial": false,
  "duration_type": "Weekly",
  "segmentation": "string"
}

```

InAppMetricsFilterFieldValueData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|field|[MetricsFilterField](#schemametricsfilterfield)|true|none|An enumeration.|
|value|string|true|none|none|
|title|string|false|none|none|
|is_trial|boolean|false|none|none|
|duration_type|[Duration](#schemaduration)|false|none|An enumeration.|
|segmentation|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string(uuid)|false|none|none|

<h2 id="tocS_InAppMetricsFilterFieldValuesDataCollection">InAppMetricsFilterFieldValuesDataCollection</h2>
<!-- backwards compatibility -->
<a id="schemainappmetricsfilterfieldvaluesdatacollection"></a>
<a id="schema_InAppMetricsFilterFieldValuesDataCollection"></a>
<a id="tocSinappmetricsfilterfieldvaluesdatacollection"></a>
<a id="tocsinappmetricsfilterfieldvaluesdatacollection"></a>

```json
{
  "filter_values_data": [
    {
      "field": "app_id",
      "value": "string",
      "title": "string",
      "is_trial": false,
      "duration_type": "Weekly",
      "segmentation": "string"
    }
  ]
}

```

InAppMetricsFilterFieldValuesDataCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filter_values_data|[[InAppMetricsFilterFieldValueData](#schemainappmetricsfilterfieldvaluedata)]|true|none|none|

<h2 id="tocS_Integration">Integration</h2>
<!-- backwards compatibility -->
<a id="schemaintegration"></a>
<a id="schema_Integration"></a>
<a id="tocSintegration"></a>
<a id="tocsintegration"></a>

```json
{
  "platform": "string",
  "enabled": true,
  "values": {
    "property1": null,
    "property2": null
  },
  "event_android_map": {
    "property1": null,
    "property2": null
  },
  "event_map": {
    "property1": null,
    "property2": null
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|platform|string|true|none|none|
|enabled|boolean|false|none|none|
|values|object|false|none|none|
|» **additionalProperties**|any|false|none|none|
|event_android_map|object|false|none|none|
|» **additionalProperties**|any|false|none|none|
|event_map|object|false|none|none|
|» **additionalProperties**|any|false|none|none|

<h2 id="tocS_IntegrationEvent">IntegrationEvent</h2>
<!-- backwards compatibility -->
<a id="schemaintegrationevent"></a>
<a id="schema_IntegrationEvent"></a>
<a id="tocSintegrationevent"></a>
<a id="tocsintegrationevent"></a>

```json
{
  "integrations_event_id": "6cab6579-ed0c-4134-b2f0-6033823a7632",
  "event_type": "string",
  "event_body": "string",
  "store": "string",
  "environment": "string",
  "integrations": "string",
  "event_datetime": "2019-08-24T14:15:22Z"
}

```

A `ModelSerializer` is just a regular `Serializer`, except that:

* A set of default fields are automatically populated.
* A set of default validators are automatically populated.
* Default `.create()` and `.update()` implementations are provided.

The process of automatically determining a set of serializer fields
based on the model fields is reasonably complex, but you almost certainly
don't need to dig into the implementation.

If the `ModelSerializer` class *doesn't* generate the set of fields that
you need you should either declare the extra/differing fields explicitly on
the serializer class, or simply use a `Serializer` class.

Included Mixins:

* A mixin class to enable sparse fieldsets is included
* A mixin class to enable validation of included resources is included

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|integrations_event_id|string(uuid)|true|read-only|none|
|event_type|string|true|none|none|
|event_body|string|true|read-only|none|
|store|string¦null|false|none|none|
|environment|string¦null|false|none|none|
|integrations|string|true|read-only|none|
|event_datetime|string(date-time)|true|none|none|

<h2 id="tocS_LTVSegmentation">LTVSegmentation</h2>
<!-- backwards compatibility -->
<a id="schemaltvsegmentation"></a>
<a id="schema_LTVSegmentation"></a>
<a id="tocSltvsegmentation"></a>
<a id="tocsltvsegmentation"></a>

```json
"day"

```

LTVSegmentation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|LTVSegmentation|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|LTVSegmentation|day|
|LTVSegmentation|week|
|LTVSegmentation|month|
|LTVSegmentation|year|
|LTVSegmentation|country|
|LTVSegmentation|product|
|LTVSegmentation|paywall|
|LTVSegmentation|paywalls_group|
|LTVSegmentation|audience|
|LTVSegmentation|placement|
|LTVSegmentation|duration|
|LTVSegmentation|store|

<h2 id="tocS_LocaleTranslationData">LocaleTranslationData</h2>
<!-- backwards compatibility -->
<a id="schemalocaletranslationdata"></a>
<a id="schema_LocaleTranslationData"></a>
<a id="tocSlocaletranslationdata"></a>
<a id="tocslocaletranslationdata"></a>

```json
{
  "payload_type": "localization",
  "payload": {},
  "payload_locale": "US",
  "target_locales": [
    "string"
  ]
}

```

LocaleTranslationData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|payload_type|[TranslationPayloadType](#schematranslationpayloadtype)|false|none|An enumeration.|
|payload|object|false|none|none|
|payload_locale|string|false|none|none|
|target_locales|[string]|false|none|none|

<h2 id="tocS_LocaleTranslationRequest">LocaleTranslationRequest</h2>
<!-- backwards compatibility -->
<a id="schemalocaletranslationrequest"></a>
<a id="schema_LocaleTranslationRequest"></a>
<a id="tocSlocaletranslationrequest"></a>
<a id="tocslocaletranslationrequest"></a>

```json
{
  "data": {
    "payload_type": "localization",
    "payload": {},
    "payload_locale": "US",
    "target_locales": [
      "string"
    ]
  }
}

```

LocaleTranslationRequest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[LocaleTranslationData](#schemalocaletranslationdata)|true|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_LocaleTranslationResponse">LocaleTranslationResponse</h2>
<!-- backwards compatibility -->
<a id="schemalocaletranslationresponse"></a>
<a id="schema_LocaleTranslationResponse"></a>
<a id="tocSlocaletranslationresponse"></a>
<a id="tocslocaletranslationresponse"></a>

```json
{
  "data": [
    {
      "payload_type": "localization",
      "payload": {},
      "payload_locale": "US",
      "target_locales": [
        "string"
      ]
    }
  ]
}

```

LocaleTranslationResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[LocaleTranslationData](#schemalocaletranslationdata)]|false|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|

<h2 id="tocS_Localization">Localization</h2>
<!-- backwards compatibility -->
<a id="schemalocalization"></a>
<a id="schema_Localization"></a>
<a id="tocSlocalization"></a>
<a id="tocslocalization"></a>

```json
{
  "id": "en-GB",
  "strings": [
    {
      "id": "str-title",
      "value": "Become a Premium man",
      "has_tags": false,
      "fallback": "string"
    }
  ],
  "assets": [
    {
      "id": "string",
      "type": "color",
      "value": "string"
    }
  ]
}

```

Localization

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|strings|[[String](#schemastring)]|false|none|none|
|assets|[oneOf]|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetColor](#schemaassetcolor)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetColorGradient](#schemaassetcolorgradient)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetImage](#schemaassetimage)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetFont](#schemaassetfont)|false|none|none|

<h2 id="tocS_Localizations">Localizations</h2>
<!-- backwards compatibility -->
<a id="schemalocalizations"></a>
<a id="schema_Localizations"></a>
<a id="tocSlocalizations"></a>
<a id="tocslocalizations"></a>

```json
{
  "id": "string",
  "is_right_to_left": true,
  "strings": [
    {
      "id": "string",
      "value": [
        "string"
      ],
      "fallback": [
        "string"
      ]
    }
  ],
  "assets": [
    {
      "id": "string",
      "type": "color",
      "value": "string"
    }
  ]
}

```

Localizations

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|is_right_to_left|boolean|false|none|none|
|strings|[[LocalizationsString](#schemalocalizationsstring)]|true|none|none|
|assets|[oneOf]|true|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsColor](#schemaassetscolor)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsColorGradient](#schemaassetscolorgradient)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsFont](#schemaassetsfont)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsImage](#schemaassetsimage)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsVideo](#schemaassetsvideo)|false|none|none|

<h2 id="tocS_LocalizationsString">LocalizationsString</h2>
<!-- backwards compatibility -->
<a id="schemalocalizationsstring"></a>
<a id="schema_LocalizationsString"></a>
<a id="tocSlocalizationsstring"></a>
<a id="tocslocalizationsstring"></a>

```json
{
  "id": "string",
  "value": [
    "string"
  ],
  "fallback": [
    "string"
  ]
}

```

LocalizationsString

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|value|[RichText](#schemarichtext)|true|none|none|
|fallback|[RichText](#schemarichtext)|false|none|none|

<h2 id="tocS_Media">Media</h2>
<!-- backwards compatibility -->
<a id="schemamedia"></a>
<a id="schema_Media"></a>
<a id="tocSmedia"></a>
<a id="tocsmedia"></a>

```json
{
  "media_id": 0,
  "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
  "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
  "name": "string",
  "url": "http://example.com",
  "source_type": "paywall_builder_asset"
}

```

Media

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|media_id|integer|true|none|none|
|app_id|string(uuid)|true|none|none|
|account_id|string(uuid)|false|none|none|
|name|string|true|none|none|
|url|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string(uri)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|source_type|[MediaSourceType](#schemamediasourcetype)|true|none|An enumeration.|

<h2 id="tocS_MediaAggregate">MediaAggregate</h2>
<!-- backwards compatibility -->
<a id="schemamediaaggregate"></a>
<a id="schema_MediaAggregate"></a>
<a id="tocSmediaaggregate"></a>
<a id="tocsmediaaggregate"></a>

```json
{
  "media": {
    "media_id": 0,
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
    "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
    "name": "string",
    "url": "http://example.com",
    "source_type": "paywall_builder_asset"
  },
  "preview_base64": "string"
}

```

MediaAggregate

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|media|[Media](#schemamedia)|true|none|none|
|preview_base64|string|false|none|none|

<h2 id="tocS_MediaCUResponse">MediaCUResponse</h2>
<!-- backwards compatibility -->
<a id="schemamediacuresponse"></a>
<a id="schema_MediaCUResponse"></a>
<a id="tocSmediacuresponse"></a>
<a id="tocsmediacuresponse"></a>

```json
{
  "data": {
    "media": {
      "media_id": 0,
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
      "name": "string",
      "url": "http://example.com",
      "source_type": "paywall_builder_asset"
    },
    "preview_base64": "string"
  }
}

```

MediaCUResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[MediaAggregate](#schemamediaaggregate)|false|none|none|

<h2 id="tocS_MediaListResponse">MediaListResponse</h2>
<!-- backwards compatibility -->
<a id="schemamedialistresponse"></a>
<a id="schema_MediaListResponse"></a>
<a id="tocSmedialistresponse"></a>
<a id="tocsmedialistresponse"></a>

```json
{
  "data": [
    {
      "media_id": 0,
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
      "name": "string",
      "url": "http://example.com",
      "source_type": "paywall_builder_asset"
    }
  ]
}

```

MediaListResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[Media](#schemamedia)]|false|none|none|

<h2 id="tocS_MediaResponse">MediaResponse</h2>
<!-- backwards compatibility -->
<a id="schemamediaresponse"></a>
<a id="schema_MediaResponse"></a>
<a id="tocSmediaresponse"></a>
<a id="tocsmediaresponse"></a>

```json
{
  "data": {
    "media_id": 0,
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
    "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
    "name": "string",
    "url": "http://example.com",
    "source_type": "paywall_builder_asset"
  }
}

```

MediaResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[Media](#schemamedia)|false|none|none|

<h2 id="tocS_MediaSourceType">MediaSourceType</h2>
<!-- backwards compatibility -->
<a id="schemamediasourcetype"></a>
<a id="schema_MediaSourceType"></a>
<a id="tocSmediasourcetype"></a>
<a id="tocsmediasourcetype"></a>

```json
"paywall_builder_asset"

```

MediaSourceType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|MediaSourceType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|MediaSourceType|paywall_builder_asset|
|MediaSourceType|paywall_builder_font|

<h2 id="tocS_Meta">Meta</h2>
<!-- backwards compatibility -->
<a id="schemameta"></a>
<a id="schema_Meta"></a>
<a id="tocSmeta"></a>
<a id="tocsmeta"></a>

```json
{
  "pagination": {
    "count": 0,
    "page": 0,
    "pages_count": 0
  }
}

```

Meta

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pagination|[Pagination](#schemapagination)|true|none|none|

<h2 id="tocS_MetricsFilterField">MetricsFilterField</h2>
<!-- backwards compatibility -->
<a id="schemametricsfilterfield"></a>
<a id="schema_MetricsFilterField"></a>
<a id="tocSmetricsfilterfield"></a>
<a id="tocsmetricsfilterfield"></a>

```json
"app_id"

```

MetricsFilterField

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|MetricsFilterField|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|MetricsFilterField|app_id|
|MetricsFilterField|country|
|MetricsFilterField|store|
|MetricsFilterField|audience_id|
|MetricsFilterField|paywall_id|
|MetricsFilterField|paywalls_group_id|
|MetricsFilterField|placement_audience_version_id|
|MetricsFilterField|placement_id|
|MetricsFilterField|store_product_id|
|MetricsFilterField|purchase_container_id|
|MetricsFilterField|offer_category|
|MetricsFilterField|offer_type|
|MetricsFilterField|offer_id|
|MetricsFilterField|attribution|
|MetricsFilterField|attribution_status|
|MetricsFilterField|attribution_channel|
|MetricsFilterField|attribution_campaign|
|MetricsFilterField|attribution_adgroup|
|MetricsFilterField|attribution_adset|
|MetricsFilterField|attribution_creative|
|MetricsFilterField|attribution_source|
|MetricsFilterField|state|

<h2 id="tocS_MetricsFilters">MetricsFilters</h2>
<!-- backwards compatibility -->
<a id="schemametricsfilters"></a>
<a id="schema_MetricsFilters"></a>
<a id="tocSmetricsfilters"></a>
<a id="tocsmetricsfilters"></a>

```json
{
  "date": [
    "2019-08-24",
    "2019-08-24"
  ],
  "compare_date": [
    "2019-08-24",
    "2019-08-24"
  ],
  "date_from": "2019-08-24T14:15:22Z",
  "date_to": "2019-08-24T14:15:22Z",
  "compare_date_from": "2019-08-24T14:15:22Z",
  "compare_date_to": "2019-08-24T14:15:22Z",
  "store": [
    "string"
  ],
  "app_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "placement_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "audience_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "ab_test_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "paywalls_group_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "paywall_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "placement_audience_version_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "state": [
    "live"
  ],
  "purchase_container_id": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ],
  "country": [
    "st"
  ],
  "store_product_id": [
    [
      "string",
      "string"
    ]
  ],
  "duration": [
    "Weekly"
  ],
  "attribution_source": [
    "string"
  ],
  "attribution_status": [
    "string"
  ],
  "attribution_channel": [
    "string"
  ],
  "attribution_campaign": [
    "string"
  ],
  "attribution_adgroup": [
    "string"
  ],
  "attribution_adset": [
    "string"
  ],
  "attribution_creative": [
    "string"
  ],
  "offer_type": [
    "free_trial"
  ],
  "offer_category": [
    "no_offer"
  ],
  "offer_id": [
    "string"
  ],
  "renewal_period": [
    0
  ],
  "subscription_duration": 0,
  "timezone": "string",
  "profiles_counting_method": "profile_id"
}

```

MetricsFilters

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|date|[string]|true|none|none|
|compare_date|[string]|false|none|none|
|date_from|string(date-time)|true|none|none|
|date_to|string(date-time)|true|none|none|
|compare_date_from|string(date-time)|false|none|none|
|compare_date_to|string(date-time)|false|none|none|
|store|[string]|false|none|none|
|app_id|[string]|false|none|none|
|placement_id|[string]|false|none|none|
|audience_id|[string]|false|none|none|
|ab_test_id|[string]|false|none|none|
|paywalls_group_id|[string]|false|none|none|
|paywall_id|[string]|false|none|none|
|placement_audience_version_id|[string]|false|none|none|
|state|[[State](#schemastate)]|false|none|[An enumeration.]|
|purchase_container_id|[string]|false|none|none|
|country|[anyOf]|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|store_product_id|[array]|false|none|none|
|duration|[[Duration](#schemaduration)]|false|none|[An enumeration.]|
|attribution_source|[string]|false|none|none|
|attribution_status|[string]|false|none|none|
|attribution_channel|[string]|false|none|none|
|attribution_campaign|[string]|false|none|none|
|attribution_adgroup|[string]|false|none|none|
|attribution_adset|[string]|false|none|none|
|attribution_creative|[string]|false|none|none|
|offer_type|[[OfferType](#schemaoffertype)]|false|none|[An enumeration.]|
|offer_category|[[OfferCategory](#schemaoffercategory)]|false|none|[An enumeration.]|
|offer_id|[string]|false|none|none|
|renewal_period|[integer]|false|none|none|
|subscription_duration|integer|false|none|none|
|timezone|string|false|none|none|
|profiles_counting_method|[ProfilesCountingMethod](#schemaprofilescountingmethod)|false|none|An enumeration.|

<h2 id="tocS_MetricsFormat">MetricsFormat</h2>
<!-- backwards compatibility -->
<a id="schemametricsformat"></a>
<a id="schema_MetricsFormat"></a>
<a id="tocSmetricsformat"></a>
<a id="tocsmetricsformat"></a>

```json
"json"

```

MetricsFormat

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|MetricsFormat|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|MetricsFormat|json|
|MetricsFormat|csv|

<h2 id="tocS_OfferCategory">OfferCategory</h2>
<!-- backwards compatibility -->
<a id="schemaoffercategory"></a>
<a id="schema_OfferCategory"></a>
<a id="tocSoffercategory"></a>
<a id="tocsoffercategory"></a>

```json
"no_offer"

```

OfferCategory

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|OfferCategory|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|OfferCategory|no_offer|
|OfferCategory|introductory|
|OfferCategory|promotional|
|OfferCategory|offer_code|
|OfferCategory|win_back|

<h2 id="tocS_OfferDTO">OfferDTO</h2>
<!-- backwards compatibility -->
<a id="schemaofferdto"></a>
<a id="schema_OfferDTO"></a>
<a id="tocSofferdto"></a>
<a id="tocsofferdto"></a>

```json
{
  "category": "no_offer",
  "type": "free_trial",
  "id": "string"
}

```

OfferDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|category|[OfferCategory](#schemaoffercategory)|true|none|An enumeration.|
|type|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[OfferType](#schemaoffertype)|false|none|An enumeration.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|unknown|

<h2 id="tocS_OfferType">OfferType</h2>
<!-- backwards compatibility -->
<a id="schemaoffertype"></a>
<a id="schema_OfferType"></a>
<a id="tocSoffertype"></a>
<a id="tocsoffertype"></a>

```json
"free_trial"

```

OfferType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|OfferType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|OfferType|free_trial|
|OfferType|pay_as_you_go|
|OfferType|pay_up_front|

<h2 id="tocS_PaginatedFontListResponseList">PaginatedFontListResponseList</h2>
<!-- backwards compatibility -->
<a id="schemapaginatedfontlistresponselist"></a>
<a id="schema_PaginatedFontListResponseList"></a>
<a id="tocSpaginatedfontlistresponselist"></a>
<a id="tocspaginatedfontlistresponselist"></a>

```json
{
  "count": 123,
  "next": "http://api.example.org/accounts/?page[number]=4",
  "previous": "http://api.example.org/accounts/?page[number]=2",
  "results": [
    {
      "data": [
        {
          "font_name": "Roboto-Regular.ttf",
          "font_alias_android": "roboto_regular.ttf",
          "font_alias_ios": "Roboto-Regular.ttf",
          "font_id": "cc48777c-5a23-478d-89c6-e52eedca0be6",
          "font_link": "https://public-media.adapty.io/public/aa/bb/b6c84d5b-30c3-41d5-85f1-0aae727bb19f/Roboto-Regular.ttf"
        }
      ]
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|count|integer|false|none|none|
|next|string(uri)¦null|false|none|none|
|previous|string(uri)¦null|false|none|none|
|results|[[FontListResponse](#schemafontlistresponse)]|false|none|none|

<h2 id="tocS_PaginatedIntegrationEventList">PaginatedIntegrationEventList</h2>
<!-- backwards compatibility -->
<a id="schemapaginatedintegrationeventlist"></a>
<a id="schema_PaginatedIntegrationEventList"></a>
<a id="tocSpaginatedintegrationeventlist"></a>
<a id="tocspaginatedintegrationeventlist"></a>

```json
{
  "count": 123,
  "next": "http://api.example.org/accounts/?page[number]=4",
  "previous": "http://api.example.org/accounts/?page[number]=2",
  "results": [
    {
      "integrations_event_id": "6cab6579-ed0c-4134-b2f0-6033823a7632",
      "event_type": "string",
      "event_body": "string",
      "store": "string",
      "environment": "string",
      "integrations": "string",
      "event_datetime": "2019-08-24T14:15:22Z"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|count|integer|false|none|none|
|next|string(uri)¦null|false|none|none|
|previous|string(uri)¦null|false|none|none|
|results|[[IntegrationEvent](#schemaintegrationevent)]|false|none|[A `ModelSerializer` is just a regular `Serializer`, except that:  * A set of default fields are automatically populated. * A set of default validators are automatically populated. * Default `.create()` and `.update()` implementations are provided.  The process of automatically determining a set of serializer fields based on the model fields is reasonably complex, but you almost certainly don't need to dig into the implementation.  If the `ModelSerializer` class *doesn't* generate the set of fields that you need you should either declare the extra/differing fields explicitly on the serializer class, or simply use a `Serializer` class.   Included Mixins:  * A mixin class to enable sparse fieldsets is included * A mixin class to enable validation of included resources is included]|

<h2 id="tocS_PaginatedPaginatedResponseList">PaginatedPaginatedResponseList</h2>
<!-- backwards compatibility -->
<a id="schemapaginatedpaginatedresponselist"></a>
<a id="schema_PaginatedPaginatedResponseList"></a>
<a id="tocSpaginatedpaginatedresponselist"></a>
<a id="tocspaginatedpaginatedresponselist"></a>

```json
{
  "count": 123,
  "next": "http://api.example.org/accounts/?page[number]=4",
  "previous": "http://api.example.org/accounts/?page[number]=2",
  "results": [
    {
      "data": [
        {}
      ],
      "meta": {}
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|count|integer|false|none|none|
|next|string(uri)¦null|false|none|none|
|previous|string(uri)¦null|false|none|none|
|results|[[PaginatedResponse](#schemapaginatedresponse)]|false|none|none|

<h2 id="tocS_PaginatedResponse">PaginatedResponse</h2>
<!-- backwards compatibility -->
<a id="schemapaginatedresponse"></a>
<a id="schema_PaginatedResponse"></a>
<a id="tocSpaginatedresponse"></a>
<a id="tocspaginatedresponse"></a>

```json
{
  "data": [
    {}
  ],
  "meta": {}
}

```

PaginatedResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[[BaseModel](#schemabasemodel)]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|any|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|meta|object|false|none|none|

<h2 id="tocS_Pagination">Pagination</h2>
<!-- backwards compatibility -->
<a id="schemapagination"></a>
<a id="schema_Pagination"></a>
<a id="tocSpagination"></a>
<a id="tocspagination"></a>

```json
{
  "count": 0,
  "page": 0,
  "pages_count": 0
}

```

Pagination

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|count|integer|false|none|none|
|page|integer|false|none|none|
|pages_count|integer|false|none|none|

<h2 id="tocS_PatchedASACredentials">PatchedASACredentials</h2>
<!-- backwards compatibility -->
<a id="schemapatchedasacredentials"></a>
<a id="schema_PatchedASACredentials"></a>
<a id="tocSpatchedasacredentials"></a>
<a id="tocspatchedasacredentials"></a>

```json
{
  "private_key": "string",
  "public_key": "string",
  "team_id": "string",
  "client_id": "string",
  "key_id": "string",
  "save_asa_attribution": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|private_key|string¦null|false|write-only|none|
|public_key|string¦null|false|read-only|none|
|team_id|string¦null|false|none|none|
|client_id|string¦null|false|none|none|
|key_id|string¦null|false|none|none|
|save_asa_attribution|boolean|false|none|none|

<h2 id="tocS_PatchedFontDTO">PatchedFontDTO</h2>
<!-- backwards compatibility -->
<a id="schemapatchedfontdto"></a>
<a id="schema_PatchedFontDTO"></a>
<a id="tocSpatchedfontdto"></a>
<a id="tocspatchedfontdto"></a>

```json
{
  "font_name": "Roboto-Regular.ttf",
  "font_alias_android": "roboto_regular.ttf",
  "font_alias_ios": "Roboto-Regular.ttf",
  "font": "string"
}

```

FontDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|font_name|string|true|none|none|
|font_alias_android|string|false|none|none|
|font_alias_ios|string|false|none|none|
|font|string(binary)|false|none|base64 encoded font file|

<h2 id="tocS_PatchedIntegration">PatchedIntegration</h2>
<!-- backwards compatibility -->
<a id="schemapatchedintegration"></a>
<a id="schema_PatchedIntegration"></a>
<a id="tocSpatchedintegration"></a>
<a id="tocspatchedintegration"></a>

```json
{
  "platform": "string",
  "enabled": true,
  "values": {
    "property1": null,
    "property2": null
  },
  "event_android_map": {
    "property1": null,
    "property2": null
  },
  "event_map": {
    "property1": null,
    "property2": null
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|platform|string|false|none|none|
|enabled|boolean|false|none|none|
|values|object|false|none|none|
|» **additionalProperties**|any|false|none|none|
|event_android_map|object|false|none|none|
|» **additionalProperties**|any|false|none|none|
|event_map|object|false|none|none|
|» **additionalProperties**|any|false|none|none|

<h2 id="tocS_PatchedProfileData">PatchedProfileData</h2>
<!-- backwards compatibility -->
<a id="schemapatchedprofiledata"></a>
<a id="schema_PatchedProfileData"></a>
<a id="tocSpatchedprofiledata"></a>
<a id="tocspatchedprofiledata"></a>

```json
{
  "first_name": "string",
  "last_name": "string",
  "gender": "f",
  "email": "string",
  "phone_number": "string",
  "birthday": "2019-08-24",
  "ip_country": "string",
  "store_country": "string",
  "store": "string",
  "analytics_disabled": true,
  "custom_attributes": [
    {
      "key": "string",
      "value": 0
    }
  ],
  "installation_meta": {
    "device_id": "3bafab7b-4400-4bcf-8e6e-09f954699940",
    "device": "string",
    "locale": "string",
    "os": "string",
    "platform": "iOS",
    "timezone": "string",
    "user_agent": "string",
    "idfa": "string",
    "idfv": "string",
    "advertising_id": "string",
    "android_id": "string",
    "android_app_set_id": "string"
  }
}

```

ProfileData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|first_name|string|false|none|none|
|last_name|string|false|none|none|
|gender|[Gender](#schemagender)|false|none|An enumeration.|
|email|string|false|none|none|
|phone_number|string|false|none|none|
|birthday|string(date)|false|none|none|
|ip_country|string|false|none|none|
|store_country|string|false|none|none|
|store|string|false|none|none|
|analytics_disabled|boolean|false|none|none|
|custom_attributes|[[CustomAttribute](#schemacustomattribute)]|false|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|installation_meta|[ProfileMetaData](#schemaprofilemetadata)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_Paywall">Paywall</h2>
<!-- backwards compatibility -->
<a id="schemapaywall"></a>
<a id="schema_Paywall"></a>
<a id="tocSpaywall"></a>
<a id="tocspaywall"></a>

```json
{
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "title": "string",
  "use_paywall_builder": true,
  "use_paywall_builder_v4": true,
  "screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  },
  "builder_screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  },
  "main_screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  }
}

```

Paywall

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywall_id|string(uuid)|true|none|none|
|title|string|true|none|none|
|use_paywall_builder|boolean|true|none|none|
|use_paywall_builder_v4|boolean|true|none|none|
|screenshot|[Image](#schemaimage)|false|none|none|
|builder_screenshot|[Image](#schemaimage)|false|none|none|
|main_screenshot|[Image](#schemaimage)|false|none|none|

<h2 id="tocS_PaywallBuilderV3Data">PaywallBuilderV3Data</h2>
<!-- backwards compatibility -->
<a id="schemapaywallbuilderv3data"></a>
<a id="schema_PaywallBuilderV3Data"></a>
<a id="tocSpaywallbuilderv3data"></a>
<a id="tocspaywallbuilderv3data"></a>

```json
{
  "paywall_builder_id": "efd2d83b-6e30-40be-8394-74d00b6046a1",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "builder_config": {
    "format": "4.0.0",
    "template_id": "string",
    "template_revision": 0,
    "assets": [
      {
        "id": "string",
        "type": "color",
        "value": "string"
      }
    ],
    "localizations": [
      {
        "id": "string",
        "is_right_to_left": true,
        "strings": [
          {
            "id": "string",
            "value": [
              "string"
            ],
            "fallback": [
              "string"
            ]
          }
        ],
        "assets": [
          {
            "id": "string",
            "type": "color",
            "value": "string"
          }
        ]
      }
    ],
    "default_localization": "string",
    "styles": null
  },
  "front_config": {}
}

```

PaywallBuilderV3Data

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywall_builder_id|string(uuid)|false|none|none|
|paywall_id|string(uuid)|false|none|none|
|builder_config|[common__domains__value_objects__paywall_builder__v4__paywall_builder_config__PaywallBuilderV3Config](#schemacommon__domains__value_objects__paywall_builder__v4__paywall_builder_config__paywallbuilderv3config)|true|none|none|
|front_config|object|true|none|none|

<h2 id="tocS_PaywallData">PaywallData</h2>
<!-- backwards compatibility -->
<a id="schemapaywalldata"></a>
<a id="schema_PaywallData"></a>
<a id="tocSpaywalldata"></a>
<a id="tocspaywalldata"></a>

```json
{
  "title": "string",
  "use_paywall_builder": true,
  "use_paywall_builder_v4": false,
  "remote_config_legacy": "string",
  "screenshot_id": 0,
  "builder_screenshot_id": 0,
  "products": [
    {
      "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
      "offer_id": "d5a7a5b7-a4a3-49e7-9c69-b44d2cbe15cf"
    }
  ],
  "remote_configs": [
    {
      "locale": "string",
      "data": "string"
    }
  ],
  "paywall_builder": {
    "format": "2.0.0",
    "template_id": "basic",
    "template_revision": 2,
    "assets": [
      {
        "id": "string",
        "type": "color",
        "value": "string"
      }
    ],
    "default_localization": "en-GB",
    "localizations": [
      {
        "id": "en-GB",
        "strings": [
          {
            "id": "str-title",
            "value": "Become a Premium man",
            "has_tags": false,
            "fallback": "string"
          }
        ],
        "assets": [
          {
            "id": "string",
            "type": "color",
            "value": "string"
          }
        ]
      }
    ],
    "styles": {
      "property1": {
        "footer_block": {
          "property1": "string",
          "property2": "string"
        },
        "features_block": {
          "type": "list"
        },
        "products_block": {
          "type": "single",
          "main_product_index": 0,
          "products": [
            {
              "product_id": "string",
              "type": "product",
              "order": 0
            }
          ]
        }
      },
      "property2": {
        "footer_block": {
          "property1": "string",
          "property2": "string"
        },
        "features_block": {
          "type": "list"
        },
        "products_block": {
          "type": "single",
          "main_product_index": 0,
          "products": [
            {
              "product_id": "string",
              "type": "product",
              "order": 0
            }
          ]
        }
      }
    },
    "is_hard_paywall": false,
    "main_image_relative_height": 0.56
  },
  "paywall_builder_v3": {
    "paywall_builder_id": "efd2d83b-6e30-40be-8394-74d00b6046a1",
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "builder_config": {
      "format": "4.0.0",
      "template_id": "string",
      "template_revision": 0,
      "assets": [
        {
          "id": "string",
          "type": "color",
          "value": "string"
        }
      ],
      "localizations": [
        {
          "id": "string",
          "is_right_to_left": true,
          "strings": [
            {
              "id": "string",
              "value": [
                "string"
              ],
              "fallback": [
                "string"
              ]
            }
          ],
          "assets": [
            {
              "id": "string",
              "type": "color",
              "value": "string"
            }
          ]
        }
      ],
      "default_localization": "string",
      "styles": null
    },
    "front_config": {}
  }
}

```

PaywallData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|use_paywall_builder|boolean|true|none|none|
|use_paywall_builder_v4|boolean|false|none|none|
|remote_config_legacy|string|false|none|none|
|screenshot_id|integer|false|none|none|
|builder_screenshot_id|integer|false|none|none|
|products|[[PaywallProductData](#schemapaywallproductdata)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|remote_configs|[[PaywallRemoteConfigValue](#schemapaywallremoteconfigvalue)]|false|none|none|
|paywall_builder|[portal__in_app_context__domains__value_objects__paywall_builder_v3_config__PaywallBuilderV3Config](#schemaportal__in_app_context__domains__value_objects__paywall_builder_v3_config__paywallbuilderv3config)|false|none|none|
|paywall_builder_v3|[PaywallBuilderV3Data](#schemapaywallbuilderv3data)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_PaywallDataCustomerUserId">PaywallDataCustomerUserId</h2>
<!-- backwards compatibility -->
<a id="schemapaywalldatacustomeruserid"></a>
<a id="schema_PaywallDataCustomerUserId"></a>
<a id="tocSpaywalldatacustomeruserid"></a>
<a id="tocspaywalldatacustomeruserid"></a>

```json
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}

```

PaywallDataCustomerUserId

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|store|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Store](#schemastore)|false|none|An enumeration.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|locale|string|false|none|none|
|placement_id|string|true|none|none|
|customer_user_id|string|true|none|none|

<h2 id="tocS_PaywallDataProfileId">PaywallDataProfileId</h2>
<!-- backwards compatibility -->
<a id="schemapaywalldataprofileid"></a>
<a id="schema_PaywallDataProfileId"></a>
<a id="tocSpaywalldataprofileid"></a>
<a id="tocspaywalldataprofileid"></a>

```json
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8"
}

```

PaywallDataProfileId

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|store|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Store](#schemastore)|false|none|An enumeration.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|locale|string|false|none|none|
|placement_id|string|true|none|none|
|profile_id|string(uuid)|true|none|none|

<h2 id="tocS_PaywallDetailMetricsCollection">PaywallDetailMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemapaywalldetailmetricscollection"></a>
<a id="schema_PaywallDetailMetricsCollection"></a>
<a id="tocSpaywalldetailmetricscollection"></a>
<a id="tocspaywalldetailmetricscollection"></a>

```json
{
  "metrics": {
    "revenue": 0,
    "proceeds": 0,
    "net_revenue": 0,
    "purchases": 0,
    "trials": 0,
    "trials_cancelled": 0,
    "refunds": 0,
    "unique_subscribers": 0,
    "unique_paid_subscribers": 0,
    "views": 0,
    "unique_profiles_views": 0,
    "in_current_state": true,
    "arppu": 0,
    "arpas": 0,
    "apppu": 0,
    "appas": 0,
    "conversion_rate_purchases": 0,
    "conversion_rate_trials": 0,
    "conversion_rate_refunds": 0,
    "conversion_rate_purchases_by_users": 0,
    "conversion_rate_trials_by_users": 0,
    "items": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0
      }
    ],
    "title": "Total"
  },
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "state": "live",
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z",
  "segmentation_by": "product",
  "based_on": "placement"
}

```

PaywallDetailMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metrics|[InAppDetailTotalMetrics](#schemainappdetailtotalmetrics)|true|none|none|
|paywall|[Paywall](#schemapaywall)|true|none|none|
|state|[PaywallState](#schemapaywallstate)|true|none|An enumeration.|
|started_at|string(date-time)|false|none|none|
|stopped_at|string(date-time)|false|none|none|
|segmentation_by|[InAppDetailMetricsSegmentation](#schemainappdetailmetricssegmentation)|false|none|An enumeration.|
|based_on|[InAppDetailMetricsBasedOn](#schemainappdetailmetricsbasedon)|true|none|An enumeration.|

<h2 id="tocS_PaywallDetailMetricsResponse">PaywallDetailMetricsResponse</h2>
<!-- backwards compatibility -->
<a id="schemapaywalldetailmetricsresponse"></a>
<a id="schema_PaywallDetailMetricsResponse"></a>
<a id="tocSpaywalldetailmetricsresponse"></a>
<a id="tocspaywalldetailmetricsresponse"></a>

```json
{
  "data": {
    "metrics": {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "Total"
    },
    "paywall": {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "title": "string",
      "use_paywall_builder": true,
      "use_paywall_builder_v4": true,
      "screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "builder_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "main_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      }
    },
    "state": "live",
    "started_at": "2019-08-24T14:15:22Z",
    "stopped_at": "2019-08-24T14:15:22Z",
    "segmentation_by": "product",
    "based_on": "placement"
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

PaywallDetailMetricsResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[PaywallDetailMetricsCollection](#schemapaywalldetailmetricscollection)|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_PaywallLatestPlacementResponse">PaywallLatestPlacementResponse</h2>
<!-- backwards compatibility -->
<a id="schemapaywalllatestplacementresponse"></a>
<a id="schema_PaywallLatestPlacementResponse"></a>
<a id="tocSpaywalllatestplacementresponse"></a>
<a id="tocspaywalllatestplacementresponse"></a>

```json
{
  "data": [
    {
      "placement": {
        "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
        "title": "string",
        "created_at": "2019-08-24T14:15:22Z"
      },
      "state": "live",
      "audiences": [
        {
          "audience": {
            "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
            "title": "string",
            "is_default": true
          },
          "started_at": "2019-08-24T14:15:22Z",
          "finished_at": "2019-08-24T14:15:22Z",
          "content_type": "ab_test"
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

PaywallLatestPlacementResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[PaywallLatestPlacementUsingValue](#schemapaywalllatestplacementusingvalue)]|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_PaywallLatestPlacementUsingAudienceValue">PaywallLatestPlacementUsingAudienceValue</h2>
<!-- backwards compatibility -->
<a id="schemapaywalllatestplacementusingaudiencevalue"></a>
<a id="schema_PaywallLatestPlacementUsingAudienceValue"></a>
<a id="tocSpaywalllatestplacementusingaudiencevalue"></a>
<a id="tocspaywalllatestplacementusingaudiencevalue"></a>

```json
{
  "audience": {
    "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
    "title": "string",
    "is_default": true
  },
  "started_at": "2019-08-24T14:15:22Z",
  "finished_at": "2019-08-24T14:15:22Z",
  "content_type": "ab_test"
}

```

PaywallLatestPlacementUsingAudienceValue

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|audience|[Audience](#schemaaudience)|true|none|none|
|started_at|string(date-time)|false|none|none|
|finished_at|string(date-time)|false|none|none|
|content_type|[PlacementContentType](#schemaplacementcontenttype)|true|none|An enumeration.|

<h2 id="tocS_PaywallLatestPlacementUsingValue">PaywallLatestPlacementUsingValue</h2>
<!-- backwards compatibility -->
<a id="schemapaywalllatestplacementusingvalue"></a>
<a id="schema_PaywallLatestPlacementUsingValue"></a>
<a id="tocSpaywalllatestplacementusingvalue"></a>
<a id="tocspaywalllatestplacementusingvalue"></a>

```json
{
  "placement": {
    "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
    "title": "string",
    "created_at": "2019-08-24T14:15:22Z"
  },
  "state": "live",
  "audiences": [
    {
      "audience": {
        "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
        "title": "string",
        "is_default": true
      },
      "started_at": "2019-08-24T14:15:22Z",
      "finished_at": "2019-08-24T14:15:22Z",
      "content_type": "ab_test"
    }
  ]
}

```

PaywallLatestPlacementUsingValue

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|placement|[Placement](#schemaplacement)|true|none|none|
|state|[State](#schemastate)|true|none|An enumeration.|
|audiences|[[PaywallLatestPlacementUsingAudienceValue](#schemapaywalllatestplacementusingaudiencevalue)]|true|none|none|

<h2 id="tocS_PaywallListMetrics">PaywallListMetrics</h2>
<!-- backwards compatibility -->
<a id="schemapaywalllistmetrics"></a>
<a id="schema_PaywallListMetrics"></a>
<a id="tocSpaywalllistmetrics"></a>
<a id="tocspaywalllistmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "last_purchases": "2019-08-24T14:15:22Z"
}

```

PaywallListMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|paywall_id|string(uuid)|true|none|none|
|last_purchases|string(date-time)|false|none|none|

<h2 id="tocS_PaywallListMetricsCollection">PaywallListMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemapaywalllistmetricscollection"></a>
<a id="schema_PaywallListMetricsCollection"></a>
<a id="tocSpaywalllistmetricscollection"></a>
<a id="tocspaywalllistmetricscollection"></a>

```json
{
  "data": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "last_purchases": "2019-08-24T14:15:22Z"
    }
  ],
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

PaywallListMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[PaywallListMetrics](#schemapaywalllistmetrics)]|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_PaywallMetrics">PaywallMetrics</h2>
<!-- backwards compatibility -->
<a id="schemapaywallmetrics"></a>
<a id="schema_PaywallMetrics"></a>
<a id="tocSpaywallmetrics"></a>
<a id="tocspaywallmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "content_type": "paywall",
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z"
}

```

PaywallMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|paywall|[Paywall](#schemapaywall)|true|none|none|
|content_type|[PlacementAudienceContentType](#schemaplacementaudiencecontenttype)|false|none|An enumeration.|
|started_at|string(date-time)|false|none|none|
|stopped_at|string(date-time)|false|none|none|

<h2 id="tocS_PaywallProduct">PaywallProduct</h2>
<!-- backwards compatibility -->
<a id="schemapaywallproduct"></a>
<a id="schema_PaywallProduct"></a>
<a id="tocSpaywallproduct"></a>
<a id="tocspaywallproduct"></a>

```json
{
  "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
  "title": "string",
  "product_set": "uncategorised",
  "offer": {
    "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
    "title": "string"
  },
  "ordering_index": 0
}

```

PaywallProduct

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|string(uuid)|true|none|none|
|title|string|true|none|none|
|product_set|[ProductCategory](#schemaproductcategory)|false|none|An enumeration.|
|offer|[ProductOffer](#schemaproductoffer)|false|none|none|
|ordering_index|integer|true|none|none|

<h2 id="tocS_PaywallProductData">PaywallProductData</h2>
<!-- backwards compatibility -->
<a id="schemapaywallproductdata"></a>
<a id="schema_PaywallProductData"></a>
<a id="tocSpaywallproductdata"></a>
<a id="tocspaywallproductdata"></a>

```json
{
  "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
  "offer_id": "d5a7a5b7-a4a3-49e7-9c69-b44d2cbe15cf"
}

```

PaywallProductData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|string(uuid)|true|none|none|
|offer_id|string(uuid)|false|none|none|

<h2 id="tocS_PaywallRelatedAggregate">PaywallRelatedAggregate</h2>
<!-- backwards compatibility -->
<a id="schemapaywallrelatedaggregate"></a>
<a id="schema_PaywallRelatedAggregate"></a>
<a id="tocSpaywallrelatedaggregate"></a>
<a id="tocspaywallrelatedaggregate"></a>

```json
{
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  },
  "builder_screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  },
  "products": [
    {
      "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
      "title": "string",
      "product_set": "uncategorised",
      "offer": {
        "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
        "title": "string"
      },
      "ordering_index": 0
    }
  ]
}

```

PaywallRelatedAggregate

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywall|[Paywall](#schemapaywall)|true|none|none|
|screenshot|[Image](#schemaimage)|false|none|none|
|builder_screenshot|[Image](#schemaimage)|false|none|none|
|products|[[PaywallProduct](#schemapaywallproduct)]|true|none|none|

<h2 id="tocS_PaywallRemoteConfigValue">PaywallRemoteConfigValue</h2>
<!-- backwards compatibility -->
<a id="schemapaywallremoteconfigvalue"></a>
<a id="schema_PaywallRemoteConfigValue"></a>
<a id="tocSpaywallremoteconfigvalue"></a>
<a id="tocspaywallremoteconfigvalue"></a>

```json
{
  "locale": "string",
  "data": "string"
}

```

PaywallRemoteConfigValue

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|locale|string|true|none|none|
|data|string|true|none|none|

<h2 id="tocS_PaywallRequestData">PaywallRequestData</h2>
<!-- backwards compatibility -->
<a id="schemapaywallrequestdata"></a>
<a id="schema_PaywallRequestData"></a>
<a id="tocSpaywallrequestdata"></a>
<a id="tocspaywallrequestdata"></a>

```json
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}

```

PaywallRequestData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PaywallRequestData|any|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[PaywallDataCustomerUserId](#schemapaywalldatacustomeruserid)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[PaywallDataProfileId](#schemapaywalldataprofileid)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_PaywallResponseData">PaywallResponseData</h2>
<!-- backwards compatibility -->
<a id="schemapaywallresponsedata"></a>
<a id="schema_PaywallResponseData"></a>
<a id="tocSpaywallresponsedata"></a>
<a id="tocspaywallresponsedata"></a>

```json
{
  "placement_id": "string",
  "variation_id": "5130138e-590b-4f7e-8df9-63af0004262c",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "ab_test_name": "string",
  "paywall_name": "string",
  "products": [
    {
      "title": "string",
      "is_consumable": true,
      "adapty_product_id": "6414dbe0-1fa8-4590-a838-ec1ead8ab951",
      "vendor_product_id": "string",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": false,
      "base_plan_id": "string",
      "offer": {
        "category": "no_offer",
        "type": "free_trial",
        "id": "string"
      }
    }
  ],
  "remote_config": {
    "lang": "string",
    "data": "string"
  }
}

```

PaywallResponseData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|placement_id|string|true|none|none|
|variation_id|string(uuid)|true|none|none|
|paywall_id|string(uuid)|true|none|none|
|ab_test_name|string|false|none|none|
|paywall_name|string|true|none|none|
|products|[[VariationProduct](#schemavariationproduct)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|remote_config|[VariationRemoteConfigData](#schemavariationremoteconfigdata)|false|none|none|

<h2 id="tocS_PaywallState">PaywallState</h2>
<!-- backwards compatibility -->
<a id="schemapaywallstate"></a>
<a id="schema_PaywallState"></a>
<a id="tocSpaywallstate"></a>
<a id="tocspaywallstate"></a>

```json
"live"

```

PaywallState

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PaywallState|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|PaywallState|live|
|PaywallState|inactive|
|PaywallState|draft|
|PaywallState|archived|

<h2 id="tocS_PaywallVisitDataCustomerUserId">PaywallVisitDataCustomerUserId</h2>
<!-- backwards compatibility -->
<a id="schemapaywallvisitdatacustomeruserid"></a>
<a id="schema_PaywallVisitDataCustomerUserId"></a>
<a id="tocSpaywallvisitdatacustomeruserid"></a>
<a id="tocspaywallvisitdatacustomeruserid"></a>

```json
{
  "visited_at": "2019-08-24T14:15:22Z",
  "store": "adapty",
  "variation_id": "5130138e-590b-4f7e-8df9-63af0004262c",
  "customer_user_id": "string"
}

```

PaywallVisitDataCustomerUserId

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|visited_at|string(date-time)|false|none|none|
|store|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Store](#schemastore)|false|none|An enumeration.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|variation_id|string(uuid)|true|none|none|
|customer_user_id|string|true|none|none|

<h2 id="tocS_PaywallVisitDataProfileId">PaywallVisitDataProfileId</h2>
<!-- backwards compatibility -->
<a id="schemapaywallvisitdataprofileid"></a>
<a id="schema_PaywallVisitDataProfileId"></a>
<a id="tocSpaywallvisitdataprofileid"></a>
<a id="tocspaywallvisitdataprofileid"></a>

```json
{
  "visited_at": "2019-08-24T14:15:22Z",
  "store": "adapty",
  "variation_id": "5130138e-590b-4f7e-8df9-63af0004262c",
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8"
}

```

PaywallVisitDataProfileId

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|visited_at|string(date-time)|false|none|none|
|store|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Store](#schemastore)|false|none|An enumeration.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|variation_id|string(uuid)|true|none|none|
|profile_id|string(uuid)|true|none|none|

<h2 id="tocS_PaywallVisitRequestData">PaywallVisitRequestData</h2>
<!-- backwards compatibility -->
<a id="schemapaywallvisitrequestdata"></a>
<a id="schema_PaywallVisitRequestData"></a>
<a id="tocSpaywallvisitrequestdata"></a>
<a id="tocspaywallvisitrequestdata"></a>

```json
{
  "visited_at": "2019-08-24T14:15:22Z",
  "store": "adapty",
  "variation_id": "5130138e-590b-4f7e-8df9-63af0004262c",
  "customer_user_id": "string"
}

```

PaywallVisitRequestData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PaywallVisitRequestData|any|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[PaywallVisitDataCustomerUserId](#schemapaywallvisitdatacustomeruserid)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[PaywallVisitDataProfileId](#schemapaywallvisitdataprofileid)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_PaywallsGroup">PaywallsGroup</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgroup"></a>
<a id="schema_PaywallsGroup"></a>
<a id="tocSpaywallsgroup"></a>
<a id="tocspaywallsgroup"></a>

```json
{
  "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
  "title": "string"
}

```

PaywallsGroup

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywalls_group_id|string(uuid)|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_PaywallsGroupAggregate">PaywallsGroupAggregate</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgroupaggregate"></a>
<a id="schema_PaywallsGroupAggregate"></a>
<a id="tocSpaywallsgroupaggregate"></a>
<a id="tocspaywallsgroupaggregate"></a>

```json
{
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "paywalls": [
    {
      "paywalls_group_paywall": {
        "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610",
        "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
        "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
        "ordering_index": 0
      },
      "paywall": {
        "paywall": {
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "title": "string",
          "use_paywall_builder": true,
          "use_paywall_builder_v4": true,
          "screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "builder_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "main_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          }
        },
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "products": [
          {
            "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
            "title": "string",
            "product_set": "uncategorised",
            "offer": {
              "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
              "title": "string"
            },
            "ordering_index": 0
          }
        ]
      }
    }
  ]
}

```

PaywallsGroupAggregate

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywalls_group|[PaywallsGroup](#schemapaywallsgroup)|true|none|none|
|paywalls|[[PaywallsGroupPaywallAggregate](#schemapaywallsgrouppaywallaggregate)]|true|none|none|

<h2 id="tocS_PaywallsGroupData">PaywallsGroupData</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgroupdata"></a>
<a id="schema_PaywallsGroupData"></a>
<a id="tocSpaywallsgroupdata"></a>
<a id="tocspaywallsgroupdata"></a>

```json
{
  "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
  "title": "string"
}

```

PaywallsGroupData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywalls_group_id|string(uuid)|false|none|none|
|title|string|false|none|none|

<h2 id="tocS_PaywallsGroupDetailMetricsCollection">PaywallsGroupDetailMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgroupdetailmetricscollection"></a>
<a id="schema_PaywallsGroupDetailMetricsCollection"></a>
<a id="tocSpaywallsgroupdetailmetricscollection"></a>
<a id="tocspaywallsgroupdetailmetricscollection"></a>

```json
{
  "metrics": {
    "revenue": 0,
    "proceeds": 0,
    "net_revenue": 0,
    "purchases": 0,
    "trials": 0,
    "trials_cancelled": 0,
    "refunds": 0,
    "unique_subscribers": 0,
    "unique_paid_subscribers": 0,
    "views": 0,
    "unique_profiles_views": 0,
    "in_current_state": true,
    "arppu": 0,
    "arpas": 0,
    "apppu": 0,
    "appas": 0,
    "conversion_rate_purchases": 0,
    "conversion_rate_trials": 0,
    "conversion_rate_refunds": 0,
    "conversion_rate_purchases_by_users": 0,
    "conversion_rate_trials_by_users": 0,
    "items": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0
      }
    ],
    "title": "Total"
  },
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "state": "live",
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z",
  "based_on": "placement",
  "segmentation_by": "product"
}

```

PaywallsGroupDetailMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metrics|[InAppDetailTotalMetrics](#schemainappdetailtotalmetrics)|true|none|none|
|paywalls_group|[PaywallsGroup](#schemapaywallsgroup)|true|none|none|
|state|[PaywallsGroupState](#schemapaywallsgroupstate)|true|none|An enumeration.|
|started_at|string(date-time)|false|none|none|
|stopped_at|string(date-time)|false|none|none|
|based_on|[InAppDetailMetricsBasedOn](#schemainappdetailmetricsbasedon)|true|none|An enumeration.|
|segmentation_by|[InAppDetailMetricsSegmentation](#schemainappdetailmetricssegmentation)|false|none|An enumeration.|

<h2 id="tocS_PaywallsGroupDetailMetricsResponse">PaywallsGroupDetailMetricsResponse</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgroupdetailmetricsresponse"></a>
<a id="schema_PaywallsGroupDetailMetricsResponse"></a>
<a id="tocSpaywallsgroupdetailmetricsresponse"></a>
<a id="tocspaywallsgroupdetailmetricsresponse"></a>

```json
{
  "data": {
    "metrics": {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "Total"
    },
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "state": "live",
    "started_at": "2019-08-24T14:15:22Z",
    "stopped_at": "2019-08-24T14:15:22Z",
    "based_on": "placement",
    "segmentation_by": "product"
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

PaywallsGroupDetailMetricsResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[PaywallsGroupDetailMetricsCollection](#schemapaywallsgroupdetailmetricscollection)|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_PaywallsGroupMetrics">PaywallsGroupMetrics</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgroupmetrics"></a>
<a id="schema_PaywallsGroupMetrics"></a>
<a id="tocSpaywallsgroupmetrics"></a>
<a id="tocspaywallsgroupmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "string",
      "paywall": {
        "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
        "title": "string",
        "use_paywall_builder": true,
        "use_paywall_builder_v4": true,
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "main_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        }
      },
      "values": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "period": "2019-08-24T14:15:22Z",
          "low_boundary": 0,
          "average_per_1000": 0,
          "upper_boundary": 0,
          "probability": 0
        }
      ],
      "weight": 0,
      "low_boundary": 0,
      "average_per_1000": 0,
      "upper_boundary": 0,
      "probability": 0
    }
  ],
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  }
}

```

PaywallsGroupMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|items|[[ABTestPaywallMetrics](#schemaabtestpaywallmetrics)]|true|none|none|
|paywalls_group|[PaywallsGroup](#schemapaywallsgroup)|true|none|none|

<h2 id="tocS_PaywallsGroupPaywall">PaywallsGroupPaywall</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgrouppaywall"></a>
<a id="schema_PaywallsGroupPaywall"></a>
<a id="tocSpaywallsgrouppaywall"></a>
<a id="tocspaywallsgrouppaywall"></a>

```json
{
  "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610",
  "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "ordering_index": 0
}

```

PaywallsGroupPaywall

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywalls_group_paywall_id|string(uuid)|false|none|none|
|paywalls_group_id|string(uuid)|false|none|none|
|paywall_id|string(uuid)|true|none|none|
|ordering_index|integer|true|none|none|

<h2 id="tocS_PaywallsGroupPaywallAggregate">PaywallsGroupPaywallAggregate</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgrouppaywallaggregate"></a>
<a id="schema_PaywallsGroupPaywallAggregate"></a>
<a id="tocSpaywallsgrouppaywallaggregate"></a>
<a id="tocspaywallsgrouppaywallaggregate"></a>

```json
{
  "paywalls_group_paywall": {
    "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610",
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "ordering_index": 0
  },
  "paywall": {
    "paywall": {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "title": "string",
      "use_paywall_builder": true,
      "use_paywall_builder_v4": true,
      "screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "builder_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "main_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      }
    },
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "products": [
      {
        "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
        "title": "string",
        "product_set": "uncategorised",
        "offer": {
          "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
          "title": "string"
        },
        "ordering_index": 0
      }
    ]
  }
}

```

PaywallsGroupPaywallAggregate

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paywalls_group_paywall|[PaywallsGroupPaywall](#schemapaywallsgrouppaywall)|true|none|none|
|paywall|[PaywallRelatedAggregate](#schemapaywallrelatedaggregate)|true|none|Difference with state of included pydantic fields.|

<h2 id="tocS_PaywallsGroupState">PaywallsGroupState</h2>
<!-- backwards compatibility -->
<a id="schemapaywallsgroupstate"></a>
<a id="schema_PaywallsGroupState"></a>
<a id="tocSpaywallsgroupstate"></a>
<a id="tocspaywallsgroupstate"></a>

```json
"live"

```

PaywallsGroupState

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PaywallsGroupState|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|PaywallsGroupState|live|
|PaywallsGroupState|inactive|
|PaywallsGroupState|draft|
|PaywallsGroupState|archived|

<h2 id="tocS_PeriodUnit">PeriodUnit</h2>
<!-- backwards compatibility -->
<a id="schemaperiodunit"></a>
<a id="schema_PeriodUnit"></a>
<a id="tocSperiodunit"></a>
<a id="tocsperiodunit"></a>

```json
"day"

```

PeriodUnit

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PeriodUnit|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|PeriodUnit|day|
|PeriodUnit|week|
|PeriodUnit|month|
|PeriodUnit|quarter|
|PeriodUnit|year|

<h2 id="tocS_Placement">Placement</h2>
<!-- backwards compatibility -->
<a id="schemaplacement"></a>
<a id="schema_Placement"></a>
<a id="tocSplacement"></a>
<a id="tocsplacement"></a>

```json
{
  "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
  "title": "string",
  "created_at": "2019-08-24T14:15:22Z"
}

```

Placement

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|placement_id|string(uuid)|true|none|none|
|title|string|true|none|none|
|created_at|string(date-time)|true|none|none|

<h2 id="tocS_PlacementAudienceContentType">PlacementAudienceContentType</h2>
<!-- backwards compatibility -->
<a id="schemaplacementaudiencecontenttype"></a>
<a id="schema_PlacementAudienceContentType"></a>
<a id="tocSplacementaudiencecontenttype"></a>
<a id="tocsplacementaudiencecontenttype"></a>

```json
"ab_test"

```

PlacementAudienceContentType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PlacementAudienceContentType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|PlacementAudienceContentType|ab_test|
|PlacementAudienceContentType|paywall|

<h2 id="tocS_PlacementAudienceData">PlacementAudienceData</h2>
<!-- backwards compatibility -->
<a id="schemaplacementaudiencedata"></a>
<a id="schema_PlacementAudienceData"></a>
<a id="tocSplacementaudiencedata"></a>
<a id="tocsplacementaudiencedata"></a>

```json
{
  "segments": [
    {
      "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c"
    }
  ],
  "priority": 0,
  "content_id": "713e4c61-5a69-43fb-a600-2e2699462e14",
  "content_type": "ab_test"
}

```

PlacementAudienceData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|segments|[[PlacementAudienceSegment](#schemaplacementaudiencesegment)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|priority|integer|true|none|none|
|content_id|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string(uuid)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string(uuid)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|content_type|[PlacementContentType](#schemaplacementcontenttype)|false|none|An enumeration.|

<h2 id="tocS_PlacementAudienceSegment">PlacementAudienceSegment</h2>
<!-- backwards compatibility -->
<a id="schemaplacementaudiencesegment"></a>
<a id="schema_PlacementAudienceSegment"></a>
<a id="tocSplacementaudiencesegment"></a>
<a id="tocsplacementaudiencesegment"></a>

```json
{
  "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c"
}

```

PlacementAudienceSegment

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|segment_id|string(uuid)|true|none|none|

<h2 id="tocS_PlacementContentType">PlacementContentType</h2>
<!-- backwards compatibility -->
<a id="schemaplacementcontenttype"></a>
<a id="schema_PlacementContentType"></a>
<a id="tocSplacementcontenttype"></a>
<a id="tocsplacementcontenttype"></a>

```json
"ab_test"

```

PlacementContentType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PlacementContentType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|PlacementContentType|ab_test|
|PlacementContentType|paywall|

<h2 id="tocS_PlacementData">PlacementData</h2>
<!-- backwards compatibility -->
<a id="schemaplacementdata"></a>
<a id="schema_PlacementData"></a>
<a id="tocSplacementdata"></a>
<a id="tocsplacementdata"></a>

```json
{
  "title": "string",
  "developer_id": "string",
  "audiences": [
    {
      "segments": [
        {
          "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c"
        }
      ],
      "priority": 0,
      "content_id": "713e4c61-5a69-43fb-a600-2e2699462e14",
      "content_type": "ab_test"
    }
  ]
}

```

PlacementData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|developer_id|string|true|none|none|
|audiences|[[PlacementAudienceData](#schemaplacementaudiencedata)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|

<h2 id="tocS_PlacementDetailMetricsCollection">PlacementDetailMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemaplacementdetailmetricscollection"></a>
<a id="schema_PlacementDetailMetricsCollection"></a>
<a id="tocSplacementdetailmetricscollection"></a>
<a id="tocsplacementdetailmetricscollection"></a>

```json
{
  "metrics": {
    "revenue": 0,
    "proceeds": 0,
    "net_revenue": 0,
    "purchases": 0,
    "trials": 0,
    "trials_cancelled": 0,
    "refunds": 0,
    "unique_subscribers": 0,
    "unique_paid_subscribers": 0,
    "views": 0,
    "unique_profiles_views": 0,
    "in_current_state": true,
    "arppu": 0,
    "arpas": 0,
    "apppu": 0,
    "appas": 0,
    "conversion_rate_purchases": 0,
    "conversion_rate_trials": 0,
    "conversion_rate_refunds": 0,
    "conversion_rate_purchases_by_users": 0,
    "conversion_rate_trials_by_users": 0,
    "items": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0
      }
    ],
    "title": "Total"
  },
  "placement": {
    "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
    "title": "string",
    "created_at": "2019-08-24T14:15:22Z"
  },
  "based_on": "audience",
  "segmentation_by": "product"
}

```

PlacementDetailMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metrics|[InAppDetailTotalMetrics](#schemainappdetailtotalmetrics)|true|none|none|
|placement|[Placement](#schemaplacement)|true|none|none|
|based_on|[InAppDetailMetricsBasedOn](#schemainappdetailmetricsbasedon)|false|none|An enumeration.|
|segmentation_by|[InAppDetailMetricsSegmentation](#schemainappdetailmetricssegmentation)|false|none|An enumeration.|

<h2 id="tocS_PlacementDetailMetricsResponse">PlacementDetailMetricsResponse</h2>
<!-- backwards compatibility -->
<a id="schemaplacementdetailmetricsresponse"></a>
<a id="schema_PlacementDetailMetricsResponse"></a>
<a id="tocSplacementdetailmetricsresponse"></a>
<a id="tocsplacementdetailmetricsresponse"></a>

```json
{
  "data": {
    "metrics": {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "Total"
    },
    "placement": {
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
      "title": "string",
      "created_at": "2019-08-24T14:15:22Z"
    },
    "based_on": "audience",
    "segmentation_by": "product"
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

PlacementDetailMetricsResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[PlacementDetailMetricsCollection](#schemaplacementdetailmetricscollection)|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_PlacementDetailTotalMetricsCollection">PlacementDetailTotalMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemaplacementdetailtotalmetricscollection"></a>
<a id="schema_PlacementDetailTotalMetricsCollection"></a>
<a id="tocSplacementdetailtotalmetricscollection"></a>
<a id="tocsplacementdetailtotalmetricscollection"></a>

```json
{
  "metrics": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "items": [
            {
              "revenue": 0,
              "proceeds": 0,
              "net_revenue": 0,
              "purchases": 0,
              "trials": 0,
              "trials_cancelled": 0,
              "refunds": 0,
              "unique_subscribers": 0,
              "unique_paid_subscribers": 0,
              "views": 0,
              "unique_profiles_views": 0,
              "in_current_state": true,
              "arppu": 0,
              "arpas": 0,
              "apppu": 0,
              "appas": 0,
              "conversion_rate_purchases": 0,
              "conversion_rate_trials": 0,
              "conversion_rate_refunds": 0,
              "conversion_rate_purchases_by_users": 0,
              "conversion_rate_trials_by_users": 0,
              "items": [
                {
                  "revenue": 0,
                  "proceeds": 0,
                  "net_revenue": 0,
                  "purchases": 0,
                  "trials": 0,
                  "trials_cancelled": 0,
                  "refunds": 0,
                  "unique_subscribers": 0,
                  "unique_paid_subscribers": 0,
                  "views": 0,
                  "unique_profiles_views": 0,
                  "in_current_state": true,
                  "arppu": 0,
                  "arpas": 0,
                  "apppu": 0,
                  "appas": 0,
                  "conversion_rate_purchases": 0,
                  "conversion_rate_trials": 0,
                  "conversion_rate_refunds": 0,
                  "conversion_rate_purchases_by_users": 0,
                  "conversion_rate_trials_by_users": 0,
                  "items": [
                    {}
                  ],
                  "title": "string",
                  "paywall": {
                    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
                    "title": "string",
                    "use_paywall_builder": true,
                    "use_paywall_builder_v4": true,
                    "screenshot": {},
                    "builder_screenshot": {},
                    "main_screenshot": {}
                  },
                  "values": [
                    {}
                  ],
                  "weight": 0,
                  "low_boundary": 0,
                  "average_per_1000": 0,
                  "upper_boundary": 0,
                  "probability": 0
                }
              ],
              "paywalls_group": {
                "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
                "title": "string"
              }
            }
          ],
          "ab_test": {
            "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
            "title": "string",
            "goal": "string",
            "paywalls_group": {
              "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
              "title": "string"
            },
            "created_at": "2019-08-24T14:15:22Z"
          },
          "predict": {
            "certainty": true,
            "probabilities": [
              {
                "property1": 0,
                "property2": 0
              }
            ]
          },
          "content_type": "ab_test"
        }
      ],
      "audience": {
        "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
        "title": "string",
        "is_default": true
      },
      "title": "string"
    }
  ],
  "placement": {
    "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
    "title": "string",
    "created_at": "2019-08-24T14:15:22Z"
  }
}

```

PlacementDetailTotalMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metrics|[[AudienceBasedDetailMetrics](#schemaaudiencebaseddetailmetrics)]|true|none|none|
|placement|[Placement](#schemaplacement)|true|none|none|

<h2 id="tocS_PlacementDetailTotalMetricsResponse">PlacementDetailTotalMetricsResponse</h2>
<!-- backwards compatibility -->
<a id="schemaplacementdetailtotalmetricsresponse"></a>
<a id="schema_PlacementDetailTotalMetricsResponse"></a>
<a id="tocSplacementdetailtotalmetricsresponse"></a>
<a id="tocsplacementdetailtotalmetricsresponse"></a>

```json
{
  "data": {
    "metrics": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0,
        "items": [
          {
            "revenue": 0,
            "proceeds": 0,
            "net_revenue": 0,
            "purchases": 0,
            "trials": 0,
            "trials_cancelled": 0,
            "refunds": 0,
            "unique_subscribers": 0,
            "unique_paid_subscribers": 0,
            "views": 0,
            "unique_profiles_views": 0,
            "in_current_state": true,
            "arppu": 0,
            "arpas": 0,
            "apppu": 0,
            "appas": 0,
            "conversion_rate_purchases": 0,
            "conversion_rate_trials": 0,
            "conversion_rate_refunds": 0,
            "conversion_rate_purchases_by_users": 0,
            "conversion_rate_trials_by_users": 0,
            "items": [
              {
                "revenue": 0,
                "proceeds": 0,
                "net_revenue": 0,
                "purchases": 0,
                "trials": 0,
                "trials_cancelled": 0,
                "refunds": 0,
                "unique_subscribers": 0,
                "unique_paid_subscribers": 0,
                "views": 0,
                "unique_profiles_views": 0,
                "in_current_state": true,
                "arppu": 0,
                "arpas": 0,
                "apppu": 0,
                "appas": 0,
                "conversion_rate_purchases": 0,
                "conversion_rate_trials": 0,
                "conversion_rate_refunds": 0,
                "conversion_rate_purchases_by_users": 0,
                "conversion_rate_trials_by_users": 0,
                "items": [
                  {
                    "revenue": 0,
                    "proceeds": 0,
                    "net_revenue": 0,
                    "purchases": 0,
                    "trials": 0,
                    "trials_cancelled": 0,
                    "refunds": 0,
                    "unique_subscribers": 0,
                    "unique_paid_subscribers": 0,
                    "views": 0,
                    "unique_profiles_views": 0,
                    "in_current_state": true,
                    "arppu": 0,
                    "arpas": 0,
                    "apppu": 0,
                    "appas": 0,
                    "conversion_rate_purchases": 0,
                    "conversion_rate_trials": 0,
                    "conversion_rate_refunds": 0,
                    "conversion_rate_purchases_by_users": 0,
                    "conversion_rate_trials_by_users": 0,
                    "items": [],
                    "title": "string",
                    "paywall": {},
                    "values": [],
                    "weight": 0,
                    "low_boundary": 0,
                    "average_per_1000": 0,
                    "upper_boundary": 0,
                    "probability": 0
                  }
                ],
                "paywalls_group": {
                  "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
                  "title": "string"
                }
              }
            ],
            "ab_test": {
              "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
              "title": "string",
              "goal": "string",
              "paywalls_group": {
                "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
                "title": "string"
              },
              "created_at": "2019-08-24T14:15:22Z"
            },
            "predict": {
              "certainty": true,
              "probabilities": [
                {
                  "property1": 0,
                  "property2": 0
                }
              ]
            },
            "content_type": "ab_test"
          }
        ],
        "audience": {
          "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
          "title": "string",
          "is_default": true
        },
        "title": "string"
      }
    ],
    "placement": {
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
      "title": "string",
      "created_at": "2019-08-24T14:15:22Z"
    }
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

PlacementDetailTotalMetricsResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[PlacementDetailTotalMetricsCollection](#schemaplacementdetailtotalmetricscollection)|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_PlacementListMetrics">PlacementListMetrics</h2>
<!-- backwards compatibility -->
<a id="schemaplacementlistmetrics"></a>
<a id="schema_PlacementListMetrics"></a>
<a id="tocSplacementlistmetrics"></a>
<a id="tocsplacementlistmetrics"></a>

```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461"
}

```

PlacementListMetrics

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|revenue|number|false|none|none|
|proceeds|number|false|none|none|
|net_revenue|number|false|none|none|
|purchases|integer|false|none|none|
|trials|integer|false|none|none|
|trials_cancelled|integer|false|none|none|
|refunds|integer|false|none|none|
|unique_subscribers|integer|false|none|none|
|unique_paid_subscribers|integer|false|none|none|
|views|integer|false|none|none|
|unique_profiles_views|integer|false|none|none|
|in_current_state|boolean|false|none|none|
|arppu|number|false|none|none|
|arpas|number|false|none|none|
|apppu|number|false|none|none|
|appas|number|false|none|none|
|conversion_rate_purchases|number|false|none|none|
|conversion_rate_trials|number|false|none|none|
|conversion_rate_refunds|number|false|none|none|
|conversion_rate_purchases_by_users|number|false|none|none|
|conversion_rate_trials_by_users|number|false|none|none|
|placement_id|string(uuid)|true|none|none|

<h2 id="tocS_PlacementListMetricsCollection">PlacementListMetricsCollection</h2>
<!-- backwards compatibility -->
<a id="schemaplacementlistmetricscollection"></a>
<a id="schema_PlacementListMetricsCollection"></a>
<a id="tocSplacementlistmetricscollection"></a>
<a id="tocsplacementlistmetricscollection"></a>

```json
{
  "data": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461"
    }
  ],
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

PlacementListMetricsCollection

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[PlacementListMetrics](#schemaplacementlistmetrics)]|true|none|none|
|meta|[Meta](#schemameta)|false|none|none|

<h2 id="tocS_Points">Points</h2>
<!-- backwards compatibility -->
<a id="schemapoints"></a>
<a id="schema_Points"></a>
<a id="tocSpoints"></a>
<a id="tocspoints"></a>

```json
{
  "x0": 0,
  "y0": 0,
  "x1": 0,
  "y1": 0
}

```

Points

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|x0|number|true|none|none|
|y0|number|true|none|none|
|x1|number|true|none|none|
|y1|number|true|none|none|

<h2 id="tocS_PredictionMonths">PredictionMonths</h2>
<!-- backwards compatibility -->
<a id="schemapredictionmonths"></a>
<a id="schema_PredictionMonths"></a>
<a id="tocSpredictionmonths"></a>
<a id="tocspredictionmonths"></a>

```json
3

```

PredictionMonths

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PredictionMonths|integer|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|PredictionMonths|3|
|PredictionMonths|6|
|PredictionMonths|9|
|PredictionMonths|12|
|PredictionMonths|18|
|PredictionMonths|24|

<h2 id="tocS_Product">Product</h2>
<!-- backwards compatibility -->
<a id="schemaproduct"></a>
<a id="schema_Product"></a>
<a id="tocSproduct"></a>
<a id="tocsproduct"></a>

```json
{
  "product_id": "string",
  "type": "product",
  "order": 0
}

```

Product

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|string|true|none|none|
|type|string|true|none|none|
|order|integer|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|product|

<h2 id="tocS_ProductCategory">ProductCategory</h2>
<!-- backwards compatibility -->
<a id="schemaproductcategory"></a>
<a id="schema_ProductCategory"></a>
<a id="tocSproductcategory"></a>
<a id="tocsproductcategory"></a>

```json
"weekly"

```

ProductCategory

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ProductCategory|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ProductCategory|weekly|
|ProductCategory|monthly|
|ProductCategory|trimonthly|
|ProductCategory|semiannual|
|ProductCategory|annual|
|ProductCategory|lifetime|
|ProductCategory|uncategorised|
|ProductCategory|nonsubscriptions|
|ProductCategory|two_months|
|ProductCategory|consumable|

<h2 id="tocS_ProductOffer">ProductOffer</h2>
<!-- backwards compatibility -->
<a id="schemaproductoffer"></a>
<a id="schema_ProductOffer"></a>
<a id="tocSproductoffer"></a>
<a id="tocsproductoffer"></a>

```json
{
  "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
  "title": "string"
}

```

ProductOffer

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_offer_id|string(uuid)|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_ProductsBlock">ProductsBlock</h2>
<!-- backwards compatibility -->
<a id="schemaproductsblock"></a>
<a id="schema_ProductsBlock"></a>
<a id="tocSproductsblock"></a>
<a id="tocsproductsblock"></a>

```json
{
  "type": "single",
  "main_product_index": 0,
  "products": [
    {
      "product_id": "string",
      "type": "product",
      "order": 0
    }
  ]
}

```

ProductsBlock

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|[ProductsBlockType](#schemaproductsblocktype)|true|none|An enumeration.|
|main_product_index|integer|false|none|none|
|products|[[Product](#schemaproduct)]|false|none|none|

<h2 id="tocS_ProductsBlockType">ProductsBlockType</h2>
<!-- backwards compatibility -->
<a id="schemaproductsblocktype"></a>
<a id="schema_ProductsBlockType"></a>
<a id="tocSproductsblocktype"></a>
<a id="tocsproductsblocktype"></a>

```json
"single"

```

ProductsBlockType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ProductsBlockType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ProductsBlockType|single|
|ProductsBlockType|vertical|
|ProductsBlockType|horizontal|

<h2 id="tocS_ProfileDTO">ProfileDTO</h2>
<!-- backwards compatibility -->
<a id="schemaprofiledto"></a>
<a id="schema_ProfileDTO"></a>
<a id="tocSprofiledto"></a>
<a id="tocsprofiledto"></a>

```json
{
  "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8",
  "customer_user_id": "string",
  "total_revenue_usd": 0,
  "segment_hash": "string",
  "timestamp": 0,
  "custom_attributes": [
    {
      "key": "string",
      "value": 0
    }
  ],
  "access_levels": [
    {
      "access_level_id": "string",
      "store": "string",
      "store_product_id": "string",
      "store_base_plan_id": "string",
      "store_transaction_id": "string",
      "store_original_transaction_id": "string",
      "offer": {
        "category": "no_offer",
        "type": "free_trial",
        "id": "string"
      },
      "starts_at": "2019-08-24T14:15:22Z",
      "purchased_at": "2019-08-24T14:15:22Z",
      "originally_purchased_at": "2019-08-24T14:15:22Z",
      "expires_at": "2019-08-24T14:15:22Z",
      "renewal_cancelled_at": "2019-08-24T14:15:22Z",
      "billing_issue_detected_at": "2019-08-24T14:15:22Z",
      "is_in_grace_period": true,
      "cancellation_reason": "billing_error"
    }
  ],
  "subscriptions": [
    {
      "store": "string",
      "store_product_id": "string",
      "store_base_plan_id": "string",
      "store_transaction_id": "string",
      "store_original_transaction_id": "string",
      "offer": {
        "category": "no_offer",
        "type": "free_trial",
        "id": "string"
      },
      "environment": "Sandbox",
      "purchased_at": "2019-08-24T14:15:22Z",
      "originally_purchased_at": "2019-08-24T14:15:22Z",
      "expires_at": "2019-08-24T14:15:22Z",
      "renewal_cancelled_at": "2019-08-24T14:15:22Z",
      "billing_issue_detected_at": "2019-08-24T14:15:22Z",
      "is_in_grace_period": true,
      "cancellation_reason": "billing_error"
    }
  ],
  "non_subscriptions": [
    {
      "purchase_id": "string",
      "store": "string",
      "store_product_id": "string",
      "store_base_plan_id": "string",
      "store_transaction_id": "string",
      "store_original_transaction_id": "string",
      "purchased_at": "2019-08-24T14:15:22Z",
      "environment": "string",
      "is_refund": true,
      "is_consumable": true
    }
  ]
}

```

ProfileDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|app_id|string(uuid)|true|none|none|
|profile_id|string(uuid)|true|none|none|
|customer_user_id|string|false|none|none|
|total_revenue_usd|number|false|none|none|
|segment_hash|string|true|none|none|
|timestamp|integer|true|none|none|
|custom_attributes|[[CustomAttribute](#schemacustomattribute)]|false|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|access_levels|[[ProfilePaidAccessLevelDTO](#schemaprofilepaidaccessleveldto)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|subscriptions|[[ProfileSubscriptionDTO](#schemaprofilesubscriptiondto)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|non_subscriptions|[[ProfileNonSubscriptionDTO](#schemaprofilenonsubscriptiondto)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|

<h2 id="tocS_ProfileData">ProfileData</h2>
<!-- backwards compatibility -->
<a id="schemaprofiledata"></a>
<a id="schema_ProfileData"></a>
<a id="tocSprofiledata"></a>
<a id="tocsprofiledata"></a>

```json
{
  "first_name": "string",
  "last_name": "string",
  "gender": "f",
  "email": "string",
  "phone_number": "string",
  "birthday": "2019-08-24",
  "ip_country": "string",
  "store_country": "string",
  "store": "string",
  "analytics_disabled": true,
  "custom_attributes": [
    {
      "key": "string",
      "value": 0
    }
  ],
  "installation_meta": {
    "device_id": "3bafab7b-4400-4bcf-8e6e-09f954699940",
    "device": "string",
    "locale": "string",
    "os": "string",
    "platform": "iOS",
    "timezone": "string",
    "user_agent": "string",
    "idfa": "string",
    "idfv": "string",
    "advertising_id": "string",
    "android_id": "string",
    "android_app_set_id": "string"
  }
}

```

ProfileData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|first_name|string|false|none|none|
|last_name|string|false|none|none|
|gender|[Gender](#schemagender)|false|none|An enumeration.|
|email|string|false|none|none|
|phone_number|string|false|none|none|
|birthday|string(date)|false|none|none|
|ip_country|string|false|none|none|
|store_country|string|false|none|none|
|store|string|false|none|none|
|analytics_disabled|boolean|false|none|none|
|custom_attributes|[[CustomAttribute](#schemacustomattribute)]|false|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|installation_meta|[ProfileMetaData](#schemaprofilemetadata)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_ProfileIntegrationIdentifiersData">ProfileIntegrationIdentifiersData</h2>
<!-- backwards compatibility -->
<a id="schemaprofileintegrationidentifiersdata"></a>
<a id="schema_ProfileIntegrationIdentifiersData"></a>
<a id="tocSprofileintegrationidentifiersdata"></a>
<a id="tocsprofileintegrationidentifiersdata"></a>

```json
{
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8",
  "facebook_anonymous_id": "string",
  "amplitude_user_id": "string",
  "amplitude_device_id": "string",
  "mixpanel_user_id": "string",
  "appmetrica_profile_id": "string",
  "appmetrica_device_id": "string",
  "one_signal_player_id": "string",
  "one_signal_subscription_id": "string",
  "pushwoosh_hwid": "string",
  "firebase_app_instance_id": "string",
  "airbridge_device_id": "string",
  "appsflyer_id": "string",
  "branch_id": "string",
  "adjust_device_id": "string"
}

```

ProfileIntegrationIdentifiersData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|profile_id|string(uuid)|true|none|none|
|facebook_anonymous_id|string|false|none|none|
|amplitude_user_id|string|false|none|none|
|amplitude_device_id|string|false|none|none|
|mixpanel_user_id|string|false|none|none|
|appmetrica_profile_id|string|false|none|none|
|appmetrica_device_id|string|false|none|none|
|one_signal_player_id|string|false|none|none|
|one_signal_subscription_id|string|false|none|none|
|pushwoosh_hwid|string|false|none|none|
|firebase_app_instance_id|string|false|none|none|
|airbridge_device_id|string|false|none|none|
|appsflyer_id|string|false|none|none|
|branch_id|string|false|none|none|
|adjust_device_id|string|false|none|none|

<h2 id="tocS_ProfileMetaData">ProfileMetaData</h2>
<!-- backwards compatibility -->
<a id="schemaprofilemetadata"></a>
<a id="schema_ProfileMetaData"></a>
<a id="tocSprofilemetadata"></a>
<a id="tocsprofilemetadata"></a>

```json
{
  "device_id": "3bafab7b-4400-4bcf-8e6e-09f954699940",
  "device": "string",
  "locale": "string",
  "os": "string",
  "platform": "iOS",
  "timezone": "string",
  "user_agent": "string",
  "idfa": "string",
  "idfv": "string",
  "advertising_id": "string",
  "android_id": "string",
  "android_app_set_id": "string"
}

```

ProfileMetaData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|device_id|string(uuid)|true|none|none|
|device|string|false|none|none|
|locale|string|false|none|none|
|os|string|false|none|none|
|platform|[DevicePlatform](#schemadeviceplatform)|false|none|An enumeration.|
|timezone|string|false|none|none|
|user_agent|string|false|none|none|
|idfa|string|false|none|none|
|idfv|string|false|none|none|
|advertising_id|string|false|none|none|
|android_id|string|false|none|none|
|android_app_set_id|string|false|none|none|

<h2 id="tocS_ProfileNonSubscriptionDTO">ProfileNonSubscriptionDTO</h2>
<!-- backwards compatibility -->
<a id="schemaprofilenonsubscriptiondto"></a>
<a id="schema_ProfileNonSubscriptionDTO"></a>
<a id="tocSprofilenonsubscriptiondto"></a>
<a id="tocsprofilenonsubscriptiondto"></a>

```json
{
  "purchase_id": "string",
  "store": "string",
  "store_product_id": "string",
  "store_base_plan_id": "string",
  "store_transaction_id": "string",
  "store_original_transaction_id": "string",
  "purchased_at": "2019-08-24T14:15:22Z",
  "environment": "string",
  "is_refund": true,
  "is_consumable": true
}

```

ProfileNonSubscriptionDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|purchase_id|string|true|none|none|
|store|string|true|none|none|
|store_product_id|string|true|none|none|
|store_base_plan_id|string|false|none|none|
|store_transaction_id|string|true|none|none|
|store_original_transaction_id|string|true|none|none|
|purchased_at|string(date-time)|true|none|none|
|environment|string|true|none|none|
|is_refund|boolean|true|none|none|
|is_consumable|boolean|true|none|none|

<h2 id="tocS_ProfilePaidAccessLevelDTO">ProfilePaidAccessLevelDTO</h2>
<!-- backwards compatibility -->
<a id="schemaprofilepaidaccessleveldto"></a>
<a id="schema_ProfilePaidAccessLevelDTO"></a>
<a id="tocSprofilepaidaccessleveldto"></a>
<a id="tocsprofilepaidaccessleveldto"></a>

```json
{
  "access_level_id": "string",
  "store": "string",
  "store_product_id": "string",
  "store_base_plan_id": "string",
  "store_transaction_id": "string",
  "store_original_transaction_id": "string",
  "offer": {
    "category": "no_offer",
    "type": "free_trial",
    "id": "string"
  },
  "starts_at": "2019-08-24T14:15:22Z",
  "purchased_at": "2019-08-24T14:15:22Z",
  "originally_purchased_at": "2019-08-24T14:15:22Z",
  "expires_at": "2019-08-24T14:15:22Z",
  "renewal_cancelled_at": "2019-08-24T14:15:22Z",
  "billing_issue_detected_at": "2019-08-24T14:15:22Z",
  "is_in_grace_period": true,
  "cancellation_reason": "billing_error"
}

```

ProfilePaidAccessLevelDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|access_level_id|string|true|none|none|
|store|string|true|none|none|
|store_product_id|string|true|none|none|
|store_base_plan_id|string|false|none|none|
|store_transaction_id|string|true|none|none|
|store_original_transaction_id|string|true|none|none|
|offer|[OfferDTO](#schemaofferdto)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|
|starts_at|string(date-time)|false|none|none|
|purchased_at|string(date-time)|true|none|none|
|originally_purchased_at|string(date-time)|true|none|none|
|expires_at|string(date-time)|false|none|none|
|renewal_cancelled_at|string(date-time)|false|none|none|
|billing_issue_detected_at|string(date-time)|false|none|none|
|is_in_grace_period|boolean|true|none|none|
|cancellation_reason|[CancellationReason](#schemacancellationreason)|false|none|An enumeration.|

<h2 id="tocS_ProfileResponse">ProfileResponse</h2>
<!-- backwards compatibility -->
<a id="schemaprofileresponse"></a>
<a id="schema_ProfileResponse"></a>
<a id="tocSprofileresponse"></a>
<a id="tocsprofileresponse"></a>

```json
{
  "data": {
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
    "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8",
    "customer_user_id": "string",
    "total_revenue_usd": 0,
    "segment_hash": "string",
    "timestamp": 0,
    "custom_attributes": [
      {
        "key": "string",
        "value": 0
      }
    ],
    "access_levels": [
      {
        "access_level_id": "string",
        "store": "string",
        "store_product_id": "string",
        "store_base_plan_id": "string",
        "store_transaction_id": "string",
        "store_original_transaction_id": "string",
        "offer": {
          "category": "no_offer",
          "type": "free_trial",
          "id": "string"
        },
        "starts_at": "2019-08-24T14:15:22Z",
        "purchased_at": "2019-08-24T14:15:22Z",
        "originally_purchased_at": "2019-08-24T14:15:22Z",
        "expires_at": "2019-08-24T14:15:22Z",
        "renewal_cancelled_at": "2019-08-24T14:15:22Z",
        "billing_issue_detected_at": "2019-08-24T14:15:22Z",
        "is_in_grace_period": true,
        "cancellation_reason": "billing_error"
      }
    ],
    "subscriptions": [
      {
        "store": "string",
        "store_product_id": "string",
        "store_base_plan_id": "string",
        "store_transaction_id": "string",
        "store_original_transaction_id": "string",
        "offer": {
          "category": "no_offer",
          "type": "free_trial",
          "id": "string"
        },
        "environment": "Sandbox",
        "purchased_at": "2019-08-24T14:15:22Z",
        "originally_purchased_at": "2019-08-24T14:15:22Z",
        "expires_at": "2019-08-24T14:15:22Z",
        "renewal_cancelled_at": "2019-08-24T14:15:22Z",
        "billing_issue_detected_at": "2019-08-24T14:15:22Z",
        "is_in_grace_period": true,
        "cancellation_reason": "billing_error"
      }
    ],
    "non_subscriptions": [
      {
        "purchase_id": "string",
        "store": "string",
        "store_product_id": "string",
        "store_base_plan_id": "string",
        "store_transaction_id": "string",
        "store_original_transaction_id": "string",
        "purchased_at": "2019-08-24T14:15:22Z",
        "environment": "string",
        "is_refund": true,
        "is_consumable": true
      }
    ]
  }
}

```

ProfileResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[ProfileDTO](#schemaprofiledto)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_ProfileSegment">ProfileSegment</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegment"></a>
<a id="schema_ProfileSegment"></a>
<a id="tocSprofilesegment"></a>
<a id="tocsprofilesegment"></a>

```json
{
  "title": "string",
  "description": "string",
  "filters": [
    {
      "segment_filter_id": "79f7071e-8ea3-4123-9b5c-f95061b64614",
      "field": "age",
      "operator": "IS NULL",
      "values": [
        0
      ]
    }
  ],
  "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c",
  "created_at": "2019-08-24T14:15:22Z",
  "updated_at": "2019-08-24T14:15:22Z"
}

```

ProfileSegment

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|description|string|false|none|none|
|filters|[[ProfileSegmentFilter](#schemaprofilesegmentfilter)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|segment_id|string(uuid)|true|none|none|
|created_at|string(date-time)|true|none|none|
|updated_at|string(date-time)|true|none|none|

<h2 id="tocS_ProfileSegmentFilter">ProfileSegmentFilter</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentfilter"></a>
<a id="schema_ProfileSegmentFilter"></a>
<a id="tocSprofilesegmentfilter"></a>
<a id="tocsprofilesegmentfilter"></a>

```json
{
  "segment_filter_id": "79f7071e-8ea3-4123-9b5c-f95061b64614",
  "field": "age",
  "operator": "IS NULL",
  "values": [
    0
  ]
}

```

ProfileSegmentFilter

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|segment_filter_id|string(uuid)|false|none|none|
|field|[SegmentFilterFieldName](#schemasegmentfilterfieldname)|true|none|An enumeration.|
|operator|[SegmentFilterOperator](#schemasegmentfilteroperator)|true|none|An enumeration.|
|values|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[anyOf]|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

<h2 id="tocS_ProfileSegmentFilterCustomValue">ProfileSegmentFilterCustomValue</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentfiltercustomvalue"></a>
<a id="schema_ProfileSegmentFilterCustomValue"></a>
<a id="tocSprofilesegmentfiltercustomvalue"></a>
<a id="tocsprofilesegmentfiltercustomvalue"></a>

```json
{
  "field": "age",
  "values": [
    0
  ]
}

```

ProfileSegmentFilterCustomValue

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|field|[SegmentFilterFieldName](#schemasegmentfilterfieldname)|true|none|An enumeration.|
|values|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[anyOf]|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

<h2 id="tocS_ProfileSegmentFilterCustomValueRequest">ProfileSegmentFilterCustomValueRequest</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentfiltercustomvaluerequest"></a>
<a id="schema_ProfileSegmentFilterCustomValueRequest"></a>
<a id="tocSprofilesegmentfiltercustomvaluerequest"></a>
<a id="tocsprofilesegmentfiltercustomvaluerequest"></a>

```json
{
  "field": "age",
  "values": [
    0
  ]
}

```

ProfileSegmentFilterCustomValueRequest

### Properties

*None*

<h2 id="tocS_ProfileSegmentFilterMeta">ProfileSegmentFilterMeta</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentfiltermeta"></a>
<a id="schema_ProfileSegmentFilterMeta"></a>
<a id="tocSprofilesegmentfiltermeta"></a>
<a id="tocsprofilesegmentfiltermeta"></a>

```json
{
  "field_settings_map": {
    "property1": {
      "type": "string",
      "arbitrary_value_allowed": true,
      "title": "string"
    },
    "property2": {
      "type": "string",
      "arbitrary_value_allowed": true,
      "title": "string"
    }
  },
  "operator_settings_map": {
    "property1": {
      "type": "not",
      "title": "string"
    },
    "property2": {
      "type": "not",
      "title": "string"
    }
  }
}

```

ProfileSegmentFilterMeta

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|field_settings_map|object|true|none|none|
|» **additionalProperties**|[FilterField](#schemafilterfield)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|
|operator_settings_map|object|true|none|none|
|» **additionalProperties**|[FilterOperator](#schemafilteroperator)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_ProfileSegmentFilterValueData">ProfileSegmentFilterValueData</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentfiltervaluedata"></a>
<a id="schema_ProfileSegmentFilterValueData"></a>
<a id="tocSprofilesegmentfiltervaluedata"></a>
<a id="tocsprofilesegmentfiltervaluedata"></a>

```json
{
  "field": "age",
  "operators": [
    "IS NULL"
  ],
  "values": [
    0
  ]
}

```

ProfileSegmentFilterValueData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|field|[SegmentFilterFieldName](#schemasegmentfilterfieldname)|true|none|An enumeration.|
|operators|[[SegmentFilterOperator](#schemasegmentfilteroperator)]|true|none|[An enumeration.]|
|values|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[anyOf]|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

<h2 id="tocS_ProfileSegmentFilterValueResponseList">ProfileSegmentFilterValueResponseList</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentfiltervalueresponselist"></a>
<a id="schema_ProfileSegmentFilterValueResponseList"></a>
<a id="tocSprofilesegmentfiltervalueresponselist"></a>
<a id="tocsprofilesegmentfiltervalueresponselist"></a>

```json
{
  "data": [
    {
      "field": "age",
      "operators": [
        "IS NULL"
      ],
      "values": [
        0
      ]
    }
  ],
  "meta": {
    "field_settings_map": {
      "property1": {
        "type": "string",
        "arbitrary_value_allowed": true,
        "title": "string"
      },
      "property2": {
        "type": "string",
        "arbitrary_value_allowed": true,
        "title": "string"
      }
    },
    "operator_settings_map": {
      "property1": {
        "type": "not",
        "title": "string"
      },
      "property2": {
        "type": "not",
        "title": "string"
      }
    }
  }
}

```

ProfileSegmentFilterValueResponseList

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[ProfileSegmentFilterValueData](#schemaprofilesegmentfiltervaluedata)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|
|meta|[ProfileSegmentFilterMeta](#schemaprofilesegmentfiltermeta)|true|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_ProfileSegmentRequest">ProfileSegmentRequest</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentrequest"></a>
<a id="schema_ProfileSegmentRequest"></a>
<a id="tocSprofilesegmentrequest"></a>
<a id="tocsprofilesegmentrequest"></a>

```json
{
  "title": "string",
  "description": "string",
  "filters": [
    {
      "segment_filter_id": "79f7071e-8ea3-4123-9b5c-f95061b64614",
      "field": "age",
      "operator": "IS NULL",
      "values": [
        0
      ]
    }
  ]
}

```

ProfileSegmentRequest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|description|string|false|none|none|
|filters|[[ProfileSegmentFilter](#schemaprofilesegmentfilter)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|

<h2 id="tocS_ProfileSegmentResponse">ProfileSegmentResponse</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentresponse"></a>
<a id="schema_ProfileSegmentResponse"></a>
<a id="tocSprofilesegmentresponse"></a>
<a id="tocsprofilesegmentresponse"></a>

```json
{
  "data": {
    "title": "string",
    "description": "string",
    "filters": [
      {
        "segment_filter_id": "79f7071e-8ea3-4123-9b5c-f95061b64614",
        "field": "age",
        "operator": "IS NULL",
        "values": [
          0
        ]
      }
    ],
    "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z"
  }
}

```

ProfileSegmentResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[ProfileSegment](#schemaprofilesegment)|true|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_ProfileSegmentResponseList">ProfileSegmentResponseList</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesegmentresponselist"></a>
<a id="schema_ProfileSegmentResponseList"></a>
<a id="tocSprofilesegmentresponselist"></a>
<a id="tocsprofilesegmentresponselist"></a>

```json
{
  "data": [
    {
      "title": "string",
      "description": "string",
      "filters": [
        {
          "segment_filter_id": "79f7071e-8ea3-4123-9b5c-f95061b64614",
          "field": "age",
          "operator": "IS NULL",
          "values": [
            0
          ]
        }
      ],
      "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c",
      "created_at": "2019-08-24T14:15:22Z",
      "updated_at": "2019-08-24T14:15:22Z"
    }
  ]
}

```

ProfileSegmentResponseList

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[ProfileSegment](#schemaprofilesegment)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|

<h2 id="tocS_ProfileSubscriptionDTO">ProfileSubscriptionDTO</h2>
<!-- backwards compatibility -->
<a id="schemaprofilesubscriptiondto"></a>
<a id="schema_ProfileSubscriptionDTO"></a>
<a id="tocSprofilesubscriptiondto"></a>
<a id="tocsprofilesubscriptiondto"></a>

```json
{
  "store": "string",
  "store_product_id": "string",
  "store_base_plan_id": "string",
  "store_transaction_id": "string",
  "store_original_transaction_id": "string",
  "offer": {
    "category": "no_offer",
    "type": "free_trial",
    "id": "string"
  },
  "environment": "Sandbox",
  "purchased_at": "2019-08-24T14:15:22Z",
  "originally_purchased_at": "2019-08-24T14:15:22Z",
  "expires_at": "2019-08-24T14:15:22Z",
  "renewal_cancelled_at": "2019-08-24T14:15:22Z",
  "billing_issue_detected_at": "2019-08-24T14:15:22Z",
  "is_in_grace_period": true,
  "cancellation_reason": "billing_error"
}

```

ProfileSubscriptionDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|store|string|true|none|none|
|store_product_id|string|true|none|none|
|store_base_plan_id|string|false|none|none|
|store_transaction_id|string|true|none|none|
|store_original_transaction_id|string|true|none|none|
|offer|[OfferDTO](#schemaofferdto)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|
|environment|[Environment](#schemaenvironment)|true|none|An enumeration.|
|purchased_at|string(date-time)|true|none|none|
|originally_purchased_at|string(date-time)|true|none|none|
|expires_at|string(date-time)|false|none|none|
|renewal_cancelled_at|string(date-time)|false|none|none|
|billing_issue_detected_at|string(date-time)|false|none|none|
|is_in_grace_period|boolean|true|none|none|
|cancellation_reason|[CancellationReason](#schemacancellationreason)|false|none|An enumeration.|

<h2 id="tocS_ProfileTestUser">ProfileTestUser</h2>
<!-- backwards compatibility -->
<a id="schemaprofiletestuser"></a>
<a id="schema_ProfileTestUser"></a>
<a id="tocSprofiletestuser"></a>
<a id="tocsprofiletestuser"></a>

```json
{
  "test_user_id": "string",
  "user_name": "string",
  "id_type": "profile_id",
  "id_value": "string",
  "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335"
}

```

ProfileTestUser

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|test_user_id|string|false|none|none|
|user_name|string|true|none|none|
|id_type|[ProfileTestUserType](#schemaprofiletestusertype)|true|none|An enumeration.|
|id_value|string|true|none|none|
|app_id|string(uuid)|true|none|none|

<h2 id="tocS_ProfileTestUserListResponse">ProfileTestUserListResponse</h2>
<!-- backwards compatibility -->
<a id="schemaprofiletestuserlistresponse"></a>
<a id="schema_ProfileTestUserListResponse"></a>
<a id="tocSprofiletestuserlistresponse"></a>
<a id="tocsprofiletestuserlistresponse"></a>

```json
{
  "data": [
    {
      "test_user_id": "string",
      "user_name": "string",
      "id_type": "profile_id",
      "id_value": "string",
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335"
    }
  ]
}

```

ProfileTestUserListResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[ProfileTestUser](#schemaprofiletestuser)]|false|none|none|

<h2 id="tocS_ProfileTestUserRequest">ProfileTestUserRequest</h2>
<!-- backwards compatibility -->
<a id="schemaprofiletestuserrequest"></a>
<a id="schema_ProfileTestUserRequest"></a>
<a id="tocSprofiletestuserrequest"></a>
<a id="tocsprofiletestuserrequest"></a>

```json
{
  "data": {
    "test_user_id": "string",
    "user_name": "string",
    "id_type": "profile_id",
    "id_value": "string",
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335"
  }
}

```

ProfileTestUserRequest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[ProfileTestUser](#schemaprofiletestuser)|true|none|none|

<h2 id="tocS_ProfileTestUserResponse">ProfileTestUserResponse</h2>
<!-- backwards compatibility -->
<a id="schemaprofiletestuserresponse"></a>
<a id="schema_ProfileTestUserResponse"></a>
<a id="tocSprofiletestuserresponse"></a>
<a id="tocsprofiletestuserresponse"></a>

```json
{
  "data": {
    "test_user_id": "string",
    "user_name": "string",
    "id_type": "profile_id",
    "id_value": "string",
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335"
  }
}

```

ProfileTestUserResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[ProfileTestUser](#schemaprofiletestuser)|false|none|none|

<h2 id="tocS_ProfileTestUserType">ProfileTestUserType</h2>
<!-- backwards compatibility -->
<a id="schemaprofiletestusertype"></a>
<a id="schema_ProfileTestUserType"></a>
<a id="tocSprofiletestusertype"></a>
<a id="tocsprofiletestusertype"></a>

```json
"profile_id"

```

ProfileTestUserType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ProfileTestUserType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ProfileTestUserType|profile_id|
|ProfileTestUserType|customer_user_id|
|ProfileTestUserType|idfa|
|ProfileTestUserType|idfv|
|ProfileTestUserType|advertising_id|
|ProfileTestUserType|android_id|

<h2 id="tocS_ProfilesCountingMethod">ProfilesCountingMethod</h2>
<!-- backwards compatibility -->
<a id="schemaprofilescountingmethod"></a>
<a id="schema_ProfilesCountingMethod"></a>
<a id="tocSprofilescountingmethod"></a>
<a id="tocsprofilescountingmethod"></a>

```json
"profile_id"

```

ProfilesCountingMethod

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ProfilesCountingMethod|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ProfilesCountingMethod|profile_id|
|ProfilesCountingMethod|customer_user_id|
|ProfilesCountingMethod|device_id|

<h2 id="tocS_RenewalPeriodType">RenewalPeriodType</h2>
<!-- backwards compatibility -->
<a id="schemarenewalperiodtype"></a>
<a id="schema_RenewalPeriodType"></a>
<a id="tocSrenewalperiodtype"></a>
<a id="tocsrenewalperiodtype"></a>

```json
"renewals"

```

RenewalPeriodType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|RenewalPeriodType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|RenewalPeriodType|renewals|
|RenewalPeriodType|days|

<h2 id="tocS_ReplaceInPlacementData">ReplaceInPlacementData</h2>
<!-- backwards compatibility -->
<a id="schemareplaceinplacementdata"></a>
<a id="schema_ReplaceInPlacementData"></a>
<a id="tocSreplaceinplacementdata"></a>
<a id="tocsreplaceinplacementdata"></a>

```json
{
  "data": [
    {
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
      "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051"
    }
  ]
}

```

ReplaceInPlacementData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[ReplacePlacementAudiencePaywallData](#schemareplaceplacementaudiencepaywalldata)]|true|none|[Annotation:     This object is immutable dataset.  @dataclass(frozen=True)]|

<h2 id="tocS_ReplacePlacementAudiencePaywallData">ReplacePlacementAudiencePaywallData</h2>
<!-- backwards compatibility -->
<a id="schemareplaceplacementaudiencepaywalldata"></a>
<a id="schema_ReplacePlacementAudiencePaywallData"></a>
<a id="tocSreplaceplacementaudiencepaywalldata"></a>
<a id="tocsreplaceplacementaudiencepaywalldata"></a>

```json
{
  "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
  "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051"
}

```

ReplacePlacementAudiencePaywallData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|placement_id|string(uuid)|true|none|none|
|audience_id|string(uuid)|true|none|none|
|paywall_id|string(uuid)|true|none|none|

<h2 id="tocS_RequestDTO">RequestDTO</h2>
<!-- backwards compatibility -->
<a id="schemarequestdto"></a>
<a id="schema_RequestDTO"></a>
<a id="tocSrequestdto"></a>
<a id="tocsrequestdto"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_type": [
      "free_trial"
    ],
    "offer_category": [
      "no_offer"
    ],
    "offer_id": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "format": "json",
  "period_unit": "month",
  "period_type": "renewals",
  "segmentation": "day",
  "value_type": "absolute"
}

```

RequestDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[MetricsFilters](#schemametricsfilters)|true|none|none|
|format|[MetricsFormat](#schemametricsformat)|false|none|An enumeration.|
|period_unit|[PeriodUnit](#schemaperiodunit)|false|none|An enumeration.|
|period_type|[RenewalPeriodType](#schemarenewalperiodtype)|false|none|An enumeration.|
|segmentation|[LTVSegmentation](#schemaltvsegmentation)|false|none|An enumeration.|
|value_type|[CohortValueType](#schemacohortvaluetype)|false|none|An enumeration.|

<h2 id="tocS_RetentionMetricsConditions">RetentionMetricsConditions</h2>
<!-- backwards compatibility -->
<a id="schemaretentionmetricsconditions"></a>
<a id="schema_RetentionMetricsConditions"></a>
<a id="tocSretentionmetricsconditions"></a>
<a id="tocsretentionmetricsconditions"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_type": [
      "free_trial"
    ],
    "offer_category": [
      "no_offer"
    ],
    "offer_id": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation_by": "app_id",
  "use_trial": false,
  "value_type": "absolute",
  "format": "json"
}

```

RetentionMetricsConditions

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[MetricsFilters](#schemametricsfilters)|true|none|none|
|period_unit|[PeriodUnit](#schemaperiodunit)|false|none|An enumeration.|
|date_type|[DateType](#schemadatetype)|false|none|An enumeration.|
|segmentation_by|[ChartMetricsSegmentation](#schemachartmetricssegmentation)|false|none|An enumeration.|
|use_trial|boolean|false|none|none|
|value_type|[CohortValueType](#schemacohortvaluetype)|false|none|An enumeration.|
|format|[MetricsFormat](#schemametricsformat)|false|none|An enumeration.|

<h2 id="tocS_RetentionMetricsRequest">RetentionMetricsRequest</h2>
<!-- backwards compatibility -->
<a id="schemaretentionmetricsrequest"></a>
<a id="schema_RetentionMetricsRequest"></a>
<a id="tocSretentionmetricsrequest"></a>
<a id="tocsretentionmetricsrequest"></a>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "store": [
      "string"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "segment_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "string"
    ],
    "store_product_id": [
      "string"
    ],
    "duration": [
      "string"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "organic"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "offer_category": [
      "string"
    ],
    "offer_type": [
      "string"
    ],
    "offer_id": [
      "string"
    ]
  },
  "segmentation": "period",
  "use_trial": false
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|[ChartFilters](#schemachartfilters)|true|none|none|
|segmentation|string|false|none|* `period` - Period * `renewal_status` - Renewal status * `cancellation_reason` - Cancellation reason * `store_product_id` - Store product id * `country` - Country * `store` - Store * `purchase_container_id` - Purchase container id * `paywall_id` - Paywall id * `audience_id` - Audience id * `placement_id` - Placement id * `attribution_source` - Attribution source * `attribution_status` - Attribution status * `attribution_channel` - Attribution channel * `attribution_campaign` - Attribution campaign * `attribution_adgroup` - Attribution adgroup * `attribution_adset` - Attribution adset * `attribution_creative` - Attribution creative * `duration` - Duration * `offer_category` - Offer category * `offer_type` - Offer type * `offer_id` - Offer id * `day` - Day * `week` - Week * `month` - Month * `year` - Year|
|use_trial|boolean|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|segmentation|period|
|segmentation|renewal_status|
|segmentation|cancellation_reason|
|segmentation|store_product_id|
|segmentation|country|
|segmentation|store|
|segmentation|purchase_container_id|
|segmentation|paywall_id|
|segmentation|audience_id|
|segmentation|placement_id|
|segmentation|attribution_source|
|segmentation|attribution_status|
|segmentation|attribution_channel|
|segmentation|attribution_campaign|
|segmentation|attribution_adgroup|
|segmentation|attribution_adset|
|segmentation|attribution_creative|
|segmentation|duration|
|segmentation|offer_category|
|segmentation|offer_type|
|segmentation|offer_id|
|segmentation|day|
|segmentation|week|
|segmentation|month|
|segmentation|year|

<h2 id="tocS_RichText">RichText</h2>
<!-- backwards compatibility -->
<a id="schemarichtext"></a>
<a id="schema_RichText"></a>
<a id="tocSrichtext"></a>
<a id="tocsrichtext"></a>

```json
[
  "string"
]

```

RichText

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|RichText|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[anyOf]|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[RichTextText](#schemarichtexttext)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[RichTextTag](#schemarichtexttag)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[RichTextImage](#schemarichtextimage)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[RichTextText](#schemarichtexttext)|false|none|none|

<h2 id="tocS_RichTextAttributes">RichTextAttributes</h2>
<!-- backwards compatibility -->
<a id="schemarichtextattributes"></a>
<a id="schema_RichTextAttributes"></a>
<a id="tocSrichtextattributes"></a>
<a id="tocsrichtextattributes"></a>

```json
{
  "font": "string",
  "size": 0,
  "strike": true,
  "underline": true,
  "color": "string",
  "background": "string",
  "tint": "string"
}

```

RichTextAttributes

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|font|string|false|none|none|
|size|number|false|none|none|
|strike|boolean|false|none|none|
|underline|boolean|false|none|none|
|color|string|false|none|none|
|background|string|false|none|none|
|tint|string|false|none|none|

<h2 id="tocS_RichTextImage">RichTextImage</h2>
<!-- backwards compatibility -->
<a id="schemarichtextimage"></a>
<a id="schema_RichTextImage"></a>
<a id="tocSrichtextimage"></a>
<a id="tocsrichtextimage"></a>

```json
{
  "image": "string",
  "attributes": {
    "font": "string",
    "size": 0,
    "strike": true,
    "underline": true,
    "color": "string",
    "background": "string",
    "tint": "string"
  }
}

```

RichTextImage

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|image|string|true|none|none|
|attributes|[RichTextAttributes](#schemarichtextattributes)|false|none|none|

<h2 id="tocS_RichTextTag">RichTextTag</h2>
<!-- backwards compatibility -->
<a id="schemarichtexttag"></a>
<a id="schema_RichTextTag"></a>
<a id="tocSrichtexttag"></a>
<a id="tocsrichtexttag"></a>

```json
{
  "tag": "string",
  "attributes": {
    "font": "string",
    "size": 0,
    "strike": true,
    "underline": true,
    "color": "string",
    "background": "string",
    "tint": "string"
  }
}

```

RichTextTag

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tag|string|true|none|none|
|attributes|[RichTextAttributes](#schemarichtextattributes)|false|none|none|

<h2 id="tocS_RichTextText">RichTextText</h2>
<!-- backwards compatibility -->
<a id="schemarichtexttext"></a>
<a id="schema_RichTextText"></a>
<a id="tocSrichtexttext"></a>
<a id="tocsrichtexttext"></a>

```json
"string"

```

RichTextText

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|RichTextText|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[RichTextAttributes](#schemarichtextattributes)|false|none|none|

<h2 id="tocS_Segment">Segment</h2>
<!-- backwards compatibility -->
<a id="schemasegment"></a>
<a id="schema_Segment"></a>
<a id="tocSsegment"></a>
<a id="tocssegment"></a>

```json
{
  "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c",
  "title": "string"
}

```

Segment

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|segment_id|string(uuid)|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_SegmentFilterFieldName">SegmentFilterFieldName</h2>
<!-- backwards compatibility -->
<a id="schemasegmentfilterfieldname"></a>
<a id="schema_SegmentFilterFieldName"></a>
<a id="tocSsegmentfilterfieldname"></a>
<a id="tocssegmentfilterfieldname"></a>

```json
"age"

```

SegmentFilterFieldName

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|SegmentFilterFieldName|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|SegmentFilterFieldName|age|
|SegmentFilterFieldName|customer_user_id|
|SegmentFilterFieldName|subscription_state|
|SegmentFilterFieldName|total_revenue_usd|
|SegmentFilterFieldName|ip_country|
|SegmentFilterFieldName|store_country|
|SegmentFilterFieldName|gender|
|SegmentFilterFieldName|subscription_product_id|
|SegmentFilterFieldName|created_at|
|SegmentFilterFieldName|subscription_expiration_date|
|SegmentFilterFieldName|last_seen|
|SegmentFilterFieldName|platform|
|SegmentFilterFieldName|locale|
|SegmentFilterFieldName|device|
|SegmentFilterFieldName|os|
|SegmentFilterFieldName|app_version|
|SegmentFilterFieldName|status|
|SegmentFilterFieldName|source|
|SegmentFilterFieldName|channel|
|SegmentFilterFieldName|campaign|
|SegmentFilterFieldName|ad_group|
|SegmentFilterFieldName|ad_set|
|SegmentFilterFieldName|creative|

<h2 id="tocS_SegmentFilterOperator">SegmentFilterOperator</h2>
<!-- backwards compatibility -->
<a id="schemasegmentfilteroperator"></a>
<a id="schema_SegmentFilterOperator"></a>
<a id="tocSsegmentfilteroperator"></a>
<a id="tocssegmentfilteroperator"></a>

```json
"IS NULL"

```

SegmentFilterOperator

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|SegmentFilterOperator|string|false|none|An enumeration.|

#### Enumerated Values

<!---
|Property|Value|
|---|---|
|SegmentFilterOperator|IS NULL|
|SegmentFilterOperator|IS NOT NULL|
|SegmentFilterOperator|IN|
|SegmentFilterOperator|NOT IN|
|SegmentFilterOperator|>|
|SegmentFilterOperator|>=|
|SegmentFilterOperator|<|
|SegmentFilterOperator|<=|
|SegmentFilterOperator|BETWEEN|
--->

<h2 id="tocS_ServerSideErrors">ServerSideErrors</h2>
<!-- backwards compatibility -->
<a id="schemaserversideerrors"></a>
<a id="schema_ServerSideErrors"></a>
<a id="tocSserversideerrors"></a>
<a id="tocsserversideerrors"></a>

```json
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "base_error",
  "status_code": 400
}

```

ServerSideErrors

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|errors|[[ErrorObject](#schemaerrorobject)]|false|none|none|
|error_code|string|false|none|none|
|status_code|integer|false|none|none|

<h2 id="tocS_Shape">Shape</h2>
<!-- backwards compatibility -->
<a id="schemashape"></a>
<a id="schema_Shape"></a>
<a id="tocSshape"></a>
<a id="tocsshape"></a>

```json
{
  "background": "string",
  "rect_corner_radius": 0,
  "border": "string",
  "thickness": 0,
  "type": "color",
  "value": "circle"
}

```

Shape

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Shape|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Shape1](#schemashape1)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Shape2](#schemashape2)|false|none|none|

<h2 id="tocS_Shape1">Shape1</h2>
<!-- backwards compatibility -->
<a id="schemashape1"></a>
<a id="schema_Shape1"></a>
<a id="tocSshape1"></a>
<a id="tocsshape1"></a>

```json
{
  "background": "string",
  "rect_corner_radius": 0,
  "border": "string",
  "thickness": 0,
  "type": "color",
  "value": "circle"
}

```

Shape1

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|background|string|false|none|asset id|
|rect_corner_radius|[ShapeCornerRadius](#schemashapecornerradius)|false|none|none|
|border|string|false|none|asset id|
|thickness|number|false|none|border thickness|
|type|[Type](#schematype)|true|none|An enumeration.|
|value|[ShapeType](#schemashapetype)|true|none|An enumeration.|

<h2 id="tocS_Shape2">Shape2</h2>
<!-- backwards compatibility -->
<a id="schemashape2"></a>
<a id="schema_Shape2"></a>
<a id="tocSshape2"></a>
<a id="tocsshape2"></a>

```json
{
  "background": "string",
  "rect_corner_radius": 0,
  "border": "string",
  "thickness": 0,
  "type": "circle"
}

```

Shape2

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|background|string|false|none|asset id|
|rect_corner_radius|[ShapeCornerRadius](#schemashapecornerradius)|false|none|none|
|border|string|false|none|asset id|
|thickness|number|false|none|border thickness|
|type|[ShapeType](#schemashapetype)|true|none|An enumeration.|

<h2 id="tocS_ShapeCornerRadius">ShapeCornerRadius</h2>
<!-- backwards compatibility -->
<a id="schemashapecornerradius"></a>
<a id="schema_ShapeCornerRadius"></a>
<a id="tocSshapecornerradius"></a>
<a id="tocsshapecornerradius"></a>

```json
0

```

ShapeCornerRadius

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ShapeCornerRadius|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[number]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CornerRadius](#schemacornerradius)|false|none|none|

<h2 id="tocS_ShapeType">ShapeType</h2>
<!-- backwards compatibility -->
<a id="schemashapetype"></a>
<a id="schema_ShapeType"></a>
<a id="tocSshapetype"></a>
<a id="tocsshapetype"></a>

```json
"circle"

```

ShapeType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ShapeType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|ShapeType|circle|
|ShapeType|rect|
|ShapeType|curve_up|
|ShapeType|curve_down|

<h2 id="tocS_StartABTestData">StartABTestData</h2>
<!-- backwards compatibility -->
<a id="schemastartabtestdata"></a>
<a id="schema_StartABTestData"></a>
<a id="tocSstartabtestdata"></a>
<a id="tocsstartabtestdata"></a>

```json
{
  "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
  "segments": [
    {
      "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c",
      "title": "string"
    }
  ],
  "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417"
}

```

StartABTestData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ab_test_id|string(uuid)|true|none|none|
|segments|[[Segment](#schemasegment)]|false|none|none|
|audience_id|string(uuid)|false|none|none|

<h2 id="tocS_State">State</h2>
<!-- backwards compatibility -->
<a id="schemastate"></a>
<a id="schema_State"></a>
<a id="tocSstate"></a>
<a id="tocsstate"></a>

```json
"live"

```

State

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|State|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|State|live|
|State|inactive|
|State|draft|
|State|archived|

<h2 id="tocS_StopABTestData">StopABTestData</h2>
<!-- backwards compatibility -->
<a id="schemastopabtestdata"></a>
<a id="schema_StopABTestData"></a>
<a id="tocSstopabtestdata"></a>
<a id="tocsstopabtestdata"></a>

```json
{
  "winner_paywall_id": "f2ff783e-53f4-4e5a-a128-047dbbdedc81",
  "another_paywall_id_to_run": "fc5ab9f6-f5a7-47c9-b6f0-a0aa04fd14fa"
}

```

StopABTestData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|winner_paywall_id|string(uuid)|false|none|none|
|another_paywall_id_to_run|string(uuid)|false|none|none|

<h2 id="tocS_Store">Store</h2>
<!-- backwards compatibility -->
<a id="schemastore"></a>
<a id="schema_Store"></a>
<a id="tocSstore"></a>
<a id="tocsstore"></a>

```json
"adapty"

```

Store

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Store|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|Store|adapty|
|Store|app_store|
|Store|play_store|
|Store|stripe|

<h2 id="tocS_String">String</h2>
<!-- backwards compatibility -->
<a id="schemastring"></a>
<a id="schema_String"></a>
<a id="tocSstring"></a>
<a id="tocsstring"></a>

```json
{
  "id": "str-title",
  "value": "Become a Premium man",
  "has_tags": false,
  "fallback": "string"
}

```

String

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|value|string|true|none|none|
|has_tags|boolean|false|none|none|
|fallback|string|false|none|none|

<h2 id="tocS_StripePurchaseDTO">StripePurchaseDTO</h2>
<!-- backwards compatibility -->
<a id="schemastripepurchasedto"></a>
<a id="schema_StripePurchaseDTO"></a>
<a id="tocSstripepurchasedto"></a>
<a id="tocsstripepurchasedto"></a>

```json
{
  "customer_user_id": "string",
  "stripe_token": "string"
}

```

StripePurchaseDTO

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|customer_user_id|string|true|none|none|
|stripe_token|string|true|none|none|

<h2 id="tocS_Text">Text</h2>
<!-- backwards compatibility -->
<a id="schematext"></a>
<a id="schema_Text"></a>
<a id="tocStext"></a>
<a id="tocstext"></a>

```json
{
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "font": "string",
  "bullet_space": 0,
  "items": [
    {
      "string_id": "string",
      "font": "string",
      "size": 0,
      "color": "string",
      "horizontal_align": "left",
      "bullet": false
    }
  ]
}

```

Text

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Text|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Text1](#schematext1)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Text2](#schematext2)|false|none|none|

<h2 id="tocS_Text1">Text1</h2>
<!-- backwards compatibility -->
<a id="schematext1"></a>
<a id="schema_Text1"></a>
<a id="tocStext1"></a>
<a id="tocstext1"></a>

```json
{
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "font": "string",
  "bullet_space": 0,
  "items": [
    {
      "string_id": "string",
      "font": "string",
      "size": 0,
      "color": "string",
      "horizontal_align": "left",
      "bullet": false
    }
  ]
}

```

Text1

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|size|number|false|none|none|
|color|string|false|none|asset id|
|horizontal_align|[HorizontalAlign](#schemahorizontalalign)|false|none|An enumeration.|
|font|string|false|none|asset id|
|bullet_space|number|false|none|none|
|items|[[TextItem](#schematextitem)]|true|none|none|

<h2 id="tocS_Text2">Text2</h2>
<!-- backwards compatibility -->
<a id="schematext2"></a>
<a id="schema_Text2"></a>
<a id="tocStext2"></a>
<a id="tocstext2"></a>

```json
{
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "string_id": "string",
  "font": "string"
}

```

Text2

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|size|number|false|none|none|
|color|string|false|none|asset id|
|horizontal_align|[HorizontalAlign](#schemahorizontalalign)|false|none|An enumeration.|
|string_id|string|true|none|none|
|font|string|true|none|asset id|

<h2 id="tocS_TextItem">TextItem</h2>
<!-- backwards compatibility -->
<a id="schematextitem"></a>
<a id="schema_TextItem"></a>
<a id="tocStextitem"></a>
<a id="tocstextitem"></a>

```json
{
  "string_id": "string",
  "font": "string",
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "bullet": false
}

```

TextItem

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|TextItem|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[TextItem1](#schematextitem1)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[TextItem2](#schematextitem2)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[TextItem3](#schematextitem3)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[TextItem4](#schematextitem4)|false|none|none|

<h2 id="tocS_TextItem1">TextItem1</h2>
<!-- backwards compatibility -->
<a id="schematextitem1"></a>
<a id="schema_TextItem1"></a>
<a id="tocStextitem1"></a>
<a id="tocstextitem1"></a>

```json
{
  "string_id": "string",
  "font": "string",
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "bullet": false
}

```

TextItem1

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|string_id|string|true|none|none|
|font|string|false|none|asset id|
|size|number|false|none|none|
|color|string|false|none|asset id|
|horizontal_align|[HorizontalAlign](#schemahorizontalalign)|false|none|An enumeration.|
|bullet|boolean|false|none|none|

<h2 id="tocS_TextItem2">TextItem2</h2>
<!-- backwards compatibility -->
<a id="schematextitem2"></a>
<a id="schema_TextItem2"></a>
<a id="tocStextitem2"></a>
<a id="tocstextitem2"></a>

```json
{
  "image": "string",
  "color": "string",
  "width": 0,
  "height": 0,
  "bullet": false
}

```

TextItem2

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|image|string|true|none|asset id|
|color|string|false|none|asset id|
|width|number|true|none|none|
|height|number|true|none|none|
|bullet|boolean|false|none|none|

<h2 id="tocS_TextItem3">TextItem3</h2>
<!-- backwards compatibility -->
<a id="schematextitem3"></a>
<a id="schema_TextItem3"></a>
<a id="tocStextitem3"></a>
<a id="tocstextitem3"></a>

```json
{
  "newline": "string"
}

```

TextItem3

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|newline|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|boolean|false|none|none|

<h2 id="tocS_TextItem4">TextItem4</h2>
<!-- backwards compatibility -->
<a id="schematextitem4"></a>
<a id="schema_TextItem4"></a>
<a id="tocStextitem4"></a>
<a id="tocstextitem4"></a>

```json
{
  "space": 0
}

```

TextItem4

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|space|number|true|none|none|

<h2 id="tocS_TranslationPayloadType">TranslationPayloadType</h2>
<!-- backwards compatibility -->
<a id="schematranslationpayloadtype"></a>
<a id="schema_TranslationPayloadType"></a>
<a id="tocStranslationpayloadtype"></a>
<a id="tocstranslationpayloadtype"></a>

```json
"localization"

```

TranslationPayloadType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|TranslationPayloadType|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|TranslationPayloadType|localization|

<h2 id="tocS_Type">Type</h2>
<!-- backwards compatibility -->
<a id="schematype"></a>
<a id="schema_Type"></a>
<a id="tocStype"></a>
<a id="tocstype"></a>

```json
"color"

```

Type

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Type|string|false|none|An enumeration.|

#### Enumerated Values

|Property|Value|
|---|---|
|Type|color|
|Type|shape|
|Type|restore|
|Type|close|
|Type|custom|
|Type|open_url|
|Type|image|
|Type|radial-gradient|
|Type|conic-gradient|
|Type|linear-gradient|
|Type|font|

<h2 id="tocS_VariationProduct">VariationProduct</h2>
<!-- backwards compatibility -->
<a id="schemavariationproduct"></a>
<a id="schema_VariationProduct"></a>
<a id="tocSvariationproduct"></a>
<a id="tocsvariationproduct"></a>

```json
{
  "title": "string",
  "is_consumable": true,
  "adapty_product_id": "6414dbe0-1fa8-4590-a838-ec1ead8ab951",
  "vendor_product_id": "string",
  "introductory_offer_eligibility": false,
  "promotional_offer_eligibility": false,
  "base_plan_id": "string",
  "offer": {
    "category": "no_offer",
    "type": "free_trial",
    "id": "string"
  }
}

```

VariationProduct

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|
|is_consumable|boolean|true|none|none|
|adapty_product_id|string(uuid)|false|none|none|
|vendor_product_id|string|true|none|none|
|introductory_offer_eligibility|boolean|false|none|none|
|promotional_offer_eligibility|boolean|false|none|none|
|base_plan_id|string|false|none|none|
|offer|[OfferDTO](#schemaofferdto)|false|none|Annotation:     This object is immutable dataset.  @dataclass(frozen=True)|

<h2 id="tocS_VariationRemoteConfigData">VariationRemoteConfigData</h2>
<!-- backwards compatibility -->
<a id="schemavariationremoteconfigdata"></a>
<a id="schema_VariationRemoteConfigData"></a>
<a id="tocSvariationremoteconfigdata"></a>
<a id="tocsvariationremoteconfigdata"></a>

```json
{
  "lang": "string",
  "data": "string"
}

```

VariationRemoteConfigData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lang|string|true|none|none|
|data|string|true|none|none|

<h2 id="tocS_Video">Video</h2>
<!-- backwards compatibility -->
<a id="schemavideo"></a>
<a id="schema_Video"></a>
<a id="tocSvideo"></a>
<a id="tocsvideo"></a>

```json
{
  "master_playlist_url": "http://example.com",
  "image_url": "http://example.com",
  "image_preview_base64": "string"
}

```

Video

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|master_playlist_url|string(uri)|true|none|none|
|image_url|string(uri)|true|none|none|
|image_preview_base64|string|true|none|none|

<h2 id="tocS_VideoResponse">VideoResponse</h2>
<!-- backwards compatibility -->
<a id="schemavideoresponse"></a>
<a id="schema_VideoResponse"></a>
<a id="tocSvideoresponse"></a>
<a id="tocsvideoresponse"></a>

```json
{
  "data": {
    "master_playlist_url": "http://example.com",
    "image_url": "http://example.com",
    "image_preview_base64": "string"
  }
}

```

VideoResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[Video](#schemavideo)|false|none|none|

<h2 id="tocS_ViewItem">ViewItem</h2>
<!-- backwards compatibility -->
<a id="schemaviewitem"></a>
<a id="schema_ViewItem"></a>
<a id="tocSviewitem"></a>
<a id="tocsviewitem"></a>

```json
"string"

```

ViewItem

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ViewItem|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Shape](#schemashape)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Button](#schemabutton)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Text](#schematext)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CustomObject](#schemacustomobject)|false|none|none|

<h2 id="tocS_ViewStyle">ViewStyle</h2>
<!-- backwards compatibility -->
<a id="schemaviewstyle"></a>
<a id="schema_ViewStyle"></a>
<a id="tocSviewstyle"></a>
<a id="tocsviewstyle"></a>

```json
{
  "footer_block": {
    "property1": "string",
    "property2": "string"
  },
  "features_block": {
    "type": "list"
  },
  "products_block": {
    "type": "single",
    "main_product_index": 0,
    "products": [
      {
        "product_id": "string",
        "type": "product",
        "order": 0
      }
    ]
  }
}

```

ViewStyle

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|footer_block|object|false|none|none|
|» **additionalProperties**|[ViewItem](#schemaviewitem)|false|none|none|
|features_block|[FeaturesBlock](#schemafeaturesblock)|false|none|none|
|products_block|[ProductsBlock](#schemaproductsblock)|true|none|none|

<h2 id="tocS_common__domains__value_objects__paywall_builder__v4__paywall_builder_config__PaywallBuilderV3Config">common__domains__value_objects__paywall_builder__v4__paywall_builder_config__PaywallBuilderV3Config</h2>
<!-- backwards compatibility -->
<a id="schemacommon__domains__value_objects__paywall_builder__v4__paywall_builder_config__paywallbuilderv3config"></a>
<a id="schema_common__domains__value_objects__paywall_builder__v4__paywall_builder_config__PaywallBuilderV3Config"></a>
<a id="tocScommon__domains__value_objects__paywall_builder__v4__paywall_builder_config__paywallbuilderv3config"></a>
<a id="tocscommon__domains__value_objects__paywall_builder__v4__paywall_builder_config__paywallbuilderv3config"></a>

```json
{
  "format": "4.0.0",
  "template_id": "string",
  "template_revision": 0,
  "assets": [
    {
      "id": "string",
      "type": "color",
      "value": "string"
    }
  ],
  "localizations": [
    {
      "id": "string",
      "is_right_to_left": true,
      "strings": [
        {
          "id": "string",
          "value": [
            "string"
          ],
          "fallback": [
            "string"
          ]
        }
      ],
      "assets": [
        {
          "id": "string",
          "type": "color",
          "value": "string"
        }
      ]
    }
  ],
  "default_localization": "string",
  "styles": null
}

```

PaywallBuilderV3Config

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|format|string|true|none|none|
|template_id|string|true|none|none|
|template_revision|integer|true|none|none|
|assets|[oneOf]|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsColor](#schemaassetscolor)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsColorGradient](#schemaassetscolorgradient)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsFont](#schemaassetsfont)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsImage](#schemaassetsimage)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetsVideo](#schemaassetsvideo)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|localizations|[[Localizations](#schemalocalizations)]|false|none|none|
|default_localization|string|false|none|none|
|styles|any|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|format|4.0.0|
|format|4.1.0|

<h2 id="tocS_portal__in_app_context__domains__value_objects__paywall_builder_v3_config__PaywallBuilderV3Config">portal__in_app_context__domains__value_objects__paywall_builder_v3_config__PaywallBuilderV3Config</h2>
<!-- backwards compatibility -->
<a id="schemaportal__in_app_context__domains__value_objects__paywall_builder_v3_config__paywallbuilderv3config"></a>
<a id="schema_portal__in_app_context__domains__value_objects__paywall_builder_v3_config__PaywallBuilderV3Config"></a>
<a id="tocSportal__in_app_context__domains__value_objects__paywall_builder_v3_config__paywallbuilderv3config"></a>
<a id="tocsportal__in_app_context__domains__value_objects__paywall_builder_v3_config__paywallbuilderv3config"></a>

```json
{
  "format": "2.0.0",
  "template_id": "basic",
  "template_revision": 2,
  "assets": [
    {
      "id": "string",
      "type": "color",
      "value": "string"
    }
  ],
  "default_localization": "en-GB",
  "localizations": [
    {
      "id": "en-GB",
      "strings": [
        {
          "id": "str-title",
          "value": "Become a Premium man",
          "has_tags": false,
          "fallback": "string"
        }
      ],
      "assets": [
        {
          "id": "string",
          "type": "color",
          "value": "string"
        }
      ]
    }
  ],
  "styles": {
    "property1": {
      "footer_block": {
        "property1": "string",
        "property2": "string"
      },
      "features_block": {
        "type": "list"
      },
      "products_block": {
        "type": "single",
        "main_product_index": 0,
        "products": [
          {
            "product_id": "string",
            "type": "product",
            "order": 0
          }
        ]
      }
    },
    "property2": {
      "footer_block": {
        "property1": "string",
        "property2": "string"
      },
      "features_block": {
        "type": "list"
      },
      "products_block": {
        "type": "single",
        "main_product_index": 0,
        "products": [
          {
            "product_id": "string",
            "type": "product",
            "order": 0
          }
        ]
      }
    }
  },
  "is_hard_paywall": false,
  "main_image_relative_height": 0.56
}

```

PaywallBuilderV3Config

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|format|string|true|none|format version|
|template_id|string|true|none|template id|
|template_revision|integer|true|none|version|
|assets|[oneOf]|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetColor](#schemaassetcolor)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetColorGradient](#schemaassetcolorgradient)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetImage](#schemaassetimage)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AssetFont](#schemaassetfont)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|default_localization|string|false|none|none|
|localizations|[[Localization](#schemalocalization)]|false|none|none|
|styles|object|true|none|none|
|» **additionalProperties**|[ViewStyle](#schemaviewstyle)|false|none|none|
|is_hard_paywall|boolean|false|none|none|
|main_image_relative_height|number|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|format|3.0.0|

