---
title: "Integrate the Adapty SDK in your app code"
description: "Integrate Adapty with App Store, Google Play, custom stores, Stripe, and Paddle."
metadataTitle: "Integrate with stores or web payments and set up products | Adapty Docs"
---

Integrate Adapty SDK into your app to:

- Enable in-app purchases
- Display paywalls and onboardings to your users
- Get detailed analytics for in-app purchases
- Automatically track subscription status changes
- Integrate your app with popular services using just one line of code

Currently, Adapty has the following SDKs available:

[**Adapty iOS SDK**](ios-sdk-overview.md) | [**Adapty Android SDK**](android-sdk-overview.md) | [**Adapty Flutter SDK**](flutter-sdk-overview.md)

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-iOS.svg?style=flat&logo=apple)](https://github.com/adaptyteam/AdaptySDK-iOS/releases) &nbsp; &nbsp;[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Android.svg?style=flat&logo=android)](https://github.com/adaptyteam/AdaptySDK-Android/releases) &nbsp; &nbsp; &nbsp; &nbsp; [![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Flutter.svg?style=flat&logo=flutter)](https://github.com/adaptyteam/AdaptySDK-Flutter/releases)


[**Adapty React Native SDK**](react-native-sdk-overview.md) | [**Adapty Unity SDK**](unity-sdk-overview.md)

&nbsp; &nbsp; &nbsp; &nbsp;[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-React-Native.svg?style=flat&logo=react)](https://github.com/adaptyteam/AdaptySDK-React-Native/releases)  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-Unity.svg?style=flat&logo=unity)](https://github.com/adaptyteam/AdaptySDK-Unity/releases)


## How does it work

For the basic implementation of the Adapty SDK, you need to take care of four things only:

1. Install and initialize the SDK.
2. Enable in-app purchases.
3. Identify users in the app.
4. Listen to the profile updates to control whether paid content is available.

The order and details may vary from app to app, but basically that's it.

## Get started

To get started, follow platform-specific quickstart guides: Guides contain production-ready code snippets, so implementation doesn't take long.
  - **[iOS](ios-sdk-overview.md)**
  - **[Android](android-sdk-overview.md)**
  - **[Flutter](flutter-sdk-overview.md)**
  - **[React Native](react-native-sdk-overview.md)**
  - **[Unity](unity-sdk-overview.md)**

:::note
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our sample apps:
  - [iOS (Swift)](https://github.com/adaptyteam/AdaptySDK-iOS/tree/master/Examples)
  - [Android (Kotlin)](https://github.com/adaptyteam/AdaptySDK-Android)
  - [Flutter (Dart)](https://github.com/adaptyteam/AdaptySDK-Flutter/tree/master/example)
  - [React Native (Pure RN)](https://github.com/adaptyteam/AdaptySDK-React-Native/tree/master/examples/AdaptyRnSdkExample)
  - [React Native (Expo)](https://github.com/adaptyteam/Focus-Journal-React-Native-Expo)
  - [Unity (C#)](https://github.com/adaptyteam/AdaptySDK-Unity)
:::

## Next steps

Once you've configured the Adapty SDK in the app code, you can move on to [testing the implementation](quickstart-test.md).