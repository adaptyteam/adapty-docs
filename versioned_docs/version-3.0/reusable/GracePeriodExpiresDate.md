<!--- GracePeriodExpiresDate --->

The grace period is some time you can provide to your customer to extend their subscription if they for some reason failed to extend it on time, for example, due to lack of money on their credit card. It helps to save customer's settings and let them solve the issues meantime. You can or cannot provide this grace period. 

If you do provide, the time of the grace period expiration (`grace_period_expires_at`) is later than the date of the subscription expiration (`expires_at`). If you do not provide the grace period, its expiration time will be equal to the subscription expiration time. In no case, the grace period expiration time can be earlier than the subscription expiration time.

To solve the issue, make sure the grace period expiration time (`grace_period_expires_at`) is later than the subscription expiration time (`expires_at`).

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `grace_period_expires_at`</li><li> **errors**: Descriptive name of the error</li></ul> |
| error_code  | String  | Short error name. Always `grace_period_expires_date_error`   |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

```json
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

