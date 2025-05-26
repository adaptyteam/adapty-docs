---
title: "New subscriptions"
description: "Track and manage reactivated subscriptions to optimize user retention."
metadataTitle: "Managing Reactivated Subscriptions | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The New subscriptions chart displays the amount of new (first-time activated) subscriptions in your app. This metric shows the number of new subscriptions starting in a specific time period, including both subscriptions that start from scratch and free trials that convert into paid subscriptions. It does not include subscription renewals or subscriptions that have been restarted.


<Zoom>
  <img src={require('./img/bc458a4-small-CleanShot_2023-05-05_at_16.53.072x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Calculation

Adapty's calculation logic for the New subscriptions chart counts the number of new (first-time activated) subscriptions during a given period, including both subscriptions that start from scratch and free trials that convert into paid subscriptions. At a daily resolution, the count of new subscriptions represents the number of new subscriptions activated on that day. Therefore, the count of new subscriptions for a given day indicates the number of new subscriptions activated on that day. At a monthly resolution, the count of new subscriptions represents the number of new subscriptions activated during that month.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in [this documentation.](controls-filters-grouping-compare-proceeds)

### New subscriptions chart usage

The new subscriptions chart provides valuable insights into the number of newly acquired, individual paid users for your app. This metric is crucial for assessing the growth potential of your business. By applying filters and grouping to the new subscription data, you can enhance your understanding of the composition of your new subscriber base. This chart serves as a powerful tool for in-depth data analysis in terms of new user acquisition.

### Similar metrics

In addition to New subscriptions, Adapty also provides metrics for other subscription-related events, such as active subscriptions, subscriptions renewal canceled, expired subscriptions, and non-subscriptions. To learn more about these subscriptions-related metrics, please refer to the following documentation guides:

- [Active subscriptions](active-subscriptions)
- [Churned (expired) subscriptions](churned-expired-subscriptions)
- [Cancelled subscriptions](cancelled-subscriptions)
- [Non-subscriptions](non-subscriptions)