---
title: "Initial integration with Google Play"
description: "Get started with Adapty on Android and set up your app for efficient subscription management."
metadataTitle: "Getting Started with Android | Adapty Docs"
---

We're thrilled to have you on board with Adapty! Our priority is to help you hit the ground running and achieve the best possible outcomes. This guide is designed to get you started with Adapty if your app is available in the Google Play Store.

Integrating Adapty into your mobile app involves establishing connections between your app and Adapty at both Google Play and SDK levels. While the process may appear extensive, following the built-in onboarding in the Adapty Dashboard or the instructions below will simplify it, typically taking no more than 1 hour.

## Checklist for the initial integration

- [ ] Once you create an account in Adapty and provide your mobile app name and category, we set up the app for you within our Adapty platform.
- [ ] [Enable Developer APIs](enabling-of-devepoler-api) in Google Cloud Console
- [ ] [Create a service account](create-service-account) in the Google Cloud Console
- [ ] [Grant permissions to the service account](grant-permissions-to-service-account) in the Google Play Console
- [ ] [Generate the service account key file](create-service-account-key-file)  in the Google Cloud Console
- [ ] [Configure Google Play integration](google-play-store-connection-configuration) itself in the Adapty Dashboard
- [ ] [Enable Real-time developer notifications (RTDN)](enable-real-time-developer-notifications-rtdn) in the Google Play Console
- [ ] Install and configure AdaptySDKs (you may install SDKs for one or more frameworks, whatever are needed)
  - [ ] [Install Adapty SDKs for Android](sdk-installation-android)
   - [ ] [Install Adapty SDKs for Flutter](sdk-installation-flutter)
  - [ ] [Install Adapty SDKs for React Native](sdk-installation-reactnative)
  - [ ] [Install Adapty SDKs for Unity](sdk-installation-unity)
- [ ] Build your application and run it. Running as a snapshot or in a sandbox environment is sufficient.

:::note
It takes at least 24 hours for changes to take effect but there's a [hack](https://stackoverflow.com/a/60691844). In [Google Play Console](https://play.google.com/apps/publish/), open any application and in the **Monetize** section go to **Products** -> **Subscriptions**/**In-app products**. Change the description of any product and save the changes. Everything should be working now, you can revert in-app changes.
:::

After the initial integration is complete, you [can begin using Adapty's features](product). 

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to make changes to your app's code. Specifically, you need to [display the paywalls](android-quickstart-paywalls) at least and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](android-making-purchases) within your app.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::