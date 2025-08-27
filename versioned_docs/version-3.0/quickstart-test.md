---
title: "Test your integration with Adapty"
description: "Quickly verify your Adapty integration by testing SDK activation, paywall fetching, and in-app purchases on App Store, Google Play, Stripe, and Paddle."
metadataTitle: "Testing your Adapty integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You're all set! Now make sure your integration works as intended and that you can see your purchases in the Adapty dashboard.

Running a test purchase is the best way to verify your integration works end-to-end. Start with an in-app purchase, then validate your results.

## 1. Test in-app purchases

Follow the guide based on your store or payment platform.

### App store

We recommend using a test account (Sandbox Apple ID) and conducting testing on a real device. To learn more about all testing steps, go to the detailed article on [App Store Sandbox testing](test-purchases-in-sandbox.md).

:::warning
Test on a real device for the most reliable results. You can optionally test using Sandbox and simulator or perform testing with [TestFlight](test-purchases-with-testflight.md), but we don’t recommend these methods as they are less reliable.
:::

### Google Play Store

Create a test user and test your app on a real device. To learn more about all testing steps, go to the detailed article on [Google Play Store testing](testing-on-android.md).

:::note
Google [recommends](https://support.google.com/googleplay/android-developer/answer/14316361) using a real device for testing. If you do decide to use an emulator, make sure that it has Google Play installed to ensure that your app is functioning properly. 
:::

### Stripe

Testing purchases on Stripe requires connecting Stripe to Adapty using the API key for Stripe Test mode. Transactions that you make from Stripe's Test mode will be considered Sandbox in Adapty. 

To learn more about all connection steps, go to the [Stripe integration article](stripe.md#6-test-your-integration).

### Paddle

Testing purchases on Paddle requires connecting Paddle to Adapty using the API key for Paddle test environment. Transactions that you make from Paddle's test environment will be considered Test in Adapty. 

To learn more about all connection steps, go to the [Paddle integration article](paddle.md#4-test-your-integration).

## 2. Validate test purchases

After making a test purchase, check for the corresponding transaction in the [**Event Feed**](https://app.adapty.io/event-feed) in the Adapty Dashboard. If the purchase doesn't appear in the **Event Feed**, Adapty is not tracking it.

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