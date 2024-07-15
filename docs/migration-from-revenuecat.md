---
title: "Migration from RevenueCat"
description: "The document outlines a migration plan for switching from RevenueCat SDK to Adapty SDK, which involves learning the core differences, installing Adapty SDK, switching App Store server-side notifications, testing and releasing a new app version, and optionally importing historical data."
metadataTitle: ""
---

Your migration plan will have 5 logical steps and take an average of 2 hours. 90% of all migrations take less than one working day.

1. Learn the core differences; create and prepare an Adapty account _(5 minutes)_;
2. Install Adapty SDK for your platform ([iOS](ios-installation), [Android](android-installation), [React Native](react-native-installation), [Flutter](flutter-installation), [Unity](unity-installation)) instead of RevenueCat SDK _(1 hour)_;
3. Set up [Apple App Store server notifications](app-store-server-notifications) to Adapty and (optionally) [raw events forwarding](app-store-server-notifications#raw-events-forwarding) _(5 minutes)_;
4. Test and release updates of your app _(30 minutes);_
5. (Optional) Ask RevenueCat support for historical data in CSV format  _(5 minutes);_
6. (Optional) Import historical data via Adapty support _(30 minutes)_.

:::info
Your subscribers will migrate automatically

All users who have ever activated a subscription will instantly move to Adapty as soon as they open a new version of your app with Adapty SDK. The subscription status validation and premium access will be restored automatically.
:::

Before you push a new version of your app with Adapty SDK, make sure to check our [release сhecklist](https://docs.adapty.io/docs/release-checklist).

### Learn the core differences; create and prepare an Adapty account

Adapty and RevenueCat SDKs are similarly designed. The biggest difference is the network usage and the speed: Adapty SDK is designed to provide you with information on demand as fast as possible when you ask for it. For example, when requesting a paywall, you get the [remote config](paywalls#remote-config-table-view) first to pre-build your onboarding or paywall and then request products in a dedicated request.

Naming is slightly different:

| RevenueCat  | Adapty          |
| :---------- | :-------------- |
| Package     | Product         |
| Offering    | Paywall         |
| Paywall     | Paywall Builder |
| Entitlement | Access level    |

Adapty has a concept of [placement](placements). It's a logical place inside your app where the user can make a purchase. In most cases, you have one or two placements:

- Onboarding (because 80% of all purchases take place there);
- General (you show it in settings or inside the app after the onboarding).


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/2406d97-image.png" 
    style={{ width: '600px', border: '1px solid grey' }}
  />
</div>





### Install Adapty SDK and replace RevenueCat SDK

Install Adapty SDK for your platform ([iOS](ios-installation), [Android](android-installation), [React Native](react-native-installation), [Flutter](flutter-installation), [Unity](unity-installation)).

You need to replace a couple of SDK methods on the app side. Let's look at the most common functions and how to replace them with Adapty SDK.

#### SDK activation

Replace `Purchases.configure` with `Adapty.activate`.

#### Getting paywalls (offerings)

Replace `Purchases.shared.getOfferings` with `Adapty.getPaywall`. 

In Adapty, you always request the paywall via [placement id](placements). In practice, you only fetch no more than 1-2 paywalls, so we made this on purpose to speed up the SDK and reduce network usage.

#### Getting a user (customer profile)

Replace `Purchases.shared.getCustomerInfo` with `Adapty.getProfile`.

#### Getting products

In RevenueCat, you use the following structure:`Purchases.shared.getOfferings` and then `self.offering?.availablePackages`.

In Adapty, you first request a paywall (read above) to get immediate access to Adapty's [remote config](paywalls#paywall-remote-config) and then call for products with `Adapty.getPaywallProducts`.

#### Making a purchase

Replace `Purchases.shared.purchase` with `Adapty.makePurchase`.

#### Checking access level (entitlement)

Get a customer profile (read above first) and then replace 

`customerInfo?.entitlements["premium"]?.isActive == true`

with

`profile.accessLevels["premium"]?.isActive == true`.

#### Restore purchase

Replace `Purchases.shared.restorePurchases` with `Adapty.restorePurchases`.

#### Check if the user is logged in

Replace `Purchases.shared.isAnonymous` with `if profile.customerUserId == nil`.

#### Log in user

Replace `Purchases.shared.logIn` with `Adapty.identify`.

#### Log out user

Replace `Purchases.shared.logOut` with `Adapty.logout`.

### Switch App Store server-side notifications to Adapty

Read how to do this [here](migrate-to-adapty-from-another-solutions#changing-apple-server-notifications).

### Test and release a new version of your app

If you're reading this, you've already:

- [x] Configured Adapty Dashboard
- [x] Installed Adapty SDK
- [x] Replaced SDK logic with Adapty functions
- [x] Switched App Store server-side notifications to Adapty and optionally turn on raw events forwarding to RevenueCat
- [ ] Made a sandbox purchase
- [ ] Made a new app release

If you checked the points above, just make a test purchase in the Sandbox and then release the app.

:::info
Go through [release checklist](release-checklist)

Make the final check using our list to validate the existing integration or add additional features such as [attribution](attribution-integration) or [analytics](analytics-integration) integrations.
:::

### (Optional) Ask RevenueCat support for historical data in CSV format

:::warning
Don't rush the historical data import

You should wait for at least a week after the release with the SDK before doing historical data import. During that time we will get all the info about purchase prices from the SDK, so the data you import will be more relevant.
:::

Ask RevenueCat about the historical data on their [support page](https://app.revenuecat.com/settings/support). For the file format reference, check this page: [Importing Historical Data to Adapty](importing-historical-data-to-adapty). Also, you can use this [Google Sheets file](https://docs.google.com/spreadsheets/d/162LMI9D7-BP63Jkllj2AtpaD7FQFa0-V-Yht1U65Ojs/edit#gid=70701724).


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/2bce57f-CleanShot_2022-03-16_at_15.40.072x.png" 
    style={{ width: 'auto', border: '1px solid grey' }}
  />
</div>





### Write us to import your historical data

Contact us using the website messenger or just email us at [support@adapty.io](mailto:support@adapty.io) with your CSV file.

### FAQ

#### I successfully installed Adapty SDK and released a new app version with it. What will happen to my legacy subscribers who did not update to a version with Adapty SDK?

Most users charge their phones overnight, it's when the App Store usually auto-updates all their apps, so it shouldn't be a problem. There may still be a small number of paid subscribers who did not upgrade, but they will still have access to the premium content. You don't need to worry about it and force them to update.

#### Do I need to request historical data from RevenueCat as quickly as possible, or will I lose it?

You don't need to make it super fast; make a release with Adapty SDK first, and then give us your historical data. We will restore the history of your users' payments and fill in [profiles](profiles-crm) and [charts](charts).

#### I use MMP (AppsFlyer, Adjust, etc.) and analytics (Mixpanel, Amplitude, etc.). How do I make sure that everything will work?

You first need to pass us the IDs of such 3rd party services via our SDK that you want us to send data to. Read the guide for [attribution integration](attribution-integration) and for [analytics integration](analytics-integration). For historical data and legacy users, **make sure you pass us those IDs from the data export you asked for from RevenueCat.**