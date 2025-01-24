---
title: "Quickstart guide"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

We’re thrilled you’ve decided to use Adapty! We want you to get the best results from the very first build. This guide will walk you through how to get started with Adapty.

Once you create an account in Adapty and provide your mobile app name and category, we automatically set up your project and your first app for you within our Adapty platform. The Onboarding tour leads you through the whole initial configuration in the Adapty Dashboard. If that is your case, you can partially skip the instructions and proceed with [Step 3. Creating product section](quickstart#step-3-creating-a-product).

If you already have a project and wanna add one more app, start with [Step 1. Creating a project and registering an application](quickstart#step-1-creating-a-project-and-registering-an-application).

## Step 1. Creating a project and registering an application

1. Click the name of your existing app at the top of the Adapty Dashboard and click **Add a new app**.


<img
  src={require('./img/add_new_app.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>

2. Enter the app's name and category. Add logo icon if you want. Click **Add a new app**.

Your new app is created and you are in the **App Settings** window where you configure the connection with app stores to validate purchases and get subscription updates from app stores in Adapty.

## Step 2. Configuring platforms

Configure SDKs to validate purchases and get subscription updates from one or both platforms in Adapty.

### Step 2.1. App Store configuration

In the Adapty Dashboard, go to **App settings** >[ **iOS SDK**](https://app.adapty.io/settings/ios-sdk) and fill in the fields using the instructions below. 

<Zoom>
  <img src={require('./img/qs.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Enter **Bundle ID**
   
   To find App Bundle ID, open [App Store Connect](https://appstoreconnect.apple.com/apps). Select your app and proceed to **General** → **App Information** section. Locate the **Bundle ID** in the **General Information** sub-section.
2. Enter **Issuer ID**, **Key ID**, **Subscription Key ID**, and upload the key file to **Private key (.p8 file)** and **Subscription (.p8 file)** fields. 
   
   [Where to take the IDs and key files?](generate-in-app-purchase-key) 
3. Set the URL for **App Store Server Notifications**
   
   Paste the URL from the Adapty Dashboard into the **Production Server URL** and **Sandbox Server URL** fields in the [App Store Connect](https://appstoreconnect.apple.com/apps) → **General** → **App Information** section, **App Store Server Notifications** subsection.

If you need more detailed instructions on how to configure your app connection in Adapty and the App Store, see the [Initial integration with the App Store](initial_ios) section.

### Step 2.2. Play Store configuration

In Adapty Dashboard, go to **App settings** > [**Android SDK**](https://app.adapty.io/settings/android-sdk) and fill in the fields using the instructions below.

<Zoom>
  <img src={require('./img/qs-Android_store_configuration.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Enter your app's **Package Name**.

   Open the [Google Play Developer Console](https://play.google.com/console/u/0/developers) and select the app whose ID you need. The ID is specified next to the app's name and logo in the **Dashboard** window.

2. Upload the **Service account key file**

   [Where to take the service account key file?](create-service-account-key-file)

3. Set the URL for **Google Play RTDN topic name**

   Paste the URL from the Adapty Dashboard into the **Topic name** field in the [Google Play Console](https://play.google.com/console/) → choose your app → **Monetize** → **Monetization setup** → **Google Play Billing** section.

If you need more detailed instructions on how to configure your app connection in Adapty and the Google Play Store, see the [Initial integration with the Google Play Store](initial-android) section.

### Stripe Store configuration

If you sell your products via Strip, set up the connection with it in the **App Settings** → [**Stripe**](https://app.adapty.io/settings/stripe).

<Zoom>
  <img src={require('./img/qs-stripe.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Enter your app's **Stripe Secret API Key**, separate for **Production** and **Sandbox**

   Open Stripe [Developers → API Keys](https://dashboard.stripe.com/apikeys), the key is specified in the **Secret key** field.

2. Set the **Webhook URL**s

   Copy **Webhook URL**s in the Adapty Dashboard and paste them into the **Endpoint URL** field in  [**Developers** → **Webhooks**](https://dashboard.stripe.com/webhooks) in Stripe. [What events should I send to the webhook?](stripe#1-connect-stripe-to-adapty)

3. Enter **Webhook Signing secret**

   Find it in the Signing secret column of [**Developers** → **Webhooks**](https://dashboard.stripe.com/webhooks) in Stripe.

If you need more detailed instructions on how to configure your app connection in Adapty and the Stripe, see the [Stripe integration](stripe) section.

## Step 3. Creating a product

<Zoom>
  <img src={require('./img/qs-Product.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 4. Setting up a paywall to show in the app

**Create a [paywall](paywalls) with this product** 

<Zoom>
  <img src={require('./img/13f5f1d-CleanShot_2023-07-03_at_16.00.092x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





**Create a [placement](placements) and add your paywall to it**


<Zoom>
  <img src={require('./img/a404841-CleanShot_2023-12-01_at_17.21.382x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Step 5. Installing Adapty SDK

[Install and configure Adapty SDK](installation-of-adapty-sdks) in your app and be sure you have replaced the **"PUBLIC_SDK_KEY"** placeholder with your actual **[Public SDK key](https://app.adapty.io/settings/general)**.

Bear in mind, that SDK calls must be made after calling **`.activate()`** method. Otherwise, we won't be able to authenticate requests and they will be canceled.

Follow these guides for more info on:

- [Displaying paywalls & products](display-pb-paywalls)
- [Setting up fallback paywalls](use-fallback-paywalls)

## Step 6. Configuring processing of purchases

Connecting Adapty to  **In-App Purchase API** for [iOS](app-store-connection-configuration) and adding both **package name** with **service account key file** for [Android](google-play-store-connection-configuration#step-2-upload-the-account-key-file) would be necessary to allow Adapty to successfully process purchasing events.

## Step 7. Subscription events

Here is what you can do to set up tracking of subscription events

|                 |                                                              |
| :-------------- | :----------------------------------------------------------- |
| **For iOS**     | **Update the App Store Server Notifications with our [link](enable-app-store-server-notifications)** |
| **For Android** | **Set up [Real-time Developer Notifications (RTDN)](enable-real-time-developer-notifications-rtdn)** |

## Step 8. Integrations

[Integrations](events) with third-party analytics and attribution services require [passing identifiers](analytics-integration) to the SDK. 

|                          |                                                                                                                                                                                                           |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **.updateProfile()**     | Use this method to passing identifiers to Amplitude, Mixpanel, Facebook Ads, and AppMetrica                                                                                                               |
| **.updateAttribution()** | This method would be required for passing attribution data from AppsFlyer, Adjust, and Branch. Be sure to configure the integration of interest in Adapty Dashboard, by providing API key and event names |

### Promo campaigns and promo offers

If you want to use Adapty along with Apple Promotional Offers, adding a [subscription key](app-store-connection-configuration#step-3-upload-in-app-purchase-key-file) will allow us to sign offers.

### Notes

:::warning
Don't forget about Privacy Labels

[Learn more](apple-app-privacy) about the data Adapty collects and which flags you'd need to set for a review.
:::

:::danger
If you are using paywalls that were not built with [Adapty Paywall Builder](adapty-paywall-builder), make sure to [send paywall views](present-remote-config-paywalls#track-paywall-view-events) to Adapty using **.logShowPaywall()** method. Otherwise, paywall views will not be accounted for in the metrics and conversions will be irrelevant.
:::

If you have any questions about integrating Adapty SDK, feel free to contact us using [the website](https://adapty.io) (we use Intercom in the bottom right corner) or just email us at [support@adapty.io](mailto:support@adapty.io).