---
title: "StoreKit testing in Xcode"
description: "Test purchases in the sandbox environment to ensure smooth transactions."
metadataTitle: "Testing Purchases in Sandbox Mode | Adapty Docs"
keywords: ['test', 'sandbox']
rank: 100
---
import ZoomImage from '@site/src/components/ZoomImage';

StoreKit testing in Xcode allows you to test in-app purchases locally without setting up a sandbox account.

For this kind of testing, you need to:

1. [Create a product in Adapty](quickstart-products.md) and assign it a **App Store product ID**.
2. In Xcode, create a local [StoreKit configuration file](https://developer.apple.com/documentation/xcode/setting-up-storekit-testing-in-xcode) and add a product to it. The product ID must be the same as **App Store product ID** in Adapty.
3. Add the StoreKit configuration file to your build schema and build the app. Launch it on the emulator or on your device.

## Should I use StoreKit testing in Xcode?

This way of testing is the most convenient if you are an app developer who wants to test the build on the go or to test different purchase scenarios using the Xcode features.

However, you must remember that this kind of testing is local, so no changes will appear on the Adapty dashboard. Before launching your app in the production environment, we recommend you test [working with profiles](ios-quickstart-identify.md) using the [sandbox environment](test-purchases-in-sandbox.md).

You **should** use StoreKit testing if you want to:
- Test the purchase logic
- Reproduce different purchase scenarios using the Xcode tools (e.g., cancelled payment or refund)
- Test using the emulator

You **shouldn't** use StoreKit testing if you want to:
- Test profile-related logic
- See whether your actions in the app appear in the Adapty dashboard
- Share your app with non-development teams for testing

## Step 1. Create a StoreKit configuration file

To create a StoreKit configuration file, in Xcode:

1. Click **File > New > File from template**. Then, select **StoreKit Configuration File** and click **Next**.

<ZoomImage id="new-sk.webp" width="900px" />

2. Give it a name. Then, depending on whether you have the products in App Store Connect already:
   - Select **Sync this file with an app in App Store Connect**: To create a configuration file that will contain all your App Store Connect products, so you can test them locally.
   - Don't select **Sync this file with an app in App Store Connect**: To create an empty configuration file where you will need to add products manually.
   
   Click **Next**.

<ZoomImage id="sync-sk.webp" width="500px" />

3. Don't add your app as a target. Just proceed. If you are working with products synced from App Store Connect, go to [Step 2](#step-2-add-the-configuration-file-to-the-build-scheme).
4. If your products are not synced from App Store Connect, click **+** at the bottom left and select a product type.

<ZoomImage id="add-product-sk.webp" width="500px" />

5. Enter a subscription group name and click **Next**.

<ZoomImage id="subscription-group-sk.webp" width="500px" />

6. Enter a reference name. In the **Product ID** field, enter the **App Store product ID** of your product in Adapty.

<ZoomImage id="id-sk.webp" width="500px" />

7. Configure pricing, offer, and other product settings in the configuration file. Or, add more products to it.

<ZoomImage id="local-sk.webp" width="900px" />

## Step 2. Add the configuration file to the build scheme

To build the app using this configuration file, you need to add it to a build scheme. The best practice is to separate testing and production schemes, so we suggest you create a new scheme for testing:

1. At the top, click your app name and select **New scheme**.

<ZoomImage id="new-scheme.webp" width="500px" />

2. Enter a name for the scheme and click **OK**. 

<ZoomImage id="scheme-name.webp" width="500px" />

3. Click the app name again and select **Edit scheme**. IN the **StoreKit configuration**, select your local configuration file, so it will be used on build.

<ZoomImage id="sk-config.webp" width="700px" />

## Step 3. Build & test

Now, you can build the app and test in-app purchases without connecting to the App Store backend. You can purchase products and get access levels locally. These changes won't be reflected in the Adapty dashboard, but you can still test unlocking paid features locally.

[Read more](https://developer.apple.com/documentation/xcode/testing-in-app-purchases-with-storekit-transaction-manager-in-code) about other features available with StoreKit testing in Xcode.

<ZoomImage id="sk-pay.png" width="500px" />
