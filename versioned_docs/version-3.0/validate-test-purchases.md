---
title: "Validate test purchases"
description: "Validate test purchases in Adapty to ensure seamless transactions."
metadataTitle: "Validating Test Purchases in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Before releasing your mobile app to production, it's crucial to test in-app purchases thoroughly. Please refer to our [Test in-app purchases in Apple App Store](testing-purchases-ios) and [Test in-app purchases in Google Play Store](testing-on-android) topics for detailed guidance on testing. Once you begin testing, you need to verify the success of test purchases.

Every time you make a test purchase on your mobile device, view the corresponding transaction in the [**Event Feed**](https://app.adapty.io/event-feed) in the Adapty Dashboard. If the purchase does not appear in the **Event Feed**, it's not being tracked by Adapty. 

## ✅ Test purchase is successful

If the test purchase is successful, its transaction event will be displayed in the **Event Feed**:


<Zoom>
  <img src={require('./img/9ade2d5-event_feed_sandbox.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





If transactions work as expected, proceed to the [Release checklist](release-checklist), and then proceed with the app release.

## ❌ Test purchase is not successful

If you observe no transaction event within 10 minutes or encounter an error in the mobile app, refer to the [ Troubleshooting](troubleshooting-test-purchases) and articles on error handling [for iOS](ios-sdk-error-handling), [for Android](android-sdk-error-handling), [for Flutter](error-handling-on-flutter-react-native-unity), [for React Native](react-native-handle-errors.md), [for Unity](unity-handle-errors.md), and [Kotlin Multiplatform](kmp-handle-errors.md) for potential solutions.


<Zoom>
  <img src={require('./img/31a79b2-no_events.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


