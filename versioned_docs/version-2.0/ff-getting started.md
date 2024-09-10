---
title: "Custom tags in paywall builder"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 


## What is Adapty Plugin

Adapty is a powerful and adaptable in-app purchase platform that helps you grow your subscriber base. Whether you're just starting or already have millions of users, Adapty makes it easy to set up the best subscription prices, test different approaches, and see what works best for your app's success.

- **Subscriptions/in-app purchases**: Adapty performs server-side receipt validation for you and syncs your customers across all platforms, including web. 
- **A/B testing for subscription plans**: Test different prices, durations, trial periods for your subscriptions as well as different visual elements.
- **Analytics for the app economy**: Detailed metrics related to your app monetization.
- **Integrations**: Adapty can send subscription events to 3rd party analytics: Amplitude, AppsFlyer, Adjust, Branch, Mixpanel, Facebook Ads, AppMetrica, and custom Webhook.

## Getting started


In order to start using all Adapty features in FlutterFlow, import the Adapty Plugin as a dependancy to your FlutterFlow project:

1. When being in your project, click **Settings and Integrations** in the left menu.
<Zoom>
  <img src={require('./FF_img/main_settings.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
2. In the **App Settings** left pane, click **Project dependencies**.
<Zoom>
  <img src={require('./FF_img/settings_dependencies.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
3. In the **Project Dependencies** window, click the **Add Dependency** button.

<Zoom>
  <img src={require('./FF_img/add-dependency.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
4. Select **Adapty FF Plugun** from the list.
<Zoom>
  <img src={require('./FF_img/select_adapty_plugin.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Click the **Add** button.

Adapty FF Plugun is added to your project as a dependency. In the **Adapty FF Plugin** window, you can see all Adapty resources imported into your project.

## Set up a paywall and its behaviour

We assume that you will create the UI design on the paywall yourself by using the FlutterFlow rich functionality. In parallel, you will need to [create the same paywall](create-paywall) in the Adapty Dashboard. No need to create UI design there, but please add products that should be sold in the paywall - subscriptions or or non-subscription - whatever you need to the paywall. Make sure that the paywall you designed fits the number of products in Adapty paywall.

After you have created a paywall in the Adapty Dashboard, please [create a placement](create-placement) and [add your paywall](add-audience-paywall-ab-test) to this placement. With Adapty's placement system, you can experiment with paywalls, replacing one with another over time without releasing a new app version.

The only thing you hardcode in the mobile app is the placement ID. This means that you hardcode the placement ID, and through it you get the set of products set up for specific paywall added to this placement.

Therefore, before moving forward, make sure that you have do the following in the Adapty Dashboard:

1. [Created at least one paywall and added at least one product to it](create-paywall).
2. [Created at last one placement](create-placement) and [added your paywall to it](add-audience-paywall-ab-test).

After you've done it, you can call your paywall in you mobile app created with FlutterFlow.

## Create page state variable

When you're setting up a paywall in your mobile app, you need a place to keep track of the paywall data while the user is on that page. That’s where a page state variable comes in. Think of a page state variable as a temporary box that stores paywall data specific to a single screen in your app.

You can have many variables per page added for different purposes, but right now we will create one for your paywall.

### Why Do You Need One?
In this setup, the page state variable does a few important things:

- **Holds Your Paywall**: It stores the paywall element when it’s received.
- **Handles Errors**: If something goes wrong while fetching the paywall, this variable helps you catch and handle the error.
- **Updates the Screen**: When the paywall data is in, the screen can update with the list of products.

### How to create a page state variable

1. When being in the page with with the paywall, click the **State Manageemnt** button in the right pane.

<Zoom>
  <img src={require('./FF_img/create_page_state_variable.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the opened **Local Page State Variables** pane, click the **Add field** button.

<Zoom>
  <img src={require('./FF_img/add_field.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the **Field name** field, enter the name of your variable. We recommend to call it obvious, for example, "paywall".

<Zoom>
  <img src={require('./FF_img/field_name.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
4. In the **Type** list, choose the type of the variable, in our case it will be **Data Type**.

<Zoom>
  <img src={require('./FF_img/variable_type.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. In the second **Type** field, choose what type of data will be in this variable, in our case it will be **AdaptyPaywall**. 

<Zoom>
  <img src={require('./FF_img/adapty_paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. Click the **Confirm** button.

here we are, we've create a page state variable for a paywall. Now we need to define what can be done with this paywall and how it can behave. 

## Create Action Block

Action Block is an action flow for the paywall that will define how to get it, process, and what to do in case when something goes wrong. Let's start with the Action Block creating. We will do it with FlutterFlow Action Flow Editor:

1. In the right pane, click the **Actions** button.

<Zoom>
  <img src={require('./FF_img/actions.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. We are going to create a full flow, so in the opened pane, click the **Open** button next to the **Action Flow Editor**, a tool aimed for creating flows rather than separate actions.

<Zoom>
  <img src={require('./FF_img/action_flow_editor.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the opened **Select Action Trigger** window, choose **On Page Load**. This means that our paywall will start being processed once the user opens the page with the paywall. You can definately choose other options, but let's start with this most popular option for the first time.

<Zoom>
  <img src={require('./FF_img/action_trigger.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. After that the **Action Flow Editor** opens and ready for work. Let's first get the paywall added to the placement in Adapty. For this, we need to create it as an action: click the **Add Action** button.


<Zoom>
  <img src={require('./FF_img/add_action.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. In the new window, expand **Custom Actions** section in the right pane.

<Zoom>
  <img src={require('./FF_img/custom_actions.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. In it, expand **Adapty FF Plugin** section.

<Zoom>
  <img src={require('./FF_img/expand_adapty_ff_plugin.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. In the expanded **Adapty FF Plugin** section, choose **getPaywall**. Yes, we know, you would like to get products at once, but we have to do it step by step: first get the paywall through placement ID, and only after that get the products from the paywall. So choose **getPaywall**.

<Zoom>
  <img src={require('./FF_img/get-paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

8. In the **Value** field in the **Set Actions Arguments** section, enter the ID of the placement to which you have added the paywal you want to show. In our example below, the placement ID is `onboarding_placement`.

<Zoom>
  <img src={require('./FF_img/placement_id.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

9. After we have requested the paywall, we need to get its ID as a result. Let's set it up: type `paywallResult` (or any other name that is clear to you) to the **Action Output Variable Name** field.

<Zoom>
  <img src={require('./FF_img/paywallResult.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

10. Now we have finished with all the formalities and can draw our action flow. For this, click the **plus (+)** button below the **Custom Action** block.


<Zoom>
  <img src={require('./FF_img/custom_actions.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




<Zoom>
  <img src={require('./FF_img/custom_actions.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
