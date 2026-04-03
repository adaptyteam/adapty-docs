| 参数 | 类型 | 必填 | 可为空 | 描述 |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type | String | 是 | 否 | 已购买产品的类型。可能的值：`one_time_purchase`。 |
| store | String | 是 | 否 | 购买产品的商店。可能的值：`app_store`、`play_store`、`stripe`，或您的[自定义商店](custom-store)的 Store ID。 |
| environment | String | 否 | 否 | 提供访问等级的交易环境。选项：`Sandbox`、`Production`。默认使用 `Production`。 |
| store_product_id | String | 是 | 否 | 解锁此访问等级的应用商店（App Store、Google Play、Stripe 等）中的产品 ID。 |
| store_transaction_id | String | 是 | 否 | 应用商店（App Store、Google Play、Stripe 等）中的交易 ID。 |
| store_original_transaction_id | String | 是 | 否 | <p>对于循环订阅，这是关联续订链的原始交易 ID。原始交易是链中的第一笔；后续交易为续订。</p><p>如果没有续订，`store_original_transaction_id` 与 `store_transaction_id` 相同。</p> |
| offer | Object | 否 | 是 | 购买时使用的优惠，以 [Offer](server-side-api-objects#offer) 对象表示。 |
| is_family_shared | Boolean | 否 | 否 | 布尔值，表示该产品是否在 App Store Connect 中支持家庭共享。仅限 iOS。对于 iOS 14.0 以下及 macOS 11.0 以下，始终为 `false`。默认使用 `false`。 |
| price | Object | 是 | 否 | 一次性购买的价格，以 [Price](server-side-api-objects#price) 对象表示。初始订阅购买金额为零表示免费试用；续订金额为零表示免费续订。 |
| purchased_at | ISO 8601 date | 是 | 否 | 最近一次购买访问等级的日期时间。 |
| refunded_at | ISO 8601 date | 否 | 否 | 如已退款，显示退款的日期时间。 |
| cancellation_reason | String | 否 | 否 | 取消的可能原因：`voluntarily_cancelled`、`billing_error`、`price_increase`、`product_was_not_available`、`refund`、`cancelled_by_developer`、`new_subscription`、`unknown`。 |
| variation_id | String | 否 | 否 | 用于追踪购买来源于特定付费墙的实验变体 ID。 |