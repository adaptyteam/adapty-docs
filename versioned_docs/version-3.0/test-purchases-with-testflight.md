---
title: "Test in-app purchases with TestFlight"
description: "Learn how to test in-app purchases with TestFlight using Adapty for a smooth testing process."
metadataTitle: "Test Purchases with TestFlight | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

TestFlight lets your team test your app on real devices and provide feedback. Testers use their real Apple accounts, and all testing is conducted in a sandbox environment. This means transactions and purchases won't incur charges. Testing with TestFlight in the sandbox environment is ideal for team-based testing. For more information, check out [Apple's documentation on Beta testing with TestFlight](https://developer.apple.com/testflight/).

:::warning
Test on a real device

To validate the complete purchase process, testing on a real device is crucial. While simulators help examine paywalls, they can't interact with Apple's servers, so you won't be able to test purchases.
:::

## Before you start testing

Ensure the following prerequisites are met before testing in-app purchases:

1. Your Apple Developer Program account is active. Learn more in [Apple's guide on enrolling](https://developer.apple.com/programs/enroll).
2. Your Account Holder has signed the Paid Applications Agreement. Details are available in [Apple's guide on managing agreements](https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements).
3. Product information is set up in App Store Connect for the app you're testing, including a product reference name, product ID, localized name, and price.
4. The **Keychain Sharing** capability is disabled. Learn more in [Apple's guide on configuring keychain sharing](https://developer.apple.com/documentation/xcode/configuring-keychain-sharing).
5. You're using a development-signed build of your app, not a production-signed one.
6. All steps in the [release checklist](release-checklist) are complete.
7. You’ve reviewed how subscription renewals work in TestFlight. Renewals are accelerated: subscriptions renew daily (up to 6 times within a week), regardless of the subscription's duration. See the [official Apple documentation](https://developer.apple.com/help/app-store-connect/test-a-beta-version/subscription-renewal-rate-in-testflight) for details.

## Prepare for testing with TestFlight

When testing purchases in TestFlight, always use a real device and your actual Apple account. Transactions won't incur charges when using a development-signed build.

Follow these steps to test beta versions of your app with TestFlight:

1. Build your mobile app and send it to TestFlight via App Store Connect without releasing it.
2. Install the [TestFlight app](https://itunes.apple.com/us/app/testflight/id899247664?mt=8) on your iOS device.
3. Share the link to your app with testers, and open the link on the test device.
4. If you're a new tester, tap **Accept** to join.
5. Tap **Install** to install the app on your device.

Your app is now installed and ready for testing.

## Make purchase

Use a paywall in your app to make a test purchase.

Once the purchase is complete, [validate the test purchase](validate-test-purchases) to confirm it was successful.

:::note

Please keep in mind that the subscription renewal rate is accelerated in TestFlight. Each subscription is renewed daily, up to 6 times within one week, regardless of the subscription's duration. For more details, refer to the [official Apple documentation](https://developer.apple.com/help/app-store-connect/test-a-beta-version/subscription-renewal-rate-in-testflight).

:::