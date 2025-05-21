---
title: "Display paywalls designed with remote config"
description: "Display remote config paywalls in Adapty for improved conversions."
metadataTitle: "Displaying Remote Config Paywalls | Adapty Docs"
displayed_sidebar: sdkios

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

With Adapty, you can configure paywalls remotely and define the products your app will display—no need to hardcode the products. The only thing you’ll need to hardcode is the [placement ID](placements).

There are two ways to customize a paywall in the Adapty Dashboard:

- The no-code [**Paywall Builder**](adapty-paywall-builder)
- The flexible [**remote config**](customize-paywall-with-remote-config), a JSON file that contains the data needed to render the paywall on the device

This guide covers **Remote Config paywalls** only. The process for displaying and handling interactive elements is different for Paywall Builder paywalls. If you’d like to learn more about that, check out the [Display paywalls designed with Paywall Builder](display-pb-paywalls) guide.

<SampleApp />

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