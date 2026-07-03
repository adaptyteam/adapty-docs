Yêu cầu thất bại vì không tìm thấy các sản phẩm liên kết với token đã cung cấp. Hãy đảm bảo rằng tất cả các sản phẩm cần thiết đã được thêm vào đúng ứng dụng trong Adapty và **Paddle Product ID** cùng **Paddle Price ID** của chúng được điền chính xác.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `non_field_errors`.</li><li> **errors**: Mô tả lỗi. </li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Giá trị có thể có: `no_products_found`.       |
| status_code | Integer | HTTP status. Luôn là `400`.                                   |

#### Ví dụ response

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "No products found for purchase"
      ]
    }
  ],
  "error_code": "no_products_found",
  "status_code": 400
}
```