---
title: "Offers in App Store"
description: "Set up and manage App Store offers to increase user retention."
metadataTitle: "Managing App Store Offers | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Offers in the App Store are special deals or discounts provided by these platforms for in-app purchases. Developers use offers to provide users with exciting promotions, like discounted prices, free trials, or bundled offers. These promotions help attract and keep users engaged, making the app experience more rewarding. By using these special incentives, developers can boost user interest and loyalty, contributing to the overall success of their apps.

With iOS 13 Apple released [Promotional offers](https://developer.apple.com/documentation/storekit/in-app_purchase/subscriptions_and_offers/implementing_promotional_offers_in_your_app) as a way to promote your users to subscribe. Adapty supports Subscription offers.

:::note
To use promotional offers, you have to [upload subscription key](app-store-connection-configuration#step-3-upload-in-app-purchase-key-file) to Adapty dashboard, so Adapty can sign the offers.
:::

<Zoom>
  <img src={require('./img/646799a-CleanShot_2023-07-25_at_15.14.112x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Please also consider that introductory offers on iOS are applied automatically if the user is eligible.

To include a promotional offer or free trial for your product, navigate to the promotional offers tab after setting up the pricing. You will find a **+ icon** next to promotional offers, and click on it to begin the setup.

In the subsequent modal, you'll encounter various configuration screens:

1. **Promotional offer reference name and promotional offer identifier**: This will configure the name and ID of the offer.
2. **Type of promotional offer**: You'll be able to choose the type of promotional offer from Pay as you go, Pay up front, and Free options. Then choose the desired Duration from the dropdown for the selected option.
3. **Prices for the offer for each country**
