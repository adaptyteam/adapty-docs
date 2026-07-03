Việc bắt đầu thời gian ân hạn được tính là một sự cố thanh toán. Vì vậy, nếu thời gian ân hạn đã bắt đầu (được xác định bởi tham số `grace_period_expires_at` đã được điền), ngày bắt đầu của nó phải được ghi lại trong tham số `billing_issue_detected_at`.

Để khắc phục, hãy đặt ngày bắt đầu của thời gian ân hạn vào `billing_issue_detected_at` hoặc, nếu thời gian ân hạn chưa bắt đầu, hãy xóa tham số `grace_period_expires_at`.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `grace_period_billing_error`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Luôn là `grace_period_billing_error`.       |
| status_code | Integer | HTTP status. Luôn là `400`.                                   |

#### Ví dụ phản hồi

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