Yêu cầu thất bại vì tham số `is_family_shared` được đặt thành `true`, nghĩa là mức độ truy cập được chia sẻ miễn phí với thành viên gia đình. Tuy nhiên, tham số `value` của đối tượng [Price](server-side-api-objects#price) chưa được đặt về 0.

Nếu `is_family_shared` cần là `true`, hãy đảm bảo đặt tham số `value` của đối tượng [Price](server-side-api-objects#price) thành `0`.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `is_family_shared`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là: `family_share_price_error`.       |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ phản hồi

Không tìm thấy hồ sơ người dùng

```json showLineNumbers
{
  "errors": [
    {
      "source": "is_family_shared",
      "errors": [
        "If is_family_shared is true, price.value must be 0."
      ]
    }
  ],
  "error_code": "family_share_price_error",
  "status_code": 400
}
```