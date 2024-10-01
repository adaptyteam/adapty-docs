<!--- originallyPurchasedDate.md --->

In case of prolonged subscriptions, a chain of subscriptions is generated. The original transaction is the very first transaction in this chain and the chain is linked by it. Other transactions in the chain are prolongations. If the transaction is the very first purchase, it can be its own original transaction.

The `originally_purchased_at` is the purchase time of the original transaction, `purchased_at` is the time of the current transaction. Therefore, `purchased_at` can never be earlier than the `originally_purchased_at`. Maximum, they can coincide for the very first transaction.

The request failed because the `originally_purchased_at` parameter in it is later than the `purchased_at`.  Make it earlier or equal to the `purchased_at`.

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `originally_purchased_at`</li><li> **errors**: Descriptive name of the error</li></ul> |
| error_code  | String  | Short error name. Always `originally_purchased_date_error`   |
| status_code | Integer | HTTP status. Always `400`                                    |

###### Response example

```json
{
  "errors": [
    {
      "source": "originally_purchased_at",
      "errors": [
        "originally_purchased_at must be earlier than or equal to purchased_at."
      ]
    }
  ],
  "error_code": "originally_purchased_date_error",
  "status_code": 400
}
```

 
