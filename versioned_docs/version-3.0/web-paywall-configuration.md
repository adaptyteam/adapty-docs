---
title: "Web paywall configuration"
metadataTitle: "Configure the web paywall design and payment method"
---
import Zoom from 'react-medium-image-zoom';

Once you click **Create web paywall** on the **Web paywall** page, you'll be redirected to a separate page to set up the web paywall design and payment method.

## Set up a payment method

### Stripe

- **If you already use the Stripe integration** in Adapty, there is nothing else you need to do. Your products from Stripe will be pulled automatically so you can use them on the web paywall.

- **If you don't use the Stripe integration** in Adapty, the easiest way to implement a payment method for the web paywall would be to connect Adapty to Stripe following the [instructions](stripe.md).

### Other payment providers

If you want to use a different payment provider for the web paywall, the available options are:

- Braintree
- Paddle
- Paypal
- Solidgate

To set up a different payment provider:
1. On the web paywall list page, click **Settings** and switch to the **Integrations** tab.
2. From the **Payment providers** list, select a payment provider and follow the integration instructions on the screen.

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

## Create and configure a web paywall
1. On the web paywall list page, click **Create paywall**. 
2. Select whether you want to create a blank paywall or use a template.

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

### Modify the design

1. Click **Add** on the top left to add text, media, loaders and checkout buttons.
   <Zoom>
   <img src={require('./img/web-paywall-configuration-3.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
2. Add a **subscription plan picker** or add or remove plans if it's already there.
   <Zoom>
   <img src={require('./img/web-paywall-configuration-7.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
3. Modify the element design on the right.
   <Zoom>
   <img src={require('./img/web-paywall-configuration-4.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
4. Reorder elements on the page by dragging and dropping them in the **Elements** section on the left.

### Get paid

To make the paywall effective, you need to create a payment method selection area linked to each subscription option. 

For example, if you have two subscription options, you will need to add two payment method selection areas. The areas will only appear when an associated option is selected.

To set up payments in the web paywall:
1. Click **Add** and select **Checkout**.
2. In the **Visible** field, select **Conditional** and select a plan you have on the screen.
3. In the **Product type**, select **Subscription**. 
4. In **Upgrade subscription**, select **Yes**. It is important to update the user profile automatically.
5. In **New subscription**, select a Stripe product to associate with this plan.
6. Repeat for all the plans.

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


### Go live
When you are ready with the paywall, there are two steps left before you can activate this paywall in Adapty:
1. Click **Publish** on the top right. This will make the paywall accessible via a link.
2. Go back to the web paywall list page. Right-click the URL slug in the **URL** column and copy the link.

That's it! Use this link to [proceed with the setup](web-paywall.md#step-2-activate-the-paywall).
