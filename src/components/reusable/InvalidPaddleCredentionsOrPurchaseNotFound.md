 

The request failed for one of two reasons: either the Paddle credentials in [App Settings](https://app.adapty.io/settings/paddle) are incorrect, or the provided token is invalid. Please check the following:

1. The **Paddle API Key** in [App Settings](https://app.adapty.io/settings/paddle) is correct and belongs to the right app.
2. The `paddle_token` you're using exists in the app and has no typos in your request.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`.</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `invalid_paddle_credentials_or_purchase_not_found`. |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Invalid Paddle credentials or purchase not found"
      ]
    }
  ],
  "error_code": "invalid_paddle_credentials_or_purchase_not_found",
  "status_code": 400
}
```

