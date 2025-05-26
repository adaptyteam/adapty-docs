---
title: "Grace period"
description: "Understand how subscription grace periods work and improve user retention."
metadataTitle: "Understanding Subscription Grace Periods | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Grace period chart displays the number of subscriptions that have entered the grace period state due to a billing issue. During this period, the subscription remains active while the store tries to receive payment from the subscriber. If payment is not successfully received before the grace period ends, the subscription enters the billing issue state.


<Zoom>
  <img src={require('./img/06bb222-CleanShot_2023-07-11_at_15.20.452x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Calculation

Adapty calculates the Grace period chart by tracking the number of subscriptions that have entered the Grace period state within a given time period. The Grace period begins when the subscription enters the billing issue state due to a payment failure and ends after a specified amount of time (6 days for weekly subscriptions, 16 days for all other subscriptions) or when payment is successfully received. The chart provides insights into the effectiveness of the grace period feature and can help identify potential issues with payment processing or subscription management.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in the[ this documentation.](controls-filters-grouping-compare-proceeds)

### Similar metrics

In addition to the Grace period chart, Adapty also provides metrics for other issues-related events, such as Refund events, Refund money, and Billing issue. To learn more about these issue-related metrics, please refer to the following documentation:

- [Refund money](new-trials)
- [Refund events](active-trials)
- [Billing issue](billing-issue)