请求失败，原因是 `offer_type` 参数设置为 `free_trial`，但 [Price](server-side-api-objects#price) 对象的 `value` 参数未设置为零。

另一个可能的原因是 `offer_id` 参数已包含但设置为 `null`，而该参数不能为 null。在这种情况下，请为 `offer_id` 提供一个值，或者完全移除该参数。

#### 请求体 \{#body\}

| 参数          | 类型    | 描述                                                         |
| ------------- | ------- | ------------------------------------------------------------ |
| errors        | Object  | <ul><li> **source**：（字符串）始终为 `offer.type`</li><li> **errors**：错误描述。</li></ul> |
| error_code    | String  | 错误简称。始终为：`free_trial_price_error`。                 |
| status_code   | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例 \{#response-example\}

未找到用户画像

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_type",
      "errors": [
        "If offer_type is 'free_trial', price.value must be 0."
      ]
    }
  ],
  "error_code": "free_trial_price_error",
  "status_code": 400
}
```