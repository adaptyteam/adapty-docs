---
no_index: true 
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

1. Open [App Store Connect](https://appstoreconnect.apple.com/apps). Select your app and proceed to **General** → **App Information** section.

2. Copy the **Bundle ID** in the **General Information** sub-section.

   

<Zoom>
  <img src={require('@site/versioned_docs/version-3.0/img/afd5012-bundle_id_apple.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Open the [**App settings** -> **iOS SDK** tab](https://app.adapty.io/settings/ios-sdk) from the Adapty top menu.

   

<Zoom>
  <img src={require('@site/versioned_docs/version-3.0/img/26f79d5-App_settings_top_menu.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. Paste the copied value to the **Bundle ID** field.

   

<Zoom>
  <img src={require('@site/versioned_docs/version-3.0/img/2d64163-bundle_id.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
