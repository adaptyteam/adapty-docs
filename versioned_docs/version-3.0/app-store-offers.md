---
title: "Offers in App Store"
description: "Set up and manage App Store offers to increase user retention."
metadataTitle: "Managing App Store Offers | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::info
If you haven't configured the products in the App Store yet, check our [documentation](app-store-products) on how to do it.
:::

Offers in the App Store are special deals or discounts provided by these platforms for in-app purchases. Developers use offers to provide users with exciting promotions, like discounted prices, free trials, or bundled offers. These promotions help attract and keep users engaged, making the app experience more rewarding. 

There are three offer types in the App Store, and Adapty supports them all:

- **Introductory offers (Free trials)**:
  - Free subscription periods
  - Only new users are eligible (those who haven't activated trial or subscribed before)
  - Adapty automatically applies trials for eligible users after you set them up in App Store Connect
- **Promotional offers**:
  - Free subscription periods, percentage discounts, fixed price discounts
  - Any users can be eligible
  - Adapty automatically applies promotional offers for eligible users, but you will need to add them to your products and paywalls in Adapty.
- **Win-back offers**:
  - Free subscription periods or percentage discounts
  - Only churned users are eligible
  - Adapty automatically applies win-back offers for eligible users, but you will need to add them to your products and paywalls in Adapty.

:::important
To use these offers, you have to [upload subscription key](app-store-connection-configuration#step-4-for-trials-and-special-offers--set-up-promotional-offers) to Adapty dashboard, so Adapty can sign the offers.
:::

<Zoom>
  <img src={require('./img/646799a-CleanShot_2023-07-25_at_15.14.112x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Introductory offers

Adapty automatically applies introductory offers on iOS if the user is eligible.

So, to enable introductory offers for products you are selling, you only need to create them in App Store Connect:

1. Open your app in App Store Connect and switch to **Monetization > Subscriptions** from the left menu.
2. Select a subscription group and navigate to the subscription you need. Note that it must have duration set up.
3. Click **View all Subscription Pricing** and switch to the **Introductory offers** tab. Click **+**.

<Zoom>
  <img src={require('./img/apple-intro-offer.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Select countries and regions where the introductory offer will be available.

<Zoom>
  <img src={require('./img/apple-countries-intro.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. Select start and end dates for the introductory offer. If the introductory offer has no specific end date, you can just select **No end date**. Click **Next**.

<Zoom>
  <img src={require('./img/apple-dates-intro.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. Select the introductory offer type that will define how your users will be charged for the trial depending on whether it is free or paid. Depending on what you select, you also need to define the trial duration and price. Read more in the [Apple documentation](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-introductory-offers-for-auto-renewable-subscriptions).

<Zoom>
  <img src={require('./img/apple-type-intro.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Review your choice and click **Confirm**. 

As you finish this setup, you don't need to do anything additional in Adapty. The trial will activate for eligible users purchasing the product.

## Promotional offers

In Adapty, promotional offers are applied automatically if users are eligible. You need to set them up in App Store Connect and add to your product and paywall in Adapty:

1. Open your app in App Store Connect and switch to **Monetization > Subscriptions** from the left menu.
2. Select a subscription group and navigate to the subscription you need. Note that it must have duration set up.
3. Click **View all Subscription Pricing** and switch to the **Promotional offers** tab. Click **+**.

<Zoom>
  <img src={require('./img/apple-promo-offer.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Set the promotional offer details. Note that these values can't be used only once.
   - **Promotional offer reference name**: The promotional offer name. It won't be visible to your users.
   - **Promotional offer identifier**: The promotional offer identification code. You will use it to add the offer to Adapty.

<Zoom>
  <img src={require('./img/apple-id-promo.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. Select the introductory offer type that will define how your users will be charged for it depending on whether it is free or paid. Depending on what you select, you also need to define the trial duration and price. So, if you want to make a discount, select **Pay as you go** or **Pay up front**. For a free subscription period, select **Free**. Read more in the [Apple documentation](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-promotional-offers-for-auto-renewable-subscriptions).

<Zoom>
  <img src={require('./img/apple-type-promo.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. If needed, set different prices for different countries and regions and click **Next**.

<Zoom>
  <img src={require('./img/apple-price-promo.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Review your choice and click **Confirm**.

8. Proceed with [adding the promotional offer to Adapty](create-offer).

## Win-back offers

:::important
Before you can create a win-back offer, your subscription must be approved by App Review. 
:::

In Adapty, win-back offers are applied automatically if users are eligible. You need to set them up in App Store Connect and add to your product and paywall in Adapty:

1. Open your app in App Store Connect and switch to **Monetization > Subscriptions** from the left menu.
2. Select a subscription group and navigate to the subscription you need. Note that it must have duration set up.
3. Click **View all Subscription Pricing** and switch to the **Win-back offers** tab. Click **Create offer**.
4. Set the win-back offer details. Note that these values can't be used only once.
  - **Reference name**: The offer name. It won't be visible to your users.
  - **Offer identifier**: The offer identification code. You will use it to add the offer to Adapty.
5. Set the win-back offer details. Read more in the [Apple documentation](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-win-back-offers/).
6. Review your choice and click **Confirm**.
7. Proceed with [adding the offer to Adapty](create-offer).