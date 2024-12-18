---
title: "OneSignal"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

As one of the top customer engagement solutions, [OneSignal ](https://onesignal.com/)provides a wide range of tools for push notifications, email, SMS, and in-app messaging. By integrating Adapty with OneSignal, you can easily access all of your subscription events in one place, giving you the ability to trigger automated communication based on those events. 

Adapty provides a complete set of data that lets you track [subscription events](events) from all stores in one place and can be used to update your OneSignal users. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. Therefore, this integration allows you to track subscription events in your OneSignal dashboard and map them with your [acquisition campaigns.](https://documentation.onesignal.com/docs/automated-messages#example-automated-message-campaigns) 

Adapty uses subscription events to update OneSignal tags, so you can build target communication with customers using OneSignal push notifications after a short and easy integration setting as described below. 

## How to set up One Signal integration

To set up the integration with OneSignal, go to [**Integrations** -> **OneSignal**](https://app.adapty.io/integrations/onesignal) in your Adapty dashboard, turn on a toggle from off to on, and fill out fields.

### Set up credentials in the Adapty Dashboard

The initial step of the integration process is to provide the necessary credentials to establish a connection between your OneSignal and Adapty profiles.  
You'll need to provide your **OneSignal App ID** and **Auth Token**. You can find more information about OneSignal Keys and IDs in [following documentation.](https://documentation.onesignal.com/docs/keys-and-ids) 


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





### Retrieving credentials from OneSignal dashboard

To find your OneSignal app ID and authentication key, simply navigate to your [OneSignal dashboard](https://dashboard.onesignal.com/login).  
Your **App ID** can be found under the **Keys & IDs **section in the Settings tab. 


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





The Auth token can be found in the **Account & API Keys** section of your OneSignal dashboard.


<Zoom>
  <img src={require('./img/238a8ae-CleanShot_2023-08-17_at_15.14.53_22x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





After retrieving your OneSignal App ID and authentication key from the OneSignal dashboard, you need to add them to the Adapty dashboard in the corresponding fields. 

### Events and tags

Below the credentials, there are three groups of events you can send to OneSignal from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).


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





Adapty will send subscription events to OneSignal using a server-to-server integration, allowing you to view all subscription events in your OneSignal Dashboard and link them to your acquisition campaigns.

:::warning
Please consider that starting from April 17th, 2023, it will not be possible to send attribution data from Adapty to OneSignal, if you are using the Free Plan of OneSignal. This integration is only available for OneSignal's Growth, Professional and higher plans. For more info please check [OneSignal pricing.](https://onesignal.com/pricing)

Furthermore, it's important to note that the tag limitation applies to all the tags you have set up in OneSignal, including any existing tags. When sending data from Adapty to OneSignal, the tag limit in OneSignal includes both the tags sent from Adapty and the tags you may have already defined in OneSignal. Therefore, if you exceed the tag limit in OneSignal, it may result in errors when sending events from Adapty.
:::

:::note
Custom tags

This integration can update and set various properties in your Adapty users as tags that will be send to OneSignal. You can refer to the list of tags provided below to determine which tag is best suited for your needs.
:::

| Tag | Type | Description |
|---|----|-----------|
| `adapty_customer_user_id` | String | Contains the value of the unique identifier of the user, which can be found from OneSignal side. |
| `adapty_profile_id` | String | Contains the value of the unique identifier Adapty User Profile ID of the user, which can be found in your Adapty [dashboard](profiles-crm). |
| `environment` | String | <p>Indicates whether the user is operating in a sandbox or production environment.</p><p></p><p>Values are either `Sandbox` or `Production`</p> |
| `store` | String | <p>Contains the name of the Store that used to make the purchase.</p><p></p><p>Possible values:</p><p>`app_store` or `play_store`.</p> |
| `vendor_product_id` | String | <p>Contains the value of Product Id in Apple/Google store.</p><p></p><p>e.g., org.locals.12345</p> |
| `subscription_expires_at` | String | <p>Contains the expiration date of the latest subscription.</p><p></p><p>Value format is:</p><p>year-month dayThour:minute:second</p><p>e.g., 2023-02-10T17:22:03.000000+0000</p> |
| `last_event_type` | String | Indicates the type of the last received event from the list of the standard [Adapty events](events) that you have enabled for the integration. |
| `purchase_date` | String | <p>Contains the date of the last transaction (original purchase or renewal).</p><p></p><p>Value format is:</p><p>year-month dayThour:minute:second</p><p>e.g., 2023-02-10T17:22:03.000000+0000</p> |
| `active_subscription` | String | The value will be set to `true` on any purchase/renewal event, or `false` if the subscription is expired. |
| `period_type` | String | <p>Indicates the latest period type for the purchase or renewal.</p><p></p><p>Possible values are</p><p>`trial` for trial period or `normal` for the rest.</p> |


Please consider that all float values will be rounded to int. Strings stay the same. 

In addition to the pre-defined list of tags available, it is possible to send [custom attributes](segments#custom-attributes) using tags. This allows for more flexibility in the type of data that can be included with the tag and can be useful for tracking specific information related to a product or service. All custom user attributes are sent automatically to OneSignal if the user marks the ** Send User Attributes** checkbox from[ the integration page.](https://app.adapty.io/integrations/onesignal) When unchecked, Adapty sends exactly 10 tags. If the checkbox is checked, we can send more than 10 tags for greater flexibility in capturing relevant data.

## SDK configuration

There are currently two ways to integrate OneSignal and Adapty: the old one, relying on `playerId` and the new one, relying on `subscriptionId`, since `playerId` is deprecated starting with [OneSignal SDK v5](https://github.com/OneSignal/OneSignal-iOS-SDK/releases/tag/5.0.0)

:::warning
Make sure you send `playerId` (on OneSignal SDK pre-v5) or `subscriptionId` (on OneSignal SDK v5+) to Adapty, otherwise OneSignal tags couldn't be updated and the integration wouldn't work.
:::

Here is how you can link Adapty with OneSignal with either `playerId` or `subscriptionId`:

<Tabs> 

<TabItem value="v5+" label="v5+ OneSignal SDK (New)" default> 

<Tabs groupId="onesignal">
<TabItem value="Swift" label="iOS (Swift)" default>

```swift 
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

```kotlin 
// PlayerID (pre-v5 OneSignal SDK)
val osSubscriptionObserver = OSSubscriptionObserver { stateChanges ->
    stateChanges?.to?.userId?.let { playerId ->
        Adapty.setIntegrationIdentifier("one_signal_player_id", playerId) { error ->
            if (error != null) {
                // handle the error
            }
        }
    }
}

// SubscriptionID (v5+ OneSignal SDK)
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

```java 
// PlayerID (pre-v5 OneSignal SDK)
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

// SubscriptionID (v5+ OneSignal SDK)
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

```javascript
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
            // handle error
        } catch (e) {
            // handle error
        }
    }
});
```

</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>

```csharp
using OneSignalSDK;

var pushUserId = OneSignal.Default.PushSubscriptionState.userId;

var builder = new Adapty.ProfileParameters.Builder();
builder.SetOneSignalPlayerId(pushUserId);

Adapty.UpdateProfile(builder.Build(), (error) => {
    // handle error
});
```

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript 
import { adapty } from 'react-native-adapty';
import OneSignal from 'react-native-onesignal';

OneSignal.addSubscriptionObserver(event => {
  const playerId = event.to.userId;
  
  adapty.updateProfile({
    oneSignalPlayerId: playerId,
  });
});
```

</TabItem>
</Tabs>

 </TabItem> 

<TabItem value="pre-v5" label="pre-v5 OneSignal SDK) (Previous)" default> 

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>

```swift 
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

```kotlin 
// PlayerID
val osSubscriptionObserver = OSSubscriptionObserver { stateChanges ->
    stateChanges?.to?.userId?.let { playerId ->
        val params = AdaptyProfileParameters.Builder()
            .withOneSignalPlayerId(playerId)
            .build()
      
        Adapty.updateProfile(params) { error ->
            if (error != null) {
                // handle the error
            }
        }
    }
}
```

</TabItem>
<TabItem value="java" label="Java" default>

```java 
// PlayerID
OSSubscriptionObserver osSubscriptionObserver = stateChanges -> {
    OSSubscriptionState to = stateChanges != null ? stateChanges.getTo() : null;
    String playerId = to != null ? to.getUserId() : null;
    
    if (playerId != null) {
        AdaptyProfileParameters params1 = new AdaptyProfileParameters.Builder()
                .withOneSignalPlayerId(playerId)
                .build();
        
        Adapty.updateProfile(params1, error -> {
            if (error != null) {
                // handle the error
            }
        });
    }
};
```

</TabItem>  

<TabItem value="Flutter" label="Flutter (Dart)" default>

```javascript
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

// SubscriptionID (v5+ OneSignal SDK)
OneSignal.Notifications.requestPermission({ accepted in
    Task {
        try await Adapty.setIntegrationIdentifier(
            key: "one_signal_subscription_id", 
            value: OneSignal.User.pushSubscription.id
        )
    }
}, fallbackToSettings: true)

OneSignal.shared.setSubscriptionObserver((changes) {
    final playerId = changes.to.userId;
    
    if (playerId != null) {
        try {
            await Adapty().setIntegrationIdentifier(
                key: "one_signal_player_id", 
                value: playerId,
            );
            
            // or set "one_signal_subscription_id"
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

```csharp
using OneSignalSDK;

var pushUserId = OneSignal.Default.PushSubscriptionState.userId;

var builder = new Adapty.ProfileParameters.Builder();
builder.SetOneSignalPlayerId(pushUserId);

Adapty.UpdateProfile(builder.Build(), (error) => {
    // handle error
});
```

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript 
import { adapty } from 'react-native-adapty';
import OneSignal from 'react-native-onesignal';

OneSignal.addSubscriptionObserver(event => {
  const playerId = event.to.userId;
  
  adapty.updateProfile({
    oneSignalPlayerId: playerId,
  });
});
```

</TabItem>
</Tabs>

 </TabItem> 

</Tabs>



Read more about `OSSubscriptionObserver` in [OneSignal documentation](https://documentation.onesignal.com/docs/sdk-reference#handling-subscription-state-changes).

## Dealing with multiple devices

One can often encounter the following situation: a single user has different devices and analytics of purchase events or user subscriptions becomes difficult. OneSignal suggests [methods](https://documentation.onesignal.com/docs/external-user-ids) to cope with this problem. You can match different devices on your server side and send this information to OneSignal. Thus, when you change the user's tags, they will be updated not only for a specific device but for all devices the user has.

To take advantage of this feature, Adapty provides the ability to [identify users](identifying-users) using the Adapty SDK and [send their ID](https://documentation.onesignal.com/docs/external-user-ids#setexternaluserid-method) to OneSignal. By leveraging this opportunity, you can easily match a user's devices and update tags for multiple devices without any extra actions. This not only simplifies the process of tracking user activity and subscriptions but also allows you to provide a seamless experience for your users across all their devices.

It's important to note that to properly match a user's devices, you must ensure that each user has a unique identifier. Adapty's `customer_user_id` can be used as an `externalUserId` for this purpose, but if your app doesn't have a registration system, you may need to use a different identifier. Additionally, it's crucial to keep this identifier consistent across all devices and to send updates to OneSignal whenever a user's ID changes. By keeping track of their activity and subscriptions across all devices, you can better understand their needs and provide them with relevant and timely notifications.