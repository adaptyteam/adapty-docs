---
title: "Tag variables for product info in Paywall builder"
description: "Paywall Builder Tag Variables | Adapty Docs"
metadataTitle: "Use tag variables in Adapty’s Paywall Builder to personalize user experiences and boost sales."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty’s Paywall Builder lets you customize all the text for your products and their offers. If you’re supporting multiple locales, we strongly recommend using variables.

### How it works

When you add tag variables from our list to your product texts, our SDK pulls in the pre-fetched localized data from the app stores to replace the tags. This ensures that the text on your paywall is always perfectly tailored for the correct locale.

**Example**: Let’s say you have a "Premium Subscription" available in both the US and Spain. In the US, it might display as "Premium Subscription for $4.99/month," while in Spain, it would show "Suscripción Premium por €4.99/mes."

Tag variables allow you to automatically localize these strings based on data directly from the store, ensuring that titles and prices are always accurate.

:::warning

This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Legacy Paywall Builder tag variables](paywall-builder-tag-variables-legacy).

:::

### How to use tag variables

:::note
You can only use tag variables when describing products and offers in the Product component of the Paywall Builder.
:::

1. In the Paywal Builder’s left pane, select the product you want to customize.
2. Use variables from the [table below](paywall-builder-tag-variables#full-list-of-variables) in any text fields to describe the product and its offers.


<Zoom>
  <img src={require('./img/0351661-tag_variables.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





4. Check the preview on the right side of the screen to ensure everything renders as expected.

:::note
The preview doesn’t use real values to replace your variables; those are only retrieved by our SDK on a device. However, it does display template data in the same format as the actual result. You can disable this behavior by clicking the eye icon in the bottom-right corner of the preview and turning off the **Tags preview values** toggle. The preview will then show the actual values of the variables:


<Zoom>
  <img src={require('./img/da92d39-tags_preview_values.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



:::

### Full list of variables

| Tag variable              | Description                                                                                                                                                                                                                               | Example              |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| `<PROD_TITLE/>`           | Localized title of the product                                                                                                                                                                                                            | Premium Subscription |
| `<PROD_PRICE/>`           | Localized price of the product. For subscriptions, this is the price for one billing period.                                                                                                                                              | $9.99                |
| `<PROD_PRICE_PER_DAY/>`   | Subscription price divided by the number of days in the billing period. **Returns empty string for non-subscriptions.**                                                                                                                   | $0.33                |
| `<PROD_PRICE_PER_WEEK/>`  | Subscription price divided by the number of weeks in the billing period. **Returns empty string for non-subscriptions.**                                                                                                                  | $2.33                |
| `<PROD_PRICE_PER_MONTH/>` | Subscription price divided by the number of months in the billing period. If the billing period is less than a month, it’s adjusted to represent a full month.**Returns empty string for non-subscriptions.**                             | $9.99                |
| `<PROD_PRICE_PER_YEAR/>`  | Subscription price adjusted to represent a full year of usage. For example, the monthly subscription price would be multiplied by 12, while the yearly price remains the same. **Returns empty string for non-subscriptions.**            | $119.88              |
| `<OFFER_PRICE/>`          | Localized price of an offer (intro or promo). **Applicable only to auto-renewable subscriptions, returns empty string if user is not eligible for any offers**                                                                            | $0.99                |
| `<OFFER_BILLING_PERIOD/>` | Localized billing period of an offer (intro or promo). Same as `<OFFER_FULL_DURATION/>`for trial and pay-upfront offers. **Applicable only to auto-renewable subscriptions, returns empty string if user is not eligible for any offers** | 1 week               |
| `<OFFER_FULL_DURATION/>`  | Localized full duration of an offer (intro or promo). **Applicable only to auto-renewable subscriptions, returns empty string if user is not eligible for any offers**                                                                    | 1 month              |

### Offer tags for different offer types

:::note
You can learn more about Offers and how to configure them in Adapty [here](offers)
:::

Understanding offer tags can be a bit tricky, so let’s break it down with an example. Suppose you have a weekly subscription called "Premium Subscription" for $5, with three possible offers:

- **Pay As You Go**. First 3 weeks for $3 (billed weekly), then $5/week.
- **Pay Up Front**. First 3 weeks for $8 (billed immediately), then $5/week.
- **Free Trial**. First week free, then $5/week.

For this product, `<PROD_TITLE/>` would be "Premium Subscription" and `<PROD_PRICE/>` would be $5. However, the values for the offer tags—depending on which offer the user is eligible for—would be:

| Tag variable              | Pay As You Go | Pay Upfront | Free Trial |
| :------------------------ | :------------ | :---------- | :--------- |
| `<OFFER_PRICE/>`          | $3            | $8          | $0         |
| `<OFFER_BILLING_PERIOD/>` | 1 week        | 3 weeks     | 1 week     |
| `<OFFER_FULL_DURATION/>`  | 3 weeks       | 3 weeks     | 1 week     |

So for offers other than "Pay As You Go" type,`<OFFER_BILLING_PERIOD/>` and `<OFFER_FULL_DURATION/>`will be the same.