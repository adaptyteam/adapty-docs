---
title: "Display paywalls in Observer mode"
description: ""
metadataTitle: ""
---

Depending on whether you designed your paywalls with Paywall Builder or remote config, the flow will be slightly different:

- Paywalls designed with remote config may contain various data as it allows for any kind of JSON content. However, in this case, you're the one responsible for interpreting that data and rendering your paywall. Refer to the [Present remote config paywalls](display-paywalls-in-observer-mode#present-remote-config-paywalls) section below for details on how to display them in Observer mode.
- However, paywalls designed with Paywall Builder contain both what should be shown within the paywall and how it should be shown. Follow the instructions in the [Present Paywall Builder paywalls](display-paywalls-in-observer-mode#present-paywall-builder-paywalls) section below to display them in the Observer mode.

## Present Paywall Builder paywalls

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

<details>
   <summary>Before you start displaying paywalls (Click to Expand)</summary>

   1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions [for iOS](sdk-installation-ios#configure-adapty-sdk), [for Android](adapty-sdk-installation-android#configure-adapty-sdk), [for Flutter](sdk-installation-flutter#configure-adapty-sdks-for-ios), [for React Native](sdk-installation-reactnative#configure-adapty-sdks), and [for Unity](sdk-installation-unity#initiate-adapty-unity-plugin-on-ios).
3. [Create products](create-product) in the Adapty Dashboard.
4. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
</details>

To display paywalls designed with Paywall Builder in your mobile app:

1. [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) in your mobile app code.
2. Present Paywall Builder paywalls:

   - [on iOS](ios-present-paywall-builder-paywalls-in-observer-mode) 
   - [on Android](android-present-paywall-builder-paywalls-in-observer-mode)

:::warning
Don't forget to [Associate paywalls to purchase transactions](associate-paywalls-to-transactions). Otherwise, Adapty will not determine the source paywall of the purchase.
:::

## Present remote config paywalls

With Adapty, you have the flexibility to configure paywalls remotely, defining the products and the visuals your app will display. This process eliminates the need to hardcode your products. The only thing you hardcode is the [placement ID](placements).

<details>
   <summary>Before you start displaying paywalls (Click to Expand)</summary>

   1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions [for iOS](sdk-installation-ios#configure-adapty-sdk), [for Android](adapty-sdk-installation-android#configure-adapty-sdk), [for Flutter](sdk-installation-flutter#configure-adapty-sdks-for-ios), [for React Native](sdk-installation-reactnative#configure-adapty-sdks), and [for Unity](sdk-installation-unity#initiate-adapty-unity-plugin-on-ios).
3. [Create products](create-product) in the Adapty Dashboard.
4. [Configure paywalls, assign products to them](create-paywall) and specify your remote config in the Adapty Dashboard.
5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
</details>

To display remote config paywalls in your mobile app:

1. [Fetch a paywall and products for it](fetch-paywalls-and-products) in your mobile app code.
2. [Render a paywall using its remote config](present-remote-config-paywalls)

:::warning
Don't forget to [Associate paywalls to purchase transactions](associate-paywalls-to-transactions). Otherwise, Adapty will not determine the source paywall of the purchase.
:::