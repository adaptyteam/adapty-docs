---
title: "AppsFlyer"
description: "Integrate AppsFlyer with Adapty for advanced mobile attribution tracking."
metadataTitle: "AppsFlyer Integration | Adapty Docs"
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

3. The next step of the integration is to set credentials. 
   For iOS, find App ID in the copy **Apple ID** in the App Store Connect (to do it, open your app page in [App Store Connect](https://appstoreconnect.apple.com/), go to the **App Information** page in **General** section, and find **Apple ID** in the left bottom part of the screen).
   
   

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




3.2. Paste the copied **Apple ID** to the **iOS App ID** in the Adapty Dashboard.

   

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



:::warning

If you use AppsFlyer API 2, you need to switch to API 3, since the previous version will be deprecated by AppsFlyer soon. To do so, in the **AppsFlyer S2S API** list, select **API 3**.

:::

5. For both iOS and Android, open the [AppsFlyer site](https://appsflyer.com/home) and log in. 

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
    
    :::info
    
    AppsFlyer doesn't have a Sandbox mode for server2server integration. So you need a different application/account in AppsFlyer for Sandbox Dev Key. If you want to send sandbox events to the same app, just use the same key for production and sandbox.
    :::

Adapty maps some events to AppsFlyer [standard events](https://support.appsflyer.com/hc/en-us/articles/115005544169-Rich-in-app-events-for-Android-and-iOS#event-types) by default. With such a configuration, AppsFlyer can then forward events to each ad network that you use without additional setup.

Another important thing is that AppsFlyer doesn't support events older than 26 hours. So, if you have an event that is more than 26 hours old, Adapty will send it to AppsFlyer, but the event date and time will be replaced by the current timestamp.

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

It's very important to send AppsFlyer attribution data from the device to Adapty using the `Adapty.updateAttribution()` SDK method and the `Adapty.setIntegrationIdentifier()` method to set the integration identifier. The example below shows how to do that.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>

```swift showLineNumbers
class YourAppsFlyerLibDelegateImplementation {
    // Find your implementation of AppsFlyerLibDelegate 
    // and update onConversionDataSuccess method:
    func onConversionDataSuccess(_ conversionInfo: [AnyHashable : Any]) {
        let uid = AppsFlyerLib.shared().getAppsFlyerUID()
        Adapty.setIntegrationIdentifier(key: "appsflyer_id", value: uid)
        Adapty.updateAttribution(conversionInfo, source: "appsflyer")
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin showLineNumbers
val conversionListener: AppsFlyerConversionListener = object : AppsFlyerConversionListener {
    override fun onConversionDataSuccess(conversionData: Map<String, Any>) {
        val uid = AppsFlyerLib.getInstance().getAppsFlyerUID(context)
        Adapty.setIntegrationIdentifier("appsflyer_id", uid) { error ->
            if (error != null) {
                // handle the error
            }
        }
        Adapty.updateAttribution(conversionData, "appsflyer") { error ->
            if (error != null) {
                //handle the error
            }
        }
    }
}
```
</TabItem>
<TabItem value="flutter" label="Flutter (Dart)" default>

```javascript showLineNumbers
import 'package:appsflyer_sdk/appsflyer_sdk.dart';

AppsflyerSdk appsflyerSdk = AppsflyerSdk(<YOUR_OPTIONS>);

appsflyerSdk.onInstallConversionData((data) async {
    try {
        final appsFlyerUID = await appsFlyerSdk.getAppsFlyerUID();
        
        await Adapty().setIntegrationIdentifier(
          key: "appsflyer_id", 
          value: appsFlyerUID,
        );
        
        await Adapty().updateAttribution(data, source: "appsflyer");
    } on AdaptyError catch (adaptyError) {
        // handle the error
    } catch (e) {
        // handle the error
    }
});

appsflyerSdk.initSdk(
    registerConversionDataCallback: true,
    registerOnAppOpenAttributionCallback: true,
    registerOnDeepLinkingCallback: true,
);
```
</TabItem>
<TabItem value="unity" label="Unity (C#)" default>

```csharp showLineNumbers
using AdaptySDK;
using AppsFlyerSDK;

// before SDK initialization
AppsFlyer.getConversionData(this.name);

// in your IAppsFlyerConversionData
void onConversionDataSuccess(string conversionData) {
    string appsFlyerId = AppsFlyer.getAppsFlyerId();
    
    Adapty.SetIntegrationIdentifier(
      "appsflyer_id", 
      appsFlyerId, 
      (error) => {
        // handle the error
    });
    
    Adapty.UpdateAttribution(
      conversionData, 
      "appsflyer",
      (error) => {
        // handle the error
    });
}
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
import { adapty, AttributionSource } from 'react-native-adapty';
import appsFlyer from 'react-native-appsflyer';

appsFlyer.onInstallConversionData(installData => {
    appsFlyer.getAppsFlyerUID((error, networkUserId) => {
        if (error) {
            // handle the error
        }
        try {
            adapty.updateAttribution(installData, AttributionSource.AppsFlyer, networkUserId);
        } catch (error) {
            // handle the error
        }
    });
});

// ...
appsFlyer.initSdk(/*...*/);
```
</TabItem>
</Tabs>

## Troubleshooting

### Revenue discrepancy

If there is a revenue discrepancy between Adapty and AppsFlyer, that might occur because not all your users use the app version that has the Adapty SDK. To ensure the data consistency, you can force your users to update the app to a version with the Adapty SDK.

### Missing integration data

If event sending fails, that is usually because of the missing integration data. Ensure the following to resolve this issue:
- Your app has the AppsFlyer SDK installed.
- You are calling the `getAppsFlyerUID` method.

### Authentication failure

If you are getting the `Failed to authenticate` error in the console, this might be due to the AppsFlyer version and credential version mismatch.

See the [migration guide](switch-from-appsflyer-s2s-api-2-to-3.md) or replace the credentials with the valid ones from [here](https://hq1.appsflyer.com/security-center/api-tokens).

## AppsFlyer event structure

Adapty sends selected events to AppsFlyer via POST request with JSON body to:
- API v2: `https://api2.appsflyer.com/inappevent/{app_id}`
- API v3: `https://api3.appsflyer.com/inappevent/{app_id}` (recommended)

Each event is structured like this:

```json
{
  "appsflyer_id": "1699887556000-6192770",
  "eventName": "subscription_renewed",
  "eventTime": "2024-03-01 12:00:00",
  "eventValue": "{\"af_content_id\":\"yearly.premium.6999\",\"af_order_id\":\"GPA.3383-4699-1373-07113\",\"store_country\":\"US\",\"profile_country\":\"US\",\"af_content_type\":\"in_app\",\"af_revenue\":\"9.9900\",\"af_currency\":\"USD\",\"af_quantity\":\"1\"}",
  "os": "17.0.1",
  "bundleIdentifier": "com.example.app",
  "customer_user_id": "user_12345",
  "eventCurrency": "USD",
  "ip": "192.168.100.1",
  "advertising_id": "00000000-0000-0000-0000-000000000000",
  "idfa": "00000000-0000-0000-0000-000000000000",
  "idfv": "00000000-0000-0000-0000-000000000000",
  "att": "3"
}
```

Headers:

| Header           | Value              |
|:-----------------|:-------------------|
| `accept`         | application/json   |
| `content-type`   | application/json   |
| `authentication` | Your Dev Key (S2S) |

Request body parameters:

| Parameter          | Type   | Description                                                                                                                             |
|:-------------------|:-------|:----------------------------------------------------------------------------------------------------------------------------------------|
| `appsflyer_id`     | String | The AppsFlyer ID (collected via SDK).                                                                                                   |
| `eventName`        | String | The AppsFlyer event name (mapped from Adapty event).                                                                                    |
| `eventTime`        | String | Date and time of the event in UTC (format: `YYYY-MM-DD HH:MM:SS`). If older than 26 hours, replaced with current timestamp.            |
| `eventValue`       | String | JSON string containing event details (see below). Only non-null fields included.                                                        |
| `os`               | String | OS version.                                                                                                                             |
| `bundleIdentifier` | String | The application's bundle ID / package name.                                                                                             |
| `customer_user_id` | String | The user's Customer User ID (if available).                                                                                             |
| `eventCurrency`    | String | Currency code (e.g., "USD"). Only sent if revenue is present.                                                                           |
| `ip`               | String | User's IP address (if available).                                                                                                       |
| `advertising_id`   | String | **Android only**. Google Advertising ID. Set to `00000000-0000-0000-0000-000000000000` if not available.                                |
| `idfa`             | String | **iOS only**. ID for Advertisers. Set to `00000000-0000-0000-0000-000000000000` if not available.                                       |
| `idfv`             | String | **iOS only**. ID for Vendors. Set to `00000000-0000-0000-0000-000000000000` if not available.                                           |
| `att`              | String | **iOS only**. App Tracking Transparency status (e.g., "3" for authorized, "0" if not available).                                        |

The `eventValue` parameter is a JSON string containing the following fields:

| Parameter         | Type   | Description                                                       |
|:------------------|:-------|:------------------------------------------------------------------|
| `af_content_id`   | String | The Product ID from the store (if available).                     |
| `af_order_id`     | String | The original transaction ID (if available).                       |
| `store_country`   | String | Country code of the store user (if available).                    |
| `profile_country` | String | Country code based on user's IP (if available).                   |
| `af_content_type` | String | Always `in_app`. **Only sent if revenue is present.**             |
| `af_revenue`      | String | Revenue amount formatted to 4 decimal places. **Only sent if revenue is present.** |
| `af_currency`     | String | Currency code. **Only sent if revenue is present.**               |
| `af_quantity`     | String | Always `1`. **Only sent if revenue is present.**                  |