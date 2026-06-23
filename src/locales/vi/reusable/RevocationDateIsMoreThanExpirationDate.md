Yêu cầu thất bại vì `revoke_at` bạn định nghĩa trong yêu cầu muộn hơn tham số `expires_at` của mức độ truy cập hiện tại. Nếu bạn muốn gia hạn mức độ truy cập, hãy sử dụng yêu cầu [Grant access level](https://adapty.io/docs/vi/api-adapty/operations/grantAccessLevel).

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `non_field_errors`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `revocation_date_more_than_expiration_date`. |
| status_code | Integer | HTTP status. Luôn là `400`.                                   |

#### Ví dụ phản hồi

```json showLineNumbers
  {
  "errors": [
    {
      "source": "revoke_at",
      "errors": [
        "Revocation date (2029-08-29 09:33:42+00:00) is more than current expiration date (2028-08-29 09:33:42+00:00)"
      ]
    }
  ],
  "error_code": "revocation_date_more_than_expiration_date",
  "status_code": 400
}
```