---
title: "Initial integration with Stripe"
description: "Integrate Stripe with Adapty for seamless subscription payment processing."
metadataTitle: "Stripe Integration Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import Details from '@site/src/components/Details';
import 'react-medium-image-zoom/dist/styles.css';
import InlineTooltip from '@site/src/components/InlineTooltip';

Adapty supports tracking web payments and subscriptions made through [Stripe](https://stripe.com/). If you're already offering your product on the web or thinking about doing it, there are two scenarios where it can be helpful:

- Automatically providing access to paid features for users who purchased on the web but later installed the app and logged in to their account
- Having all the subscription analytics in a single Adapty Dashboard (including cohorts, predictions, and the rest of our analytics toolbox)

Even though web purchases are becoming increasingly popular for apps, the Apple App Store allows a different system than in-app purchases for digital goods only in the USA. Ensure you don't promote your web subscriptions inside your app for other countries. Otherwise, your app may get rejected or banned.

The steps below outline how to configure the Stripe integration.

### 1\. Connect Stripe to Adapty

This integration mainly relies on Adapty pulling subscription data from Stripe via the webhook. Therefore, you need to connect your Adapty account to your Stripe account by providing API Keys and using Adapty's webhook URL in Stripe. To automate configuring your webhook, install the Adapty app in Stripe:


:::note
The steps below are the same for Stripe's Production and Test modes, but you will need to use different API keys for each.
:::

0. Determine if you are connecting Stripe in test mode or live mode. If you are initially doing this in test mode, you will need to repeat the steps below for live mode again.

1. Go to the [Stripe App Marketplace](https://marketplace.stripe.com/apps/adapty) and install the Adapty app. Note that the sandbox mode doesn't support installing apps. You can only do it in the production or test mode.

<Zoom>
      <img src={require('./img/stripe1.png').default}/>
</Zoom>

2. Give the app the required permissions. This will allow Adapty to access the subscription data and history. Then, click **Continue to app settings** to proceed.

At the bottom of the permission pop-up, you can select whether to install the app in live or test mode.

<Zoom>
      <img src={require('./img/stripe2.png').default}/>
</Zoom>

3. In the pop-up, generate a new restricted key. You will need to verify your identity using your email, Touch ID, or security key. Once you generate a key, you won't be able to see it again, so store it securely in a password manager or a secret store.

<Zoom>
      <img src={require('./img/stripe4.png').default}/>
</Zoom>

4. Copy the generated key from the pop-up and go to Adapty's [App Settings → Stripe](https://app.adapty.io/settings/stripe). Paste the key in the **Stripe App Restricted API Key** section depending on your mode. Note that you must generate different keys for test and live modes.

<Zoom>
      <img src={require('./img/Stripe3.png').default}/>
</Zoom>

You're all set! Next, create your products on Stripe and add them to Adapty.

<Details>

<summary>Deprecated installation flow</summary>

1. Go to [Developers → API Keys](https://dashboard.stripe.com/apikeys) in Stripe:



<Zoom>
  <img src={require('./img/6549602-CleanShot_2023-12-06_at_17.29.122x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Click the **Reveal live (test) key button** next to the **Secret key** title, then copy it and go to Adapty's [App Settings → Stripe](https://app.adapty.io/settings/stripe). Paste the key here:



<Zoom>
  <img src={require('./img/2989508-CleanShot_2023-12-07_at_14.59.122x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Next, copy the Webhook URL from the bottom of the same page in Adapty. Go to [**Developers** → **Webhooks**](https://dashboard.stripe.com/webhooks) in Stripe and click the **Add endpoint** button:



<Zoom>
  <img src={require('./img/e7149f5-CleanShot_2023-12-07_at_17.31.392x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. Paste the webhook URL from Adapty into the **Endpoint URL** field. Then choose the **Latest API version** in the webhook **Version** field. Then select the following events:

   - charge.refunded
   - customer.subscription.created
   - customer.subscription.deleted
   - customer.subscription.paused
   - customer.subscription.resumed
   - customer.subscription.updated
   - invoice.created
   - invoice.updated
   - payment_intent.succeeded



<Zoom>
  <img src={require('./img/cbc5404-CleanShot_2023-12-07_at_17.36.232x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




5. Press "Add endpoint" and then press "Reveal" under the "Signing secret". This is the key that is used to decode the webhook data on the Adapty's side, copy it after revealing:



<Zoom>
  <img src={require('./img/0460cbb-CleanShot_2023-12-07_at_17.52.582x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




6. Finally, paste this key into Adapty's App Settings → Stripe under "Stripe Webhook Secret":



<Zoom>
  <img src={require('./img/055db20-CleanShot_2023-12-07_at_14.56.212x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
</Details>

### 2\. Create products on Stripe

:::note
If you're setting this up in test mode, make sure Stripe is also switched to Test mode before continuing with this step.
:::

Go to Stripe's [Product catalog](https://dashboard.stripe.com/products?active=true) and create the products you would like to sell as well as their pricing plans. Note that Stripe allows you to have multiple pricing plans per product, which is useful for tailoring your offering without the need to create additional products.


<Zoom>
  <img src={require('./img/b202e2e-CleanShot_2023-12-06_at_15.06.262x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::warning
At the moment Adapty only supports **Flat rate** ($9.99/month) or **Package pricing** ($9.99/10 units), as those behave similar to app stores. **Tiered pricing**, **Usage-based fee** and **Customer chooses price** options are not supported
:::

### 3\. Add Stripe products to Adapty

:::warning

Products are required! Be sure to create your Stripe products in the Adapty Dashboard. Adapty only tracks events for transactions linked to these products, so don’t skip this step—otherwise, transaction events won’t be created.

:::

We treat Stripe the same way as App Store and Google Play: it is just another store where you sell your digital products. So it is configured similarly: simply add Stripe products (namely their `product_id` and `price_id`) to the Products section of Adapty:

<Zoom>
  <img src={require('./img/457d1a0-CleanShot_2023-12-08_at_17.52.292x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Product IDs in Stripe look like `prod_...` and price IDs look like `price_...`. They are pretty easy to find for each product in Stripe's [Product Catalog](https://dashboard.stripe.com/products?active=true), once you open any Product:

<Zoom>
  <img src={require('./img/14a72d7-CleanShot_2023-12-06_at_17.32.512x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

After you've added all the necessary products, the next step is to let Stripe know about which user is making the purchase, so it could get picked up by Adapty!

### 4\. Enrich purchases made on the web with your user ID

Adapty relies on the webhooks from Stripe to provide and update access levels for users as the only source of information. But you have to provide additional info from your end when working with Stripe for this integration to work properly.

For access levels to be consistent across platforms (web or mobile), you have to make sure that there is a single user ID to rely on which Adapty can recognize from the webhooks as well. This could be user's email, phone number or any other ID from the authorization system you're utilizing.

Figure out which ID you would like to use to identify your users. Then, access the part of your code that's initiatilizing the payment through Stripe — and add this user ID to the `metadata` object of either [Stripe Subscription](https://stripe.com/docs/api/subscriptions/object#subscription_object-metadata) (`sub_...`) or [Checkout Session](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-metadata) object (`ses_...`) as `customer_user_id` like so:

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

To make sure your mobile users arriving from web can access the paid features, just call `Adapty.activate()` or `Adapty.identify()` with the same `customer_user_id` you've provided on the previous step (see <InlineTooltip tooltip="Identifying users">[iOS](identifying-users), [Android](android-identifying-users), [Flutter](flutter-identifying-users), [React Native](react-native-identifying-users), and [Unity](unity-identifying-users)</InlineTooltip> for more).

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
