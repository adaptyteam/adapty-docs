<!--- MissingOfferID.md --->

The request failed because the request contains an `offer_category` parameter with a value different from `introductory` or `offer_type` and yet does not contain `offer_id`. In this case, provide `offer_id`or remove `offer_category` or `offer_type` from the request.

Another possible reason is that you added the `offer_id` parameter and left it `null` which it is not nullable. In this case, either add the `offer_id` value or remove the parameter.

###### Parameters

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | Buletted: <ul><li> **source**: (string) Always `offer_category`</li><li> **errors**: Descriptive name of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `missing_offer_id`         |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

The profile is not found

```json
{
  "errors": [
    {
      "source": "offer_category",
      "errors": [
        "offer_id must be specified for all offer types except 'introductory'."
      ]
    }
  ],
  "error_code": "missing_offer_id",
  "status_code": 400
}
```

 





