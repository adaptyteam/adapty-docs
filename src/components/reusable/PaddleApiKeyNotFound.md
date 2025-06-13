<!--- PaddleApiKeyNotFound.md --->

The request failed because the **Paddle API Key** in [App Settings](https://app.adapty.io/settings/paddle) is incorrect. Please verify that it is accurate and associated with the correct app.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`.</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `paddle_api_key_not_found`. |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```JSON showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paddle API key not found"
      ]
    }
  ],
  "error_code": "paddle_api_key_not_found",
  "status_code": 400
}
```

