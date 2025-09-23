---
title: "Deal with ATT in iOS SDK"
description: "Get started with Adapty on iOS to streamline subscription setup and management."
metadataTitle: "Getting Started with iOS | Adapty Docs"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


If your application uses AppTrackingTransparency framework and presents an app-tracking authorization request to the user, then you should send the [authorization status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus/) to Adapty.

<Tabs groupId="current-os" queryString>

<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
if #available(iOS 14, macOS 11.0, *) {
    let builder = AdaptyProfileParameters.Builder()
        .with(appTrackingTransparencyStatus: .authorized)

    do {
      try await Adapty.updateProfile(params: builder.build())
    } catch {
      // handle the error
    }
}
```
</TabItem>
<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
if #available(iOS 14, macOS 11.0, *) {
    let builder = AdaptyProfileParameters.Builder()
        .with(appTrackingTransparencyStatus: .authorized)

    Adapty.updateProfile(params: builder.build()) { [weak self] error in
        if error != nil {
            // handle the error
        }
    }
}
```
</TabItem>
</Tabs>

:::warning
We strongly recommend that you send this value as early as possible when it changes, only in that case the data will be sent in a timely manner to the integrations you have configured.
:::
