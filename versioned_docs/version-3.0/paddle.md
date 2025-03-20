---
title: "Initial integration with Paddle"
description: "Integrate Paddle with Adapty for seamless subscription payment processing."
metadataTitle: "Paddle Integration Guide | Adapty Docs"

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty supports tracking web payments and subscriptions made through [Paddle](https://www.paddle.com/). If you’re already selling your product on the web or considering doing so, this integration can help in two key ways:

- Automatically granting access to paid features for users who purchased on the web but later installed the app and logged in.
- Consolidating all subscription analytics in one Adapty Dashboard, including cohorts, predictions, and other analytics tools.

While web-based purchases are becoming more common, keep in mind that Apple's App Store guidelines prohibit offering alternative payment systems for digital goods within your app. Promoting your web subscriptions inside the app may result in rejection or removal from the App Store.

Follow these steps to set up the Paddle integration.

### 1\. Connect Paddle to Adapty

This integration mainly relies on Adapty receiving subscription data from Paddle via webhooks. To connect your Adapty and Paddle accounts, you’ll need to:

1. Provide your Paddle API keys.
2. Add Adapty's webhook URL to Paddle.

:::note
The steps below apply to both Production (Live Mode in Paddle) and Sandbox (Test Mode in Paddle). You can configure both simultaneously. The links provided are for **Live Mode** — to get **Test Mode** links, simply add `sandbox-` at the beginning of each URL. For example, use `https://sandbox-vendors.paddle.com/authentication-v2` instead of `https://vendors.paddle.com/authentication-v2`.
:::

### Get and add Paddle API keys

1. In Paddle, go to [Developer Tools → Authentication](https://vendors.paddle.com/authentication-v2).

   

<Zoom>
  <img src={require('./img/paddle-api-list.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Click the three-dot button next to the API key you plan to use, then click **Copy key**.
3. In Adapty, go to [App Settings → Paddle](https://app.adapty.io/settings/paddle) and paste the key:

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

### Add Adapty’s webhook to Paddle

1. Copy the **Webhook URL** from the same **Paddle settings page** in Adapty.
2. In Paddle, go to [**Developer Tools → Notifications**](https://vendors.paddle.com/notifications-v2) and click **New destination**.

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

3. Enter a descriptive name for the webhook. We recommend including "Adapty" in it.

4. Paste the **Webhook URL** from Adapty into the **URL** field.

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




5. Click **Save destination** to finalize the webhook setup.

### Retrieve and Add the Webhook Secret Key

1. In the **Notifications** window, click the three-dot button next to the webhook you just created and select **Edit destination**.
2. A new field called **Secret key** will appear in the **Edit destination** panel. Copy it.

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


5. In Adapty, go to [App Settings → Paddle](https://app.adapty.io/settings/paddle) and paste the key into the **Notification secret key** field. This key is used to verify webhook data in Adapty.

   

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

### Configure profile creation behavior

The last step is to define which Paddle data should be used as `customer_user_id` in Adapty when creating a profile for a new transaction from Paddle. You can set this in the **Profile creation behavior** section. Possible options:

| Option                                    | Description |
| ----------------------------------------- | ----------- |
| Use `customer_user_id` from `custom data` |             |
| Use `email` from `customer` object        |             |
| Use Paddle customer ID                    |             |


That’s it! Your integration is now set up. The next step is to add your Paddle products to Adapty.

### 2. Add Paddle products to Adapty

:::warning

Products are required! Be sure to create your Stripe products in the Adapty Dashboard. Adapty only tracks events for transactions linked to these products, so don’t skip this step—otherwise, transaction events won’t be created.

:::

We treat Paddle the same way as App Store and Google Play: it is just another store where you sell your digital products. So it is configured similarly: simply add Paddle products (namely their `product_id` and `price_id`) to the [Products](https://app.adapty.io/products) section of Adapty:

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

Product IDs in Paddle look like `pro_...` and price IDs look like `pri_...`. They are pretty easy to find for each product in Stripe's [Product catalog](https://vendors.paddle.com/products-v2), once you open any Product:

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

After you've added all the necessary products, the next step is to let Paddle know about which user is making the purchase, so it could get picked up by Adapty!

### 4\. Enrich purchases made on the web with your user ID

Adapty relies on the webhooks from Stripe to provide and update access levels for users as the only source of information. But you have to provide additional info from your end when working with Stripe for this integration to work properly.

For access levels to be consistent across platforms (web or mobile), you have to make sure that there is a single user ID to rely on which Adapty can recognize from the webhooks as well. This could be user's email, phone number or any other ID from the authorization system you're utilizing.

Figure out which ID you would like to use to identify your users. Then, access the part of your code that's initiatilizing the payment through Stripe — and add this user ID to the `custom_data` object of either [Stripe Subscription](https://stripe.com/docs/api/subscriptions/object#subscription_object-metadata) (`sub_...`) or [Checkout Session](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-metadata) object (`ses_...`) as `customer_user_id` like so:

```json showLineNumbers title="Stripe Metadata contents"
{'customer_user_id': "YOUR_USER_ID"}
```

This one simple addition is the only thing that you have to do in your code. After that, Adapty will parse all the webhooks it receives from Stripe, extract this `metadata` and correctly associate subscriptions with your customers.

:::warning
User ID is required

Otherwise, we have no way to match this user and provide him the access level on the mobile.

If you don't supply `customer_user_id` to the `metadata`, you will have the option to make Adapty look for `customer_user_id` in other places: either `email` from Stripe's Customer object or `client_reference_id` from Stripe's Session.

Learn more about configuring profile creation behavior [below](stripe#profile-creation-behavior)
:::

:::note
Customer in Stripe is also required

If you are using Checkout Sessions, [make sure you're creating a Stripe Customer](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-customer_creation) by setting `customer_creation` to `always`.
:::

### 5\. Provide access to users on the mobile

To make sure your mobile users arriving from web can access the paid features, just call `Adapty.activate()` or `Adapty.identify()` with the same `customer_user_id` you've provided on the previous step (see [Identifying users](identifying-users) for more).

### 6\. Test your integration

Make sure you've completed the steps above for Sandbox as well as for Production. Transactions that you make from Stripe's Test mode will be considered Sandbox in Adapty.

:::info
That's it!

Your users can now complete purchases on the web and access paid features in your app. And you can also see all your subscription analytics in a single place.
:::

## Profile creation behavior

Adapty has to tie a purchase to a [customer profile](profiles-crm) for it to be available on the mobile — so by default it creates profiles upon receiving webhooks from Stripe. You can choose what to use as customer user ID in Adapty:

1. **Default and recommended: **`customer_user_id` you supplied in metadata in [step 4 above](stripe#4-enrich-purchases-made-on-the-web-with-your-user-id)
2. `email` in Stripe's Customer object (see [Stripe's docs](https://stripe.com/docs/api/customers/object#customer_object-email))
3. `client_reference_id` in Stripe's Session object (see [Stripe's docs](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-client_reference_id))

You can configure which ID you would like to use in [App Settings → Stripe](https://app.adapty.io/settings/stripe).

:::warning
**Note:** if a particular transaction from Stripe does not contain the specified ID, we will not create a profile at all. This transaction will remain anonymous until it gets picked up by some profile (for example, if you use [S2S validate](ss-purchase-in-stripe) afterwards and tell us about this transaction manually).

It will show up in Analytics but not in the sections that rely on counting profiles (LTV, Cohorts, Conversions, etc) and you won't be able to see it in Event feed.
:::

You also have a fourth option to not create profiles at all but this is not recommended due to the above limitations in Analytics.

## Current limitations

### Upgrading, downgrading and proration

Subscription changes such as upgrading or downgrading can result in prorated charges. Adapty will not account for these charges in revenue calculations. It would be best to disable these options manually via the Stripe dashboard. You can also disable them by setting the `proration_behaviour` attribute value to `none` via the Stripe API.

### Cancellations

Stripe has two subscription cancellation options:

1. Immediate cancellation: The subscription cancels immediately with or without any proration option
2. Cancellation at the end of the period: The subscription cancels at the end of the current billing period (similar to in-app subscriptions on the app stores).

Adapty supports both options, but the revenue calculation for immediate cancellation will disregard the proration option.

### Billing Issues and Grace Period

When a customer encounters an issue with their payment, Adapty will generate a billing issue event and access will be revoked. We do not support Stripe's Grace Period just yet — this will be a part of future releases.

### Refunds

Adapty tracks only full refunds. Proration or partial refunds are currently not supported.

### Transaction ID reusage

If you delete an invoice, Stripe might reuse that invoice ID later, even across different environments. So, if you delete an invoice in the Sandbox, the same ID could pop up in a new invoice in Production.

To prevent this issue, set the **Invoice numbering** in the [**Stripe settings** -> **Billing** -> **Invoices** tab](https://dashboard.stripe.com/settings/account/?support_details=true) to **Sequentially for each customer (customer-level)**. Keep in mind, though, that if you delete and then create a new invoice for the same customer, that ID could still be reused. So, it’s best to avoid deleting invoices whenever possible.