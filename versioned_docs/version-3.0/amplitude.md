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

Within Adapty, you can configure separate flows for production events and test events received from the Apple or Stripe sandbox environment or Google test account. 

For production events, use the **Production** fields by pasting the API keys from the Amplitude dashboard, a separate API key per platform: iOS, Android, Stripe.

For test events, employ the  **Sandbox** fields accordingly.

To set up the webhook integration:

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


2. Turn on the toggle to initiate the integration.

3. Fill out the integration fields:

    | Field                         | Description                                                  |
    | ----------------------------- | ------------------------------------------------------------ |
    | **Amplitude iOS API key**     | <p>Enter the Amplitude **API Key** for iOS into Adapty. To find it, open your **Project settings** in Amplitude. In case you need help, refer to [official docs](https://amplitude.com/docs/apis/authentication).</p><p>We recommend to first set up **Sandbox** API keys to test the integration. And after the successful test results, provide the **Production** ones.</p> |
    | **Amplitude Android API key** | Enter the Amplitude **API Key** for Android into Adapty similar to how it's described for iOS. |
    | **Amplitude Stripe API key**  | Enter the Amplitude **API Key** for Stripe into Adapty  similar to how it's described for iOS. |

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

4. Additional fields and options are not obligatory; use them as needed:

5. | Parameter                               | Description                                                  |
   | --------------------------------------- | ------------------------------------------------------------ |
   | **How the revenue data should be sent** | Define if the gross revenue should be sent or after taxes and commissions. A detailed description is given in the [Store commission and taxes](controls-filters-grouping-compare-proceeds#store-commission-and-taxes) section. |
   | **Exclude historical events**           | Opt to exclude events that occurred before the user installed the app with Adapty SDK. This prevents duplication of events and ensures accurate reporting. For instance, if a user activated a monthly subscription on January 10th and updated the app with Adapty SDK on March 6th, Adapty will omit events before March 6th and retain subsequent events. |
   | **Send User Attributes**                | If you wish to send user-specific attributes, like language preferences, and your OneSignal plan supports more than 10 tags, select this option. Enabling this allows the inclusion of additional information beyond the default 10 tags. Note that exceeding tag limits may result in errors. |
   | **Always populate user_id**             | Adapty always sends `device_id` as `amplitudeDeviceId`. User_id however can or cannot be sent depending on this parameter. Adapty always tries to send `amplitudeUserId` set by SDK , if it's absent then Adapty tries to send `customer_user_id`. If it's absent as well, Adapty will act in the following way:<ul><li> ON: Adapty will send Adapty `profile_id`.</li><li> OFF:  Adapty will not populate `user_id`.</li></ul> |

6. Choose the events you want to receive and [map their names](amplitude#events-and-tags).

7. Remember to click the **Save** button to confirm the changes.

Please note that the moment you click the **Save** button, Adapty will start sending events to Amplitude.

Along with events, Adapty also sends the[ subscription status](subscription-status) and subscription product ID to the [Amplitude user properties.](https://help.amplitude.com/hc/en-us/articles/115002380567#h_39e46c92-7b7f-4358-a96f-c82cc3342e3e)

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

Use `Adapty.updateProfile()` method to set `amplitudeDeviceId` or `amplitudeUserId`.  If not set, Adapty uses your user ID (`customerUserId`), or if it's null Adapty ID. If the `customwrUserId`is absent as well, Adapty will or will not set the user_id depending on the **Always populate user_id** checkbox. If selected, Adapty profile_id will be set. If cleared, user_id will not be set at all.
 Make sure that the user ID you use to send data to Amplitude from your app if any is the same one you send to Adapty.

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>
```Text 
import Amplitude 

let builder = AdaptyProfileParameters.Builder()
            .with(amplitudeUserId: Amplitude.instance().userId)
            .with(amplitudeDeviceId: Amplitude.instance().deviceId)

Adapty.updateProfile(params: builder.build())
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
var builder = new Adapty.ProfileParameters.Builder();
builder.SetAmplitudeUserId("AMPLITUDE_USER_ID");
builder.SetAmplitudeDeviceId(amplitude.getDeviceId());

Adapty.UpdateProfile(builder.Build(), (error) => {
    // handle error
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
