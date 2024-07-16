---
title: "Facebook Ads"
description: ""
metadataTitle: ""
---

With the Facebook Ads integration, you can easily check your app stats on Facebook Analytics. Adapty sends events to Facebook Ads Manager, helping you make similar audiences based on subscriptions to get better returns. This way, you can accurately see how much money your ads are making from subscriptions.

The integration between Adapty and Facebook Ads operates in the following way: Adapty sends all subscription events that are configured in your integration to Facebook Ads. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## How to set up Facebook Ads integration

To integrate Facebook Ads and analyze your app metrics, you can set up the integration with Facebook Analytics. By sending events to Facebook Ads Manager, you can create lookalike audiences based on subscription events like renewals. To configure this integration, navigate to [Integrations > Facebook Ads](https://app.adapty.io/integrations/facebookanalytics) in the Adapty Dashboard and provide the required credentials.

:::note
Please consider that Facebook Ads integration works on iOS 14.5+ only for users with ATT consent.
:::


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/fd84ddf-CleanShot_2023-08-15_at_15.45.442x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





1. To find App ID, open your app page in [App Store Connect](https://appstoreconnect.apple.com/), go to the **App Information** page in section **General**, and find **Apple ID** in the left bottom part of the screen.
2. You need an application on [Facebook Developers](https://developers.facebook.com/) platform. Log in to your app and then find advanced settings. You can find the **App ID** in the header.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/4b326c4-001563-August-23-4tO3JVso.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





:::warning
Disable in-app events logging in the Facebook SDK to avoid duplications

Open your App Dashboard and navigate to Analytics->Settings. Then set _Log In-App Events Automatically_ to _No_ and click _Save Changes_.
:::


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/c4eb8eb-001565-August-23-483KKBbC.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





You can use this integration with Android apps as well. If you set up Android SDK configuration in the App Settings, setting up the Facebook App ID is enough.

## Events and tags

Please note that the Facebook Ads integration specifically caters to companies using Facebook for ad campaigns and optimizing them based on customer behavior. It supports Facebook's standard events for optimization purposes. Consequently, modifying the event name is not available for the Facebook Ads integration. Adapty effectively maps your customer events to their corresponding Facebook events for accurate analysis.

| Adapty event                  | Facebook Ads event          |
| :---------------------------- | :-------------------------- |
| Subscription initial purchase | Subscribe                   |
| Subscription renewed          | Subscribe                   |
| Subscription cancelled        | CancelSubscription          |
| Trial started                 | StartTrial                  |
| Trial converted               | Subscribe                   |
| Trial cancelled               | CancelTrial                 |
| Non subscription purchase     | fb_mobile_purchase          |
| Billing issue detected        | billing_issue_detected      |
| Entered grace period          | entered_grace_period        |
| Auto renew off                | auto_renew_off              |
| Auto renew on                 | auto_renew_on               |
| Auto renew off subscription   | auto_renew_off_subscription |
| Auto renew on subscription    | auto_renew_on_subscription  |

StartTrial, Subscribe, CancelSubscription are standard events.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/8a5df9d-CleanShot_2023-07-04_at_12.47.312x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





To enable specific events, simply toggle on the ones you require. In case multiple event names are selected, Adapty will consolidate the data from all the chosen events into a single Adapty event name.

## SDK configuration

:::warning
Because of iOS IDFA changes in iOS 14.5, if you use Facebook integration, make sure you send [`facebookAnonymousId`](https://developers.facebook.com/docs/reference/iossdk/current/FBSDKCoreKit/classes/fbsdkappevents.html/) to Adapty via [`.updateProfile()`](setting-user-attributes)  method. It allows Facebook to handle events if IDFA is not available.
:::

```swift title="iOS (Swift)"
import FacebookCore

let builder = AdaptyProfileParameters.Builder()
    .with(facebookAnonymousId: AppEvents.shared.anonymousID)

Adapty.updateProfile(params: builder.build()) { error in
    if error != nil {
        // handle the error                        
    }
}
```
```kotlin title="Android (Kotlin)"
val builder = AdaptyProfileParameters.Builder()
    .withFacebookAnonymousId(AppEventsLogger.getAnonymousAppDeviceGUID(context))
  
Adapty.updateProfile(builder.build()) { error ->
    if (error == null) {
        // successful update
    }
}
```
```Text title="Flutter (Dart)"
There is no official SDK for Flutter
```
```typescript title="React Native (TS)"
import { adapty } from 'react-native-adapty';
import { AppEventsLogger } from 'react-native-fbsdk-next';

try {
  const anonymousId = await AppEventsLogger.getAnonymousID();

  await adapty.updateProfile({
    facebookAnonymousId: anonymousId,
  });
} catch (error) {
	// handle `AdaptyError`
}
```
```csharp title="Unity (C#)"
anonymousID is not available in the official SDK
https://github.com/facebook/facebook-sdk-for-unity/issues/676
```