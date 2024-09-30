<!--- FreeTrialPrice.md ---> 

The request failed because the request contains an `offer_category` parameter with a value different from `introductory` or `offer_type` and yet does not contain `offer_id`. In this case, provide `offer_id`or remove `offer_category` or `offer_type` from the request.

Another possible reason is that you added the `offer_id` parameter and left it `null` which it is not nullable. In this case, either add the `offer_id` value or remove the parameter.

###### Parameters

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | Buletted: <ul><li> **source**: (string) Always `offer_type`</li><li> **errors**: Descriptive name of the error. </li></ul> |
| error_code  | String  | Short error name. Always: `free_trial_price_error`           |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

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

 