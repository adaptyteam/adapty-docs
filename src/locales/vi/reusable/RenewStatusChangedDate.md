Renewal là việc gia hạn gói đăng ký. Người dùng có thể hủy gia hạn gói đăng ký và sau đó gia hạn lại. Thời điểm của cả hai hành động này được lưu trong tham số `renew_status_changed_at`. Và giá trị này không thể xảy ra trước thời điểm giao dịch.

Để khắc phục sự cố, hãy đảm bảo `renew_status_changed_at` sau thời điểm giao dịch (`purchased_at`).

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `originally_purchased_at`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `originally_purchased_date_error`.  |
| status_code | Integer | HTTP status. Luôn là `400`.                                   |

#### Ví dụ response

```json showLineNumbers
{
  "errors": [
    {
      "source": "renew_status_changed_at",
      "errors": [
        "renew_status_changed_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "renew_status_changed_date_error",
  "status_code": 400
}
```