---
title: "Web paywall configuration"
metadataTitle: "Configure the web paywall design and payment method"
---
import Zoom from 'react-medium-image-zoom';

Once you click **Create web paywall** on the **Web paywall** page, you'll be redirected to a separate page to set up the web paywall design and payment method.

## Set up a payment method

First, you need to connect a payment provider that will handle purchases. The available options are:

- Stripe
- Paddle
- Braintree
- Paypal
- Solidgate

:::important
To ensure accurate web paywall analytics tracking in Adapty, you need to [add your products](product.md) along with their corresponding Stripe/Paddle/other payment provider product IDs in Adapty.
:::

To set up a payment provider:
1. On the web paywall list page, click **Settings** and switch to the **Integrations** tab.
2. Select a payment provider and follow the integration instructions on the screen.

   <Zoom>
   <img src={require('./img/web-paywall-configuration-1.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

3. ⚠️ If you choose Stripe, make sure you're using keys from the **Test Mode** environment despite the interface saying **Sandbox**. Otherwise your web paywall will not work. **Sandboxes** in Stripe are not yet supported.

   <Zoom>
   <img src={require('./img/web-paywall-configuration-stripe.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

:::important
To be able to use Apple Pay with Stripe, you need to verify the paywall domains in the Stripe settings:
1. Go to [Payment method domain settings](https://dashboard.stripe.com/settings/payment_method_domains) and click **Add a new domain**.
2. Add `app.funnelfox.com` and your personal paywall subdomain (it will look like `paywalls-....fnlfx.com`). To find your subdomain, on the web paywall creation page, go to **Settings > Domains** and copy the **Hosted subdomain** value. 

To use Apple Pay with Paddle, verify the paywall domains in the Paddle settings:
1. In the Paddle console, go to **Checkout > Website approval** and click **Add a new domain**.
2. Add `app.funnelfox.com` and your personal paywall subdomain (it will look like `paywalls-....fnlfx.com`). To find your subdomain, on the web paywall creation page, go to **Settings > Domains** and copy the **Hosted subdomain** value.

The approval process in Paddle is manual, so you will need to wait until the domains move from `Pending` to `Approved`.
:::

## Create and configure a web paywall
1. On the web paywall list page, click **Create a paywall**. 
2. Enter a paywall name and click **Create**.

   <Zoom>
   <img src={require('./img/web-paywall-configuration-2.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
3. You will be redirected to a basic template with two subscription options and the Apple Pay purchase button. 

   The first screen lists the subscription plans. The second and third screens are checkout screens. Each screen corresponds to one plan you offer. If you have only one plan, delete the extra screen. If you have more, you need to duplicate the checkout screens. 

   The last screen users see after a successful purchase is where you need to clearly indicate that they can return to your app.

   <Zoom>
   <img src={require('./img/web-paywall-configuration-10.gif').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
4. Set up the plan list: add or remove plans and prices. All the prices and plans you see on the screen are not added dynamically, so you need to configure them manually.
   <Zoom>
   <img src={require('./img/web-paywall-configuration-8.gif').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
5. Add or configure a checkout screen for each plan you have. We recommend adding a total amount to each checkout screen so users know how much they need to pay before they click the purchase button.
6. On checkout screens, you already have the Apple Pay button. For it to work, on each screen, configure:
   1. **Product type**: Select whether you want to add a trial period or a discount.
   2. **Trial period**: Enter the trial period duration.
   3. **Product**: Select your product from your payment provider.
      :::important
      Ensure that the product is added to Adapty. Otherwise, the purchase result will be set to default.
      :::
   4. **Subscription discount**: Optionally, select a coupon from your payment provider.
   <Zoom>
   <img src={require('./img/web-paywall-configuration-6.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
7. Now, you need to associate plans with checkout screens. On the plan selection screen, click the **Continue** button and select a destination screen for each plan.
   <Zoom>
   <img src={require('./img/web-paywall-configuration-9.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

When you are ready with the paywall, you need to get its link to activate this paywall in Adapty. The way you get it depends on whether you are testing it or launching it in the production environment:

1. **For sandbox testing**: Click **Preview** on the top right and copy the link.
2. **For production**: Click **Publish** on the top right. Click **Home** and copy the link from the **URL** column.

   <Zoom>
   <img src={require('./img/web-paywall-configuration-11.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>


That's it! Use this link to [proceed with the setup](https://docs.adapty.io/docs/web-paywall#step-2-activate-the-paywall).
