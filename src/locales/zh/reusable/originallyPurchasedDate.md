对于持续续订的订阅，会创建一条交易链。原始交易是该链中的第一笔，它将后续所有交易关联在一起。每次续订都只是对原始交易的延续。如果该交易是首次购买，则它本身即为原始交易。

`originally_purchased_at` 时间戳标记原始购买的时间，而 `purchased_at` 则标记当前交易的时间。因此，`purchased_at` 不可能早于 `originally_purchased_at`；最多在第一笔交易时两者相同。

本次请求失败，原因是 `originally_purchased_at` 被设置为晚于 `purchased_at` 的日期。请确保其早于或等于 `purchased_at`。

#### 响应体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 固定值为 `originally_purchased_at`</li><li> **errors**: 错误的详细描述。</li></ul> |
| error_code  | String  | 简短错误名称。固定值为 `originally_purchased_date_error`。   |
| status_code | Integer | HTTP 状态码。固定值为 `400`。                                |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "originally_purchased_at",
      "errors": [
        "originally_purchased_at must be earlier than or equal to purchased_at."
      ]
    }
  ],
  "error_code": "originally_purchased_date_error",
  "status_code": 400
}
```