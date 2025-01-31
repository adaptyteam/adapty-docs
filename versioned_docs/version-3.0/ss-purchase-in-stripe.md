---
title: "Validate purchase in Stripe, provide access level, and import transaction history from Stripe with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

Validates a purchase using the provided Stripe token using the credentials of Stripe in your App Settings inside Adapty Dashboard. If the purchase is valid, the transaction history is imported from Stripe to the profile in Adapty with the specified `customer_user_id`. If there was no profile with this `customer_user_id` before — it will be created.

Profile events are generated along the way and imported transactions are counted towards MTR.

## Method and endpoint

```http
POST https://api.adapty.io/api/v1/server-side-api/purchase/stripe/token/validate/
```

## Example request

<Tabs>  

<TabItem value="curl" label="cURL" default>

```bash
curl --location 'https://api.adapty.io/api/v1/sdk/purchase/stripe/token/validate/' \
--header 'Content-Type: application/vnd.api+json' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--data '{
    "type": "stripe_receipt_validation_result",
    "attributes": {
        "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
        "stripe_token": "<YOUR_STRIPE_TOKEN>"
    }
}'
```

</TabItem>  
<TabItem value="python" label="Python" default>

```python
import requests

url = "https://api.adapty.io/api/v1/sdk/purchase/stripe/token/validate/"

payload = {
    "type": "stripe_receipt_validation_result",
    "attributes": {
        "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
        "stripe_token": "<YOUR_STRIPE_TOKEN>"
    }
}

headers = {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "Api-Key <YOUR_SECRET_API_KEY>"
}

response = requests.post(url, headers=headers, json=payload)

print(response.text)
```
</TabItem>  
<TabItem value="js" label="JavaScript" default>  

```javascript 
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/vnd.api+json");
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");

const raw = JSON.stringify({
  "type": "stripe_receipt_validation_result",
  "attributes": {
    "customer_user_id": "<YOUR_CUSTOMER_USER_ID>",
    "stripe_token": "<YOUR_STRIPE_TOKEN>"
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.adapty.io/api/v1/sdk/purchase/stripe/token/validate/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```
</TabItem>  
</Tabs>

## Parameters

:::warning
This request requires different authorization parameters:

- **Base URL**: https://api.adapty.io/api/v1/sdk/purchase/stripe/token/validate/
- **Authorization**: API requests must be authenticated by including your secret API key as an **Authorization header** with value `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_...`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.
- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/vnd.api+json`.
- **Body**:  The API expects the request to use the body as JSON.

:::

| Param                  | Type   | Required          | Nullable           | Description                                                  |
| :--------------------- | :----- | :---------------- | :----------------- | :----------------------------------------------------------- |
| **customer\_user\_id** | String | :heavy_plus_sign: | :heavy_minus_sign: | The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. For it to work, you must [identify the users](identifying-users) in your mobile app code via Adapty SDK |
| **stripe\_token**      | String | :heavy_plus_sign: | :heavy_minus_sign: | Token of a Stripe object that represents a unique purchase. Could either be a token of Stripe's Subscription (`sub_XXX`) or Payment Intent (`pi_XXX`). |

## Successful response: 200: OK

```json
{
  "data": null
}
```

## Errors

### **400**: Bad request

Contain a list of errors with parameters.

**Parameters**

| Parameter | Type    | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| detail    | String  | Descriptive information about the error.                     |
| source    | String  | An object containing a `"pointer"` that references the exact location in the request document causing the issue |
| Status    | Integer | HTTP status. Always `400`                                    |

**Response example**

```json
{
  "errors": [
    {
      "detail": "none is not an allowed value",
      "source": {
        "pointer": "/data/attributes/stripe_token"
      },
      "status": "400"
    }
  ]
}
```



---

**See also:**

- [Grant access level](ss-grant-access-level)
- [Revoke access level](ss-revoke-access-level)
- [Set transaction](ss-set-transaction)
