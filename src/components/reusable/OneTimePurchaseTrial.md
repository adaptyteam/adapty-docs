<!--- OneTimePurchaseTrial.md --->

The request failed because a trial was provided with a one-time purchase. Unlike subscriptions, one-time purchases can’t have a trial. To fix this, check the `offer_type` in the [Offer](server-side-api-objects#offer) object within the [One-Time Purchase](server-side-api-objects#one-time-purchase) object. The value for `offer_type` can’t be `free_trial`. Either change the `offer_type` field value or switch to using the [Subscription](server-side-api-objects#subscription) object instead of One-Time Purchase.

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always offer.type</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `one_time_purchase_trial_error`.    |
| status_code | Integer | HTTP status. Always `400`.                                   |

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

 
