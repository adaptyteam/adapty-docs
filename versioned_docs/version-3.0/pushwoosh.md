---
title: "Pushwoosh"
description: "Integrate Pushwoosh with Adapty for seamless push notification tracking."
metadataTitle: "Pushwoosh Integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty uses subscription events to update [Pushwoosh](https://www.pushwoosh.com/) profile tags, so you can build target communication with customers using push notifications after a short and easy integration setting as described below. 

## How to set up Pushwoosh integration

To integrate Pushwoosh go to [**Integrations** -> **Pushwoosh**](https://app.adapty.io/integrations/pushwoosh), turn on a toggle from off to on, and fill out fields.

First of all set credentials to build a connection between your Pushwoosh and Adapty profiles.  
Pushwoosh app ID and auth token are required. 


<Zoom>
  <img src={require('./img/64e48a1-CleanShot_2023-08-18_at_11.13.212x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. **App ID** can be found in your Pushwoosh dashboard.


<Zoom>
  <img src={require('./img/ee27687-CleanShot_2023-08-18_at_14.37.442x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. **Auth token **can be found in the API Access section in Pushwoosh Settings.


<Zoom>
  <img src={require('./img/50e634b-CleanShot_2023-08-18_at_14.35.022x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Events and tags

Below the credentials, there are three groups of events you can send to Pushwoosh from Adapty. Simply turn on the ones you need. You may also change the names of the events as you need to send it to Pushwoosh. Check the full list of the Events offered by Adapty [here](events).


<Zoom>
  <img src={require('./img/392dc31-screencapture-app-adapty-io-integrations-pushwoosh-2023-08-22-13_31_07.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Adapty will send subscription events to Pushwoosh using a server-to-server integration, allowing you to view all subscription events in your Pushwoosh Dashboard.

:::note
Custom tags

With Adapty you can also use your custom tags for Pushwoosh integration.  You can refer to the list of tags provided below to determine which tag is best suited for your needs.
:::

| Tag | Type | Value |
|---|----|-----|
| `adapty_customer_user_id` | String | Contains the value of the unique identifier of the user, which can be found on the Pushwoosh side. |
| `adapty_profile_id` | String | Contains the value of the unique identifier Adapty User Profile ID of the user, which can be found in your Adapty [dashboard](profiles-crm). |
| `environment` | String | <p>Indicates whether the user is operating in a sandbox or production environment.</p><p></p><p>Values are either `Sandbox` or `Production`</p> |
| `store` | String | <p>Contains the name of the Store that used to make the purchase.</p><p></p><p>Possible values:</p><p>`app_store` or `play_store`.</p> |
| `vendor_product_id` | String | <p>Contains the value of Product ID in the Apple/Google store.</p><p></p><p>e.g., org.locals.12345</p> |
| `subscription_expires_at` | String | <p>Contains the expiration date of the latest subscription.</p><p></p><p>Value format is:</p><p>year-month dayThour:minute:second</p><p>e.g., 2023-02-10T17:22:03.000000+0000</p> |
| `last_event_type` | String | Indicates the type of the last received event from the list of the standard [Adapty events](events) that you have enabled for the integration. |
| `purchase_date` | String | <p>Contains the date of the last transaction (original purchase or renewal).</p><p></p><p>Value format is:</p><p>year-month dayThour:minute:second</p><p>e.g., 2023-02-10T17:22:03.000000+0000</p> |
| `original_purchase_date` | String | <p>Contains the date of the first purchase according to the transaction.</p><p></p><p>Value format is:</p><p>year-month dayThour:minute:second</p><p>e.g., 2023-02-10T17:22:03.000000+0000</p> |
| `active_subscription` | String | The value will be set to `true` on any purchase/renewal event, or `false` if the subscription is expired. |
| `period_type` | String | <p>Indicates the latest period type for the purchase or renewal.</p><p></p><p>Possible values are</p><p>`trial` for a trial period or `normal` for the rest.</p> |


All float values will be rounded to int. Strings stay the same. 

In addition to the pre-defined list of tags available, it is possible to send [custom attributes](segments#custom-attributes) using tags. This allows for more flexibility in the type of data that can be included with the tag and can be useful for tracking specific information related to a product or service. All custom user attributes are sent automatically to Pushwoosh if the user marks the ** Send user custom attributes** checkbox from[ the integration page](https://app.adapty.io/integrations/pushwoosh)

## SDK configuration

To link Adapty with Pushwoosh, you need to send us the `HWID` value:

<Tabs groupId="current-os" queryString>
<TabItem value="Swift" label="iOS (Swift)" default>
```swift showLineNumbers
do {
    try await Adapty.setIntegrationIdentifier(
        key: "pushwoosh_hwid", 
        value: Pushwoosh.sharedInstance().getHWID()
    )
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>
```kotlin showLineNumbers
Adapty.setIntegrationIdentifier("pushwoosh_hwid", Pushwoosh.getInstance().hwid) { error ->
    if (error != null) {
        // handle the error
    }
}
```
</TabItem>
<TabItem value="java" label="Android (Java)" default>
```java showLineNumbers
Adapty.setIntegrationIdentifier("pushwoosh_hwid", Pushwoosh.getInstance().getHwid(), error -> {
    if (error != null) {
        // handle the error
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter (Dart)" default>
```javascript showLineNumbers
import 'package:pushwoosh/pushwoosh.dart';

final hwid = await Pushwoosh.getInstance.getHWID;

try {
    await Adapty().setIntegrationIdentifier(
        key: "pushwoosh_hwid", 
        value: hwid,
    );
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
    // handle the error
}
```
</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>
```csharp showLineNumbers
using AdaptySDK;

Adapty.SetIntegrationIdentifier(
  "pushwoosh_hwid", 
  Pushwoosh.Instance.HWID, 
  (error) => {
  // handle the error
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript showLineNumbers
import { adapty } from 'react-native-adapty';
import Pushwoosh from 'pushwoosh-react-native-plugin';

// ...
try {
  await adapty.setIntegrationIdentifier("pushwoosh_hwid", hwid);
} catch (error) {
  // handle `AdaptyError`
}
```
</TabItem>
</Tabs>