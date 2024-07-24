---
title: "Migrate to Adapty"
description: ""
metadataTitle: ""
---

Migration has three steps:

1. Switching to Adapty SDK.
2. Changing [Apple](app-store-server-notifications)/ [Google](real-time-developer-notifications-rtdn) server2server notifications webhook.
3. (Optional) [Importing historical data to Adapty](importing-historical-data-to-adapty) to instantly pull statistics.

Let's quickly go through each part.

:::info
Your subscribers will migrate automatically

All users who have ever activated subscription will move as soon as they open a new version with Adapty SDK. The subscription status validation and premium access will be restored automatically.
:::

### Installing Adapty SDK

Install Adapty SDK for your platform ([iOS](ios-installation), [Android](android-installation), [React Native](react-native-installation), [Flutter](flutter-installation), [Unity](unity-installation)) in your app and replace your legacy logic with appropriate methods from Adapty SDK. Core things you need to replace:

- Checking an [Access level](access-level) to open a gated content;
- Making a purchase;
- Restoring purchase;
- Getting/setting information about your user.

> 🙀 Switching from another susbcription provider?
> 
> Follow our guide for a detailed walk though giude:
> 
> - [Migration from RevenueCat](migration-from-revenuecat) (20 minutes)

### Changing Apple server notifications

Apple and Google send us events that happen with users' subscriptions outside of the application (renewal, cancellation, pausing, refund, etc.) via [App Store server notifications](app-store-server-notifications). 

Adapty can work without this URL, but you'll get a limited feature set. For example, [Integrations](integrations) to 3rd party services will be delayed, subscription analytics won't be in real-time, and paywall A/B testing metrics won't be accurate. 

When switching from a legacy system, sometimes you want two systems to work simultaneously for some time. In that case, you can use our [raw events forwarding](app-store-server-notifications#raw-events-forwarding), where Adapty is a proxy server for your legacy system.


<img
  src={require('./img/c7d4fd0-Seamless_migrat_a.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





### Move historical data to Adapty

Moving historical data is optional and won't affect your subscribers' state. However, there are a number of reasons why it's better to do so:

1. **Analytics will work correctly instantly**. Adapty matches subscribers by original transaction ID, and we don't count events from Apple webhook without exposing them to Adapty SDK (we technically can't do it).
2. **Used data will be there**. You'll have all Adapty profiles with user properties and can use them in [Segments](segments), and [Profiles/CRM](profiles-crm). 

Follow our [tutorial](importing-historical-data-to-adapty) to send us historical data.