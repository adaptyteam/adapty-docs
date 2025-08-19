---
title: "Test in-app purchases in App Store Sandbox"
description: "Test purchases in the sandbox environment to ensure smooth transactions."
metadataTitle: "Testing Purchases in Sandbox Mode | Adapty Docs"
keywords: ['test']
rank: 100
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::info
To proceed with in-app purchases testing, make sure:
- You’ve completed the quickstart guides on store integration, adding products, and the Adapty SDK integration.
- Your product is marked [**Ready to submit**](InvalidProductIdentifiers.md#step-2-check-products-step-3-check-products) in App Store Connect.
:::

## Testing environment

The only reliable way to test in-app purchases is using the [sandbox environment](#sandbox-testing) with apps you download from TestFlight. This way:

- **You can have a clean purchase history**: Lets you purchase like a new user and control eligibility.
- **You use a real device**: Enables interaction with the Apple server to perform purchases properly.

## Sandbox testing

To have proper testing results with the sandbox environment, follow the steps below.

For more details, you can refer to [Apple documentation on Testing In-App Purchases with sandbox](https://developer.apple.com/documentation/storekit/testing-in-app-purchases-with-sandbox).


### Step 1. Create Sandbox test account in App Store Connect

:::warning
It's important to create a new Sandbox test account to ensure your purchase history is clean.
:::

You can create a new Sandbox test account in a few clicks:

1. Go to [**Users and Access** > **Sandbox** > **Test Accounts**](https://appstoreconnect.apple.com/access/users/sandbox) in App Store Connect and click **+**.

   

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



2. Enter the test user details. Make sure to define the **Country or Region** which you plan to test.


:::tip
- If you use Gmail or iCloud, you can reuse your existing email address with [plus sign subaddressing](https://www.wikihow.com/Use-Plus-Addressing-in-Gmail).
- You can use a random email address, which even doesn't exist, but ensure to decline the two-factor authentication (2FA) when you sign in on a test device later.
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



3. Click **Create**.

### Step 2. Enable the Developer mode

If you haven't run any app from XCode on your test device before, you need to [enable the Developer mode on your device](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device). Otherwise, you can skip this step.

1. Connect your test device to the Mac with XCode using a cable or using the same Wi-Fi. Tap **Trust** on your phone.
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
4. Go to **Settings > Privacy & Security > Developer Mode** on your test device and toggle the **Developer Mode** on.

### Step 3. Download the app from TestFlight

On your test device, make sure you are signed in with your production Apple Account, then download the app you test from TestFlight.

:::danger
Do not open the app once downloaded. Just proceed with the next steps.
If accidentally opened, remove it from your test device and download it again. Otherwise, your purchases will use the production environment instead of the sandbox.
:::

For details on TestFlight, go to the [Apple documentation](https://developer.apple.com/documentation/StoreKit/testing-in-app-purchases-with-sandbox#Prepare-for-sandbox-testing).

### Step 4. Switch to Sandbox test account

1. Go to **Settings > Your Apple Account > Media & Purchases** on your test device.
2. Select **Sign Out** from the pop-up menu.
3. Go to **Settings > Developer**. If the **Developer** option is not available, make sure you've [enabled it in the second step](#step-2-enable-the-developer-mode).
4. Scroll down to the **Sandbox Apple Account** section and tap **Sign In**.
5. Sign in with your Sandbox Apple Account credentials.

### Step 5. Clear purchase history

If you've just created a new Sandbox test account and switched to it, you can skip this step as it only applies to repeated testing using the same Sandbox test account.

1. Go to **Settings > Developer > Sandbox Apple Account** on your test device.
2. Select **Manage** from the pop-up menu.
3. Go to **Account Settings** and tap **Clear Purchase History**.

:::danger
This step is a must each time you repeat testing using the same Sandbox test account. In this case, you will have to additionally [sign out from your Sandbox test account](#step-4-switch-to-sandbox-test-account), then sign in again to clear the purchase history cache on the test device.
:::

### Step 6. Make test purchase

Open the app and make your test purchase through a paywall.

Once done, go to the article on [validating test purchases](validate-test-purchases.md) to check your results.

## Testing issues

### TestFlight issues

You can't clear your purchase history **if you use TestFlight without the Sandbox test account**, which results in various issues and false testing outcomes.

If you accidentally forgot to [switch to the Sandbox test account](#step-4-switch-to-sandbox-test-account) and opened the app even once, TestFlight attributes your purchase history to your production Apple Account, which brings unexpected issues.

To fix it, follow these steps:

1. Remove the app from the test device.
2. Follow the steps for [Sandbox testing](#sandbox-testing).

:::note
It's important not just to reinstall the app, but also to switch to the Sandbox test account, clear purchase history and initially launch it using the Sandbox test account. 
:::

### Shared access level

If you repeat testing using the same Sandbox test account, you may face unexpected behavior when [access levels are shared or transferred](profiles-crm.md#sharing-access-levels-between-profiles).

To check if the user has an access level inherited, go to [Profiles & Segements](https://app.adapty.io/profiles/users) from the Adapty Dashboard and open the user's profile.

<Zoom>
  <img src={require('./img/profile-access-level-origin.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

If the user has an access level inherited, follow these steps for correct testing results:

## Test subscriptions

When testing the app from TestFlight using the Sandbox test account, you can set up the subscription renewal rate for each tester in sandbox. Learn more about editing subscription renewal rates in the [official Apple documentation](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings).

By default, subscriptions renew up to 12 times before they stop, according to the following schedule:

| Subscription duration          | 1 week     | 1 month    | 2 months   | 3 months   | 6 months   | 1 year     |
| :----------------------------- | :--------- | :--------- | :--------- | :--------- | :--------- | :--------- |
| Subscription renewal speed     | 3 minutes  | 5 minutes  | 10 minutes | 15 minutes | 30 minutes | 1 hour     |
| Length of Billing Retry        | 10 minutes | 10 minutes | 10 minutes | 10 minutes | 10 minutes | 10 minutes |
| Length of Billing Grace Period | 3 minutes  | 5 minutes  | 5 minutes  | 5 minutes  | 5 minutes  | 5 minutes  |

:::note
Keep in mind that test transactions take up to 10 minutes to appear in the [Event feed](validate-test-purchases.md).
:::

## Test offers

Testing offers require all user receipts to be deleted for the eligibility to work correctly.

The most reliable way to test offers is using a completely new [Sandbox test account](#step-1-create-sandbox-test-account-in-app-store-connect). Repeated testing using the same Sandbox test account may cause unexpected behavior. 

:::danger
If you repeat testing using the same Sandbox test account, ensure to [clear purchase history](#step-5-clear-purchase-history) to avoid eligibility related issues.
:::
