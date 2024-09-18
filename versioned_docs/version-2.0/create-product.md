---
title: "Create product"
description: "Learn how to optimize mobile app monetization with Adapty's product creation guide. Explore the seamless integration of App Store and Google Play products into a unified offering within Adapty. Simplify management and unlock revenue potential with Adapty's innovative approach to product creation. Get started today"
metadataTitle: "What is product in Adapty and how to create it"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

No matter how you use Adapty, you need to create a product in the Adapty Dashboard and link products you've created in the app stores into it. Product creation in app stores is done separately from Adapty and involves defining details like price, duration, and free trials for your in-app purchases or subscriptions. Adapty will then use these settings to manage and analyze transactions in your app. Please check our guides on how to create products in stores:

- [How to create a product in App Store](app-store-products)
- [How to create a product in Google Play](android-products)

After your products are set up in the stores, you are ready to add your products to the Adapty Dashboard. To add a new product to your app:

1. Open the **[Paywalls and Products](https://app.adapty.io/products)** section from the Adapty main menu, then select the **Products** tab.


<Zoom>
  <img src={require('./img/7c9573a-products_tab.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Click the **Create product** button located in the top-right corner of the product list page. This action will initiate the process of creating a product within your app. Adapty supports all types of products: subscriptions, non-consumable \(including lifetime\), and consumable.

<Zoom>
  <img src={require('./img/1d1a1f9-CleanShot_2023-07-28_at_16.38.192x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the opened **Create product** window, enter the following data:

   - **Product name**: enter the name of the product to be used in the Adapty dashboard. The name is primarily for your reference, so feel free to choose a name that is most convenient for you to use across the Adapty Dashboard.
   - **Access Level**: Select the [access level](access-level) to which the product belongs. The access level is used to determine the features unlocked after purchasing the product. Note that this list contains only previously created access levels. The `premium` access level is created in Adapty by default, but you can also [add more access levels](access-level).
   - **Period**: select the duration of the subscription from the list. It should match the period configured in the App Store or Play Store.
     > 🚧 By default, all the products have an **Uncategorized** period. Make sure to set the correct one, otherwise, there might be problems with granting access to your customers.  
     > If the product is not a subscription, use the following options:
     - **Lifetime**: Use a lifetime period for the products that unlock the premium features of the app forever.  
     - **Non-Subscriptions**: For the products that are not subscriptions and therefore have no duration, use non-subscriptions. These can be unlocked for additional features, consumable products, etc.
     - **Consumables**:  Consumable items can be purchased multiple times. They could be used up during the life of the application. Examples are in-game currency and extras. Please consider that consumable products don’t affect access levels.

4. Next, let's configure the product information from each store:

   1. **App Store:**

      - **App Store Product ID:** This unique identifier is used to access your product on devices. To obtain the product ID for the App Store, please follow the steps outlined in the [Product in App Store](app-store-products) page, where you'll find detailed instructions on how to create and retrieve the product ID.

   2. **Play Store:** 

      - **Play Store Product ID:** These are identifiers for the product from the Play Store. You need to provide at least one of them, but you can always add another one later if needed.  To obtain the product ID for the Play Store, please follow the steps outlined in the [Product in Play Store](android-products) page, where you'll find detailed instructions on how to create and retrieve the product ID.
      - **Base Plan ID:** This ID is used to define the base plan for the product in the Play Store. When adding a subscription's Product ID on the Play Store you have to provide a Base Plan ID.  A base plan defines the essential details of a subscription, encompassing the billing period, renewal type (auto-renewing or prepaid), and the associated price.  Please note, that within Adapty, each combination of the same subscription and different base plans is treated as a separate product.
      - **Legacy fallback product**: A fallback product is used exclusively for apps using older versions of the Adapty SDK (versions 2.5 and below). By marking a product as backward compatible in the Google Play Console, Adapty can identify whether it can be purchased by older SDK versions. For this field please specify the value in the following format `<subscription_id>:<base_plan_id>`.

<Zoom>
  <img src={require('./img/bb0b34c-CleanShot_2023-07-28_at_16.40.362x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

 By configuring the product information for both the App Store and Play Store, you'll ensure smooth integration and effective management of your in-app purchases or subscriptions using Adapty.

5. (optional) You can configure the product information from other app stores you sell the product through. If the required store is not listed, add it.

   <details>
   <summary>How to add a custom app store (click to expand)</summary>
    1. Click the **Create Custom Store** button.

       <Zoom>
         <img src={require('./img/create-product-create-store.png').default}
         style={{
           border: '1px solid #727272', /* border width and color */
           width: '700px', /* image width */
           display: 'block', /* for alignment */
           margin: '0 auto' /* center alignment */
         }}
       />
       </Zoom>

    2. Enter the store’s **Title** and **Store ID**.

    3. Click the **Create store** button.
	</details>

5. (optional) You can [create offers](create-offer) for the product if you need to.
6. Click the **Save** button to confirm the creation of the product.