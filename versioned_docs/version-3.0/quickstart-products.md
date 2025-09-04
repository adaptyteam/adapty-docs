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


:::important
**The next steps depend on whether you already have products in App Store and/or Google Play:**
:::

<Tabs>

<TabItem value="no-products" label="No products in stores yet" default>

3. Select **Create a new product and push to stores**.

4. Add product details:
    - **Product name**: The name visible only to you across the Adapty dashboard.
    - **Access Level**: The unique identifier that determines which features are unlocked after purchase. If all paid users in your app get access to the same features, you can use the default access level: `premium`. For more complex setups, create additional [access levels](access-level.md).
    - **Subscription duration**: Select the duration of the subscription from the list.
        - **Weekly/Monthly/2 Months/3 Months/6 Months/Annual**: The subscription duration.
        - **Lifetime**: Use a lifetime period for the products that unlock the premium features of the app forever.
        - **Non-Subscriptions**: For the products that are not subscriptions and therefore have no duration, use non-subscriptions. These can be unlocked for additional features, consumable products, etc.
        - **Consumables**: Consumable items can be purchased multiple times. They could be used up during the life of the application. Examples are in-game currency and extras. Please consider that consumable products don’t affect access levels.
    - **Price (USD)**: The product price in USD. This price will be used as a base to automatically calculate and set prices across all countries. You will be able to customize the price for different countries and regions in the store later. See the guides for [App Store](https://developer.apple.com/help/app-store-connect/manage-subscriptions/manage-pricing-for-auto-renewable-subscriptions/) and [Google Play](https://support.google.com/googleplay/android-developer/answer/140504?sjid=7303890784165167068-EU).

<Zoom>
  <img src={require('./img/create-product-push.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. Click **Save & Continue** and switch to the **App Store** or **Google Play** tab to fill in the product details for the store.

<Tabs>
<TabItem value="App Store" label="App Store" default>

   - **Product ID**: Create a permanent unique ID for the product.
   - **Product group**: Select an existing product group you've created in App Store Connect or click **Create new Product Group** and set its name and ID. After Adapty creates it, you can select it from the dropdown.
   - **Screenshot**: Upload a screenshot of the in-app purchase that clearly shows the item or service being offered. This screenshot is used for the App Store review only and isn't displayed on the App Store.

:::warning
If it is your first product for this app, you must manually submit it for review in App Store Connect. This won't be required later. Once the review is finished, the product status in Adapty will update automatically.
:::

</TabItem>

<TabItem value="Google Play" label="Google Play" default>

   - **Base Product ID**: Create a permanent unique ID for the product.
   - **Subscription**: Select an existing subscription group you've created in Google Play Console or click **Create new Product Group** and set its name and ID. After Adapty creates it, you can select it from the dropdown.

</TabItem>
</Tabs>

6. Configure the introductory offer – free trial – by selecting its **Free duration** from the dropdown. For this initial setup, you can add an introductory free trial. Once the main product is approved by the stores, you can [add more offers](offers.md) (e.g., promotional, win-back) by linking their existing IDs from your store console.

</TabItem>

<TabItem value="products-in-stores" label="Products in stores already">

3. Select **Connect an existing store product**.
4. Add product details:
- **Product name**: The name visible only to you across the Adapty dashboard.
- **Access level ID**: The unique identifier that determines which features are unlocked after purchase. If all paid users in your app get access to the same features, you can use the default access level: `premium`. For more complex setups, create additional [access levels](access-level.md).
- **Subscription duration**: select the duration of the subscription from the list.
  - **Weekly/Monthly/2 Months/3 Months/6 Months/Annual**: The subscription duration.
  - **Lifetime**: Use a lifetime period for the products that unlock the premium features of the app forever.
  - **Non-Subscriptions**: For the products that are not subscriptions and therefore have no duration, use non-subscriptions. These can be unlocked for additional features, consumable products, etc.
  - **Consumables**: Consumable items can be purchased multiple times. They could be used up during the life of the application. Examples are in-game currency and extras. Please consider that consumable products don’t affect access levels.
- **Price (USD)**: The product price in USD.
    
  <Zoom>
  <img src={require('./img/product-info.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

<br />

5. Add store details. Choose your store:

<Tabs>
<TabItem value="App Store" label="App Store" default>

- **App Store Product ID**: The unique identifier used to access your product on devices. If you can't find it, ensure the ID is correct and belongs to the right app.

</TabItem>

<TabItem value="Google Play" label="Google Play" default>

- **Google Play Product ID**: The identifier for the product from the Play Store. Select it from the list of existing product IDs. If you can't find it, ensure the ID is correct and belongs to the right app.
- **Base plan ID**: The ID that defines the base plan for the product in the Play Store.
- **Legacy fallback product**: A fallback product is used exclusively for apps using older versions of the Adapty SDK (versions 2.5 and below). Specify the value in the following format `<subscription_id>:<base_plan_id>`.

<details>
    <summary>Click here to learn where to find the Google Play Product and Base plan IDs.</summary>


1. Go to **Monetize with Play > Products > Subscriptions** in your [Google Play Console](https://play.google.com/console/developers/android/app) account.
2. Open the **Subscription** for the purchase.
3. You will see the Product ID in the **Subscription details** section and the Base plan ID in the **ID and duration** column of the **Base plans and offers** section.

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

</details>



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

</details>



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

</details>



</TabItem>

<TabItem value="Custom" label="Custom store" default>

You can select an existing custom store or add a new one and associate a product with it. 

Keep in mind that Adapty only tracks transactions from the App Store, Google Play, and Stripe. For custom stores, you'll need to submit transactions using the Adapty server-side API [Set transaction method](ss-set-transaction.md).

</TabItem>

</Tabs>

6. You can [create offers](create-offer) for the product if needed. To add offers, click **Yes, add offers**. Otherwise, click **No, thanks**.

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

</TabItem>
</Tabs>

## Next steps

Once you've added your products to Adapty, you can move on to [setting up paywalls](quickstart-paywalls.md) as it's the only way to start selling them.





