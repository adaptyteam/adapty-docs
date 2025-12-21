---
title: "Troubleshooting test purchases"
description: "Troubleshoot test purchases in Adapty and resolve common in-app transaction issues."
metadataTitle: "Troubleshooting Test Purchases | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you encounter transaction issues, please first make sure you have completed all the steps outlined in the [release checklist](release-checklist). If you've completed all the steps and still encounter issues, please follow the guidance provided below to resolve them:

## An error is returned in the mobile app

Refer to the error list for your platform: [for iOS](ios-sdk-error-handling), [for Android](android-sdk-error-handling), [for React Native](react-native-troubleshoot-purchases.md), [Flutter](error-handling-on-flutter-react-native-unity),  and [Unity](unity-troubleshoot-purchases.md) and follow our recommendations to resolve the issue.

## Transaction is absent from the Event Feed although no error is returned in the mobile app

To resolve this issue, please check the following:

1. **For iOS**: Ensure you use a real device rather than a simulator.
2. Ensure that the `Bundle ID`/`Package name` of your app matches the one in the [**App settings**](https://app.adapty.io/settings/general).
3. Ensure the `PUBLIC_SDK_KEY` in your app matches the **Public SDK key** in the Adapty Dashboard: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).
4. Ensure you are using a sandbox account – not a [local StoreKit configuration file](local-sk-files.md). If you have used a local StoreKit configuration file for testing before, ensure you are not using it in the current build. 

## No event is present in my testing profile

This is normal behavior. A new user profile record is automatically created in Adapty when:

- A user runs your app for the first time
- A user logs out of your app

**Why this happens:** All transactions and events are tied to the profile that generated the first transaction. This keeps the entire transaction history (trials, purchases, renewals) linked to the same profile.

**What you'll see:** New profile records (called "non-original profiles") may appear without events but will retain access levels. You may see `access_level_updated` events. This is expected behavior.

**For testing:** To avoid multiple profiles, create a new test account (Sandbox Apple ID) each time you reinstall the app.

For more details, see [Profile record creation](profiles-crm#profile-record-creation).

Here is an example of a non-original profile. Notice the absence of events in the **User history** and the presence of an access level.

<Zoom>
  <img src={require('./img/98d0dad-non-original_profile.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Prices do not reflect the actual prices set in App Store Connect

In both Sandbox and TestFlight which uses the sandbox environment for in-app purchases, it's important to verify that the purchase flow functions correctly, rather than focusing on the accuracy of prices. It's worth noting that Apple's API can occasionally provide inaccurate data, particularly when different regions are configured for devices or accounts. And since the prices come directly from the Store and the Adapty backend does not affect purchase prices in any way, you can ignore any inaccuracy in prices during the testing of the purchases through Adapty.

Therefore, prioritize testing the purchase flow itself over the accuracy of prices to ensure it functions as intended.

## The transaction time in the Event Feed is incorrect

The **Event Feed** uses the time zone set in the **App Settings**. To align the time zone of events with your local time, adjust the **Reporting timezone** in [**App settings** -> **General** tab](https://app.adapty.io/settings/general).

## Paywalls and products take a long time to load

This issue can occur if your test account has a long transaction history. We highly recommend creating a new test account each time, as outlined in our [Create a Sandbox Test Account (Sandbox Apple ID) in App Store Connect](test-purchases-in-sandbox#step-1-create-a-sandbox-test-account--sandbox-apple-id-in-the-app-store-connect) section.

If you're unable to create a new account, you can clear the transaction history on your current account by following these steps on your iOS device:

1. Open **Settings** and tap **App Store**.
2. Tap your **Sandbox Apple ID**.
3. In the popup, select **Manage**.
4. On the **Account Settings** page, tap **Clear Purchase History**.

For more details, check out the [Apple Developer documentation](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox/#3894622).
