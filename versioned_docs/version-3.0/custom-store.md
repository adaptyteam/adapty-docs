---
title: "Initial integration with other stores"
description: "Adapty Initial Integration with App Store: A Quick Guide"
metadataTitle: "Get started with Adapty's initial integration process with any app store"
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

We're thrilled to have you on board with Adapty! Our priority is to help you hit the ground running and achieve the best possible outcomes for your app.

The initial integration is only needed for [App Store](initial_ios), [Google Play](initial-android), [Stripe](stripe), and [Paddle](paddle.md) since Adapty verifies your apps, products, and offers with these stores. 

Adapty doesn’t validate data with other app stores and does not process purchases made through them. However, you can still mark products sold through other stores for Adapty to grant access to paid content after a successful purchase, reflect transactions in your analytics, and share them via integrations.

<Zoom>
  <img src={require('./img/Adapty-Communication-Scheme.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<p> </p>

:::important

Make sure your backend processes the purchase and sends the transaction to Adapty using the [Adapty server-side API](getting-started-with-server-side-api). Adapty will only provide access, trigger a transaction event, send it to integrations, and reflect it in analytics after the transaction is received.

:::

To mark a product as sold via a custom app store, select the app store when creating a product. If the store you need isn’t listed, here’s how to create one:

1. On the **Products** page, open the product you want to sell through a custom app store.

2. Choose the app store you want to sell through. If it’s not listed, click the **Create Custom Store** button.

   <Zoom>
     <img src={require('./img/create_custom-appstore.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. Enter the store’s **Title** and **Store ID**.
4. Click the **Create store** button.

If your backend is set up correctly, Adapty will receive product transactions from this custom store, reflect them in analytics, the [**Event Feed**](event-feed), and [integrations](https://app.adapty.io/integrations), and grant access accordingly.