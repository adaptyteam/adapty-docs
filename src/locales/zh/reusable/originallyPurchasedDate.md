对于续期订阅，系统会创建一条交易链。原始交易是该链中的第一笔交易，并将后续所有交易关联在一起。每次续订都是对原始交易的延续。如果某笔交易是首次购买，则它本身即为原始交易。

`originally_purchased_at` 时间戳标记原始购买的时间，而 `purchased_at` 标记当前交易的时间。因此，`purchased_at` 不可能早于 `originally_purchased_at`；对于第一笔交易，两者最多相等。

本次请求失败，原因是 `originally_purchased_at` 被设置为晚于 `purchased_at` 的日期。请确保其早于或等于 `purchased_at`。

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 始终为 `originally_purchased_at`</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 错误简称。始终为 `originally_purchased_date_error`。  |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                   |

#### 响应示例

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

 
