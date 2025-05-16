---
title: "Create paywall"
description: "Learn how to create high-converting paywalls using Adapty’s Paywall Builder."
metadataTitle: "Creating a Paywall in Adapty | Adapty Docs"
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

1. Go to [**Paywalls**](https://app.adapty.io/paywalls) in the Adapty main menu and open the **Paywall** tab. This page gives an overview of all paywalls you’ve set up, along with their metrics.

<Zoom>
  <img src={require('./img/c661ee3-paywalls.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Click **Create paywall**.

<Zoom>
  <img src={require('./img/4b200e5-create_paywall.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the **Paywalls / New paywall** page, enter a **Paywall name** that will identify this paywall throughout the Adapty Dashboard.
4. Click **Add product**.
5. From the drop-down list, select the **Products** to be shown to your customers. This list includes only products you’ve created beforehand. The product order in this list will be maintained in the SDK, so arrange products in your desired order.  
   Please note that once a paywall is shown in production, you won’t be able to change the products on it, as this could affect paywall metrics. 

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

6. If you’re offering free trials or other offers for your products, be sure to add them here; otherwise, they won’t be available. Choose an offer you [created earlier](create-offer) for this product from the **Offer** list. The list is available only for the products that have offers. 

7. Click **Create as a draft** to confirm the paywall creation.

Your paywall is now created! You can [add it to a placement](add-audience-paywall-ab-test) to start using it.