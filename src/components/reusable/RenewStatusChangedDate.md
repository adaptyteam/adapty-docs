<!--- RenewStatusChangedDate --->

Renewal is a prolongation of a subscription. The user can cancel the subscription prolongation and then again prolong it. The time of both these actions is stored in the `renew_status_changed_at` parameter. And it can never happen earlier than the transaction itself.

To fix the issue, make sure the `renew_status_changed_at` is later than the time of the transaction (`purchased_at`).

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `originally_purchased_at`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `originally_purchased_date_error`.  |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json
{
  "errors": [
    {
      "source": "renew_status_changed_at",
      "errors": [
        "renew_status_changed_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "renew_status_changed_date_error",
  "status_code": 400
}
```

 

