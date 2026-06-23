Phản hồi này có nghĩa là yêu cầu của bạn không phải là JSON hợp lệ hoặc thiếu một số trường. Hãy sửa JSON cho hợp lệ và bổ sung tham số còn thiếu.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Với JSON không hợp lệ, giá trị sẽ là `null`.</li><li> **errors**: Mô tả lỗi. </li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Ở đây: `parse_error`.                      |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ phản hồi

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting ',' delimiter: line 4 column 3 (char 67)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```