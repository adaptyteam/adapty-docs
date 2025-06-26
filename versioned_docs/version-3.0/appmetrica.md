---
title: "AppMetrica"
description: "Integrate AppMetrica with Adapty for in-depth subscription analytics."
metadataTitle: "AppMetrica Integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[AppMetrica](https://appmetrica.yandex.ru/en/about) is a free analytics tool that helps you track user behavior and analyze your mobile app's performance in real time. By integrating AppMetrica with Adapty, you can gain deeper insights into your subscription metrics and user engagement.

## How to set up AppMetrica integration

Setting up the AppMetrica integration involves two main steps:

1. Configure the integration in the Adapty Dashboard
2. Set up the integration in your app's code

### Dashboard configuration

To set up the AppMetrica integration:

1. Open the [AppMetrica apps list](https://appmetrica.yandex.ru/application/list)
2. Select the app you want to track
3. Go to **Settings** and copy the **Application ID** and **Post API key** 
<Zoom>
  <img src={require('./img/0f09ff5-CleanShot_2023-08-18_at_19.56.422x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
4. Go to [Integrations > AppMetrica](https://app.adapty.io/integrations/appmetrica) in the Adapty Dashboard
5. Paste your AppMetrica credentials.

<Zoom>
  <img src={require('./img/appmetrica_creds.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


### Events and tags

Adapty allows you to send three groups of events to AppMetrica. You can enable the events you need to track your app's performance. For a complete list of available events, see our [events documentation](events).

:::note
AppMetrica syncs events every 4 hours, so there may be a delay before events appear in your dashboard. 
:::

<Zoom>
  <img src={require('./img/6ed2d88-CleanShot_2023-08-18_at_14.59.042x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::tip
We recommend using Adapty's default event names for consistency, but you can customize them to match your existing analytics setup.
:::

### Revenue settings

By default, Adapty sends revenue data as properties in events, which appear in AppMetrica's Events report. You can configure how this revenue data is calculated and displayed:

- **Revenue calculation**: Choose how revenue values are calculated to match your financial reporting needs:
  - **Gross revenue**: Shows the total revenue before any deductions, useful for tracking the full amount customers pay
  - **Proceeds after store commission**: Displays revenue after App Store/Play Store fees are deducted, helping you track actual earnings
  - **Proceeds after store commission and taxes**: Shows net revenue after both store fees and applicable taxes, providing the most accurate picture of your earnings

- **Report user's currency**: When enabled, sales are reported in the user's local currency, making it easier to analyze revenue by region. When disabled, all sales are converted to USD for consistent reporting across different markets.

- **Send revenue events**: Enable this option to make revenue data appear not only in the Events report but also in AppMetrica's [In-app and ad revenue](https://appmetrica.yandex.com/docs/en/mobile-reports/revenue-report) report. Make sure you’re not sending revenue from anywhere else, as this may result in duplication.

- **Exclude historical events**: When enabled, Adapty won't send events that occurred before the user installed the app with Adapty SDK. This helps avoid data duplication if you were already sending events to analytics before integrating Adapty.

<Zoom>
  <img src={require('./img/appmetrica_revenue.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### SDK configuration

To enable the AppMetrica integration in your app, you need to set up two identifiers:

1. `appmetrica_device_id`: Required for basic integration
2. `appmetrica_profile_id`: Optional, but recommended if your app has user registration

Use the `setIntegrationIdentifier()` method to set these values. Here's how to implement it for each platform:

<Tabs groupId="current-os" queryString>
<TabItem value="Swift" label="iOS (Swift)" default>

**Setting appmetrica_device_id**

```swift showLineNumbers
val startupParamsCallback = object: StartupParamsCallback {
    override fun onReceive(result: StartupParamsCallback.Result?) {
        val deviceIdHash = result?.deviceIdHash ?: return

        Adapty.setIntegrationIdentifier("appmetrica_device_id", deviceIdHash) { error ->
            if (error != null) {
                // handle the error
            }
        }
    }

    override fun onRequestError(
        reason: StartupParamsCallback.Reason,
        result: StartupParamsCallback.Result?
    ) {
        //handle the error
    }
}

AppMetrica.requestStartupParams(context, startupParamsCallback, listOf(StartupParamsCallback.APPMETRICA_DEVICE_ID_HASH))
```

**Setting appmetrica_profile_id**

```swift showLineNumbers
do {
  try await Adapty.setIntegrationIdentifier(
    key: "appmetrica_profile_id",
    value: "YOUR_APPMETRICA_PROFILE_ID"
  )
} catch {
  // handle the error
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

**Setting appmetrica_device_id**

```kotlin showLineNumbers 
val startupParamsCallback = object: StartupParamsCallback {
    override fun onReceive(result: StartupParamsCallback.Result?) {
        val deviceIdHash = result?.deviceIdHash ?: return

        Adapty.setIntegrationIdentifier("appmetrica_device_id", deviceIdHash) { error ->
            if (error != null) {
                // handle the error
            }
        }
    }

    override fun onRequestError(
        reason: StartupParamsCallback.Reason,
        result: StartupParamsCallback.Result?
    ) {
        //handle the error
    }
}

AppMetrica.requestStartupParams(context, startupParamsCallback, listOf(StartupParamsCallback.APPMETRICA_DEVICE_ID_HASH))
```

**Setting appmetrica_profile_id**

```kotlin showLineNumbers
val startupParamsCallback = object: StartupParamsCallback {
    override fun onReceive(result: StartupParamsCallback.Result?) {
        val deviceIdHash = result?.deviceIdHash ?: return

        Adapty.setIntegrationIdentifier("appmetrica_device_id", deviceIdHash) { error ->
            if (error != null) {
                // handle the error
            }
        }
        
        Adapty.setIntegrationIdentifier("appmetrica_profile_id", "YOUR_ADAPTY_CUSTOMER_USER_ID") { error ->
            if (error != null) {
                // handle the error
            }
        }
    }

    override fun onRequestError(
        reason: StartupParamsCallback.Reason,
        result: StartupParamsCallback.Result?
    ) {
        //handle the error
    }
}

AppMetrica.requestStartupParams(context, startupParamsCallback, listOf(StartupParamsCallback.APPMETRICA_DEVICE_ID_HASH))
```
</TabItem>
<TabItem value="Flutter" label="Flutter (Dart)" default>

**Setting appmetrica_device_id**

```javascript showLineNumbers
import 'package:appmetrica_plugin/appmetrica_plugin.dart';

final startupParams = await AppMetrica.requestStartupParams([AppMetricaStartupParams.deviceIdHashKey]);
final deviceIdHash = startupParams.result?.deviceIdHash;

if (deviceIdHash != null) {
  try {
    await Adapty().setIntegrationIdentifier(
        key: "appmetrica_device_id", 
        value: deviceIdHash,
    );
  } on AdaptyError catch (adaptyError) {
    // handle the error
  } catch (e) {
    // handle the error
  }
}
```

**Setting appmetrica_profile_id**

```javascript showLineNumbers
import 'package:appmetrica_plugin/appmetrica_plugin.dart';

try {
    await Adapty().setIntegrationIdentifier(
        key: "appmetrica_profile_id", 
        value: "YOUR_APPMETRICA_PROFILE_ID",
    );
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
    // handle the error
}
```
</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>

**Setting appmetrica_device_id**

```csharp showLineNumbers
using AdaptySDK;
using Io.AppMetrica;

AppMetrica.RequestStartupParams(
    (result, errorReason) => {
        string deviceIdHash = result.DeviceIdHash;

        if (deviceIdHash != null) {
            Adapty.SetIntegrationIdentifier(
                "appmetrica_device_id",
                deviceIdHash,
                (error) => {
                    // handle the error
                });
          }
      },
      new List<string>() { StartupParamsKey.AppMetricaDeviceIDHash }
);
```

**Setting appmetrica_profile_id**

```csharp showLineNumbers
Adapty.SetIntegrationIdentifier(
  "appmetrica_profile_id",
  "YOUR_APPMETRICA_PROFILE_ID",
  (error) => {
    // handle the error
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

**Setting appmetrica_device_id**

```typescript showLineNumbers
import { adapty } from 'react-native-adapty';
import AppMetrica, { DEVICE_ID_HASH_KEY, StartupParams, StartupParamsReason } from '@appmetrica/react-native-analytics';

// ...
const startupParamsCallback = async (
  params?: StartupParams,
  reason?: StartupParamsReason
) => {
  const deviceIdHash = params?.deviceIdHash
  if (deviceIdHash) {
    try {
      await adapty.setIntegrationIdentifier("appmetrica_device_id", deviceIdHash);
    } catch (error) {
      // handle `AdaptyError`
    }
  }
}

AppMetrica.requestStartupParams(startupParamsCallback, [DEVICE_ID_HASH_KEY])
```

**Setting appmetrica_profile_id**

```typescript showLineNumbers
import { adapty } from 'react-native-adapty';

try {
  await adapty.setIntegrationIdentifier("appmetrica_profile_id", 'YOUR_ADAPTY_CUSTOMER_USER_ID');
} catch (error) {
  // handle `AdaptyError`
}
```
</TabItem>
</Tabs>