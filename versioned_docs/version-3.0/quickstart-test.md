---
title: "Test your integration with Adapty"
description: "Quickly verify your Adapty integration by testing SDK activation, paywall fetching, and in-app purchases on App Store, Google Play, Stripe, and Paddle."
metadataTitle: "Testing your Adapty integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You're all set! Now it's a good idea to test everything and make sure your integration works as intended.

To finalize your onboarding, Adapty suggests testing just a few things:
1. **SDK integration**: Check if your SDK is activated and paywalls are fetched properly.
2. **In-app purchases**: Run an in-app purchase test, then validate the results.

## 1. Test SDK integration

### SDK activation check

To verify the SDK was successfully activated:
1. Go to your Adapty dashboard.
2. Find the **Getting started** widget at the bottom left.
3. Check the **Install Adapty SDK** item.

If it's checkmarked, you're good to move on.

<Zoom>
  <img src={require('./img/install-checkmark.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### getPaywall

Use the placement with the paywall you created in the [previous onboarding step](quickstart-paywalls.md) to make sure your paywalls are fetched correctly:
1. Make sure you used the `getPaywall` method with your placement ID, following the quickstart guide for your platform:
- [iOS](flutter-quickstart-paywalls.md)
- [Android](android-quickstart-paywalls.md)
- [React Native](react-native-quickstart-paywalls.md)
- [Flutter](flutter-quickstart-paywalls.md)
- [Unity](unity-quickstart-paywalls.md)
2. Run a test on an emulator or device.
3. Check the logs. If it responds with the [AdaptyPaywall](sdk-models.md#adaptypaywall) object, you're good to move on.

## 2. Test in-app purchases

Running a test purchase is a comprehensive way to see your integration working end-to-end. Start with an in-app purchase, then validate your results.

Follow the detailed guide on testing purchases for your platform:
- [App Store](testing-purchases-ios.md)
  - [Sandbox](test-purchases-in-sandbox.md)
  - [TestFlight](test-purchases-with-testflight.md)
- [Google Play Store](testing-on-android.md)
- [Stripe](stripe.md#6-test-your-integration)
- [Paddle](paddle.md#4-test-your-integration)

Once you've made test purchases, proceed with validating your results below.

### Test purchases validation

After making a test purchase on your mobile device, check for the corresponding transaction in the [**Event Feed**](https://app.adapty.io/event-feed) in the Adapty Dashboard. If the purchase doesn't appear in the **Event Feed**, it's not being tracked by Adapty.

Learn more in the detailed guide on [validating test purchases](validate-test-purchases.md).

<Zoom>
  <img src={require('./img/test-event-feed.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>