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
