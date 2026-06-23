| Tham số | Kiểu | Bắt buộc | Nullable | Mô tả |
| :----------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| first_name | String | Không | Có | Tên của người dùng cuối. |
| last_name | String | Không | Có | Họ của người dùng cuối. |
| gender | String | Không | Có | Giới tính của người dùng cuối. |
| email | String | Không | Có | Email của người dùng cuối. |
| phone_number | String | Không | Có | Số điện thoại của người dùng cuối. |
| birthday | ISO 8601 date | Không | Không | Ngày sinh của người dùng cuối. |
| ip_country | String | Không | Không | Quốc gia của người dùng cuối theo định dạng ISO 3166-2. Cần truyền vào nếu request được thực hiện từ server chứ không phải từ client, nhằm xác định quốc gia hiện tại. Nếu không, chúng tôi sẽ xác định quốc gia dựa trên địa chỉ IP của request. |
| store_country | String | Không | Có | Quốc gia của cửa hàng ứng dụng mà người dùng cuối đang dùng. |
| store | String | Không | Có | Nền tảng người dùng sử dụng để mua hàng trong ứng dụng của bạn. Các giá trị có thể có: `app_store`, `play_store`, hoặc `stripe`. |
| analytics_disabled | Boolean | Không | Không | <p>Tùy chọn tắt analytics bên ngoài. Khi analytics bị tắt, các sự kiện sẽ không được gửi đến các integration, và các trường `idfa`, `idfv`, và `advertising_id` sẽ trở thành nullable.</p><p>BẬT: Analytics bên ngoài bị tắt cho người dùng này.</p><p>TẮT: Analytics được bật theo mặc định.</p> |
| custom_attributes | Array | Không | Không | <p>Cho phép thiết lập tối đa 30 thuộc tính tùy chỉnh cho hồ sơ người dùng. Nếu bạn sử dụng mảng `custom_attributes`, cần có ít nhất một cặp key và value.</p><p>**Key:** Phải là chuỗi không quá 30 ký tự, chỉ sử dụng chữ cái, số, dấu gạch ngang, dấu chấm và dấu gạch dưới.</p><p>**Value:** Phải là chuỗi hoặc số thực không quá 30 ký tự. Boolean và số nguyên sẽ được chuyển đổi thành số thực. Để xóa một thuộc tính, hãy gửi giá trị rỗng hoặc `null`.</p> |
| installation_meta | Object | Không | Không | Chứa thông tin về ứng dụng cụ thể trên một thiết bị cụ thể, được cấu trúc dưới dạng đối tượng [Installation Meta](server-side-api-objects#installation-meta). |