---
no_index: true
---

**Enabled (mặc định)**

Người dùng đã xác định (những người có [Customer User ID](identifying-users#set-customer-user-id-on-configuration)) có thể chia sẻ cùng một [mức độ truy cập](access-level) do Adapty cung cấp nếu thiết bị của họ đăng nhập vào cùng một Apple/Google ID. Điều này hữu ích khi người dùng cài lại ứng dụng và đăng nhập bằng email khác — họ vẫn có thể truy cập vào giao dịch mua trước đó. Với tùy chọn này, nhiều người dùng đã xác định có thể dùng chung một mức độ truy cập.

Dù mức độ truy cập được chia sẻ, tất cả các giao dịch trong quá khứ và tương lai vẫn được ghi lại dưới dạng sự kiện trong Customer User ID gốc để đảm bảo tính nhất quán của dữ liệu phân tích và lưu giữ toàn bộ lịch sử giao dịch — bao gồm thời gian dùng thử, mua gói đăng ký, gia hạn, v.v., đều được liên kết với cùng một hồ sơ người dùng.

**Transfer access to new user**

Người dùng đã xác định vẫn có thể tiếp tục truy cập [mức độ truy cập](access-level) do Adapty cung cấp, ngay cả khi họ đăng nhập bằng [Customer User ID](identifying-users#set-customer-user-id-on-configuration) khác hoặc cài lại ứng dụng, miễn là thiết bị đăng nhập vào cùng một Apple/Google ID.

Khác với tùy chọn trước, Adapty sẽ chuyển giao dịch mua giữa các người dùng đã xác định. Điều này đảm bảo nội dung đã mua vẫn khả dụng, nhưng chỉ một người dùng có thể truy cập tại một thời điểm. Ví dụ: nếu UserA mua gói đăng ký và UserB đăng nhập trên cùng thiết bị đó và khôi phục giao dịch, UserB sẽ được cấp quyền truy cập gói đăng ký đó, còn UserA sẽ bị thu hồi.

Nếu một trong hai người dùng (mới hoặc cũ) chưa được xác định, mức độ truy cập vẫn sẽ được chia sẻ giữa các hồ sơ người dùng đó trong Adapty.

Dù mức độ truy cập được chuyển giao, tất cả các giao dịch trong quá khứ và tương lai vẫn được ghi lại dưới dạng sự kiện trong Customer User ID gốc để đảm bảo tính nhất quán của dữ liệu phân tích và lưu giữ toàn bộ lịch sử giao dịch — bao gồm thời gian dùng thử, mua gói đăng ký, gia hạn, v.v., đều được liên kết với cùng một hồ sơ người dùng.

Sau khi chuyển sang **Transfer access to new user**, mức độ truy cập sẽ không được chuyển ngay lập tức giữa các hồ sơ người dùng. Quá trình chuyển giao cho từng mức độ truy cập cụ thể chỉ được kích hoạt khi Adapty nhận được sự kiện từ cửa hàng, chẳng hạn như gia hạn gói đăng ký, khôi phục, hoặc khi xác thực giao dịch.

**Disabled**

Hồ sơ người dùng đã xác định đầu tiên được cấp mức độ truy cập sẽ giữ nó mãi mãi. Đây là lựa chọn tốt nhất nếu logic nghiệp vụ của bạn yêu cầu giao dịch mua phải được gắn với một Customer User ID duy nhất.

Lưu ý rằng mức độ truy cập vẫn được chia sẻ giữa các người dùng ẩn danh.

Bạn có thể "gỡ liên kết" giao dịch mua bằng cách [xóa hồ sơ người dùng của chủ sở hữu](https://adapty.io/docs/vi/api-adapty/operations/deleteProfile). Sau khi xóa, mức độ truy cập sẽ khả dụng cho hồ sơ người dùng đầu tiên yêu cầu nó, dù là ẩn danh hay đã xác định.

Việc tắt chia sẻ chỉ ảnh hưởng đến người dùng mới. Các gói đăng ký đã được chia sẻ giữa người dùng sẽ tiếp tục được chia sẻ ngay cả sau khi tắt tùy chọn này.

:::warning

Apple và Google yêu cầu in-app purchase phải được chia sẻ hoặc chuyển giao giữa các người dùng vì họ dựa vào Apple/Google ID để liên kết giao dịch mua. Nếu không có chia sẻ, việc khôi phục giao dịch mua có thể không hoạt động sau khi cài lại ứng dụng.

Tắt chia sẻ có thể khiến người dùng không thể lấy lại quyền truy cập sau khi đăng nhập.

Chúng tôi khuyến nghị chỉ tắt chia sẻ nếu người dùng của bạn **bắt buộc phải đăng nhập** trước khi thực hiện giao dịch mua. Nếu không, một người dùng đã xác định có thể mua gói đăng ký, đăng nhập vào tài khoản khác và mất quyền truy cập vĩnh viễn.
:::

### Tôi nên chọn cài đặt nào? \{#which-setting-should-i-choose\}

| Ứng dụng của tôi...                                                    | Tùy chọn nên chọn                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Không có hệ thống đăng nhập và chỉ sử dụng ID hồ sơ người dùng ẩn danh của Adapty. | Dùng tùy chọn mặc định, vì mức độ truy cập luôn được chia sẻ giữa các ID hồ sơ người dùng ẩn danh cho cả ba tùy chọn. |
| Có hệ thống đăng nhập tùy chọn và cho phép khách hàng mua trước khi tạo tài khoản. | Chọn **Transfer access to new user** để đảm bảo những khách hàng mua khi chưa có tài khoản vẫn có thể khôi phục giao dịch sau này. |
| Yêu cầu khách hàng tạo tài khoản trước khi mua, nhưng cho phép giao dịch mua được liên kết với nhiều Customer User ID. | Chọn **Transfer access to new user** để đảm bảo chỉ một Customer User ID có quyền truy cập tại một thời điểm, đồng thời vẫn cho phép người dùng đăng nhập bằng Customer User ID khác mà không mất quyền truy cập đã trả phí. |
| Yêu cầu khách hàng tạo tài khoản trước khi mua, với quy tắc nghiêm ngặt ràng buộc giao dịch mua với một Customer User ID duy nhất. | Chọn **Disabled** để đảm bảo giao dịch không bao giờ được chuyển giao giữa các tài khoản. |