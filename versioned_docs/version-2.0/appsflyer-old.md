---
title: "AppsFlyer"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

[AppsFlyer](https://www.appsflyer.com/) is a leading platform for mobile attribution and marketing analytics. It stands as a third-party service that gathers and organizes data from marketing campaigns. This helps companies see how well their campaigns are performing in one place.

Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. Therefore, this integration allows you to track subscription events in AppsFlyer and analyze precisely how much revenue your campaigns generate.

The integration between Adapty and AppsFlyer operates in two main ways.

1. **Receiving attribution data from AppsFlyer**  
   Once you've set up the AppsFlyer integration, Adapty will start receiving attribution data from AppsFlyer. You can easily access and view this data on the user's profile page.


<Zoom>
  <img src={require('./img/c2991f6-CleanShot_2023-08-04_at_16.29.202x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. **Sending subscription events to AppsFlyer**  
   Adapty can send all subscription events which are configured in your integration to AppsFlyer. As a result, you'll be able to track these events within the AppsFlyer dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## How to set up AppsFlyer integration

To setup the integration with AppsFlyer go to [Integrations > AppsFlyer](https://app.adapty.io/integrations/appsflyer) in the Adapty Dashboard, turn on a toggle from off to on, and fill out fields.

The next step of the integration is to set credentials.


<Zoom>
  <img src={require('./img/be269e5-CleanShot_2023-08-04_at_23.51.322x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. To find App ID, open your app page in [App Store Connect](https://appstoreconnect.apple.com/), go to the **App Information** page in section **General**, and find **Apple ID** in the left bottom part of the screen.


<Zoom>
  <img src={require('./img/50d327d-CleanShot_2023-08-05_at_00.09.072x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Open [AppsFlyer](https://hq1.appsflyer.com/auth/login) and navigate to your app page. Scroll the left menu bar, find App Settings, and copy the **Dev Key.** Then you need to use the value Dev Key for your iOS and Android apps in the Adapty Dashboard.


<Zoom>
  <img src={require('./img/b1777fa-CleanShot_2023-08-07_at_13.15.452x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::note
AppsFlyer doesn't have a Sandbox mode for server2server integration. So you need a different application/account in AppsFlyer for Sandbox Dev Key. If you want to send sandbox events to the same app, just use the same key for production and sandbox.
:::

Adapty maps some events to AppsFlyer [standard events](https://support.appsflyer.com/hc/en-us/articles/115005544169-Rich-in-app-events-for-Android-and-iOS#event-types) by default. With such configuration, AppsFlyer can further send events to each ad network that you use without additional setup.

Another important thing is that AppsFlyer doesn't support events older than 24 hours. So, if you have an event that is more than a day old, Adapty will send it to Appsflyer, but the event datetime will be replaced by the current timestamp.

## Events and tags

Below the credentials, there are three groups of events you can send to AppsFlyer from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).


<Zoom>
  <img src={require('./img/1b0c777-CleanShot_2023-08-11_at_14.56.362x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs.

Adapty will send subscription events to AppsFlyer using a server-to-server integration, allowing you to view all subscription events in your AppsFlyer dashboard and link them to your acquisition campaigns.

## SDK configuration

It's very important to send AppsFlyer attribution data from the device to Adapty using `Adapty.updateAttribution()` SDK method. The example below shows how to do that.

```swift title="iOS (Swift)"
// Find your implementation of AppsFlyerLibDelegate 
// and update onConversionDataSuccess method:
func onConversionDataSuccess(_ installData: [AnyHashable : Any]) {
    // It's important to include the network user ID
    Adapty.updateAttribution(installData, source: .appsflyer, networkUserId: AppsFlyerLib.shared().getAppsFlyerUID())
}
```
```kotlin title="Android (Kotlin)"
val conversionListener: AppsFlyerConversionListener = object : AppsFlyerConversionListener {
    override fun onConversionDataSuccess(conversionData: Map<String, Any>) {
        // It's important to include the network user ID
        Adapty.updateAttribution(
            conversionData,
            AdaptyAttributionSource.APPSFLYER,
            AppsFlyerLib.getInstance().getAppsFlyerUID(context)
        ) { error ->
            if (error != null) {
                //handle error
            }
        }
    }
}
```
```javascript title="Flutter (Dart)"
import 'package:appsflyer_sdk/appsflyer_sdk.dart';

AppsflyerSdk appsflyerSdk = AppsflyerSdk(<YOUR_OPTIONS>);
appsflyerSdk.onInstallConversionData((data) async {
    try {
        // It's important to include the network user ID
        final appsFlyerUID = await appsFlyerSdk.getAppsFlyerUID();
        await Adapty().updateAttribution(
          data,
          source: AdaptyAttributionSource.appsflyer,
          networkUserId: appsFlyerUID,
        );
    } on AdaptyError catch (adaptyError) {
        // handle error
    } catch (e) {}
});

appsflyerSdk.initSdk(
    registerConversionDataCallback: true,
    registerOnAppOpenAttributionCallback: true,
    registerOnDeepLinkingCallback: true,
);
```
```typescript title="React Native (JS)"
import { adapty, AttributionSource } from 'react-native-adapty';
import appsFlyer from 'react-native-appsflyer';

appsFlyer.onInstallConversionData(installData => {
	try {
		// It's important to include the network user ID
		const networkUserId = appsFlyer.getAppsFlyerUID();
		adapty.updateAttribution(installData, AttributionSource.AppsFlyer, networkUserId);
	} catch (error) {
		// handle error
	}
});

// ...
appsFlyer.initSdk(/*...*/);
```
```csharp title="Unity (C#)"
using AppsFlyerSDK;

// before SDK initialization
AppsFlyer.getConversionData(this.name);

// in your IAppsFlyerConversionData
void onConversionDataSuccess(string conversionData) {
    // It's important to include the network user ID
    string appsFlyerId = AppsFlyer.getAppsFlyerId();
    Adapty.UpdateAttribution(conversionData, AttributionSource.Appsflyer, appsFlyerId, (error) => {
        // handle the error
    });
}
```