---
title: "Create product"
description: "Step-by-step guide on creating new subscription products in Adapty for better revenue management."
metadataTitle: "Creating Products in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The way you create products in Adapty depends on whether you already have them in stores:
- **[If products don't exist in App Store and/or Google Play yet, create them in Adapty and push to the stores right away](#create-product-and-push-to-store)**.
- **[If products already exist in App Store and/or Google Play, create them in Adapty and connect existing store products.](#create-product-and-connect-existing-store-products)**

## Create product and push to store

:::warning
Before you start, ensure you've configured the integration with the stores you need:
- [App Store](initial_ios.md)
- [Google Play](initial-android.md)

If you configured the App Store integration some time ago, ensure you've [added the App Store Connect API key](app-store-connection-configuration#step-6-add-app-store-connect-api-key) as well.
:::

To add a new product to your app:

1. Go to **[Products](https://app.adapty.io/products)** from the Adapty main menu.

<Zoom>
  <img src={require('./img/products-tab.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Click **Create product** in the top-right corner. Adapty supports all types of products: subscriptions, non-consumable \(including lifetime\), and consumable.

3. Select **Create a new product and push to stores**.

<Zoom>
  <img src={require('./img/push-to-stores.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Enter the following data:
    - **Product name**: enter the name of the product to be used in the Adapty dashboard. The name is primarily for your reference, so feel free to choose a name that is most convenient for you to use across the Adapty Dashboard.
    - **Access Level**: Select the [access level](access-level) to which the product belongs. The access level is used to determine the features unlocked after purchasing the product. Note that this list contains only previously created access levels. The `premium` access level is created in Adapty by default, but you can also [add more access levels](access-level).
    - **Subscription duration**: select the duration of the subscription from the list.
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

5. Click **Save & Continue**.
6. Configure the product information for App Store if you plan to publish there:
   - **Product ID**: Create a permanent unique ID for the product.
   - **Product group**: Select an existing product group you've created in App Store Connect or click **Create new Product Group** and set its name. After Adapty creates it, you can select it from the dropdown.
   - **Screenshot**: Upload a screenshot of the in-app purchase that clearly shows the item or service being offered. This screenshot is used for the App Store review only and isn't displayed on the App Store. See the official Apple [recommendations and specifications](https://developer.apple.com/help/app-store-connect/manage-app-information/upload-app-previews-and-screenshots/) for submitting screenshots.

<Zoom>
  <img src={require('./img/push-app-store.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Click **Push data to App Store**.

:::warning
If it is your first product for this app, you must manually submit it for review in App Store Connect. This won't be required later. Once the review is finished, the product status in Adapty will update automatically.
:::

8. Configure the product information for Google Play if you plan to publish there:
   - **Base Product ID**: Create a permanent unique ID for the product.
   - **Subscription**: Select an existing subscription group you've created in Google Play Console or click **Create new Product Group** and set its name and ID. After Adapty creates it, you can select it from the dropdown.
   :::note
   Grace Period and Account Hold Period will be automatically set to the default values as per Play Store rules. You can change them later in Google Play Console.
   :::

<Zoom>
  <img src={require('./img/push-google-play.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

9. Click **Push data to Play Store**.
10. Configure the introductory offer – free trial – by selecting its **Free duration** from the dropdown. For this initial setup, you can add an introductory free trial. Once the main product is approved by the stores, you can [add more offers](offers.md) (e.g., promotional, win-back) by linking their existing IDs from your store console.

<Zoom>
  <img src={require('./img/intro.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

11. Finally, click **Save** to confirm the product creation.

## Create product and connect existing store products

:::warning
Before you start, ensure you've:
- Configured the integration with the stores you need:
  - [App Store](initial_ios.md)
  - [Google Play](initial-android.md)
- Created products in the stores you need:
  - [App Store](app-store-products.md)
  - [Google Play](android-products.md)

**If you don't have any products created**, consider following the [Push to stores](#create-product-and-push-to-store) guide, so you create them both in Adapty and stores at the same time.
:::

To add a new product to your app:

1. Go to **[Products](https://app.adapty.io/products)** from the Adapty main menu.

<Zoom>
  <img src={require('./img/products-tab.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Click **Create product** in the top-right corner. Adapty supports all types of products: subscriptions, non-consumable \(including lifetime\), and consumable.

3. Select **Connect an existing store product**.

<Zoom>
  <img src={require('./img/existing-product.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Enter the following data:

    - **Product name**: enter the name of the product to be used in the Adapty dashboard. The name is primarily for your reference, so feel free to choose a name that is most convenient for you to use across the Adapty Dashboard.

    - **Access Level ID**: Select the [access level](access-level) to which the product belongs. The access level is used to determine the features unlocked after purchasing the product. Note that this list contains only previously created access levels. The `premium` access level is created in Adapty by default, but you can also [add more access levels](access-level).

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
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. Click **Continue**.

6. Configure the product information from each store:

   - **App Store:**
        - **App Store Product ID:** This unique identifier is used to access your product on devices. Select it from the list. If you don't see it in the list, check its configuration in App Store Connect and ensure it's correct and belongs to this app.
   - **Play Store:**
        - **Google Play Product ID:** This is the product identifier from the Play Store. Select it from the list. If you don't see it in the list, check its configuration in Google Play Console and ensure it's correct and belongs to this app..
        - **Base Plan ID:** This ID is used to define the base plan for the product in the Play Store. When adding a subscription's Product ID on the Play Store you have to provide a Base Plan ID.  A base plan defines the essential details of a subscription, encompassing the billing period, renewal type (auto-renewing or prepaid), and the associated price.  Please note, that within Adapty, each combination of the same subscription and different base plans is treated as a separate product.
        - **Legacy fallback product**: A fallback product is used exclusively for apps using older versions of the Adapty SDK (versions 2.5 and below). By marking a product as backward compatible in the Google Play Console, Adapty can identify whether it can be purchased by older SDK versions. For this field please specify the value in the following format `<subscription_id>:<base_plan_id>`.
   - **Stripe**:
        - **Stripe Product ID**: This is a unique identifier for a product in Stripe.
        - **Stripe Price ID**: In Stripe, price objects include more than just the price amount; they also cover tax behavior, volume tiers, and subscription intervals. Since a single product can have multiple prices, specify the correct price ID when creating a product in Adapty.
   - **Paddle**:
       - **Paddle Product ID**: This is a unique identifier for a product in Paddle.
       - **Paddle Price ID**: In Paddle, price objects include more than just the price amount; they also cover tax behavior, volume tiers, and subscription intervals. Since a single product can have multiple prices, specify the correct price ID when creating a product in Adapty.

7. **Optional:** You can add products from any custom store by clicking **Add custom store**. In the **Manage custom store info** window, you can select an existing custom store or add a new one and associate a product with it. Keep in mind that Adapty only tracks transactions from the App Store, Google Play, and Stripe. For custom stores, you’ll need to submit transactions using the Adapty server-side API [Set transaction method](ss-set-transaction).

8. Click **Save product** to finalize the product creation. The product status synchronization may take up to five minutes, so wait until they update in the table.

9. You can [create offers](create-offer) for the product if needed. To add offers, click **Yes, add offers**. Otherwise, click **No, thanks**.

:::note
Introductory offers are created in Adapty only when pushing a product to the store. When importing or for previously created products, introductory offers are not synced and are not displayed in Adapty but will still work correctly in the app.
:::

## Next steps

Congratulations! You've added your products to Adapty. What's next?

- If you haven't configured introductory/promotional offers yet, you can [do it](offers.md) now.
- If you don't want to do it or have already done it, proceed with [setting up paywalls](quickstart-paywalls.md) to enable in-app purchases.
- If you want to do any adjustments to the store products (e.g., set regional pricing or configure the grace period), do it in App Store Connect or Google Play Console.
- Read how you can [edit products](edit-product.md) later.