Yêu cầu thất bại vì không tìm thấy `variation_ID` cho paywall được yêu cầu. Hãy kiểm tra xem `placement_id` bạn đang yêu cầu có tồn tại trong ứng dụng không và không có lỗi đánh máy nào trong yêu cầu của bạn.

#### Body

| Tham số     | Kiểu    | Mô tả                                                        |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Luôn là `bull`.</li><li> **errors**: Mô tả lỗi. </li></ul> |
| error_code  | String  | Tên lỗi rút gọn. Giá trị có thể có: `VARIATION_DOES_NOT_EXIST_ERROR`. |
| status_code | Integer | HTTP status. Luôn là `404`.                                  |

#### Ví dụ response

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Variation for example_onboarding does not exist."
            ]
        }
    ],
    "error_code": "VARIATION_DOES_NOT_EXIST_ERROR",
    "status_code": 404
}
```