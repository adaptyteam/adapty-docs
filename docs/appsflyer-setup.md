---
title: "Set up AppsFlyer integration"
description: ""
metadataTitle: ""
---

We consider that you have already set up your AppsFlyer system and installed AppsFlyer SDK in the mobile app by now.

Adapty integration with AppsFlyer is done in the following steps:

1. [Enable and configure the integration in the Adapty Dashboard](appsflyer-setup#enable-and-configure-the-integration-in-the-adapty-dashboard).
2. [Select the events you want to receive](appsflyer-setup#select-events-to-send-to-appsflyer-and-rename-them).
3. [Enable integration on the Adapty SDK level](appsflyer-setup#enable-integration-on-the-adapty-sdk-level).

:::warning
Avoiding events duplication

Make sure to turn off sending subscription events from devices and your server to avoid duplication.
:::

## Enable and configure the integration in the Adapty Dashboard

To set up the integration with AppsFlyer:

1. Open [**Integrations** -> **AppsFlyer**](https://app.adapty.io/integrations/appsflyer) in the Adapty Dashboard.

2. Turn on the toggle to initiate the integration. Set the Adapty Dashboard aside without closing it.

3. If you use iOS, open your app page in [App Store Connect](https://appstoreconnect.apple.com/), go to the **App Information** page -> section **General**, and copy **Apple ID**.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/43a5cc6-apple_id.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




4. Paste the copied **Apple ID** to the **iOS App ID** in the Adapty Dashboard.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/61bff5a-appsflyer_iOS_app_id.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




   > 🚧 If you use AppsFlyer API 2, you need to switch to API 3, since the previous version will be deprecated by AppsFlyer soon. To do so, in the **AppsFlyer S2S API** list, select **API 3**.

5. Open the [AppsFlyer site](https://hq1.appsflyer.com/home). 

6. Click **Your account name** -> **Security Center** in the top-left corner of the dashboard.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/1c18c50-appsflyer_security_center.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




7. In the **Manage your account security** window, click the **Manage your AppsFlyer API and S2S tokens** button.

8. If you have an S2S token, please proceed with step 12. If you do not have it, click the **New token** button. 

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/7934920-appsflyer_new_token.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




9. In the **New token** window, enter the name of the token. This name is solely for your reference. 

10. Choose **S2S** in the **Choose type** list.

11. Click the **Create new token** button to save the new token.

12. In the **Tokens** window, copy the S2S token.

13. In the Adapty Dashboard, paste the copied S2S key into the **Dev key for iOS** and **Dev key for Android** fields. 


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/01f24b4-appsflyer_dev_keys.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





14. Click the **Save** button to save the changes. 

Please note that the moment you click the **Save** button, the integration is on and Adapty starts sending events to AppsFlyer. 

:::warning
Don't forget to turn off sending subscription events from devices and your server to avoid duplication.
:::

:::note
AppsFlyer doesn't have a Sandbox mode for server2server integration. So you need a different application/account in AppsFlyer for Sandbox Dev Key. If you want to send sandbox events to the same app, just use the same key for production and sandbox.
:::

Adapty maps some events to AppsFlyer [standard events](https://support.appsflyer.com/hc/en-us/articles/115005544169-Rich-in-app-events-for-Android-and-iOS#event-types) by default. With such a configuration, AppsFlyer can further send events to each ad network that you use without additional setup.

Another important thing is that AppsFlyer doesn't support events older than 24 hours. So, if you have an event that is more than a day old, Adapty will send it to Appsflyer, but the event date and time will be replaced by the current timestamp.

## Select events to send to AppsFlyer and rename them

In the [**Integrations** -> **AppsFlyer**](https://app.adapty.io/integrations/appsflyer) page of the Adapty Dashboard, below the credentials, you can choose the events you want to send to AppsFlyer from Adapty. Simply turn on the toggles next to the [events](events) you need.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/1b0c777-CleanShot_2023-08-11_at_14.56.362x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs.

Adapty will send subscription events to AppsFlyer using a server-to-server integration, allowing you to view all subscription events in your AppsFlyer dashboard and link them to your acquisition campaigns.

## Enable integration on the Adapty SDK level

It’s essential to send AppsFlyer attribution data from the device to Adapty using the`Adapty.updateAttribution()` SDK method. With this attribution, Adapty receives `appsflyer_id`, which is crucial for successful integration. Here's how you can do it:

```swift iOS (Swift)
// Find your implementation of AppsFlyerLibDelegate 
// and update onConversionDataSuccess method:
func onConversionDataSuccess(_ installData: [AnyHashable : Any]) {
    // It's important to include the network user ID
    Adapty.updateAttribution(installData, source: .appsflyer, networkUserId: AppsFlyerLib.shared().getAppsFlyerUID())
}
```
```kotlin Android (Kotlin)
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
```javascript Flutter (Dart)
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
```typescript React Native (JS)
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
```csharp Unity (C#)
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

Make sure you call `AppsFlyerLibDelegate` before updating the `onConversionDataSuccess` method.