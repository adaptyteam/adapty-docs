Yêu cầu thất bại vì đã cung cấp trial cho sản phẩm mua một lần. Không giống như gói đăng ký, sản phẩm mua một lần không thể có trial. Để khắc phục, hãy kiểm tra `offer_type` trong đối tượng [Offer](server-side-api-objects#offer) bên trong đối tượng [One-Time Purchase](server-side-api-objects#one-time-purchase). Giá trị của `offer_type` không được là `free_trial`. Hãy thay đổi giá trị của trường `offer_type` hoặc chuyển sang sử dụng đối tượng [Subscription](server-side-api-objects#subscription) thay vì One-Time Purchase.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là offer.type</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `one_time_purchase_trial_error`.  |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ response

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer.type",
      "errors": [
        "One-time purchase cannot have a trial."
      ]
    }
  ],
  "error_code": "one_time_purchase_trial_error",
  "status_code": 400
}
```