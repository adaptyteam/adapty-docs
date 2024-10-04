---
title: "Quickstart guide"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

We’re thrilled you’ve decided to use Adapty! We want you to get the best results from the very first build. This guide will walk you through how to get started with Adapty

### Creating a project and registering an application

Create a new application in Adapty that will represent the real application you want to manage in Adapty. To do so:

1. In the **App Settings** menu in the right-top corner of Adapty, open the [General](general) tab. 
2. After the **General** tab opens, enter the name of the application, its category, and the reporting time zone.
3. You can configure other application settings. Mandatory settings are marked as **Required**.

Settings are saved automatically.

### Configuring platforms

Configure SDKs to validate purchases and get subscription updates from one or both platforms in Adapty.

**App Store configuration**  
In Adapty Dashboard, go to _App settings >[ iOS SDK](https://app.adapty.io/settings/ios-sdk)_ and fill in the fields using the instructions below. 

![](https://files.readme.io/b41b8db-CleanShot_2024-01-03_at_12.40.422x.webp)

To find App Bundle ID, open [App Store Connect](https://appstoreconnect.apple.com/), go to **My Apps**, and select the app whose ID you need. On the app page, in the drop-down **More** menu, select **About this App**. The app ID is displayed in the **Bundle ID** field.  
– [How to connect to In-App Purchase API?](in-app-purchase-api-storekit-2)  
– [How to set URL for App Store Server Notifications? **→**](app-store-server-notifications)

**Play Store configuration**  
Go to _App settings > [Android SDK](https://app.adapty.io/settings/android-sdk)_ and fill in the fields.

![Play Store configuration](https://files.readme.io/fa64f4d-99608fc-Android_store_configuration.webp "99608fc-Android_store_configuration.webp")

To find Package Name, open the [Google Play Developer Console](https://play.google.com/console/u/0/developers) and select the app whose ID you need. The ID is specified next to the app's name and logo.  
– [Where to find Service account key file? **→** ](service-account-key-file)  
– [Where to find Real-time Developer Notifications (RTDN)? **→**](real-time-developer-notifications-rtdn) 

### Creating a product

**[Add Access Level](access-level) (optional)** 

![Creating a product](https://files.readme.io/1574ebf-5c59a11-Access_Levels.webp "5c59a11-Access_Levels.webp")

**Add [product](product)** 

![Add product](https://files.readme.io/0f9ffd0-807efd2-Product.webp "807efd2-Product.webp")

### Setting up a paywall to show in the app

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





### Installing Adapty SDK

[Install and configure Adapty SDK](installation-of-adapty-sdks) in your app and be sure you have replaced the **"PUBLIC_SDK_KEY"** placeholder with your actual **[Public SDK key](https://app.adapty.io/settings/general)**.

Bear in mind, that SDK calls must be made after calling **`.activate()`** method. Otherwise, we won't be able to authenticate requests and they will be canceled.

<Tabs>
<TabItem value="Swift" label="iOS" default>
```swift 
Adapty.activate("PUBLIC_SDK_KEY", customerUserId: "YOUR_USER
```
</TabItem>
<TabItem value="kotlin" label="Android" default>
```kotlin 
override fun onCreate() {
    super.onCreate()
    Adapty.activate(applicationContext, "PUBLIC_SDK_KEY", customerUserId: "YOUR_USER_ID")
}
```
</TabItem>
<TabItem value="Flutter" label="Flutter - info.plist" default>
```xml 
<dict>
    ...
    <key>AdaptyPublicSdkKey</key>
    <string>PUBLIC_SDK_KEY</string>
</dict>
```
</TabItem>
<TabItem value="Unity" label="Flutter - AndroidManifest.xml" default>
```xml 
<application ...>
       ...
       <meta-data
              android:name="AdaptyPublicSdkKey"
              android:value="PUBLIC_SDK_KEY" />
</application>
```
</TabItem>
<TabItem value="RN" label="React Native - /src/App.tsx" default>
```typescript 
import { activateAdapty } from 'react-native-adapty';

const App: React.FC = () => {
  // ...
  useEffect(() => {
    activateAdapty({ sdkKey: 'PUBLIC_SDK_KEY' });
  }, []);
  // ...
}
```
</TabItem>
</Tabs>

Follow these guides for more info on:

- [Displaying paywalls & products](display-pb-paywalls)
- [Setting up fallback paywalls](use-fallback-paywalls)

### Configuring processing of purchases

Connecting Adapty to  **In-App Purchase API** for [iOS](in-app-purchase-api-storekit-2) and adding both **package name** with **service account key file** for [Android](service-account-key-file) would be necessary to allow Adapty to successfully process purchasing events.

### Subscription events

Here is what you can do to set up tracking of subscription events

|                 |                                                                                                   |
| :-------------- | :------------------------------------------------------------------------------------------------ |
| **For iOS**     | **Update the App Store Server Notifications with our [link](app-store-server-notifications)** |
| **For Android** | **Set up [Real-time Developer Notifications (RTDN)](real-time-developer-notifications-rtdn)** |

### Integrations

[Integrations](events) with third-party analytics and attribution services require [passing identifiers](analytics-integration) to the SDK. 

|                          |                                                                                                                                                                                                           |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **.updateProfile()**     | Use this method to passing identifiers to Amplitude, Mixpanel, Facebook Ads, and AppMetrica                                                                                                               |
| **.updateAttribution()** | This method would be required for passing attribution data from AppsFlyer, Adjust, and Branch. Be sure to configure the integration of interest in Adapty Dashboard, by providing API key and event names |

### Promo campaigns and promo offers

If you want to use Adapty along with Apple Promotional Offers, adding a [subscription key](app-store-promotional-offers) will allow us to sign offers.

### Notes

:::warning
Don't forget about Privacy Labels

[Learn more](apple-app-privacy) about the data Adapty collects and which flags you'd need to set for a review.
:::

:::danger
If you are using paywalls that were not built with [Adapty Paywall Builder](adapty-paywall-builder), make sure to [send paywall views](present-remote-config-paywalls#track-paywall-view-events) to Adapty using **.logShowPaywall()** method. Otherwise, paywall views will not be accounted for in the metrics and conversions will be irrelevant.
:::

If you have any questions about integrating Adapty SDK, feel free to contact us using [the website](https://adapty.io) (we use Intercom in the bottom right corner) or just email us at [support@adapty.io](mailto:support@adapty.io).