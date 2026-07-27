
该请求失败，原因是为一次性购买提供了试用期。与订阅不同，一次性购买不支持试用期。要解决此问题，请检查 [One-Time Purchase](server-side-api-objects#one-time-purchase) 对象中 [Offer](server-side-api-objects#offer) 对象内的 `offer_type` 字段。`offer_type` 的值不能为 `free_trial`。请修改 `offer_type` 字段的值，或改用 [Subscription](server-side-api-objects#subscription) 对象替代 One-Time Purchase。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 固定为 offer.type</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 错误简称。固定为 `one_time_purchase_trial_error`。           |
| status_code | Integer | HTTP 状态码。固定为 `400`。                                  |

#### 响应示例

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer.type",
      "errors": [
        "One-time purchase cannot have a trial."
      ]
    }
  ],
  "error_code": "one_time_purchase_trial_error",
  "status_code": 400
}
```

 
