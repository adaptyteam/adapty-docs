---
title: "Display paywalls designed with new Paywall Builder"
description: "Learn how to display PB paywalls effectively in Adapty to optimize revenue."
metadataTitle: "Displaying PB Paywalls in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

With Adapty, you can configure paywalls remotely and define which products to display in your app, eliminating the need to hardcode products.

:::warning
This guide covers the process for **new Paywall Builder paywalls** only. The new Paywall Builder works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher.

- For displaying **legacy Paywall Builder paywalls**, check out [Display paywalls designed with legacy Paywall Builder](display-legacy-pb-paywalls).

- For displaying **remote config paywalls**, see [Display remote config paywalls](display-remote-config-paywalls).

:::

If you've [designed a paywall using the Paywall Builder](adapty-paywall-builder), you don’t need to worry about rendering it in your app’s code. The paywall itself handles what to display, how to display it, and how to process user actions like purchases. Additionally, it automatically logs the paywall view event, so you don’t need to ensure analytics receives the data. 

However, some coding is still required. You'll need to retrieve the paywall, display it within your app, and respond to the events it generates.

<SampleApp />

<details>
   <summary>Before you start displaying paywalls (click to expand)</summary>

   1. [Create your products in the Adapty dashboard](create-product)

2. [Create a paywall in the Adapty Dashboard and incorporate the products into it](create-paywall) 

3. [Create a placement and incorporate your paywall into it](create-placement)

4. Install [AdaptySDK](installation-of-adapty-sdks).
</details>

## How to display and process paywalls created in the Paywall Builder

1. [Fetch the paywall to show in the specific placement](get-pb-paywalls).
2. [Show the paywall](present-pb-paywalls).
3. [Handle the events produced by the paywall](handling-pb-paywall-events).