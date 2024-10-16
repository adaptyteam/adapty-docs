<!--- FreeTrialPrice.md ---> 

The request failed because the request contains an  `offer_type` parameter with the value `free_trial` and yet the `value` parameter of the [Price](server-side-api-objects#price) object is not equal to zero.

Another possible reason is that you added the `offer_id` parameter and left it `null` which it is not nullable. In this case, either add the `offer_id` value or remove the parameter.

###### Parameters

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `offer.type`</li><li> **errors**: Descriptive name of the error. </li></ul> |
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

 