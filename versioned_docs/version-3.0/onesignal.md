---
title: "OneSignal"
description: "Integrate OneSignal with Adapty to improve push notification-based engagement."
metadataTitle: "OneSignal Integration Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[OneSignal](https://onesignal.com/) is a leading customer engagement platform offering push notifications, email, SMS, and in-app messaging. Integrating Adapty with OneSignal enables you to access all your subscription events in one place, allowing you to trigger automated communication based on those events.

With Adapty, you can track [subscription events](events) across multiple stores, analyze user behavior, and use that data for more targeted communication. This integration helps you monitor subscription events within your OneSignal dashboard and map them to your [acquisition campaigns](https://documentation.onesignal.com/docs/automated-messages#example-automated-message-campaigns).

Adapty updates OneSignal tags based on subscription events, enabling you to deliver personalized push notifications with minimal setup.

**Integration characteristics**

| Integration characteristic | Description                                                  |
| :------------------------- | :----------------------------------------------------------- |
| Schedule                   | Real-time updates                                            |
| Data direction             | One-way: from Adapty to OneSignal server                     |
| Adapty integration point   | <ul><li>OneSignal and Adapty SDKs in the mobile app code</li><li>Adapty server</li></ul>|

## Setting up One Signal integration

To set up the integration:

1. Open [**Integrations** → **OneSignal**](https://app.adapty.io/integrations/onesignal) in your Adapty Dashboard.

   <Zoom>
     <img src={require('./img/44c5f25-CleanShot_2023-08-17_at_15.07.162x.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Enable the integration toggle.
3. Enter your **OneSignal App ID**.

To set up the integration with OneSignal, go to [**Integrations** -> **OneSignal**](https://app.adapty.io/integrations/onesignal) in your Adapty dashboard, turn on a toggle, and configure the integration credentials.

## Retrieving your OneSignal App ID

Find your **OneSignal App ID** in your [OneSignal Dashboard](https://dashboard.onesignal.com/login):

1. Navigate to **Settings** → **Keys & IDs**.

   <Zoom>
     <img src={require('./img/7181f82-CleanShot_2023-08-17_at_15.10.262x.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Copy your **App ID** and paste it into the **App ID** field in the Adapty Dashboard.

You can find more information about the OneSignal ID in the [following documentation.](https://documentation.onesignal.com/docs/keys-and-ids) 

### Configuring events & tags

Adapty allows you to send three groups of events to OneSignal. Toggle on the ones you need in the Adapty Dashboard. You can view the complete list of available events with detailed description [here](events).

<Zoom>
  <img src={require('./img/30c7f2e-oneSignal.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Adapty sends subscription events to OneSignal using a server-to-server integration, allowing you to track all subscription-related activity in OneSignal.

:::warning

- Starting April 17, 2023, OneSignal's Free Plan no longer supports this integration. It is available only on **Growth**, **Professional**, and **higher** plans. For details, see [OneSignal Pricing](https://onesignal.com/pricing).

:::

## Custom tags

This integration updates and assigns various properties to your Adapty users as tags, which are then sent to OneSignal. Refer to the list of tags below to find the ones that best fit your needs.
:::warning
OneSignal has a tag limit. This includes both Adapty-generated tags and any existing tags in OneSignal. Exceeding the limit may cause errors when sending events.
:::

| Tag | Type | Description |
|---|----|-----------|
| `adapty_customer_user_id` | String | The unique identifier of the user in your app. It must be consistent across your system, Adapty, and OneSignal. |
| `adapty_profile_id` | String | The Adapty user profile ID, available in your [Adapty Dashboard](profiles-crm). |
| `environment` | String | `Sandbox` or `Production`, indicating the user’s current environment. |
| `store` | String | Store where the product was bought. Options: **app_store**, **play_store**, **stripe**, or the name of your [custom store](custom-store). |
| `vendor_product_id` | String | The product ID in the app store (e.g., `org.locals.12345`). |
| `subscription_expires_at` | String | Expiration date of the latest subscription (`YYYY-MM-DDTHH:MM:SS+0000`, e.g., `2023-02-10T17:22:03.000000+0000`). |
| `last_event_type` | String | The latest event type from the [Adapty event list](events). |
| `purchase_date` | String | Last transaction date (`YYYY-MM-DDTHH:MM:SS+0000`, e.g., `2023-02-10T17:22:03.000000+0000`). |
| `active_subscription` | String | `true` if the user has an active subscription and `false` if the subscription has expired. |
| `period_type` | String | Indicates the most recent period type for the purchase or renewal. Possible values: `trial` for a trial period or `normal` for all other cases. |

All float values are rounded to integers. The strings remain unchanged.

In addition to the predefined tags, you can send [custom attributes](segments#custom-attributes) as tags, providing greater flexibility in the data you include. This is useful for tracking specific details related to your product or service.

Custom user attributes are automatically sent to OneSignal if the **Send User Attributes** checkbox is enabled on the [integration page](https://app.adapty.io/integrations/onesignal). When unchecked, Adapty sends exactly 10 tags. If checked, more than 10 tags can be sent, allowing for enhanced data capture. 


### SDK configuration

There are two ways to integrate OneSignal with Adapty:

1. **Legacy (pre-v5):** Uses `playerId` (deprecated in [OneSignal SDK v5](https://github.com/OneSignal/OneSignal-iOS-SDK/releases/tag/5.0.0)).
2. **Current (v5+):** Uses `subscriptionId`.

:::warning
Make sure to send `playerId` (for OneSignal SDK pre-v5) or `subscriptionId` (for OneSignal SDK v5+) to Adapty. Without this, OneSignal tags won’t be updated, and the integration won’t function properly.
:::

<Tabs> 

<TabItem value="v5+" label="OneSignal SDK v5+ (current)" default> 

<Tabs groupId="onesignal">
<TabItem value="Swift" label="iOS (Swift)" default>

```swift showLineNumbers
// SubscriptionID
OneSignal.Notifications.requestPermission({ accepted in
    Task {
        try await Adapty.setIntegrationIdentifier(
            key: "one_signal_subscription_id", 
            value: OneSignal.User.pushSubscription.id
        )
    }
}, fallbackToSettings: true)
```

</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin showLineNumbers
// SubscriptionID
val oneSignalSubscriptionObserver = object: IPushSubscriptionObserver {
    override fun onPushSubscriptionChange(state: PushSubscriptionChangedState) {
        Adapty.setIntegrationIdentifier("one_signal_subscription_id", state.current.id) { error ->
            if (error != null) {
                // handle the error
            }
        }
    }
}
```

</TabItem>
<TabItem value="java" label="(Android) Java" default>

```java showLineNumbers
// SubscriptionID
IPushSubscriptionObserver oneSignalSubscriptionObserver = state -> {
    Adapty.setIntegrationIdentifier("one_signal_subscription_id", state.getCurrent().getId(), error -> {
        if (error != null) {
            // handle the error
        }
    });
};
```

</TabItem>  

<TabItem value="Flutter" label="Flutter (Dart)" default>

```javascript showLineNumbers
OneSignal.shared.setSubscriptionObserver((changes) {
    final playerId = changes.to.userId;
    if (playerId != null) {
        final builder = 
            AdaptyProfileParametersBuilder()
                ..setOneSignalPlayerId(playerId);
                // ..setOneSignalSubscriptionId(playerId);
        try {
            Adapty().updateProfile(builder.build());
        } on AdaptyError catch (adaptyError) {
            // handle the error
        } catch (e) {
            // handle the error
        }
    }
});
```

</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>

```csharp showLineNumbers
using AdaptySDK;
using OneSignalSDK;

var pushUserId = OneSignal.Default.PushSubscriptionState.userId;

Adapty.SetIntegrationIdentifier(
  "one_signal_player_id", 
  pushUserId, 
  (error) => {
  // handle the error
});
```

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript showLineNumbers
import { adapty } from 'react-native-adapty';
import OneSignal from 'react-native-onesignal';

OneSignal.User.pushSubscription.addEventListener('change', (subscription) => {
  const subscriptionId = subscription.current.id;

  if (subscriptionId) {
    adapty.setIntegrationIdentifier("one_signal_subscription_id", subscriptionId);
  }
});
```

</TabItem>
</Tabs>

 </TabItem> 

<TabItem value="pre-v5" label="OneSignal SDK v. up to 4.x (legacy)" default> 

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>

```swift showLineNumbers
// PlayerID
// in your OSSubscriptionObserver implementation
func onOSSubscriptionChanged(_ stateChanges: OSSubscriptionStateChanges) {
    if let playerId = stateChanges.to.userId {
        Task {
            try await Adapty.setIntegrationIdentifier(
                key: "one_signal_player_id", 
                value: playerId
            )
        }
    }
}
```

</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin showLineNumbers
// PlayerID
val osSubscriptionObserver = OSSubscriptionObserver { stateChanges ->
    stateChanges?.to?.userId?.let { playerId ->
        Adapty.setIntegrationIdentifier("one_signal_player_id", playerId) { error ->
            if (error != null) {
                // handle the error
            }
        }
    }
}
```

</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// PlayerID
OSSubscriptionObserver osSubscriptionObserver = stateChanges -> {
    OSSubscriptionState to = stateChanges != null ? stateChanges.getTo() : null;
    String playerId = to != null ? to.getUserId() : null;
    
    if (playerId != null) {
        Adapty.setIntegrationIdentifier("one_signal_player_id", playerId, error -> {
            if (error != null) {
                // handle the error
            }
        });
    }
};
```

</TabItem>  

<TabItem value="Flutter" label="Flutter (Dart)" default>

```javascript showLineNumbers
// PlayerID (pre-v5 OneSignal SDK)
// in your OSSubscriptionObserver implementation
func onOSSubscriptionChanged(_ stateChanges: OSSubscriptionStateChanges) {
    if let playerId = stateChanges.to.userId {
        Task {
            try await Adapty.setIntegrationIdentifier(
                key: "one_signal_player_id", 
                value: playerId
            )
        }
    }
}
```

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript showLineNumbers
import { adapty } from 'react-native-adapty';
import OneSignal from 'react-native-onesignal';

OneSignal.addSubscriptionObserver(event => {
  const playerId = event.to.userId;
  
  adapty.setIntegrationIdentifier("one_signal_player_id", playerId);
});
```

</TabItem>
</Tabs>

 </TabItem> 

</Tabs>

Read more about `OSSubscriptionObserver` in the [OneSignal documentation](https://documentation.onesignal.com/docs/sdk-reference#handling-subscription-state-changes).

## Dealing with multiple devices

If a user has multiple devices, tracking purchase events and subscriptions can be challenging. OneSignal provides a way to handle this through [external user IDs](https://documentation.onesignal.com/docs/external-user-ids).

To keep user data consistent across devices:

1. Match different devices on your **server side** and send this data to OneSignal.
2. Use Adapty’s [customer_user_id](identifying-users) as an [externalUserId](https://documentation.onesignal.com/docs/external-user-ids#setexternaluserid-method) in OneSignal. If your app doesn't have a registration system, consider using another unique identifier that remains consistent across the user's devices.

It's important to maintain consistency in the user identifier across all devices and update OneSignal whenever a user's ID changes. This simplifies tracking user activity and subscriptions while ensuring consistent messaging and allows for more accurate analytics and a better user experience. For more details, see OneSignal's [external user ID documentation](https://documentation.onesignal.com/docs/external-user-ids).