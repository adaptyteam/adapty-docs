---
title: "Paywall metrics"
description: "Track and analyze paywall performance metrics to improve subscription revenue."
metadataTitle: "Analyzing Paywall Metrics | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty collects a series of metrics to help you better measure the performance of the paywalls. All metrics are updated in real-time, except for the views, which are updated once every several minutes. All metrics, except for the views, are attributed to the product within the paywall. This document outlines the metrics available, their definitions, and how they are calculated.

Paywall metrics are available on the paywall list, providing you with an overview of the performance of all your paywalls. This consolidated view presents aggregated metrics for each paywall, allowing you to assess their effectiveness and identify areas for improvement.

For a more granular analysis of each paywall, you can navigate to the paywall detail metrics. In this section, you will find comprehensive metrics specific to the selected paywall, offering deeper insights into its performance.


<Zoom>
  <img src={require('./img/d73bd6c-CleanShot_2023-07-19_at_16.05.412x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Metrics controls

The system displays the metrics based on the selected time period and organizes them according to the left-side column parameter with three levels of indentation. 

For Live paywall, the metrics cover the period from the paywall's start date until the current date. For inactive paywalls, the metrics encompass the entire period from the start date to the end of the selected time period. Draft and archived paywalls are included in the metrics table, but if there is no data available for those paywalls, they will be listed without any displayed metrics.

#### View options for metrics data


<Zoom>
  <img src={require('./img/15df73d-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The paywall page offers two view options for metrics data: placement-based and audience-based.

 In the placement-based view, metrics are grouped by placements associated with the paywall. This allows users to analyze metrics by different placements. 

In the audience-based view, metrics are grouped by the target audience of the paywall. Users can assess metrics specific to different audience segments. You can select the preferred view using the dropdown option at the top of the paywall detail page.

#### Profile install date filtration


<Zoom>
  <img src={require('./img/6c9639d-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





 The Filter metrics by install date checkbox enables the filtering of metrics based on the profile install date, instead of the default filters that use trial/purchase date for transactions or view date for paywall views. By selecting this checkbox, you can focus on measuring user acquisition performance for a specific period by aligning metrics with the profile install date. This option is useful for customizing the metrics analysis according to your specific needs.

#### Time ranges


<Zoom>
  <img src={require('./img/e8ace98-CleanShot_2023-07-19_at_16.12.442x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





You can choose from a range of time periods to analyze metrics data, allowing you to focus on specific durations such as days, weeks, months, or custom date ranges.

#### Available filters and grouping

Adapty offers powerful tools for filtering and customizing metrics analysis to suit your needs. With Adapty's metrics page, you have access to various time ranges, grouping options, and filtering possibilities.

- Filter by: Audience, country, paywall, paywall state, paywall group, placement, country, store, product, and product store. 
- Group by: Product and store.

You can find more information about the available controls, filters, grouping options, and how to use them for paywall analytics in [this documentation.](controls-filters-grouping-compare-proceeds)

#### Single metrics chart

One of the key components of the paywall metrics page is the chart section, which visually represents the selected metrics and facilitates easy analysis.

The chart section on the paywall metrics page includes a horizontal bar chart that visually represents the chosen metric values. Each bar in the chart corresponds to a metric value and is proportional in size, making it easy to understand the data at a glance. The horizontal line indicates the timeframe being analyzed, and the vertical column displays the numeric values of the metrics. The total value of all the metric values is displayed next to the chart.


<Zoom>
  <img src={require('./img/10a9b9c-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Additionally, clicking on the arrow icon in the top right corner of the chart section expands the view, displaying the selected metrics on the full line of the chart.

#### Total metrics summary

Next to the single metrics chart, the total metrics summary section is shown, which displays the cumulative values for the selected metrics at a specific point in time, with the ability for you to change the displayed metric using a dropdown menu.


<Zoom>
  <img src={require('./img/b7ff0c8-CleanShot_2023-07-19_at_16.19.332x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Paywall metrics


<Zoom>
  <img src={require('./img/1b07fd8-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

The following metrics are available for paywalls. Click any metric to learn more:

- [Revenue](https://adapty.io/docs/metrics#revenue)
- [Proceeds](https://adapty.io/docs/metrics#proceeds)
- [ARPPU](https://adapty.io/docs/metrics#arppu)
- [ARPAS](https://adapty.io/docs/metrics#arpas)
- [CR purchases & unique CR purchases](https://adapty.io/docs/metrics#cr-purchases--unique-cr-purchases)
- [Unique CR to trials](https://adapty.io/docs/metrics#unique-cr-trials)
- [Purchases](https://adapty.io/docs/metrics#purchases)
- [Trials](https://adapty.io/docs/metrics#trials)
- [Trials canceled](https://adapty.io/docs/metrics#trials-cancelled)
- [Refunds](https://adapty.io/docs/metrics#refunds)
- [Refund rate](https://adapty.io/docs/metrics#refund-rate)
- [Views & unique views](https://adapty.io/docs/metrics#views--unique-views)

:::warning
Make sure to send paywall views to Adapty using `.logShowPaywall()` method. Otherwise, paywall views will not be accounted for in the metrics and conversions will be irrelevant.
:::