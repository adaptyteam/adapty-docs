| Tên             | Bắt buộc | Mô tả                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| store            | true     | Cửa hàng ứng dụng                                                |
| locale           | False    | Mã định danh ngôn ngữ của paywall. Tham số này là mã ngôn ngữ gồm một hoặc nhiều thẻ con phân tách bằng ký tự "-". Thẻ con đầu tiên là ngôn ngữ, thẻ con thứ hai là khu vực (hỗ trợ khu vực sẽ được thêm sau). Ví dụ: `en` là tiếng Anh, `en-US` là tiếng Anh Mỹ. Paywall sẽ được tạo theo ngôn ngữ mặc định nếu tham số này bị bỏ qua. |
| placement_id     | true     | Mã định danh của [Placement](placements). Đây là giá trị bạn đã chỉ định khi tạo placement trong Adapty Dashboard. |
| customer_user_id | true*    | Mã định danh người dùng trong hệ thống của bạn. Cần có `customer_user_id` hoặc `profile_id`. |
| profile_id       | true*    | Mã định danh người dùng trong Adapty. Cần có `customer_user_id` hoặc `profile_id`. |

**Ví dụ**

```
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}
```