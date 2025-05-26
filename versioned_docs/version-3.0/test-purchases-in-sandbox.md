---
title: "Test in-app purchases in App Store Sandbox"
description: "Test purchases in the sandbox environment to ensure smooth transactions."
metadataTitle: "Testing Purchases in Sandbox Mode | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Once you've configured in-app purchases in your mobile app, it's crucial to test them thoroughly to ensure functionality and proper transmission of transactions to Adapty before releasing the app to production. Transactions and purchases that occur in the sandbox don’t incur charges. To conduct sandbox testing, you'll need to use a special test account - Sandbox Apple ID, and ensure the testing device is added to the Developer Account in the App Store Connect. 

Sandbox testing is ideal for developers who wish to personally test purchases on a device connected to their Mac via XCode.  
For more details, you can refer to the [Apple's documentation on Testing in-app purchases with sandbox](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox).

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

## Prepare for Sandbox testing

Testing in-app purchases in the sandbox environment doesn’t involve uploading your app binary to App Store Connect. Instead, you build and run your app directly from Xcode. However, it does require a special test account -  Sandbox Apple ID.

### Step 1. Create a Sandbox test account  (Sandbox Apple ID) in the App Store Connect

:::warning

When testing purchases, it's important to create a new sandbox test account each time. This helps keep the purchase history clean, ensuring better performance and smoother functionality.

Alternatively, you can clear the purchase history for your existing test account. For more details, check out the [Apple Developer documentation](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox/#3894622).

:::

To create a Sandbox Apple ID:

1. Open **App Store Connect**. Proceed to [**Users and Access** → **Sandbox**  → **Test Accounts**](https://appstoreconnect.apple.com/access/users/sandbox) section.

   

<Zoom>
  <img src={require('./img/7c1fdd0-apple_test_account.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Click the add button  **(+)** button next to the **Test Accounts** title.

   

<Zoom>
  <img src={require('./img/57c3a7c-apple_new_test_account.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



3. In the **New Tester** window, enter the data of the test user.

   :::warning
   - Make sure to provide a valid email you can verify.
   - Make sure to define the **Country or Region** which you plan to test.
   :::
4. Click the **Create** button to confirm the creation

### Step 3. Add the Sandbox test account to your device

The first time you run an app from XCode on your device, there's no need to manually add a Sandbox account. Upon building the app in XCode and running it on your device, when you initiate a purchase, the device prompts you to enter the Apple ID for the purchase. Simply enter your Sandbox Apple ID and password at this juncture, and the Sandbox test account will be automatically added to your device.

If you need to change the Sandbox Apple ID associated with your device, you can do so directly on the device by following these steps:

1. On iOS 12, navigate to **Settings > [Your Account] > App Store > Sandbox Account**.  
   On iOS 13 or greater, navigate to **Settings > App Store > Sandbox Account**.
2. Tap the current Sandbox Apple ID in the **Sandbox Account** section.
3. Tap the **Sign Out** button.
4. Tap the **Sign In** button.
5. In the **Use the Apple IS for Apple Media Services** window, tap the **Use Other Apple ID** button.
6. In the **Apple ID Sign-In Requested** window, enter the new sandbox account credentials that you previously created. 
7. Tap the **Done** button.
8. In the **Apple ID Security** window, tap the **Other options** button.
9. In the **Protect your account** window, tap the **Do not upgrade** button.

The added sandbox account is shown in the **Sandbox Account** section of your iOS device **Settings**.

### Step 4. Connect the device to your Mac with XCode

To execute the built app version on your real device, include the device as a run destination in the Xcode project

1. Connect your real device to the Mac with XCode using a cable or using the same Wi-Fi.
2. Choose the **Windows** -> **Devices and Simulators** from the XCode main menu.
3. In the **Devices** tab, choose your device.
4. Tap the **Trust** button on your mobile phone.

Your device is connected to the XCode and can be used for sandbox testing.

### Step 5. Build the app and run it

Click the **Run** button in the toolbar or choose **Product -> Run** to build and run the app on the connected real device. If the build is successful, Xcode runs the app on your iOS device and opens a debugging session in the debug area of the XCode. 

The app is ready for testing on the device.

:::note
When you’re done testing the app, click the **Stop** button in the XCode toolbar.
:::

### Step 6. Make purchase

Make a purchase in your mobile app via paywall.

:::info
Now you can [validate that the test purchase is successful](validate-test-purchases).
:::

## Subscription renewal, billing retry, and grace period in Apple Sandbox

Keep in mind that in the Apple Sandbox environment, subscription renewals happen faster, and both the billing retry and grace periods are shorter than in production. The default values are shown in the table below. You can adjust a tester’s subscription renewal rate, billing retry period, and grace period at any time. For more details, refer to the [official Apple documentation](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings/#edit-subscription-renewal-speed).

| Subscription duration          | 1 week     | 1 month    | 2 months   | 3 months   | 6 months   | 1 year     |
| :----------------------------- | :--------- | :--------- | :--------- | :--------- | :--------- | :--------- |
| Subscription renewal speed     | 3 minutes  | 5 minutes  | 10 minutes | 15 minutes | 30 minutes | 1 hour     |
| Length of Billing Retry        | 10 minutes | 10 minutes | 10 minutes | 10 minutes | 10 minutes | 10 minutes |
| Length of Billing Grace Period | 3 minutes  | 5 minutes  | 5 minutes  | 5 minutes  | 5 minutes  | 5 minutes  |

Additionally, keep in mind that in the sandbox environment, auto-renewable subscriptions renew up to 12 times before they stop.