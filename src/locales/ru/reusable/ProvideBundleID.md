---
no_index: true 
---

1. Откройте [App Store Connect](https://appstoreconnect.apple.com/apps). Выберите своё приложение и перейдите в раздел **General** → **App Information**.

2. Скопируйте **Bundle ID** в подразделе **General Information**.

   Копируйте только идентификатор — в формате reverse-DNS, без пробелов, например `com.company.app`. App Store Connect отображает рядом с ним название приложения в других разделах, например в списке приложений; если вставить его вместо идентификатора, проверка подключения завершится с ошибкой.

   

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




3. Откройте вкладку [**App settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk) в верхнем меню Adapty и вставьте скопированное значение в поле **Bundle ID**.

   

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

4. Вернитесь на страницу **App information** в App Store Connect и скопируйте оттуда **Apple ID**.
5. На странице [**App settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk) в дашборде Adapty вставьте ID в поле **Apple app ID**.