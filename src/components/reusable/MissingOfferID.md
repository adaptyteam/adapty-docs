<!--- MissingOfferID.md --->

The request failed because the `offer_category` parameter has a value other than `introductory` or `offer_type` but doesn’t include an `offer_id`. In this case, either provide an `offer_id` or remove the `offer_category` or `offer_type` from the request.

Another possible reason is that the `offer_id` parameter was added but left as `null`, even though it can’t be null. If that’s the case, either add a value for `offer_id` or remove the parameter entirely.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `offer.category`</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `missing_offer_id`.        |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

The profile is not found

```json showLineNumbers
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

 





