| Tham số | Kiểu | Bắt buộc | Nullable | Mô tả |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type | String | Yes | No | Loại sản phẩm đã mua. Giá trị có thể có: `one_time_purchase`. |
| store | String | Yes | No | Cửa hàng nơi sản phẩm được mua. Giá trị có thể có: `app_store`, `play_store`, `stripe`, hoặc Store ID của [cửa hàng tùy chỉnh](custom-store) của bạn. |
| environment | String | No | No | Môi trường giao dịch cung cấp mức độ truy cập. Các tùy chọn: `Sandbox`, `Production`. Mặc định sử dụng `Production`. |
| store_product_id | String | Yes | No | ID sản phẩm trong app store (App Store, Google Play, Stripe, v.v.) đã mở khóa mức độ truy cập này. |
| store_transaction_id | String | Yes | No | ID giao dịch trong app store (App Store, Google Play, Stripe, v.v.). |
| store_original_transaction_id | String | Yes | No | <p>Đối với các gói đăng ký định kỳ, đây là ID giao dịch gốc liên kết chuỗi các lần gia hạn. Giao dịch gốc là giao dịch đầu tiên trong chuỗi; các giao dịch sau là lần gia hạn.</p><p>Nếu không có gia hạn, `store_original_transaction_id` trùng với `store_transaction_id`.</p> |
| offer | Object | No | Yes | Ưu đãi được sử dụng cho giao dịch mua dưới dạng đối tượng [Offer](server-side-api-objects#offer). |
| is_family_shared | Boolean | No | No | Giá trị Boolean cho biết sản phẩm có hỗ trợ chia sẻ gia đình trong App Store Connect hay không. Chỉ dành cho iOS. Luôn là `false` với iOS dưới 14.0 và macOS dưới 11.0. Mặc định là `false`. |
| price | Object | Yes | No | Giá của sản phẩm mua một lần dưới dạng đối tượng [Price](server-side-api-objects#price). Lần mua gói đăng ký đầu tiên với chi phí bằng không là dùng thử miễn phí; lần gia hạn với chi phí bằng không là gia hạn miễn phí. |
| purchased_at | ISO 8601 date | Yes | No | Thời điểm mức độ truy cập được mua gần nhất. |
| refunded_at | ISO 8601 date | No | No | Nếu được hoàn tiền, hiển thị thời điểm hoàn tiền. |
| cancellation_reason | String | No | No | Các lý do hủy có thể có: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `cancelled_by_developer`, `new_subscription`, `unknown`. |
| variation_id | String | No | No | ID biến thể dùng để theo dõi các giao dịch mua đến paywall cụ thể mà chúng được thực hiện từ đó. |