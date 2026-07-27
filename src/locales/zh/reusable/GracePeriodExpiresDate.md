
宽限期是您可以为用户提供的额外时间，以便他们在未能及时续订时延续订阅——例如，当信用卡扣款失败时。这有助于在用户解决问题期间保留其设置。提供宽限期是可选的。

如果您提供宽限期，其到期日期（`grace_period_expires_at`）应晚于订阅到期日期（`expires_at`）。如果不满足此条件，宽限期到期时间将与订阅到期时间一致。无论如何，宽限期到期时间不能早于订阅到期时间。

要解决此问题，请确保宽限期到期日期（`grace_period_expires_at`）晚于订阅到期日期（`expires_at`）。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 固定值 `grace_period_expires_at`</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 简短错误名称。固定值 `grace_period_expires_date_error`。     |
| status_code | Integer | HTTP 状态码。固定值 `400`。                                  |

#### 响应示例

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

