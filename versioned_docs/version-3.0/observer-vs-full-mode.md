---
title: "Observer mode"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty is a powerful and flexible in-app purchase platform designed to boost your revenue and subscriber base. With features like customizable paywalls tailored to specific user segments, A/B testing for pricing, duration, trial periods, and visual elements, as well as comprehensive analytical tools for app monetization and third-party integrations, Adapty empowers your growth strategy.

However, if you already have your own purchase infrastructure and aren't prepared to switch to Adapty's system, you can explore the Adapty Observer mode. This limited mode omits the use of Adapty paywalls, targeting them to user audiences, managing the subscriptions, including handling renewals and billing retries; and focusing solely on analytics. Despite its limitations, Observer mode still offers robust analytics capabilities, including integration with attribution systems, advanced analytics, messaging, and CRM profiles. 

Both modes are offered at the same price and require your mobile app to be updated, so the choice essentially comes to either transitioning to Adapty's infrastructure for full functionality or retaining your current infrastructure while only gaining third-party integrations and analytical capabilities.

| Functionality | Observer mode | Full mode |
|-------------|-------------|---------|
| **Comprehensive Analytics** | ✅ | ✅ |
| **Third-Party Integrations** | ✅ | ✅ |
| **Responding to purchase events to give/restrict paid access to your users** | ❌ | ✅ |
| **Purchases Infrastructure Maintainer** | You | Adapty |
| **A/B Testing** | <p>:warning:</p><p>Feasible, but requires a significant amount of additional coding and configuration, more than in Full Mode.</p> | ✅ |
| **Implementation Time** | <p>For analytics and integrations: Less than an hour</p><p>With A/B tests: Up to a week with thorough testing</p> | Several hours |


## How Observer mode works

In Observer mode, the Adapty SDK simply listens for new transactions from Apple/Google and forwards them to the Adapty backend. App developers are tasked with managing access to the paid content in their app, completing transactions, handling renewals, addressing billing issues, and so on.

## How to set up Observer mode

1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions [for iOS](sdk-installation-ios), [for Android](sdk-installation-android), [for Flutter](/2.0/sdk-installation-flutter), [for React Native](/2.0/sdk-installation-reactnative), and [for Unity](/2.0/sdk-installation-unity).
3. (optional) If you want to use 3d-party integrations, set them up as described in the [Configure 3d-party integration](configuration) topic.

:::warning
When operating in Observer mode, the Adapty SDK does not finalize transactions, so ensure you handle this aspect yourself.
:::

## How to use paywalls and A/B tests in Observer mode

In Observer mode, Adapty SDK cannot determine the source of purchases as you make them in your own infrastructure. Therefore, if you intend to use paywalls and/or A/B tests in Observer mode, you need to associate the transaction coming from your app store with the corresponding paywall in your mobile app code.

Additionally, paywalls designed with Paywall Builder should be displayed in a special way when using the Observer mode:

- Display paywalls in Observer mode for [iOS](implement-observer-mode) or [Android](android-present-paywall-builder-paywalls-in-observer-mode).
- [Associate paywalls to purchase transactions in Observer mode](associate-paywalls-to-transactions).