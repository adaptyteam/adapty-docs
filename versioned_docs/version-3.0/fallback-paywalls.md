---
title: "Fallback paywalls"
description: "Use fallback paywalls to ensure seamless user experience in Adapty."
metadataTitle: "Using Fallback Paywalls in Adapty | Adapty Docs"
keywords: ['fallback', 'fallbacks']
---

:::warning
Fallback configurations require Adapty SDK v2.11 or up.
:::

To maintain a fluid user experience, it is important that you set up a **fallback configuration** for your [paywalls](paywalls) and [onboardings](onboardings).

When your application loads a paywall, the Adapty SDK requests paywall configuration data from our servers. But what if the device cannot connect to Adapty due to network issues or server outages?

* If the user accessed the paywall before, and the device cached its data, the application loads paywall data **from cache**.
* If the device did not cache the paywall, the application looks for a locally stored **fallback configuration**. It allows the application to display the paywall without an error.

Adapty automatically generates fallback configuration files for you to download and use. Each file contains platform-specific configurations for *all* your paywalls and onboardings.

## Get started

1. [Download the fallback configuration file](/local-fallback-paywalls) from Adapty.
2. Use the Adapty SDK to configure your fallback paywalls:
    * [iOS](ios-use-fallback-paywalls)
    * [Android](android-use-fallback-paywalls)
    * [React Native](react-native-use-fallback-paywalls)
    * [Flutter](flutter-use-fallback-paywalls)
    * [Unity](unity-use-fallback-paywalls)
    * [Kotlin Multiplatform](kmp-use-fallback-paywalls)
    * [Capacitor](capacitor-use-fallback-paywalls)

## Limitations

Fallback configurations are hard-coded and locally stored, so they lack the dynamic capabilities of regular Adapty paywalls.

* Fallback configs do not support internationalization. When Adapty generates the file, it uses the default `en` locale.
* Fallback paywalls don't support A/B testing. If a paywall participates in an A/B test, its fallback configuration will include the variation with the highest weight.
* Fallback configuration files cannot be managed remotely. If you want to update the file, you need to release a new version of the app on App Store / Google Play.
