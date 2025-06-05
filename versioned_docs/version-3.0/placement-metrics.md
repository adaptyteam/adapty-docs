---
title: "Placement metrics"
description: "Analyze placement metrics in Adapty to improve paywall performance."
metadataTitle: "Analyzing Placement Metrics | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

With Adapty, you have the flexibility to create and manage multiple placements in your app, each associated with distinct paywalls or A/B tests. This versatility enables you to target specific user segments, experiment with different offers or pricing models, and optimize your app's monetization strategy.

To gather valuable insights into the performance of your placements and user engagement with your offers, Adapty tracks various user interactions and transactions related to the displayed paywalls. The robust analytics system captures metrics including views, unique views, purchases, trials, refunds, conversion rates, and revenue.

The collected metrics are continuously updated in real-time and can be conveniently accessed and analyzed through Adapty's user-friendly dashboard. You have the freedom to customize the time range for analysis, apply filters based on different parameters, and compare metrics across various placements, user segments, or products.

Placement metrics are available on the placements list, where you can get an overview of the performance of all your placements. This high-level view provides aggregated metrics for each placement, allowing you to compare their performance and identify trends.

For a more detailed analysis of each placements, you can navigate to the placements detail metrics. On this page, you will find comprehensive metrics specific to the selected placements. These metrics provide deeper insights into how a particular placements is performing, allowing you to assess its effectiveness and make data-driven decisions.


<Zoom>
  <img src={require('./img/3e711fc-CleanShot_2023-07-26_at_14.55.042x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Metrics controls

The system displays the metrics based on the selected time period and organizes them according to the left-side column parameter with four levels of indentation.

#### View options for metrics data

The placement metrics page offers two view options for metrics data: paywall-based and audience-based.


<Zoom>
  <img src={require('./img/9d26b32-Export-1690376094858.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





In the paywall-based view, metrics are grouped by placements associated with the paywall. This allows users to analyze metrics by different placements.

In the audience-based view, metrics are grouped by the target audience of the paywall. Users can assess metrics specific to different audience segments.

#### Profile install date filtration


<Zoom>
  <img src={require('./img/b1e4155-Export-1690375904086.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





#### Time ranges

You can choose from a range of time periods to analyze metrics data, allowing you to focus on specific durations such as days, weeks, months, or custom date ranges.


<Zoom>
  <img src={require('./img/15d2c3e-CleanShot_2023-07-26_at_16.49.272x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





#### Available filters and grouping

Adapty offers powerful tools for filtering and customizing metrics analysis to suit your needs. With Adapty's metrics page, you have access to various time ranges, grouping options, and filtering possibilities.

- ✅ Filter by: Audience, paywall, paywall group, placement, country, store.
- ✅ Group by: Segment, store, and product

You can find more information about the available controls, filters, grouping options, and how to use them for paywall analytics in [this documentation.](controls-filters-grouping-compare-proceeds)

#### Single metrics chart

One of the key components of the placement metrics page is the chart section, which visually represents the selected metrics and facilitates easy analysis.

The chart section on the placements metrics page includes a horizontal bar chart that visually represents the chosen metric values. Each bar in the chart corresponds to a metric value and is proportional in size, making it easy to understand the data at a glance. The horizontal line indicates the timeframe being analyzed, and the vertical column displays the numeric values of the metrics. The total value of all the metric values is displayed next to the chart.


<Zoom>
  <img src={require('./img/4623c5b-Export-1690375597411.gif').default}
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
  <img src={require('./img/0f647cf-CleanShot_2023-07-26_at_14.55.492x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Placement metrics

<Zoom>
  <img src={require('./img/771a0f0-Export-1690375049771.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

The following metrics are available for placements. Click any metric to learn more:
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