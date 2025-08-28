---
title: "Add promo offers & trials to Adapty"
description: "Create and manage special subscription offers using Adapty’s tools."
metadataTitle: "Creating Special Offers | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty allows you to offer trials or discounts to new, existing, or churned subscribers.

After you have set them up in App Store Connect or Google Play Console, you need to add them to Adapty in two steps:

1. [Create offers in Adapty using the offer IDs from stores.](#1-create-offer)
2. [Add offers to paywalls.](#2-add-offer-to-paywall)

:::warning
Introductory offers from the App Store are applied automatically if the user is eligible. Do not create them in Adapty. You only need to follow this guide if you are working with promotional or win-back offers from App Store and any offers from Play Store.
:::

## 0. Before you start

Before you start setting up offers in Adapty

## 1. Create offer

Once your promotional offer (for both the Play Store and App Store) or Win-back offer (for the App Store) is set up in the app stores, adding it to Adapty is simple:

1. Open [**Products**](https://app.adapty.io/products) from the main menu in Adapty.

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

## 2. Add offer to paywall

To make an offer visible and selectable within a [paywall](paywalls) for your app's users, follow these steps:

While [configuring the products on a paywall](create-paywall), choose an offer you [created earlier](create-offer) for this product from the **Offer** list. The list is available only for the products that have offers.

:::info
You can't add offers to paywalls in the **live** status. If you want to add an offer to an existing paywall, [duplicate](duplicate-paywalls.md) it and configure products in a new paywall, but don't forget to add it to [placements](edit-placement.md) where it must be used. 
:::


<Zoom>
  <img src={require('./img/3a727c2-add_offer_to_paywall.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Paywall builder

:::info
Paywalls created with the Adapty Paywall Builder will display only the first phase of a [multi-phase Google subscription offer](https://support.google.com/googleplay/android-developer/answer/12154973). However, rest assured that when a user purchases the product, all offer phases will be applied as configured in Google Play.
:::