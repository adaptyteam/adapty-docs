---
title: "Tenjin integration"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Tenjin is a mobile attribution and analytics platform for app developers and marketers. It provides tools to measure and optimize user acquisition campaigns by offering detailed insights into app performance and user behavior. With its transparent and flexible approach, Tenjin aggregates data from advertising networks and app stores, enabling teams to analyze ROI, track conversions, and monitor key performance metrics.

By forwarding [subscription events](events) to Tenjin, you can see exactly where conversions come from and which campaigns bring in the most value across all channels, platforms, and devices. Essentially, Tenjin dashboards offer advanced analytics for marketing campaigns. 

By forwarding Tenjin's attribution to Adapty, you enrich the Adapty analytics with additional filtration criteria you can use in cohort and conversion analysis.

This integration operates in two key ways:

1. **Receiving attribution data from Tenjin**
   Once integrated, Adapty collects attribution data from Tenjin. You can access this information on the user’s profile page in the Adapty Dashboard.
2. **Sending subscription events to Tenjin**
   Adapty sends purchase events to Tenjin in real-time. These events help evaluate the effectiveness of your ad campaigns directly within Tenjin’s dashboard.

## Integration Characteristics

| Integration characteristic | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| Schedule                   | Real-time                                                    |
| Data direction             | <p>Two-way transmission:</p><ul><li> **Adapty events**: From Adapty server to Tenjin server</li><li> **Tenjin attribution**: From Tenjin SDK to Adapty server</li></ul> |
| Adapty integration point   | <ul><li> Tenjin and Adapty SDKs in the mobile app code</li><li> Adapty server</li></ul> |

## Tenjin event structure

Adapty sends selected events to Tenjin as configured in the **Events names** section on the [**Tenjin Integration page**](https://app.adapty.io/integrations/tenjin). Each event is structured like this:

```json showLineNumbers title="Json"
{
  "price": 99.0,
  "locale": "en-US",
  "country": "ME",
  "postcut": "false",
  "currency": "USD",
  "platform": "ios",
  "quantity": 1,
  "bundle_id": "com.adapty.adaptydemoapp",
  "ip_address": "127.0.0.1",
  "os_version": "18.1.1",
  "product_id": "month.premium.99",
  "app_version": "3.2.0",
  "sdk_version": "server",
  "device_model": "iPhone 13 Mini",
  "advertising_id": "00000000-0000-0000-0000-000000000000",
  "os_version_release": "18.1.1",
  "developer_device_id": "00000000-0000-0000-0000-000000000000",
  "analytics_installation_id": "00000000-0000-0000-0000-000000000000"
}
```

Where

| **Parameter**                 | **Type**         | **Description**                                              |
| ----------------------------- | ---------------- | ------------------------------------------------------------ |
| **price**                     | Float            | The unit price of the item purchased in the currency standard unit (e.g., USD is reported in dollars). |
| **locale**                    | String           | The locale of the device. For Android: `Locale.getDefault().toString()`. For iOS: `[[NSLocale currentLocale] localeIdentifier]`. |
| **country**                   | String           | The ISO locale country code standard (e.g., US for the United States). |
| **postcut**                   | String (Boolean) | Indicates whether the purchase was sent after the platform cut. 1 for true, 0 for false. |
| **currency**                  | String           | The ISO currency code (e.g., USD for US dollars).            |
| **platform**                  | String           | The platform of the device (e.g., ios, android, windows, amazon). |
| **quantity**                  | Integer          | The number of units purchased.                               |
| **bundle_id**                 | String           | The bundle identifier of the app (e.g., `com.example.app`).  |
| **ip_address**                | String (IPv4)    | The user’s IP address. Used to look up the country.          |
| **os_version**                | String           | The OS version of the device. For Android: `String.valueOf(Build.VERSION.SDK_INT)`. For iOS: `[[UIDevice currentDevice] systemVersion]`. |
| **product_id**                | String           | Unique identifier for the product purchased.                 |
| **app_version**               | Float, Decimal   | The version of the app. For Android: `context.getPackageManager().getPackageInfo()`. For iOS: `[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"]`. |
| **sdk_version**               | String           | The SDK version in use, always set to `server`.              |
| **device_model**              | String           | The model of the device. For Android: `Build.MODEL`. For iOS: `sysctl("hw.machine")`. |
| **advertising_id**            | UUID             | The advertising ID of the device. Required for Android. For iOS, it can be empty or all zeros. |
| **os_version_release**        | String           | The OS version release. For Android: `String.valueOf(Build.VERSION.RELEASE)`. For iOS: `[[UIDevice currentDevice] systemVersion]`. |
| **developer_device_id**       | UUID             | The identifier for the vendor (iOS only).                    |
| **analytics_installation_id** | UUID             | Analytics installation ID. For details, refer to the documentation at `https://docs.tenjin.com`. |

## Setting up Tenjin integration

1. Open the [**Integrations** -> **Tenjin**](https://app.adapty.io/integrations/tenjin) page in the Adapty Dashboard.

2. Enable the toggle to activate the integration.

   <Zoom>
     <img src={require('./img/tenjin-toggle.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. Log into the [Tenjin Dashboard](https://tenjin.io).

4. Go to **Configuration** -> **Apps** in the navigation menu.

   <Zoom>
     <img src={require('./img/tenjin-apps.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

5. Select the app you want to integrate and navigate to the **App and SDK** tab.

6. In the **App and SDK** tab, click **Copy** in the **SDK Key** column. If you don’t have an SDK key yet, click the **Generate SDK Key** button to create one.

   <Zoom>
     <img src={require('./img/tenjin-copy-sdk-key.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>


9. Paste the copied SDK Key into the **SDK Key** or **Sandbox SDK Key** field in the Adapty Dashboard. 

   :::info

   Tenjin doesn’t have a specific Sandbox mode for server-to-server integration. Use a separate Tenjin app or the same key for both production and sandbox events.
   :::

10. (optional) Adjust the **How the revenue data should be sent** section if needed. For a detailed explanation of its settings, refer to the [Integration settings](configuration#integration-settings).

11. Click **Save** to finalize the setup.

Adapty will now send purchase events to Tenjin and receive attribution data. You can adjust event sharing in the **Events names** section.

## Events and tags

Tenjin only accepts purchase and **Trial started** events. In the **Events names** section, select which events to share with Tenjin to align with your tracking goals.

<Zoom>
  <img src={require('./img/tenjin-events.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## SDK configuration

It's very important to send Tenjin attribution data from the device to Adapty using `Adapty.updateAttribution()` SDK method. The example below shows how to do that.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>

```swift showLineNumbers
import TenjinSDK

func updateTenjinId() {
    guard let tenjinId = TenjinSDK.getAnalyticsInstallationId() else { return }

    do {
        try await Adapty.setIntegrationIdentifier(
            key: "tenjin_analytics_installation_id",
            value: tenjinId
        )
    } catch {
        // handle the error
    }
}

func updateTenjinAttribution() {
    let instance = TenjinSDK.getInstance("<YOUR_TENJIN_API_TOKEN>")
        
    instance?.getAttributionInfo { info, _ in
        guard let info else { return }

        Task {
            do {
                try await Adapty.updateAttribution(info, source: "tenjin")
            } catch {
                // handle the error
            }
        }
    }
}
```

</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin showLineNumbers
Adapty.setIntegrationIdentifier("tenjin_analytics_installation_id", tenjinSdk.analyticsInstallationId) { error ->
    if (error != null) {
        // handle the error
    }
}
```

</TabItem>

<TabItem value="java" label="Android (Java)" default>

```java showLineNumbers
Adapty.setIntegrationIdentifier("tenjin_analytics_installation_id", tenjinSdk.getAnalyticsInstallationId(), error -> {
    if (error != null) {
        // handle the error
    }
});
```

</TabItem>

<TabItem value="flutter" label="Flutter (Dart)" default>

```javascript showLineNumbers
try {
    final tenjinId = await TenjinSDK.instance.getAnalyticsInstallationId();
    
    if (tenjinId != null) {
        await Adapty().setIntegrationIdentifier(
            key: 'tenjin_analytics_installation_id', 
            value: tenjinId,
        );
    }

    final attribution = await TenjinSDK.instance.getAttributionInfo();
    if (attribution != null) {
        await Adapty().updateAttribution(attribution, source: 'tenjin');
    }
} catch (e) {
    // handle the error
}
```

</TabItem>
<TabItem value="unity" label="Unity (C#)" default>

```csharp showLineNumbers
using AdaptySDK;
using System.Linq;

BaseTenjin instance = Tenjin.getInstance("<SDK_KEY>");
var tenjinId = instance.GetAnalyticsInstallationId();

Adapty.SetIntegrationIdentifier(
    "tenjin_analytics_installation_id",
    tenjinId,
    (error) => {
        // handle the error
    });

instance.GetAttributionInfo((attribution) => {
    var dynamicAttribution = attribution.ToDictionary(
        kvp => kvp.Key,
        kvp => (dynamic)kvp.Value
    );
                
Adapty.UpdateAttribution(
    dynamicAttribution,
    "tenjin",
    (error) => {
        // handle the error
    });
});
```

</TabItem>

<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
import { adapty } from 'react-native-adapty';
import Tenjin from 'react-native-tenjin';

// ...
const posthog = usePostHog()

// ...
try {
  await adapty.setIntegrationIdentifier("tenjin_analytics_installation_id", await Tenjin.getAnalyticsInstallationId());
} catch (error) {
  // handle `AdaptyError`
}
```

</TabItem>
</Tabs>

