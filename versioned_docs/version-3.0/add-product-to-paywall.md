---
title: "Add product to paywall"
description: "Adding Products to Paywalls | Adapty Docs"
metadataTitle: "Learn how to add and manage products on paywalls in Adapty."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

To make a product visible and selectable within a [paywall](paywalls) for your app's users, follow these steps:

1. While [configuring a paywall](create-paywall), click the **Add product** button under the **Products** title.
2. From the opened drop-down list, select the products that will be shown to your customers. The list contains only previously created products. The order of the products is preserved on the SDK side, so it's important to consider the desired order when configuring the paywall. Additionally, you can specify an offer for a product if desired.


<Zoom>
  <img src={require('./img/0479b51-ad_product_to_paywall.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. Click the **Save as draft** or **Save and publish** button depending on the status of the paywall.

Please keep in mind that after creation, it is not recommended to edit, add, or delete products to the paywall as this may affect the paywall metrics.