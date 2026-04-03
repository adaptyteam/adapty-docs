| 参数                            | 类型          | 必填 | 可为空 | 描述                                                         |
| :---------------------------- | :------------ | ---- | ------ | :----------------------------------------------------------- |
| access_level_id               | String        | 是   | 否     | 在 Adapty 控制台中设置的付费访问等级 ID。                    |
| store                         | String        | 是   | 否     | 购买产品的应用商店。选项：**app_store**、**play_store**、**stripe**，或您的[自定义商店](custom-store)名称。 |
| store_product_id              | String        | 是   | 否     | 应用商店（如 App Store、Google Play、Stripe）中解锁此访问等级的产品 ID。 |
| store_base_plan_id            | String        | 是   | 是     | Google Play 中的[基础方案 ID](https://support.google.com/googleplay/android-developer/answer/12154973) 或 Stripe 中的[价格 ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#use-products-and-prices)。 |
| store_transaction_id          | String        | 是   | 否     | 应用商店（App Store、Google Play、Stripe 等）中的交易 ID。   |
| store_original_transaction_id | String        | 是   | 否     | <p>对于订阅，此 ID 关联续订链中的原始交易。后续交易将作为续订进行关联。</p><p>如果没有续订，store_original_transaction_id 与 store_transaction_id 相同。</p> |
| offer                         | Object        | 是   | 否     | [Offer](server-side-api-objects#offer) 对象。如果客户没有访问等级，可以为 `null`。 |
| environment                   | String        | 否   | 否     | 授予访问权限的交易环境。选项：`Sandbox`、`Production`。      |
| starts_at                     | ISO 8601 date | 是   | 是     | 访问等级生效的日期时间。可能是未来的时间。                   |
| purchased_at                  | ISO 8601 date | 是   | 否     | 该访问等级最近一次购买的日期时间。                           |
| originally_purchased_at       | ISO 8601 date | 是   | 否     | 对于订阅，这是续订链中第一次（原始）购买的日期时间，与 `store_original_transaction_id` 关联。 |
| expires_at                    | ISO 8601 date | 是   | 是     | 访问等级到期的日期时间。可能是过去的时间，对于永久授权则为 `null`。 |
| renewal_cancelled_at          | ISO 8601 date | 是   | 是     | 订阅关闭自动续订的日期时间。订阅可能仍处于有效状态，只是不会自动续订。如果用户重新激活订阅，则设为 `null`。 |
| billing_issue_detected_at     | ISO 8601 date | 是   | 是     | 检测到计费问题（如银行卡扣款失败）的日期时间。订阅可能仍处于有效状态。如果后续付款成功，此字段将被清除。 |
| is_in_grace_period            | Boolean       | 是   | 否     | 表示订阅是否处于[宽限期](https://developer.apple.com/news/?id=09122019c)（仅适用于自动续订订阅）。 |
| cancellation_reason           | String        | 是   | 是     | 取消原因，选项包括：`voluntarily_cancelled`、`billing_error`、`price_increase`、`product_was_not_available`、`refund`、`upgraded`、`unknown`。 |