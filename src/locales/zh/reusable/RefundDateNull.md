该请求失败，原因是包含了 `cancellation_reason` 但未提供 `refunded_at` 日期，或者提供了 `refunded_at` 但未指定 `cancellation_reason`。

设置退款时，退款日期和退款原因必须同时指定。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `refunded_at`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短错误名称。始终为 `refund_fields_error`。                 |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at and cancellation_reason=refund must be specified together."
      ]
    }
  ],
  "error_code": "refund_fields_error",
  "status_code": 400
}
```