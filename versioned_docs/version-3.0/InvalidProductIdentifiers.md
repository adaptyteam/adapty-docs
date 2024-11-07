---
title: "Fix for Code-1000 `noProductIDsFound` error"
description: ""
metadataTitle: ""
---

import ProvideBundleID from '@site/src/components/reusable/ProvideBundleID.md';
import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The 1000-code error, `noProductIDsFound`, indicates that none of the products you requested on the paywall are available for purchase in the App Store, even though they’re listed there. This error may sometimes come with an `InvalidProductIdentifiers` warning. If the warning appears without an error, safely ignore it.

If you’re encountering the `noProductIDsFound` error, follow these steps to resolve it:

## Step 1. Check your iOS version

Make sure you're not testing on iOS 18 — there’s a known issue in that version.
## Step 2. Check bundle ID

<ProvideBundleID />

## Step 3. Check products

1. Go to **App Store Connect** and navigate to [**Monetization** → **Subscriptions**](https://appstoreconnect.apple.com/apps/6477523342/distribution/subscriptions) in the left-hand menu.

<Zoom>
 <img src={require('./img/subscription_group_open.webp').default}
 style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
 }}
  />
</Zoom>

2. Click on the subscription group name. You’ll see your products listed under the **Subscriptions** section.

3. Ensure the product you're testing is marked **Ready to Submit**. If not, follow the instructions on the [Product in App Store](app-store-products) page.
    <Zoom>
   <img src={require('./img/ready-to-submit.webp').default}
      style={{
        border: '1px solid #727272', /* border width and color */
        width: '700px', /* image width */
        display: 'block', /* for alignment */
        margin: '0 auto' /* center alignment */
      }}
    />
    </Zoom>

4. Compare the product ID from the table with the one in the [**Products**](https://app.adapty.io/products) tab in the Adapty Dashboard. If the IDs don’t match, copy the product ID from the table and [create a product](create-product) with it in the Adapty Dashboard.

  <Zoom>

 <img src={require('./img/product-id-copy.webp').default}
 style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
 }}
/>
</Zoom>



## Step 4. Check if the product availability

1. Go back to **App Store Connect** and open the same **Subscriptions** section.

 <Zoom>
   <img src={require('./img/subscription_group_open.webp').default}
   style={{
     border: '1px solid #727272', /* border width and color */
     width: '700px', /* image width */
     display: 'block', /* for alignment */
     margin: '0 auto' /* center alignment */
   }}
    />
 </Zoom>

2. Click the subscription group name to view your products.

3. Select the product you're testing.
   <Zoom>
   <img src={require('./img/click-product.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
     />
     </Zoom>

4. Scroll to the **Availability** section and check that all the required countries and regions are listed. 

   <Zoom>
   <img src={require('./img/product-availability.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
     />
     </Zoom>

## Step 5. Check product prices

1. Again, head to the **Monetization** → **Subscriptions** section in **App Store Connect**.

 <Zoom>
   <img src={require('./img/subscription_group_open.webp').default}
   style={{
     border: '1px solid #727272', /* border width and color */
     width: '700px', /* image width */
     display: 'block', /* for alignment */
     margin: '0 auto' /* center alignment */
   }}
    />
 </Zoom>

2. Click the subscription group name.

3. Select the product you’re testing.
    <Zoom>
    <img src={require('./img/click-product.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
    />
    </Zoom>

4. Scroll down to **Subscription Pricing** and expand the **Current Pricing for New Subscribers** section.
    <Zoom>
    <img src={require('./img/check-prices.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
    />
    </Zoom>

5. Ensure that all required prices are listed.
    <Zoom>
    <img src={require('./img/product-pricing.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
    />
    </Zoom>

    ## Step 6. Check app paid status, back account, and tax forms are active

    1. In х**App Store Connect**](https://appstoreconnect.apple.com/) homepage, click **Business**.
    
    <Zoom>
      <img src={require('./img/business.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
    />
    </Zoom>
    
    2. Select your company name.
    
    <Zoom>
      <img src={require('./img/business-name.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
    />
    </Zoom>
    
    3. Scroll down and check that your **Paid Apps Agreement**, **Bank Account**, and **Tax forms** all show as **Active**.
    
    <Zoom>
      <img src={require('./img/appstore-connect-status.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
    />
    </Zoom>
    
    By following these steps, you should be able to resolve the `InvalidProductIdentifiers` warning and get your products live in the store
