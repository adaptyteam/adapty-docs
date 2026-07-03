Yêu cầu thất bại vì tham số `offer_type` được đặt thành `free_trial`, nhưng tham số `value` của đối tượng [Price](server-side-api-objects#price) không được đặt về zero.

Một nguyên nhân khác có thể là tham số `offer_id` được thêm vào nhưng để giá trị `null`, trong khi tham số này không được phép null. Trong trường hợp này, hãy cung cấp giá trị cho `offer_id` hoặc xóa hoàn toàn tham số này.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `offer.type`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là: `free_trial_price_error`.        |
| status_code | Integer | Mã trạng thái HTTP. Luôn là `400`.                           |

#### Ví dụ phản hồi

Không tìm thấy hồ sơ người dùng

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_type",
      "errors": [
        "If offer_type is 'free_trial', price.value must be 0."
      ]
    }
  ],
  "error_code": "free_trial_price_error",
  "status_code": 400
}
```