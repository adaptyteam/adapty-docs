---
title: "Singular"
description: "Learn how to set up integration with Singular"
metadataTitle: "Singular"
---

[Singular](https://www.singular.net/) is one of the leading Mobile Measurement Partner (MMP) platforms, that collects and presents data from marketing campaigns. This helps companies track their campaign performance. 

Adapty provides a complete set of data that lets you track [subscription events](https://docs.adapty.io/docs/events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. Therefore, this integration allows you to track subscription events in Singular and analyze precisely how much revenue your campaigns generate.

Adapty can send all subscription events which are configured in your integration to Singular. As a result, you'll be able to track these events within the Singular dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## How to set up Singular integration

To set up the integration with AppsFlyer, go to [Integrations > Singular](https://app.adapty.io/integrations/singular) in your Adapty Dashboard, turn on a toggle, and fill out the fields.

For this integration to work, the Singular SDK Key is required. It can be found in Singular dashboard: Developer tools -> SDK Keys -> SDK Key (**not** SDK Secret):


<img
  src={require('./img/4bc50d1-singular_sdk_key.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Below the credentials, there are three groups of events you can send to Singular from Adapty. Check the full list of the events offered by Adapty [here](https://docs.adapty.io/docs/events).


<img
  src={require('./img/e67de0c-singular_events.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs.

Adapty will send subscription events to Singular using a server-to-server integration, allowing you to view all subscription events in your Singular dashboard and link them to your acquisition campaigns.

:::warning
Profiles created prior to configuring the integrations will not be able to deliver their events to Singular. You will see "The user profile is missing the required integration data." error in such cases.
:::

## No need for SDK configuration

There is no need to configure the SDK from your side at the moment — as Adapty already collects the data required by Singular and this integration is server-to-server. In case it ever changes, we'll let you know.