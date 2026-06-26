Trong trường hợp các gói đăng ký gia hạn liên tục, một chuỗi giao dịch sẽ được tạo ra. Giao dịch gốc là giao dịch đầu tiên trong chuỗi này và toàn bộ chuỗi được liên kết qua đó. Các giao dịch còn lại trong chuỗi là các lần gia hạn. Nếu giao dịch là lần mua đầu tiên trong chuỗi gói đăng ký, nó có thể là giao dịch gốc của chính nó.

Trường hợp khác là sản phẩm mua một lần. Loại này không bao giờ tạo chuỗi vì không thể có gia hạn. Với loại này, `store_transaction_id` luôn giống với `store_original_transaction_id`.

Yêu cầu của bạn thất bại vì giá trị `store_transaction_id` trong đối tượng [Sản phẩm mua một lần](server-side-api-objects#one-time-purchase) khác với `store_original_transaction_id` của nó. Để khắc phục, hãy đặt chúng bằng nhau, hoặc thay đổi đối tượng — dùng [Subscription](server-side-api-objects#subscription) thay vì [Sản phẩm mua một lần](server-side-api-objects#one-time-purchase).

#### Body \{#body\}

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `store_transaction_id`</li><li> **errors**: Mô tả lỗi.</li></ul> |
| error_code  | String  | Tên lỗi ngắn gọn. Luôn là `store_transaction_id_error`.       |
| status_code | Integer | HTTP status. Luôn là `400.`                                   |

#### Ví dụ phản hồi \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "store_transaction_id",
      "errors": [
        "store_transaction_id must be equal to store_original_transaction_id for purchase."
      ]
    }
  ],
  "error_code": "store_transaction_id_error",
  "status_code": 400
}
```