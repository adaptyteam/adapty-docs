---
title: "Add products"
description: "Add in‑app products or subscriptions to Adapty and link them to your App Store, Google Play, Stripe, Paddle, or custom‑store listings."
metadataTitle: "Add products | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';


Before you can use Adapty’s core features, you need to add each product you sell and link it to every store or payment platform you support. This setup allows you to deliver products to users’ devices and track them in analytics later.

In Adapty, anything your app sells is a **product**.  If the same item exists in the App Store, Google Play, or Stripe, you can group them into a single product in Adapty. Set it up once and manage it across all platforms from one place.

Let’s add your first product.

## Add your first product

:::tip
This quickstart covers the basics you need to create a product. For more details, see the guide on [creating products](create-product.md).
:::

Let's say you want to add a monthly subscription as a product.

1. Go to [Products](https://app.adapty.io/products) from the Adapty main menu.
2. Click **Create product** at the top right.

<Zoom>
  <img src={require('./img/create-product.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Add product details:
- **Product name**: The name visible only to you across the Adapty dashboard.
- **Access level ID**: The unique identifier that determines which features are unlocked after purchase. If all paid users in your app get access to the same features, you can use the default access level: `premium`. For more complex setups, create additional [access levels](access-level.md).
- **Period**: The subscription duration. This must match the period configured in the store.
  
  :::note
  
    By default, all products have an **Uncategorized** period. Make sure to set the correct one, otherwise there might be problems with granting access to your customers.  
    If the product is not a subscription, use the following options:
  
  :::
  - **Lifetime**: Use a lifetime period for products that unlock the premium features of the app forever.
  - **Non-Subscriptions**: For products that are not subscriptions and therefore have no duration, use non-subscriptions. These can unlock additional features.
  - **Consumables**: Consumable items can be purchased multiple times. They can be used up during the life of the application. Examples are in-game currency and extras. Note that consumable products don't affect access levels.

<Zoom>
  <img src={require('./img/product-details.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<br />

4. Add store details. Choose your store:

<Tabs>
<TabItem value="App Store" label="App Store" default>

- **App Store Product ID**: The unique identifier used to access your product on devices.

<details>
    <summary>Click here to learn where to find the App Store Product ID.</summary>


1. Go to **Monetize > Subscriptions** in your [Apple App Store Connect](https://appstoreconnect.apple.com/login) account.
2. Open the **Subscription group** for the purchase.
3. You will see the **Product ID** column for purchases included in the subscription group.

</details>

<Zoom>
  <img src={require('./img/stores-info.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
  

</TabItem>

<TabItem value="Google Play" label="Google Play" default>

- **Google Play Product ID**: The identifier for the product from the Play Store.
- **Base plan ID**: The ID that defines the base plan for the product in the Play Store.
- **Legacy fallback product**: A fallback product is used exclusively for apps using older versions of the Adapty SDK (versions 2.5 and below). Specify the value in the following format `<subscription_id>:<base_plan_id>`.

<details>
    <summary>Click here to learn where to find the Google Play Product and Base plan IDs.</summary>


1. Go to **Monetize with Play > Products > Subscriptions** in your [Google Play Console](https://play.google.com/console/developers/android/app) account.
2. Open the **Subscription** for the purchase.
3. You will see the Product ID in the **Subscription details** section and the Base plan ID in the **ID and duration** column of the **Base plans and offers** section.

</details>

<Zoom>
  <img src={require('./img/play-store-id.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

</TabItem>

<TabItem value="Stripe" label="Stripe" default>

- **Stripe Product ID**: The unique product identifier from Stripe.
- **Stripe Price ID**: The unique identifier from Stripe for the price associated with the product.

<details>
    <summary>Click here to learn where to find the Stripe Product and Price IDs.</summary>


1. Go to your [Product Catalog](https://dashboard.stripe.com/products?active=true) in Stripe.
2. Open the product you need.
3. You will see:
- The Stripe Product ID (looks like `prod_...`) in the top right corner.
- The Stripe Price ID (looks like `price_...`) in the **API ID** column of the **Pricing** section.

</details>

<Zoom>
  <img src={require('./img/product-stripe.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

</TabItem>

<TabItem value="Paddle" label="Paddle" default>

- **Paddle Product ID**: The unique product identifier from Paddle.
- **Paddle Price ID**: The unique identifier from Paddle for the price associated with the product.

<details>
    <summary>Click here to learn where to find the Paddle Product and Price IDs.</summary>


1. Go to your [Product Catalog](https://vendors.paddle.com/products-v2) in Paddle.
2. Open the product you need.
3. You will see:
- The Paddle Product ID (looks like `pro_...`) in the **Additional details** section.
- The Paddle Price ID (looks like `pri_...`) in the **ID** column of the **Prices** section.

</details>

<Zoom>
  <img src={require('./img/paddle-product-price.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

</TabItem>

<TabItem value="Custom" label="Custom store" default>

You can select an existing custom store or add a new one and associate a product with it. 

Keep in mind that Adapty only tracks transactions from the App Store, Google Play, and Stripe. For custom stores, you'll need to submit transactions using the Adapty server-side API [Set transaction method](ss-set-transaction.md).

</TabItem>

</Tabs>


5. Later, you can [create offers](create-offer.md) for the product if needed: promotional offers for the App Store and all other types of offers for other stores.

Your product will appear in the product list.

<Zoom>
  <img src={require('./img/created-product.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Next steps

Once you've added your products to Adapty, you can move on to [setting up paywalls](quickstart-paywalls.md) as it's the only way to start selling them.





