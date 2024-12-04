---
title: "API objects"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import ProfileObject from '@site/src/components/reusable/ProfileObject.md';
import AccessLevel from '@site/src/components/reusable/AccessLevel.md';
import Purchase from '@site/src/components/reusable/Purchase.md';
import Subscription from '@site/src/components/reusable/Subscription.md';
import NonSubscription from '@site/src/components/reusable/NonSubscription.md';
import Offer from '@site/src/components/reusable/Offer.md';
import Price from '@site/src/components/reusable/Price.md';
import InstallationMeta from '@site/src/components/reusable/InstallationMeta.md';
import PaywallObject from '@site/src/components/reusable/PaywallObject.md';

## Objects

Adapty API has JSON objects so you can understand a response structure and wrap it into your code.

All datetime values are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), for example, "2020-01-15T15:10:36.517975+0000".

### Access level

Info about customer’s [access level](access-level). 

Access levels let you control what your app's users can do in your mobile app without hardcoding specific product IDs. Each product defines how long the user gets a certain access level. So, whenever a user makes a purchase, Adapty grants access to the app for a specific period (for subscriptions) or forever (for lifetime purchases). Alternatively, you can [grant specific access](server-side-api-specs#grant-access-level) for a specified time to a user via server-side API.

You can do the following action via Adapty server-side API:

- [Check users's access level](server-side-api-specs#retrieve-profile) by retrieving their profile details
- [Grant specific access](server-side-api-specs#grant-access-level) to your end user without providing a transaction
- [Set transaction and grant access level](server-side-api-specs#set-transaction) to your end user
- [Revoke access level](server-side-api-specs#revoke-access-level) from your end user

<AccessLevel />

### Installation Meta

Information about installation of the app on a specific device. 

You can do the following action via Adapty server-side API:

- [Create a profile with spesific installation meta](server-side-api-specs#create-profile)
- [Update user's installation meta](server-side-api-specs#update-profile)

<InstallationMeta />

### Non Subscription

Info about non-subscription purchases. These can be one-time \(consumable\) products, unlocks \(like new map unlock in the game\), etc.  

You can do the following action via Adapty server-side API:

- [Check user's current non-subscriptions](server-side-api-specs#retrieve-profile) by retrieving their profile details

<NonSubscription />

### One-Time Purchase

<Purchase />

### Offer

Information on the applied offer. The Offer object is a part of the  [Subscription](server-side-api-objects#subscription), and [Access level](server-side-api-objects#access-level) objects.

You can do the following actions with offers via Adapty server-side API:

- [Apply offer](server-side-api-specs#set-transaction) when setting a transaction to your user

<Offer />

### Paywall object

<PaywallObject />

### Price

Information about the cost of your product in local currency. The Price object is a part of the  [Subscription](server-side-api-objects#subscription) and Purchase objects.

You can do the following actions with product price via Adapty server-side API:

- [Set transaction to your user](server-side-api-specs#set-transaction) and specify its price

<Price />

### Profile

Info about the [customer and their subscription](server-side-api-objects#profile)

You can do the following actions with user profiles via Adapty server-side API:

- [Retrieve/get the end-user's profile](server-side-api-specs#retrieve-profile) with their access levels, subscriptions, non-subscriptions, etc.
- [Create a new end-user profile](server-side-api-specs#create-profile)
- [Update your end-user profile](server-side-api-specs#update-profile)
- [Delete your end-user](server-side-api-specs#delete-profile)

<ProfileObject />

### Product

This object contains details about a product in Adapty.

#### Properties

| Name                           | Type    | Required           | Description                                                  |
| ------------------------------ | ------- | ------------------ | ------------------------------------------------------------ |
| title                          | String  | :heavy_minus_sign: | **Product name** from the [**Products**](https://app.adapty.io/products) section in the Adapty Dashboard. |
| is_consumable                  | Boolean | :heavy_plus_sign:  | Indicates whether the product is consumable.                 |
| adapty_product_id              | UUID    | :heavy_minus_sign: | Internal product ID as used in Adapty.                       |
| vendor_product_id              | String  | :heavy_plus_sign:  | The product ID in app stores.                                |
| introductory_offer_eligibility | Boolean | :heavy_minus_sign: | Specifies if the user is eligible for an iOS introductory offer. |
| promotional_offer_eligibility  | Boolean | :heavy_minus_sign: | Specifies if the user is eligible for a promotional offer.   |
| base_plan_id                   | String  | :heavy_minus_sign: | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) for Google Play or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) for Stripe. |
| offer                          | JSON    | :heavy_minus_sign: | An [Offer](web-api-objects#offer-object) object as a JSON.   |

#### Example

```json
{
  "title": "Monthly Subscription w/o Trial",
  "is_consumable": true,
  "adapty_product_id": "InternalProductId",
  "vendor_product_id": "onemonth_no_trial",
  "introductory_offer_eligibility": false,
  "promotional_offer_eligibility": true,
  "base_plan_id": "B1",
  "offer": {
    "category": "promotional",
    "type": "pay_up_front",
    "id": "StoreOfferId"
  }
}

```

### RemoteConfig

This object contains information about a [remote config](customize-paywall-with-remote-config) for a paywall.

```json
{
  "lang": "en",
  "data": "{\"bodyItems\":[{\"spacerValue\":{\"height\":20,\"style\":{\"type\":\"emptySpace\"}},\"type\":\"spacer\"},{\"mediaValue\":{\"ratio\":\"1:1\",\"source\":{\"fileType\":\"image\",\"reference\":{\"en\":\"bundle/images/new1.png\"}},\"widthStyle\":\"full\"},\"type\":\"media\"},{\"titleValue\":{\"alignment\":\"center\",\"subtitleConfig\":{\"fontSize\":17,\"text\":\"\",\"color\":\"#FFFFFF\"},\"titleConfig\":{\"fontSize\":22,\"text\":\"\"}},\"type\":\"title\"},{\"productListValue\":{\"items\":[{\"productId\":\"exampleapp.oneWeek\",\"promoText\":\"paywall.promo-1.title\",\"backgroundColor\":\"#0B867D\"},{\"discountRate\":80,\"productId\":\"exampleapp.oneYear\",\"promoText\":\"paywall.promo-2.title\",\"backgroundColor\":\"#0B867D\"}],\"layout\":\"vertical\"},\"type\":\"productList\"}],\"defaultProductId\":\"exampleapp.oneWeek\",\"footer\":{\"singleProductValue\":{\"customTitles\":{\"exampleapp.oneWeek\":\"Subscribe\",\"exampleapp.oneYear\":\"Subscribe\"},\"productId\":\"exampleapp.oneWeek\"},\"type\":\"singleProduct\"},\"id\":\"exampleapp\",\"isFullScreen\":true,\"settings\":{\"backgroundColor\":\"#000000\",\"closeButtonAlignment\":\"left\",\"closeButtonIconStyle\":\"light\",\"colorScheme\":{\"accent\":\"#007566\",\"background\":\"#001B0D\",\"label\":\"#FFFFFF\",\"primary\":\"#10C6B6\",\"secondaryLabel\":\"#FFFFFF\",\"seperator\":\"#FFFFFF\"},\"isFullScreen\":true,\"shouldShowAlertOnClose\":false,\"showCloseButtonAfter\":1,\"triggerPurchaseWithAlert\":false,\"triggerPurchaseWithProductChange\":false}}"
}

```

#### Properties

| Name | Type   | Required          | Description                                                  |
| ---- | ------ | ----------------- | ------------------------------------------------------------ |
| lang | String | :heavy_plus_sign: | <p>Locale code for the [paywall localization. It uses language and region subtags separated by a hyphen (**-**).</p><p>Examples: `en` for English, `pt-br` for Brazilian Portuguese.</p><p>Refer to  [Localizations and locale codes](localizations-and-locale-codes) for more details.</p> |
| data | String | :heavy_plus_sign: | Serialized JSON string representing the remote config of your paywall. You can find it in the **Remote Config** tab of a specific paywall in the Adapty Dashboard. |

### Subscription

Info about your end user subscription.  You can do the following action via Adapty server-side API:

- [Check the user's current subscription](server-side-api-specs#retrieve-profile) by retrieving their profile details
- [Set transaction to your user](server-side-api-specs#set-transaction) and grant a subscription to them

<Subscription />
