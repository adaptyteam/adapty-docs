---
title: "Display paywalls designed with remote config"
description: ""
metadataTitle: ""
---
import Details from '@site/src/components/Details';

With Adapty, you have the flexibility to configure paywalls remotely, defining the products your app will display. This process eliminates the need to hardcode your products. The only thing you hardcode is the [placement ID](placements).

There are 2 ways to customize a paywall in the Adapty Dashboard: 

- a simple no-code tool called [**Paywall Builder**](/3.0/adapty-paywall-builder) 
- flexible [**remote config**](customize-paywall-with-remote-config), a JSON with data needed to render the paywall on the device

This topic describes the flow only for **Remote Config paywalls**. Displaying and handling the interactive parts of the paywall is different for Paywall Builder paywalls, so if you want to know more about it, please consult the [Display paywalls designed with Paywall Builder](display-pb-paywalls) topic.

<details>
   <summary>Before you start displaying paywalls (click to expand)</summary>

   1. [Create your products in the Adapty dashboard](create-product).
2. [Create a paywall in the Adapty Dashboard and incorporate the products into your paywall](create-paywall).
3. [Create placements and incorporate your paywall into the placement](create-placement).
4. [Install Adapty SDK](installation-of-adapty-sdks) in your mobile app.
</details>

## How to display and process paywalls designed by the remote config

1. [Fetch the paywall and products to show in the specific placement](fetch-paywalls-and-products).
2. [Render the paywall](present-remote-config-paywalls).