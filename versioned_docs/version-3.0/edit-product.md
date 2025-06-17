---
title: "Edit product"
description: "Modify and manage your subscription products in Adapty for better revenue tracking."
metadataTitle: "Editing Products in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In Adapty, you can combine similar products from the App Store, Play Store, Stripe, and custom stores into a single internal [Product](product). This allows you to use a single Adapty product across all platforms instead of using each vendor's product.

:::warning

For products already used in live paywalls, changing their details will create discrepancies in your analytics data. Avoid modifying period, access level, product IDs, and price IDs unless you're fixing an error (like incorrect period or typo in ID).

If you need to replace an existing product, create a new one and update your Paywalls and A/B tests accordingly instead of editing the existing one.
:::

To edit the product:

1. Open **[Products](https://app.adapty.io/products)** from the Adapty main menu and click the three dots next to the product. Then, select the **Edit** option.
2. In the **Edit** window, make the changes you need. For more details on the options in this window, read the [Create product](create-product) article.
3. Click **Save** to apply the changes.


<Zoom>
  <img src={require('./img/edit-product.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


