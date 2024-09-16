---
title: "Getting started"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';

With Adapty, you can create and run paywalls and A/B tests at different points in your app user's journey, such as Onboarding, Settings, etc. These points are called Placements. A placement in your app can manage multiple paywalls or A/B tests at a time, each made for a certain group of users, which we call Audiences. Moreover, you can experiment with paywalls, replacing one with another over time without releasing a new app version.

The only thing you hardcode in the mobile app is the placement ID.

<Zoom>
  <img src={require('./img/audience.jpg').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Combining the power of Adapty and FlutterFlow lets you make the most of both platforms. Design your paywall UI with FlutterFlow’s robust features, while simultaneously [setting up the same paywall](create-paywall) in the Adapty Dashboard. There's no need to design the UI in Adapty; just make sure to add the products you want to sell. Ensure that the paywall you create in FlutterFlow matches the number of products listed in Adapty.

After creating a paywall in the Adapty Dashboard, [create a placement](create-placement) and [add your paywall](add-audience-paywall-ab-test) to it. Adapty’s placement system lets you experiment with different paywalls and A/B tests, allowing you to swap them out over time without needing to release a new app version.

Before proceeding, make sure you've done the following:

1. [Created at least one paywall and added at least one product to it](create-paywall) in the Adapty Dashboard.
2. [Created at last one placement](create-placement) and [added your paywall to it](add-audience-paywall-ab-test) in the Adapty Dashboard.
3. And finally added the Adapty Plugin as a dependency in your FlutterFlow project as described below.


## Add the Adapty plugin as a dependency

1. In your project, click **Settings and Integrations** from the left menu.
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
2. In the **App Settings** section on the left, select **Project dependencies**.
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
4. From the list, choose **Adapty FF Plugun**.
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

The Adapty FF Plugin will now be added as a dependency to your project. In the **Adapty FF Plugin** window, you’ll find all the Adapty resources that have been imported into your project.


## Initiate Adapty plugin

For the Adapty Dashboard to recognize your app, you need to provide a special key in FlutterFlow.

1. When being in your project in FlutterFlow, open **Settings and Integrations** -> **Permissions** in the left menu.

<Zoom>
  <img src={require('./FF_img/initiate.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the opened **Permissions** window, click the **Add Permission** button.
3. In both the **iOS Permission Key** and **Android Permission Key** field, paste `AdaptyPublicSdkKey`.
<Zoom>
  <img src={require('./FF_img/AdaptyPublicSdkKey.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. In the **Permission Message** field, enter the contents of the **Public SDK key** field in the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard. **SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one. 

After completing these steps, you'll be able to call your paywall in your FlutterFlow app and enable purchases through it.

## What's next? 


1. [Create an action flow for handling Adapty paywall products and their data in FlutterFlow](ff-action-flow).
2. [Map the received data to the paywall you designed in FlutterFlow](ff-add-variables-to-paywalls).
3. [Set up the purchase button on your paywall to process transactions through Adapty when clicked](ff-make-purchase).
4. [Finally, add subscription status checks to determine whether to display paid content to the user](ff-check-subscription-status).