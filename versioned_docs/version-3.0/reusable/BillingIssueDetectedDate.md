<!--- BillingIssueDetectedDate ---> 

The billing issue is something that happened during a subscription renewal attempt. Therefore, it always happens after the transaction date (`purchased_at`).

To fix the issue, make sure the date of the billing issue `billing_issue_detected_at` is later than the transaction date (`purchased_at`).

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `billing_issue_detected_at`</li><li> **errors**: Descriptive name of the error</li></ul> |
| error_code  | String  | Short error name. Always `billing_issue_detected_at_date_comparison_error` |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

```json
{
  "errors": [
    {
      "source": "billing_issue_detected_at",
      "errors": [
        "billing_issue_detected_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "billing_issue_detected_at_date_comparison_error",
  "status_code": 400
}
```

