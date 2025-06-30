---
title: "Getting started"
description: "Get started with Adapty Feature Flags to personalize subscription flows."
metadataTitle: "Getting Started with Feature Flags | Adapty Docs"

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';

With Adapty, you can create and run paywalls and A/B tests at different points in your mobile app user's journey, such as Onboarding, Settings, etc. These points are called [Placements](placements). A placement in your app can manage multiple paywalls or [A/B tests](ab-tests) at a time, each made for a certain group of users, which we call [Audiences](audience). Moreover, you can experiment with paywalls, replacing one with another over time without releasing a new app version. The only thing you hardcode in the mobile app is the placement ID.

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

The Adapty library keeps your paywall updated with the latest products from your Adapty Dashboard. It [fetches the product data](ff-action-flow) and [shows it on your paywall](ff-add-variables-to-paywalls), [handles purchases](ff-make-purchase), and [checks the user’s access level](ff-check-subscription-status) to see if they should get paid content.

To get started, just [add the Adapty library](ff-getting-started#add-the-adapty-plugin-as-a-dependency) to your FlutterFlow project and [initiate it](ff-getting-started#initiate-adapty-plugin) as shown below.

:::warning

Before you start, note the following limitations:

- The Adapty library for FlutterFlow doesn’t support web apps. Avoid compiling web apps with it.
- The Adapty library for FlutterFlow doesn't support paywalls creating using the Adapty paywall builder. You need to design your own paywall in FlutterFlow before enabling purchases with Adapty.

:::

## Add the Adapty library as a dependency

1. In the [FlutterFlow Dashboard](https://app.flutterflow.io/dashboard), open your project, and then click **Settings and Integrations** from the left menu. In the **Project setup** section on the left, select **Project dependencies**.
   
<Zoom>
     <img src={require('./img/main_settings.webp').default}
     style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
     }}
   />
</Zoom>

2. In the **FlutterFlow Libraries** section, click **Add Library** and enter `adapty-xtuel0`. Click **Add**.

3. Now, you need to associate your SDK key with the library. Click **View details** next to the library.
<Zoom>
     <img src={require('./img/ff_view_details.webp').default}
     style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
     }}
   />
</Zoom>

4. Copy the **Public SDK key** from the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard.

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

5. Paste the key to **AdaptyApiKey** in FlutterFlow.

   <Zoom>
     <img src={require('./img/ff_apikey.webp').default}
     style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

The Adapty FF library will now be added as a dependency to your project. In the **Adapty** FF library window, you’ll find all the Adapty resources that have been imported into your project.

## Call the new activation action at application launch

1. Go to **Custom Code** section from the left menu and open `main.dart`.

   <Zoom>
     <img src={require('./img/ff_dartmain.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Click **+** and select `activate (Adapty)`.

   <Zoom>
     <img src={require('./img/ff_activate.webp').default}
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

1. In your FlutterFlow project, go to **Settings and Integrations > Permissions** from the left menu.
2. In the opened **Permissions** window, click the **Add Permission** button.
3. In both the **iOS Permission Key** and **Android Permission Key** field, paste `AdaptyPublicSdkKey`.
4. For the **Permission Message**, copy the **Public SDK key** from the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard. Each app has its own SDK key, so if you have multiple apps, make sure you grab the right one. 

   <Zoom>
     <img src={require('./img/ff_permissions.webp').default}
     style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

After completing these steps, you'll be able to call your paywall in your FlutterFlow app and enable purchases through it.

## What's next? 

1. [Create an action flow](ff-action-flow) for handling Adapty paywall products and their data in FlutterFlow.
2. [Map the received data to the paywall](ff-add-variables-to-paywalls) you designed in FlutterFlow.
3. [Set up the purchase button](ff-make-purchase) on your paywall to process transactions through Adapty when clicked.
4. Finally, [add subscription status checks](ff-check-subscription-status) to determine whether to display paid content to the user.