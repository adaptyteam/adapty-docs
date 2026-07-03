Yêu cầu thất bại vì **Paddle API Key** trong [App Settings](https://app.adapty.io/settings/paddle) không chính xác. Vui lòng kiểm tra lại và đảm bảo rằng nó đúng và được liên kết với đúng ứng dụng.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `non_field_errors`.</li><li> **errors**: Mô tả lỗi. </li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Giá trị có thể có: `paddle_api_key_not_found`. |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ response

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paddle API key not found"
      ]
    }
  ],
  "error_code": "paddle_api_key_not_found",
  "status_code": 400
}
```