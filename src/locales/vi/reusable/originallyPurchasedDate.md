<!--- originallyPurchasedDate.md --->

Đối với các gói đăng ký dài hạn, một chuỗi giao dịch sẽ được tạo ra. Giao dịch gốc là giao dịch đầu tiên trong chuỗi này và liên kết tất cả các giao dịch tiếp theo. Mỗi lần gia hạn chỉ đơn giản là sự kéo dài của giao dịch gốc đó. Nếu giao dịch là lần mua đầu tiên, nó chính là giao dịch gốc của chính nó.

Timestamp `originally_purchased_at` đánh dấu thời điểm mua hàng gốc, còn `purchased_at` là thời điểm của giao dịch hiện tại. Vì vậy, `purchased_at` không bao giờ có thể sớm hơn `originally_purchased_at`; trong trường hợp tốt nhất, chúng bằng nhau ở giao dịch đầu tiên.

Yêu cầu thất bại vì `originally_purchased_at` được đặt muộn hơn `purchased_at`. Hãy đảm bảo giá trị này sớm hơn hoặc bằng `purchased_at`.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `originally_purchased_at`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Luôn là `originally_purchased_date_error`. |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ response

```json showLineNumbers
{
  "errors": [
    {
      "source": "originally_purchased_at",
      "errors": [
        "originally_purchased_at must be earlier than or equal to purchased_at."
      ]
    }
  ],
  "error_code": "originally_purchased_date_error",
  "status_code": 400
}
```

 