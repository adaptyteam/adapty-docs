---
title: "AppsFlyer"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[AppsFlyer](https://www.appsflyer.com/) is a leading platform for mobile attribution and marketing analytics. It stands as a third-party service that gathers and organizes data from marketing campaigns. This helps companies see how well their campaigns are performing in one place.

Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. Therefore, this integration allows you to track subscription events in AppsFlyer and analyze precisely how much revenue your campaigns generate.

The integration between Adapty and AppsFlyer operates in two main ways.

1. **Receiving attribution data from AppsFlyer**  
      Once you've [set up sending Appsflyer attribution to Adapty in your app code](appsflyer#sdk-configuration), Adapty will start receiving attribution data from AppsFlyer. You can easily access and view this data on the user's profile page.


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
   Adapty can send all subscription events that are configured in your integration to AppsFlyer. As a result, you'll be able to track these events within the AppsFlyer dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## How to set up AppsFlyer integration

To setup the integration with AppsFlyer:

1. Open [**Integrations** -> **AppsFlyer**](https://app.adapty.io/integrations/appsflyer) in the Adapty Dashboard.

2. Turn on the toggle to enable the integration.

3. The next step of the integration is to set credentials. To find App ID, open your app page in [App Store Connect](https://appstoreconnect.apple.com/), go to the **App Information** page in section **General**, and find **Apple ID** in the left bottom part of the screen.

   

<Zoom>
  <img src={require('./img/43a5cc6-apple_id.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. Paste the copied **Apple ID** to the **iOS App ID** in the Adapty Dashboard.

   

<Zoom>
  <img src={require('./img/61bff5a-appsflyer_iOS_app_id.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




   > 🚧 If you use AppsFlyer API 2, you need to switch to API 3, since the previous version will be deprecated by AppsFlyer soon. To do so, in the **AppsFlyer S2S API** list, select **API 3**.

5. Open the [AppsFlyer site](https://appsflyer.com/home) and log in. 

6. Click **Your account name** -> **Security Center** in the top-right corner of the dashboard.

   

<Zoom>
  <img src={require('./img/1c18c50-appsflyer_security_center.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




7. In the **Manage your account security** window, click the **Manage your AppsFlyer API and S2S tokens** button.

8. If you have an S2S token, please proceed to step 12. If you do not have it, click the **New token** button. 

   

<Zoom>
  <img src={require('./img/7934920-appsflyer_new_token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




9. In the **New token** window, enter the name of the token. This name is solely for your reference. 

10. Choose **S2S** in the **Choose type** list.

11. Click the **Create new token** button to save the new token.

12. In the **Tokens** window, copy the S2S token.

13. In the Adapty Dashboard, paste the copied S2S key into the **Dev key for iOS** and **Dev key for Android** fields. 

    

<Zoom>
  <img src={require('./img/a7d1c31-appsflyer_dev_keys.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




14. Click the **Save** button to save the changes.
    > 📘 AppsFlyer doesn't have a Sandbox mode for server2server integration. So you need a different application/account in AppsFlyer for Sandbox Dev Key. If you want to send sandbox events to the same app, just use the same key for production and sandbox.

Adapty maps some events to AppsFlyer [standard events](https://support.appsflyer.com/hc/en-us/articles/115005544169-Rich-in-app-events-for-Android-and-iOS#event-types) by default. With such a configuration, AppsFlyer can then forward events to each ad network that you use without additional setup.

Another important thing is that AppsFlyer doesn't support events older than 24 hours. So, if you have an event that is more than a day old, Adapty will send it to Appsflyer, but the event date and time will be replaced by the current timestamp.

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

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>
```swift
// Find your implementation of AppsFlyerLibDelegate 
// and update onConversionDataSuccess method:
func onConversionDataSuccess(_ installData: [AnyHashable : Any]) {
    // It's important to include the network user ID
    Adapty.updateAttribution(installData, source: .appsflyer, networkUserId: AppsFlyerLib.shared().getAppsFlyerUID())
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>
```kotlin 
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
</TabItem>
<TabItem value="Flutter" label="Flutter (Dart)" default>
```javascript 
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
</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>
```csharp 
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
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
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
</TabItem>
</Tabs>