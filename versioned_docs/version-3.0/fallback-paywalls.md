---
title: "Fallback paywalls"
description: "Use fallback paywalls to ensure seamless user experience in Adapty."
metadataTitle: "Using Fallback Paywalls in Adapty | Adapty Docs"
keywords: ['fallback', 'fallbacks']
---

To maintain a fluid user experience, it is important that you set up a **fallback configuration** for your [paywalls](/paywalls).

When your application loads a paywall, the Adapty SDK requests paywall configuration data from our servers. But what happens if the user's device cannot connect to Adapty?

* If the user accessed the paywall before, and the device cached its data, the application loads paywall data **from cache**.
* If the device did not cache the paywall, the application looks for a locally stored **fallback** paywall configuration.

:::note
The fallback paywall configuration is hard-coded and locally stored. Therefore:

* It does not support internationalization.
* You can only update it when you update your application code.

These trade-offs are necessary to make sure your application does not raise an error that disrupts user workflow.
:::

## Setup Overview

1. [Download the fallback configuration file](/local-fallback-paywalls) from Adapty
2. Use the Adapty SDK to configure your fallback paywalls:
    * [iOS](ios-use-fallback-paywalls)
    * [Android](android-use-fallback-paywalls)
    * [Kotlin](kmp-use-fallback-paywalls)
    * [React Native](react-native-use-fallback-paywalls)
    * [Flutter](flutter-use-fallback-paywalls)
    * [Capacitor](capacitor-use-fallback-paywalls)
    * [Unity](unity-use-fallback-paywalls)

## See Also

* [Fallback Onboardings](/local-fallback-onboarding)