<!--- GracePeriodBilling --->

The start of a grace period is considered to be a billing issue. So if it is started (and that is defined by the filled out `grace_period_expires_at` parameter), the date of its start should be recorded to the `billing_issue_detected_at` parameter.

To fix the issue, set the start of the grace period to the `billing_issue_detected_at` parameter or, if the grace period is not yet started, remove the `grace_period_expires_at` parameter.

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `grace_period_billing_error`</li><li> **errors**: Descriptive name of the error</li></ul> |
| error_code  | String  | Short error name. Always `grace_period_billing_error`        |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

```json
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

 