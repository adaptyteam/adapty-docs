---
title: "Active subscriptions"
description: "Managing Active Subscriptions | Adapty Docs"
metadataTitle: "Monitor and manage active subscriptions with Adapty's robust analytics."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Active subscriptions chart displays the amount of unique paid subscriptions that have not yet expired at the end of each selected period. It includes regular (unexpired) in-app subscriptions that started and are currently active and excludes both free trials and subscriptions with canceled renewals. 


<Zoom>
  <img src={require('./img/a4895aa-small-CleanShot_2023-05-04_at_15.13.262x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Calculation

Adapty's Active Subscriptions calculation logic counts the number of paid, unexpired subscriptions at the end of a given period. At a daily resolution, the amount of Active subscriptions represents the number of unexpired subscriptions at the end of that day. Therefore, the count of Active subscriptions for a given day indicates the number of unexpired subscriptions at the end of that day. At a monthly resolution, the count of Active Subscriptions represents the number of unexpired subscriptions at the end of that month. Note that, a paid subscription without a grace period is considered expired once its next renewal date has passed without a successful renewal.

For example, if there were 500 active subscriptions at the end of last month, 50 new subscriptions were started this month, and 25 subscriptions expired this month, then there are 525 active subscriptions at the end of this month.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in [this documentation.](controls-filters-grouping-compare-proceeds)

### Active subscriptions chart usage

The Active subscriptions chart is useful to get valuable insights into the number of recurring, individual paid users from your app. This metric serves as a proxy for the size and growth potential of a business. Combining Active Subscriptions with filters and grouping helps you to gain a deeper understanding of their paid subscriber base composition, making it a powerful tool for data analysis.

### Similar metrics

In addition to Active subscriptions, Adapty also provides metrics for other subscription-related events, such as new subscriptions, subscriptions renewal canceled, expired subscriptions, and non-subscriptions. To learn more about these subscriptions-related metrics, please refer to the following documentation:

- [Churned (expired) subscriptions](churned-expired-subscriptions)
- [Cancelled subscriptions](cancelled-subscriptions)
- [Non-subscriptions](non-subscriptions)