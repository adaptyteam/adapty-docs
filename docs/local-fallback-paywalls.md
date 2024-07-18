---
title: "Download fallback paywalls"
description: "Explore how fallback paywalls ensure uninterrupted in-app purchases, even without an internet connection. Learn how Adapty's innovative solutions empower developers to define fallback paywalls for a seamless user experience."
metadataTitle: "Fallback Paywalls: Ensuring Seamless In-App Purchases | Adapty"
---

A paywall is an in-app storefront where customers can see and purchase products within your mobile app. Typically, paywalls are fetched from the server when a customer accesses them. 

Adapty allows you to define fallback paywalls for the situations when a user opens the app without a connection to the Adapty backend (e.g., no internet connection or in the rare case of backend unavailability) and there's no cache on the device.

Adapty generates fallbacks as a JSON file in the necessary format, reflecting the default (English) versions of the paywalls you've configured in the Adapty Dashboard. Simply download the file - one per app store, place it alongside your app on the user's device, and pass its contents to the `.setFallbackPaywalls` method, following the instructions outlined below.

<details>
   <summary>Before you start adding local fallback paywalls (Click to Expand)</summary>

   1. [Create products](create-product) you want to sell.
2. [Create paywalls and add the products to the paywalls](create-paywall). Paywalls are in-app stores in your mobile apps.
3. [Create placements and add paywalls to the placements](create-placement). Placement is the location where the paywall will be shown.
</details>

To download the JSON file with the fallback paywalls:

1. Open the **[Paywalls and Products](https://app.adapty.io/products)** section from the Adapty main menu, then select the **Products** tab or just the **[Placements](https://app.adapty.io/placements)** section in the Adapty main menu.

   
<img
  src={require('./img/9c63367-placements.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>



2. In the **Products** or **Placements** window, click the **Fallbacks** button. In both cases, you will get the same file. [Use its contents in the `fallback_paywalls` method in your mobile app code](fallback-paywalls#use-fallback-paywalls-in-your-mobile-app-code).