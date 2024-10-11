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

Use `Adapty.updateProfile()` method to set `appmetricaProfileId` or `appmetricaDeviceId`.  If not set, Adapty uses your user ID (`customerUserId`). Make sure that the user id you use to send data to AppMetrica from your app is the same one you send to Adapty. These links should help to set up a user id for AppMetrica in your app.

- [Set profile ID](https://appmetrica.yandex.com/docs/mobile-sdk-dg/ios/objective-c/ref/YMMYandexMetrica.html#method_detail__method_setUserProfileID) iOS;
- [Get device ID](https://yandex.ru/dev/appmetrica/doc/mobile-sdk-dg/ios/swift/ref/YMMYandexMetrica-docpage/#method_detail__method_requestAppMetricaDeviceIDWithCompletionQueue) iOS;
- [Set profile id](https://yastatic.net/s3/doc-binary/src/dev/appmetrica/ru/javadoc-7.0.0/io/appmetrica/analytics/AppMetrica.html#setUserProfileID(java.lang.String)) Android;
- [Get device ID](https://yastatic.net/s3/doc-binary/src/dev/appmetrica/ru/javadoc-7.0.0/io/appmetrica/analytics/AppMetrica.html#requestStartupParams(android.content.Context,io.appmetrica.analytics.StartupParamsCallback,java.util.List)) Android.

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>
```swift 
import YandexMobileMetrica

YMMYandexMetrica.requestAppMetricaDeviceID(withCompletionQueue: .main) { deviceId, error in
    guard let deviceId = deviceId else { return }
            
    let builder = AdaptyProfileParameters.Builder()
        .with(appmetricaDeviceId: deviceId)
        .with(appmetricaProfileId: "YOUR_ADAPTY_CUSTOMER_USER_ID")

        Adapty.updateProfile(params: builder.build())
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>
```kotlin 
val params = AdaptyProfileParameters.Builder()
    .withAppmetricaDeviceId(appmetricaDeviceId)
    .withAppmetricaProfileId(appmetricaProfileId)
    .build()
Adapty.updateProfile(params) { error ->
    if (error != null) {
        // handle the error
    }
}
```
</TabItem>
<TabItem value="Flutter" label="Flutter (Dart)" default>
```javascript
import 'package:appmetrica_plugin/appmetrica_plugin.dart';

final builder = AdaptyProfileParametersBuilder()
    ..setAppmetricaDeviceId(await AppMetrica.requestAppMetricaDeviceID())
    ..setAppmetricaProfileId("YOUR_ADAPTY_CUSTOMER_USER_ID")

try {
    await adapty.updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
    // handle error
} catch (e) {}
```
</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>
```csharp 
AppMetrica.Instance.RequestAppMetricaDeviceID((deviceId, error) => {
    if (error != null) {
        // handle error
        return;
    }

    var builder = new Adapty.ProfileParameters.Builder();

    builder.SetAppmetricaProfileId("YOUR_ADAPTY_CUSTOMER_USER_ID");
    builder.SetAppmetricaDeviceId(deviceId);

    Adapty.UpdateProfile(builder.Build(), (error) => {
        // handle error
    });
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
import { adapty } from 'react-native-adapty';

// ...
try {
  await adapty.updateProfile({
    appmetricaProfileId: appmetricaProfileId,
    appmetricaDeviceId: appmetricaDeviceId,
  });
} catch (error) {
  // handle `AdaptyError`
}
```
</TabItem>
</Tabs>