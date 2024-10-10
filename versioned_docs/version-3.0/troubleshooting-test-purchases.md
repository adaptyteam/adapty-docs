---
title: "Troubleshooting test purchases"
description: "Encounter transaction issues during test purchases with Adapty? Follow our tailored troubleshooting guide to resolve errors, pricing discrepancies, and transaction discrepancies, ensuring seamless testing of your mobile app's purchase flow"
metadataTitle: "Troubleshooting Test Purchases with Adapty: Solutions for Transaction Issues"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you encounter transaction issues, please first make sure you have completed all the steps outlined in the [release checklist](release-checklist). If you've completed all the steps and still encounter issues, please follow the guidance provided below to resolve them:

| Issue | Solution |
|-----|--------|
| An error is returned in the mobile app | Refer to the error list for your platform: [for iOS](ios-sdk-error-handling), [for Android](android-sdk-error-handling), [for Flutter, React Native, or Unity](error-handling-on-flutter-react-native-unity) and follow our recommendations to resolve the issue. |
| Transaction is absent from the **Event Feed** although no error is returned in the mobile app | <ol><li> For iOS: Ensure you use a real device rather than a simulator.</li><li> Ensure that the `Bundle ID`/`Package name` of your app matches the one in the [**App settings**](https://app.adapty.io/settings/general).</li><li> Ensure the `PUBLIC_SDK_KEY` in your app matches the **Public SDK key** in the Adapty Dashboard: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).</li></ol> |
| No event is present in my testing profile | <p>A new user profile record is automatically created in Adapty in the following cases:</p><ul><li> When a user runs your app for the first time</li><li> When a user logs out of your app</li></ul><p>All transactions and events in a chain are tied to the profile that generated the first transaction. This helps keep the entire transaction history, including trial periods, subscription purchases, renewals, and more linked to the same profile. This means that a new profile record that generated a subsequent translation - we call it a non-original profile - may not have any events associated with it but will retain the granted access level. In some cases, you'll also see `access_level_updated` events here. It's advised to ignore these new, empty profiles and focus on the original ones for a clearer view of the user's transaction history.</p><p>This behavior is more prominent for testing scenarios but also normal for production. It should not be treated as a bug or SDK misconfiguration.In order to run the test with only one profile and have fun concise history in one place, create a new test account (Sandbox Apple ID) each time you reinstall the mobile app.</p><p>Please see an example of a non-original profile under the table. For more details on profile creation, please see [Profile record creation](profiles-crm#profile-record-creation).</p> |
| Prices do not reflect the actual prices set in App Store Connect | <p>In both Sandbox and TestFlight which uses the sandbox environment for in-app purchases, it's important to verify that the purchase flow functions correctly, rather than focusing on the accuracy of prices. It's worth noting that Apple's API can occasionally provide inaccurate data, particularly when different regions are configured for devices or accounts. And since the prices come directly from the Store and the Adapty backend does not affect purchase prices in any way, you can ignore any inaccuracy in prices during the testing of the purchases through Adapty.</p><p></p><p>Therefore, prioritize testing the purchase flow itself over the accuracy of prices to ensure it functions as intended.</p> |
| The transaction time in the **Event Feed** is incorrect | The **Event Feed** uses the time zone set in the **App Settings**. To align the time zone of events with your local time, adjust the **Reporting timezone** in [**App settings** -> **General** tab](https://app.adapty.io/settings/general). |
| Paywalls and products take a long time to load | <p>This issue can occur if your test account has a long transaction history. We highly recommend creating a new test account each time, as outlined in our [Create a Sandbox Test Account (Sandbox Apple ID) in App Store Connect](test-purchases-in-sandbox#step-1-create-a-sandbox-test-account--sandbox-apple-id-in-the-app-store-connect) section.</p> <p>If you're unable to create a new account, you can clear the transaction history on your current account by following these steps on your iOS device:</p> <ol><li> Open **Settings** and tap **App Store**.</li><li> Tap your **Sandbox Apple ID**.</li><li> In the popup, select **Manage**.</li><li> On the **Account Settings** page, tap **Clear Purchase History**.</li></ol> <p>For more details, check out the [Apple Developer documentation](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox/#3894622).</p> |


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

