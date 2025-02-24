---
title: "Migration from RevenueCat"
description: "Migrate from RevenueCat to Adapty with our step-by-step guide."
metadataTitle: "Migrate from RevenueCat to Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Your migration plan will have 5 logical steps and take an average of 2 hours. 90% of all migrations take less than one working day.

1. Learn the core differences; create and prepare an Adapty account _(5 minutes)_;
2. Install Adapty SDK for your platform ([iOS](sdk-installation-ios), [Android](sdk-installation-android), [React Native](sdk-installation-reactnative), [Flutter](sdk-installation-flutter), [Unity](sdk-installation-unity)) instead of RevenueCat SDK _(1 hour)_;
3. Set up [Apple App Store server notifications](enable-app-store-server-notifications) to Adapty and (optionally) [raw events forwarding](enable-app-store-server-notifications#raw-events-forwarding) _(5 minutes)_;
4. Test and release updates of your app _(30 minutes);_
5. (Optional) Ask RevenueCat support for historical data in CSV format  _(5 minutes);_
6. (Optional) Import historical data via Adapty support _(30 minutes)_.

:::info
Your subscribers will migrate automatically

All users who have ever activated a subscription will instantly move to Adapty as soon as they open a new version of your app with Adapty SDK. The subscription status validation and premium access will be restored automatically.
:::

Before you push a new version of your app with Adapty SDK, make sure to check our [release сhecklist](release-checklist).

### Learn the core differences; create and prepare an Adapty account

Adapty and RevenueCat SDKs are similarly designed. The biggest difference is the network usage and the speed: Adapty SDK is designed to provide you with information on demand as fast as possible when you ask for it. For example, when requesting a paywall, you get the [remote config](customize-paywall-with-remote-config) first to pre-build your onboarding or paywall and then request products in a dedicated request.

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


<Zoom>
  <img src={require('./img/2406d97-image.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '300px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Install Adapty SDK and replace RevenueCat SDK

Install Adapty SDK for your platform ([iOS](sdk-installation-ios), [Android](sdk-installation-android), [React Native](sdk-installation-reactnative), [Flutter](sdk-installation-flutter), [Unity](sdk-installation-unity)) in your app.

You need to replace a couple of SDK methods on the app side. Let's look at the most common functions and how to replace them with Adapty SDK.

#### SDK activation

Replace `Purchases.configure` with `Adapty.activate`. 

#### Getting paywalls (offerings)

Replace `Purchases.shared.getOfferings` with [`Adapty.getPaywall`](fetch-paywalls-and-products#fetch-paywall-information). 

In Adapty, you always request the paywall via [placement id](placements). In practice, you only fetch no more than 1-2 paywalls, so we made this on purpose to speed up the SDK and reduce network usage.

#### Getting a user (customer profile)

Replace `Purchases.shared.getCustomerInfo` with `Adapty.getProfile`.

#### Getting products

In RevenueCat, you use the following structure:`Purchases.shared.getOfferings` and then `self.offering?.availablePackages`.

In Adapty, you first request a paywall (read above) to get immediate access to Adapty's [remote config](customize-paywall-with-remote-config) and then call for products with [`Adapty.getPaywallProducts`](fetch-paywalls-and-products#fetch-products).

#### Making a purchase

Replace `Purchases.shared.purchase` with [`Adapty.makePurchase`](making-purchases#make-purchase).

#### Checking access level (entitlement)

Get a customer profile (read above first) and then replace 

`customerInfo?.entitlements["premium"]?.isActive == true`

with

[`profile.accessLevels["premium"]?.isActive == true`](subscription-status#retrieving-the-access-level-from-the-server).

#### Restore purchase

Replace `Purchases.shared.restorePurchases` with [`Adapty.restorePurchases`](restore-purchase).

#### Check if the user is logged in

Replace `Purchases.shared.isAnonymous` with `if profile.customerUserId == nil`.

#### Log in user

Replace `Purchases.shared.logIn` with [`Adapty.identify`](identifying-users#setting-customer-user-id-after-configuration).

#### Log out user

Replace `Purchases.shared.logOut` with [`Adapty.logout`](identifying-users#logging-out-and-logging-in).

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
Go through [release checklist](release-checklist).

Make the final check using our list to validate the existing integration or add additional features such as [attribution](attribution-integration) or [analytics](analytics-integration) integrations.
:::

### (Optional) Export your RevenueCat historical data  in CSV format

:::warning
Don't rush the historical data import

You should wait for at least a week after the release with the SDK before doing historical data import. During that time we will get all the info about purchase prices from the SDK, so the data you import will be more relevant.
:::

Export your historical data from RevenueCat in CSV format by following the instructions in [RevenueCat’s official documentation](https://www.revenuecat.com/docs/integrations/scheduled-data-exports).

### (Optional) Ask RevenueCat support for Google Purchase Tokens

If you need to import Google Play transactions, contact RevenueCat support for a CSV file containing Google Purchase Tokens via their [support page](https://app.revenuecat.com/settings/support). The Google Purchase Token is a unique identifier provided by Google Play for each transaction, essential for accurately tracking and verifying purchases in Adapty. This information is not included in the standard export file. The file contains the following three columns:

- `user_id`
- `google_purchase_token`
- `google_product_id`

### Write us to import your historical data

Contact us via the website messenger or email us at [support@adapty.io](mailto:support@adapty.io) with your CSV files.

1. Send the CSV file you exported from RevenueCat directly to our support team.
2. If importing Google Play transactions, include the CSV file with Google Purchase Tokens that you received from RevenueCat support.
3. Let us know which user ID should be used as the Customer User ID (Adapty’s primary user identifier): `rc_original_app_user_id` or `rc_last_seen_app_user_id_alias`.

Our Support Team will import your transactions to Adapty. The following data will imported to Adapty for every transaction:

| Parameter                     | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| user_id                       | Customer User ID, the main identifier of your user in Adapty and your system. |
| apple_original_transaction_id | For subscription chains, this is the original transaction's purchase date, linked by `store_original_transaction_id`. |
| google_product_id             | The product ID in the Google Play Store.                     |
| google_purchase_token         | A unique identifier provided by Google Play for each transaction, required for validation. |
| country                       | The country of the user.                                     |
| created_at                    | The date and time of the user creation.                      |
| subscription_expiration_date  | The date and time when the subscription expires.             |
| email                         | The end user's email.                                        |
| phone_number                  | The end user's phone number.                                 |
| idfa                          | The Identifier for Advertisers (IDFA), assigned by Apple to a user's device. |
| idfv                          | The Identifier for Vendors (IDFV), a code assigned to all apps by one developer and shared across those apps on a device. |
| advertising_id                | A unique identifier provided by the Android OS that advertisers may use for tracking. |
| attribution_channel           | The marketing channel name.                                  |
| attribution_campaign          | The marketing campaign name.                                 |
| attribution_ad_group          | The attribution ad group.                                    |
| attribution_ad_set            | The attribution ad set.                                      |
| attribution_creative          | The attribution creative keyword.                            |

<!---

| Parameter                     | Description                                                  | RC                                                        |
| ----------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| user_id                       | Customer User Id, the main user identifier in Adapty, the identificator of the user in your system | rc_original_app_user_id OR rc_last_seen_app_user_id_alias |
| apple_original_transaction_id | For subscription chains, this is the purchase date of the original transaction, linked by `store_original_transaction_id`. | original_store_transaction_id (when store = app_store)    |
| google_product_id             | ID of the product in the Google Play store.                  | product_identifier                                        |
| google_purchase_token         | The Google Purchase Token is a unique identifier provided by Google Play for each transaction required to validate it. | N/A as part of ETL export, only through support           |
| country                       | Country of the transaction                                   | country                                                   |
| created_at                    | The datetime of teh transaction                              | first_seen_time                                           |
| subscription_expiration_date  | The datetime when the subscription expires.                  | effective_end_time                                        |
| email                         | Your end user's email.                                       | reserved_subscriber_attributes -> $email                  |
| phone_number                  | Your end user's phone number.                                | reserved_subscriber_attributes -> $phoneNumber            |
| idfa                          | The Identifier for Advertisers, assigned by Apple to a user's device. | reserved_subscriber_attributes -> $idfa                   |
| idfv                          | The Identifier for Vendors (IDFV) is a code assigned to all apps by one developer and is shared across all apps by that developer on your device. | reserved_subscriber_attributes -> $idfv                   |
| advertising_id                | The Advertising ID is a unique identifier offered by the Android Operating System that advertisers might use to uniquely identify you. | reserved_subscriber_attributes -> $gpsAdId                |
| attribution_channel           | Marketing channel name.                                      | reserved_subscriber_attributes -> $mediaSource            |
| attribution_campaign          | Marketing campaign name.                                     | reserved_subscriber_attributes -> $campaign               |
| attribution_ad_group          | Attribution ad group.                                        | reserved_subscriber_attributes -> $adGroup                |
| attribution_ad_set            | Attribution ad set.                                          | reserved_subscriber_attributes -> $ad                     |
| attribution_creative          |                                                              | reserved_subscriber_attributes -> $creative               |

--->

In addition, integration identifiers for the following integrations will be imported: Amplitude, Mixpanel, AppsFlyer, Adjust, and FacebookAds.

### FAQ

#### I successfully installed Adapty SDK and released a new app version with it. What will happen to my legacy subscribers who did not update to a version with Adapty SDK?

Most users charge their phones overnight, it's when the App Store usually auto-updates all their apps, so it shouldn't be a problem. There may still be a small number of paid subscribers who did not upgrade, but they will still have access to the premium content. You don't need to worry about it and force them to update.

#### Do I need to export my historical data from RevenueCat as quickly as possible, or will I lose it?

You don't need to make it super fast; make a release with Adapty SDK first, and then give us your historical data. We will restore the history of your users' payments and fill in [profiles](profiles-crm) and [charts](charts).

#### I use MMP (AppsFlyer, Adjust, etc.) and analytics (Mixpanel, Amplitude, etc.). How do I make sure that everything will work?

You first need to pass us the IDs of such 3rd party services via our SDK that you want us to send data to. Read the guide for [attribution integration](attribution-integration) and for [analytics integration](analytics-integration). For historical data and legacy users, **make sure you pass us those IDs from the data you exported from RevenueCat.**