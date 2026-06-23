Yêu cầu thất bại do hồ sơ người dùng trong yêu cầu không khớp với mức độ truy cập đã chỉ định. Hãy kiểm tra lại ID hồ sơ người dùng trong header và ID mức độ truy cập trong body, đồng thời đảm bảo không có lỗi đánh máy nào.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `non_field_errors`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Luôn là `profile_paid_access_level_does_not_exist`. |
| status_code | Integer | HTTP status. Luôn là `400`.                                   |

#### Ví dụ phản hồi

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile `478b2e7f-d557-4b8b-9c5f-cbd46fc2dee2` has no `premium` access level"
      ]
    }
  ],
  "error_code": "profile_paid_access_level_does_not_exist",
  "status_code": 400
}
```