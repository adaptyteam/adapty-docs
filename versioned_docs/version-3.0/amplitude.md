---
title: "Amplitude"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[Amplitude](https://amplitude.com/) is a powerful mobile analytics service. With Adapty, you can easily send events to Amplitude, see how users behave, and then make smart decisions.

Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place and sends it to your Amplitude account. This allows you to match your user behavior with their payment history in Amplitude, and inform your product decisions.

### How to set up Amplitude integration

Within Adapty, you can set up separate flows for **production** and **test events** from the Apple or Stripe sandbox environment or Google test account.

- For production events, enter the **Production** API keys from the Amplitude dashboard, with a unique API key for each platform: iOS, Android, and Stripe.
- For test events, use the **Sandbox** fields as needed.

To set up the Amplitude integration:

1. Open [**Integrations** -> **Amplitude**](https://app.adapty.io/integrations/amplitude) in your Adapty Dashboard.

<Zoom>
  <img src={require('./img/3b50552-CleanShot_2023-08-15_at_16.47.102x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


2. Toggle on **Amplitude integration** to enable it.

3. Fill in the integration fields:

    | Field                                      | Description                                                  |
    | ------------------------------------------ | ------------------------------------------------------------ |
    | **Amplitude iOS/ Android/ Stripe API key** | Enter the Amplitude **API Key** for iOS/ Android/ Stripe into Adapty. Locate it under **Project settings** in Amplitude. For help, check [Amplitude docs](https://amplitude.com/docs/apis/authentication). Start with **Sandbox** keys for testing, then switch to **Production** keys after successful tests. |

    <Zoom>
      <img src={require('./img/2297782-CleanShot_2023-08-15_at_16.53.512x.webp').default}
      style={{
        border: '1px solid #727272', /* border width and color */
        width: '700px', /* image width */
        display: 'block', /* for alignment */
        margin: '0 auto' /* center alignment */
      }}
    />
    </Zoom>

4. Optional settings for further customization:

   | Parameter                               | Description                                                  |
   | --------------------------------------- | ------------------------------------------------------------ |
   | **How the revenue data should be sent** | Choose whether to send gross revenue or revenue after taxes and commissions. See [Store commission and taxes](controls-filters-grouping-compare-proceeds#store-commission-and-taxes) for details. |
   | **Exclude historical events**           | Choose to exclude events before Adapty SDK installation, preventing duplicate data. For example, if a user subscribed on January 10th but installed the Adapty SDK on March 6th, Adapty will only send events from March 6th onward. |
   | **Send User Attributes**                | Select this option to send user-specific attributes like language preferences. |
   | **Always populate user_id**             | Adapty automatically sends `device_id` as `amplitudeDeviceId`. For `user_id`, this setting defines behavior: <ul><li>**ON**: Sends Adapty `profile_id` if `amplitudeUserId` or `customer_user_id` aren’t available.</li><li>**OFF**: Leaves `user_id` empty if neither ID is available.</li></ul> |

5. Choose the events you want to receive and [map their names](amplitude#events-and-tags).

6. Click **Save** to confirm your changes.

Once you click **Save**, Adapty will start sending events to Amplitude.

In addition to events, Adapty sends [subscription status](subscription-status) and the subscription product ID to [Amplitude user properties](https://help.amplitude.com/hc/en-us/articles/115002380567#h_39e46c92-7b7f-4358-a96f-c82cc3342e3e).

### Events and tags

Below the credentials, there are three groups of events you can send to Amplitude from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).

<Zoom>
  <img src={require('./img/da67694-CleanShot_2023-08-15_at_16.52.352x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

We recommend using the default event names provided by Adapty. But you can change the event names based on your needs. Adapty will send subscription events to Amplitude using a server-to-server integration, allowing you to view all subscription events in your Amplitude dashboard.

### SDK configuration

Use the `Adapty.updateProfile()` method to set either `amplitudeDeviceId` or `amplitudeUserId`. If neither is set, Adapty will default to using your user ID (`customerUserId`). If `customerUserId` is also absent, Adapty will handle `user_id` based on the **Always populate user_id** checkbox:

- **If selected**, Adapty will set `user_id` to the Adapty `profile_id`.
- **If cleared**, `user_id` will not be set.

Make sure that any user ID you use to send data to Amplitude from your app matches the one you send to Adapty.

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>
```swift
import Amplitude 

do {
    try await Adapty.setIntegrationIdentifier(
        key: "amplitude_user_id", 
        value: Amplitude.instance().userId
    )
    try await Adapty.setIntegrationIdentifier(
        key: "amplitude_device_id", 
        value: Amplitude.instance().deviceId
    )
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin 
//for Amplitude maintenance SDK (obsolete)
val amplitude = Amplitude.getInstance()
val amplitudeDeviceId = amplitude.getDeviceId()
val amplitudeUserId = amplitude.getUserId()

//for actual Amplitude Kotlin SDK
val amplitude = Amplitude(
    Configuration(
        apiKey = AMPLITUDE_API_KEY,
        context = applicationContext
    )
)
val amplitudeDeviceId = amplitude.store.deviceId
val amplitudeUserId = amplitude.store.userId

//

val params = AdaptyProfileParameters.Builder()
    .withAmplitudeDeviceId(amplitudeDeviceId)
    .withAmplitudeUserId(amplitudeUserId)
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
import 'package:amplitude_flutter/amplitude.dart';

final Amplitude amplitude = Amplitude.getInstance(instanceName: "YOUR_INSTANCE_NAME");

final builder = AdaptyProfileParametersBuilder()
     ..setAmplitudeDeviceId(await amplitude.getDeviceId())
     ..setAmplitudeUserId(await amplitude.getUserId());

try {
     await adapty.updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
     // handle error
} catch (e) {}
```
</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>
```csharp 
using AdaptySDK;

Adapty.SetIntegrationIdentifier(
  "amplitude_user_id", 
  "YOUR_AMPLITUDE_USER_ID", 
  (error) => {
  // handle the error
});

Adapty.SetIntegrationIdentifier(
  "amplitude_device_id", 
  amplitude.getDeviceId(), 
  (error) => {
  // handle the error
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript 
import { adapty } from 'react-native-adapty';

try {
  await adapty.updateProfile({
    amplitudeDeviceId: deviceId,
    amplitudeUserId: userId,
  });
} catch (error) {
  // handle `AdaptyError`
}
```
</TabItem>
</Tabs>
