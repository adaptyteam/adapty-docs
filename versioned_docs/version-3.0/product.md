---
title: "Products"
description: "Explore Adapty's product settings to configure and optimize in-app purchases and subscriptions."
metadataTitle: "Product Configuration Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';
import CustomDocCardList from '@site/src/components/CustomDocCardList';
import ZoomImage from '@site/src/components/ZoomImage';

<CustomDocCardList ids={['create-product', 'edit-product', 'add-product-to-paywall']} />

<ZoomImage id="product.webp" />

In Adapty, products are everything you sell in your app — subscriptions, consumables, non-consumables, lifetime unlocks, coins, credits, or any other purchasable content.

With Adapty, you don’t need to create and maintain separate products for each platform. One product in Adapty works across all stores and payment platforms, so you can unify your in-app offering and avoid duplication.

Products connect to your monetization flow step by step:

- A **product** is added to a **[paywall](paywalls.md)** — that’s how you decide what to offer and how to present it.

- A **paywall** is added to a **[placement](placements.md)** — that’s how you control where and when users see it.

- A **placement** can target different **[audiences](audience.md)** — that’s how you customize paywalls, run experiments, and optimize performance across user groups.

:::note
Checklist to successfully display products in your mobile app

1. [Create products in the Adapty Dashboard](create-product).
2. [Create a paywall in the Adapty Dashboard and add products to it](create-paywall)
3. Show paywalls using the placements they belong to in your mobile app:
   - [iOS](ios-quickstart-paywalls.md)
   - [Android](android-quickstart-paywalls.md)
   - [React Native](react-native-quickstart-paywalls.md)
   - [Flutter](flutter-quickstart-paywalls.md)
   - [Unity](unity-quickstart-paywalls.md)
:::

After you create products in the Adapty Dashboard, they are visible in the  **[Products](https://app.adapty.io/products)** section.


<Zoom>
  <img src={require('./img/poducts-list.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


