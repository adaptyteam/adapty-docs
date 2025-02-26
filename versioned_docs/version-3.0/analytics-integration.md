---
title: "Analytics integrations"
description: "Integrate analytics tools with Adapty to track and optimize user subscriptions."
metadataTitle: "Analytics Integration Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty sends all [subscription events](events) to analytical services, such as [Amplitude](amplitude), [Mixpanel](mixpanel), and [AppMetrica](appmetrica). We can also send events to your server using [webhook](webhook) integration. The best thing about this is that you don't have to send any of the events, we'll do it for you. Just make sure to configure the integration in the Adapty Dashboard.

Adapty supports the integration with the following 3d-party analytics services:

- [Amplitude](amplitude)
- [AppMetrica](appmetrica)
- [Firebase and Google Analytics](firebase-and-google-analytics)
- [Mixpanel](mixpanel)
- [SplitMetrics Acquire](splitmetrics)

:::note
Don't see your analytics provider?

Let us know! [Write to the Adapty support](mailto:support@adapty.io) and we'll consider adding it.
:::

### Setting the profile's identifier

Set the profile's identifier for the selected analytics using [`.setIntegrationIdentifier`](setting-user-attributes#setting-user-attributes) method. For example, for Amplitude integration, you can set either `amplitudeUserId` or `amplitudeDeviceId`. For Mixpanel integration, you have to set `mixpanelUserId`. When these identifiers are not set, Adapty will use `customerUserId` instead. If the `customerUserId` is not set, we will use our internal profile ID.

:::warning
Avoiding duplication

Don't forget to turn off sending subscription events from devices and your server to avoid duplication
:::

### Disabling external analytics for a specific customer

You may want to stop sending analytics events for a specific customer. This is useful if you have an option in your app to opt-out of analytics services.

To disable external analytics for a customer, use `updateProfile()` method. Create `AdaptyProfileParameters.Builder` object and set the corresponding value to it.  
When external analytics is blocked, Adapty won't be sending any events to any integrations for the specific user. If you want to disable an integration for all users of your app, just turn it off in Adapty Dashboard.

<Tabs groupId="current-os" queryString>
<TabItem value="Swift" label="Swift" default>
```swift showLineNumbers
let builder = AdaptyProfileParameters.Builder()
    .with(analyticsDisabled: true)

Adapty.updateProfile(parameters: builder.build())
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
val builder = AdaptyProfileParameters.Builder()
    .withExternalAnalyticsDisabled(true)
  
Adapty.updateProfile(builder.build())
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers ]
AdaptyProfileParameters.Builder builder = new AdaptyProfileParameters.Builder()
    .withExternalAnalyticsDisabled(true);

Adapty.updateProfile(builder.build());
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript showLineNumbers
final builder = AdaptyProfileParametersBuilder()
  ..setAnalyticsDisabled(true);

try {
  await Adapty().updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp showLineNumbers
var builder = new AdaptyProfileParameters.Builder()
    .SetAnalyticsDisabled(true);

Adapty.UpdateProfile(builder.Build(), (error) => {
    if(error != null) {
      // handle the error
    }
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript showLineNumbers
adapty.updateProfile({ analyticsDisabled: true });
```
</TabItem>
</Tabs>

### Disable collection of advertising identifiers

<Tabs groupId="current-os" queryString>
<TabItem value="Swift" label="iOS" default>
You can disable IDFA collection by using the `idfaCollectionDisabled` property. Make sure you call it before `.activate()` method.

```swift showLineNumbers
// In your AppDelegate class:
import Adapty

let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "PUBLIC_SDK_KEY")
 // highlight-start
        .with(idfaCollectionDisabled: true) // set to `true`
// highlight-end

Adapty.activate(with: configurationBuilder) { error in
  // handle the error
}
```
</TabItem>

<TabItem value="kotlin" label="Android (Kotlin)" default>
You can disable AAID/GAID collection by using the `withAdIdCollectionDisabled` property when activating the Adapty SDK:

```swift showLineNumbers
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(true) // set to `true`
      // highlight-end
          .build()
    )  
}
```

</TabItem>

<TabItem value="java" label="Android (Java)" default>
You can disable AAID/GAID collection by using the `withAdIdCollectionDisabled` property when activating the Adapty SDK:

```swift showLineNumbers 
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(true) // set to `true`
      // highlight-end
          .build()
    );
}
```

</TabItem>

<TabItem value="flutter" label="Flutter" default>
You can disable IDFA collecting by using the `withAppleIdfaCollectionDisabled` property and Google/Android Advertising ID by using the `withGoogleAdvertisingIdCollectionDisabled` property. Set them to `true` when activating the Adapty SDK:

```dart showLineNumbers
try {
    await Adapty().activate(
        configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
 // highlight-start
          ..withGoogleAdvertisingIdCollectionDisabled(true), // set to `true`
          ..withAppleIdfaCollectionDisabled(true), // set to `true`
// highlight-end
    );
} catch (e) {
    // handle the error
}
```
</TabItem>

<TabItem value="unity" label="Unity" default>
You can disable IDFA collecting by using the `SetIDFACollectionDisabled` property when activating the Adapty SDK. The AAID/GAID collection cannot be disabled now.

```dart showLineNumbers
var builder = new AdaptyConfiguration.Builder("YOUR_API_KEY")
 // highlight-start
    .SetIDFACollectionDisabled(true); // set to `true`
 // highlight-end

Adapty.Activate(builder.Build(), (error) => {
    // handle the error
}
```

</TabItem>

<TabItem value="rn" label="React Native" default>
You also can disable IDFA collecting by using `idfaCollectionDisabled` property when activating the Adapty SDK. The AAID/GAID collection cannot be disabled now.

```typescript showLineNumbers
adapty.activate('PUBLIC_SDK_KEY', {
  // highlight-start 
  ios: {
    idfaCollectionDisabled: true, // set to `true`
  },
  // highlight-end
});
```
</TabItem>
</Tabs>