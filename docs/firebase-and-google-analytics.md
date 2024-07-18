---
title: "Firebase and Google Analytics"
description: ""
metadataTitle: ""
---

If you use such Google products as Google Analytics, Firebase, and BigQuery you may enrich your analytical data with events from Adapty using the integration described in this article. Events are sent through Google Analytics to Firebase and may be used in any of these services.

## How to set up Firebase integration

### 1\. Set up Firebase

First of all, you have to enable integration between Firebase and Google Analytics. You can do it in your Firebase Console in the **Integrations** tab.


<img
  src={require('./img/14b6d84-CleanShot_2023-08-18_at_20.37.462x.png').default}
/>





### 2\. Integrate with Adapty

Then Adapty needs your Firebase App ID and Google Analytics API Secret to send events and user properties. You can find these parameters in the Firebase Console and Google Analytics Data Streams Tab respectively.


<img
  src={require('./img/14d8224-CleanShot_2023-08-21_at_12.14.182x.png').default}
/>





Next, access the App's Stream details page within the Data Streams section of Admin settings in [Google Analytics.](https://analytics.google.com/analytics/web/#/)


<img
  src={require('./img/b26ae6a-CleanShot_2023-08-21_at_12.28.482x.png').default}
/>





Under **Additional settings**, go to the **Measurement Protocol API secrets** page and create a new **API Secret** if it doesn't exist. Copy the value.


<img
  src={require('./img/7404bde-CleanShot_2023-08-21_at_12.33.242x.png').default}
/>






<img
  src={require('./img/0266112-CleanShot_2023-08-21_at_12.34.442x.png').default}
/>





Then, your next step will be adjusting integration in Adapty Dashboard. You will need to provide Firebase App ID and Google Analytics API Secret to us for your iOS and Android platforms.


<img
  src={require('./img/4eaae3f-CleanShot_2023-08-21_at_12.35.312x.png').default}
/>





## SDK configuration

Then you have to set up Adapty SDK to associate your users with Firebase. For each user, you should send the`firebase_app_instance_id` to Adapty. Here you can see an example of the code which can be used to integrate Firebase SDK and Adapty SDK.

```swift title="title="iOS (Swift)""
import FirebaseCore
import FirebaseAnalytics

FirebaseApp.configure()
        
if let appInstanceId = Analytics.appInstanceID() {            
    let builder = AdaptyProfileParameters.Builder()
        .with(firebaseAppInstanceId: appInstanceId)
            
    Adapty.updateProfile(params: builder.build()) { error in
                // handle error
    }
}
```
```kotlin title="title="Android (Kotlin)""
//after Adapty.activate()

FirebaseAnalytics.getInstance(context).appInstanceId.addOnSuccessListener { appInstanceId ->
    Adapty.updateProfile(
        AdaptyProfileParameters.Builder()
            .withFirebaseAppInstanceId(appInstanceId)
            .build()
    ) {
        //handle error
    }
}
```
```java title="title="//after Adapty.activate()""

FirebaseAnalytics.getInstance(context).getAppInstanceId().addOnSuccessListener(appInstanceId -> {
    AdaptyProfileParameters params = new AdaptyProfileParameters.Builder()
        .withFirebaseAppInstanceId(appInstanceId)
        .build();
    
    Adapty.updateProfile(params, error -> {
        if (error != null) {
            // handle the error
        }
    });
});
```
```java title="title="Flutter (Dart)""
import 'package:firebase_analytics/firebase_analytics.dart';

final builder = AdaptyProfileParametersBuilder()
        ..setFirebaseAppInstanceId(
          await FirebaseAnalytics.instance.appInstanceId,
        );
        
try {
    await adapty.updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
    // handle error
} catch (e) {}
```
```typescript title="title="React Native (TS)""
import analytics from '@react-native-firebase/analytics';
import { adapty } from 'react-native-adapty';

try {
  const appInstanceId = await analytics().getAppInstanceId();

  await adapty.updateProfile({
    firebaseAppInstanceId: appInstanceId,
  });
} catch (error) {
  // handle `AdaptyError`
}
```
```csharp title="title="Unity (C#)""
// We suppose FirebaseAnalytics Unity Plugin is already installed

Firebase.Analytics
            .FirebaseAnalytics
            .GetAnalyticsInstanceIdAsync()
            .ContinueWithOnMainThread((task) => {
                if (!task.IsCompletedSuccessfully)
                {
                    // handle error
                    return;
                }

                var firebaseId = task.Result
                var builder = new Adapty.ProfileParameters.Builder();
                builder.SetFirebaseAppInstanceId(firebaseId);

                Adapty.UpdateProfile(builder.Build(), (error) => {
                    // handle error
                });
            });
```

## Sending events and user properties

And now it is time to decide which events you will receive in Firebase and Google Analytics.


<img
  src={require('./img/7923397-set_up_events_names.png').default}
/>





You can see that some events have designated names, for example. "Purchase", while other ones are usual Adapty events. This discrepancy comes from[ Google Analytics event types](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events). Currently, supported events are [Refund](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#refund%22%3ERefund) and  [Purchase](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#purchase%22%3EPurchase). Other events are custom events. So, please ensure that your event names are [supported](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#limitations%22%3E)  by Google Analytics.  
Also, you can set up sending user properties in the Adapty dashboard. 


<img
  src={require('./img/e053006-CleanShot_2023-08-21_at_12.50.162x.png').default}
/>





This means that your events will be enriched with `subscription_state` and `subscription_product_id` by Adapty. But you also have to [enable](https://support.google.com/analytics/answer/10075209?hl=en) this feature in Google Analytics. So to use **User properties** in your analytics, begin by assigning them to a custom dimension through the Firebase Console's **Custom Definitions** by selecting the **User scope**, naming, and describing them.


<img
  src={require('./img/1962ef1-CleanShot_2023-08-21_at_12.48.222x.png').default}
/>






<img
  src={require('./img/2425cc0-CleanShot_2023-08-21_at_12.52.532x.png').default}
/>





 Please check that your user property names are `subscription_state` and `subscription_product_id`. Otherwise, we won't be able to send you subscription status data. 

:::note
There is a time delay between when events are sent from Adapty and when they appear on the Google Analytics Dashboard. It's suggested to monitor the Realtime Dashboard on your Google Analytics account to see the latest events in real-time.
:::

And that's all! Wait for new insights from Google.