---
title: "Apple App Store Promotional Offers"
description: ""
metadataTitle: ""
---

Offers in the App Store are special deals or discounts provided by these platforms for in-app purchases. For example, you can offer a user upfront payment for 6 months with a 40% discount, and after that user will pay the regular subscription price every month. 

For Adapty to process offers from the App Store, you need to do the following:

1. [Create offers in the App Store Connect](app-store-offers) or [create offers in the Google Play Console](google-play-offers)
2. [Create offers in Adapty](create-offer)
3. [Add these offers to a paywall in Adapty](add-offer-to-paywall)
4. (only for iOS apps) Upload a special In-App Purchase Key from App Store Connect to Adapty.

The instructions on how to upload a special In-App Purchase Key from App Store Connect to Adapty are below.

:::note
- Please note that you can use the same key for both In-app purchase API and promotional offers — there's no need to create a new one if you have access to the .p8 file you've previously generated.
- To generate API keys for the App Store Server API, you need to have either an Admin role or an Account Holder role in App Store Connect. You can also read about how to generate API Keys in the [Apple Developer Documentation](https://developer.apple.com/documentation/appstoreserverapi/creating_api_keys_to_use_with_the_app_store_server_api).
:::

1. Open **App Store Connect**. Proceed to [**Users and Access** → **Integrations** → **In-App Purchase**](https://appstoreconnect.apple.com/access/integrations/api/subs) section.
2. Then click the **Plus (+)** button next to the **Active** title. The **Generate in-App Purchase Key** window will open.


<img
  src={require('./img/14687cb-generate_in-app_key.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





3. Enter the name of the key for your future reference (this name is not used in Adapty).

4. Click the **Generate** button. Once the **Generate In-App Purchase Key** window closes, you'll see the created key in the **Active** list.

   
<img
  src={require('./img/258caae-integration_done_for_offers.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




5. After generating your API key, click the **Download In-App Purchase Key** button to get the key as a file.  
   Keep this file safe to later upload it to Adapty. Please keep in mind that the generated file can be downloaded only once, so store it safely until you upload it to Adapty. The generated .p8 key from the **In-App Purchase** section can be used for both  [In-app purchase API](in-app-purchase-api-storekit-2) and [promotional offers](app-store-promotional-offers).

6. Copy the value of the **Key ID** field from this screen as well.

7. Open **App Settings** from Adapty top menu, then open the [iOS SDK](https://app.adapty.io/settings/ios-sdk) tab.

8. Enter the value of the copied **Key ID** field to the **Subscription key ID** field next to the **App Store promotional offers** title.

   
<img
  src={require('./img/675b593-app_store_promotional_offers_in_adapty.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




9. Upload the downloaded In-App Purchase Key file to the **Subscription key (.p8 file)** area .

After configuring the App Store promotional offer, you can create Apple promotional offers for specific products in Adapty if you did not do that yet. For more information, please refer to our [promotional offers documentation.](offers)