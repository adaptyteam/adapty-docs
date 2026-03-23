宽限期的开始计为计费问题。因此，如果宽限期已开始（由 `grace_period_expires_at` 参数已填写来表示），则其开始日期应记录在 `billing_issue_detected_at` 参数中。

要解决此问题，请在 `billing_issue_detected_at` 中设置宽限期的开始日期；或者，如果宽限期尚未开始，请移除 `grace_period_expires_at` 参数。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 固定值为 `grace_period_billing_error`</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 简短错误名称。固定值为 `grace_period_billing_error`。        |
| status_code | Integer | HTTP 状态码。固定值为 `400`。                                |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_billing_error",
      "errors": [
        "If grace_period_expires_at is specified, billing_issue_detected_at must also be specified."
      ]
    }
  ],
  "error_code": "grace_period_billing_error",
  "status_code": 400
}
```