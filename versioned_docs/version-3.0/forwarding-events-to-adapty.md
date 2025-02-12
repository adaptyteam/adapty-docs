---
title: "Forwarding Events to Adapty"
description: ""
metadataTitle: ""

---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

Apple and Google provide a way to send subscription event updates the moment they occur on their servers. It's essential to send them to Adapty to avoid delays in processing subscription status and therefore, providing the best experience for your customers.

In most cases, you just have to [enable App Store server notifications](enable-app-store-server-notifications) or [enable Real-time developer notifications (RTDN) in Google Play Console](enable-real-time-developer-notifications-rtdn); no coding is needed on your side.

However, if you process these events and want to keep doing it, make sure to forward events to Adapty from your backend. It's straightforward; you just have to send raw \(without any modification\) payload from Apple or Google as a request body to our server using the same URL from settings.

Here are examples for different programming languages:

<Tabs groupId="Id">
<TabItem value="python" label="Python" default>

```python showLineNumbers
import requests

url = "https://api.adapty.io/api/v1/sdk/apple/webhook/123a258e62fad41bfa734f4b0dbcad456/" # don't forget to replace this URL

payload = '{"latest_receipt":"abc=","notification_type":"INITIAL_BUY",...}' # json encoded payload from Apple/Google

headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)
```

</TabItem>
<TabItem value="javascript" label="Javascript" default>  

```javascript  showLineNumbers
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

</TabItem>
<TabItem value="php" label="PHP" default> 

```php  showLineNumbers
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

</TabItem>
<TabItem value="ruby" label="Ruby" default>   

```ruby  showLineNumbers
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

</TabItem>
<TabItem value="java" label="Java" default> 

```java showLineNumbers
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

</TabItem>
<TabItem value="go" label="Go" default>    

  ```go showLineNumbers
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

</TabItem>  </Tabs>

