<p> </p>

Yêu cầu thất bại vì không tìm thấy hồ sơ người dùng trong header của yêu cầu. Hãy kiểm tra lại xem có lỗi đánh máy nào trong `profile_id` hoặc `customer_user_id` bạn đã nhập vào header hay không, và đảm bảo rằng đó là thông tin của đúng ứng dụng.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `non_field_errors`</li><li> **errors**: Mô tả lỗi. </li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Giá trị có thể có: `profile_does_not_exist`.  |
| status_code | Integer | HTTP status. Luôn là `400`.                                   |

#### Ví dụ phản hồi

Không tìm thấy hồ sơ người dùng

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile not found"
      ]
    }
  ],
  "error_code": "profile_does_not_exist",
  "status_code": 400
}
```

 