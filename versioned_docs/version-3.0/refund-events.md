---
title: "Refund events"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Refund events chart displays the number of refunded purchases and subscriptions. Adapty attributes refund events to the moment when the refund occured, meaning that any refunds related to a subscription will be counted on an actual date of the refund and not on the start date of the subscription.


<Zoom>
  <img src={require('./img/a3e1945-small-CleanShot_2023-05-11_at_18.36.262x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Calculation

Adapty calculates refund events by tracking the number of refunded purchases and subscriptions over a selected period of time. Refunds are attributed to the moment when they occured (not to when the subscription started), and any refunds that occur during the selected time period will be included in the refund events count. It's important to note that refunds related to trials are not included in this count, as trials have no revenue associated with them and cannot be refunded.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in the[ this documentation.](controls-filters-grouping-compare-proceeds)

### Refund events chart usage

The Refund Events chart in Adapty provides businesses with valuable insights into the number of refunded purchases and subscriptions over a selected period of time. By monitoring the number of refunds, businesses can identify any trends or issues related to refunds and make data-driven decisions to optimize their revenue streams. This chart is particularly useful for identifying any recurring refund issues and taking steps to address them.

### Similar metrics

In addition to the Billing Issue chart, Adapty also provides metrics for other issues-related events, such as Refund money, Billing issue, and Grace period. To learn more about these issue-related metrics, please refer to the following documentation:

- [Refund money](refund-money)
- [Billing issue](billing-issue)
- [Grace period](grace-period)