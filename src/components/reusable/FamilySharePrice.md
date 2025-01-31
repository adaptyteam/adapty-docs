<!--- FamilySharePrice.md --->

The request failed because the `is_family_shared` parameter is set to `true`, meaning the access level is shared with a family member for free. However, the `value` parameter of the [Price](server-side-api-objects#price) object isn’t set to zero.

If `is_family_shared` should be `true`, make sure to set the `value` parameter of the [Price](server-side-api-objects#price) object to `0`.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `is_family_shared`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always: `family_share_price_error`.        |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

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

 
