---
title: "Create offer"
description: "Learn how to use Google Play and App Store offers to attract and keep users engaged in Adapty"
metadataTitle: "How to create offers in Adapty"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty allows you to offer discounted pricing to existing or churned subscribers. To use this feature, you need to first [create the offer in App Store Connect](app-store-offers) and/or [create the offer in Play Console](google-play-offers). 

:::note

Introductory offers on iOS are applied automatically if the user is eligible. Do not create them in Adapty.
:::

Once your promotional offer (for both the Play Store and App Store) or Win-back offer (for the App Store) is set up in the app stores, adding it to Adapty is simple:

1. Open the [**Paywalls and Products**](https://app.adapty.io/products) section from the main menu in Adapty, then select the **Products** tab.

   

<Zoom>
  <img src={require('./img/6b9e928-edit_product.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Find the product you want to add an offer to. In the **Actions** column, click the **3-dot** button next to the product and select **Edit**.
3. In the **Edit product** window that opens, click **Add Offer** in the **Offers** tab.  

   

<Zoom>
  <img src={require('./img/b0e04fe-add_offer.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



4. Then enter the offer details for the product.

   Here are the fields for the offer:

   - **Offer name**: Give the offer a name to help identify it in Adapty. Use any name that’s convenient for you.
   - **App Store Offer type**: Select the type of App Store offer you’re adding: Promotional or Win-back. (Introductory offers don’t need to be added—they apply automatically if available.)
   - **App Store Offer ID**: This is the unique ID for the offer [that you set in the App Store](app-store-products).
   - **Play Store Offer ID**: Similarly, this is the unique ID for the offer [that you set in the Play Store](android-products).
5. (optional) Add more offers if needed by clicking **Add offer**.
6. Click **Save** to add the offers to the product.