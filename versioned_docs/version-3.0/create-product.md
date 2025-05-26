---
title: "Create product"
description: "Step-by-step guide on creating new subscription products in Adapty for better revenue management."
metadataTitle: "Creating Products in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

No matter how you use Adapty, you need to create a product in the Adapty Dashboard and link products you've created in the app stores into it. Product creation in app stores is done separately from Adapty and involves defining details like price, duration, and free trials for your in-app purchases or subscriptions. Adapty will then use these settings to manage and analyze transactions in your app. Please check our guides on how to create products in stores:

- [How to create a product in App Store](app-store-products)
- [How to create a product in Google Play](android-products)

After your products are set up in the stores, you are ready to add your products to the Adapty Dashboard. To add a new product to your app:

1. Open the **[Paywalls and Products](https://app.adapty.io/products)** section from the Adapty main menu, then select the **Products** tab.


<Zoom>
  <img src={require('./img/7c9573a-products_tab.webp').default}
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
  <img src={require('./img/1d1a1f9-CleanShot_2023-07-28_at_16.38.192x.webp').default}
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
     
     :::note
     
     By default, all the products have an **Uncategorized** period. Make sure to set the correct one, otherwise, there might be problems with granting access to your customers.  
     If the product is not a subscription, use the following options:
     
     :::
     
     - **Lifetime**: Use a lifetime period for the products that unlock the premium features of the app forever.  
     
     - **Non-Subscriptions**: For the products that are not subscriptions and therefore have no duration, use non-subscriptions. These can be unlocked for additional features, consumable products, etc.
     - **Consumables**:  Consumable items can be purchased multiple times. They could be used up during the life of the application. Examples are in-game currency and extras. Please consider that consumable products don’t affect access levels.

4. Click **Next**.

5. In the **Add stores info** window, configure the product information from each store:

   1. **App Store:**

      - **App Store Product ID:** This unique identifier is used to access your product on devices. To obtain the product ID for the App Store, please follow the steps outlined in the [Product in App Store](app-store-products) page, where you'll find detailed instructions on how to create and retrieve the product ID.

   2. **Play Store:** 

      - **Google Play Product ID:** These are identifiers for the product from the Play Store. You need to provide at least one of them, but you can always add another one later if needed.  To obtain the product ID for the Play Store, please follow the steps outlined in the [Product in Play Store](android-products) page, where you'll find detailed instructions on how to create and retrieve the product ID.
      - **Base Plan ID:** This ID is used to define the base plan for the product in the Play Store. When adding a subscription's Product ID on the Play Store you have to provide a Base Plan ID.  A base plan defines the essential details of a subscription, encompassing the billing period, renewal type (auto-renewing or prepaid), and the associated price.  Please note, that within Adapty, each combination of the same subscription and different base plans is treated as a separate product.
      - **Legacy fallback product**: A fallback product is used exclusively for apps using older versions of the Adapty SDK (versions 2.5 and below). By marking a product as backward compatible in the Google Play Console, Adapty can identify whether it can be purchased by older SDK versions. For this field please specify the value in the following format `<subscription_id>:<base_plan_id>`.
      
        <Zoom>
          <img src={require('./img/bb0b34c-CleanShot_2023-07-28_at_16.40.362x.webp').default}
          style={{
            border: '1px solid #727272', /* border width and color */
            width: '700px', /* image width */
            display: 'block', /* for alignment */
            margin: '0 auto' /* center alignment */
          }}
        />
        </Zoom>
      
   3. **Stripe**:
      
      - **Stripe Product ID**: This is a unique identifier for a product in Stripe.
      - **Stripe Price ID**: In Stripe, price objects include more than just the price amount; they also cover tax behavior, volume tiers, and subscription intervals. Since a single product can have multiple prices, specify the correct price ID when creating a product in Adapty.

   Configuring product information for the App Store, Play Store, and Stripe ensures smooth integration and effective management of in-app purchases or subscriptions with Adapty.

6. (optional) You can add products from any custom store by clicking **Add custom store**. In the **Manage custom store info** window, you can select an existing custom store or add a new one and associate a product with it. Keep in mind that Adapty only tracks transactions from the App Store, Google Play, and Stripe. For custom stores, you’ll need to submit transactions using the Adapty server-side API [Set transaction method](ss-set-transaction).

7. Click **Create** to finalize the product creation.

8. (optional) You can [create offers](create-offer) for the product if needed. To add offers, click **Yes, add offers**. Otherwise, click **No, thanks**.

9. Finally, click **Save** to confirm the product creation.