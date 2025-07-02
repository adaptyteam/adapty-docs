---
title: "Implement Observer mode"
description: "Implement observer mode in Adapty to track user subscription events."
metadataTitle: "Implementing Observer Mode in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you already have your own purchase infrastructure and aren't ready to fully switch to Adapty, you can explore [Observer mode](observer-vs-full-mode). In its basic form, Observer Mode offers advanced analytics and seamless integration with attribution and analytics systems.

If this meets your needs, you only need to:
1. Turn it on when configuring the Adapty SDK by setting the `observerMode` parameter to `true`. Follow the setup instructions for [iOS](sdk-installation-ios#configure-adapty-sdk), [Android](sdk-installation-android#configure-adapty-sdk), [Flutter](sdk-installation-flutter#configure-adapty-sdk), [React Native](sdk-installation-reactnative#configure-adapty-sdk), [Kotlin Multiplatform](sdk-installation-kotlin-multiplatform.md#configure-adapty-sdk), and [Unity](sdk-installation-unity#configure-adapty-sdk).
2. [Report transactions](report-transactions-observer-mode) from your existing purchase infrastructure to Adapty.

If you also need paywalls and A/B testing, additional setup is required, as described below.

## Using Adapty paywalls in Observer Mode

If you also want to use Adapty's paywalls and A/B testing features, you can — but it requires some extra setup in Observer mode. Here's what you'll need to do in addition to the steps above:

1. Display paywalls as usual for [remote config paywalls](display-remote-config-paywalls). For Paywall Builder paywalls, follow the specific setup guides for [iOS](ios-present-paywall-builder-paywalls-in-observer-mode) and [Android](android-present-paywall-builder-paywalls-in-observer-mode).
3. [Associate paywalls](report-transactions-observer-mode) with purchase transactions.

