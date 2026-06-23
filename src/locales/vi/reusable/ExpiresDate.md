Người dùng không thể mua một gói đăng ký đã hết hạn. Vì vậy, ngày `expires_at` (khi gói đăng ký hết hạn) phải luôn muộn hơn ngày `purchased_at` (khi giao dịch xảy ra).

Để khắc phục, hãy kiểm tra các ngày này và đảm bảo rằng `expires_at` sau `purchased_at`.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `expires_at`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `expires_date_error`.               |
| status_code | Integer | HTTP status. Luôn là `400`.                                   |

#### Ví dụ phản hồi

```json showLineNumbers
{
  "errors": [
    {
      "source": "expires_at",
      "errors": [
        "expires_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "expires_date_error",
  "status_code": 400
}
```