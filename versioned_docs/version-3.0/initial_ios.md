---
title: "Initial integration with the App Store"
description: "Get started with Adapty on iOS to streamline subscription setup and management."
metadataTitle: "Getting Started with iOS | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

We're thrilled to have you on board with Adapty! Our priority is to help you hit the ground running and achieve the best possible outcomes for your app. This guide is designed to get you started with Adapty if your app is available in the App Store.

Integrating Adapty into your mobile app involves establishing connections between your app and Adapty at both the App Store and SDK levels. Though it may seem hard on the surface, following the onboarding in Adapty Dashboard or these instructions will help you accomplish this in no more than 30 minutes.

## Guide for the initial integration

- [ ] Once you create an account in Adapty and provide your mobile app name and category, we set up the app for you within our Adapty platform.
- [ ] [Generate In-App Purchase Key](generate-in-app-purchase-key) in the App Store Connect
- [ ] [Configure App Store integration](app-store-connection-configuration) itself in the Adapty dashboard and App Store Connect
- [ ] [Enable App Store server notifications](enable-app-store-server-notifications)  in the App Store Connect
- [ ] Install AdaptySDKs for the frameworks you're using: 
  - [ ] [Install Adapty SDKs for native iOS](sdk-installation-ios)
- [ ] Build your application and run it in sandbox mode.

After the initial integration is complete, you [can begin using Adapty's features](product). 

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to make changes to your app's code. Specifically, you need to [display the paywalls](ios-quickstart-paywalls.md) at least and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](ios-making-purchases) within your app.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) . This will ensure that you've completed all the necessary steps  before your app goes live with Adapty SDK onboard.
:::