---
title: "Products"
description: "Explore Adapty's product settings to configure and optimize in-app purchases and subscriptions."
metadataTitle: "Product Configuration Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A Product is any item or content that is available for purchase within a mobile application. This can include various digital goods such as virtual items, subscriptions, additional features, or content upgrades that users can buy to enhance their experience within the app. For example, in a gaming app, products might include in-game currency, power-ups, or expansion packs. In a productivity app, products might include premium features or access to exclusive content. These products are managed and sold through the in-app purchase system provided by the platform (e.g., Apple App Store or Google Play Store).

In Adapty you can combine similar products that you have in App Store and Play Store in a single internal product. This allows you to use a single Adapty product across all platforms, instead of using each vendor's products.

Make sure you've [done the initial configuration](quickstart) without skipping a single step and [created the products in the App Store](app-store-products) and/or [created products in Google Play](android-products) before adding them in the Adapty Dashboard.

:::note
Checklist to successfully display products in your mobile app

1. [Create products in the Adapty Dashboard](create-product).
2. [Create a paywall in the Adapty Dashboard and add products to it](create-paywall)
3. [Show paywalls using the placements they belong to in your mobile app](display-pb-paywalls).
:::

After you create products in the Adapty Dashboard, they are visible in the  **Products** tab of the **[Paywalls and Products](https://app.adapty.io/products)** section.


<Zoom>
  <img src={require('./img/a26de79-Products_list.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


