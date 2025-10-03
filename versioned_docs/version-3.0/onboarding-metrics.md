---
title: "Onboarding metrics"
description: "Track and analyze onboarding performance metrics to improve subscription revenue."
metadataTitle: "Analyzing Onboarding Metrics | Adapty Docs"
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty collects a series of metrics to help you better measure the performance of the onboardings. All metrics are updated in real-time, except for the views, which are updated once every several minutes. This document outlines the metrics available, their definitions, and how they are calculated.

:::important
The onboarding revenue is calculated from all the transactions that occurred after the onboarding has been shown.
:::

Onboarding metrics are available on the onboarding list, providing you with an overview of the performance of all your onboardings. This consolidated view presents aggregated metrics for each onboarding, allowing you to assess their effectiveness and identify areas for improvement.

For a more granular analysis of each onboarding, you can navigate to the onboarding detail metrics. In this section, you will find comprehensive metrics specific to the selected onboarding, offering deeper insights into its performance.

  <Zoom>
  <img src={require('./img/onboarding-metrics1.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

## Metrics controls

The system displays the metrics based on the selected time period and organizes them according to the left-side column parameter with three indentation levels.

For Live onboardings, the metrics cover the period from the onboarding's start date until the current date. For inactive onboardings, the metrics encompass the entire period from the start date to the end of the selected time period. Draft and archived onboardings are included in the metrics table, but if no data is available, they will be listed without any displayed metrics.

### View options for metrics data

The onboarding page offers two viewing options for metrics data: 

- Placement-based view: Metrics are grouped by placements associated with the onboarding. This allows users to analyze metrics by different placements.

- Audience-based view: Metrics are grouped by the target audience of the onboarding. Users can assess metrics specific to different audience segments. 

The dropdown at the top of the onboarding page allows you to select the preferred view.

  <Zoom>
  <img src={require('./img/onboarding-metrics2.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

### Filter metrics by install date

The **Filter metrics by install date** checkbox lets you analyze data based on when users installed your app. This helps you measure how well you're acquiring new users during specific time periods. It's a handy option when you want to customize your analysis.

  <Zoom>
  <img src={require('./img/onboarding-metrics3.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

### Time ranges

You can analyze metrics data using a time range, allowing you to focus on specific durations such as days, weeks, months, or custom date ranges.

  <Zoom>
  <img src={require('./img/onboarding-metrics4.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

### Filters and groups

Adapty offers powerful tools for filtering and customizing metrics analysis to suit your needs. Adapty's metrics page gives you access to various time ranges, grouping options, and filtering possibilities.

- Filter by: Attribution, Country, Onboarding audience, Onboarding A/B tests, Onboarding placement, Paywall, Store, State.
- Group by: Product or Store.

  <Zoom>
  <img src={require('./img/onboarding-metrics5.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

### Single metric chart

The chart section shows your data in a simple bar graph. 
The chart helps you quickly see:

- The exact numbers for each metric.
- Period-specific data.

A total sum appears next to the chart, giving you the complete picture at a glance.

Click the arrow icon to expand the chart.

  <Zoom>
  <img src={require('./img/onboarding-metrics6.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

### Total metrics summary

Next to the single metrics chart, there is a total metrics summary section. This section shows the cumulative values for the selected metrics at a specific point in time. You can change the displayed metric using a dropdown menu.

  <Zoom>
  <img src={require('./img/onboarding-metrics7.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

## Onboarding metrics
The following metrics are available for onboardings. Click any metric to learn more:
- [Views & unique views](https://adapty.io/docs/metrics#views--unique-views)
- [Completions & unique completions](https://adapty.io/docs/metrics#completions--unique-completions)
- [Unique completions rate](https://adapty.io/docs/metrics#unique-completions-rate)
- [Revenue](https://adapty.io/docs/metrics#revenue)
- [Proceeds](https://adapty.io/docs/metrics#proceeds)
- [Net proceeds](https://adapty.io/docs/metrics#net-proceeds)
- [ARPPU](https://adapty.io/docs/metrics#arppu)
- [ARPU](https://adapty.io/docs/metrics#arpu)
- [ARPAS](https://adapty.io/docs/metrics#arpas)
- [CR purchases & unique CR purchases](https://adapty.io/docs/metrics#cr-purchases--unique-cr-purchases)
- [CR trials](https://adapty.io/docs/metrics#cr-to-trials)
- [Unique CR to trials](https://adapty.io/docs/metrics#unique-cr-trials)
- [Purchases](https://adapty.io/docs/metrics#purchases)
- [Trials](https://adapty.io/docs/metrics#trials)
- [Trials canceled](https://adapty.io/docs/metrics#trials-cancelled)
- [Refunds](https://adapty.io/docs/metrics#refunds)
- [Refund rate](https://adapty.io/docs/metrics#refund-rate)
