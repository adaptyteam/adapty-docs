---
title: "Get started with Adapty User Acquisition"
description: "Connect with Adapty User Acquisition to blend ad spending and subscription revenue and see the whole app economy in one place."
metadataTitle: "Connecting with Adapty User Acquisition | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

User Acquisition helps you connect ad spend with subscription revenue, giving you a complete view of your app's economy in one place. 

This is a one-way integration — to see your revenue data in User Acquisition, you must first enable the integration in the Adapty dashboard. You don't need to pass any API keys, tokens, or identifiers. Just update and configure the Adapty SDK.

:::warning
User Acquisition is only available with the Adapty SDK version 3.9.1 or higher.
:::

## Enable the User Acquisition integration

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
- Subscriptions
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

## Listen for installation details updates

:::important
You need to [install and activate the Adapty SDK](installation-of-adapty-sdks.md) first.
:::

To listen for installation details updates, use these two methods:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

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

<TabItem value="android" label="Kotlin">

```kotlin showLineNumbers
Adapty.setOnInstallationDetailsListener(object: OnInstallationDetailsListener {
    override fun onInstallationDetailsSuccess(details: AdaptyInstallationDetails) {
        // use installation details
    }
    override fun onInstallationDetailsFailure(error: AdaptyError) {
        // installation details update failed
    }
})
```

</TabItem>

<TabItem value="rn" label="React Native" default>

```typescript showLineNumbers
adapty.addEventListener('onInstallationDetailsSuccess', data => {
    // use installation details
});

adapty.addEventListener('onInstallationDetailsFail', error => {
    // installation details update failed
});
```

</TabItem>


<TabItem value="flutter" label="Flutter">

```javascript showLineNumbers
Adapty().onUpdateInstallationDetailsSuccessStream.listen((details) {
    // use installation details
});

Adapty().onUpdateInstallationDetailsFailStream.listen((error) {
    // installation details update failed
});
```

</TabItem>

</Tabs>

You can also retrieve the installation status manually:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

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
<TabItem value="android" label="Kotlin">

```kotlin showLineNumbers
Adapty.getCurrentInstallationStatus { result ->
    when (result) {
        is AdaptyResult.Success -> {
            when (result.value) {
                is AdaptyInstallationStatus.Determined.Success -> {
                    // Use the installation details
                }
                is AdaptyInstallationStatus.Determined.NotAvailable -> {
                    // Installation details are not available on this device
                }
                is AdaptyInstallationStatus.NotDetermined -> {
                    // Installation details have not been determined yet
                }
            }
        }
        is AdaptyResult.Error -> {
            // handle the error
        }
    }
}
```

</TabItem>

<TabItem value="rn" label="React Native" default>

```typescript showLineNumbers
try {
    const installationStatus = await adapty.getCurrentInstallationStatus();

    switch (installationStatus.status) {
        case 'not_available':
            // Installation details are not available on this device
            break;
        case 'not_determined':
            // Installation details have not been determined yet
            break;
        case 'determined':
            const details = installationStatus.details;
            // Use the installation details
            break;
    }
} catch (error) {
    // handle the error
}
```

</TabItem>

<TabItem value="flutter" label="Flutter">

```javascript showLineNumbers
try {
    final status = await Adapty().getCurrentInstallationStatus();

    switch (status) {
        case AdaptyInstallationStatusNotAvailable():
        // Installation details are not available on this device
        case AdaptyInstallationStatusNotDetermined():
        // Installation details have not been determined yet
        case AdaptyInstallationStatusDetermined(details: final details):
        // Use the installation details
    }
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
    // handle the error
}
```

</TabItem>

</Tabs>