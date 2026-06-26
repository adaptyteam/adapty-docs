Yêu cầu thất bại vì định dạng của trường `visited_at` không hợp lệ. Hãy sử dụng định dạng **ngày ISO 8601**, ví dụ: `2025-01-14T14:15:22Z`.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `visited_at`.</li><li> **errors**: Mô tả lỗi. </li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Ở đây: `base_error`.                      |
| status_code | Integer | Mã trạng thái HTTP. Luôn là `400`.                           |

#### Ví dụ response

```json showLineNumbers
{
    "errors": [
        {
            "source": "visited_at",
            "errors": [
                "invalid datetime format"
            ]
        }
    ],
    "error_code": "datetime",
    "status_code": 400
}
```