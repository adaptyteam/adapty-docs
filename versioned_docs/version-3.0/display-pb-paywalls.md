---
title: "Display paywalls designed with Paywall Builder"
description: ""
metadataTitle: ""
---

With Adapty, you have the flexibility to configure paywalls remotely, defining the products to display in your app. This streamlined process eliminates the need to hardcode your products.

There are 2 ways to customize a paywall in the Adapty Dashboard: 

- simple no-code tool called [**Paywall Builder**](adapty-paywall-builder) 
- flexible [**remote config**](customize-paywall-with-remote-config), a JSON with data needed to render the paywall on the device

This topic describes the flow only for **Paywall Builder paywalls**. Displaying and handling the interactive parts of the paywall is different for remote config paywalls, so if you want to know more about it, please refer to the [Display remote config paywalls](display-remote-config-paywalls) topic.

If you've [designed a paywall using the Paywall Builder](adapty-paywall-builder), you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains what should be shown within the paywall, how it should be shown, and how to process user's actions like making purchases. Moreover, this paywall takes care of logging the paywall view event on its own, so you don't need to worry about ensuring analytics receives the data. 

However, some coding still remains necessary. For instance, you'll need to retrieve the paywall itself, display it within the mobile app, and respond to the events it generates.

<details>
   <summary>Before you start displaying paywalls (click to expand)</summary>

   1. [Create your products in the Adapty dashboard](create-product)

2. [Create a paywall in the Adapty Dashboard and incorporate the products into it](create-paywall) 

3. [Create a placement and incorporate your paywall into it](create-placement)

4. Install [AdaptySDK](installation) and [AdaptyUI SDK](paywall-builder-installation).
</details>

## How to display and process paywalls created in the Paywall Builder

1. [Fetch the paywall to show in the specific placement](https://docs.adapty.io/docs/get-pb-paywalls).
2. [Show the paywall](present-pb-paywalls).
3. [Handle the events produced by the paywall](handling-visual-paywall-events-copy).