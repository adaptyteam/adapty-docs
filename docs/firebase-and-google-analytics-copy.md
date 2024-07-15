---
title: "Firebase and Google Analytics"
description: ""
metadataTitle: ""
---

[Google Analytics](https://firebase.google.com/docs/analytics) is an app measurement solution, available at no charge, that provides insight into app usage and user engagement. Analytics integrates across Firebase features and provides you with unlimited reporting for up to 500 distinct events that you can define using the Firebase SDK. Analytics reports help you understand clearly how your users behave, which enables you to make informed decisions regarding app marketing and performance optimizations.

Once you set up the integration with Google Analytics, you'll be able to use other Google solutions, like BigQuery. [BigQuery](https://cloud.google.com/bigquery) is a fully managed, AI-ready data analytics platform that helps you maximize value from your data and is designed to be multi-engine, multi-format, and multi-cloud. BigQuery's serverless architecture lets you use SQL queries to analyze your data. You can store and analyze your data within BigQuery or use BigQuery to assess your data where it lives.

If you use Google products such as Google Analytics, Firebase, and BigQuery, you may enrich your analytical data with events from Adapty using the integration described in this article. Events are sent through Google Analytics to Firebase and may be used in any of these services.

| Integration characteristic | Description                                           |
| :------------------------- | :---------------------------------------------------- |
| Schedule                   |                                                       |
| Data direction             | Adapty sends events to Google Analytics via Firebase. |
| Adapty integration point   |                                                       |

## How to set up Firebase integration

The integration with Firebase is configured in the following steps:

1. Enable integration between Firebase and Google Analytics.
2. Enable and configure the integration between Adapty and Firebase in the Adapty Dashboard.
3. Configure the list of events that will be sent to Google Analytics
4. Enable and set up the integration in your mobile app code.

### 1\. Set up Firebase

First of all, you have to enable integration between Firebase and Google Analytics. You can do it in your Firebase Console in the **Integrations** tab.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/6cb7dfe-google_analytics.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





### 2\. Integrate with Adapty

Then Adapty needs your Firebase App ID and Google Analytics API Secret to send events and user properties. You can find these parameters in the Firebase Console and Google Analytics Data Streams Tab respectively.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/14d8224-CleanShot_2023-08-21_at_12.14.182x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





Next, access the App's Stream details page within the Data Streams section of Admin settings in [Google Analytics.](https://analytics.google.com/analytics/web/#/)


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/b26ae6a-CleanShot_2023-08-21_at_12.28.482x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





Under **Additional settings**, go to the **Measurement Protocol API secrets** page and create a new **API Secret** if it doesn't exist. Copy the value.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/7404bde-CleanShot_2023-08-21_at_12.33.242x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/0266112-CleanShot_2023-08-21_at_12.34.442x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





Then, your next step will be adjusting integration in Adapty Dashboard. You will need to provide Firebase App ID and Google Analytics API Secret to us for your iOS and Android platforms.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/4eaae3f-CleanShot_2023-08-21_at_12.35.312x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





## SDK configuration

Then you have to set up Adapty SDK to associate your users with Firebase. For each user, you should send the`firebase_app_instance_id` to Adapty. Here you can see an example of the code which can be used to integrate Firebase SDK and Adapty SDK.

```swift iOS (Swift)
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
```kotlin Android (Kotlin)
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
```java
//after Adapty.activate()

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
```java Flutter (Dart)
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
```typescript React Native (TS)
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
```csharp Unity (C#)
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


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/7923397-set_up_events_names.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





You can see that some events have designated names, for example. "Purchase", while other ones are usual Adapty events. This discrepancy comes from[ Google Analytics event types](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events). Currently, supported events are [Refund](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#refund%22%3ERefund) and  [Purchase](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#purchase%22%3EPurchase). Other events are custom events. So, please ensure that your event names are [supported](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#limitations%22%3E)  by Google Analytics.  
Also, you can set up sending user properties in the Adapty dashboard. 


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/e053006-CleanShot_2023-08-21_at_12.50.162x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





This means that your events will be enriched with `subscription_state` and `subscription_product_id` by Adapty. But you also have to [enable](https://support.google.com/analytics/answer/10075209?hl=en) this feature in Google Analytics. So to use **User properties** in your analytics, begin by assigning them to a custom dimension through the Firebase Console's **Custom Definitions** by selecting the **User scope**, naming, and describing them.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/1962ef1-CleanShot_2023-08-21_at_12.48.222x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/2425cc0-CleanShot_2023-08-21_at_12.52.532x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





 Please check that your user property names are `subscription_state` and `subscription_product_id`. Otherwise, we won't be able to send you subscription status data. 

:::note
There is a time delay between when events are sent from Adapty and when they appear on the Google Analytics Dashboard. It's suggested to monitor the Realtime Dashboard on your Google Analytics account to see the latest events in real-time.
:::

And that's all! Wait for new insights from Google.