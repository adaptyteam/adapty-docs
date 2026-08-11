
宽限期的开始计为账单问题。因此，如果宽限期已经开始（通过 `grace_period_expires_at` 参数已填写来判断），则其开始日期应记录在 `billing_issue_detected_at` 参数中。

要解决此问题，请在 `billing_issue_detected_at` 中设置宽限期的开始日期；或者，如果宽限期尚未开始，请移除 `grace_period_expires_at` 参数。

#### Body

| 参数        | 类型    | 说明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 固定为 `grace_period_billing_error`</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 错误简称，固定为 `grace_period_billing_error`。              |
| status_code | Integer | HTTP 状态码，固定为 `400`。                                  |

#### 响应示例

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

 