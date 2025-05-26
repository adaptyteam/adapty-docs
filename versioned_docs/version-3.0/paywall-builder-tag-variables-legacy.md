---
title: "Tag variables for product info in legacy Paywall Builder"
description: "Use tag variables in Adapty’s legacy Paywall Builder to optimize offers."
metadataTitle: "Legacy Paywall Builder Tag Variables | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty Paywall Builder has a way to customize all the text corresponding to your products and their offers. But if you have multiple locales — we strongly recommend using variables.

### How it works

When texts for your products contain a tag variable from our list, our SDK uses the pre-fetched localized data from the stores to put it in place of a tag. That way the text on your paywall is always tailored for the right locale.

**Example**: suppose you have a "Premium Subscription" and your app is available both in the US and Spain. So you're  selling "Premium Subscription for $4.99/month" in the US and "Suscripción Premium por €4.99/mes" in Spain.

Tag variables allow you to rely on the data obtained directly from the store to localize such strings — so titles and prices will always be correct.

:::warning

This section describes the legacy Paywall Builder, compatible with Adapty SDK v2.x or earlier. For information on the new Paywall Builder compatible with Adapty SDK v3.0 or later, see [Tag variables for product info in new Paywall Builder](paywall-builder-tag-variables).

:::

### How to use tag variables

:::note
You can only use tag variables when describing products and offers in the "Products" tab of the Paywall Builder
:::

1. Select the "Products" tab of the Builder

<Zoom>
  <img src={require('./img/88265fb-tag_variables_scroll_to_products.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Choose the product you'd like to customize:

<Zoom>
  <img src={require('./img/0a69e8f-tag_variables_select_product.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Use variables from [the table below](paywall-builder-tag-variables#full-list-of-variables) in any of the text fields to describe the product and its offers:

<Zoom>
  <img src={require('./img/8c77550-tag_variables_usage.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Check Preview on the right side of the screen to make sure all renders as intended.

:::warning
**Note:** Preview doesn't use any real values to put in place of your variables as they are only obtained on a device by our SDK. However, by default it displays some template data that's in the same format as the real result.

You can disable this behavior by pressing "eye" icon in the top-right corner of the Preview and switching off the **"Tags preview values"** switch. The preview will then show the actual values of the variables:

<Zoom>
  <img src={require('./img/aaf7439-tag_variables_preview_values_off.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
:::

### Full list of variables

| Tag variable              | Description                                                                                                                                                                                                                                                                           | Example              |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------- |
| `<PROD_TITLE/>`           | Localized title of the product                                                                                                                                                                                                                                                        | Premium Subscription |
| `<PROD_PRICE/>`           | Localized price of the product. In case of subscriptions the price is for one billing period.                                                                                                                                                                                         | $9.99                |
| `<PROD_PRICE_PER_DAY/>`   | Price of a subscription divided by the number of days in the billing period. **Returns empty string for non-subscriptions.**                                                                                                                                                          | $0.33                |
| `<PROD_PRICE_PER_WEEK/>`  | Price of a subscription divided by the number of weeks in the billing period. **Returns empty string for non-subscriptions.**                                                                                                                                                         | $2.33                |
| `<PROD_PRICE_PER_MONTH/>` | Price of a subscription divided by the number of months in the billing period. If actual billing period is less than a month — it's multiplied to represent how much a user would pay for a full month.**Returns empty string for non-subscriptions.**                                | $9.99                |
| `<PROD_PRICE_PER_YEAR/>`  | Price of a subscription that represents how much a user would pay for a full year of usage. So, for example, the price for the monthly subscription would be multiplied by 12 and the price for the yearly one would remain the same. **Returns empty string for non-subscriptions.** | $119.88              |
| `<OFFER_PRICE/>`          | Localized price of an offer (intro or promo). **Applicable only to auto-renewable subscriptions, returns empty string if user is not eligible for any offers**                                                                                                                        | $0.99                |
| `<OFFER_BILLING_PERIOD/>` | Localized billing period of an offer (intro or promo). Same as `<OFFER_FULL_DURATION/>`for trial and pay-upfront offers. **Applicable only to auto-renewable subscriptions, returns empty string if user is not eligible for any offers**                                             | 1 week               |
| `<OFFER_FULL_DURATION/>`  | Localized full duration of an offer (intro or promo). **Applicable only to auto-renewable subscriptions, returns empty string if user is not eligible for any offers**                                                                                                                | 1 month              |

### Offer tags for different offer types

:::note
You can learn more about Offers and how you can configure them in Adapty [here](offers)
:::

Offer tags for different offer types might be confusing, so let's consider an example. Suppose we have a weekly subscription called "Premium Subscription" for a price of $5. For it we have 3 possible offers:

- **Pay As You Go**. First 3 weeks for a price of $3 (billed each week), then $5/week
- **Pay Up Front**. First 3 weeks for a price of $8 (billed right now), then $5/week
- **Free Trial**. First week free, then $5/week.

`<PROD_TITLE/>` for this product would be "Premium Subscription" and its `<PROD_PRICE/>` would be $5. But the values for the offer tags — depending on which offer the user is eligible for — would be:

| Tag variable              | Pay As You Go | Pay Upfront | Free Trial |
| :------------------------ | :------------ | :---------- | :--------- |
| `<OFFER_PRICE/>`          | $3            | $8          | $0         |
| `<OFFER_BILLING_PERIOD/>` | 1 week        | 3 weeks     | 1 week     |
| `<OFFER_FULL_DURATION/>`  | 3 weeks       | 3 weeks     | 1 week     |

So in any offer other than a "Pay As You Go" type,`<OFFER_BILLING_PERIOD/>` and `<OFFER_FULL_DURATION/>`would be the same.