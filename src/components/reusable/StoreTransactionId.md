<!--- StoreTransactionId ---> 

In the case of prolonged subscriptions, a chain of subscriptions is generated. The original transaction is the very first transaction in this chain and the chain is linked by it. Other transactions in the chain are prolongations. If the transaction is the very first purchase in the subscription chain, it can be its own original transaction.

Another case is a one-time purchase. It never creates chains as it cannot have prolongations. For it, the `store_transaction_id` is always the same as the `store_original_transaction_id`.

Your request failed because the `store_transaction_id` value for the [One-Time Purchase](server-side-api-objects#one-time-purchase) object differs from its `store_original_transaction_id` . To fix the issue, either make them the same, or change the object - use [Subscription](server-side-api-objects#subscription) instead of the [One-Time Purchase](server-side-api-objects#one-time-purchase).

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `store_transaction_id`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `store_transaction_id_error`.       |
| status_code | Integer | HTTP status. Always `400.`                                   |

###### Response example

```json
{
  "errors": [
    {
      "source": "store_transaction_id",
      "errors": [
        "store_transaction_id must be equal to store_original_transaction_id for purchase."
      ]
    }
  ],
  "error_code": "store_transaction_id_error",
  "status_code": 400
}
```

 