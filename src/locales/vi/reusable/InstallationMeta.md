| Tham số            | Kiểu   | Bắt buộc | Nullable | Mô tả                                                        |
| :----------------- | :----- | -------- | -------- | :----------------------------------------------------------- |
| device_id          | String | Có       | Không    | Mã định danh thiết bị được tạo ở phía client.                |
| device             | String | Không    | Có       | Tên model thiết bị hiển thị cho người dùng cuối.             |
| locale             | String | Không    | Có       | Ngôn ngữ/vùng mà người dùng cuối đang sử dụng.              |
| os                 | String | Không    | Có       | Hệ điều hành của người dùng cuối.                            |
| platform           | String | Không    | Có       | Nền tảng thiết bị của người dùng cuối.                       |
| timezone           | String | Không    | Có       | Múi giờ của người dùng cuối.                                 |
| user_agent         | String | Không    | Có       | Thông tin chi tiết về môi trường của người dùng cuối: thiết bị, hệ điều hành và trình duyệt mà người dùng cuối đang dùng để tương tác với ứng dụng của bạn. |
| idfa               | String | Không    | Có       | Identifier for Advertisers, do Apple gán cho thiết bị của người dùng. |
| idfv               | String | Không    | Có       | Identifier for Vendors (IDFV) là mã được gán cho tất cả ứng dụng của cùng một nhà phát triển và được chia sẻ trên tất cả ứng dụng của nhà phát triển đó trên thiết bị của bạn. |
| advertising_id     | String | Không    | Có       | Advertising ID là mã định danh duy nhất do hệ điều hành Android cung cấp, cho phép các nhà quảng cáo nhận diện bạn một cách duy nhất. |
| android_id         | String | Không    | Có       | Trên Android 8.0 (API level 26) trở lên, đây là một số 64-bit (biểu diễn dưới dạng chuỗi thập lục phân), duy nhất cho mỗi tổ hợp khóa ký ứng dụng, người dùng và thiết bị. Xem thêm tại [tài liệu dành cho nhà phát triển Android](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| android_app_set_id | String | Không    | Có       | Một [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) — ID duy nhất theo thiết bị, theo tài khoản nhà phát triển, có thể đặt lại theo người dùng, dành cho các trường hợp quảng cáo không liên quan đến kiếm tiền. |