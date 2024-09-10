---
title: "Test in-app purchases with TestFlight"
description: "Learn how to prepare for purchase testing using TestFlight, ensuring smooth testing processes on real devices with genuine Apple accounts. Follow this guide to seamlessly validate your app's purchase flow"
metadataTitle: "Testing Purchases with TestFlight: A Step-by-Step Guide"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

TestFlight lets you get feedback from members of your team. Testing is done on real devices, and the testers will need to use their real Apple accounts. Please note that TestFlight uses the sandbox environment for in-app purchases. Transactions and purchases don’t incur charges in this case.  
Testing with TestFlight on a sandbox environment is the best choice when you want to let your team members test your app. For more details, you can refer to [Apple's documentation on Beta testing with TestFlight](https://developer.apple.com/testflight/).

:::warning
Test on a real device

To validate the end-to-end purchase process, it's essential to conduct testing on a real device. While testing on a simulator allows you to examine paywalls, it does not enable interaction with the Apple server, making it impossible to test purchases.
:::

## Before you start testing

Before you start testing in-app purchases, make sure that:

1. Your Apple Developer Program account is active. For more information, see Apple's [What you need to enroll](https://developer.apple.com/programs/enroll).
2. Your membership Account Holder has signed the Paid Applications Agreement, as described in Apple's [Sign and update agreements](https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements).
3. You set up the product information in App Store Connect for the app you’re testing. At a minimum, set up a product reference name, product ID, a localized name, and a price.
4. The **Keychain Sharing** capability is disabled. For more information, see Apple's article [Configuring keychain sharing](https://developer.apple.com/documentation/xcode/configuring-keychain-sharing).
5. You’re running a development-signed rather than a production-signed build of your app. 
6. You have completed all the steps outlined in the [release checklist](release-checklist).

## Prepare for testing with TestFlight

When conducting purchase testing with TestFlight, ensure you're using a real device and your genuine Apple account. Notably, transactions and purchases made during testing won't result in any charges when using the development-signed build of your app.

To test beta versions of apps using TestFlight:

1. Build your mobile app version and send it to TestFlight without releasing it via App Store Connect.
2. On your iOS device, [install the TestFlight](https://itunes.apple.com/us/app/testflight/id899247664?mt=8).
3. Share the link to your app built into the device and tap it on your device.
4. If you’re a new tester for the app, tap **Accept**.
5. Tap **Install** to install the app on your device.

The app is installed and ready for testing.

## Make purchase

Make a purchase in your mobile app via paywall.

:::info
Now you can [validate that the test purchase is successful](validate-test-purchases).
:::