---
title: "Implement Observer mode"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you already have your own purchase infrastructure and aren't prepared to fully switch to Adapty, you can explore [Observer mode](observer-vs-full-mode). It'll provide you with the best analytics capabilities, integration with attribution and analytics systems, and a CRM with your users' profiles.

To make all this work in Observer mode, it's enough to enable it when configuring the Adapty SDK by setting the `observerMode` parameter to `true` as described in Adapty SDK configuration for [iOS](sdk-installation-ios#configure-adapty-sdk), [Android](sdk-installation-android#configure-adapty-sdk), [Flutter](sdk-installation-flutter#configure-adapty-sdks-for-ios), [React Native](sdk-installation-reactnative#configure-adapty-sdks), and [Unity](sdk-installation-unity#configure-adapty-sdks).

If you want to also use Adapty's paywalls and A/B test functionality, it is possible, though it will require extra effort on your part in Observer mode compared to Full mode. To do this:

1. Depending on whether you designed your paywalls with Paywall Builder or remote config, the flow will be slightly different:
   - Paywalls designed with remote config may contain various data as it allows for any kind of JSON content. However, in this case, you're the one responsible for interpreting that data and rendering your paywall. Implementation of remote config paywalls does not differ from Full mode, so do it as described in [Display paywalls designed with remote config](display-remote-config-paywalls) for Full mode.
   - Paywalls designed with Paywall Builder contain both what should be shown within the paywall and how it should be shown. Implementation of Paywall Builder paywalls differs for Observer mode. Refer to the guides for [iOS](ios-present-paywall-builder-paywalls-in-observer-mode) and [Android](android-present-paywall-builder-paywalls-in-observer-mode) for detailed guidance. This is necessary for implementing purchases outside of Paywall Builder paywalls, which typically handle purchases themselves.
2. Implement the purchasing process according to your requirements. 
3. [Associate used paywalls to purchase transactions](associate-paywalls-to-transactions) for Adapty to determine the source of purchases.