---
title: "Configure Google Play Store integration"
description: "Set your app's integration with Adapty by configuring Play Store integration with Adapty. Learn how to input your app's configuration data for seamless validation of purchases and receipt of subscription updates within Adapty's platform"
metadataTitle: "Google Play Store Integration Configuration with Adapty"
---

This section outlines the integration process for your mobile app sold via Google Play with Adapty. You'll need to input your app's configuration data from the Play Store into the Adapty Dashboard. This step is crucial for validating purchases and receiving subscription updates from the Play Store within Adapty.

You can complete this process during the initial onboarding or make changes later in the **App Settings** of the Adapty Dashboard.

:::danger
Configuration change is only acceptable until you release your mobile app with integrated Adapty paywalls. The change after the release will break the integration and the paywalls will stop showing in your mobile app.
:::

## Step 1. Provide Package name

The Package name is the unique identifier of your app in the Google Play Store. This is required for the basic functionality of Adapty, such as subscription processing.

1. Open the [Google Play Developer Console](https://play.google.com/console/u/0/developers).
2. Select the app whose ID you need. The **Dashboard** window opens.


<img
  src={require('./img/7889edb-package_name.png').default}
/>





3. Find the product ID under the application name and copy it.

4. Open the [**App settings**](https://app.adapty.io/settings/android-sdk) from the Adapty top menu.

   
<img
  src={require('./img/b00066c-package_name.png').default}
/>




5. In the **Android SDK** tab of the **App settings** window, paste the copied **Package name**.

## Step 2. Upload the account key file

1. Upload the service account private key file in JSON format that you have created at the [Create service account key file](create-service-account) step into the **Service account key file** area.


<img
  src={require('./img/20fdba1-service_key_file.png').default}
/>





2. Don't forget to click the **Save** button to confirm the changes.