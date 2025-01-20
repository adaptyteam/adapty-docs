---
title: "AppMetrica"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[AppMetrica](https://appmetrica.yandex.ru/en/about) is a no-cost tool that helps you track advertisements and analyze how your mobile app is doing. It works in real-time, so you see things right away.

### How to set up AppMetrica integration

To integrate AppMetrica go to [Integrations > AppMetrica](https://app.adapty.io/integrations/appmetrica) and set credentials.

<Zoom>
  <img src={require('./img/2500769-CleanShot_2023-08-18_at_14.57.352x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Open AppMetrica [apps list](https://appmetrica.yandex.ru/application/list). Choose the app you want to send events to and go to **Settings**. Copy **Application ID** and **Post API key** and use them to set up the integration in Adapty.

<Zoom>
  <img src={require('./img/0f09ff5-CleanShot_2023-08-18_at_19.56.422x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





AppMetrica syncs events every 4 hours, so it may take some time for events to appear in the dashboard. AppMetrica doesn't support sending events revenue, but we send it as regular property.

## Events and tags

Below the credentials, there are three groups of events you can send to AppMetrics from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).

<Zoom>
  <img src={require('./img/6ed2d88-CleanShot_2023-08-18_at_14.59.042x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs.

## SDK configuration

Use the `setIntegrationIdentifier()` method to set the `appmetricaProfileId` or `appmetricaDeviceId` parameter. Setting `appmetricaDeviceId` is preferred!

If these aren’t set, Adapty will default to using your user ID (`customerUserId`). Make sure the user ID you use to send data to AppMetrica from your app matches the one you send to Adapty. These links can help you set up a user ID for AppMetrica in your app.

- [Set profile ID](https://appmetrica.yandex.com/docs/mobile-sdk-dg/ios/objective-c/ref/YMMYandexMetrica.html#method_detail__method_setUserProfileID) iOS;
- [Get device ID](https://appmetrica.yandex.ru/docs/ru/sdk/react-native/analytics/methods#appmetrica) iOS;
- [Set profile id](https://yastatic.net/s3/doc-binary/src/dev/appmetrica/ru/javadoc-7.2.2/io/appmetrica/analytics/AppMetrica.html#setUserProfileID(java.lang.String)) Android;
- [Get device ID](https://yastatic.net/s3/doc-binary/src/dev/appmetrica/ru/javadoc-7.2.2/io/appmetrica/analytics/AppMetrica.html#requestStartupParams(android.content.Context,io.appmetrica.analytics.StartupParamsCallback,java.util.List)) Android.

<Tabs groupId="appmetrica">
<TabItem value="Swift" label="iOS (Swift)" default>
```swift 
import AppMetricaCore 

if let deviceID = AppMetrica.deviceID {
    do {
        try await Adapty.setIntegrationIdentifier(
            key: "appmetrica_device_id", 
            value: deviceID
        )
        try await Adapty.setIntegrationIdentifier(
            key: "appmetrica_profile_id", 
            value: "YOUR_ADAPTY_CUSTOMER_USER_ID"
        )
    } catch {
        // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>
```kotlin 
val startupParamsCallback = object: StartupParamsCallback {
    override fun onReceive(result: StartupParamsCallback.Result?) {
        val deviceId = result?.deviceId ?: return

        Adapty.setIntegrationIdentifier("appmetrica_device_id", deviceId) { error ->
            if (error != null) {
                // handle the error
            }
        }
        
        Adapty.setIntegrationIdentifier("appmetrica_profile_id", "YOUR_ADAPTY_CUSTOMER_USER_ID") { error ->
            if (error != null) {
                // handle the error
            }
        }
    }

    override fun onRequestError(
        reason: StartupParamsCallback.Reason,
        result: StartupParamsCallback.Result?
    ) {
        //handle the error
    }
}

AppMetrica.requestStartupParams(context, startupParamsCallback, listOf(StartupParamsCallback.APPMETRICA_DEVICE_ID))
```
</TabItem>
<TabItem value="Flutter" label="Flutter (Dart)" default>
```javascript
import 'package:appmetrica_plugin/appmetrica_plugin.dart';

final deviceId = await AppMetrica.deviceId;

if (deviceId != null) {
  try {
    await Adapty().setIntegrationIdentifier(
        key: "appmetrica_device_id", 
        value: deviceId,
    );
    await Adapty().setIntegrationIdentifier(
        key: "appmetrica_profile_id", 
        value: "YOUR_ADAPTY_CUSTOMER_USER_ID",
    );
  } on AdaptyError catch (adaptyError) {
    // handle the error
  } catch (e) {
    // handle the error
  }
}
```
</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>
```csharp 
using AdaptySDK;

var deviceId = AppMetrica.GetDeviceId();

if (deviceId != null {
  Adapty.SetIntegrationIdentifier(
    "appmetrica_device_id", 
    deviceId, 
    (error) => {
    // handle the error
  });
  
  Adapty.SetIntegrationIdentifier(
    "appmetrica_profile_id", 
    "YOUR_ADAPTY_CUSTOMER_USER_ID", 
    (error) => {
    // handle the error
  });
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
import { adapty } from 'react-native-adapty';
import AppMetrica, { DEVICE_ID_KEY, StartupParams, StartupParamsReason } from '@appmetrica/react-native-analytics';

// ...
const startupParamsCallback = async (
  params?: StartupParams,
  reason?: StartupParamsReason
) => {
  const deviceId = params?.deviceId
  if (deviceId) {
    try {
      await adapty.updateProfile({
        appmetricaProfileId: 'YOUR_ADAPTY_CUSTOMER_USER_ID',
        appmetricaDeviceId: deviceId,
      });
    } catch (error) {
      // handle `AdaptyError`
    }
  }
}

AppMetrica.requestStartupParams(startupParamsCallback, [DEVICE_ID_KEY])
```
</TabItem>
</Tabs>