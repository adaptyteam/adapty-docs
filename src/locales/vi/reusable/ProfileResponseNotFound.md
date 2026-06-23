<p> </p>
Yêu cầu thất bại vì không tìm thấy hồ sơ người dùng được chỉ định. Hãy kiểm tra lại `customer_user_id` hoặc `profile_id` xem có lỗi đánh máy không.

##### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `null`.</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `profile_does_not_exist`.         |
| status_code | Integer | HTTP status. Luôn là `404`.                                  |

##### Ví dụ response

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Profile not found"
            ]
        }
    ],
    "error_code": "profile_does_not_exist",
    "status_code": 404
}
```