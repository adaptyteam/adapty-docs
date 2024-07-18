---
title: "App settings"
description: ""
metadataTitle: ""
---

You can navigate to the General tab of the App Settings page to manage your app's behavior, appearance, and revenue sharing. Here, you can customize your app's name and icon, manage your Adapty SDK and API keys, set your Small Business Program status, and choose the timezone for your app's analytics and charts.

## App details


<img
  src={require('./img/8fa2929-CleanShot_2023-04-21_at_15.16.222x.png').default}
/>





Choose a unique name and icon that represent your app in the Adapty interface. Please note that the app name and icon will not affect the app's name and icon in the App Store or Google Play. Also, make sure to select an appropriate App Category that accurately reflects your app's purpose and content. This will help users discover your app and ensure it appears in the appropriate app store categories.

## 2\. Member of Small Business Program and Reduced Service Fee


<img
  src={require('./img/825e2be-CleanShot_2023-04-19_at_13.43.292x.png').default}
/>





If you're a member of the Apple Small Business Program and/or Google's Reduced Service Fee program, you can let Adapty know by specifying the period that you are a member. Adapty will adjust the commission rate accordingly, so you can keep more of your revenue. Please note that this setting applies only to future transactions, and you need to update it if your Small Business Program status changes. You can learn more about the [App Store Small Business Program](https://docs.adapty.io/docs/app-store-small-business-program) and [Google's Reduced Service Fee](https://docs.adapty.io/docs/google-reduced-service-fee).

### 3\. Reporting timezone


<img
  src={require('./img/47227f9-CleanShot_2023-04-19_at_13.45.302x.png').default}
/>





Choose the timezone that corresponds to the location where you're based, or where your app's analytics and charts are most relevant. We recommend using the same timezone as your App Store Connect or Google Play Console account to ensure consistency. Please note that this timezone setting does not affect third-party integrations in the Adapty system, which use the UTC timezone.

You can access the timezone settings in the Reported timezone section of the General Tab on the App Settings page. You can also choose to set the same timezone for all the apps in your Adapty account by checking the corresponding box.

## 4\. App Store price increase logic

To maintain accurate data and avoid discrepancies between Adapty analytics and App Store Connect results, it is important to select the appropriate option when adjusting configurations related to price increases in App Store Connect.  
So you can choose the logic that will be applied to subscription price increases in Adapty:


<img
  src={require('./img/b766c8b-CleanShot_2023-07-18_at_19.28.18_22x.png').default}
/>





- **Subscription price for existing users is preserved:** By selecting this option, the current price will be retained for your existing subscribers, even if you make changes to the price in the App Store Connect. This means that existing subscribers will continue to be billed at their original subscription price.
- **When the subscription price is changed in App Store Connect, it changes for existing subscribers:** If you choose this option, any price changes made in the App Store Connect will be applied to your existing subscribers as well. This means that existing subscribers will be charged the new price reflecting the updated pricing set in the App Store Connect.

:::warning
It is important to consider that the selected option not only affects analytics in Adapty but also impacts integrations and overall transaction handling behavior.
:::

Please ensure that you select the designated option that aligns with your desired approach to handling subscription prices for existing subscribers. This will help maintain accurate data and synchronization between Adapty analytics and the results obtained from the App Store Connect.

## 5\. Sharing purchases between user accounts

This setting determines what happens when Adapty receives a purchase from a [Customer User ID](https://docs.adapty.io/docs/identifying-users#setting-customer-user-id-on-configuration) that is currently associated with another Customer User ID.

Sharing is enabled by default — meaning that anonymous and identified users can share the same [access level](access-level) provided by Adapty if the app store on their device is under the same Apple/Google ID. This can be helpful for example when your user re-installs the app and chooses to log in under a different email — in that case, they will still get access to their previous purchase.

Apple and Google require "sharing" in-app purchases between your users by default, because they rely on their Apple/Google IDs to tie the purchase to — and otherwise restoring would not work on some reinstalls.

However, you might want to disable sharing between different user accounts in case you rely on an internal login system and you would like to prevent two people from using the same purchase.

Here is what happens when this option is disabled:

- Access level is still shared between anonymous users (that is if a user never gets identified and assigned a [customer user ID](https://docs.adapty.io/docs/identifying-users#setting-customer-user-id-on-configuration))
- When Adapty first sees a customer user ID connected to the original purchase (for example, when a user logs in or signs up), this purchase becomes "owned" by this customer user ID.
- After that, this purchase is only available to the original user. If another user (anonymous or identified) comes along with the same Apple/Google ID after a reinstall — Adapty will not provide access to them.
- You can "untie" the purchase only by [deleting the owner's user profile](https://docs.adapty.io/docs/server-side-api-specs#delete-users-data). After deletion, this access level becomes available to the first user profile to claim it (anonymous or identified).

That way you can make sure there is only one user profile for every subscription.

:::warning
Disabled sharing may result in some of your users not getting access on login

We advise you only consider disabling sharing if your users **are required to login** before they get a chance to make a purchase. Otherwise there could be cases where a user purchases a subscription, logs into an existing account and loses access once and for all.
:::

**Note:** Disabling sharing will only affect the new users. Subscriptions that have already been shared between existing users will continue to be shared after you enable this setting.

## 6\. SDK and API keys

Use a Public SDK key to integrate Adapty SDKs into your app, and a Secret Key to access Adapty's Server API. You can generate new keys or revoke existing ones as needed.

## 7. Test devices

Specify which devices will be used for testing so they can receive immediate updates for paywall or placement changes without delays caused by caching.

## 8. Delete the app

If you no longer need an app, you can delete it from Adapty. 

:::warning
Please be aware that this action is irreversible, and you won't be able to restore the app or its data.
:::