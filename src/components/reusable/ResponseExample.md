<!--- responseExample.md --->

```json showLineNumbers
{
  "data": {
    "app_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "profile_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "customer_user_id": "8612ED7C-3477-466D-93AE-1854B8E5FDD5",
    "total_revenue_usd": 109.88999999999999,
    "segment_hash": "string",
    "timestamp": 0,
    "custom_attributes": [
      {
        "key": "string",
        "value": "string"
      }
    ],
    "access_levels": [
      {
        "access_level_id": "premium",
        "store": "app_store",
        "store_product_id": "weekly_8.99",
        "store_base_plan_id": "",
        "store_transaction_id": "530001802720333",
        "store_original_transaction_id": "530001724306018",
        "offer": {
          "category": "introductory",
          "type": "free_trial",
          "id": "offer12"
        },
        "environment": "Production",
        "starts_at": "2022-10-12T09:42:50.000000+0000",
        "purchased_at": "2022-10-12T09:42:50.000000+0000",
        "originally_purchased_at": "2021-10-12T09:42:50.000000+0000",
        "expires_at": "2022-10-12T09:42:50.000000+0000",
        "renewal_cancelled_at": "2022-10-12T09:42:50.000000+0000",
        "billing_issue_detected_at": "2022-10-12T09:42:50.000000+0000",
        "is_in_grace_period": true,
        "cancellation_reason": "voluntarily_cancelled"
      }
    ],
    "subscriptions": [
      {
        "store": "app_store",
        "store_product_id": "weekly_8.99",
        "store_base_plan_id": "",
        "store_transaction_id": "530001802720333",
        "store_original_transaction_id": "530001724306018",
        "offer": {
          "offer_category": "introductory",
          "offer_type": "free_trial",
          "offer_id": "offer12"
        },
        "environment": "Production",
        "purchased_at": "2022-10-12T09:42:50.000000+0000",
        "originally_purchased_at": "2021-10-12T09:42:50.000000+0000",
        "expires_at": "2022-10-12T09:42:50.000000+0000",
        "renewal_cancelled_at": "2022-10-12T09:42:50.000000+0000",
        "billing_issue_detected_at": "2022-10-12T09:42:50.000000+0000",
        "is_in_grace_period": true,
        "cancellation_reason": "voluntarily_cancelled"
      }
    ],
    "non_subscriptions": [
      {
        "purchase_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "store": "app_store",
        "store_product_id": "weekly_8.99",
        "store_base_plan_id": "",
        "store_transaction_id": "530001724306018",
        "store_original_transaction_id": "530001724306018",
        "purchased_at": "2022-10-12T09:42:50.000000+0000",
        "environment": "Production",
        "is_refund": true,
        "is_consumable": true
      }
    ]
  }
}
```
