---
title: "Integrate the Adapty SDK in your app code"
description: "Integrate Adapty with App Store, Google Play, custom stores, Stripe, and Paddle."
metadataTitle: "Integrate with stores or web payments and set up products | Adapty Docs"
---

Integrate Adapty SDK into your app to:

- Handle purchases, receipt validation, and subscription management out of the box
- Create and test paywalls without app updates
- Get detailed purchase analytics with zero setup - cohorts, LTV, churn, and funnel analysis included
- Keep the user subscription status always up to date across app sessions and devices
- Integrate your app with marketing attribution and analytics services using just one line of code

## How does it work

For the basic implementation of the Adapty SDK, you need to take care of three things only:

1. Install and initialize the SDK.
2. Delegate handling in-app purchases to Adapty.
3. Monitor subscription status in the profile. Adapty determines subscription status, type, and expiration – the SDK just consumes this info.

The order and details may vary from app to app, but basically that's it.

## Get started

Choose your platform and dive right in:

**iOS**
- **[SDK Quickstart](ios-sdk-overview.md)** 
- **[Sample Apps](https://github.com/adaptyteam/AdaptySDK-iOS/tree/master/Examples)**

**Android**
- **[SDK Quickstart](android-sdk-overview.md)** 
- **[Sample App](https://github.com/adaptyteam/AdaptySDK-Android/tree/master/app)**

**Flutter**
- **[SDK Quickstart](flutter-sdk-overview.md)** 
- **[Sample App](https://github.com/adaptyteam/AdaptySDK-Flutter/tree/master/example)**

**React Native**
- **[SDK Quickstart](react-native-sdk-overview.md)**
- **[Sample Apps](https://github.com/adaptyteam/AdaptySDK-React-Native/tree/master/examples)**

**Unity**
- **[SDK Quickstart](unity-sdk-overview.md)**
- **[Sample App](https://github.com/adaptyteam/AdaptySDK-Unity/tree/main/Assets)**

**Capacitor (Beta)**
- **[SDK Quickstart](capacitor-sdk-overview.md)**
- **[Sample Apps](https://github.com/adaptyteam/AdaptySDK-Capacitor/tree/master/examples)**

**Kotlin Multiplatform**:
- **[SDK Quickstart](kmp-sdk-overview.md)**
- **[Sample App](https://github.com/adaptyteam/AdaptySDK-KMP/tree/main/example)**

## Next steps

Once you've configured the Adapty SDK in the app code, you can move on to [testing the implementation](quickstart-test.md).