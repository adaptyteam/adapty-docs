用户无法购买已过期的订阅。因此，`expires_at` 日期（订阅到期时间）应始终晚于 `purchased_at` 日期（交易发生时间）。

要解决此问题，请检查这两个日期，确保 `expires_at` 晚于 `purchased_at`。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）始终为 `expires_at`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。始终为 `expires_date_error`。                      |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "expires_at",
      "errors": [
        "expires_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "expires_date_error",
  "status_code": 400
}
```