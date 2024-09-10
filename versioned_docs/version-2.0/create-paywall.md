---
title: "Create paywall"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

A [paywall](paywalls) serves as an in-app storefront where customers can browse products and make purchases.

<details>
   <summary>Before you start creating paywalls (Click to Expand)</summary>

   1. [Create at least one product](create-product).
2. (optional) [Create offer](create-offer).
</details>

To create a new paywall in the Adapty dashboard:

1. Open the [**Products and Paywalls**](https://app.adapty.io/paywalls) section in the Adapty main menu and click the **Paywall** tab to open it. The paywall list page in the Adapy dashboard provides an overview of all the paywalls that have been set up in your account along with their metrics.


<Zoom>
  <img src={require('./img/c661ee3-paywalls.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Click the **Create paywall** button.


<Zoom>
  <img src={require('./img/4b200e5-create_paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. In the opened **Paywalls/ New paywall** page, enter the **Paywall name: **The name that identifies the paywall throughout the Adapty Dashboard.
4. Click the **Add product** button.
5. From the opened drop-down list, select the **Products** that will be shown to your customers. The list contains only previously created products. The order of the products is preserved on the SDK side, so it's important to consider the desired order when configuring the paywall.  
   Please note that after your paywall will get shown on the production at least once it will be impossible to change the products on the paywall as this may affect the paywall metrics. 


<Zoom>
  <img src={require('./img/0479b51-ad_product_to_paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





6. If you serve your products with a free trial and other offers, consider adding them here, otherwise, they won't work. For this, click the **Add offer** button next to the product the offer belongs to. The button is active only if offers are set up for the product.  
   Apple's intro offers get sorted out automatically, so you don't have to add them separately in Adapty. 


<Zoom>
  <img src={require('./img/f586eee-add_offer.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





7. Click the **Create as a draft** button to confirm the paywall creation.

Now the paywall is created and you can [add it to a placement](add-audience-paywall-ab-test).