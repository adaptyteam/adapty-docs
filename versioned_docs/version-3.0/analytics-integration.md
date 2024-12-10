---
title: "Analytics integrations"
description: ""
metadataTitle: ""
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

Set the profile's identifier for the selected analytics using [`.updateProfile()`](setting-user-attributes#setting-user-attributes) method. For example, for Amplitude integration, you can set either `amplitudeUserId` or `amplitudeDeviceId`. For Mixpanel integration, you have to set `mixpanelUserId`. When these identifiers are not set, Adapty will use `customerUserId` instead. If the `customerUserId` is not set, we will use our internal profile ID.

:::warning
Avoiding duplication

Don't forget to turn off sending subscription events from devices and your server to avoid duplication
:::

### Disabling external analytics for a specific customer

You may want to stop sending analytics events for a specific customer. This is useful if you have an option in your app to opt-out of analytics services.

To disable external analytics for a customer, use `updateProfile()` method. Create `AdaptyProfileParameters.Builder` object and set the corresponding value to it.  
When external analytics is blocked, Adapty won't be sending any events to any integrations for the specific user. If you want to disable an integration for all users of your app, just turn it off in Adapty Dashboard.

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
let builder = AdaptyProfileParameters.Builder()
    .with(analyticsDisabled: true)

Adapty.updateProfile(parameters: builder.build())
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
val builder = AdaptyProfileParameters.Builder()
    .withExternalAnalyticsDisabled(true)
  
Adapty.updateProfile(builder.build())
```
</TabItem>
<TabItem value="java" label="Java" default>
```java ]
AdaptyProfileParameters.Builder builder = new AdaptyProfileParameters.Builder()
    .withExternalAnalyticsDisabled(true);

Adapty.updateProfile(builder.build());
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
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
```csharp 
var builder = new Adapty.ProfileParameters.Builder()
    .SetAnalyticsDisabled(true);

Adapty.UpdateProfile(builder.Build(), (error) => {
    if(error != null) {
      // handle the error
    }
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
adapty.updateProfile({ analyticsDisabled: true });
```
</TabItem>
</Tabs>

### Disable collection of IDFA

<Tabs>
<TabItem value="Swift" label="iOS" default>
You can disable IDFA collecting by using property `idfaCollectionDisabled`. Make sure you call it before `.activate()` method.

```swift title="Swift"
Adapty.idfaCollectionDisabled = true
Adapty.activate("YOUR_ADAPTY_APP_TOKEN")
```
</TabItem>
<TabItem value="kotlin" label="Flutter, React Native, Unity" default>
You can disable IDFA collecting by adding specific key to the Adapty-Info.plist file:

```xml title="Adapty-Info.plist"
<key>AdaptyIDFACollectionDisabled</key>
<true/>
```
</TabItem>
<TabItem value="java" label="React Native" default>
You also can disable IDFA collecting by setting `idfaCollectionDisabled` flag in your activation flow:

```typescript title="Typescript"
adapty.activate('PUBLIC_SDK_KEY', {
  ios: {
    idfaCollectionDisabled: false,
  },
});
```
</TabItem>
</Tabs>