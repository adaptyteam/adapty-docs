---
title: " Web API objects"
description: ""
metadataTitle: ""
toc_max_heading_level: 4
---

import PaywallObject from '@site/src/components/reusable/PaywallObject.md';

## Offer object

This object contains details about the applied offer.

```json showLineNumbers
{
  "category": "no_offer",
  "type": "free_trial",
  "id": "Offer Name"
}

```

### Properties

| Name     | Type   | Required          | Description                                                  |
| -------- | ------ | ----------------- | ------------------------------------------------------------ |
| category | String | :heavy_plus_sign: | Category of the applied offer. Possible values: `introductory`, `promotional`, `winback`. |
| type     | String | :heavy_plus_sign: | Type of the applied offer. Possible values: `free_trial`, `pay_as_you_go`, `pay_up_front`. |
| Id       | String | :heavy_plus_sign: | The **Offer name** of the applied offer as specified in the [**Products**](https://app.adapty.io/products) section of the Adapty Dashboard. |

## Paywall object

<PaywallObject />

## Products object

This object contains details about a product in Adapty.

### Properties

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

### Example

```json showLineNumbers
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



## RemoteConfig object

This object contains information about a [remote config](customize-paywall-with-remote-config) for a paywall.

```json showLineNumbers
{
  "lang": "en",
  "data": "{\"bodyItems\":[{\"spacerValue\":{\"height\":20,\"style\":{\"type\":\"emptySpace\"}},\"type\":\"spacer\"},{\"mediaValue\":{\"ratio\":\"1:1\",\"source\":{\"fileType\":\"image\",\"reference\":{\"en\":\"bundle/images/new1.png\"}},\"widthStyle\":\"full\"},\"type\":\"media\"},{\"titleValue\":{\"alignment\":\"center\",\"subtitleConfig\":{\"fontSize\":17,\"text\":\"\",\"color\":\"#FFFFFF\"},\"titleConfig\":{\"fontSize\":22,\"text\":\"\"}},\"type\":\"title\"},{\"productListValue\":{\"items\":[{\"productId\":\"exampleapp.oneWeek\",\"promoText\":\"paywall.promo-1.title\",\"backgroundColor\":\"#0B867D\"},{\"discountRate\":80,\"productId\":\"exampleapp.oneYear\",\"promoText\":\"paywall.promo-2.title\",\"backgroundColor\":\"#0B867D\"}],\"layout\":\"vertical\"},\"type\":\"productList\"}],\"defaultProductId\":\"exampleapp.oneWeek\",\"footer\":{\"singleProductValue\":{\"customTitles\":{\"exampleapp.oneWeek\":\"Subscribe\",\"exampleapp.oneYear\":\"Subscribe\"},\"productId\":\"exampleapp.oneWeek\"},\"type\":\"singleProduct\"},\"id\":\"exampleapp\",\"isFullScreen\":true,\"settings\":{\"backgroundColor\":\"#000000\",\"closeButtonAlignment\":\"left\",\"closeButtonIconStyle\":\"light\",\"colorScheme\":{\"accent\":\"#007566\",\"background\":\"#001B0D\",\"label\":\"#FFFFFF\",\"primary\":\"#10C6B6\",\"secondaryLabel\":\"#FFFFFF\",\"seperator\":\"#FFFFFF\"},\"isFullScreen\":true,\"shouldShowAlertOnClose\":false,\"showCloseButtonAfter\":1,\"triggerPurchaseWithAlert\":false,\"triggerPurchaseWithProductChange\":false}}"
}

```

### Properties

| Name | Type   | Required          | Description                                                  |
| ---- | ------ | ----------------- | ------------------------------------------------------------ |
| lang | String | :heavy_plus_sign: | <p>Locale code for the [paywall localization. It uses language and region subtags separated by a hyphen (**-**).</p><p>Examples: `en` for English, `pt-br` for Brazilian Portuguese.</p><p>Refer to  [Localizations and locale codes](localizations-and-locale-codes) for more details.</p> |
| data | String | :heavy_plus_sign: | Serialized JSON string representing the remote config of your paywall. You can find it in the **Remote Config** tab of a specific paywall in the Adapty Dashboard. |