---
no_index: true 
---

1. 打开 [App Store Connect](https://appstoreconnect.apple.com/apps)。选择您的应用，进入 **General** → **App Information** 页面。

2. 在 **General Information** 子页面中复制 **Bundle ID**。

   只复制标识符——反向 DNS 格式，不含空格，例如 `com.company.app`。App Store Connect 在某些视图（如应用列表）中会在其旁边显示应用名称；如果误将应用名称粘贴进去而非标识符，连接验证将会失败。

   

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




3. 从 Adapty 顶部菜单打开 [**App settings** -> **iOS SDK** 标签页](https://app.adapty.io/settings/ios-sdk)，将复制的值粘贴到 **Bundle ID** 字段中。

   

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

4. 返回 App Store Connect 中的 **App information** 页面，复制其中的 **Apple ID**。
5. 在 Adapty 看板的 [**App settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk) 页面中，将该 ID 粘贴到 **Apple app ID** 字段。