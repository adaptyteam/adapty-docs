Yêu cầu thất bại do có lỗi trong một trường.

###### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Trường gây ra lỗi</li><li> **errors**: (list) danh sách các lỗi.</li></ul> |
| error_code  | String  | Tên lỗi rút gọn.                                             |
| status_code | Integer | HTTP status, luôn là `400`.                                  |

###### Ví dụ phản hồi

```json showLineNumbers
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "string",
  "status_code": 0
}
```