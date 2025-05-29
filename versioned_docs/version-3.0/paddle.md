---
title: "Initial integration with Paddle"
description: "Integrate Paddle with Adapty for seamless subscription payment processing."
metadataTitle: "Paddle Integration Guide | Adapty Docs"

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty integrates with [Paddle](https://www.paddle.com/) to track web payments and subscriptions. This integration provides two main benefits:

- Users who purchase on your website can automatically access paid features when they install and log into your mobile app
- All subscription data appears in your unified Adapty Dashboard with cohorts, predictions, and analytics

:::note
Apple now allows US App Store apps to include links to external payment systems, though apps may still need to offer in-app purchases alongside external options. Check the current App Store guidelines for your region and app category.
:::

To set up the Paddle integration, follow these steps:

## 1\. Connect Paddle to Adapty

The integration uses webhooks to send subscription data from Paddle to Adapty. To connect your Adapty and Paddle accounts, you’ll need to:

1. Provide your Paddle API keys.
2. Add Adapty's webhook URL to Paddle.

:::note
The steps below apply to both Production (Live Mode in Paddle) and Sandbox (Test Mode in Paddle). You can configure both simultaneously. The links provided are for **Live Mode** — to get **Test Mode** links, simply add `sandbox-` at the beginning of each URL. For example, use `https://sandbox-vendors.paddle.com/authentication-v2` instead of `https://vendors.paddle.com/authentication-v2`.
:::

### 1.1. Get and add Paddle API keys

1. In Paddle, go to [Developer Tools → Authentication](https://vendors.paddle.com/authentication-v2) and click **New API key**.

<Zoom>
  <img src={require('./img/paddle-new-key.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Give the key a name and set the expiration date. For the API key to work with Adapty, you need to grant it the **Read** permission for all entities. Click **Save**.

<Zoom>
  <img src={require('./img/paddle-key.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '300px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Click **Copy key**.

<Zoom>
  <img src={require('./img/copy-paddle-key.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. In Adapty, go to [App Settings → Paddle](https://app.adapty.io/settings/paddle) and paste the key in the **Paddle API key** section. If you set an expiration date for your key, remember to generate a new key in Paddle and update it in Adapty before the current key expires.

<Zoom>
  <img src={require('./img/paddle-api-keys-adapty.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### 1.2. Add events that will be sent to Adapty

1. Copy the **Webhook URL** from the same **Paddle** page in Adapty.
2. In Paddle, go to [**Developer Tools → Notifications**](https://vendors.paddle.com/notifications-v2) and click **New destination** to add a webhook.

<Zoom>
  <img src={require('./img/paddle-webhook.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Enter a descriptive name for the webhook. We recommend including "Adapty" in it, so you can easily find it when needed.

4. Paste the **Webhook URL** from Adapty into the **URL** field. Ensure you are using the webhook for the right environment.

5. Set **Notification type** to **Webhook**.

6. Select the following events:

   - `subscription.created`

   - `subscription.updated`

   - `transaction.created`

   - `transaction.updated`

   - `adjustment.created`

   - `adjustment.updated`


<Zoom>
  <img src={require('./img/paddle-create-webhook.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


7. Click **Save destination** to finalize the webhook setup.

### 1.3. Retrieve and add the webhook secret key

1. In the **Notifications** window, click the three dots next to the webhook you just created and select **Edit destination**.
2. A new field called the **Secret key** will appear in the **Edit destination** panel. Copy it.

<Zoom>
  <img src={require('./img/paddle-webhook-secret-key-copy.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


3. In Adapty, go to [App Settings → Paddle](https://app.adapty.io/settings/paddle) and paste the key into the **Notification secret key** field. This key is used to verify webhook data in Adapty.

   

<Zoom>
  <img src={require('./img/paddle-webhook-secret-key.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### 1.4. Match Paddle customers with Adapty profiles

Adapty needs to link each purchase to a [customer profile](profiles-crm) so it can be used in your app. By default, profiles are created automatically when Adapty receives webhooks from Paddle. You can choose which value to use as the `customer_user_id` in Adapty:

1. **Default and recommended:** The `customer_user_id` you pass in the `custom_data` field (see [Paddle docs](https://developer.paddle.com/build/transactions/custom-data))
2. The `email` from the Paddle Customer object (see [Paddle docs](https://developer.paddle.com/paddlejs/methods/paddle-checkout-open#params))
3. The Paddle Customer ID in the `ctm-...` format (see [Paddle docs](https://developer.paddle.com/paddlejs/methods/paddle-checkout-open#params))

You can configure which value to use in the **Profile creation behavior** field in [App Settings → Paddle](https://app.adapty.io/settings/paddle).

<Zoom>
  <img src={require('./img/paddle-users.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## 2. Add Paddle products to Adapty

:::warning

Be sure to add your Paddle products to the Adapty Dashboard or add a Paddle product ID to your existing products. Adapty only tracks events for transactions tied to these products. If you skip this step, transaction events won’t be created.

:::

Paddle works in Adapty just like App Store and Google Play — it’s another platform where you sell digital products. To configure it, add the relevant `product_id` and `price_id` values from Paddle in the [Products](https://app.adapty.io/products) section in Adapty.

<Zoom>
  <img src={require('./img/paddle-create-product.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

In Paddle, product IDs look like `pro_...` and price IDs like `pri_...`. You’ll find them in your [Paddle product catalog](https://vendors.paddle.com/products-v2) once you open a specific product:

<Zoom>
  <img src={require('./img/paddle-product-price.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Once your products are added, the next step is ensuring Adapty can link the purchase to the right user.

## 3\. Provide access to users on the mobile

To ensure users who buy on the web get access on mobile, call `Adapty.activate()` or `Adapty.identify()` using the same `customer_user_id` you passed when the purchase was made. See [Identifying users](identifying-users) for details.

## 4\. Test your integration

Once everything’s set up, you can test your integration. Transactions made in Paddle’s Test Mode will appear as **Sandbox** in Adapty. Transactions from Live Mode will appear as **Production**.

Your integration is now complete. Users can purchase subscriptions on your website and automatically access premium features in your mobile app, while you track all subscription analytics from your unified Adapty dashboard.

## Current limitations

- **Upgrading, downgrading, and proration**: Subscription changes such as upgrading or downgrading can result in prorated charges. Adapty will not account for these charges in revenue calculations. It would be best to disable these options manually via the Paddle dashboard. You can also disable them by setting the `proration_billing_mode` attribute value to `do_not_bill` via the Stripe API.

- **Cancellations**: Paddle has two subscription cancellation options:

  1. Immediate cancellation: The subscription is canceled immediately with or without any proration option

  2. Cancellation at the end of the period: The subscription cancels at the end of the current billing period (similar to in-app subscriptions on the app stores).

  Adapty supports both options, but the revenue calculation for immediate cancellation will disregard the proration option.

- **Refunds**: Adapty tracks only full refunds. Proration or partial refunds are currently not supported.

---

**See also:**

- [Validate purchase in Paddle, get access level, and import transaction history from Paddle with server-side API](ss-validate-paddle-token)