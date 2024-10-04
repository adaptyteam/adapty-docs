<!--- RefundDate.md --->

The request failed because the purchase date (`purchased_at`) in the request is earlier or equalt to the refund date (`refunded_at`). Refund is a reverse of a purchase, so it happends always after the purchase.

To fix the issue, please review the `purchased_at` and `refunded_at` parameters and make sure the latter is later than the irst one.

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `refunded_at`</li><li> **errors**: Descriptive name of the error</li></ul> |
| error_code  | String  | Short error name. Always `refund_date_error`                 |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

```json
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "refund_date_error",
  "status_code": 400
}
```

 
