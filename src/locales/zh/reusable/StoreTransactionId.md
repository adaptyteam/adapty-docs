对于长期订阅，会生成一条订阅链。原始交易是该链中的第一笔交易，整条链通过它关联。链中的其他交易均为续订。如果某笔交易是订阅链中的第一次购买，它可以作为自身的原始交易。

另一种情况是一次性购买。由于无法续订，它不会创建订阅链。对于一次性购买，`store_transaction_id` 始终与 `store_original_transaction_id` 相同。

您的请求失败，原因是 [一次性购买](server-side-api-objects#one-time-purchase) 对象中的 `store_transaction_id` 值与其 `store_original_transaction_id` 不同。要解决此问题，请将两者设为相同值，或更改对象类型——使用 [订阅](server-side-api-objects#subscription) 替代 [一次性购买](server-side-api-objects#one-time-purchase)。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `store_transaction_id`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短错误名称。始终为 `store_transaction_id_error`。          |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例

```json showLineNumbers
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