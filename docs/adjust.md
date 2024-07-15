---
title: "Adjust"
description: ""
metadataTitle: ""
---

[Adjust](https://www.adjust.com/) is one of the leading Mobile Measurement Partner (MMP) platforms, that collects and presents data from marketing campaigns. This helps companies see track their campaign performance. 

Adapty provides a complete set of data that lets you track [subscription events](https://docs.adapty.io/docs/events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. Therefore, this integration allows you to track subscription events in Adjust and analyze precisely how much revenue your campaigns generate.

The integration between Adapty and Adjust works in two main ways.

1. **Receiving attribution data from Adjust**  
   Once you've set up the Adjust integration, Adapty will start receiving attribution data from Adjust. You can easily access and view this data on the user's profile page.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/98769d9-CleanShot_2023-08-11_at_14.39.182x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





2. **Sending subscription events to Adjust**  
   Adapty can send all subscription events which are configured in your integration to Adjust. As a result, you'll be able to track these events within the Adjust dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## How to set up Adjust integration

To setup the integration with Adjust go to [Integrations > Adjust](https://app.adapty.io/integrations/adjust) in the Adapty Dashboard, turn on a toggle from off to on, and fill out fields.

The next step of the integration is to set credentials.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/5064125-CleanShot_2023-08-11_at_14.43.382x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





1. If you have enabled OAuth authorization on the Adjust platform, it is mandatory to provide an **OAuth Token **during the integration process for your iOS and Android apps.
2. Next, you need to provide the **app tokens** for your iOS and Android apps. Open your Adjust dashboard and you'll see your apps.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/e9ee52e-image_52.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





:::note
You may have different Adjust applications for iOS and Android, so in Adapty you have two independent sections for that. If you have only one Adjust app, just fill in the same information
:::

You will need to copy **App Token** and paste it to Adapty.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/4b1601c-image_36.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





Another important thing is that Adjust doesn't support events older than 58 days. So, if you have an event that is more than 58 days old, Adapty will send it to Adjust, but the event datetime will be replaced by the current timestamp.

## Events and tags

Adjust works a bit differently from other platforms. You need to manually create events in Adjust dashboard, get event tokens, and copy-paste them to appropriate events in Adapty.

So first step here is to find event tokens for all events that you want Adapty to send. To do that go to All Settings in your Adjust dashboard.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/6c6b9a0-image_83.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/4d4f40d-image_9.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/815515f-image_16.png" 
    style={{ width: '689px', border: '1px solid grey' }}
  />
</div>





Copy the event token and paste it to Adapty. Below the credentials, there are three groups of events you can send to Adjsut from Adapty. Check the full list of the events offered by Adapty [here](https://docs.adapty.io/docs/events).


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/8940282-CleanShot_2023-08-11_at_14.55.222x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





Adapty will send subscription events to Adjust using a server-to-server integration, allowing you to view all subscription events in your Adjust dashboard and link them to your acquisition campaigns.

## SDK configuration

It's very important to send Adjust attribution data from the device to Adapty using `Adapty.updateAttribution()` SDK method. The example below shows how to do that.

```swift iOS (Swift)
// Find your implementation of AdjustDelegate 
// and update adjustAttributionChanged method:
func adjustAttributionChanged(_ attribution: ADJAttribution?) {
    if let attribution = attribution?.dictionary() {
        Adapty.updateAttribution(attribution, source: .adjust)
    }
}
```
```kotlin Android (Kotlin)
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
```csharp Flutter (Dart)
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
```typescript React Native (TS)
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
```csharp Unity (C#)
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