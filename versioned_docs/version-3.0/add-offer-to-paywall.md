---
title: "Add offer to paywall"
description: "Learn how to make an offer visible and selectable within a Adapty paywall for your app's users"
metadataTitle: "How to use App Store and Google Play offers to empower your paywalls"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Offers in the App Store and Google Play are special deals or discounts provided by these platforms for in-app purchases.

To make an offer visible and selectable within a [paywall](paywalls) for your app's users, follow these steps:

1. While [configuring the products on a paywall](create-paywall), choose an offer you [created earlier](create-offer) for this product from the **Offer** list. The list is available only for the products that have offers.

   

<Zoom>
  <img src={require('./img/3a727c2-add_offer_to_paywall.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::info

Paywalls created with the Adapty Paywall Builder will display only the first phase of a [multi-phase Google subscription offer](https://support.google.com/googleplay/android-developer/answer/12154973). However, rest assured that when a user purchases the product, all offer phases will be applied as configured in Google Play.

:::

