---
no_index: true 
---

1. Mở [App Store Connect](https://appstoreconnect.apple.com/apps). Chọn ứng dụng của bạn và điều hướng đến phần **General** → **App Information**.

2. Sao chép **Bundle ID** trong phần phụ **General Information**.

   Chỉ sao chép mã định danh — theo định dạng reverse-DNS, không có khoảng trắng, ví dụ: `com.company.app`. App Store Connect hiển thị tên ứng dụng bên cạnh mã này trong một số giao diện khác, như danh sách ứng dụng; nếu dán tên đó thay vì mã định danh, kết nối sẽ không thể xác thực.

   

<Zoom>
  <img src="/docs/img/afd5012-bundle_id_apple.webp"
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Mở tab [**App settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk) từ menu trên cùng của Adapty và dán giá trị vừa sao chép vào trường **Bundle ID**.

   

<Zoom>
  <img src="/docs/img/2d64163-bundle_id.webp"
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Quay lại trang **App information** trong App Store Connect và sao chép **Apple ID** từ đó.
5. Trên trang [**App settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk) trong Adapty dashboard, dán ID vào trường **Apple app ID**.