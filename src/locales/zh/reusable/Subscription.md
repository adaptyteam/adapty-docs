
| 参数 | 类型 | 必填 | 可为空 | 描述 |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type | String | 是 | 否 | 已购买产品的类型。可选值：`subscription`。 |
| store | String | 是 | 否 | 购买产品的商店。选项包括 `app_store`、`play_store`、`stripe`，或您的[自定义商店](custom-store)的 Store ID。 |
| environment | String | 否 | 否 | 交易发生的环境。选项为 `Sandbox` 或 `Production`，默认使用 `Production`。 |
| store_product_id | String | 是 | 否 | 解锁此访问等级的应用商店（App Store、Google Play、Stripe 等）中的产品 ID。 |
| store_transaction_id | String | 是 | 否 | 应用商店（App Store、Google Play、Stripe 等）中的交易 ID。 |
| store_original_transaction_id | String | 是 | 否 | <p>对于订阅，此 ID 关联续期链中的首笔交易，每次续期均与该原始交易相关联。</p><p>如果没有续期，`store_original_transaction_id` 与 `store_transaction_id` 相同。</p> |
| offer | Object | 否 | 是 | 购买时使用的优惠，以 [Offer](server-side-api-objects#offer) 对象的形式提供。 |
| is_family_shared | Boolean | 否 | 否 | 布尔值，表示该产品是否在 App Store Connect 中支持家庭共享。仅限 iOS。iOS 14.0 以下及 macOS 11.0 以下始终为 `false`，默认值为 `false`。 |
| price | Object | 是 | 否 | 订阅或购买的价格，以 [Price](server-side-api-objects#price) 对象的形式表示。初始购买价格为零表示免费试用；续期价格为零表示免费续期。 |
| purchased_at | ISO 8601 date | 是 | 否 | 最近一次购买访问等级的日期时间。 |
| refunded_at | ISO 8601 date | 否 | 否 | 订阅退款的日期时间（如适用）。 |
| cancellation_reason | String | 否 | 否 | 可能的取消原因包括：`voluntarily_cancelled`、`billing_error`、`price_increase`、`product_was_not_available`、`refund`、`upgraded` 或 `unknown`。 |
| variation_id | String | 否 | 否 | 用于追踪购买来源付费墙的实验变体 ID。 |
| originally_purchased_at | ISO 8601 date | 是 | 否 | 对于订阅链，这是通过 `store_original_transaction_id` 关联的原始交易的购买日期。 |
| expires_at | ISO 8601 date | 是 | 否 | 访问等级到期的日期时间。该值可能已过期，永久授权时为 `null`。 |
| renew_status | Boolean | 是 | 否 | 表示订阅是否已开启自动续期。 |
| renew_status_changed_at | ISO 8601 date | 否 | 否 | 自动续期被启用或禁用的日期时间。 |
| billing_issue_detected_at | ISO 8601 date | 否 | 否 | 检测到账单问题的日期时间（例如银行卡扣款失败）。此时订阅可能仍处于有效状态，若付款成功则此字段将被清除。 |
| grace_period_expires_at | ISO 8601 date | 否 | 否 | 若订阅当前处于[宽限期](https://developer.apple.com/news/?id=09122019c)，此字段为宽限期结束的日期时间。 |
