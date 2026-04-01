宽限期是您可以给予客户的额外时间，用于在未能按时续订的情况下延长其订阅——例如，信用卡扣款失败时。这有助于在客户解决问题期间保持其设置不变。提供宽限期是可选的。

如果您提供宽限期，其到期日期（`grace_period_expires_at`）应晚于订阅到期日期（`expires_at`）。否则，宽限期到期时间将与订阅到期时间相同。无论如何，宽限期到期时间不能早于订阅到期时间。

要解决此问题，请确保宽限期到期日期（`grace_period_expires_at`）晚于订阅到期日期（`expires_at`）。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）始终为 `grace_period_expires_at`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。始终为 `grace_period_expires_date_error`。         |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_expires_at",
      "errors": [
        "grace_period_expires_at must be later or equal to expires_at."
      ]
    }
  ],
  "error_code": "grace_period_expires_date_error",
  "status_code": 400
}
```