---
title: "Flutter SDK overview"
description: "Learn about Adapty Flutter SDK and its key features."
metadataTitle: "Flutter SDK Overview | Adapty Docs"
slug: /flutter-sdk-overview
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Flutter.svg?style=flat&logo=flutter)](https://github.com/adaptyteam/AdaptySDK-Flutter/releases)

Welcome! We're here to make in-app purchases a breeze 🚀

We've built the Adapty Flutter SDK to take the headache out of in-app purchases so you can focus on what you do best – building amazing apps. Here's what we handle for you:

- Handle purchases, receipt validation, and subscription management out of the box
- Create and test paywalls without app updates
- Get detailed purchase analytics with zero setup - cohorts, LTV, churn, and funnel analysis included
- Keep the user subscription status always up to date across app sessions and devices
- Integrate your app with marketing attribution and analytics services using just one line of code

:::note
Before diving into the code, you'll need to integrate Adapty with App Store Connect and Google Play Console, then set up products in the dashboard. Check out our [quickstart guide](quickstart.md) to get everything configured first.
:::

## Get started

:::tip
Our docs are optimized for use with LLMs. Check out [this article](adapty-cursor-flutter.md) to learn how to get the best results when integrating the Adapty SDK using AI with our docs.
:::

Here's what we'll cover in the integration guide:

1. [Install & configure SDK](sdk-installation-flutter.md): Add the SDK as a dependency to your project and activate it in the code.
2. [Enable purchases through paywalls](flutter-quickstart-paywalls.md): Set up the purchase flow so users can buy products.
3. [Check the subscription status](flutter-check-subscription-status.md): Automatically check the user's subscription state and control their access to paid content.
4. [Identify users (optional)](flutter-quickstart-identify.md): Associate users with their Adapty profiles to ensure their data is stored consistently across devices.

:::note
Migrating to Adapty from RevenueCat? Check out our [guide](migration-from-revenuecat.md) to make this experience as simple as possible.
:::

### See it in action

Want to see how it all comes together? We've got you covered:

- **Sample app**: Check out our [complete example](https://github.com/adaptyteam/AdaptySDK-Flutter/tree/master/example) that demonstrates the full setup

## Main concepts

Before diving into the code, let's get familiar with the key concepts that make Adapty work. 

The beauty of Adapty's approach is that only placements are hardcoded in your app. Everything else – products, paywall designs, pricing, and offers – can be managed flexibly from the Adapty dashboard without app updates:

1. [**Product**](product.md) - Anything available for purchase in your app – subscription, consumable product, or lifetime access.

2. [**Paywall**](paywalls.md) - The only way to retrieve products from Adapty and use it to its full power. We've designed it this way to make it easier to track how different product combinations affect your monetization metrics. A paywall in Adapty serves as both a specific set of your products and the visual configuration that accompanies them.

3. [**Placement**](placements.md) - A strategic point in your user journey where you want to show a paywall. Think of placements as the "where" and "when" of your monetization strategy. Common placements include:
   - `main` - Your primary paywall location
   - `onboarding` - Shown during the user onboarding flow
   - `settings` - Accessible from your app's settings

   Start with the basics like `main` or `onboarding` for your first integration, then [think about where else in your app users might be ready to purchase](choose-meaningful-placements.md).

4. [**Profile**](profiles-crm.md) - When users purchase a product, their profile is assigned an **access level** which you use to define access to paid features.