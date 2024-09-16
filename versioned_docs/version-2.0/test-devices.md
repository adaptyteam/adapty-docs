---
title: "Testing devices"
description: "Discover how to assign your device as a test device in Adapty to bypass caching and view immediate changes to paywalls and placements"
metadataTitle: "How to Mark Devices as Test in Adapty for Immediate Changes"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Due to caching, changes made to paywalls or placements may take up to 20 minutes to reflect on the device. This delay is needed to speed up fetching a paywall for regular users, but it can be inconvenient when testing your changes.

For testing purposes, you can assign your device as test, which will disable caching and ensure that your changes are immediately displayed.

:::note
Testing devices are supported starting from specific SDK versions:

- iOS: 2.11.1
- Android: 2.11.3
- React Native: 2.11.1

Flutter and Unity support will be added later.
:::

## Mark your device as test

1. Open the [**App settings**](https://app.adapty.io/settings/general) in the Adapty Dashboard.
2. Scroll down to the **Test devices** section in the **General** tab.

   
<Zoom>
  <img src={require('./img/14c581d-test_device_add.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



3. Click the **Add test device** button.

   
<Zoom>
  <img src={require('./img/f86d5e2-test_users_add_device.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



4. In the **Add test device** window, enter:

   | Field                                    | Description                                                                                                                                                                                                                             |
   | :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **Test device name**                     | Name of the test device(s) for your reference.                                                                                                                                                                                          |
   | **ID used to identify this test device** | Choose the identifier type you plan to use to identify the test device(s). Follow our recommendations in the [Which identifier you should use](test-devices#which-identifier-you-should-use) section below to pick the best option. |
   | **ID value**                            | Enter the value of the identifier.                                                                                                                                                                                                      |
5. Remember to click **Add test device** button to save the changes.

## Which identifier you should use

To identify a device, you can use several identifiers. We recommend the following:

- **Customer User ID** for both iOS and Android devices if you [identify your users in Adapty](identifying-users). That is the best choice, especially if you have more that one test device for one account in your app. If Customer User ID is used as **ID used to identify this test device**, all the devices connected to this account will be marked as test devices.
- **IDFA (iOS)** and **Advertising ID (Android)**: These advertising identifiers are a perfect choice for iOS and Android devices respectively if you're already asking your users for consent to access them. Even if you have a Customer User ID, you may prefer using advertising identifiers if you switch between accounts in your app while testing. Additionally,  those identifiers are beneficial if the same account has both test and personal devices and you don't want the personal devices marked as test devices.

There are other options, such as the Adapty Profile ID, IDFV, and Android ID, which are less convenient but can be used if you cannot use Customer User ID, IDFA, or Advertising ID. 

Let's review all possible options in detail.

### Identifiers for all platforms

| Identifier | Usage |
|----------|-----|
| Customer User ID | <p>A unique identifier set by you to identify your users in your system. This could be the user's email, your internal ID, or any other string. To use this option, you must [Identify your users in Adapty](identifying-users).</p><p></p><p>It is the best choice for identifying a test device, especially if you're using several devices for the same account. All the devices with this account will be considered test.</p> |
| Adapty profile ID | <p>A unique identifier for the [user profile](profiles-crm)  in Adapty.</p><p></p><p>Use it if you cannot use Customer User ID, IDFA for iOS, or Advertising ID for Android. Note that the Adapty Profile ID can change if you reinstall the app or re-log in.</p> |


#### How to obtain Customer User ID and Adapty profile ID

Both identifiers can be obtained in the **Profile** details of the Adapty Dashboard:

1. Find the user's profile in the [**Adapty Profiles** -> **Event feed** tab](https://app.adapty.io/event-feed).
  :::note
  To find the exact profile, make a rare type of transaction. In this case, once the transaction appears in the [**Event Feed**](https://app.adapty.io/event-feed), you'll easily identify it.
  :::
2. Copy **Customer user ID** and **Adapty ID** field values in the profile details:

   
<Zoom>
  <img src={require('./img/345d308-test_users_CUID_adapty_ID.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




### Apple identifiers

| Identifier | Usage |
|----------|-----|
| IDFA | <p>The Identifier for Advertisers (IDFA) is a unique device identifier assigned by Apple to a user’s device.</p><p></p><p>It's ideal for iOS devices as it never changes on its own, although you can manually reset it.</p><p>**Note**: Since the rollout of iOS 14.5, advertisers must ask for user consent to access the IDFA. Ensure you are asking for consent in your app and you have provided it on your test device.</p> |
| IDFV | The Identifier for Vendors (IDFV) is a unique alphanumeric identifier assigned by Apple to all apps on a single device from the same publisher/vendor. It can change if you reinstall or update your app. |


#### How to obtain the IDFA

Apple does not provide the IDFA by default. Obtain it from the profile attribution in the Adapty Dashboard:

1. Find the user's profile in the [**Adapty Profiles** -> **Event feed** tab](https://app.adapty.io/event-feed).
  :::note
  To find the exact profile, make a rare type of transaction. In this case, once the transaction appears in the [**Event Feed**](https://app.adapty.io/event-feed), you'll easily identify it.
  :::
2. Open the profile details and copy the **IDFA** field value in the **Attributes** section:


<Zoom>
  <img src={require('./img/ce4a63f-test_users_idfa.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Alternatively, you can [find the app on the App Store that will show your IDFA to you](https://www.apple.com/us/search/idfa?src=globalnav).

#### How to obtain the Identifier for vendors (IDFV)

To obtain the IDFV, ask your developer to request it using the following method for your app and display the received identifier to your logs or debug panel.

```swift title="Swift"
UIDevice.current.identifierForVendor
```

### Google identifiers

| Identifier | Usage |
|----------|-----|
| Advertising ID | <p>The Advertising ID is a unique device identifier assigned by Google to a user’s device.</p><p>It's ideal for Android devices as it never changes on its own, although you can manually reset it.</p><p> **Note**: To use it, turn off the **Opt out of Ads Personalization** in your **Ads** settings if you use Android 12 or higher.</p>|
| Android ID | The Android ID is a unique identifier for each combination of app-signing key, user, and device. Available on Android 8.0 and higher versions. |


#### How to obtain Advertising ID

To find your device's advertising ID:

1. Open the **Settings** app on your Android device.
2. Click on **Google**.
3. Select **Ads** under **Services**. Your advertising ID will be listed at the bottom of the screen.

#### How to obtain Android ID

To obtain the Android ID, ask your developer to request the [ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID) using the following method for your app and display the received identifier in your logs or debug panel.

```kotlin title="Kotlin/Java"
android.provider.Settings.Secure.getString(contentResolver, android.provider.Settings.Secure.ANDROID_ID);
```