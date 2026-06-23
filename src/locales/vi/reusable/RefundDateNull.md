Yêu cầu thất bại do bao gồm `cancellation_reason` mà không có ngày `refunded_at`, hoặc có `refunded_at` mà không có `cancellation_reason`.

Khi thiết lập hoàn tiền, cần chỉ định cả ngày hoàn tiền lẫn lý do hoàn tiền.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `refunded_at`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `refund_fields_error`.            |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ phản hồi

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