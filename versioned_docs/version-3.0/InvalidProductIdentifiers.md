---
title: "Solution for `InvalidProductIdentifiers` warning"
description: ""
metadataTitle: ""
---

import ProvideBundleID from '@site/src/components/reusable/ProvideBundleID.md';
import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

This error indicates that none of the products in the paywall is available in the store.

If you are encountering this error, please follow the steps below to resolve it:

## Step 1. Check iOS version
Make sure you do not test on iOS 18. This is a known issue in the version.
## Step 2. Check bundle ID

<ProvideBundleID />

## Step 3. Check products

1. Open **App Store Connect**. Proceed to [**Monetization** → **Subscriptions**](https://appstoreconnect.apple.com/apps/6477523342/distribution/subscriptions) section in the left-side menu.

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

2. Click the subscription group name. The products will be in the table under the **Subscriptions** title.

4. Verify the needed product has **Ready to Submit** status. If not, please follow the guidence in the [Product in App Store](app-store-products) page.
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
6. Copy the product ID from the table.
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
7. Open the **[Paywalls and Products](https://app.adapty.io/products)** section from the Adapty main menu, then select the **Products** tab.


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

8. Click the **Create product** button located in the top-right corner of the product list page. This action will initiate the process of creating a product within your app. Adapty supports all types of products: subscriptions, non-consumable \(including lifetime\), and consumable.


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


9. . In the opened **Create product** window, enter the following data:

  - **Product name**: enter the name of the product to be used in the Adapty dashboard. The name is primarily for your reference, so feel free to choose a name that is most convenient for you to use across the Adapty Dashboard.
    
  - **Access Level**: Select the [access level](access-level) to which the product belongs. The access level is used to determine the features unlocked after purchasing the product. Note that this list contains only previously created access levels. The `premium` access level is created in Adapty by default, but you can also [add more access levels](access-level).
    
  - **Period**: select the duration of the subscription from the list. It should match the period configured in the App Store or Play Store.
8 . Paste the copied product ID to the **App Store Product ID:** field in teh  **App Store:** tab.

10. Click **Save**.

## Step 4. Check if the products are available in all regions

1. Open **App Store Connect**. Proceed to [**Monetization** → **Subscriptions**](https://appstoreconnect.apple.com/apps/6477523342/distribution/subscriptions) section in the left-side menu.

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

2. Click the subscription group name. The products will be in the table under the **Subscriptions** title.

3. Click the product you test.
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

4. Scroll down to the **Availability** title. 

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

5. Verify that the country and region list contains all required countries and regions.

## Step 5. Check product prices

1. Open **App Store Connect**. Proceed to [**Monetization** → **Subscriptions**](https://appstoreconnect.apple.com/apps/6477523342/distribution/subscriptions) section in the left-side menu.

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

2. Click the subscription group name. The products will be in the table under the **Subscriptions** title.
   
3. Click the product you test.
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
4. Scroll down to the **Subscription Pricing** title and extend the **Current Pricing for New Subscribers**.
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
5. Make sure it contains all required prices.
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

### Step 6. Check app paid status and tax forms are active

1. Open **App Store Connect**. Click **Business**.

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

2. Click your company name.

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

3. In the opened window, scroll down and varify thet both **Paid Apps Agreement**, **Bank Account** and **Tax forms** have the **Active** status.

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

## Step 5. Check if a bank account is attached to the app, so it can be eligible for monetization.




Step 7. .