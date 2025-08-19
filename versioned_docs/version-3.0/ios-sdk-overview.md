---
title: "iOS SDK overview"
description: "Learn about Adapty iOS SDK and its key features."
metadataTitle: "iOS SDK Overview | Adapty Docs"
slug: /ios-sdk-overview
displayed_sidebar: sdkios
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-iOS.svg?style=flat&logo=apple)](https://github.com/adaptyteam/AdaptySDK-iOS/releases)

Welcome! We're here to make in-app purchases a breeze 🚀

We've built the Adapty iOS SDK to take the headache out of in-app purchases so you can focus on what you do best – building amazing apps. Here's what we handle for you:

- Handle purchases, receipt validation, and subscription management out of the box
- Create and test paywalls without app updates
- Get detailed purchase analytics with zero setup - cohorts, LTV, churn, and funnel analysis included
- Keep the user subscription status always up to date across app sessions and devices
- Integrate your app with marketing attribution and analytics services using just one line of code

:::note
Before diving into the code, you'll need to integrate Adapty with App Store Connect and set up products in the dashboard. Check out our [quickstart guide](quickstart.md) to get everything configured first.
:::

## Get started

:::tip
Our docs are optimized for use with LLMs. Check out [this article](adapty-cursor.md) to learn how to get the best results when integrating the Adapty SDK using AI with our docs.
:::

Here's what we'll cover in the integration guide:

1. [Install & configure SDK](sdk-installation-ios.md): Add the SDK as a dependency to your project and activate it in the code.
2. [Enable purchases through paywalls](ios-quickstart-paywalls.md): Set up the purchase flow so users can buy products.
3. [Check the subscription status](ios-check-subscription-status.md): Automatically check the user's subscription state and control their access to paid content.
4. [Identify users (optional)](ios-quickstart-identify.md): Associate users with their Adapty profiles to ensure their data is stored consistently across devices.

:::note
Migrating to Adapty from RevenueCat? Check out our [guide](migration-from-revenuecat.md) to make this experience as simple as possible.
:::

### See it in action

Want to see how it all comes together? We've got you covered:

- **Sample apps**: Check out our [complete examples](https://github.com/adaptyteam/AdaptySDK-iOS/tree/master/Examples) that demonstrate the full setup
- **Video tutorials**: Follow along with our step-by-step implementation videos below

<Tabs groupId="current-os" queryString>
<TabItem value="swiftui" label="iOS (SwiftUI)" default> 

<div style={{ textAlign: 'center' }}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/cSChHc8k2zA?si=KhNFhqXccIzYwTcm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
</TabItem>
<TabItem value="uikit" label="iOS (UIKit)" default> 

<div style={{ textAlign: 'center' }}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/WEUnlaAjSI0?si=sjXKVVb56tEHDKzJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
</TabItem>
</Tabs>


To start using the Adapty SDK, you need to understand Adapty's main concepts and integrate the SDK into your app.

## Main concepts

Before diving into the code, let's get familiar with the key concepts that make Adapty work. 

The beauty of Adapty's approach is that only placements are hardcoded in your app. Everything else – products, paywall designs, pricing, and offers – can be managed flexibly from the Adapty dashboard without app updates:

1. **Product** - Anything available for purchase in your app – subscription, consumable product, or lifetime access.

2. **Paywall** - The only way to retrieve products from Adapty and use it to its full power. We've designed it this way to make it easier to track how different product combinations affect your monetization metrics. A paywall in Adapty serves as both a specific set of your products and the visual configuration that accompanies them.

3. **Placement** - A strategic point in your user journey where you want to show a paywall. Think of placements as the "where" and "when" of your monetization strategy. Common placements include:
   - `main` - Your primary paywall location
   - `onboarding` - Shown during the user onboarding flow
   - `settings` - Accessible from your app's settings

   Start with the basics like `main` or `onboarding` for your first integration, then think about where else in your app users might be ready to purchase.

4. **Profile** - When users purchase a product, their profile is assigned an **access level** which you use to define access to paid features.
