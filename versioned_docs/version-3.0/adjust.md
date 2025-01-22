---
title: "Adjust"
description: ""
metadataTitle: ""

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[Adjust](https://www.adjust.com/) is one of the leading Mobile Measurement Partner (MMP) platforms, that collects and presents data from marketing campaigns. This helps companies track their campaign performance. 

Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. Therefore, this integration allows you to track subscription events in Adjust and analyze precisely how much revenue your campaigns generate.

The integration between Adapty and Adjust works in two main ways.

1. **Receiving attribution data from Adjust**  
   Once you've set up the Adjust integration, Adapty will start receiving attribution data from Adjust. You can easily access and view this data on the user's profile page.

<Zoom>
  <img src={require('./img/98769d9-CleanShot_2023-08-11_at_14.39.182x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. **Sending subscription events to Adjust**  
   Adapty can send all subscription events which are configured in your integration to Adjust. As a result, you'll be able to track these events within the Adjust dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## How to set up Adjust integration

To setup the integration with Adjust go to [Integrations > Adjust](https://app.adapty.io/integrations/adjust) in the Adapty Dashboard, turn on a toggle from off to on, and fill out fields.

The next step of the integration is to set credentials.

<Zoom>
  <img src={require('./img/5064125-CleanShot_2023-08-11_at_14.43.382x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. If you have enabled OAuth authorization on the Adjust platform, it is mandatory to provide an **OAuth Token** during the integration process for your iOS and Android apps.
2. Next, you need to provide the **app tokens** for your iOS and Android apps. Open your Adjust dashboard and you'll see your apps.

<Zoom>
  <img src={require('./img/e9ee52e-image_52.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::note
You may have different Adjust applications for iOS and Android, so in Adapty you have two independent sections for that. If you have only one Adjust app, just fill in the same information
:::

You will need to copy **App Token** and paste it to Adapty.

<Zoom>
  <img src={require('./img/4b1601c-image_36.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Another important thing is that Adjust doesn't support events older than 58 days. So, if you have an event that is more than 58 days old, Adapty will send it to Adjust, but the event datetime will be replaced by the current timestamp.

## Events and tags

Adjust works a bit differently from other platforms. You need to manually create events in Adjust dashboard, get event tokens, and copy-paste them to appropriate events in Adapty.

So first step here is to find event tokens for all events that you want Adapty to send. To do that go to All Settings in your Adjust dashboard.

<Zoom>
  <img src={require('./img/6c6b9a0-image_83.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





<Zoom>
  <img src={require('./img/4d4f40d-image_9.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





<Zoom>
  <img src={require('./img/815515f-image_16.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Copy the event token and paste it to Adapty. Below the credentials, there are three groups of events you can send to Adjsut from Adapty. Check the full list of the events offered by Adapty [here](events).

<Zoom>
  <img src={require('./img/8940282-CleanShot_2023-08-11_at_14.55.222x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Adapty will send subscription events to Adjust using a server-to-server integration, allowing you to view all subscription events in your Adjust dashboard and link them to your acquisition campaigns.

## SDK configuration

It's very important to send Adjust attribution data from the device to Adapty using `setIntegrationIdentifier()` SDK method. The example below shows how to do that.

<Tabs groupId="adjust">

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
Adjust.getAdid { adid ->
    if (adid == null) return@getAdid

    Adapty.setIntegrationIdentifier("adjust_device_id", adid) { error ->
        if (error != null) {
            // handle the error
        }
    }
}

Adjust.getAttribution { attribution ->
    if (attribution == null) return@getAttribution

    Adapty.updateAttribution(attribution, "adjust") { error ->
        // handle the error
    }
}
```

</TabItem>

<TabItem value="java" label="Android (Java)" default>

```java
Adjust.getAdid(adid -> {
    if (adid == null) return;

    Adapty.setIntegrationIdentifier("adjust_device_id", adid, error -> {
        if (error != null) {
            // handle the error
        }
    });
});

Adjust.getAttribution(attribution -> {
    if (attribution == null) return;

    Adapty.updateAttribution(attribution, "adjust", error -> {
        // handle the error
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

Adjust.getAdid((adid) => {
  if (adid)
    adapty.setIntegrationIdentifier("adjust_device_id", adid);
});
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
        Adapty.updateAttribution(attribution, "adjust") { error ->
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

