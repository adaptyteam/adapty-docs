---
title: "Configure 3d-party integration"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

With Adapty integrations, you can seamlessly transmit subscription events and purchase data to your preferred platform or workflow. Whether you're seeking user behavior insights, customer engagement strategies, or enhanced product analytics for your marketing team, Adapty can effortlessly forward in-app purchase events to your chosen integration.

Adapty effortlessly tracks in-app purchases and subscription events such as trials, conversions, renewals, and cancellations. These [events](events) are automatically communicated to your chosen integrations. This allows you to engage with customers based on their current stage and analyze revenue-related activities within your app. 

## Integration settings


<Zoom>
  <img src={require('./img/20bf659-CleanShot_2023-08-22_at_13.26.562x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Integrations offer the following configuration options that impact all events sent through this integration:

| Setting                            | Description                                                  |
| :--------------------------------- | :----------------------------------------------------------- |
| **Reporting Proceeds**             | Select how revenue values are presented: either net of App Store and Play Store commissions or gross (before deductions). Toggle the "Send sales as proceeds" checkbox to display sales as proceeds after App Store / Play Store commissions have been subtracted. |
| **Send Trial Price**               | If checked, Adapty will transmit the subscription price for the Trial Started event. |
| **Exclude Historical Events**      | Opt to exclude events that occurred before the user installed the app with Adapty SDK. This prevents duplication of events and ensures accurate reporting. For instance, if a user activated a monthly subscription on January 10th and updated the app with Adapty SDK on March 6th, Adapty will omit events before March 6th and retain subsequent events. |
| **Report User's Currency**         | Choose whether sales are reported in the user's currency or in USD. |
| **Send User Attributes**           | If you wish to send user-specific attributes, like language preferences, and your OneSignal plan supports more than 10 tags, select this option. Enabling this allows the inclusion of additional information beyond the default 10 tags. Note that exceeding tag limits may result in errors. |
| **Send Attributions**              | Enable this option to transmit attribution information (e.g. AppsFlyer attribution) and receive relevant details. |
| **Send Play Store purchase token** | Enable this option to receive the Play Store token needed to revalidate the purchase if required. It will add the `play_store_purchase_token` parameter to the event. |

## Configure the events

Below the credentials, there are three groups of events you can send to the selected integration platform from Adapty. You should turn on the ones you need. 

It's important to note that event name customization is available for certain integrations, while for others, the event names are set and cannot be modified. Additionally, with certain integrations such as [Airbridge](airbridge#events-and-tags) for example, you have the flexibility to associate multiple event names with a single Adapty event. Check the full list of the Events offered by Adapty [here](events).


<Zoom>
  <img src={require('./img/c79f5cd-screencapture-app-adapty-io-integrations-pushwoosh-2023-08-22-13_31_07.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





While we recommend utilizing Adapty's default event names, you have the freedom to adapt event names as per your specific requirements.