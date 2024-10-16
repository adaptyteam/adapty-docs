<!--- OneTimePurchaseTrial.md --->

The request failed because you provided a trial with a one-time purchase. Despite a subscription, one-time purchases cannot have a trial. To fix the issue, check the `offer_type` of the [Offer](server-side-api-objects#offer) object within [One-Time Purchase](server-side-api-objects#one-time-purchase) object. Its value cannot be `free_trial` . Either change the `offer_type` field value or change the object - use [Subscription](server-side-api-objects#subscription) instead of the One-Time Purchase.

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always offer.type</li><li> **errors**: Descriptive name of the error</li></ul> |
| error_code  | String  | Short error name. Always `one_time_purchase_trial_error`.    |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

```json
{
  "errors": [
    {
      "source": "offer.type",
      "errors": [
        "One-time purchase cannot have a trial."
      ]
    }
  ],
  "error_code": "one_time_purchase_trial_error",
  "status_code": 400
}
```

 
