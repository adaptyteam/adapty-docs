Thời gian ân hạn là khoảng thời gian bổ sung bạn có thể cấp cho khách hàng để gia hạn gói đăng ký khi họ không thể gia hạn đúng hạn—ví dụ, khi thẻ tín dụng của họ bị từ chối. Điều này giúp giữ nguyên các cài đặt của họ trong khi họ xử lý vấn đề. Việc cung cấp thời gian ân hạn là tùy chọn.

Nếu bạn cung cấp thời gian ân hạn, ngày hết hạn của nó (`grace_period_expires_at`) phải muộn hơn ngày hết hạn gói đăng ký (`expires_at`). Nếu không, thời điểm hết hạn của thời gian ân hạn sẽ trùng với thời điểm hết hạn gói đăng ký. Trong mọi trường hợp, thời điểm hết hạn của thời gian ân hạn không thể sớm hơn thời điểm hết hạn gói đăng ký.

Để khắc phục, hãy đảm bảo ngày hết hạn thời gian ân hạn (`grace_period_expires_at`) muộn hơn ngày hết hạn gói đăng ký (`expires_at`).

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `grace_period_expires_at`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Luôn là `grace_period_expires_date_error`.  |
| status_code | Integer | HTTP status. Luôn là `400`.                                   |

#### Ví dụ response

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