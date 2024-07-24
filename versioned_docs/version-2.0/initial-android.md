---
title: "Initial integration with Google Play"
description: "Get started with Adapty's initial integration process with the Googple Play Store, ensuring seamless connectivity and enabling access to Adapty's powerful features for optimizing user engagement. Explore step-by-step instructions for integrating your mobile app with Adapty and start leveraging its capabilities today"
metadataTitle: "Adapty Initial Integration with Google Play Store: A Quick Guide"
---

We're thrilled to have you on board with Adapty! Our priority is to help you hit the ground running and achieve the best possible outcomes. This guide is designed to get you started with Adapty if your app is available in the Google Play Store.

Integrating Adapty into your mobile app involves establishing connections between your app and Adapty at both Google Play and SDK levels. While the process may appear extensive, following the built-in onboarding in the Adapty Dashboard or the instructions below will simplify it, typically taking no more than 1 hour.

## Checklist for the initial integration

- [ ] Once you create an account in Adapty and provide your mobile app name and category, we set up the app for you within our Adapty platform. If you need to set up an additional app, you can easily [add your mobile app to Adapty](register-your-mobile-application-in-adapty) yourself.
- [ ] [Enable Developer APIs](enabling-of-devepoler-api) in Google Cloud Console
- [ ] [Create a service account](create-service-account) in the Google Cloud Console
- [ ] [Grant permissions to the service account](grant-permissions-to-service-account) in the Google Play Console
- [ ] [Generate the service account key file](create-service-account-key-file)  in the Google Cloud Console
- [ ] [Configure Google Play integration](google-play-store-connection-configuration) itself in the Adapty Dashboard
- [ ] [Enable Real-time developer notifications (RTDN)](enable-real-time-developer-notifications-rtdn) in the Google Play Console
- [ ] Install and configure AdaptySDKs (you may install SDKs for one or more frameworks, whatever are needed)
  - [ ] [Install Adapty SDKs for Android](adapty-sdk-installation-android)
  - [ ] [Install Adapty SDKs for Flutter](flutter-adapty-sdk-installation-and-configuration)
  - [ ] [Install Adapty SDKs for React Native](sdk-installation-reactnative)
  - [ ] [Install Adapty SDKs for Unity](sdk-installation-unity)
- [ ] Build your application and run it. Running as a snapshot or in a sandbox environment is sufficient.

After the initial integration is complete, you [can begin using Adapty's features](paywalls-products-and-placements). 

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to make changes to your app's code. Specifically, you need to [display the paywalls](display-pb-paywalls) at least and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::