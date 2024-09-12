---
title: "Apple In-App Purchase API (StoreKit 2)"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

For Adapty to securely validate in-app purchases in your app, and authenticate and validate subscription requests with Apple, you need to upload an in-app purchase key and provide the Issuer ID and Key ID.

## 1\. Generate the API key

:::note
To generate API keys for the App Store Server API, you need to have either an Admin role or Account Holder role in App Store Connect. Read more about how to generate API Keys [here](https://developer.apple.com/documentation/appstoreserverapi/creating_api_keys_to_use_with_the_app_store_server_api).
:::

1. Open **App Store Connect**. Proceed to [**Users and Access** → **Integrations** → **In-App Purchase**](https://appstoreconnect.apple.com/access/integrations/api/subs) section.
2. Then click the **Plus (+)** button next to the **Active** title. The **Generate in-App Purchase Key** window will open.


<Zoom>
  <img src={require('./img/14687cb-generate_in-app_key.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. Enter the name of the key for your future reference (this name is not used in Adapty).
4. Click the **Generate** button. Once the **Generate in-App Purchase Key** window closes, you'll see the created key in the **Active** list.

   
<Zoom>
  <img src={require('./img/3190ad5-integration_done.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



5. After generating your API key, click the **Download In-App Purchase Key** button to get the key as a file.  
   Keep this file safe to later upload it to Adapty. Please keep in mind that the generated file can be downloaded only once, so store it safely until you upload it to Adapty. The generated .p8 key from the **In-App Purchase** section can be used for both  [In-app purchase API](in-app-purchase-api-storekit-2) and [promotional offers](app-store-promotional-offers).
6. Copy the values of **Issuer ID** and **Key ID** fields from this screen as well. Later you will use them in Adapty.

## 2\. Add the generated API key to Adapty

After completing the necessary setup steps in App Store Connect, the next step is to upload the In-App Purchase Key to Adapty:

1. Open [**App settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk) in your Adapty dashboard. 
2. Scroll down to the **In-App Purchase API (StoreKit 2**) section. 
3. Fill out the **Issuer ID** and the  **Key ID ** with the corresponding field values copied from your [App Store Connect](in-app-purchase-api-storekit-2#1-generate-the-api-key). Please note that the fields will only be active after the app's **Bundle ID** is provided, as the in-app purchase key is specific to each app bundle.

   
<Zoom>
  <img src={require('./img/8b6c5b3-iOS.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



4. Upload the **In-App Purchase Key** file in .p8 format you've downloaded from App Store Connect to the** Private Key (.p8 file)** field.

After completing these steps, you're all set! 

If you are currently using StoreKit 1 notifications and you are now configuring StoreKit 2, it is recommended that you switch to V2 notifications on the App Store Connect side as well. You can read more about it in [App Store server notifications](app-store-server-notifications).