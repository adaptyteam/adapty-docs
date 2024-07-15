---
title: "Generate In-App Purchase Key in App Store Connect"
description: "Optimize in-app purchase transactions and enhance security by generating an In-App Purchase Key in App Store Connect, facilitating secure communication with Apple's servers. Learn how to streamline the validation process for app purchases and align with Apple's focus on improving security measures"
metadataTitle: "App Store Connect: Generating In-App Purchase Key"
---

The **In-App Purchase Key** is a specialized API key created within App Store Connect to validate the purchases by confirming their authenticity.

:::note
To generate API keys for the App Store Server API, you you must hold either an Admin role or an Account Holder role in App Store Connect. You can also read about how to generate API Keys in the [Apple Developer Documentation](https://developer.apple.com/documentation/appstoreserverapi/creating_api_keys_to_use_with_the_app_store_server_api).
:::

1. Open **App Store Connect**. Proceed to [**Users and Access** → **Integrations** → **In-App Purchase**](https://appstoreconnect.apple.com/access/integrations/api/subs) section.

2. Then click the add button **(+)** next to the **Active** title.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/6d737db-generate_in-app_key.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>




3. In the opened **Generate In-App Purchase Key** window, enter the name of the key for your future reference. It will not be used in Adapty.

4. Click the **Generate** button. Once the **Generate in-App Purchase Key** window closes, you'll see the created key in the **Active** list.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/fac066b-download_inapp_file.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




5. Once you've generated your API key, click the **Download In-App Purchase Key** button to obtain the key as a file.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/d59faff-download_in-app_purchase_key.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




6. In the **Download in-App Purchase Key** window, click the **Download** button. The file is saved to your computer.  
   It's crucial to keep this file secure for future uploading to the Adapty Dashboard. Note that the generated file can only be downloaded once, so ensure safe storage until you upload it. The generated .p8 key from the **In-App Purchase section** can be used for both the  [In-app purchase API](https://docs.adapty.io/docs/in-app-purchase-api-storekit-2) and [promotional offers](https://docs.adapty.io/docs/app-store-promotional-offers).