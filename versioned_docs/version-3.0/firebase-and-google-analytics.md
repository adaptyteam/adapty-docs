---
title: "Firebase and Google Analytics"
description: "Integrate Firebase and Google Analytics with Adapty for better insights."
metadataTitle: "Firebase & Google Analytics Integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

If you use such Google products as Google Analytics and Firebase, you may enrich your analytical data with events from Adapty using the integration described in this article. Events are sent through Google Analytics to Firebase and may be used in any of these services. 

This feature enables you to align your users’ behavior with their payment history in Firebase, empowering you to make informed product decisions.

## How to set up Firebase integration

### 1\. Set up Firebase

First of all, you have to enable integration between Firebase and Google Analytics. You can do it in your Firebase Console in the **Integrations** tab.


<Zoom>
  <img src={require('./img/14b6d84-CleanShot_2023-08-18_at_20.37.462x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### 2\. Integrate with Adapty

Then Adapty needs your Firebase App ID and Google Analytics API Secret to send events and user properties. You can find these parameters in the Firebase Console and Google Analytics Data Streams Tab respectively.


<Zoom>
  <img src={require('./img/14d8224-CleanShot_2023-08-21_at_12.14.182x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



Next, access the App's Stream details page within the Data Streams section of Admin settings in [Google Analytics.](https://analytics.google.com/analytics/web/#/)


<Zoom>
  <img src={require('./img/b26ae6a-CleanShot_2023-08-21_at_12.28.482x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Under **Additional settings**, go to the **Measurement Protocol API secrets** page and create a new **API Secret** if it doesn't exist. Copy the value.


<Zoom>
  <img src={require('./img/7404bde-CleanShot_2023-08-21_at_12.33.242x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/0266112-CleanShot_2023-08-21_at_12.34.442x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Then, your next step will be adjusting integration in Adapty Dashboard. You will need to provide Firebase App ID and Google Analytics API Secret to us for your iOS, Android, and/or Stripe platforms.

:::note
If you are using the Stripe integration, consider its limitations in the dedicated [guide](stripe#current-limitations). These limitations will apply to the Firebase integration as well.
:::

<Zoom>
  <img src={require('./img/4eaae3f-CleanShot_2023-08-21_at_12.35.312x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## SDK configuration

:::important
For the integration to work, ensure you add Firebase to your app first:
- [iOS](https://firebase.google.com/docs/ios/setup)
- [Android](https://firebase.google.com/docs/android/setup)
- [Flutter](https://firebase.google.com/docs/flutter/setup)
- [React Native](https://firebase.google.com/docs/web/setup)
- [Unity](https://firebase.google.com/docs/unity/setup)
:::

Then you have to set up Adapty SDK to associate your users with Firebase. For each user, you should send the `firebase_app_instance_id` to Adapty. Here you can see an example of the code that can be used to integrate Firebase SDK and Adapty SDK.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>
```swift showLineNumbers
import FirebaseCore
import FirebaseAnalytics

FirebaseApp.configure()
        
if let appInstanceId = Analytics.appInstanceID() {            
    do {
        try await Adapty.setIntegrationIdentifier(
            key: "firebase_app_instance_id", 
            value: appInstanceId
        )
    } catch {
        // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>
```kotlin showLineNumbers
//after Adapty.activate()

FirebaseAnalytics.getInstance(context).appInstanceId.addOnSuccessListener { appInstanceId ->
    Adapty.setIntegrationIdentifier("firebase_app_instance_id", appInstanceId) { error ->
        if (error != null) {
            // handle the error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
//after Adapty.activate()

FirebaseAnalytics.getInstance(context).getAppInstanceId().addOnSuccessListener(appInstanceId -> {
    Adapty.setIntegrationIdentifier("firebase_app_instance_id", appInstanceId, error -> {
        if (error != null) {
            // handle the error
        }
    });
});
```
</TabItem>
<TabItem value="flutter" label="Flutter (Dart)" default>
```javascript showLineNumbers
import 'package:firebase_analytics/firebase_analytics.dart';

final appInstanceId = await FirebaseAnalytics.instance.appInstanceId;

try {
    await Adapty().setIntegrationIdentifier(
        key: "firebase_app_instance_id", 
        value: appInstanceId,
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

// We suppose FirebaseAnalytics Unity Plugin is already installed

Firebase.Analytics
  .FirebaseAnalytics
  .GetAnalyticsInstanceIdAsync()
  .ContinueWithOnMainThread((task) => {
    if (!task.IsCompletedSuccessfully) {
      // handle error
      return;
    }

    var firebaseId = task.Result
    var builder = new Adapty.ProfileParameters.Builder();
    
    Adapty.SetIntegrationIdentifier(
      "firebase_app_instance_id", 
      firebaseId, 
      (error) => {
        // handle the error
    });
  });
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
import analytics from '@react-native-firebase/analytics';
import { adapty } from 'react-native-adapty';

try {
  const appInstanceId = await analytics().getAppInstanceId();

  await adapty.setIntegrationIdentifier("firebase_app_instance_id", appInstanceId);
} catch (error) {
  // handle `AdaptyError`
}
```
</TabItem>
</Tabs>







## Sending events and user properties

And now it is time to decide which events you will receive in Firebase and Google Analytics.


<Zoom>
  <img src={require('./img/7923397-set_up_events_names.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





You can see that some events have designated names, for example. "Purchase", while other ones are usual Adapty events. This discrepancy comes from[ Google Analytics event types](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events). Currently, supported events are [Refund](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#refund%22%3ERefund) and  [Purchase](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#purchase%22%3EPurchase). Other events are custom events. So, please ensure that your event names are [supported](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#limitations%22%3E)  by Google Analytics.  
Also, you can set up sending user properties in the Adapty dashboard. 


<Zoom>
  <img src={require('./img/e053006-CleanShot_2023-08-21_at_12.50.162x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





This means that your events will be enriched with `subscription_state` and `subscription_product_id` by Adapty. But you also have to [enable](https://support.google.com/analytics/answer/10075209?hl=en) this feature in Google Analytics. So to use **User properties** in your analytics, begin by assigning them to a custom dimension through the Firebase Console's **Custom Definitions** by selecting the **User scope**, naming, and describing them.


<Zoom>
  <img src={require('./img/1962ef1-CleanShot_2023-08-21_at_12.48.222x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/2425cc0-CleanShot_2023-08-21_at_12.52.532x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





 Please check that your user property names are `subscription_state` and `subscription_product_id`. Otherwise, we won't be able to send you subscription status data.

And that's all! Wait for new insights from Google.

## Troubleshooting

### Data discrepancy

If there is a data discrepancy between Adapty and Firebase, that might occur because not all your users use the app version that has the Adapty SDK. To ensure the data consistency, you can force your users to update the app to a version with the Adapty SDK.

Additionally, sandbox events are sent to Firebase by default, and this cannot be disabled. So, in situations when an app has a few Production events and a los of Sandbox ones, there can be a notable discrepancy in numbers between Adapty’s Analytics and Firebase.

### Events are shown as delivered in Adapty but not available in Firebase

There is a time delay between when events are sent from Adapty and when they appear on the Google Analytics Dashboard. It's suggested to monitor the Realtime Dashboard on your Google Analytics account to see the latest events in real-time.
