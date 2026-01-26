

A user can’t buy a subscription that has already expired. So, the `expires_at` date (when the subscription expires) should always be later than the `purchased_at` date (when the transaction occurred).

To fix this, check these dates and ensure that `expires_at` is after `purchased_at`.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `expires_at`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `expires_date_error`.               |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json showLineNumbers
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

 