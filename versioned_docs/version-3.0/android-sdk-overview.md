---
title: "Android SDK overview"
description: "Learn about Adapty Android SDK and its key features."
metadataTitle: "Android SDK Overview | Adapty Docs"
slug: /android-sdk-overview
displayed_sidebar: sdkandroid
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Android.svg?style=flat&logo=android)](https://github.com/adaptyteam/AdaptySDK-Android/releases)

Adapty SDK handles the complexity of in-app purchases so you can focus on building your app:

- Handle purchases, receipt validation, and subscription management out of the box
- Create and test paywalls without app updates
- Get detailed purchase analytics with zero setup - cohorts, LTV, churn, and funnel analysis included
- Keep the user subscription status always up to date across app sessions and devices
- Integrate your app with popular services using just one line of code

## Get started

:::tip
Our docs are optimized for use with LLMs. Check out [this article](adapty-cursor-android.md) to learn how to get the best results when integrating the Adapty SDK using AI with our docs.
:::

Basic integration of the Adapty SDK into your app comprises four main steps:

1. [Install & configure SDK](sdk-installation-android.md): Add the SDK as a dependency to your project and activate it in the code.
2. [Present a paywall](android-quickstart-paywalls.md): Present a paywall to enable in-app purchases.
3. [Identify users](android-quickstart-identify.md): Associate users with their Adapty profiles to ensure their data is stored consistently.
4. [Check the subscription status](android-check-subscription-status.md): Automatically check the user's subscription state and control their access to paid content.

:::tip
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our [sample app](https://github.com/adaptyteam/AdaptySDK-Android), which demonstrates the full setup, including displaying paywalls, making purchases, and other basic functionality.
:::

:::note
Migrating to Adapty from RevenueCat? Check out our [guide](migration-from-revenuecat.md) to make this experience as simple as possible.
:::

To start using the Adapty SDK, you need to understand Adapty's main concepts and integrate the SDK into your app.

## Main concepts

:::note
For the SDK to function properly, you need to set up products, paywalls, and placements in the Adapty dashboard. If you or your team haven't done it yet, use [this guide](quickstart.md) first.
:::

Regardless of how you want to work with in-app purchases, you need to understand the main concepts of Adapty to adjust the implementation to your needs.

1. Anything available for purchase in your app – subscription, consumable product, or lifetime access – is called **product** in Adapty.
2. In Adapty, to enable in-app purchases, you must create a **paywall**. Paywall is the only way to retrieve **products** from Adapty.
   It will allow you to flexibly manage what you offer without modifying the code and hardcoding values.
3. To be able to get a paywall at a certain point in the user's journey, you must associate this paywall with a **placement**.
4. When users purchase a product, their **profile** is assigned an **access level** which you must use to define access to paid features.

<Zoom>
  <img src={require('./img/sdk-overview.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>