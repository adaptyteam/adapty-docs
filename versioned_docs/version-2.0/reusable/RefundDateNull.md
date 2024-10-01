<!--- RefundDateNull.md --->

The request failed because the request either contains `cancellation_reason` and yet does not contain the date of the refund in the `refunded_at` field or vice versa - contains the `refunded_at` and lacks the `cancellation_reason`.

When a refund is set, both its date and its reason must be specified. 

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `refunded_at`</li><li> **errors**: Descriptive name of the error</li></ul> |
| error_code  | String  | Short error name. Always `refund_fields_error`               |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

```json
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

 
