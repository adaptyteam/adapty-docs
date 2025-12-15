---
title: "App settings"
description: "Explore general settings and configurations in Adapty for seamless use."
metadataTitle: "General Settings and Configuration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Sharingaccesslevel from '@site/src/components/reusable/sharingaccesslevel.md';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

You can navigate to the General tab of the App Settings page to manage your app's behavior, appearance, and revenue sharing. Here, you can customize your app's name and icon, manage your Adapty SDK and API keys, set your Small Business Program status, and choose the timezone for your app's analytics and charts.

## 1. App details

<Zoom>
  <img src={require('./img/8fa2929-CleanShot_2023-04-21_at_15.16.222x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Choose a unique name and icon that represent your app in the Adapty interface. Please note that the app name and icon will not affect the app's name and icon in the App Store or Google Play. Also, make sure to select an appropriate App Category that accurately reflects your app's purpose and content. This will help users discover your app and ensure it appears in the appropriate app store categories.

## 2\. Member of Small Business Program and Reduced Service Fee

<Zoom>
  <img src={require('./img/825e2be-CleanShot_2023-04-19_at_13.43.292x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

If you're a member of the Apple Small Business Program and/or Google's Reduced Service Fee program, you can let Adapty know by specifying the period that you are a member. Adapty will adjust the commission rate accordingly, so you can keep more of your revenue. Please note that this setting applies only to future transactions, and you need to update it if your Small Business Program status changes. You can learn more about the [App Store Small Business Program](app-store-small-business-program) and [Google's Reduced Service Fee](google-reduced-service-fee).

## 3\. Reporting timezone

<Zoom>
  <img src={require('./img/47227f9-CleanShot_2023-04-19_at_13.45.302x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Choose the timezone that corresponds to the location where you're based, or where your app's analytics and charts are most relevant. We recommend using the same timezone as your App Store Connect or Google Play Console account to ensure consistency. Please note that this timezone setting does not affect third-party integrations in the Adapty system, which use the UTC timezone.

You can access the timezone settings in the Reported timezone section of the General Tab on the App Settings page. You can also choose to set the same timezone for all the apps in your Adapty account by checking the corresponding box.

## 4\. Installs definition for analytics

Choose what is defined as a new install event in analytics:

| Base                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New device_ids         | <p>(Recommended) Any new installation of the app on a device is counted as a new install. This includes both first-time installs and reinstalls. </p> <p>Each device installation is counted separately. For example, if a user installs your app on 5 different devices, you will see 5 installs in analytics.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| New customer_user_ids  | <p>This option is intended for apps that <InlineTooltip tooltip="identify users in Adapty">[iOS](identifying-users), [Android](android-identifying-users), [Flutter](flutter-identifying-users), [React Native](react-native-identifying-users), [Unity](unity-identifying-users), [Kotlin Multiplatform](kmp-quickstart-identify), [Capacitor](capacitor-quickstart-identify)</InlineTooltip>. </p><p>For logged-in users, only the first installation associated with a customer user ID is counted as an install. Installations on additional devices are not counted as new installs. </p><p>Anonymous users (users who have not logged in) are not counted in analytics. </p><p>Reinstalling the app or logging in again does not create additional installs.</p> <p>App stores and attribution platforms (such as App Store Connect, Google Play Console, and AppsFlyer) use a device-based approach to counting installs. If you count installs by customer user IDs in Adapty, install numbers may differ from these external services.</p><p>⚠️ If you do not identify users in Adapty, no installs will be counted with this option enabled.</p> |
| New profiles in Adapty | (Legacy) Every app installation, reinstallation and anonymous profiles created during logouts are counted as new installs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Keep in mind that this option only affects the [**Analytics**](https://app.adapty.io/analytics) page and does not impact the [**Overview**](https://app.adapty.io/overview) page, where you can configure the view separately.

## 5. App Store price increase logic

To maintain accurate data and avoid discrepancies between Adapty analytics and App Store Connect results, it is important to select the appropriate option when adjusting configurations related to price increases in App Store Connect.  
So you can choose the logic that will be applied to subscription price increases in Adapty:

<Zoom>
  <img src={require('./img/b766c8b-CleanShot_2023-07-18_at_19.28.18_22x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

- **Subscription price for existing users is preserved:** By selecting this option, the current price will be retained for your existing subscribers, even if you make changes to the price in the App Store Connect. This means that existing subscribers will continue to be billed at their original subscription price.
- **When the subscription price is changed in App Store Connect, it changes for existing subscribers:** If you choose this option, any price changes made in the App Store Connect will be applied to your existing subscribers as well. This means that existing subscribers will be charged the new price reflecting the updated pricing set in the App Store Connect.

:::warning
It is important to consider that the selected option not only affects analytics in Adapty but also impacts integrations and overall transaction handling behavior.
:::

Please ensure that you select the designated option that aligns with your desired approach to handling subscription prices for existing subscribers. This will help maintain accurate data and synchronization between Adapty analytics and the results obtained from the App Store Connect.

## 6. Sharing purchases between user accounts

When a <InlineTooltip tooltip="Customer User ID">[iOS](identifying-users#setting-customer-user-id-on-configuration), [Android](android-identifying-users#setting-customer-user-id-on-configuration), [Flutter](flutter-identifying-users#setting-customer-user-id-on-configuration), [React Native](react-native-identifying-users#setting-customer-user-id-on-configuration), and [Unity](unity-identifying-users#setting-customer-user-id-on-configuration)</InlineTooltip> tries to restore transactions or extend a subscription that is already associated with a different identified <InlineTooltip tooltip="Customer User ID">[iOS](identifying-users#setting-customer-user-id-on-configuration), [Android](android-identifying-users#setting-customer-user-id-on-configuration), [Flutter](flutter-identifying-users#setting-customer-user-id-on-configuration), [React Native](react-native-identifying-users#setting-customer-user-id-on-configuration), and [Unity](unity-identifying-users#setting-customer-user-id-on-configuration)</InlineTooltip>, you can control how Adapty responds by adjusting the **Sharing paid access between user accounts** dropdown:

<Sharingaccesslevel />

## 7. SDK and API keys

Use a Public SDK key to integrate Adapty SDKs into your app, and a Secret Key to access Adapty's Server API. You can generate new keys or revoke existing ones as needed.

## 8. Test devices

Specify the devices to be used for testing to ensure they get instant updates for paywall or placement changes, bypassing any caching delays. For more information, see [Testing devices](test-devices).

## 9. Cross-placement variation stickiness

Define how long after a test completion a user is still served with the variants in the test. This affects analytics accuracy and user experience — as serving a user with a different offer than what they have seen before might influence their decision to buy.

The maximum and default stickiness period is 90 days.

:::warning
Consider the following:
- Changing this setting will affect all the users who previously received a variation. They will instantly qualify for a new paywall when they see a placement, which can spoil the results of your running A/B tests.
- If the stickiness period is over for a user, they can be served with a new paywall or A/B test. However, even then, they won't be able to be a part of any other cross-placement test ever.
:::

## 10. Delete the app

If you no longer need an app, you can delete it from Adapty. 

:::warning
Please be aware that this action is irreversible, and you won't be able to restore the app or its data.
:::
