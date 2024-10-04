<!--- FamilySharePrice.md --->

The request failed because the request contains an  `is_family_shared` parameter set to `true` which means the access level is shared by a family member for free and yet the `value` parameter of the [Price](server-side-api-objects#price) object is not equal to zero.

Make sure the  `is_family_shared` parameter should be set to `true`. If yes, set the `value` parameter of the [Price](server-side-api-objects#price) object to `0`.

###### Parameters

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `is_family_shared`</li><li> **errors**: Descriptive name of the error. </li></ul> |
| error_code  | String  | Short error name. Always: `family_share_price_error`         |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

The profile is not found

```json
{
  "errors": [
    {
      "source": "is_family_shared",
      "errors": [
        "If is_family_shared is true, price.value must be 0."
      ]
    }
  ],
  "error_code": "family_share_price_error",
  "status_code": 400
}
```

 
