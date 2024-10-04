<!--- ExpiresDate --->

The user cannot buy a subscription that has already expired. Therefore, the `expires_at` - the time of the subscription expiration is always later than the `purchased_at` - the time of the transaction purchase.

To fix the issue, review these dates and make sure the `expires_at` is later than the `purchased_at`.

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `expires_at`</li><li> **errors**: Descriptive name of the error</li></ul> |
| error_code  | String  | Short error name. Always `expires_date_error`                |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

```json
{
  "errors": [
    {
      "source": "expires_at",
      "errors": [
        "expires_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "expires_date_error",
  "status_code": 400
}
```

 