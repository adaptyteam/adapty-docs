---
title: "Initial integration with the App Store"
description: "Get started with Adapty's initial integration process with the App Store, ensuring seamless connectivity and enabling access to Adapty's powerful features for optimizing user engagement. Explore step-by-step instructions for integrating your mobile app with Adapty and start leveraging its capabilities today"
metadataTitle: "Adapty Initial Integration with App Store: A Quick Guide"
---

We're thrilled to have you on board with Adapty! Our priority is to help you hit the ground running and achieve the best possible outcomes for your app. This guide is designed to get you started with Adapty if your app is available in the App Store.

Integrating Adapty into your mobile app involves establishing connections between your app and Adapty at both the App Store and SDK levels. Though it may seem hard on the surface, following the onboarding in Adapty Dashboard or these instructions will help you accomplish this in no more than 30 minutes.

## Guide for the initial integration

- [ ] Once you create an account in Adapty and provide your mobile app name and category, we set up the app for you within our Adapty platform. If you need to set up an additional app, you can easily [add your mobile app to Adapty](register-your-mobile-application-in-adapty) yourself.
- [ ] [Generate In-App Purchase Key](generate-in-app-purchase-key) in the App Store Connect
- [ ] [Configure App Store integration](app-store-connection-configuration) itself in the Adapty dashboard and App Store Connect
- [ ] [Enable App Store server notifications](enable-app-store-server-notifications)  in the App Store Connect
- [ ] Install AdaptySDKs for the frameworks you're using: 
  - [ ] [Install Adapty SDKs for native iOS](sdk-installation-ios)
  - [ ] [Install Adapty SDKs for Flutter](sdk-installation-flutter)
  - [ ] [Install Adapty SDKs for React Native](sdk-installation-reactnative)
  - [ ] [Install Adapty SDKs for Unity](sdk-installation-unity)
- [ ] Build your application and run it in sandbox mode.

After the initial integration is complete, you [can begin using Adapty's features](paywalls-products-and-placements). 

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to make changes to your app's code. Specifically, you need to [display the paywalls](display-pb-paywalls) at least and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](https://docs.adapty.io/docs/release-checklist) . This will ensure that you've completed all the necessary steps  before your app goes live with Adapty SDK onboard.
:::