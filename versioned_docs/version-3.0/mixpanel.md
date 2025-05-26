---
title: "Mixpanel"
description: "Connect Mixpanel with Adapty for powerful subscription analytics."
metadataTitle: "Mixpanel Integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[Mixpanel](https://mixpanel.com/) is a powerful product analytics service. Its event-driven tracking solution empowers product teams to get valuable insights into optimal user acquisition, conversion, and retention strategies across different platforms.  

This integration enables you to bring all the Adapty events into Mixpanel. As a result, you'll gain a more comprehensive insight into your subscription business and customer actions. Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective.

## How to set up Mixpanel integration

1. Open the [Integrations -> Mixpanel](https://app.adapty.io/integrations/mixpanel) page in the Adapty Dashboard.
2. Enable the toggle and enter your **Mixpanel Token**. You can specify a token for all platforms or limit it to specific platforms if you only want to receive data from certain ones.

<Zoom>
  <img src={require('./img/mixpanel.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Finding Your Mixpanel Token

To get your **Mixpanel Token**:

1. Log in to your [Mixpanel Dashboard](https://mixpanel.com/settings/project/).
2. Open **Settings** and select **Organization Settings**.

<Zoom>
  <img src={require('./img/mixpanel-settings.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
3. From the left sidebar, go to **Projects** and select your project.

<Zoom>
  <img src={require('./img/mixpanel-project-id.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## How the integration works

Adapty automatically maps relevant event properties—such as user ID and revenue—to [Mixpanel-native properties](https://help.mixpanel.com/hc/en-us/articles/115004708186-Profile-Properties). This ensures accurate tracking and reporting of subscription-related events.

Additionally, Adapty accumulates revenue data per user and updates their [User Profile Properties](https://docs.mixpanel.com/docs/tracking/how-tos/user-profiles), including `subscription state` and `subscription product ID`. Once an event is received, Mixpanel updates the corresponding fields in real time.

## Events and tags

Below the credentials, there are three groups of events you can send to Mixpanel from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).


<Zoom>
  <img src={require('./img/mixpanel-events.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs.

## SDK configuration

Use `.setIntegrationIdentifier()` method to set `mixpanelUserId`.  If not set, Adapty uses your user ID (`customerUserId`) or if it's null Adapty ID. Make sure that the user id you use to send data to Mixpanel from your app is the same one you send to Adapty.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>

```swift showLineNumbers
import Mixpanel

do {
    try await Adapty.setIntegrationIdentifier(
        key: "mixpanel_user_id", 
        value: Mixpanel.mainInstance().distinctId
    )
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="swift-callback" label="iOS (Swift-Callback)" default>

```swift showLineNumbers
import Mixpanel

let builder = AdaptyProfileParameters.Builder()
            .with(mixpanelUserId: Mixpanel.mainInstance().distinctId)

Adapty.updateProfile(params: builder.build())
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin showLineNumbers
Adapty.setIntegrationIdentifier("mixpanel_user_id", mixpanelAPI.distinctId) { error ->
    if (error != null) {
        // handle the error
    }
}
```
</TabItem>
<TabItem value="flutter" label="Flutter (Dart)" default>

```javascript showLineNumbers
import 'package:mixpanel_flutter/mixpanel_flutter.dart';

final mixpanel = await Mixpanel.init("Your Token", trackAutomaticEvents: true);
final distinctId = await mixpanel.getDistinctId();

try {
    await Adapty().setIntegrationIdentifier(
        key: "mixpanel_user_id", 
        value: distinctId,
    );
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
    // handle the error
}
```
</TabItem>
<TabItem value="unity" label="Unity (C#)" default>

```csharp showLineNumbers
using AdaptySDK;

var distinctId = Mixpanel.DistinctId;

if (distinctId != null) {
  Adapty.SetIntegrationIdentifier(
    "mixpanel_user_id", 
    distinctId, 
    (error) => {
    // handle the error
  });
}
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
import { adapty } from 'react-native-adapty';
import { Mixpanel } from 'mixpanel-react-native';

// ...
try {
  await adapty.setIntegrationIdentifier("mixpanel_user_id", mixpanelUserId);
} catch (error) {
  // handle `AdaptyError`
}
```
</TabItem>
</Tabs>