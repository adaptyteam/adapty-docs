---
title: "App settings"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

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

| Base                   | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| New device_ids         | <p>(Recommended) Any new instance (installation) of the app counts as a new install event. This includes both the first installs and reinstalls. If a user has multiple devices, each installation on a different device is counted (if a user has your app on 5 devices, you'll see 5 installs).</p> |
| New customer_user_ids  | <p>This option only makes sense if you're [identifying users in Adapty](identifying-users). In that case for logged in users we only count the first installation of the app. If a user installs the app on more devices, they won’t be counted as new installs. Anonymous users (those that have not logged in) are not counted in analytics. </p><p> Reinstallations or logging in on any user's device aren't counted as new installs.</p><p> Note that if you are not [identifying users](identifying-users), you won't get any installs in analytics with this option enabled. </p> |
| New profiles in Adapty | (Legacy) Every app installation, reinstallation and anonymous profiles created during logouts are counted as new installs. |

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

This setting controls what happens when Adapty receives a purchase from a [Customer User ID](identifying-users#setting-customer-user-id-on-configuration) that is already associated with another Customer User ID.

By default, **Transfer to the new user** is enabled, meaning the user can continue accessing the [access level](access-level) provided by Adapty after logging out or reinstalling the app, as long as the device is still signed in to the same Apple/Google ID.

Here’s what happens:

- The new user receives the access level, while the old user loses it. Afterward, the purchase is only available to the new user.
<!--- - An `access_level_updated` event is created in both the new and old user profiles, allowing you to track the transfer. --->
- All future transactions are logged as events in the original user’s profile with Customer User ID to keep them organized in one place.
- Access levels are still shared between anonymous users (users who haven’t been assigned a [Customer User ID](identifying-users#setting-customer-user-id-on-configuration)).

If **Sharing is enabled**, anonymous and identified users can share the same [access level](access-level) provided by Adapty, as long as their device is signed in with the same Apple/Google ID. By default, Apple and Google require in-app purchases to be shared across users with the same Apple/Google ID, as it’s necessary for restoring purchases after a reinstall.

However, you may want to **disable sharing** between different user accounts if you have an internal login system and need to prevent multiple people from using the same purchase.

Here’s what happens when sharing is disabled:

- Access levels are still shared between anonymous users.
- When Adapty first detects a Customer User ID tied to the original purchase (e.g., after a user logs in or signs up), the purchase is assigned to that Customer User ID.
- From that point on, the purchase is only available to the original user. If another user (anonymous or identified) with the same Apple/Google ID tries to access it after a reinstall, Adapty won’t grant them access.
- You can "untie" the purchase by [deleting the owner’s user profile](server-side-api-specs#delete-users-data). After deletion, the access level becomes available to the first user profile that claims it, whether anonymous or identified.
- Disabling sharing only affects new users. Subscriptions already shared between users will continue to be shared after the sharing is disabled.

This ensures there’s only one user profile per subscription.

:::warning

Disabling sharing may prevent some users from regaining access after logging in.

We recommend only disabling sharing if your users **must log in** before making a purchase. Otherwise, there’s a risk that a user could buy a subscription, log into an existing account, and lose access permanently.:::

## 7. SDK and API keys

Use a Public SDK key to integrate Adapty SDKs into your app, and a Secret Key to access Adapty's Server API. You can generate new keys or revoke existing ones as needed.

## 8. Test devices

Specify the devices to be used for testing to ensure they get instant updates for paywall or placement changes, bypassing any caching delays. For more information, see [Testing devices](test-devices).

## 9. Delete the app

If you no longer need an app, you can delete it from Adapty. 

:::warning
Please be aware that this action is irreversible, and you won't be able to restore the app or its data.
:::
