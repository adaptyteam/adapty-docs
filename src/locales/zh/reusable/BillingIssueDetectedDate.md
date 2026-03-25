账单问题发生在订阅续费尝试过程中出现错误时，因此它始终发生在交易日期（`purchased_at`）之后。

要解决此问题，请确保账单问题日期（`billing_issue_detected_at`）晚于交易日期（`purchased_at`）。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 始终为 `billing_issue_detected_at`</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 错误简称。始终为 `billing_issue_detected_at_date_comparison_error`。 |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "billing_issue_detected_at",
      "errors": [
        "billing_issue_detected_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "billing_issue_detected_at_date_comparison_error",
  "status_code": 400
}
```