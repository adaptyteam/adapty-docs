---
title: "Events - do not delete"
description: ""
metadataTitle: ""
---

Each event is wrapped into the following structure:

```json title="title="{""
  "store": "play_store",
  "currency": "KZT",
  "price_usd": 11.564063329590908,
  "profile_id": "f6489bda-ee14-4f45-8649-9a4b0520745f",
  "cohort_name": "All Users",
  "environment": "Sandbox",
  "price_local": 5090,
  "base_plan_id": "weekly-premium-599-base",
  "developer_id": "vlad",
  "paywall_name": "Vlad (week-month-year)",
  "proceeds_usd": 9.829453830152271,
  "variation_id": "94eca3d2-b67f-457f-97a9-be9110a635f9",
  "purchase_date": "2024-05-08T21:28:00.909000+0000",
  "store_country": "KZ",
  "event_datetime": "2024-05-08T21:28:00.909000+0000",
  "proceeds_local": 4326.5,
  "tax_amount_usd": 1.0531557675163146,
  "transaction_id": "GPA.3338-5134-9215-46598",
  "net_revenue_usd": 8.776298062635956,
  "profile_country": "GE",
  "paywall_revision": "1",
  "profile_event_id": "f0760753-4a16-4519-ad7c-eecf03e17bcb",
  "tax_amount_local": 463.55357142857133,
  "net_revenue_local": 3862.946428571428,
  "vendor_product_id": "weekly.premium.599",
  "profile_ip_address": "212.58.120.9",
  "consecutive_payments": 1,
  "rate_after_first_year": false,
  "original_purchase_date": "2024-05-08T21:28:00.909000+0000",
  "original_transaction_id": "GPA.3338-5134-9215-46598",
  "subscription_expires_at": "2024-05-08T21:32:53.237000+0000",
  "profile_total_revenue_usd": 23.128505522561397
}
```

Where

| Property | Type | Description |
|--------|----|-----------|
| **store** | str | Can be _app_store_ or _play_store_. |
| **currency** | str | Local currency (defaults to USD). |
| **price_usd** | float | Product price before Apple/Google cut. Revenue. |
| **profile_id** | uuid | Adapty user ID. |
| **cohort_name** | str | Name of the audience to which the profile belongs to. |
| **environment** | str | Can be _Sandbox_ or _Production_. |
| **price_local** | float | Product price before Apple/Google cut in local currency. Revenue. |
| **base_plan_id** | str | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973)   in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price)   in Stripe. |
| **developer_id** | str | Developer (SDK) ID of the placement where the transaction originated. |
| **paywall_name** | str | Name of the paywall where the transaction originated. |
| **proceeds_usd** | float | Product price after Apple/Google cut. Net revenue. |
| **variation_id** | uuid | Unique ID of the paywall where the purchase was made. |
| **purchase_date** | ISO 8601 date | The date and time of product purchase. |
| **store_country** | str | The country sent to us by the store. |
| **event_datetime** | ISO 8601 date | The date and time of the event. |
| **proceeds_local** | float | Product price after Apple/Google cut in local currency. Net revenue. |
| **tax_amount_usd** | float |  |
| **transaction_id** | str | A unique identifier for a transaction such as a purchase or renewal. |
| **net_revenue_usd** | float |  |
| **profile_country** | str | Determined by Adapty, based on profile IP. |
| **paywall_revision** | int | Revision of the paywall where the transaction originated. The value is set to 1. |
| **profile_event_id** | uuid | Unique event ID that can be used for deduplication. |
| **tax_amount_local** | float |  |
| **net_revenue_usd** | float |  |
| **vendor_product_id** | str | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **profile_ip_address** | str | Profile IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes. |
| **consecutive_payments** | int | The number of periods, that a user is subscribed to without interruptions. Includes the current period. |
| **rate_after_first_year** | bool | Boolean indicates that a vendor reduces cuts to 15%. Apple and Google have 30% first-year cut and 15% after it. |
| **original_purchase_date** | ISO 8601 date | The date and time of the original purchase. |
| **original_transaction_id** | str | The transaction identifier of the original purchase. |
| **subscription_expires_at** | ISO 8601 date | The Expiration date of subscription. Usually in the future. |
| **profile_total_revenue_usd** | float | Total revenue for the profile, refunds included. |
| **trial_duration** | str | Duration of a trial period in days. Sent in a format "{} days" , for example, "7 days". |
| **cancellation_reason** | str | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be</p><p>iOS & Android</p><p>_voluntarily_cancelled_, _billing_error_, _refund_</p><p>iOS</p><p>_price_increase_, _product_was_not_available_, _unknown_</p><p>Android</p><p>_new_subscription_replace_, _cancelled_by_developer_</p> |
| **promotional_offer_id** | str | ID of promotional offer as indicated in the [**Product**](https://app.adapty.io/products) section of the Adapty Dashboard |
| **store_offer_category** | str | Can be _introductory_ or _promotional_. |
| **store_offer_discount_type** | str | Can be _free_trial_, _pay_as_you_go_ or _pay_up_front_. |
| **ab_test_name** | str | Name of the A/B test where the transaction originated. |
| **ab_test_revision** | int | Revision of the A/B test where the transaction originated. The value is set to 1. |
| **access_level_id** | str | Paid access level ID |
| **is_active** | bool | Boolean indicating whether the paid access level is active for the profile. |
| **will_renew** | bool | Boolean indicating whether the paid access level will be renewed. |
| **is_refund** | bool | Boolean indicating whether the transaction is another transaction refund. |
| **is_lifetime** | bool | Boolean indicating whether the paid access level is a lifetime. |
| **is_in_grace_period** | bool | Boolean indicating whether the profile is in a grace period. |
| **starts_at** | ISO 8601 date | Date and time when the paid access level starts for the user. |
| **renewed_at** | ISO 8601 date | Date and time when the paid access will be renewed. |
| **expires_at** | ISO 8601 date | Date and time when the paid access will expire. |
| **activated_at** | ISO 8601 date | Date and time when the paid access was activated. |
| **billing_issue_detected_at** | ISO 8601 date | Date and time of billing issue. |