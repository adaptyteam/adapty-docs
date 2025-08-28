---
title: "Offers in Google Play"
description: "Configure Google Play offers to improve app monetization and retention."
metadataTitle: "Google Play Offers Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In Google Play, offers of any type (free trials or discounted payments) are added as **offers**. To create an offer, you must first, create a subscription and add an auto-recurring base plan.

:::note
With Billing Library v5, Google introduced a new way of working with offers. It gives you much more flexibility, but it's important to configure them properly. After reading this short guide from Adapty, you'll have a full understanding of Google Play Offers.

Offers in Google Play are supported in the Adapty SDK 2.6 or newer.
:::


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

You can create multiple offers for every base plan, and this means that you have to decide which offer should be used at a given moment. Please check the docs on [base plans](android-products) if you're not familiar with them.

<Zoom>
  <img src={require('./img/c0b1dfa-001930-November-03-XYnbieeu.webp').default}
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
  <img src={require('./img/75a5d69-eb0bc9a-001931-November-03-eQdthUMx.webp').default}
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
  <img src={require('./img/ff282c2-c0b1dfa-001930-November-03-XYnbieeu.webp').default}
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
  <img src={require('./img/ee302dc-a506e5a-001934-November-03-TVBLOz2L.webp').default}
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
  <img src={require('./img/d6267f3-a48f79e-001936-November-03-A13wutRh.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<p> </p>

:::info

Please note that paywalls created with the Adapty Paywall Builder will display only the first phase of a multi-phase Google subscription offer. However, rest assured that when a user purchases the product, all offer phases will be applied as configured in Google Play.

   :::


5. Activate the offer to use it in the app.

   

<Zoom>
  <img src={require('./img/d3fc09b-f149ba6-001937-November-03-MO9Gz3ap.webp').default}
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
  <img src={require('./img/0800923-001938-November-03-ANtSI48t.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The `1-month` plan has three offers: `free-trial-1-week` (1), `free-trial-3-days` (2), `pay-up-front-3months-30p` (3). The `1-year` plan has one offer: `free-trial-1-week` (1). As you can see, offer IDs can be the same for different base plans.