---
title: "Test in-app purchases in App Store Sandbox"
description: "Test purchases in the sandbox environment to ensure smooth transactions."
metadataTitle: "Testing Purchases in Sandbox Mode | Adapty Docs"
keywords: ['test']
rank: 100
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

Before you start testing in-app purchases, make sure that:

1. Your Apple Developer Program account is active. For more information, see Apple's [What you need to enroll](https://developer.apple.com/programs/enroll).
2. Your membership Account Holder has signed the Paid Applications Agreement, as described in Apple's [Sign and update agreements](https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements).
3. You set up the product information in App Store Connect for the app you’re testing. At a minimum, set up a product reference name, product ID, a localized name, and a price.
4. The **Keychain Sharing** capability is disabled. For more information, see Apple's article [Configuring keychain sharing](https://developer.apple.com/documentation/xcode/configuring-keychain-sharing).
5. You’re running a development-signed rather than a production-signed build of your app. 
6. You have completed all the steps outlined in the [release checklist](release-checklist).
7. You have set up the [App Store integration](initial_ios.md).

Testing in-app purchases in the sandbox environment doesn’t involve uploading your app binary to App Store Connect. Instead, you build and run your app directly from Xcode. However, it does require a special test account -  Sandbox Apple ID.

## Step 1. Create a test account in the App Store Connect

:::warning

When testing purchases, it's important to create a new sandbox test account each time. This helps keep the purchase history clean, ensuring better performance and smoother functionality.

Alternatively, you can clear the purchase history for your existing test account. For more details, check out the [Apple Developer documentation](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_with_sandbox/#3894622).

:::

To create a Sandbox Apple ID:

1. Open **App Store Connect**. Proceed to [**Users and Access** → **Sandbox**  → **Test Accounts**](https://appstoreconnect.apple.com/access/users/sandbox) and click **+**.

   

<Zoom>
  <img src={require('./img/add-sandbox-user.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. In the **New Tester** window, enter the data of the test user. If you are using a GMail or Google Workspace email address, you can reuse your email several times by using [plus addressing](https://www.wikihow.com/Use-Plus-Addressing-in-Gmail).

   :::important
   - Make sure to provide a valid email you can verify.
   - Make sure to define the **Country or Region** which you plan to test.
   :::

     
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



3. Click **Create** to confirm the creation.
4. You will get an email with a link for verifying the account. Verify the account to proceed.

## Step 2. Enable the Developer mode

To test purchases using a sandbox account, you need to [enable the Developer mode on your device](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device). If you haven't run any app from XCode on your real device before:

1. Connect your real device to the Mac with XCode using a cable or using the same Wi-Fi. Tap **Trust** on your phone.
2. In XCode, select your device as a run destination.

<Zoom>
  <img src={require('./img/build-destination.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Run the app from XCode. When a pop-up about the Developer mode appears, click **Cancel**.
4. On our device, go to **Settings > Privacy & Security > Developer Mode** and toggle the **Developer Mode** on.

Your device is connected to the XCode and can be used for sandbox testing. You can run the app 

## Step 3. Add the Sandbox test account to your device

:::tip
If you are running an app from XCode and testing purchases on your device for the first time, you will be prompted to enter the test account credentials when trying to make a purchase. 

You won't need to do anything else to test purchases.
:::

If you have worked with sandbox accounts before and want to use a new one now, here is how to change the account being used:

1. On iOS 13 or higher, navigate to **Settings > App Store > Sandbox Account**.
   
   On iOS 12, navigate to **Settings > [Your Account] > App Store > Sandbox Account**.
2. In the **Sandbox Account** section, tap the current ID and select **Sign Out**.
3. Then, tap the **Sign In** button.
4. Enter the new sandbox account credentials. 
5. In the **Apple ID Security** window, verify your account if needed.

The added sandbox account is shown in the **Sandbox Account** section of your iOS device **Settings**.

## Step 4. Build the app and run it

Click **Run** in the toolbar or choose **Product -> Run** to build and run the app on the connected real device. If the build is successful, Xcode runs the app on your iOS device and opens a debugging session in the debug area of the XCode. 

The app is ready for testing on the device.

:::note
When you’re done testing the app, click **Stop** in the XCode toolbar.
:::

## Step 5. Make purchase

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