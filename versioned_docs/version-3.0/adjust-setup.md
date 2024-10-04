---
title: "Set up Adjust integration"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

We consider that you have already set up your Adjust system and installed Adjust SDK in the mobile app.

Adapty integration with Adjust is done in the following steps:

1. [Enable and configure the integration in the Adapty Dashboard](adjust-setup#enable-and-configure-the-integration-in-the-adapty-dashboard).
2. [Create events and tags in Adjust](adjust-setup#create-events-and-tags-in-adjust)
3. [Select events to send to Adjust and rename them](adjust-setup#select-events-to-send-to-adjust-and-add-tokens-for-them)
4. [Enable integration on the Adapty SDK level](adjust-setup#sdk-configuration).

:::warning
Avoiding events duplication

Make sure to turn off sending subscription events from devices and your server to avoid duplication.
:::

## Enable and configure the integration in the Adapty Dashboard

To set up the integration with Adjust:

1. Open [**Integrations** -> **Adjust**](https://app.adapty.io/integrations/adjust) in the Adapty Dashboard.

2. Turn on the toggle to initiate the integration. Set the Adapty Dashboard aside without closing it.

3. If OAuth authorization is not enabled for your app in the Adjust platform, proceed with step 7.  
   If you have OAuth authorization enabled on the Adjust platform, it is mandatory to provide the **OAuth token ** during the integration process for your iOS and Android apps. For this, in the Adjust dashboard, open [**AppView** -> **All apps**](https://suite.adjust.com/apps). 

4. In the **All apps** window, choose your app.

5. Open the **Protection** tab.

6. Scroll down to the **S2S security** section and click the **Open S2S security** button.

   
<Zoom>
  <img src={require('./img/500cac0-adjust_open_s2s_security.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




7. In the **S2S security** window, copy the S2S token.


<Zoom>
  <img src={require('./img/d3cb288-adjust_token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





8. Open the Adapty Dashboard and paste the copied token to the **iOS OAuth token** and **Android OAuth token** fields. If you have both iOS and Android apps added as the same app in Adjust, paste the same value to both fields. If the apps are added as separate apps, those values will be different.


<Zoom>
  <img src={require('./img/84ec347-adjust_adapty_oath_token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





7. Next, you need to provide the **app token** for your iOS and Android apps. Open your Adjust dashboard again and switch to the **App information** tab.


<Zoom>
  <img src={require('./img/8da6bc3-adjust_app_token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





8. Copy the **App token**.
9. Open the Adapty Dashboard and paste the copied token to the **iOS app token** and **Android app token** fields. If you have both iOS and Android apps added as the same app in Adjust, paste the same value to both fields. If the apps are added as separate apps, those values will be different.  
   Please note that the section has 2 field sets: **Production** and **Sandbox**. Use the sandbox set for [Adjust integration testing](test-adjust-integration), events created in the sandbox environment will be sent with this token.


<Zoom>
  <img src={require('./img/d6d0831-adjust_adapty_app_token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





10. Define other integration options:

    | Field | Description |
|-----|-----------|
| **How the revenue data should be sent** | Define if you want to receive the gross revenue, the revenue you'll get after the app store commission is paid, or the net revenue after both the app store commission and taxes are paid. |
| **Report user's currency** | <p>Enable to receive the purchase price in the currency the user uses.</p><p>Disable to receive all prices in USD.</p> |
| **Exclude historical events** | <p>Decide if you want to receive the events that were created before the user has installed your app version with Adapty SDK. Be careful to avoid event duplication.</p><p>Enable to receive only those events that were created after the user has installed the app version with Adapty SDK.</p><p>Disable to receive events that were created both before and after the user has installed the version of your app with the Adapty SDK.</p><p></p><p>Please note that Adjust doesn't support events older than 58 days. So, if you have an event that is more than 58 days old, Adapty will send it to Adjust, but the event datetime will be replaced by the current timestamp.</p> |

    
11. Do not forget to click the **Save** button to confirm the changes.

## Create events and tags in Adjust

In Adjust, no standard events are provided by default, you have to manually create the events you need. Moreover, every event has its own token you need to copy and paste to Adapty.

To create an event in the Adjust dashboard:

1. In the Adjust dashboard, open [**AppView** -> **All apps**](https://suite.adjust.com/apps).
2. In the **All apps** window, choose your app.
3. Open the **Events** tab.
4. Click the **Add event** button.


<Zoom>
  <img src={require('./img/2db6d69-adjust_add_event.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





5. In the **Add event** window, enter the name of the event. This name is not used in Adapty, so use any name convenient for you.


<Zoom>
  <img src={require('./img/0f35698-adjust_add_new_event.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





6. Click the **Add event** to confirm the event creation.

Repeat the steps above to create all required events.

If your iOS and Android apps are added as separate apps in Adjust, create events for the second app as well.

## Select events to send to Adjust and add tokens for them

Now, when you have all required events created in Adjust, it's time to link them to Adapty events.

1. In the Adjust dashboard, open [**AppView** -> **All apps**](https://suite.adjust.com/apps).
2. In the **All apps** window, choose your app.
3. Open the **Events** tab.


<Zoom>
  <img src={require('./img/931df25-adjust_copy_event.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





4. Copy the token of the event you want to receive. Set the Adjust dashboard aside without closing it.
5. Open [**Integrations** -> **Adjust**](https://app.adapty.io/integrations/adjust) in the Adapty Dashboard.
6. In the **iOS event names** and **Android event names** sections, enable the events you want to share to Adjust. Refer to the [Events to send to 3d-party integrations](events) topic for the complete list of events that can be sent with detailed descriptions of them. 


<Zoom>
  <img src={require('./img/af8bc56-adjust_adapty_event_on.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. Paste the copied token next to the corresponding event. If you have both iOS and Android apps added as the same app in Adjust, paste the same value to both iOS and Android section fields. If the apps are added as separate apps, those values will be different.


<Zoom>
  <img src={require('./img/ab92bf9-adjust_adapty_event_token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





4. Proceed with adding tokens for the other events.
5. After you finish, do not forget to click the **Save** button to confirm the changes.

Once you click the **Save** button, Adapty will immediately start sending subscription events to Adjust via a server-to-server integration, allowing you to view all subscription events in your Adjust dashboard and linking them to your acquisition campaigns. 

If the **Exclude historical events** checkbox is clear, Adapty will also send all past events that were created before the user installed the version of your app with the Adapty SDK.

:::warning
Avoiding events duplication

Make sure to turn off sending subscription events from devices and your server to avoid duplication.
:::

## SDK configuration

It’s essential to send Adjust attribution data from the device to Adapty using the `Adapty.updateAttribution()` SDK method. With this attribution, Adapty receives `adjust_device_id`, which is crucial for successful integration. Here's how you can do it:

```swift title="iOS (Swift)"
// Find your implementation of AdjustDelegate 
// and update adjustAttributionChanged method:
func adjustAttributionChanged(_ attribution: ADJAttribution?) {
    if let attribution = attribution?.dictionary() {
        Adapty.updateAttribution(attribution, source: .adjust)
    }
}
```
```kotlin title="Android (Kotlin)"
val config = AdjustConfig(context, adjustAppToken, environment)
config.setOnAttributionChangedListener { attribution ->
    attribution?.let { attribution ->
        Adapty.updateAttribution(attribution, AdaptyAttributionSource.ADJUST) { error ->
            if (error != null) {
                //handle error
            }
        }
    }
}
Adjust.onCreate(config)
```
```csharp title="Flutter (Dart)"
import 'package:adjust_sdk/adjust.dart';
import 'package:adjust_sdk/adjust_config.dart';

AdjustConfig config = new AdjustConfig('{YourAppToken}', AdjustEnvironment.sandbox);
      config.attributionCallback = (data) async {
        var attribution = Map<String, String>();
        if (data.trackerToken != null) attribution['trackerToken'] = data.trackerToken!;
        if (data.trackerName != null) attribution['trackerName'] = data.trackerName!;
        if (data.network != null) attribution['network'] = data.network!;
        if (data.adgroup != null) attribution['adgroup'] = data.adgroup!;
        if (data.creative != null) attribution['creative'] = data.creative!;
        if (data.clickLabel != null) attribution['clickLabel'] = data.clickLabel!;
        if (data.adid != null) attribution['adid'] = data.adid!;
        if (data.costType != null) attribution['costType'] = data.costType!;
        if (data.costAmount != null) attribution['costAmount'] = data.costAmount!.toString();
        if (data.costCurrency != null) attribution['costCurrency'] = data.costCurrency!;
        if (data.fbInstallReferrer != null) attribution['fbInstallReferrer'] = data.fbInstallReferrer!;

        try {
          await Adapty().updateAttribution(attribution, source: AdaptyAttributionSource.adjust);
        } on AdaptyError catch (adaptyError) {
          // handle error
        } catch (e) {}
      };
```
```typescript title="React Native (TS)"
import { Adjust, AdjustConfig } from "react-native-adjust";
import { adapty } from "react-native-adapty";

var adjustConfig = new AdjustConfig(appToken, environment);

// Before submiting Adjust config...
adjustConfig.setAttributionCallbackListener(attribution => {
  // Make sure Adapty SDK is activated at this point
  // You may want to lock this thread awaiting of `activate`
  adapty.updateAttribution(attribution, "adjust");
});

// ...
Adjust.create(adjustConfig);
```
```csharp title="Unity (C#)"
AdjustConfig adjustConfig = new AdjustConfig("{Your App Token}", AdjustEnvironment.Sandbox);
adjustConfig.setAttributionChangedDelegate(this.attributionChangedDelegate);

public void attributionChangedDelegate(AdjustAttribution attribution) {
    Dictionary<String, object> data = new Dictionary<String, object>();

    if (attribution.adid != null) data["adid"] = attribution.adid;
    if (attribution.network != null) data["network"] = attribution.network;
    if (attribution.campaign != null) data["campaign"] = attribution.campaign;
    if (attribution.adgroup != null) data["adgroup"] = attribution.adgroup;
    if (attribution.creative != null) data["creative"] = attribution.creative;

    String attributionString = JsonUtility.ToJson(data);
    Adapty.UpdateAttribution(attributionString, AttributionSource.Adjust, (error) => {
        // handle the error
    });
}
```