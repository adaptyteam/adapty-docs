---
title: "Fetch Paywall Builder paywalls and their configuration"
description: "Learn how to retrieve PB paywalls in Adapty for better subscription control (Android)."
metadataTitle: "Retrieving PB Paywalls in Adapty | Adapty Docs"
displayed_sidebar: sdkandroid
keywords: ['getPaywall', 'getPaywallConfiguration', 'getViewConfiguration', 'createPaywallView', 'getPaywallForDefaultAudience']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

After [you designed the visual part for your paywall](adapty-paywall-builder) with the new Paywall Builder in the Adapty Dashboard, you can display it in your mobile app. The first step in this process is to get the paywall associated with the placement and its view configuration as described below.

:::warning
The new Paywall Builder works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. For presenting paywalls in Adapty SDK v2 designed with the legacy Paywall Builder, see [Display paywalls designed with legacy Paywall Builder](present-pb-paywalls).
:::

Please be aware that this topic refers to Paywall Builder-customized paywalls. For guidance on fetching remote config paywalls, please refer to the [Fetch paywalls and products for remote config paywalls in your mobile app](fetch-paywalls-and-products) topic.

<SampleApp />

<details>
   <summary>Before you start displaying paywalls in your mobile app (click to expand)</summary>

   1. [Create your products](create-product) in the Adapty Dashboard.
2. [Create a paywall and incorporate the products into it](create-paywall) in the Adapty Dashboard.
3. [Create placements and incorporate your paywall into it](create-placement) in the Adapty Dashboard.
4. Install [Adapty SDK](installation-of-adapty-sdks) in your mobile app.
</details>

// ... existing code ... 