---
title: "Offers in App Store"
description: "Set up and manage App Store offers to increase user retention."
metadataTitle: "Managing App Store Offers | Adapty Docs"
keywords: ['trial']
rank: 100
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::info
If you haven't configured the products in the App Store yet, check our [documentation](app-store-products) on how to do it.
:::

Offers in the App Store are special deals, trials, or discounts provided for in-app purchases. Developers use offers to provide users with exciting promotions, like discounted prices, free trials, or bundled offers. These promotions help attract and keep users engaged, increasing their conversion to paying users. 

There are four offer types in the App Store, and Adapty supports them all:

- **Introductory offers (Free or discounted subscription periods for new users)**:
  - Free or discounted subscription periods
  - Only new users are eligible (those who haven't activated an introductory offer or subscribed before)
  - You don't need to link them to products in Adapty. They will be automatically applied for eligible users who purchase corresponding products.
- **Promotional offers**:
  - Free subscription periods, percentage discounts, fixed price discounts
  - Any user can be eligible
  - Adapty automatically applies promotional offers for eligible users, but you will need to add them to your products and paywalls in Adapty.
- **Win-back offers**:
  - Free subscription periods or percentage discounts
  - Only churned users are eligible
  - Adapty automatically applies win-back offers for eligible users, but you will need to add them to your products and paywalls in Adapty.
- **Offer codes**: For more information and a workaround, see the [guide](https://adapty.io/docs/making-purchases#redeem-offer-code-in-ios).

:::important
To use these offers, you have to [upload your subscription key](app-store-connection-configuration#step-4-for-trials-and-special-offers--set-up-promotional-offers) to Adapty dashboard, so Adapty can sign the offers.
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

6. Select the introductory offer type. Depending on what you select, you also need to define the offer duration and price. Read more in the [Apple documentation](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-introductory-offers-for-auto-renewable-subscriptions).

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

As you finish this setup, you don't need to do anything additional in Adapty. The offer will activate for eligible users purchasing the product. So, ensure you are showing a paywall with this product only to those users who are supposed to be eligible for the offer.

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

5. Select the promotional offer type that will define how your users will be charged for it depending on whether it is free or paid. Depending on what you select, you also need to define the offer duration and price. So, if you want to make a discount, select **Pay as you go** or **Pay up front**. For a free subscription period, select **Free**. Read more in the [Apple documentation](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-promotional-offers-for-auto-renewable-subscriptions).

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

## Next steps

After you've added offers, proceed with the setup:
- If you have **apps in Google Play as well**, go to the [Google Play guide](google-play-offers.md).
- If you have **promotional and/or win-back offers in the App Store**, follow [this guide](create-offer) to add them to Adapty.
- If you have **only introductory offers in the App Store** and don't have any promotional or win-back offers, you are all set, but these sections may be useful to you:
  - [Working with offers in the Adapty Paywall Builder](create-offer#paywall-builder)
  - [How Adapty works with offers](create-offer#how-adapty-works-with-offers)