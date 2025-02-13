---
title: "AppMetrica"
description: "AppMetrica Integration | Adapty Docs"
metadataTitle: "Integrate AppMetrica with Adapty for in-depth subscription analytics."
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

Use the `setIntegrationIdentifier()` method to set the `appmetrica_profile_id` or `appmetrica_device_id` parameter. If both parameters are provided, the `appmetrica_profile_id` will be used!

If these aren’t set, Adapty will default to using your user ID (`YOUR_ADAPTY_CUSTOMER_USER_ID`). Make sure the user ID you use to send data to AppMetrica from your app matches the one you send to Adapty. These links can help you set up get all needed IDs for AppMetrica in your app.

- [Set profile ID](https://appmetrica.yandex.com/docs/en/sdk/ios/analytics/objectivec/AMAAppMetrica#property_userProfileID) iOS;
- [Get device ID hash](https://appmetrica.yandex.ru/docs/en/sdk/ios/analytics/swift/AppMetrica#property_deviceID) iOS;
- [Set profile id](https://yastatic.net/s3/doc-binary/src/dev/appmetrica/ru/javadoc-7.2.2/io/appmetrica/analytics/AppMetrica.html#setUserProfileID(java.lang.String)) Android;
- [Get device ID hash](https://appmetrica.yandex.ru/docs/en/sdk/android/analytics/android-operations#get-ids) Android.

<Tabs groupId="appmetrica">
<TabItem value="Swift" label="iOS (Swift)" default>

```swift showLineNumbers
import AppMetricaCore 

if let deviceIDHash = AppMetrica.deviceIDHash {
    do {
        try await Adapty.setIntegrationIdentifier(
            key: "appmetrica_device_id", 
            value: deviceIDHash
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
```kotlin showLineNumbers
val startupParamsCallback = object: StartupParamsCallback {
    override fun onReceive(result: StartupParamsCallback.Result?) {
        val deviceIdHash = result?.deviceIdHash ?: return

        Adapty.setIntegrationIdentifier("appmetrica_device_id", deviceIdHash) { error ->
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

AppMetrica.requestStartupParams(context, startupParamsCallback, listOf(StartupParamsCallback.APPMETRICA_DEVICE_ID_HASH))
```
</TabItem>
<TabItem value="Flutter" label="Flutter (Dart)" default>
```javascript showLineNumbers
import 'package:appmetrica_plugin/appmetrica_plugin.dart';

final startupParams = await AppMetrica.requestStartupParams([AppMetricaStartupParams.deviceIdHashKey]);
final deviceIdHash = startupParams.result?.deviceIdHash;

if (deviceIdHash != null) {
  try {
    await Adapty().setIntegrationIdentifier(
        key: "appmetrica_device_id", 
        value: deviceIdHash,
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
```csharp showLineNumbers
using AdaptySDK;
using Io.AppMetrica;

AppMetrica.RequestStartupParams(
    (result, errorReason) => {
        string deviceIdHash = result.DeviceIdHash;

        if (deviceIdHash != null) {
            Adapty.SetIntegrationIdentifier(
                "appmetrica_device_id",
                deviceIdHash,
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
      },
      new List<string>() { StartupParamsKey.AppMetricaDeviceIDHash }
);
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript showLineNumbers
import { adapty } from 'react-native-adapty';
import AppMetrica, { DEVICE_ID_HASH_KEY, StartupParams, StartupParamsReason } from '@appmetrica/react-native-analytics';

// ...
const startupParamsCallback = async (
  params?: StartupParams,
  reason?: StartupParamsReason
) => {
  const deviceIdHash = params?.deviceIdHash
  if (deviceIdHash) {
    try {
      await adapty.setIntegrationIdentifier("appmetrica_profile_id", 'YOUR_ADAPTY_CUSTOMER_USER_ID');
      await adapty.setIntegrationIdentifier("appmetrica_device_id", deviceIdHash);
    } catch (error) {
      // handle `AdaptyError`
    }
  }
}

AppMetrica.requestStartupParams(startupParamsCallback, [DEVICE_ID_HASH_KEY])
```
</TabItem>
</Tabs>