---
title: "Edit product"
description: "Modify and manage your subscription products in Adapty for better revenue tracking."
metadataTitle: "Editing Products in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In Adapty you can combine similar products that you have in App Store and Play Store in a single internal [Product](product). This allows you to use a single Adapty product across all platforms, instead of using each vendor's products.

:::warning
While you have the option to edit any product, it's crucial to ensure that making changes to products already used in live paywalls doesn't lead to discrepancies in your analytics.

Editing period, access level, App Store Product ID, and Play Store Product ID is not recommended because it may affect analytics clarity. Only edit them if you made a mistake, like setting the wrong period or typo in the product ID.

If you no longer use the product and want to replace it with another one, we strongly advise you to create a new product and update Paywalls and A/B tests accordingly.
:::

To edit the product:

1. Go to **[Products](https://app.adapty.io/products)** from the Adapty main menu.
2. Click the **3-dot** button next to the product and select **Edit**.
3. In the **Edit** window, make the changes you need. For more details on the options in this window, please read the [Create product](create-product) section.
4. Click**Save**.


<Zoom>
  <img src={require('./img/edit-product.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


