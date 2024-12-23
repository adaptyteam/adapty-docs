---
title: "Adjust integration"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

[Adjust](https://www.adjust.com/) is one of the leading Mobile Measurement Partner (MMP) platforms, that collects and presents data from marketing campaigns. This helps companies track their campaign performance. 

Integrating Adapty with Adjust allows app developers and marketers to close the gap between user acquisition data and revenue analytics. This integration is essential for accurately attributing app installs and user actions to various marketing campaigns and channels.

By forwarding [subscription events](events) to Adjust, you can see exactly where conversions come from and which campaigns bring in the most value across all channels, platforms, and devices. Essentially, Adjust dashboards offer advanced analytics for marketing campaigns.

By forwarding Adjust attribution to Adapty, you enrich the Adapty analytics with additional filtration criteria you can use in cohort and conversion analysis.

The integration between Adapty and Adjust operates in two main ways.

The integration between Adapty and Adjust works in two main ways.

1. **Receiving attribution data from Adjust**  
   Once you've set up the Adjust integration, Adapty will start receiving attribution data from Adjust. You can easily access and view this data on the user's profile page.

<Zoom>
<img
  src={require('./img/adjust_adapty_attributionsection.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. **Sending subscription events to Adjust**  
   Adapty can send all subscription events which are configured in your integration to Adjust. As a result, you'll be able to track these events within the Adjust dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.
