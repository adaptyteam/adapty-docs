<p> </p>

Yêu cầu thất bại do thiếu hoặc sai thông tin xác thực. Xem trang [Xác thực](ss-authorization), đặc biệt chú ý đến **Authorization header**.

Yêu cầu cũng thất bại vì không tìm thấy hồ sơ người dùng được chỉ định.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `non_field_errors`.</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `not_authenticated`.               |
| status_code | Integer | HTTP status. Luôn là `401.`                                  |

#### Ví dụ phản hồi

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Authentication credentials were not provided."
      ]
    }
  ],
  "error_code": "not_authenticated",
  "status_code": 401
}
```