---
title: "Adjust"
description: "Connect Adjust with Adapty for better subscription tracking and analytics."
metadataTitle: "Adjust Integration for Subscription Analytics | Adapty Docs"

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[Adjust](https://www.adjust.com/) is one of the leading Mobile Measurement Partner (MMP) platforms that collects and presents data from marketing campaigns. This helps companies track their campaign performance. 

Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. Therefore, this integration allows you to track subscription events in Adjust and analyze precisely how much revenue your campaigns generate.

The integration between Adapty and Adjust works in two main ways.

1. **Adapty receives attribution data from Adjust**  
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


2. **Adapty sends subscription events to Adjust**  
   Adapty can send all subscription events which are configured in your integration to Adjust. As a result, you'll be able to track these events within the Adjust dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## How to set up Adjust integration

To set up the integration with Adjust go to [Integrations > Adjust](https://app.adapty.io/integrations/adjust) in the Adapty Dashboard, turn on a toggle from off to on, and fill out fields.

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
  <img src={require('./img/adjust-apps.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


:::note
You may have different Adjust applications for iOS and Android, so in Adapty you have two independent sections for that. If you have only one Adjust app, just fill in the same information.
:::

3. Select your app from the list and copy **App Token**. Then, paste it to Adapty.

<Zoom>
  <img src={require('./img/adjust-token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Events and tags

Adjust works a bit differently from other platforms. You need to manually create events in Adjust dashboard, get event tokens, and copy-paste them to appropriate events in Adapty.

So the first step here is to find event tokens for all events that you want Adapty to send. To do that:

1. In the Adjust dashboard, open your app and switch to the **Events** tab.

<Zoom>
  <img src={require('./img/adjust-events.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Copy the event token and paste it to Adapty. Below the credentials, there are three groups of events you can send to Adjust from Adapty. Check the full list of the events offered by Adapty [here](events).

<Zoom>
  <img src={require('./img/adjust-event-token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


Adapty will send subscription events to Adjust using a server-to-server integration, allowing you to view all subscription events in your Adjust dashboard and link them to your acquisition campaigns.

:::important
Consider the following:
- Adjust doesn't support events older than 58 days. So, if you have an event that is more than 58 days old, Adapty will send it to Adjust, but the event datetime will be replaced by the current timestamp.
- Adjust doesn’t support IPv6. If you disable IP collection in the SDK in **App settings** or on the SDK activation, only a backend IPv6 may be sent, and tracking can fail — keep SDK IP collection enabled to ensure IPv4 is used.
:::

## SDK configuration

To set up the Adjust integration, you need to implement two parts:

1. **To send subscription data to Adjust**: Pass the Adjust device ID using the `setIntegrationIdentifier()` SDK method
2. **To receive attribution data from Adjust**: Update attribution data using the `updateAttribution()` SDK method

For Adjust version 5.0 or later, use the following example:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>

```swift showLineNumbers
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
```

</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin showLineNumbers
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

```java showLineNumbers
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

<TabItem value="flutter" label="Flutter" default>

```javascript showLineNumbers
import 'package:adjust_sdk/adjust.dart';
import 'package:adjust_sdk/adjust_config.dart';

try {
  final adid = await Adjust.getAdid();

  if (adid == null) {
    // handle the error
  }
  
  await Adapty().setIntegrationIdentifier(
    key: "adjust_device_id", 
    value: adid,
  );
    
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

  await Adapty().updateAttribution(attribution, source: "adjust");
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle the error
}
```

</TabItem>
<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
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

## Troubleshooting

### Revenue discrepancy

If there is a revenue discrepancy between Adapty and Adjust, that might occur because not all your users use the app version that has the Adapty SDK. To ensure the data consistency, you can force your users to update the app to a version with the Adapty SDK.
