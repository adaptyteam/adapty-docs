---
title: "Adapty Plugin for FlutterFlow"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

  <a href="https://app.adapty.io/flutterflow-offer/">
    <img
      src={require('./img/adapty-plugin-banner.png').default}
      alt="Adapty Plugin Banner"
      style={{
        border: '1px solid #727272', // border width and color
        width: '700px', // image width
        display: 'block', // for alignment
        margin: '0 auto', // center alignment
      }}
    />
  </a>

:::tip
[Start using Adapty with FlutterFlow and get 3 months for free!](https://app.adapty.io/flutterflow-offer/.)
:::

Adapty is a versatile platform designed to help mobile apps grow. Whether you’re just starting out or already have thousands of users, Adapty lets you save months on integrating in-app purchases and double subscription revenue with paywall management.

:::info
The Adapty plugin will be available with the release of FlutterFlow 5.0 on September 24th.
:::

The Adapty plugin for FlutterFlow lets you leverage all of Adapty’s features without any coding. You can design paywall pages in FlutterFlow, enable purchases for them and then remotely control which products get displayed on them, including targeting to specific user groups or A/B testing. And after you release your app, you can instantly access detailed analytics of your customers purchases right in our dashboard.

Want to update the products available on your paywall? It’s simple! Make changes in just a few clicks within the Adapty Dashboard, and your customers will see the new products immediately — no need to release a new app version!

What else Adapty offers you:

- **Subscriptions and in-App Purchases**: Adapty handles server-side receipt validation for you and syncs your customers across all platforms, including the web.
- **A/B Testing for paywalls**: Test different prices, durations, trial periods, and visual elements to optimize your subscription and one-time offerings.
- **Powerful analytics**: Access detailed metrics to better understand and improve your app’s monetization.
- **Integrations**: Adapty seamlessly connects with third-party analytics tools like Amplitude, AppsFlyer, Adjust, Branch, Mixpanel, Facebook Ads, AppMetrica, custom Webhooks, and more.

## What's next?

1. [Add the Adapty plugin as a dependency](ff-getting-started) to your FlutterFlow project and initiate it.
2. [Create an action flow](https://adapty.io/docs/ff-action-flow) for handling Adapty paywall products and their data in FlutterFlow.
3. [Map the received data to the paywall](https://adapty.io/docs/ff-add-variables-to-paywalls) you designed in FlutterFlow.
4. [Set up the purchase button](https://adapty.io/docs/ff-make-purchase) on your paywall to process transactions through Adapty when clicked.
5. Finally, [add subscription status checks](https://adapty.io/docs/ff-check-subscription-status) to determine whether to display paid content to the user.
