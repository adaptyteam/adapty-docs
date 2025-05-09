---
title: "Web paywall configuration"
metadataTitle: "Configure the web paywall design and payment method"
---
import Zoom from 'react-medium-image-zoom';

Once you click **Create web paywall** on the **Web paywall** page, you'll be redirected to a separate page to set up the web paywall design and payment method.

## Set up a payment method

First, you need to connect a payment provider that will handle purchases. The available options are:

- Braintree
- Paddle
- Paypal
- Solidgate
- Stripe

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

:::important
To be able to use Apple Pay with Stripe, you need to verify the paywall domains in the Stripe settings:
1. Go to [Payment method domain settings](https://dashboard.stripe.com/settings/payment_method_domains) and click **Add a new domain**.
2. Add `app.funnelfox.com`.
3. On the web paywall creation page, go to **Settings > Domains** and copy the **Hosted subdomain** value. Add this value as a new payment method in the Stripe settings as well.
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
3. You will be redirected to a basic template with two subscription options and the Apple Pay purchase button. All the prices and plans you see on the screen are not added dynamically, so you need to configure them manually.
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
4. Add or configure a checkout screen for each plan you have. We recommend adding a total amount to each checkout screen so users know how much they need to pay before they click the purchase button.
5. On checkout screens, you already have the Apple Pay button. For it to work, on each screen, configure:
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
6. Now, you need to associate plans with checkout screens. On the plan selection screen, click the **Continue** button and select a destination screen for each plan.
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

When you are ready with the paywall, there are two steps left before you can activate this paywall in Adapty:

1. Click **Publish** on the top right. If the paywall has been published successfully, it will open in the web view. 
2. Copy the link from there.

That's it! Use this link to [proceed with the setup](web-paywall.md#step-2-activate-the-paywall).
