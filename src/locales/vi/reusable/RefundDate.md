Yêu cầu thất bại vì ngày mua (`purchased_at`) sớm hơn hoặc bằng ngày hoàn tiền (`refunded_at`). Hoàn tiền luôn xảy ra sau khi mua, vì nó đảo ngược giao dịch.

Để khắc phục, hãy kiểm tra các tham số `purchased_at` và `refunded_at` và đảm bảo rằng ngày hoàn tiền muộn hơn ngày mua.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `refunded_at`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `refund_date_error`.              |
| status_code | Integer | Trạng thái HTTP. Luôn là `400`.                              |

#### Ví dụ phản hồi

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