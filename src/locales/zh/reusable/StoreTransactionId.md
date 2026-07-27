 

对于连续订阅，系统会生成一个订阅链。原始交易是该链中的第一笔交易，整个链通过它关联。链中的其他交易均为续费交易。如果某笔交易是订阅链中的第一次购买，它本身就可以作为自己的原始交易。

另一种情况是一次性购买。由于无法续费，它不会产生订阅链。对于一次性购买，`store_transaction_id` 始终与 `store_original_transaction_id` 相同。

您的请求失败，原因是 [一次性购买](server-side-api-objects#one-time-purchase) 对象中的 `store_transaction_id` 值与其 `store_original_transaction_id` 不一致。要解决此问题，请将两者设为相同值，或者更换对象类型——使用 [订阅](server-side-api-objects#subscription) 替代 [一次性购买](server-side-api-objects#one-time-purchase)。

#### Body

| 参数        | 类型    | 说明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）固定值 `store_transaction_id`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。固定值 `store_transaction_id_error`。              |
| status_code | Integer | HTTP 状态码。固定值 `400`。                                  |

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

 