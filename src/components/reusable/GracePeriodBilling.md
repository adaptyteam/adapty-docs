<!--- GracePeriodBilling --->

The start of a grace period counts as a billing issue. So, if the grace period has started (indicated by the `grace_period_expires_at` parameter being filled in), its start date should be recorded in the `billing_issue_detected_at` parameter.

To fix this, either set the start of the grace period in `billing_issue_detected_at` or, if the grace period hasn’t started yet, remove the `grace_period_expires_at` parameter.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `grace_period_billing_error`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `grace_period_billing_error`.       |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_billing_error",
      "errors": [
        "If grace_period_expires_at is specified, billing_issue_detected_at must also be specified."
      ]
    }
  ],
  "error_code": "grace_period_billing_error",
  "status_code": 400
}
```

 