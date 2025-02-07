---
title: "Observer mode"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty is a powerful and flexible in-app purchase platform designed to boost your revenue and subscriber base. With features like customizable paywalls tailored to specific user segments, A/B testing for pricing, duration, trial periods, and visual elements, as well as comprehensive analytical tools for app monetization and third-party integrations, Adapty empowers your growth strategy.

However, if you already have your own purchase infrastructure and aren't prepared to switch to Adapty's system, you can explore the Adapty Observer mode. This limited mode omits the use of Adapty paywalls, targeting them to user audiences, managing the subscriptions, including handling renewals and billing retries, and focusing solely on analytics. Despite its limitations, Observer mode still offers robust analytics capabilities, including integration with attribution systems, advanced analytics, messaging, and CRM profiles. 

Both modes are offered at the same price and require your mobile app to be updated, so the choice essentially comes to either transitioning to Adapty's infrastructure for full functionality or retaining your current infrastructure while only gaining third-party integrations and analytical capabilities.

| Functionality | Observer mode | Full mode |
|-------------|-------------|---------|
| **Comprehensive Analytics** | ✅ | ✅ |
| **Third-Party Integrations** | ✅ | ✅ |
| **Responding to purchase events to give/restrict paid access to your users** | ❌ | ✅ |
| **Purchases Infrastructure Maintainer** | You | Adapty |
| **A/B Testing** | <p>:warning:</p><p>Feasible, but requires a significant amount of additional coding and configuration, more than in Full Mode.</p> | ✅ |
| **Implementation Time** | <p>For analytics and integrations: Less than an hour</p><p>With A/B tests: Up to a week with thorough testing</p> | Several hours |

## How Observer Mode works

In Observer mode, you report new transactions from Apple/Google to the Adapty SDK, and Adapty SDK forwards them to the Adapty backend. You are tasked with managing access to the paid content in their app, completing transactions, handling renewals, addressing billing issues, and so on.

## How to set up Observer mode

1. Set up initial integration of Adapty [with Google Play](initial-android) and [with App Store](initial_ios). 
2. Turn it on when configuring the Adapty SDK by setting the `observerMode` parameter to `true`. Follow the setup instructions for [iOS](sdk-installation-ios#configure-adapty-sdk), [Android](sdk-installation-android#configure-adapty-sdk), [Flutter](sdk-installation-flutter#configure-adapty-sdks-for-ios), [React Native](sdk-installation-reactnative#configure-adapty-sdks), and [Unity](sdk-installation-unity#configure-adapty-sdks).
3. [Report transactions](report-transactions-observer-mode) from your existing purchase infrastructure to Adapty for iOS and iOS-based cross-platform frameworks.
4. (optional) If you want to use 3d-party integrations, set them up as described in the [Configure 3d-party integration](configuration) topic.

:::warning
When operating in Observer mode, the Adapty SDK does not finalize transactions, so ensure you handle this aspect yourself.
:::

## How to use paywalls and A/B tests in Observer mode

In Observer mode, Adapty SDK cannot determine the source of purchases as you make them in your own infrastructure. Therefore, if you intend to use paywalls and/or A/B tests in Observer mode, you need to associate the transaction coming from your app store with the corresponding paywall in your mobile app code when you report a transaction.

Additionally, paywalls designed with Paywall Builder should be displayed in a special way when using the Observer mode:

- Display paywalls in Observer mode for [iOS](implement-observer-mode) or [Android](android-present-paywall-builder-paywalls-in-observer-mode).
- [Associate paywalls to purchase transactions](report-transactions-observer-mode) when reporting transactions in Observer mode.