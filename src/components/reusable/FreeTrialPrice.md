<!--- FreeTrialPrice.md ---> 

The request failed because the `offer_type` parameter is set to `free_trial`, but the `value` parameter of the [Price](server-side-api-objects#price) object isn’t set to zero.

Another possible reason is that the `offer_id` parameter was included but left `null`, even though it can’t be null. In this case, either provide a value for `offer_id` or remove the parameter entirely.

#### Parameters

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `offer.type`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always: `free_trial_price_error`.          |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

The profile is not found

```json
{
  "errors": [
    {
      "source": "offer_type",
      "errors": [
        "If offer_type is 'free_trial', price.value must be 0."
      ]
    }
  ],
  "error_code": "free_trial_price_error",
  "status_code": 400
}
```

 