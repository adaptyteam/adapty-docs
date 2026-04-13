请求失败，因为购买日期（`purchased_at`）早于或等于退款日期（`refunded_at`）。退款始终发生在购买之后，因为它是对交易的撤销操作。

要修复此问题，请检查 `purchased_at` 和 `refunded_at` 参数，并确保退款日期晚于购买日期。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `refunded_at`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短的错误名称。始终为 `refund_date_error`。                 |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "refund_date_error",
  "status_code": 400
}
```