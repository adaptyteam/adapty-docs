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

With Adapty, you can create and run paywalls and A/B tests at different points in your app user's journey, such as Onboarding, Settings, etc. These points are called [Placements](placements). A placement in your app can manage multiple paywalls or [A/B tests](ab-tests) at a time, each made for a certain group of users, which we call [Audiences](audience). Moreover, you can experiment with paywalls, replacing one with another over time without releasing a new app version. The only thing you hardcode in the mobile app is the placement ID.

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

The Adapty plugin keeps your paywall updated with the latest products from your Adapty Dashboard. It [fetches the product data](ff-action-flow) and [shows it on your paywall](ff-add-variables-to-paywalls), [handles purchases](ff-make-purchase), and [checks the user’s access level](ff-check-subscription-status) to see if they should get paid content.

To get started, just [add the Adapty Plugin](ff-getting-started#add-the-adapty-plugin-as-a-dependency) to your FlutterFlow project and [initiate it](ff-getting-started#initiate-adapty-plugin) as shown below.

## Add the Adapty plugin as a dependency

1. In the [FlutterFlow Dashboard](https://app.flutterflow.io/dashboard), open your project, and then click **Settings and Integrations** from the left menu.
   <Zoom>
     <img src={require('./FF_img/main_settings.webp').default}
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
     <img src={require('./FF_img/settings_dependencies.webp').default}
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
  <img src={require('./FF_img/add-dependency.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. In the **FlutterFlow Libraries** field, enter `adapty-xtuel0`.
   <Zoom>
     <img src={require('./FF_img/select_adapty_plugin.webp').default}
     style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

5. Click the **Add** button.

6. For  `YOUR_API_KEY` in the **Adapty** window, copy the **Public SDK key** from the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard.

   <Zoom>
     <img src={require('./FF_img/adaptyapikey.webp').default}
     style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

The Adapty FF Plugin will now be added as a dependency to your project. In the **Adapty FF Plugin** window, you’ll find all the Adapty resources that have been imported into your project.

## Call the new activation action at application launch

1. Navigate to `main.dart` in the **Custom Code** section.

   <Zoom>
     <img src={require('./FF_img/dartmain.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Click the plus (**+**) button and choose `activate`.

   <Zoom>
     <img src={require('./FF_img/activate.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. Click **Save**.

## Initiate Adapty plugin

For the Adapty Dashboard to recognize your app, you’ll need to provide a special key in FlutterFlow.

1. In your FlutterFlow project, open **Settings and Integrations** -> **Permissions** from the left menu.

<Zoom>
  <img src={require('./FF_img/initiate.webp').default}
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
     <img src={require('./FF_img/AdaptyPublicSdkKey.webp').default}
     style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>
4. For the **Permission Message**, copy the **Public SDK key** from the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard. Each app has its own SDK key, so if you have multiple apps, make sure you grab the right one. 

After completing these steps, you'll be able to call your paywall in your FlutterFlow app and enable purchases through it.

## What's next? 

1. [Create an action flow](ff-action-flow) for handling Adapty paywall products and their data in FlutterFlow.
2. [Map the received data to the paywall](ff-add-variables-to-paywalls) you designed in FlutterFlow.
3. [Set up the purchase button](ff-make-purchase) on your paywall to process transactions through Adapty when clicked.
4. Finally, [add subscription status checks](ff-check-subscription-status) to determine whether to display paid content to the user.