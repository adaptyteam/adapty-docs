---
title: "Active trials"
description: "Track and manage active subscription trials with Adapty analytics."
metadataTitle: "Managing Active Trials | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The active trials chart in Adapty displays the number of unexpired free trials that are currently active at the end of a given period. Active means subscriptions that have not yet expired, and therefore, users still have access to the paid features of the app.


<Zoom>
  <img src={require('./img/da1d7ab-small-CleanShot_2023-05-05_at_15.29.502x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Calculation

Adapty calculates the number of active trials in a given period by referring to the count of unexpired free trials by the end of that period. This count remains the same until the trial expires, irrespective of its auto-renew status. At a daily resolution, the count of Active Trials represents the number of unexpired trials by the end of that day. 

For example, if 100 trials were active yesterday, 10 new trials were activated today, and 5 trials have expired today, then there are 105 active trials today.

However, at a monthly resolution, the count of Active Trials represents the number of unexpired trials by the end of that month.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Renewal status, period, product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in the[ this documentation.](controls-filters-grouping-compare-proceeds)

### Active trials chart usage

This chart provides valuable insights into the effectiveness of your app's trial offers and allows you to monitor the number of users currently taking advantage of your free trial periods. By leveraging the insights provided by the Active Trials chart, you can optimize your app's free trial strategy and maximize user engagement and revenue generation. With Adapty's powerful analytics and monitoring tools, you'll have everything you need to make data-driven decisions that drive your app's success.

### Similar metrics

In addition to Active Trials, Adapty also provides metrics for other trial-related events, such as New trials, Trial Renewal cancelled, and Expired trials. To learn more about these trial-related metrics, please refer to the following documentation:

- [New trials](new-trials)
- [Trial renewal cancelled](trials-renewal-cancelled)
- [Expired trials](expired-churned-trials)