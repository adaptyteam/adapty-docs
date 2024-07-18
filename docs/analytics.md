---
title: "Analytics integration"
description: ""
metadataTitle: ""
---

Adapty sends all [subscription events](events) to analytical services, such as [Amplitude](amplitude), [Mixpanel](mixpanel), and [AppMetrica](appmetrica). We can also send events to your server using [webhook](webhook) integration. The best thing about this is that you don't have to send any of the events, we'll do it for you. Just make sure to configure the integration in Adapty Dashboard.

### Setting the profile's identifier

Set the profile's identifier for the selected analytics using [`.updateProfile()`](setting-user-attributes#setting-user-attributes) method. For example, for Amplitude integration, you can set either `amplitudeUserId` or `amplitudeDeviceId`. For Mixpanel integration, you have to set `mixpanelUserId`. When these identifiers are not set, Adapty will use `customerUserId` instead. If the `customerUserId` is not set, we will use our internal profile id.

:::warning
Avoiding duplication

Don't forget to turn off sending subscription events from devices and your server to avoid duplication
:::

### Disabling external analytics for a specific customer

You may want to stop sending analytics events for a specific customer. This is useful if you have an option in your app to opt-out of analytics services.

To disable external analytics for a customer, use `updateProfile()` method. Create `AdaptyProfileParameters.Builder` object and set corresponding value to it.  
When external analytics is blocked, Adapty won't be sending any events to any integrations for the specific user. If you want to disable an integration for all users of your app, just turn it off in Adapty Dashboard.

```swift title="title="let builder = AdaptyProfileParameters.Builder()""
    .with(analyticsDisabled: true)

Adapty.updateProfile(parameters: builder.build())
```
```kotlin title="title="val builder = AdaptyProfileParameters.Builder()""
    .withExternalAnalyticsDisabled(true)
  
Adapty.updateProfile(builder.build())
```
```java title="title="AdaptyProfileParameters.Builder builder = new AdaptyProfileParameters.Builder()""
    .withExternalAnalyticsDisabled(true);

Adapty.updateProfile(builder.build());
```
```javascript title="title="Flutter""
final builder = AdaptyProfileParametersBuilder()
	..setAnalyticsDisabled(true);

try {
  await Adapty().updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```typescript title="title="React Native""
adapty.updateProfile({ analyticsDisabled: true });
```
```csharp title="title="Unity""
var builder = new Adapty.ProfileParameters.Builder()
		.SetAnalyticsDisabled(true);

Adapty.UpdateProfile(builder.Build(), (error) => {
    if(error != null) {
      // handle the error
    }
});
```

### Disable collection of IDFA

#### iOS

You can disable IDFA collecting by using property `idfaCollectionDisabled`. Make sure you call it before `.activate()` method.

```swift title="title="Adapty.idfaCollectionDisabled = true""
Adapty.activate("YOUR_ADAPTY_APP_TOKEN")
```

#### Flutter, React Native, Unity

You can disable IDFA collecting by adding specific key to the Adapty-Info.plist file:

```xml title="title="Adapty-Info.plist""
<key>AdaptyIDFACollectionDisabled</key>
<true/>
```

#### React Native

You also can disable IDFA collecting by setting `idfaCollectionDisabled` flag in your activation flow:

```typescript title="title="adapty.activate('PUBLIC_SDK_KEY', {""
  ios: {
    idfaCollectionDisabled: false,
  },
});
```