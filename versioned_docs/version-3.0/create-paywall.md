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

1. Go to [**Paywalls**](https://app.adapty.io/paywalls) in the Adapty main menu. This page shows an overview of all your paywalls and their metrics.
2. Click **Create paywall**.
3. In the **Paywalls / New paywall** page, enter a **Paywall name** to identify this paywall throughout the Adapty Dashboard.
4. Click **Add product**.
5. Select products to be shown to your customers. 

:::note
- The product order in this list will be maintained in the SDK, so arrange products in your desired order.  
- Once a paywall is shown in production, you won’t be able to change the products on it, as this could affect paywall metrics.
:::

6. If you're offering free trials or other offers for your products, add them here or they won't be available. Choose an offer you [created earlier](create-offer) for this product from the **Offer** list. The list is only available for products that have offers.
7. Click **Create as a draft** to confirm paywall creation.

Your paywall is now created! You can [add it to a placement](add-audience-paywall-ab-test) to start using it.

<Zoom>
  <img src={require('./img/create-paywall.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>