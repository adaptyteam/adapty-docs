---
title: "User Acquisition"
description: "Connect with Adapty User Acquisition to blend ad spending and subscription revenue and see the whole app economy in one place."
metadataTitle: "Connecting with Adapty User Acquisition | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

User Acquisition helps you connect ad spend with subscription revenue, giving you a complete view of your app's economy in one place. 

This is a one-way integration — to see your revenue data in User Acquisition, you must first enable the integration in the Adapty dashboard and configure the Adapty SDK.

:::warning
User Acquisition is only available with iOS Adapty SDK version 3.9.0 or higher. Compatibility with Adapty SDK for Android and Flutter will be available soon.
:::

## How to set up User Acquisition integration
To enable the integration:
1. Go to [Integrations > Adapty](https://app.adapty.io/integrations/user-acquisition) in the Adapty Dashboard.
2. Turn on the toggle.

Once your events begin firing, you’ll see the following details for each event:
- Event name
- Status
- Environment
- Date time

<Zoom>
  <img src={require('./img/toggle-ua.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Events

By default, Adapty sends three groups of events to User Acquisition:
- Trials
- Subscription
- Issues

You can check the full list of supported events [here](events.md).

<Zoom>
  <img src={require('./img/events-ua.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## SDK configuration

To listen for installation details updates, extend `AdaptyDelegate` with these two methods:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>

```swift showLineNumbers
Adapty.delegate = self

nonisolated func onInstallationDetailsSuccess(_ details: AdaptyInstallationDetails) {
    // use installation details
}

nonisolated func onInstallationDetailsFail(error: AdaptyError) {
    // installation details update failed
}
```

</TabItem>
</Tabs>

You can also retrieve the installation status manually:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>

```swift showLineNumbers
do {
    let status = try await Adapty.getCurrentInstallationStatus()
    
    switch status {
    case .notAvailable:
        // Installation details are not available on this device
    case .notDetermined:
        // Installation details have not been determined yet
    case .determined(let details):
        // Use the installation details
    }
} catch {
    // handle the error
}
```

</TabItem>
</Tabs>