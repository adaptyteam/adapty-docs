---
title: "Assign access level to product"
description: "Assign access levels to products to optimize subscription management."
metadataTitle: "Assigning Access Levels to Products | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Every [Product](product) requires an associated access level to ensure that users receive the corresponding gated content upon purchase. Adapty seamlessly determines the subscription duration, which then serves as the expiration date for the access level. In the case of a lifetime product, if a customer purchases it, the access level remains perpetually active without any expiration date.

To link an access level to a product:

1. While [configuring a product](create-product), select the access level from the **Access Level ID** list.


<Zoom>
  <img src={require('./img/e71651e-add_access_level_to_product.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Click the **Save** button to confirm the change.