Yêu cầu thất bại vì một trong hai lý do: thông tin xác thực Paddle trong [App Settings](https://app.adapty.io/settings/paddle) không chính xác, hoặc token được cung cấp không hợp lệ. Vui lòng kiểm tra những điều sau:

1. **Paddle API Key** trong [App Settings](https://app.adapty.io/settings/paddle) phải chính xác và thuộc đúng ứng dụng.
2. `paddle_token` bạn đang sử dụng phải tồn tại trong ứng dụng và không có lỗi đánh máy trong yêu cầu của bạn.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `non_field_errors`.</li><li> **errors**: Mô tả lỗi. </li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Giá trị có thể có: `invalid_paddle_credentials_or_purchase_not_found`. |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ response

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Invalid Paddle credentials or purchase not found"
      ]
    }
  ],
  "error_code": "invalid_paddle_credentials_or_purchase_not_found",
  "status_code": 400
}
```