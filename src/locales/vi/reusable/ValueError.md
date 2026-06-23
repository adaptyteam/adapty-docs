Yêu cầu thất bại vì ngày thu hồi được chỉ định đã ở trong quá khứ. Hãy đặt `revoke_at` thành một ngày trong tương lai hoặc `null` để thu hồi quyền truy cập ngay lập tức.

##### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `revoke_at`.</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `value_error`.                    |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

##### Ví dụ Response

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Must be greater than the current time or null"
            ]
        }
    ],
    "error_code": "value_error",
    "status_code": 400
}
```