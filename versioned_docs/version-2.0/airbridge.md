---
title: "Airbridge"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[Airbridge](https://www.airbridge.io/) offers an integrated marketing performance analysis for websites and mobile apps by consolidating data collected from multiple devices, platforms, and channels. Using Airbridge's Identity Resolution Engine, you can combine scattered customer identity data from web and app interactions into a unified people-based identity, resulting in more accurate attribution.

Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. 

The integration between Adapty and Airbridge operates in two main ways.

1. **Receiving attribution data from Airbridge**  
   Once you've set up the Airbridge integration, Adapty will start receiving attribution data from Airbridge. You can easily access and view this data on the user's page.
2. **Sending subscription events to Airbridge**  
   Adapty can send all subscription events which are configured in your integration to Airbridge. As a result, you'll be able to track these events within the Airbridge dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## How to set up Airbridge integration

To integrate Airbridge go to [Integrations > Airbridge](https://app.adapty.io/integrations/airbridge), turn on a toggle from off to on, and fill out fields.

First of all set credentials to build a connection between your Airbridge and Adapty profiles. Airbridge app name and Airbridge API token are required. 


<Zoom>
  <img src={require('./img/2b31d90-Untitled-1_1.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





They both can be found in your Airbridge dashboard in the [Third-party Integrations > Adapty](https://app.airbridge.io/app/testad/integrations/third-party/adapty) section. 


<Zoom>
  <img src={require('./img/5a2f627-Screenshot_2023-02-21_at_11.19.29_AM.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Adapty API token field is pre-generated on the Adapty backend. You will need to copy the value of Adapty API token and paste it into the Airbridge Dashboard in the Adapty Authorization Token field.


<Zoom>
  <img src={require('./img/ff422d1-CleanShot_2023-03-01_at_17.11.412x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Events and tags

Below the credentials, there are three groups of events you can send to Airbridge from Adapty


<Zoom>
  <img src={require('./img/eb4e3a9-CleanShot_2023-08-22_at_13.58.472x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Simply turn on the ones you need.  
When subscription-related events happen, Adapty sends events to Airbridge. After receiving them Airbridge sends attribution result information to Adapty. The historical events will be sent in the last 24 hours instead of the real event time

## SDK configuration

For the integration, you should pass `airbridge_device_id` to profile builder and call `updateProfile` as it is shown in the example below: 

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>
```swift 
import AirBridge

let builder = AdaptyProfileParameters.Builder()
            .with(airbridgeDeviceId: AirBridge.deviceUUID())

Adapty.updateProfile(params: builder.build())
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>
```kotlin 
Airbridge.getDeviceInfo().getUUID(object: AirbridgeCallback.SimpleCallback<String>() {
    override fun onSuccess(result: String) {
        val params = AdaptyProfileParameters.Builder()
            .withAirbridgeDeviceId(result)
            .build()
        Adapty.updateProfile(params) { error ->
            if (error != null) {
                // handle the error
            }
        }
    }
    override fun onFailure(throwable: Throwable) {
    }
})
```
</TabItem>
<TabItem value="Flutter" label="Flutter (Dart)" default>
```javascript
import 'package:airbridge_flutter_sdk/airbridge_flutter_sdk.dart';

final builder = AdaptyProfileParametersBuilder()
        ..setAirbridgeDeviceId(
          await Airbridge.state.deviceUUID,
        );

try {
    await Adapty().updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
    // handle error
} catch (e) {}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
import Airbridge from 'airbridge-react-native-sdk';
import { adapty } from 'react-native-adapty';

try {
  const deviceId = await Airbridge.state.deviceUUID();

  await adapty.updateProfile({
    airbridgeDeviceId: deviceId,
  });
} catch (error) {
  // handle `AdaptyError`
}
```
</TabItem>
</Tabs>

Read more about airbridgeDeviceId in [Airbridge documentation.](https://developers.airbridge.io/v1.1-en/docs/airbridge-device-id)