| 参数 | 类型 | 必填 | 可为空 | 描述 |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_id | String | 是 | 否 | 购买在 Adapty 中的标识符。您可以使用它来确认是否已经处理过该购买，例如追踪一次性购买商品。 |
| store | String | 是 | 否 | 购买产品的商店。可选值为：**app_store**、**play_store**、**stripe**，或您的[自定义商店](custom-store)名称。 |
| store_product_id | String | 是 | 否 | 解锁该访问等级的产品在应用商店（App Store/Google Play/Stripe 等）中的标识符。 |
| store_base_plan_id | String | 是 | 是 | Google Play 商店中的[基础方案 ID](https://support.google.com/googleplay/android-developer/answer/12154973) 或 Stripe 中的[价格 ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#use-products-and-prices)。 |
| store_transaction_id | String | 是 | 否 | 应用商店（App Store/Google Play/Stripe 等）中的交易 ID。 |
| store_original_transaction_id | String | 是 | 否 | <p>对于续期订阅，会生成一条订阅链。原始交易是该链中的第一笔交易，整条链通过它进行关联。链中的其他交易均为续期交易。</p><br /><p>如果没有续期，`store_original_transaction_id` 将与 `store_transaction_id` 相同。</p> |
| purchased_at | ISO 8601 date | 是 | 否 | 最近一次购买该访问等级的日期时间。 |
| environment | String | 否 | 否 | 提供访问等级的交易所处的环境。可选值：`Sandbox`、`Production`。 |
| is_refund | Boolean | 是 | 否 | 表示该产品是否已被退款。 |
| is_consumable | Boolean | 是 | 否 | 表示该产品是否为消耗型商品。 |