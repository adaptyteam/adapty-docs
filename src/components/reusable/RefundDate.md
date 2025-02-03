<!--- RefundDate.md --->

The request failed because the purchase date (`purchased_at`) is earlier than or equal to the refund date (`refunded_at`). A refund always happens after a purchase, as it reverses the transaction.

To fix this, check the `purchased_at` and `refunded_at` parameters and make sure the refund date is later than the purchase date.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `refunded_at`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `refund_date_error`.                |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json showLineNumbers
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

 
