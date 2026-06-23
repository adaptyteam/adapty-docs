| Parameter                     | Type          | Required | Nullable | Description                                                  |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type                 | String        | Yes      | No       | Loại sản phẩm được mua. Giá trị có thể có: `subscription`. |
| store                         | String        | Yes      | No       | Cửa hàng nơi sản phẩm được mua. Các tùy chọn bao gồm `app_store`, `play_store`, `stripe`, hoặc Store ID của [cửa hàng tùy chỉnh](custom-store) của bạn. |
| environment                   | String        | No       | No       | Môi trường nơi giao dịch diễn ra. Các tùy chọn là `Sandbox` hoặc `Production`. Mặc định sử dụng `Production`. |
| store_product_id              | String        | Yes      | No       | ID của sản phẩm trên cửa hàng ứng dụng (App Store, Google Play, Stripe, v.v.) đã mở khóa mức độ truy cập này. |
| store_transaction_id          | String        | Yes      | No       | ID giao dịch trên cửa hàng ứng dụng (App Store, Google Play, Stripe, v.v.). |
| store_original_transaction_id | String        | Yes      | No       | <p>Đối với các gói đăng ký, ID này liên kết đến giao dịch đầu tiên trong chuỗi gia hạn. Mỗi lần gia hạn đều được kết nối với giao dịch gốc này.</p><p>Nếu không có gia hạn, `store_original_transaction_id` sẽ khớp với `store_transaction_id`.</p> |
| offer                         | Object        | No       | Yes      | Ưu đãi được sử dụng trong lần mua hàng, được cung cấp dưới dạng đối tượng [Offer](server-side-api-objects#offer). |
| is_family_shared              | Boolean       | No       | No       | Giá trị Boolean cho biết sản phẩm có hỗ trợ chia sẻ gia đình trong App Store Connect hay không. Chỉ dành cho iOS. Luôn là `false` đối với iOS dưới 14.0 và macOS dưới 11.0. Mặc định là `false`. |
| price                         | Object        | Yes      | No       | Giá của gói đăng ký hoặc sản phẩm mua hàng dưới dạng đối tượng [Price](server-side-api-objects#price). Lần mua gói đăng ký ban đầu với chi phí bằng không là dùng thử miễn phí; gia hạn với chi phí bằng không là gia hạn miễn phí. |
| purchased_at                  | ISO 8601 date | Yes      | No       | Ngày giờ mua mức độ truy cập gần nhất.       |
| refunded_at                   | ISO 8601 date | No       | No       | Ngày giờ gói đăng ký được hoàn tiền, nếu có. |
| cancellation_reason           | String        | No       | No       | Các lý do hủy có thể có bao gồm: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, hoặc `unknown`. |
| variation_id                  | String        | No       | No       | ID biến thể dùng để theo dõi các lần mua hàng đến paywall cụ thể mà chúng được thực hiện từ đó. |
| originally_purchased_at       | ISO 8601 date | Yes      | No       | Đối với chuỗi gói đăng ký, đây là ngày mua của giao dịch gốc, được liên kết bởi `store_original_transaction_id`. |
| expires_at                    | ISO 8601 date | Yes      | No       | Ngày giờ mức độ truy cập hết hạn. Có thể là trong quá khứ và `null` đối với quyền truy cập trọn đời. |
| renew_status                  | Boolean       | Yes      | No       | Cho biết tính năng tự động gia hạn có được bật cho gói đăng ký hay không.   |
| renew_status_changed_at       | ISO 8601 date | No       | No       | Ngày giờ tính năng tự động gia hạn được bật hoặc tắt. |
| billing_issue_detected_at     | ISO 8601 date | No       | No       | Ngày giờ phát hiện sự cố thanh toán (ví dụ: thẻ bị từ chối). Gói đăng ký vẫn có thể còn hiệu lực. Thông tin này sẽ được xóa nếu thanh toán thành công. |
| grace_period_expires_at       | ISO 8601 date | No       | No       | Ngày giờ [thời gian ân hạn](https://developer.apple.com/news/?id=09122019c) sẽ kết thúc nếu gói đăng ký hiện đang trong thời gian ân hạn. |