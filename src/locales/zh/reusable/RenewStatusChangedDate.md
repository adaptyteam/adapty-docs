续订是订阅的延续。用户可以取消订阅续订，之后再重新续订。这两个操作的时间均存储在 `renew_status_changed_at` 参数中，且该时间不能早于交易本身的时间。

要解决此问题，请确保 `renew_status_changed_at` 晚于交易时间（`purchased_at`）。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）始终为 `originally_purchased_at`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短错误名称。始终为 `originally_purchased_date_error`。     |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "renew_status_changed_at",
      "errors": [
        "renew_status_changed_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "renew_status_changed_date_error",
  "status_code": 400
}
```