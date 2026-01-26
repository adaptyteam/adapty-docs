

A grace period is extra time you can give customers to extend their subscription if they couldn’t renew it on time—for instance, if their credit card didn’t go through. This helps keep their settings intact while they resolve any issues. Offering a grace period is optional.

If you do offer a grace period, the expiration date for it (`grace_period_expires_at`) should be later than the subscription expiration date (`expires_at`). If not, the grace period expiration time will match the subscription expiration time. In any case, the grace period expiration can’t be earlier than the subscription expiration.

To fix this, make sure the grace period expiration date (`grace_period_expires_at`) is later than the subscription expiration date (`expires_at`).

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `grace_period_expires_at`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `grace_period_expires_date_error`.  |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_expires_at",
      "errors": [
        "grace_period_expires_at must be later or equal to expires_at."
      ]
    }
  ],
  "error_code": "grace_period_expires_date_error",
  "status_code": 400
}
```

