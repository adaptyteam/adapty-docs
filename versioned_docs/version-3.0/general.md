---
title: "App settings"
description: "Explore general settings and configurations in Adapty for seamless use."
metadataTitle: "General Settings and Configuration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Sharingaccesslevel from '@site/src/components/reusable/sharingaccesslevel.md';

You can navigate to the General tab of the App Settings page to manage your app's behavior, appearance, and revenue sharing. Here, you can customize your app's name and icon, manage your Adapty SDK and API keys, set your Small Business Program status, and choose the timezone for your app's analytics and charts.

## App details

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

## App-specific URLs

URLs in the Adapty Dashboard include your app ID. By default, Adapty generates this slug based on your app’s name. If you ever need to change it, you can do so in the **App URL Customization** field on the [General](https://app.adapty.io/settings/general) tab of the **App settings** page. Keep in mind that the app slug must be unique within your company in the Adapty Dashboard.

<Zoom>
  <img src={require('./img/url-custom.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

If you need a link that isn’t tied to a specific app, just remove the app slug from the URL. The page will then open for the last app you accessed.

For example:

- `https://app.adapty.io/demo/overview` opens the **Overview** page for the app with the ID `demo`.
- `https://app.adapty.io/overview` opens the **Overview** page for the last app you had open.

## Member of Small Business Program and Reduced Service Fee

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

## Reporting timezone

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

## Installs definition for analytics

Choose what is defined as a new install event in analytics:

| Base                   | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| New device_ids         | <p>(Recommended) Any new instance (installation) of the app counts as a new install event. This includes both the first installs and reinstalls. If a user has multiple devices, each installation on a different device is counted (if a user has your app on 5 devices, you'll see 5 installs).</p> |
| New customer_user_ids  | <p>This option only makes sense if you're [identifying users in Adapty](identifying-users). In that case for logged in users we only count the first installation of the app. If a user installs the app on more devices, they won’t be counted as new installs. Anonymous users (those that have not logged in) are not counted in analytics. </p><p> Reinstallations or logging in on any user's device aren't counted as new installs.</p><p> Note that if you are not [identifying users](identifying-users), you won't get any installs in analytics with this option enabled. </p> |
| New profiles in Adapty | (Legacy) Every app installation, reinstallation and anonymous profiles created during logouts are counted as new installs. |

Keep in mind that this option only affects the [**Analytics**](https://app.adapty.io/analytics) page and does not impact the [**Overview**](https://app.adapty.io/overview) page, where you can configure the view separately.

## App Store price increase logic

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

## Sharing purchases between user accounts

When a [Customer User ID](identifying-users#setting-customer-user-id-on-configuration) tries to restore transactions or extend a subscription that is already associated with a different identified [Customer User ID](identifying-users#setting-customer-user-id-on-configuration), you can control how Adapty responds by adjusting the **Sharing paid access between user accounts** dropdown:

<Sharingaccesslevel />

## SDK and API keys

Use a Public SDK key to integrate Adapty SDKs into your app, and a Secret Key to access Adapty's Server API. You can generate new keys or revoke existing ones as needed.

## Test devices

Specify the devices to be used for testing to ensure they get instant updates for paywall or placement changes, bypassing any caching delays. For more information, see [Testing devices](test-devices).

## Delete the app

If you no longer need an app, you can delete it from Adapty.

:::warning
Please be aware that this action is irreversible, and you won't be able to restore the app or its data.
:::
