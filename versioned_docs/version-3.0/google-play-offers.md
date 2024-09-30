---
title: "Offers in Google Play"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

With Billing Library v5, Google introduced a new way of working with offers. It gives you much more flexibility, but it's important to configure them properly. After reading this short guide from Adapty, you'll have a full understanding of Google Play Offers.

:::note
Checklist to successfully use Google Play offers

1. [Create and activate](google-play-offers#configuring-offers-in-google-play) offers in Google Play Console.
2. [Add](google-play-offers#adding-offers-to-adapty-products) offers to Adapty Products.
3. [Choose](google-play-offers#choosing-the-offer-in-adapty-paywalls) the offer to use in Adapty Paywall.
4. Use Adapty SDK 2.6 or newer.
5. [Check eligibility criteria](google-play-offers#configuring-offers-in-google-play) for the offer in Google Play Console if everything is configured, but the offer is not applied.
:::

## Overview


<Zoom>
  <img src={require('./img/04aca48-sub-offers.jpeg').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Before Google Play Billing Library v5 a subscription could only have one offer. If you wanted to test different offers, for example, a 3-day free trial vs a 1-week free trial, you would have to create 2 different subscriptions, which is not optimal.

Now you can create multiple offers for every base plan (previously known as subscription) and this means that you have to decide which offer should be used at a given moment. Please check the docs on [base plans](android-products) if you're not familiar with them.

## Configuring offers in Google Play


<Zoom>
  <img src={require('./img/c0b1dfa-001930-November-03-XYnbieeu.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





In the screenshot above, you can see a subscription `premium_access`(1) with two base plans: `1-month` (2) and `1-year` (3). Offers are always created for base plans.

1. To create an offer, click **Add offer** and choose the base plan from the list.

   

<Zoom>
  <img src={require('./img/75a5d69-eb0bc9a-001931-November-03-eQdthUMx.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Enter the offer ID. It will be later used in the analytics and Adapty dashboard, so give it a meaningful name.

   

<Zoom>
  <img src={require('./img/ff282c2-c0b1dfa-001930-November-03-XYnbieeu.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Choose the eligibility criteria:

   1. **New customer acquisition**: the offer will be available only to new subscribers if they haven't used this offer in the past. This is the most common option and should be used by default.
   2. **Upgrade**: this offer will be available for the customers upgrading from the other subscription. Use it when you want to promote more expensive plans to your existing subscribers, for example, customers upgrading from the bronze to the gold tier of your subscription.
   3. **Developer determined**: you can control who can use this offer from the app code. Be cautious using it in production to avoid possible fraud: customers can activate a free or discounted subscription over and over again. A good use case for this offer type is winning back churned subscribers.

   

<Zoom>
  <img src={require('./img/ee302dc-a506e5a-001934-November-03-TVBLOz2L.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. Add up to two pricing phases to your offer. There are three phase types available:

   1. **Free trial**: the subscription can be used for free for a configured amount of time (minimum 3 days). This is the most common offer.
   2. **Single payment**: the subscription is cheaper if the customers pay upfront. For example, normally a monthly plan costs $9.99, but with this offer type, the first three months cost $19.99, a 30% discount.
   3. **Discounted recurring payment**: the subscription is cheaper for the first `n` periods. For example, normally a monthly plan costs $9.99, but with this offer type, each of the first three months costs $4.99, a 50% discount.  
      An offer can have two phases. In this case, the first phase must be a Free trial, and the second one is either a Single payment or a Discounted recurring payment. They would be applied in this order.

   

<Zoom>
  <img src={require('./img/d6267f3-a48f79e-001936-November-03-A13wutRh.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




5. Activate the offer to use it in the app.

   

<Zoom>
  <img src={require('./img/d3fc09b-f149ba6-001937-November-03-MO9Gz3ap.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




After activating the offer, you should copy its ID to use in Adapty.


<Zoom>
  <img src={require('./img/0800923-001938-November-03-ANtSI48t.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The `1-month` plan has three offers: `free-trial-1-week` (1), `free-trial-3-days` (2), `pay-up-front-3months-30p` (3). The `1-year` plan has one offer: `free-trial-1-week` (1). As you can see, offer IDs can be the same for different base plans.

## Adding offers to Adapty products

Let's create a 1-month product in Adapty with all the offers. You can do it from a single screen.


<Zoom>
  <img src={require('./img/e5a37f4-001940-November-03-S8fDVXyR.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. Choose the name, access level, and period.
2. Copy the Product ID and Base plan ID from Google Play Console and paste them into the corresponding fields in Adapty.
3. Copy an offer ID from Google Play Console and paste it into the Google Play Offer ID field in Adapty. Provide a user-friendly name for the offer. If you have multiple offers, add all of them by clicking **Add offer**.
4. Save the changes.

## Choosing the offer in Adapty paywalls

Finally, you have to choose, which offer should be displayed on the given paywall.

When creating a paywall or editing a draft of the paywall, choose the offer from the dropdown next to the product. This offer will be then used during the purchase from the paywall if the customer is eligible for the offer in the first place.

If you configure a paywall like this, a monthly subscription will not have a free trial. A yearly subscription will have a 1-week trial if the customer is eligible.


<Zoom>
  <img src={require('./img/3f2c59f-001942-November-03-9iARsVaa.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::note
If you can't edit the products on the paywall, it means that the paywall is not in the draft state. You can duplicate it or create a new paywall, and then [select the new paywall in the placement](add-audience-paywall-ab-test) .
:::