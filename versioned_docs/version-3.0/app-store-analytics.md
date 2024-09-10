---
title: "App Store Analytics"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

App Store analytics allows you to filter metrics by dates, products, and countries. As of now, it only works for iOS after uploading [App Store Connect credentials](app-store-connection-configuration). To get more insights for both iOS and Android, install SDK, and use [Charts](analytics-charts).


<Zoom>
  <img src={require('./img/cleanshot-2020-09-16-at-01.20.21-2x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::note
Since App Store analytics is calculated based on App Store Connect Sales reports which do not provide reliable user-purchase relation data, Subscription conversion rate metric can show inaccurate results if a short period of time is chosen as a date filter; please consider choosing a longer period (like a year), which results in more reliable estimation.
:::

App Store analytics data refreshed daily after 4 pm UTC and shows the data for the previous day. These are restrictions of App Store Connect.