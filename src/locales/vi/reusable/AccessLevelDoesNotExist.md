Yêu cầu thất bại do không tìm thấy mức độ truy cập trong yêu cầu. Hãy kiểm tra lại xem `access_level_id` có bị nhập sai không và liệu nó có khớp với đúng ứng dụng không.

#### Body

| Tham số     | Loại    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `non_field_errors`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Giá trị có thể có: `paid_access_level_does_not_exist`. |
| status_code | Integer | HTTP status. Luôn là `404`.                                  |

#### Ví dụ phản hồi

Không tìm thấy mức độ truy cập.

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paid access level `premium` does not exist"
      ]
    }
  ],
  "error_code": "paid_access_level_does_not_exist",
  "status_code": 400
}
```