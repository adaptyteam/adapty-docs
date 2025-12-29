---
title: "Facebook Ads"
description: "Integrate Facebook Ads with Adapty for effective subscription marketing."
metadataTitle: "Facebook Ads Integration | Adapty Docs"
keywords: ['Meta Ads', 'Facebook Ads']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

With the Facebook Ads integration, you can easily check your app stats in Meta Analytics. Adapty sends events to Meta Ads Manager, helping you make similar audiences based on subscriptions to get better returns. This way, you can accurately see how much money your ads are making from subscriptions.

The integration between Adapty and Facebook Ads operates in the following way: Adapty sends all subscription events that are configured in your integration to Facebook Ads. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## Web configuration

To integrate Facebook Ads and analyze your app metrics, you can set up the integration with Meta Analytics. By sending events to Meta Ads Manager, you can create lookalike audiences based on subscription events like renewals. To configure this integration, navigate to [Integrations > Facebook Ads](https://app.adapty.io/integrations/facebookanalytics) in the Adapty Dashboard and provide the required credentials.

:::note
Please consider that the Facebook Ads integration works on iOS 14.5+ only for users with ATT consent.
:::


<Zoom>
  <img src={require('./img/fd84ddf-CleanShot_2023-08-15_at_15.45.442x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. To find App ID, open your app page in [App Store Connect](https://appstoreconnect.apple.com/), go to the **App Information** page in **General** section, and find **Apple ID** in the left bottom part of the screen.
2. You need an application on [Meta for Developers](https://developers.facebook.com/) platform. Log in to your app and then find advanced settings. You can find the **App ID** in the header.

<Zoom>
  <img src={require('./img/4b326c4-001563-August-23-4tO3JVso.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Disable client-side tracking in your Meta SDK configuration to prevent double counting of revenue in Meta Ads Manager. You can find this setting in your Meta Developer Console under **App Settings > Advanced Settings**. Set **Log in-app events automatically** to "No". This will ensure that revenue events are only tracked through Adapty's integration. 

   To track install and usage events, you'll need to activate Meta SDK in your code. You can find implementation details in the Meta SDK documentation for your platform:
   - [iOS SDK](https://developers.facebook.com/docs/ios/getting-started)
   - [Android SDK](https://developers.facebook.com/docs/android/getting-started)
   - [Unity SDK](https://developers.facebook.com/docs/unity/getting-started)


<Zoom>
  <img src={require('./img/c4eb8eb-001565-August-23-483KKBbC.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


You can use this integration with Android apps as well. If you set up Android SDK configuration in the **App Settings**, setting up the **Facebook App ID** is enough.

## Events and tags

Please note that the Facebook Ads integration specifically caters to companies using Meta for ad campaigns and optimizing them based on customer behavior. It supports Meta's standard events for optimization purposes. Consequently, modifying the event name is not available for the Meta Ads integration. Adapty effectively maps your customer events to their corresponding Meta events for accurate analysis.

| Adapty event                  | Meta Ads event          |
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


<Zoom>
  <img src={require('./img/8a5df9d-CleanShot_2023-07-04_at_12.47.312x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


To enable specific events, simply toggle on the ones you require. In case multiple event names are selected, Adapty will consolidate the data from all the chosen events into a single Adapty event name.

## SDK configuration

If you follow the steps above, Facebook will automatically receive subscription data from Adapty. 

Following the changes to IDFA in iOS 14.5, we recommend that you request the user's `facebookAnonymousId` from Facebook. That way, if the user's IDFA is unavailable, the integration will continue to function. Follow the <InlineTooltip tooltip="set user attributes guide">[iOS](setting-user-attributes.md), [Android](android-setting-user-attributes.md), [React Native](react-native-setting-user-attributes.md), [Flutter](flutter-setting-user-attributes.md),  and [Unity](unity-setting-user-attributes.md)</InlineTooltip> to set this parameter. 

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>

```swift showLineNumbers
import FacebookCore

do {
    try await Adapty.setIntegrationIdentifier(
        key: "facebook_anonymous_id", 
        value: AppEvents.shared.anonymousID
    )
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin showLineNumbers
Adapty.setIntegrationIdentifier(
    "facebook_anonymous_id",
    AppEventsLogger.getAnonymousAppDeviceGUID(context)
) { error ->
    if (error != null) {
        // handle the error
    }
}
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
import { adapty } from 'react-native-adapty';
import { AppEventsLogger } from 'react-native-fbsdk-next';

try {
  const anonymousId = await AppEventsLogger.getAnonymousID();

  await adapty.setIntegrationIdentifier("facebook_anonymous_id", anonymousId);
} catch (error) {
  // handle `AdaptyError`
}
```
</TabItem>
<TabItem value="flutter" label="Flutter (Dart)" default>

```text
There is no official SDK for Flutter
```
</TabItem>
<TabItem value="unity" label="Unity (C#)" default>

```csharp
anonymousID is not available in the official SDK
https://github.com/facebook/facebook-sdk-for-unity/issues/676
```
</TabItem>
</Tabs>

## Event structure

Adapty sends events to Facebook Ads (Meta) via the Graph API. Each event is structured like this:

```json
{
  "event": "CUSTOM_APP_EVENTS",
  "app_user_id": "user_12345",
  "advertiser_id": "00000000-0000-0000-0000-000000000000",
  "advertiser_tracking_enabled": 1,
  "application_tracking_enabled": 1,
  "custom_events": "[{\"_eventName\":\"Subscribe\",\"_logTime\":1709294400,\"fb_num_items\":1,\"fb_content_type\":\"in_app\",\"fb_content_id\":\"yearly.premium.6999\",\"fb_currency\":\"USD\",\"fb_order_id\":\"GPA.3383...\",\"fb_transaction_id\":\"GPA.3383...\",\"_valueToSum\":9.99}]",
  "extinfo": "[\"i2\",\"com.example.app\",\"1.0.0\",\"100\",\"17.0.1\",\"iPhone14,3\",\"en_US\",\"GMT+3\",\"\",0,0,0,0,0,0,\"GMT+3\"]",
  "anon_id": "facebook_anon_id_123"
}
```

Where:

| Parameter | Type | Description |
|:---|:---|:---|
| `event` | String | Always "CUSTOM_APP_EVENTS". |
| `app_user_id` | String | The user's Customer User ID. |
| `advertiser_id` | String | IDFA (iOS) or Advertising ID (Android). |
| `advertiser_tracking_enabled` | Integer | `1` if tracking is enabled (ATT authorized), `0` otherwise. |
| `application_tracking_enabled` | Integer | Always `1`. |
| `custom_events` | String | JSON-encoded string of event objects (see below). |
| `extinfo` | String | JSON-encoded string containing app/device info (e.g., version, OS, locale). |
| `anon_id` | String | Facebook Anonymous ID (if available). |

The `custom_events` parameter is a JSON-encoded array of objects, containing:

| Parameter | Type | Description |
|:---|:---|:---|
| `_eventName` | String | The Meta Ads event name (e.g., "Subscribe"). |
| `_logTime` | Long | Timestamp of the event in seconds. |
| `_valueToSum` | Float | Revenue amount. |
| `fb_content_id` | String | The Product ID from the store. |
| `fb_currency` | String | Currency code (e.g., "USD"). |
| `fb_order_id` | String | Original transaction ID. |
| `fb_transaction_id` | String | Original transaction ID. |
| `fb_content_type` | String | Always "in_app". |
| `fb_num_items` | Integer | Always 1 for purchase events. |





