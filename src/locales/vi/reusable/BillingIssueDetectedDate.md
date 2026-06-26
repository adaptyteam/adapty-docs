Sự cố thanh toán xảy ra khi có vấn đề trong quá trình gia hạn gói đăng ký, vì vậy nó luôn xảy ra sau ngày giao dịch (`purchased_at`).

Để khắc phục, hãy đảm bảo ngày phát hiện sự cố thanh toán (`billing_issue_detected_at`) muộn hơn ngày giao dịch (`purchased_at`).

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `billing_issue_detected_at`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Luôn là `billing_issue_detected_at_date_comparison_error`. |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ response

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