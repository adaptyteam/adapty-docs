<!--- originallyPurchasedDate.md --->

For prolonged subscriptions, a chain of transactions is created. The original transaction is the first one in this chain, and it links all the following transactions. Each renewal is simply an extension of this original. If the transaction is the first purchase, it serves as its original transaction.

The `originally_purchased_at` timestamp marks the time of the original purchase, while `purchased_at` is the time of the current transaction. Because of this, `purchased_at` can never be earlier than `originally_purchased_at`; at most, they can be the same for the very first transaction.

The request failed because `originally_purchased_at` is set to a later date than `purchased_at`. Make sure it’s earlier or equal to `purchased_at`.

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `originally_purchased_at`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `originally_purchased_date_error`.  |
| status_code | Integer | HTTP status. Always `400`.                                   |

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

 
