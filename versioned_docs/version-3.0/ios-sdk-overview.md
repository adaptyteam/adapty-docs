---
title: "iOS SDK overview"
description: "Learn about Adapty iOS SDK and its key features."
metadataTitle: "iOS SDK Overview | Adapty Docs"
slug: /ios-sdk-overview
displayed_sidebar: sdkios
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty SDK handles the complexity of in-app purchases so you can focus on building your app:

- Handle purchases, receipt validation, and subscription management out of the box
- Create and test paywalls without app updates
- Get detailed purchase analytics with zero setup - cohorts, LTV, churn, and funnel analysis included
- Keep the user subscription status always up to date across app sessions and devices

To start using the Adapty SDK, you need to understand Adapty's main concepts and integrate the SDK into your app.

## Main concepts

Regardless of how you want to work with in-app purchases, you need to understand the main concepts of Adapty to adjust the implementation to your needs.

:::note
For the SDK to function properly, you need to set up products, paywalls, and placements in the Adapty dashboard. If you or your team haven't done it yet, use [this guide](quickstart.md) first.
:::

### User profiles

A user profile contains all information about a user: their subscription status, purchase history, and custom attributes. 

The SDK automatically creates and updates profiles, and you can store additional user data like preferences or onboarding progress to use later for targeting and personalization.

### Products

A product is any item or content available for purchase. For example, it can be a subscription or a one-time purchase.

Each product corresponds to one product in the App Store. 

Products are organized into access levels that determine what content users can access.

<Zoom>
  <img src={require('./img/app-store-products.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Paywalls

A paywall is a container for one or more products. It can contain a visual paywall created in the paywall builder, product information, or JSON configuration for use in your code.

The easiest way to enable in-app purchases with Adapty is to create a paywall in the [builder](adapty-paywall-builder.md), as you only need to design it in the no-code builder for it to automatically render and handle purchases.

<Zoom>
  <img src={require('./img/sdk-paywall.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Placements

A placement is a rule for showing a paywall, onboarding, or A/B test at a certain point to a certain user group. One placement can contain several paywalls, so you can decide which users see which paywall.

When displaying a paywall, you pass a placement ID to retrieve the relevant paywall for that user.

<Zoom>
  <img src={require('./img/sdk-placement.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Get started

:::tip
Our docs are optimized for use with LLMs. Check out [this article](adapty-cursor.md) to learn how to get the best results when integrating the Adapty SDK using AI with our docs.
:::

Basic integration of the Adapty SDK into your app comprises four main steps:

1. [Install & configure SDK](sdk-installation-ios.md): Add the SDK as a dependency to your project and activate it in the code.
2. [Identify users](ios-quickstart-identify.md): Associate users with their Adapty profiles to ensure their data is stored consistently.
3. [Present a paywall](ios-quickstart-paywalls.md): Present a paywall to enable in-app purchases.
4. [Check the subscription status](ios-check-subscription-status.md): Automatically check the user's subscription state and control their access to paid content.


:::note
Migrating to Adapty from RevenueCat? Check out our [guide](migration-from-revenuecat.md) to make this experience as simple as possible.
:::