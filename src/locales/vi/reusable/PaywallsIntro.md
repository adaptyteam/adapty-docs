Để có thể thực hiện bất kỳ loại in-app purchase nào, bạn cần hiểu cách Adapty cấu trúc các giao dịch mua:

- **Sản phẩm** là bất kỳ thứ gì có thể mua – gói đăng ký, consumable, hoặc quyền truy cập trọn đời.
- **Paywall** là các cấu hình xác định sản phẩm nào sẽ được cung cấp. Trong Adapty, paywall là cách duy nhất để lấy sản phẩm, nhưng thiết kế này cho phép bạn thay đổi các ưu đãi, giá cả và tổ hợp sản phẩm mà không cần chỉnh sửa code của ứng dụng.

Hướng dẫn này sẽ giúp bạn hiển thị một paywall được tạo trong Adapty Paywall Builder trong ứng dụng của mình:

1. **Lấy paywall**: Lấy paywall từ Adapty.
2. **Hiển thị paywall và để Adapty xử lý các giao dịch mua**: Hiển thị container paywall bạn đã lấy được trong ứng dụng.
3. **Xử lý các hành động của nút**: Liên kết các tương tác của người dùng với paywall với phản hồi của ứng dụng đối với chúng. Ví dụ: mở liên kết hoặc đóng paywall khi người dùng nhấn các nút.