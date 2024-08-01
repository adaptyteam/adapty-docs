---
title: "Refund money"
description: ""
metadataTitle: ""
---

The refund money chart displays the amount of money that was refunded for the selected period of time. Adapty attributes refund money to the moment when the refund was issued and the revenue decreases in the period when the refund occured.


<img
  src={require('./img/7695e84-small-CleanShot_2023-05-09_at_11.54.462x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





### Calculation

Adapty calculates the refund money chart considering only transactions that generate revenue, such as new paid subscriptions, renewals, and one-time purchases. Free trials, which do not generate revenue and cannot be refunded, are excluded from the transaction count. The refund amount is attributed to the date when the refund was made (not to when the subscription started), and the revenue decrease caused by the refunded subscription is reflected in the period in which the refund was processed.

It's important to note that Adapty calculates the refund amount before the store's fee is deducted.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in the[ this documentation.](controls-filters-grouping-compare-proceeds)

### Refund Money chart usage

The Refund money chart in Adapty helps businesses track the financial impact of refunds on their revenue. By monitoring refund amounts over time, you can identify patterns in customer behavior and make informed decisions to improve your revenue and reduce refund requests. With the refund money chart, you have a powerful tool to make data-driven decisions that optimize your business's bottom line.

### Similar metrics

In addition to the Refund money chart, Adapty also provides metrics for other issues-related events, such as  Billing events, Billing issue, and Grace period. To learn more about these issue-related metrics, please refer to the following documentation:

- [Refund events](refund-events)
- [Billing issue](billing-issue)
- [Grace period](grace-period)