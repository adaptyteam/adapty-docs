---
title: "Refund events"
description: "Manage refund events in Adapty to reduce churn and optimize revenue."
metadataTitle: "Managing Refund Events in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Refund events chart shows how many purchases and subscriptions were refunded. Adapty ties each refund event to the date the refund was issued, not to the subscription start date.


<Zoom>
  <img src={require('./img/a3e1945-small-CleanShot_2023-05-11_at_18.36.262x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Calculation

Adapty counts every purchase or subscription refunded within the selected period. Each refund is attributed to the date it happened, not to when the subscription began. Refunds for trials are excluded because trials generate no revenue.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, duration, and refund reason. 
- ✅ Group by: Product, country, store, paywall, duration, refund reason, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in the [detailed guide](controls-filters-grouping-compare-proceeds).

### Refund events chart usage

Use the Refund events chart to spot refund spikes and recurring issues. Tracking refunds over time helps you detect patterns and take actions that reduce churn and protect revenue.

### Similar metrics

Adapty also tracks other issue-related events—Refund money, Billing issue, and Grace period. See their documentation:

- [Refund money](refund-money)
- [Billing issue](billing-issue)
- [Grace period](grace-period)