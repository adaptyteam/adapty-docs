Yêu cầu thất bại vì tham số `offer_category` có giá trị khác `introductory` hoặc `offer_type` nhưng không bao gồm `offer_id`. Trong trường hợp này, hãy cung cấp `offer_id` hoặc xóa `offer_category` hay `offer_type` khỏi yêu cầu.

Một nguyên nhân khác có thể là tham số `offer_id` đã được thêm vào nhưng để là `null`, trong khi tham số này không được phép là null. Nếu vậy, hãy thêm giá trị cho `offer_id` hoặc xóa hoàn toàn tham số này.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `offer.category`</li><li> **errors**: Mô tả lỗi. </li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Giá trị có thể có: `missing_offer_id`.    |
| status_code | Integer | HTTP status. Luôn là `400`.                                  |

#### Ví dụ phản hồi

Không tìm thấy hồ sơ người dùng

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_category",
      "errors": [
        "offer_id must be specified for all offer types except 'introductory'."
      ]
    }
  ],
  "error_code": "missing_offer_id",
  "status_code": 400
}
```