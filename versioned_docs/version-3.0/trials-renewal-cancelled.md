---
title: "Trials renewal cancelled"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Trials renewal cancelled chart displays the number of trials with canceled renewal (cancelled by user). When the renewal for the trial is disabled, this means that this trial won't be automatically converted to a paid subscription, yet the user still has premium features of the app until the end of the current period.


<Zoom>
  <img src={require('./img/fcb6948-small-CleanShot_2023-05-05_at_16.13.012x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Calculation

Adapty calculates the number of Trials renewal cancelled during a specific period by counting the trials that users have canceled before the end of their trial period. This count remains unchanged regardless of the trial's auto-renewal status.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Renewal status, period, product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in the[ this documentation.](controls-filters-grouping-compare-proceeds)

### Trials renewal canceled chart usage

The Trials renewal canceled chart is a useful tool that provides insights into the trial cancellation patterns of your app's users. By monitoring the number of users who have canceled their trial subscriptions during a specific period, you can optimize your app's trial offerings and enhance user satisfaction. By leveraging the insights provided by this chart, you can determine whether your trial strategy needs adjustment to encourage users to continue their subscriptions.

### Similar metrics

In addition to the Trials renewal canceled chart, Adapty also provides metrics for other trial-related events, such as New trials, Active trials, and Expired trials. To learn more about these trial-related metrics, please refer to the following documentation:

- [New trials](new-trials)
- [Active trials](active-trials)
- [Expired trials](expired-churned-trials)