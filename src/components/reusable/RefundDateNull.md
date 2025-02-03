<!--- RefundDateNull.md --->

The request failed because it either includes `cancellation_reason` without a `refunded_at` date, or it has `refunded_at` without a `cancellation_reason`.

When a refund is set, both the refund date and reason need to be specified.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `refunded_at`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `refund_fields_error`.              |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at and cancellation_reason=refund must be specified together."
      ]
    }
  ],
  "error_code": "refund_fields_error",
  "status_code": 400
}
```

 
