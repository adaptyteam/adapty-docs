---
title: "Forwarding Events to Adapty"
description: ""
metadataTitle: ""
---

Apple and Google provide a way to send subscription events updates the moment they occur on their servers. It's very important to send them to Adapty to avoid delays in processing subscription status, and therefore providing the best experience for your customers.

In most cases, you just have to paste [Adapty URL to App Store Connect] \(doc:app-store-server-notifications) or use the [Real-time Developer Notifications (RTDN) topic provided by Adapty](real-time-developer-notifications-rtdn) in Google Play Console, no coding is needed on your side.

However, if you process these events and want to keep doing it, make sure to forward events to Adapty from your backend. It's straightforward; you just have to send raw \(without any modification\) payload from Apple or Google as a request body to our server using the same URL from settings.

Here are examples for different programming languages:

```python title="Python"
import requests

url = "https://api.adapty.io/api/v1/sdk/apple/webhook/123a258e62fad41bfa734f4b0dbcad456/" # don't forget to replace this URL

payload = '{"latest_receipt":"abc=","notification_type":"INITIAL_BUY",...}' # json encoded payload from Apple/Google

headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)
```
```javascript title="Javascript"
const axios = require('axios');

const url = 'https://api.adapty.io/api/v1/sdk/apple/webhook/123a258e62fad41bfa734f4b0dbcad456/'; // don't forget to replace this URL

const payload = '{"latest_receipt":"abc=","notification_type":"INITIAL_BUY",...}'; // json encoded payload from Apple/Google

const config = {
  method: 'post',
  url: url,
  headers: { 
    'Content-Type': 'application/json'
  },
  data: payload,
};

const response = await axios(config);
```
```php title="Php"
<?php
require_once 'HTTP/Request2.php';

$url = 'https://api.adapty.io/api/v1/sdk/apple/webhook/123a258e62fad41bfa734f4b0dbcad456/'; // don't forget to replace this URL

$payload = '{"latest_receipt":"abc=","notification_type":"INITIAL_BUY",...}'; // json encoded payload from Apple/Google

$request = new HTTP_Request2();
$request->setUrl($url);
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  'Content-Type' => 'application/json'
));
$request->setBody($payload);
$response = $request->send();
```
```ruby title="Ruby"
require "uri"
require "net/http"

url = URI("https://api.adapty.io/api/v1/sdk/apple/webhook/123a258e62fad41bfa734f4b0dbcad456/") # don't forget to replace this URL

payload = '{"latest_receipt":"abc=","notification_type":"INITIAL_BUY",...}' # json encoded payload from Apple/Google

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request.body = payload

response = https.request(request)
```
```java title="Java"
String url = "https://api.adapty.io/api/v1/sdk/apple/webhook/123a258e62fad41bfa734f4b0dbcad456/"; // don't forget to replace this URL

String payload = "{\"latest_receipt\":\"abc=\",\"notification_type\":\"INITIAL_BUY\",...}" // json encoded payload from Apple/Google

OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, payload);
Request request = new Request.Builder()
  .url(url)
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
```
```go title="Go"
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {
	url := "https://api.adapty.io/api/v1/sdk/apple/webhook/123a258e62fad41bfa734f4b0dbcad456/"; // don't forget to replace this URL

	payload := strings.NewReader(`{"latest_receipt":"abc=","notification_type":"INITIAL_BUY",...}`) // json encoded payload from Apple/Google

	method := "POST"

	client := &http.Client {
	}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()
}
```