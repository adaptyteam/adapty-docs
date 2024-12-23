---
title: "Set up Adjust integration"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

We consider that you have already set up your Adjust system and installed Adjust SDK in the mobile app.

Adapty integration with Adjust is done in the following steps:

1. [Enable and configure the integration in the Adapty Dashboard](set-up-adjust-integration#enable-and-configure-the-integration-in-the-adapty-dashboard).
2. [Create events and tags in Adjust](set-up-adjust-integration#create-events-and-tags-in-adjust)
3. [Select events to send to Adjust and rename them](set-up-adjust-integration#select-events-to-send-to-adjust-and-rename-them)
4. [Enable integration on the Adapty SDK level](appsflyer-setup#enable-integration-on-the-adapty-sdk-level).

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

<img
  src={require('./img/adjust_open_s2s_security.webp').default}
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

<img
  src={require('./img/adjust_token.webp').default}
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

<img
  src={require('./img/adjust_adapty_oath_token.webp').default}
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

<img
  src={require('./img/adjust_app_token.webp').default}
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

<img
  src={require('./img/adjust_adapty_app_token.webp').default}
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

<img
  src={require('./img/adjust_add_event.webp').default}
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

<img
  src={require('./img/adjust_add_new_event.webp').default}
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

<img
  src={require('./img/adjust_copy_event.webp').default}
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

<img
  src={require('./img/adjust_adapty_event_on.webp').default}
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

<img
  src={require('./img/adjust_adapty_event_token.webp').default}
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

It's very important to send Adjust attribution data from the device to Adapty using `Adapty.updateAttribution()` SDK method. The example below shows how to do that.

<Tabs>

<TabItem value="v5" label="Adjust 5.x+" default>

For Adjust version 5.0 or later, use the following:

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>

```swift 
class AdjustModuleImplementation {

func updateAdjustAdid() {
    Adjust.adid { adid in
        guard let adid else { return }

        Adapty.setIntegrationIdentifier(key: "adjust_device_id", value: adid)
    }
}

func updateAdjustAttribution() {
    Adjust.attribution { attribution in
        guard let attribution = attribution?.dictionary() else { 
            return
        }
        
        Adapty.updateAttribution(attribution, source: "adjust")
    }
}

}
```

</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin 
Adjust.getAttribution { attribution ->
    if (attribution == null) return@getAttribution

    Adjust.getAdid { adid ->
        if (adid == null) return@getAdid

        Adapty.updateAttribution(attribution, AdaptyAttributionSource.ADJUST, adid) { error ->
            // handle the error
        }
    }
}
```

</TabItem>

<TabItem value="java" label="Android (Java)" default>

```java
Adjust.getAttribution(attribution -> {
    if (attribution == null) return;

    Adjust.getAdid(adid -> {
        if (adid == null) return;

        Adapty.updateAttribution(attribution, AdaptyAttributionSource.ADJUST, adid, error -> {
            // handle the error
        });
    });
});
```

</TabItem>

<TabItem value="Flutter" label="Flutter" default>

```javascript 
import 'package:adjust_sdk/adjust.dart';
import 'package:adjust_sdk/adjust_config.dart';

try {
  final adid = await Adjust.getAdid();

  if (adid == null) {
    // handle the error
  }

  final attributionData = await Adjust.getAttribution();

  var attribution = Map<String, String>();

  if (attributionData.trackerToken != null) attribution['trackerToken'] = attributionData.trackerToken!;
  if (attributionData.trackerName != null) attribution['trackerName'] = attributionData.trackerName!;
  if (attributionData.network != null) attribution['network'] = attributionData.network!;
  if (attributionData.adgroup != null) attribution['adgroup'] = attributionData.adgroup!;
  if (attributionData.creative != null) attribution['creative'] = attributionData.creative!;
  if (attributionData.clickLabel != null) attribution['clickLabel'] = attributionData.clickLabel!;
  if (attributionData.costType != null) attribution['costType'] = attributionData.costType!;
  if (attributionData.costAmount != null) attribution['costAmount'] = attributionData.costAmount!.toString();
  if (attributionData.costCurrency != null) attribution['costCurrency'] = attributionData.costCurrency!;
  if (attributionData.fbInstallReferrer != null) attribution['fbInstallReferrer'] = attributionData.fbInstallReferrer!;

  Adapty().updateAttribution(
    attribution,
    source: AdaptyAttributionSource.adjust,
    networkUserId: adid,
  );
} catch (e) {
  // handle the error
}
```

</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>

```csharp 
using static AdaptySDK.Adapty;
using AdjustSdk;

Adjust.GetAdid((adid) => {
  Adjust.GetAttribution((attribution) => {
    Dictionary<String, object> data = new Dictionary<String, object>();

    data["network"] = attribution.Network;
    data["campaign"] = attribution.Campaign;
    data["adgroup"] = attribution.Adgroup;
    data["creative"] = attribution.Creative;

    String attributionString = JsonUtility.ToJson(data);
    Adapty.UpdateAttribution(attributionString, AttributionSource.Adjust, adid, (error) => {
      // handle the error
    });
  });
});
```

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript 
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

</TabItem>
</Tabs>

</TabItem>

<TabItem value="v4" label="Adjust 4.x" default>

For Adjust version 4.x or earlier, use the following:

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>

```swift 
class YourAdjustDelegateImplementation {
	// Find your implementation of AdjustDelegate 
	// and update adjustAttributionChanged method:
	func adjustAttributionChanged(_ attribution: ADJAttribution?) {
	    if let attribution = attribution?.dictionary() {
	        Adapty.updateAttribution(attribution, source: "adjust")
	    }
	}
}
```

</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin 
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

</TabItem>
<TabItem value="Flutter" label="Flutter" default>

```javascript 
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

</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>

```csharp 
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

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript 
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

</TabItem>
</Tabs>

</TabItem>
</Tabs>

