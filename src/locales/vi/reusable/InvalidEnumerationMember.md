Yêu cầu thất bại vì giá trị của trường `status` không hợp lệ. Vui lòng kiểm tra lại lỗi đánh máy. Các giá trị có thể sử dụng là `organic`, `non_organic`, và `unknown`.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `status`.</li><li> **errors**: Mô tả lỗi. Trong trường hợp này là `value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'`</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Ở đây: `enum`.                            |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ phản hồi

```json showLineNumbers
{
    "errors": [
        {
            "source": "status",
            "errors": [
                "value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'"
            ]
        }
    ],
    "error_code": "enum",
    "status_code": 400
}
```